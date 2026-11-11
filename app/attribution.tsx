"use client";

import { useEffect, useRef } from "react";

const KEY = "endo-attribution";

export type Attribution = { landingPage: string; referrer: string; utmSource: string; utmMedium: string; utmCampaign: string; utmContent: string };

// Remembers how a visitor arrived (landing page, outside referrer, utm_* tags) for the rest of their
// visit, so the booking form can send it to Attio even after they've clicked around the site.
// A link that carries new utm tags replaces what was stored.
export function AttributionCapture() {
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const hasUtm = ["utm_source", "utm_medium", "utm_campaign", "utm_content"].some((name) => params.has(name));
      if (sessionStorage.getItem(KEY) && !hasUtm) return;
      const referrer = document.referrer && new URL(document.referrer).origin !== window.location.origin ? document.referrer : "";
      const attribution: Attribution = {
        landingPage: window.location.pathname + window.location.search,
        referrer,
        utmSource: params.get("utm_source") ?? "",
        utmMedium: params.get("utm_medium") ?? "",
        utmCampaign: params.get("utm_campaign") ?? "",
        utmContent: params.get("utm_content") ?? "",
      };
      sessionStorage.setItem(KEY, JSON.stringify(attribution));
    } catch {
      // Storage can be unavailable (private mode, blocked site data); attribution is best-effort.
    }
  }, []);

  return null;
}

export function readAttribution(): Attribution {
  const empty = { landingPage: "", referrer: "", utmSource: "", utmMedium: "", utmCampaign: "", utmContent: "" };
  try {
    return { ...empty, ...JSON.parse(sessionStorage.getItem(KEY) ?? "{}") };
  } catch {
    return empty;
  }
}

const UTM_FIELDS = [["utm_source", "utmSource"], ["utm_campaign", "utmCampaign"], ["utm_content", "utmContent"]] as const;

// Hidden utm_source, utm_campaign and utm_content inputs for a form. Each takes the current URL's tag,
// or the one remembered from the start of the visit when they've since clicked to another page.
export function UtmFields() {
  const ref = useRef<HTMLSpanElement>(null);
  // Filled in after hydration, since the URL and stored visit aren't known on the server.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const stored = readAttribution();
    for (const [name, key] of UTM_FIELDS) {
      const input = ref.current?.querySelector<HTMLInputElement>(`input[name="${name}"]`);
      if (input) input.value = params.get(name) ?? stored[key];
    }
  }, []);
  return <span ref={ref} hidden>{UTM_FIELDS.map(([name]) => <input key={name} type="hidden" name={name} defaultValue="" />)}</span>;
}

// The UtmFields values of a submitted form, keyed the way the API routes expect them.
export function utmValues(form: FormData) {
  return Object.fromEntries(UTM_FIELDS.map(([name, key]) => [key, String(form.get(name) ?? "")])) as Record<(typeof UTM_FIELDS)[number][1], string>;
}
