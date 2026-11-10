# Handoff: OCR Data Management page

## Overview

A redesign of `/services/data-management` on ocr.ucsf.edu. The page tells an investigator what OCR's data managers can help with, what they receive, and how to start. It is a sibling of the Research Operations & Management page and uses the same site chrome, tokens, and component patterns, with its own accent (magenta), its own four-color capability sequence, and one data illustration.

Two layout directions exist in the prototype. **Build one.** `CURSOR_PROMPT.md` sets `BUILD_DIRECTION`; it defaults to A.

- **A, "The Ledger":** dark hero in the Research Operations pattern. Need picker, capability track, and Start-here card live inside the hero.
- **B, "The Field":** light editorial hero. The need picker is its own section below.

The shared sections (Approach, Team, Get started, footer) are identical in both.

## About the design files

`Data Management.dc.html` is a **design reference built in HTML**: a working prototype that shows the intended look and behavior. It is not production code. Recreate it in the existing codebase (TanStack Start, React 19, Tailwind v4) using the repo's components and tokens. Do not ship the HTML or copy its inline styles.

To view: open `Data Management.dc.html` in a browser (`support.js` must sit beside it). Add `?dir=A` or `?dir=B`. Portrait images load from `src/assets/people/` relative to the file, so open it from the repo root copy or expect broken portraits.

## Fidelity

**High fidelity.** Colors, type, spacing, copy, states, and motion are final unless listed under Open questions. Every value is an inline style in the prototype; where this README and the prototype disagree, the prototype wins.

## Files in this folder

| File | Purpose |
| --- | --- |
| `CURSOR_PROMPT.md` | The prompt to paste into Cursor |
| `README.md` | This spec |
| `content.ts` | All copy and data, typed. Becomes `src/data/data-management.ts` |
| `Data Management.dc.html` | The prototype (both directions) |
| `support.js` | Runtime the prototype needs to open. Not for the repo |

## Target codebase mapping

| Build | From / like |
| --- | --- |
| `src/routes/services.data-management.tsx` | Replace body. Pattern: `services.research-operations.tsx` |
| `src/data/data-management.ts` | `content.ts` in this folder. Pattern: `src/data/research-operations.ts` |
| `src/components/data-management/hero.tsx` | `research-operations/hero.tsx` |
| `.../need-picker.tsx` | `research-operations/need-picker.tsx` (same radiogroup, track, stacked-variant card) |
| `.../capabilities.tsx` | `research-operations/services-section.tsx` for the header; body is new |
| `.../how-we-work.tsx` | `research-operations/how-we-work.tsx` |
| `.../where-we-work.tsx` | new |
| `.../approach.tsx` | new; ruled list like `team-and-partners.tsx` |
| `.../team.tsx` | `research-operations/team-and-partners.tsx` + `site/offset-portrait.tsx` |
| `.../get-started.tsx` | `research-operations/get-started.tsx` (same booking card) |
| `.../record-ledger.tsx` (A) | new illustration |
| `.../data-field.tsx`, `.../visit-timeline.tsx` (B) | new illustrations |

Shared primitives to reuse: `SiteShell`, `Eyebrow`, `SectionHeader`, `FactRow`, `Dot`, `ReviewFlag`, `TeamAvatars`, `Arrow`, `tint()`, `TRANSITION`, `ON_DARK_LABEL`. `Eyebrow` and `SectionHeader` are currently teal and `TeamAvatars` reads Research Operations data: add an `accent` / `people` prop instead of forking.

Remove from the current route file: `Hero`, `LifecycleRing`, `FAIR`, `Architecture`, `Policy`, the three stat tiles, the `Breadcrumb`, and the generic `CTA`. `ServiceCrossNav` is not in the new design (Research Operations does not use it either); see Open questions.

## Page structure

Section backgrounds alternate. Content width `max-w-7xl` (1280px), 24px side padding. Section padding `clamp(48px, 7vw, 96px)` top and bottom. Every section has `scroll-margin-top: 96px`.

