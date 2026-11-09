import { useEffect, useRef, useState } from "react";

export const BY_THE_NUMBERS_STATS = [
  {
    value: 120,
    suffix: "+",
    label: "Investigators served",
    color: "var(--coral)",
  },
  {
    value: 48,
    prefix: "$",
    suffix: "M",
    label: "In awards supported",
    color: "var(--magenta)",
  },
  {
    value: 43,
    label: "Grants supported in 2025",
    color: "var(--teal)",
  },
  {
    value: 9.3,
    decimals: 1,
    label: "Avg. PI satisfaction / 10",
    color: "var(--gold)",
  },
] as const;

type Stat = (typeof BY_THE_NUMBERS_STATS)[number];

function useCountUp(
  target: number,
  active: boolean,
  durationMs = 1400,
  decimals = 0,
) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      setValue(target);
      return;
    }

    let frame = 0;
    let start: number | null = null;

    const tick = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / durationMs, 1);
      const eased = 1 - (1 - progress) ** 3;
      const next = target * eased;
      setValue(decimals > 0 ? Number(next.toFixed(decimals)) : Math.round(next));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, durationMs, decimals]);

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

function StatCell({ stat, active }: { stat: Stat; active: boolean }) {
  const decimals = "decimals" in stat ? stat.decimals : 0;
  const count = useCountUp(stat.value, active, 1400, decimals);

  return (
    <div className="group relative flex flex-col justify-center pl-8 pr-6 py-10 md:pl-10 md:pr-8 md:py-12 transition-all duration-300 ease-out hover:bg-white/[0.08] hover:-translate-y-0.5 cursor-default">
      <span
        aria-hidden
        className="absolute left-0 top-1/2 h-12 w-1 -translate-y-1/2 rounded-full opacity-90 transition-all duration-300 group-hover:h-16 group-hover:w-1.5 group-hover:opacity-100"
        style={{ background: stat.color }}
      />
      <div className="font-display text-5xl md:text-6xl lg:text-7xl text-white leading-none transition-all duration-300 group-hover:scale-[1.03] group-hover:text-white">
        {formatStatValue(stat, count)}
      </div>
      <div className="mt-4 text-[11px] md:text-xs text-white/55 uppercase tracking-[0.2em] transition-colors duration-300 group-hover:text-white/85">
        {stat.label}
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
      { threshold: 0.35 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="relative w-full bg-ink text-white border-t border-white/10 py-0"
      role="region"
      aria-label="By the numbers"
    >
      <div ref={ref} className="max-w-7xl mx-auto px-6 py-8 md:py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl md:rounded-3xl border border-white/10 bg-white/10 overflow-hidden">
          {BY_THE_NUMBERS_STATS.map((stat) => (
            <div key={stat.label} className="bg-ink">
              <StatCell stat={stat} active={active} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
