"use client";

import { FormEvent, useState } from "react";
import { DEMO_URL } from "@/lib/contact";
import styles from "./request-demo.module.css";


export function DemoRequestForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={styles.formSuccess} role="status">
        <span className={styles.successMark} aria-hidden="true">✓</span>
        <h2>Thanks — we have the context.</h2>
        <p>Choose a time that works and we&apos;ll come prepared for the conversation.</p>
        <a className={styles.formButton} href={DEMO_URL} target="_blank" rel="noreferrer">
          Choose a time <span aria-hidden="true">↗</span>
        </a>
        <button className={styles.editButton} type="button" onClick={() => setSubmitted(false)}>
          Edit details
        </button>
      </div>
    );
  }

  return (
    <form className={styles.demoForm} onSubmit={handleSubmit}>
      <div className={styles.formFields}>
        <label>
          <span>Your name</span>
          <input name="name" type="text" autoComplete="name" placeholder="Jane Smith" required />
        </label>
        <label>
          <span>Work email</span>
          <input name="email" type="email" autoComplete="email" placeholder="jane@agency.com" required />
        </label>
        <label>
          <span>Agency name</span>
          <input name="agency" type="text" autoComplete="organization" placeholder="Your agency" required />
        </label>
        <label>
          <span>Agency size</span>
          <select name="agencySize" defaultValue="" required>
            <option value="" disabled>Select a range</option>
            <option value="1-3">1–3 people</option>
            <option value="4-10">4–10 people</option>
            <option value="11-25">11–25 people</option>
            <option value="26+">26+ people</option>
          </select>
        </label>
        <label>
          <span>Your role</span>
          <input name="role" type="text" autoComplete="organization-title" placeholder="Founder, agent, operator…" required />
        </label>
        <label>
          <span>How did you hear about us?</span>
          <select name="source" defaultValue="" required>
            <option value="" disabled>Select one</option>
            <option value="referral">Referral</option>
            <option value="search">Search</option>
            <option value="social">Social media</option>
            <option value="event">Event or newsletter</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label className={styles.formFieldWide}>
          <span>What would you like to solve?</span>
          <textarea name="goals" rows={4} placeholder="A sentence or two about your agency and what you want to see." />
        </label>
      </div>
      <button className={styles.formButton} type="submit">
        Continue to scheduling <span aria-hidden="true">↗</span>
      </button>
      <p className={styles.formNote}>We&apos;ll use these details to make the demo useful, not to fill your inbox.</p>
    </form>
  );
}
