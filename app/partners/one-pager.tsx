import Image from "next/image";
import { KEY_POINTS, ONE_PAGER } from "@/content/partners";
import { PRESS } from "@/lib/press";
import { TRUSTED_BY_LOGOS } from "@/lib/proof";
import styles from "./partners.module.css";

// The one-page summary of endo, shown in the hub and on /partners/one-pager, which is what the PDF is
// printed from (scripts/build-one-pager-pdf.mjs).
export function OnePager() {
  const featured = PRESS.find((item) => item.outlet === ONE_PAGER.featuredIn);

  return (
    <article className={styles.onePager} aria-label="endo one-pager">
      <header>
        <Image src="/resources/endo-logo-full-colour.png" alt="endo" width={2826} height={1214} sizes="120px" />
        <span>endodeals.com</span>
      </header>
      <h3>{ONE_PAGER.headline}</h3>
      <p className={styles.opSub}>{ONE_PAGER.subhead}</p>
      <div className={styles.opShot}>
        <Image src="/hero/hero-devices.png" alt="endo on a laptop and a phone: the agency home dashboard and the mobile app's Today view" width={3000} height={1770} sizes="(max-width: 900px) 100vw, 760px" priority />
      </div>
      <p className={styles.opAbout}>{ONE_PAGER.about}</p>
      <h4>What endo does</h4>
      <ul className={styles.opFeatures}>
        {KEY_POINTS.map((point) => <li key={point.title}>{point.title}</li>)}
      </ul>
      <dl className={styles.opStats}>
        {ONE_PAGER.stats.map((stat) => (
          <div key={stat.label}><dt>{stat.label}</dt><dd>{stat.value}</dd></div>
        ))}
      </dl>
      <h4>Trusted by</h4>
      <ul className={styles.opLogos}>
        {TRUSTED_BY_LOGOS.map((logo) => (
          <li key={logo.name} data-logo={logo.name} data-flat={"flat" in logo || undefined}><Image src={logo.src} alt={logo.name} width={logo.width} height={logo.height} sizes="120px" /></li>
        ))}
        <li className={styles.andMore}>and more</li>
      </ul>
      {featured && (
        <>
          <h4>Featured in</h4>
          <a className={styles.opPress} href={featured.href} target="_blank" rel="noreferrer">
            {featured.image && <Image src={featured.image} alt={featured.outlet} width={1600} height={1000} sizes="120px" />}
            <span><b>{featured.outlet}</b>{featured.title}</span>
          </a>
        </>
      )}
      <blockquote className={styles.opQuote}>
        <p>“{ONE_PAGER.quote.text}”</p>
        <footer><b>{ONE_PAGER.quote.name}</b> · {ONE_PAGER.quote.role}</footer>
      </blockquote>
      <footer className={styles.opFoot}>{ONE_PAGER.contact}</footer>
    </article>
  );
}
