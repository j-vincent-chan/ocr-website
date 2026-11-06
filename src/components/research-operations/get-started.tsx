import { useId, useState } from "react";
import { Link } from "@tanstack/react-router";
import { GradientBlob } from "@/components/research-development/hero";
import { ON_DARK_LABEL, TRANSITION, tint } from "@/components/research-development/lib";
import { Arrow, pillOutlineOnDark } from "@/components/research-development/primitives";
import { getStarted, mailto, TEAL, type StageKey } from "@/data/research-operations";
import { Eyebrow, TeamAvatars } from "./primitives";

export function GetStarted() {
  return (
    <section
      id="start"
      tabIndex={-1}
      data-tone="dark"
      className="relative isolate scroll-mt-24 overflow-hidden bg-ink py-11 text-white outline-none md:py-16 lg:py-[72px]"
    >
      <GradientBlob className="-top-[260px] -right-[140px]" />
      <div className="mx-auto max-w-7xl px-6 md:grid md:grid-cols-2 md:items-center md:gap-12 lg:gap-[72px]">
        <div>
          <Eyebrow tone="dark">{getStarted.eyebrow}</Eyebrow>
          <h2 className="mb-3 font-display text-[32px] font-medium leading-[1.05] tracking-[-0.02em] text-white text-pretty md:text-[44px] lg:mb-5 lg:text-[52px] lg:leading-[1.02]">
            {getStarted.title}
          </h2>
          <p className="max-w-[480px] text-[15px] text-ondark-muted text-pretty lg:text-[17px]">
            {getStarted.body}
          </p>

          <div className="mt-7 max-w-[480px] border-t border-white/[0.14] pt-6">
            <div
              className="text-xs font-medium uppercase tracking-[0.16em]"
              style={{ color: ON_DARK_LABEL }}
            >
              {getStarted.partnerBlock.label}
            </div>
            <Link
              to={getStarted.partnerBlock.to}
              className={`${pillOutlineOnDark} mt-3 min-h-12 w-full md:min-h-0 md:w-auto`}
            >
              {getStarted.partnerBlock.cta} <Arrow />
            </Link>
          </div>
        </div>

        <ScopeCard />
      </div>
    </section>
  );
}

/**
 * Styled to match the Start-here card: white, radius 20, 5px teal top border.
 * The visitor picks where their research is; the hint and the mailto subject follow.
 * No booking system: everything goes through email or /contact.
 */
function ScopeCard() {
  const [stage, setStage] = useState<StageKey | "">("");
  const selectId = useId();
  const current = stage ? getStarted.stages.find((s) => s.key === stage) : null;
  const { card } = getStarted;

  return (
    <div
      className="mt-10 rounded-[20px] bg-white px-5 pt-[22px] pb-5 text-[oklch(0.18_0.06_265)] md:mt-0 md:px-7"
      style={{
        borderTop: `5px solid ${TEAL}`,
        boxShadow: "0 30px 60px oklch(0.05 0.04 265 / 0.35)",
      }}
    >
      <div className="flex items-center gap-4">
        <TeamAvatars size={40} overlap={12} />
        <div className="min-w-0 flex-1">
          <div className="text-xs font-medium uppercase tracking-[0.16em] text-teal-text">
            {card.eyebrow}
          </div>
          <div className="mt-0.5 font-display text-2xl leading-[1.15] text-ink md:text-[22px] lg:text-2xl">
            {card.title}
          </div>
        </div>
        <div className="shrink-0 text-right text-[13px] whitespace-nowrap text-ink-muted-2">
          {card.side[0]}
          <br />
          {card.side[1]}
        </div>
      </div>

      <label
        htmlFor={selectId}
        className="mt-5 block text-[11px] uppercase tracking-[0.14em] text-ink-muted-2"
      >
        {card.selectLabel}
      </label>
      <div className="relative mt-2">
        <select
          id={selectId}
          value={stage}
          onChange={(e) => setStage(e.target.value as StageKey)}
          className="min-h-12 w-full cursor-pointer appearance-none rounded-xl border border-ink/20 bg-white py-3 pr-11 pl-4 text-[15px] text-ink transition-colors hover:border-ink/40 focus-visible:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink/40"
        >
          <option value="" disabled>
            {card.placeholder}
          </option>
          {getStarted.stages.map((s) => (
            <option key={s.key} value={s.key}>
              {s.label}
            </option>
          ))}
        </select>
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-ink-muted-2"
        >
          <path
            d="M4 6l4 4 4-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div aria-live="polite">
        {current ? (
          <>
            <div
              className={`mt-4 rounded-2xl p-4 ${TRANSITION}`}
              style={{ background: tint(TEAL, 0.12) }}
            >
              <div className="text-[11px] uppercase tracking-[0.14em] text-ink-muted-2">
                {card.includeLabel}
              </div>
              <p className="mt-1.5 text-sm leading-[1.5] text-ink-body">{current.include}</p>
            </div>
            <a
              href={mailto(current.subject)}
              className="mt-4 flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-ink/90"
            >
              {current.button} <Arrow />
            </a>
          </>
        ) : (
          <p
            className="mt-4 rounded-2xl px-4 py-3.5 text-sm text-ink-muted text-pretty"
            style={{ background: tint(TEAL, 0.12) }}
          >
            {card.emptyHint}
          </p>
        )}
      </div>

      <div className="mt-3 text-center text-[13px] text-ink-muted-2">
        {card.note}{" "}
        <a href={`mailto:${card.email}`} className="text-ink underline-offset-2 hover:underline">
          {card.email}
        </a>
      </div>
    </div>
  );
}
