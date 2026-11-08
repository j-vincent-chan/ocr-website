import { num, type FundingOpportunity } from "./lib";
import { Eyebrow, FundingSection, SectionTitle } from "./primitives";

export function HowToApply({ award }: { award: FundingOpportunity }) {
  return (
    <FundingSection>
      <Eyebrow color={award.ink}>How to apply</Eyebrow>
      <SectionTitle className="mb-9 mt-3.5">From first conversation to launch.</SectionTitle>
      <ol className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-7">
        {award.steps.map((step, index) => (
          <li
            key={step.t}
            className="relative pt-7"
            style={{ borderTop: `2px solid ${award.color}` }}
          >
            <span
              aria-hidden
              className="absolute left-0 top-[-8px] size-3.5 rounded-full"
              style={{ background: award.color, boxShadow: "0 0 0 5px var(--paper)" }}
            />
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-ink-muted-2">
              Step {num(index)}
            </p>
            <h3 className="mt-2 font-display text-[22px] font-medium leading-[1.2] text-ink">
              {step.t}
            </h3>
            <p className="mt-2 text-[15px] leading-[1.55] text-ink-muted">{step.d}</p>
          </li>
        ))}
      </ol>

      <div className="mt-11 flex flex-wrap gap-x-14 gap-y-6 rounded-3xl border border-ink/10 bg-white p-[clamp(24px,3vw,36px)]">
        <div className="min-w-0 flex-[1_1_220px]">
          <h3 className="font-display text-2xl font-medium leading-[1.15] text-ink">
            What to prepare
          </h3>
          <p className="mt-2.5 text-sm leading-[1.55] text-ink-muted-2">{award.prepareIntro}</p>
        </div>
        <ul className="grid min-w-0 flex-[3_1_420px] grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-x-8 gap-y-3">
          {award.prepare.map((item, index) => (
            <li key={item} className="flex gap-3 text-sm leading-[1.5] text-ink-body">
              <span className="min-w-[22px] font-display text-[15px]" style={{ color: award.ink }}>
                {num(index)}
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </FundingSection>
  );
}