**Direction A:** dark nav → dark hero (headline, ledger, picker, track, Start-here card) → paper Capabilities → cream How we work → paper Where we work → cream Approach → paper Team → dark Get started → dark footer.

**Direction B:** light nav → cream hero (headline, field) → paper Need picker → cream Capabilities → dark How we work → paper Where we work → cream Approach → paper Team → dark Get started → dark footer.

Anchors: `#need`, `#capabilities`, `#how`, `#where`, `#approach`, `#team`, `#start`.

### Shared section header

Two columns (`auto-fit, minmax(min(100%, 380px), 1fr)`, gap 14px 72px, bottom-aligned), 28–48px below.
- Eyebrow: Inter 500, 12px, uppercase, 0.18em, `oklch(0.5 0.2 340)` (on dark: `oklch(0.68 0.16 340)`), 16px below.
- H2: Fraunces 500, `clamp(32px, 4vw, 48px)`, line-height 1.04, tracking -0.02em, ink.
- Lede: Inter 400, `clamp(16px, 1.5vw, 19px)`, line-height 1.55, `oklch(0.3 0.04 265)`.

### Review flag pill

Inline, `margin-left: 6px`, radius 999px, background `oklch(0.95 0.08 85)`, padding 2px 8px, Inter 600 11px, color `oklch(0.4 0.1 70)`. Same as the existing `ReviewFlag`.

---

## Direction A sections

### A1. Hero

Background ink `oklch(0.14 0.06 265)`, white text. Sunburst blob top-right: 720×720 circle at `top:-240px; right:-120px`, opacity 0.42, `blur(70px)`, `var(--gradient-sunburst)`. Padding `clamp(36px,5vw,60px)` top, `clamp(32px,5vw,72px)` bottom.

**Top row:** two columns (`minmax(min(100%, 420px), 1fr)`, gap 36px 64px, vertically centered).
- Left: eyebrow "Data Management" (12px, 0.18em, `oklch(0.68 0.16 340)`). H1 Fraunces 500, `clamp(40px, 4.7vw, 60px)`, line-height 1.05, tracking -0.02em; the accent phrase "research-ready datasets." in `oklch(0.68 0.16 340)`. Lead paragraph `clamp(16px, 1.5vw, 19px)`, `oklch(0.82 0.02 265)`, max-width 640px, 22px above.
- Right: the **record ledger** (see Illustrations).

**Picker label:** "What does your research need?" 12px, 500, uppercase, 0.16em, `oklch(0.72 0.02 265)`; `clamp(28px,4vw,48px)` above.

**Chips** (radiogroup, six): flex-wrap, gap 10px. Each chip min-height 48px, radius 999px, padding 11px 20px, Inter 500 15px, 1px border, 10px dot at left in the capability color (magenta for the sixth).
- Unselected: border `white/30`, transparent, white text; hover border `white/60`.
- Selected: white fill, white border, ink text.
- Transition 0.25s on background, border, color.
- Below `md`, follow Research Operations: full-width stacked rows, radius 14px.

**Capability track** (`lg` and up only): max-width 1000px, centered, 52px above. A wedge behind the dots: `left/right: 90px; top: 34px; height: 12px`, gradient `white/10 → white/28`, `clip-path: polygon(0 42%, 100% 0, 100% 100%, 0 58%)`. Four equal stops, each a button: kicker (12px uppercase 0.14em, `oklch(0.72 0.02 265)`, height 20px), dot 14px, name (Fraunces 20px, line-height 1.2, balanced).
- Lit: dot opacity 1 with ring `0 0 0 6px` of the color at 25% alpha; name white.
- Unlit: dot opacity 0.5, no ring; name `white/50`.
- Click: selects the first need whose only capability is that stop (`collection`, `quality`, `integration`, `sharing`).
- The sixth need lights all four.

**Start-here card:** white, radius 20px, 5px top border in the current capability color (0.25s transition), padding `clamp(20px, 2.6vw, 32px)`, `clamp(16px, 3.4vw, 44px)` above. Two columns (`minmax(min(100%, 380px), 1fr)`, gap 28px 56px, top-aligned).

