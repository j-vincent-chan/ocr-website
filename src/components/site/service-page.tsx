import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { SERVICES } from "@/components/site/chrome";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Service identity                                                   */
/* ------------------------------------------------------------------ */

export type ServiceId =
  | "research-development"
  | "project-management"
  | "data-management"
  | "ai-tools";

export type ServiceMeta = {
  id: ServiceId;
  arm: "01" | "02" | "03" | "04";
  armLabel: string;
  shortName: string; // used in related-services chip
  fullName: string;
  to: string;
  accent: string; // CSS var()
  desc: string;
};

export const SERVICE_META: Record<ServiceId, ServiceMeta> = {
  "research-development": {
    id: "research-development",
    arm: "01",
    armLabel: "Research development & grantwriting",
    shortName: "Research development",
    fullName: "Research development & grantwriting",
    to: "/services/research-development",
    accent: "var(--coral)",
    desc: "Strategy, matchmaking, writing & peer review.",
  },
  "project-management": {
    id: "project-management",
    arm: "02",
    armLabel: "Project management & clinical coordination",
    shortName: "Project management",
    fullName: "Project management & clinical coordination",
    to: "/services/project-management",
    accent: "var(--teal)",
    desc: "Study startup, coordination & operations.",
  },
  "data-management": {
    id: "data-management",
    arm: "03",
    armLabel: "Data management & sharing",
    shortName: "Data management",
    fullName: "Data management & sharing",
    to: "/services/data-management",
    accent: "var(--magenta)",
    desc: "REDCap, metadata standards & DMS plans.",
  },
  "ai-tools": {
    id: "ai-tools",
    arm: "04",
    armLabel: "Research resources & AI tools",
    shortName: "AI tools",
    fullName: "Research resources & AI tools",
    to: "/services/ai-tools",
    accent: "var(--gold)",
    desc: "Signal, Prospera & internal automations.",
  },
};

/* ------------------------------------------------------------------ */
/*  Building blocks                                                    */
/* ------------------------------------------------------------------ */

