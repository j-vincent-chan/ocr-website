import { useState } from "react";
import heroImg from "@/assets/hero-collab.jpg";

const PARTNERS = [
  {
    n: "Bakar ImmunoX Initiative",
    c: "var(--coral)",
    since: 2023,
    description:
      "OCR began inside ImmunoX and still anchors our model: embedded grant strategists, project managers, and data leads who work alongside immunology investigators from concept through award and into study execution.",
    services: ["Research development", "Project management", "Data management", "AI tools", "Community management"],
    proof: "Founding partner; the model OCR now adapts for other institutes.",
  },
  {
    n: "UCSF Diabetes Center",
    c: "var(--teal)",
    since: 2024,
    description:
      "The Diabetes Center was our first institute partner outside ImmunoX. OCR provides dedicated research development and operational support for multi-PI programs, clinical studies, and center-wide grant pipelines.",
    services: ["Research development", "Large grants", "Research Plan Reviews", "Clinical coordination"],
    proof: "Dedicated embedded capacity for grant pipelines and center-wide programs.",
  },
  {
    n: "Institute for Global Health Sciences",
    c: "var(--magenta)",
    since: 2024,
    description:
      "With IGHS, OCR supports global health investigators on large collaborative awards — coordinating partners, DMS plans, and proposal strategy for research that spans UCSF and international sites.",
    services: ["Research development", "DMS plans", "Proposal coordination", "Community convenings"],
    proof: "Expanding toward cohort-based grant writing training and large collaborative awards.",
  },
  {
    n: "UCSF Health Network",
    c: "oklch(0.65 0.15 265)",
    since: 2024,
    description:
      "OCR works with the UCSF Health Network to extend our playbook to aligned health system partners — helping bridge academic science, clinical operations, and shared funding opportunities.",
    services: ["Clinical research operations", "CRC capacity", "Protocol startup"],
    proof: "On-site CRC pilot connects affiliate hospitals to UCSF research infrastructure.",
  },
  {
    n: "Zuckerberg San Francisco General Hospital",
    c: "oklch(0.75 0.14 50)",
    since: 2025,
    description:
      "At ZSFG, OCR embeds with mission-driven research teams on the public hospital campus — supporting startup, regulatory navigation, and grant development for community-facing clinical and translational work.",
    services: ["Clinical coordination", "Regulatory navigation", "Grant development"],
    proof: "Extends OCR's operational model to community-facing translational research.",
  },
  {
    n: "School of Nursing",
    c: "oklch(0.55 0.2 280)",
    since: 2026,
    description:
      "Our newest academic partner brings OCR research development and program management capacity to nursing science — from training and implementation studies to multi-site trials led by nursing faculty.",
    services: ["Research development", "Program management", "Training studies"],
    proof: "New partner framed around nursing-led implementation and multi-site research.",
  },
  {
    n: "Program for Bronchiectasis and Pulmonary NTM",
    c: "var(--lime)",
    since: 2026,
    description:
      "OCR supports the program's investigators with clinical research unit management, study coordination, and data infrastructure for research on bronchiectasis and nontuberculous mycobacterial lung disease.",
    services: ["CRU management", "Clinical coordination", "Data infrastructure"],
    proof: "Bronchiectasis CRU brought into the OCR model.",
  },
  {
    n: "Mechanisms of Neurological Disorders",
    c: "oklch(0.6 0.13 160)",
    since: 2026,
    description:
      "OCR provides research development support to Mechanisms of Neurological Disorders investigators — shaping proposal strategy and coordinating grant submissions for research into the biology of neurological disease.",
    services: ["Research development"],
    proof: "Research development capacity extended to neuroscience investigators.",
  },
  {
    n: "Institute for Health & Aging",
    c: "var(--gold)",
    since: 2026,
    description:
      "With IHA, OCR provides embedded research development and project management for aging-focused cohorts, trials, and center grants — helping teams move faster from pilot data to fundable programs.",
    services: ["Research development", "Project management", "Faculty outreach", "Community management"],
    proof: "New partnership is already generating earlier-than-expected requests for support.",
  },
] as const;

