import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import {
  BRAND_COLOURS, BRAND_KIT_ZIP, COMPANY_LINKEDIN, CONTACTS, DEMO_VIDEO_URL, DRIVE_URL, FAQ, HUB, INTRO_STEPS, INTRO_SUBJECT, INTRO_TEMPLATE, INTRO_TEXT,
  KEY_POINTS, LOGO_FILES, ONE_PAGER_PDF, PRESS_ORDER,
} from "@/content/partners";
import { PRESS } from "@/lib/press";
import { TESTIMONIALS } from "@/lib/proof";
import pageStyles from "../page.module.css";
import { CopyButton, DemoVideo, Greeting, PartnerGate, SectionNav } from "./client";
import { OnePager } from "./one-pager";
import styles from "./partners.module.css";
import { watchUrl, youtubeId } from "./youtube";

// endo partners: the hub for people who introduce agencies to endo. Not linked from the main site,
// not in the sitemap and kept out of search. All copy and links live in content/partners.ts.
export const metadata: Metadata = {
  title: "endo partners",
  description: "Resources for endo partners.",
  robots: { index: false, follow: false },
};

const SECTIONS = [
  { id: "demo", label: "Demo" },
  { id: "key-points", label: "Key points" },
  { id: "one-pager", label: "One-pager" },
  { id: "proof", label: "Proof" },
  { id: "intro", label: "Make an intro" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
  { id: "brand-kit", label: "Brand kit" },
] as const;

// The press list in the order set in content/partners.ts; any outlet not listed there follows, newest first.
const pressInHubOrder = () => {
  const rank = (outlet: string) => {
    const index = PRESS_ORDER.indexOf(outlet as (typeof PRESS_ORDER)[number]);
    return index === -1 ? PRESS_ORDER.length : index;
  };
  return [...PRESS].sort((a, b) => rank(a.outlet) - rank(b.outlet));
};

// A new email in the partner's own mail app, Mike copied, with the intro template filled in.
const introMailto = `mailto:?cc=${CONTACTS[0].email}&subject=${encodeURIComponent(INTRO_SUBJECT)}&body=${encodeURIComponent(INTRO_TEMPLATE)}`;

const formatDate = (date: string) => new Date(`${date}T00:00:00`).toLocaleDateString("en-US", { month: "long", year: "numeric" });

function DriveLink({ className }: { className: string }) {
  if (!DRIVE_URL) return null;
  return <a className={className} href={DRIVE_URL} target="_blank" rel="noreferrer">Open the Google Drive ↗</a>;
}

function SectionHead({ id, index, title, children }: { id: string; index: number; title: string; children?: ReactNode }) {
  return (
    <div className={styles.sectionHead}>
      <p className={styles.index}>{String(index).padStart(2, "0")}</p>
      <h2 id={id}>{title}</h2>
      {children && <p className={styles.lede}>{children}</p>}
    </div>
  );
}

export default function PartnersPage() {
  const videoId = youtubeId(DEMO_VIDEO_URL);

  return (
    <div className={`${pageStyles.page} ${styles.partners}`}>
      <PartnerGate>
        <header className={styles.bar}>
          <div className={styles.barInner}>
            <a className={styles.barBrand} href="#top" aria-label="endo partners, back to top">
              <Image src="/resources/endo-logo-full-colour.png" alt="" width={2826} height={1214} sizes="96px" priority />
              <span>partners</span>
            </a>
            <SectionNav sections={SECTIONS} />
          </div>
        </header>

        <main id="top" className={styles.hub}>
          <header className={styles.welcome}>
            <h1><Greeting /></h1>
            <p>{HUB.intro}</p>
          </header>

          {/* The three things partners need most, before anything else. */}
          <section className={styles.tldr} aria-labelledby="tldr-heading">
            <h2 id="tldr-heading">TL;DR</h2>
            <ul>
              <li>
                <h3>Demo video</h3>
                <p>A walkthrough of endo to send an agency.</p>
                {videoId ? (
                  <CopyButton className={styles.primary} text={watchUrl(videoId)} label="Copy video link" copiedLabel="Link copied" />
                ) : (
                  <button className={styles.primary} type="button" disabled>Video link coming soon</button>
                )}
              </li>
              <li>
                <h3>One-pager</h3>
                <p>endo on a single page, as a PDF to attach.</p>
                <a className={styles.primary} href={`/resources/${ONE_PAGER_PDF}`} download>Download one-pager <span aria-hidden="true">↓</span></a>
              </li>
              <li>
                <h3>Outreach message</h3>
                <p>The intro to send the agency, by email or text, copying Mike.</p>
                <div className={styles.tldrActions}>
                  <CopyButton className={styles.primary} text={INTRO_TEMPLATE} label="Copy email" copiedLabel="Email copied" />
                  <CopyButton className={styles.secondary} text={INTRO_TEXT} label="Copy text" copiedLabel="Text copied" />
                </div>
              </li>
            </ul>
          </section>

          <section id="demo" className={styles.section} aria-labelledby="demo-heading">
            <h2 id="demo-heading" className={styles.visuallyHidden}>Demo</h2>
            <DemoVideo videoId={videoId} />
          </section>

          <section id="key-points" className={styles.section} aria-labelledby="key-points-heading">
            <SectionHead id="key-points-heading" index={1} title="Key points">What endo does for an agency, in the words agents use.</SectionHead>
            <ul className={styles.points}>
              {KEY_POINTS.map((point) => (
                <li key={point.title}>
                  <h3>{point.title}</h3>
                  <p>{point.body}</p>
                </li>
              ))}
            </ul>
          </section>

          <section id="one-pager" className={styles.section} aria-labelledby="one-pager-heading">
            <SectionHead id="one-pager-heading" index={2} title="One-pager">A one-page summary of endo to share or print.</SectionHead>
            <div className={styles.kitActions}>
              <a className={styles.primary} href={`/resources/${ONE_PAGER_PDF}`} download>Download PDF <span aria-hidden="true">↓</span></a>
            </div>
            <OnePager />
          </section>

          <section id="proof" className={styles.section} aria-labelledby="proof-heading">
            <SectionHead id="proof-heading" index={3} title="Proof">What agencies say about endo, and what the press has written.</SectionHead>
            <h3 className={styles.subhead}>In their words</h3>
            <ul className={styles.quotes}>
              {TESTIMONIALS.map((testimonial) => (
                <li key={testimonial.name}>
                  <blockquote>“{testimonial.quote}”</blockquote>
                  <div className={styles.quotePerson}>
                    <Image src={testimonial.image} alt="" width={96} height={96} sizes="40px" />
                    <div><b>{testimonial.name}</b><span>{testimonial.role}</span></div>
                  </div>
                </li>
              ))}
            </ul>
            <h3 className={styles.subhead}>Press</h3>
            <ul className={styles.press}>
              {pressInHubOrder().map((item) => (
                <li key={item.href}>
                  {/* As on the press page: the article's image, or the endo logo on navy when there isn't one. */}
                  <a className={item.image ? styles.pressImage : `${styles.pressImage} ${styles.pressLogo}`} href={item.href} target="_blank" rel="noreferrer" tabIndex={-1} aria-hidden="true">
                    <Image src={item.image ?? "/brand/endo-logo-white-gradient.png"} alt="" fill sizes="(max-width: 960px) 100vw, 540px" />
                  </a>
                  <p className={styles.pressMeta}>{item.outlet} · {formatDate(item.date)}</p>
                  <a className={styles.pressTitle} href={item.href} target="_blank" rel="noreferrer">{item.title}</a>
                  <div className={styles.pressActions}>
                    <a href={item.href} target="_blank" rel="noreferrer">Read the article ↗</a>
                    <CopyButton className={styles.copyLink} text={item.href} label="Copy link" copiedLabel="Link copied" />
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section id="intro" className={styles.section} aria-labelledby="intro-heading">
            <SectionHead id="intro-heading" index={4} title="How to make an intro">Send one email, and Mike takes it from there, with you on the calls whenever you like.</SectionHead>
            <ol className={styles.steps}>
              {INTRO_STEPS.map((step, index) => (
                <li key={step.title}>
                  <span>{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
            <div className={styles.template}>
              <div className={styles.templateHead}>
                <h3>Intro email</h3>
                <div className={styles.templateActions}>
                  <a className={styles.secondary} href={introMailto}>Open in email ↗</a>
                  <CopyButton className={styles.primary} text={INTRO_TEMPLATE} label="Copy intro" copiedLabel="Copied to clipboard" />
                </div>
              </div>
              <pre>{INTRO_TEMPLATE}</pre>
            </div>
            <div className={styles.template}>
              <div className={styles.templateHead}>
                <h3>Intro text</h3>
                <div className={styles.templateActions}>
                  <CopyButton className={styles.primary} text={INTRO_TEXT} label="Copy text" copiedLabel="Copied to clipboard" />
                </div>
              </div>
              <pre>{INTRO_TEXT}</pre>
            </div>
          </section>

          <section id="faq" className={styles.section} aria-labelledby="faq-heading">
            <SectionHead id="faq-heading" index={5} title="FAQ" />
            <div className={styles.faq}>
              {FAQ.map((item) => (
                <details key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section id="contact" className={styles.section} aria-labelledby="contact-heading">
            <SectionHead id="contact-heading" index={6} title="Contact" />
            <ul className={styles.contacts}>
              {CONTACTS.map((contact) => (
                <li key={contact.email}>
                  <Image src={contact.image} alt="" width={240} height={240} sizes="64px" />
                  <h3>{contact.name}</h3>
                  <p className={styles.role}>{contact.role}</p>
                  <dl>
                    <div><dt>Email</dt><dd><a href={`mailto:${contact.email}`}>{contact.email}</a></dd></div>
                    {"linkedin" in contact && (
                      <div><dt>LinkedIn</dt><dd><a href={contact.linkedin} target="_blank" rel="noreferrer">{contact.linkedin.replace(/^https:\/\/www\./, "").replace(/\/$/, "")}</a></dd></div>
                    )}
                  </dl>
                </li>
              ))}
            </ul>
            <div className={styles.kitActions}>
              <a className={styles.secondary} href={COMPANY_LINKEDIN} target="_blank" rel="noreferrer">endo on LinkedIn ↗</a>
              <DriveLink className={styles.secondary} />
            </div>
          </section>

          <section id="brand-kit" className={styles.section} aria-labelledby="brand-kit-heading">
            <SectionHead id="brand-kit-heading" index={7} title="Brand kit">Logos and colours for decks, intros and anything else you share. Always write endo in lowercase.</SectionHead>
            <div className={styles.kitActions}>
              <a className={styles.primary} href={`/resources/${BRAND_KIT_ZIP}`} download>Download all <span aria-hidden="true">↓</span></a>
              <DriveLink className={styles.secondary} />
            </div>
            <ul className={styles.logos}>
              {LOGO_FILES.map((logo) => (
                <li key={logo.file}>
                  <div className={styles.logoTile} style={{ background: logo.background }}>
                    <Image src={`/resources/${logo.file}`} alt={`endo logo, ${logo.name.toLowerCase()}`} width={logo.width} height={logo.height} sizes="320px" />
                  </div>
                  <div className={styles.logoMeta}>
                    <span>{logo.name}</span>
                    <a href={`/resources/${logo.file}`} download>PNG <span aria-hidden="true">↓</span></a>
                  </div>
                </li>
              ))}
            </ul>
            <ul className={styles.swatches}>
              {BRAND_COLOURS.map((colour) => (
                <li key={colour.hex}>
                  <CopyButton
                    className={styles.swatch}
                    text={colour.hex}
                    copiedLabel="Copied"
                    label={
                      <>
                        <i style={{ background: colour.hex }} aria-hidden="true" />
                        <b>{colour.name}</b>
                        <code>{colour.hex}</code>
                        <small>{colour.use}</small>
                      </>
                    }
                  />
                </li>
              ))}
            </ul>
            <p className={styles.note}>Click a colour to copy its hex code.</p>
          </section>
        </main>
      </PartnerGate>
    </div>
  );
}
