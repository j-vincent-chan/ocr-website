import {
  Dot,
  Eyebrow,
  FactRow,
  ReviewFlag as RoReviewFlag,
  TeamAvatars,
} from "@/components/research-operations/primitives";
import { MAGENTA_TEXT, SHOW_REVIEW_FLAGS } from "@/data/data-management";

export { Dot, Eyebrow, FactRow, TeamAvatars };
export { Arrow } from "@/components/research-development/primitives";

/**
 * Shared section header for Data Management: auto-fit two columns at 380px,
 * magenta eyebrow. Same type sizes as Research Operations.
 */
export function SectionHeader({
  eyebrow,
  title,
  lede,
  className = "",
  tone = "light",
  titleClassName = "",
  ledeClassName = "",
}: {
  eyebrow: string;
  title: string;
  lede: string;
  className?: string;
  tone?: "light" | "dark";
  titleClassName?: string;
  ledeClassName?: string;
}) {
  const accent = tone === "dark" ? "var(--magenta-ondark)" : MAGENTA_TEXT;
  return (
    <div
      className={`mb-[clamp(28px,4vw,48px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-end gap-x-[72px] gap-y-3.5 ${className}`}
    >
      <div>
        <Eyebrow accent={accent}>{eyebrow}</Eyebrow>
        <h2
          className={`font-display text-[clamp(32px,4vw,48px)] font-medium leading-[1.04] tracking-[-0.02em] text-ink text-pretty ${titleClassName}`}
        >
          {title}
        </h2>
      </div>
      <p
        className={`text-[clamp(16px,1.5vw,19px)] leading-[1.55] text-ink-body text-pretty ${ledeClassName}`}
      >
        {lede}
      </p>
    </div>
  );
}

export function ReviewFlag({ children }: { children: React.ReactNode }) {
  return <RoReviewFlag show={SHOW_REVIEW_FLAGS}>{children}</RoReviewFlag>;
}
