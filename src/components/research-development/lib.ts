/** `oklch(l c h)` → `oklch(l c h / alpha)`. Used for the 12% panels, 14% hovers and 25% rings. */
export const tint = (oklch: string, alpha: number) => oklch.replace(")", ` / ${alpha})`);

export const lcFirst = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

/** "a", "a and b", "a, b and c" */
export const joinList = (items: string[]) =>
  items.length < 2
    ? items.join("")
    : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;

/** Blueprint grid lines in ink at `alpha`; pair with `backgroundSize: "18px 18px"`. */
export const blueprintGrid = (alpha: number) =>
  `linear-gradient(oklch(0.14 0.06 265 / ${alpha}) 1px, transparent 1px), linear-gradient(90deg, oklch(0.14 0.06 265 / ${alpha}) 1px, transparent 1px)`;

/** Radial fade for full-width blueprint bands: solid on the right, gone toward the left. */
export const BLUEPRINT_MASK =
  "radial-gradient(ellipse 70% 120% at 70% 50%, #000 30%, transparent 100%)";

/** Muted label color used on the dark hero/booking sections. */
export const ON_DARK_LABEL = "oklch(0.72 0.02 265)";

/** 0.25s ease on the properties the design animates. */
export const TRANSITION =
  "transition-[background-color,border-color,color,opacity,box-shadow] duration-[250ms] ease-in-out";
