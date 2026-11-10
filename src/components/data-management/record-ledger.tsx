import { useEffect, useState } from "react";
import { ledgerHeads, ledgerRows } from "@/data/data-management";

const ISSUE = "oklch(0.86 0.14 85)";
const RESOLVED = "oklch(0.86 0.1 195)";
const HOT_TEXT = "oklch(0.9 0.08 30)";
const HOT_BG = "oklch(0.7 0.2 30 / 0.28)";
const CELL_T = "background-color 0.5s ease, color 0.5s ease";

/**
 * Direction A hero illustration: five invented study records resolving one at a time.
 * Steps 0–5 resolve rows; 6–8 hold the finished state, then loop.
 */
export function RecordLedger() {
  const [step, setStep] = useState(0);
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 559px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncNarrow = () => setNarrow(mq.matches);
    syncNarrow();
    mq.addEventListener("change", syncNarrow);

    if (reduce.matches) {
      setStep(5);
      return () => mq.removeEventListener("change", syncNarrow);
    }

    const id = window.setInterval(() => {
      setStep((s) => (s >= 8 ? 0 : s + 1));
    }, 1100);
    return () => {
      window.clearInterval(id);
      mq.removeEventListener("change", syncNarrow);
    };
  }, []);

  const done = Math.min(step, 5);
  const cols = narrow ? [0, 2, 3, 4] : [0, 1, 2, 3, 4];
  const gt = cols.map((c) => (c === 4 ? "1.45fr" : c === 2 ? "1.15fr" : "1fr")).join(" ");

  return (
    <div
      role="img"
      aria-label="Illustration: five study records with data issues being resolved one at a time"
      className="rounded-[18px] border border-white/14 bg-white/6 p-3.5 backdrop-blur-[6px] sm:px-5 sm:py-[18px]"
    >
      <div
        className="grid gap-2 border-b border-white/14 pb-2.5 text-[10.5px] uppercase tracking-[0.12em] text-[oklch(0.72_0.02_265)]"
        style={{ gridTemplateColumns: gt }}
      >
        {cols.map((c) => (
          <span key={ledgerHeads[c]}>{ledgerHeads[c]}</span>
        ))}
      </div>

      {ledgerRows.map((row, i) => {
        const ok = i < done;
        return (
          <div
            key={`${row.cells[0]}-${row.cells[1]}`}
            className="grid items-center gap-2 border-b border-white/8 py-[9px] font-mono text-[11px] sm:text-[12.5px]"
            style={{ gridTemplateColumns: gt }}
          >
            {cols.map((c) => {
              if (c === 4) {
                return (
                  <span
                    key="check"
                    className="inline-flex items-center gap-1.5 font-sans font-medium"
                    style={{ color: ok ? RESOLVED : ISSUE, transition: CELL_T }}
                  >
                    <span aria-hidden className="size-[7px] flex-none rounded-full bg-current" />
                    {ok ? row.resolved : row.issue}
                  </span>
                );
              }
              const hot = c === row.hotCol;
              return (
                <span
                  key={c}
                  className="justify-self-start rounded-md px-1.5 py-0.5 -ml-1.5"
                  style={{
                    background: hot && !ok ? HOT_BG : "transparent",
                    color: hot && !ok ? HOT_TEXT : "#fff",
                    transition: CELL_T,
                  }}
                >
                  {hot && ok ? row.fixed : row.cells[c]}
                </span>
              );
            })}
          </div>
        );
      })}

      <div className="mt-3.5 flex items-center gap-3 text-xs text-ondark-muted">
        <div className="h-1 flex-1 overflow-hidden rounded bg-white/12">
          <div
            className="h-full rounded"
            style={{
              width: `${(done / 5) * 100}%`,
              background:
                "linear-gradient(90deg, oklch(0.84 0.16 85), oklch(0.7 0.2 30), oklch(0.68 0.16 340))",
              transition: "width 0.6s ease",
            }}
          />
        </div>
        <span className="whitespace-nowrap tabular-nums">{done} of 5 checks resolved</span>
      </div>
      <div className="mt-2 text-[11px] text-[oklch(0.72_0.02_265)]">Illustrative records</div>
    </div>
  );
}
