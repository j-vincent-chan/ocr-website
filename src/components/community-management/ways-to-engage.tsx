import { waysToEngage } from "@/data/community-management";
import { Eyebrow } from "./primitives";

export function WaysToEngage() {
  return (
    <section id="engage" className="bg-cream py-[clamp(48px,7vw,96px)]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-7 max-w-[640px] lg:mb-12">
          <Eyebrow>{waysToEngage.eyebrow}</Eyebrow>
          <h2 className="font-display text-[clamp(32px,4vw,48px)] font-medium leading-[1.04] tracking-[-0.02em] text-ink text-pretty">
            {waysToEngage.heading}
          </h2>
          <p className="mt-5 text-[clamp(16px,1.4vw,19px)] leading-[1.55] text-ink-body text-pretty">
            {waysToEngage.lede}
          </p>
        </div>
        <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-5">
          {waysToEngage.models.map((m) => (
            <li
              key={m.n}
              className="relative flex flex-col rounded-3xl border border-border bg-white p-8"
            >
              <span
                aria-hidden
                className="absolute top-0 right-8 left-8 h-0.5"
                style={{ background: m.color }}
              />
              <span
                className="text-[11px] font-medium uppercase tracking-[0.24em]"
                style={{ color: m.text }}
              >
                Model {m.n}
              </span>
              <h3 className="mt-5 font-display text-xl font-medium leading-[1.3] text-ink">
                {m.title}
              </h3>
              <p className="mt-4 text-sm leading-[1.6] text-ink-muted text-pretty">{m.body}</p>
              <div className="mt-auto pt-5">
                <div className="border-t border-border pt-4 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  {waysToEngage.inPractice}
                </div>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {m.chips.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-border bg-secondary/60 px-2.5 py-1 text-[11px] text-ink-body"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
