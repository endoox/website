import Image from "next/image";
import Link from "next/link";
import type { CustomerStory } from "@/lib/customer-stories";
import pageStyles from "../page.module.css";
import styles from "./stories.module.css";

export function StoryCard({ story }: { story: CustomerStory }) {
  return (
    <Link className={`${styles.card} ${pageStyles.scrollReveal}`} data-scroll-reveal href={`/customer-stories/${story.slug}`}>
      <span className={styles.cardImage}>
        <Image src={story.cover} alt="" fill sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 400px" />
      </span>
      <h3>{story.title}</h3>
      <p>{story.summary}</p>
      <span className={styles.readMore}>Read more ›</span>
    </Link>
  );
}
