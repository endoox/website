import pageStyles from "../page.module.css";
import { DemoButton, SiteFooter, SiteHeader } from "../site-chrome";
import { DiaGradient } from "../dia-gradient";
import { MotionObserver } from "../motion-observer";
import { TeamPhotoTexture } from "./team-photo-texture";
import styles from "./about.module.css";

const TEAM = [
  {
    name: "Michael Boushy",
    role: "Co-founder & CEO",
    bio: "Ex-Consultant at Wasserman · U Sports athlete and Academic All-Canadian",
    image: "/team/michael-boushy-upscaled.png",
    linkedin: "https://www.linkedin.com/in/michaelboushy/",
  },
  {
    name: "Jack Lavorato",
    role: "Co-founder & COO",
    bio: "Founder at Paper Route Publishing · 2× house league all-star",
    image: "/team/jack-lavorato-upscaled.png",
    linkedin: "https://www.linkedin.com/in/jackalavorto/",
  },
  {
    name: "Anthony Baxter",
    role: "Co-founder & Founding Engineer",
    bio: "UMass & RPI graduate · NCAA Division I athlete",
    image: "/team/anthony-baxter-upscaled.png",
    linkedin: "https://www.linkedin.com/in/anthonybax/",
  },
] as const;

const TALKING_POINTS = [
  {
    "title": "Time",
    "body": "Agents spend their days digging through inboxes instead of building careers. endo runs the book so they can focus on what they do best."
  },
  {
    "title": "Revenue",
    "body": "Talent has been underpaid because nobody could prove their marketing value. endo puts a real number behind every deal."
  },
  {
    "title": "Transparency",
    "body": "Talent and their families deserve to see what's being done for them. endo gives everyone the same view."
  },
  {
    "title": "Status",
    "body": "The next generation of talent picks agencies that look like the future. endo is how a modern agency runs."
  }
] as const;

export default function AboutPage() {
  return (
    <div className={`${pageStyles.page} ${styles.aboutPage}`}>
      <MotionObserver />

      <SiteHeader current="/about" />

      <main id="top">
        <section className={`${pageStyles.hero} ${styles.aboutHero}`} aria-labelledby="about-heading">
          <div className={`${pageStyles.heroCopy} ${styles.aboutHeroCopy}`}>
            <h1 id="about-heading">Athletes are undervalued. Agents are on their own. We’re changing both.</h1>
            <div className={styles.aboutHeroBody}>
              <p>
                Endorsement pricing has always happened in the dark. We think the people doing the work deserve to see the same numbers as the people paying for it.
              </p>
              <p>
                Agents have always worn every hat, with no one in their corner. We built endo to be that support: a clear valuation before every negotiation, a live roster view, a breakdown of every deal, and social and earned media analytics. Everything else in the platform is there because our customers asked for it.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.talkSection} aria-labelledby="talk-heading">
          <div className={styles.talkInner}>
            <div className={`${styles.talkHeading} ${pageStyles.scrollReveal}`} data-scroll-reveal>
              <h2 id="talk-heading">Why we built endo</h2>
            </div>
            <div className={styles.talkGrid}>
              {TALKING_POINTS.map((point) => (
                <article className={`${styles.talkItem} ${pageStyles.scrollReveal}`} data-scroll-reveal key={point.title}>
                  <h3>{point.title}</h3>
                  <p>{point.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${pageStyles.stories} ${styles.aboutTeam}`} id="team" aria-labelledby="team-heading">
          <div className={`${pageStyles.sectionHeading} ${styles.teamHeading}`}>
            <h2 id="team-heading">The people behind endo.</h2>
          </div>
          <div className={styles.teamGrid}>
            {TEAM.map((member) => (
              <article className={`${styles.teamCard} ${pageStyles.scrollReveal}`} data-scroll-reveal key={member.name}>
                <TeamPhotoTexture className={styles.teamPhoto} image={member.image} label={member.name} />
                <div className={styles.teamCardBody}>
                  <h3>{member.name}</h3>
                  <p className={styles.teamRole}>{member.role}</p>
                  <p className={styles.teamBio}>{member.bio}</p>
                  <a className={styles.teamLinkedIn} href={member.linkedin} target="_blank" rel="noreferrer">
                    <span className={styles.linkedinIcon} aria-hidden="true">in</span>
                    <span>LinkedIn</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>



        <div className={`${pageStyles.closingRegion} ${styles.aboutClosingRegion}`}>
          <DiaGradient className={pageStyles.closingGradient} />
          <section className={pageStyles.closing} aria-labelledby="closing-heading">
            <div
              className={`${pageStyles.closingCopy} ${pageStyles.scrollReveal}`}
              data-scroll-reveal
            >
              <h2 id="closing-heading">See what every endorsement is really worth.</h2>
              <div><DemoButton /></div>
            </div>
          </section>

          <SiteFooter />
        </div>
      </main>
    </div>
  );
}
