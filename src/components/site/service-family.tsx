import { Link } from "@tanstack/react-router";
import { SERVICES } from "./chrome";
import { armName } from "./arms";

const ARM_BY_PATH: Record<string, string> = {
  "/services/research-development": "01",
  "/services/research-operations": "02",
  "/services/data-management": "03",
  "/services/ai-tools": "04",
  "/services/community-management": "05",
};

/**
 * Family signature appearing across all service pages.
 * - Same eyebrow grammar ("Research development · …")
 * - Same micro-rhythm (arm name, section label, accent dot)
 * Use at the top of distinctive sections to telegraph "you're inside the OCR system".
 */
export function ArmEyebrow({
  arm,
  label,
  accent,
}: {
  arm: string;
  label: string;
  accent: string;
}) {
  return (
    <div className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-muted-foreground font-medium">
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: accent }}
        aria-hidden
      />
      <span>{armName(arm)}</span>
      <span className="opacity-40">·</span>
      <span className="text-ink/80">{label}</span>
    </div>
  );
}

/** Sibling service navigator. Lives just above the page CTA. */
export function ServiceCrossNav({ currentPath }: { currentPath: string }) {
  return (
    <section className="py-20 bg-cream border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
          <div>
            <div className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground font-medium">
              The five arms
            </div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl text-ink leading-[1.05] max-w-xl">
              One office. Five ways<br className="hidden md:block" /> to support your research.
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
            Most projects draw on more than one arm. Start with one, and the
            others are a conversation away.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {SERVICES.map((s) => {
            const arm = ARM_BY_PATH[s.to] ?? "··";
            if (s.to === currentPath) {
              return (
                <div
                  key={s.to}
                  aria-current="page"
                  className="rounded-3xl border border-dashed border-ink/20 p-7 cursor-default select-none"
                >
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.24em] text-muted-foreground/60">
                    <span className="font-display text-base normal-case tracking-normal">{arm}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-ink/20" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl text-ink/35 leading-tight">
                    {s.name}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground/60">{s.desc}</p>
                  <div className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-ink/5 px-2.5 py-1 text-[11px] uppercase tracking-[0.18em] font-medium text-muted-foreground">
                    You are here
                  </div>
                </div>
              );
            }
            return (
              <Link
                key={s.to}
                to={s.to}
                className="group rounded-3xl border border-border bg-card p-7 hover:shadow-lift transition relative overflow-hidden"
              >
                <div
                  aria-hidden
                  className="absolute top-0 left-7 right-7 h-0.5 origin-left scale-x-50 group-hover:scale-x-100 transition-transform duration-500"
                  style={{ background: s.accent }}
                />
                <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                  <span className="font-display text-base normal-case tracking-normal text-muted-foreground/70">{arm}</span>
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: s.accent }}
                  />
                </div>
                <h3 className="mt-6 font-display text-2xl text-ink leading-tight">
                  {s.name}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">{s.desc}</p>
                <div
                  className="mt-6 text-sm font-medium inline-flex items-center gap-1.5 transition-transform group-hover:translate-x-0.5"
                  style={{ color: s.accent }}
                >
                  Explore <span aria-hidden>→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Editorial pull-quote shared across pages — same construction, accent varies. */
export function PullQuote({
  quote,
  attribution,
  accent,
}: {
  quote: string;
  attribution: string;
  accent: string;
}) {
  return (
    <figure className="relative rounded-3xl bg-card border border-border p-8 md:p-10">
      <div
        aria-hidden
        className="absolute top-0 left-8 right-8 h-0.5"
        style={{ background: accent }}
      />
      <blockquote className="font-display text-xl md:text-2xl text-ink leading-snug">
        “{quote}”
      </blockquote>
      <figcaption className="mt-6 text-[11px] text-muted-foreground uppercase tracking-[0.22em]">
        — {attribution}
      </figcaption>
    </figure>
  );
}
