import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Breadcrumb, CTA } from "@/components/site/chrome";
import { ServiceSubnav } from "@/components/site/service-subnav";
import { ServiceHero, ServiceHeroHighlight } from "@/components/site/service-hero";
import gabeImg from "@/assets/gabe.jpg";
import reidImg from "@/assets/reid.jpg";

export const Route = createFileRoute("/services/research-development")({
  head: () => ({
    meta: [
      { title: "Research development & grantwriting — UCSF OCR" },
      {
        name: "description",
        content:
          "Strategy, matchmaking, scientific peer review, and end-to-end grantwriting support for UCSF investigators — from Large Grants to R-series.",
      },
      { property: "og:title", content: "Research development & grantwriting — UCSF OCR" },
      {
        property: "og:description",
        content:
          "Bridging the gap UCSF can't afford — proactive support for competitive federal proposals.",
      },
    ],
  }),
  component: RDGPage,
});

const C = "var(--coral)";

/* ─────────────────────────── HERO ─────────────────────────── */
function Hero() {
  return (
    <ServiceHero
      arm="01"
      armLabel="Research development & grantwriting"
      accent={C}
      title={
        <>
          The space between
          <br />
          an idea and a
          <br />
          <ServiceHeroHighlight accent={C}>funded program.</ServiceHeroHighlight>
        </>
      }
      description="We're proactive, relationship-driven research development strategists embedded across UCSF — building the pipeline, sharpening the science, and writing the grant alongside the PI."
      below={
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded-md border border-ink/15 bg-white/60 text-ink/75">
            Large Grants
          </span>
          <span className="px-2.5 py-1 rounded-md border border-ink/15 bg-white/60 text-ink/75">
            RPRs
          </span>
          <span className="px-2.5 py-1 rounded-md border border-ink/15 bg-white/60 text-ink/75">
            BOOST
          </span>
          <span className="px-2.5 py-1 rounded-md border border-ink/15 bg-white/60 text-ink/75">
            Grantwriting Academy
          </span>
          <span className="px-2.5 py-1 rounded-md border border-ink/15 bg-white/60 text-ink/75">
            AI tools
          </span>
        </div>
      }
    />
  );
}

