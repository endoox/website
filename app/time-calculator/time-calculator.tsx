"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { DEMO_URL } from "@/lib/contact";
import { LINKEDIN_CONVERSIONS, trackLinkedIn } from "@/lib/linkedin";
import { readAttribution, UtmFields, utmValues } from "../attribution";
import pageStyles from "../page.module.css";
import styles from "./time-calculator.module.css";

// Agency time calculator (app/time-calculator): six questions set each task's volume, and a live
// "agency week" chart, the result and an editable assumptions table all follow from them.

type Size = "s" | "m" | "l" | "xl";
type Task = {
  id: string;
  name: string;
  desc: string;
  per: "week" | "month";
  unitWord: string;
  min: number;
  share: number;
  color: string;
  typ: Record<Size, number>;
  // Asked as its own question; the social tracking volume comes from the roster size instead.
  q?: string;
  hint?: string;
  opts?: number[];
};

const SIZES: { k: Size; label: string }[] = [
  { k: "s", label: "1–15" },
  { k: "m", label: "16–40" },
  { k: "l", label: "41–100" },
  { k: "xl", label: "100+" },
];

const TASKS: Task[] = [
  { id: "deals", name: "Deal & contract entry", desc: "Logging terms, deliverables, dates and files", per: "month", unitWord: "deals", min: 45, share: 60, color: "#c9d2df",
    q: "How many brand deals does your agency sign a month?", hint: "Endorsements, appearances and content deals.", opts: [2, 5, 10, 25, 50, 100], typ: { s: 5, m: 10, l: 25, xl: 50 } },
  { id: "pitches", name: "Pitches & media kits", desc: "Pulling stats, socials and past deals into a kit", per: "week", unitWord: "pitches", min: 60, share: 75, color: "#aeb9c9",
    q: "How many brand pitches go out each week?", hint: "Every pitch usually means a fresh media kit or deck.", opts: [1, 3, 6, 12, 20, 40], typ: { s: 3, m: 6, l: 12, xl: 20 } },
  { id: "neg", name: "Deal negotiations", desc: "Pulling comps, valuations and past rates to price a counter", per: "week", unitWord: "negotiations", min: 45, share: 50, color: "#8f9cb0",
    q: "How many deal negotiations do you deal with each week?", hint: "New deals, renewals and counteroffers all count.", opts: [5, 10, 20, 40, 75, 150], typ: { s: 10, m: 20, l: 40, xl: 75 } },
  { id: "pay", name: "Payment processing", desc: "Logging payments, matching invoices, splitting commission", per: "month", unitWord: "payments", min: 15, share: 55, color: "#717f96",
    q: "How many payments do you process every month?", hint: "Brand-to-agency and brand-to-athlete both count.", opts: [25, 50, 100, 200, 400, 800], typ: { s: 50, m: 100, l: 200, xl: 400 } },
  { id: "asks", name: "Athlete requests", desc: "Chasing content, approvals, signatures and availability", per: "week", unitWord: "requests", min: 8, share: 60, color: "#55627a",
    q: "How many times do you ask your athletes for something each week?", hint: "Content for a post, a signature, an approval, their availability.", opts: [20, 50, 100, 200, 400, 800], typ: { s: 50, m: 100, l: 200, xl: 400 } },
  { id: "social", name: "Social & stats tracking", desc: "Pulling follower counts, engagement and game stats by hand", per: "week", unitWord: "athletes tracked", min: 10, share: 85, color: "#dde3ec",
    typ: { s: 10, m: 28, l: 70, xl: 130 } },
];
const ASKED = TASKS.filter((task) => task.q);
const QUESTION_COUNT = ASKED.length + 1;
const WEEKS_PER_MONTH = 4.33;
// endo's estimate of an agent's loaded hourly cost (salary plus benefits).
const HOURLY = 45;

const floor = (n: number) => Math.floor(n).toLocaleString("en-US");
const oneDecimal = (n: number) => (Math.round(n * 10) / 10).toLocaleString("en-US");
const dollars = (savedWeekly: number) => `$${(Math.floor((savedWeekly * 52 * HOURLY) / 100) * 100).toLocaleString("en-US")}`;

