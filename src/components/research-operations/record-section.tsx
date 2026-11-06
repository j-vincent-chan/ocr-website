import type { CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { tint } from "@/components/research-development/lib";
import { Arrow, pillOutline } from "@/components/research-development/primitives";
import { ProjectMotif } from "@/components/site/project-motifs";
import { PROJECTS, type Project } from "@/data/projects";
import {
  record,
  SERVICE_COLOR,
  type RecordColumn,
  type RecordExample,
} from "@/data/research-operations";
import { getDisplayAreaPills, parseDiseaseAreas } from "@/lib/project-filters";
import { Eyebrow, ReviewFlag } from "./primitives";

/** "Last, First" → "First Last"; anything else (e.g. a sponsor name) is left as is. */
function piName(pi: string) {
  const [last, first] = pi.split(",").map((s) => s.trim());
  return first ? `${first} ${last}` : pi;
}

/** The disease shown in the meta line: the first disease area, else the first display pill. */
function diseaseLabel(p: Project) {
  return parseDiseaseAreas(p)[0] ?? getDisplayAreaPills(p)[0] ?? p.area;
}

/** Project row data from src/data/projects.ts, with the page's display overrides applied. */
function resolveExample(ex: RecordExample) {
  const p = PROJECTS.find((x) => x.slug === ex.slug);
  if (!p) return null;
  return {
    slug: p.slug,
    name: ex.name ?? p.name,
    meta: [piName(p.pi), ex.sponsor ?? p.sponsor, diseaseLabel(p)].filter(Boolean).join(" · "),
    motif: p.motif,
  };
}

export function RecordSection() {
  return (
    <section id="record" className="scroll-mt-24 bg-paper py-12 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-9 lg:mb-14 lg:grid lg:grid-cols-[5fr_7fr] lg:items-end lg:gap-[72px]">
          <div>
            <Eyebrow>{record.eyebrow}</Eyebrow>
            <h2 className="font-display text-[32px] font-medium leading-[1.05] tracking-[-0.02em] text-balance text-ink md:text-[40px] lg:text-[48px] lg:leading-[1.02]">
              {record.title}
            </h2>
            <p className="mt-4 max-w-[44ch] text-base leading-[1.5] text-ink-muted text-pretty">
              {record.intro.before}{" "}
              <Link
                to="/projects"
                className="font-medium text-ink underline decoration-ink/30 underline-offset-2 hover:decoration-ink"
              >
                {record.intro.linkLabel}
              </Link>
              .
            </p>
          </div>
          <div className="mt-6 flex flex-wrap items-end gap-x-8 gap-y-4 lg:mt-0">
            <div
              className="font-display text-[80px] font-medium leading-[0.9] tracking-[-0.04em] text-gradient-sunburst tabular-nums md:text-[100px] lg:text-[120px]"
              aria-label={`${record.heroStat.value} ${record.heroStat.caption}`}
            >
              {record.heroStat.value}
            </div>
            <p className="flex-1 basis-60 text-base leading-[1.5] text-ink-muted text-pretty">
              {record.heroStat.caption}
              {record.heroStat.verify ? <ReviewFlag>{record.heroStat.flag}</ReviewFlag> : null}
            </p>
          </div>
        </div>

        {/* Three service columns. Subgrid keeps the label, stat, blurb and examples rows level. */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] grid-rows-[auto_auto_auto_1fr] gap-x-8 gap-y-12">
          {record.columns.map((c) => (
            <RecordColumnView key={c.key} column={c} />
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-[560px] text-xs leading-[1.5] text-ink-muted-2">{record.footnote}</p>
          <Link to="/projects" hash="funding" className={pillOutline}>
            {record.awardsLink.label} <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}

function RecordColumnView({ column: c }: { column: RecordColumn }) {
  const { color, textColor } = SERVICE_COLOR[c.key];
  const rows = c.examples.map(resolveExample).filter((r) => r !== null);
  return (
    <div
      className="grid min-w-0 grid-rows-[subgrid] gap-y-3 pt-[22px] row-span-4"
      style={{ borderTop: `5px solid ${color}` }}
    >
      <div
        className="min-h-[34px] text-xs font-medium uppercase leading-[1.4] tracking-[0.16em]"
        style={{ color: textColor }}
      >
        {c.label}
      </div>
      <div className="mt-1.5 flex min-h-[116px] flex-col gap-2">
        <span
          className="font-display text-[64px] font-medium leading-none tracking-[-0.03em] tabular-nums"
          style={{ color: textColor }}
        >
          {c.stat.value}
        </span>
        <span className="max-w-[30ch] text-sm leading-[1.4] text-ink-muted">
          {c.stat.caption}
          {c.stat.verify ? <ReviewFlag>Confirm</ReviewFlag> : null}
        </span>
      </div>
      <p className="mt-0.5 text-[15px] leading-[1.55] text-ink-body text-pretty">{c.blurb}</p>

      <div className="flex min-w-0 flex-col">
        <div className="mb-2.5 flex items-baseline justify-between gap-3">
          <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-muted-2">
            {record.examplesLabel}
          </span>
          <span className="text-xs text-ink-muted-2">
            {rows.length} {record.ofLabel} {c.stat.value}
          </span>
        </div>
        <ul className="grid flex-1 grid-rows-[repeat(3,1fr)] border-t border-ink">
          {rows.map((r) => (
            <li
              key={r.slug}
              className="flex flex-col justify-center border-b border-rule py-1 last:border-ink"
            >
              <Link
                to="/projects"
                hash={r.slug}
                style={{ "--tint": tint(color, 0.12) } as CSSProperties}
                className="grid grid-cols-[36px_minmax(0,1fr)_16px] items-center gap-3.5 rounded-xl px-3 py-2.5 text-inherit no-underline transition-colors duration-[250ms] hover:bg-[var(--tint)] focus-visible:bg-[var(--tint)] focus-visible:outline-none"
              >
                <div aria-hidden className="ro-sprite h-9 w-9">
                  <ProjectMotif motif={r.motif} accent={color} />
                </div>
                <div className="min-w-0">
                  <div className="text-[15px] font-medium leading-[1.3] text-ink text-pretty">
                    {r.name}
                  </div>
                  <div className="mt-0.5 text-[13px] leading-[1.4] text-ink-muted-2">{r.meta}</div>
                </div>
                <div aria-hidden style={{ color }}>
                  ↗
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          to="/projects"
          className="mt-3.5 inline-flex items-center gap-1.5 self-start text-sm font-medium text-ink underline-offset-4 hover:underline"
        >
          {c.seeAll.label} <Arrow />
        </Link>
      </div>
    </div>
  );
}
