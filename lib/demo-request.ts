// The "Book a demo" form on /contact. The client renders these options and the API accepts only them.

export const ROLE_OPTIONS = [
  "Agent / Talent marketer",
  "Agency staff (ops, contracts, admin)",
  "Brand / Sponsor",
  "Other",
] as const;

export const ATHLETE_OPTIONS = ["1–10", "11–50", "51–150", "150+"] as const;

export const HELP_OPTIONS = [
  "Valuing endorsement deals",
  "Managing contracts and deliverables",
  "Organizing my roster and schedule",
  "Internal agency communications",
] as const;

export type DemoRequest = {
  name: string;
  email: string;
  role: string;
  athletes: string;
  helpWith: string;
  sports: string;
};

export type Attribution = {
  sourcePage: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const text = (value: unknown, max: number) => (typeof value === "string" ? value.trim().slice(0, max) : "");
const oneOf = (value: unknown, options: readonly string[]) => (typeof value === "string" && options.includes(value) ? value : "");

// Returns the cleaned request, or the name of each field that is missing or invalid.
export function parseDemoRequest(input: unknown): { request: DemoRequest } | { errors: (keyof DemoRequest)[] } {
  const body = (input ?? {}) as Record<string, unknown>;
  const request: DemoRequest = {
    name: text(body.name, 120),
    email: text(body.email, 200).toLowerCase(),
    role: oneOf(body.role, ROLE_OPTIONS),
    athletes: oneOf(body.athletes, ATHLETE_OPTIONS),
    helpWith: oneOf(body.helpWith, HELP_OPTIONS),
    sports: text(body.sports, 200),
  };

  const errors: (keyof DemoRequest)[] = [];
  if (!request.name) errors.push("name");
  if (!EMAIL.test(request.email)) errors.push("email");
  if (!request.role) errors.push("role");
  if (body.athletes && !request.athletes) errors.push("athletes"); // optional, but must be a listed option
  if (!request.helpWith) errors.push("helpWith");
  if (!request.sports) errors.push("sports");
  return errors.length ? { errors } : { request };
}

export function parseAttribution(input: unknown): Attribution {
  const body = (input ?? {}) as Record<string, unknown>;
  return {
    sourcePage: text(body.sourcePage, 300),
    utmSource: text(body.utmSource, 100),
    utmMedium: text(body.utmMedium, 100),
    utmCampaign: text(body.utmCampaign, 100),
  };
}