Left column:
1. Eyebrow "Start here · 01": 12px, 500, uppercase, 0.16em, capability `textColor`.
2. Capability name: Fraunces 500, `clamp(26px, 2.6vw, 34px)`, line-height 1.1, ink.
3. Tagline: Fraunces italic, `clamp(17px, 1.6vw, 19px)`, line-height 1.35, `oklch(0.38 0.04 265)`, 8px above.
4. Description: Inter 15px, line-height 1.55, `oklch(0.3 0.04 265)`, 14px above.
5. Facts (`FactRow`, 96px label column, 10px row padding): Good for, When, You bring, Cost. Top rule `ink/12`, row rules `ink/8`.

Right column: panel, radius 18px, padding `clamp(16px, 2vw, 24px)`, background = capability color at 14% alpha (10% for the sixth need), 0.25s transition.
1. Label "What you receive": 11px, 500, uppercase, 0.14em, `oklch(0.3 0.04 265)`.
2. Five deliverables: Inter 15px, line-height 1.45, each row padding 10px 0 with a top rule `ink/12`, 8px dot in the capability color, flag pill where present. For the sixth need each row's dot takes the color of the capability it came from.
3. Scope box, 14px below: white, radius 14px, padding 18px, shadow `0 8px 24px oklch(0.14 0.06 265 / 0.08)`. Three overlapping 36px avatars (overlap 10px, 2px white border). "Scope it with the team" Inter 600 15px; hint 13px `oklch(0.42 0.03 265)`. Button "Start the conversation →": full width, min-height 48px, radius 999px, ink fill, white Inter 500 15px, links to `#start`. Note below, centered 12px.

Keep the card height stable across selections using the stacked-variant technique in `research-operations/need-picker.tsx` (render every variant into one grid cell; only the active one is visible). The prototype does not do this and its card height changes; the production page should not.

### A2. Capabilities (paper)

Header: "Our capabilities" / "What we do with your data." / lede.

Accordion, one open at a time, first open by default. Top rule 1px ink; row rules `oklch(0.88 0.012 90)`.
- Row button: grid `clamp(52px, 8vw, 120px) | 1fr | 44px`, padding `clamp(18px, 2.4vw, 28px)` 0.
  - Number: Fraunces `clamp(36px, 5vw, 56px)`, capability `textColor`.
  - Name: Fraunces 500 `clamp(22px, 2.6vw, 30px)`. Tagline: Fraunces italic `clamp(15px, 1.5vw, 18px)`, `oklch(0.38 0.04 265)`, 6px above.
  - Toggle: 44px circle, 1px border `ink/20`, "+" closed, "–" open; open fill = capability color at 22% alpha.
- Panel: animates `grid-template-rows: 0fr → 1fr`, 0.35s ease. Inner padding-left `clamp(0px, 9.6vw, 144px)`, bottom 28px. Label "What you receive" (11px uppercase 0.14em). Deliverables in an `auto-fit minmax(min(100%, 300px), 1fr)` grid, gap 10px 40px, Inter 15px, 6px dots.

### A3. How we work (cream)

Three columns (`minmax(min(100%, 280px), 1fr)`, gap 32px 48px). Each: 1px ink top rule, 24px padding-top. Number Fraunces 56px magenta-text; label right-aligned 12px uppercase 0.14em. Title Fraunces 500 26px. Body 15px, `oklch(0.38 0.04 265)`. "Draws on" row: 13px with 8px capability dots and short names.

### A4. Where we work (paper)

Ruled list of four settings. Each row: two columns (`minmax(min(100%, 300px), 1fr)`, gap 10px 48px), padding 24px 14px, hover background `magenta/6`. Left: name, Fraunces 500 `clamp(22px, 2.2vw, 26px)`. Right: body 15px, then capability dots with short names (13px).

---

## Direction B sections

### B1. Hero (cream)

