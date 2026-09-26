import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import { REPORT_REQUEST_URL } from "@/lib/contact";
import { DemoButton, SiteFooter, SiteHeader } from "../site-chrome";
import { DiaGradient } from "../dia-gradient";
import { MotionObserver } from "../motion-observer";
import { MarketabilityScore } from "./marketability-score";
import pageStyles from "../page.module.css";
import styles from "./endo-deals.module.css";

const title = "endo.deals — Know what the endorsement is worth";
const description = "Understand an athlete’s marketability, explore comparable deals, and take a defensible endorsement valuation into your next negotiation.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary", title, description },
};

const STEPS = [
  { number: "01", title: "Start with the deal.", body: "The value is in the details. Begin with the athlete and the opportunity you are actually negotiating.", items: ["Athlete, sport and league", "Deliverables and deal category", "Term, territory and exclusivity"] },
  { number: "02", title: "Find the right context.", body: "Use the athlete’s marketability and the shape of the deal to understand the comparable set.", items: ["Athletes with similar marketability", "Relevant endorsement agreements", "Context for scope and term"] },
  { number: "03", title: "Make the case.", body: "Bring a recommended figure, a valuation range and the reasons behind them into the conversation.", items: ["A recommended valuation", "A range with confidence", "The drivers behind the number"] },
] as const;

const DELIVERABLES = [
  { name: "Instagram in-feed post", quantity: 8, total: 76000 },
  { name: "Instagram story set", quantity: 7, total: 28000 },
  { name: "Short-form video", quantity: 3, total: 18000 },
  { name: "Public appearance", quantity: 1, total: 3680 },
] as const;

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const exampleTotal = DELIVERABLES.reduce((sum, item) => sum + item.total, 0);

const QUESTIONS = [
  { question: "What does the marketability score tell me?", answer: "It brings social analytics, performance, earned media, and league and market context into one view of the athlete. The four factors help explain the score and identify relevant comparable talent. The deal’s specific scope still matters when translating that context into a price." },
  { question: "Where do comparable deals fit in?", answer: "Comparable endorsement agreements give the recommendation a market reference. The athlete, deliverable mix, term, territory and exclusivity help explain which agreements are relevant to the opportunity in front of you." },
  { question: "What if there is no obvious comparable?", answer: "That is a reason to look more closely at the context and confidence behind the recommendation. Bring the opportunity to the endo team to discuss the available comparisons, the assumptions and what the range can support." },
  { question: "Can I request a report for a live opportunity?", answer: "Yes. Request an endo.deal report and tell us about the athlete, brand and proposed scope. The endo team will follow up to discuss the opportunity and the details needed for a valuation." },
] as const;

export default function EndoDealsPage() {
  return (
    <div className={pageStyles.page}>
      <MotionObserver />
      <SiteHeader current="/endo-deals" />

      <main id="top">
        <section className={styles.hero} aria-labelledby="deals-heading">
          <h1 id="deals-heading">Never quote a number you can’t defend</h1>
          <p className={styles.intro}>Negotiate better endorsements with a clear view of your athlete’s value.</p>
          <div className={styles.actions}>
            <DemoButton href={REPORT_REQUEST_URL} label="Request an endo.deal report" />
          </div>
        </section>

        <section className={styles.scoreSection} aria-labelledby="score-heading">
          <div className={styles.scoreHeading}>
            <h2 id="score-heading">A fuller picture of marketability.</h2>
            <p>Four perspectives on an athlete’s value, brought into one score out of 100. Explore what goes into each.</p>
          </div>
          <MarketabilityScore />
          <p className={styles.exampleNote}>Illustrative score and factor values. This example does not represent a client or a live valuation.</p>
        </section>

        <section id="how-it-works" className={styles.section} aria-labelledby="method-heading">
          <div className={styles.sectionHeading}>
            <h2 id="method-heading">The reasoning behind the number.</h2>
            <p>A score starts the conversation. The deal’s scope and comparable agreements put the opportunity in context.</p>
          </div>
          <div className={styles.steps}>
            {STEPS.map((step) => (
              <article className={styles.step} key={step.number}>
                <span className={styles.stepNumber}>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
                <ul>{step.items.map((item) => <li key={item}><Check size={15} aria-hidden="true" /><span>{item}</span></li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.reportSection} aria-labelledby="report-heading">
          <div className={styles.reportLayout}>
          <div className={styles.sectionHeading}>
            <h2 id="report-heading">A number you can build a case around.</h2>
            <p>See the deliverables, the recommended figure and the range together. Everything you need to make the next conversation more concrete.</p>
          </div>
          <article className={styles.report} aria-label="Illustrative endorsement valuation report">
            <div className={styles.receiptBrand}>
              <Image src="/brand/endo-logo-dark.png" alt="endo" width={2826} height={1214} sizes="80px" />
            </div>
            <h3 className={styles.reportTitle}>An annual apparel partnership.</h3>
            <p className={styles.reportSubtitle}>Illustrative basketball athlete · Exclusive · North America · USD</p>
            <dl className={styles.reportMeta}>
              <div><dt>Deal term</dt><dd>12 months</dd></div>
              <div><dt>Marketability</dt><dd>87 / 100</dd></div>
              <div><dt>Confidence</dt><dd>91%</dd></div>
            </dl>
            <table className={styles.table}>
              <caption className="sr-only">Example deliverables and their illustrative values in US dollars</caption>
              <thead><tr><th scope="col">Deliverable</th><th scope="col">Qty</th><th scope="col">Value</th></tr></thead>
              <tbody>{DELIVERABLES.map((item) => <tr key={item.name}><td>{item.name}</td><td>{item.quantity}</td><td>{money.format(item.total)}</td></tr>)}</tbody>
            </table>
            <div className={styles.reportTotal}>
              <div className={styles.totalLine}><span>Recommended valuation</span><strong>{money.format(exampleTotal)}</strong></div>
              <p className={styles.rangeCaption}>Estimated valuation range</p>
              <div className={styles.range} aria-hidden="true"><i /></div>
              <div className={styles.rangeLabels}><span>$104,000</span><span>$148,000</span></div>
            </div>
            <p className={styles.reportFootnote}>All figures are illustrative and show the report format. They are not a quote, a published client result or a guarantee of deal value.</p>
          </article>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="questions-heading">
          <div className={styles.sectionHeading}><h2 id="questions-heading">Before you put a number on it.</h2></div>
          <div className={styles.faq}>
            {QUESTIONS.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}
          </div>
        </section>
      </main>

      <div className={pageStyles.closingRegion}>
        <DiaGradient className={pageStyles.closingGradient} />
        <section className={pageStyles.closing} aria-labelledby="deals-closing-heading">
          <div className={pageStyles.closingCopy}>
            <h2 id="deals-closing-heading">Bring the opportunity.<br />We’ll bring the context.</h2>
            <DemoButton href={REPORT_REQUEST_URL} label="Request an endo.deal report" />
          </div>
        </section>
        <SiteFooter />
      </div>
    </div>
  );
}
