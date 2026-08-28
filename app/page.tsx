import Image from "next/image";
import styles from "./page.module.css";
import { DiaGradient } from "./dia-gradient";
import { EndoAnimatedNotifications } from "./endo-animated-notifications";
import { EndoDealMarquee } from "./endo-deal-marquee";
import { EndoGlobe } from "./endo-globe";
import { EndoIntegrationBeam } from "./endo-integration-beam";
import { FloatingHeader } from "./floating-header";
import { HeroStats } from "./hero-stats";
import { MobileMenu } from "./mobile-menu";
import { MotionObserver } from "./motion-observer";
import { ProductDemoMedia } from "./product-demo-media";
import { PricingSection } from "../components/ui/pricing-section";

const TRUSTED_BY_LOGOS = [
  {
    name: "FarrWest Management",
    src: "/trusted-by/farrwest.png",
    width: 1053,
    height: 497,
    className: styles.logoFarrwest,
  },
  {
    name: "Peak Athletes",
    src: "/trusted-by/peak-athletes.png",
    width: 1200,
    height: 1200,
    className: styles.logoPeak,
  },
  {
    name: "Quartexx Management",
    src: "/trusted-by/quartexx.png",
    width: 343,
    height: 115,
    className: styles.logoQuartexx,
  },
  {
    name: "RSG Hockey",
    src: "/trusted-by/rsg-hockey.webp",
    width: 458,
    height: 93,
    className: styles.logoRsg,
  },
] as const;

const FEATURES = [
  {
    id: "valuation",
    eyebrow: "Endodeal valuation",
    title: "Walk into every negotiation knowing the number.",
    bullets: ["Contract comparables", "Athlete-specific drivers", "Defensible pricing"],
    mode: "valuation",
  },
  {
    id: "contracts",
    eyebrow: "Contract management",
    title: "Every agreement, term, and renewal in one place.",
    bullets: ["Centralized contracts", "Renewal reminders", "Clear approval history"],
    mode: "contracts",
  },
  {
    id: "roster",
    eyebrow: "Roster visibility",
    title: "See the whole business behind your roster.",
    bullets: ["Athlete-level views", "Live opportunity status", "Agency-wide visibility"],
    mode: "roster",
  },
  {
    id: "financials",
    eyebrow: "Financial tracking",
    title: "Know exactly what is paid, pending, and overdue.",
    bullets: ["Payment schedules", "Escalators and bonuses", "Revenue forecasting"],
    mode: "financials",
  },
  {
    id: "deliverables",
    eyebrow: "Deliverable tracking",
    title: "Keep every promise without chasing a spreadsheet.",
    bullets: ["Live obligation calendar", "Owner and due dates", "Completion history"],
    mode: "deliverables",
  },
  {
    id: "pipeline",
    eyebrow: "CRM and pipeline",
    title: "Turn every brand conversation into momentum.",
    bullets: ["Purpose-built CRM", "Shared relationship history", "Clear next steps"],
    mode: "pipeline",
  },
] as const;

type FeatureMode = (typeof FEATURES)[number]["mode"];

type FeatureMedia =
  | { type: "video"; src: string; poster: string; label: string }
  | { type: "image"; src: string; label: string; width: number; height: number };

const FEATURE_DEMOS: Record<FeatureMode, FeatureMedia> = {
  valuation: {
    type: "video",
    src: "/demos/valuation-demo.mp4",
    poster: "/demos/valuation-poster.webp",
    label: "Endo valuation workflow product demo",
  },
  contracts: {
    type: "video",
    src: "/demos/financial-demo.mp4",
    poster: "/demos/financial-poster.webp",
    label: "Endo contract and deal tracking product demo",
  },
  roster: {
    type: "video",
    src: "/demos/player-profile-demo.mp4",
    poster: "/demos/player-profile-poster.webp",
    label: "Endo athlete profile product demo",
  },
  financials: {
    type: "video",
    src: "/demos/financial-demo.mp4",
    poster: "/demos/financial-poster.webp",
    label: "Endo financial and deal tracking product demo",
  },
  deliverables: {
    type: "video",
    src: "/demos/deliverables-demo.mp4",
    poster: "/demos/deliverables-poster.webp",
    label: "Endo deliverable tracking product demo",
  },
  pipeline: {
    type: "image",
    src: "/demos/agent-dashboard.webp",
    label: "Endo live agency dashboard showing deals, athletes, revenue, payments, tasks, and notes",
    width: 1908,
    height: 922,
  },
};

