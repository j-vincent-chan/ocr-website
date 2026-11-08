import { num, type FundingOpportunity } from "./lib";
import { Eyebrow, FundingSection, SectionTitle } from "./primitives";

export function Provides({ award }: { award: FundingOpportunity }) {
  if (!award.provides || !award.providesTitle) return null;
  return (
    <FundingSection>
      <Eyebrow color={award.ink}>What you receive</Eyebrow>
      <SectionTitle className="mb-8 mt-3.5 max-w-[760px]">{award.providesTitle}</SectionTitle>
      <ol className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] border-t border-ink">
        {award.provides.map((item, index) => (
          <li key={item.t} className="border-b border-rule py-6 pr-7">
            <div className="font-display text-[28px]" style={{ color: award.ink }}>
              {num(index)}
            </div>
            <h3 className="mt-2.5 font-display text-[22px] font-medium leading-[1.2] text-ink">
              {item.t}
            </h3>
            <p className="mt-2 text-[15px] leading-[1.55] text-ink-muted">{item.d}</p>
          </li>
        ))}
      </ol>
    </FundingSection>
  );
}
