import { Arrow, pillInk } from "@/components/research-development/primitives";
import { appByKey, atlasSection, statusLine } from "@/data/ai-tools";
import { MarkDisc } from "./app-mark";
import { useShowApp } from "./lib";
import { DotList, Eyebrow, h2Class } from "./primitives";

export function AtlasSection() {
  const show = useShowApp();
  const atlas = appByKey("atlas");

  return (
    <section
      id="atlas"
      data-tone="light"
      className="scroll-mt-24 border-b border-border bg-paper py-[clamp(56px,7vw,96px)]"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-[72px] gap-y-10 px-6">
        <div className="min-w-0 flex-[5_1_340px]">
          <Eyebrow>{atlasSection.eyebrow}</Eyebrow>
          <h2 className={`mt-4 ${h2Class}`}>{atlasSection.title}</h2>
          <p className="mt-5 text-[17px] leading-[1.6] text-ink-body text-pretty">{atlas.body}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              aria-haspopup="dialog"
              onClick={(e) => show("atlas", e.currentTarget)}
              className={`${pillInk} cursor-pointer`}
            >
              {atlasSection.cta} <Arrow />
            </button>
          </div>
        </div>

        <div className="min-w-0 flex-[7_1_400px] rounded-[28px] border border-border bg-cream p-[clamp(24px,3vw,36px)]">
          <div className="flex flex-wrap items-center gap-4">
            <MarkDisc app={atlas} size={52} markSize={28} />
            <div>
              <div className="font-display text-[26px] leading-[1.1] text-ink">{atlas.name}</div>
              <div className="mt-[3px] text-[13px] text-ink-muted-2">{atlasSection.tagline}</div>
            </div>
            <span className="ml-auto font-mono text-xs text-muted-foreground">
              {statusLine(atlas)}
            </span>
          </div>
          <DotList
            items={atlas.activities}
            color={atlas.fill}
            className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-x-6 gap-y-2.5 text-sm leading-[1.5] text-ink-body"
          />
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-ink/10 pt-[18px] text-xs text-ink-muted-2">
            {atlasSection.sources.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