Bottom border `ink/10`. Two columns (`minmax(min(100%, 440px), 1fr)`, gap 40px 72px, centered), padding `clamp(40px,6vw,84px)` / `clamp(40px,6vw,88px)`.
- Left: eyebrow (magenta-text). H1 Fraunces 500 `clamp(42px, 5.6vw, 76px)`, line-height 1, tracking -0.025em, balanced; accent phrase `oklch(0.545 0.21 340)`. Lead as in A but `oklch(0.3 0.04 265)`, max-width 600px. Two buttons, 30px above: primary "Start the conversation →" (ink fill, `#start`); secondary "What does your research need?" (1px `ink/25` outline, `#need`). Both min-height 48px, radius 999px, padding 12px 22px, 15px/500.
- Right: the **data field** (see Illustrations), then a row with a segmented control ("As collected" / "Research-ready": white pill container, 3px padding, 1px `ink/20` border; active segment ink fill, white text; min-height 40px) and a 13px caption.

### B2. Need picker (paper)

Two columns (`minmax(min(100%, 400px), 1fr)`, gap 32px 72px, top-aligned).
- Left: eyebrow "Start with the problem", H2 "What does your research need?", then the radiogroup as a ruled list (top rule ink). Each row: grid `18px | 1fr | 20px`, min-height 64px, padding 14px 10px, Fraunces `clamp(19px, 2vw, 24px)`. Selected: background = capability color at 14% alpha, ink text, dot opacity 1, arrow visible. Unselected: `oklch(0.42 0.03 265)`, dot opacity 0.45, arrow hidden.
- Right: Start-here card, single column. White, 1px border `oklch(0.91 0.012 90)`, 5px colored top border, radius 20px, padding `clamp(20px, 2.4vw, 30px)`, shadow `0 1px 2px ink/4, 0 8px 24px ink/6`. Order: eyebrow, name (H3, `clamp(26px, 2.4vw, 30px)`), tagline, description, "What you receive" list (14px, two columns when wide), facts, button, hint.

### B3. Capabilities (cream)

Header as A2. A 5px gradient bar across the top (gold → coral → magenta → violet, the four capability colors). Four columns (`minmax(min(100%, 250px), 1fr)`, gap 36px), 26px below the bar. Each: number Fraunces 56px in `textColor`; name Fraunces 500 24px (min-height 56px); tagline Fraunces italic 16px (min-height 45px); ruled list of deliverables, 14px, top rule ink, row rules `oklch(0.88 0.012 90)`, padding 10px 0. No accordion.

### B4. How we work (dark)

Ink background with a sunburst blob bottom-left (opacity 0.3). Two columns (`minmax(min(100%, 400px), 1fr)`, gap 36px 72px).
- Left: header, lede, then a three-row accordion (one open; opens on stage 02). Row: grid `44px | 1fr | auto`, number Fraunces 22px, title Fraunces 500 `clamp(22px, 2.2vw, 26px)`, label 11px uppercase. Active: white title, number `oklch(0.68 0.16 340)`. Inactive: `white/55`, number `white/40`. Body 15px `oklch(0.82 0.02 265)`, indented 56px.
- Right: the **visit timeline** (see Illustrations) and the stage's legend sentence (14px, min-height 42px).

### B5. Where we work (paper)

Header, then two columns. Left: a tablist of four settings as a ruled list (rows min-height 60px, Fraunces `clamp(19px, 2vw, 24px)`; selected `magenta/8` background with arrow). Right panel: body paragraph; then a three-part diagram: source boxes (white, 1px `ink/20`, radius 12px, min-height 52px, 14px/500) stacked with 10px gap; a 1.5px magenta bracket joining them to a single line; a result box (ink fill, radius 14px, padding 18px 16px) with "Becomes" (11px uppercase, `oklch(0.68 0.16 340)`) and the result in Fraunces `clamp(18px, 1.8vw, 22px)`. Then a "Draws on" row.

---

## Shared sections

### Approach (cream)

