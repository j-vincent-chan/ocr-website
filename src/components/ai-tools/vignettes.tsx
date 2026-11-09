import type { CSSProperties } from "react";
import { applicationsIntro, type CardKey } from "@/data/ai-tools";
import { alpha } from "./lib";

/*
 * Console vignettes on the application cards. Illustrative content only.
 * Each stage has a delay that applies only while `active` is true; when `active` turns false every
 * delay collapses to 0 so the reset is instant and the next play starts clean. Reduced motion is
 * handled by the caller (always active) plus `.ai-vignette` in styles.css (no transitions).
 */

const EASE = "cubic-bezier(.2,.8,.2,1)";

/** [property, duration ms, delay ms] → a transition list whose delays drop to 0 while inactive. */
const trs = (active: boolean, list: [string, number, number][]) =>
  list.map(([p, d, delay]) => `${p} ${d}ms ${EASE} ${active ? delay : 0}ms`).join(", ");

/** Fade + slide in from (dx, dy) over 600ms. */
const reveal = (active: boolean, delay: number, dx = 0, dy = 0): CSSProperties => ({
  opacity: active ? 1 : 0,
  transform: active ? "none" : `translate(${dx}px, ${dy}px)`,
  transition: trs(active, [
    ["opacity", 600, delay],
    ["transform", 600, delay],
  ]),
});

const PANEL: Record<CardKey, { header: [string, string]; gap: string; blob: string }> = {
  prospera: {
    header: ["prospera · discover", "synced nightly · 02:10"],
    gap: "gap-3",
    blob: "-top-20 -right-15 h-[260px] w-[260px] opacity-45",
  },
  signal: {
    header: ["signal · review queue · ImmunoX", "12 new"],
    gap: "gap-2.5",
    blob: "-top-20 -left-15 h-[260px] w-[260px] opacity-45",
  },
  runway: {
    header: ["runway · dashboard · Lee Lab", "FY26 · closed through Feb"],
    gap: "gap-3.5",
    blob: "-bottom-25 -right-15 h-[280px] w-[280px] opacity-40",
  },
};

