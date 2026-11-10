import { Link } from "@tanstack/react-router";
import { GradientBlob } from "@/components/research-development/hero";
import { ON_DARK_LABEL, tint } from "@/components/research-development/lib";
import { pillOutlineOnDark } from "@/components/research-development/primitives";
import { getStarted, MAGENTA, MAGENTA_ONDARK, MAGENTA_TEXT } from "@/data/data-management";
import { Arrow, Eyebrow, ReviewFlag, TeamAvatars } from "./primitives";

/**
 * Dark CTA with the magenta booking card (simpler than Research Operations:
 * no stage select — just avatars, host, book, and "useful to bring").
 */
export function GetStarted() {
  const { card } = getStarted;

  return (
    <section
      id="start"
      tabIndex={-1}
      data-tone="dark"
      className="relative isolate scroll-mt-24 overflow-hidden bg-ink py-[clamp(44px,6vw,72px)] text-white outline-none"
    >
      <GradientBlob className="-top-[260px] -right-[140px]" />
      <div className="mx-auto grid max-w-7xl grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-center gap-x-[72px] gap-y-10 px-6">
        <div>
          <Eyebrow tone="dark" accent={MAGENTA_ONDARK}>
            {getStarted.eyebrow}
          </Eyebrow>
          <h2 className="font-display text-[clamp(32px,4.2vw,52px)] font-medium leading-[1.03] tracking-[-0.02em] text-white text-pretty">
            {getStarted.title}
          </h2>
          <p className="mt-[18px] max-w-[480px] text-[clamp(15px,1.4vw,17px)] text-ondark-muted text-pretty">
            {getStarted.body}
          </p>

          <div className="mt-7 max-w-[480px] border-t border-white/14 pt-6">
            <div
              className="text-xs font-medium uppercase tracking-[0.16em]"
              style={{ color: ON_DARK_LABEL }}
            >
              {getStarted.partner.label}
            </div>
            <Link
              to={getStarted.partner.to}
              className={`${pillOutlineOnDark} mt-3 min-h-12 w-full md:min-h-0 md:w-auto`}
            >
              {getStarted.partner.button} <Arrow />
            </Link>
          </div>
        </div>

        <div
          className="rounded-[20px] bg-white px-5 pt-[22px] pb-5 text-[oklch(0.18_0.06_265)] md:px-7"
          style={{
            borderTop: `5px solid ${MAGENTA}`,
            boxShadow: "0 30px 60px oklch(0.05 0.04 265 / 0.35)",
          }}
        >
          <div className="flex flex-wrap items-center gap-4">
            <TeamAvatars size={40} overlap={12} people={card.avatars} />
            <div className="min-w-0 flex-1">
              <div
                className="text-xs font-medium uppercase tracking-[0.16em]"
                style={{ color: MAGENTA_TEXT }}
              >
                {card.eyebrow}
              </div>
              <div className="mt-0.5 font-display text-2xl leading-[1.15] text-ink">
                {card.title}
              </div>
            </div>
            <div className="shrink-0 text-right text-[13px] whitespace-nowrap text-ink-muted-2">
              {card.meta[0]}
              <br />
              {card.meta[1]}
              {card.metaFlag ? <ReviewFlag>{card.metaFlag}</ReviewFlag> : null}
            </div>
          </div>

          <div
            className="mt-5 flex items-center gap-4 rounded-2xl px-4 py-3.5"
            style={{ background: tint(MAGENTA, 0.1) }}
          >
            <div
              className="h-14 w-14 flex-none rounded-full p-[3px]"
              style={{ background: MAGENTA }}
            >
              <img
                src={card.host.photo}
                alt=""
                className="h-full w-full rounded-full border-2 border-white bg-secondary object-cover"
              />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] uppercase tracking-[0.14em] text-ink-muted-2">
                {card.hostLabel}
              </div>
              <div className="font-display text-xl leading-tight text-ink">{card.host.name}</div>
              <div className="mt-0.5 text-[13px]" style={{ color: MAGENTA_TEXT }}>
                {card.host.role}
              </div>
            </div>
          </div>

          <a
            href={card.bookingHref}
            target="_blank"
            rel="noreferrer"
            className="mt-4 flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-ink/90"
          >
            {card.button} <Arrow />
          </a>

          <p
            className="mt-4 rounded-2xl px-4 py-3.5 text-sm text-ink-muted text-pretty"
            style={{ background: tint(MAGENTA, 0.08) }}
          >
            {card.bring}
          </p>

          <div className="mt-3 text-center text-[13px] text-ink-muted-2">
            {card.note} · or email{" "}
            <a href={`mailto:${card.email}`} className="text-ink underline underline-offset-2">
              {card.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
