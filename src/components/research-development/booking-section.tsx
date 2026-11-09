import { useId, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  booking,
  bookingPages,
  links,
  partners,
  strategistFor,
  type InstituteChoice,
} from "@/data/research-development";
import { GradientBlob } from "./hero";
import { ON_DARK_LABEL, TRANSITION, tint } from "./lib";
import { Arrow, Eyebrow, pillOutlineOnDark, StrategistAvatars } from "./primitives";

export function BookingSection() {
  return (
    <section
      id="book"
      data-tone="dark"
      className="relative isolate scroll-mt-24 overflow-hidden bg-ink py-11 text-white md:py-16 lg:py-[72px]"
    >
      <GradientBlob className="-top-[260px] -right-[140px]" />
      <div className="mx-auto max-w-7xl px-6 md:grid md:grid-cols-2 md:items-center md:gap-12 lg:gap-[72px]">
        <div>
          <Eyebrow tone="dark">{booking.eyebrow}</Eyebrow>
          <h2 className="mb-3 font-display text-[32px] font-medium leading-[1.05] tracking-[-0.02em] text-white text-pretty md:text-[44px] lg:mb-5 lg:text-[52px] lg:leading-[1.02]">
            {booking.heading.before}{" "}
            <span className="whitespace-nowrap">{booking.heading.nowrap}</span>{" "}
            {booking.heading.after}
          </h2>
          <p className="max-w-[480px] text-[15px] text-ondark-muted text-pretty lg:text-[17px]">
            {booking.body}
          </p>

          <div className="mt-7 max-w-[480px] border-t border-white/[0.14] pt-6">
            <div
              className="text-xs font-medium uppercase tracking-[0.16em]"
              style={{ color: ON_DARK_LABEL }}
            >
              {booking.institutesLabel}
            </div>
            <Link
              to={links.partnership}
              className={`${pillOutlineOnDark} mt-3 min-h-12 w-full md:min-h-0 md:w-auto`}
            >
              {booking.partnershipButton} <Arrow />
            </Link>
          </div>
        </div>

        <SchedulerCard />
      </div>
    </section>
  );
}

/**
 * Styled to match the Start-here card: white, radius 20, 5px coral top border.
 * The visitor picks their institute; that selects the strategist (see `consultRouting`)
 * and links to that strategist's Microsoft Bookings page once its URL is set.
 */
function SchedulerCard() {
  const [choice, setChoice] = useState<InstituteChoice | "">("");
  const selectId = useId();
  const strategist = choice ? strategistFor(choice) : null;
  const instituteName =
    choice && choice !== "none" ? (partners.find((q) => q.id === choice)?.name ?? null) : null;
  const pageUrl = strategist ? bookingPages[strategist.id] : null;
  const firstName = strategist?.name.split(" ")[0] ?? "";

  return (
    <div
      className="mt-10 rounded-[20px] bg-white px-5 pt-[22px] pb-5 text-[oklch(0.18_0.06_265)] md:mt-0 md:px-7"
      style={{
        borderTop: "5px solid var(--coral)",
        boxShadow: "0 30px 60px oklch(0.05 0.04 265 / 0.35)",
      }}
    >
      <div className="flex items-center gap-4">
        <StrategistAvatars size={40} overlap={12} />
        <div className="flex-1">
          <div className="text-xs font-medium uppercase tracking-[0.16em] text-coral-text">
            {booking.card.eyebrow}
          </div>
          <div className="mt-0.5 font-display text-2xl leading-[1.15] text-ink">
            {booking.card.title}
          </div>
        </div>
        <div className="text-right text-[13px] text-ink-muted-2">
          {booking.card.meta[0]}
          <br />
          {booking.card.meta[1]}
        </div>
      </div>

      <label
        htmlFor={selectId}
        className="mt-5 block text-[11px] uppercase tracking-[0.14em] text-ink-muted-2"
      >
        {booking.card.instituteLabel}
      </label>
      <div className="relative mt-2">
        <select
          id={selectId}
          value={choice}
          onChange={(e) => setChoice(e.target.value as InstituteChoice)}
          className="min-h-12 w-full cursor-pointer appearance-none rounded-xl border border-ink/20 bg-white py-3 pr-11 pl-4 text-[15px] text-ink transition-colors hover:border-ink/40 focus-visible:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink/40"
        >
          <option value="" disabled>
            {booking.card.institutePlaceholder}
          </option>
          {partners.map((q) => (
            <option key={q.id} value={q.id}>
              {q.name}
            </option>
          ))}
          <option value="none">{booking.card.nonPartner}</option>
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
        {strategist ? (
          <>
            <div
              className={`mt-4 flex items-center gap-4 rounded-2xl px-4 py-3.5 ${TRANSITION}`}
              style={{ background: tint(strategist.color, 0.14) }}
            >
              <div
                className="h-14 w-14 flex-none rounded-full p-[3px]"
                style={{ background: strategist.color }}
              >
                {strategist.photo ? (
                  <img
                    src={strategist.photo}
                    alt=""
                    className="h-full w-full rounded-full border-2 border-white bg-secondary object-cover"
                  />
                ) : null}
              </div>
              <div className="min-w-0">
                <div className="text-[11px] uppercase tracking-[0.14em] text-ink-muted-2">
                  {booking.card.youllMeet}
                </div>
                <div className="font-display text-xl leading-tight text-ink">{strategist.name}</div>
                <div className="mt-0.5 text-[13px]" style={{ color: strategist.textColor }}>
                  {instituteName ? `Supports ${instituteName}` : booking.card.nonPartnerNote}
                </div>
              </div>
            </div>

            {pageUrl ? (
              <a
                href={pageUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-ink/90"
              >
                {booking.card.bookTime(firstName)} <span aria-hidden>↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : (
              <a
                href={links.consultRequest(strategist.name, instituteName)}
                className="mt-4 flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-ink/90"
              >
                {booking.card.requestTime(firstName)} <Arrow />
              </a>
            )}
          </>
        ) : (
          <p className="mt-4 rounded-2xl bg-[oklch(0.72_0.19_30/0.12)] px-4 py-3.5 text-sm text-ink-muted text-pretty">
            {booking.card.prompt}
          </p>
        )}
      </div>

      <div className="mt-2.5 text-center text-[13px] text-ink-muted-2">
        {booking.card.caption}{" "}
        <a
          href={`mailto:${booking.card.email}`}
          className="text-ink underline underline-offset-2"
        >
          {booking.card.email}
        </a>
      </div>
    </div>
  );
}
