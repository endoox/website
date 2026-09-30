"use client";

import { useEffect } from "react";
import { DEMO_URL } from "@/lib/contact";

declare global {
  interface Window {
    Calendly?: { initPopupWidget(options: { url: string }): void };
  }
}

let loading: Promise<void> | undefined;

// Calendly's widget script and styles, fetched on the first booking click rather than on page load.
function loadCalendly() {
  if (window.Calendly) return Promise.resolve();
  loading ??= new Promise<void>((resolve, reject) => {
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "https://assets.calendly.com/assets/external/widget.css";
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      loading = undefined;
      reject(new Error("Calendly failed to load"));
    };
    document.head.append(css, script);
  });
  return loading;
}

// Any plain click on a link to the booking URL opens Calendly in a popup instead of leaving the site.
// Modified clicks (new tab, etc.) behave normally, and if Calendly can't load we fall back to the link.
export function CalendlyPopup() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement) || link.href !== DEMO_URL) return;
      event.preventDefault();
      loadCalendly()
        .then(() => window.Calendly?.initPopupWidget({ url: DEMO_URL }))
        .catch(() => { window.location.href = DEMO_URL; });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
