import { useId, useRef, useState } from "react";
import {
  hero,
  links,
  placeholderOpenings,
  serviceById,
  services,
  stages,
  type ServiceId,
  type StageId,
} from "@/data/research-development";
import { lcFirst, ON_DARK_LABEL, TRANSITION, tint } from "./lib";
import { Arrow, StrategistAvatars } from "./primitives";

/**
 * "Where are you?" picker: stage pills (a radio group), the engagement wedge track,
 * and the Start-here card. Selecting a stage lights its primary + `also` services on
 * the track and swaps the card's content and colors without changing its height.
 */
export function StagePicker() {
  const [stage, setStage] = useState<StageId>("idea");
  const current = stages.find((s) => s.id === stage) ?? stages[0];
  const lit = new Set<ServiceId>([current.primary, ...current.also]);
  const labelId = useId();
  const pillRefs = useRef<(HTMLButtonElement | null)[]>([]);

  /** Track stop → the stage whose primary is that service, else the first stage listing it in `also`. */
  const pickService = (id: ServiceId) => {
    const target = stages.find((s) => s.primary === id) ?? stages.find((s) => s.also.includes(id));
    if (target) setStage(target.id);
  };

  const onPillKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const step: Record<string, number> = {
      ArrowRight: 1,
      ArrowDown: 1,
      ArrowLeft: -1,
      ArrowUp: -1,
    };
    let next: number | null = null;
    if (e.key in step) next = (index + step[e.key] + stages.length) % stages.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = stages.length - 1;
    if (next === null) return;
    e.preventDefault();
    setStage(stages[next].id);
    pillRefs.current[next]?.focus();
  };

  return (
    <div>
      <div
        id={labelId}
        className="mt-7 text-[11px] font-medium uppercase tracking-[0.16em] lg:mt-9 lg:text-xs"
        style={{ color: ON_DARK_LABEL }}
      >
        {hero.picker}
      </div>

      <div
        role="radiogroup"
        aria-labelledby={labelId}
        className="mt-3 flex flex-col gap-2 md:flex-row md:flex-wrap md:gap-2.5"
      >
        {stages.map((s, i) => {
          const active = s.id === stage;
          return (
            <button
              key={s.id}
              ref={(el) => {
                pillRefs.current[i] = el;
              }}
              type="button"
              role="radio"
              aria-checked={active}
              tabIndex={active ? 0 : -1}
              onClick={() => setStage(s.id)}
              onKeyDown={(e) => onPillKeyDown(e, i)}
              className={`flex min-h-12 w-full items-center justify-between gap-3 rounded-[14px] border px-4 py-3 text-left text-[15px] font-medium ${TRANSITION} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:min-h-0 md:w-auto md:justify-start md:gap-2 md:whitespace-nowrap md:rounded-full md:px-5 md:py-[11px] ${
                active
                  ? "border-white bg-white text-ink"
                  : "border-white/30 bg-transparent text-white hover:border-white/60"
              }`}
            >
              <span>{s.label}</span>
              <span
                aria-hidden
                className="h-2.5 w-2.5 flex-none rounded-full md:order-first"
                style={{ background: serviceById(s.primary).color }}
              />
            </button>
          );
        })}
      </div>

      <EngagementTrack lit={lit} onPick={pickService} />
      <StartHereCard stage={stage} />
    </div>
  );
}

