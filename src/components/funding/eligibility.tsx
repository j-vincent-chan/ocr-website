import { Eyebrow, FundingSection, SectionTitle } from "./primitives";
import type { FundingOpportunity } from "./lib";

export function Eligibility({ award }: { award: FundingOpportunity }) {
  return (
    <FundingSection>
      <div className="flex flex-wrap gap-x-[72px] gap-y-12">
        <div className="min-w-0 flex-[1_1_380px]">
          <Eyebrow color={award.ink}>Eligibility</Eyebrow>
          <SectionTitle size="split" className="mb-5 mt-3.5">
            Who should apply
          </SectionTitle>
          <ul className="border-t border-ink">
            {award.eligibility.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3.5 border-b border-rule py-3.5 text-[15px] leading-[1.5] text-foreground"
              >
                <span
                  aria-hidden
                  className="mt-0.5 grid size-[18px] shrink-0 place-items-center rounded-full text-[11px]"
                  style={{ background: award.tint, color: award.ink }}
                >
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        {award.priority && award.priorityTitle ? (
          <div className="min-w-0 flex-[1_1_380px]">
            <Eyebrow color={award.ink}>{award.priorityEyebrow}</Eyebrow>
            <SectionTitle size="split" className="mb-5 mt-3.5">
              {award.priorityTitle}
            </SectionTitle>
            <ul className="border-t border-ink">
              {award.priority.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3.5 border-b border-rule py-3.5 text-[15px] leading-[1.5] text-foreground"
                >
                  <span
                    aria-hidden
                    className="mt-[7px] size-2 shrink-0 rounded-full"
                    style={{ background: award.color }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </FundingSection>
  );
}
