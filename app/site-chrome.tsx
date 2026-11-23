import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { DEMO_URL } from "@/lib/contact";
import { CUSTOMER_STORIES } from "@/lib/customer-stories";
import { NAV_LINKS } from "@/lib/nav";
import { PRESS } from "@/lib/press";
import { FloatingHeader } from "./floating-header";
import { MobileMenu } from "./mobile-menu";
import { AttributionCapture } from "./attribution";
import { MotionObserver } from "./motion-observer";
import { NewsletterForm } from "./newsletter-form";
import styles from "./page.module.css";
import { Wordmark } from "./wordmark";

export function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <span className={styles.brandMark}>
      <Image
        className={styles.brandMarkBase}
        src={footer ? "/brand/endo-logo-white-gradient.png" : "/brand/endo-logo-dark.png"}
        alt="endo"
        width={2826}
        height={1214}
        sizes={footer ? "155px" : "132px"}
        priority={!footer}
      />
    </span>
  );
}

export function DemoButton({ className = "", href = DEMO_URL, label = "Request a demo" }: { className?: string; href?: string; label?: string }) {
  return (
    <a
      className={`${styles.demoButton} ${className}`}
      href={href}
    >
      <span>{label}</span>
      <span className={styles.demoButtonArrow} aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M12 19V5M6.5 10.5 12 5l5.5 5.5" />
        </svg>
      </span>
    </a>
  );
}

export function SiteHeader({ current }: { current?: string }) {
  return (
    <>
      <MotionObserver />
      <AttributionCapture />
      <FloatingHeader>
        <Link className={styles.brandLink} href="/" aria-label="endo home"><Brand /></Link>
        <nav className={styles.headerNav} aria-label="Primary navigation">
          {NAV_LINKS.map((link) => (
            <Link href={link.href} aria-current={link.href === current ? "page" : undefined} key={link.href}><Wordmark text={link.label} /></Link>
          ))}
        </nav>
        <DemoButton className={styles.headerButton} />
        <div className={styles.mobileMenuSlot}><MobileMenu /></div>
      </FloatingHeader>
    </>
  );
}

export function SiteFooter({
  title = "See what every endorsement is really worth.",
  action = <DemoButton />,
}: { title?: ReactNode; action?: ReactNode }) {
  return (
    <footer className={styles.footer}>
      <section className={styles.footerCta} aria-labelledby="closing-heading">
        <h2 id="closing-heading">{title}</h2>
        {action}
      </section>
      <div className={styles.footerMain}>
        <div className={styles.footerBrand}>
          <Link href="/" aria-label="endo home"><Brand footer /></Link>
          <p>The software behind modern sports agencies.</p>
          <NewsletterForm />
        </div>
        <nav className={styles.footerLinks} aria-label="Footer">
          <div><p>Platform</p><Link href="/#features">Features</Link><Link href="/endo-deals"><Wordmark text="endodeals" /></Link><Link href="/#pricing">Pricing</Link><Link href="/#testimonials">Testimonials</Link></div>
          <div><p>Company</p><Link href="/about">About</Link><Link href="/about#team">Our team</Link>{CUSTOMER_STORIES.length > 0 && <Link href="/customer-stories">Customer stories</Link>}{PRESS.length > 0 && <Link href="/press">Press</Link>}<a href="mailto:admin@endodeals.com">Contact</a></div>
          <div><p>Legal</p><Link href="/privacy">Privacy policy</Link><Link href="/terms">Terms of service</Link></div>
        </nav>
      </div>
      <div className={styles.footerBottom}>
        <span>© 2026 endo. All rights reserved.</span>
        <div className={styles.footerBottomLinks}>
          <a className={styles.social} href="https://www.linkedin.com/company/endodeals" target="_blank" rel="noreferrer" aria-label="endo on LinkedIn">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" /></svg>
          </a>
          <a className={styles.social} href="https://www.instagram.com/endodeals/" target="_blank" rel="noreferrer" aria-label="endo on Instagram">
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5" /><circle cx="12" cy="12" r="4.3" /><circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" /></svg>
          </a>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
