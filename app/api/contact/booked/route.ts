import { isLeadId } from "@/lib/lead-id";
import { sendToLeadsSheet } from "@/lib/leads-sheet";

const CALENDLY_URI = /^https:\/\/api\.calendly\.com\/[\w/-]+$/;

// Called by /contact the moment Calendly's embed reports a booking, so the lead is marked booked right away.
// The Calendly webhook (app/api/calendly-webhook) confirms it and fills in the meeting time.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const { leadId, eventUri, inviteeUri } = body ?? {};
  if (!isLeadId(leadId) || !CALENDLY_URI.test(String(eventUri)) || !CALENDLY_URI.test(String(inviteeUri))) {
    return Response.json({ error: "Invalid booking" }, { status: 400 });
  }

  try {
    await sendToLeadsSheet({ action: "booked", leadId, email: "", name: "", eventUri, inviteeUri, meetingStart: "" });
  } catch (error) {
    console.error("Marking lead booked failed", error);
    return Response.json({ ok: false }, { status: 502 });
  }
  return Response.json({ ok: true });
}
