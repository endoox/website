// Every "Request a demo" link goes to our own booking page (app/book), which collects the lead first
// and then shows this Calendly event inline so the visitor only has to pick a time.
export const DEMO_URL = "/book";
export const CALENDLY_URL = "https://calendly.com/admin-endodeals/endo-demo";

export const INTERESTS = ["Demo", "Valuation", "Both"] as const;
export const ROSTER_SIZES = ["1–10", "11–50", "51–150", "150+"] as const;

// endo's social profiles, shown on the About page. A link left blank is hidden.
export const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/endodeals" },
  { label: "Instagram", href: "https://www.instagram.com/endodeals/" },
] as const;
