"use client";

import { useEffect } from "react";

const KEY = "endo-attribution";

export type Attribution = { landingPage: string; referrer: string; utmSource: string; utmMedium: string; utmCampaign: string };

// Remembers how a visitor arrived (landing page, outside referrer, utm_* tags) for the rest of their
// visit, so the booking form can send it to Attio even after they've clicked around the site.
// A link that carries new utm tags replaces what was stored.
export function AttributionCapture() {
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const hasUtm = ["utm_source", "utm_medium", "utm_campaign"].some((name) => params.has(name));
      if (sessionStorage.getItem(KEY) && !hasUtm) return;
      const referrer = document.referrer && new URL(document.referrer).origin !== window.location.origin ? document.referrer : "";
      const attribution: Attribution = {
        landingPage: window.location.pathname + window.location.search,
        referrer,
        utmSource: params.get("utm_source") ?? "",
        utmMedium: params.get("utm_medium") ?? "",
        utmCampaign: params.get("utm_campaign") ?? "",
      };
      sessionStorage.setItem(KEY, JSON.stringify(attribution));
    } catch {
      // Storage can be unavailable (private mode, blocked site data); attribution is best-effort.
    }
  }, []);

  return null;
}

export function readAttribution(): Attribution {
  const empty = { landingPage: "", referrer: "", utmSource: "", utmMedium: "", utmCampaign: "" };
  try {
    return { ...empty, ...JSON.parse(sessionStorage.getItem(KEY) ?? "{}") };
  } catch {
    return empty;
  }
}
