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
      { property: "og:description", content: "Run your science with a team that knows how to ship it." },
    ],
  }),
  component: PMPage,
});

const T = "var(--teal)";

/* Operations console hero — full-width status board */
function Hero() {
  return (
    <section className="relative bg-ink text-white overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-sunburst opacity-20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 pt-12 pb-20">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-1.5 text-xs font-medium text-white">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: T }} />
            Service arm 02 · Operations console
          </span>
          <div className="flex items-center gap-2 text-xs text-white/60 font-mono">
            <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
            27 active programs · 11 CRCs on bench · live
          </div>
        </div>

        <h1 className="mt-10 font-display text-[clamp(3rem,8vw,7rem)] leading-[0.95] tracking-tight text-white max-w-[16ch]">
          We run your study.<br />
          <em className="not-italic" style={{ color: T }}>You run the science.</em>
        </h1>
        <p className="mt-8 max-w-2xl text-xl text-white/70 leading-relaxed">
          From IRB submission to final data lock, OCR runs the operational
          backbone of complex UCSF research programs — startup, coordination,
          biospecimens, and multi-site logistics.
        </p>

        {/* mini status board */}
        <div className="mt-14 grid md:grid-cols-4 gap-3">
          {[
            { l: "IRB submitted", v: "Mar 14", s: "Cleared", c: "var(--teal)" },
            { l: "First patient enrolled", v: "Apr 22", s: "On track", c: "var(--coral)" },
            { l: "Biospecimens", v: "412", s: "+38 this week", c: "var(--magenta)" },
            { l: "Sites activated", v: "5 / 5", s: "Complete", c: "var(--gold)" },
          ].map((r) => (
            <div key={r.l} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5">
              <div className="text-[11px] uppercase tracking-widest text-white/50">{r.l}</div>
              <div className="font-display text-3xl text-white mt-2">{r.v}</div>
              <div className="mt-3 flex items-center gap-2 text-xs text-white/70">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: r.c }} />
                {r.s}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Kanban-style swimlanes */
function Swimlanes() {
  const lanes = [
    {
      title: "Startup",
      c: "var(--teal)",
      cards: [
        { t: "Protocol v3.1", m: "Draft · IRB pre-review" },
        { t: "Ancillary cmtes", m: "CHR, COI, Biosafety" },
        { t: "Contracts", m: "Sponsor MTA in review" },
      ],
    },
    {
      title: "Activation",
      c: "var(--coral)",
      cards: [
        { t: "Site training · Mission Bay", m: "Scheduled · Apr 8" },
        { t: "REDCap build", m: "Forms 80% complete" },
        { t: "SOP set", m: "Consent, eligibility, AE" },
      ],
    },
    {
      title: "Operations",
      c: "var(--magenta)",
      cards: [
        { t: "Enrollment", m: "32 / 50 · ahead of plan" },
        { t: "Monitoring", m: "Visit 2 of 4 closed" },
        { t: "Specimen pipeline", m: "Cohort A in QC" },
      ],
    },
    {
      title: "Closeout",
      c: "var(--gold)",
      cards: [
        { t: "Data lock prep", m: "Query resolution" },
        { t: "Final report", m: "Outline circulated" },
        { t: "Regulatory archive", m: "Index drafted" },
      ],
    },
  ];
  return (
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 mb-12 items-end">
          <div className="lg:col-span-6">
            <span className="text-xs uppercase tracking-[0.22em] font-medium" style={{ color: T }}>
              How a study flows through OCR
            </span>
            <h2 className="mt-4 font-display text-5xl md:text-6xl text-ink leading-[0.98]">
              Four lanes.<br />Always moving.
            </h2>
          </div>
          <p className="lg:col-span-5 lg:col-start-8 text-muted-foreground leading-relaxed">
            Every program OCR runs sits on the same operational board.
            Visibility for the PI, accountability for the team, predictable
            cadence for the sponsor.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {lanes.map((l) => (
            <div key={l.title} className="rounded-2xl bg-card border border-border p-5">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: l.c }} />
                  <h3 className="text-sm uppercase tracking-widest text-ink font-medium">
                    {l.title}
                  </h3>
                </div>
                <span className="text-[11px] text-muted-foreground font-mono">
                  {l.cards.length}
                </span>
              </div>
              <ul className="space-y-2.5">
                {l.cards.map((c) => (
                  <li
                    key={c.t}
                    className="rounded-xl bg-secondary/60 border border-border p-3.5"
                  >
                    <div
                      className="w-6 h-0.5 mb-2 rounded-full"
                      style={{ background: l.c }}
                    />
                    <div className="text-sm text-ink leading-snug">{c.t}</div>
                    <div className="text-xs text-muted-foreground mt-1">{c.m}</div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Pipeline diagram: biospecimen lifecycle */
function Pipeline() {
  const nodes = [
    { t: "Collect", d: "Consent + SOP-driven sample collection at the site.", c: "var(--coral)" },
    { t: "Process", d: "Centrifuge, aliquot, label — chain-of-custody logged.", c: "var(--magenta)" },
    { t: "Bank", d: "Biorepository integration: barcoded, temperature-monitored.", c: "var(--teal)" },
    { t: "Ship", d: "Manifested, IATA-compliant shipping to downstream cores.", c: "var(--gold)" },
    { t: "Assay", d: "Hand-off to single-cell, proteomics, sequencing partners.", c: "var(--lime)" },
  ];
  return (
    <section className="py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-14">
          <span className="text-xs uppercase tracking-[0.22em] font-medium" style={{ color: "var(--coral)" }}>
            Biospecimen pipeline
          </span>
          <h2 className="mt-4 font-display text-5xl text-ink leading-[0.98]">
            Every sample, accounted for.
          </h2>
        </div>
        <div className="relative">
          <div className="hidden md:flex items-stretch gap-2">
            {nodes.map((n, i) => (
              <div key={n.t} className="flex-1 flex items-stretch">
                <div className="flex-1 rounded-2xl border border-border bg-card p-6 relative">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-display text-white text-sm mb-4"
                    style={{ background: n.c }}
                  >
                    0{i + 1}
                  </div>
                  <div className="font-display text-xl text-ink">{n.t}</div>
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
          {/* mobile stacked */}
          <ol className="md:hidden space-y-3">
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
        </div>
      </div>
    </section>
  );
}

/* Bench roster — staff grid like a roster board */
function Bench() {
  const rows = [
    { r: "Senior PM", n: 3, focus: "Large mechanisms · P/U/T32", c: "var(--teal)" },
    { r: "Project Manager", n: 4, focus: "Investigator-initiated studies", c: "var(--coral)" },
    { r: "Senior CRC", n: 2, focus: "Oncology · Immunology", c: "var(--magenta)" },
    { r: "Clinical Research Coordinator", n: 5, focus: "Cross-trained, multi-site", c: "var(--gold)" },
    { r: "Regulatory Specialist", n: 1, focus: "IRB & ancillary committees", c: "var(--lime)" },
  ];
  return (
    <section className="py-24 bg-ink text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-12">
          <div className="lg:col-span-6">
            <span className="text-xs uppercase tracking-[0.22em] font-medium" style={{ color: T }}>
              The bench
            </span>
            <h2 className="mt-4 font-display text-5xl text-white leading-[0.98]">
              Shared roster.<br />Steady throughput.
            </h2>
          </div>
          <p className="lg:col-span-5 lg:col-start-8 text-white/70 leading-relaxed">
            Instead of each lab hiring and losing its own coordinator, we run a
            cross-trained bench across partner institutes. Coverage doesn't
            disappear when one person leaves.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 overflow-hidden">
          <div className="grid grid-cols-12 px-6 py-4 text-[11px] uppercase tracking-widest text-white/50 bg-white/5">
            <div className="col-span-6">Role</div>
            <div className="col-span-2 text-right">On bench</div>
            <div className="col-span-4">Specialty</div>
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

function PMPage() {
  return (
    <SiteShell>
      <Breadcrumb trail={[{ label: "Services" }, { label: "Project Management & Clinical Coordination" }]} />
      <Hero />
      <Swimlanes />
      <Pipeline />
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
