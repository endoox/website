import Image from "next/image";
import type { CSSProperties } from "react";
import styles from "./page.module.css";
import { DiaGradient } from "./dia-gradient";
import { HeroBackground } from "./hero-background";
import { HeroStats } from "./hero-stats";
import { MotionObserver } from "./motion-observer";

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

const PLATFORM_FEATURES = [
  {
    number: "01",
    title: "Endodeal valuation",
    copy: "Price every opportunity with contract comparables and athlete-specific value drivers—not guesswork.",
  },
  {
    number: "02",
    title: "Contract management",
    copy: "Keep every agreement, renewal, term, and approval organized from signature through completion.",
  },
  {
    number: "03",
    title: "Roster visibility",
    copy: "See every athlete, every active deal, and exactly where each opportunity stands across the agency.",
  },
  {
    number: "04",
    title: "Financial tracking",
    copy: "Track payments, escalators, and bonuses against the contract so every dollar is accounted for.",
  },
  {
    number: "05",
    title: "Deliverable tracking",
    copy: "Stay ahead of posts, appearances, shoots, and media obligations without chasing another spreadsheet.",
  },
  {
    number: "06",
    title: "CRM and pipeline",
    copy: "Manage brand conversations, contacts, and new opportunities in one place built around agent workflows.",
  },
] as const;

/* ─────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD
 *
 *    0ms   first extended trusted-by group enters the track
 * 56000ms  second group reaches the start → loop repeats
 * ───────────────────────────────────────────────────────── */
const LOGO_MARQUEE_TIMING = {
  loopSeconds: 56,
} as const;

const TESTIMONIALS = [
  {
    name: "Shelbi Kilcollins",
    role: "Director of Marketing",
    company: "Quartexx Management",
    image: "/testimonials/shelbi-kilcollins.png",
    width: 200,
    height: 200,
    wide: false,
    quote:
      "endo was the catalyst in our latest negotiation, helping us unlock 170% more value with a major blue-chip partner.",
  },
  {
    name: "Tyler Wagner",
    role: "Director of Marketing",
    company: "Roy Sports Group",
    image: "/testimonials/tyler-wagner.png",
    width: 1536,
    height: 1536,
    wide: false,
    quote:
      "Instead of going into brand conversations with assumptions, we now have credible data to support our pricing. It gives us real leverage.",
  },
  {
    name: "Farren Benjamin",
    role: "Founder",
    company: "FarrWest Management",
    image: "/testimonials/farren-benjamin.png",
    width: 1292,
    height: 1292,
    wide: false,
    quote:
      "Providing elite service means supporting the athlete's entire career. endo was the missing piece that allowed us to demonstrate our commitment to our players' off-field success and long-term value.",
  },
  {
    name: "Charlie Di Bratto",
    role: "Marketing",
    company: "Quartexx Management",
    image: "/testimonials/charlie-di-bratto.png",
    width: 200,
    height: 200,
    wide: false,
    quote:
      "endo saves us around 10 hours a week, and as our agency grows, that number is only going to increase.",
  },
  {
    name: "Nic Métayer",
    role: "Founder",
    company: "Peak Athletes",
    image: "/testimonials/nic-metayer.png",
    width: 200,
    height: 200,
    wide: false,
    quote:
      "Managing contracts across multiple sports used to consume hours we simply didn't have. Since partnering with the team at endo, that's completely changed… this wasn't off-the-shelf, it was built with us.",
  },
] as const;

const TESTIMONIAL_ROWS = [
  TESTIMONIALS,
  [
    TESTIMONIALS[3],
    TESTIMONIALS[4],
    TESTIMONIALS[0],
    TESTIMONIALS[2],
    TESTIMONIALS[1],
  ],
] as const;

/* ─────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD
 *
 *    0ms   two testimonial rows begin from staggered offsets
 * 46000ms  top row completes one leftward loop
 * 52000ms  bottom row completes one rightward loop
 * ───────────────────────────────────────────────────────── */
const TESTIMONIAL_MARQUEE_TIMING = {
  topRowSeconds: 46,
  bottomRowSeconds: 52,
} as const;

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className={styles.arrow}
      viewBox="0 0 24 24"
    >
      <path d="M12 19V5M6 11l6-6 6 6" />
    </svg>
  );
}

function DemoButton({
  href,
  external = false,
  className,
}: {
  href: string;
  external?: boolean;
  className?: string;
}) {
  return (
    <a
      className={`${styles.demoButton} ${className ?? ""}`}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      <span className={styles.demoButtonLabel}>Request a demo</span>
      <span className={styles.demoButtonArrow} aria-hidden="true">
        <ArrowIcon />
      </span>
    </a>
  );
}


type Testimonial = (typeof TESTIMONIALS)[number];