/* ────────── WHY THIS ARM EXISTS — editorial problem-narrative ────────── */
function WhyExists() {
  return (
    <section className="py-24 bg-cream border-b border-ink/10">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <span className="text-xs uppercase tracking-[0.22em] font-medium" style={{ color: C }}>
            Why this arm exists
          </span>
          <h2 className="mt-4 font-display text-5xl text-ink leading-[0.98]">
            A gap UCSF<br />
            <em className="not-italic text-gradient-sunburst">can't afford.</em>
          </h2>
        </div>
        <div className="lg:col-span-7 space-y-6 text-ink/80 leading-relaxed text-lg">
          <p>
            UCSF's Research Development Office no longer supports grantwriting. In
            2025, leadership eliminated the RDO entirely. A proposed Faculty Writing
            Center went unfunded.
          </p>
          <p>
            At the same time, the federal landscape shifted hard against
            investigators — pressure on indirect cost rates, a shrinking NIH budget,
            reductions in force, and delays in releasing awarded funds. The result:
            more competition for fewer dollars, on shorter timelines.
          </p>
          <p className="font-display text-2xl text-ink leading-snug">
            OCR's Research Development arm exists to bridge that gap — so UCSF stays
            the #1 public recipient of NIH funding, and our investigators don't carry
            the weight alone.
          </p>
        </div>
      </div>

      {/* stat strip */}
      <div className="max-w-7xl mx-auto px-6 mt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 rounded-2xl overflow-hidden border border-ink/10 bg-ink text-white">
          {[
            { v: "9.33", l: "Avg. quality (1–10)", c: "var(--coral)" },
            { v: "9.33", l: "Avg. satisfaction (1–10)", c: "var(--magenta)" },
            { v: "43", l: "Grants supported in 2025", c: "var(--teal)" },
            { v: "$48M+", l: "In awards supported", c: "var(--gold)" },
          ].map((s) => (
            <div key={s.l} className="p-7 border-r border-white/10 last:border-r-0">
              <div className="w-8 h-0.5 mb-4" style={{ background: s.c }} />
              <div className="font-display text-4xl md:text-5xl text-white">{s.v}</div>
              <div className="mt-2 text-[11px] uppercase tracking-widest text-white/55">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────── PROGRAMS — asymmetric grid ────────────────────── */
type Program = {
  k: string;
  name: string;
  tag: string;
  c: string;
  blurb: string;
  bullets: string[];
  status: string;
  featured?: boolean;
};

const PROGRAMS: Program[] = [
  {
    k: "lg",
    name: "Large Grants Program",
    tag: "Flagship · P / U / Center mechanisms",
    c: "var(--coral)",
    blurb:
      "Coordinated scientific programs that create institutional capability, infrastructure, visibility, and durable ecosystems. Our priority — and the engine of OCR's reputation.",
    bullets: [
      "End-to-end strategy, aims, narrative, and submission",
      "OCR PMs, CRCs, and data managers can be written into the budget",
      "15–25% RDSG effort baked into the award sustains the program",
    ],
    status: "Active",
    featured: true,
  },
  {
    k: "rpr",
    name: "Research Plan Reviews (RPRs)",
    tag: "R01 & equivalents · ~6-week engagement",
    c: "var(--magenta)",
    blurb:
      "Focused, hands-on support for smaller investigator-initiated grants — the proposals that sustain research programs, advance new ideas, and launch early-stage PIs.",
    bullets: [
      "Iterative feedback on Aims, Research Plan, Biosketch, figures",
      "Strategic in week 6 → copyediting in the final 1–2 weeks",
      "~30 hours per application · subsidized for partner programs",
    ],
    status: "Active",
  },
  {
    k: "boost",
    name: "BOOST",
    tag: "Faculty-to-faculty scientific peer review",
    c: "var(--teal)",
    blurb:
      "A scientific layer on top of RDG and RPR. OCR's writers sharpen the narrative; BOOST reviewers pressure-test the science itself — premise, aims, feasibility, competitiveness.",
    bullets: [
      "Senior faculty reviewers matched by science and applicant input",
      "Typically scheduled ~1 month before NIH deadlines",
      "Primarily for R01s · especially valuable for early-career PIs",
    ],
    status: "Active · partner programs",
  },
  {
    k: "academy",
    name: "Grantwriting Academy",
    tag: "Workshops, cohorts, and on-demand seminars",
    c: "var(--gold)",
    blurb:
      "Translating OCR's hands-on grant development into training. From pre-award mechanics to mechanism-specific cohorts — built so teams enter the grant process better prepared.",
    bullets: [
      "Pre-Award Grant Training (RFA, biosketches, budgets, Gantt, LoS)",
      "First R21 Workshop · K Grant Workshops for early-career investigators",
      "Just-in-time seminars on simplified review, SciENcv, biosketch updates",
    ],
    status: "In development",
  },
];

function Programs() {
  return (
    <section className="py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">
          <div className="lg:col-span-7">
            <span className="text-xs uppercase tracking-[0.22em] font-medium" style={{ color: C }}>
              Programs
            </span>
            <h2 className="mt-4 font-display text-5xl md:text-6xl text-ink leading-[0.98]">
              Four programs.<br />
              <em className="not-italic text-muted-foreground/60">One pipeline.</em>
            </h2>
          </div>
          <p className="lg:col-span-5 text-muted-foreground leading-relaxed">
            Each program meets investigators at a different stage of the grant
            journey. Most PIs touch two or three before submission.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-5">
          {PROGRAMS.map((p) => (
            <article
              key={p.k}
              className={`relative rounded-3xl bg-card border border-border p-8 md:p-9 hover:shadow-lift transition group overflow-hidden ${
                p.featured ? "lg:col-span-12" : "lg:col-span-4"
              }`}
            >
              <div
                aria-hidden
                className="absolute top-0 left-0 right-0 h-1"
                style={{ background: p.c }}
              />
              {p.featured && (
                <div
                  aria-hidden
                  className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-25"
                  style={{ background: p.c }}
                />
              )}
              <div className={`relative ${p.featured ? "grid lg:grid-cols-12 gap-10" : ""}`}>
                <div className={p.featured ? "lg:col-span-6" : ""}>
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] font-medium" style={{ color: p.c }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: p.c }} />
                    {p.tag}
                  </div>
                  <h3 className={`mt-4 font-display text-ink leading-tight ${p.featured ? "text-4xl md:text-5xl" : "text-2xl"}`}>
                    {p.name}
                  </h3>
                  <p className={`mt-4 text-muted-foreground leading-relaxed ${p.featured ? "text-lg max-w-xl" : "text-sm"}`}>
                    {p.blurb}
                  </p>
                </div>
                <div className={p.featured ? "lg:col-span-6 lg:pt-2" : "mt-5"}>
                  <ul className="space-y-2.5 text-sm text-ink/80">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex gap-3">
                        <span
                          className="mt-1.5 w-1.5 h-1.5 rounded-full flex-none"
                          style={{ background: p.c }}
                        />
                        <span className="leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground border border-border rounded-full px-2.5 py-1">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: p.c }} />
                    {p.status}
                  </div>
                </div>
              </div>
            </article>
          ))}

          {/* Cross-link to AI page */}
          <Link
            to="/services/ai-tools"
            className="lg:col-span-12 relative rounded-3xl border border-dashed border-ink/20 bg-secondary/40 p-8 md:p-9 hover:bg-secondary transition group flex items-center justify-between gap-6"
          >
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] font-medium text-muted-foreground">
                Coming soon · cross-arm
              </div>
              <h3 className="mt-3 font-display text-2xl md:text-3xl text-ink">
                Grantwriting AI Tools — Pre-Flight Reviewer & Prospera
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-3xl">
                We're building diagnostic and matchmaking tools that augment (not
                replace) our grantwriters — flagging clarity issues in drafts and
                matching investigators to NOFOs by portfolio fit.
              </p>
            </div>
            <span className="hidden md:inline-flex items-center gap-2 rounded-full bg-ink text-white px-5 py-3 text-sm font-medium group-hover:bg-ink/85 transition flex-none">
              Visit AI tools <span aria-hidden>→</span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ───────── PRIORITIZATION FRAMEWORK — ascending arrow rubric ───────── */
function Prioritization() {
  const tiers = [
    {
      n: "01",
      pts: 40,
      title: "Includes OCR services",
      crit: ["Grantwriting & reviewing", "Project management", "Data management", "Clinical coordination"],
      c: "var(--coral)",
    },
    {
      n: "02",
      pts: 30,
      title: "Is a collaboration",
      crit: ["Links clinical & basic scientists", "Pairs established & junior investigators"],
      c: "var(--magenta)",
    },
    {
      n: "03",
      pts: 20,
      title: "Supports community",
      crit: ["Standardized, cross-comparable data", "Data sharing component", "Support for CoLabs / cores"],
      c: "var(--teal)",
    },
    {
      n: "04",
      pts: 10,
      title: "Is likely competitive",
      crit: ["Resubmission of a scored application", "Evidence of collaborative group & preliminary data", "Well-targeted to the NOFO"],
      c: "var(--gold)",
    },
  ];
  return (
    <section className="py-28 bg-ink text-white relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-sunburst opacity-20 blur-3xl" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-16">
          <div className="lg:col-span-7">
            <span className="text-xs uppercase tracking-[0.22em] font-medium" style={{ color: "var(--coral)" }}>
              Prioritization framework & rubric
            </span>
            <h2 className="mt-4 font-display text-5xl md:text-6xl text-white leading-[0.98]">
              We can't take<br />everything.<br />
              <em className="not-italic text-white/55">So here's how we choose.</em>
            </h2>
          </div>
          <p className="lg:col-span-5 text-white/70 leading-relaxed">
            Co-developed with our partner programs. Every inbound proposal is
            scored against four weighted criteria — keeping our pipeline aligned
            with where OCR can add the most value.
          </p>
        </div>

        {/* Ascending stack — each tier larger than the next, color-graded */}
        <ol className="space-y-3">
          {tiers.map((t, i) => {
            const width = 100 - i * 10; // 100, 90, 80, 70
            return (
              <li
                key={t.n}
                className="rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition relative overflow-hidden"
                style={{ marginLeft: `${i * 4}%`, width: `${width}%` }}
              >
                <div
                  aria-hidden
                  className="absolute left-0 top-0 bottom-0 w-1"
                  style={{ background: t.c }}
                />
                <div className="grid grid-cols-12 gap-6 items-center px-6 md:px-8 py-6">
                  <div className="col-span-12 md:col-span-2 flex items-center gap-3">
                    <span
                      className="font-display text-2xl w-10 h-10 rounded-xl flex items-center justify-center text-white"
                      style={{ background: t.c }}
                    >
                      {t.n}
                    </span>
                    <span className="font-display text-3xl text-white">{t.pts}</span>
                    <span className="text-[10px] uppercase tracking-widest text-white/50">pts</span>
                  </div>
                  <div className="col-span-12 md:col-span-3">
                    <div className="font-display text-xl text-white leading-tight">{t.title}</div>
                  </div>
                  <div className="col-span-12 md:col-span-7 flex flex-wrap gap-2">
                    {t.crit.map((c) => (
                      <span
                        key={c}
                        className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/85"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <p className="mt-8 text-xs text-white/45 italic">
          Example rubric · co-developed with each partner program and tuned to their priorities.
        </p>
      </div>
    </section>
  );
}

/* ─────────────────── PARTNERS — orbiting arrangement ─────────────────── */
function Partners() {
  const partners = [
    { name: "Bakar ImmunoX Initiative", since: "Founding", effort: "Embedded", c: "var(--coral)" },
    { name: "Institute for Global Health Sciences (IGHS)", since: "Jan 2025", effort: "66% RDSG", c: "var(--magenta)" },
    { name: "Diabetes Center", since: "Sept 2024", effort: "50% RDSG", c: "var(--teal)" },
    { name: "Institute for Health and Aging (IHA)", since: "July 2026", effort: "Joining", c: "var(--gold)" },
  ];
  return (
    <section className="py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">
          <div className="lg:col-span-6">
            <span className="text-xs uppercase tracking-[0.22em] font-medium" style={{ color: C }}>
              Partner programs
            </span>
            <h2 className="mt-4 font-display text-5xl text-ink leading-[0.98]">
              Embedded, not<br />on-call.
            </h2>
          </div>
          <p className="lg:col-span-5 lg:col-start-8 text-muted-foreground leading-relaxed">
            We share strategists with partner institutes so we know the science
            and the people — and we still help unaffiliated faculty when bandwidth
            allows.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {partners.map((p) => (
            <div key={p.name} className="rounded-3xl bg-card border border-border p-7 hover:shadow-lift transition relative overflow-hidden">
              <div
                aria-hidden
                className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-25"
                style={{ background: p.c }}
              />
              <div className="relative">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-muted-foreground">
                  <span className="w-2 h-2 rounded-full" style={{ background: p.c }} />
                  {p.since}
                </div>
                <h3 className="mt-4 font-display text-xl text-ink leading-snug">{p.name}</h3>
                <div className="mt-6 text-[11px] uppercase tracking-widest text-ink/60 font-mono">
                  {p.effort}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────── TEAM TIMELINE — horizontal ────────────────────── */
function TeamTimeline() {
  const beats = [
    { date: "Sept 2024", title: "Arm launched", body: "Gabe Murphy, PhD joins as OCR's first Research Development Strategist & Grantwriter.", c: "var(--coral)" },
    { date: "Sept 2024", title: "Diabetes Center partnership", body: "Reid Bolus, PhD embedded — initially 75/25, later balanced 50/50 with OCR.", c: "var(--teal)" },
    { date: "Jan 2025", title: "IGHS joins", body: "Institute for Global Health Sciences partners on 33% of an RDSG, later expanded to 66%.", c: "var(--magenta)" },
    { date: "July 2026", title: "IHA joins · Senior RDSG", body: "Institute for Health and Aging partners. New part-time RDSG added; Gabe promoted to Senior RDSG to lead the team.", c: "var(--gold)" },
  ];
  return (
    <section className="py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">
          <div className="lg:col-span-6">
            <span className="text-xs uppercase tracking-[0.22em] font-medium" style={{ color: C }}>
              The team, in time
            </span>
            <h2 className="mt-4 font-display text-5xl text-ink leading-[0.98]">
              Built in 24 months.<br />
              <em className="not-italic text-muted-foreground/60">Still growing.</em>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 flex items-center gap-5">
            <div className="flex -space-x-3">
              <img src={gabeImg} alt="Gabe Murphy" className="w-14 h-14 rounded-full border-2 border-cream object-cover" />
              <img src={reidImg} alt="Reid Bolus" className="w-14 h-14 rounded-full border-2 border-cream object-cover" />
              <div className="w-14 h-14 rounded-full border-2 border-cream bg-gradient-sunburst opacity-70 flex items-center justify-center text-white text-xs font-display">
                +2
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Two strategists today, four by mid-2026 — with Gabe stepping up to
              lead the team as Senior RDSG.
            </p>
          </div>
        </div>

        <div className="relative">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-7 h-px"
            style={{
              background:
                "linear-gradient(to right, var(--coral), var(--teal), var(--magenta), var(--gold))",
            }}
          />
          <ol className="grid md:grid-cols-4 gap-6">
            {beats.map((b) => (
              <li key={b.title + b.date} className="relative pt-14">
                <span
                  aria-hidden
                  className="absolute left-0 top-5 w-5 h-5 rounded-full ring-4 ring-cream"
                  style={{ background: b.c }}
                />
                <div className="text-[11px] uppercase tracking-widest font-mono text-muted-foreground">
                  {b.date}
                </div>
                <h3 className="mt-2 font-display text-xl text-ink leading-snug">{b.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{b.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ───────────────── SCORECARD + TESTIMONIALS — split band ───────────────── */
function Scorecard() {
  const positives = [
    "Feedback was on point: clear, actionable, and improved clarity and impact of my writing.",
    "Provided multiple iterations and thoughtful suggestions that strengthened the aims and narrative.",
    "The process not only improved my grant but taught me to be a better writer.",
    "I just heard back from my R01 — it received a fundable score!",
  ];
  const asks = [
    "Continue expanding capacity so more investigators can access support.",
    "More opportunities for subsidized grantwriting or review support.",
    "Provide rubrics or templates outlining the 'musts' and 'don'ts' of effective grants.",
    "Pair grantwriters with scientific reviewers — feedback was excellent editorially, but scientific input would strengthen the process.",
    "Help identify potential collaborators within UCSF to strengthen both the science and the applications.",
  ];

  return (
    <section className="py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14 max-w-3xl">
          <span className="text-xs uppercase tracking-[0.22em] font-medium" style={{ color: C }}>
            Scorecard · 2025
          </span>
          <h2 className="mt-4 font-display text-5xl text-ink leading-[0.98]">
            In the words of the<br />investigators we work with.
          </h2>
        </div>

        {/* Score bars */}
        <div className="grid md:grid-cols-2 gap-5 mb-10">
          {[
            { label: "Quality of grantwriting assistance", v: 9.33, c: "var(--coral)" },
            { label: "Satisfaction with the service", v: 9.33, c: "var(--magenta)" },
          ].map((m) => (
            <div key={m.label} className="rounded-3xl border border-border bg-card p-7">
              <div className="flex items-baseline justify-between">
                <div className="text-sm text-muted-foreground max-w-[60%]">{m.label}</div>
                <div>
                  <span className="font-display text-5xl text-ink">{m.v}</span>
                  <span className="text-base text-muted-foreground"> / 10</span>
                </div>
              </div>
              <div className="mt-4 h-2 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${(m.v / 10) * 100}%`, background: m.c }}
                />
              </div>
              <div className="mt-2 text-[10px] uppercase tracking-widest text-muted-foreground">
                1 = low · 10 = exceptional
              </div>
            </div>
          ))}
        </div>

        {/* Two-column feedback */}
        <div className="grid lg:grid-cols-2 gap-5">
          <div className="rounded-3xl border border-border p-8 bg-card relative overflow-hidden">
            <div
              aria-hidden
              className="absolute top-0 left-0 right-0 h-1"
              style={{ background: "var(--teal)" }}
            />
            <div className="text-[11px] uppercase tracking-widest font-medium text-teal mb-5">
              What worked well
            </div>
            <ul className="space-y-4">
              {positives.map((q, i) => (
                <li key={i} className="text-ink/85 leading-relaxed font-display text-lg">
                  "{q}"
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-border p-8 bg-card relative overflow-hidden">
            <div
              aria-hidden
              className="absolute top-0 left-0 right-0 h-1"
              style={{ background: "var(--coral)" }}
            />
            <div className="text-[11px] uppercase tracking-widest font-medium text-coral mb-5">
              Where investigators want more
            </div>
            <ul className="space-y-4">
              {asks.map((q, i) => (
                <li key={i} className="text-ink/80 leading-relaxed text-base">
                  "{q}"
                </li>
              ))}
            </ul>
            <div className="mt-6 text-xs text-muted-foreground italic">
              Driving our roadmap: BOOST scientific peer review, Grantwriting
              Academy, and the Pre-Flight Grant Reviewer.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RDGPage() {
  return (
    <SiteShell>
      <Breadcrumb trail={[{ label: "Services" }, { label: "Research development & grantwriting" }]} />
      <Hero />
      <ServiceSubnav />
      <WhyExists />
      <Programs />
      <Prioritization />
      <Partners />
      <TeamTimeline />
      <Scorecard />
      <CTA
        eyebrow="Get started"
        title={
          <>
            Got a grant on the horizon?
            <br />
            <span className="text-white/70">Let's talk early.</span>
          </>
        }
        subtitle="The earlier we engage, the more value we can add. A 30-minute consult is free — and the next federal deadline is closer than you think."
        email="rdg@ocr.ucsf.edu"
      />
    </SiteShell>
  );
}
