import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Breadcrumb, CTA } from "@/components/site/chrome";
import { ArmEyebrow, ServiceCrossNav } from "@/components/site/service-family";

export const Route = createFileRoute("/services/ai-tools")({
  head: () => ({
    meta: [
      { title: "Research resources & AI tools — UCSF OCR" },
      {
        name: "description",
        content:
          "Signal, Prospera, and a growing suite of AI tools that move OCR from passive search to proactive matchmaking for UCSF researchers.",
      },
      { property: "og:title", content: "Research resources & AI tools — UCSF OCR" },
      { property: "og:description", content: "Software OCR is building so researchers and staff can spend more time on science." },
    ],
  }),
  component: AIPage,
});

const G = "var(--gold)";
const ARM = "04";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream border-b border-border">
      <div
        aria-hidden
        className="absolute top-1/2 -right-40 -translate-y-1/2 w-[680px] h-[680px] rounded-full opacity-25 blur-3xl"
        style={{ background: "var(--gradient-sunburst)" }}
      />
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-24 relative">
        <ArmEyebrow arm={ARM} label="Research resources & AI tools" accent={G} />
        <h1 className="mt-8 font-display text-[clamp(2.8rem,7.5vw,7rem)] leading-[0.92] tracking-tight text-ink max-w-5xl">
          The software we
          <br />
          <em className="not-italic" style={{ color: G }}>wish existed.</em>
        </h1>
        <div className="mt-12 grid lg:grid-cols-12 gap-10 items-end">
          <p className="lg:col-span-6 text-xl text-muted-foreground leading-relaxed">
            OCR builds the AI tools we needed for our own work — so
            investigators and staff spend less time on search, summarization,
            and paperwork, and more time on science.
          </p>
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground font-mono">
              <span className="px-2.5 py-1 rounded-md bg-card border border-border">Signal v0.4</span>
              <span className="px-2.5 py-1 rounded-md bg-card border border-border">Prospera v0.2</span>
              <span className="px-2.5 py-1 rounded-md bg-card border border-border">+ 6 internal tools</span>
              <span className="flex items-center gap-2 ml-1">
                <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
                <span>in active pilot</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


