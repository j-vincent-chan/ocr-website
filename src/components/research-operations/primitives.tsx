import { Link } from "@tanstack/react-router";
import { ctaAvatars, SHOW_REVIEW_FLAGS, TEAL, type FactLink } from "@/data/research-operations";

type Avatar = { slug: string; photo: string };

/** Section eyebrow: 12px Inter 500, uppercase, 0.18em tracking, teal by default, 16px below. */
export function Eyebrow({
  children,
  tone = "light",
  className = "",
  accent,
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
  /** Override the default teal accent (e.g. magenta on Data Management). */
  accent?: string;
}) {
  const color = accent ?? (tone === "dark" ? TEAL : undefined);
  return (
    <div
      className={`mb-4 text-[11px] font-medium uppercase tracking-[0.18em] lg:text-xs ${
        color ? "" : "text-teal-text"
      } ${className}`}
      style={color ? { color } : undefined}
    >
      {children}
    </div>
  );
}

/**
 * Shared section header: eyebrow + H2 on the left, lede on the right, aligned to the baseline.
 * Same construction as the Research Development "What we do" header.
 */
export function SectionHeader({
  eyebrow,
  title,
  lede,
  className = "",
  accent,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  className?: string;
  accent?: string;
}) {
  return (
    <div
      className={`mb-7 lg:mb-14 lg:grid lg:grid-cols-[5fr_7fr] lg:items-end lg:gap-[72px] ${className}`}
    >
      <div>
        <Eyebrow accent={accent}>{eyebrow}</Eyebrow>
        <h2 className="font-display text-[32px] font-medium leading-[1.08] tracking-[-0.02em] text-ink text-pretty md:text-[40px] lg:text-[48px] lg:leading-[1.02]">
          {title}
        </h2>
      </div>
      <p className="mt-3.5 text-base leading-[1.55] text-ink-body text-pretty lg:mt-0 lg:text-[19px]">
        {lede}
      </p>
    </div>
  );
}

/** Yellow design-review annotation. Renders nothing unless `show` (default: RO flag) is on. */
export function ReviewFlag({
  children,
  show = SHOW_REVIEW_FLAGS,
}: {
  children: React.ReactNode;
  show?: boolean;
}) {
  if (!show) return null;
  return (
    <span className="ml-1.5 inline-block rounded-full bg-[oklch(0.95_0.08_85)] px-2 py-0.5 align-middle text-[11px] font-semibold text-[oklch(0.4_0.1_70)]">
      {children}
    </span>
  );
}

/** Overlapping circular headshots. Defaults to Research Operations CTA avatars. */
export function TeamAvatars({
  size = 36,
  overlap = 10,
  people = ctaAvatars,
}: {
  size?: number;
  overlap?: number;
  people?: Avatar[];
}) {
  return (
    <div className="flex flex-none" style={{ paddingLeft: overlap }} aria-hidden>
      {people.map((p) => (
        <img
          key={p.slug}
          src={p.photo}
          alt=""
          width={size}
          height={size}
          className="rounded-full border-2 border-white bg-secondary object-cover [object-position:center_18%]"
          style={{ width: size, height: size, marginLeft: -overlap }}
        />
      ))}
    </div>
  );
}

/** Service dot: 10px (default) or 8px, in the service's accent. */
export function Dot({
  color,
  size = 10,
  className = "",
}: {
  color: string;
  size?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={`inline-block flex-none rounded-full ${className}`}
      style={{ width: size, height: size, background: color }}
    />
  );
}

/** Renders `text`, turning the span that matches `link.label` into an in-site link. */
export function LinkedText({ text, link }: { text: string; link?: FactLink }) {
  if (!link) return <>{text}</>;
  const i = text.indexOf(link.label);
  if (i === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <Link
        to={link.to}
        hash={link.hash}
        className="font-medium text-ink underline decoration-ink/30 underline-offset-2 hover:decoration-ink"
      >
        {link.label}
      </Link>
      {text.slice(i + link.label.length)}
    </>
  );
}

/** Definition-list row: 96px (default) uppercase label column plus the value, with hairlines. */
export function FactRow({
  label,
  children,
  last = false,
  labelWidth = 96,
  padY,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  last?: boolean;
  labelWidth?: number;
  /** Row padding in px; defaults to 8. */
  padY?: number;
  className?: string;
}) {
  return (
    <div
      className={`grid gap-3.5 py-2 ${last ? "" : "border-b border-ink/8"} ${className}`}
      style={{ gridTemplateColumns: `${labelWidth}px 1fr`, paddingBlock: padY }}
    >
      <dt className="pt-[3px] text-[11px] uppercase tracking-[0.14em] text-ink-muted-2">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