Header: "Our approach" / "Data managers who sit with your team." / lede. Two columns (`minmax(min(100%, 400px), 1fr)`, gap 32px 72px).
- Left: ruled list of four roles. Each row two columns (`minmax(min(100%, 180px), 1fr)`, gap 4px 24px), padding 18px 0. Role Fraunces 500 20px; description 15px `oklch(0.38 0.04 265)`.
- Right: top rule ink, 18px padding-top. Label "Where this service stops" (11px uppercase). Statement Fraunces `clamp(19px, 1.9vw, 22px)`, line-height 1.35. Flag: "Confirm wording".

### Team (paper)

Two columns (`minmax(min(100%, 340px), 1fr)`, gap 20px 72px). Left: eyebrow, H2 "Our data managers", intro 15px (max-width 420px). Right: ruled list, two people. Each row: flex, gap 20px, padding 18px 14px, hover `magenta/8`. Offset portrait (80px box; a `magenta/55` disc behind a 70px photo with 3px white border, offset 2px; `object-position: center 18%`). Name Fraunces 400 22px (credentials in Inter 14px muted). Role 14px magenta-text. Bio 14px.

### Get started (dark)

Ink background, sunburst blob top-right. Padding `clamp(44px, 6vw, 72px)`. Two columns (`minmax(min(100%, 380px), 1fr)`, gap 40px 72px, centered).
- Left: eyebrow, H2 "Discuss your data needs." (`clamp(32px, 4.2vw, 52px)`), body. Then a rule and the partner block: label + outline button "Talk to us about partnership →" (1px `white/35`, hover `white/10`).
- Right: the booking card from Research Operations with a magenta 5px top border. Two avatars, "Scoping conversation" eyebrow, title, "30 min / Free". Host row on `magenta/10` with a 56px magenta-ringed photo. Ink button "Book a time with Vincent →" (opens the booking link in a new tab). "Useful to bring" note on `magenta/8`. Footer line with the email link.

### Nav and footer

Unchanged site chrome via `SiteShell`. The prototype redraws them only so the page reads complete; do not rebuild them.

---

## Illustrations

All three use invented records and carry an "Illustrative" label. None is a chart of real data.

### Record ledger (direction A hero)

`role="img"`, label "Illustration: five study records with data issues being resolved one at a time".

Glass panel: radius 18px, 1px `white/14` border, `white/6` fill, `backdrop-filter: blur(6px)`, padding 18px 20px (14px 12px under 560px).
- Header row: 10.5px uppercase 0.12em, `oklch(0.72 0.02 265)`. Columns Participant, Visit, Visit date, Specimen, Check (`1fr 1fr 1.15fr 1fr 1.45fr`). Under 560px the Visit column is dropped.
- Five data rows in a monospace stack, 12.5px (11px small), padding 9px 0, rule `white/8`.
- Each row has one "hot" cell with a problem. **Unresolved:** hot cell on `oklch(0.7 0.2 30 / 0.28)` with text `oklch(0.9 0.08 30)`; Check column shows the issue in `oklch(0.86 0.14 85)` with a 7px dot. **Resolved:** hot cell shows the corrected value in white with no fill; Check shows the resolution in `oklch(0.86 0.1 195)`.
- Footer: 4px progress bar (gold → coral → magenta gradient, width = resolved/5, 0.6s ease) and "N of 5 checks resolved" in tabular numerals.
- Motion: a step counter advances every 1100ms from 0 to 8, then returns to 0. Rows resolve one per step for steps 1–5; steps 6–8 hold the finished state. Cell and label transitions 0.5s ease.
- Reduced motion: show all five resolved, no timer.

Data: `ledgerRows` in `content.ts`.

### Data field (direction B hero)

`role="img"`, label switches between "scattered data points, some flagged or missing" and "data points arranged in an ordered grid".