function getQuoteStyle(quote: string) {
  const maximumRem = Math.min(1.52, Math.max(1.12, 1.94 - quote.length * 0.004));
  const minimumRem = Math.max(1.02, maximumRem - 0.16);

  return {
    "--testimonial-quote-size": `clamp(${minimumRem.toFixed(2)}rem, calc(${(minimumRem - 0.02).toFixed(2)}rem + 0.25vw), ${maximumRem.toFixed(2)}rem)`,
  } as CSSProperties;
}

function TestimonialCard({
  testimonial,
  duplicate,
}: {
  testimonial: Testimonial;
  duplicate: boolean;
}) {
  return (
    <article
      className={`${styles.testimonialCard} ${testimonial.wide ? styles.testimonialCardWide : ""}`}
      role={duplicate ? undefined : "listitem"}
    >
      <span className={styles.testimonialQuoteMark} aria-hidden="true">
        “
      </span>
      <blockquote style={getQuoteStyle(testimonial.quote)}>
        “{testimonial.quote}”
      </blockquote>
      <div className={styles.testimonialPerson}>
        <Image
          src={testimonial.image}
          alt=""
          width={testimonial.width}
          height={testimonial.height}
          sizes="48px"
        />
        <div>
          <cite>{testimonial.name}</cite>
          <span>
            {testimonial.role} · {testimonial.company}
          </span>
        </div>
      </div>
    </article>
  );
}