const TESTIMONIALS = [
  {
    name: "Shelbi Kilcollins",
    role: "Director of Marketing · Quartexx Management",
    image: "/testimonials/shelbi-kilcollins.png",
    quote:
      "endo was the catalyst in our latest negotiation, helping us unlock 170% more value with a major blue-chip partner.",
  },
  {
    name: "Tyler Wagner",
    role: "Director of Marketing · Roy Sports Group",
    image: "/testimonials/tyler-wagner.png",
    quote:
      "Instead of going into brand conversations with assumptions, we now have credible data to support our pricing. It gives us real leverage.",
  },
  {
    name: "Farren Benjamin",
    role: "Founder · FarrWest Management",
    image: "/testimonials/farren-benjamin.png",
    quote:
      "Providing elite service means supporting the athlete's entire career. endo was the missing piece that let us demonstrate that commitment.",
  },
  {
    name: "Charlie Di Bratto",
    role: "Marketing · Quartexx Management",
    image: "/testimonials/charlie-di-bratto.png",
    quote:
      "endo saves us around 10 hours a week, and as our agency grows, that number is only going to increase.",
  },
  {
    name: "Nic Métayer",
    role: "Founder · Peak Athletes",
    image: "/testimonials/nic-metayer.png",
    quote:
      "This wasn't off-the-shelf. It was built with us, around the way a modern sports agency actually works.",
  },
] as const;

export function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <span className={`${styles.brandMark} ${footer ? styles.brandMarkFooter : ""}`}>
      <Image
        className={styles.brandMarkBase}
        src={footer ? "/brand/endo-logo-white-gradient.png" : "/brand/endo-logo-dark.png"}
        alt="Endo"
        width={2826}
        height={1214}
        sizes={footer ? "155px" : "132px"}
        priority={!footer}
      />
    </span>
  );
}

export function DemoButton({ className = "" }: { className?: string }) {
  return (
    <a
      className={`${styles.demoButton} ${className}`}
      href="https://calendly.com/will-8qc/30min"
      target="_blank"
      rel="noreferrer"
    >
      <span>Request a demo</span>
      <span className={styles.demoButtonArrow} aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M12 19V5M6.5 10.5 12 5l5.5 5.5" />
        </svg>
      </span>
    </a>
  );
}

