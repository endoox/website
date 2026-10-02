// Server-only Attio client for booking leads. Each lead is a Person (matched on email, linked to their
// agency's Company when the email is on a company domain) plus one entry in the "Demo requests" list,
// which holds the form answers, attribution and booking stage. The booking form writes the lead
// (app/api/book); Calendly's webhook moves it to Booked or Canceled (app/api/calendly).
// scripts/attio-setup.mjs creates the list.

const API = "https://api.attio.com/v2";
export const LEADS_LIST = "demo_requests";

// Personal inboxes don't identify an agency, so they never create or match a Company.
const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com", "googlemail.com", "yahoo.com", "hotmail.com", "outlook.com", "live.com", "msn.com",
  "icloud.com", "me.com", "mac.com", "aol.com", "proton.me", "protonmail.com", "gmx.com", "ymail.com",
]);

export type Lead = {
  firstName: string;
  lastName: string;
  email: string;
  agency: string;
  role: string;
  rosterSize: string;
  sports: string;
  interest: string;
  heardAbout: string;
  sourcePage: string;
  landingPage: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
};

export function attioKey() {
  return process.env.ATTIO_API_KEY || "";
}

async function attio<T>(method: string, path: string, body: unknown): Promise<T> {
  const response = await fetch(`${API}${path}`, {
    method,
    headers: { Authorization: `Bearer ${attioKey()}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error(`Attio ${method} ${path} failed: ${response.status} ${await response.text()}`);
  return response.json() as Promise<T>;
}

type RecordResponse = { data: { id: { record_id: string } } };

// Drops empty strings so a blank optional field never overwrites something already in Attio.
function present(values: Record<string, unknown>) {
  return Object.fromEntries(Object.entries(values).filter(([, value]) => value !== ""));
}

/** Upserts the person (and company) and their "Demo requests" entry. */
export async function saveLead(lead: Lead) {
  const domain = lead.email.split("@")[1]?.toLowerCase() ?? "";
  let companyId: string | undefined;
  if (domain && !FREE_EMAIL_DOMAINS.has(domain)) {
    const company = await attio<RecordResponse>("PUT", "/objects/companies/records?matching_attribute=domains", {
      data: { values: present({ domains: [domain], name: lead.agency }) },
    });
    companyId = company.data.id.record_id;
  }

  const person = await attio<RecordResponse>("PUT", "/objects/people/records?matching_attribute=email_addresses", {
    data: {
      values: present({
        email_addresses: [lead.email],
        name: [{ first_name: lead.firstName, last_name: lead.lastName, full_name: `${lead.firstName} ${lead.lastName}`.trim() }],
        job_title: lead.role,
        ...(companyId ? { company: [{ target_object: "companies", target_record_id: companyId }] } : {}),
      }),
    },
  });

  // Asserting by parent keeps one entry per person; a repeat submission refreshes it and resets the stage.
  await attio("PUT", `/lists/${LEADS_LIST}/entries`, {
    data: {
      parent_record_id: person.data.id.record_id,
      parent_object: "people",
      entry_values: present({
        stage: "Form submitted",
        submitted_at: new Date().toISOString(),
        interest: lead.interest,
        agency: lead.agency,
        roster_size: lead.rosterSize,
        sports: lead.sports,
        heard_about: lead.heardAbout,
        source_page: lead.sourcePage,
        landing_page: lead.landingPage,
        referrer: lead.referrer,
        utm_source: lead.utmSource,
        utm_medium: lead.utmMedium,
        utm_campaign: lead.utmCampaign,
      }),
    },
  });
}

/** Records a Calendly booking change on the invitee's "Demo requests" entry, creating the person and
 * entry if they booked without filling in our form (e.g. from a direct Calendly link). */
export async function recordBooking(invitee: { email: string; firstName: string; lastName: string }, entryValues: Record<string, string>) {
  const fullName = `${invitee.firstName} ${invitee.lastName}`.trim();
  const person = await attio<RecordResponse>("PUT", "/objects/people/records?matching_attribute=email_addresses", {
    data: {
      values: present({
        email_addresses: [invitee.email.toLowerCase()],
        ...(fullName ? { name: [{ first_name: invitee.firstName, last_name: invitee.lastName, full_name: fullName }] } : {}),
      }),
    },
  });
  await attio("PUT", `/lists/${LEADS_LIST}/entries`, {
    data: { parent_record_id: person.data.id.record_id, parent_object: "people", entry_values: present(entryValues) },
  });
}