type Assumptions = Record<string, { min: number; share: number }>;
const DEFAULT_ASSUMPTIONS: Assumptions = Object.fromEntries(TASKS.map((task) => [task.id, { min: task.min, share: task.share }]));

export function TimeCalculator() {
  const [step, setStep] = useState(0);
  const [size, setSize] = useState<Size | null>(null);
  const [volumes, setVolumes] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);
  const [assumptions, setAssumptions] = useState(DEFAULT_ASSUMPTIONS);
  const [other, setOther] = useState("");
  const [toast, setToast] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const weekly = (task: Task) => {
    const volume = volumes[task.id];
    if (volume === undefined) return 0;
    return task.per === "month" ? volume / WEEKS_PER_MONTH : volume;
  };
  const adminHours = (task: Task) => (weekly(task) * assumptions[task.id].min) / 60;
  const savedHours = (task: Task) => (adminHours(task) * assumptions[task.id].share) / 100;
  const totalAdmin = TASKS.reduce((sum, task) => sum + adminHours(task), 0);
  const saved = TASKS.reduce((sum, task) => sum + savedHours(task), 0);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 1800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  function answer(task: Task, value: number) {
    setVolumes((current) => ({ ...current, [task.id]: value }));
    setOther("");
    if (step < ASKED.length) setStep(step + 1);
    else setDone(true);
  }

  function pickSize(next: Size) {
    setSize(next);
    setVolumes((current) => ({ ...current, social: TASKS.find((task) => task.id === "social")!.typ[next] }));
    setStep(1);
  }

  function restart() {
    setStep(0);
    setSize(null);
    setVolumes({});
    setDone(false);
  }

  // Editing the table fills in any unanswered volume, which counts as finishing the questions.
  function editVolume(task: Task, value: number) {
    const next = { ...volumes, [task.id]: value };
    setVolumes(next);
    if (!done && TASKS.every((t) => next[t.id] !== undefined)) setDone(true);
  }
  const editAssumption = (task: Task, key: "min" | "share", value: number) =>
    setAssumptions((current) => ({ ...current, [task.id]: { ...current[task.id], [key]: key === "share" ? Math.min(100, value) : value } }));

  function openResult() {
    resultRef.current?.scrollIntoView({ block: "start" });
    dialogRef.current?.showModal();
  }

  async function share() {
    const text = "Our agency's week, run through endo's time calculator:";
    const full = `${text}\nendo could take ${floor(saved)} hours off our agency's week (${floor(saved * WEEKS_PER_MONTH)} hours a month).\nendodeals.com/time-calculator`;
    const png = await shareCard(saved).catch(() => null);
    try {
      const file = png && new File([png], "endo-time-calculator.png", { type: "image/png" });
      if (file && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ text, files: [file] });
        return;
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
    }
    try {
      if (!png) throw new Error("No image");
      await navigator.clipboard.write([new ClipboardItem({ "image/png": png, "text/plain": new Blob([text], { type: "text/plain" }) })]);
      setToast("Copied. Paste it into a message.");
      return;
    } catch {
      // Image clipboard isn't supported everywhere; fall back to text.
    }
    try {
      await navigator.clipboard.writeText(full);
      setToast("Copied. Paste it into a message.");
    } catch {
      setToast("Copy isn’t available here");
    }
  }

  // The week chart: each task's hours as blocks dealt across Monday to Friday, endo's share in blue.
  const unit = totalAdmin > 200 ? 4 : totalAdmin > 90 ? 2 : 1;
  const days: { color: string; endo: boolean }[][] = [[], [], [], [], []];
  let dealt = 0;
  for (const task of TASKS) {
    const blocks = Math.round(adminHours(task) / unit);
    const endoBlocks = done ? Math.round((blocks * assumptions[task.id].share) / 100) : 0;
    for (let i = 0; i < blocks; i++) days[dealt++ % 5].push({ color: task.color, endo: i < endoBlocks });
  }
  const tallest = Math.max(1, ...days.map((day) => day.length));
  const blockHeight = Math.max(4, Math.min(14, Math.floor(270 / tallest) - 3));

  const answered = TASKS.filter((task) => volumes[task.id] !== undefined);
  const trail = answered.length > 0 && (
    <div className={styles.trail}>
      {answered.map((task) => (
        <div className={styles.trailRow} key={task.id}>
          <i style={{ background: task.color }} />
          <div>
            <b>{task.name}</b>
            <span>{floor(volumes[task.id])} {task.unitWord} a {task.per} × {assumptions[task.id].min} min = <em>{oneDecimal(adminHours(task))} h a week</em></span>
          </div>
        </div>
      ))}
    </div>
  );

  const question = ASKED[step - 1];
  const typical = question ? question.typ[size ?? "m"] : 0;

  return (
    <>
      <div className={styles.calc}>
        <div className={styles.question} aria-live="polite">
          {done ? (
            <>
              <p className={styles.eyebrow}>Done</p>
              <h2>The blue blocks are the hours endo takes on.</h2>
              <p className={styles.hint}>endo fills in deal records, builds media kits, backs negotiations with valuation data, and keeps payments, athlete requests and stats in one place. Your agents check the work and close the deals.</p>
              {trail}
              <div className={styles.actions}>
                <button className={`${pageStyles.demoButton} ${styles.button}`} type="button" onClick={openResult}>
                  <span>See my result</span>
                  <Arrow />
                </button>
                <button className={styles.secondary} type="button" onClick={restart}>Start over</button>
              </div>
            </>
          ) : (
            <>
              <div className={styles.questionHead}>
                <p className={styles.eyebrow}>Question {step + 1} of {QUESTION_COUNT}</p>
                {step > 0 && <button className={styles.back} type="button" onClick={() => setStep(step - 1)}>Back</button>}
              </div>
              {step === 0 ? (
                <>
                  <h2>How many athletes are on your roster?</h2>
                  <p className={styles.hint}>We use it to suggest typical numbers and to count the athletes whose socials and stats you track each week.</p>
                  <div className={styles.options}>
                    {SIZES.map((option) => (
                      <button className={styles.option} data-selected={size === option.k || undefined} type="button" key={option.k} onClick={() => pickSize(option.k)}>
                        <span>{option.label}</span><small>athletes</small>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <h2>{question.q}</h2>
                  <p className={styles.hint}>{question.hint} Typical for your size: {typical}.</p>
                  <div className={styles.options}>
                    {question.opts!.map((value) => (
                      <button className={styles.option} data-selected={volumes[question.id] === value || undefined} type="button" key={value} onClick={() => answer(question, value)}>
                        <span>{value}</span>{value === typical && <small>typical</small>}
                      </button>
                    ))}
                    <button className={styles.option} data-selected={volumes[question.id] === 0 || undefined} type="button" onClick={() => answer(question, 0)}>
                      <span>Not us</span>
                    </button>
                  </div>
                  <form
                    className={styles.other}
                    onSubmit={(event) => {
                      event.preventDefault();
                      const value = parseFloat(other);
                      if (!Number.isNaN(value) && value >= 0) answer(question, value);
                    }}
                  >
                    <label htmlFor="calculator-other">Other</label>
                    <input id="calculator-other" type="number" min="0" inputMode="decimal" placeholder={String(typical)} value={other} onChange={(event) => setOther(event.target.value)} />
                    <button className={styles.secondary} type="submit">Next</button>
                  </form>
                </>
              )}
              {trail}
            </>
          )}
        </div>

        <div className={styles.week}>
          <div className={styles.weekHead}>
            <h3>Your agency’s week</h3>
            <span>{done ? `${floor(totalAdmin - saved)} h of admin left` : `${floor(totalAdmin)} h of admin`}</span>
          </div>
          <div className={styles.chart} aria-hidden="true">
            {days.map((day, index) => (
              <div className={styles.day} key={index}>
                {day.map((block, i) => <div key={i} style={{ height: blockHeight, background: block.endo ? "var(--blue)" : block.color }} />)}
              </div>
            ))}
          </div>
          <div className={styles.days} aria-hidden="true"><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span></div>
          <div className={styles.legend}>
            {TASKS.map((task) => <span key={task.id}><i style={{ background: task.color }} />{task.name}</span>)}
            <span><i style={{ background: "var(--blue)" }} />endo</span>
            <span className={styles.unit}>1 block = {unit} h</span>
          </div>
        </div>
      </div>

      <div ref={resultRef} id="result" className={styles.result} data-pending={!done || undefined}>
        <div className={styles.big}>
          <h2>
            {done ? <>endo takes <span>{floor(saved)} hours</span> off your agency’s week.</> : "Answer the questions to see what endo takes off your week."}
          </h2>
          <div className={styles.bigFoot}>
            <p>Rounded down. Change any assumption below and every number follows.</p>
            <button className={styles.secondary} type="button" onClick={share} disabled={!done}>Send to my partner</button>
          </div>
        </div>
        <div className={styles.stats}>
          <div><b>{floor(saved * WEEKS_PER_MONTH)}</b><span>hours a month</span></div>
          <div><b>{floor((saved * 52) / 8)}</b><span>working days a year</span></div>
          <div><b>{dollars(saved)}</b><span>of agent time a year back on clients and brands</span></div>
        </div>
      </div>

      <div className={styles.cta}>
        <div className={styles.ctaCard}>
          <h3>Get the full report by email*</h3>
          <p>Hours per task and per year, the assumptions behind each number, and where an agency your size usually starts.</p>
          <p className={styles.fine}>* One email with your report, then a few emails from endo. Unsubscribe in one click.</p>
          <ReportForm id="report-email" />
        </div>
        <div className={`${styles.ctaCard} ${styles.dark}`}>
          <h3>Rather see it on your own roster?</h3>
          <a className={`${pageStyles.demoButton} ${styles.button}`} href={DEMO_URL}>
            <span>Book a demo</span>
            <Arrow />
          </a>
        </div>
      </div>

      <details className={styles.assumptions}>
        <summary>Our assumptions (change any of them)</summary>
        <p>Your answers set the volume. Minutes per task and the share endo takes on are endo estimates, not published studies. The dollar figure uses ${HOURLY} an hour, an endo estimate of an agent’s salary plus benefits.</p>
        <div className={styles.tableWrap}>
          <table>
            <thead><tr><th>Task</th><th>Volume</th><th>Minutes each</th><th>Share endo takes on</th><th>Saved per week</th></tr></thead>
            <tbody>
              {TASKS.map((task) => (
                <tr key={task.id}>
                  <td className={styles.task}><b>{task.name}</b><span>{task.desc}</span></td>
                  <td>
                    <input type="number" min="0" aria-label={`${task.name} volume`} value={volumes[task.id] ?? task.typ[size ?? "m"]} onChange={(event) => editVolume(task, parseFloat(event.target.value) || 0)} />
                    <span className={styles.cellUnit}>a {task.per}</span>
                  </td>
                  <td>
                    <input type="number" min="0" aria-label={`${task.name} minutes each`} value={assumptions[task.id].min} onChange={(event) => editAssumption(task, "min", parseFloat(event.target.value) || 0)} />
                    <span className={styles.cellUnit}>min</span>
                  </td>
                  <td>
                    <input type="number" min="0" max="100" aria-label={`${task.name} share endo takes on`} value={assumptions[task.id].share} onChange={(event) => editAssumption(task, "share", parseFloat(event.target.value) || 0)} />
                    <span className={styles.cellUnit}>%</span>
                  </td>
                  <td className={styles.savedCell}>{oneDecimal(savedHours(task))} h</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>

      {/* A click on the backdrop lands on the dialog itself, not its contents, and closes it. */}
      <dialog ref={dialogRef} className={styles.dialog} aria-labelledby="calculator-result-title" onClick={(event) => event.target === event.currentTarget && dialogRef.current?.close()}>
        <div className={styles.sheetTop}>
          <button className={styles.close} type="button" onClick={() => dialogRef.current?.close()} aria-label="Close">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
          <p className={styles.eyebrow}>Your result</p>
          <h2 id="calculator-result-title"><span>{floor(saved * WEEKS_PER_MONTH)}</span> hours back a month</h2>
          <p>about {dollars(saved)} a year of agent time back on clients and brands</p>
        </div>
        <div className={styles.sheetBody}>
          <h3>Get the full report by email*</h3>
          <p>Hours per task and per year, the assumptions behind each number, and where an agency your size usually starts.</p>
          <p className={styles.fine}>* One email with your report, then a few emails from endo. Unsubscribe in one click.</p>
          <ReportForm id="report-email-modal" />
        </div>
      </dialog>

      <div className={styles.toast} data-on={toast ? "" : undefined} role="status">{toast}</div>
    </>
  );
}

function Arrow() {
  return (
    <span className={pageStyles.demoButtonArrow} aria-hidden="true">
      <svg viewBox="0 0 24 24"><path d="M5 12h14M13.5 6.5 19 12l-5.5 5.5" /></svg>
    </span>
  );
}

// The report email signup: saved to Attio's Newsletter list (app/api/subscribe) with this page as the
// source, and counted as the LinkedIn report download conversion.
function ReportForm({ id }: { id: string }) {
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [sentTo, setSentTo] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a work email like you@agency.com.");
      return;
    }
    setState("sending");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website: String(form.get("website") ?? ""), sourcePage: window.location.pathname, ...readAttribution(), ...utmValues(form) }),
      });
      if (!response.ok) {
        const result = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(result.error ?? "Something went wrong. Please try again.");
      }
    } catch (failure) {
      setError(failure instanceof Error && failure.message !== "Failed to fetch" ? failure.message : "Something went wrong. Please try again.");
      setState("idle");
      return;
    }
    trackLinkedIn(LINKEDIN_CONVERSIONS.reportDownload);
    setSentTo(email);
    setState("done");
  }

  if (state === "done") return <p className={styles.ok} role="status">Thanks. Your report will go to {sentTo}.</p>;

  return (
    <form className={styles.email} onSubmit={onSubmit} noValidate>
      <label className={styles.visuallyHidden} htmlFor={id}>Work email</label>
      <input id={id} name="email" type="email" autoComplete="email" placeholder="you@agency.com" />
      <button className={`${pageStyles.demoButton} ${styles.button}`} type="submit" disabled={state === "sending"}>
        <span>{state === "sending" ? "Sending…" : "Send my report"}</span>
        <Arrow />
      </button>
      <input className={styles.trap} name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <UtmFields />
      {error && <p className={styles.error} role="alert">{error}</p>}
    </form>
  );
}

