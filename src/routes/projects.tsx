import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteShell, Breadcrumb, CTA } from "@/components/site/chrome";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — UCSF Office of Collaborative Research" },
      {
        name: "description",
        content:
          "Active and completed OCR-managed consortium projects: Immunoprofiler, AutoImmunoprofiler, STAMP, Tuberculosis, ARDS/Sepsis, Rheumatoid Arthritis, CoProjects, Tumor Organoids.",
      },
      { property: "og:title", content: "Projects — UCSF OCR" },
      {
        property: "og:description",
        content:
          "Consortium science under the Bakar ImmunoX Initiative and Parnassus Institutes.",
      },
    ],
  }),
  component: ProjectsPage,
});

type Project = {
  slug: string;
  name: string;
  area: string;
  status: "Active" | "Complete" | "In planning";
  blurb: string;
  accent: string;
  motif: "rings" | "dotsphere" | "polesphere" | "dotsquare" | "helix" | "polepole" | "fullhoop" | "polesquare";
};

const PROJECTS: Project[] = [
  {
    slug: "immunoprofiler",
    name: "Immunoprofiler",
    area: "Cancer",
    status: "Complete",
    blurb:
      "Coordinates handling of human biopsy samples from cancer patients and performs deep tests of immune composition, gene expression, and interaction biology — treating cancers as discrete immunopathologies.",
    accent: "var(--coral)",
    motif: "rings",
  },
  {
    slug: "autoimmunoprofiler",
    name: "AutoImmunoprofiler",
    area: "IBD · Lupus · Scleroderma · Sjögren's · Type 1 Diabetes",
    status: "Active",
    blurb:
      "A consortium profiling autoimmune diseases with proteomic, transcriptomic, epigenomic, and structural analyses on freshly collected tissue with matched blood — to find pathways, targets, and better patient selection.",
    accent: "var(--magenta)",
    motif: "dotsphere",
  },
  {
    slug: "stamp",
    name: "Sjögren's Team for Accelerating Medicines Partnership",
    area: "Sjögren's Disease",
    status: "Active",
    blurb:
      "Interrogates the tissue and systems biology of Sjögren's Disease using deep sequencing to understand pathogenesis, identify targets, and map progression from early to advanced disease.",
    accent: "var(--teal)",
    motif: "polesphere",
  },
  {
    slug: "tuberculosis",
    name: "Tuberculosis",
    area: "Tuberculosis",
    status: "Active",
    blurb:
      "The Suliman group uses systems biology — GWAS, transcriptomics, metabolomics, eQTLs — to identify pathways that determine why only 5–10% of exposed individuals develop active TB.",
    accent: "var(--gold)",
    motif: "dotsquare",
  },
  {
    slug: "ards-sepsis",
    name: "Sepsis / ARDS",
    area: "ARDS and Sepsis",
    status: "Active",
    blurb:
      "The Calfee Lab classifies ARDS and sepsis patients into validated hyper- and hypoinflammatory phenotypes, then queries immunophenotype and metagenomic differences in blood and tracheal aspirate.",
    accent: "var(--coral)",
    motif: "helix",
  },
  {
    slug: "rheumatoid-arthritis",
    name: "Rheumatoid Arthritis",
    area: "Rheumatoid Arthritis",
    status: "Active",
    blurb:
      "A hypothesis-driven study of antigen-activated CD4 T cells in RA synovial tissue, plus a broad characterization of immune and non-immune cells in the synovium — toward more targeted therapeutics.",
    accent: "var(--magenta)",
    motif: "polepole",
  },
  {
    slug: "coprojects",
    name: "CoProjects",
    area: "Various",
    status: "Active",
    blurb:
      "OCR manages the full slate of ImmunoX CoProjects — collaborative pilot-to-program studies using CoLabs technology to build detailed immune profiles across diverse diseases.",
    accent: "var(--teal)",
    motif: "fullhoop",
  },
  {
    slug: "tumor-organoids",
    name: "Tumor Organoids",
    area: "Colorectal & Pancreatic Cancer",
    status: "Active",
    blurb:
      "Patient-derived organoids studied to understand aberrant pathways in colorectal and pancreatic cancer — EGFR signaling, anti-EGFR therapy, Ras driver mutations, and experimental Ras inhibitors.",
    accent: "var(--gold)",
    motif: "polesquare",
  },
];

const STATUSES = ["All", "Active", "Complete", "In planning"] as const;

