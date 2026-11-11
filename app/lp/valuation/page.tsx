import type { Metadata } from "next";
import bookStyles from "../../book/book.module.css";
import pageStyles from "../../page.module.css";
import { TransparentVideo } from "../../product-demo-media";
import { DemoButton, SiteFooter, SiteHeader } from "../../site-chrome";
import { LpValuationForm } from "./lp-valuation-form";
import styles from "./lp-valuation.module.css";

// LinkedIn ad landing page for the free valuation report. Kept out of search and the sitemap; the form
// fires the LinkedIn conversion on submit (lib/linkedin.ts).
const title = "Free valuation report · endodeals";
const description = "Get a free endodeals valuation report in 24 hours, and go into your next brand negotiation with leverage.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: false, follow: false },
};

export default function LpValuationPage() {
  return (
    <div className={pageStyles.page}>
      <SiteHeader />

      <main id="top" className={`${bookStyles.book} ${styles.page}`}>
        <header className={bookStyles.head}>
          <h1>Don’t you wish you had leverage in your next brand negotiation?</h1>
          <p>Get a free valuation report in 24 hours</p>
        </header>
        {/* The home page's valuation clip on the left, the form on the right. */}
        <div className={styles.layout}>
          <div className={styles.visual}>
            <TransparentVideo className={styles.video} name="valuation" />
          </div>
          <LpValuationForm />
        </div>
      </main>

      <SiteFooter action={<DemoButton href="#top" label="Get my free report" />} />
    </div>
  );
}
