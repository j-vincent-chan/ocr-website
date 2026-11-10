import { useId, useRef, useState } from "react";
import { ON_DARK_LABEL, TRANSITION, tint } from "@/components/research-development/lib";
import {
  capabilities,
  DEFAULT_NEED,
  hero,
  needAccent,
  needByKey,
  needFacts,
  needs,
  scopeAvatars,
  startHere,
  startHereContent,
  type CapabilityKey,
  type Need,
} from "@/data/data-management";
import { Arrow, Dot, FactRow, ReviewFlag, TeamAvatars } from "./primitives";

/**
 * Need chips (radiogroup), capability track, and Start-here card.
 * Selecting a need lights its capabilities on the track and swaps the card without
 * changing its height (stacked-variant technique).
 */
export function NeedPicker() {
  const [need, setNeed] = useState(DEFAULT_NEED);
  const current = needByKey(need);
  const lit = new Set<CapabilityKey>(current.lit);
  const labelId = useId();
  const pillRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const pickCapability = (key: CapabilityKey) => {
    const target =
      needs.find((n) => n.lit.length === 1 && n.lit[0] === key) ??
      needs.find((n) => n.lit.includes(key));
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
    if (e.key in step) next = (index + step[e.key] + needs.length) % needs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = needs.length - 1;
    if (next === null) return;
    e.preventDefault();
    setNeed(needs[next].key);
    pillRefs.current[next]?.focus();
  };

  return (
    <div id="need" className="scroll-mt-24">
      <div
        id={labelId}
        className="mt-[clamp(28px,4vw,48px)] text-xs font-medium uppercase tracking-[0.16em]"
        style={{ color: ON_DARK_LABEL }}
      >
        {hero.pickerLabel}
      </div>

      <div
        role="radiogroup"
        aria-labelledby={labelId}
        className="mt-3 flex flex-col gap-2 md:flex-row md:flex-wrap md:gap-2.5"
      >
        {needs.map((n, i) => {
          const active = n.key === need;
          const accent = needAccent(n);
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
              className={`flex min-h-12 w-full items-center justify-between gap-3 rounded-[14px] border px-4 py-3 text-left text-[15px] font-medium ${TRANSITION} focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-magenta md:min-h-0 md:w-auto md:justify-start md:gap-2 md:whitespace-nowrap md:rounded-full md:px-5 md:py-[11px] ${
                active
                  ? "border-white bg-white text-ink"
                  : "border-white/30 bg-transparent text-white hover:border-white/60"
              }`}
            >
              <span>{n.chip}</span>
              <Dot color={accent.color} className="flex-none md:order-first" />
            </button>
          );
        })}
      </div>

      <CapabilityTrack lit={lit} onPick={pickCapability} />
      <StartHereCard needKey={need} />
    </div>
  );
}