84 dots (12 columns × 7 rows), 10px circles, in a box with aspect ratio 12 / 7.
- **As collected:** each dot at a fixed pseudo-random position (seeded, so the layout is the same on every load; x 3–97%, y 4–96%). About 10% are "flagged" (coral `oklch(0.7 0.2 30)`), about 9% "missing" (hollow, 1.5px ink ring), the rest ink at 30–90% opacity.
- **Research-ready:** every dot at its grid cell center, full opacity, ink; the first column magenta `oklch(0.62 0.24 340)` (the identifier column).
- Transition: position 1s `cubic-bezier(.22, 1, .36, 1)`; color, opacity, ring 0.7s ease; per-dot delay `column × 28ms + row × 22ms`.
- Auto-toggles every 3800ms until the user clicks either segment; after that it stays where the user put it.
- Reduced motion: start in the ready state, no auto-toggle.

Generate the scatter once at module scope with a seeded PRNG (the prototype uses a Lehmer generator, seed 11) so server and client render the same positions.

### Visit timeline (direction B, How we work)

`role="img"`, label "Illustration: six participants tracked across four study visits".

Panel: radius 18px, 1px `white/14`, `white/5` fill, padding 22px 24px. Grid: an 84px ID column (62px small) plus four visit columns. Six rows, 44px tall, each with a horizontal line through its dots. Dots are 16px. State follows the selected stage:

| Visit code | Stage 01 Plan | Stage 02 Manage | Stage 03 Prepare |
| --- | --- | --- | --- |
| collected | hollow, `white/40` ring | white fill | magenta fill `oklch(0.68 0.16 340)` |
| discrepancy | hollow | gold fill `oklch(0.84 0.16 85)` + 5px halo at 28% | magenta fill |
| missing | hollow | hollow, 2px coral ring | 8px dot, `white/45` |
| not yet due | hollow | hollow, `white/18` ring | hollow, `white/18` ring |

In stage 03 the row line thickens to 2px magenta at 55% alpha, the IDs become `R-01`…`R-06` in magenta, and the header reads "Record" instead of "Participant". All changes transition 0.5s ease. A legend below lists the dot meanings for the current stage.

Data: `timeline` in `content.ts`.

---

## Interactions and state

| State | Type | Default | Changed by |
| --- | --- | --- | --- |
| `need` | need key | `collection` | chip / row click, arrow keys, track stop click |
| `openCapability` (A) | key or none | first | accordion row click (click again to close) |
| `stage` (B) | 0–2 | 1 | stage row click |
| `setting` (B) | 0–3 | 0 | tab click |
| `fieldReady`, `fieldTouched` (B) | boolean | false | timer / segment click |
| `ledgerStep` (A) | 0–8 | 0 | timer |

All state is local component state. No data fetching, no forms.

Keyboard: need picker as a radiogroup with roving tabindex; Arrow keys, Home, End move and select (copy the handler in `research-operations/need-picker.tsx`). Settings tabs in B: same pattern with `role="tab"`. Focus ring: 2px magenta, 3px offset (white on dark surfaces).

Hover: nav pills and outline buttons tint; ruled-list rows tint `magenta/6–8`; ink buttons go to `ink/90`.

Timers must be cleared on unmount.

## Responsive behavior

The prototype relies on `auto-fit` grids, so most sections collapse to one column on their own. In Tailwind, use the repo's breakpoints to reach the same result:

- **< 560px:** ledger drops the Visit column; timeline uses short visit names.
- **< 768px:** all two-column sections stack. Picker chips become full-width rows (A).
- **< 1024px:** mobile nav; the capability track is hidden (A).
- **≥ 1024px:** full layout.

Touch targets are at least 44px. Check 390, 768, 1024, 1280.

## Design tokens

Use the variables in `src/styles.css`; these are the values the prototype uses, for matching.

**Surfaces and ink**
- Ink `oklch(0.14 0.06 265)` · body ink `oklch(0.18 0.06 265)`
- Paper `oklch(0.99 0.005 90)` · cream `oklch(0.97 0.012 85)`
- Rule on light `oklch(0.88 0.012 90)` · card border `oklch(0.91 0.012 90)`
- Text on light: `oklch(0.3 0.04 265)` (body), `oklch(0.38 0.04 265)` (secondary), `oklch(0.42 0.03 265)` (muted labels)
- Text on dark: `oklch(0.82 0.02 265)` (body), `oklch(0.72 0.02 265)` (labels)

