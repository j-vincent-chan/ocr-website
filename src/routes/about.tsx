import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Breadcrumb, CTA, SunburstLogo } from "@/components/site/chrome";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — UCSF Office of Collaborative Research" },
      {
        name: "description",
        content:
          "OCR is the strategic hub of ImmunoX and the Parnassus Institutes at UCSF — building the staff, services, and software that accelerate collaborative research.",
      },
      { property: "og:title", content: "About — UCSF Office of Collaborative Research" },
      { property: "og:description", content: "How OCR works, what we believe, and who we serve." },
    ],
  }),
  component: AboutPage,
});

/* Editorial cover with large oversized type, vertical date column */
function Cover() {
  return (
    <section className="relative overflow-hidden border-b border-ink/15 bg-cream">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-24 grid lg:grid-cols-12 gap-10 relative">
        <aside className="lg:col-span-2 hidden lg:flex flex-col gap-8 text-xs uppercase tracking-widest text-muted-foreground pt-2">
          <div>
            <div className="text-ink font-display text-3xl normal-case">№ 01</div>
            <div className="mt-1">An office story</div>
          </div>
          <div>
            <div>Volume</div>
            <div className="text-ink mt-1">2022 — 2026</div>
          </div>
        </aside>
        <div className="lg:col-span-10">
          <span className="text-xs uppercase tracking-[0.22em] text-coral font-medium">
            About
          </span>
          <h1 className="mt-6 font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.95] tracking-tight text-ink">
            A research office<br />
            built like a <em className="not-italic text-gradient-sunburst">startup.</em>
          </h1>
          <p className="mt-10 max-w-3xl text-xl text-muted-foreground leading-relaxed">
            OCR began as an experiment in proximity: a research office embedded
            with investigators, staffed by scientists and science allies, and
            entrusted to build whatever the work required. Four years and eight
            partners later, the experiment is the model.
          </p>
        </div>
      </div>
    </section>
  );
}

