import { Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { Motif } from "@/components/portfolio/motif";
import { StatusPill } from "@/components/portfolio/status-pill";
import type { PortfolioSearch } from "@/components/portfolio/search";
import { degrees, programs, projects, THEMES } from "@/data/portfolio";
import type { Project } from "@/data/portfolio/types";
import {
  formatLead,
  projectKindLine,
  sortProjects,
  statusPresentation,
} from "@/lib/portfolio/derived";
import {
  filterProjects,
  hasActiveProjectFilters,
  resultLine,
  type ProjectStatusFilter,
  type ProjectTypeFilter,
  type ProjectsLayout,
} from "@/lib/portfolio/filters";
import { projectLongDesc } from "@/lib/portfolio/long-desc";
import { themeAccent, themeTint } from "@/lib/portfolio/themes";

type Patch = Partial<PortfolioSearch>;

function ProgramIcon() {
  return (
    <span
      aria-hidden
      className="flex flex-none flex-col justify-center gap-0.5 box-border"
      style={{
        width: 15,
        height: 13,
        border: "1.5px solid currentColor",
        borderRadius: 4,
        padding: "0 2px",
      }}
    >
      <span className="h-[1.5px] bg-current" />
      <span className="h-[1.5px] bg-current" />
    </span>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const accent = themeAccent(project.theme);
  const parent = project.parent
    ? programs.find((g) => g.id === project.parent)
    : undefined;
  const leadLine = formatLead(project.lead, degrees);
  const kindLine = projectKindLine(project);
  const longDesc = projectLongDesc(project);
  const hasShort = !!project.short && !project.name.includes(project.short);

  return (
    <li className="group relative flex min-w-0 flex-col overflow-hidden rounded-[20px] border border-[#e4e1d8] bg-white shadow-[0_1px_2px_rgba(5,15,44,.04)] transition-[border-color,box-shadow] hover:border-[#010621] hover:shadow-[0_10px_26px_rgba(5,15,44,.10)]">
      <div
        aria-hidden
        className="relative aspect-[16/7] overflow-hidden"
        style={{ background: themeTint(accent.bright) }}
      >
        <span className="absolute inset-0 block">
          <Motif name={project.name} theme={project.theme} mode="animated" zoom={1.55} />
        </span>
      </div>
      <div className="absolute left-3 right-3 top-3 z-[1] flex flex-wrap gap-1.5">
        <StatusPill status={project.status} themeDeep={accent.deep} />
      </div>
      <div className="flex flex-1 flex-col px-5 pb-3.5 pt-4">
        <div className="text-[12.5px] font-medium leading-snug text-[#555e6f]">
          {kindLine}
        </div>
        {project.theme ? (
          <div className="mt-2 flex">
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
              style={{
                background: `color-mix(in oklab, ${accent.bright} 24%, #fff)`,
                color: `color-mix(in oklab, ${accent.bright} 55%, #010621)`,
                border: `1px solid color-mix(in oklab, ${accent.bright} 38%, transparent)`,
              }}
            >
              {project.theme}
            </span>
          </div>
        ) : null}
        <h3
          className="mt-3 line-clamp-2 text-balance font-display text-[22px] leading-[1.2] text-[#010621]"
          style={{ fontWeight: 400, overflowWrap: "anywhere" }}
        >
          <Link
            to="/portfolio/projects/$id"
            params={{ id: project.id }}
            className="text-[#010621] no-underline before:absolute before:inset-0 before:rounded-[20px]"
          >
            {project.name}
          </Link>
          {hasShort ? (
            <span className="text-[#555e6f]" style={{ font: "400 .6em/1 Inter, system-ui, sans-serif" }}>
              , {project.short}
            </span>
          ) : null}
        </h3>
        {leadLine ? (
          <p className="mt-1.5 truncate text-sm leading-snug text-[#555e6f]">{leadLine}</p>
        ) : null}
        <p
          className="mb-4 mt-2.5 line-clamp-6 text-pretty text-sm leading-[1.55] text-[#242d42]"
          style={{ minHeight: "9.3em" }}
        >
          {longDesc}
        </p>
        <div className="mt-auto flex min-h-6 items-center justify-between gap-3 border-t border-[#dad7cf] pt-3">
          <span className="flex min-w-0 flex-1 flex-wrap items-center gap-2 gap-x-3">
            {parent ? (
              <Link
                to="/portfolio/programs/$id"
                params={{ id: parent.id }}
                className="relative z-[2] inline-flex max-w-full items-center gap-2 text-[13px] font-medium leading-snug text-[#010621] no-underline hover:underline"
              >
                <ProgramIcon />
                <span className="min-w-0 truncate">{parent.title || parent.name}</span>
              </Link>
            ) : null}
          </span>
          <span aria-hidden className="flex-none whitespace-nowrap text-[13.5px] font-medium text-[#010621]">
            View project →
          </span>
        </div>
      </div>
    </li>
  );
}

function ProjectListRow({ project }: { project: Project }) {
  const accent = themeAccent(project.theme);
  const parent = project.parent
    ? programs.find((g) => g.id === project.parent)
    : undefined;
  const leadLine = formatLead(project.lead, degrees);
  const st = statusPresentation(project.status, accent.deep);
  const typeLabel =
    project.type === "bio"
      ? project.model || ""
      : [project.studyType, project.phase].filter(Boolean).join(" · ");
  const hasShort = !!project.short && !project.name.includes(project.short);

  return (
    <li
      id={`project-${project.id}`}
      className="flex items-start gap-4 border-b border-[#dad7cf] py-[18px]"
    >
      <div
        aria-hidden
        className="h-11 w-11 flex-none overflow-hidden rounded-xl"
        style={{ background: themeTint(accent.bright) }}
      >
        <Motif name={project.name} theme={project.theme} mode="static" zoom={1.4} />
      </div>
      <div className="flex min-w-0 flex-1 flex-wrap items-start gap-2.5 gap-x-7">
        <div className="min-w-0 flex-[2_1_240px]">
          <h3 className="m-0 font-display text-[21px] leading-[1.2] text-[#010621]" style={{ fontWeight: 400 }}>
            <Link
              to="/portfolio/projects/$id"
              params={{ id: project.id }}
              className="text-[#010621] no-underline hover:underline"
            >
              {project.name}
            </Link>
            {hasShort ? (
              <span className="ml-2 align-middle text-[11px] font-medium tracking-widest text-[#555e6f]">
                {project.short}
              </span>
            ) : null}
          </h3>
          {leadLine ? (
            <p className="mt-1 text-sm leading-snug text-[#555e6f]">{leadLine}</p>
          ) : null}
          {project.card ? (
            <p className="mt-1.5 max-w-[58ch] text-pretty text-sm leading-[1.55] text-[#555e6f]">
              {project.card}
            </p>
          ) : null}
          {project.theme ? (
            <p className="mt-1.5 text-[12.5px] leading-snug text-[#555e6f]">{project.theme}</p>
          ) : null}
        </div>
        <div className="min-w-0 flex-[1_1_140px] pt-0.5">
          <div className="flex flex-wrap gap-1.5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#dad7cf] bg-white px-2.5 py-1 text-xs font-medium text-[#242d42]">
              {project.type === "bio" ? (
                <span aria-hidden className="h-[7px] w-[7px] flex-none rotate-45 bg-current" />
              ) : (
                <span
                  aria-hidden
                  className="box-border h-[9px] w-[9px] flex-none rounded-full border-2 border-current"
                />
              )}
              {project.type === "bio" ? "Biospecimen collection" : "Clinical studies & trials"}
            </span>
          </div>
          {typeLabel ? (
            <div className="mt-1.5 text-[13px] leading-snug text-[#384258]">{typeLabel}</div>
          ) : null}
        </div>
        <div className="min-w-0 flex-[1_1_140px]">
          {(project.services || []).map((s) => (
            <div key={s} className="text-sm leading-snug text-[#242d42]">
              {s}
            </div>
          ))}
          <div className="mt-1 flex items-center gap-1.5 text-xs leading-snug text-[#555e6f]">
            <span aria-hidden className="h-1.5 w-1.5 flex-none rounded-full" style={{ background: st.dot }} />
            {st.line}
          </div>
        </div>
        <div className="min-w-0 flex-[1_1_120px]">
          {parent ? (
            <Link
              to="/portfolio/programs/$id"
              params={{ id: parent.id }}
              className="inline-flex items-start gap-2 text-[13.5px] font-medium leading-snug text-[#010621] no-underline hover:underline"
            >
              <ProgramIcon />
              {parent.name}
            </Link>
          ) : null}
          {project.type === "clin" && project.enrollment ? (
            <div className="mt-1 text-xs leading-snug text-[#555e6f]">
              Study status: {project.enrollment}
            </div>
          ) : null}
        </div>
      </div>
    </li>
  );
}

export function ProjectsView({
  search,
  onPatch,
}: {
  search: PortfolioSearch;
  onPatch: (patch: Patch) => void;
}) {
  const programNameById = useMemo(
    () => Object.fromEntries(programs.map((g) => [g.id, g.name])),
    [],
  );

  const { shown, closedHidden } = useMemo(
    () =>
      filterProjects(
        projects,
        {
          q: search.q,
          type: search.type,
          status: search.status,
          theme: search.theme,
          program: search.program,
        },
        programNameById,
      ),
    [search, programNameById],
  );

  const sorted = useMemo(() => sortProjects(shown), [shown]);
  const visible = search.more ? sorted : sorted.slice(0, 9);
  const hasMore = sorted.length > visible.length;
  const filtered =
    !!search.q.trim() ||
    !!search.theme ||
    !!search.program ||
    search.type !== "all";
  const anyFilter = hasActiveProjectFilters(search);
  const parentProgram = search.program
    ? programs.find((g) => g.id === search.program)
    : undefined;

  const selectClass =
    "h-11 w-full cursor-pointer appearance-none rounded-full border border-[#e4e1d8] bg-white py-0 pl-[18px] pr-10 text-sm font-medium text-[#010621] focus:border-[#010621] focus:outline-none";

  return (
    <section id="projects" className="pb-24 pt-10">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="flex flex-wrap items-center gap-2 gap-x-2.5">
          <label className="relative block max-w-[340px] flex-[2_1_220px]">
            <span className="sr-only">Search projects</span>
            <span
              aria-hidden
              className="absolute left-[17px] top-[15px] box-border h-2.5 w-2.5 rounded-full border-[1.5px] border-[#555e6f]"
            />
            <span
              aria-hidden
              className="absolute left-[25px] top-[25px] w-1.5 rotate-45 border-t-[1.5px] border-[#555e6f]"
            />
            <input
              type="search"
              value={search.q}
              onChange={(e) => onPatch({ q: e.target.value, more: false })}
              placeholder="Search projects"
              className="box-border h-11 w-full rounded-full border border-[#e4e1d8] bg-white py-0 pl-10 pr-4 text-sm text-[#010621] focus:border-[#010621] focus:outline-none"
            />
          </label>

          <label className="relative block max-w-[270px] flex-[1_1_210px]">
            <span className="sr-only">Project type</span>
            <select
              value={search.type}
              onChange={(e) =>
                onPatch({ type: e.target.value as ProjectTypeFilter, more: false })
              }
              className={selectClass}
            >
              <option value="all">All projects</option>
              <option value="bio">Biospecimen collection</option>
              <option value="clin">Clinical studies & trials</option>
            </select>
            <Chevron />
          </label>

          <label className="relative block max-w-[170px] flex-[1_1_130px]">
            <span className="sr-only">Status</span>
            <select
              value={search.status}
              onChange={(e) =>
                onPatch({ status: e.target.value as ProjectStatusFilter, more: false })
              }
              className={selectClass}
            >
              <option value="active">Active</option>
              <option value="closed">Closed</option>
              <option value="all">All</option>
            </select>
            <Chevron />
          </label>

          <label className="relative block max-w-[220px] flex-[1_1_170px]">
            <span className="sr-only">Theme</span>
            <select
              value={search.theme}
              onChange={(e) => onPatch({ theme: e.target.value, more: false })}
              className={selectClass}
            >
              <option value="">All themes</option>
              {THEMES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <Chevron />
          </label>
        </div>

        <div
          aria-live="polite"
          className="mt-5 flex min-h-9 flex-wrap items-center gap-2 gap-x-2.5"
        >
          <span className="text-sm font-medium leading-snug text-[#010621]">
            {resultLine({
              visibleCount: visible.length,
              totalShown: sorted.length,
              closedHidden,
              filtered,
            })}
          </span>

          <div
            role="group"
            aria-label="Project layout"
            className="order-9 ml-auto inline-flex rounded-full border border-[#e4e1d8] bg-[#f9f5ec] p-[3px]"
          >
            {(["Cards", "List"] as ProjectsLayout[]).map((layout) => {
              const on = search.layout === layout;
              return (
                <button
                  key={layout}
                  type="button"
                  aria-pressed={on}
                  onClick={() => onPatch({ layout })}
                  className="inline-flex min-h-[38px] items-center gap-2 rounded-full border-0 px-3.5 text-[13px] font-medium"
                  style={{
                    background: on ? "#010621" : "transparent",
                    color: on ? "#fff" : "#010621",
                    cursor: "pointer",
                  }}
                >
                  {layout}
                </button>
              );
            })}
          </div>

          {parentProgram ? (
            <FilterChip
              label={`Program: ${parentProgram.name}`}
              ariaLabel={`Remove program filter: ${parentProgram.name}`}
              onClear={() => onPatch({ program: "" })}
            />
          ) : null}
          {search.theme ? (
            <FilterChip
              label={`Theme: ${search.theme}`}
              ariaLabel="Remove theme filter"
              onClear={() => onPatch({ theme: "" })}
            />
          ) : null}
          {search.q.trim() ? (
            <FilterChip
              label={`Search: “${search.q.trim()}”`}
              ariaLabel="Remove search filter"
              onClear={() => onPatch({ q: "" })}
            />
          ) : null}
          {anyFilter ? (
            <button
              type="button"
              onClick={() =>
                onPatch({
                  program: "",
                  theme: "",
                  q: "",
                  type: "all",
                  status: "active",
                  more: false,
                })
              }
              className="min-h-9 border-0 bg-transparent px-1.5 text-[13px] font-medium text-[#555e6f] underline"
            >
              Clear all
            </button>
          ) : null}
        </div>

        {visible.length === 0 ? (
          <div className="border-b border-[#dad7cf] py-10">
            <p className="m-0 font-display text-[22px] leading-snug text-[#010621]" style={{ fontWeight: 400 }}>
              No projects match these filters.
            </p>
            <button
              type="button"
              onClick={() =>
                onPatch({
                  program: "",
                  theme: "",
                  q: "",
                  type: "all",
                  status: "active",
                  more: false,
                })
              }
              className="mt-3.5 min-h-11 rounded-full border border-[rgba(1,6,33,.2)] bg-white px-5 text-sm font-medium text-[#010621] hover:bg-[#f2eee6]"
            >
              Clear filters
            </button>
          </div>
        ) : search.layout === "List" ? (
          <ul className="m-0 list-none p-0">
            <li
              aria-hidden
              className="mt-4 hidden border-b border-[#010621] pb-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#555e6f] md:flex md:gap-4"
            >
              <span className="w-11 flex-none" />
              <div className="flex min-w-0 flex-1 gap-7">
                <span className="min-w-0 flex-[2]">Project</span>
                <span className="min-w-0 flex-1">Type</span>
                <span className="min-w-0 flex-1">OCR contributes</span>
                <span className="min-w-0 flex-[0.9]">Program · Study status</span>
              </div>
            </li>
            {visible.map((p) => (
              <ProjectListRow key={p.id} project={p} />
            ))}
          </ul>
        ) : (
          <ul className="mt-4 grid list-none grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-5 p-0">
            {visible.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </ul>
        )}

        {hasMore ? (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => onPatch({ more: true })}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#010621] bg-[#010621] px-6 text-sm font-medium text-white hover:bg-[#08173f]"
            >
              Show all {sorted.length} projects <span aria-hidden>↓</span>
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function Chevron() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute right-[19px] top-[17px] h-1.5 w-1.5 rotate-45 border-b-[1.5px] border-r-[1.5px] border-[#010621]"
    />
  );
}

function FilterChip({
  label,
  ariaLabel,
  onClear,
}: {
  label: string;
  ariaLabel: string;
  onClear: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClear}
      aria-label={ariaLabel}
      className="inline-flex min-h-9 items-center gap-2 rounded-full border border-[#010621] bg-white py-0 pl-3.5 pr-3 text-[13px] font-medium text-[#010621] hover:bg-[#f2eee6]"
    >
      {label} <span aria-hidden>✕</span>
    </button>
  );
}
