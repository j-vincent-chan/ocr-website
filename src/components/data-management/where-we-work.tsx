import type { CSSProperties } from "react";
import { TRANSITION, tint } from "@/components/research-development/lib";
import { capabilityByKey, MAGENTA, whereWeWork } from "@/data/data-management";
import { Dot, SectionHeader } from "./primitives";

export function WhereWeWork() {
  return (
    <section id="where" className="scroll-mt-24 bg-paper py-[clamp(48px,7vw,96px)]">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow={whereWeWork.eyebrow}
          title={whereWeWork.title}
          lede={whereWeWork.lede}
        />

        <ul className="list-none border-t border-ink p-0">
          {whereWeWork.settings.map((g) => (
            <li
              key={g.name}
              className={`grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-start gap-x-12 gap-y-2.5 border-b border-rule px-3.5 py-6 hover:bg-[var(--tint)] ${TRANSITION}`}
              style={{ "--tint": tint(MAGENTA, 0.06) } as CSSProperties}
            >
              <h3 className="font-display text-[clamp(22px,2.2vw,26px)] font-medium leading-[1.15] text-ink">
                {g.name}
              </h3>
              <div>
                <p className="text-[15px] leading-[1.55] text-ink-body text-pretty">{g.body}</p>
                <div className="mt-3 flex flex-wrap gap-x-3.5 gap-y-1.5 text-[13px] text-ink-muted-2">
                  {g.drawsOn.map((key) => {
                    const c = capabilityByKey(key);
                    return (
                      <span key={key} className="inline-flex items-center gap-1.5">
                        <Dot color={c.color} size={8} />
                        {c.short}
                      </span>
                    );
                  })}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
