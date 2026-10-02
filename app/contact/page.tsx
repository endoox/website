import type { Metadata } from "next";
import pageStyles from "../page.module.css";
import { SiteFooter, SiteHeader } from "../site-chrome";
import { DemoRequestForm } from "./demo-request-form";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Book a demo — endo",
  description: "Tell us a bit about your business and we'll match you with the right walkthrough of endo.",
};

export default function ContactPage() {
  return (
    <div className={`${pageStyles.page} ${styles.contactPage}`}>
      <SiteHeader />

      <main id="top" className={styles.main}>
        <DemoRequestForm />
      </main>

      <SiteFooter />
    </div>
  );
}
