import { useEffect, useRef, useState } from "react";
import { PI_SATISFACTION } from "@/data/research-development";

const HEADLINE_STATS = [
  {
    value: 180,
    suffix: "+",
    label: "Investigators served",
    detail: "Across all five service arms",
    color: "var(--coral)",
  },
  {
    value: 48,
    prefix: "$",
    suffix: "M",
    label: "In awards funded",
    detail: "Across 8 awarded grants",
    color: "var(--magenta)",
  },
  {
    value: 68,
    prefix: "$",
    suffix: "M",
    label: "In research supported",
    detail: "Across 43 projects and 5 programs",
    color: "var(--teal)",
  },
  {
    value: PI_SATISFACTION,
    decimals: 1,
    label: "Avg. PI satisfaction / 10",
    detail: "Based on PI feedback",
    color: "var(--gold)",
  },
] as const;

type Stat = (typeof HEADLINE_STATS)[number];

function useCountUp(
  target: number,
  active: boolean,
  durationMs = 1400,
  decimals = 0,
  delayMs = 0,
) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      setValue(target);
      return;
    }

    let frame = 0;
    let start: number | null = null;
    let delayTimer = 0;
    setValue(0);

    const begin = () => {
      const tick = (timestamp: number) => {
        if (start === null) start = timestamp;
        const progress = Math.min((timestamp - start) / durationMs, 1);
        const eased = 1 - (1 - progress) ** 3;
        const next = target * eased;
        setValue(
          decimals > 0 ? Number(next.toFixed(decimals)) : Math.round(next),
        );
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    if (delayMs > 0) {
      delayTimer = window.setTimeout(begin, delayMs);
    } else {
      begin();
    }

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(delayTimer);
    };
  }, [active, target, durationMs, decimals, delayMs]);

  return value;
}

function formatStatValue(stat: Stat, count: number) {
  const decimals = "decimals" in stat ? stat.decimals : 0;
  const core =
    decimals > 0 ? count.toFixed(decimals) : String(Math.round(count));
  return `${"prefix" in stat && stat.prefix ? stat.prefix : ""}${core}${
    "suffix" in stat && stat.suffix ? stat.suffix : ""
  }`;
}

function cellBorders() {
  return [
    "min-w-0 border-white/10",
    // One column: rules between rows only.
    "max-sm:[&:not(:last-child)]:border-b",
    // Two columns: vertical rule down the middle, horizontal rule between rows.
    "sm:max-lg:odd:border-r",
    "sm:max-lg:[&:nth-child(-n+2)]:border-b",
    // Four columns: vertical rules only.
    "lg:[&:not(:last-child)]:border-r",
  ].join(" ");
}

function StatCell({
  stat,
  active,
  index,
}: {
  stat: Stat;
  active: boolean;
  index: number;
}) {
  const decimals = "decimals" in stat ? stat.decimals : 0;
  const count = useCountUp(stat.value, active, 1400, decimals, index * 80);

  return (
    <div
      className={[
        "group relative flex h-full min-w-0 @container",
        "flex-row items-center justify-between gap-4 px-5 py-4",
        "sm:flex-col sm:items-stretch sm:justify-between sm:gap-4 sm:px-6 sm:py-5",
        "md:gap-5 md:px-7 md:py-6",
        "transition-colors duration-300 ease-out hover:bg-white/[0.04]",
        cellBorders(),
      ].join(" ")}
    >
      <span
        aria-hidden
        className="absolute inset-x-5 top-0 h-px opacity-55 transition-opacity duration-300 group-hover:opacity-90 sm:inset-x-6 md:inset-x-7"
        style={{ background: stat.color }}
      />
      <span
        aria-hidden
        className="absolute left-5 top-0 h-0.5 w-7 rounded-full transition-all duration-500 group-hover:w-10 sm:left-6 md:left-7"
        style={{ background: stat.color }}
      />

      <div className="shrink-0 font-display text-[clamp(1.85rem,24cqi,2.5rem)] leading-none tracking-tight whitespace-nowrap text-white sm:text-[clamp(2rem,24cqi,3.75rem)]">
        {formatStatValue(stat, count)}
      </div>

      <div className="min-w-0 space-y-1 text-right sm:space-y-1.5 sm:text-left">
        <div className="text-balance text-[11px] font-medium uppercase tracking-[0.14em] text-white/70 sm:tracking-[0.18em] md:text-xs">
          {stat.label}
        </div>
        {"detail" in stat && stat.detail ? (
          <p className="text-balance text-[12px] leading-snug text-white/45 md:text-[13px] sm:max-w-[15rem]">
            {stat.detail}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function ByTheNumbersStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      {
        // Fire once the strip is on screen; on desktop it sits at the bottom of the first view.
        threshold: 0.35,
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="relative w-full shrink-0 overflow-hidden border-t border-white/10 bg-ink text-white"
      role="region"
      aria-label="By the numbers"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 90% at 8% 15%, color-mix(in oklab, var(--coral) 16%, transparent), transparent 55%), radial-gradient(ellipse 55% 70% at 88% 85%, color-mix(in oklab, var(--teal) 12%, transparent), transparent 50%), radial-gradient(ellipse 40% 50% at 58% 0%, color-mix(in oklab, var(--magenta) 9%, transparent), transparent 45%)",
        }}
      />

      <div ref={ref} className="relative mx-auto max-w-7xl px-6 py-7 md:py-8">
        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-white/45">
          By the numbers since 2023
        </p>

        <div className="grid grid-cols-1 border-y border-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {HEADLINE_STATS.map((stat, index) => (
            <StatCell
              key={stat.label}
              stat={stat}
              active={active}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