function CapabilityTrack({
  lit,
  onPick,
}: {
  lit: Set<CapabilityKey>;
  onPick: (key: CapabilityKey) => void;
}) {
  return (
    <div className="relative mx-auto mt-[52px] hidden max-w-[1000px] lg:block">
      <div
        aria-hidden
        className="absolute top-[34px] right-[90px] left-[90px] h-3"
        style={{
          background: "linear-gradient(90deg, oklch(1 0 0 / 0.1), oklch(1 0 0 / 0.28))",
          clipPath: "polygon(0 42%, 100% 0, 100% 100%, 0 58%)",
        }}
      />
      <div className="relative flex justify-between gap-4 px-6">
        {capabilities.map((c) => {
          const on = lit.has(c.key);
          return (
            <div key={c.key} className="flex min-w-0 flex-1 basis-0 justify-center">
              <button
                type="button"
                onClick={() => onPick(c.key)}
                aria-pressed={on}
                className="group flex w-full max-w-[220px] flex-col items-center gap-2.5 rounded-xl text-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70"
              >
                <span
                  className="h-5 whitespace-nowrap text-xs uppercase tracking-[0.14em]"
                  style={{ color: ON_DARK_LABEL }}
                >
                  {c.kicker}
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
                          background: c.color,
                          boxShadow: `0 0 0 6px ${tint(c.color, 0.25)}`,
                          opacity: 1,
                        }
                      : {
                          width: 14,
                          height: 14,
                          margin: "3px 0",
                          background: c.color,
                          opacity: 0.5,
                        }
                  }
                />
                <span
                  className={`font-display text-[20px] leading-[1.2] text-balance ${TRANSITION} ${
                    on ? "text-white" : "text-white/50 group-hover:text-white/75"
                  }`}
                >
                  {c.short}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StartHereCard({ needKey }: { needKey: string }) {
  const accent = needAccent(needByKey(needKey));
  // From `md` up, every need's variant shares one grid cell so the card height stays stable.
  // Below `md` only the active variant renders (chips sit above the card).
  const stacked = (key: string, display = "block") =>
    `[grid-area:1/1] ${key === needKey ? `${display} visible` : `hidden md:${display} md:invisible`}`;

  return (
    <div
      className="mt-[clamp(16px,3.4vw,44px)] grid items-start gap-7 rounded-[20px] bg-white p-[clamp(20px,2.6vw,32px)] text-[oklch(0.18_0.06_265)] md:grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] md:gap-x-14"
      style={{ borderTop: `5px solid ${accent.color}`, transition: "border-color 0.25s ease" }}
    >
      <div className="flex flex-col">
        <div className="grid">
          {needs.map((n) => {
            const content = startHereContent(n);
            return (
              <div key={n.key} className={stacked(n.key)}>
                <div
                  className="text-xs font-medium uppercase tracking-[0.16em]"
                  style={{ color: content.textColor }}
                >
                  {startHere.eyebrow} · {content.num}
                </div>
                <h2 className="mt-2 font-display text-[clamp(26px,2.6vw,34px)] font-medium leading-[1.1] text-ink">
                  {content.name}
                </h2>
                <p className="mt-2 font-display text-[clamp(17px,1.6vw,19px)] leading-[1.35] text-ink-muted italic">
                  {content.tagline}
                </p>
                <p className="mt-3.5 text-[15px] leading-[1.55] text-ink-body text-pretty">
                  {n.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-[18px] grid">
          {needs.map((n) => (
            <dl
              key={n.key}
              className={`${stacked(n.key)} border-t border-ink/12 text-sm leading-[1.45]`}
            >
              {needFacts(n).map((f, i, arr) => (
                <FactRow key={f.term} label={f.term} last={i === arr.length - 1} padY={10}>
                  {f.text}
                  {f.flag ? <ReviewFlag>{f.flag}</ReviewFlag> : null}
                </FactRow>
              ))}
            </dl>
          ))}
        </div>
      </div>

      <div className="grid">
        {needs.map((n) => {
          const content = startHereContent(n);
          return (
            <div
              key={n.key}
              style={{ background: tint(content.color, content.tintAlpha) }}
              className={`${stacked(n.key, "block")} rounded-[18px] p-[clamp(16px,2vw,24px)] ${TRANSITION}`}
            >
              <ReceivePanel need={n} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ReceivePanel({ need }: { need: Need }) {
  const content = startHereContent(need);
  return (
    <>
      <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-body">
        {startHere.listLabel}
      </div>
      <ul className="mt-2.5 text-[15px] leading-[1.45] text-ink">
        {content.deliverables.map((d) => (
          <li
            key={d.text}
            className="flex items-start gap-3 border-t border-ink/12 py-2.5 first:border-t"
          >
            <Dot color={d.color} size={8} className="mt-[7px]" />
            <span>
              {d.text}
              {d.flag ? <ReviewFlag>{d.flag}</ReviewFlag> : null}
            </span>
          </li>
        ))}
      </ul>
      <div
        className="mt-3.5 rounded-[14px] bg-white p-[18px]"
        style={{ boxShadow: "0 8px 24px oklch(0.14 0.06 265 / 0.08)" }}
      >
        <div className="flex items-center gap-3.5">
          <TeamAvatars size={36} overlap={10} people={scopeAvatars} />
          <div>
            <div className="text-[15px] font-semibold text-ink">{startHere.scopeTitle}</div>
            <div className="mt-0.5 text-[13px] text-ink-muted-2">{need.ctaHint}</div>
          </div>
        </div>
        <a
          href={startHere.href}
          className="mt-3.5 flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink text-[15px] font-medium text-white transition-colors hover:bg-ink/90"
        >
          {startHere.button} <Arrow />
        </a>
        <div className="mt-2.5 text-center text-xs text-ink-muted-2">{startHere.note}</div>
      </div>
    </>
  );
}
