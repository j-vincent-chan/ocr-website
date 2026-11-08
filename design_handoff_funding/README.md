# Handoff: Funding & Support

## Overview
A new section of the OCR site: a **Funding & Support** hub at `/funding` and one detail page per opportunity. It replaces the "Or apply to an open RFA" CTA at `/projects#funding` and the "Funding" nav link.

Seven opportunities, in display order (by reach: OCR serves everyone, Parnassus one campus, ImmunoX its members), grouped by sponsor:

| # | id | Title | Sponsor | Kind of support | Access |
|---|---|---|---|---|---|
| 1 | `biospecimen` | Biospecimen Pipeline Support | OCR | Staff time | Open to all |
| 2 | `ai-tools` | AI Tools Open Call | OCR | Staff time | Open to all |
| 3 | `plan-review` | Research Plan Review | OCR | Expert review | Restricted |
| 4 | `community-fund` | Parnassus Community Fund | Parnassus Institutes | Funding | Restricted |
| 5 | `clinical-translational` | Hellman Clinical-Translational Award | Bakar ImmunoX | Funding | Open to all |
| 6 | `data-library` | Data Library Analysis Support | Bakar ImmunoX | Staff time | Restricted |
| 7 | `sabbatical` | Sabbatical Assistance Grant | Bakar ImmunoX | Funding | Restricted |

Colour is per sponsor, not per opportunity: **OCR teal**, **Parnassus lime**, **ImmunoX magenta** (values in § Design tokens). Titles say what the thing is (Award, Grant, Support, Open Call, Fund); the section is "Funding & Support" because three of the seven provide staff time, not money.

## About the design files
`Funding.dc.html` is a **design reference created in HTML**: a prototype that shows the intended look and behavior, not production code. Open it in a browser next to `support.js`; document links resolve against the `uploads/` folder in this bundle. It is a single file that switches between the hub and detail views by hash (`#funding`, `#biospecimen`, …) only because it is a prototype. The task is to **recreate it in the existing codebase** (TanStack Start, React, Tailwind, shadcn/ui) with real routes, reusing `SiteShell`/`Header`/`Footer`, `ProjectMotif`, and the tokens in `src/styles.css`.

## Fidelity
**High fidelity.** Layout, copy, colours, typography, spacing, and interactions are final apart from `OPEN_ITEMS.md`. Where a prototype literal is within a hair of an existing token, use the token (§ Design tokens).

## Routes and head
- `/funding`: hub. Title `Funding & Support — UCSF OCR`; description = hero paragraph.
- `/funding/$slug`: detail; slugs are the ids above. Title `{short} — Funding & Support — UCSF OCR`; description = `oneLiner`.
- Legacy `/projects#funding`: replace the `<CTA id="funding">` in `src/routes/projects.tsx` with the band in CONTENT.md (or redirect). Update every `hash="funding"` link: `chrome.tsx` header and footer, `components/research-operations/record-section.tsx` (→ `/funding`), `data/research-operations.ts` biospecimen link (→ `/funding/biospecimen`).
- Navigating between hub and detail scrolls to the top.

## Shared chrome changes
**Header.** Replace the "Funding" link with a **Funding & Support** dropdown built like the Services menu (opens on hover and click, closes on Esc, click outside, or selection; `aria-expanded` + `aria-haspopup` on the trigger; `navActive` style while on `/funding*`). Trigger label "Funding & Support" with the 12px chevron.
- Panel: anchored to the trigger's right edge, `top: calc(100% + 12px)`, width `min(420px, 100vw − 32px)`, white, radius 20, padding 10, 1px border `ink/8`, shadow `0 24px 60px oklch(0.05 0.04 265 / 0.18)` (≈ `shadow-lift`), enters with translateY(−6px → 0) + fade over .2s ease.
- First item "All funding & support →" (full width, flex space-between, radius 12, padding 12×14, 14px/600 ink, hover `bg ink/5`), then a 1px `ink/10` divider with margin `4px 14px 6px`.
- Group labels "From OCR", "Partner · Parnassus Institutes", "Partner · Bakar ImmunoX Initiative": 11px/500, `0.14em`, uppercase, `ink-muted-2`, padding `10px 14px 4px`.
- Items: full width, flex, align start, gap 12, radius 12, padding 12×14, hover `bg ink/5`. 10px sponsor-colour dot (margin-top 6) · title Fraunces 17px/1.25 ink (`flex:1`) · pills (flex none, gap 6, margin-top 2): "Restricted" only when restricted (1px `ink/25` border, text `oklch(0.3 0.04 265)`, 11px/500, padding 3×9, `title` = restrictedTo), then the deadline tag (bg = sponsor tint, text = sponsor ink, 11px/500, padding 3×9).
- The header stays **light** on every Funding view (owner request). The detail hero is dark but must not carry `data-tone="dark"`; keep `data-tone` on the CTA band and footer as elsewhere.

