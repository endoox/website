import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { LeagueCoverage } from "./league-coverage";
import styles from "./page.module.css";
import { HeroStats } from "./hero-stats";
import { TransparentVideo } from "./product-demo-media";
import { DemoButton, SiteFooter, SiteHeader } from "./site-chrome";
import { Wordmark } from "./wordmark";
import { TestimonialCarousel } from "./testimonial-carousel";

// box = display size in px (scaled down on mobile). flat preserves tones in detailed marks.
const TRUSTED_BY_LOGOS = [
  { name: "ORR Hockey Group", src: "/trusted-by/orr-hockey-group.png", width: 200, height: 200, box: [92, 92], flat: true },
  { name: "RHSEVEN", src: "/trusted-by/rhseven-white.png", width: 280, height: 77, box: [150, 44] },
  { name: "Envision Sports & Entertainment", src: "/trusted-by/envision-sports-entertainment.png", width: 300, height: 136, box: [140, 64], flat: true },
  { name: "Quartexx Management", src: "/trusted-by/quartexx.png", width: 343, height: 115, box: [175, 62] },
  { name: "Peak Athletes", src: "/trusted-by/peak-athletes.png", width: 1200, height: 1200, box: [82, 82] },
  { name: "KHG Sports Management", src: "/trusted-by/khg-sports-management.png", width: 447, height: 447, box: [76, 76], flat: true },
  { name: "Cook Stark Management", src: "/trusted-by/cook-stark.png", width: 200, height: 200, box: [100, 80], flat: true },
  { name: "Oasis Sports Group", src: "/trusted-by/oasis-agency.png", width: 522, height: 464, box: [84, 74], flat: true },
  { name: "US Sports Agency", src: "/trusted-by/us-sports-agency.png", width: 300, height: 300, box: [72, 72] },
  { name: "Tonbara", src: "/trusted-by/tonbara-wordmark.png", width: 794, height: 183, box: [175, 46] },
  { name: "RSG Hockey", src: "/trusted-by/rsg-hockey.png", width: 458, height: 93, box: [178, 62] },
] as const;

const FEATURES = [
  { id: "valuation", eyebrow: "endodeals valuation", title: "Fair market value, finally.", href: "/endo-deals" },
  { id: "contracts", eyebrow: "Contract management", title: "Every agreement, term, and renewal in one place." },
  { id: "roster", eyebrow: "Roster visibility", title: "See the whole business behind your roster." },
  { id: "financials", eyebrow: "Financial tracking", title: "Know exactly what is paid, pending, and overdue." },
  { id: "deliverables", eyebrow: "Deliverables & Social Analytics", title: "Every post delivered, approved, and measured." },
  { id: "pipeline", eyebrow: "CRM and pipeline", title: "Turn every conversation into momentum." },
] as const;

const TESTIMONIALS = [
  {
    name: "Shelbi Kilcollins",
    role: "Director of Marketing · Quartexx Management",
    image: "/testimonials/shelbi-kilcollins.png",
    quote:
      "endo has anchored Quartexx's marketing efforts and has been key to our team's strategic growth. It's helped us streamline the high volume of administrative work that comes with endorsement deals, made our sales outreach more efficient and left us better prepared for negotiations. When we look back on our marketing wins in a few years, endo will be a big part of the 'why.'",
  },
  {
    name: "Tyler Wagner",
    role: "Director of Marketing · Roy Sports Group",
    image: "/testimonials/tyler-wagner.png",
    quote:
      "Instead of going into brand conversations with assumptions, we now have credible data to support our pricing. It gives us real leverage.",
  },
  {
    name: "Patrik Darabont",
    role: "Founder & Principal · Tonbara Sports & Entertainment",
    image: "/testimonials/patrik-darabont.png",
    quote:
      "Representing athletes across a dozen sports means no two deals look alike. endo gives us one consistent, data-backed read on value across all of them.",
  },
  {
    name: "Drew Harde",
    role: "Vice President · KHG Sports Management",
    image: "/testimonials/drew-harde.png",
    quote:
      "endo and the team there, have helped create a hub for our agency enhancing our processes to provide the highest level of service to our clients.",
  },
  {
    name: "Nic Métayer",
    role: "Founder · Peak Athletes",
    image: "/testimonials/nic-metayer.png",
    quote:
      "This wasn't off-the-shelf. It was built with us, around the way a modern sports agency actually works.",
  },
  {
    name: "Lander Cook",
    role: "Co-Founder, CEO · Cook Stark Management",
    image: "/testimonials/lander-cook.png",
    quote:
      "endo has significantly streamlined our fast-growing business and made it easier to see the full picture without having to check multiple different places to reconcile schedules, values, or other information. The user interface is accessible and simple and it provides us with ways to track timelines and deliverables across our team of agents.",
  },
] as const;

