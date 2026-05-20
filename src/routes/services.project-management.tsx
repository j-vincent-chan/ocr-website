import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Breadcrumb, CTA } from "@/components/site/chrome";

export const Route = createFileRoute("/services/project-management")({
  head: () => ({
    meta: [
      { title: "Project Management & Clinical Coordination — UCSF OCR" },
      {
        name: "description",
        content:
          "Operational backbone for complex research programs at UCSF — study startup, clinical research coordination, biospecimen pipelines, and multi-site logistics.",
      },
      { property: "og:title", content: "Project Management & Clinical Coordination — UCSF OCR" },
      {
        property: "og:description",
        content: "Run your science with a team that knows how to ship it.",
      },
    ],
  }),
  component: PMPage,
});

const ACCENT = "var(--teal)";

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-[640px] h-[640px] rounded-full blur-3xl opacity-25"
        style={{ background: "radial-gradient(circle, var(--teal), transparent 65%)" }}
      />
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-24 grid lg:grid-cols-12 gap-12 items-center relative">
        <div className="lg:col-span-7">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-ink">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
            Service arm · Office of Collaborative Research
          </span>
          <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.02] text-ink">
            Project Management<br />
            <span style={{ color: "var(--teal)" }}>& Clinical Coordination.</span>
          </h1>
          <p className="mt-7 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            From IRB submission to final data lock, we run the operational backbone of
            complex UCSF research programs — so your team can stay focused on the science.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-ink text-white px-6 py-3.5 text-sm font-medium hover:bg-ink/90 transition shadow-soft">
              Scope a project <span aria-hidden>→</span>
            </a>
            <a href="#capabilities" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-medium hover:bg-secondary transition">
              See capabilities
            </a>
          </div>
          <dl className="mt-14 grid grid-cols-3 gap-6 max-w-xl">
            {[
              ["27", "Active projects in 2025"],
              ["11", "CRCs & PMs on the bench"],
              ["6", "Avg. weeks to study startup"],
            ].map(([n, l]) => (
              <div key={l} className="border-l-2 pl-4" style={{ borderColor: "var(--teal)" }}>
                <dt className="font-display text-4xl text-ink">{n}</dt>
                <dd className="text-xs text-muted-foreground mt-1 leading-snug">{l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-6">
              An active program at a glance
            </div>
            <div className="space-y-3">
              {[
                { l: "IRB submitted", v: "Mar 14", c: "var(--teal)" },
                { l: "First patient enrolled", v: "Apr 22", c: "var(--coral)" },
                { l: "Biospecimens collected", v: "412", c: "var(--magenta)" },
                { l: "Sites activated", v: "5 / 5", c: "var(--gold)" },
                { l: "Data lock", v: "Q3 2026", c: "var(--lime)" },
              ].map((r) => (
                <div key={r.l} className="flex items-center justify-between p-4 rounded-xl bg-secondary/60">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full" style={{ background: r.c }} />
                    <span className="text-sm text-ink">{r.l}</span>
                  </div>
                  <span className="font-display text-lg text-ink">{r.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Capabilities() {
  const items = [
    { tag: "01", title: "Study Startup", body: "Protocol authoring support, IRB & ancillary committee submissions, contracts, and budget builds — coordinated end to end.", color: "var(--teal)" },
    { tag: "02", title: "Clinical Research Coordination", body: "Our CRC bench covers enrollment, consent, visit scheduling, source documentation, and regulatory upkeep across single- and multi-site studies.", color: "var(--coral)" },
    { tag: "03", title: "Biospecimen Pipelines", body: "End-to-end specimen handling — collection SOPs, chain of custody, biobanking integration, and downstream assay logistics.", color: "var(--magenta)" },
    { tag: "04", title: "Multi-Site Coordination", body: "Site activation, central monitoring, query management, and the unglamorous spreadsheet work that keeps networks running.", color: "var(--gold)" },
    { tag: "05", title: "Sponsor & Industry Liaison", body: "We sit between investigators and sponsors so timelines, deliverables, and invoices don't slip through the cracks.", color: "var(--lime)" },
    { tag: "06", title: "Program Management", body: "For large mechanisms (P-, U-, T32, training grants), we run cores, all-hands cadences, and progress reporting.", color: "#8b5cf6" },
  ];
  return (
    <section id="capabilities" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-5">
            <span className="text-xs uppercase tracking-[0.2em] font-medium" style={{ color: "var(--teal)" }}>Capabilities</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-medium text-ink leading-[1.05]">
              Six capabilities. One operational team.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 self-end">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Plug us in where you need the most lift — startup, coordination, or full-program
              management — and we'll scale up or down with your study.
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((i) => (
            <article key={i.title} className="bg-card rounded-3xl p-7 border border-border hover:shadow-lift hover:-translate-y-0.5 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-display text-lg text-white" style={{ background: i.color }}>{i.tag}</div>
              <h3 className="mt-6 text-xl text-ink">{i.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{i.body}</p>
              <div className="mt-6 h-px" style={{ background: `linear-gradient(90deg, ${i.color}, transparent)` }} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Lifecycle() {
  const steps = [
    { n: "01", t: "Scoping", d: "We sit down with the PI to map deliverables, sites, budget, and risk." },
    { n: "02", t: "Startup", d: "Protocol, IRB, contracts, training, and SOPs — in parallel, not in series." },
    { n: "03", t: "Activation", d: "Sites onboarded, CRCs trained, systems live. First patient is real, not a milestone slide." },
    { n: "04", t: "Operations", d: "Enrollment, monitoring, biospecimens, and weekly cadences that don't fall behind." },
    { n: "05", t: "Closeout", d: "Data lock, final report, regulatory archive, and an honest postmortem." },
  ];
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-[0.2em] font-medium" style={{ color: "var(--coral)" }}>Study lifecycle</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-medium text-ink leading-[1.05]">From IRB to data lock — without the dropouts.</h2>
        </div>
        <div className="mt-14 relative">
          <div className="hidden md:block absolute top-7 left-0 right-0 h-px bg-gradient-to-r from-teal via-coral to-magenta opacity-30" />
          <ol className="grid md:grid-cols-5 gap-6">
            {steps.map((s) => (
              <li key={s.n}>
                <div className="w-14 h-14 rounded-full bg-card border border-border flex items-center justify-center font-display text-lg text-ink shadow-soft">{s.n}</div>
                <h3 className="mt-5 text-lg text-ink">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Bench() {
  return (
    <section className="py-24 bg-ink text-white relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-sunburst opacity-15 blur-3xl" />
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 relative">
        <div className="lg:col-span-5">
          <span className="text-xs uppercase tracking-[0.2em] font-medium" style={{ color: "var(--teal)" }}>The bench model</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-medium text-white leading-[1.05]">Shared CRCs. Steady throughput. No solo seats.</h2>
          <p className="mt-6 text-white/70 leading-relaxed text-lg">
            Instead of each lab hiring and losing its own coordinator, we run a shared bench of
            trained CRCs and project managers across our partner institutes. Coverage doesn't
            disappear when one person leaves — and expertise compounds across studies.
          </p>
        </div>
        <div className="lg:col-span-7 lg:pl-8">
          <div className="grid grid-cols-2 gap-4">
            {[
              ["Continuity", "Cross-trained staff cover for each other. Your study doesn't pause when someone PTOs."],
              ["Specialization", "CRCs choose tracks — oncology, immunology, global health — and go deep."],
              ["Mentorship", "Junior CRCs pair with senior PMs. Career ladders, not churn."],
              ["Accountability", "One PM owns your study end-to-end. You always know who to call."],
            ].map(([h, b]) => (
              <div key={h} className="rounded-2xl bg-white/5 border border-white/10 p-6">
                <div className="text-base text-white">{h}</div>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PMPage() {
  return (
    <SiteShell>
      <Breadcrumb trail={[{ label: "Services" }, { label: "Project Management & Clinical Coordination" }]} />
      <Hero />
      <Capabilities />
      <Lifecycle />
      <Bench />
      <CTA
        eyebrow="Run with us"
        title={<>Have a study that needs<br /><span className="text-white/70">a steady hand?</span></>}
        subtitle="Tell us where you are — pre-award, in startup, or mid-flight — and we'll show you exactly where our team can plug in."
        email="pm@ocr.ucsf.edu"
        primaryLabel="Scope a project →"
      />
    </SiteShell>
  );
}
