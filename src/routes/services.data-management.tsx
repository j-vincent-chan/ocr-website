import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Breadcrumb, CTA } from "@/components/site/chrome";
import { ServiceHero, ServiceHeroHighlight } from "@/components/site/service-hero";

export const Route = createFileRoute("/services/data-management")({
  head: () => ({
    meta: [
      { title: "Data management & sharing — UCSF OCR" },
      {
        name: "description",
        content:
          "REDCap and custom databases, metadata standards, and NIH-compliant Data Management & Sharing plans for UCSF research programs.",
      },
      { property: "og:title", content: "Data management & sharing — UCSF OCR" },
      { property: "og:description", content: "Make your data findable, accessible, interoperable, and reusable — from day one." },
    ],
  }),
  component: DMSPage,
});

const M = "var(--magenta)";

function Hero() {
  return (
    <ServiceHero
      arm="03"
      armLabel="Data infrastructure"
      accent={M}
      title={
        <>
          Structured by
          <br />
          <ServiceHeroHighlight accent={M}>design.</ServiceHeroHighlight>
        </>
      }
      description="Databases, metadata standards, and NIH-compliant Data Management & Sharing plans — built with your team from study design, not retrofit at the end."
      aside={<LifecycleRing />}
      below={
        <div className="grid grid-cols-3 gap-6 max-w-md">
          {[["62", "DMS plans authored"], ["100%", "NIH 2023 compliant"], ["FAIR", "By default"]].map(([n, l]) => (
            <div key={l} className="border-l-2 pl-4" style={{ borderColor: M }}>
              <div className="font-display text-3xl text-ink">{n}</div>
              <div className="text-[11px] text-muted-foreground uppercase tracking-widest mt-1">{l}</div>
            </div>
          ))}
        </div>
      }
    />
  );
}

