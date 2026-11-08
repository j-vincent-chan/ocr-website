import { Link } from "@tanstack/react-router";
import { AWARDS } from "./lib";
import { Eyebrow, FundingSection, focusRing } from "./primitives";

export function OtherOpportunities({ currentId }: { currentId: string }) {
  const others = AWARDS.filter((award) => award.id !== currentId);
  return (
    <FundingSection padBottom>
      <Eyebrow>Other opportunities</Eyebrow>
      <div className="mt-[18px] grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
        {others.map((award) => (
          <Link
            key={award.id}
            to="/funding/$slug"
            params={{ slug: award.id }}
            className={`flex flex-col items-start gap-2 rounded-[18px] border border-ink/10 border-t-4 bg-white px-[22px] py-5 text-left transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_oklch(0.14_0.06_265/0.1)] ${focusRing}`}
            style={{ borderTopColor: award.color }}
          >
            <span
              className="text-[11px] font-medium uppercase tracking-[0.14em]"
              style={{ color: award.ink }}
            >
              {award.tag}
            </span>
            <span className="font-display text-[20px] leading-[1.2] text-ink">{award.short}</span>
            <span className="text-sm leading-[1.5] text-ink-muted-2">{award.oneLiner}</span>
            <span className="mt-1 text-sm font-medium text-ink">Learn more →</span>
          </Link>
        ))}
      </div>
    </FundingSection>
  );
}
