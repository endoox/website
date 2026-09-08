import Image from "next/image";
import styles from "./endo-deals/endo-deals.module.css";

// Leagues named in the supplied reference; no unverified coverage total.
const LEAGUES = [
  { name: "NFL", file: "nfl" },
  { name: "NBA", file: "nba" },
  { name: "MLB", file: "mlb" },
  { name: "NHL", file: "nhl" },
  { name: "WNBA", file: "wnba" },
] as const;

export function LeagueCoverage() {
  return (
    <section className={styles.coverage} aria-labelledby="leagues-heading">
      <h2 id="leagues-heading">Where our athletes compete.</h2>
      <p>Different leagues. Different opportunities.<br />One place to manage the business behind the athlete.</p>
      <ul className={styles.leagueRow} aria-label="Featured leagues">
        {LEAGUES.map((league) => <li key={league.file}><Image src={`/leagues/${league.file}.png`} alt={league.name} width={500} height={500} sizes="(max-width: 760px) 60px, 100px" /></li>)}
      </ul>
    </section>
  );
}
