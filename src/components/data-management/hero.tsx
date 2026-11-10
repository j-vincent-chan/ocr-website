import { GradientBlob } from "@/components/research-development/hero";
import { hero, MAGENTA_ONDARK } from "@/data/data-management";
import { NeedPicker } from "./need-picker";
import { Eyebrow } from "./primitives";
import { RecordLedger } from "./record-ledger";

export function Hero() {
  return (
    <section data-tone="dark" className="relative isolate overflow-hidden bg-ink text-white">
      <GradientBlob className="-top-[240px] -right-[120px]" />
      <div className="mx-auto max-w-7xl px-6 pt-[clamp(36px,5vw,60px)] pb-[clamp(32px,5vw,72px)]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-x-16 gap-y-9">
          <div>
            <Eyebrow tone="dark" accent={MAGENTA_ONDARK} className="mb-0">
              {hero.eyebrow}
            </Eyebrow>
            <h1 className="mt-[18px] font-display text-[clamp(40px,4.7vw,60px)] font-medium leading-[1.05] tracking-[-0.02em] text-white text-pretty">
              {hero.headline.lead}
              <span style={{ color: MAGENTA_ONDARK }}>{hero.headline.accent}</span>
            </h1>
            <p className="mt-[22px] max-w-[640px] text-[clamp(16px,1.5vw,19px)] text-ondark-muted text-pretty">
              {hero.lead}
            </p>
          </div>
          <RecordLedger />
        </div>
        <NeedPicker />
      </div>
    </section>
  );
}
