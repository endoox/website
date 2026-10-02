"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { CALENDLY_URL, INTERESTS, ROSTER_SIZES } from "@/lib/contact";
import { readAttribution } from "../attribution";
import pageStyles from "../page.module.css";
import styles from "./book.module.css";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget(options: {
        url: string;
        parentElement: HTMLElement;
        prefill?: { firstName?: string; lastName?: string; name?: string; email?: string };
        utm?: { utmSource?: string; utmMedium?: string; utmCampaign?: string };
      }): void;
    };
  }
}

// Calendly's colors (paid Calendly plans apply them) and chrome trimmed so it reads as part of the page:
// no event header (our page has one) and no cookie banner.
const CALENDLY_EMBED = `${CALENDLY_URL}?hide_event_type_details=1&hide_gdpr_banner=1&background_color=ffffff&text_color=2b2b2b&primary_color=4b7cd1`;

let calendlyLoading: Promise<void> | undefined;
function loadCalendly() {
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

type Details = { firstName: string; lastName: string; email: string };
type Step = "details" | "time" | "booked";

export function BookFlow({ initialInterest }: { initialInterest: string }) {
  const [step, setStep] = useState<Step>("details");
  const [details, setDetails] = useState<Details | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [interest, setInterest] = useState(initialInterest);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [calendarFailed, setCalendarFailed] = useState(false);

  useEffect(() => {
    if (step !== "time" || !details || !calendarRef.current) return;
    const parent = calendarRef.current;
    const { utmSource, utmMedium, utmCampaign } = readAttribution();
    loadCalendly()
      .then(() => {
        parent.replaceChildren();
        window.Calendly?.initInlineWidget({
          url: CALENDLY_EMBED,
          parentElement: parent,
          prefill: { firstName: details.firstName, lastName: details.lastName, name: `${details.firstName} ${details.lastName}`, email: details.email },
          utm: { utmSource, utmMedium, utmCampaign },
        });
      })
      .catch(() => setCalendarFailed(true));

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== "https://calendly.com" || event.data?.event !== "calendly.event_scheduled") return;
      // Attio is updated by Calendly's webhook (app/api/calendly); this only changes what the visitor sees.
      setStep("booked");
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [step, details]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const value = (name: string) => String(form.get(name) ?? "").trim();
    const lead = {
      firstName: value("firstName"),
      lastName: value("lastName"),
      email: value("email"),
      agency: value("agency"),
      role: value("role"),
      rosterSize: value("rosterSize"),
      sports: value("sports"),
      interest,
      heardAbout: value("heardAbout"),
      website: value("website"),
      sourcePage: sourcePage(),
      ...readAttribution(),
    };

    setSubmitting(true);
    try {
      const response = await fetch("/api/book", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(lead) });
      if (!response.ok) {
        const result = (await response.json().catch(() => ({}))) as { error?: string };
        setError(result.error ?? "Something went wrong. Please try again.");
        return;
      }
    } catch {
      // Network trouble shouldn't stop someone booking; the meeting still lands in Calendly.
    } finally {
      setSubmitting(false);
    }
    setDetails({ firstName: lead.firstName, lastName: lead.lastName, email: lead.email });
    setStep("time");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className={styles.flow}>
      <ol className={styles.steps} aria-label="Booking steps">
        <li data-state={step === "details" ? "current" : "done"}><span>1</span>Your details</li>
        <li data-state={step === "time" ? "current" : step === "booked" ? "done" : undefined}><span>2</span>Pick a time</li>
      </ol>

      {step === "details" ? (
        <form className={styles.card} onSubmit={onSubmit}>
          <div className={styles.grid}>
            <label>First name<input name="firstName" autoComplete="given-name" required /></label>
            <label>Last name<input name="lastName" autoComplete="family-name" required /></label>
            <label className={styles.wide}>Work email<input name="email" type="email" autoComplete="email" required /></label>
            <label>Agency / company<input name="agency" autoComplete="organization" required /></label>
            <label>Your role<input name="role" autoComplete="organization-title" placeholder="e.g. Founder, Agent" /></label>
            <label>
              Roster size
              <select name="rosterSize" defaultValue="">
                <option value="" disabled>Select</option>
                {ROSTER_SIZES.map((size) => <option key={size}>{size}</option>)}
              </select>
            </label>
            <label>Sports you represent<input name="sports" placeholder="e.g. Hockey, Basketball" /></label>
            <fieldset className={styles.wide}>
              <legend>Interested in</legend>
              <div className={styles.pills}>
                {INTERESTS.map((option) => (
                  <label key={option} data-checked={interest === option || undefined}>
                    <input type="radio" name="interest" value={option} checked={interest === option} onChange={() => setInterest(option)} />
                    {option === "Demo" ? "A demo of endo" : option === "Valuation" ? "A deal valuation" : "Both"}
                  </label>
                ))}
              </div>
            </fieldset>
            <label className={styles.wide}><span>How did you hear about us? <em>Optional</em></span><input name="heardAbout" /></label>
            <label className={styles.trap} aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
          </div>
          {error && <p className={styles.error} role="alert">{error}</p>}
          <div className={styles.actions}>
            <button className={`${pageStyles.demoButton} ${styles.submit}`} type="submit" disabled={submitting}>
              <span>{submitting ? "Saving…" : "Continue to pick a time"}</span>
              <span className={pageStyles.demoButtonArrow} aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M5 12h14M13.5 6.5 19 12l-5.5 5.5" /></svg>
              </span>
            </button>
            <p>We’ll only use this to prepare for your call.</p>
          </div>
        </form>
      ) : (
        <div className={`${styles.card} ${styles.calendarCard}`}>
          <p className={styles.calendarIntro}>
            {step === "booked" ? `You’re booked, ${details?.firstName}. A calendar invite is on its way.` : `Thanks, ${details?.firstName}. Now pick a time that works for you.`}
          </p>
          {calendarFailed ? (
            <p className={styles.error}>The calendar didn’t load. <a href={CALENDLY_URL} target="_blank" rel="noreferrer">Open it in a new tab</a>.</p>
          ) : (
            <div ref={calendarRef} className={styles.calendar}><p className={styles.loading}>Loading available times…</p></div>
          )}
        </div>
      )}
    </div>
  );
}

// The page the visitor clicked "Request a demo" on, when they came from elsewhere on this site.
function sourcePage() {
  try {
    const referrer = new URL(document.referrer);
    return referrer.origin === window.location.origin ? referrer.pathname + referrer.hash : "";
  } catch {
    return "";
  }
}
