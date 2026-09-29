import Image from "next/image";
import pageStyles from "./page.module.css";
import styles from "./endo-deals/endo-deals.module.css";

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
    </section>
  );
}
