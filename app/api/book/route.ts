import { attioKey, saveLead, type Lead } from "@/lib/attio";
import { INTERESTS, ROSTER_SIZES } from "@/lib/contact";

const FIELDS = [
  "firstName", "lastName", "email", "agency", "role", "rosterSize", "sports", "interest", "heardAbout",
  "sourcePage", "landingPage", "referrer", "utmSource", "utmMedium", "utmCampaign",
] as const satisfies readonly (keyof Lead)[];

// Saves a booking-form lead to Attio. The visitor always continues to the calendar: a CRM failure is
// logged rather than shown, since the booking itself still reaches Calendly.
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return Response.json({ error: "Invalid request" }, { status: 400 });

  // Hidden field only bots fill in: pretend it worked and store nothing.
  if (typeof body.website === "string" && body.website !== "") return Response.json({ ok: true });

  const lead = Object.fromEntries(FIELDS.map((field) => [field, String(body[field] ?? "").trim().slice(0, 500)])) as Lead;
  lead.email = lead.email.toLowerCase();
  if (!lead.firstName || !lead.lastName || !lead.agency || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    return Response.json({ error: "Please fill in your name, work email and agency." }, { status: 400 });
  }
  if (!(INTERESTS as readonly string[]).includes(lead.interest)) lead.interest = "";
  if (!(ROSTER_SIZES as readonly string[]).includes(lead.rosterSize)) lead.rosterSize = "";

  if (!attioKey()) {
    console.warn("ATTIO_API_KEY is not set; booking lead not saved:", lead.email);
    return Response.json({ ok: true });
  }
  try {
    await saveLead(lead);
  } catch (error) {
    console.error("Saving booking lead to Attio failed", error);
  }
  return Response.json({ ok: true });
}
