import { BLUEPRINT_MASK, blueprintGrid } from "@/components/research-development/lib";
import { Arrow, pillInk } from "@/components/research-development/primitives";
import { websites } from "@/data/ai-tools";
import { Eyebrow } from "./primitives";

const GRID = blueprintGrid(0.07);

const card =
  "flex flex-col gap-3 rounded-[20px] border border-dashed border-ink/30 bg-white/80 px-[30px] py-7";
const cardLabel = "text-xs font-medium uppercase tracking-[0.16em] text-amber-text";
const cardBody = "text-[15px] leading-[1.5] text-ink-muted text-pretty";
const wordFigure = "font-display text-[34px] font-medium leading-[1.1] tracking-[-0.02em] text-ink";

export function WebsitesSection({ showPrice = websites.showPrice }: { showPrice?: boolean }) {
  const { lab, program } = websites;
  return (
    <section
      id="websites"
      data-tone="light"
      className="relative isolate scroll-mt-24 overflow-hidden border-y border-dashed border-ink/20 bg-paper py-[clamp(48px,6vw,80px)]"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: GRID,
          backgroundSize: "18px 18px",
          maskImage: BLUEPRINT_MASK,
          WebkitMaskImage: BLUEPRINT_MASK,
        }}
      />
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-20 gap-y-8 px-6">
        <div className="min-w-0 flex-[5_1_340px]">
          <Eyebrow>{websites.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(28px,3.4vw,40px)] font-medium leading-[1.05] tracking-[-0.02em] text-ink text-pretty">
            {websites.title}
          </h2>
          <p className="mt-4 max-w-[440px] text-base leading-[1.6] text-ink-muted text-pretty">
            {websites.intro}
          </p>
          <div className="mt-6">
            <a href={websites.cta.href} className={pillInk}>
              {websites.cta.label} <Arrow />
            </a>
          </div>
        </div>

        <div className="grid min-w-0 flex-[7_1_400px] grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-5">
          <div className={card}>
            <div className={cardLabel}>{lab.label}</div>
            {showPrice ? (
              <div className="flex flex-wrap items-baseline gap-2.5">
                <span className="font-display text-[clamp(44px,4.5vw,56px)] font-medium leading-none tracking-[-0.03em] text-ink">
                  {lab.price}
                </span>
                <span className="text-sm text-ink-muted-2">{lab.priceNote}</span>
              </div>
            ) : (
              <div className={wordFigure}>{websites.hidePriceLabel}</div>
            )}
            <p className={cardBody}>{lab.body}</p>
          </div>
          <div className={card}>
            <div className={cardLabel}>{program.label}</div>
            <div className={wordFigure}>{program.price}</div>
            <p className={cardBody}>{program.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
