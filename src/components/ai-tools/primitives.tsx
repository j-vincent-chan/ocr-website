import { Dot } from "@/components/research-operations/primitives";

/** Section eyebrow: 12px Inter 500, uppercase, 0.18em tracking, amber ink (gold on dark). */
export function Eyebrow({
  children,
  tone = "light",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={`text-xs font-medium uppercase tracking-[0.18em] ${
        tone === "dark" ? "text-gold" : "text-amber-text"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/** H2 used by every light section on the page. */
export const h2Class =
  "font-display text-[clamp(32px,4vw,48px)] font-medium leading-[1.02] tracking-[-0.02em] text-ink text-pretty";

/** Eyebrow + H2 on the left, lede on the right; stacks below ~760px. */
export function SectionHeader({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede: string;
}) {
  return (
    <div className="mb-12 flex flex-wrap items-end gap-x-[72px] gap-y-6">
      <div className="min-w-0 flex-[5_1_320px]">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className={`mt-4 ${h2Class}`}>{title}</h2>
      </div>
      <p className="min-w-0 flex-[7_1_400px] text-[clamp(16px,1.4vw,19px)] leading-[1.55] text-ink-body text-pretty">
        {lede}
      </p>
    </div>
  );
}

/** Bulleted list with 5px dots in `color`. */
export function DotList({
  items,
  color,
  className = "",
}: {
  items: string[];
  color: string;
  className?: string;
}) {
  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5">
          <Dot color={color} size={5} className="mt-2" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
