import { useState } from "react";
import { type FundingOpportunity } from "./lib";
import { Eyebrow, FundingSection, SectionTitle, focusRing } from "./primitives";

export function Faq({ award }: { award: FundingOpportunity }) {
  const items = award.faq;
  const [open, setOpen] = useState(0);
  if (!items || items.length === 0) return null;

  return (
    <FundingSection>
      <div className="flex flex-wrap gap-x-[72px] gap-y-6">
        <div className="min-w-0 flex-[1_1_260px]">
          <Eyebrow color={award.ink}>Questions</Eyebrow>
          <SectionTitle className="mt-3.5">Common questions</SectionTitle>
        </div>
        <div className="min-w-0 flex-[2_1_480px] border-t border-ink">
          {items.map((item, index) => {
            const isOpen = open === index;
            return (
              <div key={item.q} className="border-b border-rule">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  className={`flex w-full items-center justify-between gap-4 py-[18px] text-left text-[17px] font-medium text-ink ${focusRing}`}
                  onClick={() => setOpen(isOpen ? -1 : index)}
                >
                  {item.q}
                  <span
                    aria-hidden
                    className="grid size-7 shrink-0 place-items-center rounded-full text-base"
                    style={{ background: award.tint, color: award.ink }}
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen ? (
                  <div className="funding-faq-answer pb-5 pr-12 text-[15px] leading-[1.6] text-ink-muted">
                    {item.a}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </FundingSection>
  );
}
