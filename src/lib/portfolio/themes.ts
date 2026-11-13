/** Theme → accent colors from the approved portfolio design tokens. */

export type ThemeAccent = { bright: string; deep: string; key: string };

const ACCENTS: Record<string, { b: string; d: string }> = {
  coral: { b: "#ff6450", d: "#e55240" },
  teal: { b: "#00b5b6", d: "#008e8e" },
  magenta: { b: "#db2fb2", d: "#ce35a8" },
  lime: { b: "#9dda4f", d: "#608f19" },
  violet: { b: "#a491ff", d: "#615ed6" },
  gold: { b: "#f3ba25", d: "#a47a00" },
  blue: { b: "#4aa3ff", d: "#1f6fc4" },
  slate: { b: "#7f8bb0", d: "#4a5578" },
};

const THEME_KEY: Record<string, string> = {
  Autoimmunity: "coral",
  Cancer: "teal",
  "Infectious disease": "magenta",
  Allergy: "lime",
  "Lung disease": "violet",
  Pediatrics: "gold",
  "Surgery & devices": "blue",
  "Multi-disease": "slate",
};

export function themeAccent(theme: string | undefined): ThemeAccent {
  const key = THEME_KEY[theme ?? ""] ?? "magenta";
  const a = ACCENTS[key] ?? ACCENTS.magenta;
  return { bright: a.b, deep: a.d, key };
}

export function themeTint(bright: string, amount = 16, mixWith = "#f9f5ec"): string {
  return `color-mix(in oklab, ${bright} ${amount}%, ${mixWith})`;
}
