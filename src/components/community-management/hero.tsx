import { useId, useRef, useState } from "react";
import { GradientBlob } from "@/components/research-development/hero";
import { FactRow } from "@/components/research-operations/primitives";
import { ON_DARK_LABEL, TRANSITION, tint } from "@/components/research-development/lib";
import {
  accent,
  CHIP_ORDER,
  hero,
  needByKey,
  NEEDS,
  STOPS,
  SVC,
  type NeedId,
  type ServiceId,
} from "@/data/community-management";
import { Arrow, Eyebrow, TeamAvatars } from "./primitives";

export function Hero({ defaultNeed = "launch" }: { defaultNeed?: NeedId }) {
  const [need, setNeed] = useState<NeedId>(defaultNeed);
  const current = needByKey(need);
  const col = accent(current.color);
  const lit = new Set<ServiceId>(current.lit);
  const labelId = useId();
  const pillRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const chips = CHIP_ORDER.map((k) => needByKey(k));

  const pickService = (id: ServiceId) => {
    const target = NEEDS.find((n) => n.lit[0] === id) ?? NEEDS.find((n) => n.lit.includes(id));
    if (target) setNeed(target.key);
  };

  const onPillKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const step: Record<string, number> = {
      ArrowRight: 1,
      ArrowDown: 1,
      ArrowLeft: -1,
      ArrowUp: -1,
    };
    let next: number | null = null;
    if (e.key in step) next = (index + step[e.key] + chips.length) % chips.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = chips.length - 1;
    if (next === null) return;
    e.preventDefault();
    setNeed(chips[next].key);
    pillRefs.current[next]?.focus();
  };

  return (
    <section data-tone="dark" className="relative isolate overflow-hidden bg-ink text-white">
      <GradientBlob />
      <div className="relative mx-auto max-w-7xl px-6 pt-[clamp(36px,5vw,60px)] pb-[clamp(32px,5vw,72px)]">
        <Eyebrow tone="dark" className="mb-0">
          {hero.eyebrow}
        </Eyebrow>
        <h1 className="mt-5 max-w-[860px] font-display text-[clamp(40px,5vw,60px)] font-medium leading-[1.04] tracking-[-0.02em] text-white text-pretty">
          {hero.title} <span className="text-lime">{hero.titleAccent}</span>
        </h1>
        <p className="mt-6 max-w-[640px] text-[clamp(16px,1.5vw,19px)] leading-[1.55] text-ondark-muted text-pretty">
          {hero.intro}
        </p>

        <div
          id={labelId}
          className="mt-9 text-xs font-medium uppercase tracking-[0.16em]"
          style={{ color: ON_DARK_LABEL }}
        >
          {hero.picker}
        </div>
        <div
          role="radiogroup"
          aria-labelledby={labelId}
          className="mt-3 flex flex-wrap gap-2.5"
        >
          {chips.map((n, i) => {
            const active = n.key === current.key;
            const c = accent(n.color);
            return (
              <button
                key={n.key}
                ref={(el) => {
                  pillRefs.current[i] = el;
                }}
                type="button"
                role="radio"
                aria-checked={active}
                tabIndex={active ? 0 : -1}
                onClick={() => setNeed(n.key)}
                onKeyDown={(e) => onPillKeyDown(e, i)}
                className={`inline-flex items-center gap-2 rounded-full border px-5 py-[11px] text-left text-[15px] font-medium leading-[1.3] ${TRANSITION} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                  active
                    ? "border-white bg-white text-ink"
                    : "border-white/30 bg-transparent text-white hover:border-white/60"
                }`}
              >
                <span
                  aria-hidden
                  className="h-2.5 w-2.5 flex-none rounded-full"
                  style={{ background: c.color }}
                />
                <span>{n.chip}</span>
              </button>
            );
          })}
        </div>

        <ServiceTrack lit={lit} onPick={pickService} />
        <StartHereCard need={need} color={col.color} text={col.text} />
      </div>
    </section>
  );
}

