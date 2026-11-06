import { useId, useRef, useState } from "react";
import { ON_DARK_LABEL, TRANSITION, tint } from "@/components/research-development/lib";
import { Arrow } from "@/components/research-development/primitives";
import {
  hero,
  needByKey,
  needs,
  SERVICE_COLOR,
  startHereCta,
  trackStops,
  type NeedKey,
  type ServiceKey,
} from "@/data/research-operations";
import { Dot, FactRow, TeamAvatars } from "./primitives";

/**
 * "What does your research need?" picker: need chips (a radio group), the service track,
 * and the Start-here card. Selecting a need lights its services on the track and swaps the
 * card's content and colors without changing its height.
 */
export function NeedPicker() {
  const [need, setNeed] = useState<NeedKey>("samples");
  const current = needByKey(need);
  const lit = new Set<ServiceKey>(current.lit);
  const labelId = useId();
  const pillRefs = useRef<(HTMLButtonElement | null)[]>([]);

  /** Track stop → the first need whose primary service is that stop, else the first need listing it. */
  const pickService = (key: ServiceKey) => {
    const target = needs.find((n) => n.lit[0] === key) ?? needs.find((n) => n.lit.includes(key));
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
    <div>
      <div
        id={labelId}
        className="mt-7 text-[11px] font-medium uppercase tracking-[0.16em] lg:mt-9 lg:text-xs"
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
              className={`flex min-h-12 w-full items-center justify-between gap-3 rounded-[14px] border px-4 py-3 text-left text-[15px] font-medium ${TRANSITION} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:min-h-0 md:w-auto md:justify-start md:gap-2 md:whitespace-nowrap md:rounded-full md:px-5 md:py-[11px] ${
                active
                  ? "border-white bg-white text-ink"
                  : "border-white/30 bg-transparent text-white hover:border-white/60"
              }`}
            >
              <span>{n.chip}</span>
              <Dot color={SERVICE_COLOR[n.color].color} className="md:order-first" />
            </button>
          );
        })}
      </div>

      <ServiceTrack lit={lit} onPick={pickService} />
      <StartHereCard need={need} />
    </div>
  );
}

