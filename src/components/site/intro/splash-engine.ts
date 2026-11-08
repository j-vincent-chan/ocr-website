/**
 * OCR intro splash — "Concurrence" (design option 1a).
 * Framework-agnostic timeline math. Pure functions, no DOM.
 *
 * Port this file verbatim. The React component (IntroSplash.tsx) only measures the
 * page, calls computeFrame(t) once per animation frame and writes the result to SVG.
 *
 * Coordinate system: CSS pixels of the viewport. Angles in radians, screen convention
 * (x right, y down, 0 = +x, positive = clockwise).
 */

/** Same 16-colour cycle as SunburstLogo in src/components/site/chrome.tsx. Ray j uses RAY_COLORS[j % 16]. */
export const RAY_COLORS = [
  "#1e3a8a",
  "#0ea5e9",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#8b5cf6",
  "#1e3a8a",
  "#0ea5e9",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#8b5cf6",
  "#1e3a8a",
  "#0ea5e9",
] as const;

/** Monochrome line colour while the stage is dark. */
export const IVORY = "rgb(242,239,232)";

/** Dark stage behind the lines (overlay background until the cream disc covers the viewport). */
export const STAGE_BG =
  "radial-gradient(120% 90% at 50% 45%, oklch(0.21 0.055 265) 0%, oklch(0.125 0.045 265) 75%)";

/** Timeline in seconds at speed 1. */
export const T = {
  skipShow: 0.9,
  lock: 2.05, // last line reaches the shared point
  bloom: 2.1, // centre opens, rays retract, cream disc grows
  word: 2.9, // wordmark slides in
  logo: 3.0, // logo is canonical (final size, position, colour); stage is fully cream
  flight: 3.7, // lockup flies into the header
  flightDur: 0.8,
  end: 4.5,
} as const;

/** Lines lock 10° early and settle to 0° during the bloom. */
const A = (-10 * Math.PI) / 180;

/** Per-line parameters, i = 0..15. Line i is rays i and i + 16 (opposite directions, same colour). */
const F = [
  0.62, -0.38, 0.91, -0.74, 0.27, -0.55, 0.83, -0.21, 0.46, -0.97, 0.35, -0.68, 0.78, -0.44, 0.24,
  -0.86,
]; // perpendicular offset, × min(W,H) × 0.46
const JIT = [14, -19, 8, -11, 21, -6, 17, -15, 5, -22, 12, -9, 19, -13, 7, -17].map(
  (d) => (d * Math.PI) / 180,
); // initial angle error
const DIR = [1, -1, 1, 1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, -1, 1]; // draw-in direction
const DEPTH = [0.9, 0.45, 0.7, 1, 0.55, 0.8, 0.4, 0.65, 0.95, 0.5, 0.75, 0.6, 0.85, 0.42, 1, 0.68]; // 1 = near (brighter, thicker)
const ORDER = [5, 12, 1, 9, 14, 3, 7, 11, 0, 15, 4, 10, 2, 13, 6, 8]; // ORDER[k] = line that converges k-th
const RANK: number[] = [];
ORDER.forEach((line, k) => {
  RANK[line] = k;
});

/** Direction of ray j: straight up for j = 0, then 11.25° clockwise per ray. */
export const PHI = Array.from({ length: 32 }, (_, j) => ((-90 + j * 11.25) * Math.PI) / 180);

export const ease = {
  linear: (p: number) => p,
  outExpo: (p: number) => (p >= 1 ? 1 : 1 - Math.pow(2, -10 * p)),
  inOutExpo: (p: number) =>
    p <= 0
      ? 0
      : p >= 1
        ? 1
        : p < 0.5
          ? Math.pow(2, 20 * p - 10) / 2
          : (2 - Math.pow(2, -20 * p + 10)) / 2,
  inOutQuint: (p: number) => (p < 0.5 ? 16 * Math.pow(p, 5) : 1 - Math.pow(-2 * p + 2, 5) / 2),
  inOutCubic: (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2),
  outCubic: (p: number) => 1 - Math.pow(1 - p, 3),
  outBack: (p: number) => {
    const c1 = 1.25;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2);
  },
};

export const lerp = (a: number, b: number, p: number) => a + (b - a) * p;

/** Eased progress of a segment that starts at `start` and lasts `dur`, clamped to 0..1. */
export const seg = (
  t: number,
  start: number,
  dur: number,
  e: (p: number) => number = ease.linear,
) => e(Math.min(1, Math.max(0, (t - start) / dur)));

