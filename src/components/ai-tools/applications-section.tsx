import { useEffect, useRef, useState } from "react";
import { blueprintGrid } from "@/components/research-development/lib";
import { Arrow, pillInk } from "@/components/research-development/primitives";
import { Dot } from "@/components/research-operations/primitives";
import {
  applicationsIntro,
  apps,
  type AppRecord,
  type CardKey,
  type Maturity,
} from "@/data/ai-tools";
import { MarkDisc } from "./app-mark";
import { alpha, onButtonKey, usePrefersReducedMotion, useShowApp } from "./lib";
import { DotList, SectionHeader } from "./primitives";
import { Vignette } from "./vignettes";

const CARDS = apps.filter((a): a is AppRecord & { key: CardKey } => a.key !== "atlas");

/** Card edge and text-column blueprint grid by maturity (grid recipe from in-development.tsx). */
const MATURITY: Record<Maturity, { border: string; grid?: string; mask?: string }> = {
  development: {
    border: "border-dashed border-ink/35",
    grid: blueprintGrid(0.09),
    mask: "linear-gradient(180deg, #000 0%, rgba(0,0,0,0.3) 100%)",
  },
  beta: {
    border: "border-border",
    grid: blueprintGrid(0.045),
    mask: "linear-gradient(180deg, #000 0%, transparent 70%)",
  },
  released: { border: "border-border" },
};

/** Status pill background: the app fill at ~18%, tuned per hue for 4.5:1 with the `*-text` ink. */
const STATUS_TINT: Record<CardKey, number> = { prospera: 0.18, signal: 0.2, runway: 0.16 };

const IDLE: Record<CardKey, boolean> = { prospera: false, signal: false, runway: false };
const LIVE: Record<CardKey, boolean> = { prospera: true, signal: true, runway: true };