/* The short version — for readers who want the shape of the story before the story */
function AtAGlance() {
  const beats = [
    { y: "2022", t: "OCR launches, seeded by the Bakar ImmunoX Initiative, to help basic researchers reach the clinic." },
    { y: "2024", t: "A research development arm is added. UCSF Health engages OCR to run a new clinical research unit." },
    { y: "2025", t: "IGHS and the Diabetes Center adopt the OCR model as institute partners." },
    { y: "2026", t: "AI Tools and Community Management complete OCR's five-arm model. OCR takes on the Pulmonary clinical research units." },
  ];
  const facts = [
    { n: "5", l: "Service arms" },
    { n: "8", l: "Partners" },
    { n: "120+", l: "Investigators served" },
  ];
  return (
    <section className="py-20 border-b border-ink/10">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-4">
          <span className="text-xs uppercase tracking-[0.22em] text-coral font-medium">
            At a glance
          </span>
          <h2 className="mt-4 font-display text-4xl text-ink leading-[1.02]">
            The short version.
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            An office that started with one mission and grew an arm each time
            investigators needed something that didn't yet exist. The full
            story follows.
          </p>
          <dl className="mt-8 grid grid-cols-3 gap-4">
            {facts.map((f) => (
              <div key={f.l} className="border-l-2 border-coral pl-4">
                <dd className="font-display text-3xl text-ink leading-none">{f.n}</dd>
                <dt className="text-[11px] text-muted-foreground uppercase tracking-widest mt-2 leading-snug">
                  {f.l}
                </dt>
              </div>
            ))}
          </dl>
        </div>
        <ol className="lg:col-span-7 lg:col-start-6 divide-y divide-border">
          {beats.map((b) => (
            <li key={b.y} className="grid grid-cols-[5rem_1fr] gap-6 py-5 first:pt-0 last:pb-0">
              <span className="font-display text-2xl text-ink tabular-nums leading-tight">{b.y}</span>
              <p className="text-muted-foreground leading-relaxed">{b.t}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* Single-column origin story — part one, through Research Development */
function OriginPartOne() {
  return (
    <section className="py-28">
      <div className="max-w-3xl mx-auto px-6">
        <span className="text-xs uppercase tracking-[0.22em] text-teal font-medium">
          Chapter I
        </span>
        <h2 className="mt-4 font-display text-4xl md:text-5xl text-ink leading-tight">
          Where it started.
        </h2>
        <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
          <span className="w-6 h-px bg-ink/40" />
          6 min read
        </div>

        <div className="mt-12 space-y-6 text-[17px] leading-[1.75] text-ink/85">
          <p className="font-display text-xl text-ink/90 leading-snug">
            OCR did not begin as a five-arm research office.
          </p>
          <p>
            It began with a very practical problem: ImmunoX investigators were moving closer to
            human biology, but the bridge between basic research and the clinic was still too hard
            to cross.
          </p>
          <p>
            Human subjects research was becoming central to discovery. Faculty wanted access to
            clinical samples, patient cohorts, translational collaborations, and real-world disease
            contexts. But getting from a scientific idea to a functioning clinical research pipeline
            required a strange mix of skills: scientific fluency, regulatory navigation, project
            management, clinical coordination, data organization, and the ability to keep many
            people moving in the same direction.
          </p>
          <p>
            So in September 2022, under Dr. Vincent Chan&apos;s guidance and seeded by the Bakar
            ImmunoX Initiative, OCR launched as an experiment.
          </p>
          <p>The original mission was simple: help basic researchers connect to the clinic.</p>
          <p>But like most good experiments, the result was bigger than the hypothesis.</p>
          <p>
            As OCR got closer to investigators, it became clear that the bottleneck was not just
            clinical access. Faculty also needed help turning ambitious ideas into fundable
            programs. UCSF had no shortage of brilliant science. What it needed was more connective
            tissue: people who could shape early concepts, build grant narratives, coordinate
            collaborators, and help proposals become competitive before the deadline panic set in.
          </p>
          <p>So in 2024, OCR launched its Research Development arm.</p>
          <p>
            That changed the trajectory. OCR was no longer just helping research reach the clinic.
            It was helping ideas become programs.
          </p>
        </div>
      </div>
    </section>
  );
}

/* Single-column origin story — part two, after the timeline */
function OriginPartTwo() {
  return (
    <section className="py-28 bg-cream">
      <div className="max-w-3xl mx-auto px-6">
        <span className="text-xs uppercase tracking-[0.22em] text-teal font-medium">
          Chapter III
        </span>
        <h2 className="mt-4 font-display text-4xl md:text-5xl text-ink leading-tight">
          The platform.
        </h2>

        <div className="mt-12 space-y-6 text-[17px] leading-[1.75] text-ink/85">
          <p>Then the model started to travel.</p>
          <p>
            In September 2024, UCSF Health acquired Stanyan and Hyde Hospitals and wanted to
            preserve and strengthen the clinical research already happening there. Rather than
            letting that work drift, UCSF Health engaged OCR to manage the Clinical Research Unit.
            It was exactly the kind of messy, high-stakes, high-coordination problem OCR was built
            for: people, protocols, patients, operations, and institutional change all moving at
            once.
          </p>
          <p>
            By January 2025, new partners were coming in for a different reason. The Institute for
            Global Health Sciences and the Diabetes Center partnered with OCR, drawn especially to
            the growing Research Development arm and the need for embedded grant strategy across
            their research communities.
          </p>
          <p>
            A year later, in January 2026, Pulmonary partnered with OCR to manage its Interstitial
            Lung Disease and Bronchiectasis Clinical Research Units, expanding OCR&apos;s role in
            clinical research operations even further.
          </p>
          <p>By May 2026, the pattern was impossible to miss.</p>
          <p>OCR had become more than a service office. It had become a platform.</p>
          <p>
            Research Development. Clinical Coordination and Project Management.
            Data Management and Sharing. Research Resources and AI Tools.
            Community Management.
          </p>
          <p>
            Five service arms, each added because a real bottleneck appeared and OCR decided to
            build the thing that was missing.
          </p>
          <p>That is still the philosophy.</p>
          <p>
            OCR does not start with a fixed menu and ask researchers to fit inside it. We start
            with the work. We listen for the friction. We find the gap between the idea and the
            execution, between the clinic and the lab, between the proposal and the program,
            between the data and the story.
          </p>
          <p>Then we build around it.</p>
          <p>
            Four years and eight partners later, OCR is still the same experiment at
            heart: a research office embedded close enough to the science to understand what
            matters, nimble enough to adapt as needs change, and practical enough to turn ambition
            into something fundable, executable, and durable.
          </p>
          <p>
            We publish our scorecard. We share our software. We keep looking for the next bottleneck
            worth removing.
          </p>
          <p className="font-display text-xl text-ink/90 leading-snug">And then we build.</p>
        </div>
      </div>
    </section>
  );
}

/* Year-grouped timeline — hover to reveal details */
type TimelineMilestone = {
  id: string;
  t: string;
  d: string;
  c: string;
};

function TimelineMilestonePanel({
  milestone,
  highlighted,
  dimmed,
  onActivate,
  onDeactivate,
  onToggle,
}: {
  milestone: TimelineMilestone;
  highlighted: boolean;
  dimmed: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
  onToggle: () => void;
}) {
  return (
    <div
      className={`transition-opacity duration-300 ${dimmed ? "opacity-35" : "opacity-100"}`}
    >
      <button
        type="button"
        className="timeline-beat-trigger relative z-10 w-full text-left"
        aria-expanded={highlighted}
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") onActivate();
        }}
        onPointerLeave={(e) => {
          if (e.pointerType === "mouse") onDeactivate();
        }}
        onFocus={onActivate}
        onBlur={onDeactivate}
        onClick={onToggle}
      >
        <div
          className="border-l-2 pl-4 transition-[border-color] duration-300"
          style={{ borderColor: highlighted ? milestone.c : "color-mix(in oklch, white 18%, transparent)" }}
        >
          <h3
            className={`text-lg leading-snug transition-colors duration-300 ${
              highlighted ? "text-white" : "text-white/80"
            }`}
          >
            {milestone.t}
          </h3>

          <div
            className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out motion-reduce:grid-rows-[1fr] motion-reduce:opacity-100 ${
              highlighted ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <p className="pt-2 text-sm leading-relaxed text-white/65">{milestone.d}</p>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}

function TimelineColumn({
  group,
  groupIndex,
  activeId,
  onActivate,
  onDeactivate,
  onToggle,
}: {
  group: { year: string; milestones: TimelineMilestone[] };
  groupIndex: number;
  activeId: string | null;
  onActivate: (id: string) => void;
  onDeactivate: () => void;
  onToggle: (id: string) => void;
}) {
  return (
    <li
      className="timeline-column min-w-0"
      style={{ animationDelay: `${groupIndex * 120}ms` }}
    >
      <div className="font-display text-5xl text-white/90">{group.year}</div>

      <div className="timeline-rail-zone relative z-10 mt-6 flex flex-col gap-2 pb-1">
        {group.milestones.map((m, index) => {
          const highlighted = activeId === m.id;
          return (
            <div key={m.id} className="relative flex items-center">
              {index > 0 ? (
                <div
                  className="pointer-events-none absolute left-[7px] bottom-full h-2 w-px bg-white/25"
                  aria-hidden
                />
              ) : null}
              <div
                className={`timeline-dot shrink-0 rounded-full ring-4 ring-ink transition-all duration-300 ease-out ${
                  highlighted ? "h-[1.125rem] w-[1.125rem]" : "h-4 w-4"
                }`}
                style={{
                  background: m.c,
                  boxShadow: highlighted
                    ? `0 0 18px color-mix(in oklch, ${m.c} 55%, transparent)`
                    : undefined,
                }}
                aria-hidden
              />
            </div>
          );
        })}
      </div>

      <div className="relative z-20 mt-8 space-y-5">
        {group.milestones.map((m) => (
          <TimelineMilestonePanel
            key={m.id}
            milestone={m}
            highlighted={activeId === m.id}
            dimmed={activeId !== null && activeId !== m.id}
            onActivate={() => onActivate(m.id)}
            onDeactivate={onDeactivate}
            onToggle={() => onToggle(m.id)}
          />
        ))}
      </div>
    </li>
  );
}

function Timeline() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const groups = [
    {
      year: "2022",
      milestones: [
        {
          id: "launch",
          t: "OCR takes root",
          d: "Seeded by the Bakar ImmunoX Initiative. OCR's first mission was bridging basic science and the clinic as human subjects research accelerated across UCSF.",
          c: "var(--coral)",
        },
      ],
    },
    {
      year: "2024",
      milestones: [
        {
          id: "rd-arm",
          t: "OCR launches its Research Development arm",
          d: "Research development becomes a formal service arm — helping investigators across UCSF research communities turn ideas into competitive proposals.",
          c: "var(--teal)",
        },
        {
          id: "ucsf-health",
          t: "UCSF Health Network partners with OCR to create a new clinical research unit",
          d: "UCSF Health engages OCR to manage the Clinical Research Unit at Stanyan and Hyde.",
          c: "var(--magenta)",
        },
      ],
    },
    {
      year: "2025",
      milestones: [
        {
          id: "ighs",
          t: "IGHS adopts the OCR model",
          d: "The Institute for Global Health Sciences adopts the OCR model, with deep interest in embedded research development support.",
          c: "var(--gold)",
        },
        {
          id: "diabetes",
          t: "Diabetes Center joins as a partner",
          d: "The Diabetes Center becomes an institute partner, expanding OCR's research development capacity across Parnassus.",
          c: "oklch(0.65 0.15 265)",
        },
      ],
    },
    {
      year: "2026",
      milestones: [
        {
          id: "pulmonary",
          t: "OCR takes on Pulmonary CRUs",
          d: "OCR manages interstitial lung disease and bronchiectasis CRUs for the Division of Pulmonary, Critical Care, Allergy, and Sleep Medicine.",
          c: "var(--lime)",
        },
        {
          id: "ai-tools",
          t: "AI Tools expands the fourth arm",
          d: "Research Resources & AI Tools launches, adding in-house workflow experiments and software for the work we wished someone else had already done.",
          c: "oklch(0.75 0.14 50)",
        },
        {
          id: "community-management",
          t: "Community Management becomes the fifth arm",
          d: "OCR formalizes enrichment program staffing as a service arm: Community Managers who run seminars, retreats, award programs, mentorship, communications, and reporting for centers and P30 grants.",
          c: "var(--lime)",
        },
      ],
    },
  ];
  return (
    <section className="py-28 bg-ink text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-14 text-center">
        <span className="text-xs uppercase tracking-[0.22em] text-coral font-medium">
          Chapter II — Timeline
        </span>
        <h2 className="mt-4 font-display text-5xl md:text-6xl text-white leading-[0.98] max-w-3xl mx-auto">
          How an experiment<br />became <em className="not-italic text-gradient-sunburst">the model.</em>
        </h2>
        <p className="mt-6 text-sm text-white/40 tracking-wide">
          <span className="hidden md:inline">Hover a milestone to read more.</span>
          <span className="md:hidden">Tap a milestone to read more.</span>
        </p>
      </div>
      <div className="timeline-track relative mx-auto w-full px-6 lg:px-12 xl:px-16 max-w-[120rem]">
        <ol className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-8 gap-y-14 xl:gap-x-12">
          {groups.map((group, groupIndex) => (
            <TimelineColumn
              key={group.year}
              group={group}
              groupIndex={groupIndex}
              activeId={activeId}
              onActivate={setActiveId}
              onDeactivate={() => setActiveId(null)}
              onToggle={(id) => setActiveId((prev) => (prev === id ? null : id))}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

/* Pull quote — center stage */
function PullQuote() {
  return (
    <section className="py-32 bg-cream">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <SunburstLogo className="w-12 h-12 mx-auto opacity-70" />
        <blockquote className="mt-10 font-display text-4xl md:text-6xl leading-[1.05] text-ink">
          "Closer is better. Embedded staff outperform shared services. We
          invest in <em className="not-italic text-gradient-sunburst">proximity.</em>"
        </blockquote>
        <div className="mt-8 text-sm text-muted-foreground uppercase tracking-widest">
          — Principle №1 of the OCR model
        </div>
      </div>
    </section>
  );
}

/* Principles as numbered editorial blocks, alternating sides */
function Principles() {
  const items = [
    { n: "01", t: "Closer is better", d: "Embedded staff outperform shared services. We invest in proximity.", c: "var(--coral)" },
    { n: "02", t: "Scientists serve scientists", d: "Our team comes from the bench, the clinic, and the field — immunology, endocrinology, global health, computation. We speak the language before we touch the page.", c: "var(--teal)" },
    { n: "03", t: "Build, don't buy", d: "When existing tools don't fit, we build our own — and share what we learn.", c: "var(--magenta)" },
    { n: "04", t: "Measure what matters", d: "Funded dollars, hours saved, PI satisfaction. We publish our scorecard.", c: "var(--gold)" },
  ];
  return (
    <section className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <span className="text-xs uppercase tracking-[0.22em] text-coral font-medium">
            Chapter IV — Principles
          </span>
          <h2 className="mt-4 font-display text-5xl md:text-6xl text-ink leading-[0.98]">
            Four ideas behind<br />the model.
          </h2>
        </div>
        <div className="space-y-12">
          {items.map((p, i) => (
            <div
              key={p.n}
              className={`grid md:grid-cols-12 gap-8 items-start ${
                i % 2 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className={`md:col-span-3 ${i % 2 ? "md:order-2 md:text-right" : ""}`}>
                <div
                  className="font-display text-7xl"
                  style={{ color: p.c }}
                >
                  {p.n}
                </div>
              </div>
              <div className={`md:col-span-9 border-t border-ink/15 pt-6 ${i % 2 ? "md:order-1" : ""}`}>
                <h3 className="font-display text-3xl md:text-4xl text-ink leading-tight">
                  {p.t}
                </h3>
                <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">
                  {p.d}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <SiteShell>
      <Breadcrumb trail={[{ label: "About" }]} />
      <Cover />
      <AtAGlance />
      <OriginPartOne />
      <Timeline />
      <OriginPartTwo />
      <PullQuote />
      <Principles />
      <CTA
        eyebrow="Partner with OCR"
        title={<>Could your institute<br /><span className="text-white/70">be next?</span></>}
        subtitle="We design partnerships at the program, department, or institute level — and we're actively looking for what's next."
        email="ocr@ucsf.edu"
        primaryLabel="Start the conversation →"
      />
    </SiteShell>
  );
}
