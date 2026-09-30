"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./endo-deals.module.css";

type PillarKey = "aud" | "exp" | "eng" | "sen";

const PILLARS: {
  key: PillarKey;
  tag: string;
  name: string;
  color: string;
  score: number;
  radius: number;
  thesis: string;
  body: string;
  chips: string[];
  demo: ReactNode;
  why: string;
}[] = [
  {
    key: "aud",
    tag: "Scale",
    name: "Audience",
    color: "#0f1d6b",
    score: 56,
    radius: 184,
    thesis: "How many people the talent can reach, and whether that number is growing.",
    body: "Audience is the scale a brand is actually buying. We count followers across every platform the talent is active on, then look at how that audience has grown over the last three years. A rising account can outscore a bigger one that has gone flat, because brands want to back momentum, not just size.",
    chips: ["Followers on every platform", "Three-year growth", "Platform mix"],
    demo: (
      <>
        <DemoHead label="Followers" />
        <div className={styles.demoBig}>412K<small>↗ +112% in 3 years</small></div>
        <div className={styles.rows}>
          <Row label="Instagram" width="60%" value="248K" />
          <Row label="TikTok" width="24%" value="100K" />
          <Row label="YouTube" width="16%" value="64K" />
        </div>
      </>
    ),
    why: "It tells a brand how many people will see the partnership before a single post goes live.",
  },
  {
    key: "exp",
    tag: "Fame",
    name: "Exposure",
    color: "#8fd0ff",
    score: 90,
    radius: 158,
    thesis: "How often the world is talking about them, whether they post or not.",
    body: "Exposure measures fame beyond social media. We track how often the talent is mentioned across news, broadcast, blogs and forums across three years of history. It is the one pillar that does not depend on the talent posting anything, which makes it the clearest read on whether a name carries weight on a TV spot, a jersey or an appearance.",
    chips: ["Three years of mentions", "Where coverage comes from", "Spikes and trends"],
    demo: (
      <>
        <DemoHead label="Mentions per quarter" />
        <div className={styles.demoBig}>11,000<small>this quarter · a 3-year high</small></div>
        <div className={styles.cols}>
          {[22, 20, 26, 24, 25, 28, 30, 27, 29, 32, 31].map((height, index) => <i style={{ height: `${height}%` }} key={index} />)}
          <i className={styles.hot} style={{ height: "100%" }} />
        </div>
        <div className={styles.axis}><span>3 years ago</span><span>This quarter</span></div>
      </>
    ),
    why: "Most endorsement money buys a name, not a post. Exposure shows how far that name travels.",
  },
  {
    key: "eng",
    tag: "Attention",
    name: "Engagement",
    color: "#c9d8ff",
    score: 68,
    radius: 132,
    thesis: "How actively an audience responds when the talent shows up.",
    body: "A big following only matters if people are paying attention. Engagement looks at likes, comments, shares and views relative to the size of the audience, across three years of posts. A strong rate on one platform can be a weak rate on another, so every platform is judged against its own benchmark before the results come together. Nobody is penalized for where their fans happen to live, and dormant accounts never skew the result.",
    chips: ["Rate on each platform", "Platform benchmarks", "Active accounts only"],
    demo: (
      <>
        <DemoHead label="Rate vs. platform norm" />
        <div className={styles.rows} style={{ marginTop: 16 }}>
          <Row label="Instagram" width="55%" value="5.5%" bench="30%" />
          <Row label="TikTok" width="48%" value="9.5%" bench="35%" />
          <Row label="YouTube" width="38%" value="3.8%" bench="25%" />
        </div>
        <div className={styles.key}>
          <span><i style={{ background: "#4b7cd1" }} />Tyler</span>
          <span><i style={{ background: "#141a33", opacity: 0.4, width: 2, height: 10 }} />Typical for the platform</span>
        </div>
      </>
    ),
    why: "It predicts how a sponsored post will actually perform once it goes live.",
  },
  {
    key: "sen",
    tag: "Reputation",
    name: "Sentiment",
    color: "#46d39a",
    score: 74,
    radius: 106,
    thesis: "How people feel when they talk about them.",
    body: "Sentiment reads the tone of the conversation in two places: earned media coverage, and what fans say in comments and replies. Everything is sorted into positive, neutral and negative. Neutral coverage does not move the number, and negative coverage is treated as the risk it is, because a brand's downside from bad press is bigger than its upside from good press.",
    chips: ["Media tone", "Social tone", "Positive, neutral, negative"],
    demo: (
      <>
        <DemoHead label="Last 3 years" />
        <div className={styles.sent}>
          <Split label="Media coverage" summary="62% positive" parts={[62, 33, 5]} />
          <Split label="Social conversation" summary="55% positive" parts={[55, 37, 8]} />
        </div>
        <div className={styles.key}>
          <span><i style={{ background: "#2fae7a" }} />Positive</span>
          <span><i style={{ background: "#c9d4ee" }} />Neutral</span>
          <span><i style={{ background: "#d9534f" }} />Negative</span>
        </div>
      </>
    ),
    why: "It is the difference between a name brands want to stand next to and one they need to avoid.",
  },
];

