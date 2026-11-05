import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { SunburstLogo } from "@/components/site/chrome";
import {
  links,
  partners,
  strategists,
  teamCopy,
  type PartnerId,
  type Strategist,
} from "@/data/research-development";
import { joinList, TRANSITION, tint } from "./lib";
import { Arrow, Eyebrow } from "./primitives";

/** `p:{strategist id}` or `q:{partner id}` */
type Focus = `p:${string}` | `q:${string}` | null;

const ownersOf = (id: PartnerId) => strategists.filter((p) => p.partners.includes(id));
const shortName = (p: Strategist) => (p.id === "open" ? "Our open position" : p.name.split(",")[0]);
const partnerName = (id: PartnerId) => partners.find((q) => q.id === id)?.name ?? id;

function hintFor(focus: Focus): string {
  if (!focus) return teamCopy.hint;
  const [kind, id] = focus.split(":") as ["p" | "q", string];
  if (kind === "p") {
    const p = strategists.find((x) => x.id === id);
    if (!p) return teamCopy.hint;
    const names = p.partners.map(partnerName);
    const verb = p.id === "open" ? "will support" : "supports";
    const list = p.hintExtra ? `${names.join(", ")}, ${p.hintExtra}` : joinList(names);
    return `${shortName(p)} ${verb} ${list}.`;
  }
  const q = partners.find((x) => x.id === id);
  if (!q) return teamCopy.hint;
  const owners = ownersOf(q.id);
  return owners.length
    ? `${q.name} is supported by ${joinList(owners.map((p) => (p.id === "open" ? "our open position" : shortName(p))))}.`
    : `${q.name} is supported by the research development team.`;
}

/**
 * Strategists and partner institutes with linked highlighting: hovering (or clicking to pin)
 * a strategist lights that person and their partners; hovering a partner works in reverse.
 */
