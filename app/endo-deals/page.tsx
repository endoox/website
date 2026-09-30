import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { DEMO_URL } from "@/lib/contact";
import { DemoButton, SiteFooter, SiteHeader } from "../site-chrome";
import pageStyles from "../page.module.css";
import { TransparentVideo } from "../product-demo-media";
import { Pillars } from "./pillars";
import styles from "./endo-deals.module.css";

const title = "endo — The software behind the modern sports agency";
const description = "Score the talent, price the deal and show the brand why it fits. One endodeals report, back in 24 hours.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary", title, description },
};

const STEPS = [
  { href: "#pillars", title: "Score", body: "How marketable is this talent, and why." },
  { href: "#price-heading", title: "Price", body: "What the whole deal is worth, and what to counter." },
  { href: "#match-heading", title: "Match", body: "Why this talent is right for this brand." },
] as const;

const CONTENT_RATES = [
  ["Instagram post", "$3,200"],
  ["Instagram story", "$1,100"],
  ["Instagram reel", "$3,600"],
  ["TikTok video", "$2,400"],
  ["YouTube video", "$2,900"],
  ["X post", null],
] as const;

const DEAL_ADDS = [
  ["Usage rights", "Running the content as paid ads"],
  ["Exclusivity", "Keeping competitors out of the category"],
  ["Term", "How long the partnership runs"],
  ["Appearances", "Events, shoots and time in person"],
] as const;

const MATCH_POINTS = [
  ["Who each side reaches", "Age, gender, location and interests for the talent and the brand, side by side from the same source."],
  ["Where they overlap, and where they don't", "The overlap proves fit. The gap is often the better pitch: an audience the brand wants and cannot reach on its own."],
  ["A case the brand can forward", "A clean partnership case, written for the brand's marketing team, that makes the argument without a single commercial term in it."],
] as const;

const AUDIENCE_COMPARISON = [
  { label: "Under 25", note: "3.1x", talent: 49, brand: 16 },
  { label: "Canada and US", note: "2.4x", talent: 91, brand: 38 },
  { label: "Ages 25 to 34", note: "The overlap", talent: 31, brand: 37 },
] as const;

const OPTIONS = [
  ["Offer is on the table", "A brand has put a number forward. Find out what the deal is actually worth, what to counter with, and where the walk-away floor sits."],
  ["No offer yet", "Price the deal before you go in, so the first number on the table is yours rather than theirs."],
] as const;

const IN_REPORT = [
  ["The endodeals value", "A fair market range for the full deal, not just the posts."],
  ["Media equivalency value", "What the reach and engagement of each post, story, reel and video would cost to buy as paid media."],
  ["Counter and floor", "The number to counter at, and the point to walk away."],
  ["Brand match", "How the talent's audience lines up with the brand's."],
] as const;

function Arrow() {
  return (
    <div className={styles.arrow} aria-hidden="true">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
    </div>
  );
}

function TrustIcon({ children }: { children: ReactNode }) {
  return <i><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">{children}</svg></i>;
}

