import { CALENDLY_URL } from "@/lib/contact";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget(options: {
        url: string;
        parentElement: HTMLElement;
        prefill?: { firstName?: string; lastName?: string; name?: string; email?: string };
        utm?: { utmSource?: string; utmMedium?: string; utmCampaign?: string; utmContent?: string };
      }): void;
    };
  }
}

// Calendly's colors (paid Calendly plans apply them) and chrome trimmed so it reads as part of the page:
// no event header (our page has one) and no cookie banner.
export const CALENDLY_EMBED = `${CALENDLY_URL}?hide_event_type_details=1&hide_gdpr_banner=1&background_color=ffffff&text_color=2b2b2b&primary_color=4b7cd1`;

let calendlyLoading: Promise<void> | undefined;
export function loadCalendly() {
  if (window.Calendly) return Promise.resolve();
  calendlyLoading ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      calendlyLoading = undefined;
      reject(new Error("Calendly failed to load"));
    };
    document.head.append(script);
  });
  return calendlyLoading;
}

// Calendly posts this to the page when an invitee finishes booking.
export const isCalendlyBooking = (event: MessageEvent) =>
  event.origin === "https://calendly.com" && event.data?.event === "calendly.event_scheduled";