/* ───────── Service track (desktop only) ───────── */
function ServiceTrack({
  lit,
  onPick,
}: {
  lit: Set<ServiceKey>;
  onPick: (key: ServiceKey) => void;
}) {
  return (
    <div className="relative mx-auto mt-[52px] hidden max-w-[900px] lg:block">
      {/* The wedge: a light-to-deep scale, not a line. */}
      <div
        aria-hidden
        className="absolute left-[90px] right-[90px] top-[34px] h-3"
        style={{
          background: "linear-gradient(90deg, oklch(1 0 0 / 0.1), oklch(1 0 0 / 0.28))",
          clipPath: "polygon(0 42%, 100% 0, 100% 100%, 0 58%)",
        }}
      />
      <div className="relative flex justify-between gap-4 px-6">
        {trackStops.map((s) => {
          const on = lit.has(s.key);
          const { color } = SERVICE_COLOR[s.key];
          return (
            <div key={s.key} className="flex min-w-0 flex-1 basis-0 justify-center">
              <button
                type="button"
                onClick={() => onPick(s.key)}
                aria-pressed={on}
                // Name comes from the visible kicker + title (no aria-label), so the
                // accessible name always contains the visible label.
                className="group flex w-full max-w-[220px] flex-col items-center gap-2.5 rounded-xl text-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70"
              >
                <span
                  className="h-5 whitespace-nowrap text-xs uppercase tracking-[0.14em]"
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
                          background: color,
                          boxShadow: `0 0 0 6px ${tint(color, 0.25)}`,
                        }
                      : { width: 10, height: 10, margin: "5px 0", background: color, opacity: 0.5 }
                  }
                />
                <span
                  className={`font-display text-[20px] leading-[1.2] text-balance ${TRANSITION} ${
                    on ? "text-white" : "text-white/50 group-hover:text-white/75"
                  }`}
                >
                  {s.name}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ───────── Start-here card ─────────
 * From `md` up, every need's variant is rendered into the same grid cell and only the
 * active one is visible, so the header block and the facts table each reserve the height
 * of their tallest variant: the table starts at the same y for every selection.
 * Below `md` the chips sit above the card (nothing under the pointer can move), so the
 * card is a natural stack of the active variant only. */
function StartHereCard({ need }: { need: NeedKey }) {
  const current = needByKey(need);
  const active = SERVICE_COLOR[current.color];
  const variants = needs.map((n) => ({ need: n, service: SERVICE_COLOR[n.color] }));
  const stacked = (key: NeedKey, display = "block") =>
    `[grid-area:1/1] ${key === need ? `${display} visible` : `hidden md:${display} md:invisible`}`;

  return (
    <div
      className="mt-4 grid gap-6 rounded-[18px] bg-white px-5 pt-[22px] pb-5 text-[oklch(0.18_0.06_265)] lg:mt-11 lg:grid-cols-[6fr_5fr] lg:gap-12 lg:rounded-[20px] lg:px-8 lg:py-7"
      style={{ borderTop: `5px solid ${active.color}`, transition: "border-color 0.25s ease" }}
    >
      <div className="flex flex-col gap-3.5">
        <div className="grid">
          {variants.map(({ need: n, service: s }) => (
            <div key={n.key} className={stacked(n.key)}>
              <div
                className="text-[11px] font-medium uppercase tracking-[0.16em] lg:text-xs"
                style={{ color: s.textColor }}
              >
                {hero.startHere}
              </div>
              <h2 className="mt-2 font-display text-[26px] font-medium leading-[1.1] tracking-normal text-ink lg:text-[30px]">
                {n.title}
                {n.subtitle ? (
                  <span className="mt-1 block text-[18px] font-normal text-ink-muted-2">
                    {n.subtitle}
                  </span>
                ) : null}
              </h2>
              <p
                className="mt-2.5 text-[15px] leading-[1.5] text-pretty"
                style={{ color: "oklch(0.35 0.04 265)" }}
              >
                {n.body}
              </p>
              {n.alsoDrawsOn ? (
                <p className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[13px] leading-[1.4] text-ink-muted-2">
                  <span>{startHereCta.alsoDrawsOn}</span>
                  {n.alsoDrawsOn.map((key) => (
                    <span key={key} className="inline-flex items-center gap-1.5">
                      <Dot color={SERVICE_COLOR[key].color} size={8} />
                      {SERVICE_COLOR[key].label}
                    </span>
                  ))}
                </p>
              ) : null}
            </div>
          ))}
        </div>

        <div className="grid">
          {variants.map(({ need: n }) => (
            <dl
              key={n.key}
              className={`${stacked(n.key)} border-t border-ink/12 text-sm leading-[1.4]`}
            >
              {n.facts.map((f, i) => (
                <FactRow key={f.term} label={f.term} last={i === n.facts.length - 1}>
                  {f.text}
                </FactRow>
              ))}
            </dl>
          ))}
        </div>

        {/* Mobile: the scoping panel collapses to one full-width button. */}
        <a
          href={startHereCta.href}
          className="mt-1 flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink text-[15px] font-medium text-white transition-colors hover:bg-ink/90 lg:hidden"
        >
          {startHereCta.button} <Arrow />
        </a>
      </div>

      <div className="hidden lg:grid">
        {variants.map(({ need: n, service: s }) => (
          <div
            key={n.key}
            style={{ background: tint(s.color, 0.12) }}
            className={`${stacked(n.key, "flex")} flex-col justify-center rounded-[18px] p-5 ${TRANSITION}`}
          >
            <ScopeBox hint={n.ctaHint} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ScopeBox({ hint }: { hint: string }) {
  return (
    <div
      className="rounded-[14px] bg-white p-[18px]"
      style={{ boxShadow: "0 8px 24px oklch(0.14 0.06 265 / 0.08)" }}
    >
      <div className="flex items-center gap-3.5">
        <TeamAvatars size={36} overlap={10} />
        <div>
          <div className="text-[15px] font-semibold text-ink">{startHereCta.title}</div>
          <div className="mt-0.5 text-[13px] text-ink-muted-2">{hint}</div>
        </div>
      </div>
      <a
        href={startHereCta.href}
        className="mt-3.5 flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-[15px] font-medium text-white transition-colors hover:bg-ink/90"
      >
        {startHereCta.button} <Arrow />
      </a>
      <div className="mt-2.5 text-center text-xs text-ink-muted-2">{startHereCta.note}</div>
    </div>
  );
}
