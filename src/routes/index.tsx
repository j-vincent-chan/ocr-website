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

/* ─────────── HERO: cinematic, layered, editorial ─────────── */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      {/* animated ribbon — flowing across the hero */}
      <img
        src={ribbonImg}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -top-20 -right-40 w-[1600px] max-w-none opacity-80 select-none animate-[float_22s_ease-in-out_infinite]"
      />
      {/* gradient blob */}
      <div
        aria-hidden
        className="absolute -bottom-40 -left-40 w-[680px] h-[680px] rounded-full blur-3xl opacity-30"
        style={{ background: "var(--gradient-sunburst)" }}
      />
      {/* faint grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--ink) 1px, transparent 1px), linear-gradient(to bottom, var(--ink) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="flex items-center gap-3 text-xs font-medium text-ink/70 uppercase tracking-[0.22em]">
          <span className="w-8 h-px bg-coral" />
          UCSF · Office of Collaborative Research
        </div>

        <h1 className="mt-10 font-display text-[clamp(3.4rem,9vw,9rem)] leading-[0.92] tracking-tight text-ink max-w-[18ch]">
          Where great <em className="not-italic text-gradient-sunburst">science</em>
          <br />
          finds great <em className="not-italic">partners</em>.
        </h1>

        <div className="mt-12 grid lg:grid-cols-12 gap-10 items-end">
          <p className="lg:col-span-5 text-lg md:text-xl text-muted-foreground leading-relaxed">
            OCR is the strategic hub at UCSF for connecting investigators,
            accelerating grants, and turning ambitious ideas into funded,
            well-managed research programs.
          </p>

          <div className="lg:col-span-4 lg:col-start-7 flex flex-wrap gap-3">
            <Link
              to="/services/research-development"
              className="inline-flex items-center gap-2 rounded-full bg-ink text-white px-6 py-3.5 text-sm font-medium hover:bg-ink/90 transition shadow-lift"
            >
              Explore our services <span aria-hidden>→</span>
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-card px-6 py-3.5 text-sm font-medium hover:bg-secondary transition"
            >
              About OCR
            </Link>
          </div>

          <div className="lg:col-span-3 lg:col-start-11 flex justify-end">
            <SunburstLogo className="w-20 h-20 animate-[spin_60s_linear_infinite]" />
          </div>
        </div>
      </div>

      {/* marquee strip */}
      <div className="relative border-y border-ink/10 bg-ink text-white overflow-hidden">
        <div className="flex gap-12 py-5 whitespace-nowrap animate-[marquee_45s_linear_infinite]">
          {Array.from({ length: 2 }).flatMap((_, k) =>
            [
              "Bakar ImmunoX Initiative",
              "UCSF Diabetes Center",
              "Institute for Global Health Sciences",
              "Institute for Health & Aging",
              "120+ investigators served",
              "$48M in awards supported",
              "43 grants in 2025",
              "9.3/10 PI satisfaction",
            ].map((t, i) => (
              <span
                key={`${k}-${i}`}
                className="text-sm font-display text-white/80 flex items-center gap-12"
              >
                {t}
                <span className="w-1.5 h-1.5 rounded-full bg-coral" />
              </span>
            )),
          )}
        </div>
      </div>
    </section>
  );
}