**Footer.** OCR column: "Funding" → "Funding & Support" linking to `/funding`. Services column is already sentence case.

## Shared layout rules
- Container `max-w-7xl mx-auto px-6` (1280 / 24px) everywhere.
- Section padding `clamp(56px,7vw,96px) 0 0`; the last section before the CTA adds bottom padding `clamp(64px,8vw,112px)`.
- Eyebrow: 12px/500, `letter-spacing:0.18em`, uppercase, in the section's accent ink (teal ink on the hub; the opportunity's ink on detail pages).
- H2 scales: `clamp(28px,3.2vw,40px)/1.05` (full-width sections), `clamp(26px,2.8vw,34px)/1.08` (two-column sections); Fraunces 500, `-0.02em`, ink.
- Hairline lists: 1px ink top rule, 1px `rule` (`oklch(0.88 0.012 90)`) between rows.
- Pills: radius 999. Primary button: ink bg, white text, 14–15px/500, hover `oklch(0.22 0.08 265)`.

## Hub (`/funding`)
Background rhythm: cream hero → paper ledger → dark CTA → dark footer.

### 1. Hero + index (cream `oklch(0.97 0.012 85)`, 1px `ink/10` bottom border)
Padding `clamp(48px,6vw,88px) 24px 0`.
- Top row: flex, wrap, align flex-end, space-between, gap `28px 64px`.
  - Left `flex:7 1 520px`: eyebrow "Funding & Support" (teal ink) and the H1, Fraunces 500 `clamp(44px,6.4vw,84px)/0.98`, `-0.03em`, ink, `text-wrap:balance`, margin-top 20.
  - Right `flex:4 1 320px`: paragraph 17px/1.6, `oklch(0.35 0.04 265)`, `text-wrap:pretty`.
- **Index** (`<nav aria-label="Opportunities">`), margin-top `clamp(40px,5vw,64px)`: grid `repeat(auto-fit, minmax(min(100%,300px),1fr))`, gap `0 48px`. One column per sponsor group that has opportunities (OCR · Parnassus Institutes · Bakar ImmunoX Initiative).
  - Column: `border-top:4px solid <sponsor accent>`, padding `14px 0 32px`. Label 11px/500, `0.14em`, uppercase, sponsor ink. Rows start 6px below.
  - Row: button, flex, align baseline, space-between, gap 16, full width, padding `12px 0`, 1px `ink/10` bottom border, text ink; hover text → sponsor ink (`transition: color .2s`). Title Fraunces 18px/1.25 (`text-wrap:balance`); tag 12px/500, `0.08em`, uppercase, `ink-muted-2`, `flex:none`. Click → detail page.
  - Growth: a new opportunity adds a row; a new sponsor adds a column. Under ~700px the columns stack.

