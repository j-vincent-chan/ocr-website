import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Breadcrumb, CTA } from "@/components/site/chrome";

export const Route = createFileRoute("/services/ai-tools")({
  head: () => ({
    meta: [
      { title: "AI Tools & Workflow Innovation — UCSF OCR" },
      {
        name: "description",
        content:
          "Signal, Prospera, and a growing suite of AI tools that move OCR from passive search to proactive matchmaking for UCSF researchers.",
      },
      { property: "og:title", content: "AI Tools & Workflow Innovation — UCSF OCR" },
      {
        property: "og:description",
        content: "Software OCR is building so researchers and staff can spend more time on science.",
      },
    ],
  }),
  component: AIPage,
});

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-40 -right-40 w-[720px] h-[720px] rounded-full blur-3xl opacity-30"
        style={{ background: "conic-gradient(from 120deg, var(--gold), var(--magenta), var(--teal), var(--gold))" }}
      />
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-24 grid lg:grid-cols-12 gap-12 items-center relative">
        <div className="lg:col-span-7">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-ink">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--gold)" }} />
            Service arm · Office of Collaborative Research
          </span>
          <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.02] text-ink">
            AI Tools &<br />
            <span className="text-gradient-sunburst">Workflow Innovation.</span>
          </h1>
          <p className="mt-7 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            We build the software OCR wishes existed — so investigators and staff spend less time on
            search, summarization, and paperwork, and more time on science.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#tools" className="inline-flex items-center gap-2 rounded-full bg-ink text-white px-6 py-3.5 text-sm font-medium hover:bg-ink/90 transition shadow-soft">
              Meet the tools <span aria-hidden>→</span>
            </a>
            <a href="#principles" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-medium hover:bg-secondary transition">
              How we build
            </a>
          </div>
          <dl className="mt-14 grid grid-cols-3 gap-6 max-w-xl">
            {[
              ["2", "Tools in pilot"],
              ["8", "Workflows automated"],
              ["~14h", "Saved per PI / month"],
            ].map(([n, l]) => (
              <div key={l} className="border-l-2 pl-4" style={{ borderColor: "var(--gold)" }}>
                <dt className="font-display text-4xl text-ink">{n}</dt>
                <dd className="text-xs text-muted-foreground mt-1 leading-snug">{l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-5">
          <div className="relative rounded-3xl border border-border bg-card p-8 shadow-soft overflow-hidden">
            <div
              className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-30"
              style={{ background: "var(--gold)" }}
            />
            <div className="relative">
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-6">
                Live Signal feed
              </div>
              <div className="space-y-3">
                {[
                  { t: "New NOFO", d: "NIDDK · K23 Mentored Patient-Oriented Research", c: "var(--magenta)" },
                  { t: "Award", d: "Bakar ImmunoX faculty · R01 awarded", c: "var(--coral)" },
                  { t: "Publication", d: "Cell · Single-cell atlas, IGHS collab", c: "var(--teal)" },
                  { t: "Foundation", d: "Helmsley · T1D moonshot RFP open", c: "var(--gold)" },
                ].map((r) => (
                  <div key={r.d} className="p-3 rounded-xl bg-secondary/60 flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 rounded-full flex-none" style={{ background: r.c }} />
                    <div>
                      <div className="text-xs uppercase tracking-widest text-muted-foreground">{r.t}</div>
                      <div className="text-sm text-ink mt-0.5">{r.d}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 text-[11px] text-muted-foreground">Illustrative preview · not live data</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Tools() {
  const tools = [
    {
      name: "Signal",
      tagline: "Research intelligence & content generation",
      points: [
        "Monitors publications, grants, awards, and news",
        "Curates relevant signals for review and approval",
        "Generates editorial summaries and watchlists",
      ],
      accent: "var(--teal)",
      status: "Internal pilot",
    },
    {
      name: "Prospera",
      tagline: "AI-assisted funding discovery & matchmaking",
      points: [
        "Aggregates federal, foundation & internal opportunities",
        "Matches NOFOs to investigators by research profile",
        "Tracks outreach through a structured pipeline",
      ],
      accent: "var(--magenta)",
      status: "Beta with partner institutes",
    },
  ];
  return (
    <section id="tools" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.2em] font-medium" style={{ color: "var(--gold)" }}>The tools</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-medium text-ink leading-[1.05]">
              From passive search to proactive matchmaking.
            </h2>
          </div>
          <span className="text-xs rounded-full bg-card border border-border px-3 py-1.5 text-muted-foreground">
            Built in-house · UCSF only
          </span>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {tools.map((t) => (
            <div key={t.name} className="relative rounded-3xl bg-card border border-border p-8 overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20 blur-2xl" style={{ background: t.accent }} />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <h3 className="text-3xl text-ink">{t.name}</h3>
                  <span className="text-[11px] uppercase tracking-widest text-muted-foreground border border-border rounded-full px-2.5 py-1">
                    {t.status}
                  </span>
                </div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mt-2">{t.tagline}</div>
                <ul className="mt-6 space-y-2.5 text-sm text-muted-foreground">
                  {t.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-none" style={{ background: t.accent }} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Workflows() {
  const items = [
    { t: "Aims-to-LOI drafter", d: "Turns approved Specific Aims into a tailored Letter of Intent in minutes.", c: "var(--coral)" },
    { t: "Biosketch refresh", d: "Pulls recent publications and rebuilds NIH biosketches at the click of a button.", c: "var(--teal)" },
    { t: "NOFO summarizer", d: "Reads a full FOA and returns review criteria, scored fit, and key dates.", c: "var(--magenta)" },
    { t: "Collaborator finder", d: "Suggests UCSF collaborators by topic, complementary methods, and prior co-authorship.", c: "var(--gold)" },
    { t: "Submission checklist bot", d: "Tracks every artifact required for a submission, by sponsor and mechanism.", c: "var(--lime)" },
    { t: "Meeting recap drafter", d: "Generates structured meeting notes and action items from PI consults.", c: "#8b5cf6" },
  ];
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-5">
            <span className="text-xs uppercase tracking-[0.2em] font-medium" style={{ color: "var(--coral)" }}>Workflow innovation</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-medium text-ink leading-[1.05]">
              Small automations.<br />Compounding hours back.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 self-end">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Beyond Signal and Prospera, we ship internal tools that automate the high-frequency,
              low-judgement work — and free our team to do the work only humans can.
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((i) => (
            <article key={i.t} className="bg-card rounded-3xl p-7 border border-border hover:shadow-lift hover:-translate-y-0.5 transition-all">
              <div className="w-3 h-3 rounded-full" style={{ background: i.c }} />
              <h3 className="mt-5 text-xl text-ink">{i.t}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{i.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Principles() {
  const ps = [
    { n: "01", t: "Humans in the loop", d: "Every output is staged for review. We never auto-send to PIs or sponsors." },
    { n: "02", t: "Private by default", d: "Models run against UCSF data inside approved environments. No prompts leak." },
    { n: "03", t: "Open about limits", d: "We log accuracy, surface uncertainty, and retire tools that don't earn their keep." },
    { n: "04", t: "Built with users", d: "Every tool starts with a PI or staff complaint. We ship, measure, iterate, repeat." },
  ];
  return (
    <section id="principles" className="py-24 bg-ink text-white relative overflow-hidden">
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-sunburst opacity-15 blur-3xl" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-[0.2em] font-medium" style={{ color: "var(--gold)" }}>Principles</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-medium text-white leading-[1.05]">How we build with AI.</h2>
        </div>
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {ps.map((p) => (
            <div key={p.n} className="rounded-3xl border border-white/10 bg-white/5 p-7">
              <div className="font-display text-xl" style={{ color: "var(--gold)" }}>{p.n}</div>
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
      <Breadcrumb trail={[{ label: "Services" }, { label: "AI Tools & Workflow Innovation" }]} />
      <Hero />
      <Tools />
      <Workflows />
      <Principles />
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
