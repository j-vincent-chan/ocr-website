import type { ReactNode } from "react";
import { ProjectMotif } from "@/components/site/project-motifs";
import { motifFor } from "./lib";

export const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export const inkPillClass = `inline-flex items-center justify-center rounded-full bg-ink font-medium text-white transition-colors duration-200 hover:bg-primary ${focusRing}`;

export const glanceShadow = "shadow-[0_30px_60px_oklch(0.05_0.04_265/0.35)]";

export function Eyebrow({
  children,
  color = "var(--teal-text)",
}: {
  children: ReactNode;
  color?: string;
}) {
  return (
    <p className="text-xs font-medium uppercase tracking-[0.18em]" style={{ color }}>
      {children}
    </p>
  );
}

export function FundingSection({
  children,
  padBottom = false,
}: {
  children: ReactNode;
  padBottom?: boolean;
}) {
  return (
    <section
      style={{
        padding: padBottom
          ? "clamp(56px, 7vw, 96px) 0 clamp(64px, 8vw, 112px)"
          : "clamp(56px, 7vw, 96px) 0 0",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">{children}</div>
    </section>
  );
}

export function SectionTitle({
  children,
  size = "full",
  className = "",
}: {
  children: ReactNode;
  size?: "full" | "split" | "ledger";
  className?: string;
}) {
  const scale =
    size === "ledger"
      ? "text-[clamp(30px,3.6vw,44px)] leading-[1.04]"
      : size === "split"
        ? "text-[clamp(26px,2.8vw,34px)] leading-[1.08]"
        : "text-[clamp(28px,3.2vw,40px)] leading-[1.05]";
  return (
    <h2
      className={`font-display font-medium tracking-[-0.02em] text-balance text-ink ${scale} ${className}`}
    >
      {children}
    </h2>
  );
}

export function OutLink({
  href,
  className = "",
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={`${focusRing} ${className}`}>
      {children}
    </a>
  );
}

export function FundingSprite({ id, color }: { id: string; color: string }) {
  return (
    <div className="flex size-[72px] shrink-0 items-center justify-center">
      <div aria-hidden className="ro-sprite size-14" style={{ color }}>
        <ProjectMotif motif={motifFor(id)} accent={color} className="h-full w-full" />
      </div>
    </div>
  );
}

export function PillDot({ color, className = "" }: { color: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-block size-1.5 shrink-0 rounded-full ${className}`}
      style={{ background: color }}
    />
  );
}
