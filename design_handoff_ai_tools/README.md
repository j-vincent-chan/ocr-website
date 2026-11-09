# Handoff: Research Resources & AI Tools (`/services/ai-tools`)

## Overview
Redesign of OCR's fourth service-arm page. It presents three in-house applications (Prospera, Signal, Runway) and the record they share (Atlas), links the Funding call that invites new tool proposals (working name **Open Build**), offers lab/program websites, and ends with a walkthrough booking. The page replaces the current `src/routes/services.ai-tools.tsx` (Products / Automations / Principles sections are retired).

## About the design files
`prototype/ai-tools-v2.dc.html` is a **design reference created in HTML**. It shows the intended look and behavior; it is not production code. Recreate it in the repo's existing environment (TanStack Start + React + Tailwind v4 + shadcn, tokens in `src/styles.css`) using the established patterns listed in `CURSOR_PROMPT.md`. Open the prototype in a browser (it needs `support.js` and `assets/` beside it, both included) to see the animations and drawer.

## Fidelity
**High-fidelity.** Colors, type, spacing, copy, and motion are final. Every color below already exists as a token in `src/styles.css`; use the token, not the literal.

## Page structure (top to bottom)
1. UCSF top bar + sticky adaptive header (existing `Header`, `navTone="dark"`)
2. Hero (dark) with index of the four tools
3. Applications: three cards, each with an animated console vignette
4. Atlas: the foundation
5. Open Build: the Funding call
6. Websites
7. Get started (dark)
8. Footer (existing)

Container everywhere: `max-w-7xl mx-auto px-6` (1280px). Section vertical padding `clamp(56px, 7vw, 96px)` unless noted. All two-column layouts are `flex flex-wrap` with `flex: N 1 <basis>px` children so they stack below ~900px.

---

## 1. Hero  (`data-tone="dark"`, `#top`)
- Background `--ink`; `GradientBlob` (720–760px, `opacity .42`, `blur 70px`, `--gradient-sunburst`) at `top:-260px; right:-140px`, animated: `drift 18s ease-in-out infinite` where `drift` = `translate(0,0) scale(1)` → `translate(-48px,36px) scale(1.07)` at 50%.
- Padding `clamp(40px,5vw,64px) 24px clamp(48px,6vw,72px)`.
- Eyebrow: `ArmEyebrow` grammar — 6px gold dot, `AI Tools · One of five service arms`, 11px / 500 / uppercase / tracking .24em, color `--ondark-muted`, the label part white.
- H1: Fraunces 500, `clamp(40px,5vw,60px)`, line-height 1.04, tracking −.02em, max-width 880px, white. Copy: `Software for the people` + span in `--gold`: `who run research.`
- Lede: Inter `clamp(16px,1.4vw,19px)`, line-height 1.55, `--ondark-muted`, max-width 640px.
- Buttons row (gap 12, mt 32): `pillWhite` "See the applications ↓" → `#apps`; `pillOutlineOnDark` "Book a walkthrough" → `#start`; text link in `--gold` 14px/500 "Have an idea for a tool? →" → `#open-build` (underline on hover).
- **Index** (mt `clamp(40px,5vw,64px)`, `border-top: 1px solid rgba(255,255,255,.18)`): one row per app (Prospera, Signal, Runway, Atlas). Row: `flex flex-wrap items-center gap-[16px_24px] py-[18px] px-2 -mx-2 rounded-xl border-b border-white/10`, hover `bg-white/6`, focus ring white inset. Row is a button (`role=button`, Enter/Space) that opens the drawer for that app.
  - number: Fraunces 18px, `rgba(255,255,255,.5)`, width 36px (`01`, `02`, `03`, `—`)
  - mark disc: 44px circle, background = app `fill`; mark 24px in `--ink` (CSS mask)
  - name: Fraunces 26px white, `flex: 0 1 200px`
  - role: Inter 15px `--ondark-muted`, `flex: 1 1 160px; min-width:0`
  - trailing group (`ml-auto`, gap 16, wraps as one unit): status line `font-mono 12px rgba(255,255,255,.6)` (`In development · prospera.ucsf.edu`, `Beta · signal.ucsf.edu`, `Beta · runway.ucsf.edu`, `In development · internal service`) + `→` in `rgba(255,255,255,.6)`.

