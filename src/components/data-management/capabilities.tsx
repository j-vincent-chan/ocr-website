import { useState } from "react";
import { TRANSITION, tint } from "@/components/research-development/lib";
import { capabilities, capabilitiesSection, type CapabilityKey } from "@/data/data-management";
import { Dot, ReviewFlag, SectionHeader } from "./primitives";

/** Accordion of the four capabilities; starts closed; one open at a time. */
export function Capabilities() {
  const [open, setOpen] = useState<CapabilityKey | null>(null);

  return (
    <section id="capabilities" className="scroll-mt-24 bg-paper py-[clamp(48px,7vw,96px)]">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow={capabilitiesSection.eyebrow}
          title={capabilitiesSection.title}
          lede={capabilitiesSection.lede}
        />

        <div className="border-t border-ink">
          {capabilities.map((c) => {
            const isOpen = open === c.key;
            return (
              <div key={c.key} className="border-b border-rule">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : c.key)}
                  className="grid w-full grid-cols-[clamp(52px,8vw,120px)_1fr_44px] items-center gap-[clamp(8px,2vw,24px)] py-[clamp(18px,2.4vw,28px)] text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta"
                >
                  <span
                    className="font-display text-[clamp(36px,5vw,56px)] leading-none"
                    style={{ color: c.textColor }}
                  >
                    {c.num}
                  </span>
                  <span>
                    <span className="block font-display text-[clamp(22px,2.6vw,30px)] font-medium leading-[1.15] text-ink">
                      {c.name}
                    </span>
                    <span className="mt-1.5 block font-display text-[clamp(15px,1.5vw,18px)] text-ink-muted italic">
                      {c.tagline}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className={`flex size-11 items-center justify-center rounded-full border border-ink/20 text-xl text-ink ${TRANSITION}`}
                    style={{ background: isOpen ? tint(c.color, 0.22) : "transparent" }}
                  >
                    {isOpen ? "–" : "+"}
                  </span>
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-[350ms] ease-in-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="pb-7 pl-[clamp(0px,9.6vw,144px)]">
                      <div className="text-[11px] uppercase tracking-[0.14em] text-ink-muted-2">
                        {capabilitiesSection.listLabel}
                      </div>
                      <ul className="mt-3 grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-x-10 gap-y-2.5 text-[15px] text-ink-body">
                        {c.deliverables.map((d) => (
                          <li key={d.text} className="flex items-start gap-2.5">
                            <Dot color={c.color} size={6} className="mt-2" />
                            <span>
                              {d.text}
                              {d.flag ? <ReviewFlag>{d.flag}</ReviewFlag> : null}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
