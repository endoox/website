import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DEMO_URL } from "@/lib/contact";
import { CUSTOMER_STORIES, formatStoryDate, relatedStories } from "@/lib/customer-stories";
import pageStyles from "../../page.module.css";
import { DemoButton, SiteFooter, SiteHeader } from "../../site-chrome";
import { Wordmark } from "../../wordmark";
import { StoryCard } from "../story-card";
import styles from "../stories.module.css";
import { shareMetadata } from "@/lib/share-metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return CUSTOMER_STORIES.map((story) => ({ slug: story.slug }));
}

const findStory = (slug: string) => CUSTOMER_STORIES.find((story) => story.slug === slug);

export async function generateMetadata({ params }: PageProps<"/customer-stories/[slug]">): Promise<Metadata> {
  const story = findStory((await params).slug);
  if (!story) return {};
  const title = `${story.title} · endo`;
  return {
    title,
    description: story.summary,
    ...shareMetadata(title, story.summary, { url: story.cover, alt: story.title }),
  };
}

// Turns markdown-style [label](https://…) links in story text into links.
const withLinks = (text: string) =>
  text.split(/(\[[^\]]+\]\([^)]+\))/).map((part, i) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    return link ? <a href={link[2]} target="_blank" rel="noreferrer" key={i}>{link[1]}</a> : part;
  });

export default async function CustomerStoryPage({ params }: PageProps<"/customer-stories/[slug]">) {
  const story = findStory((await params).slug);
  if (!story) notFound();

  return (
    <div className={`${pageStyles.page} ${styles.storiesPage}`}>
      <SiteHeader />

      <main id="top">
        <header className={`${styles.in} ${styles.hero}`}>
          <Link className={styles.back} href="/customer-stories">← All customer stories</Link>
          <h1>{story.title}</h1>
          <p className={styles.meta}>
            <time dateTime={story.date}>{formatStoryDate(story.date)}</time> · {story.readMinutes} min read
          </p>
        </header>

        <div className={`${styles.in} ${styles.coverWrap}`}>
          <div className={styles.cover}>
            <Image src={story.cover} alt={story.title} fill sizes="(max-width: 996px) 100vw, 940px" priority />
          </div>
        </div>

        <div className={`${styles.in} ${styles.storyBody}`}>
          <aside className={styles.aside} aria-label="Story details">
            <h2>In this story</h2>
            <ul className={styles.people}>
              {story.people.map((person) => (
                <li className={styles.person} key={person.name}>
                  {person.image && (
                    <span className={styles.avatar} aria-hidden="true">
                      <Image src={person.image} alt="" fill sizes="44px" />
                    </span>
                  )}
                  <span>
                    <strong>{person.name}</strong>
                    <span>{person.title ?? person.org}</span>
                  </span>
                </li>
              ))}
            </ul>
            {story.website && (
              <a className={styles.site} href={story.website} target="_blank" rel="noreferrer">
                Visit {story.people[0]?.org} ↗
              </a>
            )}
            <h2>endo features</h2>
            <ul className={styles.products}>
              {story.products.map((product) => <li key={product}><Wordmark text={product} /></li>)}
            </ul>
            <DemoButton className={styles.asideButton} />
          </aside>

          <article className={styles.article}>
            {story.body.map((block, i) => {
              if (block.type === "h2") return <h2 key={i}>{block.text}</h2>;
              if (block.type === "quote") {
                return (
                  <blockquote key={i}>
                    <p>“{block.text}”</p>
                    {block.by && <footer>{block.by}</footer>}
                  </blockquote>
                );
              }
              return <p key={i}>{withLinks(block.text)}</p>;
            })}
            <p className={styles.cta}>To learn more about endo, <a href={DEMO_URL}>request a demo</a>.</p>
          </article>
        </div>

        <section className={styles.related} aria-labelledby="related-heading">
          <div className={styles.in}>
            <div className={styles.relatedHead}>
              <h2 id="related-heading">Similar stories</h2>
              <Link href="/customer-stories">All customer stories →</Link>
            </div>
            <div className={styles.grid}>
              {relatedStories(story).map((other) => <StoryCard story={other} key={other.slug} />)}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