### 2. Opportunities ledger (paper)
Padding `clamp(56px,7vw,96px) 0 clamp(64px,8vw,112px)`.
- Header: flex, wrap, align flex-end, space-between, gap `16px 48px`, margin-bottom 36. Eyebrow "Opportunities" + H2 `clamp(30px,3.6vw,44px)/1.04` (margin-top 14). Lede max-width 440, 15px/1.55, `ink-muted`.
- Group heading ("From OCR" / "From our partners"): flex, wrap, align baseline, gap `6px 16px`, padding-bottom 14, margin-bottom 20, 1px ink bottom border. H3 Fraunces 500 24px/1.2; description 14px/1.5 `ink-muted-2`. A 56px spacer separates the OCR group from the partners group.
- Partner header (inside the partners group, one per partner, groups 40px apart): flex, wrap, align center, space-between, gap `10px 24px`, margin-bottom 18. Left: 40×40 ink tile, radius 12, initials in Fraunces 15px white ("PI", "IX") · name Fraunces 21px/1.2 · blurb 13px/1.45 `ink-muted-2`. Right (only when `href` is set): "{linkLabel} ↗" 14px/500 ink, `target="_blank" rel="noreferrer"`.
- **Ledger row**: grid `72px minmax(0,1fr)`, gap 24, align center, padding `22px 0`, 1px `rule` bottom border.
  - Sprite cell 72×72, flex-centered, `color` = sponsor accent, holding the motif at **56×56** (§ Sprites). No tinted circle behind it.
  - Body: flex, wrap, align center, gap `16px 32px`, three children:
    1. Text `flex:1 1 300px; min-width:0`.
       - Meta row: flex, **nowrap**, align center, gap 8, margin-bottom 8, `overflow:hidden`. Sponsor label 11px/500, `0.14em`, uppercase, sponsor ink, `flex:0 1 auto; min-width:0`, truncates with ellipsis so the pills never wrap. Status pill and access pill: `flex:none`, inline-flex, gap 6, white bg, 1px `ink/10` border, radius 999, padding 3×10, 12px/500, text `oklch(0.25 0.04 265)`, 6px dot. Status dot = sponsor accent; access dot = green `oklch(0.72 0.17 150)` for "Open to all", amber `oklch(0.72 0.17 50)` for "Restricted" (`title` = restrictedTo).
       - H3 title Fraunces 500 24px/1.15 ink, `text-wrap:balance`. One-liner 14px/1.5 `ink-muted`, margin-top 6.
    2. Facts `<dl>` `flex:1 1 320px`, grid `repeat(auto-fit, minmax(130px,1fr))`, gap `12px 20px`. Three items: **{kind label}** → `figure`; **For** → `who`; **Deadline** → `deadline`. `dt` 11px/500, `0.14em`, uppercase, `ink-muted-2`; `dd` 14px/1.4, `oklch(0.2 0.05 265)`, margin-top 4.
    3. Actions `flex:0 0 auto`, column, align start, gap 10: primary pill "Learn more →" (padding 11×20, 14px/500) → detail page; apply link `applyLabel` 14px/500 ink, underlined (`text-decoration-color: ink/30`, offset 4px), `target="_blank" rel="noreferrer"`.

### 3. CTA band `#start` (shared with detail pages; see below)

## Detail (`/funding/$slug`)
Background: dark hero → paper sections → dark CTA → footer. Section presence depends on data:

| Opportunity | What you receive | Spotlight | Priority column | If selected | FAQ | Footnote | CTA contact | Motif |
|---|---|---|---|---|---|---|---|---|
| Biospecimen Pipeline Support | ✓ | — | ✓ | ✓ | — | ✓ | default | polepole |
| AI Tools Open Call | ✓ | ✓ | ✓ | ✓ | ✓ | — | default | polesphere |
| Research Plan Review | ✓ | ✓ | ✓ | ✓ | ✓ | — | default | rings |
| Parnassus Community Fund | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Jo Williams | dotsphere |
| Hellman Clinical-Translational Award | ✓ | ✓ | ✓ | ✓ | ✓ | — | default | fullhoop |
| Data Library Analysis Support | ✓ | ✓ | — | — | — | — | default | helix |
| Sabbatical Assistance Grant | — | ✓ | — | ✓ | — | — | default | orbit |