function Motif({ motif, accent }: { motif: Project["motif"]; accent: string }) {
  // simple SVG motifs evoking the original OCR project iconography
  const common = { stroke: accent, strokeWidth: 1.2, fill: "none" } as const;
  switch (motif) {
    case "rings":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="36" {...common} opacity={0.5} />
          <circle cx="50" cy="50" r="24" {...common} opacity={0.7} />
          <circle cx="50" cy="50" r="12" fill={accent} opacity={0.85} />
        </svg>
      );
    case "dotsphere":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="38" {...common} opacity={0.35} />
          {Array.from({ length: 36 }).map((_, i) => {
            const a = (i / 36) * Math.PI * 2;
            const r = 30 + ((i * 7) % 9);
            return (
              <circle
                key={i}
                cx={50 + Math.cos(a) * r}
                cy={50 + Math.sin(a) * r}
                r={1.4}
                fill={accent}
                opacity={0.85}
              />
            );
          })}
        </svg>
      );
    case "polesphere":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="34" {...common} opacity={0.5} />
          {Array.from({ length: 16 }).map((_, i) => {
            const a = (i / 16) * Math.PI * 2;
            return (
              <line
                key={i}
                x1={50}
                y1={50}
                x2={50 + Math.cos(a) * 34}
                y2={50 + Math.sin(a) * 34}
                stroke={accent}
                strokeWidth={0.8}
                opacity={0.6}
              />
            );
          })}
        </svg>
      );
    case "dotsquare":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect x="18" y="18" width="64" height="64" {...common} opacity={0.4} />
          {Array.from({ length: 7 }).map((_, r) =>
            Array.from({ length: 7 }).map((_, c) => (
              <circle
                key={`${r}-${c}`}
                cx={22 + c * 9.5}
                cy={22 + r * 9.5}
                r={1.4}
                fill={accent}
                opacity={0.8}
              />
            )),
          )}
        </svg>
      );
    case "helix":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {Array.from({ length: 22 }).map((_, i) => {
            const y = 12 + i * 3.6;
            const x = 50 + Math.sin(i / 1.8) * 22;
            const x2 = 50 - Math.sin(i / 1.8) * 22;
            return (
              <g key={i}>
                <line x1={x} y1={y} x2={x2} y2={y} stroke={accent} strokeWidth={0.6} opacity={0.4} />
                <circle cx={x} cy={y} r={1.6} fill={accent} />
                <circle cx={x2} cy={y} r={1.6} fill={accent} opacity={0.6} />
              </g>
            );
          })}
        </svg>
      );
    case "polepole":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {Array.from({ length: 14 }).map((_, i) => (
            <line
              key={i}
              x1={14 + i * 5.5}
              y1={20}
              x2={14 + i * 5.5}
              y2={80}
              stroke={accent}
              strokeWidth={1}
              opacity={0.45 + (i % 3) * 0.15}
            />
          ))}
        </svg>
      );
    case "fullhoop":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="36" fill={accent} opacity={0.18} />
          <circle cx="50" cy="50" r="36" {...common} />
          <circle cx="50" cy="50" r="22" {...common} opacity={0.6} />
        </svg>
      );
    case "polesquare":
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect x="20" y="20" width="60" height="60" {...common} />
          {Array.from({ length: 10 }).map((_, i) => (
            <line
              key={i}
              x1={20 + i * 6.5}
              y1={20}
              x2={20 + i * 6.5}
              y2={80}
              stroke={accent}
              strokeWidth={0.8}
              opacity={0.5}
            />
          ))}
        </svg>
      );
  }
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
          Projects
        </span>
        <h1 className="mt-6 font-display text-[clamp(2.75rem,7.5vw,6.5rem)] leading-[0.95] tracking-tight text-ink max-w-[16ch]">
          Science we're <em className="not-italic text-gradient-sunburst">moving forward.</em>
        </h1>
        <p className="mt-8 max-w-2xl text-xl text-muted-foreground leading-relaxed">
          OCR coordinates consortium projects across cancer, autoimmunity,
          infection, and critical care — embedding development, project
          management, data, and AI in each one.
        </p>
      </div>
    </section>
  );
}

function Grid() {
  const [status, setStatus] = useState<(typeof STATUSES)[number]>("All");
  const filtered = useMemo(
    () => (status === "All" ? PROJECTS : PROJECTS.filter((p) => p.status === status)),
    [status],
  );
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.22em] text-teal font-medium">
              Portfolio
            </span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl text-ink">
              {filtered.length} projects
              <span className="text-muted-foreground"> · {status}</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {STATUSES.map((s) => {
              const active = s === status;
              return (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                    active
                      ? "bg-ink text-white border-ink"
                      : "bg-card text-ink border-border hover:border-ink/40"
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <article
              key={p.slug}
              className="group relative rounded-3xl border border-border bg-card overflow-hidden hover:shadow-lift transition flex flex-col"
            >
              <div
                className="relative aspect-[16/10] overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, color-mix(in oklab, ${p.accent} 18%, var(--cream)), var(--cream))`,
                }}
              >
                <div className="absolute inset-0 p-8 opacity-90 group-hover:scale-105 transition-transform duration-500">
                  <Motif motif={p.motif} accent={p.accent} />
                </div>
                <span
                  className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-card/85 backdrop-blur px-3 py-1 text-[11px] uppercase tracking-widest text-ink"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: p.accent }}
                  />
                  {p.status}
                </span>
              </div>
              <div className="p-6 flex flex-col gap-3 flex-1">
                <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
                  {p.area}
                </div>
                <h3 className="font-display text-2xl text-ink leading-tight">
                  {p.name}
                </h3>
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
              Tell us about the science. We'll bring strategy, project
              management, data infrastructure, and the people to run it.
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
      <Breadcrumb trail={[{ label: "Projects" }]} />
      <Hero />
      <Grid />
      <PitchBand />
      <CTA
        eyebrow="Funding"
        title={<>Or apply to an open RFA.</>}
        subtitle="CoProjects, Data Library Analysis, and Data Library Development RFAs run on rolling cycles."
        email="ocr@ucsf.edu"
        primaryLabel="Email the office →"
      />
    </SiteShell>
  );
}