## 2. Applications  (`#apps`, `data-tone="light"`, `bg-cream`)
- Header: `SectionHeader` grammar — eyebrow `The applications` (12px/500/uppercase/.18em, `--amber-text`), H2 Fraunces 500 `clamp(32px,4vw,48px)` lh 1.02 `--ink` "Three applications, one record.", lede `clamp(16px,1.4vw,19px)` `--ink-body` (copy in `ai-tools.ts`).
- **Maturity legend** (12px `--ink-muted-2`, gap 10×24, margin `-16px 0 32px`): label `MATURITY` (500, uppercase, .14em) then three swatches 30×18, radius 4:
  - In development: dashed border `ink/40`, grid 6px at `ink/16` — "In development: blueprint grid, dashed edge"
  - Beta: solid border `ink/20`, grid 6px at `ink/7` — "Beta: grid fading"
  - Released: solid border `ink/20`, white — "Released: clean"
- Cards stack with `gap: 56px`.

### Card anatomy (all three)
`article` = whole-card button: `flex flex-wrap rounded-[32px] overflow-hidden bg-white cursor-pointer`, `transition: box-shadow .4s, transform .4s`; hover `shadow-lift` + `translateY(-2px)`; focus `outline 2px --ink, offset 4px`. Order: Prospera text|vignette, Signal vignette|text (`flex-wrap-reverse` so text is first when stacked), Runway text|vignette.

**Maturity treatment** (driven by `maturity`):
- `development`: card border `1px dashed ink/35`; text column gets a blueprint grid overlay — `background-image: linear-gradient(ink/9 1px, transparent 1px), linear-gradient(90deg, ink/9 1px, transparent 1px); background-size: 18px 18px; mask-image: linear-gradient(180deg, #000 0%, rgba(0,0,0,.3) 100%)`.
- `beta`: border `1px solid --border`; grid at `ink/4.5`, mask `linear-gradient(180deg, #000 0%, transparent 70%)`.
- `released`: border `1px solid --border`; no grid.
(The grid recipe is the one in `in-development.tsx`; only alpha and mask differ.)

**Text column** (`flex: 5 1 340px; padding: clamp(28px,3.5vw,48px); flex-col; position: relative; isolation: isolate`):
1. Identity row (gap 14): 44px disc in app `fill` with 24px `--ink` mark; name Fraunces 32px `--ink`; eyebrow 12px/500/uppercase/.16em in app `text` color — `01 · <subtitle>`.
2. Pills (mt 22, gap 8): status pill `rounded-full px-[13px] py-[7px] text-[12px] font-semibold uppercase tracking-[.06em]`, background `fill` at ~18% alpha, text color app `text`, 7px dot in `fill`; eligibility pill same metrics, `font-medium`, `border 1px ink/20`, text `--ink-body`.
3. Card headline: Fraunces 26px lh 1.2 `--ink` (mt 24).
4. Body: 16px lh 1.6 `--ink-body` (mt 14).
5. Three bullets (mt 24, gap 10): 14px lh 1.5 `--ink-muted`, 5px dot in `fill` at `mt-2`.
6. Footer row (`mt-auto pt-8`, gap 12): `pillInk` "Open ‹Name› ↗" (external, `stopPropagation`) + text "Full details →" 14px/500 in app `text` color.

**Vignette column** (`flex: 7 1 400px; bg --ink; color white; padding clamp(24px,3vw,36px) clamp(24px,3vw,40px); flex-col; gap 12; relative; overflow hidden`): a 260px blurred circle (`blur 60px`, opacity .45) in the app `fill` at a corner; mono header row (12px `white/60`) left/right labels; the staged content (see §Interactions); footer 11px `white/40` "Illustrative · not live data" (Runway: left "solid actual · hatched projected (~)").

Per-app accents: Prospera `--violet` / `--violet-text`; Signal `--teal` / `--teal-text`; Runway `--coral` / `--coral-text`; Atlas `--amber` / `--amber-text`.

### Vignette content
**Prospera** — header `prospera · discover` | `synced nightly · 02:10`. Notice card (radius 16, `white/6` bg, `white/12` border, padding 20×22): mono 11px uppercase `white/50` `PAR-26-114 · NIAID · R01`; grade pill `Strong fit` (violet bg, ink text, 11px/600 uppercase .08em); title 16px white `Tissue-resident immunity in chronic inflammation`; 12px `white/55` `Due Feb 5 · 3 suggested investigators`; divider; three evidence lines 13px `white/82` with `●` in lime, lime, gold: `14 publications on tissue-resident T cells since 2021`, `Active NIAID R01 on mucosal immunity through 2028`, `No prior PAR submission on record (constraint)`. Two compact rows (radius 12, `white/4`, 13px): `RFA-HL-26-020 · Lung repair after viral injury` → pill `Moderate` (violet 55%); `PA-26-061 · Data science for immune aging` → pill `Exploratory` (outline `white/30`).

