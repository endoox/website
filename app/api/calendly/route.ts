import { attioKey, recordBooking } from "@/lib/attio";

// Calendly webhook (invitee.created / invitee.canceled), registered by scripts/calendly-webhook.mjs.
// Moves the invitee's "Demo requests" entry in Attio to Booked or Canceled, with the meeting time.

const TOLERANCE_SECONDS = 5 * 60;

type InviteePayload = {
  email?: string;
  first_name?: string | null;
  last_name?: string | null;
  name?: string;
  rescheduled?: boolean;
  uri?: string;
  scheduled_event?: { uri?: string; start_time?: string };
};

export async function POST(request: Request) {
  const signingKey = process.env.CALENDLY_WEBHOOK_SIGNING_KEY;
  if (!signingKey) return new Response("Webhook signing key not configured", { status: 503 });

  const body = await request.text();
  if (!(await verifySignature(request.headers.get("Calendly-Webhook-Signature") ?? "", body, signingKey))) {
    return new Response("Invalid signature", { status: 401 });
  }

  const { event, payload } = JSON.parse(body) as { event?: string; payload?: InviteePayload };
  if (!payload?.email || !attioKey()) return new Response(null, { status: 204 });

  const [first = "", ...rest] = (payload.name ?? "").split(" ");
  const invitee = { email: payload.email, firstName: payload.first_name ?? first, lastName: payload.last_name ?? rest.join(" ") };
  const meeting = { calendly_event: payload.scheduled_event?.uri ?? "", meeting_at: payload.scheduled_event?.start_time ?? "" };

  try {
    if (event === "invitee.created") {
      await recordBooking(invitee, { stage: "Booked", ...meeting });
    } else if (event === "invitee.canceled" && !payload.rescheduled) {
      // A reschedule cancels the old invitee and creates a new one, so only real cancellations count.
      await recordBooking(invitee, { stage: "Canceled" });
    }
  } catch (error) {
    // A non-2xx makes Calendly retry, which is what we want if Attio was briefly unavailable.
    console.error("Recording Calendly booking in Attio failed", error);
    return new Response("Attio update failed", { status: 502 });
  }
  return new Response(null, { status: 204 });
}

// Calendly signs `${t}.${body}` with HMAC-SHA256 and sends "t=<unix seconds>,v1=<hex>".
async function verifySignature(header: string, body: string, signingKey: string) {
  const parts = Object.fromEntries(header.split(",").map((part) => part.split("=") as [string, string]));
  const timestamp = Number(parts.t);
  if (!parts.v1 || !Number.isFinite(timestamp) || Math.abs(Date.now() / 1000 - timestamp) > TOLERANCE_SECONDS) return false;

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", encoder.encode(signingKey), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const digest = new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(`${parts.t}.${body}`)));
  const expected = Array.from(digest, (byte) => byte.toString(16).padStart(2, "0")).join("");
  if (expected.length !== parts.v1.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ parts.v1.charCodeAt(i);
  return diff === 0;
}
