import { capabilityByKey, howWeWork, MAGENTA_TEXT } from "@/data/data-management";
import { Dot, SectionHeader } from "./primitives";

export function HowWeWork() {
  return (
    <section id="how" className="scroll-mt-24 bg-cream py-[clamp(48px,7vw,96px)]">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow={howWeWork.eyebrow}
          title={howWeWork.title}
          lede={howWeWork.lede}
          className="mb-[clamp(28px,4vw,56px)] lg:mb-[clamp(28px,4vw,56px)]"
        />

        <ol className="grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-x-12 gap-y-8 p-0">
          {howWeWork.stages.map((s) => (
            <li key={s.n} className="border-t border-ink pt-6">
              <div className="flex items-baseline justify-between gap-4">
                <span
                  className="font-display text-[56px] leading-none"
                  style={{ color: MAGENTA_TEXT }}
                >
                  {s.n}
                </span>
                <span className="text-xs font-medium uppercase tracking-[0.14em] text-ink-muted">
                  {s.label}
                </span>
              </div>
              <h3 className="mt-5 mb-2.5 font-display text-[26px] font-medium text-ink">
                {s.title}
              </h3>
              <p className="text-[15px] leading-[1.55] text-ink-muted text-pretty">{s.body}</p>
              <div className="mt-4 flex flex-wrap items-center gap-x-3.5 gap-y-1.5 text-[13px] text-ink-muted-2">
                <span>{howWeWork.drawsOn}</span>
                {s.drawsOn.map((key) => {
                  const c = capabilityByKey(key);
                  return (
                    <span key={key} className="inline-flex items-center gap-1.5">
                      <Dot color={c.color} size={8} />
                      {c.short}
                    </span>
                  );
                })}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
