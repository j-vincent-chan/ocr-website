import { createContext, useContext, useEffect, useState, type KeyboardEvent } from "react";
import type { AppKey } from "@/data/ai-tools";

/** `color` at `a` (0–1). Works with CSS variables, e.g. `alpha("var(--violet)", 0.18)`. */
export const alpha = (color: string, a: number) =>
  `color-mix(in oklch, ${color} ${Math.round(a * 1000) / 10}%, transparent)`;

/** Opens the detail drawer for `key`; focus returns to `trigger` when it closes. */
export type ShowApp = (key: AppKey, trigger: HTMLElement) => void;

export const AppDrawerContext = createContext<ShowApp>(() => {});

/** Hero index rows, application cards and the Atlas button all open the same drawer. */
export const useShowApp = () => useContext(AppDrawerContext);

/** Enter / Space on a `role="button"` element. Ignores keys aimed at links inside it. */
export const onButtonKey = (open: (el: HTMLElement) => void) => (e: KeyboardEvent<HTMLElement>) => {
  if (e.target !== e.currentTarget) return;
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    open(e.currentTarget);
  }
};

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);
  return reduced;
}
