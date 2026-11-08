import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { SHOW_REVIEW_NOTES, ownerLine, type FundingOpportunity } from "./lib";
import { OutLink, PillDot, focusRing, glanceShadow, inkPillClass } from "./primitives";

export function DetailHero({ award }: { award: FundingOpportunity }) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[120px] -top-60 size-[720px] rounded-full bg-gradient-sunburst opacity-[0.42] blur-[70px]"
      />
      <div
        className="relative mx-auto max-w-7xl px-6 pb-[72px]"
        style={{ paddingTop: "clamp(28px, 4vw, 44px)" }}
      >
        <p className="flex items-center gap-2 text-[13px] text-white/60">
          <Link
            to="/funding"
            activeOptions={{ exact: true }}
            className={`text-ondark-muted hover:text-white hover:underline ${focusRing}`}
          >
            Funding & Support
          </Link>
          <span aria-hidden>/</span>
          <span aria-current="page">{award.short}</span>
        </p>

        <div className="mt-7 flex flex-wrap items-start gap-x-16 gap-y-10">
          <div className="min-w-0 flex-[7_1_440px]">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5">
              <span
                className="text-xs font-medium uppercase tracking-[0.18em]"
                style={{ color: award.color }}
              >
                {award.sponsor}
              </span>
              <DarkPill>
                <PillDot color={award.color} />
                {award.status}
              </DarkPill>
              {award.restricted ? (
                <DarkPill title={award.restrictedTo}>Restricted · {award.restrictedTo}</DarkPill>
              ) : null}
            </div>
            <h1 className="mt-5 font-display text-[clamp(38px,4.8vw,58px)] font-medium leading-[1.04] tracking-[-0.02em] text-balance text-white">
              {award.headA} <span style={{ color: award.color }}>{award.headB}</span>
            </h1>
            <p className="mt-6 max-w-[640px] text-[clamp(16px,1.6vw,19px)] leading-[1.55] text-ondark-muted">
              {award.lead}
            </p>
            <p className="mt-[18px] text-[13px] text-white/60">Formally: {award.official}</p>
            <div className="mt-5 inline-flex items-center gap-3 rounded-[14px] border border-white/16 bg-white/5 px-4 py-2.5 text-sm leading-[1.45] text-white/85">
              <span className="rounded-full bg-white px-2.5 py-[3px] text-[11px] font-semibold uppercase tracking-[0.12em] text-ink">
                {award.owner === "partner" ? "Partner" : "OCR"}
              </span>
              {ownerLine(award)}
            </div>
          </div>

          <aside
            className={`min-w-0 flex-[5_1_340px] rounded-[20px] bg-white px-7 pb-6 pt-[22px] text-ink ${glanceShadow}`}
            style={{ borderTop: `5px solid ${award.color}` }}
          >
            <p
              className="text-xs font-medium uppercase tracking-[0.16em]"
              style={{ color: award.ink }}
            >
              At a glance
            </p>
            <dl className="mt-3 border-t border-ink/12 text-sm leading-[1.45]">
              {award.facts.map(([term, detail]) => (
                <div
                  key={term}
                  className="grid grid-cols-[88px_1fr] gap-3.5 border-b border-ink/8 py-2.5"
                >
                  <dt className="pt-[3px] text-[11px] uppercase tracking-[0.14em] text-ink-muted-2">
                    {term}
                  </dt>
                  <dd className="text-foreground">{detail}</dd>
                </div>
              ))}
            </dl>
            <OutLink
              href={award.applyHref}
              className={`${inkPillClass} mt-[18px] min-h-12 w-full px-6 py-3 text-[15px]`}
            >
              Apply online →
            </OutLink>
            {award.links.length > 0 ? (
              <div className="mt-3 flex flex-wrap items-center justify-center gap-x-[18px] gap-y-1.5">
                {award.links.map((link) => (
                  <OutLink
                    key={link.href}
                    href={link.href}
                    className="text-[13px] font-medium text-ink underline decoration-ink/30 underline-offset-[3px]"
                  >
                    {link.label}
                  </OutLink>
                ))}
              </div>
            ) : null}
          </aside>
        </div>

        {SHOW_REVIEW_NOTES && award.notes.length > 0 ? (
          <div
            className="mt-8 rounded-[14px] border border-dashed px-[18px] py-3.5 text-[13px] leading-[1.5]"
            style={{
              borderColor: "oklch(0.85 0.12 85 / 0.6)",
              background: "oklch(0.85 0.12 85 / 0.08)",
              color: "oklch(0.9 0.06 85)",
            }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em]">
              Review notes · not for publication
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-4">
              {award.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function DarkPill({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <span
      title={title || undefined}
      className="inline-flex items-center gap-1.5 rounded-full border border-white/25 px-2.5 py-[3px] text-xs text-white/85"
    >
      {children}
    </span>
  );
}
