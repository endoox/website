"use client";

import { ArrowRight, Check } from "lucide-react";
import { DEMO_URL } from "@/lib/contact";
import styles from "./pricing-section.module.css";

type PricingPlan = {
  name: string;
  description: string;
  features: readonly { label: string; value: string }[];
  applicationDeadline?: string;
  button: string;
  buttonVariant?: "outline" | "solid";
};

const PLANS: PricingPlan[] = [
  {
    name: "Boutique",
    description: "A focused operating system for smaller agencies and lean teams.",
    features: [
      { label: "Seats", value: "Up to 3" },
      { label: "Endo Deals valuation reports", value: "2 / month" },
      { label: "Talent uploads", value: "Up to 15" },
      { label: "Contracts and deliverables", value: "Unlimited" },
      { label: "Commissions and payments", value: "Unlimited" },
      { label: "Agency reports", value: "Monthly" },
      { label: "Custom comparable requests", value: "—" },
      { label: "Onboarding and migration", value: "Guided" },
    ],
    button: "Request a demo",
    buttonVariant: "outline",
  },
  {
    name: "Professional",
    description: "For established agencies managing a growing roster and deal volume.",
    features: [
      { label: "Seats", value: "Unlimited" },
      { label: "Endo Deals valuation reports", value: "15 / month" },
      { label: "Talent uploads", value: "Unlimited" },
      { label: "Contracts and deliverables", value: "Unlimited" },
      { label: "Commissions and payments", value: "Unlimited" },
      { label: "Agency reports", value: "Weekly" },
      { label: "Custom comparable requests", value: "Included" },
      { label: "Onboarding and migration", value: "Dedicated" },
    ],
    button: "Request a demo",
    buttonVariant: "solid",
  },
  {
    name: "Design partner",
    description: "A small group of agencies shaping what gets built.",
    features: [
      { label: "Everything in Professional", value: "Included" },
      { label: "Founder calls", value: "Every two weeks" },
      { label: "Roadmap input", value: "Included" },
      { label: "Rate held flat", value: "For the term" },
      { label: "Onboarding and migration", value: "Priority" },
    ],
    button: "Apply now",
    buttonVariant: "outline",
    applicationDeadline: "2026-12-31",
  },
] as const;

export function PricingSection() {
  return (
    <section id="pricing" className={styles.pricing} aria-labelledby="pricing-heading">
      <div className={styles.pricingInner}>
        <div className={styles.pricingHeader}>
          <h2 id="pricing-heading">
            Pricing that grows with your roster.
          </h2>
        </div>

        <div className={styles.pricingGrid}>
          {PLANS.map((plan) => (
            <article
              className={styles.pricingCard}
              key={plan.name}
            >
              <div className={styles.pricingCardHead}>
                <h3>{plan.name}</h3>
                <p>{plan.description}</p>
              </div>

              <div className={styles.pricingPrice}>
                <strong>{plan.applicationDeadline ? "Application" : "Custom"}</strong>
                <span>{plan.applicationDeadline ? (
                  <>Closes <time dateTime={plan.applicationDeadline}>31 Dec 2026</time></>
                ) : "tailored plan"}</span>
              </div>

              <a
                className={`${styles.pricingButton} ${plan.buttonVariant === "outline" ? styles.pricingButtonOutline : ""}`}
                href={DEMO_URL}
                target="_blank"
                rel="noreferrer"
              >
                {plan.button}
                <ArrowRight aria-hidden="true" size={16} />
              </a>

              <div className={styles.pricingDivider} />

              <ul className={styles.pricingFeatures}>
                {plan.features.map((feature) => (
                  <li key={feature.label}>
                    <Check aria-hidden="true" size={16} />
                    <span>{feature.label}</span>
                    <strong>{feature.value}</strong>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
