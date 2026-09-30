"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./about.module.css";

const ROWS = [
  { key: "Revenue", title: "Put a number on it.", body: "Talent has been underpaid because nobody could prove their marketing value. endo puts a real number behind every deal." },
  { key: "Time", title: "Run the book, not the inbox.", body: "Agents spend their days digging through email instead of building careers. endo keeps every contract, payment and deliverable in one place." },
  { key: "Transparency", title: "Everyone sees the same page.", body: "Talent and their families deserve to see what’s being done for them. endo gives everyone the same view." },
  { key: "Status", title: "Be the agency talent wants to sign with.", body: "The next generation picks agencies that look like the future. endo is how a modern agency runs." },
] as const;

export function OurWhy() {
  const rowsRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Light up the row whose top has scrolled past ~42% of the viewport.
  useEffect(() => {
    const rows = Array.from(rowsRef.current?.children ?? []);
    let frame = 0;
    const sync = () => {
      frame = 0;
      let pick = 0;
      rows.forEach((row, index) => { if (row.getBoundingClientRect().top <= innerHeight * 0.42) pick = index; });
      setActive(pick);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(sync); };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", sync);
    sync();
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", sync);
    };
  }, []);

  return (
    <section className={styles.why} aria-labelledby="why-heading">
      <div className={styles.whyGrid}>
        <div>
          <div className={styles.whySticky}>
            <h2 id="why-heading">We spent years inside the business, <span>watching great agents run everything by hand.</span></h2>
          </div>
        </div>
        <div className={styles.whyRows} ref={rowsRef}>
          {ROWS.map((row, index) => (
            <div className={`${styles.whyRow} ${index === active ? styles.whyRowOn : ""}`} key={row.key}>
              <p>{row.key}</p>
              <div><h3>{row.title}</h3><p>{row.body}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
