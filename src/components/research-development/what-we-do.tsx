import { whatWeDo } from "@/data/research-development";
import { Eyebrow } from "./primitives";

export function WhatWeDo() {
  return (
    <section className="bg-paper py-12 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-7 lg:mb-14 lg:grid lg:grid-cols-[5fr_7fr] lg:items-end lg:gap-[72px]">
          <div>
            <Eyebrow>{whatWeDo.eyebrow}</Eyebrow>
            <h2 className="font-display text-[32px] font-medium leading-[1.08] tracking-[-0.02em] text-ink text-pretty md:text-[40px] lg:text-[48px] lg:leading-[1.02]">
              {whatWeDo.heading}
            </h2>
          </div>
          <p className="mt-3.5 text-base leading-[1.55] text-ink-body text-pretty lg:mt-0 lg:text-[19px]">
            {whatWeDo.intro}
          </p>
        </div>

        {/* Mobile: a ruled list */}
        <ol className="border-t border-ink md:hidden">
          {whatWeDo.passes.map((p) => (
            <li key={p.n} className="border-b border-rule py-[18px]">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-[22px] font-normal tracking-normal text-ink">
                  <span className="text-coral-text">{p.n}</span> {p.title}
                </h3>
                <span className="text-[11px] uppercase tracking-[0.12em] text-ink-muted">
                  {p.when}
                </span>
              </div>
              <p className="mt-1.5 text-sm text-ink-muted text-pretty">{p.body}</p>
            </li>
          ))}
        </ol>

        {/* Tablet and up: three columns */}
        <ol className="hidden gap-8 md:grid md:grid-cols-3 lg:gap-12">
          {whatWeDo.passes.map((p) => (
            <li key={p.n} className="border-t border-ink pt-6">
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-display text-[56px] leading-none text-coral-text">{p.n}</span>
                <span className="text-xs font-medium uppercase tracking-[0.14em] text-ink-muted">
                  {p.when}
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