function TestimonialRow({
  testimonials,
  rowIndex,
}: {
  testimonials: readonly Testimonial[];
  rowIndex: number;
}) {
  const duration =
    rowIndex === 0
      ? TESTIMONIAL_MARQUEE_TIMING.topRowSeconds
      : TESTIMONIAL_MARQUEE_TIMING.bottomRowSeconds;

  return (
    <div className={styles.testimonialViewport}>
      <div
        className={`${styles.testimonialTrack} ${rowIndex === 1 ? styles.testimonialTrackSecond : ""}`}
        style={{ animationDuration: `${duration}s` }}
      >
        {[false, true].map((duplicate) => (
          <div
            className={styles.testimonialGroup}
            aria-hidden={duplicate ? true : undefined}
            role={duplicate ? undefined : "list"}
            key={duplicate ? "duplicate" : "primary"}
          >
            {testimonials.map((testimonial) => (
              <TestimonialCard
                testimonial={testimonial}
                duplicate={duplicate}
                key={`${duplicate ? "duplicate" : "primary"}-${testimonial.name}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className={styles.page}>
      <MotionObserver />

      <header
        className={`${styles.header} t-stagger`}
        data-scroll-reveal
      >
        <a
          className={`${styles.brand} t-stagger-line t-stagger-line--1`}
          href="#top"
          aria-label="Endo home"
        >
          <Image
            className={styles.brandLogoBase}
            src="/brand/endo-logo-white.png"
            alt="Endo"
            width={872}
            height={374}
            priority
          />
          <Image
            className={styles.brandLogoInk}
            src="/brand/endo-logo-white.png"
            alt=""
            width={872}
            height={374}
            aria-hidden="true"
            priority
          />
        </a>

        <nav
          className={`${styles.headerNav} t-stagger-line t-stagger-line--2`}
          aria-label="Primary navigation"
        >
          <a href="https://www.endodeals.com/features">Features</a>
          <a href="https://www.endodeals.com/about">About</a>
          <a href="https://www.endodeals.com/about#team">Our Team</a>
        </nav>

        <div
          className={`${styles.headerCtaWrap} t-stagger-line t-stagger-line--3`}
        >
          <DemoButton href="#closing-cta" />
        </div>
      </header>

      <main id="top" className={styles.main}>
        <section className={styles.hero} aria-labelledby="hero-heading">
          <div className={styles.heroBackdrop} aria-hidden="true" />
          <HeroBackground className={styles.heroBackground} />
          <div className={styles.heroStructure} aria-hidden="true" />
          <div className={styles.heroShade} aria-hidden="true" />

          <div
            className={`${styles.heroContent} t-stagger`}
            data-scroll-reveal
          >
            <h1
              id="hero-heading"
              className={`${styles.heading} t-stagger-line t-stagger-line--1`}
            >
              The endorsement platform
              <span>built for sports agencies</span>
            </h1>

            <p
              className={`${styles.subheading} t-stagger-line t-stagger-line--2`}
            >
              Never miss a payment or deliverable, price every deal right, and
              get more time to do what you do best.
            </p>

            <div
              className={`${styles.heroButtonWrap} t-stagger-line t-stagger-line--3`}
            >
              <DemoButton href="#closing-cta" />
            </div>
          </div>

          <HeroStats />
        </section>

        <section
          className={`${styles.trustedSection} t-stagger`}
          aria-labelledby="trusted-heading"
          data-scroll-reveal
        >
          <h2
            id="trusted-heading"
            className={`${styles.trustedHeading} t-stagger-line t-stagger-line--1`}
          >
            Trusted by
          </h2>

          <div
            className={`${styles.logoViewport} t-stagger-line t-stagger-line--2`}
          >
            <div
              className={styles.logoTrack}
              style={{
                animationDuration: `${LOGO_MARQUEE_TIMING.loopSeconds}s`,
              }}
            >
              {[0, 1].map((groupIndex) => (
                <div
                  className={styles.logoGroup}
                  aria-hidden={groupIndex === 1 ? true : undefined}
                  key={groupIndex}
                >
                  {[0, 1].map((sequenceIndex) =>
                    TRUSTED_BY_LOGOS.map((logo) => (
                      <div
                        className={`${styles.logoItem} ${logo.className}`}
                        key={`${groupIndex}-${sequenceIndex}-${logo.name}`}
                      >
                        <Image
                          className={styles.trustedLogo}
                          src={logo.src}
                          alt={
                            groupIndex === 0 && sequenceIndex === 0
                              ? logo.name
                              : ""
                          }
                          width={logo.width}
                          height={logo.height}
                          sizes="(max-width: 720px) 160px, 220px"
                        />
                      </div>
                    )),
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="platform"
          className={styles.featuresSection}
          aria-labelledby="features-heading"
        >
          <div
            className={`${styles.featuresHeader} t-stagger`}
            data-scroll-reveal
          >
            <div className="t-stagger-line t-stagger-line--1">
              <h2 id="features-heading">
                Everything your agency needs.
                <span>Nothing it doesn’t.</span>
              </h2>
            </div>
            <p
              className={`${styles.featuresIntro} t-stagger-line t-stagger-line--2`}
            >
              One connected workspace to value opportunities, manage every
              obligation, and grow the business behind the roster.
            </p>
          </div>

          <div className={styles.featuresGrid}>
            {PLATFORM_FEATURES.map((feature, index) => (
              <article
                className={`${styles.featureItem} ${styles.scrollReveal}`}
                style={
                  {
                    "--reveal-delay": `${index * 55}ms`,
                  } as CSSProperties
                }
                data-scroll-reveal
                key={feature.number}
              >
                <span className={styles.featureNumber}>{feature.number}</span>
                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          id="testimonials"
          className={styles.testimonialsSection}
          aria-labelledby="testimonials-heading"
        >
          <div
            className={`${styles.testimonialsHeader} t-stagger`}
            data-scroll-reveal
          >
            <h2
              id="testimonials-heading"
              className="t-stagger-line t-stagger-line--1"
            >
              What firms
              <span>are saying.</span>
            </h2>
            <p className="t-stagger-line t-stagger-line--2">
              Real outcomes from agencies managing real endorsement deals—not
              polished hypotheticals.
            </p>
          </div>

          <div
            className={`${styles.testimonialRows} ${styles.scrollReveal}`}
            style={{ "--reveal-delay": "90ms" } as CSSProperties}
            data-scroll-reveal
          >
            {TESTIMONIAL_ROWS.map((testimonials, rowIndex) => (
              <TestimonialRow
                testimonials={testimonials}
                rowIndex={rowIndex}
                key={rowIndex}
              />
            ))}
          </div>
        </section>

        <section
          id="closing-cta"
          className={styles.closingCta}
          aria-labelledby="closing-heading"
        >
          <DiaGradient className={styles.closingGradient} />

          <div
            className={`${styles.closingContent} t-stagger`}
            data-scroll-reveal
          >
            <h2
              id="closing-heading"
              className="t-stagger-line t-stagger-line--1"
            >
              See what every endorsement is really worth.
            </h2>
            <div
              className={`${styles.closingButtonWrap} t-stagger-line t-stagger-line--2`}
            >
              <DemoButton
                href="https://calendly.com/will-8qc/30min"
                external
              />
            </div>
          </div>

          <footer
            className={`${styles.footer} ${styles.scrollReveal}`}
            style={{ "--reveal-delay": "120ms" } as CSSProperties}
            data-scroll-reveal
          >
            <div className={styles.footerBrand}>
              <a href="#top" aria-label="Endo home">
                <Image
                  src="/brand/endo-logo-footer.png"
                  alt="Endo"
                  width={772}
                  height={200}
                />
              </a>
              <p>The endorsement platform built for sports agencies.</p>
            </div>

            <div className={styles.footerMeta}>
              <nav className={styles.footerNav} aria-label="Footer navigation">
                <a href="mailto:admin@endodeals.com">Contact</a>
                <a
                  href="https://www.endodeals.com/privacy"
                  target="_blank"
                  rel="noreferrer"
                >
                  Privacy policy
                </a>
                <a
                  href="https://www.endodeals.com/terms"
                  target="_blank"
                  rel="noreferrer"
                >
                  Terms of service
                </a>
                <a href="#top">Back to top</a>
              </nav>
              <p>© 2026 Endo. All rights reserved.</p>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}
