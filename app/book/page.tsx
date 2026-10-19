import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { INTERESTS } from "@/lib/contact";
import pageStyles from "../page.module.css";
import { DemoButton, SiteFooter, SiteHeader } from "../site-chrome";
import { BookFlow } from "./book-flow";
import styles from "./book.module.css";
import { shareMetadata } from "@/lib/share-metadata";

const title = "Book a demo · endo";
const description = "Book a 30-minute call with endo’s co-founder. See endo with your roster in mind, or get a deal valued.";

export const metadata: Metadata = {
  title,
  description,
  ...shareMetadata(title, description),
};

// What the call covers, by what they asked for. "Both" gets the demo list plus the valuation line.
const COVERS = {
  Demo: [
    "A walkthrough of endo set up around your roster and sports",
    "How agencies track deals, deliverables and payments in one place",
    "Pricing and onboarding for an agency your size",
  ],
  Valuation: [
    "The deal you’re working on: the talent, the brand and any offer on the table",
    "How endodeals scores the talent and prices the full deal",
    "What’s in your report, and when you’ll get it",
  ],
  Both: [
    "A walkthrough of endo set up around your roster and sports",
    "How endodeals prices a deal you’re working on now",
    "Pricing and onboarding for an agency your size",
  ],
} as const;

// "Get a valuation" style links can preselect the interest with ?interest=Valuation.
export default async function BookPage({ searchParams }: PageProps<"/book">) {
  const wanted = (await searchParams).interest;
  const initialInterest = INTERESTS.find((option) => option.toLowerCase() === String(wanted ?? "").toLowerCase()) ?? INTERESTS[0];
  const valuation = initialInterest === "Valuation";

  return (
    <div className={pageStyles.page}>
      <SiteHeader />

      <main id="top" className={styles.book}>
        <header className={styles.head}>
          <h1>{valuation ? "Get your next deal valued." : "See endo with your roster in mind."}</h1>
          <p>
            {valuation
              ? "Tell us a little about your agency, then pick a time to walk us through the deal. It takes under a minute."
              : "Tell us a little about your agency, then pick a time that works. It takes under a minute."}
          </p>
        </header>
        <div className={styles.layout}>
          <BookFlow initialInterest={initialInterest} />
          <aside className={styles.aside} aria-label="About the call">
            <div className={styles.host}>
              <span className={styles.avatar}><Image src="/team/michael-boushy-portrait.png" alt="" width={1080} height={1440} sizes="168px" /></span>
              <div>
                <p>You’ll meet</p>
                <b>Michael Boushy</b>
                <span>Co-founder & CEO</span>
              </div>
            </div>
            <p className={styles.duration}>30-minute video call</p>
            <h2>What we’ll cover</h2>
            <ul>
              {COVERS[initialInterest].map((item) => <li key={item}>{item}</li>)}
            </ul>
            <figure className={styles.quote}>
              <blockquote>“Instead of going into brand conversations with assumptions, we now have credible data to support our pricing. It gives us real leverage.”</blockquote>
              <figcaption><b>Tyler Wagner</b> · Director of Marketing, Roy Sports Group</figcaption>
            </figure>
            <p className={styles.privacy}>
              Your details are only used to prepare for the call. See our <Link href="/privacy">privacy policy</Link>.
            </p>
          </aside>
        </div>
      </main>

      <SiteFooter title="Questions first? We’re happy to help." action={<DemoButton href="mailto:admin@endodeals.com" label="Email the team" />} />
    </div>
  );
}