export interface Geometry {
  W: number;
  H: number;
  /** Viewport diagonal; lines are "infinite" at this length and the cream disc covers the viewport at this radius. */
  L: number;
  /** Rendered size of the logo during the hold (150px, or 112px under 640px wide). */
  S0: number;
  /** Logo centre during the hold. */
  C0: { x: number; y: number };
  /** Header logo centre + rendered size (44px) — the flight target. */
  header: { x: number; y: number; size: number };
  /** Wordmark flight: translate (dx, dy) and scale k from the splash wordmark to the header wordmark. */
  text: { dx: number; dy: number; k: number };
}

/**
 * Lays out the splash lockup and returns everything computeFrame needs.
 * `wordEl` is the splash wordmark (absolutely positioned inside the fixed overlay). This function sets its
 * font-size, left and top. Call after the Fraunces font has loaded and again on resize.
 */
export function measureGeometry(
  wordEl: HTMLElement,
  headerLogoRect: DOMRect,
  headerTextRect: DOMRect,
  W = window.innerWidth,
  H = window.innerHeight,
): Geometry {
  const small = W < 640;
  const S0 = small ? 112 : 150;
  const fontPx = small ? 20 : 26;
  const gap = small ? 18 : 26;
  wordEl.style.fontSize = `${fontPx}px`;
  const ww = wordEl.offsetWidth;
  const wh = wordEl.offsetHeight;
  const total = S0 + gap + ww;
  const C0 = { x: W / 2 - total / 2 + S0 / 2, y: H * 0.47 };
  const left = C0.x + S0 / 2 + gap;
  const top = C0.y - wh / 2;
  wordEl.style.left = `${left}px`;
  wordEl.style.top = `${top}px`;
  return {
    W,
    H,
    L: Math.hypot(W, H),
    S0,
    C0,
    header: {
      x: headerLogoRect.left + headerLogoRect.width / 2,
      y: headerLogoRect.top + headerLogoRect.height / 2,
      size: headerLogoRect.width || 44,
    },
    text: {
      dx: headerTextRect.left - left,
      dy: headerTextRect.top - top,
      k: wh ? headerTextRect.height / wh : 15 / fontPx,
    },
  };
}

export interface Segment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  width: number;
  opacity: number;
  color: string;
}

export interface Frame {
  /** Ivory parts of the 32 rays (outside the cream disc). null = not drawn. */
  ivory: (Segment | null)[];
  /** Coloured parts of the 32 rays (inside the cream disc, and the whole ray after T.logo). */
  color: (Segment | null)[];
  /** Cream disc; r reaches L at T.logo, opacity fades during the flight. */
  disc: { cx: number; cy: number; r: number; opacity: number };
  /** Whether the dark stage background should still be painted (false once the disc covers the viewport). */
  stageVisible: boolean;
  /** Ivory glow at the moment of connection. 260px element, centred, scaled. */
  glow: { x: number; y: number; opacity: number; scale: number };
  /** Splash wordmark. transform = translate(tx, ty) scale(k), origin top-left. */
  word: { opacity: number; tx: number; ty: number; k: number };
  /** translateY for the hero content (18px → 0 during the flight). */
  heroShift: number;
  skipVisible: boolean;
  /** Flight finished: hide the overlay and show the header lockup. */
  done: boolean;
}

/** A ray segment from distance s0 to s1 along angle `ang` from point (ox, oy). null when empty. */
function segment(
  ox: number,
  oy: number,
  ang: number,
  s0: number,
  s1: number,
  width: number,
  opacity: number,
  color: string,
): Segment | null {
  if (s1 - s0 < 0.05 || opacity <= 0.001) return null;
  const c = Math.cos(ang);
  const s = Math.sin(ang);
  return {
    x1: ox + c * s0,
    y1: oy + s * s0,
    x2: ox + c * s1,
    y2: oy + s * s1,
    width,
    opacity,
    color,
  };
}

