"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

export type ProductMode =
  | "valuation"
  | "contracts"
  | "roster"
  | "financials"
  | "deliverables"
  | "pipeline";

const THEATER_TABS: { label: string; mode: ProductMode }[] = [
  { label: "Valuation", mode: "valuation" },
  { label: "Contracts", mode: "contracts" },
  { label: "Roster", mode: "roster" },
  { label: "Financials", mode: "financials" },
  { label: "Deliverables", mode: "deliverables" },
  { label: "Pipeline", mode: "pipeline" },
];

const athleteNames = ["Jordan Mills", "Avery Cole", "Cam Reed", "Sofia Grant"];

function Shell({ children, compact }: { children: React.ReactNode; compact?: boolean }) {
  return (
    <div className={`${styles.productWindow} ${compact ? styles.productWindowCompact : ""}`}>
      <aside className={styles.productRail} aria-hidden="true">
        <b>e.</b><i /><i /><i /><i /><span>WK</span>
      </aside>
      <div className={styles.productBody}>
        <div className={styles.productToolbar}>
          <div><strong>Endo</strong><span>Agency workspace</span></div>
          <div className={styles.productToolbarActions}><span>Search</span><i>WK</i></div>
        </div>
        {children}
      </div>
    </div>
  );
}

function ValuationScreen({ compact }: { compact?: boolean }) {
  return (
    <Shell compact={compact}>
      <div className={styles.productContent}>
        <div className={styles.productTitle}><div><span>Endodeal valuation</span><h4>Jordan Mills × Northstar</h4></div><button>Share</button></div>
        <div className={styles.valuationGrid}>
          <section className={styles.valuationScore}>
            <p>Recommended deal value</p><strong>$72,500</strong><span>High confidence · 18 comparables</span>
            <div className={styles.valueRange}><i /><b /></div>
            <div className={styles.valueRangeLabels}><span>$54K</span><span>$92K</span></div>
          </section>
          <section className={styles.driverCard}>
            <p>Value drivers</p>
            <div><span>Audience fit</span><i><b style={{ width: "88%" }} /></i><em>8.8</em></div>
            <div><span>Exclusivity</span><i><b style={{ width: "72%" }} /></i><em>7.2</em></div>
            <div><span>Usage rights</span><i><b style={{ width: "64%" }} /></i><em>6.4</em></div>
          </section>
          <section className={styles.comparableCard}>
            <p>Comparable deals</p>
            {["National apparel", "Regional auto", "Sports nutrition"].map((item, index) => (
              <div key={item}><span>{item}</span><b>{["$78K", "$64K", "$75K"][index]}</b></div>
            ))}
          </section>
        </div>
      </div>
    </Shell>
  );
}

