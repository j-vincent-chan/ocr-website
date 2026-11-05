import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Breadcrumb, CTA } from "@/components/site/chrome";
import { armName } from "@/components/site/arms";
import {
  ArmEyebrow,
  PullQuote,
  ServiceCrossNav,
} from "@/components/site/service-family";

export const Route = createFileRoute("/services/project-management")({
  head: () => ({
    meta: [
      { title: "Project Management & Clinical Coordination — UCSF OCR" },
      {
        name: "description",
        content:
          "The service arm OCR was built on — biospecimen pipelines, clinical studies and trials, and clinical research operations for UCSF investigators moving translational science into the clinic.",
      },
      { property: "og:title", content: "Project Management & Clinical Coordination — UCSF OCR" },
      {
        property: "og:description",
        content:
          "From protocol to data lock: the operational backbone connecting UCSF labs, clinics, regulatory offices, and biorepositories.",
      },
    ],
  }),
  component: PMPage,
});

const T = "var(--teal)";
const ARM = "02";

/* ───────── HERO ───────── */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream border-b border-border">
      <div
        aria-hidden
        className="absolute -top-40 -left-40 w-[720px] h-[720px] rounded-full opacity-25 blur-3xl"
        style={{ background: "var(--gradient-sunburst)" }}
      />
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-24 relative">
        <ArmEyebrow arm={ARM} label="One of five service arms" accent={T} />
        <h1 className="mt-8 font-display text-[clamp(2.15rem,4.2vw,3.75rem)] leading-[1.08] tracking-tight text-ink max-w-4xl">
          Coordinating people, processes, and operations to{" "}
          <em className="not-italic" style={{ color: T }}>
            execute research.
          </em>
        </h1>
        <div className="mt-12 grid lg:grid-cols-12 gap-10">
          <p className="lg:col-span-6 text-xl text-muted-foreground leading-relaxed">
            Before research development, AI tools, and strategic partnerships,
            our core work was helping investigators move clinical and
            translational research from idea to execution — building the
            infrastructure, regulatory scaffolding, and day-to-day coordination
            that human subjects research actually requires.
          </p>
          <div className="lg:col-span-5 lg:col-start-8 grid grid-cols-3 gap-6">
            {[
              ["29", "Active programs & projects in 2025"],
              ["3", "Connected areas of support"],
              ["5", "Team members on the bench"],
            ].map(([n, l]) => (
              <div key={l} className="border-l-2 pl-4" style={{ borderColor: T }}>
                <div className="font-display text-3xl text-ink leading-none">{n}</div>
                <div className="text-[11px] text-muted-foreground uppercase tracking-widest mt-2 leading-snug">
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── ORIGIN — why this arm exists ───────── */
function Origin() {
  const beats = [
    {
      label: "The shift",
      t: "Basic science went to the clinic.",
      d: "More basic and translational researchers are now pursuing human subjects work — but not every investigator has the clinical connections, clinic access, or experience navigating the regulatory and operational requirements that make these studies possible.",
    },
    {
      label: "The gap",
      t: "Good science needs more than a question.",
      d: "Human subjects research demands the right clinical partners, a feasible protocol, IRB approval, biospecimen and data workflows, participant-facing coordination, regulatory documentation, and ongoing project oversight.",
    },
    {
      label: "The response",
      t: "OCR builds the infrastructure.",
      d: "Our team supports projects from the earliest planning stages through active execution — serving as the connective tissue between the research lab, clinical collaborators, regulatory offices, and operational teams.",
    },
  ];
  return (
    <section className="py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <ArmEyebrow arm={ARM} label="Origin" accent={T} />
          <h2 className="mt-6 font-display text-5xl text-ink leading-[0.98]">
            Bridging a gap<br />the field created.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-px bg-border rounded-3xl overflow-hidden border border-border">
          {beats.map((b, i) => (
            <article key={b.label} className="bg-cream p-8 md:p-10 flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-display text-xl" style={{ color: T }}>
                  0{i + 1}
                </span>
                <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  {b.label}
                </span>
              </div>
              <h3 className="font-display text-2xl text-ink leading-snug">{b.t}</h3>
              <p className="mt-5 text-muted-foreground leading-relaxed">{b.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── THREE CONNECTED AREAS ───────── */
function ThreeAreas() {
  const areas = [
    {
      no: "01",
      label: "Biospecimen Pipelines",
      title: "From clinic to bench, sample by sample.",
      d: "Design and operation of sample-collection workflows that connect clinical settings to research labs — consent, processing, chain-of-custody, banking, and downstream assay hand-offs.",
      bullets: [
        "Biospecimen pipeline design",
        "Protocol consultation & IRB submission",
        "Database development & QC/QA",
        "Project launch & coordination",
      ],
      c: "var(--coral)",
    },
    {
      no: "02",
      label: "Clinical Studies & Trials",
      title: "Investigator-initiated and industry-sponsored.",
      d: "Full-spectrum support for clinical studies and clinical trials, from activation through monitoring — meeting investigators wherever they are in the lifecycle of the study.",
      bullets: [
        "OCTA activation",
        "Budget development & negotiation",
        "Contract coordination & study startup",
        "Clinical coordination & monitoring",
      ],
      c: "var(--teal)",
    },
    {
      no: "03",
      label: "Clinical Research Operations",
      title: "Supervising and standing up CRUs.",
      d: "With experienced senior Clinical Research Coordinators on the team, OCR provides operational leadership, staff supervision, and workflow standardization for groups that need additional structure or capacity.",
      bullets: [
        "CRU operational leadership",
        "Staff supervision",
        "Workflow standardization",
        "Hands-on capacity support",
      ],
      c: "var(--magenta)",
    },
  ];
  return (
    <section className="py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">
          <div className="lg:col-span-7">
            <ArmEyebrow arm={ARM} label="Three connected areas" accent={T} />
            <h2 className="mt-6 font-display text-5xl md:text-6xl text-ink leading-[0.98]">
              One arm,<br />three points of entry.
            </h2>
          </div>
          <p className="lg:col-span-4 lg:col-start-9 text-muted-foreground leading-relaxed">
            Most programs draw on more than one. We tailor support to the study,
            not the other way around.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {areas.map((a) => (
            <article
              key={a.no}
              className="group relative rounded-3xl border border-border bg-card p-8 flex flex-col hover:shadow-lift hover:-translate-y-0.5 transition-all duration-300"
            >
              <span
                aria-hidden
                className="absolute top-0 left-8 right-8 h-[2px] origin-left scale-x-50 group-hover:scale-x-100 transition-transform duration-500"
                style={{ background: a.c }}
              />
              <div className="flex items-center justify-between">
                <span
                  className="text-[11px] uppercase tracking-[0.24em] font-medium"
                  style={{ color: a.c }}
                >
                  {a.label}
                </span>
                <span
                  className="font-display text-3xl tabular-nums opacity-50 group-hover:opacity-90 transition-opacity"
                  style={{ color: a.c }}
                >
                  {a.no}
                </span>
              </div>
              <h3 className="mt-5 font-display text-2xl text-ink leading-snug">{a.title}</h3>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{a.d}</p>
              <ul className="mt-6 space-y-2 border-t border-border pt-5">
                {a.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-ink/80">
                    <span
                      className="w-1 h-1 rounded-full mt-2 shrink-0"
                      style={{ background: a.c }}
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── PORTFOLIO — bar chart of 2023→2025 by area ───────── */
function Portfolio() {
  // Data per uploaded slide: 2023 / 2024 / 2025 across four functions
  const cats = [
    { name: "Program Management", v: [1, 2, 2], c: "var(--gold)" },
    { name: "Project Management", v: [2, 9, 18], c: "var(--teal)" },
    { name: "Clinical Coordination", v: [4, 11, 15], c: "var(--coral)" },
    { name: "Data Management", v: [3, 4, 13], c: "var(--magenta)" },
  ];
  const max = 20;
  return (
    <section className="py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">
          <div className="lg:col-span-6">
            <ArmEyebrow arm={ARM} label="Current portfolio" accent={T} />
            <h2 className="mt-6 font-display text-5xl text-ink leading-[0.98]">
              29 active programs<br />and projects in 2025.
            </h2>
          </div>
          <ul className="lg:col-span-5 lg:col-start-8 space-y-3 text-muted-foreground leading-relaxed">
            <li className="flex gap-3">
              <span className="font-display text-ink shrink-0">→</span>
              Total volume has grown steadily each year, reflecting strong
              expansion across all support areas.
            </li>
            <li className="flex gap-3">
              <span className="font-display text-ink shrink-0">→</span>
              We're operating at near-full bandwidth; further growth would
              require new hires, space, and management overhead.
            </li>
            <li className="flex gap-3">
              <span className="font-display text-ink shrink-0">→</span>
              The current Project Management surge (18 in 2025) reflects
              CoProjects, which is expected to wind down within 1–2 years.
            </li>
          </ul>
        </div>

        <div className="rounded-3xl border border-border bg-card p-8 md:p-10">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Active programs & projects by area
            </div>
            <div className="flex items-center gap-5 text-[11px] uppercase tracking-widest text-muted-foreground">
              {["2023", "2024", "2025"].map((y, i) => (
                <div key={y} className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-sm"
                    style={{
                      background: T,
                      opacity: 0.3 + i * 0.35,
                    }}
                  />
                  {y}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 md:gap-8 items-end h-[280px]">
            {cats.map((c) => (
              <div key={c.name} className="flex flex-col items-center h-full">
                <div className="flex items-end justify-center gap-1.5 md:gap-2 h-full w-full">
                  {c.v.map((val, i) => (
                    <div
                      key={i}
                      className="relative flex-1 rounded-t-md group/bar"
                      style={{
                        height: `${(val / max) * 100}%`,
                        background: c.c,
                        opacity: 0.3 + i * 0.35,
                        minHeight: "8px",
                      }}
                    >
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-mono text-ink/70 tabular-nums">
                        {val}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-[11px] md:text-xs text-center text-muted-foreground leading-tight max-w-[14ch]">
                  {c.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── CLINICAL COORDINATION MODEL — three niches ───────── */
function CoordinationModel() {
  const niches = [
    {
      no: "Niche 01",
      title: "OCR as a flexible CRU for non-clinical researchers",
      d: "Acts as an on-demand Clinical Research Unit for groups without a dedicated one — guiding investigators new to human-subjects work through regulatory and procedural requirements.",
      cases: ["Sjögren's Clinic", "Lupus Nephritis at UCSF & ZSFG", "Prostate Cancer Program"],
      c: "var(--coral)",
    },
    {
      no: "Niche 02",
      title: "OCR partners with existing CRUs to extend capacity",
      d: "Shares CRCs with established CRUs whose bandwidth is consumed by clinical trials, ensuring non-clinical projects still get timely, adequate coordination.",
      cases: ["Gastrointestinal Oncology", "Brain Tumor Center"],
      c: "var(--teal)",
    },
    {
      no: "Niche 03",
      title: "OCR embeds CRCs within departments or institutions",
      d: "Places CRCs strategically inside specific institutions or departments to act as an honest broker — supporting research across multiple divisions and bridging clinical groups.",
      cases: ["St. Mary's & St. Francis Hospitals", "ZSFG"],
      c: "var(--gold)",
    },
  ];
  return (
    <section className="py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-14">
          <ArmEyebrow arm={ARM} label="Clinical coordination model" accent={T} />
          <h2 className="mt-6 font-display text-5xl text-ink leading-[0.98]">
            Three ways<br />we deploy CRCs.
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed max-w-xl">
            Our coordination model flexes with the science. The same team takes
            on three distinct shapes depending on what the study needs.
          </p>
        </div>

        <ol className="grid lg:grid-cols-3 gap-5">
          {niches.map((n) => (
            <li
              key={n.no}
              className="relative rounded-3xl bg-card border border-border p-8 flex flex-col"
            >
              <span
                aria-hidden
                className="absolute top-0 left-8 right-8 h-[2px]"
                style={{ background: n.c }}
              />
              <div className="flex items-center justify-between">
                <span
                  className="text-[11px] uppercase tracking-[0.24em] font-medium"
                  style={{ color: n.c }}
                >
                  {n.no}
                </span>
                <CoordIcon variant={n.no} accent={n.c} />
              </div>
              <h3 className="mt-5 font-display text-xl text-ink leading-snug">{n.title}</h3>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{n.d}</p>
              <div className="mt-6 border-t border-border pt-5">
                <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground mb-3">
                  In practice
                </div>
                <ul className="flex flex-wrap gap-1.5">
                  {n.cases.map((c) => (
                    <li
                      key={c}
                      className="text-[11px] px-2.5 py-1 rounded-full border border-border bg-secondary/60 text-ink/80"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* Small diagrammatic icon per niche — matches family idiom */
function CoordIcon({ variant, accent }: { variant: string; accent: string }) {
  // 56x40 mini diagrams: PI cluster + OCR + receiver
  if (variant === "Niche 01") {
    // OCR connects to small clinical group
    return (
      <svg width="56" height="32" viewBox="0 0 56 32" aria-hidden>
        <circle cx="8" cy="8" r="3" fill={accent} opacity="0.6" />
        <circle cx="8" cy="16" r="3" fill={accent} opacity="0.6" />
        <circle cx="8" cy="24" r="3" fill={accent} opacity="0.6" />
        <line x1="11" y1="16" x2="24" y2="16" stroke={accent} strokeWidth="1" opacity="0.5" />
        <circle cx="28" cy="16" r="5" fill="var(--ink)" />
        <line x1="33" y1="16" x2="44" y2="16" stroke={accent} strokeWidth="1" opacity="0.5" />
        <circle cx="48" cy="16" r="4" fill={accent} opacity="0.4" stroke={accent} />
      </svg>
    );
  }
  if (variant === "Niche 02") {
    // OCR connects to large CRU with satellite CRCs
    return (
      <svg width="56" height="32" viewBox="0 0 56 32" aria-hidden>
        <circle cx="8" cy="16" r="4" fill="var(--ink)" />
        <line x1="12" y1="16" x2="24" y2="16" stroke={accent} strokeWidth="1" opacity="0.5" />
        <circle cx="32" cy="16" r="7" fill={accent} opacity="0.3" stroke={accent} />
        {[
          [32, 6],
          [42, 11],
          [42, 21],
          [32, 26],
          [22, 21],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="2" fill={accent} opacity="0.8" />
        ))}
      </svg>
    );
  }
  // Niche 03 — embedded inside institution
  return (
    <svg width="56" height="32" viewBox="0 0 56 32" aria-hidden>
      <circle cx="8" cy="16" r="4" fill="var(--ink)" />
      <line x1="12" y1="16" x2="22" y2="16" stroke={accent} strokeWidth="1" opacity="0.5" />
      <circle cx="34" cy="16" r="10" fill={accent} opacity="0.18" stroke={accent} strokeDasharray="2 2" />
      <circle cx="34" cy="16" r="3" fill="var(--ink)" />
      {["Neuro", "Card", "Onc", "ID"].map((_, i) => {
        const angle = (i / 4) * Math.PI * 2;
        const cx = 34 + Math.cos(angle) * 6;
        const cy = 16 + Math.sin(angle) * 6;
        return <circle key={i} cx={cx} cy={cy} r="1.4" fill={accent} opacity="0.85" />;
      })}
    </svg>
  );
}

/* ───────── PIPELINES — biospecimen flow and the data flow that shadows it ───────── */
type FlowNode = { t: string; d: string; c: string };

const SPECIMEN_FLOW: FlowNode[] = [
  { t: "Collect", d: "Consent + SOP-driven sample collection at the site.", c: "var(--coral)" },
  { t: "Process", d: "Centrifuge, aliquot, label — chain-of-custody logged.", c: "var(--magenta)" },
  { t: "Bank", d: "Biorepository integration: barcoded, temperature-monitored.", c: "var(--teal)" },
  { t: "Ship", d: "Manifested, IATA-compliant shipping to downstream cores.", c: "var(--gold)" },
  { t: "Assay", d: "Hand-off to single-cell, proteomics, sequencing partners.", c: "var(--lime)" },
];

const DATA_FLOW: FlowNode[] = [
  { t: "Collect", d: "Clinical and sample metadata captured at the source, in REDCap or the study database.", c: "var(--coral)" },
  { t: "De-identify", d: "PHI stripped or coded under the IRB-approved plan before anything leaves the clinic.", c: "var(--magenta)" },
  { t: "Upload", d: "Secure transfer to the study's data environment — logged, versioned, and access-controlled.", c: "var(--teal)" },
  { t: "Store", d: "Structured, backed-up storage linked to the specimen record by a shared ID.", c: "var(--gold)" },
  { t: "QC & curate", d: "Range checks, missingness reports, and harmonized variables — in partnership with OCR data management.", c: "var(--lime)" },
  { t: "QA", d: "Periodic audits against source so the dataset is ready for analysis and sharing.", c: "var(--teal)" },
];

function FlowStrip({ nodes, compact = false }: { nodes: FlowNode[]; compact?: boolean }) {
  // Six compact nodes need more room than five, so the row layout kicks in at `lg`.
  // Tailwind only emits classes it can read as literal strings — keep these spelled out.
  const rowClass = compact ? "hidden lg:flex" : "hidden md:flex";
  const listClass = compact ? "lg:hidden" : "md:hidden";
  return (
    <>
      <div className={`${rowClass} items-stretch gap-2`}>
        {nodes.map((n, i) => (
          <div key={n.t} className="flex-1 flex items-stretch">
            <div className={`flex-1 rounded-2xl border border-border bg-card relative ${compact ? "p-5" : "p-6"}`}>
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-display text-white text-sm mb-4"
                style={{ background: n.c }}
              >
                0{i + 1}
              </div>
              <div className={`font-display text-ink ${compact ? "text-lg" : "text-xl"}`}>{n.t}</div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{n.d}</p>
            </div>
            {i < nodes.length - 1 && (
              <div className="flex items-center px-1 text-muted-foreground" aria-hidden>
                →
              </div>
            )}
          </div>
        ))}
      </div>
      <ol className={`${listClass} space-y-3`}>
        {nodes.map((n, i) => (
          <li key={n.t} className="rounded-2xl border border-border bg-card p-5 flex gap-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-display text-white text-sm flex-none"
              style={{ background: n.c }}
            >
              0{i + 1}
            </div>
            <div>
              <div className="font-display text-lg text-ink">{n.t}</div>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{n.d}</p>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}

function Pipeline() {
  return (
    <section className="py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">
          <div className="lg:col-span-7">
            <ArmEyebrow arm={ARM} label="Specimen & data pipelines" accent={T} />
            <h2 className="mt-6 font-display text-5xl text-ink leading-[0.98]">
              Every sample — and<br />every data point — accounted for.
            </h2>
          </div>
          <p className="lg:col-span-4 lg:col-start-9 text-muted-foreground leading-relaxed">
            From the clinic to the assay, our lifecycle keeps science moving
            and provenance intact. Alongside every specimen runs a data
            pipeline we build and maintain with the same care.
          </p>
        </div>

        <div className="flex items-center gap-4 mb-5">
          <span className="text-[11px] uppercase tracking-[0.24em] font-medium text-ink/70">
            Biospecimen flow
          </span>
          <span className="h-px flex-1 bg-border" />
        </div>
        <FlowStrip nodes={SPECIMEN_FLOW} />

        <div className="flex items-center gap-4 mt-14 mb-5">
          <span className="text-[11px] uppercase tracking-[0.24em] font-medium text-ink/70">
            Data flow
          </span>
          <span className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">
            Built with{" "}
            <Link
              to="/services/data-management"
              className="underline underline-offset-4 hover:text-ink transition"
            >
              OCR data management
            </Link>
          </span>
        </div>
        <FlowStrip nodes={DATA_FLOW} compact />
      </div>
    </section>
  );
}

/* ───────── FEATURED PARTNERSHIPS ───────── */
function Spotlights() {
  return (
    <section className="py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-14">
          <ArmEyebrow arm={ARM} label="In motion" accent={T} />
          <h2 className="mt-6 font-display text-5xl text-ink leading-[0.98]">
            Two partnerships<br />shaping what's next.
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          {/* St. Mary's / UCSF Health */}
          <article className="group relative rounded-3xl border border-border bg-card p-8 md:p-10 overflow-hidden hover:shadow-lift transition-all duration-300">
            <span
              aria-hidden
              className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-25 group-hover:opacity-50 transition-opacity"
              style={{ background: "var(--gold)" }}
            />
            <div className="relative">
              <div className="text-[11px] uppercase tracking-[0.24em] font-medium" style={{ color: "var(--gold)" }}>
                Pilot · UCSF Health
              </div>
              <h3 className="mt-3 font-display text-3xl text-ink leading-snug">
                OCR & St. Mary's / St. Francis Hospitals
              </h3>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                UCSF Health acquired St. Mary's and St. Francis earlier in the
                year. With Ted Abraham leading affiliate networks, OCR is
                piloting an on-site CRC for three years to broaden the clinical
                research portfolio — acting as an honest broker across community
                physicians and multiple departments.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-ink/80">
                <li className="flex items-start gap-2.5">
                  <span className="w-1 h-1 rounded-full mt-2 shrink-0" style={{ background: "var(--gold)" }} />
                  3-year on-site CRC pilot
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1 h-1 rounded-full mt-2 shrink-0" style={{ background: "var(--gold)" }} />
                  Expanding industry-sponsored & registry portfolio (~11 protocols today)
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1 h-1 rounded-full mt-2 shrink-0" style={{ background: "var(--gold)" }} />
                  Possible extension to MarinHealth, Sonoma Valley, John Muir, Washington Hospital
                </li>
              </ul>
            </div>
          </article>

          {/* Biospecimen Pipeline Development Program */}
          <article className="group relative rounded-3xl border border-border bg-card p-8 md:p-10 overflow-hidden hover:shadow-lift transition-all duration-300">
            <span
              aria-hidden
              className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-25 group-hover:opacity-50 transition-opacity"
              style={{ background: "var(--coral)" }}
            />
            <div className="relative">
              <div className="text-[11px] uppercase tracking-[0.24em] font-medium" style={{ color: "var(--coral)" }}>
                Program · with ImmunoX
              </div>
              <h3 className="mt-3 font-display text-3xl text-ink leading-snug">
                New Biospecimen Pipeline Development
              </h3>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                A funded award that helps researchers establish or improve
                pipelines for obtaining human biospecimens from clinical
                settings — allocating up to 50% of an OCR CRC's effort for study
                setup, participant recruitment, consent, sample acquisition, and
                data management.
              </p>
              <div className="mt-7">
                <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground mb-3">
                  2024 awarded applications
                </div>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {[
                    ["Chronic Rhinosinusitis", "Airway Brushings · Kotas"],
                    ["Immune Development", "Pediatric Tissues · Crouch"],
                    ["Brain Metastasis", "Brain Tumors · Young"],
                    ["Prostate Cancer", "Prostate Tumors · Bose"],
                    ["Tuberculosis", "Tissue Biopsies · Sithole"],
                  ].map(([t, s]) => (
                    <li
                      key={t}
                      className="rounded-xl border border-border bg-secondary/50 p-3"
                    >
                      <div className="text-sm text-ink font-medium">{t}</div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">{s}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ───────── TEAM ROSTER ───────── */
function Bench() {
  const rows = [
    { r: "Project Manager", n: 1, focus: "Cross-program oversight & study setup", c: "var(--teal)" },
    { r: "Senior Clinical Research Coordinator", n: 3, focus: "Translational & clinical trial leads", c: "var(--coral)" },
    { r: "Clinical Research Coordinator", n: 1, focus: "Participant-facing coordination & sample workflows", c: "var(--magenta)" },
  ];
  return (
    <section className="py-24 bg-ink text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-12">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-white/60 font-medium">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: T }} aria-hidden />
              <span>{armName(ARM)}</span>
              <span className="opacity-40">·</span>
              <span className="text-white/85">The bench</span>
            </div>
            <h2 className="mt-6 font-display text-5xl text-white leading-[0.98]">
              Five people.<br />Fractional, flexible, shared.
            </h2>
          </div>
          <p className="lg:col-span-5 lg:col-start-8 text-white/70 leading-relaxed">
            Project Managers and CRCs contribute fractional effort across
            multiple studies — making high-quality clinical research support
            accessible to investigators who don't need (or can't fund) a
            full-time hire.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 overflow-hidden">
          <div className="grid grid-cols-12 px-6 py-4 text-[11px] uppercase tracking-widest text-white/50 bg-white/5">
            <div className="col-span-6">Role</div>
            <div className="col-span-2 text-right">On bench</div>
            <div className="col-span-4">Focus</div>
          </div>
          {rows.map((r) => (
            <div
              key={r.r}
              className="grid grid-cols-12 px-6 py-5 items-center border-t border-white/10 hover:bg-white/5 transition"
            >
              <div className="col-span-6 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full" style={{ background: r.c }} />
                <span className="font-display text-lg text-white">{r.r}</span>
              </div>
              <div className="col-span-2 text-right font-display text-2xl text-white">{r.n}</div>
              <div className="col-span-4 text-sm text-white/70">{r.focus}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── EVIDENCE ───────── */
function Evidence() {
  const quotes = [
    {
      q: "OCR gave us the connective tissue between our lab, the clinic, and the regulatory office. Our study would not have launched without them.",
      a: "Principal Investigator, Translational Research",
      c: "var(--coral)",
    },
    {
      q: "We didn't need a full-time coordinator — we needed the right twenty percent of one. OCR made that possible.",
      a: "PI, Investigator-Initiated Study",
      c: "var(--teal)",
    },
    {
      q: "Their senior CRCs brought structure to a group that had been improvising for years. The standardization was immediate.",
      a: "Division Chief, UCSF Health",
      c: "var(--magenta)",
    },
  ];
  return (
    <section className="py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between flex-wrap gap-8 mb-12">
          <div>
            <ArmEyebrow arm={ARM} label="In their words" accent={T} />
            <h2 className="mt-6 font-display text-4xl md:text-5xl text-ink leading-[1.04] max-w-2xl">
              From the investigators<br />we run studies with.
            </h2>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {quotes.map((t, i) => (
            <PullQuote key={i} quote={t.q} attribution={t.a} accent={t.c} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PMPage() {
  return (
    <SiteShell>
      <Breadcrumb
        trail={[
          { label: "Services" },
          { label: "Project Management & Clinical Coordination" },
        ]}
      />
      <Hero />
      <Origin />
      <ThreeAreas />
      <Portfolio />
      <CoordinationModel />
      <Pipeline />
      <Spotlights />
      <Bench />
      <Evidence />
      <ServiceCrossNav currentPath="/services/project-management" />
      <CTA
        eyebrow="Run with us"
        title={
          <>
            Have a study that needs
            <br />
            <span className="text-white/70">a steady hand?</span>
          </>
        }
        subtitle="Tell us where you are — pre-award, in startup, or mid-flight — and we'll show you exactly where our team can plug in."
        email="ocr@ucsf.edu"
        primaryLabel="Scope a project →"
      />
    </SiteShell>
  );
}
