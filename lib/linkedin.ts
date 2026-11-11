// LinkedIn Insight Tag (loaded in app/layout.tsx) and conversion tracking for the ad campaigns.
export const LINKEDIN_PARTNER_ID = "10366052";

// Conversion IDs from LinkedIn Campaign Manager. Leave one undefined until it exists; tracking skips it.
export const LINKEDIN_CONVERSIONS: Record<"freeValuation" | "lpDemo" | "book" | "reportDownload", number | undefined> = {
  // The /free-valuation booking form.
  freeValuation: 30557716,
  // The /lp/demo booking form. TODO: add the conversion ID.
  lpDemo: undefined,
  // The /book booking form. TODO: add the conversion ID.
  book: undefined,
  // The report download form, once the site has one. TODO: add the conversion ID.
  reportDownload: undefined,
};

declare global {
  interface Window {
    lintrk?: (action: "track", data: { conversion_id: number }) => void;
  }
}

// No-op when the Insight Tag isn't on the page (local dev, blockers) or the ID isn't set yet.
export function trackLinkedIn(conversionId: number | undefined) {
  if (conversionId === undefined || typeof window === "undefined" || !window.lintrk) return;
  window.lintrk("track", { conversion_id: conversionId });
}
