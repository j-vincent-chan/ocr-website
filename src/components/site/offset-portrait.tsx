import type { ReactNode } from "react";
import { TRANSITION } from "@/components/research-development/lib";

/**
 * Circular portrait with an accent disc shifted down and to the right.
 * The disc and the photo are the same treatment as the team tables: a thin
 * sliver of color at the top-left, and a much thicker crescent at the bottom-right.
 * Proportions match a 130px reference ring (photo ~70/80, offset ~3px up-left).
 */
export function OffsetPortrait({ ring, children }: { ring: string; children: ReactNode }) {
  return (
    <div className="pointer-events-none relative h-20 w-20 flex-none">
      <div
        aria-hidden
        className={`absolute inset-0 rounded-full ${TRANSITION}`}
        style={{ background: ring }}
      />
      <div className="absolute top-[2px] left-[2px] size-[70px] overflow-hidden rounded-full border-[3px] border-white bg-white">
        {children}
      </div>
    </div>
  );
}
