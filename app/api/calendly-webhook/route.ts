import { verifyCalendlySignature } from "@/lib/calendly-signature";
import { isLeadId } from "@/lib/lead-id";
import { sendToLeadsSheet } from "@/lib/leads-sheet";

type InviteePayload = {
  uri?: string;
  email?: string;
  name?: string;
  rescheduled?: boolean;
  scheduled_event?: { uri?: string; start_time?: string };
  tracking?: { utm_content?: string | null };
};

// Calendly calls this for every booking and cancellation on the demo calendar
// (registered with scripts/register-calendly-webhook.mjs).
export async function POST(request: Request) {
  const signingKey = process.env.CALENDLY_WEBHOOK_SIGNING_KEY;
  if (!signingKey) {
    console.error("CALENDLY_WEBHOOK_SIGNING_KEY is not set");
    return new Response("Not configured", { status: 503 });
  }

  const body = await request.text();
  if (!(await verifyCalendlySignature(request.headers.get("Calendly-Webhook-Signature"), body, signingKey))) {
    return new Response("Invalid signature", { status: 401 });
  }

  let message: { event?: string; payload?: InviteePayload };
  try {
    message = JSON.parse(body);
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }
  const { event, payload } = message;
  if (!payload?.uri) return new Response("Ignored", { status: 200 });

  try {
    if (event === "invitee.created") {
      const utmContent = payload.tracking?.utm_content;
      await sendToLeadsSheet({
        action: "booked",
        // Bookings made outside /contact (or reschedules) have no lead ID; the sheet falls back to the email.
        leadId: isLeadId(utmContent) ? utmContent : "",
        email: payload.email ?? "",
        name: payload.name ?? "",
        eventUri: payload.scheduled_event?.uri ?? "",
        inviteeUri: payload.uri,
        meetingStart: payload.scheduled_event?.start_time ?? "",
      });
    } else if (event === "invitee.canceled") {
      await sendToLeadsSheet({ action: "canceled", inviteeUri: payload.uri, rescheduled: Boolean(payload.rescheduled) });
    }
  } catch (error) {
    console.error(`Recording ${event} failed`, error);
    return new Response("Sheet update failed", { status: 500 });
  }
  return new Response("OK", { status: 200 });
}
