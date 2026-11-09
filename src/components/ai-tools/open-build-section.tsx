import { Link } from "@tanstack/react-router";
import { Arrow, pillInk, pillOutline } from "@/components/research-development/primitives";
import { Dot, FactRow } from "@/components/research-operations/primitives";
import { EyebrowTrail } from "@/components/site/service-family";
import { openBuild } from "@/data/ai-tools";
import { ACCESS_DOT, AWARDS } from "@/data/funding";
import { h2Class } from "./primitives";

/** The Funding call that invites new tool proposals. All copy comes from the `ai-tools` award. */
const award = AWARDS.find((a) => a.id === openBuild.fundingId)!;

export function OpenBuildSection() {
  return (
    <section
      id="open-build"
      data-tone="light"
      className="scroll-mt-24 border-b border-border bg-cream py-[clamp(56px,7vw,96px)]"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-[72px] gap-y-10 px-6">
        <div className="min-w-0 flex-[6_1_360px]">
          <EyebrowTrail
            lead={openBuild.eyebrow}
            label={openBuild.name}
            accent="var(--teal-light)"
          />
          <h2 className={`mt-5 ${h2Class}`}>
            {award.headA} <span className="text-teal-text">{award.headB}</span>
          </h2>
          <p className="mt-5 max-w-[600px] text-[17px] leading-[1.6] text-ink-body text-pretty">
            {award.lead}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={award.applyHref} className={pillInk}>
              {openBuild.cta} <Arrow />
            </a>
            <Link to="/funding/$slug" params={{ slug: award.id }} className={pillOutline}>
              {openBuild.readMore}
            </Link>
          </div>
        </div>

        <div className="min-w-0 flex-[5_1_320px] rounded-3xl border border-t-[5px] border-border border-t-teal-light bg-white p-[clamp(22px,3vw,30px)]">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-2">
            <div className="font-display text-2xl leading-[1.15] text-ink">
              {openBuild.figureTitle}
            </div>
            <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-ink-muted-2">
              <Dot color={ACCESS_DOT.open} size={7} />
              {openBuild.accessLabel}
            </span>
          </div>
          <dl className="mt-[18px] border-t border-ink/12 text-sm leading-[1.45] text-ink-body">
            {award.facts.map(([k, v]) => (
              <FactRow key={k} label={k} labelWidth={88} padY={10}>
                {v}
              </FactRow>
            ))}
          </dl>
          <div className="mt-4 text-xs leading-[1.5] text-muted-foreground">
            {openBuild.officialPrefix} {award.official}
          </div>
        </div>
      </div>
    </section>
  );
}
