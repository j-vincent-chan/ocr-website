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
            <div className="text-ink mt-1">2020 — 2026</div>
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
            OCR grew out of the Bakar ImmunoX Initiative as an experiment: what
            if a research office were embedded with investigators, staffed by
            PhDs, and free to build its own software? Five years and four
            partner institutes later, the experiment is the model.
          </p>
        </div>
      </div>
    </section>
  );
}

/* Magazine columns: founder narrative + pull quote */
function Founding() {
  return (
    <section className="py-28">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-3">
          <div className="sticky top-32">
            <span className="text-xs uppercase tracking-[0.22em] text-teal font-medium">
              Chapter I
            </span>
            <h2 className="mt-4 font-display text-3xl text-ink leading-tight">
              The original brief.
            </h2>
            <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-6 h-px bg-ink/40" />
              4 min read
            </div>
          </div>
        </div>

        <div className="lg:col-span-9 lg:columns-2 lg:gap-10 text-[17px] leading-[1.7] text-ink/85 [&>p]:mb-6">
          <p>
            <span className="font-display text-6xl float-left mr-3 mt-1 leading-none text-coral">
              T
            </span>
            he Bakar ImmunoX Initiative launched with a simple question: how do
            you turn a fast-moving research community into a fundable, durable,
            collaborative program? A traditional research office wasn't the
            answer. So we built something else.
          </p>
          <p>
            The first hire was a Research Development Strategist — a PhD who
            could sit next to investigators and translate science into
            competitive proposals. The second was a project manager. Then a
            CRC. Then a data lead. Each new role was added the same way: in
            response to a real bottleneck, embedded with the people doing the
            work.
          </p>
          <p>
            Today OCR runs four service arms — research development, project
            management, data, and AI — across four UCSF institutes. The
            philosophy has not changed. We measure ourselves not by tickets
            closed, but by science that moved.
          </p>
          <p>
            We publish our scorecard. We share our software. And we keep
            looking for the next bottleneck worth removing.
          </p>
        </div>
      </div>
    </section>
  );
}

/* Horizontal scrolling timeline rail */
function Timeline() {
  const beats = [
    { y: "2020", t: "Born inside ImmunoX", d: "First Research Development Strategist hired to support a fast-growing immunology initiative.", c: "var(--coral)" },
    { y: "2022", t: "First external partner", d: "UCSF Diabetes Center adopts the model. The office begins to look like an office.", c: "var(--teal)" },
    { y: "2024", t: "Signal & Prospera begin", d: "We start building the AI tools we wished existed for funding discovery and intelligence.", c: "var(--magenta)" },
    { y: "2025", t: "Four institutes, one playbook", d: "IGHS and IHA join. Project management, data, and AI become formal service arms.", c: "var(--gold)" },
    { y: "2026", t: "Open to UCSF", d: "The full menu of OCR services is available to investigators across UCSF, bandwidth permitting.", c: "var(--lime)" },
  ];
  return (
    <section className="py-28 bg-ink text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-14">
        <span className="text-xs uppercase tracking-[0.22em] text-coral font-medium">
          Chapter II — Timeline
        </span>
        <h2 className="mt-4 font-display text-5xl md:text-6xl text-white leading-[0.98] max-w-3xl">
          How an experiment<br />became <em className="not-italic text-gradient-sunburst">the model.</em>
        </h2>
      </div>
      <div className="relative">
        <div className="absolute top-[88px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <div className="overflow-x-auto pb-8">
          <ol className="flex gap-6 px-6 min-w-max">
            {beats.map((b) => (
              <li key={b.y} className="w-[280px] flex-none">
                <div className="font-display text-5xl text-white/90">{b.y}</div>
                <div
                  className="mt-6 mb-6 w-4 h-4 rounded-full ring-4 ring-ink"
                  style={{ background: b.c }}
                />
                <h3 className="text-lg text-white">{b.t}</h3>
                <p className="mt-2 text-sm text-white/60 leading-relaxed">{b.d}</p>
              </li>
            ))}
          </ol>
        </div>
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
    { n: "02", t: "Scientists serve scientists", d: "Our team holds PhDs across immunology, endocrinology, global health, and computation.", c: "var(--teal)" },
    { n: "03", t: "Build, don't buy", d: "When existing tools don't fit, we build our own — and share what we learn.", c: "var(--magenta)" },
    { n: "04", t: "Measure what matters", d: "Funded dollars, hours saved, PI satisfaction. We publish our scorecard.", c: "var(--gold)" },
  ];
  return (
    <section className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <span className="text-xs uppercase tracking-[0.22em] text-coral font-medium">
            Chapter III — Principles
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
      <Founding />
      <Timeline />
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
