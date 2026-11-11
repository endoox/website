"use client";

import { useState, type FormEvent } from "react";
import { LINKEDIN_CONVERSIONS, trackLinkedIn } from "@/lib/linkedin";
import { readAttribution, UtmFields, utmValues } from "../../attribution";
import bookStyles from "../../book/book.module.css";
import pageStyles from "../../page.module.css";
import styles from "./lp-valuation.module.css";

// The /lp/valuation ad form: saved through the booking API as a valuation request (Attio person,
// "Demo requests" entry and a "Valuation request" note), then a thank-you instead of the calendar.
export function LpValuationForm() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState<{ firstName: string; email: string } | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const value = (name: string) => String(form.get(name) ?? "").trim();
    const [firstName = "", ...rest] = value("name").split(/\s+/);
    const lead = {
      firstName,
      lastName: rest.join(" "),
      email: value("email"),
      agency: value("agency"),
      sports: value("sport"),
      interest: "Valuation",
      dealTalent: value("athlete"),
      dealBrand: value("brand"),
      dealOffer: value("offer"),
      dealDeliverables: value("deliverables"),
      website: value("website"),
      sourcePage: window.location.pathname,
      ...readAttribution(),
      ...utmValues(form),
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
      // Unlike the booking page there's no calendar to fall back on, so they need to try again.
      setError("Something went wrong. Please try again.");
      return;
    } finally {
      setSubmitting(false);
    }
    trackLinkedIn(LINKEDIN_CONVERSIONS.lpValuation);
    setSent({ firstName, email: lead.email });
  }

  if (sent) {
    return (
      <div className={`${bookStyles.card} ${styles.thanks}`} role="status">
        <h2>Thanks, {sent.firstName}.</h2>
        <p>Your free valuation report is on its way. We’ll send it to <b>{sent.email}</b> within 24 hours.</p>
      </div>
    );
  }

  return (
    <form className={bookStyles.card} onSubmit={onSubmit}>
      <div className={bookStyles.grid}>
        <label className={bookStyles.wide}>Name<input name="name" autoComplete="name" required /></label>
        <label>Work email<input name="email" type="email" autoComplete="email" required /></label>
        <label>Agency<input name="agency" autoComplete="organization" required /></label>
        <label>Athlete name<input name="athlete" placeholder="Name or @handle" /></label>
        <label>Sport<input name="sport" placeholder="e.g. Hockey" /></label>
        <label>Brand<input name="brand" placeholder="e.g. Nike, or not yet" /></label>
        <label>Offer amount<input name="offer" placeholder="e.g. $15,000, or none yet" /></label>
        <label className={bookStyles.wide}>Deliverables<input name="deliverables" placeholder="e.g. 2 reels, 3 stories, usage rights" /></label>
        <label className={bookStyles.trap} aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
        <UtmFields />
      </div>
      {error && <p className={bookStyles.error} role="alert">{error}</p>}
      <div className={bookStyles.actions}>
        <button className={`${pageStyles.demoButton} ${bookStyles.submit}`} type="submit" disabled={submitting}>
          <span>{submitting ? "Sending…" : "Get my free report"}</span>
          <span className={pageStyles.demoButtonArrow} aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M5 12h14M13.5 6.5 19 12l-5.5 5.5" /></svg>
          </span>
        </button>
      </div>
    </form>
  );
}
