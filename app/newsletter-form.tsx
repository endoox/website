"use client";

import { useState, type FormEvent } from "react";
import { readAttribution } from "./attribution";
import styles from "./page.module.css";

// Footer email signup: a lighter step than booking a demo. Saved to Attio's "Newsletter" list (app/api/subscribe).
export function NewsletterForm() {
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    setState("sending");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: String(form.get("email") ?? ""),
          website: String(form.get("website") ?? ""),
          sourcePage: window.location.pathname,
          ...readAttribution(),
        }),
      });
      if (!response.ok) {
        const result = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(result.error ?? "Something went wrong. Please try again.");
      }
      setState("done");
    } catch (failure) {
      setError(failure instanceof Error && failure.message !== "Failed to fetch" ? failure.message : "Something went wrong. Please try again.");
      setState("idle");
    }
  }

  if (state === "done") return <p className={styles.newsletterDone} role="status">You’re on the list. Thanks!</p>;

  return (
    <form className={styles.newsletter} onSubmit={onSubmit}>
      <label htmlFor="newsletter-email">Get endo updates by email</label>
      <div>
        <input id="newsletter-email" name="email" type="email" autoComplete="email" placeholder="you@agency.com" required />
        <button type="submit" disabled={state === "sending"}>{state === "sending" ? "…" : "Subscribe"}</button>
      </div>
      <input className={styles.newsletterTrap} name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {error ? <p role="alert">{error}</p> : <p>Occasional news and product updates. Unsubscribe anytime.</p>}
    </form>
  );
}
