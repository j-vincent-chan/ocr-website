import vincentImg from "@/assets/people/vincent-chan.jpg";
import { GradientBlob } from "@/components/research-development/hero";
import { Arrow } from "@/components/research-development/primitives";
import { getStarted } from "@/data/ai-tools";
import { Eyebrow } from "./primitives";

export function GetStarted() {
  const { card, partnership } = getStarted;
  return (
    <section
      id="start"
      tabIndex={-1}
      data-tone="dark"
      className="relative isolate scroll-mt-24 overflow-hidden bg-ink py-[clamp(48px,6vw,80px)] text-white outline-none"
    >
      <GradientBlob className="-top-[260px] -right-[140px]" />
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-[72px] gap-y-10 px-6">
        <div className="min-w-0 flex-[7_1_360px]">
          <Eyebrow tone="dark">{getStarted.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(32px,4.2vw,52px)] font-medium leading-[1.02] tracking-[-0.02em] text-white text-pretty">
            {getStarted.title}
          </h2>
          <p className="mt-5 max-w-[520px] text-[17px] leading-[1.6] text-ondark-muted text-pretty">
            {getStarted.intro}
          </p>
          <div className="mt-7 border-t border-white/14 pt-6 text-sm text-ondark-muted">
            {partnership.lead}{" "}
            <a
              href={partnership.href}
              className="rounded-sm text-white underline underline-offset-[3px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {partnership.label}
            </a>
          </div>
        </div>

        <div className="min-w-0 flex-[5_1_340px] rounded-[20px] border-t-[5px] border-t-amber bg-white p-7 text-[oklch(0.18_0.06_265)] shadow-[0_30px_60px_oklch(0.05_0.04_265/0.35)]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-medium uppercase tracking-[0.16em] text-amber-text">
                {card.eyebrow}
              </div>
              <div className="mt-1 font-display text-2xl leading-[1.15] text-ink">{card.title}</div>
            </div>
            <div className="text-right text-[13px] leading-[1.4] text-ink-muted-2">
              {card.meta[0]}
              <br />
              {card.meta[1]}
            </div>
          </div>

          <div className="mt-5 flex items-center gap-4 rounded-2xl bg-amber/16 px-4 py-3.5">
            <img
              src={vincentImg}
              alt=""
              width={52}
              height={52}
              className="h-[52px] w-[52px] flex-none rounded-full border-2 border-white bg-secondary object-cover shadow-[0_0_0_2px_var(--amber)]"
            />
            <div className="min-w-0">
              <div className="text-[11px] uppercase tracking-[0.14em] text-ink-muted-2">
                {card.meetLabel}
              </div>
              <div className="font-display text-xl leading-[1.2] text-ink">{card.name}</div>
              <div className="mt-0.5 text-[13px] text-amber-text">{card.role}</div>
            </div>
          </div>

          <a
            href={card.bookHref}
            target="_blank"
            rel="noreferrer"
            className="mt-4 flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-[15px] font-medium text-white transition-colors duration-[250ms] hover:bg-ink/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            {card.book} <Arrow />
          </a>
          <div className="mt-3.5 text-center text-[13px] text-ink-muted-2">
            {card.footer}{" "}
            <a href={`mailto:${card.email}`} className="text-ink underline underline-offset-[3px]">
              {card.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
