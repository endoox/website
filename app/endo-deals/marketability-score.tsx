"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import styles from "./endo-deals.module.css";

const FACTORS = [
  { name: "Social analytics", score: 88, color: "#7db7ff", description: "Reach, engagement and sponsored performance across the athlete’s social platforms." },
  { name: "Performance", score: 81, color: "#4f8aef", description: "On-field performance, considered in the context of the athlete’s position and role." },
  { name: "Earned media", score: 92, color: "#b2d7ff", description: "The coverage, conversation and attention surrounding the athlete beyond their own channels." },
  { name: "League & market", score: 76, color: "#6b9bd4", description: "The league, audience and market context that help put an endorsement opportunity in perspective." },
] as const;

export function MarketabilityScore() {
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [focused, setFocused] = useState<number | null>(null);
  const active = hovered ?? focused ?? selected;

  return (
    <div className={styles.scorePreview}>
      <div className={styles.scoreDial}>
        <svg viewBox="0 0 320 320" aria-hidden="true">
          {FACTORS.map((factor, index) => (
            <g
              key={factor.name}
              className={styles.scoreRing}
              data-active={active === index}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            >
              <circle cx="160" cy="160" r={146 - index * 16} fill="none" stroke="currentColor" strokeOpacity=".08" strokeWidth="7" />
              <circle cx="160" cy="160" r={146 - index * 16} fill="none" className={styles.scoreArc} stroke={factor.color} strokeWidth="7" strokeLinecap="round" pathLength="100" strokeDasharray={`${factor.score} 100`} transform="rotate(-90 160 160)" />
            </g>
          ))}
        </svg>
        <div className={styles.scoreNumber}>
          <span>endo.deals score</span>
          <strong>87<span>/100</span></strong>
        </div>
      </div>
      <div className={styles.scoreFactors}>
        <p className={styles.scoreLabel}>What shapes the score</p>
        {FACTORS.map((factor, index) => (
          <button
            className={styles.factor}
            style={{ "--factor-color": factor.color } as CSSProperties}
            type="button"
            aria-pressed={selected === index}
            data-active={active === index}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setFocused(index)}
            onBlur={() => setFocused(null)}
            onClick={() => setSelected(index)}
            key={factor.name}
          >
            <span><i aria-hidden="true" />{factor.name}</span>
            <strong>{factor.score}</strong>
          </button>
        ))}
        <p className={styles.factorDescription} aria-live="polite">{FACTORS[active].description}</p>
      </div>
    </div>
  );
}
