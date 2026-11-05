import { hero } from "@/data/research-development";
import { Eyebrow } from "./primitives";
import { StagePicker } from "./stage-picker";

/** Blurred coral → magenta → violet → teal blob behind the top right of dark sections. */
export function GradientBlob({ className = "-top-60 -right-30" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute -z-10 h-[720px] w-[720px] rounded-full opacity-[0.42] blur-[70px] ${className}`}
      style={{ background: "var(--gradient-sunburst)" }}
    />
  );
}

export function Hero() {
  return (
    <section data-tone="dark" className="relative isolate overflow-hidden bg-ink text-white">
      <GradientBlob />
      <div className="mx-auto max-w-7xl px-6 pt-9 pb-8 lg:pt-[60px] lg:pb-[72px]">
        <Eyebrow tone="dark" className="mb-0">
          {hero.eyebrow}
        </Eyebrow>
        <h1 className="mt-3.5 max-w-[860px] font-display text-[40px] font-medium leading-[1.05] tracking-[-0.02em] text-white text-pretty md:text-[52px] lg:mt-5 lg:text-[60px] lg:leading-[1.04]">
          {hero.title} <span className="text-coral">{hero.titleAccent}</span>
        </h1>
        <p className="mt-4 max-w-[640px] text-base text-ondark-muted text-pretty lg:mt-6 lg:text-[19px]">
          {hero.intro}
        </p>
        <StagePicker />
      </div>
    </section>
  );
}
