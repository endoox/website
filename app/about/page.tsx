import Link from "next/link";
import pageStyles from "../page.module.css";
import { Brand, DemoButton } from "../page";
import { DiaGradient } from "../dia-gradient";
import { FloatingHeader } from "../floating-header";
import { MobileMenu } from "../mobile-menu";
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
    title: "Numbers or silence",
    body: "We publish figures when we have them and say nothing when we do not. No adjective does work a fact should do.",
  },
  {
    title: "Coverage, not headcount",
    body: "We report the leagues our athletes compete in. A roster total invites a comparison to a marketplace and answers the wrong question.",
  },
  {
    title: "AI is plumbing",
    body: "There is a model behind valuation because pricing is a modelling problem. It is never the pitch.",
  },
  {
    title: "Agent language",
    body: "The book, the recap, the signing, what he is worth. The buyer universe is a few dozen people who all know each other and can hear an outsider in one sentence.",
  },
] as const;

export default function AboutPage() {
  return (
    <div className={`${pageStyles.page} ${styles.aboutPage}`}>
      <MotionObserver />

      <FloatingHeader>
        <Link className={pageStyles.brandLink} href="/" aria-label="Endo home">
          <Brand />
        </Link>
        <nav className={pageStyles.headerNav} aria-label="Primary navigation">
          <Link href="/#features">Features</Link>
          <Link href="/#stories">Case studies</Link>
          <Link href="/#pricing">Pricing</Link>
          <Link href="/about">About</Link>
        </nav>
        <DemoButton className={pageStyles.headerButton} />
        <div className={pageStyles.mobileMenuSlot}>
          <MobileMenu homePath="/" />
        </div>
      </FloatingHeader>

      <main id="top">
        <section className={`${pageStyles.hero} ${styles.aboutHero}`} aria-labelledby="about-heading">
          <div className={`${pageStyles.heroCopy} ${styles.aboutHeroCopy}`}>
            <h1 id="about-heading">We built this from the side of the table you sit on.</h1>
            <div className={styles.aboutHeroBody}>
              <p>
                Endorsement pricing has never had a public market. Agents are left with instinct, follower counts, and the last deal they heard about, while brands hold better information than the people representing the athlete. That gap is where we work.
              </p>
              <p>
                Endo gives agents a defensible number before negotiations begin, then keeps a live view of the whole book afterward. The rest of the platform exists because agencies asked for it.
              </p>
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

        <section className={styles.talkSection} aria-labelledby="talk-heading">
          <div className={styles.talkInner}>
            <div className={`${styles.talkHeading} ${pageStyles.scrollReveal}`} data-scroll-reveal>
              <h2 id="talk-heading">How we talk about the work</h2>
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

          <footer className={pageStyles.footer}>
            <div
              className={`${pageStyles.footerTop} ${pageStyles.scrollReveal}`}
              data-scroll-reveal
            >
              <Link href="#top" aria-label="Endo home"><Brand footer /></Link>
              <p>The endorsement platform built for sports agencies.</p>
            </div>
            <div
              className={`${pageStyles.footerLinks} ${pageStyles.scrollReveal}`}
              data-scroll-reveal
            >
              <div><p>Platform</p><Link href="/#features">Features</Link><Link href="/#stories">Case studies</Link><Link href="/#testimonials">Testimonials</Link></div>
              <div><p>Company</p><Link href="/about">About</Link><Link href="/about#team">Our team</Link><a href="mailto:admin@endodeals.com">Contact</a></div>
              <div><p>Legal</p><a href="https://www.endodeals.com/privacy">Privacy policy</a><a href="https://www.endodeals.com/terms">Terms of service</a></div>
            </div>
            <div
              className={`${pageStyles.footerBottom} ${pageStyles.scrollReveal}`}
              data-scroll-reveal
            ><span>© 2026 Endo. All rights reserved.</span><Link href="#top">Back to top ↑</Link></div>
          </footer>
        </div>
      </main>
    </div>
  );
}
