import type { Metadata } from "next";
import Image from "next/image";
import { CALL_COVERS } from "@/lib/contact";
import { BookFlow } from "../../book/book-flow";
import bookStyles from "../../book/book.module.css";
import pageStyles from "../../page.module.css";
import { DemoButton, SiteFooter, SiteHeader } from "../../site-chrome";
import styles from "./lp-demo.module.css";

// Ad landing page for endo as agency management software ("Every deal. Every contract. One place." and
// "It's all on endo." creatives). Kept out of search and the sitemap; the form is the booking page's,
// locked to a demo.
const title = "Book a demo · endo";
const description = "Every deal. Every contract. One place. Run your sports agency out of one platform.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: false, follow: false },
};

// The questions from the "It's all on endo." creative.
const QUESTIONS = [
  "Where’s the Northstar contract?",
  "Did Velocity Auto pay us yet?",
  "When is Tyler’s next post due?",
  "What’s his engagement this month?",
  "What should we counter Apex at?",
] as const;

export default function LpDemoPage() {
  return (
    <div className={pageStyles.page}>
      <SiteHeader />

      <main id="top" className={`${bookStyles.book} ${styles.page}`}>
        <header className={bookStyles.head}>
          <p className={styles.eyebrow}>Built for sports agents</p>
          <h1>Every deal. Every contract. One place.</h1>
          <p>Run your sports agency out of one platform.</p>
        </header>

        {/* The home page's laptop and phone on the left, the form on the right. */}
        <div className={styles.layout}>
          <BookFlow initialInterest="Demo" fixedInterest="Demo" />
          <div className={styles.side}>
            <div className={styles.devices}>
              <Image
                src="/hero/hero-devices.png"
                alt="endo on a laptop and a phone: the agency home dashboard with the day's schedule, earned media, commissions and deals needing attention, and the mobile app's Today view"
                width={3000}
                height={1770}
                sizes="(max-width: 960px) 100vw, 680px"
                priority
              />
            </div>
            <aside className={`${bookStyles.aside} ${styles.aside}`} aria-label="About the call">
              <div className={bookStyles.host}>
                <span className={bookStyles.avatar}><Image src="/team/michael-boushy-portrait.png" alt="" width={1080} height={1440} sizes="168px" /></span>
                <div>
                  <p>You’ll meet</p>
                  <b>Michael Boushy</b>
                  <span>Co-founder & CEO</span>
                </div>
              </div>
              <p className={bookStyles.duration}>30-minute video call</p>
              <h2>What we’ll cover</h2>
              <ul>
                {CALL_COVERS.Demo.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </aside>
          </div>
        </div>

        <section className={styles.allOn} aria-labelledby="all-on-heading">
          <div className={styles.thread} aria-label="Questions a talent marketing team asks every day">
            <p>To: Talent marketing</p>
            <ul>
              {QUESTIONS.map((question) => <li key={question}>{question}</li>)}
            </ul>
          </div>
          <div className={styles.answer}>
            <h2 id="all-on-heading">It’s all on <span>endo.</span></h2>
            <p>Software for the modern sports agent.</p>
            <DemoButton href="#top" label="Book a demo" />
          </div>
        </section>
      </main>

      <SiteFooter action={<DemoButton href="#top" label="Book a demo" />} />
    </div>
  );
}
