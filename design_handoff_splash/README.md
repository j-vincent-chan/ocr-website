# Handoff: OCR intro splash — "Concurrence" (option 1a)

## Overview
A 4.5-second introduction for the homepage of ocr.ucsf.edu. Sixteen hairlines draw across a dark stage at scattered angles, slide until all of them pass through one shared point, and at the instant of connection the centre opens: a cream disc blooms outward, colour floods into the lines as it passes, the lines retract to the exact proportions of the OCR sunburst, the wordmark settles beside it, and the whole lockup flies into the header while the homepage rises underneath. It reinforces what OCR does (independent capabilities become one mark) without a fade-in logo or stock science imagery.

It plays once per browser session, on `/` only, and is skippable.

## About the design files
Everything in this folder is a **design reference created in HTML**, not production code to copy as-is. Recreate it inside the existing TanStack Start + React 19 + Tailwind v4 codebase using its patterns.

- `OCR Splash.dc.html` (+ `support.js`, `assets/`): the prototype. Open it in a browser next to `support.js`. **Concept 1a plays by default**; the chip bar that appears afterwards switches to ten alternates (2a–2j) that are **not in scope**. Click anywhere / Esc to fast-forward, ↻ to replay.
- `splash-engine.ts`: the timeline math of 1a as pure functions. **Port this verbatim** — it is the source of truth for every time, ease and distance below.
- `IntroSplash.tsx`: a reference React component that drives `splash-engine.ts`. Adapt it (imports, class names, where it mounts); do not reinvent the frame loop.

## Fidelity
High-fidelity. Timing, easing, geometry, colours and the handoff into the header are final. The homepage underneath the prototype is a recreation of the current `/` for context only — do not change the real homepage beyond the three `data-intro-*` attributes listed under Integration.

## What the viewer sees
1. **Emergence (0–1.3s).** Dark ink stage. Sixteen ivory hairlines sweep in edge-to-edge, one after another, each at its own angle and offset. Near lines are brighter and thicker, far lines fainter and thinner.
2. **Interaction (0.45–2.05s).** Each line slides perpendicular to itself and corrects its angle until all sixteen pass through one point left of centre (where the logo will sit). Early arrivals form a partial star; the last one lags slightly, then locks. A soft ivory glow pulses at the point of connection.
3. **Transformation (2.1–3.0s).** The centre opens (inner void grows with a slight overshoot), a cream disc expands from the point until it fills the viewport, and as its edge passes each line the ivory turns to that ray's brand colour. Meanwhile the lines retract from the screen edges to the logo's outer radius, thicken to the logo's stroke, and the star settles 10° into its final orientation. At 3.0s the exact `SunburstLogo` geometry sits at 150px on cream.
4. **Resolution (2.9–3.7s).** "Office of / Collaborative Research" (Fraunces, 26px) slides in 16px from the left beside the logo. Hold.
5. **Handoff (3.7–4.5s).** Logo and wordmark fly to the header lockup (44px logo, 15px text) while the cream disc fades to reveal the page and the hero content rises 18px into place. At landing the real header lockup is shown and the overlay is removed. No layout shift, no flash.

## Geometry
All in CSS px of the viewport. `W`, `H` = viewport; `L = hypot(W, H)`.

- **Ray definition** (identical to `SunburstLogo`: a 2×22 rect, rx 1, at y 4–26 in a 100-unit box, rotated 11.25°·j). As a round-capped line at rendered size `S`: angle `φ_j = −90° + 11.25°·j` (j = 0..31, clockwise, screen coordinates), from radius `0.25·S` to `0.45·S`, stroke width `0.02·S`, `stroke-linecap: round`, colour `RAY_COLORS[j % 16]`. Rays j and j+16 share a colour, so the mark is 16 full lines through the centre — which is what the animation exploits.
- **Hold size** `S0` = 150px (W ≥ 640) or 112px (W < 640).
- **Lockup** = logo + gap (26px / 18px under 640) + wordmark (Fraunces 400, 26px / 20px, line-height 1.25, `font-variation-settings: "opsz" 15`, colour `--ink`). The lockup is centred horizontally; its vertical centre is at `0.47·H`. `C0` = logo centre.
- **Flight target** = the header `SunburstLogo` rect (centre + width, 44px) and the header wordmark `<span>` rect. Wordmark scale `k = headerTextHeight / splashTextHeight` (≈ 15/26). Both are measured from the DOM after Fraunces loads; remeasure on resize.
- **Per-line parameters** (i = 0..15; line i = rays i and i+16):

