# Cursor prompt: homepage intro splash

Paste everything below the line into Cursor (Agent mode) at the root of `j-vincent-chan/ocr-website`. Keep this folder (`design_handoff_splash/`) in the repo or attach its files to the chat so Cursor can read them.

---

You are adding a one-time intro animation to the homepage of this repo (TanStack Start + React 19 + Tailwind v4, Vite). It plays once per browser session on `/`, resolves into the existing `SunburstLogo`, flies into the header, and must never cause a flash or layout shift.

**Read first, in this order:**
1. `design_handoff_splash/README.md`: what it looks like, geometry, the exact timeline, behaviour, integration points, definition of done.
2. `design_handoff_splash/splash-engine.ts`: the timeline math as pure functions. Copy it to `src/components/site/intro/splash-engine.ts` **unchanged**. Every number in it is final.
3. `design_handoff_splash/IntroSplash.tsx`: reference component. Copy to `src/components/site/intro/IntroSplash.tsx` and adapt imports and class names to this repo; keep the frame loop, skip, resize, reduced-motion and finish logic as written.
4. `design_handoff_splash/OPEN_ITEMS.md`: decisions still open; keep them visible in the PR.
5. `design_handoff_splash/OCR Splash.dc.html`: the HTML prototype. Open it in a browser next to `support.js`. Concept **1a** plays by default — that is the one to build. The chip bar that appears afterwards switches to alternates (2a–2j); ignore them. **Do not ship this file.**
6. Existing code you will touch: `src/routes/__root.tsx` (head), `src/styles.css`, `src/components/site/chrome.tsx` (`Header`, `SunburstLogo`), `src/routes/index.tsx` (`Hero`).

**How to build it:**
- Gating before paint: in `__root.tsx` `head()`, add an inline script that sets `document.documentElement.dataset.intro` to `'play'` when `location.pathname === '/'` and `sessionStorage['ocr-intro-seen']` is unset, else `'skip'` (script text is in README § Integration). Add `<noscript><style>[data-intro-overlay]{display:none}</style></noscript>`.
- CSS in `styles.css`: `html[data-intro="skip"] [data-intro-overlay]{display:none}` and `html[data-intro="play"] [data-intro-header-lockup]{opacity:0}`. The component sets the lockup back to opacity 1 when it lands.
- Markers in `chrome.tsx`: `data-intro-header-lockup` on the header `<Link to="/">`, `data-intro-header-logo` on its `<SunburstLogo>` (add a props pass-through so the attribute reaches the `<svg>`), `data-intro-header-text` on the wordmark `<span>`. No visual change to the header.
- `index.tsx`: add `data-intro-hero` to the hero's `relative z-10 max-w-7xl …` content div and render `<IntroSplash />` inside `Hero`. Home route only. The overlay must be in the server-rendered HTML (dark stage visible) so first paint is the stage, not the page.
- The overlay is `fixed inset-0 z-[100]`; the header is `z-40`, so the overlay covers it. Lock body scroll while playing, restore after.
- Colours: `--cream` for the disc and reduced-motion background, `--ink` for the wordmark and the late skip label, `SunburstLogo`'s colour array for the rays (import it rather than duplicating if you export it), ivory and the stage gradient as local constants from the engine file.
- Fonts: start only after `document.fonts.load('26px Fraunces')` and `'15px Fraunces'` resolve (1.2s cap). The wordmark uses `font-variation-settings: "opsz" 15` so its scaled-down glyphs match the 15px header text at landing.
- Skip: click anywhere on the overlay, the Skip button, or Esc / Enter / Space eases the time scale to 4.5× (fast-forward, not a cut).
- Reduced motion: `prefers-reduced-motion: reduce` → static logo + wordmark fade in on cream, hold, overlay fades out at 1.8s, done at 2.35s. Already implemented in the reference component.
- Finish: hide overlay, lockup opacity 1, clear the hero transform, restore scroll, write `sessionStorage['ocr-intro-seen']='1'`.
- Do not use `setState` inside the frame loop, no CSS filters/masks, no layout reads per frame. Cancel rAF and timers on unmount.

**Deliverables:**
1. `src/components/site/intro/splash-engine.ts`, `src/components/site/intro/IntroSplash.tsx`
2. Head script + noscript in `__root.tsx`; gating CSS in `styles.css`
3. `data-intro-*` markers in `chrome.tsx` and `index.tsx`; `<IntroSplash />` mounted in `Hero`
4. A short PR description listing the OPEN_ITEMS still unresolved

**Definition of done:** in a fresh session `/` plays the intro exactly like the prototype at 1440×900 and 390×844 and lands on the header lockup with no visible jump; reloading in the same session, or navigating away and back, shows the page immediately with no dark flash; Skip (click and Esc) fast-forwards and still lands; reduced motion shows the static reveal; no console errors; `npm run build` and lint pass; CLS on `/` is unchanged.

Work in this order: engine file → component rendering the static final frame (`computeFrame(REDUCED_MOTION_TIME)`) → frame loop → header markers and flight → head gating script and CSS → skip and reduced motion → compare against the prototype in the browser at both sizes.