export default function EndoDealsPage() {
  return (
    <div className={pageStyles.page}>
      <SiteHeader current="/endo-deals" />

      <main id="top">
        <header className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.lockup}>
              <Image src="/brand/endo-app-icon.png" alt="" width={34} height={34} />
              <div>endo<span>deals</span></div>
            </div>
            <h1>Never quote a number you can’t defend.</h1>
            <p>Score the talent, price the deal and show the brand why it fits. One report, back in 24 hours.</p>
            <div className={styles.heroActions}>
              <DemoButton href="#get" label="Get a valuation" />
              <a className={styles.secondary} href={DEMO_URL}>Talk to our team</a>
            </div>
            <div className={styles.heroVisual}>
              <TransparentVideo className={styles.heroVideo} name="endodeals-score" />
              <p>Illustrative score and factor values. This example does not represent a client or a live valuation.</p>
            </div>
            <nav aria-label="How endodeals works">
              <ol className={styles.steps}>
                {STEPS.map((step, index) => (
                  <li key={step.title}>
                    <a href={step.href}><span className={styles.stepNumber}>{index + 1}</span><b>{step.title}</b><span>{step.body}</span></a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </header>

        <div className={styles.sections}>
          <Pillars />

          <section className={styles.priceCard} aria-labelledby="price-heading">
            <div className={styles.in}>
              <div className={styles.head}>
                <h2 id="price-heading">From one post to the whole deal.</h2>
                <p>Every valuation starts with the media equivalency value of the content, then prices everything else a brand is really buying.</p>
              </div>

              <div className={styles.flow}>
                <div className={`${styles.card} ${styles.flowStep}`}>
                  <span className={styles.label}>Media equivalency value</span>
                  <h3>Content rate</h3>
                  <p className={styles.flowText}>Based on media equivalency value: what the same reach and engagement would cost to buy as paid media on each platform.</p>
                  <div className={styles.rateCard}>
                    {CONTENT_RATES.map(([name, rate]) => (
                      <div key={name}><span>{name}</span>{rate ? <b>{rate}</b> : <span className={styles.na}>n/a</span>}</div>
                    ))}
                  </div>
                  <p className={styles.cardFine}>Content only. Before rights, exclusivity, appearances or term.</p>
                </div>
                <Arrow />
                <div className={`${styles.card} ${styles.flowStep}`}>
                  <span className={styles.label}>The rest of the deal</span>
                  <h3>What the brand is really buying</h3>
                  <p className={styles.flowText}>Most deals are worth more than their posts. We price the parts a rate card leaves out.</p>
                  <div className={styles.adds}>
                    {DEAL_ADDS.map(([name, detail]) => (
                      <div key={name}><i>+</i><p><b>{name}</b><span>{detail}</span></p></div>
                    ))}
                  </div>
                </div>
                <Arrow />
                <div className={`${styles.card} ${styles.flowStep}`}>
                  <span className={styles.label}>The answer</span>
                  <h3>endodeals value</h3>
                  <p className={styles.flowText}>A fair market range for the whole deal, with the number to counter at and the point to walk away.</p>
                  <div className={styles.value}>
                    <span className={styles.label}>Velocity Auto · 3 posts + 1 story · 6 months</span>
                    <div className={styles.valueBig}>$11K - $13K</div>
                    <div className={styles.scale}>
                      <span className={styles.range} />
                      <span className={`${styles.marker} ${styles.markerOffer}`} style={{ left: "18%" }}><span>Offer $10K</span></span>
                      <span className={styles.marker} style={{ left: "64%" }}><span>Counter $12.5K</span></span>
                    </div>
                  </div>
                  <div className={styles.keyValues}>
                    <div><small>Counter at</small><b>$12,500</b></div>
                    <div><small>Walk-away floor</small><b>$10,800</b></div>
                  </div>
                </div>
              </div>

              <div className={styles.trust}>
                <div>
                  <TrustIcon><path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0z" /><path d="M3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" /></TrustIcon>
                  Grounded in live market data and the endodeals score
                </div>
                <div>
                  <TrustIcon><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></TrustIcon>
                  Your deals stay yours. Nothing you enter is shown to anyone else.
                </div>
              </div>
            </div>
          </section>

          <section className={styles.light} aria-labelledby="match-heading">
            <div className={styles.in}>
              <div className={styles.match}>
                <div>
                  <div className={styles.sideHead}>
                    <h2 id="match-heading">Show the brand why it fits.</h2>
                    <p>endodeals lines up the talent&apos;s audience against the brand&apos;s own followers, so the pitch starts with evidence instead of adjectives.</p>
                  </div>
                  <ol className={styles.points}>
                    {MATCH_POINTS.map(([name, detail], index) => (
                      <li className={styles.point} key={name}><span>{String(index + 1).padStart(2, "0")}</span><div><b>{name}</b><p>{detail}</p></div></li>
                    ))}
                  </ol>
                </div>
                <div className={`${styles.card} ${styles.case}`}>
                  <div className={styles.caseHead}>
                    <div><span className={styles.label}>Partnership case</span><h3>Tyler Reid × Northstar Outdoor</h3></div>
                    <span className={styles.caseTag}>Example</span>
                  </div>
                  <div className={styles.caseThesis}>His following is <b>49% under 25</b>. Northstar&apos;s is <b>16%</b>. That is the audience Northstar has been trying to reach.</div>
                  <div className={styles.caseLegend}>
                    <span><i style={{ background: "#0f1d6b" }} />Tyler</span>
                    <span><i style={{ background: "#8fb0e8" }} />Northstar</span>
                  </div>
                  <div className={styles.compare}>
                    {AUDIENCE_COMPARISON.map((row) => (
                      <div className={styles.compareRow} key={row.label}>
                        <div className={styles.compareTitle}>{row.label}<span>{row.note}</span></div>
                        <div className={styles.compareBar}><span>Tyler</span><span className={styles.compareTrack}><i style={{ width: `${row.talent}%`, background: "#0f1d6b" }} /></span><b>{row.talent}%</b></div>
                        <div className={styles.compareBar}><span>Northstar</span><span className={styles.compareTrack}><i style={{ width: `${row.brand}%`, background: "#8fb0e8" }} /></span><b>{row.brand}%</b></div>
                      </div>
                    ))}
                  </div>
                  <div className={styles.shared}><span>Shared: Sports</span><span>Shared: Outdoors</span><span>Shared: Travel</span></div>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.light} id="get" aria-labelledby="start-heading">
            <div className={styles.in}>
              <div className={styles.getGrid}>
                <div>
                  <div className={styles.sideHead}>
                    <h2 id="start-heading">Two ways in. One report back.</h2>
                    <p>Start with an offer you have, or price the deal before the brand names a number.</p>
                  </div>
                  <div className={styles.options}>
                    {OPTIONS.map(([name, detail], index) => (
                      <div className={styles.option} key={name}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <div><h3>{name}</h3><p>{detail}</p></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={`${styles.card} ${styles.reportCard}`}>
                  <div className={styles.reportHead}>
                    <span className={styles.label}>What&apos;s in the report</span>
                    <span className={styles.optionTime}>Back in 24 hours</span>
                  </div>
                  <ul>
                    {IN_REPORT.map(([name, detail]) => (
                      <li key={name}>
                        <i aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg></i>
                        <div><b>{name}</b><p>{detail}</p></div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
