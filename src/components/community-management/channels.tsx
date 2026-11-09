import { channelsCopy } from "@/data/community-management";
import { SectionHeader } from "./primitives";

export function Channels() {
  return (
    <section id="channels" className="bg-paper py-[clamp(48px,7vw,96px)]">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow={channelsCopy.eyebrow}
          title={channelsCopy.heading}
          lede={channelsCopy.lede}
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-5">
          {channelsCopy.figures.map((fig) => (
            <figure key={fig.title} className="m-0">
              <div className="relative h-[260px] overflow-hidden rounded-2xl border border-border bg-cream">
                <img
                  src={fig.src}
                  alt=""
                  className="size-full object-cover"
                />
              </div>
              <figcaption className="mt-3">
                <span className="flex items-center gap-2 font-display text-lg font-medium leading-[1.2] text-ink">
                  <span aria-hidden className="h-2 w-2 rounded-full bg-teal-light" />
                  {fig.title}
                </span>
                <span className="mt-1 block text-[13px] leading-[1.5] text-ink-muted-2">
                  {fig.body}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
