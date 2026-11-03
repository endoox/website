import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CUSTOMER_STORIES } from "@/lib/customer-stories";
import pageStyles from "../page.module.css";
import { DemoButton, SiteFooter, SiteHeader } from "../site-chrome";
import { StoryCard } from "./story-card";
import styles from "./stories.module.css";
import { shareMetadata } from "@/lib/share-metadata";

const title = "Customer Stories · endo";
const description = "How sports agencies run their business on endo.";

export const metadata: Metadata = {
  title,
  description,
  ...shareMetadata(title, description),
};

export default function CustomerStoriesPage() {
  const [featured] = CUSTOMER_STORIES;
  if (!featured) notFound();
  const href = `/customer-stories/${featured.slug}`;

  return (
    <div className={`${pageStyles.page} ${styles.storiesPage}`}>
      <SiteHeader />

      <main id="top">
        <div className={styles.featuredWrap}>
          <section className={styles.featured} aria-labelledby="featured-heading">
            <div className={pageStyles.scrollReveal} data-scroll-reveal>
              <p className={styles.eyebrow}>Customer stories</p>
              <h1 id="featured-heading"><Link href={href}>{featured.title}</Link></h1>
              <p>{featured.summary}</p>
              <DemoButton href={href} label="Read more" />
            </div>
            <Link className={`${styles.featuredImage} ${pageStyles.scrollReveal}`} data-scroll-reveal href={href} tabIndex={-1} aria-hidden="true">
              <Image src={featured.cover} alt="" fill sizes="(max-width: 900px) 100vw, 640px" priority />
            </Link>
          </section>
        </div>

        {/* Like Teamworks, the grid repeats the featured story so the list is complete. */}
        <section className={`${styles.in} ${styles.list}`} aria-labelledby="all-heading">
          <h2 id="all-heading">All stories</h2>
            <div className={styles.grid}>
              {CUSTOMER_STORIES.map((story) => <StoryCard story={story} key={story.slug} />)}
            </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
