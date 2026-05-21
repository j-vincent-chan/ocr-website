import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-collab.jpg";
import ribbonImg from "@/assets/ribbon.png";
import { SiteShell, SERVICES, CTA, SunburstLogo } from "@/components/site/chrome";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Office of Collaborative Research — UCSF" },
      {
        name: "description",
        content:
          "The strategic hub of ImmunoX and the Parnassus Institutes at UCSF — research development, project management, data sharing, and AI workflow innovation.",
      },
      { property: "og:title", content: "Office of Collaborative Research — UCSF" },
      {
        property: "og:description",
        content:
          "Advancing research and fostering meaningful collaborations across UCSF.",
      },
    ],
  }),
  component: HomePage,
});

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <img
        src={ribbonImg}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-48 w-[780px] opacity-90 select-none"
      />
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-24 grid lg:grid-cols-12 gap-12 items-center relative">
        <div className="lg:col-span-7">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-ink">
            <span className="w-1.5 h-1.5 rounded-full bg-coral" />
            UCSF · Office of Collaborative Research
          </span>
          <h1 className="mt-6 text-5xl md:text-6xl lg:text-[5.2rem] font-medium tracking-tight leading-[1.02] text-ink">
            Where great science<br />
            <span className="text-gradient-sunburst">finds great partners.</span>
          </h1>
          <p className="mt-7 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            OCR is the strategic hub of ImmunoX and the Parnassus Institutes —
            connecting investigators, accelerating grants, and turning ambitious ideas into
            funded, well-managed research programs.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/services/research-development"
              className="inline-flex items-center gap-2 rounded-full bg-ink text-white px-6 py-3.5 text-sm font-medium hover:bg-ink/90 transition shadow-soft"
            >
              Explore our services <span aria-hidden>→</span>
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-medium hover:bg-secondary transition"
            >
              About OCR
            </Link>
          </div>

          <dl className="mt-14 grid grid-cols-3 gap-6 max-w-xl">
            {[
              ["120+", "Investigators served"],
              ["$48M", "In awards supported"],
              ["4", "Partner institutes"],
            ].map(([n, l]) => (
              <div key={l} className="border-l-2 border-coral pl-4">
                <dt className="font-display text-4xl text-ink">{n}</dt>
                <dd className="text-xs text-muted-foreground mt-1 leading-snug">{l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="relative rounded-3xl overflow-hidden shadow-lift">
            <img
              src={heroImg}
              alt="Researchers collaborating at UCSF"
              className="w-full h-[560px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-ink/30 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur rounded-2xl p-4">
              <div className="text-xs text-muted-foreground uppercase tracking-widest">Founding partner</div>
              <div className="font-display text-lg text-ink mt-1">Bakar ImmunoX Initiative</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesGrid() {
  const blurbs: Record<string, string> = {
    "/services/research-development":
      "PhD strategists and grantwriters who sharpen your narrative and help you win competitive federal and foundation funding.",
    "/services/project-management":
      "Operational backbone for complex programs — study startup, clinical coordination, biospecimen pipelines, and the CRC bench.",
    "/services/data-management":
      "Databases, metadata standards, and NIH-compliant Data Management & Sharing plans, built with you from day one.",
    "/services/ai-tools":
      "Signal, Prospera, and a growing set of AI tools moving the office from passive search to proactive matchmaking.",
  };
  return (
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-5">
            <span className="text-xs uppercase tracking-[0.2em] text-coral font-medium">Services</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-medium text-ink leading-[1.05]">
              Four service arms.<br />One coordinated office.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 self-end">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Each arm operates with its own deep expertise — but the strength of OCR is how
              they work together to support a single investigator, lab, or institute.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {SERVICES.map((s, i) => (
            <Link
              key={s.to}
              to={s.to}
              className="group relative bg-card rounded-3xl p-8 border border-border hover:shadow-lift hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-6">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center font-display text-lg text-white"
                  style={{ background: s.accent }}
                >
                  0{i + 1}
                </div>
                <span className="text-muted-foreground group-hover:text-ink transition" aria-hidden>→</span>
              </div>
              <h3 className="mt-6 text-2xl text-ink leading-tight">{s.name}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {blurbs[s.to]}
              </p>
              <div
                className="mt-6 h-px"
                style={{ background: `linear-gradient(90deg, ${s.accent}, transparent)` }}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Approach() {
  const items = [
    {
      n: "01",
      t: "Embedded, not transactional",
      d: "Our teams sit alongside partner institutes — learning your science, your people, and your pipeline before we recommend a single move.",
    },
    {
      n: "02",
      t: "PhD-trained, operations-fluent",
      d: "Our strategists, project managers, and data leads are scientists first. The conversation starts at the science, not the SOP.",
    },
    {
      n: "03",
      t: "Building the tools we wish existed",
      d: "When a workflow is slow or a search is impossible, we build software — like Signal and Prospera — to fix it for everyone.",
    },
  ];
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-[0.2em] text-teal font-medium">Approach</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-medium text-ink leading-[1.05]">
            A different kind of research office.
          </h2>
        </div>
        <div className="mt-14 grid md:grid-cols-3 gap-8">
          {items.map((i) => (
            <div key={i.n} className="border-t border-ink pt-6">
              <div className="font-display text-xl text-coral">{i.n}</div>
              <h3 className="mt-4 text-xl text-ink">{i.t}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{i.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Partners() {
  const partners = [
    "Bakar ImmunoX Initiative",
    "UCSF Diabetes Center",
    "Institute for Global Health Sciences",
    "Institute for Health & Aging",
  ];
  return (
    <section className="py-20 bg-ink text-white relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-sunburst opacity-15 blur-3xl" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-10">
          <div className="lg:col-span-6">
            <span className="text-xs uppercase tracking-[0.2em] text-coral font-medium">Partner institutes</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-medium text-white leading-[1.05]">
              Four institutes.<br />One shared playbook.
            </h2>
          </div>
          <p className="lg:col-span-5 lg:col-start-8 text-white/70 leading-relaxed">
            We have dedicated capacity for our partner institutes and serve any UCSF investigator when
            bandwidth allows. We're actively open to new partnerships.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
          {partners.map((p, i) => (
            <div
              key={p}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
            >
              <div
                className="w-8 h-8 rounded-lg mb-5"
                style={{
                  background: ["var(--coral)", "var(--teal)", "var(--magenta)", "var(--gold)"][i],
                }}
              />
              <div className="text-base text-white leading-snug">{p}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsTeaser() {
  const items = [
    {
      tag: "Program",
      title: "BOOST faculty peer review opens fall cycle",
      desc: "Apply by Oct 1 for support on January R01 deadlines.",
      color: "var(--coral)",
    },
    {
      tag: "Tool",
      title: "Signal v0.4 brings author-level deduplication",
      desc: "Our research-intelligence platform now collapses preprint/journal duplicates automatically.",
      color: "var(--teal)",
    },
    {
      tag: "Hiring",
      title: "Research Development Strategist — open",
      desc: "Join a PhD-led team supporting investigators across four partner institutes.",
      color: "var(--magenta)",
    },
  ];
  return (
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between flex-wrap gap-8 mb-12">
          <h2 className="text-4xl md:text-5xl font-medium text-ink leading-[1.05] max-w-2xl">
            What's happening at OCR.
          </h2>
          <a href="#" className="text-sm font-medium text-ink inline-flex items-center gap-1.5 group">
            All updates
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
          </a>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {items.map((n) => (
            <a key={n.title} href="#" className="rounded-3xl bg-card border border-border p-7 hover:shadow-lift transition group">
              <span
                className="inline-block text-xs uppercase tracking-widest font-medium px-2.5 py-1 rounded-full"
                style={{ background: `color-mix(in oklab, ${n.color} 18%, white)`, color: "var(--ink)" }}
              >
                {n.tag}
              </span>
              <h3 className="mt-5 text-xl text-ink leading-snug group-hover:underline decoration-1 underline-offset-4">
                {n.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{n.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <SiteShell>
      <Hero />
      <ServicesGrid />
      <Approach />
      <Partners />
      <NewsTeaser />
      <CTA
        eyebrow="Work with us"
        title={<>Let's start something<br /><span className="text-white/70">worth funding.</span></>}
        subtitle="Whether you have a deadline next month or a five-year vision, the earlier we engage, the more value we can add."
        email="ocr@ucsf.edu"
      />
    </SiteShell>
  );
}

export { SunburstLogo };