export function ApplicationsSection() {
  const reducedMotion = usePrefersReducedMotion();
  // Vignette playback per card: true while the card is at least 35% in view.
  const [live, setLive] = useState(IDLE);
  const cardRefs = useRef<Partial<Record<CardKey, HTMLElement | null>>>({});
  const replayTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (reducedMotion || typeof IntersectionObserver === "undefined") {
      setLive(LIVE);
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        setLive((s) => {
          const next = { ...s };
          for (const e of entries)
            next[(e.target as HTMLElement).dataset.app as CardKey] = e.isIntersecting;
          return next;
        }),
      { threshold: 0.35 },
    );
    // Attach after first paint so the cards start hidden and play on entry.
    const attach = window.setTimeout(() => {
      Object.values(cardRefs.current).forEach((el) => el && io.observe(el));
    }, 400);
    return () => {
      window.clearTimeout(attach);
      window.clearTimeout(replayTimer.current);
      io.disconnect();
    };
  }, [reducedMotion]);

  const replay = (key: CardKey) => {
    if (reducedMotion || !live[key]) return;
    setLive((s) => ({ ...s, [key]: false }));
    window.clearTimeout(replayTimer.current);
    replayTimer.current = window.setTimeout(() => setLive((s) => ({ ...s, [key]: true })), 80);
  };

  return (
    <section
      id="apps"
      data-tone="light"
      className="scroll-mt-24 bg-cream py-[clamp(56px,7vw,96px)]"
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow={applicationsIntro.eyebrow}
          title={applicationsIntro.title}
          lede={applicationsIntro.lead}
        />
        <MaturityLegend />
        <div className="flex flex-col gap-14">
          {CARDS.map((app, i) => (
            <AppCard
              key={app.key}
              app={app}
              reverse={i % 2 === 1}
              active={reducedMotion || live[app.key]}
              onReplay={() => replay(app.key)}
              cardRef={(el) => {
                cardRefs.current[app.key] = el;
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function MaturityLegend() {
  const { legend } = applicationsIntro;
  const swatch = "h-[18px] w-[30px] flex-none rounded-[4px] border";
  return (
    <div className="-mt-4 mb-8 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-xs text-ink-muted-2">
      <span className="font-medium uppercase tracking-[0.14em]">{legend.label}</span>
      <span className="inline-flex items-center gap-2">
        <span
          aria-hidden
          className={`${swatch} border-dashed border-ink/40`}
          style={{ backgroundImage: blueprintGrid(0.16), backgroundSize: "6px 6px" }}
        />
        {legend.development}
      </span>
      <span className="inline-flex items-center gap-2">
        <span
          aria-hidden
          className={`${swatch} border-ink/20`}
          style={{ backgroundImage: blueprintGrid(0.07), backgroundSize: "6px 6px" }}
        />
        {legend.beta}
      </span>
      <span className="inline-flex items-center gap-2">
        <span aria-hidden className={`${swatch} border-ink/20 bg-white`} />
        {legend.released}
      </span>
    </div>
  );
}

/**
 * Whole-card button that opens the app's drawer. Text column first in the DOM except on Signal,
 * where the vignette sits on the left: `flex-wrap-reverse` keeps the text on top once stacked.
 */
function AppCard({
  app,
  reverse,
  active,
  onReplay,
  cardRef,
}: {
  app: AppRecord & { key: CardKey };
  reverse: boolean;
  active: boolean;
  onReplay: () => void;
  cardRef: (el: HTMLElement | null) => void;
}) {
  const show = useShowApp();
  const m = MATURITY[app.maturity];
  const vignette = <Vignette app={app.key} fill={app.fill} active={active} />;

  return (
    <article
      id={app.key}
      ref={cardRef}
      data-app={app.key}
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      aria-label={applicationsIntro.openDetails(app.name)}
      onClick={(e) => show(app.key, e.currentTarget)}
      onKeyDown={onButtonKey((el) => show(app.key, el))}
      onMouseEnter={onReplay}
      className={`flex scroll-mt-24 cursor-pointer overflow-hidden rounded-[32px] border bg-white transition-[box-shadow,transform] duration-[400ms] hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink motion-safe:hover:-translate-y-0.5 ${
        reverse ? "flex-wrap-reverse" : "flex-wrap"
      } ${m.border}`}
    >
      {reverse ? vignette : null}

      <div className="relative isolate flex min-w-0 flex-[5_1_340px] flex-col p-[clamp(28px,3.5vw,48px)]">
        {m.grid ? (
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              backgroundImage: m.grid,
              backgroundSize: "18px 18px",
              maskImage: m.mask,
              WebkitMaskImage: m.mask,
            }}
          />
        ) : null}

        <div className="flex items-center gap-3.5">
          <MarkDisc app={app} />
          <div className="min-w-0">
            <h3 className="font-display text-[32px] leading-none tracking-normal text-ink">
              {app.name}
            </h3>
            <div
              className="mt-1.5 text-xs font-medium uppercase tracking-[0.16em]"
              style={{ color: app.text }}
            >
              {app.n} · {app.subtitle}
            </div>
          </div>
        </div>

        <div className="mt-[22px] flex flex-wrap gap-2 text-xs uppercase tracking-[0.06em]">
          <span
            className="inline-flex items-center gap-2 rounded-full px-[13px] py-[7px] font-semibold"
            style={{ background: alpha(app.fill, STATUS_TINT[app.key]), color: app.text }}
          >
            <Dot color={app.fill} size={7} />
            {app.status}
          </span>
          <span className="inline-flex items-center rounded-full border border-ink/20 px-[13px] py-[7px] font-medium text-ink-body">
            {app.eligibility}
          </span>
        </div>

        <p className="mt-6 font-display text-[26px] leading-[1.2] text-ink text-pretty">
          {app.cardHeadline}
        </p>
        <p className="mt-3.5 text-base leading-[1.6] text-ink-body text-pretty">{app.cardBody}</p>
        <DotList
          items={app.cardBullets}
          color={app.fill}
          className="mt-6 flex flex-col gap-2.5 text-sm leading-[1.5] text-ink-muted"
        />

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
          <a
            href={app.url}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={pillInk}
          >
            {applicationsIntro.open(app.name)} <Arrow>↗</Arrow>
          </a>
          <span
            className="inline-flex items-center gap-2 px-1 py-[11px] text-sm font-medium"
            style={{ color: app.text }}
          >
            {applicationsIntro.details} <Arrow />
          </span>
        </div>
      </div>

      {reverse ? null : vignette}
    </article>
  );
}
