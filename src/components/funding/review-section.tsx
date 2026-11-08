import { num, type FundingOpportunity } from "./lib";
import { Eyebrow, FundingSection, SectionTitle } from "./primitives";

export function ReviewSection({ award }: { award: FundingOpportunity }) {
  return (
    <FundingSection>
      <div className="flex flex-wrap gap-x-[72px] gap-y-12">
        <div className="min-w-0 flex-[1_1_380px]">
          <Eyebrow color={award.ink}>Review</Eyebrow>
          <SectionTitle size="split" className="mb-3 mt-3.5">
            How proposals are judged
          </SectionTitle>
          <p className="mb-5 text-[15px] leading-[1.55] text-ink-muted">{award.reviewBy}</p>
          <ol className="border-t border-ink">
            {award.criteria.map((item, index) => (
              <li
                key={item}
                className="flex items-baseline gap-4 border-b border-rule py-[13px] text-[15px] leading-[1.5] text-foreground"
              >
                <span className="font-display text-[15px]" style={{ color: award.ink }}>
                  {num(index)}
                </span>
                {item}
              </li>
            ))}
          </ol>
        </div>
        {award.commitments ? (
          <div className="min-w-0 flex-[1_1_380px]">
            <Eyebrow color={award.ink}>If selected</Eyebrow>
            <SectionTitle size="split" className="mb-3 mt-3.5">
              What we ask of recipients
            </SectionTitle>
            <p className="mb-5 text-[15px] leading-[1.55] text-ink-muted">
              These opportunities build shared resources, so they come with a few commitments.
            </p>
            <ul className="border-t border-ink">
              {award.commitments.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3.5 border-b border-rule py-3.5 text-[15px] leading-[1.5] text-foreground"
                >
                  <span aria-hidden className="mt-px shrink-0" style={{ color: award.ink }}>
                    →
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
      {award.footnote ? (
        <p className="mt-7 text-xs leading-[1.55] text-muted-foreground">{award.footnote}</p>
      ) : null}
    </FundingSection>
  );
}
