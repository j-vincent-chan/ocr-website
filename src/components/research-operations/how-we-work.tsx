import { howWeWork } from "@/data/research-operations";
import { SectionHeader } from "./primitives";

export function HowWeWork() {
  return (
    <section id="how" className="scroll-mt-24 bg-cream py-12 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow={howWeWork.eyebrow} title={howWeWork.title} lede={howWeWork.lead} />

        {/* Mobile: a ruled list */}
        <ol className="border-t border-ink md:hidden">
          {howWeWork.stages.map((p) => (
            <li key={p.n} className="border-b border-rule py-[18px]">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-[22px] font-normal tracking-normal text-ink">
                  <span className="text-teal-text">{p.n}</span> {p.title}
                </h3>
                <span className="text-[11px] uppercase tracking-[0.12em] text-ink-muted">
                  {p.label}
                </span>
              </div>
              <p className="mt-1.5 text-sm text-ink-muted text-pretty">{p.body}</p>
            </li>
          ))}
        </ol>

        {/* Tablet and up: three columns */}
        <ol className="hidden gap-8 md:grid md:grid-cols-3 lg:gap-12">
          {howWeWork.stages.map((p) => (
            <li key={p.n} className="border-t border-ink pt-6">
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-display text-[56px] leading-none text-teal-text">{p.n}</span>
                <span className="text-xs font-medium uppercase tracking-[0.14em] text-ink-muted">
                  {p.label}
                </span>
              </div>
              <h3 className="mt-5 mb-2.5 font-display text-[26px] font-medium tracking-normal text-ink">
                {p.title}
              </h3>
              <p className="text-[15px] leading-[1.55] text-ink-muted text-pretty">{p.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