const RULES: { title: string; body: string; icon: ReactNode }[] = [
  { title: "A brand-safety check", body: "If sentiment falls into problem territory, the score is capped, however strong the other pillars are. A big audience cannot hide a reputation issue.", icon: <><path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z" /><path d="M9 12l2 2 4-4" /></> },
  { title: "Fixed benchmarks, not a curve", body: "All talent is scored against the same fixed benchmarks, never against the rest of a roster. A score only moves when that talent's own data moves.", icon: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /> },
  { title: "No social, no penalty", body: "Some of the most marketable names do not run their own accounts. For them, the score is built from exposure and sentiment instead of reading a missing account as a missing audience.", icon: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></> },
  { title: "Rebuilt every week", body: "Scores refresh weekly as new data arrives, so a breakout week shows up in days, not at the next contract.", icon: <><path d="M21 12a9 9 0 1 1-3-6.7" /><path d="M21 4v5h-5" /></> },
  { title: "Tiers, not guesswork", body: "The score places talent in a tier and matches them with comps, so every conversation starts from the same reference point.", icon: <path d="M4 6h16M4 12h10M4 18h6" /> },
  { title: "The score never sets the price alone", body: "Pricing comes from the deliverables themselves. The score classifies the talent and is never used as a multiplier on a dollar figure.", icon: <path d="M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /> },
];

function DemoHead({ label }: { label: string }) {
  return <div className={styles.demoHead}><span>Example · Tyler Reid</span><span>{label}</span></div>;
}

function Row({ label, width, value, bench }: { label: string; width: string; value: string; bench?: string }) {
  return (
    <div className={styles.row}>
      <span>{label}</span>
      <div className={styles.bar}>
        <i style={{ width, background: bench ? "#4b7cd1" : undefined }} />
        {bench && <span className={styles.bench} style={{ left: bench }} />}
      </div>
      <b>{value}</b>
    </div>
  );
}

function Split({ label, summary, parts }: { label: string; summary: string; parts: [number, number, number] }) {
  const colors = ["#2fae7a", "#c9d4ee", "#d9534f"];
  return (
    <div>
      <div className={styles.sentLabel}><span>{label}</span><b>{summary}</b></div>
      <div className={styles.stack}>
        <div className={styles.stackFill}>{parts.map((part, index) => <i style={{ width: `${part}%`, background: colors[index] }} key={index} />)}</div>
      </div>
    </div>
  );
}

export function Pillars() {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<PillarKey>("aud");

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const stories = Array.from(root.querySelectorAll<HTMLElement>("[data-pillar]"));

    // Highlight the pillar whose section has crossed the middle of the screen.
    let frame = 0;
    const sync = () => {
      frame = 0;
      let pick = stories[0];
      for (const story of stories) if (story.getBoundingClientRect().top <= innerHeight * 0.5) pick = story;
      setActive(pick.dataset.pillar as PillarKey);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(sync); };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", sync);
    sync();

    // Grow each example card's bars the first time it scrolls into view.
    let observer: IntersectionObserver | undefined;
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.dataset.animate = "true";
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.seen = "true";
          observer?.unobserve(entry.target);
        }
      }, { threshold: 0.3 });
      root.querySelectorAll(`.${styles.demo}`).forEach((demo) => observer?.observe(demo));
    }

    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", sync);
      observer?.disconnect();
    };
  }, []);

  const current = PILLARS.find((pillar) => pillar.key === active) ?? PILLARS[0];

  return (
    <>
      <section ref={rootRef} className={styles.pillars} id="pillars" aria-labelledby="pillars-heading">
        <div className={`${styles.in} ${styles.intro}`}>
          <h2 id="pillars-heading">A fuller picture of marketability.</h2>
          <p>Built from who follows them, who talks about them and how they feel. Four signals, measured the same way for all talent across three years of history, and rebuilt every week.</p>
        </div>

        <div className={`${styles.in} ${styles.split}`}>
          <div className={styles.stick} aria-hidden="true">
            <div className={styles.orb}>
              <svg viewBox="0 0 400 400">
                {PILLARS.map((pillar) => <circle className={styles.track} cx="200" cy="200" r={pillar.radius} key={pillar.key} />)}
                {PILLARS.map((pillar) => {
                  const length = 2 * Math.PI * pillar.radius;
                  return (
                    <circle
                      className={`${styles.arc} ${pillar.key === active ? styles.arcOn : ""}`}
                      cx="200"
                      cy="200"
                      r={pillar.radius}
                      stroke={pillar.color}
                      strokeDasharray={length}
                      strokeDashoffset={length * (1 - pillar.score / 100)}
                      transform="rotate(-90 200 200)"
                      key={pillar.key}
                    />
                  );
                })}
              </svg>
              <div className={styles.orbCenter}><div><small>{current.tag}</small><b>{current.name}</b></div></div>
              <div className={styles.orbLegend}>
                {PILLARS.map((pillar) => (
                  <a href={`#p-${pillar.key}`} className={pillar.key === active ? styles.legendOn : ""} key={pillar.key}>
                    <i style={{ background: pillar.color, boxShadow: pillar.key === "aud" ? "0 0 0 1.5px rgb(255 255 255 / 70%)" : undefined }} />
                    {pillar.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div>
            {PILLARS.map((pillar) => (
              <article className={styles.story} id={`p-${pillar.key}`} data-pillar={pillar.key} key={pillar.key}>
                <h3>{pillar.name}</h3>
                <p className={styles.storyThesis}>{pillar.thesis}</p>
                <p className={styles.storyBody}>{pillar.body}</p>
                <div className={styles.chips}>{pillar.chips.map((chip) => <span key={chip}>{chip}</span>)}</div>
                <div className={styles.demo}>{pillar.demo}</div>
                <div className={styles.why}><small>Why brands care</small>{pillar.why}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.light} aria-labelledby="honest-heading">
        <div className={`${styles.in} ${styles.honest}`}>
          <div className={styles.honestHead}>
            <h2 id="honest-heading">How the score stays honest.</h2>
            <p>A score is only useful if agents and brands can rely on it. These rules hold for all talent, every week.</p>
          </div>
          <div className={styles.rules}>
            {RULES.map((rule) => (
              <div className={styles.rule} key={rule.title}>
                <span className={styles.ruleIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{rule.icon}</svg>
                </span>
                <b>{rule.title}</b>
                <p>{rule.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

