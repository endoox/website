import type { Metadata } from "next";
import pageStyles from "../page.module.css";
import { SiteFooter, SiteHeader } from "../site-chrome";
import { DemoRequestForm } from "./demo-request-form";
import styles from "./request-demo.module.css";

export const metadata: Metadata = {
  title: "Request a demo — endo",
  description: "Tell endo how your agency works and book a tailored product demo.",
};

export default function RequestDemoPage() {
  return (
    <div className={`${pageStyles.page} ${styles.demoPage}`}>

      <SiteHeader />

      <main id="top">
        <section className={styles.demoHero} aria-labelledby="demo-heading">
          <div className={styles.demoHeroInner}>
            <div className={`${styles.demoIntro} ${pageStyles.scrollReveal}`} data-scroll-reveal>
              <p className={styles.demoKicker}>Request a demo</p>
              <h1 id="demo-heading">Bring the whole endorsement book into view.</h1>
              <p>
                Tell us a little about your agency. We&apos;ll tailor the conversation to the way your team works today and where you want more clarity.
              </p>
              <div className={styles.demoAside}>
                <span>What happens next</span>
                <ol>
                  <li>Share your context.</li>
                  <li>Choose a time that works.</li>
                  <li>See endo in your workflow.</li>
                </ol>
              </div>
            </div>

            <div className={`${styles.demoFormShell} ${pageStyles.scrollReveal}`} data-scroll-reveal>
              <DemoRequestForm />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
