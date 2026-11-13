import { Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Motif } from "@/components/portfolio/motif";
import { StatusPill } from "@/components/portfolio/status-pill";
import {
  coprojects,
  degrees,
  getProject,
  programs,
  projects,
} from "@/data/portfolio";
import type { Program } from "@/data/portfolio/types";
import {
  formatLead,
  plural,
  programHasChildren,
  programScale,
  programTrayRows,
  projectKindLine,
  projectsOfProgram,
  sortProgramsForDisplay,
  statusPresentation,
} from "@/lib/portfolio/derived";
import { themeAccent, themeTint } from "@/lib/portfolio/themes";

function cardClickNavigate(
  e: React.MouseEvent,
  href: string,
  navigate: ReturnType<typeof useNavigate>,
) {
  const target = e.target as HTMLElement;
  if (target.closest("a,button")) return;
  if (String(window.getSelection?.() ?? "").length) return;
  void navigate({ to: href });
}

function TrayRow({
  name,
  meta,
  status,
  statusDot,
  href,
  motifName,
  motifTheme,
  motifColor,
  hot,
  notLast,
  onEnter,
  onLeave,
}: {
  name: string;
  meta: string;
  status: string;
  statusDot: string;
  href?: string;
  motifName: string;
  motifTheme: string;
  motifColor: string;
  hot: boolean;
  notLast: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const acc = "#010621";
  const sub = "#cbc8c0";
  const cTrunk = hot ? acc : sub;
  const cBelow = hot ? acc : sub;
  const cBranch = hot ? acc : sub;

  return (
    <div
      className="relative pb-2 pl-[34px]"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
    >
      {notLast && (
        <span
          aria-hidden
          className="absolute bottom-0 left-0 top-0 border-l transition-colors"
          style={{ borderColor: cBelow }}
        />
      )}
      <span
        aria-hidden
        className="absolute left-0 top-0 box-border transition-colors"
        style={{
          width: 21,
          height: 29,
          borderLeft: `1px solid ${cTrunk}`,
          borderBottom: `1px solid ${cBranch}`,
          borderBottomLeftRadius: 12,
        }}
      />
      <span
        aria-hidden
        className="absolute box-border rounded-full transition-transform"
        style={{
          left: 19,
          top: 25,
          width: 7,
          height: 7,
          border: `1px solid ${cBranch}`,
          background: hot ? acc : "#fff",
          transform: `scale(${hot ? 1.35 : 1})`,
        }}
      />
      <div
        className="relative flex items-start gap-3 rounded-[14px] border bg-white p-2.5 px-3.5 transition-[border-color,box-shadow,transform]"
        style={{
          borderColor: hot ? acc : "#e4e1d8",
          transform: `translateX(${hot ? 4 : 0}px)`,
          boxShadow: hot ? "0 6px 18px rgba(5,15,44,.08)" : "none",
        }}
      >
        <div
          aria-hidden
          className="h-9 w-9 flex-none overflow-hidden rounded-[10px]"
          style={{ background: themeTint(motifColor) }}
        >
          <Motif name={motifName} theme={motifTheme} mode="static" color={motifColor} zoom={1.4} />
        </div>
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1 gap-x-6">
          <div className="min-w-0 flex-[1_1_200px]">
            {href ? (
              <Link
                to={href}
                className="relative text-[15px] font-semibold leading-snug text-[#010621] no-underline hover:underline"
              >
                <span className="absolute inset-0 rounded-[14px]" aria-hidden />
                {name}
              </Link>
            ) : (
              <div className="text-[15px] font-semibold leading-snug text-[#010621]">{name}</div>
            )}
            {meta ? (
              <div className="mt-0.5 text-[12.5px] leading-snug text-[#555e6f]">{meta}</div>
            ) : null}
          </div>
          <div className="flex min-w-[150px] flex-none items-center gap-1.5 text-[12.5px] leading-snug text-[#384258]">
            <span
              aria-hidden
              className="h-1.5 w-1.5 flex-none rounded-full"
              style={{ background: statusDot }}
            />
            {status}
          </div>
        </div>
        <span
          aria-hidden
          className="mt-2 w-4 flex-none text-[15px] text-[#010621]"
          style={{ opacity: href ? 1 : 0 }}
        >
          →
        </span>
      </div>
    </div>
  );
}

function ProgramCard({
  program,
  open,
  onToggle,
}: {
  program: Program;
  open: boolean;
  onToggle: () => void;
}) {
  const navigate = useNavigate();
  const closed = program.status === "Closed";
  const accent = themeAccent(program.theme);
  const bright = closed ? "#a3a6b0" : accent.bright;
  const deep = closed ? "#7d8192" : accent.deep;
  const kids = projectsOfProgram(projects, program.id);
  const scale = programScale(program, kids, coprojects);
  const tray = programTrayRows(program, kids, coprojects);
  const expandable = tray.rows.length > 0;
  const [hot, setHot] = useState<number | null>(null);
  const leadLine = formatLead(program.lead, degrees);
  const hasShort =
    !!program.short && !(program.title || program.name).includes(program.short);
  const showProgramType = !!program.programType && !program.subtitle;
  const href = `/portfolio/programs/${program.id}`;

  const trayTitle = program.patients
    ? "Most profiled cancers"
    : tray.more > 0
      ? "Selected projects"
      : "Projects in this program";

  const ptShown = program.patients
    ? program.patients.types.slice(0, 3).reduce((n, x) => n + x[1], 0)
    : 0;

  const trayCount = program.patients
    ? `${ptShown} of ${program.patients.total} shown · by cancer type`
    : tray.more > 0
      ? `${tray.rows.length} of ${tray.total} shown · active first`
      : scale
        ? scale.note
        : "";

  const roomy = true; // padding tightens via CSS media below

  return (
    <article
      id={`program-${program.id}`}
      aria-label={program.name}
      onClick={(e) => cardClickNavigate(e, href, navigate)}
      className="relative mt-9 cursor-pointer overflow-hidden rounded-3xl border border-[#e4e1d8]"
      style={{
        background: closed ? "#f6f4ee" : "#fff",
        boxShadow: closed
          ? "none"
          : "0 1px 2px rgba(5,15,44,.04), 0 8px 24px rgba(5,15,44,.06)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute aspect-square"
        style={{
          top: -230,
          right: -210,
          width: "min(600px,110%)",
          opacity: closed ? 0.3 : 0.62,
          WebkitMaskImage: "radial-gradient(closest-side,#000 30%,transparent 100%)",
          maskImage: "radial-gradient(closest-side,#000 30%,transparent 100%)",
        }}
      >
        <Motif
          name={program.name}
          theme={program.theme}
          mode={closed ? "static" : "background"}
          color={closed ? "#9a9da8" : undefined}
          zoom={1}
        />
      </div>

      <div
        className={`relative flex items-start gap-[18px] ${roomy ? "p-5 pr-16 md:p-7 md:pr-[84px]" : "p-[18px]"}`}
      >
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-[18px] gap-x-10">
          <div className="min-w-0 flex-[2_1_280px]">
            <div className="flex min-h-11 flex-wrap items-center gap-1.5 pr-12 md:min-h-0 md:pr-0">
              {showProgramType ? (
                <span
                  className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
                  style={{
                    background: `color-mix(in oklab, ${bright} 24%, #fff)`,
                    color: `color-mix(in oklab, ${bright} 55%, #010621)`,
                    border: `1px solid color-mix(in oklab, ${bright} 38%, transparent)`,
                  }}
                >
                  {program.programType}
                </span>
              ) : null}
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
                style={{
                  background: `color-mix(in oklab, ${bright} 24%, #fff)`,
                  color: `color-mix(in oklab, ${bright} 55%, #010621)`,
                  border: `1px solid color-mix(in oklab, ${bright} 38%, transparent)`,
                }}
              >
                {program.theme}
              </span>
              <StatusPill status={program.status} themeDeep={deep} />
            </div>

            <h3
              className="mt-2.5 text-balance font-display tracking-tight"
              style={{
                fontSize: "clamp(1.55rem,3vw,2.2rem)",
                lineHeight: 1.1,
                letterSpacing: "-.01em",
                fontWeight: 400,
                overflowWrap: "anywhere",
              }}
            >
              <Link
                to="/portfolio/programs/$id"
                params={{ id: program.id }}
                className="text-[#010621] no-underline hover:underline"
              >
                {program.title || program.name}
              </Link>
              {hasShort ? (
                <span
                  className="text-[#555e6f]"
                  style={{ font: "400 .55em/1 Inter, system-ui, sans-serif" }}
                >
                  , {program.short}
                </span>
              ) : null}
            </h3>

            {program.subtitle ? (
              <p
                className="mt-2 text-[#010621]"
                style={{
                  font: "500 12px/1.4 Inter, system-ui, sans-serif",
                  letterSpacing: ".18em",
                  textTransform: "uppercase",
                }}
              >
                {program.subtitle}
              </p>
            ) : null}

            {leadLine && !(program.title || program.name).includes(program.lead) ? (
              <p className="mt-1.5 text-sm leading-snug text-[#555e6f]">{leadLine}</p>
            ) : null}

            <p
              className="mt-2.5 max-w-[62ch] text-pretty text-[#242d42]"
              style={{ fontSize: 15.5, lineHeight: 1.55 }}
            >
              {program.card}
            </p>

            {program.services?.length ? (
              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                <span
                  className="mr-1 text-[#555e6f]"
                  style={{
                    font: "500 11px/1.4 Inter, system-ui, sans-serif",
                    letterSpacing: ".18em",
                    textTransform: "uppercase",
                  }}
                >
                  OCR provides
                </span>
                {program.services.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-[#e4e1d8] bg-[#f4f2ec] px-2.5 py-1 text-xs font-medium text-[#242d42]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          {scale ? (
            <div className="relative min-w-0 flex-[1_1_160px] isolate">
              <div
                className="font-display tracking-tight text-[#010621]"
                style={{
                  fontSize: "clamp(3.2rem,6vw,4.75rem)",
                  lineHeight: 0.9,
                  letterSpacing: "-.03em",
                  fontWeight: 400,
                }}
              >
                {scale.value}
              </div>
              <div className="mt-2 text-[15px] font-medium leading-snug text-[#010621]">
                {scale.unit}
              </div>
              <div className="mt-0.5 text-[12.5px] leading-snug text-[#555e6f]">
                {scale.note}
              </div>
            </div>
          ) : null}
        </div>

        {expandable ? (
          <button
            type="button"
            aria-expanded={open}
            aria-label={`${open ? "Collapse" : "Expand"} ${program.name}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
            className="absolute right-3.5 top-3.5 flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(1,6,33,.15)] bg-white text-[#010621] hover:bg-[#f2eee6] md:right-6 md:top-6"
          >
            {open ? "↑" : "↓"}
          </button>
        ) : null}
      </div>

      {expandable && open ? (
        <div className="relative px-[18px] pb-4 md:px-[30px] md:pb-6">
          <div className="rounded-[18px] bg-[#f9f5ec] px-5 pb-5 pt-[18px]">
            <div className="flex flex-wrap items-center justify-between gap-1 gap-x-4">
              <span
                className="inline-flex items-center gap-2.5 text-[#010621]"
                style={{
                  font: "500 11px/1.4 Inter, system-ui, sans-serif",
                  letterSpacing: ".18em",
                  textTransform: "uppercase",
                }}
              >
                <span
                  aria-hidden
                  className="flex h-[13px] w-[13px] flex-none items-center justify-center rounded-full border bg-white"
                  style={{ borderColor: hot !== null ? "#010621" : "#cbc8c0" }}
                >
                  <span className="h-[5px] w-[5px] rounded-full bg-[#010621]" />
                </span>
                {trayTitle}
              </span>
              <span
                className="text-[#555e6f]"
                style={{
                  font: "500 11px/1.4 Inter, system-ui, sans-serif",
                  letterSpacing: ".18em",
                  textTransform: "uppercase",
                }}
              >
                {trayCount}
              </span>
            </div>

            <div className="relative ml-1.5 pt-3">
              <span
                aria-hidden
                className="absolute left-0 top-0 h-3 border-l"
                style={{ borderColor: hot !== null ? "#010621" : "#cbc8c0" }}
              />
              {tray.rows.map((row, i) => {
                if (row.kind === "project") {
                  const p = row.project;
                  const st = statusPresentation(p.status, deep);
                  return (
                    <TrayRow
                      key={p.id}
                      name={p.name}
                      meta={[projectKindLine(p), formatLead(p.lead, degrees)]
                        .filter(Boolean)
                        .join(" · ")}
                      status={st.line}
                      statusDot={st.dot}
                      href={`/portfolio/projects/${p.id}`}
                      motifName={p.name}
                      motifTheme={p.theme}
                      motifColor={bright}
                      hot={hot === i}
                      notLast={i < tray.rows.length - 1 || tray.more > 0}
                      onEnter={() => setHot(i)}
                      onLeave={() => setHot(null)}
                    />
                  );
                }
                if (row.kind === "coproject") {
                  const rec = row.item.rec ? getProject(row.item.rec) : undefined;
                  return (
                    <TrayRow
                      key={row.item.title}
                      name={rec?.name ?? row.item.title}
                      meta={`${row.item.theme} · ${row.item.kind}`}
                      status={row.status}
                      statusDot={row.status === "Active" ? "#010621" : "#b9b6ae"}
                      href={rec ? `/portfolio/projects/${rec.id}` : undefined}
                      motifName={rec?.name ?? row.item.title}
                      motifTheme={rec?.theme ?? "Multi-disease"}
                      motifColor={bright}
                      hot={hot === i}
                      notLast={i < tray.rows.length - 1 || tray.more > 0}
                      onEnter={() => setHot(i)}
                      onLeave={() => setHot(null)}
                    />
                  );
                }
                return (
                  <TrayRow
                    key={row.label}
                    name={row.label}
                    meta=""
                    status={plural(row.count, "patient", "patients")}
                    statusDot="#010621"
                    motifName={row.label}
                    motifTheme={program.theme}
                    motifColor={bright}
                    hot={hot === i}
                    notLast={i < tray.rows.length - 1 || tray.more > 0}
                    onEnter={() => setHot(i)}
                    onLeave={() => setHot(null)}
                  />
                );
              })}

              {tray.more > 0 ? (
                <div
                  className="relative pl-[34px]"
                  onMouseEnter={() => setHot(tray.rows.length)}
                  onMouseLeave={() => setHot(null)}
                >
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 box-border"
                    style={{
                      width: 21,
                      height: 23,
                      borderLeft: `1px dashed ${hot === tray.rows.length ? "#010621" : "#a9a69e"}`,
                      borderBottom: `1px dashed ${hot === tray.rows.length ? "#010621" : "#a9a69e"}`,
                      borderBottomLeftRadius: 12,
                    }}
                  />
                  <Link
                    to="/portfolio/programs/$id"
                    params={{ id: program.id }}
                    className="flex min-h-11 flex-wrap items-center gap-1 gap-x-3 rounded-[14px] border border-dashed px-3.5 py-1 text-[#010621] no-underline transition-transform"
                    style={{
                      borderColor: hot === tray.rows.length ? "#010621" : "#a9a69e",
                      background: hot === tray.rows.length ? "#fff" : "transparent",
                      transform: `translateX(${hot === tray.rows.length ? 4 : 0}px)`,
                    }}
                  >
                    <span className="text-[15px] font-semibold">
                      +
                      {program.patients
                        ? program.patients.total - ptShown
                        : tray.more}{" "}
                      more
                    </span>
                    <span className="min-w-0 flex-[1_1_200px] text-[13.5px] leading-snug text-[#384258]">
                      Open the program to see all{" "}
                      {program.patients
                        ? `${program.patients.total} patients`
                        : tray.total}
                    </span>
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      <div className="relative flex justify-end px-[18px] pb-[18px] md:px-[30px] md:pb-[30px]">
        <Link
          to="/portfolio/programs/$id"
          params={{ id: program.id }}
          className="inline-flex min-h-11 items-center gap-2 rounded-full px-[22px] text-sm font-medium text-white no-underline hover:bg-[#08173f]"
          style={{ background: closed ? "#555e6f" : "#010621" }}
        >
          Explore the program <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}

export function ProgramsView() {
  const ordered = useMemo(() => sortProgramsForDisplay(programs), []);
  const [openMap, setOpenMap] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    for (const g of programs) {
      if (programHasChildren(g, projects) && g.status === "Active") {
        init[g.id] = true;
      }
    }
    return init;
  });

  return (
    <section id="programs" className="pb-24 pt-10">
      <div className="mx-auto max-w-[1280px] px-6">
        {ordered.map((g, gi, arr) => {
          const firstClosed =
            g.status === "Closed" && gi > 0 && arr[gi - 1]!.status !== "Closed";
          return (
            <div key={g.id}>
              {firstClosed ? (
                <div
                  role="separator"
                  className="mt-[72px] flex items-center gap-4"
                >
                  <span
                    className="whitespace-nowrap text-[#555e6f]"
                    style={{
                      font: "500 11px/1.4 Inter, system-ui, sans-serif",
                      letterSpacing: ".18em",
                      textTransform: "uppercase",
                    }}
                  >
                    Closed programs
                  </span>
                  <span aria-hidden className="h-0 flex-1 border-t border-[#dad7cf]" />
                  <span className="text-[13px] leading-snug text-[#555e6f]">
                    OCR support has ended
                  </span>
                </div>
              ) : null}
              <ProgramCard
                program={g}
                open={!!openMap[g.id]}
                onToggle={() =>
                  setOpenMap((m) => ({ ...m, [g.id]: !m[g.id] }))
                }
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
