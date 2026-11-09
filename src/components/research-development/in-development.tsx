import { inDevelopment, inDevelopmentCopy, links } from "@/data/research-development";
import { BLUEPRINT_MASK, blueprintGrid } from "./lib";
import { Arrow, Eyebrow, pillOutline } from "./primitives";

const GRID = blueprintGrid(0.07);
const MASK = BLUEPRINT_MASK;

export function InDevelopment() {
  return (
    <section className="relative isolate overflow-hidden border-y border-dashed border-ink/20 bg-paper py-10 md:py-20 lg:py-24">
      {/* Blueprint grid, fading toward the left */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: GRID,
          backgroundSize: "18px 18px",
          maskImage: MASK,
          WebkitMaskImage: MASK,
        }}
      />
      <div className="mx-auto max-w-7xl px-6 lg:grid lg:grid-cols-[5fr_7fr] lg:items-center lg:gap-20">
        <div>
          <Eyebrow>{inDevelopmentCopy.eyebrow}</Eyebrow>
          <h2 className="mb-3 font-display text-[28px] font-medium leading-[1.1] tracking-[-0.02em] text-ink text-pretty md:text-[36px] lg:mb-4 lg:text-[44px] lg:leading-[1.02]">
            {inDevelopmentCopy.heading}
          </h2>
          <p className="max-w-[400px] text-base text-ink-muted text-pretty">
            {inDevelopmentCopy.intro}
          </p>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2 md:gap-5 lg:mt-0">
          {inDevelopment.map((c) => (
            <div
              key={c.title}
              className="flex flex-col gap-3.5 rounded-2xl border border-dashed border-ink/30 bg-white/75 p-[18px] backdrop-blur-[2px] md:px-[30px] md:py-7 lg:rounded-[20px]"
            >
              <div className="flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.16em] text-ink-muted">
                <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: c.dot }} />
                {inDevelopmentCopy.label}
              </div>
              <h3 className="font-display text-xl font-medium leading-[1.1] tracking-normal text-ink md:text-[28px]">
                {c.title}
              </h3>
              <p className="text-[15px] text-ink-muted text-pretty">{c.body}</p>
              <div className="mt-auto pt-1.5">
                {/* TODO (OCR open item 4): destination for "Get notified" (e.g. newsletter signup). */}
                <a href={links.notify(c.title)} className={`${pillOutline} px-[18px] py-2.5`}>
                  {inDevelopmentCopy.button} <Arrow />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
