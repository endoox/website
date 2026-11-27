import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { DEMO_URL } from "@/lib/contact";
import { TESTIMONIALS, TRUSTED_BY_LOGOS } from "@/lib/proof";
import { LeagueCoverage } from "./league-coverage";
import styles from "./page.module.css";
import { FeatureTour } from "./feature-tour";
import { HeroStats } from "./hero-stats";
import { LogoTrack } from "./logo-track";
import { TransparentVideo } from "./product-demo-media";
import { DemoButton, SiteFooter, SiteHeader } from "./site-chrome";
import { JsonLd, SOFTWARE } from "./structured-data";
import { Wordmark } from "./wordmark";
import { TestimonialCarousel } from "./testimonial-carousel";

const FEATURES = [
  { id: "valuation", eyebrow: "endodeals valuation", title: "Fair market value, finally.", href: "/endo-deals" },
  { id: "contracts", eyebrow: "Contract management", title: "Every agreement, term, and renewal in one place." },
  { id: "roster", eyebrow: "Roster visibility", title: "See the whole business behind your roster." },
  { id: "financials", eyebrow: "Financial tracking", title: "Know exactly what is paid, pending, and overdue." },
  { id: "deliverables", eyebrow: "Deliverables & Social Analytics", title: "Every post delivered, approved, and measured." },
  { id: "pipeline", eyebrow: "CRM and pipeline", title: "Turn every conversation into momentum." },
] as const;


function TrustedBy() {
  return (
    <div className={styles.trusted} aria-label="Trusted by leading sports agencies">
      <LogoTrack className={styles.logoTrack}>
        {[0, 1].map((copy) => (
          <div className={styles.logoRow} key={copy} aria-hidden={copy === 1 ? true : undefined}>
            {TRUSTED_BY_LOGOS.map((logo) => (
              <div
                className={`${styles.logoItem} ${"flat" in logo ? styles.logoFlat : ""}`}
                style={{ "--logo-w": `${logo.box[0]}px`, "--logo-h": `${logo.box[1]}px` } as CSSProperties}
                key={logo.name}
              >
                <Image className={logo.name === "ORR Hockey Group" ? styles.logoOrr : logo.name === "Cook Stark Management" ? styles.logoCookStark : undefined} src={logo.src} alt={copy === 1 ? "" : logo.name} width={logo.width} height={logo.height} sizes="(max-width: 720px) 120px, 180px" loading="eager" />
              </div>
            ))}
          </div>
        ))}
      </LogoTrack>
    </div>
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

      <JsonLd data={SOFTWARE} />
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
          <FeatureTour
            heading={
              <div className={`${styles.featuresHeading} ${styles.scrollReveal}`} data-scroll-reveal>
                <h2 id="features-heading">Built for how agencies actually work.</h2>
              </div>
            }
            features={FEATURES.map((feature) => ({ id: feature.id, label: feature.eyebrow.replace("endodeals ", "") }))}>
            {FEATURES.map((feature, index) => {
              return (
                <article id={feature.id} className={styles.featureStory} key={feature.id} data-scroll-reveal data-feature-story data-active={index === 0 || undefined}>
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
          </FeatureTour>
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
          <h2 id="pricing-heading">Enterprise-grade tools. Agency-friendly pricing.</h2>
          <p>You pay per seat for the people using endo, so signing more athletes never raises your bill. <Link href={DEMO_URL}>Get a quote for your team →</Link></p>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
