// Calendly's embed script and styles, loaded on demand in the browser.

type InlineWidgetOptions = {
  url: string;
  parentElement: HTMLElement;
  prefill?: { name?: string; email?: string };
  utm?: { utmSource?: string; utmMedium?: string; utmCampaign?: string; utmContent?: string };
};

declare global {
  interface Window {
    Calendly?: { initInlineWidget(options: InlineWidgetOptions): void };
  }
}

let loading: Promise<void> | undefined;

export function loadCalendly() {
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
      script.remove();
      reject(new Error("Calendly failed to load"));
    };
    document.head.append(css, script);
  });
  return loading;
}

// The embed posts this message to the page when someone books. The URIs are Calendly API resource links.
export type CalendlyScheduledMessage = {
  event: "calendly.event_scheduled";
  payload: { event: { uri: string }; invitee: { uri: string } };
};

export function isScheduledMessage(message: MessageEvent): message is MessageEvent<CalendlyScheduledMessage> {
  return message.origin === "https://calendly.com" && message.data?.event === "calendly.event_scheduled";
}
