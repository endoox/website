import { DemoButton } from "@/app/site-chrome";
import styles from "./pricing-section.module.css";

export function PricingSection() {
  return (
    <section id="pricing" className={styles.pricing} aria-labelledby="pricing-heading">
      <div className={styles.pricingInner}>
        <div className={styles.pricingHeader}>
          <h2 id="pricing-heading">Pricing that grows with your roster.</h2>
        </div>
        <DemoButton label="Book a demo" />
      </div>
    </section>
  );
}