### 1. Hero (ink bg, white text)
`position:relative; isolation:isolate; overflow:hidden`. Orb: 720px circle at `top:-240px; right:-120px`, sunburst gradient (`--gradient-sunburst`), opacity .42, `blur(70px)`, behind content. Container padding `clamp(28px,4vw,44px) 24px 72px`.
- Breadcrumb: 13px, `oklch(0.72 0.02 265)`, gap 8: "Funding & Support" (link, `oklch(0.82 0.02 265)`, hover white + underline) / `{short}` (`aria-current="page"`).
- Body (margin-top 28): flex, wrap, align flex-start, gap `40px 64px`.
  - Left `flex:7 1 440px`:
    - Meta row (flex, wrap, gap `10px 16px`): sponsor label 12px/500 `0.18em` uppercase in the **accent** colour (not the ink, this is on dark); status pill (1px `white/25` border, padding 3×10, 12px, `oklch(0.88 0.02 265)`, 6px accent dot); if restricted, pill "Restricted · {restrictedTo}" in the same style.
    - H1 Fraunces 500 `clamp(38px,4.8vw,58px)/1.04`, `-0.02em`, white, margin-top 20: `headA` then `headB` in the accent colour.
    - Lead: margin-top 24, max-width 640, `clamp(16px,1.6vw,19px)/1.55`, `oklch(0.82 0.02 265)`.
    - "Formally: {official}" 13px `oklch(0.72 0.02 265)`, margin-top 18.
    - Owner chip (margin-top 20): inline-flex, gap 12, radius 14, 1px `white/16` border, `white/5` bg, padding 10×16, 14px/1.45 `oklch(0.88 0.02 265)`. Inside: white pill (11px/600, `0.12em`, uppercase, ink text, padding 3×10) reading "OCR" or "Partner", then the owner line (CONTENT.md).
  - Right `<aside>` `flex:5 1 340px`: white card, radius 20, padding `22px 28px 24px`, `border-top:5px solid <accent>`, shadow `0 30px 60px oklch(0.05 0.04 265 / 0.35)`, dark-ink text.
    - "At a glance" 12px/500 `0.16em` uppercase in sponsor ink.
    - `<dl>` margin-top 12, 1px `ink/12` top border, 14px/1.45. Rows grid `88px 1fr`, gap 14, padding `10px 0`, 1px `ink/8` bottom border; `dt` 11px `0.14em` uppercase `ink-muted-2` (padding-top 3); `dd` `oklch(0.2 0.05 265)`. Rows come from `facts`.
    - Apply button: margin-top 18, full width, flex-centered, min-height 48, ink pill, 15px/500, padding 12×24, `{applyLabel} →`, `target="_blank"`.
    - Links (if any): margin-top 12, flex, wrap, centered, gap `6px 18px`, 13px/500 ink, underlined (`ink/30`, offset 3).
- Review notes (dev builds only, margin-top 32): radius 14, 1px dashed `oklch(0.85 0.12 85 / 0.6)`, bg `oklch(0.85 0.12 85 / 0.08)`, padding 14×18, 13px/1.5 `oklch(0.9 0.06 85)`; label "Review notes · not for publication" 11px/600 `0.14em` uppercase; bulleted `notes`.

### 2. What you receive (if `provides`)
Eyebrow "What you receive"; H2 `providesTitle` (max-width 760, margin `14px 0 32px`). `<ol>` grid `repeat(auto-fit, minmax(240px,1fr))`, 1px ink top border. Item: padding `24px 28px 24px 0`, 1px `rule` bottom border; numeral "01"… Fraunces 28px sponsor ink; H3 Fraunces 500 22px/1.2 (margin-top 10); body 15px/1.55 `ink-muted` (margin-top 8).