function ContractsScreen({ compact }: { compact?: boolean }) {
  return (
    <Shell compact={compact}>
      <div className={styles.productContent}>
        <div className={styles.productTitle}><div><span>Contracts</span><h4>Agreement command center</h4></div><button>New contract</button></div>
        <div className={styles.contractSummary}>
          <div><span>Active value</span><strong>$1.84M</strong><small>+18% this year</small></div>
          <div><span>Active contracts</span><strong>38</strong><small>Across 14 athletes</small></div>
          <div><span>Renewing soon</span><strong>6</strong><small>Next 60 days</small></div>
        </div>
        <div className={styles.productTable}>
          <div className={styles.tableHeader}><span>Partner</span><span>Athlete</span><span>Value</span><span>Status</span></div>
          {["Northstar", "Apex Hydration", "Crown Mobile", "Fieldhouse"].map((brand, index) => (
            <div className={styles.tableRow} key={brand}>
              <span><i>{brand.charAt(0)}</i>{brand}</span><span>{athleteNames[index]}</span><span>{["$72.5K", "$48K", "$125K", "$36K"][index]}</span><span><b>{index === 2 ? "Review" : "Active"}</b></span>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
}

function RosterScreen({ compact }: { compact?: boolean }) {
  return (
    <Shell compact={compact}>
      <div className={styles.productContent}>
        <div className={styles.productTitle}><div><span>Roster</span><h4>Every athlete, fully visible</h4></div><button>Add athlete</button></div>
        <div className={styles.rosterGrid}>
          {athleteNames.map((athlete, index) => (
            <article key={athlete}>
              <div className={styles.rosterAvatar}>{athlete.split(" ").map((part) => part[0]).join("")}</div>
              <div><strong>{athlete}</strong><span>{["Basketball", "Football", "Hockey", "Soccer"][index]}</span></div>
              <dl><div><dt>Active deals</dt><dd>{[6, 4, 7, 5][index]}</dd></div><div><dt>Pipeline</dt><dd>{["$210K", "$145K", "$310K", "$185K"][index]}</dd></div></dl>
              <i><b style={{ width: `${[78, 54, 90, 68][index]}%` }} /></i>
            </article>
          ))}
        </div>
      </div>
    </Shell>
  );
}

function FinancialScreen({ compact }: { compact?: boolean }) {
  return (
    <Shell compact={compact}>
      <div className={styles.productContent}>
        <div className={styles.productTitle}><div><span>Financials</span><h4>Revenue and payment health</h4></div><button>Export</button></div>
        <div className={styles.financeSummary}><div><span>Contracted revenue</span><strong>$2.48M</strong></div><div><span>Collected</span><strong>$1.86M</strong></div><div><span>Outstanding</span><strong>$620K</strong></div></div>
        <section className={styles.financeChart}>
          <div className={styles.chartHead}><div><p>Revenue performance</p><strong>$2.48M</strong></div><span>Jan — Dec</span></div>
          <div className={styles.chartArea} aria-hidden="true">
            {[28, 38, 34, 52, 48, 63, 72, 66, 84, 91, 88, 100].map((height, index) => <i style={{ height: `${height}%` }} key={index}><b /></i>)}
          </div>
          <div className={styles.chartLabels}><span>Jan</span><span>Apr</span><span>Jul</span><span>Oct</span><span>Dec</span></div>
        </section>
      </div>
    </Shell>
  );
}

function DeliverablesScreen({ compact }: { compact?: boolean }) {
  return (
    <Shell compact={compact}>
      <div className={styles.productContent}>
        <div className={styles.productTitle}><div><span>Deliverables</span><h4>August obligation calendar</h4></div><button>New deliverable</button></div>
        <div className={styles.calendarWrap}>
          <div className={styles.calendar}>
            {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => <b key={day}>{day}</b>)}
            {Array.from({ length: 20 }, (_, index) => (
              <div className={[3, 7, 9, 13, 16, 18].includes(index) ? styles.calendarActive : ""} key={index}>
                <span>{index + 4}</span>
                {[3, 7, 9, 13, 16, 18].includes(index) && <i>{index % 2 ? "Post" : "Shoot"}</i>}
              </div>
            ))}
          </div>
          <aside className={styles.upNext}>
            <p>Up next</p>
            <article><i /><div><strong>Northstar campaign</strong><span>Social post · Today</span></div></article>
            <article><i /><div><strong>Apex content day</strong><span>Photo shoot · Thu</span></div></article>
            <article><i /><div><strong>Fieldhouse event</strong><span>Appearance · Fri</span></div></article>
          </aside>
        </div>
      </div>
    </Shell>
  );
}

function PipelineScreen({ compact }: { compact?: boolean }) {
  const columns = [
    { title: "Qualified", items: ["Northstar", "Brew House"] },
    { title: "Proposal", items: ["Apex Hydration", "Crown Mobile"] },
    { title: "Negotiation", items: ["Fieldhouse", "Vantage Auto"] },
  ];
  return (
    <Shell compact={compact}>
      <div className={styles.productContent}>
        <div className={styles.productTitle}><div><span>Pipeline</span><h4>$1.24M in active opportunities</h4></div><button>New opportunity</button></div>
        <div className={styles.pipelineBoard}>
          {columns.map((column, columnIndex) => (
            <section key={column.title}>
              <div><strong>{column.title}</strong><span>{column.items.length}</span></div>
              {column.items.map((item, itemIndex) => (
                <article key={item}><span>{item}</span><strong>{["$85K", "$42K", "$120K", "$64K", "$96K", "$74K"][columnIndex * 2 + itemIndex]}</strong><small>{athleteNames[(columnIndex + itemIndex) % athleteNames.length]}</small><i><b /></i></article>
              ))}
            </section>
          ))}
        </div>
      </div>
    </Shell>
  );
}

export function ProductWindow({ mode, compact = false }: { mode: ProductMode; compact?: boolean }) {
  if (mode === "contracts") return <ContractsScreen compact={compact} />;
  if (mode === "roster") return <RosterScreen compact={compact} />;
  if (mode === "financials") return <FinancialScreen compact={compact} />;
  if (mode === "deliverables") return <DeliverablesScreen compact={compact} />;
  if (mode === "pipeline") return <PipelineScreen compact={compact} />;
  return <ValuationScreen compact={compact} />;
}

export function ProductTheater() {
  const [activeMode, setActiveMode] = useState<ProductMode>("valuation");
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setActiveMode((current) => {
        const currentIndex = THEATER_TABS.findIndex((tab) => tab.mode === current);
        return THEATER_TABS[(currentIndex + 1) % THEATER_TABS.length].mode;
      });
    }, 5200);
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <div className={styles.productTheater} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className={styles.theaterGlow} aria-hidden="true" />
      <div className={styles.theaterWindow} key={activeMode}>
        <ProductWindow mode={activeMode} />
      </div>
      <div className={styles.theaterTabs} role="tablist" aria-label="Preview Endo features">
        {THEATER_TABS.map((tab) => (
          <button
            className={activeMode === tab.mode ? styles.theaterTabActive : ""}
            type="button"
            role="tab"
            aria-selected={activeMode === tab.mode}
            onClick={() => setActiveMode(tab.mode)}
            key={tab.mode}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
