import type { Metadata } from "next";
import { INTERESTS } from "@/lib/contact";
import pageStyles from "../page.module.css";
import { DemoButton, SiteFooter, SiteHeader } from "../site-chrome";
import { BookFlow } from "./book-flow";
import styles from "./book.module.css";

export const metadata: Metadata = {
  title: "Book a demo · endo",
  description: "Tell us about your agency, then pick a time to see endo.",
  openGraph: { title: "Book a demo · endo", description: "Tell us about your agency, then pick a time to see endo.", url: "./", siteName: "endo", type: "website" },
  twitter: { card: "summary", title: "Book a demo · endo", description: "Tell us about your agency, then pick a time to see endo." },
};

// "Get a valuation" style links can preselect the interest with ?interest=Valuation.
export default async function BookPage({ searchParams }: PageProps<"/book">) {
  const wanted = (await searchParams).interest;
  const initialInterest = INTERESTS.find((option) => option.toLowerCase() === String(wanted ?? "").toLowerCase()) ?? INTERESTS[0];

  return (
    <div className={pageStyles.page}>
      <SiteHeader />

      <main id="top" className={styles.book}>
        <header className={styles.head}>
          <h1>See endo with your roster in mind.</h1>
          <p>Tell us a little about your agency, then pick a time that works. It takes under a minute.</p>
        </header>
        <BookFlow initialInterest={initialInterest} />
      </main>

      <SiteFooter title="Questions first? We’re happy to help." action={<DemoButton href="mailto:admin@endodeals.com" label="Email the team" />} />
    </div>
  );
}