function sortPartners(partners: typeof PARTNERS) {
  return [...partners].sort((a, b) => {
    if (a.since !== b.since) return a.since - b.since;
    const order2026 = [
      "School of Nursing",
      "Program for Bronchiectasis and Pulmonary NTM",
      "Institute for Health & Aging",
      "Mechanisms of Neurological Disorders",
    ];
    const ai = order2026.indexOf(a.n);
    const bi = order2026.indexOf(b.n);
    if (ai !== -1 && bi !== -1) return ai - bi;
    return a.n.localeCompare(b.n);
  });
}

export function PartnersSection() {
  const [open, setOpen] = useState<string | null>(null);
  const partners = sortPartners(PARTNERS);

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
        <div className="mb-12">
          <span className="text-xs uppercase tracking-[0.22em] text-magenta-aa font-medium">
            Partners
          </span>
          <h2 className="mt-4 font-display text-5xl md:text-6xl text-ink leading-[0.98]">
            <span className="block text-balance lg:whitespace-nowrap">
              Many partners, different needs.
            </span>
            <span className="block italic text-muted-foreground/80">
              One adaptive model.
            </span>
          </h2>
        </div>

        <ul className="divide-y divide-ink/15 border-y border-ink/15">
          {partners.map((p, i) => {
            const isOpen = open === p.n;
            const panelId = `partner-panel-${i}`;
            return (
              <li
                key={p.n}
                className="relative border-l-4 border-transparent transition-[border-color,background-color] duration-300"
                style={{ borderLeftColor: isOpen ? p.c : "transparent" }}
              >
                <button
                  type="button"
                  id={`partner-trigger-${i}`}
                  onClick={() => setOpen(isOpen ? null : p.n)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className={`group flex w-full flex-wrap items-center justify-between gap-4 py-6 text-left transition-all duration-300 hover:bg-cream/60 hover:pl-3 ${
                    isOpen ? "bg-cream/50 pl-3" : "pl-0"
                  }`}
                >
                  <div className="flex items-center gap-6 min-w-0">
                    <span className="font-display text-sm text-muted-foreground w-8 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="w-3 h-3 shrink-0 rounded-full transition-transform duration-300 group-hover:scale-125"
                      style={{ background: p.c }}
                    />
                    <span className="font-display text-xl md:text-2xl lg:text-3xl text-ink max-w-[min(100%,42rem)]">
                      {p.n}
                    </span>
                  </div>
                  <div className="flex shrink-0 items-center gap-4">
                    <span className="text-xs text-muted-foreground uppercase tracking-widest">
                      Partner since {p.since}
                    </span>
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full border border-ink/15 text-ink/60 transition-transform duration-300 ${
                        isOpen ? "rotate-180 bg-secondary" : "bg-card"
                      }`}
                      aria-hidden
                    >
                      ↓
                    </span>
                  </div>
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={`partner-trigger-${i}`}
                  aria-hidden={!isOpen}
                  className={`grid motion-safe:transition-[grid-template-rows] motion-safe:duration-300 motion-safe:ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pb-8 pl-[4.25rem] pr-6 md:pl-20 max-w-4xl">
                      <p className="text-base text-muted-foreground leading-relaxed">
                        {p.description}
                      </p>
                      <div className="mt-5 grid md:grid-cols-[1.4fr_1fr] gap-4">
                        <div>
                          <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
                            OCR provides
                          </div>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {p.services.map((service) => (
                              <span
                                key={service}
                                className="rounded-full border border-border bg-card px-3 py-1 text-[11px] text-ink/75"
                              >
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div
                          className="rounded-2xl px-4 py-3 text-sm leading-relaxed"
                          style={{
                            background: `color-mix(in oklab, ${p.c} 12%, var(--card))`,
                            color: `color-mix(in oklab, ${p.c} 48%, var(--ink))`,
                          }}
                        >
                          {p.proof}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="mt-10 max-w-2xl text-muted-foreground leading-relaxed">
          While we have dedicated capacity for our partners and their
          communities, we serve all UCSF investigators when bandwidth allows.
          We're actively open to new partnerships.
        </p>
      </div>
    </section>
  );
}
