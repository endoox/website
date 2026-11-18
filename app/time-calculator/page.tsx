import type { Metadata } from "next";
import pageStyles from "../page.module.css";
import { SiteFooter, SiteHeader } from "../site-chrome";
import { TimeCalculator } from "./time-calculator";
import styles from "./time-calculator.module.css";
import { shareMetadata } from "@/lib/share-metadata";

const title = "Agency time calculator · endo";
const description = "Six questions estimate the hours a month your agents get back by running deals, media kits, negotiations, payments and athlete requests through endo.";

export const metadata: Metadata = {
  title,
  description,
  ...shareMetadata(title, description),
};

const FAQ = [
  ["Is the calculator free?", "Yes. No email needed to see your result."],
  ["How accurate is the estimate?", "It is a starting point. Volumes come from you; the minutes and shares are endo estimates. Swap in your own numbers in the table above for a closer read."],
  ["Which tasks does it count?", "Deal and contract entry, brand pitches and media kits, deal negotiations, payment processing, athlete requests, and weekly social and stats tracking for your roster. Recruiting, negotiating and relationship work are left out on purpose."],
  ["Does endo do the work on its own?", "No. endo pulls social, performance and earned media data, builds media kits from an athlete’s deals and socials, delivers valuation reports and keeps deal financials in one place. Your agents review and decide."],
] as const;

export default function TimeCalculatorPage() {
  return (
    <div className={pageStyles.page}>
      <SiteHeader />

      <main id="top" className={styles.page}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>Agency time calculator</p>
          <h1>See how much of your agency’s week goes to admin.</h1>
          <p>Six questions estimate the hours a month your agents get back by running deals, media kits, negotiations, payments and athlete requests through endo. Every assumption is shown below and can be changed.</p>
        </header>

        <TimeCalculator />

        <section className={styles.info} aria-label="How the calculator works">
          <div>
            <h2>How it works</h2>
            <p>For each task the calculator multiplies three numbers: how often it happens at your agency, the minutes of manual work each one takes, and the share endo takes on.</p>
            <p className={styles.formula}>Hours saved a week = weekly volume × minutes each × share taken on</p>
            <p>Monthly answers are converted at 4.33 weeks a month. Working days assume 8 hours. The dollar figure multiplies the hours saved in a year by $45, the loaded hourly cost of an agent.</p>
            <p>It counts the manual work endo removes (re-typing deal terms, pulling follower counts, building kits, chasing payment status), not the judgment your agents keep. Every pitch, contract and payment is still handled by a person at your agency.</p>
          </div>
          <div>
            <h2>Questions</h2>
            {FAQ.map(([question, answer]) => (
              <details className={styles.faq} key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
