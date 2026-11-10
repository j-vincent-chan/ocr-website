import { approach } from "@/data/data-management";
import { ReviewFlag, SectionHeader } from "./primitives";

export function Approach() {
  return (
    <section id="approach" className="scroll-mt-24 bg-cream py-[clamp(48px,7vw,96px)]">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow={approach.eyebrow} title={approach.title} lede={approach.lede} />

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-start gap-x-[72px] gap-y-8">
          <ul className="list-none border-t border-ink p-0">
            {approach.roles.map((r) => (
              <li
                key={r.who}
                className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,180px),1fr))] gap-x-6 gap-y-1 border-b border-rule py-[18px]"
              >
                <h3 className="font-display text-xl font-medium text-ink">{r.who}</h3>
                <p className="text-[15px] text-ink-muted">{r.how}</p>
              </li>
            ))}
          </ul>

          <div className="border-t border-ink pt-[18px]">
            <div className="text-[11px] uppercase tracking-[0.14em] text-ink-muted-2">
              {approach.boundary.label}
            </div>
            <p className="mt-2.5 font-display text-[clamp(19px,1.9vw,22px)] leading-[1.35] text-ink text-pretty">
              {approach.boundary.text}
              <ReviewFlag>{approach.boundary.flag}</ReviewFlag>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
