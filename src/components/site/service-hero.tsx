import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ServiceArmId = "01" | "02" | "03" | "04";

export type ServiceHeroProps = {
  arm: ServiceArmId;
  /** Text after “Service arm 0N · ” (e.g. Data infrastructure) */
  armLabel: string;
  accent: string;
  title: ReactNode;
  description: string;
  /** Optional right column (diagram, console, etc.) */
  aside?: ReactNode;
  /** Optional row below description (stats, status tiles) */
  below?: ReactNode;
  className?: string;
};

export function ServiceHero({
  arm,
  armLabel,
  accent,
  title,
  description,
  aside,
  below,
  className,
}: ServiceHeroProps) {
  const hasAside = Boolean(aside);

  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-ink/10 bg-cream",
        className,
      )}
    >
      <div
        className={cn(
          "max-w-7xl mx-auto px-6 pt-12 pb-20",
          hasAside && "grid lg:grid-cols-12 gap-12 items-center",
        )}
      >
        <div className={cn(hasAside && "lg:col-span-6")}>
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-ink">
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: accent }}
              aria-hidden
            />
            Service arm {arm} · {armLabel}
          </span>
          <h1 className="mt-8 font-display text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.95] tracking-tight text-ink">
            {title}
          </h1>
          <p className="mt-8 max-w-xl text-xl text-muted-foreground leading-relaxed">
            {description}
          </p>
          {below ? <div className="mt-10">{below}</div> : null}
        </div>
        {aside ? <div className="lg:col-span-6 relative flex items-center justify-center">{aside}</div> : null}
      </div>
    </section>
  );
}

/** Highlight the last line or phrase with the service accent color */
export function ServiceHeroHighlight({
  children,
  accent,
}: {
  children: ReactNode;
  accent: string;
}) {
  return (
    <em className="not-italic" style={{ color: accent }}>
      {children}
    </em>
  );
}