function ServiceTrack({ lit, onPick }: { lit: Set<ServiceId>; onPick: (id: ServiceId) => void }) {
  return (
    <div className="relative mx-auto mt-[52px] max-w-[1000px]">
      <div
        aria-hidden
        className="absolute top-[34px] right-[12%] left-[12%] h-3"
        style={{
          background: "linear-gradient(90deg, oklch(1 0 0 / 0.1), oklch(1 0 0 / 0.28))",
          clipPath: "polygon(0 42%, 100% 0, 100% 100%, 0 58%)",
        }}
      />
      <div className="relative grid grid-cols-4 gap-4">
        {STOPS.map((k) => {
          const s = SVC[k];
          const on = lit.has(k);
          return (
            <button
              key={k}
              type="button"
              aria-pressed={on}
              onClick={() => onPick(k)}
              className="flex min-w-0 flex-col items-center gap-2.5 text-center text-inherit focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70"
            >
              <span
                className="h-5 whitespace-nowrap text-[clamp(10px,1vw,12px)] uppercase tracking-[0.14em]"
                style={{ color: ON_DARK_LABEL }}
              >
                {s.kicker}
              </span>
              <span
                aria-hidden
                className={`rounded-full ${TRANSITION}`}
                style={
                  on
                    ? {
                        width: 14,
                        height: 14,
                        margin: "3px 0",
                        background: s.color,
                        boxShadow: `0 0 0 6px ${tint(s.color, 0.25)}`,
                      }
                    : { width: 10, height: 10, margin: "5px 0", background: s.color, opacity: 0.5 }
                }
              />
              <span
                className={`font-display text-[clamp(14px,1.6vw,20px)] leading-[1.2] text-balance ${TRANSITION} ${
                  on ? "text-white" : "text-white/50"
                }`}
              >
                {s.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StartHereCard({
  need,
  color,
  text,
}: {
  need: NeedId;
  color: string;
  text: string;
}) {
  const n = needByKey(need);
  return (
    <div
      className="mt-11 grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-8 gap-x-12 rounded-[20px] bg-white px-8 py-7 text-[oklch(0.18_0.06_265)]"
      style={{ borderTop: `5px solid ${color}`, transition: "border-color 0.25s ease" }}
    >
      <div className="flex flex-col gap-3.5">
        <div>
          <div className="text-xs font-medium uppercase tracking-[0.16em]" style={{ color: text }}>
            {hero.startHere}
          </div>
          <h2 className="mt-2 font-display text-[clamp(26px,2.4vw,30px)] font-medium leading-[1.1] text-ink">
            {n.title}
            {n.subtitle ? (
              <span className="mt-1 block text-lg font-normal text-ink-muted-2">{n.subtitle}</span>
            ) : null}
          </h2>
          <p
            className="mt-2.5 text-[15px] leading-[1.5] text-pretty"
            style={{ color: "oklch(0.35 0.04 265)" }}
          >
            {n.body}
          </p>
          {n.also.length > 0 ? (
            <p className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[13px] leading-[1.4] text-ink-muted-2">
              <span>{hero.alsoDrawsOn}</span>
              {n.also.map((k) => (
                <span key={k} className="inline-flex items-center gap-1.5">
                  <span
                    aria-hidden
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ background: SVC[k].color }}
                  />
                  {SVC[k].label}
                </span>
              ))}
            </p>
          ) : null}
        </div>
        <dl className="border-t border-ink/12 text-sm leading-[1.4]">
          {n.facts.map(([term, value], i) => (
            <FactRow key={term} label={term} labelWidth={84} padY={7} last={i === n.facts.length - 1}>
              {value}
            </FactRow>
          ))}
        </dl>
      </div>

      <div
        className={`flex flex-col justify-center rounded-[18px] p-5 ${TRANSITION}`}
        style={{ background: tint(color, 0.12) }}
      >
        <div
          className="rounded-[14px] bg-white p-[18px]"
          style={{ boxShadow: "0 8px 24px oklch(0.14 0.06 265 / 0.08)" }}
        >
          <div className="flex items-center gap-3.5">
            <TeamAvatars />
            <div>
              <div className="text-[15px] font-semibold text-ink">{hero.booking.title}</div>
              <div className="mt-0.5 text-[13px] text-ink-muted-2">{n.hint}</div>
            </div>
          </div>
          <a
            href={hero.booking.href}
            className="mt-3.5 flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-[15px] font-medium text-white transition-colors hover:bg-ink/90"
          >
            {hero.booking.button} <Arrow />
          </a>
          <div className="mt-2.5 text-center text-xs text-ink-muted-2">{hero.booking.caption}</div>
        </div>
      </div>
    </div>
  );
}