**Page accent (magenta)**
- Fill `oklch(0.62 0.24 340)` (`var(--magenta)`)
- Text on light `oklch(0.5 0.2 340)` · text on dark `oklch(0.68 0.16 340)` · B headline accent `oklch(0.545 0.21 340)`

**Capability sequence** (fill / text on white)
- 01 gold `oklch(0.84 0.16 85)` / `oklch(0.55 0.14 75)`
- 02 coral `oklch(0.7 0.2 30)` / `oklch(0.5 0.18 30)`
- 03 magenta `oklch(0.62 0.24 340)` / `oklch(0.5 0.2 340)`
- 04 violet `oklch(0.72 0.16 290)` / `oklch(0.48 0.18 285)` — **new**; no existing token. Add `--violet` and its text variant.

**Illustration-only:** resolved label `oklch(0.86 0.1 195)`, issue label `oklch(0.86 0.14 85)`, hot cell text `oklch(0.9 0.08 30)`.

**Sunburst:** `linear-gradient(135deg, oklch(0.7 0.2 30) 0%, oklch(0.62 0.24 340) 35%, oklch(0.55 0.2 280) 65%, oklch(0.7 0.13 195) 100%)` (`var(--gradient-sunburst)`).

**Type:** Fraunces (display; 400, 500, 400 italic) and Inter (400, 500, 600), both already loaded by the site. Monospace system stack in the illustrations only.

**Radius:** 999px pills · 20px cards · 18px panels · 14px inner boxes · 12px source boxes.

**Shadows:** scope box `0 8px 24px oklch(0.14 0.06 265 / 0.08)` · booking card `0 30px 60px oklch(0.05 0.04 265 / 0.35)` · B Start-here card `0 1px 2px oklch(0.18 0.06 265 / 0.04), 0 8px 24px oklch(0.18 0.06 265 / 0.06)`.

**Motion:** 0.25s for color and border state changes · 0.35s ease for accordions · 0.5–1s for illustrations as specified.

## Assets

- Portraits, already in the repo: `src/assets/people/michelle-yu.jpg`, `bushra-samad.jpg`, `vincent-chan.jpg`.
- Logo and nav: existing site chrome.
- No new images, icons, or fonts. Arrows are the existing `Arrow` primitive; the accordion signs are text characters.

## Copy status

Supplied by the content owner, do not edit: hero headline and lead; capability names, taglines, and deliverables; the three stage titles; the four setting names and descriptions; picker prompts 2, 3, 4, and 6.

Written during design, needs content-owner review: picker prompts 1 and 5; every picker description, fact, and hint; section titles and ledes; stage labels, bodies, and legends; setting sources and results (B); the Approach section; the Team intro; the Get started body and "Useful to bring" line.

## Open questions

Each is flagged on the page with a yellow pill. Leave the flags in until the content owner answers.

1. **Database and registry "planning" vs. build.** Deliverable 2 of capability 01 says planning. Picker prompt 2 says "I need a database or registry built". Does OCR build the database, or plan it with the team?
2. **Cohort identification and data extraction:** from which data sources?
3. **De-identification and sharing preparation; repository selection and submission coordination:** confirm scope.
4. **Cost row** ("Scoped to the project and our capacity."): confirm the funding model.
5. **"Where this service stops"** statement: confirm wording, and that OCR does coordinate with other UCSF groups.
6. **Team bios** come from the People page and mention building databases; confirm they match the service as described.
7. **Booking card:** "30 min / Free" and the booking link are reused from Research Operations; confirm they apply.
8. **"I need a data manager for my study":** the card assumes a data manager can join a study on a continuing basis; confirm.
9. **Team intro** still says first conversations start with the director, though Vincent Chan was removed from the team list. Keep or reword?
10. **`ServiceCrossNav`:** on the current page, not in the new design. Add back above Get started if the other service pages keep it.
11. **Removed on purpose:** the "Our record" section (too few examples) and all metrics, including the current page's "62 DMS plans" and "100% NIH 2023 compliant" tiles. Do not restore them.
