import { Link } from "@tanstack/react-router";
import { AWARDS, type FundingPartner } from "@/data/funding";
import { accessDot, accessLabel, kindLabel, PARTNERS, type FundingOpportunity } from "./lib";
import {
  Eyebrow,
  FundingSection,
  FundingSprite,
  OutLink,
  PillDot,
  SectionTitle,
  inkPillClass,
} from "./primitives";

export function Ledger() {
  return (
    <FundingSection padBottom>
      <div className="mb-9 flex flex-wrap items-end justify-between gap-x-12 gap-y-4">
        <div>
          <Eyebrow>Opportunities</Eyebrow>
          <SectionTitle size="ledger" className="mt-3.5">
            Opportunities from OCR and our partners.
          </SectionTitle>
        </div>
        <p className="max-w-[440px] text-[15px] leading-[1.55] text-ink-muted">
          Some are our own; others come from partners whose programs we help run. Each has its own
          page with eligibility, what to prepare, and how proposals are reviewed.
        </p>
      </div>

      <GroupHeading
        title="From OCR"
        description="Funded and run by the Office of Collaborative Research."
      />
      <AwardList awards={AWARDS.filter((award) => award.owner === "ocr")} />

      <div className="h-20" aria-hidden />

      <GroupHeading
        title="From our partners"
        description="Offered by our partners. OCR helps applicants prepare and supports recipients."
      />
      <div className="flex flex-col gap-16">
        {PARTNERS.map((partner) => {
          const awards = AWARDS.filter((award) => award.partner === partner.key);
          if (awards.length === 0) return null;
          return (
            <div key={partner.key}>
              <PartnerHeader partner={partner} />
              <AwardList awards={awards} />
            </div>
          );
        })}
      </div>
    </FundingSection>
  );
}

function GroupHeading({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-5 flex flex-wrap items-baseline gap-x-4 gap-y-1.5 border-b border-ink pb-3.5">
      <h3 className="font-display text-2xl font-medium leading-[1.2] text-ink">{title}</h3>
      <p className="text-sm leading-[1.5] text-ink-muted-2">{description}</p>
    </div>
  );
}

function PartnerHeader({ partner }: { partner: FundingPartner }) {
  return (
    <div className="mb-[18px] flex flex-wrap items-center justify-between gap-x-6 gap-y-2.5">
      <div className="flex min-w-0 items-center gap-3.5">
        <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-ink font-display text-[15px] text-white">
          {partner.initials}
        </div>
        <div className="min-w-0">
          <div className="font-display text-[21px] leading-[1.2] text-ink">{partner.name}</div>
          <p className="mt-0.5 text-[13px] leading-[1.45] text-ink-muted-2">{partner.blurb}</p>
        </div>
      </div>
      {partner.href ? (
        <OutLink href={partner.href} className="text-sm font-medium text-ink">
          {partner.linkLabel} ↗
        </OutLink>
      ) : null}
    </div>
  );
}

function AwardList({ awards }: { awards: FundingOpportunity[] }) {
  return (
    <div>
      {awards.map((award) => (
        <LedgerRow key={award.id} award={award} />
      ))}
    </div>
  );
}

function LedgerRow({ award }: { award: FundingOpportunity }) {
  return (
    <article className="grid grid-cols-[72px_minmax(0,1fr)] items-center gap-6 border-b border-rule py-9">
      <FundingSprite id={award.id} color={award.color} />
      <div className="flex flex-wrap items-center gap-x-10 gap-y-5">
        <div className="min-w-0 flex-[1_1_300px]">
          <div className="mb-2 flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <span
              className="min-w-0 flex-[0_1_auto] truncate text-[11px] font-medium uppercase tracking-[0.14em]"
              style={{ color: award.ink }}
            >
              {award.sponsor}
            </span>
            <MetaPill>
              <PillDot color={award.color} />
              {award.status}
            </MetaPill>
            <MetaPill title={award.restricted ? award.restrictedTo : undefined}>
              <PillDot color={accessDot(award.restricted)} />
              {accessLabel(award.restricted)}
            </MetaPill>
          </div>
          <h3 className="font-display text-2xl font-medium leading-[1.15] text-balance text-ink">
            {award.short}
          </h3>
          <p className="mt-1.5 text-sm leading-[1.5] text-ink-muted">{award.oneLiner}</p>
        </div>

        <dl className="grid flex-[1_1_320px] grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-x-5 gap-y-3">
          <Fact term={kindLabel(award.id)} detail={award.figure} />
          <Fact term="For" detail={award.who} />
          <Fact term="Deadline" detail={award.deadline} />
        </dl>

        <Link
          to="/funding/$slug"
          params={{ slug: award.id }}
          className={`${inkPillClass} shrink-0 px-5 py-[11px] text-sm lg:ml-auto`}
        >
          Learn more →
        </Link>
      </div>
    </article>
  );
}

function MetaPill({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <span
      title={title}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-ink/10 bg-white px-2.5 py-[3px] text-xs font-medium text-foreground"
    >
      {children}
    </span>
  );
}

function Fact({ term, detail }: { term: string; detail: string }) {
  return (
    <div>
      <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-muted-2">
        {term}
      </dt>
      <dd className="mt-1 text-sm leading-[1.4] text-foreground">{detail}</dd>
    </div>
  );
}
