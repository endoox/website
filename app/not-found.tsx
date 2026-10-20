import type { Metadata } from "next";
import Link from "next/link";
import pageStyles from "./page.module.css";
import { DemoButton, SiteFooter, SiteHeader } from "./site-chrome";
import styles from "./not-found.module.css";
import { Wordmark } from "./wordmark";

export const metadata: Metadata = {
  title: "Page not found · endo",
  robots: { index: false },
};

// Missing pages keep the site's header and footer and point somewhere useful instead of a dead end.
export default function NotFound() {
  return (
    <div className={pageStyles.page}>
      <SiteHeader />

      <main id="top" className={styles.main}>
        <p className={styles.code}>404</p>
        <h1>This page isn’t here.</h1>
        <p>It may have moved, or the link may be wrong. Here’s where most people head next.</p>
        <div className={styles.actions}>
          <DemoButton />
        </div>
        <nav className={styles.links} aria-label="Popular pages">
          <Link href="/">Home</Link>
          <Link href="/#features">Features</Link>
          <Link href="/endo-deals"><Wordmark text="endodeals" /></Link>
          <Link href="/about">About</Link>
        </nav>
      </main>

      <SiteFooter />
    </div>
  );
}
