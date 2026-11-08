import type { CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { HUB_DESCRIPTION, sponsorGroups } from "./lib";
import { focusRing } from "./primitives";

export function HubHero() {
  const groups = sponsorGroups();
  return (
    <section className="border-b border-ink/10 bg-cream">
      <div className="mx-auto max-w-7xl px-6" style={{ paddingTop: "clamp(48px, 6vw, 88px)" }}>
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-teal-text">
          Funding & Support
        </p>
        <h1 className="mt-6 font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.95] tracking-tight text-ink">
          Funding that comes
          <br />
          <em className="not-italic text-gradient-sunburst">with a team behind it.</em>
        </h1>
        <p className="mt-10 max-w-3xl text-xl leading-relaxed text-pretty text-ink-muted">
          {HUB_DESCRIPTION}
        </p>

        <nav
          aria-label="Opportunities"
          className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-x-12"
          style={{ marginTop: "clamp(40px, 5vw, 64px)" }}
        >
          {groups.map((group) => {
            const accent = group.awards[0];
            return (
              <div
                key={group.key}
                className="pb-8 pt-3.5"
                style={{ borderTop: `4px solid ${accent.color}` }}
              >
                <p
                  className="text-[11px] font-medium uppercase tracking-[0.14em]"
                  style={{ color: accent.ink }}
                >
                  {group.indexLabel}
                </p>
                <div className="mt-1.5">
                  {group.awards.map((award) => (
                    <Link
                      key={award.id}
                      to="/funding/$slug"
                      params={{ slug: award.id }}
                      className={`flex w-full items-baseline justify-between gap-4 border-b border-ink/10 py-3 text-ink transition-colors duration-200 hover:text-[var(--sponsor-ink)] ${focusRing}`}
                      style={{ "--sponsor-ink": award.ink } as CSSProperties}
                    >
                      <span className="font-display text-lg leading-[1.25] text-balance">
                        {award.short}
                      </span>
                      <span className="shrink-0 text-xs font-medium uppercase tracking-[0.08em] text-ink-muted-2">
                        {award.tag}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>
      </div>
    </section>
  );
}
