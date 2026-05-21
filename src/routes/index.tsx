import { createFileRoute, Link } from "@tanstack/react-router";
import constellationImg from "@/assets/hero-constellation.png";
import { ByTheNumbersStrip } from "@/components/site/by-the-numbers";
import {
  HeroInteractiveBackdrop,
  HeroMouseGlow,
} from "@/components/site/hero-interactive-backdrop";
import { OcrDispatch } from "@/components/site/ocr-dispatch";
import { PartnersSection } from "@/components/site/partners-section";
import { SiteShell, SERVICES, CTA, SunburstLogo, CtaRotatingPhrase, ServiceTitle } from "@/components/site/chrome";

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
    <section className="relative bg-cream">
      {/* hero panel: clip graphic here so it cannot bleed into dark band or past viewport */}
      <HeroInteractiveBackdrop>
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden
        >
          <div className="absolute top-0 right-0 bottom-0 left-[42%] md:left-[48%] animate-hero-constellation">
            <img
              src={constellationImg}
              alt=""
              className="h-full w-full object-cover object-right select-none"
            />
          </div>
        </div>
        {/* left-side readability veil */}
        <div
          aria-hidden
          className="absolute inset-0 z-[2] bg-gradient-to-r from-cream via-cream/85 to-transparent"
        />
        <div
          aria-hidden
          className="absolute inset-0 z-[2] bg-gradient-to-b from-cream/40 via-transparent to-cream/30"
        />
        <HeroMouseGlow />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
          <div className="flex items-center gap-3 text-xs font-medium text-ink/70 uppercase tracking-[0.22em]">
          <span className="w-8 h-px bg-coral" />
          UCSF - Office of Collaborative Research (OCR)
        </div>

        <h1 className="mt-10 font-display text-[clamp(3.4rem,9vw,9rem)] leading-[0.92] tracking-tight text-ink max-w-[18ch]">
          Where great <em className="not-italic">science</em>
          <br />
          <em className="not-italic text-gradient-sunburst">finds great partners</em>.
        </h1>

        <div className="mt-12 grid lg:grid-cols-12 gap-10 items-end">
          <p className="lg:col-span-5 text-lg md:text-xl text-muted-foreground leading-relaxed">
            We work in the space between inspiration and impact, helping
            researchers turn ambitious ideas into fundable, executable programs
            that carry discovery forward.
          </p>

          <div className="lg:col-span-7 lg:col-start-6 flex flex-wrap gap-3">
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
        </div>
        </div>
      </HeroInteractiveBackdrop>

      <ByTheNumbersStrip />
    </section>
  );
}

/* ─────────── FOUR ARMS: oversized editorial, not a card grid ─────────── */
function ServicesEditorial() {
  const blurbs: Record<string, string> = {
    "/services/research-development":
      "PhD-trained grantwriters who help sharpen your research narrative and position proposals for increasingly competitive funding opportunities.",
    "/services/project-management":
      "Operational backbone for complex projects and programs: study startup, regulatory compliance, clinical research coordination, and biospecimen pipelines.",
    "/services/data-management":
      "Databases, metadata standards, and NIH-compliant Data Management & Sharing plans, built with you from day one.",
    "/services/ai-tools":
      "A growing set of research resources and in-house developed AI tools for research communities.",
  };

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-20">
          <div className="lg:col-span-7">
            <span className="text-xs uppercase tracking-[0.22em] text-coral font-medium">
              Four service arms
            </span>
            <div className="mt-4 flex items-start gap-5 md:gap-7">
              <SunburstLogo className="w-14 h-14 md:w-[4.5rem] md:h-[4.5rem] shrink-0 mt-1 md:mt-2 animate-[spin_60s_linear_infinite]" />
              <h2 className="font-display text-5xl md:text-7xl leading-[0.98] text-ink">
                One coordinated<br />
                <span className="italic text-muted-foreground/60">office.</span>
              </h2>
            </div>
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
              className="group relative block border-b border-ink/15 py-10 md:py-14 pl-0 transition-all duration-500 ease-out hover:bg-cream hover:pl-4 md:hover:pl-6"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute left-0 top-0 bottom-0 w-1 origin-top scale-y-0 transition-transform duration-500 ease-out group-hover:scale-y-100"
                style={{ background: s.accent }}
              />
              <div className="relative grid lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                <div className="lg:col-span-1 font-display text-2xl text-muted-foreground/60 transition-all duration-500 group-hover:text-ink group-hover:scale-110">
                  0{i + 1}
                </div>
                <div className="lg:col-span-5 min-w-0">
                  <h3 className="font-display text-2xl md:text-4xl lg:text-5xl leading-[0.98] text-ink transition-all duration-500 ease-out group-hover:translate-x-2 md:group-hover:translate-x-3">
                    <ServiceTitle name={s.name} />
                  </h3>
                </div>
                <p className="lg:col-span-4 max-w-md text-sm lg:text-[15px] text-muted-foreground leading-relaxed transition-colors duration-500 group-hover:text-ink/75">
                  {blurbs[s.to]}
                </p>
                <div className="lg:col-span-2 flex shrink-0 justify-start lg:justify-end">
                  <span
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-45 shadow-soft"
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

function HomePage() {
  return (
    <SiteShell>
      <Hero />
      <ServicesEditorial />
      <OcrDispatch />
      <Approach />
      <PartnersSection />
      <CTA
        eyebrow="Work with us"
        title={
          <>
            Let's start something
            <br />
            <CtaRotatingPhrase />
          </>
        }
        subtitle="Whether you have a deadline next month or a five-year vision, the earlier we engage, the more value we can add."
        email="ocr@ucsf.edu"
      />
    </SiteShell>
  );
}

export { SunburstLogo };