/** The dark console column of an application card. */
export function Vignette({ app, fill, active }: { app: CardKey; fill: string; active: boolean }) {
  const { header, gap, blob } = PANEL[app];
  return (
    <div
      className={`ai-vignette relative flex min-w-0 flex-[7_1_400px] flex-col overflow-hidden bg-ink px-[clamp(24px,3vw,40px)] py-[clamp(24px,3vw,36px)] text-white ${gap}`}
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute rounded-full blur-[60px] ${blob}`}
        style={{ background: fill }}
      />
      <div
        className={`relative flex flex-wrap justify-between gap-2 font-mono text-xs text-white/60 ${
          app === "signal" ? "mb-1" : ""
        }`}
      >
        <span>{header[0]}</span>
        <span className="inline-flex items-center gap-2">
          {app === "signal" ? (
            <span aria-hidden className="ai-pulse h-1.5 w-1.5 rounded-full bg-lime" />
          ) : null}
          {header[1]}
        </span>
      </div>

      {app === "prospera" ? <Prospera active={active} /> : null}
      {app === "signal" ? <Signal active={active} /> : null}
      {app === "runway" ? <Runway active={active} /> : null}

      {app === "runway" ? (
        <div className="relative mt-auto flex flex-wrap justify-between gap-2 font-mono text-[11px] text-white/45">
          <span>solid actual · hatched projected (~)</span>
          <span>{applicationsIntro.illustrative}</span>
        </div>
      ) : (
        <div
          className={`relative text-[11px] text-white/40 ${app === "prospera" ? "mt-auto" : ""}`}
        >
          {applicationsIntro.illustrative}
        </div>
      )}
    </div>
  );
}

/* ───────── Prospera: a graded notice, its evidence, two more matches ───────── */

const EVIDENCE: [string, string][] = [
  ["var(--lime)", "14 publications on tissue-resident T cells since 2021"],
  ["var(--lime)", "Active NIAID R01 on mucosal immunity through 2028"],
  ["var(--gold)", "No prior PAR submission on record (constraint)"],
];

const gradePill =
  "flex-none rounded-full px-[9px] py-[3px] text-[10px] font-semibold uppercase tracking-[0.08em]";

function Prospera({ active }: { active: boolean }) {
  return (
    <>
      <div className="relative rounded-2xl border border-white/12 bg-white/6 px-[22px] py-5">
        <div className="flex min-h-6 flex-wrap items-center justify-between gap-x-3 gap-y-2">
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/50">
            PAR-26-114 · NIAID · R01
          </span>
          <span
            className="rounded-full bg-violet px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink"
            style={{
              opacity: active ? 1 : 0,
              transform: active ? "scale(1)" : "scale(0.7)",
              transition: trs(active, [
                ["opacity", 400, 950],
                ["transform", 500, 950],
              ]),
            }}
          >
            Strong fit
          </span>
        </div>
        <div className="mt-2.5 text-base leading-[1.4] text-white">
          Tissue-resident immunity in chronic inflammation
        </div>
        <div className="mt-1.5 text-xs text-white/55">Due Feb 5 · 3 suggested investigators</div>
        <div className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-3.5 text-[13px] leading-[1.45] text-white/82">
          {EVIDENCE.map(([color, text], i) => (
            <div key={text} className="flex gap-2.5" style={reveal(active, 150 + i * 230, -10, 0)}>
              <span aria-hidden style={{ color }}>
                ●
              </span>
              {text}
            </div>
          ))}
        </div>
      </div>
      <MatchRow active={active} delay={1200} grade="Moderate" pill="moderate">
        RFA-HL-26-020 · Lung repair after viral injury
      </MatchRow>
      <MatchRow active={active} delay={1320} grade="Exploratory" pill="exploratory">
        PA-26-061 · Data science for immune aging
      </MatchRow>
    </>
  );
}

function MatchRow({
  active,
  delay,
  grade,
  pill,
  children,
}: {
  active: boolean;
  delay: number;
  grade: string;
  pill: "moderate" | "exploratory";
  children: string;
}) {
  return (
    <div
      className="relative flex items-center justify-between gap-3 rounded-xl bg-white/4 px-4 py-3 text-[13px] text-white/85"
      style={reveal(active, delay, 0, 6)}
    >
      <span>{children}</span>
      <span
        className={`${gradePill} ${
          pill === "moderate" ? "text-white" : "border border-white/30 text-white/80"
        }`}
        style={pill === "moderate" ? { background: alpha("var(--violet)", 0.55) } : undefined}
      >
        {grade}
      </span>
    </div>
  );
}

/* ───────── Signal: the review queue ───────── */

const QUEUE: { tag: string; color: string; title: string; sub: string }[] = [
  {
    tag: "Publication",
    color: "var(--teal)",
    title: "Single-cell atlas of the human thymus across the lifespan",
    sub: "Cell · 3 watched authors",
  },
  {
    tag: "Award",
    color: "var(--gold)",
    title: "R01 awarded · Mechanisms of B cell tolerance",
    sub: "NIH RePORTER · NIAID",
  },
  {
    tag: "News",
    color: "var(--coral)",
    title: "UCSF team maps immune memory after vaccination",
    sub: "UCSF News · 2 watched faculty quoted",
  },
];

function Signal({ active }: { active: boolean }) {
  return (
    <>
      {QUEUE.map((q, i) => {
        const picked = i === 0 && active;
        return (
          <div
            key={q.title}
            className="relative flex flex-wrap items-center gap-x-4 gap-y-3 rounded-[14px] border px-[18px] py-3.5"
            style={{
              background: picked ? alpha("var(--teal)", 0.14) : "rgb(255 255 255 / 0.06)",
              borderColor: picked ? alpha("var(--teal)", 0.55) : "rgb(255 255 255 / 0.1)",
              opacity: active ? 1 : 0,
              transform: active ? "none" : "translateX(-14px)",
              transition: trs(active, [
                ["opacity", 600, i * 160],
                ["transform", 600, i * 160],
                ["background-color", 400, 1100],
                ["border-color", 400, 1100],
              ]),
            }}
          >
            <span
              className="flex-[0_0_90px] font-mono text-[10px] uppercase tracking-[0.12em]"
              style={{ color: q.color }}
            >
              {q.tag}
            </span>
            <div className="min-w-0 flex-[1_1_220px]">
              <div className="text-sm leading-[1.35] text-white">{q.title}</div>
              <div className="mt-[3px] text-xs text-white/55">{q.sub}</div>
            </div>
            <div className="flex gap-1.5">
              <span className="rounded-full bg-teal px-[11px] py-[5px] text-[11px] font-semibold text-ink">
                Approve
              </span>
              <span className="rounded-full border border-white/25 px-[11px] py-[5px] text-[11px] font-medium text-white/80">
                Archive
              </span>
            </div>
          </div>
        );
      })}
      <div className="relative mt-auto flex flex-wrap items-center justify-between gap-2 pt-3.5 font-mono text-xs text-white/60">
        <span>March digest · 9 approved items</span>
        <span className="text-white">Draft the digest →</span>
      </div>
    </>
  );
}

/* ───────── Runway: verdict + months of payroll per account ───────── */

const ACCOUNTS: {
  name: string;
  actual: number;
  projected: number;
  critical: boolean;
  label: string;
}[] = [
  { name: "7023 · NIH R01", actual: 22, projected: 18, critical: true, label: "~5 mo" },
  { name: "8810 · Gift", actual: 62, projected: 16, critical: false, label: "~14 mo" },
  { name: "6610 · T32", actual: 44, projected: 0, critical: false, label: "9 mo" },
  { name: "5120 · Startup", actual: 14, projected: 10, critical: true, label: "~4 mo" },
];

const CRITICAL_LABEL = "oklch(0.78 0.16 30)";

function Runway({ active }: { active: boolean }) {
  return (
    <>
      <p
        className="relative font-display text-[clamp(19px,1.8vw,23px)] leading-[1.3] text-white text-pretty"
        style={{
          opacity: active ? 1 : 0,
          transform: active ? "none" : "translateY(6px)",
          transition: trs(active, [
            ["opacity", 700, 1200],
            ["transform", 700, 1200],
          ]),
        }}
      >
        Two accounts fall below six months of payroll by August. The postdoc on 7023 needs attention
        first.
      </p>
      <div className="relative mt-1.5 flex flex-col gap-3 text-[13px]">
        {ACCOUNTS.map((a, i) => {
          const color = a.critical ? "var(--coral)" : "var(--teal)";
          return (
            <div
              key={a.name}
              className="grid grid-cols-[minmax(96px,120px)_minmax(0,1fr)_64px] items-center gap-3.5"
            >
              <span className="text-white/80">{a.name}</span>
              <div aria-hidden className="relative h-2.5 rounded-[5px] bg-white/10">
                <div
                  className="absolute inset-y-0 left-0 rounded-[5px]"
                  style={{
                    width: `${active ? a.actual : 0}%`,
                    background: color,
                    transition: trs(active, [["width", 900, 100 + i * 120]]),
                  }}
                />
                {a.projected ? (
                  <div
                    className="absolute inset-y-0 rounded-r-[5px]"
                    style={{
                      left: `${a.actual}%`,
                      width: `${active ? a.projected : 0}%`,
                      background: `repeating-linear-gradient(135deg, ${alpha(color, 0.55)} 0 3px, transparent 3px 7px)`,
                      transition: trs(active, [["width", 700, 900 + i * 120]]),
                    }}
                  />
                ) : null}
              </div>
              <span
                className="text-right font-mono"
                style={{
                  color: a.critical ? CRITICAL_LABEL : "rgb(255 255 255 / 0.8)",
                  opacity: active ? 1 : 0,
                  transition: trs(active, [["opacity", 400, 1000 + i * 120]]),
                }}
              >
                {a.label}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
}