export function computeFrame(t: number, g: Geometry): Frame {
  const { L, S0, C0 } = g;
  const pf = seg(t, T.flight, T.flightDur, ease.inOutExpo);
  const cx = lerp(C0.x, g.header.x, pf);
  const cy = lerp(C0.y, g.header.y, pf);
  const S = lerp(S0, g.header.size, pf);
  const ivory: (Segment | null)[] = new Array(32).fill(null);
  const color: (Segment | null)[] = new Array(32).fill(null);
  let D = L;

  if (t < T.logo) {
    D = L * seg(t, T.bloom, 0.9, ease.inOutExpo); // cream disc radius
    const ri = 0.25 * S0 * seg(t, T.bloom, 0.6, ease.outBack); // inner void opens (slight overshoot)
    const ro = lerp(L, 0.45 * S0, seg(t, T.bloom, 0.8, ease.inOutQuint)); // rays retract from the edges
    const pbw = seg(t, T.bloom, 0.7, ease.inOutCubic); // hairline → logo proportion
    const rot = -A * ease.outCubic(seg(t, T.bloom, 0.9)); // settle the 10° lead
    const span = Math.min(g.W, g.H) * 0.46;

    for (let i = 0; i < 16; i++) {
      const rk = RANK[i] / 15;
      const pd = seg(t, 0.05 + 0.45 * rk, 0.7, ease.outExpo); // draw-in
      const pc = seg(t, 0.45 + 0.65 * Math.pow(rk, 1.5), 0.75 + 0.2 * rk, ease.inOutQuint); // converge
      const th = lerp(PHI[i] + JIT[i], PHI[i] + A, pc) + rot;
      const off = F[i] * span * (1 - pc);
      const alpha = lerp(lerp(0.3, 0.95, DEPTH[i]), 0.95, pc);
      const width = lerp(lerp(lerp(0.8, 1.5, DEPTH[i]), 1.4, pc), 0.02 * S0, pbw);
      const ox = C0.x - Math.sin(th) * off; // line shifted perpendicular to itself
      const oy = C0.y + Math.cos(th) * off;
      const sF = DIR[i] > 0 ? -L + 2 * L * pd : L - 2 * L * pd; // drawing front along the line
      let a0 = ri,
        a1 = ro,
        b0 = ri,
        b1 = ro; // ray A (angle th) and ray B (angle th + π), as radial distances
      if (DIR[i] > 0) {
        a1 = Math.min(a1, sF);
        b0 = Math.max(b0, -sF);
      } else {
        a0 = Math.max(a0, sF);
        b1 = Math.min(b1, -sF);
      }
      const hex = RAY_COLORS[i];
      // Outside the disc the line is ivory at its depth opacity; inside it is the brand colour at full opacity.
      ivory[i] = segment(ox, oy, th, Math.max(a0, D), a1, width, alpha, IVORY);
      color[i] = segment(ox, oy, th, a0, Math.min(a1, D), width, 1, hex);
      ivory[i + 16] = segment(ox, oy, th + Math.PI, Math.max(b0, D), b1, width, alpha, IVORY);
      color[i + 16] = segment(ox, oy, th + Math.PI, b0, Math.min(b1, D), width, 1, hex);
    }
  } else {
    // Canonical logo: identical geometry to SunburstLogo (rect 2×22, rx 1, 24–46 from centre in a 100 box).
    for (let j = 0; j < 32; j++) {
      color[j] = segment(cx, cy, PHI[j], 0.25 * S, 0.45 * S, 0.02 * S, 1, RAY_COLORS[j % 16]);
    }
  }

  const g1 = seg(t, T.lock - 0.05, 0.12, ease.outCubic);
  const g2 = seg(t, T.lock + 0.08, 0.5, ease.inOutCubic);
  const pw = seg(t, T.word, 0.5, ease.outExpo);

  return {
    ivory,
    color,
    disc: { cx: C0.x, cy: C0.y, r: D, opacity: 1 - seg(t, T.flight, 0.5, ease.inOutCubic) },
    stageVisible: t < T.logo,
    glow: {
      x: C0.x,
      y: C0.y,
      opacity: 0.5 * g1 * (1 - g2),
      scale: 0.4 + 1.1 * seg(t, T.lock - 0.05, 0.6, ease.outExpo),
    },
    word: {
      opacity: pw,
      tx: lerp(0, g.text.dx, pf) - 16 * (1 - pw),
      ty: lerp(0, g.text.dy, pf),
      k: lerp(1, g.text.k, pf),
    },
    heroShift: 18 * (1 - pf),
    skipVisible: t > T.skipShow && t < T.flight - 0.2,
    done: pf >= 1,
  };
}

/** Frame to show for prefers-reduced-motion: the finished logo and wordmark on cream, nothing moving. */
export const REDUCED_MOTION_TIME = T.logo + 0.3;
