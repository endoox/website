import Image from "next/image";
import Link from "next/link";
import { DEMO_URL } from "@/lib/contact";
import { NAV_LINKS } from "@/lib/nav";
import { PRESS } from "@/lib/press";
import { FloatingHeader } from "./floating-header";
import { MobileMenu } from "./mobile-menu";
import styles from "./page.module.css";

export function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <span className={`${styles.brandMark} ${footer ? styles.brandMarkFooter : ""}`}>
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
    <FloatingHeader>
      <Link className={styles.brandLink} href="/" aria-label="endo home"><Brand /></Link>
      <nav className={styles.headerNav} aria-label="Primary navigation">
        {NAV_LINKS.map((link) => (
          <Link href={link.href} aria-current={link.href === current ? "page" : undefined} key={link.href}>{link.label}</Link>
        ))}
      </nav>
      <DemoButton className={styles.headerButton} />
      <div className={styles.mobileMenuSlot}><MobileMenu /></div>
    </FloatingHeader>
  );
}

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.footerTop} ${styles.scrollReveal}`} data-scroll-reveal>
        <Link href="/" aria-label="endo home"><Brand footer /></Link>
        <p>The software behind modern sports agencies.</p>
      </div>
      <div className={`${styles.footerLinks} ${styles.scrollReveal}`} data-scroll-reveal>
        <div><p>Platform</p><Link href="/#features">Features</Link><Link href="/#stories">Case studies</Link><Link href="/endo-deals">endo.deals</Link><Link href="/#pricing">Pricing</Link><Link href="/#testimonials">Testimonials</Link></div>
        <div><p>Company</p><Link href="/about">About</Link><Link href="/about#team">Our team</Link>{PRESS.length > 0 && <Link href="/press">Press</Link>}<a href="mailto:admin@endodeals.com">Contact</a></div>
        <div><p>Legal</p><a href="https://www.endodeals.com/privacy">Privacy policy</a><a href="https://www.endodeals.com/terms">Terms of service</a></div>
      </div>
      <div className={`${styles.footerBottom} ${styles.scrollReveal}`} data-scroll-reveal>
        <span>© 2026 endo. All rights reserved.</span><a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