| i | offset F (× 0.46·min(W,H)) | angle error | draw dir | depth | converge rank |
|---|---|---|---|---|---|
| 0 | 0.62 | +14° | → | 0.90 | 9 |
| 1 | −0.38 | −19° | ← | 0.45 | 3 |
| 2 | 0.91 | +8° | → | 0.70 | 13 |
| 3 | −0.74 | −11° | → | 1.00 | 6 |
| 4 | 0.27 | +21° | ← | 0.55 | 11 |
| 5 | −0.55 | −6° | → | 0.80 | 1 |
| 6 | 0.83 | +17° | ← | 0.40 | 15 |
| 7 | −0.21 | −15° | ← | 0.65 | 7 |
| 8 | 0.46 | +5° | → | 0.95 | 16 |
| 9 | −0.97 | −22° | ← | 0.50 | 4 |
| 10 | 0.35 | +12° | → | 0.75 | 12 |
| 11 | −0.68 | −9° | → | 0.60 | 8 |
| 12 | 0.78 | +19° | ← | 0.85 | 2 |
| 13 | −0.44 | −13° | → | 0.42 | 14 |
| 14 | 0.24 | +7° | ← | 1.00 | 5 |
| 15 | −0.86 | −17° | → | 0.68 | 10 |

`rk = (rank − 1) / 15` drives the stagger. These arrays are in `splash-engine.ts`; keep them fixed so the intro is identical on every visit.

## Timeline (seconds, speed 1)
`seg(start, dur, ease)` = eased progress clamped 0..1. Eases are the standard easings.net curves; `outBack` uses c1 = 1.25.

| Beat | Start | Duration | Ease | From → to |
|---|---|---|---|---|
| Line i draws in | 0.05 + 0.45·rk | 0.70 | outExpo | drawing front sweeps the full line (length 2L) in direction `dir` |
| Line i converges | 0.45 + 0.65·rk^1.5 | 0.75 + 0.20·rk | inOutQuint | offset → 0; angle → φ_i − 10°; opacity lerp(0.3, 0.95, depth) → 0.95; width lerp(0.8, 1.5, depth) → 1.4px |
| Lock | 2.05 | — | — | last line arrives |
| Glow rise | 2.00 | 0.12 | outCubic | opacity 0 → 0.5 |
| Glow fall | 2.13 | 0.50 | inOutCubic | opacity → 0 |
| Glow scale | 2.00 | 0.60 | outExpo | 0.4 → 1.5 (260px element) |
| Inner void opens | 2.10 | 0.60 | outBack | inner radius 0 → 0.25·S0 |
| Rays retract | 2.10 | 0.80 | inOutQuint | outer radius L → 0.45·S0 |
| Stroke thickens | 2.10 | 0.70 | inOutCubic | 1.4px → 0.02·S0 |
| Cream disc | 2.10 | 0.90 | inOutExpo | radius 0 → L; dark stage removed at 3.0 |
| Settle rotation | 2.10 | 0.90 | outCubic | −10° → 0° |
| Wordmark | 2.90 | 0.50 | outExpo | opacity 0 → 1, x −16px → 0 |
| Logo canonical | 3.00 | — | — | exact SunburstLogo at S0, C0, true colours |
| Hold | 3.0 → 3.7 | | | |
| Flight | 3.70 | 0.80 | inOutExpo | centre C0 → header logo centre; S0 → 44; wordmark translate(dx, dy) scale(k) |
| Disc fade | 3.70 | 0.50 | inOutCubic | opacity 1 → 0 (page appears) |
| Hero rise | 3.70 | 0.80 | inOutExpo | hero content translateY 18px → 0 |
| Skip visible | 0.90 → 3.50 | | | fades 0.4s |
| Done | 4.50 | | | overlay removed; header lockup opacity 1 |

