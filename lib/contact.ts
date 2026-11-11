// Every "Request a demo" link goes to our own booking page (app/book), which collects the lead first
// and then shows this Calendly event inline so the visitor only has to pick a time.
export const DEMO_URL = "/book";
// The same page with "A deal valuation" preselected.
export const VALUATION_URL = `${DEMO_URL}?interest=Valuation`;
export const CALENDLY_URL = "https://calendly.com/mike-endodeals/30min";

export const INTERESTS = ["Demo", "Valuation", "Both"] as const;
export const ROSTER_SIZES = ["1–10", "11–50", "51–150", "150+"] as const;

// endo's social profiles, shown on the About page. A link left blank is hidden.
export const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/endodeals" },
  { label: "Instagram", href: "https://www.instagram.com/endodeals/" },
] as const;

// What the call covers, by what they asked for. "Both" gets the demo list plus the valuation line.
export const CALL_COVERS = {
  Demo: [
    "A walkthrough of endo set up around your roster and sports",
    "How agencies track deals, deliverables and payments in one place",
    "Pricing and onboarding for an agency your size",
  ],
  Valuation: [
    "The deal you’re working on: the talent, the brand and any offer on the table",
    "How endodeals scores the talent and prices the full deal",
    "What’s in your report, and when you’ll get it",
  ],
  Both: [
    "A walkthrough of endo set up around your roster and sports",
    "How endodeals prices a deal you’re working on now",
    "Pricing and onboarding for an agency your size",
  ],
} as const;
