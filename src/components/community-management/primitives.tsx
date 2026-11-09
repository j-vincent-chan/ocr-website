import { hero } from "@/data/community-management";

export { Arrow, pillInk, pillOutline } from "@/components/research-development/primitives";

/** Lime section eyebrow: 12px Inter 500, uppercase, 0.18em tracking, 16px below. */
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
      className={`mb-4 text-xs font-medium uppercase tracking-[0.18em] ${
        tone === "dark" ? "text-lime" : "text-lime-text"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/** Two-column section header: eyebrow + h2 left, lede right, auto-fit at 300px. */
export function SectionHeader({
  eyebrow,
  title,
  lede,
  className = "",
}: {
  eyebrow: string;
  title: string;
  lede: string;
  className?: string;
}) {
  return (
    <div
      className={`mb-7 grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-end gap-6 gap-x-[72px] lg:mb-12 ${className}`}
    >
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="font-display text-[clamp(32px,4vw,48px)] font-medium leading-[1.04] tracking-[-0.02em] text-ink text-pretty">
          {title}
        </h2>
      </div>
      <p className="text-[clamp(16px,1.4vw,19px)] leading-[1.55] text-ink-body text-pretty">{lede}</p>
    </div>
  );
}

/** Overlapping circular headshots on the Start-here booking card. */
export function TeamAvatars({ size = 36, overlap = 10 }: { size?: number; overlap?: number }) {
  return (
    <div className="flex flex-none" style={{ paddingLeft: overlap }} aria-hidden>
      {hero.avatars.map((p) => (
        <img
          key={p.name}
          src={p.src}
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
