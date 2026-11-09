import { useId, useState } from "react";
import { TRANSITION, tint } from "@/components/research-development/lib";
import {
  EXAMPLES,
  mailto,
  playbookCopy,
  STOPS,
  SVC,
  type ServiceId,
} from "@/data/community-management";
import { Arrow, pillInk, SectionHeader } from "./primitives";

const EASE = "cubic-bezier(.2,.7,.2,1)";

export function Playbook({
  playbookStartOpen = true,
  onOpenDrawer,
}: {
  playbookStartOpen?: boolean;
  onOpenDrawer: (id: ServiceId, trigger: HTMLElement) => void;
}) {
  const [play, setPlay] = useState<ServiceId | null>(playbookStartOpen ? "build" : null);
  const uid = useId();

  return (
    <section id="playbook" className="bg-paper py-[clamp(48px,7vw,96px)]">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow={playbookCopy.eyebrow}
          title={playbookCopy.heading}
          lede={playbookCopy.lede}
        />
        <div className="flex flex-col gap-2.5">
          {STOPS.map((k) => {
            const s = SVC[k];
            const open = play === k;
            const panelId = `${uid}-${k}`;
            return (
              <div
                key={k}
                className="rounded-[20px]"
                style={{
                  border: `1px solid ${open ? "transparent" : "var(--rule)"}`,
                  background: open ? tint(s.color, 0.16) : "#fff",
                  transition: "background-color .4s ease, border-color .4s ease",
                }}
              >
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setPlay(open ? null : k)}
                  className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-[clamp(14px,2vw,24px)] rounded-[20px] px-[clamp(16px,2.2vw,28px)] py-[clamp(18px,2vw,24px)] text-left text-ink hover:bg-ink/[0.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  <span
                    aria-hidden
                    className="self-start pt-1.5 font-display text-[15px] font-medium tracking-[0.1em]"
                    style={{
                      color: open ? s.text : "oklch(0.48 0.03 265)",
                      transition: "color .3s",
                    }}
                  >
                    {s.n}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-[clamp(20px,2.2vw,28px)] font-medium leading-[1.15] tracking-[-0.01em] text-ink text-pretty">
                      {s.name}
                    </span>
                    <span
                      className="mt-1 block text-[15px] leading-[1.45]"
                      style={{
                        color: open ? s.text : "oklch(0.42 0.03 265)",
                        transition: "color .3s",
                      }}
                    >
                      {s.headline}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className="flex h-10 w-10 flex-none items-center justify-center rounded-full"
                    style={{
                      border: `1px solid ${open ? s.color : "oklch(0.14 0.06 265 / 0.15)"}`,
                      background: open ? s.color : "transparent",
                      color: "var(--ink)",
                      transform: open ? "rotate(45deg)" : "none",
                      transition: `transform .45s ${EASE}, background-color .3s, border-color .3s`,
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M8 2v12M2 8h12"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </button>
                <div
                  id={panelId}
                  className="grid"
                  style={{
                    gridTemplateRows: open ? "1fr" : "0fr",
                    transition: `grid-template-rows .45s ${EASE}`,
                  }}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div
                      style={{
                        opacity: open ? 1 : 0,
                        transform: open ? "none" : "translateY(-8px)",
                        visibility: open ? "visible" : "hidden",
                        transition: `opacity .35s ease ${open ? ".08s" : "0s"}, transform .4s ${EASE}, visibility 0s linear ${open ? "0s" : ".4s"}`,
                      }}
                    >
                      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-7 gap-x-[clamp(32px,4vw,64px)] px-[clamp(16px,2.2vw,28px)] pt-1 pb-[clamp(24px,2.6vw,32px)]">
                        <div className="flex flex-col gap-5">
                          <p
                            className="text-[clamp(15px,1.3vw,17px)] leading-[1.55] text-pretty"
                            style={{ color: "oklch(0.25 0.04 265)" }}
                          >
                            {s.body}
                          </p>
                          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                            <a href={mailto(s.cta[1])} className={pillInk}>
                              {s.cta[0]} <Arrow />
                            </a>
                            <button
                              type="button"
                              aria-haspopup="dialog"
                              onClick={(e) => onOpenDrawer(k, e.currentTarget)}
                              className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-lime-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                            >
                              {playbookCopy.more} <Arrow />
                            </button>
                          </div>
                        </div>
                        <div>
                          <div className="text-[11px] uppercase tracking-[0.14em] text-ink-muted-2">
                            {playbookCopy.exampleLabel}
                          </div>
                          <ul className="mt-3 grid grid-cols-[repeat(auto-fill,minmax(min(100%,220px),1fr))] gap-2">
                            {EXAMPLES[k].map((ex) => (
                              <li
                                key={ex}
                                className="flex items-start gap-2.5 rounded-xl bg-white px-3.5 py-3 text-sm leading-[1.45]"
                                style={{ color: "oklch(0.25 0.04 265)" }}
                              >
                                <span
                                  aria-hidden
                                  className={`mt-1.5 h-2 w-2 flex-none rounded-full ${TRANSITION}`}
                                  style={{ background: s.color }}
                                />
                                {ex}
                              </li>
                            ))}
                          </ul>
                          <p className="mt-3 text-[13px] leading-[1.5] text-muted-foreground">
                            {playbookCopy.exampleFootnote}
                          </p>
                        </div>
                      </div>
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