// The "Send to my partner" share image: the result as a 1200×630 card in the site's colors.
async function shareCard(saved: number) {
  await document.fonts.ready.catch(() => undefined);
  const width = 1200;
  const height = 630;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("No canvas");
  const font = getComputedStyle(document.body).getPropertyValue("--font-geist-sans").trim() || "Arial";
  const rounded = (x: number, y: number, w: number, h: number, r: number) => {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
  };

  ctx.fillStyle = "#242d6d";
  rounded(0, 0, width, height, 36);
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.font = `600 44px ${font}`;
  ctx.fillText("endo", 64, 96);
  ctx.fillStyle = "#8fb8ea";
  ctx.font = `600 20px ${font}`;
  ctx.textAlign = "right";
  ctx.fillText("TIME CALCULATOR", width - 64, 90);
  ctx.textAlign = "left";

  ctx.font = `600 64px ${font}`;
  let x = 64;
  for (const [text, color] of [["endo could take ", "#fff"], [`${floor(saved)} hours`, "#8fb8ea"], [" off", "#fff"]] as const) {
    ctx.fillStyle = color;
    ctx.fillText(text, x, 220);
    x += ctx.measureText(text).width;
  }
  ctx.fillStyle = "#fff";
  ctx.fillText("our agency’s week.", 64, 296);

  const stats = [[floor(saved * WEEKS_PER_MONTH), "hours a month"], [floor((saved * 52) / 8), "working days a year"], [dollars(saved), "of agent time a year"]];
  const boxWidth = (width - 128 - 40) / 3;
  stats.forEach(([value, label], i) => {
    const bx = 64 + i * (boxWidth + 20);
    ctx.fillStyle = "rgb(255 255 255 / 9%)";
    rounded(bx, 350, boxWidth, 150, 18);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.font = `600 44px ${font}`;
    ctx.fillText(value, bx + 28, 420);
    ctx.fillStyle = "rgb(255 255 255 / 70%)";
    ctx.font = `400 22px ${font}`;
    ctx.fillText(label, bx + 28, 462);
  });
  ctx.fillStyle = "rgb(255 255 255 / 70%)";
  ctx.font = `400 22px ${font}`;
  ctx.fillText("endodeals.com/time-calculator", 64, 570);
  return new Promise<Blob>((resolve, reject) => canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("No image"))), "image/png"));
}