**Signal** — header `signal · review queue · ImmunoX` | lime pulsing dot + `12 new`. Three queue rows (radius 14, `white/6`, border `white/10`, padding 14×18; `flex-wrap`, tag column 90px mono 10px uppercase .12em): `Publication` (teal) "Single-cell atlas of the human thymus across the lifespan" / "Cell · 3 watched authors"; `Award` (gold) "R01 awarded · Mechanisms of B cell tolerance" / "NIH RePORTER · NIAID"; `News` (coral) "UCSF team maps immune memory after vaccination" / "UCSF News · 2 watched faculty quoted". Each row has chips `Approve` (teal bg, ink text, 11px/600) and `Archive` (outline). Footer mono 12px: `March digest · 9 approved items` | `Draft the digest →` (white).

**Runway** — header `runway · dashboard · Lee Lab` | `FY26 · closed through Feb`. Verdict: Fraunces `clamp(19px,1.8vw,23px)` lh 1.3 white: "Two accounts fall below six months of payroll by August. The postdoc on 7023 needs attention first." Four rows (`grid-cols-[minmax(96px,120px)_minmax(0,1fr)_64px] gap-[14px]`, 13px): track 10px tall radius 5 `white/10`; actual segment solid; projected segment `repeating-linear-gradient(135deg, <fill>/55 0 3px, transparent 3px 7px)`; label mono right-aligned.
| account | actual % | projected % | critical | label |
|---|---|---|---|---|
| 7023 · NIH R01 | 22 | 18 | yes (coral) | ~5 mo |
| 8810 · Gift | 62 | 16 | no (teal) | ~14 mo |
| 6610 · T32 | 44 | 0 | no | 9 mo |
| 5120 · Startup | 14 | 10 | yes | ~4 mo |
Critical labels use `oklch(0.78 0.16 30)`; others `white/80`.

## 3. Atlas  (`#atlas`, paper, `border-b --border`)
Two columns (`5 1 340px` / `7 1 400px`, gap 40×72, items center). Left: eyebrow `The foundation`, H2 "Atlas: the record all three read from.", body = Atlas `body`, `pillInk` button "How Atlas works →" (opens the Atlas drawer). Right: card `rounded-[28px] border --border bg-cream padding clamp(24px,3vw,36px)`: 52px amber disc with 28px mark, "Atlas" Fraunces 26px, tagline 13px `--ink-muted-2` `Identity · Research · Evidence`, right-aligned mono 12px `In development · internal service`; activities as a 2-column list (`auto-fit minmax(240px,1fr)`, 14px, 5px amber dots); divider; sources row 12px `--ink-muted-2`.

## 4. Open Build  (`#open-build`, `bg-cream`, `border-b --border`)
Content comes from `funding.ts` → `ai-tools` award. Left (`6 1 360px`): eyebrow in ArmEyebrow grammar with a `--teal-light` dot: `Funding & support · Open Build`; H2 `headA` + span in `--teal-text` `headB` ("Tell us the tool you wish existed. We may build it."); paragraph = `lead` (17px lh 1.6 `--ink-body`, max 600px); buttons: `pillInk` "Propose a tool →" (`applyHref`), `pillOutline` "Read the full call in Funding" → `/funding/ai-tools`. Right (`5 1 320px`): facts card `rounded-3xl bg-white border --border border-t-[5px] border-t-teal-light padding clamp(22px,3vw,30px)`; title Fraunces 24px "We build your tool"; access pill 11px uppercase with green dot (`ACCESS_DOT.open`) "Open to all of UCSF"; `FactRow` list (88px label column) from `facts`; 12px `--muted-foreground` `Official title: <official>`.

## 5. Websites  (`#websites`, paper, dashed `ink/20` top & bottom borders, padding `clamp(48px,6vw,80px)`)
Blueprint grid background (same `GRID` + radial `MASK` as `in-development.tsx`). Left (`5 1 340px`): eyebrow `Also from this arm`, H2 `clamp(28px,3.4vw,40px)` "A website for your lab or program.", intro 16px (max 440px), `pillInk` "Inquire about a website →" (mailto). Right (`7 1 400px`): two dashed cards (`rounded-[20px] border-dashed ink/30 bg-white/80 p-[28px_30px]`, gap 20, `auto-fit minmax(240px,1fr)`): "Lab website" — `$5k` Fraunces 500 `clamp(44px,4.5vw,56px)` + "fixed fee" 14px, body 15px; "Program or institute website" — "By inquiry" Fraunces 500 34px, body 15px. A `showPrice` flag swaps `$5k` for "Fixed fee" (34px).

