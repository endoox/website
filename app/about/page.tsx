import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import { SOCIAL_LINKS } from "@/lib/contact";
import pageStyles from "../page.module.css";
import { DemoButton, SiteFooter, SiteHeader } from "../site-chrome";
import { OurWhy } from "./our-why";
import styles from "./about.module.css";
import { shareMetadata } from "@/lib/share-metadata";

const title = "About · endo";
const description = "endo is built by operators and agents who’ve lived the business. Meet the team giving sports agencies the tools to run their business and value their talent.";

export const metadata: Metadata = {
  title,
  description,
  ...shareMetadata(title, description),
};

const TEAM = [
  { name: "Michael Boushy", role: "Co-founder & CEO", image: "/team/michael-boushy-portrait.png", cropY: "3.5%", mobileCropY: "11%", linkedin: "https://www.linkedin.com/in/michaelboushy/" },
  { name: "Jack Lavorato", role: "Co-founder & COO", image: "/team/jack-lavorato-portrait.png", cropY: "31.6%", mobileCropY: "22.2%", linkedin: "https://www.linkedin.com/in/jackalavorto/" },
  { name: "Anthony Baxter", role: "Co-founder & Founding Engineer", image: "/team/anthony-baxter-portrait.png", cropY: "39.4%", mobileCropY: "25.4%", linkedin: "https://www.linkedin.com/in/anthonybax/" },
  { name: "Matteo Tanzi", role: "Senior Product Engineer", image: "/team/matteo-tanzi-portrait.png", cropY: "23.7%", mobileCropY: "19.1%", linkedin: "https://www.linkedin.com/in/matteospencertanzi/" },
] as const;

const PRINCIPLES = [
  { title: "Customers write the roadmap.", body: "Every feature in endo started as a request from an agency using it. If it doesn’t save someone time or win someone money, it doesn’t ship." },
  { title: "Talent comes first.", body: "Agencies are our customers. Talent is who we answer to. Every number we produce has to hold up in front of the person it’s about." },
  { title: "Simple wins.", body: "Agents don’t have time to learn software. If something takes more than a minute to figure out, we rebuild it until it doesn’t." },
] as const;

export default function AboutPage() {
  return (
    <div className={`${pageStyles.page} ${styles.aboutPage}`}>
      <SiteHeader current="/about" />

      <main id="top">
        <section className={styles.hero} aria-labelledby="about-heading">
          <div className={styles.in}>
            <h1 id="about-heading" className={pageStyles.scrollReveal} data-scroll-reveal>
              <span>Talent is undervalued.</span> <span>Agents are on their own.</span> <em>We’re changing both.</em>
            </h1>
            <div className={`${styles.heroSide} ${pageStyles.scrollReveal}`} data-scroll-reveal>
              <p>endo is the software behind modern sports agencies. We give agents the tools to run their whole business, and the numbers to show what their talent is really worth.</p>
              <div className={styles.heroActions}>
                <DemoButton />
                <a className={styles.secondary} href="#film">Watch the film</a>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.filmSection} id="film" aria-label="Launch film">
          <div className={styles.in}>
            {/* 1080p web encode of Endo_Ad_4K.mp4; loads only once someone presses play. */}
            <video className={styles.film} src="/about/launch-film.mp4" poster="/about/launch-film-poster.jpg" controls playsInline preload="none" aria-label="endo launch film" />
          </div>
        </section>

        <OurWhy />

        <section className={styles.light} aria-labelledby="build-heading">
          <div className={styles.in}>
            <div className={`${styles.head} ${pageStyles.scrollReveal}`} data-scroll-reveal>
              <h2 id="build-heading">Built alongside agents, not for them.</h2>
              <p>We sit in on the calls, the negotiations and the late nights. That’s where the roadmap comes from.</p>
            </div>
            <div className={styles.principles}>
              {PRINCIPLES.map((principle) => (
                <article className={pageStyles.scrollReveal} data-scroll-reveal key={principle.title}>
                  <h3>{principle.title}</h3>
                  <p>{principle.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.light} ${styles.team}`} id="team" aria-labelledby="team-heading">
          <div className={styles.in}>
            <div className={`${styles.head} ${pageStyles.scrollReveal}`} data-scroll-reveal>
              <h2 id="team-heading">The people behind endo.</h2>
              <p>Operators, builders and people who’ve lived the business from the inside.</p>
            </div>
            <div className={styles.teamGrid}>
              {TEAM.map((member) => (
                <a className={`${styles.founder} ${pageStyles.scrollReveal}`} data-scroll-reveal href={member.linkedin} target="_blank" rel="noreferrer" aria-label={`${member.name}, ${member.role}, on LinkedIn`} key={member.name}>
                  <div className={styles.founderPhoto} style={{ "--portrait-y": member.cropY, "--portrait-mobile-y": member.mobileCropY } as CSSProperties}>
                    <Image src={member.image} alt={member.name} fill sizes="(max-width: 760px) 90vw, (max-width: 980px) 45vw, 270px" />
                  </div>
                  <div className={styles.founderMeta}>
                    <div><b>{member.name}</b><span>{member.role}</span></div>
                    <span className={styles.linkedin}>
                      <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4v11H3zM9.5 9.75h3.8v1.5h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1v5.45h-4v-4.83c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.91h-4z" /></svg>
                    </span>
                  </div>
                </a>
              ))}
            </div>
            {SOCIAL_LINKS.some((link) => link.href) && (
              <div className={`${styles.follow} ${pageStyles.scrollReveal}`} data-scroll-reveal>
                <p>Follow along as we build endo.</p>
                <div>
                  {SOCIAL_LINKS.filter((link) => link.href).map((link) => (
                    <a className={styles.secondary} href={link.href} target="_blank" rel="noreferrer" key={link.label}>
                      <SocialIcon label={link.label} />
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function SocialIcon({ label }: { label: string }) {
  return label === "LinkedIn" ? (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4v11H3zM9.5 9.75h3.8v1.5h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1v5.45h-4v-4.83c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.91h-4z" /></svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
  );
}
