"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CALENDLY_URL } from "@/lib/contact";
import { readAttribution } from "./attribution";
import { CALENDLY_EMBED, loadCalendly } from "./calendly";
import styles from "./booking-widget.module.css";

// Pages that already have the booking form, where a second way in would compete with it.
const HIDDEN_ON = ["/book", "/free-valuation", "/lp/demo"];

// Floating calendar button in the bottom corner. It opens straight onto Calendly's time picker in a
// modal, skipping our booking form; Calendly's webhook still creates the lead in Attio (app/api/calendly).
export function BookingWidget() {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [opened, setOpened] = useState(false);
  const [failed, setFailed] = useState(false);

  // The calendar loads the first time the modal opens, then stays put so reopening is instant.
  useEffect(() => {
    const parent = calendarRef.current;
    if (!opened || !parent) return;
    const { utmSource, utmMedium, utmCampaign, utmContent } = readAttribution();
    loadCalendly()
      .then(() => {
        parent.replaceChildren();
        window.Calendly?.initInlineWidget({ url: CALENDLY_EMBED, parentElement: parent, utm: { utmSource, utmMedium, utmCampaign, utmContent } });
      })
      .catch(() => setFailed(true));
  }, [opened]);

  if (HIDDEN_ON.includes(pathname)) return null;

  const open = () => {
    dialogRef.current?.showModal();
    setOpened(true);
  };
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button className={styles.trigger} type="button" onClick={open} aria-label="Book a demo" aria-haspopup="dialog">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
          <path d="M3.5 10h17M8 3v4M16 3v4M8 14h.01M12 14h.01M16 14h.01M8 17.5h.01M12 17.5h.01" />
        </svg>
        <span className={styles.dot} aria-hidden="true" />
        <span className={styles.tip} aria-hidden="true">Book a demo</span>
      </button>

      {/* A click on the backdrop lands on the dialog itself, not its contents, and closes it. */}
      <dialog ref={dialogRef} className={styles.dialog} aria-labelledby="booking-widget-title" onClick={(event) => event.target === event.currentTarget && close()}>
        <div className={styles.panel}>
          <header className={styles.head}>
            <span className={styles.avatar}><Image src="/team/michael-boushy-portrait.png" alt="" width={1080} height={1440} sizes="112px" /></span>
            <div>
              <h2 id="booking-widget-title">Pick a time</h2>
              <p>Michael Boushy · Co-founder & CEO · 30-minute demo</p>
            </div>
            <button className={styles.close} type="button" onClick={close} aria-label="Close">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
            </button>
          </header>
          {failed ? (
            <p className={styles.error}>The calendar didn’t load. <a href={CALENDLY_URL} target="_blank" rel="noreferrer">Open it in a new tab</a>.</p>
          ) : (
            <div ref={calendarRef} className={styles.calendar}><p className={styles.loading}>Loading available times…</p></div>
          )}
        </div>
      </dialog>
    </>
  );
}
