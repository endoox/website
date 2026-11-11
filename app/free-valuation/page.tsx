import type { Metadata } from "next";
import Link from "next/link";
import { AttributionCapture } from "../attribution";
import { BookFlow } from "../book/book-flow";
import bookStyles from "../book/book.module.css";
import pageStyles from "../page.module.css";
import { Brand } from "../site-chrome";
import styles from "./free-valuation.module.css";

// Landing page for the "free valuation report" ad. Kept out of search and the sitemap so only ad
// traffic lands here; the form is the booking page's, locked to a valuation.
const title = "Free valuation report · endodeals";
const description = "Find out what your athlete's deal is really worth, with a counter number and a walk-away floor. Your first endodeals report is free.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: false, follow: false },
};

const IN_REPORT = [
  ["The endodeals value", "A fair market range for the full deal, not just the posts."],
  ["Counter and floor", "The number to counter at, and the point to walk away."],
  ["Media equivalency value", "What each post, story, reel and video would cost to buy as paid media."],
  ["Brand match", "How the talent’s audience lines up with the brand’s."],
] as const;

export default function FreeValuationPage() {
  return (
    <div className={pageStyles.page}>
      <AttributionCapture />
      {/* No site navigation: the only next step on this page is the form. */}
      <header className={styles.bar}>
        <Link className={styles.brand} href="/" aria-label="endo home"><Brand /></Link>
      </header>

      <main id="top" className={`${bookStyles.book} ${styles.page}`}>
        <header className={bookStyles.head}>
          <p className={styles.eyebrow}>Free valuation report</p>
          <h1>A brand just made your athlete an offer. Is it fair?</h1>
          <p>
            Brands aren’t just buying posts. They’re buying usage rights, exclusivity and your athlete’s name. endodeals prices all of it,
            then hands you a counter number and a walk-away floor. Your first report is free.
          </p>
        </header>
        <div className={bookStyles.layout}>
          <BookFlow initialInterest="Valuation" valuationOnly />
          <aside className={bookStyles.aside} aria-label="What’s in your report">
            <p className={bookStyles.duration}>First report free · back in 24 hours</p>
            <h2>What’s in your report</h2>
            <ul className={styles.report}>
              {IN_REPORT.map(([name, detail]) => (
                <li key={name}><b>{name}</b>{detail}</li>
              ))}
            </ul>
            <p className={styles.note}>Your deals stay yours. Nothing you enter is shown to anyone else.</p>
            <figure className={bookStyles.quote}>
              <blockquote>“Instead of going into brand conversations with assumptions, we now have credible data to support our pricing. It gives us real leverage.”</blockquote>
              <figcaption><b>Tyler Wagner</b> · Director of Marketing, RSG Hockey</figcaption>
            </figure>
          </aside>
        </div>
      </main>

      <footer className={styles.footer}>
        <span>© 2026 endo. All rights reserved.</span>
        <nav aria-label="Legal">
          <Link href="/privacy">Privacy policy</Link>
          <Link href="/terms">Terms of service</Link>
        </nav>
      </footer>
    </div>
  );
}
