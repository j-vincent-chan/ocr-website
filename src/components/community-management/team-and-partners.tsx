import { useState, type CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { SunburstLogo } from "@/components/site/chrome";
import { OffsetPortrait } from "@/components/site/offset-portrait";
import { joinList, TRANSITION, tint } from "@/components/research-development/lib";
import {
  ARM,
  links,
  PARTNERS,
  TEAM,
  teamCopy,
  type PartnerId,
  type TeamId,
} from "@/data/community-management";
import { Arrow, Eyebrow } from "./primitives";

const ownersOf = (id: PartnerId) => TEAM.filter((p) => p.partners.includes(id));
const partnerName = (id: PartnerId) => PARTNERS.find((q) => q.id === id)?.name ?? id;

function hintFor(focus: TeamId | null): string {
  const p = focus ? TEAM.find((x) => x.id === focus) : undefined;
  if (!p) return teamCopy.hint;
  const list = joinList(p.partners.map((id) => `the ${partnerName(id)}`));
  return p.id === "open"
    ? `Our open position will support ${list}.`
    : `${p.name} supports ${list}.`;
}

/**
 * Community managers and partner communities with one-way linked highlighting:
 * hovering (or clicking to pin) a person lights that person and their communities.
 */
export function TeamAndPartners() {
  const [hover, setHover] = useState<TeamId | null>(null);
  const [pin, setPin] = useState<TeamId | null>(null);
  const focus = hover ?? pin;

  const focused = focus ? TEAM.find((x) => x.id === focus) : undefined;
  const litPartners = focused ? new Set(focused.partners) : null;
  const focusColor = focused?.color ?? null;

  const togglePin = (id: TeamId) => setPin((prev) => (prev === id ? null : id));

  return (
    <section id="team" className="bg-cream py-[clamp(48px,7vw,96px)]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-start gap-12 gap-x-20">
          <div className="min-w-0 flex-[7_1_440px]">
            <Eyebrow>{teamCopy.team.eyebrow}</Eyebrow>
            <h2 className="mb-2 font-display text-[clamp(28px,3vw,36px)] font-medium leading-[1.05] tracking-[-0.02em] text-ink text-pretty">
              {teamCopy.team.heading}
            </h2>
            <p className="mb-6 min-h-[47px] text-[15px] leading-[1.55] text-ink-muted text-pretty">
              {teamCopy.team.intro}
            </p>
            <ul className="border-t border-ink">
              {TEAM.map((p) => {
                const hot = !!focused && focused.id === p.id;
                const dim = !!focused && !hot;
                return (
                  <li key={p.id} className="border-b border-rule py-1.5">
                    <div
                      onMouseEnter={() => setHover(p.id)}
                      onMouseLeave={() => setHover(null)}
                      className={`relative flex items-center gap-5 rounded-[14px] px-3.5 py-3 ${TRANSITION}`}
                      style={{
                        background: hot ? tint(p.color, 0.14) : "transparent",
                        opacity: dim ? 0.65 : 1,
                      }}
                    >
                      <button
                        type="button"
                        aria-pressed={pin === p.id}
                        aria-label={`${p.name}: highlight partner communities`}
                        onClick={() => togglePin(p.id)}
                        onFocus={() => setHover(p.id)}
                        onBlur={() => setHover(null)}
                        className="absolute inset-0 cursor-pointer rounded-[14px] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ink/50"
                      />
                      <OffsetPortrait ring={hot ? p.color : tint(p.color, 0.55)}>
                        {p.photo ? (
                          <img
                            src={p.photo}
                            alt=""
                            className="size-full bg-secondary object-cover [object-position:center_18%]"
                          />
                        ) : (
                          <div className="flex size-full items-center justify-center">
                            <SunburstLogo className="h-[38px] w-[38px]" />
                          </div>
                        )}
                      </OffsetPortrait>
                      <div className="pointer-events-none relative min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h3 className="font-display text-[22px] font-normal tracking-normal text-ink">
                            {p.name}
                          </h3>
                          {p.applyHref ? (
                            <a
                              href={p.applyHref}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="pointer-events-auto inline-flex min-h-6 items-center gap-1 rounded-md border border-ink/18 px-2 py-1 text-xs font-semibold leading-none text-ink-muted-2 no-underline transition-colors hover:border-ink/45 hover:text-ink"
                            >
                              {teamCopy.applyLabel}
                              <span aria-hidden>↗</span>
                              <span className="sr-only">
                                , {p.name} (opens in a new tab)
                              </span>
                            </a>
                          ) : null}
                        </div>
                        <div className="mt-0.5 text-sm" style={{ color: p.text }}>
                          {p.role}
                        </div>
                        <p className="mt-1.5 text-sm leading-[1.5] text-ink-muted text-pretty">
                          {p.bio}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="min-w-0 flex-[5_1_320px]">
            <Eyebrow>{teamCopy.partners.eyebrow}</Eyebrow>
            <h2 className="mb-2 font-display text-[clamp(28px,3vw,36px)] font-medium leading-[1.05] tracking-[-0.02em] text-ink text-pretty">
              {teamCopy.partners.heading}
            </h2>
            <p className="mb-6 min-h-[47px] text-[15px] leading-[1.55] text-ink-muted text-pretty">
              {teamCopy.partners.intro}
            </p>
            <ul className="border-t border-ink">
              {PARTNERS.map((q) => {
                const owners = ownersOf(q.id);
                const hot = !!litPartners && litPartners.has(q.id);
                const dim = !!litPartners && !hot;
                const arrowColor = owners[0]?.text ?? ARM.text;
                const lit = hot && focusColor ? tint(focusColor, 0.14) : null;
                return (
                  <li key={q.id} className="border-b border-rule py-[5px]">
                    <a
                      href={q.url}
                      target="_blank"
                      rel="noreferrer"
                      className={`group flex items-center gap-3.5 rounded-[14px] bg-[var(--row-bg)] px-3.5 py-[11px] text-inherit no-underline hover:bg-[var(--row-hover)] hover:opacity-100! focus-visible:bg-[var(--row-hover)] focus-visible:opacity-100! focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ink/50 ${TRANSITION}`}
                      style={
                        {
                          "--row-bg": lit ?? "transparent",
                          "--row-hover": lit ?? "oklch(0.14 0.06 265 / 0.06)",
                          opacity: dim ? 0.65 : 1,
                        } as CSSProperties
                      }
                    >
                      <div className="flex w-[58px] flex-none flex-wrap items-center gap-1.5">
                        {owners.map((o) => {
                          const ringed = hot && focusColor === o.color;
                          return (
                            <span
                              key={o.id}
                              aria-hidden
                              className={`h-2.5 w-2.5 flex-none rounded-full ${TRANSITION}`}
                              style={{
                                background: o.color,
                                boxShadow: `0 0 0 ${ringed ? "4px" : "0px"} ${tint(o.color, 0.3)}`,
                              }}
                            />
                          );
                        })}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-display text-[19px] text-ink">{q.name}</div>
                        <div className="mt-0.5 text-[13px] leading-[1.45] text-ink-muted-2">
                          {q.since}
                        </div>
                      </div>
                      <span
                        aria-hidden
                        className="flex-none p-1 text-base transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        style={{ color: arrowColor }}
                      >
                        ↗
                      </span>
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                );
              })}
            </ul>
            <div className="mt-6 flex justify-end">
              <Link
                to={links.partnership}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-lime-text px-6 py-[13px] text-[15px] font-medium text-white transition-[filter] duration-[250ms] hover:brightness-95 md:min-h-0 md:w-auto"
                style={{ boxShadow: "0 8px 20px oklch(0.46 0.12 130 / 0.3)" }}
              >
                {teamCopy.partners.button} <Arrow />
              </Link>
            </div>
          </div>
        </div>

        <p aria-live="polite" className="mt-7 text-[13px] leading-[1.5] text-ink-muted-2">
          {hintFor(focus)}
        </p>
      </div>
    </section>
  );
}
