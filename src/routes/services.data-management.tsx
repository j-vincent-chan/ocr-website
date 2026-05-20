import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Breadcrumb, CTA } from "@/components/site/chrome";

export const Route = createFileRoute("/services/data-management")({
  head: () => ({
    meta: [
      { title: "Data Management & Sharing — UCSF OCR" },
      {
        name: "description",
        content:
          "REDCap and custom databases, metadata standards, and NIH-compliant Data Management & Sharing plans for UCSF research programs.",
      },
      { property: "og:title", content: "Data Management & Sharing — UCSF OCR" },
      {
        property: "og:description",
        content: "Make your data findable, accessible, interoperable, and reusable — from day one.",
      },
    ],
  }),
  component: DMSPage,
});

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-32 -left-32 w-[640px] h-[640px] rounded-full blur-3xl opacity-25"
        style={{ background: "radial-gradient(circle, var(--magenta), transparent 65%)" }}
      />
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-24 grid lg:grid-cols-12 gap-12 items-center relative">
        <div className="lg:col-span-7">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-ink">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--magenta)" }} />
            Service arm · Office of Collaborative Research
          </span>
          <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.02] text-ink">
            Data Management<br />
            <span style={{ color: "var(--magenta)" }}>& Sharing.</span>
          </h1>
          <p className="mt-7 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Databases, metadata standards, and NIH-compliant DMS plans built with your team from
            study design — not retrofit at the end. We make your data findable, reusable, and yours.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-ink text-white px-6 py-3.5 text-sm font-medium hover:bg-ink/90 transition shadow-soft">
              Plan your data <span aria-hidden>→</span>
            </a>
            <a href="#stack" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-medium hover:bg-secondary transition">
              See our stack
            </a>
          </div>
          <dl className="mt-14 grid grid-cols-3 gap-6 max-w-xl">
            {[
              ["62", "DMS plans authored"],
              ["100%", "NIH 2023 policy compliant"],
              ["FAIR", "Built-in by default"],
            ].map(([n, l]) => (
              <div key={l} className="border-l-2 pl-4" style={{ borderColor: "var(--magenta)" }}>
                <dt className="font-display text-4xl text-ink">{n}</dt>
                <dd className="text-xs text-muted-foreground mt-1 leading-snug">{l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-6">
              FAIR principles in practice
            </div>
            <div className="space-y-4">
              {[
                { l: "F", t: "Findable", d: "Persistent identifiers, rich metadata, indexed in trusted repositories.", c: "var(--coral)" },
                { l: "A", t: "Accessible", d: "Standard protocols, clear authentication, long-term metadata availability.", c: "var(--teal)" },
                { l: "I", t: "Interoperable", d: "Open formats, controlled vocabularies, qualified references.", c: "var(--magenta)" },
                { l: "R", t: "Reusable", d: "Clear licensing, detailed provenance, community standards.", c: "var(--gold)" },
              ].map((r) => (
                <div key={r.t} className="flex items-start gap-4 p-3 rounded-xl hover:bg-secondary/60 transition">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-display text-white text-base flex-none"
                    style={{ background: r.c }}
                  >
                    {r.l}
                  </div>
                  <div>
                    <div className="text-ink font-medium text-sm">{r.t}</div>
                    <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{r.d}</div>
                  </div>
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
    { tag: "01", title: "DMS Plan Authoring", body: "We write the NIH Data Management & Sharing plan with you — aligned to the 2023 policy, your repository choices, and your study realities.", color: "var(--magenta)" },
    { tag: "02", title: "REDCap Build & Optimization", body: "Project setup, branching logic, longitudinal arms, data quality rules, and integration with downstream pipelines.", color: "var(--coral)" },
    { tag: "03", title: "Custom Databases", body: "When REDCap isn't right, we design and build study-specific databases with auditability and FAIR metadata baked in.", color: "var(--teal)" },
    { tag: "04", title: "Metadata & Ontologies", body: "Controlled vocabularies, common data elements, and ontology alignment so your data plays well with the rest of the field.", color: "var(--gold)" },
    { tag: "05", title: "Repository Strategy", body: "We help you choose between dbGaP, AnVIL, generalist repositories, and discipline-specific options — and prepare submissions.", color: "var(--lime)" },
    { tag: "06", title: "Data Use Agreements", body: "Coordinate with ITS, OoR, and counsel on DUAs and DTAs — so sharing is approved, not aspirational.", color: "#8b5cf6" },
  ];
  return (
    <section id="stack" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-5">
            <span className="text-xs uppercase tracking-[0.2em] font-medium" style={{ color: "var(--magenta)" }}>What we do</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-medium text-ink leading-[1.05]">
              From DMS plan to data release.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 self-end">
            <p className="text-lg text-muted-foreground leading-relaxed">
              We work across the full data lifecycle — design, capture, curation, sharing — so your
              data is an asset for your lab and the broader research community.
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

function Stack() {
  const groups = [
    { h: "Capture", items: ["REDCap", "OnCore", "Qualtrics", "Custom forms"] },
    { h: "Storage", items: ["Wynton HPC", "AWS / Azure", "Box for UCSF", "Encrypted SQL"] },
    { h: "Analysis", items: ["R / RStudio Server", "Python / JupyterHub", "Stata", "QGIS"] },
    { h: "Sharing", items: ["dbGaP", "AnVIL", "Zenodo", "Dryad"] },
  ];
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-[0.2em] font-medium" style={{ color: "var(--teal)" }}>The stack</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-medium text-ink leading-[1.05]">Standards over silver bullets.</h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            We're tool-agnostic and pragmatic. Most of our projects live in this stack — but we
            design for what your collaborators, IRB, and repositories actually require.
          </p>
        </div>
        <div className="mt-12 grid md:grid-cols-4 gap-4">
          {groups.map((g, i) => (
            <div key={g.h} className="rounded-3xl border border-border bg-card p-6">
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-2 h-8 rounded-full"
                  style={{ background: ["var(--magenta)", "var(--coral)", "var(--teal)", "var(--gold)"][i] }}
                />
                <h3 className="text-lg text-ink">{g.h}</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {g.items.map((it) => (
                  <li key={it} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                    {it}
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

function Policy() {
  return (
    <section className="py-24 bg-ink text-white relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-sunburst opacity-15 blur-3xl" />
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 relative">
        <div className="lg:col-span-5">
          <span className="text-xs uppercase tracking-[0.2em] font-medium" style={{ color: "var(--magenta)" }}>NIH 2023 DMS Policy</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-medium text-white leading-[1.05]">A two-page plan that holds up.</h2>
          <p className="mt-6 text-white/70 leading-relaxed text-lg">
            Since January 2023, every NIH proposal needs a Data Management & Sharing plan. We write
            yours alongside the science — not in the last 48 hours before submission — so it's
            specific, fundable, and operationally honest.
          </p>
        </div>
        <div className="lg:col-span-7 lg:pl-8">
          <div className="rounded-3xl bg-white/5 border border-white/10 p-8 backdrop-blur">
            <div className="text-xs uppercase tracking-widest text-white/50 mb-6">DMS plan checklist</div>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "Data types & estimated volumes",
                "Related tools, software & code",
                "Standards & metadata",
                "Repository & timeline",
                "Access, distribution & reuse",
                "Oversight of data management",
              ].map((c, i) => (
                <div key={c} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="font-display text-base text-white/40 w-6">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-sm text-white/90">{c}</span>
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
      <Breadcrumb trail={[{ label: "Services" }, { label: "Data Management & Sharing" }]} />
      <Hero />
      <Capabilities />
      <Stack />
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