function TrustedBy() {
  return (
    <div className={styles.trusted} aria-label="Trusted by leading sports agencies">
      <div className={styles.logoRow}>
        {TRUSTED_BY_LOGOS.map((logo) => (
          <div className={`${styles.logoItem} ${logo.className}`} key={logo.name}>
            <Image
              src={logo.src}
              alt={logo.name}
              width={logo.width}
              height={logo.height}
              sizes="(max-width: 720px) 120px, 180px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function FeatureNav() {
  return (
    <nav
      className={`${styles.featurePills} ${styles.scrollReveal}`}
      aria-label="Platform features"
      data-scroll-reveal
    >
      {FEATURES.map((feature, index) => (
        <a className={index === 0 ? styles.featurePillActive : ""} href={`#${feature.id}`} key={feature.id}>
          {feature.eyebrow.replace("Endodeal ", "")}
        </a>
      ))}
    </nav>
  );
}

function TestimonialCard({ testimonial }: { testimonial: (typeof TESTIMONIALS)[number] }) {
  return (
    <article className={styles.testimonialCard}>
      <div className={styles.testimonialPerson}>
        <Image src={testimonial.image} alt="" width={96} height={96} sizes="48px" />
        <div>
          <strong>{testimonial.name}</strong>
          <span>{testimonial.role}</span>
        </div>
      </div>
      <blockquote>“{testimonial.quote}”</blockquote>
    </article>
  );
}

export default function Home() {
  return (
    <div className={styles.page}>
      <MotionObserver />

      <FloatingHeader>
          <a className={styles.brandLink} href="#top" aria-label="Endo home">
            <Brand />
          </a>
          <nav className={styles.headerNav} aria-label="Primary navigation">
            <a href="#features">Features</a>
            <a href="#stories">Case studies</a>
            <a href="#pricing">Pricing</a>
            <a href="/about">About</a>
          </nav>
          <DemoButton className={styles.headerButton} />
          <div className={styles.mobileMenuSlot}>
            <MobileMenu />
          </div>
      </FloatingHeader>

      <main id="top">
        <section className={styles.hero} aria-labelledby="hero-heading">
          <div className={styles.heroCopy}>
            <h1 id="hero-heading">
              The endorsement platform built for sports agencies
            </h1>
            <p className={styles.heroSubhead}>
              Never miss a payment or deliverable, price every deal right, and get more time to do what you do best.
            </p>
          </div>
          <TrustedBy />
          <div
            className={styles.heroProduct}
            data-scroll-drift="20"
          >
            <Image
              className={styles.heroDashboard}
              src="/demos/agent-dashboard.webp"
              alt="Endo agent dashboard showing agency revenue, active deals, athletes, payments, and upcoming contracts"
              width={1908}
              height={922}
              priority
              sizes="(max-width: 760px) 900px, 1120px"
            />
          </div>
        </section>

        <section id="features" className={styles.featuresSection} aria-labelledby="features-heading">
          <div
            className={`${styles.featuresHeading} ${styles.scrollReveal}`}
            data-scroll-reveal
          >
            <h2 id="features-heading">
              Packed with features.
            </h2>
          </div>
          <FeatureNav />

          <div className={styles.featureStories}>
            {FEATURES.map((feature, index) => {
              const demo = FEATURE_DEMOS[feature.mode];

              return (
                <article id={feature.id} className={styles.featureStory} key={feature.id} data-scroll-reveal>
                  <div className={styles.featureCopy}>
                    <p>{feature.eyebrow}</p>
                    <h3>{feature.title}</h3>
                  </div>
                  <div
                    className={`${styles.featureVisual} ${index % 2 ? styles.featureVisualAlt : ""} ${demo ? styles.featureVisualDemo : ""}`}
                    data-scroll-drift={index % 2 ? "-14" : "14"}
                  >
                    {demo.type === "video" ? (
                      <div className={styles.productDemoFrame}>
                        <ProductDemoMedia label={demo.label} poster={demo.poster} src={demo.src} />
                      </div>
                    ) : (
                      <div className={styles.productDemoFrame}>
                        <Image
                          src={demo.src}
                          alt={demo.label}
                          width={demo.width}
                          height={demo.height}
                          sizes="(max-width: 760px) 100vw, 700px"
                        />
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className={styles.advantages} aria-labelledby="advantages-heading">
          <div
            className={`${styles.sectionHeading} ${styles.scrollReveal}`}
            data-scroll-reveal
          >
            <h2 id="advantages-heading">Less admin. Better decisions. More leverage.</h2>
          </div>
          <div className={styles.advantageGrid}>
            <article data-scroll-reveal>
              <h3>Move faster</h3>
              <p>Replace disconnected spreadsheets, inbox threads, and reminders with one live operating system.</p>
              <div className={`${styles.advantageVisual} ${styles.integrationVisual}`} aria-hidden="true">
                <EndoIntegrationBeam />
              </div>
            </article>
            <article data-scroll-reveal>
              <h3>Price with proof</h3>
              <p>Ground every recommendation in comparable deals and the value drivers that actually matter.</p>
              <div className={`${styles.advantageVisual} ${styles.dealMarqueeVisual}`} aria-hidden="true">
                <EndoDealMarquee />
              </div>
            </article>
            <article data-scroll-reveal>
              <h3>Build trust</h3>
              <p>Give agents, athletes, and leadership a shared view of what is happening and what comes next.</p>
              <div className={`${styles.advantageVisual} ${styles.rosterVisual}`} aria-hidden="true">
                <EndoAnimatedNotifications />
              </div>
            </article>
            <article data-scroll-reveal>
              <h3>Grow the roster</h3>
              <p>Give your team back the time and visibility it needs to create more value for every athlete.</p>
              <div className={`${styles.advantageVisual} ${styles.globeVisual}`} aria-hidden="true">
                <EndoGlobe className={styles.growthGlobe} />
                <div className={styles.globeFade} />
              </div>
            </article>
          </div>
        </section>

        <section id="stories" className={styles.stories} aria-labelledby="stories-heading">
          <div
            className={`${styles.sectionHeading} ${styles.scrollReveal}`}
            data-scroll-reveal
          >
            <h2 id="stories-heading">Success stories.</h2>
          </div>
          <article className={styles.story} data-scroll-reveal>
            <div className={styles.storyCopy}>
              <p>Quartexx Management</p>
              <h3>Unlocked 170% more value in a major brand negotiation.</h3>
              <div className={styles.storyPerson}>
                <Image src="/testimonials/shelbi-kilcollins.png" alt="" width={80} height={80} />
                <span><strong>Shelbi Kilcollins</strong>Director of Marketing</span>
              </div>
            </div>
            <div className={styles.storyPanel} data-scroll-drift="14">
              <p>Negotiation snapshot</p>
              <strong>170%</strong>
              <span>more value unlocked</span>
              <div className={styles.storyBars} aria-hidden="true"><i /><i /></div>
            </div>
          </article>
          <article className={`${styles.story} ${styles.storyReverse}`} data-scroll-reveal>
            <div className={styles.storyCopy}>
              <p>FarrWest Management</p>
              <h3>Made off-field success part of the athlete service model.</h3>
              <div className={styles.storyPerson}>
                <Image src="/testimonials/farren-benjamin.png" alt="" width={80} height={80} />
                <span><strong>Farren Benjamin</strong>Founder</span>
              </div>
            </div>
            <div className={styles.storyPanelLight} data-scroll-drift="-14">
              <Image
                className={styles.storyLaptopImage}
                src="/demos/dashboard-laptop.webp"
                alt="Endo agent dashboard displayed on a laptop"
                width={2200}
                height={1466}
                sizes="(max-width: 760px) 100vw, 700px"
              />
            </div>
          </article>
        </section>

        <section
          className={styles.impact}
          aria-labelledby="impact-heading"
          data-scroll-reveal
        >
          <div className={styles.impactHeading}>
            <h2 id="impact-heading">Built around the business of athlete value.</h2>
          </div>
          <HeroStats />
          <DemoButton className={styles.impactButton} />
        </section>

        <section id="testimonials" className={styles.testimonials} aria-labelledby="testimonials-heading">
          <div
            className={`${styles.sectionHeading} ${styles.scrollReveal}`}
            data-scroll-reveal
          >
            <h2 id="testimonials-heading">Agencies love Endo.</h2>
          </div>
          <div
            className={`${styles.testimonialViewport} ${styles.scrollReveal}`}
            data-scroll-reveal
          >
            <div className={styles.testimonialTrack}>
              {[false, true].map((duplicate) => (
                <div className={styles.testimonialGroup} aria-hidden={duplicate || undefined} key={String(duplicate)}>
                  {TESTIMONIALS.map((testimonial) => <TestimonialCard testimonial={testimonial} key={`${duplicate}-${testimonial.name}`} />)}
                </div>
              ))}
            </div>
          </div>
        </section>

        <PricingSection />
      </main>

      <div className={styles.closingRegion}>
        <DiaGradient className={styles.closingGradient} />
        <section className={styles.closing} aria-labelledby="closing-heading">
          <div
            className={`${styles.closingCopy} ${styles.scrollReveal}`}
            data-scroll-reveal
          >
            <h2 id="closing-heading">See what every endorsement is really worth.</h2>
            <div><DemoButton /></div>
          </div>
        </section>

        <footer className={styles.footer}>
          <div
            className={`${styles.footerTop} ${styles.scrollReveal}`}
            data-scroll-reveal
          >
            <a href="#top" aria-label="Endo home"><Brand footer /></a>
            <p>The endorsement platform built for sports agencies.</p>
          </div>
          <div
            className={`${styles.footerLinks} ${styles.scrollReveal}`}
            data-scroll-reveal
          >
            <div><p>Platform</p><a href="#features">Features</a><a href="#stories">Case studies</a><a href="#testimonials">Testimonials</a></div>
            <div><p>Company</p><a href="/about">About</a><a href="/about#team">Our team</a><a href="mailto:admin@endodeals.com">Contact</a></div>
            <div><p>Legal</p><a href="https://www.endodeals.com/privacy">Privacy policy</a><a href="https://www.endodeals.com/terms">Terms of service</a></div>
          </div>
          <div
            className={`${styles.footerBottom} ${styles.scrollReveal}`}
            data-scroll-reveal
          ><span>© 2026 Endo. All rights reserved.</span><a href="#top">Back to top ↑</a></div>
        </footer>
      </div>
    </div>
  );
}