### 3. Spotlight (if `spot`)
Panel radius 28, bg = sponsor **tint**, padding `clamp(28px,4vw,48px)`.
- Header: flex, wrap, align flex-end, space-between, gap `12px 48px`. Left (max-width 640): eyebrow `spot.eyebrow` + H2 `spot.title`. Right: intro max-width 460, 15px/1.55, `oklch(0.32 0.04 265)`.
- Cards (margin-top 28): grid `repeat(auto-fit, minmax(min(100%, spot.min), 1fr))`, gap 16 (`spot.min` is 300px, or 380px for the Sabbatical's two tracks). Card: white, radius 18, padding 22×24, shadow `0 8px 24px ink/6`; tag 11px/500 `0.14em` uppercase sponsor ink; H3 Fraunces 500 21px/1.2 (margin-top 8); body 14px/1.55 `ink-muted` (margin-top 8); optional list: margin-top 14, padding-top 14, 1px `ink/8` top border, column gap 8, 14px/1.45 `oklch(0.3 0.04 265)`, 5px accent dots (margin-top 8, `flex:none`).

### 4. Eligibility (+ Priority if `priority`)
Two columns, each `flex:1 1 380px`, gap `48px 72px`.
- Left: eyebrow "Eligibility", H2 "Who should apply" (margin `14px 0 20px`). `<ul>` 1px ink top border; `li` flex, gap 14, align start, padding `14px 0`, 1px `rule` bottom border, 15px/1.5 `oklch(0.25 0.05 265)`; leading 18px circle (tint bg, sponsor-ink "✓" at 11px, margin-top 2).
- Right: eyebrow `priorityEyebrow`, H2 `priorityTitle`; same list with an 8px accent dot (margin-top 7).

### 5. How to apply
Eyebrow "How to apply"; H2 "From first conversation to launch." (margin `14px 0 36px`).
- Steps `<ol>` grid `repeat(auto-fit, minmax(220px,1fr))`, gap 28. Item: `position:relative`, padding-top 28, `border-top:2px solid <accent>`; a 14px accent dot at `top:-8px; left:0` with a 5px paper halo (`box-shadow: 0 0 0 5px <paper>`). "Step 01" 12px/500 `0.16em` uppercase `ink-muted-2`; H3 Fraunces 500 22px/1.2 (margin-top 8); body 15px/1.55 `ink-muted`.
- **What to prepare** card (margin-top 44): radius 24, 1px `ink/10` border, white, padding `clamp(24px,3vw,36px)`, flex, wrap, gap `24px 56px`. Left `flex:1 1 220px`: H3 Fraunces 500 24px/1.15 "What to prepare" + `prepareIntro` 14px/1.55 `ink-muted-2` (margin-top 10). Right `<ul>` `flex:3 1 420px`, grid `repeat(auto-fit, minmax(260px,1fr))`, gap `12px 32px`; `li` flex, gap 12, 14px/1.5 `oklch(0.28 0.04 265)`, numeral "01"… Fraunces 15px sponsor ink, `min-width:22px`.

### 6. Review (+ If selected if `commitments`)
Two columns as in § 4.
- Left: eyebrow "Review", H2 "How proposals are judged" (margin `14px 0 12px`), `reviewBy` 15px/1.55 `ink-muted` (margin-bottom 20), `<ol>` 1px ink top border; `li` flex, gap 16, align baseline, padding `13px 0`, 1px `rule` bottom border, 15px/1.5 `oklch(0.25 0.05 265)`, numeral Fraunces 15px sponsor ink.
- Right: eyebrow "If selected", H2 "What we ask of recipients", the fixed sentence (CONTENT.md), `<ul>` with a sponsor-ink "→" (margin-top 1) per item.
- Footnote (if `footnote`): margin-top 28, 12px/1.55, `oklch(0.45 0.03 265)`.

### 7. Common questions (if `faq`)
Flex, wrap, gap `24px 72px`. Left `flex:1 1 260px`: eyebrow "Questions", H2 "Common questions". Right `flex:2 1 480px`, 1px ink top border; each item has a 1px `rule` bottom border.
- Question button: full width, flex, space-between, gap 16, padding `18px 0`, 17px/500 ink, left-aligned; 28px circle at right (tint bg, sponsor ink, 16px) showing "+" closed / "−" open; `aria-expanded`.
- Answer: padding `0 48px 20px 0`, 15px/1.6 `oklch(0.35 0.04 265)`, enters with translateY(10px → 0) + fade over .25s.
- One open at a time; the first is open on load; clicking the open one closes it.

### 8. Other opportunities
Padding `clamp(56px,7vw,96px) 0 clamp(64px,8vw,112px)`. Eyebrow "Other opportunities" (teal ink). Grid (margin-top 18) `repeat(auto-fit, minmax(260px,1fr))`, gap 16; every opportunity except the current one, in display order. Card: button, column, align start, gap 8, radius 18, 1px `ink/10` border plus `border-top:4px solid <that opportunity's accent>`, white, padding 20×22; hover `shadow 0 16px 36px ink/10` + `translateY(-2px)` (.3s). Contents: tag 11px/500 `0.14em` uppercase in its sponsor ink; title Fraunces 20px/1.2; one-liner 14px/1.5 `oklch(0.4 0.03 265)`; "Learn more →" 14px/500 ink (margin-top 4).

## CTA band `#start` (hub and detail)
Ink bg, `data-tone="dark"`, orb as in the hero (`top:-260px; right:-140px`), padding `clamp(44px,6vw,72px) 0`. Flex, wrap, align center, gap `40px 72px`.
- Left `flex:1 1 320px`: eyebrow "Before you apply" in the light teal accent `oklch(0.78 0.13 195)`; H2 "Talk through your idea with us." Fraunces 500 `clamp(32px,4.3vw,52px)/1.02` white (margin-bottom 20); body max-width 480, 17px/1.55, `oklch(0.82 0.02 265)`.
- Right card `flex:1 1 340px`: white, radius 20, padding 24×28, `border-top:5px solid` (current opportunity's accent; teal on the hub), shadow `0 30px 60px oklch(0.05 0.04 265 / 0.35)`.
  - Contact row (flex, gap 16): 52px ink circle with initials (Fraunces 19px white); name Fraunces 22px/1.2 ink; role 13px/1.4 `ink-muted-2` (margin-top 2).
  - Button (margin-top 20): full width, min-height 48, ink pill, 15px/500: "Ask which opportunity fits" (hub) / "Ask about this opportunity" (detail), `mailto:{contactEmail}?subject=…` (subjects in CONTENT.md).
  - Microcopy (margin-top 12, centered, 13px `ink-muted-2`): "{contactEmail} · or ocr@ucsf.edu".
- Contact defaults to Vincent Chan; the Parnassus Community Fund supplies its own (`contactName` … on the record).

## Interactions and behavior
- Index rows, ledger "Learn more", menu items, breadcrumb, and "Other opportunities" cards navigate client-side and scroll to top.
- Header dropdown: opens on hover/click, closes on Esc, click outside, or selection.
- FAQ accordion as in § 7.
- Hover states: index row text → sponsor ink; menu items `bg ink/5`; buttons → `oklch(0.22 0.08 265)`; other-opportunity cards lift.
- Motion: menu .2s drop-in; FAQ .25s rise; hovers .2–.3s; sprites loop per `styles.css`. `prefers-reduced-motion` already stops `.project-motif *`; also drop the menu and FAQ animations under it.
- No loading or error states; everything is static data. Apply links and partner links open in a new tab.

## State
- Route params decide hub vs detail; no view state.
- Header: `open: boolean` for the Funding & Support menu.
- Detail: `faq: number` (open index, default 0; −1 = none).
- `SHOW_REVIEW_NOTES = import.meta.env.DEV` gates the amber notes box.

## Sprites
Reuse `src/components/site/project-motifs.tsx` (`<ProjectMotif motif accent>`), rendered at 56×56 inside the 72px cell with the `.ro-sprite` treatment the Research Operations page already uses (no card-art zoom, heavier strokes; ~1.8 at this size). Mapping (`MOTIFS` in the data file): biospecimen → `polepole`, ai-tools → `polesphere`, plan-review → `rings`, community-fund → `dotsphere`, clinical-translational → `fullhoop`, data-library → `helix`, sabbatical → `orbit`.

`orbit` is new. Add it to `project-motifs.tsx` following the prototype's `sprite("orbit")`: two ellipses `rx 40 ry 15` centred at 50,50, rotated −30° and +30°, stroke 2, each breathing (scale 1 → 1.04, opacity .45 → .9, 7s, the second offset 1.5s); three 3.2px dots on each ellipse at t = .08/.42/.70 and .20/.58/.90 of the perimeter, twinkling (4s, staggered .9s); a 5.5px core pulsing 4s. If you'd rather not add a motif, use `polesquare`.

The prototype's sprites are simplified re-draws of the repo motifs (fewer nodes, heavier strokes) so they read at 56px. Treat the repo motifs as canonical; if one reads as noise at this size, thicken strokes rather than redrawing.

## Design tokens (prototype → `src/styles.css`)
- Ink `oklch(0.14 0.06 265)` → `--ink`; body `oklch(0.18 0.06 265)` → `--foreground`; dd/list text `oklch(0.2–0.25 0.05 265)` → `--foreground`; `oklch(0.28–0.32 0.04 265)` → `--ink-body`; `oklch(0.35–0.38 0.04 265)` → `--ink-muted`; `oklch(0.4–0.42 0.03 265)` → `--ink-muted-2`; footnote `oklch(0.45 0.03 265)` → `--muted-foreground`.
- On dark: `oklch(0.82 0.02 265)` → `--ondark-muted`; `oklch(0.88 0.02 265)` → `text-white/85`; `oklch(0.72 0.02 265)` → `text-white/60`.
- Surfaces: paper `oklch(0.99 0.005 90)` → `--background`/`--paper`; cream `oklch(0.97 0.012 85)` → `--cream`; rule `oklch(0.88 0.012 90)` → `--rule`; card border `ink/10`.
- OCR teal: accent `oklch(0.78 0.13 195)` (the same light teal the Research Operations page uses; tokenise as `--teal-light` if it isn't yet), ink `--teal-text` (`oklch(0.45 0.1 195)`), tint accent at 14% over white.
- ImmunoX magenta: accent `oklch(0.72 0.22 340)` (RD/RO "pink" accent), ink `--magenta-text` (`oklch(0.5 0.2 340)`), tint 12%.
- Parnassus lime: accent `oklch(0.8 0.16 125)` → `--lime`; ink `oklch(0.46 0.12 130)` → add `--lime-text`; tint 16%.
- Access dots: open `oklch(0.72 0.17 150)`, restricted `oklch(0.72 0.17 50)` (`ACCESS_DOT` in the data file; status colours, deliberately outside the sponsor palette).
- Review-notes amber: `oklch(0.85 0.12 85)` at 60% border / 8% bg, text `oklch(0.9 0.06 85)`.
- Button hover `oklch(0.22 0.08 265)` → `--primary`.
- Shadows: hero/CTA card `0 30px 60px oklch(0.05 0.04 265 / 0.35)`; menu ≈ `--shadow-lift`; spotlight card ≈ `--shadow-soft`; other-card hover `0 16px 36px ink/10`.
- Radii: 999 pills · 28 spotlight panel · 24 prepare card · 20 cards and menu · 18 inner cards · 14 owner chip and notes · 12 menu items and partner tile.
- Type: Fraunces 500 for display (`--font-display`), Inter 400/500/600 for UI (`--font-sans`), as on the rest of the site.

## Assets
- Sunburst logo and chrome: existing `chrome.tsx`.
- Sprites: `project-motifs.tsx` (+ the new `orbit`).
- Documents linked from detail pages (host before launch; list and hrefs in OPEN_ITEMS.md): Hellman guidelines and application form (.docx), ImmunoX Sabbatical RFA (.docx), Community Fund budget template (.xlsx) and timeline template (.docx). Copies are in `uploads/`.
- No photography.

## Files in this bundle
- `CURSOR_PROMPT.md`: the prompt to paste into Cursor
- `README.md`: this spec
- `CONTENT.md`: hub, chrome, and CTA copy, verbatim, plus the per-opportunity summary
- `funding.data.ts`: all seven opportunities and both partners as typed data, verbatim (→ `src/data/funding.ts`)
- `OPEN_ITEMS.md`: review notes, documents to host, structural decisions
- `Funding.dc.html` + `support.js`: the HTML design reference (hub at `#funding`, detail at `#<id>`)
- `uploads/`: the documents the page links to, plus Community Fund source material
