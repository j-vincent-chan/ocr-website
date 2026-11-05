import type { CSSProperties } from "react";
import {
  awardTotal,
  formatMoney,
  grants,
  grantType,
  links,
  programFor,
  record,
  recordCopy,
} from "@/data/research-development";
import { tint } from "./lib";
import { Arrow, Eyebrow, pillOutline } from "./primitives";

const FEATURED_GRANTS = 5;

/** "$12.3M" → { big: "$12.3", unit: "M" } */
function splitMoney(formatted: string) {
  const unit = /[MK]$/.test(formatted) ? formatted.slice(-1) : "";
  return { big: unit ? formatted.slice(0, -1) : formatted, unit };
}

/** "9.3/10" → 9.3 with a smaller "/10" */
function StatValue({ value, smallClass }: { value: string; smallClass: string }) {
  const i = value.indexOf("/");
  if (i === -1) return <>{value}</>;
  return (
    <>
      {value.slice(0, i)}
      <span className={smallClass}>{value.slice(i)}</span>
    </>
  );
}

export function RecordSection() {
  // The headline total is computed from grants[].award; a `$XXM` placeholder shows if any is null.
  const total = awardTotal();
  const money = total.complete ? splitMoney(formatMoney(total.total)) : null;
  const featured = grants.slice(0, FEATURED_GRANTS);

  return (
    <section className="bg-cream py-12 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:grid lg:grid-cols-[5fr_7fr] lg:items-start lg:gap-[88px]">
        <div>
          <Eyebrow>{recordCopy.eyebrow}</Eyebrow>
          <h2 className="font-display text-[32px] font-medium leading-[1.05] tracking-[-0.02em] text-ink md:text-[40px] lg:text-[48px] lg:leading-[1.02]">
            {recordCopy.heading}
          </h2>

          <div
            className="mt-5 inline-block pb-1.5 font-display text-[88px] font-medium leading-none tracking-[-0.04em] text-coral-deep tabular-nums lg:mt-11 lg:text-[136px]"
            style={money ? undefined : { borderBottom: "4px dotted var(--coral-deep)" }}
            aria-label={
              money ? `${formatMoney(total.total)} awarded` : "Total awarded: amount pending"
            }
          >
            {money ? (
              <>
                {money.big}
                <span className="text-[52px] tracking-[-0.02em] lg:text-[80px]">{money.unit}</span>
              </>
            ) : (
              <>
                $XX
                <span className="text-[52px] tracking-[-0.02em] lg:text-[80px]">M</span>
              </>
            )}
          </div>
          <p className="mt-4 max-w-[380px] text-[15px] text-ink-muted lg:text-base">
            {recordCopy.caption}
          </p>

          {/* Mobile: 3-up stats */}
          <div className="mt-6 grid grid-cols-3 gap-3 border-t border-ink pt-[18px] md:hidden">
            {record.stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-[26px] text-ink">
                  <StatValue value={s.value} smallClass="text-sm" />
                </div>
                <div className="text-xs text-ink-muted">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Tablet and up: stat rows */}
          <div className="mt-11 hidden auto-rows-fr border-t border-ink md:grid">
            {record.stats.map((s, i) => (
              <div
                key={s.label}
                className={`flex items-center gap-5 py-4 border-b ${
                  i === record.stats.length - 1 ? "border-ink" : "border-rule"
                }`}
              >
                <span className="min-w-[112px] font-display text-[34px] leading-none text-ink">
                  <StatValue value={s.value} smallClass="text-lg text-ink-muted-2" />
                </span>
                <span className="text-sm text-ink-muted">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 lg:mt-0">
          <h3 className="font-display text-[22px] font-normal leading-[1.15] tracking-normal text-ink lg:text-[28px]">
            {recordCopy.fundedHeading}
          </h3>
          <ul className="mt-5 border-t border-ink">
            {featured.map((g) => (
              <GrantRow key={g.url} grant={g} />
            ))}
          </ul>
          <div className="mt-5 flex lg:mt-6 lg:justify-end">
            <a
              href={links.allGrants}
              className={`${pillOutline} min-h-12 w-full lg:min-h-0 lg:w-auto`}
            >
              {recordCopy.allGrants} <Arrow />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function GrantRow({ grant: g }: { grant: (typeof grants)[number] }) {
  const type = grantType(g.mech);
  const program = programFor(g.mech);
  return (
    <li className="border-b border-rule md:py-[5px]">
      <a
        href={g.url}
        target="_blank"
        rel="noreferrer"
        style={{ "--tint": tint(type.color, 0.14) } as CSSProperties}
        className="grid grid-cols-[64px_1fr] items-start gap-x-3 py-3.5 text-inherit no-underline transition-colors duration-[250ms] md:grid-cols-[100px_1fr_170px_20px] md:gap-x-[22px] md:rounded-[14px] md:p-3.5 md:hover:bg-[var(--tint)] md:focus-visible:bg-[var(--tint)] focus-visible:outline-none"
      >
        <div>
          <div className="flex items-center gap-2">
            <span
              aria-hidden
              className="hidden h-2.5 w-2.5 rounded-full md:block"
              style={{ background: type.color }}
            />
            <span
              className="font-display text-[24px] leading-none md:text-[34px]"
              style={{ color: type.text }}
            >
              {g.mech}
            </span>
          </div>
          <div className="mt-1.5 text-[11px] font-semibold tracking-[0.06em] text-ink-muted-2 md:hidden">
            {g.ic}
          </div>
          <div className="mt-2 hidden text-xs text-ink-muted-2 md:block">{g.kind}</div>
        </div>
        <div>
          <div className="text-[15px] font-medium leading-[1.3] text-ink md:text-[17px]">
            {g.title}
          </div>
          <div className="mt-1 text-[13px] text-ink-muted-2 md:mt-1.5 md:text-sm">
            {g.pis}
            {program ? <span className="md:hidden"> · {program}</span> : null}
          </div>
        </div>
        <div className="hidden md:block">
          <div className="pt-1 text-[13px] font-semibold tracking-[0.06em] text-ink">{g.ic}</div>
          {program ? (
            <div className="mt-2 text-[13px] leading-[1.35] text-ink-muted">{program}</div>
          ) : null}
          {g.award != null ? (
            <div className="mt-1.5 text-sm font-medium text-ink">{formatMoney(g.award)}</div>
          ) : null}
        </div>
        <div aria-hidden className="hidden pt-0.5 md:block" style={{ color: type.text }}>
          ↗
        </div>
      </a>
    </li>
  );
}