Colour split during the bloom: for each ray, the part at radius ≥ D (disc radius) is ivory at the line's opacity; the part at radius ≤ D is the brand hex at opacity 1. The split is exact because every line passes through the disc centre after the lock — no masks needed.

## Visual spec
- **Stage**: `radial-gradient(120% 90% at 50% 45%, oklch(0.21 0.055 265) 0%, oklch(0.125 0.045 265) 75%)` on the fixed overlay; set to `transparent` once the disc covers the viewport (3.0s).
- **Lines**: `rgb(242,239,232)` (ivory), round caps, 0.8–1.5px, opacity 0.3–0.95 by depth; equalise to 1.4px / 0.95 on convergence.
- **Glow**: 260×260 div, `radial-gradient(circle, rgba(242,239,232,.9) 0%, rgba(242,239,232,0) 62%)`, centred at C0 via transform, `will-change: transform, opacity`.
- **Disc**: SVG circle, fill `var(--cream)` (oklch(0.97 0.012 85), the hero background), under the rays.
- **Rays (coloured)**: `RAY_COLORS[j % 16]` from `SunburstLogo`, opacity 1.
- **Wordmark**: `font-display`, 400, 26px (20px under 640), `leading-tight`, `text-ink`, `font-variation-settings: "opsz" 15` (so the scaled-down glyphs match the 15px header text exactly at landing), `white-space: nowrap`, `transform-origin: 0 0`.
- **Skip**: bottom-right, 20px/18px inset, Inter 500 11px, `tracking-[0.22em]`, uppercase, `rgba(242,239,232,.6)` on the dark stage, `--ink` at 50% once cream; opacity transition 0.4s.
- **Header lockup**: opacity 0 while the intro plays (gated by CSS, see Integration), 1 at landing. Nothing else in the header changes.
- **Hero content**: the hero's inner content container only (not the header, not the backdrop) carries the 18px rise.

## Behaviour
- **Where**: `/` only. Never on other routes or client-side navigations back to `/`.
- **Once per session**: `sessionStorage['ocr-intro-seen'] = '1'` is written when the intro finishes (also after a skip). Present → no overlay at all.
- **No flash**: the overlay is part of the server-rendered HTML with the dark stage visible, so the first paint is the stage, never the homepage. An inline `<script>` in `<head>` decides before paint whether this visit plays (`document.documentElement.dataset.intro = 'play' | 'skip'`); CSS hides the overlay for `skip` and hides the header lockup for `play`. `<noscript>` hides the overlay. The page itself is fully rendered underneath from the start, so nothing loads or shifts at the handoff.
- **Fonts**: wait for `document.fonts.load('26px Fraunces')` and `'15px Fraunces'` (max 1.2s) before measuring and starting; the dark stage is on screen in the meantime.
- **Skip**: click/tap anywhere on the overlay, the Skip button, or Esc / Enter / Space. Skipping does not cut: the time scale eases toward 4.5× (`scale += (4.5 − scale)·min(1, dt·10)`) so the remainder plays as a fast-forward and still lands in the header.
- **Scroll**: `body { overflow: hidden }` while playing; restored at the end.
- **Resize**: remeasure geometry (lockup layout, header targets) on `resize`; the frame function reads it on the next tick.
- **Reduced motion** (`prefers-reduced-motion: reduce`): cream overlay; the finished logo + wordmark fade in over 0.6s, hold, the header lockup appears at 1.8s while the overlay fades out over 0.5s; done at 2.35s. Nothing moves.
- **Finish**: hide the overlay (`display: none`), header lockup opacity 1, hero transform cleared, scroll restored, session flag written.

## Integration
New files
- `src/components/site/intro/splash-engine.ts` — copy of `splash-engine.ts`.
- `src/components/site/intro/IntroSplash.tsx` — adapted from `IntroSplash.tsx`.

