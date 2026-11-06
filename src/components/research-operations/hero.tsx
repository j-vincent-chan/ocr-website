import { GradientBlob } from "@/components/research-development/hero";
import { hero, TEAL } from "@/data/research-operations";
import { NeedPicker } from "./need-picker";
import { Eyebrow } from "./primitives";

export function Hero() {
  return (
    <section data-tone="dark" className="relative isolate overflow-hidden bg-ink text-white">
      <GradientBlob />
      <div className="mx-auto max-w-7xl px-6 pt-9 pb-8 lg:pt-[60px] lg:pb-[72px]">
        <Eyebrow tone="dark" className="mb-0">
          {hero.eyebrow}
        </Eyebrow>
        <h1 className="mt-3.5 max-w-[860px] font-display text-[40px] font-medium leading-[1.05] tracking-[-0.02em] text-white text-pretty md:text-[52px] lg:mt-5 lg:text-[60px] lg:leading-[1.04]">
          {hero.headline.lead}
          <span style={{ color: TEAL }}>{hero.headline.accent}</span>
        </h1>
        <p className="mt-4 max-w-[640px] text-base text-ondark-muted text-pretty lg:mt-6 lg:text-[19px]">
          {hero.lead}
        </p>
        <NeedPicker />
      </div>
    </section>
  );
}