export function TeamAndPartners() {
  const [hover, setHover] = useState<Focus>(null);
  const [pin, setPin] = useState<Focus>(null);
  const focus = hover ?? pin; // hover overrides pin

  let litPeople: Set<string> | null = null;
  let litPartners: Set<PartnerId> | null = null;
  let focusColor: string | null = null;
  if (focus) {
    const [kind, id] = focus.split(":") as ["p" | "q", string];
    if (kind === "p") {
      const p = strategists.find((x) => x.id === id);
      if (p) {
        litPeople = new Set([p.id]);
        litPartners = new Set(p.partners);
        focusColor = p.color;
      }
    } else {
      litPartners = new Set([id as PartnerId]);
      litPeople = new Set(ownersOf(id as PartnerId).map((p) => p.id));
    }
  }

  const togglePin = (key: Focus) => setPin((prev) => (prev === key ? null : key));
  const rowHandlers = (key: Focus) => ({
    onMouseEnter: () => setHover(key),
    onMouseLeave: () => setHover(null),
  });
  const buttonHandlers = (key: Focus) => ({
    onClick: () => togglePin(key),
    onFocus: () => setHover(key),
    onBlur: () => setHover(null),
  });

  return (
    <section className="bg-cream py-12 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="lg:grid lg:grid-cols-[7fr_5fr] lg:items-start lg:gap-20">
          {/* ── Strategists ── */}
          <div>
            <Eyebrow>{teamCopy.team.eyebrow}</Eyebrow>
            <h2 className="mb-2 font-display text-[28px] font-medium leading-[1.05] tracking-[-0.02em] text-ink md:text-[36px]">
              {teamCopy.team.heading}
            </h2>
            <p className="mb-5 text-[15px] leading-[1.55] text-ink-muted md:mb-6 lg:min-h-[47px]">
              {teamCopy.team.intro}
            </p>

            {/* Mobile: horizontal scroll-snap cards */}
            <div className="-mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-1.5 scroll-px-6 md:hidden">
              {strategists.map((p) => (
                <div key={p.id} className="w-[150px] flex-none snap-start">
                  {p.photo ? (
                    <img
                      src={p.photo}
                      alt={p.name}
                      className="block aspect-[4/5] w-[150px] rounded-xl bg-secondary object-cover"
                    />
                  ) : (
                    <div className="flex aspect-[4/5] w-[150px] items-center justify-center rounded-xl border border-dashed border-ink/25 bg-white">
                      <SunburstLogo className="h-12 w-12" />
                    </div>
                  )}
                  <div className="mt-2.5 font-display text-[17px] leading-tight text-ink">
                    {p.name}
                  </div>
                  <div className="mt-0.5 text-xs text-ink-muted">{p.role}</div>
                </div>
              ))}
            </div>

            {/* Tablet and up: rows with linked highlighting */}
            <ul className="hidden border-t border-ink md:block">
              {strategists.map((p) => {
                const key: Focus = `p:${p.id}`;
                const hot = !!litPeople && litPeople.has(p.id);
                const dim = !!litPeople && !hot;
                return (
                  <li key={p.id} className="border-b border-rule py-1.5">
                    <div
                      {...rowHandlers(key)}
                      className={`relative flex items-center gap-5 rounded-[14px] px-3.5 py-3 ${TRANSITION}`}
                      style={{
                        background: hot ? tint(p.color, 0.14) : "transparent",
                        opacity: dim ? 0.38 : 1,
                      }}
                    >
                      <button
                        type="button"
                        aria-pressed={pin === key}
                        aria-label={`${p.name}: highlight partner institutes`}
                        {...buttonHandlers(key)}
                        className="absolute inset-0 cursor-pointer rounded-[14px] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ink/50"
                      />
                      <div
                        className={`pointer-events-none relative h-20 w-20 flex-none rounded-full p-[3px] ${TRANSITION}`}
                        style={{ background: hot ? p.color : tint(p.color, 0.55) }}
                      >
                        {p.photo ? (
                          <img
                            src={p.photo}
                            alt=""
                            className="h-full w-full rounded-full border-[3px] border-white bg-secondary object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                            <SunburstLogo className="h-[38px] w-[38px]" />
                          </div>
                        )}
                      </div>
                      <div className="pointer-events-none relative min-w-0 flex-1">
                        <div className="flex items-center gap-2.5">
                          <h3 className="font-display text-[22px] font-normal tracking-normal text-ink">
                            {p.name}
                          </h3>
                          {p.linkedin ? (
                            <a
                              href={p.linkedin}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={`${p.name} on LinkedIn`}
                              onClick={(e) => e.stopPropagation()}
                              className="pointer-events-auto inline-flex items-center gap-1 rounded-md border border-ink/18 px-[7px] py-0.5 text-xs font-semibold text-ink-muted-2 no-underline transition-colors hover:border-ink/45 hover:text-ink"
                            >
                              in ↗
                            </a>
                          ) : null}
                        </div>
                        <div className="mt-0.5 text-sm" style={{ color: p.textColor }}>
                          {p.role}
                        </div>
                        <p className="mt-1.5 text-sm text-ink-muted">{p.bio}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ── Partner institutes ── */}
          <div className="mt-12 lg:mt-0">
            <Eyebrow>{teamCopy.partners.eyebrow}</Eyebrow>
            <h2 className="mb-2 font-display text-[28px] font-medium leading-[1.05] tracking-[-0.02em] text-ink md:text-[36px]">
              {teamCopy.partners.heading}
            </h2>
            <p className="mb-5 text-[15px] leading-[1.55] text-ink-muted text-pretty md:mb-6 lg:min-h-[47px]">
              {teamCopy.partners.intro}
            </p>
            <ul className="border-t border-ink">
              {partners.map((q) => {
                const key: Focus = `q:${q.id}`;
                const owners = ownersOf(q.id);
                const hot = !!litPartners && litPartners.has(q.id);
                const dim = !!litPartners && !hot;
                const arrowColor = owners[0]?.textColor ?? "var(--coral-text)";
                return (
                  <li key={q.id} className="border-b border-rule py-[5px]">
                    <div
                      {...rowHandlers(key)}
                      className={`relative flex items-center gap-3.5 rounded-[14px] px-3.5 py-[11px] ${TRANSITION}`}
                      style={{
                        background: hot
                          ? focusColor
                            ? tint(focusColor, 0.14)
                            : "oklch(0.14 0.06 265 / 0.05)"
                          : "transparent",
                        opacity: dim ? 0.38 : 1,
                      }}
                    >
                      <button
                        type="button"
                        aria-pressed={pin === key}
                        aria-label={`${q.name}: highlight strategists`}
                        {...buttonHandlers(key)}
                        className="absolute inset-0 cursor-pointer rounded-[14px] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ink/50"
                      />
                      <div className="pointer-events-none relative flex w-[26px] flex-none flex-wrap items-center gap-1.5 md:w-[58px] md:flex-nowrap">
                        {owners.map((o) => {
                          const ringed = hot && (!focusColor || focusColor === o.color);
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
                      <div className="pointer-events-none relative min-w-0 flex-1">
                        <div className="font-display text-[19px] text-ink">{q.name}</div>
                        <div className="mt-0.5 text-[13px] text-ink-muted-2">{q.since}</div>
                      </div>
                      <a
                        href={q.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${q.name} website`}
                        onClick={(e) => e.stopPropagation()}
                        className="relative flex-none p-1 text-base no-underline transition-transform hover:-translate-y-0.5 hover:translate-x-0.5"
                        style={{ color: arrowColor }}
                      >
                        ↗
                      </a>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="mt-6 flex md:justify-end">
              <Link
                to={links.partnership}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-coral-deep px-6 py-[13px] text-[15px] font-medium text-white transition-colors duration-[250ms] hover:brightness-95 md:min-h-0 md:w-auto"
                style={{ boxShadow: "0 8px 20px oklch(0.6 0.2 30 / 0.3)" }}
              >
                {teamCopy.partners.button} <Arrow />
              </Link>
            </div>
          </div>
        </div>

        <p aria-live="polite" className="mt-7 hidden text-[13px] text-ink-muted-2 md:block">
          {hintFor(focus)}
        </p>
      </div>
    </section>
  );
}
