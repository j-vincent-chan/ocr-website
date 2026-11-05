import { Link } from "@tanstack/react-router";
import { booking, links, placeholderOpenings } from "@/data/research-development";
import { GradientBlob } from "./hero";
import { ON_DARK_LABEL } from "./lib";
import { Arrow, Eyebrow, pillOutlineOnDark, pillWhite, StrategistAvatars } from "./primitives";

export function BookingSection() {
  return (
    <section
      data-tone="dark"
      className="relative isolate overflow-hidden bg-ink py-11 text-white md:py-16 lg:py-[72px]"
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

          {/* Mobile: stacked buttons instead of the scheduler card */}
          <div className="mt-5 flex flex-col gap-2.5 md:hidden">
            <a href={links.bookConsult} className={`${pillWhite} min-h-12`}>
              {booking.card.button} <Arrow />
            </a>
            <Link to={links.partnership} className={`${pillOutlineOnDark} min-h-12`}>
              {booking.partnershipButton} <Arrow />
            </Link>
          </div>

          <div className="mt-7 hidden max-w-[480px] border-t border-white/[0.14] pt-6 md:block">
            <div
              className="text-xs font-medium uppercase tracking-[0.16em]"
              style={{ color: ON_DARK_LABEL }}
            >
              {booking.institutesLabel}
            </div>
            <Link to={links.partnership} className={`${pillOutlineOnDark} mt-3`}>
              {booking.partnershipButton} <Arrow />
            </Link>
          </div>
        </div>

        <SchedulerCard />
      </div>
    </section>
  );
}

/** Styled to match the Start-here card: white, radius 20, 5px coral top border. */
function SchedulerCard() {
  return (
    <div
      className="mt-10 hidden rounded-[20px] bg-white px-7 pt-[22px] pb-5 text-[oklch(0.18_0.06_265)] md:mt-0 md:block"
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

      {/* TODO (OCR open item 3): wire these openings to a real scheduler (Calendly / Bookings / etc.).
          Until then they are placeholders: hide the chips or point the button at the scheduler URL. */}
      <div
        className="mt-4 rounded-2xl px-4 py-3.5"
        style={{ background: "oklch(0.72 0.19 30 / 0.12)" }}
      >
        <div className="mb-2.5 text-[11px] uppercase tracking-[0.14em] text-ink-muted-2">
          {booking.card.openings}
        </div>
        <div className="grid grid-cols-3 items-start gap-3">
          {placeholderOpenings.days.map((d) => (
            <div key={`${d.weekday}-${d.date}`} className="flex flex-col gap-1.5">
              <div className="pb-0.5 text-center">
                <div className="text-[11px] uppercase tracking-[0.14em] text-ink-muted-2">
                  {d.weekday}
                </div>
                <div className="font-display text-2xl leading-[1.1] text-ink">{d.date}</div>
                <div className="text-xs text-ink-muted-2">{d.month}</div>
              </div>
              {d.times.map((t) => (
                <span
                  key={t}
                  className="block rounded-[10px] border border-ink/15 bg-white py-[7px] text-center text-sm font-medium text-ink"
                >
                  {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <a
        href={links.bookConsult}
        className="mt-4 flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-ink/90"
      >
        {booking.card.button} <Arrow />
      </a>
      <div className="mt-2.5 text-center text-[13px] text-ink-muted-2">
        {booking.card.caption}{" "}
        <a
          href={`mailto:${booking.card.email}`}
          className="text-ink underline-offset-2 hover:underline"
        >
          {booking.card.email}
        </a>
      </div>
    </div>
  );
}
