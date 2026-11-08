# Open items

Resolve with the owner before launch. None of these block the build; the defaults below are what the prototype does.

## Behaviour
- ⚑ **Frequency.** Default is once per browser session on `/` (`sessionStorage`). Alternatives: once per day/week (`localStorage` with a timestamp), or first visit ever. Marketing campaigns that deep-link to `/` will always see it once.
- ⚑ **Duration.** 4.5s total, logo moment at 3.0–3.7s. The prototype exposes a `speed` tweak; 1.1× (≈4.1s) still reads well if the team wants it closer to the 3–4s brief. Change only the time scale, not individual beats.
- ⚑ **Skip affordance.** The "Skip intro" label appears at 0.9s. Confirm whether to keep the label or rely on click/Esc only (the prototype has a `showSkip` tweak).
- ⚑ **Analytics.** Decide whether to send `intro_completed` / `intro_skipped` (with `t` at skip) to Vercel Analytics. Not included.
- ⚑ **Sound.** None by design. Confirm.

## Technical
- ⚑ **Gating script location.** The head inline script is the only way to avoid a dark flash for returning visitors on an SSR page. Confirm the team is comfortable with an inline script in `__root.tsx` (CSP: needs `'unsafe-inline'` or a nonce for that one script).
- ⚑ **Private browsing.** If `sessionStorage` throws, the intro plays on every load of `/`. Acceptable, or fall back to a cookie?
- ⚑ **Header on mobile.** The flight lands on the header lockup, which is visible at every width today. If the mobile header ever drops the wordmark, the wordmark should fade out at the end of the flight instead of flying.
- ⚑ **Bots / Lighthouse.** The overlay is in the SSR HTML. LCP will be measured on the dark stage, not the hero. Decide whether to skip the intro when `navigator.webdriver` is true or for Lighthouse runs.

## Design
- ⚑ **Stage gradient and ivory** are new values, not tokens (README § Design tokens). Fine to keep local to the component; add `--stage-hi` / `--stage-lo` tokens only if reused.
- ⚑ **Hero rise.** The 18px rise is applied to the hero content container only. Confirm it should not also apply to the constellation image (prototype: image is static).
- ⚑ **Alternates.** Concepts 2a–2j remain in the prototype for comparison; nothing from them ships.