## 6. Get started  (`#start`, `data-tone="dark"`, `bg-ink`, padding `clamp(48px,6vw,80px)`)
`GradientBlob` top-right. Left (`7 1 360px`): eyebrow `--gold` `Get started`; H2 white `clamp(32px,4.2vw,52px)` "See a tool on your own work."; intro 17px `--ondark-muted`; divider `white/14` then 14px "Institutes, departments, and programs: talk to us about partnership →" (white, underlined). Right (`5 1 340px`): white card `rounded-[20px] p-7 border-t-[5px] border-t-amber shadow-[0_30px_60px_oklch(0.05_0.04_265/0.35)]`: "WALKTHROUGH" eyebrow `--amber-text`, "See a tool with us" Fraunces 24px, right "30 min / Free" 13px; person strip `rounded-2xl bg-amber/16 p-[14px_16px]` with 52px photo (`src/assets/people/vincent-chan.jpg`, white border + 2px amber ring), "You'll meet with" 11px uppercase, "Vincent Chan, PhD" Fraunces 20px, "OCR Director" 13px `--amber-text`; full-width `pillInk` "Book a time with Vincent →" (`VINCENT_BOOKINGS_URL`, `min-h-12`); footer 13px "No data or account required · or email ocr@ucsf.edu".

## 7. Drawer (all four apps)
Reuse the research-operations `ServiceDrawer`: right sheet `w-[min(540px,100%)]`, backdrop `ink/50 blur-[2px]`, `ro-drawer` animations (48px slide + fade, .3s/.25s). Content: 5px top bar in app `fill`; header row with 48px disc + mark, eyebrow `‹n› · ‹Name›` in app `text`, mono 12px status line; close button 36px circle; `headline` Fraunces 500 30px; `body` 15px lh 1.55; "WHAT IT DOES" label + activities (5px dots in `fill`); `FactRow` list; buttons `pillInk` "Open ‹Name› ↗" (hidden for Atlas) + `pillOutline` `askLabel` → `mailto(askSubject)`. Focus → close button on open, back to the trigger on close; Escape closes; body scroll locked.

## Interactions & behavior
- **Adaptive nav**: existing `useNavTone`; dark sections: hero, get-started, footer.
- **Whole-card click** opens the drawer. Inner "Open ↗" link stops propagation. Keyboard: Enter / Space.
- **Vignette playback**: each card has `active: boolean`. An `IntersectionObserver` (threshold 0.35, attached ~400ms after mount) sets `active = isIntersecting` — so it plays on entry and resets when scrolled away. `mouseenter` on an active card replays: set `active=false`, then `true` after 80ms. Easing everywhere `cubic-bezier(.2,.8,.2,1)`. When `active` is false, every delay is 0 (instant reset). Timings when `active` turns true:
  - Prospera: evidence line *i* fades/slides in (`opacity 0→1`, `translateX(-10px)→0`, 600ms) at `150 + i·230 ms`; "Strong fit" pill `opacity 0→1` (400ms) + `scale(.7)→1` (500ms) at 950ms; Moderate row at 1200ms and Exploratory row at 1320ms (`translateY(6px)→0`, 600ms).
  - Signal: queue row *i* slides in (`translateX(-14px)→0`, 600ms) at `i·160 ms`; at 1100ms the first row's background becomes `teal/14` and border `teal/55` (400ms).
  - Runway: actual bar *i* widens from 0 (900ms) at `100 + i·120 ms`; projected segment widens from 0 (700ms) at `900 + i·120 ms`; month label fades in (400ms) at `1000 + i·120 ms`; verdict sentence fades/rises (700ms) at 1200ms.
  - `prefers-reduced-motion: reduce` → render the final state with no transitions.
- **Hero blob** drifts (`drift`, 18s). Signal's "12 new" dot pulses (`pulse` 2s: opacity 1 → .4).
- **Hover**: cards lift (`shadow-lift`, −2px); pills/buttons use the repo's pill hover recipes; hero index rows get `bg-white/6`.
- **Responsive**: all sections wrap below ~900px; cards stack text-first; hero index rows wrap, with status + arrow kept together; nothing fixed-width except mark discs and photos.