Touch points
- `src/routes/__root.tsx` — add to `head()`: an inline script (run before paint) and the gating styles. Suggested script:
  ```js
  (function(){try{var p=location.pathname==='/'&&!sessionStorage.getItem('ocr-intro-seen');document.documentElement.dataset.intro=p?'play':'skip'}catch(e){document.documentElement.dataset.intro='play'}})();
  ```
  and `<noscript><style>[data-intro-overlay]{display:none}</style></noscript>`.
- `src/styles.css` — `html[data-intro="skip"] [data-intro-overlay] { display: none; }` and `html[data-intro="play"] [data-intro-header-lockup] { opacity: 0; }`. No keyframes needed; the loop is rAF-driven.
- `src/components/site/chrome.tsx` — on the header `<Link to="/">`: `data-intro-header-lockup`; on its `<SunburstLogo>`: `data-intro-header-logo` (pass through to the `<svg>`); on the wordmark `<span>`: `data-intro-header-text`.
- `src/routes/index.tsx` — `data-intro-hero` on the hero's `relative z-10 max-w-7xl …` content div; render `<IntroSplash />` inside `Hero` (position irrelevant, it is `fixed`). Only the home route renders it.

Do not render the component on other routes and do not run any timeline logic during SSR (everything lives in `useEffect`).

## Performance
- 64 `<line>` elements (32 ivory + 32 colour), one `<circle>`, one glow `<div>`, one wordmark `<div>`. Attribute writes only; no React state per frame, no filters, masks or clip-paths, no layout reads inside the loop (geometry is measured once and on resize).
- `requestAnimationFrame` with `dt` clamped to 50ms so a background tab does not jump. Budget is well under 2ms/frame on a 2018 laptop.
- Cancel the frame loop and timers on unmount.

## Accessibility
- Overlay graphics are `aria-hidden`; the Skip button is a real `<button>` (focusable, labelled "Skip intro").
- Esc / Enter / Space skip. The page behind is already in the DOM and reachable by assistive tech; the intro only covers it visually for ≤ 4.5s.
- Reduced motion gets the static reveal described above.
- Contrast: ivory lines on ink and ink text on cream exceed 4.5:1; the skip label is decorative-weight and additionally keyboard-reachable.

## Design tokens
| Prototype value | Token / source |
|---|---|
| oklch(0.97 0.012 85) disc, reduced-motion background | `--cream` |
| oklch(0.14 0.06 265) wordmark, skip (50%) | `--ink` |
| oklch(0.21 0.055 265) → oklch(0.125 0.045 265) stage | new, local to the component (`STAGE_BG`) |
| rgb(242,239,232) ivory lines, glow | new, local (`IVORY`) |
| #1e3a8a #0ea5e9 #10b981 #f59e0b #ef4444 #ec4899 #8b5cf6 | `SunburstLogo` colours (unchanged) |
| Fraunces 400 · Inter 500 | `--font-display` · `--font-sans` |

## Assets
None new. The mark is drawn from the same numbers as `SunburstLogo`; fonts are already loaded by `__root.tsx`. `assets/hero-constellation.png` in this folder exists only so the prototype's homepage recreation renders.

## Definition of done
- Fresh session, `/`: the intro plays exactly as the prototype (compare side by side at 1440×900 and 390×844), lands on the header lockup with no visible jump, and the page is scrollable immediately after.
- Reload in the same session, or navigate to another route and back: no intro, no flash of the dark stage, header lockup visible from first paint.
- Skip by click and by Esc fast-forwards and still lands in the header.
- `prefers-reduced-motion: reduce`: static reveal, no movement.
- No console errors; `npm run build` and lint pass; Lighthouse CLS for `/` unchanged.

## Files
- `OCR Splash.dc.html`, `support.js`, `assets/hero-constellation.png` — prototype (open in a browser; 1a is the default concept).
- `splash-engine.ts` — timeline math, port verbatim.
- `IntroSplash.tsx` — reference React component.
- `CURSOR_PROMPT.md` — paste-ready brief for Cursor.
- `OPEN_ITEMS.md` — decisions still pending.
