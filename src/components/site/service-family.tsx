import { Link } from "@tanstack/react-router";
import { SERVICES } from "./chrome";

const ARM_BY_PATH: Record<string, string> = {
  "/services/research-development": "01",
  "/services/project-management": "02",
  "/services/data-management": "03",
  "/services/ai-tools": "04",
};

/**
 * Family signature appearing across all four service pages.
 * - Same eyebrow grammar ("Arm 0N · …")
 * - Same micro-rhythm (label, big display number, accent dot)
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
      <span>Arm {arm}</span>
      <span className="opacity-40">·</span>
      <span className="text-ink/80">{label}</span>
    </div>
  );
}

/** Sibling service navigator. Lives just above the page CTA. */
export function ServiceCrossNav({ currentPath }: { currentPath: string }) {
  const others = SERVICES.filter((s) => s.to !== currentPath);
  return (
    <section className="py-20 bg-cream border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
          <div>
            <div className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground font-medium">
              The four arms
            </div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl text-ink leading-[1.05] max-w-xl">
              One office. Four ways<br className="hidden md:block" /> we plug in.
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
            Most programs touch more than one arm. Engage one, and the others
            are a doorway away.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {others.map((s) => {
            const arm = ARM_BY_PATH[s.to] ?? "··";
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
                  <span>Arm {arm}</span>
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
