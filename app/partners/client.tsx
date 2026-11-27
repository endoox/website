"use client";

import Image from "next/image";
import { createContext, useContext, useEffect, useState, type FormEvent, type ReactNode } from "react";
import { ENTRY, PARTNER_CODES } from "@/content/partners";
import { embedUrl, watchUrl } from "./youtube";
import styles from "./partners.module.css";

const STORAGE_KEY = "endo-partner-code";

// The signed-in partner's name, for the hub's greeting.
const PartnerName = createContext("");

const findPartner = (code: string) => PARTNER_CODES.find((partner) => partner.code.toLowerCase() === code.trim().toLowerCase());

function readStoredCode() {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}
function storeCode(code: string | null) {
  try {
    if (code) localStorage.setItem(STORAGE_KEY, code);
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage can be blocked (private mode, site data off); they'll just see the gate next time.
  }
}

// The partner code gate. Cosmetic only: codes ship in the page's code (content/partners.ts), so nothing
// private sits behind it. A remembered code skips straight to the hub.
export function PartnerGate({ children }: { children: ReactNode }) {
  const [state, setState] = useState<"checking" | "locked" | "open">("checking");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const partner = findPartner(readStoredCode());
    // Runs once after hydration, since the stored code only exists in the browser.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(partner ? "open" : "locked");
    if (partner) setName(partner.partnerName);
  }, []);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const partner = findPartner(code);
    if (!partner) {
      setError("That code doesn’t match. Check it and try again, or ask your endo contact for yours.");
      return;
    }
    storeCode(partner.code);
    setName(partner.partnerName);
    setState("open");
    window.scrollTo({ top: 0 });
  }

  function leave() {
    storeCode(null);
    setCode("");
    setError("");
    setState("locked");
  }

  // Blank until the stored code is checked, so returning partners don't see the gate flash.
  if (state === "checking") return <div className={styles.checking} />;

  if (state === "locked") {
    return (
      <main className={styles.entry}>
        <Image className={styles.entryLogo} src="/resources/endo-logo-full-colour.png" alt="endo" width={2826} height={1214} sizes="200px" priority />
        <div className={styles.entryMain}>
          <div className={styles.entryBody}>
            <p className={styles.entryEyebrow}>Partner access</p>
            <h1>{ENTRY.title}</h1>
            <p className={styles.entryLine}>{ENTRY.line}</p>
            <p className={styles.entryOffer}>{ENTRY.offer}</p>
            <form className={styles.codeForm} onSubmit={onSubmit} noValidate>
              <label htmlFor="partner-code">Enter your partner code</label>
              <div>
                <input
                  id="partner-code"
                  value={code}
                  onChange={(event) => {
                    setCode(event.target.value);
                    setError("");
                  }}
                  autoComplete="off"
                  autoCapitalize="none"
                  spellCheck={false}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? "partner-code-error" : undefined}
                  autoFocus
                />
                <button type="submit">
                  Enter
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13.5 6.5 19 12l-5.5 5.5" /></svg>
                </button>
              </div>
              <p id="partner-code-error" className={styles.codeError} role="alert">{error}</p>
            </form>
          </div>
          <div className={styles.entryVisual}>
            <Image src="/hero/hero-devices.png" alt="endo on a laptop and a phone: the agency home dashboard and the mobile app's Today view" width={3000} height={1770} sizes="(max-width: 960px) 100vw, 55vw" priority />
          </div>
        </div>
        <p className={styles.entryFoot}>Not a partner yet? Email <a href="mailto:jack@endodeals.com">jack@endodeals.com</a>.</p>
      </main>
    );
  }

  return (
    <div className={styles.opened}>
      <PartnerName.Provider value={name}>{children}</PartnerName.Provider>
      <p className={styles.leave}><button type="button" onClick={leave}>Sign out of the partner hub</button></p>
    </div>
  );
}

export function Greeting() {
  const name = useContext(PartnerName);
  return <>{name ? `Welcome, ${name}` : "Welcome to endo partners"}</>;
}

// Copies text and briefly says so on the button.
export function CopyButton({ text, label, copiedLabel = "Copied", className }: { text: string; label: ReactNode; copiedLabel?: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      // Clipboard can be blocked; the text is still on the page to copy by hand.
    }
  }

  return (
    <button className={className} type="button" onClick={copy} data-copied={copied || undefined}>
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </button>
  );
}

// The demo: our own poster frame, and the YouTube player only once it's clicked.
export function DemoVideo({ videoId }: { videoId: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className={styles.video}>
      <div className={styles.player}>
        {playing ? (
          <iframe
            src={embedUrl(videoId)}
            title="endo product demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button className={styles.poster} type="button" onClick={() => setPlaying(true)} disabled={!videoId} aria-label={videoId ? "Play the endo product demo" : undefined}>
            <Image src="/hero/hero-devices.png" alt="" width={3000} height={1770} sizes="(max-width: 1180px) 100vw, 1120px" />
            {videoId ? (
              <span className={styles.play} aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" /></svg></span>
            ) : (
              <span className={styles.soon}>Demo video coming soon</span>
            )}
          </button>
        )}
      </div>
      {videoId && (
        <div className={styles.videoLinks}>
          <CopyButton className={styles.copyLink} text={watchUrl(videoId)} label="Copy link" copiedLabel="Link copied" />
          <a className={styles.watch} href={watchUrl(videoId)} target="_blank" rel="noreferrer">Watch on YouTube ↗</a>
        </div>
      )}
    </div>
  );
}

// Highlights the section in view in the sticky nav.
export function SectionNav({ sections }: { sections: readonly { id: string; label: string }[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-120px 0px -55% 0px" },
    );
    for (const section of sections) {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className={styles.sectionNav} aria-label="Partner hub sections">
      {sections.map((section) => (
        <a href={`#${section.id}`} key={section.id} aria-current={active === section.id ? "true" : undefined}>{section.label}</a>
      ))}
    </nav>
  );
}
