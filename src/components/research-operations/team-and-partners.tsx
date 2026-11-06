import type { CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { TRANSITION, tint } from "@/components/research-development/lib";
import { Arrow } from "@/components/research-development/primitives";
import { partners, SERVICE_COLOR, team, type ServiceKey } from "@/data/research-operations";
import { Dot, Eyebrow, ReviewFlag } from "./primitives";

const LEGEND: ServiceKey[] = ["bio", "clinical", "pm"];

/** "Delivers biospecimen coordination and clinical research coordination" */
const deliversLabel = (dots: ServiceKey[]) =>
  `Delivers ${dots.map((d) => SERVICE_COLOR[d].label).join(dots.length > 2 ? ", " : " and ")}`;

/**
 * The coordination team and the institutes, hospitals and programs that hold capacity on it.
 * Team rows tint on hover in the person's primary service accent; partner rows are plain links.
 */
export function TeamAndPartners() {
  return (
    <section id="team" className="scroll-mt-24 bg-cream py-12 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="lg:grid lg:grid-cols-[7fr_5fr] lg:items-start lg:gap-20">
          {/* ── Team ── */}
          <div>
            <Eyebrow>{team.eyebrow}</Eyebrow>
            <h2 className="mb-2 font-display text-[28px] font-medium leading-[1.05] tracking-[-0.02em] text-ink md:text-[36px]">
              {team.title}
            </h2>
            <p className="mb-5 text-[15px] leading-[1.55] text-ink-muted md:mb-6 lg:min-h-[47px]">
              {team.lead}
              {team.verify ? <ReviewFlag>{team.flag}</ReviewFlag> : null}
            </p>

            {/* Mobile: horizontal scroll-snap cards */}
            <div className="-mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-1.5 scroll-px-6 md:hidden">
              {team.people.map((p) => (
                <div key={p.slug} className="w-[150px] flex-none snap-start">
                  <img
                    src={p.photo}
                    alt={p.name}
                    className="block aspect-[4/5] w-[150px] rounded-xl bg-secondary object-cover [object-position:center_18%]"
                  />
                  <div className="mt-2.5 font-display text-[17px] leading-tight text-ink">
                    {p.name}
                    {p.credentials ? (
                      <span className="font-sans text-xs text-ink-muted-2">, {p.credentials}</span>
                    ) : null}
                  </div>
                  <div className="mt-0.5 text-xs text-ink-muted">{p.role}</div>
                </div>
              ))}
            </div>

            {/* Tablet and up: rows */}
            <ul className="hidden border-t border-ink md:block">
              {team.people.map((p) => {
                const ring = SERVICE_COLOR[p.ring];
                return (
                  <li key={p.slug} className="border-b border-rule py-1.5">
                    <div
                      className={`flex items-center gap-5 rounded-[14px] px-3.5 py-3 hover:bg-[var(--tint)] ${TRANSITION}`}
                      style={{ "--tint": tint(ring.color, 0.14) } as CSSProperties}
                    >
                      <div
                        className="h-20 w-20 flex-none rounded-full p-[3px]"
                        style={{ background: tint(ring.color, 0.55) }}
                      >
                        <img
                          src={p.photo}
                          alt=""
                          className="h-full w-full rounded-full border-[3px] border-white bg-secondary object-cover [object-position:center_18%]"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display text-[22px] font-normal leading-[1.2] tracking-normal text-ink">
                          {p.name}
                          {p.credentials ? (
                            <span className="font-sans text-sm text-ink-muted-2">
                              , {p.credentials}
                            </span>
                          ) : null}
                        </h3>
                        <div className="mt-0.5 text-sm" style={{ color: ring.textColor }}>
                          {p.role}
                        </div>
                        <p className="mt-1.5 text-sm leading-[1.5] text-ink-muted">{p.bio}</p>
                      </div>
                      <div
                        role="img"
                        aria-label={deliversLabel(p.dots)}
                        className="flex flex-none gap-1.5"
                      >
                        {p.dots.map((d) => (
                          <Dot key={d} color={SERVICE_COLOR[d].color} />
                        ))}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <p className="mt-5 hidden flex-wrap items-center gap-x-3.5 gap-y-1.5 text-[13px] text-ink-muted-2 md:flex">
              {LEGEND.map((key) => (
                <span key={key} className="inline-flex items-center gap-1.5">
                  <Dot color={SERVICE_COLOR[key].color} size={8} />
                  {SERVICE_COLOR[key].label}
                </span>
              ))}
            </p>
          </div>

          {/* ── Partners ── */}
          <div className="mt-12 lg:mt-0">
            <Eyebrow>{partners.eyebrow}</Eyebrow>
            <h2 className="mb-2 font-display text-[28px] font-medium leading-[1.05] tracking-[-0.02em] text-ink md:text-[36px]">
              {partners.title}
            </h2>
            <p className="mb-5 text-[15px] leading-[1.55] text-ink-muted text-pretty md:mb-6 lg:min-h-[47px]">
              {partners.lead}
            </p>
            <ul className="border-t border-ink">
              {partners.items.map((q) => (
                <li key={q.name} className="border-b border-rule py-[5px]">
                  <a
                    href={q.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`group flex items-center gap-3.5 rounded-[14px] px-3.5 py-[11px] text-inherit no-underline hover:bg-ink/6 focus-visible:bg-ink/6 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ink/50 ${TRANSITION}`}
                  >
                    <div className="flex w-[26px] flex-none flex-wrap items-center gap-1.5 md:w-[42px] md:flex-nowrap">
                      {q.services.map((key) => (
                        <Dot key={key} color={SERVICE_COLOR[key].color} />
                      ))}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-display text-[19px] leading-[1.2] text-ink">
                        {q.name}
                      </div>
                      <div className="mt-0.5 text-[13px] text-ink-muted-2">{q.meta}</div>
                    </div>
                    <span
                      aria-hidden
                      className="flex-none p-1 text-base text-teal-text transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    >
                      ↗
                    </span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex md:justify-end">
              <Link
                to={partners.cta.to}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-teal-text px-6 py-[13px] text-[15px] font-medium text-white transition-[filter] duration-[250ms] hover:brightness-95 md:min-h-0 md:w-auto"
                style={{ boxShadow: `0 8px 20px ${tint(SERVICE_COLOR.clinical.textColor, 0.3)}` }}
              >
                {partners.cta.label} <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
