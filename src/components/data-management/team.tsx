import type { CSSProperties } from "react";
import { TRANSITION, tint } from "@/components/research-development/lib";
import { OffsetPortrait } from "@/components/site/offset-portrait";
import { MAGENTA, MAGENTA_TEXT, team } from "@/data/data-management";
import { Eyebrow, ReviewFlag } from "./primitives";

export function Team() {
  return (
    <section id="team" className="scroll-mt-24 bg-paper py-[clamp(48px,7vw,96px)]">
      <div className="mx-auto grid max-w-7xl grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-start gap-x-[72px] gap-y-5 px-6">
        <div>
          <Eyebrow accent={MAGENTA_TEXT}>{team.eyebrow}</Eyebrow>
          <h2 className="font-display text-[clamp(32px,4vw,48px)] font-medium leading-[1.04] tracking-[-0.02em] text-ink">
            {team.title}
          </h2>
          <p className="mt-3.5 max-w-[420px] text-[15px] leading-[1.55] text-ink-muted">
            {team.intro}
          </p>
        </div>

        <ul className="list-none border-t border-ink p-0">
          {team.people.map((p) => (
            <li
              key={p.slug}
              className={`flex items-center gap-5 border-b border-rule px-3.5 py-[18px] hover:bg-[var(--tint)] ${TRANSITION}`}
              style={{ "--tint": tint(MAGENTA, 0.08) } as CSSProperties}
            >
              <OffsetPortrait ring={tint(MAGENTA, 0.55)}>
                <img
                  src={p.photo}
                  alt=""
                  className="size-full bg-secondary object-cover [object-position:center_18%]"
                />
              </OffsetPortrait>
              <div className="min-w-0">
                <h3 className="font-display text-[22px] font-normal leading-[1.2] text-ink">
                  {p.name}
                  {p.credentials ? (
                    <span className="font-sans text-sm text-ink-muted-2">, {p.credentials}</span>
                  ) : null}
                </h3>
                <div className="mt-0.5 text-sm" style={{ color: MAGENTA_TEXT }}>
                  {p.role}
                </div>
                <p className="mt-1.5 text-sm leading-[1.5] text-ink-muted">
                  {p.bio}
                  {p.flag ? <ReviewFlag>{p.flag}</ReviewFlag> : null}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
