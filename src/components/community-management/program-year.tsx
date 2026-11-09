import { useState } from "react";
import { TRANSITION } from "@/components/research-development/lib";
import { MONTHS, programYearCopy, SVC } from "@/data/community-management";
import { SectionHeader } from "./primitives";

export function ProgramYear() {
  const [month, setMonth] = useState(MONTHS[0].k);
  const current = MONTHS.find((m) => m.k === month) ?? MONTHS[0];

  return (
    <section id="year" className="bg-cream py-[clamp(48px,7vw,96px)]">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow={programYearCopy.eyebrow}
          title={programYearCopy.heading}
          lede={programYearCopy.lede}
        />

        <div className="grid grid-cols-12 gap-1">
          {MONTHS.map((m) => {
            const active = m.k === current.k;
            return (
              <button
                key={m.k}
                type="button"
                aria-pressed={active}
                onClick={() => setMonth(m.k)}
                className={`min-w-0 rounded-xl px-0.5 pt-3 pb-2.5 text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${TRANSITION}`}
                style={{
                  border: `1px solid ${active ? "var(--ink)" : "var(--rule)"}`,
                  background: active ? "var(--ink)" : "#fff",
                  color: active ? "#fff" : "oklch(0.3 0.04 265)",
                }}
              >
                <span className="block text-[clamp(10px,1.2vw,13px)] font-medium tracking-[0.04em]">
                  {m.m}
                </span>
                <span aria-hidden className="mt-2 flex justify-center gap-[3px]">
                  {m.items.map(([svc, text]) => (
                    <span
                      key={text}
                      className="block h-1.5 w-1.5 rounded-full"
                      style={{ background: SVC[svc].color }}
                    />
                  ))}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-8 gap-x-[72px] rounded-[20px] border border-border bg-white px-8 py-7">
          <div>
            <div className="text-[11px] uppercase tracking-[0.14em] text-ink-muted-2">
              {programYearCopy.onTheCalendar}
            </div>
            <h3 className="mt-2 font-display text-[clamp(26px,2.4vw,30px)] font-medium leading-[1.1] text-ink">
              {current.name}
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {current.items.map(([svc, text]) => (
                <li key={text} className="grid grid-cols-[auto_1fr] items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-1.5 block h-2.5 w-2.5 rounded-full"
                    style={{ background: SVC[svc].color }}
                  />
                  <span>
                    <span
                      className="block text-[11px] uppercase tracking-[0.14em]"
                      style={{ color: SVC[svc].text }}
                    >
                      {SVC[svc].track}
                    </span>
                    <span className="mt-0.5 block text-[15px] leading-[1.45] text-ink-body">
                      {text}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl bg-cream px-5 py-[18px]">
              <div className="text-[11px] uppercase tracking-[0.14em] text-ink-muted-2">
                {programYearCopy.everyMonth}
              </div>
              <ul className="mt-2.5 flex flex-col gap-1.5 text-sm leading-[1.45] text-ink-body">
                {programYearCopy.standing.map((item) => (
                  <li key={item.text} className="flex items-start gap-2.5">
                    <span
                      className="mt-1.5 h-2 w-2 flex-none rounded-full"
                      style={{ background: item.color }}
                    />
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-ink-muted-2">
              {programYearCopy.legend.map((item) => (
                <span key={item.label} className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full" style={{ background: item.color }} />
                  {item.label}
                </span>
              ))}
            </div>
            <p className="text-[13px] leading-[1.5] text-muted-foreground text-pretty">
              {programYearCopy.note}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