export function Eyebrow({
  children,
  accent,
}: {
  children: ReactNode;
  accent: string;
}) {
  return (
    <span
      className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-medium"
      style={{ color: accent }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: accent }}
        aria-hidden
      />
      {children}
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lede,
  accent,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  accent: string;
}) {
  return (
    <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">
      <div className="lg:col-span-7">
        <Eyebrow accent={accent}>{eyebrow}</Eyebrow>
        <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl text-ink leading-[0.98]">
          {title}
        </h2>
      </div>
      {lede ? (
        <p className="lg:col-span-4 lg:col-start-9 text-muted-foreground leading-relaxed">
          {lede}
        </p>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  HERO                                                               */
/* ------------------------------------------------------------------ */

export function ServicePageHero({
  meta,
  positioning,
  title,
  description,
  primaryCta,
  secondaryCta,
  motif,
}: {
  meta: ServiceMeta;
  positioning: string; // short tagline above title
  title: ReactNode;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  motif?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-ink/10 bg-cream">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(var(--ink) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-6 pt-12 pb-20 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-ink">
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: meta.accent }}
              aria-hidden
            />
            Service arm {meta.arm} · {meta.armLabel}
          </span>
          <p
            className="mt-6 text-sm uppercase tracking-[0.22em] font-medium"
            style={{ color: meta.accent }}
          >
            {positioning}
          </p>
          <h1 className="mt-4 font-display text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.95] tracking-tight text-ink">
            {title}
          </h1>
          <p className="mt-7 max-w-xl text-lg md:text-xl text-muted-foreground leading-relaxed">
            {description}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={primaryCta.href}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
              style={{ background: "var(--ink)" }}
            >
              {primaryCta.label} <span aria-hidden>→</span>
            </a>
            {secondaryCta ? (
              <a
                href={secondaryCta.href}
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 text-sm font-medium text-ink hover:bg-ink/5 transition"
              >
                {secondaryCta.label}
              </a>
            ) : null}
          </div>
        </div>
        {motif ? (
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[280px]">
            {motif}
          </div>
        ) : null}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  OVERVIEW — what this service does                                  */
/* ------------------------------------------------------------------ */

export function ServiceOverview({
  accent,
  headline,
  body,
  stats,
}: {
  accent: string;
  headline: ReactNode;
  body: ReactNode;
  stats?: { value: string; label: string }[];
}) {
  return (
    <section className="py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7">
            <Eyebrow accent={accent}>What this service does</Eyebrow>
            <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-5xl text-ink leading-[1.05]">
              {headline}
            </h2>
          </div>
          <div className="lg:col-span-5 text-muted-foreground leading-relaxed text-lg">
            {body}
          </div>
        </div>
        {stats && stats.length > 0 ? (
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-border pt-10">
            {stats.map((s) => (
              <div key={s.label} className="border-l-2 pl-4" style={{ borderColor: accent }}>
                <div className="font-display text-3xl md:text-4xl text-ink">{s.value}</div>
                <div className="text-[11px] text-muted-foreground uppercase tracking-widest mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CAPABILITIES — key offerings                                       */
/* ------------------------------------------------------------------ */

export type Capability = {
  title: string;
  desc: string;
  tag?: string; // small label e.g. "Flagship" or "In dev"
  bullets?: string[];
};

export function ServiceCapabilities({
  accent,
  eyebrow = "Key capabilities",
  title,
  lede,
  items,
}: {
  accent: string;
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  items: Capability[];
}) {
  return (
    <section className="py-20 md:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          lede={lede}
          accent={accent}
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((c, i) => (
            <article
              key={c.title}
              className="rounded-3xl bg-card border border-border p-7 hover:shadow-lift transition relative overflow-hidden"
            >
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-0.5"
                style={{ background: accent }}
              />
              <div className="flex items-center justify-between mb-5">
                <div
                  className="font-display text-sm text-muted-foreground"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                {c.tag ? (
                  <span
                    className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full border"
                    style={{ borderColor: accent, color: accent }}
                  >
                    {c.tag}
                  </span>
                ) : null}
              </div>
              <h3 className="font-display text-xl md:text-2xl text-ink">{c.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {c.desc}
              </p>
              {c.bullets && c.bullets.length > 0 ? (
                <ul className="mt-5 space-y-2">
                  {c.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex gap-2.5 text-sm text-ink/80 leading-relaxed"
                    >
                      <span
                        className="mt-2 w-1.5 h-1.5 rounded-full flex-none"
                        style={{ background: accent }}
                        aria-hidden
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  WHO IT'S FOR                                                       */
/* ------------------------------------------------------------------ */

export type Audience = {
  who: string;
  fit: string;
};

export function ServiceWhoFor({
  accent,
  audiences,
  note,
}: {
  accent: string;
  audiences: Audience[];
  note?: string;
}) {
  return (
    <section className="py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Who it's for"
          title={<>Built for the people<br />actually doing the work.</>}
          accent={accent}
        />
        <div className="grid md:grid-cols-2 gap-4">
          {audiences.map((a) => (
            <div
              key={a.who}
              className="rounded-2xl border border-border bg-card p-6 flex gap-5 items-start"
            >
              <div
                className="w-10 h-10 rounded-xl flex-none flex items-center justify-center text-white font-display"
                style={{ background: accent }}
                aria-hidden
              >
                ◆
              </div>
              <div>
                <div className="font-display text-lg text-ink">{a.who}</div>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                  {a.fit}
                </p>
              </div>
            </div>
          ))}
        </div>
        {note ? (
          <p className="mt-8 text-sm text-muted-foreground italic max-w-2xl">
            {note}
          </p>
        ) : null}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  HOW OCR SUPPORTS — sequential steps                                */
/* ------------------------------------------------------------------ */

export type SupportStep = {
  title: string;
  desc: string;
  artifacts?: string[];
};

export function ServiceHowWeSupport({
  accent,
  title,
  lede,
  steps,
}: {
  accent: string;
  title?: ReactNode;
  lede?: ReactNode;
  steps: SupportStep[];
}) {
  return (
    <section className="py-20 md:py-24 bg-ink text-white relative overflow-hidden">
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-15 blur-3xl"
        style={{ background: accent }}
        aria-hidden
      />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">
          <div className="lg:col-span-7">
            <Eyebrow accent={accent}>How OCR supports the work</Eyebrow>
            <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl text-white leading-[0.98]">
              {title ?? <>A repeatable<br />engagement.</>}
            </h2>
          </div>
          {lede ? (
            <p className="lg:col-span-4 lg:col-start-9 text-white/70 leading-relaxed">
              {lede}
            </p>
          ) : null}
        </div>

        <div className="relative">
          <div
            aria-hidden
            className="absolute left-[27px] md:left-[35px] top-2 bottom-2 w-px opacity-40"
            style={{ background: accent }}
          />
          <ol className="space-y-4">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className="relative grid grid-cols-[56px_1fr] md:grid-cols-[72px_1fr] gap-5 items-start"
              >
                <div
                  className="w-14 h-14 md:w-[60px] md:h-[60px] rounded-2xl flex items-center justify-center font-display text-xl text-white shadow-lift relative z-10"
                  style={{ background: accent }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur">
                  <h3 className="font-display text-xl md:text-2xl text-white">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-white/70 leading-relaxed max-w-2xl">
                    {s.desc}
                  </p>
                  {s.artifacts && s.artifacts.length > 0 ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {s.artifacts.map((a) => (
                        <span
                          key={a}
                          className="text-[11px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/10 text-white/80"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  OUTCOMES — example use cases / results                              */
/* ------------------------------------------------------------------ */

export type Outcome = {
  kicker: string; // small label e.g. "Use case" or "Outcome"
  headline: string;
  detail: string;
};

export function ServiceOutcomes({
  accent,
  items,
  quote,
}: {
  accent: string;
  items: Outcome[];
  quote?: { text: string; attribution: string };
}) {
  return (
    <section className="py-20 md:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Use cases & outcomes"
          title={<>What it looks like<br />when this works.</>}
          accent={accent}
        />
        <div className="grid md:grid-cols-3 gap-5">
          {items.map((o) => (
            <figure
              key={o.headline}
              className="rounded-3xl bg-card border border-border p-7 relative"
            >
              <div
                aria-hidden
                className="absolute top-0 left-7 right-7 h-0.5"
                style={{ background: accent }}
              />
              <div
                className="text-[11px] uppercase tracking-widest font-medium mb-4"
                style={{ color: accent }}
              >
                {o.kicker}
              </div>
              <h3 className="font-display text-xl text-ink leading-snug">
                {o.headline}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {o.detail}
              </p>
            </figure>
          ))}
        </div>
        {quote ? (
          <figure className="mt-12 rounded-3xl bg-ink text-white p-10 md:p-12 relative overflow-hidden">
            <div
              aria-hidden
              className="absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full opacity-20 blur-3xl"
              style={{ background: accent }}
            />
            <blockquote className="relative font-display text-2xl md:text-3xl text-white leading-snug max-w-3xl">
              "{quote.text}"
            </blockquote>
            <figcaption className="relative mt-6 text-xs uppercase tracking-widest text-white/60">
              — {quote.attribution}
            </figcaption>
          </figure>
        ) : null}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  RELATED SERVICES — cross-linking                                   */
/* ------------------------------------------------------------------ */

export function ServiceRelated({
  currentId,
  accent,
  note,
}: {
  currentId: ServiceId;
  accent: string;
  note?: string;
}) {
  const others = (Object.values(SERVICE_META) as ServiceMeta[]).filter(
    (s) => s.id !== currentId,
  );
  return (
    <section className="py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-12">
          <div className="lg:col-span-7">
            <Eyebrow accent={accent}>Related services</Eyebrow>
            <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-5xl text-ink leading-[1.02]">
              Most programs use more<br />than one OCR service.
            </h2>
          </div>
          {note ? (
            <p className="lg:col-span-4 lg:col-start-9 text-muted-foreground leading-relaxed">
              {note}
            </p>
          ) : null}
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {others.map((s) => (
            <Link
              key={s.id}
              to={s.to}
              className="group rounded-3xl border border-border bg-card p-7 hover:shadow-lift transition flex flex-col"
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: s.accent }}
                  aria-hidden
                />
                <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
                  Arm {s.arm}
                </span>
              </div>
              <h3 className="mt-4 font-display text-xl text-ink leading-snug">
                {s.fullName}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">
                {s.desc}
              </p>
              <span
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all"
                style={{ color: s.accent }}
              >
                Explore <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Motif — small decorative SVG per service                           */
/* ------------------------------------------------------------------ */

export function ServiceMotif({
  variant,
  accent,
  className,
}: {
  variant: "spiral" | "lanes" | "lattice" | "circuit";
  accent: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative w-full max-w-[420px] aspect-square",
        className,
      )}
    >
      <div
        aria-hidden
        className="absolute inset-6 rounded-[2.5rem] opacity-[0.06]"
        style={{ background: accent }}
      />
      <svg
        viewBox="-100 -100 200 200"
        className="relative w-full h-full"
        aria-hidden
      >
        <defs>
          <radialGradient id={`motif-${variant}`} cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor={accent} stopOpacity="0.7" />
            <stop offset="1" stopColor={accent} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="0" cy="0" r="80" fill={`url(#motif-${variant})`} opacity="0.25" />
        {variant === "spiral" && (
          <>
            {Array.from({ length: 5 }).map((_, i) => (
              <circle
                key={i}
                cx="0"
                cy="0"
                r={20 + i * 14}
                fill="none"
                stroke={accent}
                strokeWidth="1"
                strokeDasharray="2 6"
                opacity={0.5 - i * 0.07}
              />
            ))}
            <path
              d="M -75 0 Q -40 -60 30 -40 T 75 30"
              fill="none"
              stroke={accent}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="-75" cy="0" r="4" fill={accent} />
            <circle cx="75" cy="30" r="6" fill={accent} />
          </>
        )}
        {variant === "lanes" && (
          <>
            {[-45, -15, 15, 45].map((y, i) => (
              <g key={y}>
                <line
                  x1="-80"
                  y1={y}
                  x2="80"
                  y2={y}
                  stroke={accent}
                  strokeWidth="1"
                  strokeDasharray="3 5"
                  opacity={0.4}
                />
                <rect
                  x={-70 + i * 35}
                  y={y - 6}
                  width="22"
                  height="12"
                  rx="3"
                  fill={accent}
                  opacity={0.8 - i * 0.15}
                />
                <rect
                  x={-30 + i * 30}
                  y={y - 6}
                  width="22"
                  height="12"
                  rx="3"
                  fill={accent}
                  opacity={0.5 - i * 0.08}
                />
              </g>
            ))}
          </>
        )}
        {variant === "lattice" && (
          <>
            {Array.from({ length: 7 }).map((_, r) =>
              Array.from({ length: 7 }).map((_, c) => {
                const x = -60 + c * 20;
                const y = -60 + r * 20;
                const d = Math.hypot(x, y);
                if (d > 78) return null;
                return (
                  <circle
                    key={`${r}-${c}`}
                    cx={x}
                    cy={y}
                    r={d < 25 ? 4 : 2.5}
                    fill={accent}
                    opacity={1 - d / 90}
                  />
                );
              }),
            )}
            <polygon
              points="0,-50 43,-25 43,25 0,50 -43,25 -43,-25"
              fill="none"
              stroke={accent}
              strokeWidth="2"
              opacity="0.6"
            />
          </>
        )}
        {variant === "circuit" && (
          <>
            <circle cx="0" cy="0" r="14" fill={accent} />
            {[0, 72, 144, 216, 288].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              const x = Math.cos(rad) * 65;
              const y = Math.sin(rad) * 65;
              return (
                <g key={deg}>
                  <line
                    x1="0"
                    y1="0"
                    x2={x}
                    y2={y}
                    stroke={accent}
                    strokeWidth="1.5"
                    opacity="0.5"
                  />
                  <circle cx={x} cy={y} r="9" fill={accent} opacity="0.85" />
                  <circle cx={x} cy={y} r="3" fill="var(--cream)" />
                </g>
              );
            })}
          </>
        )}
      </svg>
    </div>
  );
}
