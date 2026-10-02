"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { isScheduledMessage, loadCalendly } from "@/lib/calendly";
import { CALENDLY_DEMO_URL } from "@/lib/contact";
import { ATHLETE_OPTIONS, HELP_OPTIONS, ROLE_OPTIONS, type DemoRequest } from "@/lib/demo-request";
import styles from "./contact.module.css";

type Step = "form" | "calendar" | "booked";
type Lead = { leadId: string; name: string; email: string; utm: Record<string, string> };

const FIELD_ERRORS: Record<keyof DemoRequest, string> = {
  name: "Please enter your name.",
  email: "Please enter a valid email address.",
  role: "Please choose the option that best describes you.",
  athletes: "Please choose a range.",
  helpWith: "Please choose what you want help with.",
  sports: "Please tell us which sports you operate in.",
};

const COPY: Record<Step, { title: string; body: (email: string) => string }> = {
  form: { title: "See endo in action.", body: () => "Tell us a bit about your business and we'll match you with the right walkthrough." },
  calendar: { title: "Pick a time that works.", body: (email) => `Thanks, your details are in. Choose a slot and we'll send the invite to ${email}.` },
  booked: { title: "You're booked.", body: (email) => `The calendar invite is on its way to ${email}. Talk soon.` },
};

// Step 1 saves the answers as a lead (/api/contact). Step 2 embeds the Calendly calendar with the lead ID
// attached as utm_content, so the booking can be matched back to the lead in the sheet.
export function DemoRequestForm() {
  const [step, setStep] = useState<Step>("form");
  const [lead, setLead] = useState<Lead>();
  const [errors, setErrors] = useState<(keyof DemoRequest)[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [calendarFailed, setCalendarFailed] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setErrors([]);

    const fields = Object.fromEntries(new FormData(event.currentTarget)) as Record<string, string>;
    const params = new URLSearchParams(window.location.search);
    const utm = {
      utmSource: params.get("utm_source") ?? "",
      utmMedium: params.get("utm_medium") ?? "",
      utmCampaign: params.get("utm_campaign") ?? "",
    };

    let leadId = "";
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, ...utm, sourcePage: document.referrer }),
      });
      const result = await response.json().catch(() => ({}));
      if (response.status === 400 && Array.isArray(result.errors)) {
        setErrors(result.errors);
        setSubmitting(false);
        return;
      }
      leadId = typeof result.leadId === "string" ? result.leadId : "";
    } catch {
      // Network trouble: still show the calendar so the booking isn't lost. The webhook records it by email.
    }

    setLead({ leadId, name: fields.name.trim(), email: fields.email.trim(), utm });
    setStep("calendar");
    setSubmitting(false);
  }

  useEffect(() => {
    if (step === "form" || !lead) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
    let cancelled = false;
    loadCalendly()
      .then(() => {
        if (cancelled || !calendarRef.current || calendarRef.current.childElementCount) return;
        window.Calendly?.initInlineWidget({
          url: `${CALENDLY_DEMO_URL}?hide_gdpr_banner=1&primary_color=4b7cd1`,
          parentElement: calendarRef.current,
          prefill: { name: lead.name, email: lead.email },
          utm: { ...lead.utm, utmContent: lead.leadId || undefined },
        });
      })
      .catch(() => setCalendarFailed(true));

    const onMessage = (message: MessageEvent) => {
      if (!isScheduledMessage(message)) return;
      setStep("booked");
      if (!lead.leadId) return;
      const { event, invitee } = message.data.payload;
      fetch("/api/contact/booked", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId: lead.leadId, eventUri: event.uri, inviteeUri: invitee.uri }),
        keepalive: true,
      }).catch(() => {}); // The Calendly webhook records the booking too.
    };
    window.addEventListener("message", onMessage);
    return () => {
      cancelled = true;
      window.removeEventListener("message", onMessage);
    };
    // Runs once per lead; moving from "calendar" to "booked" keeps the same embed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lead]);

  const copy = COPY[step];
  const errorFor = (field: keyof DemoRequest) => (errors.includes(field) ? FIELD_ERRORS[field] : undefined);

  return (
    <div className={styles.layout}>
      <div className={styles.intro}>
        <h1 aria-live="polite">{copy.title}</h1>
        <p>{copy.body(lead?.email ?? "")}</p>
      </div>

      <div className={styles.panel}>
        {step === "form" ? (
          <form className={styles.form} onSubmit={onSubmit}>
            <Field label="Name" required error={errorFor("name")}>
              <input name="name" type="text" autoComplete="name" required maxLength={120} />
            </Field>

            <Field label="Email" required error={errorFor("email")}>
              <input name="email" type="email" autoComplete="email" required maxLength={200} />
            </Field>

            <Field label="Which best describes you?" required error={errorFor("role")}>
              <select name="role" required defaultValue="">
                <option value="" disabled>Select…</option>
                {ROLE_OPTIONS.map((option) => <option key={option}>{option}</option>)}
              </select>
            </Field>

            <Field label="How many athletes do you represent?" error={errorFor("athletes")}>
              <select name="athletes" defaultValue="">
                <option value="">Select…</option>
                {ATHLETE_OPTIONS.map((option) => <option key={option}>{option}</option>)}
              </select>
            </Field>

            <fieldset className={styles.field} aria-invalid={errors.includes("helpWith") || undefined}>
              <legend>What&apos;s the main thing you want help with? <span aria-hidden="true">*</span></legend>
              <div className={styles.choices}>
                {HELP_OPTIONS.map((option) => (
                  <label className={styles.choice} key={option}>
                    <input type="radio" name="helpWith" value={option} required />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              {errorFor("helpWith") && <p className={styles.error}>{errorFor("helpWith")}</p>}
            </fieldset>

            <Field label="What sports do you operate in?" required error={errorFor("sports")}>
              <input name="sports" type="text" required maxLength={200} placeholder="e.g. Hockey, basketball" />
            </Field>

            {/* Honeypot for bots. Hidden from people and screen readers. */}
            <div className={styles.honeypot} aria-hidden="true">
              <label>Website <input name="website" type="text" tabIndex={-1} autoComplete="off" /></label>
            </div>

            <button className={styles.submit} type="submit" disabled={submitting}>
              {submitting ? "Sending…" : "Request demo"}
            </button>
          </form>
        ) : calendarFailed ? (
          <div className={styles.calendarFallback}>
            <p>The calendar couldn&apos;t load here.</p>
            <a className={styles.submit} href={calendarLink(lead)} target="_blank" rel="noreferrer">Open the calendar</a>
          </div>
        ) : (
          <div className={styles.calendar} ref={calendarRef} />
        )}
      </div>
    </div>
  );
}

// The same booking on calendly.com, with the lead ID kept in utm_content so it still matches the lead.
function calendarLink(lead?: Lead) {
  if (!lead) return CALENDLY_DEMO_URL;
  const params = new URLSearchParams({ name: lead.name, email: lead.email });
  if (lead.leadId) params.set("utm_content", lead.leadId);
  if (lead.utm.utmSource) params.set("utm_source", lead.utm.utmSource);
  if (lead.utm.utmMedium) params.set("utm_medium", lead.utm.utmMedium);
  if (lead.utm.utmCampaign) params.set("utm_campaign", lead.utm.utmCampaign);
  return `${CALENDLY_DEMO_URL}?${params}`;
}

function Field({ label, required = false, error, children }: { label: string; required?: boolean; error?: string; children: ReactNode }) {
  return (
    <label className={styles.field} data-invalid={error ? "" : undefined}>
      <span className={styles.label}>{label}{required && <span aria-hidden="true"> *</span>}</span>
      {children}
      {error && <span className={styles.error}>{error}</span>}
    </label>
  );
}
