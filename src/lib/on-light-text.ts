/** Brand fills stay bright. These are the text colors that clear WCAG AA on ivory and white. */
const SMALL: Record<string, string> = {
  "var(--coral)": "var(--coral-aa)",
  "var(--teal)": "var(--teal-aa)",
  "var(--magenta)": "var(--magenta-aa)",
  "var(--lime)": "var(--lime-aa)",
  "var(--gold)": "var(--gold-aa)",
};

const DISPLAY: Record<string, string> = {
  "var(--coral)": "var(--coral-display)",
  "var(--teal)": "var(--teal-display)",
  "var(--magenta)": "var(--magenta-display)",
  "var(--lime)": "var(--lime-display)",
  "var(--gold)": "var(--gold-display)",
};

/** `display` is for 24px and larger. Anything smaller needs `small` (4.5:1). */
export function onLightText(color: string, scale: "small" | "display" = "small") {
  const map = scale === "display" ? DISPLAY : SMALL;
  return map[color] ?? color;
}

/** Brand magenta sits just under 4.5:1 on the dark panels. Other hues already clear it. */
const ON_DARK: Record<string, string> = {
  "var(--magenta)": "var(--magenta-ondark)",
};

export function onDarkText(color: string) {
  return ON_DARK[color] ?? color;
}
