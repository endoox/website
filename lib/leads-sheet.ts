// Server-only client for the "Endo demo leads" Google Sheet. Requests go to the Apps Script web app in
// scripts/google-sheet-leads.gs, which owns the row layout and the matching of bookings to leads.
// When the leads move to a CRM, this is the only file the API routes need swapped out.

import type { Attribution, DemoRequest } from "./demo-request";

export type LeadAction =
  | { action: "create"; lead: DemoRequest & Attribution & { leadId: string; submittedAt: string } }
  | {
      action: "booked";
      leadId: string;
      email: string;
      name: string;
      eventUri: string;
      inviteeUri: string;
      meetingStart: string;
    }
  | { action: "canceled"; inviteeUri: string; rescheduled: boolean };

export class LeadsSheetError extends Error {}

export async function sendToLeadsSheet(payload: LeadAction) {
  const url = process.env.SHEETS_WEBHOOK_URL;
  const secret = process.env.SHEETS_WEBHOOK_SECRET;
  if (!url || !secret) throw new LeadsSheetError("SHEETS_WEBHOOK_URL or SHEETS_WEBHOOK_SECRET is not set");

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, secret }),
  });
  // Apps Script answers 200 even for script errors, so the result is in the body.
  const result = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
  if (!response.ok || !result?.ok) {
    throw new LeadsSheetError(`Leads sheet rejected ${payload.action}: ${result?.error ?? `HTTP ${response.status}`}`);
  }
}
