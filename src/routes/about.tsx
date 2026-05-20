import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Breadcrumb, CTA, SERVICES } from "@/components/site/chrome";

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
      {
        property: "og:description",
        content: "How OCR works, what we believe, and who we serve.",
      },
    ],
  }),
  component: AboutPage,
});

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-40 -right-40 w-[720px] h-[720px] rounded-full blur-3xl opacity-25"
        style={{ background: "var(--gradient-sunburst)" }}
      />
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-20 grid lg:grid-cols-12 gap-12 items-end relative">
        <div className="lg:col-span-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-ink">
            <span className="w-1.5 h-1.5 rounded-full bg-coral" />
            About OCR
          </span>
          <h1 className="mt-6 text-5xl md:text-6xl lg:text-[5rem] font-medium tracking-tight leading-[1.02] text-ink">
            A research office<br />
            <span className="text-gradient-sunburst">built like a startup.</span>
          </h1>
          <p className="mt-7 text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
            OCR grew out of the Bakar ImmunoX Initiative as an experiment: what if a research office
            were embedded with investigators, staffed by PhDs, and free to build its own software?
            Five years and four partner institutes later, the experiment is the model.
          </p>
        </div>
      </div>
    </section>
  );
}

function Story() {
  const beats = [
    { y: "2020", t: "Born inside ImmunoX", d: "First Research Development Strategist hired to support a fast-growing immunology initiative." },
    { y: "2022", t: "First external partner", d: "UCSF Diabetes Center adopts the model. The office begins to look like an office." },
    { y: "2024", t: "Signal & Prospera begin", d: "We start building the AI tools we wished existed for funding discovery and intelligence." },
    { y: "2025", t: "Four institutes, one playbook", d: "IGHS and IHA join. Project management, data, and AI become formal service arms." },
    { y: "2026", t: "Open to UCSF", d: "The full menu of OCR services is available to investigators across UCSF, bandwidth permitting." },
  ];
  return (
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-5">
            <span className="text-xs uppercase tracking-[0.2em] text-teal font-medium">Story</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-medium text-ink leading-[1.05]">
              How we got here.
            </h2>
          </div>
          <p className="lg:col-span-6 lg:col-start-7 self-end text-lg text-muted-foreground leading-relaxed">
            A short timeline of how an experiment inside one initiative became a multi-institute,
            multi-service office.
          </p>
        </div>
        <ol className="grid md:grid-cols-5 gap-4">
          {beats.map((b, i) => (
            <li key={b.y} className="rounded-3xl bg-card border border-border p-6">
              <div
                className="w-2 h-8 rounded-full mb-5"
                style={{ background: ["var(--coral)", "var(--teal)", "var(--magenta)", "var(--gold)", "var(--lime)"][i] }}
              />
              <div className="font-display text-2xl text-ink">{b.y}</div>
              <h3 className="mt-2 text-base text-ink leading-snug">{b.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{b.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Beliefs() {
  const items = [
    { t: "Closer is better", d: "Embedded staff outperform shared services. We invest in proximity." },
    { t: "Scientists serve scientists", d: "Our team holds PhDs across immunology, endocrinology, global health, and computation." },
    { t: "Build, don't buy", d: "When existing tools don't fit, we build our own — and share what we learn." },
    { t: "Measure what matters", d: "Funded dollars, hours saved, PI satisfaction. We publish our scorecard." },
  ];
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-[0.2em] text-coral font-medium">What we believe</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-medium text-ink leading-[1.05]">Four ideas behind the model.</h2>
        </div>
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((i, idx) => (
            <div key={i.t} className="border-t border-ink pt-6">
              <div
                className="w-8 h-8 rounded-xl mb-5"
                style={{ background: ["var(--coral)", "var(--teal)", "var(--magenta)", "var(--gold)"][idx] }}
              />
              <h3 className="text-xl text-ink">{i.t}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{i.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceLinks() {
  return (
    <section className="py-24 bg-ink text-white relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-sunburst opacity-15 blur-3xl" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-12">
          <div className="lg:col-span-6">
            <span className="text-xs uppercase tracking-[0.2em] text-coral font-medium">Services</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-medium text-white leading-[1.05]">Explore the four arms.</h2>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
          {SERVICES.map((s) => (
            <a
              key={s.to}
              href={s.to}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
            >
              <div className="w-2.5 h-2.5 rounded-full mb-5" style={{ background: s.accent }} />
              <div className="text-base text-white leading-snug">{s.name}</div>
              <div className="text-xs text-white/60 mt-1">{s.desc}</div>
              <div className="mt-6 text-xs text-white/70 inline-flex items-center gap-1.5">
                Visit
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
              </div>
            </a>
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
      <Hero />
      <Story />
      <Beliefs />
      <ServiceLinks />
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
