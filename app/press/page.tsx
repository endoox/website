import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PRESS } from "@/lib/press";
import pageStyles from "../page.module.css";
import { SiteFooter, SiteHeader } from "../site-chrome";
import styles from "./press.module.css";
import { shareMetadata } from "@/lib/share-metadata";

export const metadata: Metadata = {
  title: "Press · endo",
  description: "News and coverage of endo, the software behind modern sports agencies.",
  ...shareMetadata("Press · endo", "News and coverage of endo, the software behind modern sports agencies."),
};

const formatDate = (date: string) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

export default function PressPage() {
  if (PRESS.length === 0) notFound();

  return (
    <div className={`${pageStyles.page} ${styles.pressPage}`}>
      <SiteHeader />

      <main id="top" className={styles.main}>
        <h1>Press</h1>

        <div className={styles.grid}>
          {PRESS.map((item) => (
            <a className={`${styles.card} ${pageStyles.scrollReveal}`} data-scroll-reveal href={item.href} target="_blank" rel="noreferrer" key={item.href}>
              <span className={styles.image}>
                <Image src={item.image} alt="" fill sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 400px" />
              </span>
              <h2>{item.title}</h2>
              <p>{item.outlet} · <time dateTime={item.date}>{formatDate(item.date)}</time></p>
            </a>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
