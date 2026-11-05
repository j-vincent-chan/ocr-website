import { strategists } from "@/data/research-development";

/** Section eyebrow: 12px Inter 500, uppercase, 0.18em tracking, coral, 16px below. */
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
      className={`mb-4 text-[11px] font-medium uppercase tracking-[0.18em] lg:text-xs ${
        tone === "dark" ? "text-coral" : "text-coral-text"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/** Overlapping circular headshots of the strategists who have photos. */
export function StrategistAvatars({
  size = 36,
  overlap = 10,
}: {
  size?: number;
  overlap?: number;
}) {
  const pictured = strategists.filter((p) => p.photo);
  return (
    <div className="flex flex-none" style={{ paddingLeft: overlap }} aria-hidden>
      {pictured.map((p) => (
        <img
          key={p.id}
          src={p.photo ?? undefined}
          alt=""
          width={size}
          height={size}
          className="rounded-full border-2 border-white bg-secondary object-cover"
          style={{ width: size, height: size, marginLeft: -overlap }}
        />
      ))}
    </div>
  );
}

export function Arrow({ children = "→" }: { children?: string }) {
  return <span aria-hidden>{children}</span>;
}

/* Pill button recipes (radius 999). */
export const pillInk =
  "inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-[15px] font-medium text-white transition-colors duration-[250ms] hover:bg-ink/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";
export const pillOutline =
  "inline-flex items-center justify-center gap-2 rounded-full border border-ink/25 px-5 py-[11px] text-sm font-medium text-ink transition-colors duration-[250ms] hover:border-ink/50 hover:bg-ink/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";
export const pillOutlineOnDark =
  "inline-flex items-center justify-center gap-2 rounded-full border border-white/35 px-5 py-[11px] text-sm font-medium text-white transition-colors duration-[250ms] hover:border-white/60 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";
export const pillWhite =
  "inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-[15px] font-medium text-ink transition-colors duration-[250ms] hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";
