import { Eyebrow, FundingSection, SectionTitle } from "./primitives";
import type { FundingOpportunity } from "./lib";

export function Spotlight({ award }: { award: FundingOpportunity }) {
  const spot = award.spot;
  if (!spot) return null;
  return (
    <FundingSection>
      <div
        className="rounded-[28px] px-[clamp(28px,4vw,48px)] py-[clamp(28px,4vw,48px)]"
        style={{ background: award.tint }}
      >
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-3">
          <div className="max-w-[640px]">
            <Eyebrow color={award.ink}>{spot.eyebrow}</Eyebrow>
            <SectionTitle className="mt-3.5">{spot.title}</SectionTitle>
          </div>
          <p className="max-w-[460px] text-[15px] leading-[1.55] text-ink-body">{spot.intro}</p>
        </div>
        <div
          className="mt-7 grid gap-4"
          style={{
            gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${spot.min}), 1fr))`,
          }}
        >
          {spot.cards.map((card) => (
            <article key={card.t} className="rounded-[18px] bg-white px-6 py-[22px] shadow-soft">
              <p
                className="text-[11px] font-medium uppercase tracking-[0.14em]"
                style={{ color: award.ink }}
              >
                {card.tag}
              </p>
              <h3 className="mt-2 font-display text-[21px] font-medium leading-[1.2] text-ink">
                {card.t}
              </h3>
              <p className="mt-2 text-sm leading-[1.55] text-ink-muted">{card.d}</p>
              {card.list ? (
                <ul className="mt-3.5 flex flex-col gap-2 border-t border-ink/8 pt-3.5">
                  {card.list.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm leading-[1.45] text-ink-body">
                      <span
                        aria-hidden
                        className="mt-2 size-[5px] shrink-0 rounded-full"
                        style={{ background: award.color }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </FundingSection>
  );
}
