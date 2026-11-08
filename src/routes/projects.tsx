import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PROJECTS, type Project } from "@/data/projects";
import {
  DEFAULT_PROJECT_FILTERS,
  filterProjects,
  getDisplayAreaPills,
  getFilterOptions,
  hasActiveFilters,
  type ProjectFilters,
  type StatusFilter,
} from "@/lib/project-filters";
import { ProjectMotif } from "@/components/site/project-motifs";
import { cn } from "@/lib/utils";
import { SiteShell, Breadcrumb } from "@/components/site/chrome";
import { ProjectsFundingBand } from "@/components/funding/projects-band";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Programs & Projects — UCSF Office of Collaborative Research" },
      {
        name: "description",
        content:
          "OCR-managed programs, consortium projects, clinical research units, and biobanks across cancer, autoimmunity, infection, lung disease, and critical care.",
      },
      { property: "og:title", content: "Programs & Projects — UCSF OCR" },
      {
        property: "og:description",
        content: "Consortium science under the Bakar ImmunoX Initiative and Parnassus Institutes.",
      },
    ],
  }),
  component: ProjectsPage,
});

const STATUSES: StatusFilter[] = ["All", "Active", "Closed"];

function FilterSelect({
  label,
  value,
  options,
  onChange,
  className = "",
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <label className={cn("flex flex-col gap-1.5 min-w-[9.5rem] flex-1", className)}>
      <span className="text-[10px] uppercase tracking-[0.18rem] text-muted-foreground font-medium">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-full border border-border bg-cream/80 px-3.5 py-2 text-sm text-ink hover:border-ink/30 focus:outline-none focus:ring-2 focus:ring-ink/15 transition cursor-pointer"
      >
        <option value="">All</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

function ProjectAreaPills({ project }: { project: Project }) {
  const tags = useMemo(() => getDisplayAreaPills(project), [project]);
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-medium leading-snug"
          style={{
            background: `color-mix(in oklab, ${project.accent} 24%, var(--card))`,
            color: `color-mix(in oklab, ${project.accent} 55%, var(--ink))`,
            border: `1px solid color-mix(in oklab, ${project.accent} 38%, transparent)`,
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream border-b border-ink/10">
      <div
        aria-hidden
        className="absolute -top-40 -left-40 w-[640px] h-[640px] rounded-full blur-3xl opacity-25"
        style={{ background: "var(--gradient-sunburst)" }}
      />
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-20 relative">
        <span className="text-xs uppercase tracking-[0.22em] text-magenta font-medium">
          Programs & Projects
        </span>
        <h1 className="mt-6 font-display text-[clamp(2.75rem,7.5vw,6.5rem)] leading-[0.95] tracking-tight text-ink max-w-[16ch]">
          Science we're <em className="not-italic text-gradient-sunburst">moving forward.</em>
        </h1>
        <p className="mt-8 max-w-2xl text-xl text-muted-foreground leading-relaxed">
          OCR coordinates consortium projects across cancer, autoimmunity, infection, and critical
          care — embedding development, project management, data, and AI in each one.
        </p>
      </div>
    </section>
  );
}

function ServiceArmHighlights() {
  const arms = [
    {
      n: "01",
      arm: "Research development",
      title: "From hunch to fundable program",
      description:
        "Strategic Consultations, Specific Aims Reviews, Scientific Peer Reviews, Research Plan Reviews, and large-grant development programs help investigators turn promising ideas into competitive proposals.",
      proof:
        "Highlighted work: Large Grant Development Program, Research Plan Reviews, Scientific Peer Reviews",
      to: "/services/research-development",
      accent: "var(--coral)",
    },
    {
      n: "02",
      arm: "Research operations & management",
      title: "Studies, CRUs, and biospecimen pipelines",
      description:
        "The portfolio below is strongest here: clinical research units, biospecimen workflows, CoProjects, and investigator-initiated or industry-sponsored clinical studies.",
      proof: "Highlighted work: Pulmonary CRUs, SMSF, CoProjects",
      to: "/services/research-operations",
      accent: "var(--teal)",
    },
    {
      n: "03",
      arm: "Data management",
      title: "Databases, DMS plans, and shareable datasets",
      description:
        "Data work often travels with clinical coordination: REDCap/database setup, data dictionaries, QC, metadata, and NIH-compliant data management and sharing.",
      proof: "Highlighted work: Data Library RFAs, DMS platforms",
      to: "/services/data-management",
      accent: "var(--magenta)",
    },
    {
      n: "04",
      arm: "AI tools",
      title: "Signal, Prospera, Atlas, and Runway",
      description:
        "OCR's in-house tools surface publications, match investigators to opportunities, assemble research intelligence, and help PIs plan personnel and finances.",
      proof: "Highlighted work: Signal beta, Prospera pilots, Runway",
      to: "/services/ai-tools",
      accent: "var(--gold)",
    },
    {
      n: "05",
      arm: "Community management",
      title: "Enrichment programs for centers and P30s",
      description:
        "Community Managers run the seminar series, retreats, pilot and travel awards, mentorship pipelines, communications, and annual reporting that center grants commit to.",
      proof: "Running today: Diabetes Center NORC & DRC P30s, ImmunoX",
      to: "/services/community-management",
      accent: "var(--lime)",
    },
  ];

  return (
    <section className="py-20 border-b border-border bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-12">
          <div className="lg:col-span-7">
            <span className="text-xs uppercase tracking-[0.22em] text-coral font-medium">
              Organized by service arm
            </span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl text-ink leading-[1.02]">
              Five ways OCR moves work forward.
            </h2>
          </div>
          <p className="lg:col-span-4 lg:col-start-9 text-muted-foreground leading-relaxed">
            The filterable portfolio below is strongest for active managed studies and programs.
            These cards orient visitors first by OCR's five service arms, then point them to the
            detailed examples.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {arms.map((arm) => (
            <Link
              key={arm.n}
              to={arm.to}
              className="group rounded-3xl border border-border bg-card p-7 hover:shadow-lift hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-display text-3xl tabular-nums" style={{ color: arm.accent }}>
                  {arm.n}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground text-right">
                  {arm.arm}
                </span>
              </div>
              <h3 className="mt-5 font-display text-2xl text-ink leading-tight">{arm.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {arm.description}
              </p>
              <div
                className="mt-5 rounded-2xl px-4 py-3 text-xs leading-relaxed"
                style={{
                  background: `color-mix(in oklab, ${arm.accent} 12%, var(--card))`,
                  color: `color-mix(in oklab, ${arm.accent} 45%, var(--ink))`,
                }}
              >
                {arm.proof}
              </div>
              <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink">
                Explore the arm
                <span aria-hidden className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectFiltersPanel({
  filters,
  options,
  onFilterChange,
  onClear,
  layout,
}: {
  filters: ProjectFilters;
  options: ReturnType<typeof getFilterOptions>;
  onFilterChange: <K extends keyof ProjectFilters>(key: K, value: ProjectFilters[K]) => void;
  onClear: () => void;
  layout: "bar" | "sidebar";
}) {
  const setFilter = onFilterChange;
  const isBar = layout === "bar";

  const statusButtons = STATUSES.map((s) => {
    const active = s === filters.status;
    return (
      <button
        key={s}
        type="button"
        onClick={() => setFilter("status", s)}
        className={cn(
          "rounded-full text-sm font-medium border transition",
          isBar ? "px-4 py-2" : "w-full px-3.5 py-2 text-left",
          active
            ? "bg-ink text-white border-ink"
            : "bg-cream/80 text-ink border-border hover:border-ink/40",
        )}
      >
        {s}
      </button>
    );
  });

  const filterSelects = (
    <>
      <FilterSelect
        label="Program / project"
        value={filters.kind}
        options={options.kinds}
        onChange={(v) => setFilter("kind", v)}
        className={isBar ? "" : "min-w-0 flex-none w-full"}
      />
      <FilterSelect
        label="Project type"
        value={filters.projectType}
        options={options.projectTypes}
        onChange={(v) => setFilter("projectType", v)}
        className={isBar ? "" : "min-w-0 flex-none w-full"}
      />
      <FilterSelect
        label="Sponsor"
        value={filters.sponsor}
        options={options.sponsors}
        onChange={(v) => setFilter("sponsor", v)}
        className={isBar ? "" : "min-w-0 flex-none w-full"}
      />
      <FilterSelect
        label="OCR service"
        value={filters.service}
        options={options.services}
        onChange={(v) => setFilter("service", v)}
        className={isBar ? "" : "min-w-0 flex-none w-full"}
      />
      <FilterSelect
        label="Disease area"
        value={filters.disease}
        options={options.diseases}
        onChange={(v) => setFilter("disease", v)}
        className={isBar ? "" : "min-w-0 flex-none w-full"}
      />
    </>
  );

  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card/95 backdrop-blur-md shadow-[0_12px_40px_rgba(26,26,46,0.07)]",
        isBar ? "p-4 md:p-5" : "p-5 space-y-5",
      )}
    >
      <div className={cn("flex items-center justify-between gap-3", isBar && "mb-4")}>
        <span className="text-[10px] uppercase tracking-[0.18rem] text-muted-foreground font-medium">
          {isBar ? "Filter by" : "Filters"}
        </span>
        {hasActiveFilters(filters) && (
          <button
            type="button"
            onClick={onClear}
            className="text-[11px] font-medium text-teal hover:text-teal/80 transition shrink-0"
          >
            Clear filters
          </button>
        )}
      </div>

      {isBar ? (
        <>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-[10px] uppercase tracking-[0.18rem] text-muted-foreground font-medium mr-1">
              Status
            </span>
            {statusButtons}
          </div>
          <div className="flex flex-wrap gap-3 md:gap-4">{filterSelects}</div>
        </>
      ) : (
        <>
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.18rem] text-muted-foreground font-medium">
              Status
            </span>
            <div className="flex flex-col gap-1.5">{statusButtons}</div>
          </div>
          <div className="h-px bg-border/80" aria-hidden />
          <div className="space-y-4">{filterSelects}</div>
        </>
      )}
    </div>
  );
}

function Grid() {
  const [filters, setFilters] = useState<ProjectFilters>(DEFAULT_PROJECT_FILTERS);
  const options = useMemo(() => getFilterOptions(PROJECTS), []);
  const filtered = useMemo(() => filterProjects(PROJECTS, filters), [filters]);

  const setFilter = <K extends keyof ProjectFilters>(key: K, value: ProjectFilters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const statusLabel = filters.status === "All" ? "all statuses" : filters.status.toLowerCase();

  const filterPanelProps = {
    filters,
    options,
    onFilterChange: setFilter,
    onClear: () => setFilters(DEFAULT_PROJECT_FILTERS),
  };

  return (
    <section className="py-20 overflow-visible">
      <div className="max-w-7xl mx-auto px-6 overflow-visible">
        <div className="mb-8 xl:mb-10">
          <span className="text-xs uppercase tracking-[0.22em] text-teal font-medium">
            Portfolio
          </span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl text-ink">
            {filtered.length} programs & projects
            <span className="text-muted-foreground"> · {statusLabel}</span>
          </h2>
        </div>

        {/* Inline filter bar on smaller screens */}
        <div className="xl:hidden mb-8">
          <ProjectFiltersPanel layout="bar" {...filterPanelProps} />
        </div>

        <div className="relative overflow-visible">
          {/* Sticky sidebar — only within the portfolio section, left of the grid */}
          <div className="hidden xl:block absolute top-0 right-full mr-5 w-[15.5rem]">
            <div className="sticky top-24 z-10" aria-label="Portfolio filters">
              <ProjectFiltersPanel layout="sidebar" {...filterPanelProps} />
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-16 text-lg">
              No programs or projects match these filters.{" "}
              <button
                type="button"
                onClick={() => setFilters(DEFAULT_PROJECT_FILTERS)}
                className="text-teal font-medium hover:underline"
              >
                Reset filters
              </button>
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p, index) => (
                <article
                  key={p.slug}
                  id={p.slug}
                  className="project-card-reveal group relative scroll-mt-28 rounded-3xl border border-border bg-card overflow-hidden hover:shadow-lift transition-shadow duration-500 flex flex-col"
                  style={{ animationDelay: `${index * 70}ms` }}
                >
                  <div
                    className="relative aspect-[16/10] overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, color-mix(in oklab, ${p.accent} 18%, var(--cream)), var(--cream))`,
                    }}
                  >
                    <div className="project-card-art absolute inset-0 z-0">
                      <ProjectMotif motif={p.motif} accent={p.accent} />
                    </div>
                    <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-card/85 backdrop-blur px-3 py-1 text-[11px] uppercase tracking-widest text-ink pointer-events-none">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: p.accent }} />
                      {p.status}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col gap-3 flex-1">
                    <ProjectAreaPills project={p} />
                    <h3 className="font-display text-2xl text-ink leading-tight">{p.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {p.blurb}
                    </p>
                    <div className="pt-2 flex items-center text-sm font-medium text-ink">
                      Read more
                      <span
                        className="ml-1 transition-transform group-hover:translate-x-1"
                        aria-hidden
                      >
                        →
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function PitchBand() {
  return (
    <section className="pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="rounded-3xl bg-secondary p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.22em] text-coral font-medium">
              Start with us
            </span>
            <h2 className="mt-3 font-display text-3xl md:text-4xl text-ink leading-tight">
              Have something we should be working on?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Tell us about the science. We'll bring strategy, project management, data
              infrastructure, and the people to run it.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-ink text-white px-6 py-3 text-sm font-medium hover:bg-ink/90 transition"
          >
            Start a project
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProjectsPage() {
  return (
    <SiteShell>
      <Breadcrumb trail={[{ label: "Programs & Projects" }]} />
      <Hero />
      <ServiceArmHighlights />
      <Grid />
      <PitchBand />
      <ProjectsFundingBand />
    </SiteShell>
  );
}
