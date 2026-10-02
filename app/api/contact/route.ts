import { parseAttribution, parseDemoRequest } from "@/lib/demo-request";
import { sendToLeadsSheet } from "@/lib/leads-sheet";

// Saves a /contact submission as a new lead and returns its ID, which the page hands to Calendly.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const leadId = crypto.randomUUID();

  // Honeypot: people never see the "website" field, so anything in it is a bot. Pretend it worked.
  if (body?.website) return Response.json({ leadId });

  const parsed = parseDemoRequest(body);
  if ("errors" in parsed) return Response.json({ errors: parsed.errors }, { status: 400 });

  try {
    await sendToLeadsSheet({
      action: "create",
      lead: { leadId, submittedAt: new Date().toISOString(), ...parsed.request, ...parseAttribution(body) },
    });
  } catch (error) {
    console.error("Saving demo request failed", error);
    // The page still opens the calendar with this ID, so the booking isn't lost; the webhook adds a row for it.
    return Response.json({ leadId, saved: false }, { status: 502 });
  }
  return Response.json({ leadId, saved: true });
}