## State
- `open: AppKey | null` (drawer), `lastTrigger` for focus return.
- `live: Record<AppKey, boolean>` (vignette activity) + `replayTimer`.
- `navTone` from the existing hook.
- Props/flags: `showPrice` (default true) toggles the `$5k` figure.
No data fetching; all content is static in `ai-tools.ts` and `funding.ts`.

## Design tokens (all in `src/styles.css`)
| Token | Value | Used for |
|---|---|---|
| `--ink` | `oklch(0.14 0.06 265)` | dark sections, headings, buttons, marks |
| `--background` / `--paper` | `oklch(0.99 0.005 90)` | page |
| `--cream` | `oklch(0.97 0.012 85)` | Applications, Open Build, Atlas card |
| `--secondary` | `oklch(0.95 0.012 85)` | nav pill hover (light) |
| `--border` / `--rule` | `oklch(0.91 0.012 90)` / `oklch(0.88 0.012 90)` | card and section borders |
| `--ink-body` / `--ink-muted` / `--ink-muted-2` | `oklch(0.3 …)` / `0.38` / `0.42` | body, bullets, labels |
| `--muted-foreground` | `oklch(0.48 0.03 265)` | footnotes, mono status |
| `--ondark-muted` | `oklch(0.82 0.02 265)` | body on ink |
| `--gold` / `--amber` / `--amber-text` | `oklch(0.82 0.16 85)` / `0.84 0.16 85` / `0.55 0.14 75` | arm accent, Atlas, eyebrows |
| `--violet` / `--violet-text` | `oklch(0.72 0.16 290)` / `oklch(0.48 0.18 285)` | Prospera |
| `--teal` / `--teal-text` / `--teal-light` | `oklch(0.7 0.13 195)` / `0.45 0.1 195` / `0.78 0.13 195` | Signal; Open Build |
| `--coral` / `--coral-text` | `oklch(0.7 0.2 30)` / `oklch(0.5 0.18 30)` | Runway |
| `--lime` | `oklch(0.82 0.18 130)` | evidence dots, live dot |
| `--gradient-sunburst` | see styles.css | blobs |
| `--shadow-lift` | see styles.css | card hover, nothing else |
Type: `font-display` Fraunces (400/500), `font-sans` Inter (400/500/600), `font-mono` system mono for console labels. Radii: cards 32px, panels 28/24/20/16/14/12px, pills 999px. Pill padding: ink `12px 20px` 15px; outline `11px 20px` 14px.

## Assets
- `marks/mark-{prospera,signal,runway,atlas}.svg` — new monoline mark family (48-unit grid, 3px stroke, round caps). Black strokes; render via CSS `mask-image` so they take any color (`--ink` on light discs, `--ink` on hued discs). Copy to `src/assets/marks/`. They replace the previous Prospera, Signal, Runway, and Atlas logos on this page.
- `src/assets/people/vincent-chan.jpg` — already in the repo.
- Sunburst logo — `SunburstLogo` from chrome.

## Files in this bundle
- `README.md` — this spec
- `CURSOR_PROMPT.md` — paste-ready prompt
- `ai-tools.ts` — content module → `src/data/ai-tools.ts`
- `marks/*.svg` — mark family → `src/assets/marks/`
- `prototype/ai-tools-v2.dc.html` (+ `support.js`, `assets/`) — the design reference; open in a browser

## Open items
1. Name of the funding call: **Open Build** is a working name (alternatives: Tool Wishlist, Build Request, Commissions). `funding.ts` `short` still reads "AI Tools Open Call"; align both.
2. Vignette content is illustrative; keep the footer or swap in redacted real data.
3. Confirm app hosts/URLs (`prospera|signal|runway.ucsf.edu`).
4. "Released" maturity state is specified but unused until an app ships.
5. Nav/footer links point at the existing routes; no new routes besides this page.

## Acceptance checklist
- [ ] Loads with no console errors; Lighthouse a11y ≥ 95
- [ ] Nav turns dark over hero, get-started, footer; light elsewhere
- [ ] Hero index rows and all three cards open the matching drawer; Atlas button opens the Atlas drawer; Escape/backdrop close; focus returns
- [ ] Vignettes play on scroll-in, reset on scroll-out, replay on hover; reduced-motion shows the final state
- [ ] Prospera card: dashed border + dense grid; Signal/Runway: faint fading grid
- [ ] Open Build reads from `funding.ts` and links to `/funding/ai-tools`
- [ ] At 390px: no horizontal scroll, cards stack text-first, pills wrap
- [ ] Meta title/description updated; old Products/Automations/Principles removed