function LifecycleRing() {
  const stages = [
    { t: "Plan", c: "var(--coral)" },
    { t: "Capture", c: "var(--magenta)" },
    { t: "Curate", c: "var(--teal)" },
    { t: "Share", c: "var(--gold)" },
    { t: "Reuse", c: "var(--lime)" },
  ];
  const R = 170;
  return (
    <div className="relative w-[420px] h-[420px] max-w-full">
      <svg viewBox="-220 -220 440 440" className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="oklch(0.7 0.2 30)" />
            <stop offset="0.5" stopColor="oklch(0.62 0.24 340)" />
            <stop offset="1" stopColor="oklch(0.7 0.13 195)" />
          </linearGradient>
        </defs>
        <circle r={R} cx="0" cy="0" fill="none" stroke="url(#ring)" strokeWidth="1.5" opacity="0.5" strokeDasharray="3 5" />
        <circle r={R - 35} cx="0" cy="0" fill="none" stroke="var(--ink)" strokeOpacity="0.08" strokeWidth="1" />
        <text x="0" y="-8" textAnchor="middle" className="font-display" fontSize="22" fill="var(--ink)">Data</text>
        <text x="0" y="18" textAnchor="middle" className="font-display" fontSize="22" fill="var(--ink)">lifecycle</text>
      </svg>
      {stages.map((s, i) => {
        const angle = (i / stages.length) * 2 * Math.PI - Math.PI / 2;
        const x = Math.cos(angle) * R;
        const y = Math.sin(angle) * R;
        return (
          <div
            key={s.t}
            className="absolute"
            style={{
              left: "50%",
              top: "50%",
              transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
            }}
          >
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-display shadow-lift"
                style={{ background: s.c }}
              >
                0{i + 1}
              </div>
              <div className="text-xs uppercase tracking-widest text-ink font-medium">{s.t}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* FAIR pillars — horizontal letter blocks */
function FAIR() {
  const items = [
    { L: "F", t: "Findable", d: "Persistent identifiers, rich metadata, indexed in trusted repositories.", c: "var(--coral)" },
    { L: "A", t: "Accessible", d: "Standard protocols, clear authentication, long-term metadata availability.", c: "var(--teal)" },
    { L: "I", t: "Interoperable", d: "Open formats, controlled vocabularies, qualified references.", c: "var(--magenta)" },
    { L: "R", t: "Reusable", d: "Clear licensing, detailed provenance, community standards.", c: "var(--gold)" },
  ];
  return (
    <section className="py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14">
          <span className="text-xs uppercase tracking-[0.22em] font-medium" style={{ color: M }}>
            Framework
          </span>
          <h2 className="mt-4 font-display text-5xl text-ink leading-[0.98] max-w-3xl">
            We build to FAIR.<br />
            <em className="not-italic text-muted-foreground/60">From day one.</em>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((i) => (
            <div key={i.L} className="rounded-3xl bg-card border border-border p-7 relative overflow-hidden">
              <div
                className="absolute -top-10 -right-10 font-display text-[12rem] leading-none opacity-10 select-none"
                style={{ color: i.c }}
                aria-hidden
              >
                {i.L}
              </div>
              <div
                className="font-display text-5xl mb-4 relative"
                style={{ color: i.c }}
              >
                {i.L}
              </div>
              <h3 className="font-display text-xl text-ink relative">{i.t}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed relative">{i.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Architecture diagram: layered stack */
function Architecture() {
  const layers = [
    { l: "Capture", items: ["REDCap", "OnCore", "Qualtrics", "Custom forms"], c: "var(--coral)" },
    { l: "Storage", items: ["Wynton HPC", "AWS / Azure", "Box for UCSF", "Encrypted SQL"], c: "var(--magenta)" },
    { l: "Curate", items: ["Metadata", "Common data elements", "Ontologies", "QC pipelines"], c: "var(--teal)" },
    { l: "Share", items: ["dbGaP", "AnVIL", "Zenodo", "Dryad"], c: "var(--gold)" },
  ];
  return (
    <section className="py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-12">
          <div className="lg:col-span-6">
            <span className="text-xs uppercase tracking-[0.22em] font-medium" style={{ color: "var(--teal)" }}>
              Reference architecture
            </span>
            <h2 className="mt-4 font-display text-5xl text-ink leading-[0.98]">
              Standards over<br />silver bullets.
            </h2>
          </div>
          <p className="lg:col-span-5 lg:col-start-8 text-muted-foreground leading-relaxed">
            We're tool-agnostic and pragmatic. Most of our projects live in
            this stack — but we design for what your collaborators, IRB, and
            repositories actually require.
          </p>
        </div>
        <div className="space-y-3">
          {layers.map((g) => (
            <div
              key={g.l}
              className="grid grid-cols-12 gap-4 items-center rounded-2xl border border-border bg-card p-5 hover:shadow-lift transition"
            >
              <div className="col-span-12 md:col-span-3 flex items-center gap-3">
                <div className="w-2 h-12 rounded-full" style={{ background: g.c }} />
                <div>
                  <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Layer</div>
                  <div className="font-display text-2xl text-ink">{g.l}</div>
                </div>
              </div>
              <div className="col-span-12 md:col-span-9 flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <span
                    key={it}
                    className="text-xs px-3 py-2 rounded-xl bg-secondary text-ink/80 font-mono"
                  >
                    {it}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* DMS plan: two-page document mockup */
function Policy() {
  const checks = [
    "Data types & estimated volumes",
    "Related tools, software & code",
    "Standards & metadata",
    "Repository & timeline",
    "Access, distribution & reuse",
    "Oversight of data management",
  ];
  return (
    <section className="py-28 bg-ink text-white relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-sunburst opacity-15 blur-3xl" />
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 relative">
        <div className="lg:col-span-5">
          <span className="text-xs uppercase tracking-[0.22em] font-medium" style={{ color: M }}>
            NIH 2023 DMS policy
          </span>
          <h2 className="mt-4 font-display text-5xl text-white leading-[0.98]">
            A two-page plan<br />that holds up.
          </h2>
          <p className="mt-6 text-white/70 leading-relaxed text-lg max-w-md">
            Since January 2023, every NIH proposal needs a Data Management &
            Sharing plan. We write yours alongside the science — not in the
            last 48 hours before submission.
          </p>
        </div>
        <div className="lg:col-span-7">
          {/* Document mockup */}
          <div className="rounded-2xl bg-cream text-ink shadow-lift p-8 md:p-10 relative">
            <div
              aria-hidden
              className="absolute top-0 left-8 right-8 h-1"
              style={{ background: "var(--gradient-sunburst)" }}
            />
            <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-muted-foreground mb-6">
              <span>NIH DMS Plan · v1.0</span>
              <span>PI: Smith · 2 pages</span>
            </div>
            <h3 className="font-display text-2xl text-ink">
              Data Management & Sharing Plan
            </h3>
            <div className="mt-6 space-y-3">
              {checks.map((c, i) => (
                <div
                  key={c}
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-card border border-border"
                >
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-display"
                    style={{ background: ["var(--coral)", "var(--magenta)", "var(--teal)", "var(--gold)", "var(--lime)", "#8b5cf6"][i] }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-sm text-ink">{c}</span>
                  <span className="ml-auto text-[10px] uppercase tracking-widest text-muted-foreground">
                    Section {i + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DMSPage() {
  return (
    <SiteShell>
      <Breadcrumb trail={[{ label: "Services" }, { label: "Data management & sharing" }]} />
      <Hero />
      <FAIR />
      <Architecture />
      <Policy />
      <CTA
        eyebrow="Plan early"
        title={<>Data plan due<br /><span className="text-white/70">with the grant?</span></>}
        subtitle="Loop us in at Specific Aims — we'll write a DMS plan that aligns with your study, repositories, and budget."
        email="data@ocr.ucsf.edu"
        primaryLabel="Draft my DMS plan →"
      />
    </SiteShell>
  );
}