/* ─────────── FOUR ARMS: oversized editorial, not a card grid ─────────── */
function ServicesEditorial() {
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
    <section className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-20">
          <div className="lg:col-span-7">
            <span className="text-xs uppercase tracking-[0.22em] text-coral font-medium">
              Four service arms
            </span>
            <h2 className="mt-4 font-display text-5xl md:text-7xl leading-[0.98] text-ink">
              One coordinated<br />
              <span className="italic text-muted-foreground/60">office.</span>
            </h2>
          </div>
          <p className="lg:col-span-4 lg:col-start-9 text-lg text-muted-foreground leading-relaxed">
            Each arm operates with its own deep expertise — and the strength of
            OCR is how they work together for a single investigator, lab, or
            institute.
          </p>
        </div>

        <div className="border-t border-ink/15">
          {SERVICES.map((s, i) => (
            <Link
              key={s.to}
              to={s.to}
              className="group block border-b border-ink/15 py-10 md:py-14 transition-colors hover:bg-cream/60"
            >
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-1 font-display text-2xl text-muted-foreground/60">
                  0{i + 1}
                </div>
                <div className="lg:col-span-6">
                  <h3
                    className="font-display text-3xl md:text-5xl lg:text-6xl leading-[0.98] text-ink group-hover:translate-x-2 transition-transform"
                  >
                    {s.name}
                  </h3>
                </div>
                <p className="lg:col-span-4 text-base text-muted-foreground leading-relaxed">
                  {blurbs[s.to]}
                </p>
                <div className="lg:col-span-1 flex justify-end">
                  <span
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg transition-transform group-hover:rotate-45"
                    style={{ background: s.accent }}
                    aria-hidden
                  >
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── STATS: oversized, layered ─────────── */
function StatsBand() {
  const stats = [
    { n: "120+", l: "Investigators served", c: "var(--coral)" },
    { n: "$48M", l: "In awards supported", c: "var(--magenta)" },
    { n: "43", l: "Grants supported in 2025", c: "var(--teal)" },
    { n: "9.3", l: "Avg. PI satisfaction / 10", c: "var(--gold)" },
  ];
  return (
    <section className="relative py-28 bg-ink text-white overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-25"
        style={{ background: "var(--gradient-sunburst)" }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at top left, transparent, var(--ink) 60%)",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between gap-8 flex-wrap mb-14">
          <h2 className="font-display text-5xl md:text-7xl text-white leading-[0.98] max-w-2xl">
            By the<br />numbers.
          </h2>
          <p className="max-w-md text-white/70 leading-relaxed">
            We publish our scorecard. Funded dollars, hours saved, and PI
            satisfaction — measured every quarter and shared openly.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-3xl overflow-hidden">
          {stats.map((s) => (
            <div key={s.l} className="bg-ink p-8 md:p-10 relative group">
              <div
                className="w-10 h-1 rounded-full mb-6"
                style={{ background: s.c }}
              />
              <div className="font-display text-6xl md:text-7xl text-white leading-none">
                {s.n}
              </div>
              <div className="mt-5 text-xs text-white/60 uppercase tracking-widest">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── APPROACH: pull quote + columns ─────────── */
function Approach() {
  return (
    <section className="py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-5xl">
          <span className="text-xs uppercase tracking-[0.22em] text-teal font-medium">
            Our approach
          </span>
          <blockquote className="mt-8 font-display text-4xl md:text-6xl leading-[1.05] text-ink">
            "We don't run a help desk. We <em className="not-italic text-gradient-sunburst">embed</em> with
            investigators — learning the science, the people, and the pipeline
            before we recommend a single move."
          </blockquote>
          <div className="mt-8 text-sm text-muted-foreground">
            — The OCR operating principle
          </div>
        </div>

        <div className="mt-24 grid md:grid-cols-3 gap-10 lg:gap-16">
          {[
            {
              n: "01",
              t: "Embedded, not transactional",
              d: "Our teams sit alongside partner institutes — and they're around long after the grant ships.",
              c: "var(--coral)",
            },
            {
              n: "02",
              t: "PhD-trained, operations-fluent",
              d: "Our strategists, PMs, and data leads are scientists first. The conversation starts at the science.",
              c: "var(--magenta)",
            },
            {
              n: "03",
              t: "Building the tools we wish existed",
              d: "When a workflow is slow, we build software — like Signal and Prospera — to fix it for everyone.",
              c: "var(--teal)",
            },
          ].map((i) => (
            <div key={i.n}>
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center font-display text-white text-lg"
                style={{ background: i.c }}
              >
                {i.n}
              </div>
              <h3 className="mt-6 font-display text-2xl text-ink">{i.t}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{i.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── PARTNERS as horizontal feature ─────────── */
function Partners() {
  const partners = [
    { n: "Bakar ImmunoX Initiative", c: "var(--coral)" },
    { n: "UCSF Diabetes Center", c: "var(--teal)" },
    { n: "Institute for Global Health Sciences", c: "var(--magenta)" },
    { n: "Institute for Health & Aging", c: "var(--gold)" },
  ];
  return (
    <section className="relative py-28 overflow-hidden">
      <img
        src={heroImg}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-12">
          <div className="lg:col-span-6">
            <span className="text-xs uppercase tracking-[0.22em] text-magenta font-medium">
              Partner institutes
            </span>
            <h2 className="mt-4 font-display text-5xl md:text-6xl text-ink leading-[0.98]">
              Four institutes.<br />One shared playbook.
            </h2>
          </div>
          <p className="lg:col-span-5 lg:col-start-8 text-muted-foreground leading-relaxed">
            We have dedicated capacity for our partner institutes and serve any
            UCSF investigator when bandwidth allows. We're actively open to new
            partnerships.
          </p>
        </div>
        <ul className="divide-y divide-ink/15 border-y border-ink/15">
          {partners.map((p, i) => (
            <li
              key={p.n}
              className="flex items-center justify-between py-6 group hover:pl-3 transition-all"
            >
              <div className="flex items-center gap-6">
                <span className="font-display text-sm text-muted-foreground/60 w-8">
                  0{i + 1}
                </span>
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ background: p.c }}
                />
                <span className="font-display text-2xl md:text-3xl text-ink">
                  {p.n}
                </span>
              </div>
              <span className="text-xs text-muted-foreground uppercase tracking-widest">
                Partner since {2020 + i * 1}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <SiteShell>
      <Hero />
      <ServicesEditorial />
      <StatsBand />
      <Approach />
      <Partners />
      <CTA
        eyebrow="Work with us"
        title={
          <>
            Let's start something
            <br />
            <span className="text-white/70">worth funding.</span>
          </>
        }
        subtitle="Whether you have a deadline next month or a five-year vision, the earlier we engage, the more value we can add."
        email="ocr@ucsf.edu"
      />
    </SiteShell>
  );
}

export { SunburstLogo };
