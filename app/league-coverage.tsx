import Image from "next/image";
import Link from "next/link";
import { PRESS } from "@/lib/press";
import pageStyles from "./page.module.css";
import styles from "./league-coverage.module.css";

// Leagues named in the supplied reference; no unverified coverage total.
const LEAGUES = [
  { name: "NFL", file: "nfl" },
  { name: "NBA", file: "nba" },
  { name: "MLB", file: "mlb" },
  { name: "NHL", file: "nhl" },
  { name: "WNBA", file: "wnba" },
  { name: "NCAA", file: "ncaa" },
  { name: "CHL", file: "chl" },
  { name: "PWHL", file: "pwhl" },
  { name: "AHL", file: "ahl" },
  { name: "Olympics", file: "olympics" },
  { name: "Paralympics", file: "paralympics" },
] as const;

export function LeagueCoverage() {
  return (
    <section className={styles.coverage} aria-labelledby="leagues-heading">
      <div className={`${pageStyles.sectionHeading} ${pageStyles.scrollReveal}`} data-scroll-reveal>
        <h2 id="leagues-heading">Talent managed from across the board</h2>
        <p>Different leagues. Different opportunities.<br />One place to manage the business behind the athlete.</p>
      </div>
      <ul className={styles.leagueRow} aria-label="Featured leagues">
        {LEAGUES.map((league) => <li key={league.file}><Image src={`/leagues/${league.file}.png`} alt={league.name} width={500} height={500} sizes="(max-width: 760px) 60px, 100px" /></li>)}
      </ul>
      {PRESS.length > 0 && (
        <div className={styles.press}>
          <Link href="/press">As seen in</Link>
          <ul aria-label="Press coverage">
            {PRESS.map((item) => <li key={item.href}><a href={item.href} target="_blank" rel="noreferrer">{item.outlet}</a></li>)}
          </ul>
        </div>
      )}
    </section>
  );
}