/* ───────── Engagement track (desktop only) ───────── */
function EngagementTrack({
  lit,
  onPick,
}: {
  lit: Set<ServiceId>;
  onPick: (id: ServiceId) => void;
}) {
  return (
    <div className="relative mt-[52px] hidden lg:block">
      {/* The wedge: a light-to-deep scale, not a line. */}
      <div
        aria-hidden
        className="absolute left-[100px] right-[100px] top-[34px] h-3"
        style={{
          background: "linear-gradient(90deg, oklch(1 0 0 / 0.1), oklch(1 0 0 / 0.28))",
          clipPath: "polygon(0 42%, 100% 0, 100% 100%, 0 58%)",
        }}
      />
      <div className="relative flex justify-between px-20">
        {services.map((s) => {
          const on = lit.has(s.id);
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onPick(s.id)}
              aria-pressed={on}
              className="group flex min-w-0 flex-1 basis-0 flex-col items-center gap-2.5 rounded-xl text-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70 xl:w-[190px] xl:flex-none"
            >
              <span
                className="h-5 whitespace-nowrap text-xs uppercase tracking-[0.14em]"
                style={{ color: ON_DARK_LABEL }}
              >
                {s.when}
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
                className={`font-display text-[20px] leading-[1.2] ${TRANSITION} ${
                  on ? "text-white" : "text-white/50 group-hover:text-white/75"
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

/* ───────── Start-here card ─────────
 * From `md` up, every stage's variant is rendered into the same grid cell and only the
 * active one is visible, so the header block and the facts table each reserve the height
 * of their tallest variant: the table starts at the same y for every selection.
 * Below `md` the pills sit above the card (nothing under the pointer can move), so the
 * card is a natural stack of the active variant only, as in the mobile reference. */
function StartHereCard({ stage }: { stage: StageId }) {
  const current = stages.find((s) => s.id === stage) ?? stages[0];
  const active = serviceById(current.primary);
  const variants = stages.map((st) => ({ stage: st, service: serviceById(st.primary) }));
  const stacked = (id: StageId, display = "block") =>
    `[grid-area:1/1] ${id === stage ? `${display} visible` : `hidden md:${display} md:invisible`}`;

  return (
    <div
      className="mt-4 grid gap-6 rounded-[18px] bg-white px-5 pt-[22px] pb-5 text-[oklch(0.18_0.06_265)] lg:mt-11 lg:grid-cols-[6fr_5fr] lg:gap-12 lg:rounded-[20px] lg:px-8 lg:py-7"
      style={{ borderTop: `5px solid ${active.color}`, transition: "border-color 0.25s ease" }}
    >
      <div className="flex flex-col gap-3.5">
        <div className="grid">
          {variants.map(({ stage: st, service: s }) => (
            <div key={st.id} className={stacked(st.id)}>
              <div
                className="text-[11px] font-medium uppercase tracking-[0.16em] lg:text-xs"
                style={{ color: s.textColor }}
              >
                {hero.startHere}
              </div>
              <h2 className="mt-2 font-display text-[26px] font-medium leading-[1.1] tracking-normal text-ink lg:text-[30px]">
                {s.name}
              </h2>
              <p
                className="mt-2.5 text-[15px] leading-[1.5] text-pretty"
                style={{ color: "oklch(0.35 0.04 265)" }}
              >
                {s.description}
              </p>
            </div>
          ))}
        </div>

        <div className="grid">
          {variants.map(({ stage: st, service: s }) => (
            <dl
              key={st.id}
              className={`${stacked(st.id)} border-t border-ink/12 text-sm leading-[1.4]`}
            >
              <FactRow label="When">{s.when}</FactRow>
              {s.id !== "plan" ? <FactRow label="For whom">{s.who}</FactRow> : null}
              {s.id !== "plan" ? (
                <FactRow label="Format" className="hidden lg:grid">
                  {s.format}
                </FactRow>
              ) : null}
              <FactRow label="Cost" last>
                {s.cost}
                {s.costPartner ? <span> Partner institutes: {lcFirst(s.costPartner)}.</span> : null}
              </FactRow>
            </dl>
          ))}
        </div>

        {/* Mobile: the booking panel collapses to one full-width button. */}
        <a
          href={links.bookConsult}
          className="mt-1 flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink text-[15px] font-medium text-white transition-colors hover:bg-ink/90 lg:hidden"
        >
          {hero.booking.button} <Arrow />
        </a>
      </div>

      <div className="hidden lg:grid">
        {variants.map(({ stage: st, service: s }) => (
          <div
            key={st.id}
            style={{ background: tint(s.color, 0.12) }}
            className={`${stacked(st.id, "flex")} flex-col justify-center rounded-[18px] p-5 ${TRANSITION}`}
          >
            <BookingBox ask={s.ask} />
          </div>
        ))}
      </div>
    </div>
  );
}

function FactRow({
  label,
  children,
  last = false,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  last?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`grid grid-cols-[84px_1fr] gap-3.5 py-[7px] ${last ? "" : "border-b border-ink/8"} ${className}`}
    >
      <dt className="pt-[3px] text-[11px] uppercase tracking-[0.14em] text-ink-muted-2">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

function BookingBox({ ask }: { ask: string }) {
  return (
    <div
      className="rounded-[14px] bg-white p-[18px]"
      style={{ boxShadow: "0 8px 24px oklch(0.14 0.06 265 / 0.08)" }}
    >
      <div className="flex items-center gap-3.5">
        <StrategistAvatars size={36} overlap={10} />
        <div>
          <div className="text-[15px] font-semibold text-ink">{hero.booking.title}</div>
          <div className="mt-0.5 text-[13px] text-ink-muted-2">{ask}</div>
        </div>
      </div>
      {/* TODO (OCR open item 3): wire to the real scheduler. These openings are placeholders. */}
      <div className="mt-3.5 mb-2 text-[11px] uppercase tracking-[0.14em] text-ink-muted-2">
        {hero.booking.openings}
      </div>
      <div className="flex flex-wrap gap-2">
        {placeholderOpenings.chips.map((chip) => (
          <span
            key={chip}
            className="rounded-[10px] border border-ink/15 bg-white px-3 py-[7px] text-[13px] font-medium text-ink"
          >
            {chip}
          </span>
        ))}
      </div>
      <a
        href={links.bookConsult}
        className="mt-3.5 flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-[15px] font-medium text-white transition-colors hover:bg-ink/90"
      >
        {hero.booking.button} <Arrow />
      </a>
      <div className="mt-2.5 text-center text-xs text-ink-muted-2">{hero.booking.caption}</div>
    </div>
  );
}