/* Two flagship product split panels */
function Products() {
  return (
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        {/* SIGNAL */}
        <article className="rounded-[2rem] overflow-hidden border border-border bg-card grid lg:grid-cols-12">
          <div className="lg:col-span-5 p-10 md:p-12 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-display" style={{ background: "var(--teal)" }}>
                  S
                </div>
                <div>
                  <div className="font-display text-3xl text-ink">Signal</div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    Research intelligence
                  </div>
                </div>
              </div>
              <p className="mt-8 text-lg text-ink/85 leading-relaxed">
                A research-intelligence platform that watches the literature,
                grants, and news — then curates the signals that actually
                matter for our investigators.
              </p>
              <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
                {[
                  "Monitors publications, grants, awards & news",
                  "Author-level deduplication across preprints & journals",
                  "Editorial summaries staged for human review",
                ].map((p) => (
                  <li key={p} className="flex gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-none" style={{ background: "var(--teal)" }} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10 flex items-center gap-3">
              <span className="text-[11px] uppercase tracking-widest text-muted-foreground border border-border rounded-full px-2.5 py-1">
                Internal pilot
              </span>
              <span className="text-[11px] uppercase tracking-widest text-muted-foreground font-mono">
                v0.4 · 4 institutes
              </span>
            </div>
          </div>
          {/* live feed mock */}
          <div className="lg:col-span-7 bg-ink text-white p-6 md:p-10 relative">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-40" style={{ background: "var(--teal)" }} />
            <div className="relative">
              <div className="flex items-center justify-between mb-5 text-xs text-white/60 font-mono">
                <span>signal · live feed</span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
                  streaming
                </span>
              </div>
              <div className="space-y-2.5">
                {[
                  { t: "NEW NOFO", d: "NIDDK · K23 Mentored Patient-Oriented Research", c: "var(--magenta)", time: "2m" },
                  { t: "AWARD", d: "Bakar ImmunoX faculty · R01 awarded", c: "var(--coral)", time: "11m" },
                  { t: "PUBLICATION", d: "Cell · Single-cell atlas, IGHS collab", c: "var(--teal)", time: "1h" },
                  { t: "FOUNDATION", d: "Helmsley · T1D moonshot RFP open", c: "var(--gold)", time: "3h" },
                  { t: "PREPRINT", d: "bioRxiv · merged 2 duplicates for J. Lee", c: "var(--lime)", time: "5h" },
                ].map((r) => (
                  <div key={r.d} className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 rounded-full flex-none" style={{ background: r.c }} />
                    <div className="flex-1">
                      <div className="text-[10px] uppercase tracking-widest text-white/50">{r.t}</div>
                      <div className="text-sm text-white mt-0.5">{r.d}</div>
                    </div>
                    <div className="text-[10px] text-white/40 font-mono">{r.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* PROSPERA */}
        <article className="rounded-[2rem] overflow-hidden border border-border bg-card grid lg:grid-cols-12">
          {/* pipeline mock — on left for variation */}
          <div className="lg:col-span-7 lg:order-1 order-2 bg-ink text-white p-6 md:p-10 relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full blur-3xl opacity-40" style={{ background: "var(--magenta)" }} />
            <div className="relative">
              <div className="flex items-center justify-between mb-5 text-xs text-white/60 font-mono">
                <span>prospera · opportunity pipeline</span>
                <span>14 active matches</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { col: "Discovered", n: 6, c: "var(--gold)" },
                  { col: "Matched", n: 5, c: "var(--magenta)" },
                  { col: "In dev", n: 3, c: "var(--coral)" },
                ].map((c) => (
                  <div key={c.col} className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-white/60 mb-3">
                      <span>{c.col}</span>
                      <span>{c.n}</span>
                    </div>
                    <div className="space-y-2">
                      {Array.from({ length: c.n }).map((_, i) => (
                        <div key={i} className="rounded-lg bg-white/5 p-2.5">
                          <div className="w-3/4 h-1.5 rounded-full mb-1.5" style={{ background: c.c, opacity: 0.6 }} />
                          <div className="w-1/2 h-1 rounded-full bg-white/20" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 text-[11px] text-white/40">
                Illustrative preview · not live data
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 lg:order-2 order-1 p-10 md:p-12 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-display" style={{ background: "var(--magenta)" }}>
                  P
                </div>
                <div>
                  <div className="font-display text-3xl text-ink">Prospera</div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    Funding matchmaking
                  </div>
                </div>
              </div>
              <p className="mt-8 text-lg text-ink/85 leading-relaxed">
                AI-assisted funding discovery and matchmaking. Aggregates
                federal, foundation, and internal opportunities — then matches
                them to investigator profiles with a structured pipeline.
              </p>
              <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
                {[
                  "Aggregates federal, foundation & internal opportunities",
                  "Matches NOFOs to PI profile, methods, and prior work",
                  "Tracks outreach through a structured pipeline",
                ].map((p) => (
                  <li key={p} className="flex gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-none" style={{ background: "var(--magenta)" }} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10 flex items-center gap-3">
              <span className="text-[11px] uppercase tracking-widest text-muted-foreground border border-border rounded-full px-2.5 py-1">
                Beta · partner institutes
              </span>
              <span className="text-[11px] uppercase tracking-widest text-muted-foreground font-mono">
                v0.2
              </span>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

/* Small automations — as a "what's shipped" log */
function Automations() {
  const items = [
    { t: "Aims-to-LOI drafter", d: "Turns approved Specific Aims into a tailored Letter of Intent in minutes.", c: "var(--coral)", ship: "Shipped · Q1 26" },
    { t: "Biosketch refresh", d: "Pulls recent publications and rebuilds NIH biosketches at the click of a button.", c: "var(--teal)", ship: "Shipped · Q4 25" },
    { t: "NOFO summarizer", d: "Reads a full FOA and returns review criteria, scored fit, and key dates.", c: "var(--magenta)", ship: "Shipped · Q4 25" },
    { t: "Collaborator finder", d: "Suggests UCSF collaborators by topic, complementary methods, and prior co-authorship.", c: "var(--gold)", ship: "In dev · Q2 26" },
    { t: "Submission checklist bot", d: "Tracks every artifact required for a submission, by sponsor and mechanism.", c: "var(--lime)", ship: "In dev · Q2 26" },
    { t: "Meeting recap drafter", d: "Generates structured notes and action items from PI consults.", c: "#8b5cf6", ship: "Beta" },
  ];
  return (
    <section className="py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-12">
          <div className="lg:col-span-6">
            <span className="text-xs uppercase tracking-[0.22em] font-medium" style={{ color: "var(--coral)" }}>
              Workflow innovation
            </span>
            <h2 className="mt-4 font-display text-5xl text-ink leading-[0.98]">
              Small automations.<br />Compounding hours back.
            </h2>
          </div>
          <p className="lg:col-span-5 lg:col-start-8 text-muted-foreground leading-relaxed">
            Beyond Signal and Prospera, we ship internal tools that automate
            the high-frequency, low-judgement work — and free our team to do
            the work only humans can.
          </p>
        </div>
        <ul className="divide-y divide-border border-y border-border">
          {items.map((i) => (
            <li
              key={i.t}
              className="grid grid-cols-12 gap-6 py-6 items-center group hover:bg-cream/60 px-3 -mx-3 rounded-xl transition"
            >
              <div className="col-span-12 md:col-span-1">
                <span className="w-3 h-3 rounded-full inline-block" style={{ background: i.c }} />
              </div>
              <div className="col-span-12 md:col-span-4">
                <h3 className="font-display text-xl text-ink">{i.t}</h3>
              </div>
              <div className="col-span-12 md:col-span-5 text-sm text-muted-foreground leading-relaxed">
                {i.d}
              </div>
              <div className="col-span-12 md:col-span-2 text-[11px] uppercase tracking-widest text-muted-foreground font-mono md:text-right">
                {i.ship}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* Principles */
function Principles() {
  const ps = [
    { n: "01", t: "Humans in the loop", d: "Every output is staged for review. We never auto-send to PIs or sponsors." },
    { n: "02", t: "Private by default", d: "Models run against UCSF data inside approved environments. No prompts leak." },
    { n: "03", t: "Open about limits", d: "We log accuracy, surface uncertainty, and retire tools that don't earn their keep." },
    { n: "04", t: "Built with users", d: "Every tool starts with a PI or staff complaint. We ship, measure, iterate, repeat." },
  ];
  return (
    <section className="py-24 bg-ink text-white relative overflow-hidden">
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-sunburst opacity-15 blur-3xl" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-[0.22em] font-medium" style={{ color: G }}>
            Principles
          </span>
          <h2 className="mt-4 font-display text-5xl text-white leading-[0.98]">
            How we build with AI.
          </h2>
        </div>
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {ps.map((p) => (
            <div key={p.n} className="rounded-3xl border border-white/10 bg-white/5 p-7">
              <div className="font-display text-xl" style={{ color: G }}>
                {p.n}
              </div>
              <h3 className="mt-4 text-xl text-white">{p.t}</h3>
              <p className="mt-3 text-sm text-white/70 leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AIPage() {
  return (
    <SiteShell>
      <Breadcrumb trail={[{ label: "Services" }, { label: "Research resources & AI tools" }]} />
      <Hero />
      <Products />
      <Automations />
      <Principles />
      <ServiceCrossNav currentPath="/services/ai-tools" />
      <CTA
        eyebrow="Get early access"
        title={<>Want Signal or Prospera<br /><span className="text-white/70">in your lab?</span></>}
        subtitle="We're onboarding new partner institutes through 2026. Tell us what you'd want it to do, and we'll find a pilot that fits."
        email="ai@ocr.ucsf.edu"
        primaryLabel="Request a pilot →"
      />
    </SiteShell>
  );
}