function TrustedBy() {
  return (
    <div className={styles.trusted} aria-label="Trusted by leading sports agencies">
      <div className={styles.logoTrack}>
        {[0, 1].map((copy) => (
          <div className={styles.logoRow} key={copy} aria-hidden={copy === 1 ? true : undefined}>
            {TRUSTED_BY_LOGOS.map((logo) => (
              <div
                className={`${styles.logoItem} ${"flat" in logo ? styles.logoFlat : ""}`}
                style={{ "--logo-w": `${logo.box[0]}px`, "--logo-h": `${logo.box[1]}px` } as CSSProperties}
                key={logo.name}
              >
                <Image className={logo.name === "ORR Hockey Group" ? styles.logoOrr : logo.name === "Cook Stark Management" ? styles.logoCookStark : undefined} src={logo.src} alt={copy === 1 ? "" : logo.name} width={logo.width} height={logo.height} sizes="(max-width: 720px) 120px, 180px" />
              </div>
            ))}
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
          {feature.eyebrow.replace("endodeals ", "")}
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

      <SiteHeader />

      <main id="top">
        <section className={styles.hero} aria-labelledby="hero-heading">
          <div className={styles.heroCopy}>
            <h1 id="hero-heading">
              The software behind modern sports agencies
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
              src="/hero/hero-devices.png"
              alt="endo on a laptop and a phone: the agency home dashboard with the day's schedule, earned media, commissions and deals needing attention, and the mobile app's Today view"
              width={3000}
              height={1770}
              sizes="(max-width: 760px) 100vw, 1200px"
              priority
            />
          </div>
        </section>

        <section id="features" className={styles.featuresSection} aria-labelledby="features-heading">
          <div
            className={`${styles.featuresHeading} ${styles.scrollReveal}`}
            data-scroll-reveal
          >
            <h2 id="features-heading">
              Built for how agencies actually work.
            </h2>
          </div>
          <FeatureNav />

          <div className={styles.featureStories}>
            {FEATURES.map((feature, index) => {
              return (
                <article id={feature.id} className={styles.featureStory} key={feature.id} data-scroll-reveal>
                  <div className={styles.featureCopy}>
                    <p><Wordmark text={feature.eyebrow} /></p>
                    <h3>{feature.title}</h3>
                    {"href" in feature && (
                      <Link className={styles.featureLink} href={feature.href}>Learn more <span aria-hidden="true">→</span></Link>
                    )}
                  </div>
                  <div className={styles.featureVisual} data-scroll-drift={index % 2 ? "-14" : "14"}>
                    <TransparentVideo className={styles.featureVideo} name={feature.id} />
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section id="testimonials" className={styles.testimonials} aria-labelledby="testimonials-heading">
          <div
            className={`${styles.sectionHeading} ${styles.scrollReveal}`}
            data-scroll-reveal
          >
            <h2 id="testimonials-heading">In the agency’s words.</h2>
          </div>
          <TestimonialCarousel>
            {TESTIMONIALS.map((testimonial) => <TestimonialCard testimonial={testimonial} key={testimonial.name} />)}
          </TestimonialCarousel>
        </section>

        <LeagueCoverage />

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

        <section id="pricing" className={styles.pricing} aria-labelledby="pricing-heading">
          <h2 id="pricing-heading">Pricing that grows with your roster.</h2>
          <DemoButton label="Book a demo" />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
