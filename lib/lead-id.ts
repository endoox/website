// Lead IDs are random UUIDs. They travel to Calendly as utm_content, which is how a booking finds its lead.
const LEAD_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

export const isLeadId = (value: unknown): value is string => typeof value === "string" && LEAD_ID.test(value);
