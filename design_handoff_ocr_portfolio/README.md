# Handoff: OCR Portfolio page (Programs, Projects, Communities)

Prepared 13 November 2026 for the UCSF Office of Collaborative Research (OCR) website, https://ocr.ucsf.edu.

## Overview

This replaces the current "Programs & Projects" page (`/projects`) with a page called **Portfolio**. It shows where OCR contributes and what that contribution looks like, and it separates three kinds of engagement that the current page presents as equals:

- **Programs** encompass multiple research efforts (for example, a clinical research office running six studies).
- **Projects** are individual research efforts: one biospecimen collection effort, clinical study, or trial. Some belong to a program; others stand alone.
- **Communities** are groups of people and organizations that OCR supports through community-building and enrichment programming. They sit alongside programs and projects, not beneath them.

The layout of each section carries the distinction: programs are large containers with their constituent work nested inside, projects are a compact searchable directory, and communities are profiles.

## About the design files

The files in `prototype/` are **design references built in HTML**. They show the intended look, content and behavior. They are not production code. `Portfolio.dc.html` runs on a prototyping runtime (`support.js`) with its own template syntax (`{{ holes }}`, `<sc-for>`, `<sc-if>`); do not ship that file or the runtime.

The task is to **recreate this design in the OCR website's existing codebase**, using its framework, component patterns, routing and styling conventions. The live site appears to be a React single-page app built with Vite and Tailwind CSS (hashed files under `/assets`, Tailwind utility classes in the markup). Confirm this in the repository before starting.

To view the prototype, serve the `prototype/` folder over HTTP and open `Portfolio.dc.html`.

## Fidelity

**High fidelity.** Colors, typography, spacing, copy and interactions are final. Every style in the prototype is written inline on its element, so the prototype file is the exact specification for any value not listed here. Recreate it faithfully using the codebase's existing tokens where they match (the palette and fonts were taken from the live site).

## Page structure

One route with three in-page views, plus two detail routes.

| Route (proposed) | Prototype equivalent | Content |
|---|---|---|
| `/portfolio` | default | Hero, category switcher, then the selected view (Programs by default), then the contact card |
| `/portfolio/programs/:id` | `#/program/:id` | Program detail page |
| `/portfolio/projects/:id` | `#/project/:id` | Project detail page |

The prototype uses hash routes only because it is a single file. Use real routes, and redirect `/projects` to `/portfolio`. The main navigation label changes from the current one to **Portfolio**.

Page container: `max-width: 1280px`, centered, `24px` side padding. Page background `#fdfcf8`.

### 1. Hero and category switcher (one cream band)

- Band: background `#f9f5ec`, bottom border `1px solid rgba(1,6,33,.1)`. A decorative glow sits top-left: a 640px circle, `blur(64px)`, opacity .25, gradient `135deg #ff6450 → #db2fb2 → #6159e1 → #00b5b6`.
- Eyebrow "Portfolio": Inter 500, 12px, letter-spacing .22em, uppercase, `#b82695`.
- H1 "Science we're *moving forward.*": Fraunces 400, `clamp(2.2rem, 5.2vw, 4.25rem)`, line-height 1, letter-spacing -.025em, `#010621`. The second phrase uses gradient text (`135deg #e55240 → #ce35a8 → #615ed6 → #008e8e`).
- Intro paragraph: `clamp(1rem, 1.4vw, 1.125rem)`, line-height 1.6, `#555e6f`, max-width 44rem.
- **Switcher**: a pill-shaped `tablist` (white, `1px solid #dad7cf`, 4px padding) with three tabs: Programs, Projects, Communities, each followed by its count. The selected tab is filled navy `#010621` with white text.
- **Explainer panel** under the tabs: white card, radius 24px, border `#e4e1d8`. It holds a round motif thumbnail (84 to 128px), a two-tone serif statement, a one-sentence description and a relationship note. Copy per tab:
  - Programs *encompass multiple research efforts.* / "A program can hold dozens of projects or trials. OCR's role is stated for the program as a whole." / "Programs contain projects."
  - Projects *are individual research efforts.* / "One biospecimen collection effort, clinical study, or trial. Some belong to a program; others stand alone." / "Some belong to a program."
  - Communities *are groups of people and organizations.* / "Supported through community-building and enrichment programming that OCR helps deliver." / "Alongside programs and projects, not beneath them."
- **Sticky section bar**: once the visitor scrolls past the switcher, a slim fixed bar appears under the site header (`top: 80px`, translucent `rgba(253,252,248,.94)` with 12px backdrop blur) with links to Programs, Projects, Communities and Contact.

### 2. Programs view

A vertical stack of program cards in the order given in the data. Closed programs go last, separated from the active ones by a labelled divider.

**Program card** (white, radius 24px, border `#e4e1d8`, shadow `0 1px 2px rgba(5,15,44,.04), 0 8px 24px rgba(5,15,44,.06)`):

- **Background motif**: the program's animated motif fills the top-right of the card at opacity .62, masked by a radial fade, drifting on a 14s loop.
- **Pills** at the top: theme pill, then the status pill (see Status below).
- **Title**: Fraunces. If the program has an acronym (`short`), it follows the title after a comma in smaller grey Inter (.55em, `#555e6f`), the same treatment the People page uses for degrees: "Bronchiectasis & NTM, INTEGRATE".
- **Subtitle** (`subtitle`): Inter 500, 13px, letter-spacing .18em, uppercase.
- **Lead**: investigator names with degrees appended from the `degrees` lookup.
- **Description** (`card`).
- **"OCR provides"**: the `services` values as chips.
- **Scale indicator**: a large figure and unit ("6 projects", "25 patients profiled") with a one-line breakdown. See `DATA_MODEL.md` for how it is derived.
- **Expand/collapse toggle** (round button, top-right) opens the tray below.
- **Tray: "Selected projects"** (cream `#f9f5ec`, radius 18px). A tree of at most **three** child rows, sorted Active, Pending, Closed. Each row has a thin connector line, a motif thumbnail, the project name (links to the project), a meta line and its status. If the program has more than three, a dashed final row reads "+N more · Open the program to see all N". Hovering or focusing a row darkens its branch of the tree, fills its node dot and shifts the row 4px.
  - ImmunoX co·projects draws its rows from `coprojects.active`, featured first.
  - UCSF Custom Discovery has no child projects. Its tray is titled "Most profiled cancers" and lists cancer-type groups with patient counts (never individual patients).
- **"Explore the program →"**: dark pill button, bottom-right. Clicking anywhere on the card that is not a link or button also opens the program page.
- **Closed programs**: card background `#f6f4ee`, no shadow, motif grey and static at opacity .3, button `#555e6f`. Text colors stay the same as active cards.
- By default, active programs that have children start expanded.

### 3. Projects view

**Toolbar** (one row, wraps): search field, then three dropdowns. All controls are 44px high, fully rounded, white, border `#e4e1d8`.

1. Project type: All projects / Biospecimen collection / Clinical studies & trials
2. Status: Active (default) / Closed / All
3. Theme: All themes, then each theme

Below the toolbar: a live result line ("Showing 9 of 23 projects · 11 closed hidden"; the word "matching" is inserted when a search, type, program or theme filter is active), removable chips for each active filter with a "Clear all" link, and a Cards / List layout toggle on the right.

**Sort order**: start year, newest first; then Pending, Active, Closed; then name. Nine projects show initially, with a "Show more" button.

**Card layout** (`grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr))`, gap 20px). Each card is white, radius 20px, and the whole card links to the project page.

- Banner (16:7) with the project's animated motif on a tint of its theme color. The status pill sits over the banner, top-left.
- Kind line: "Biospecimen collection · Biobank" or "Clinical trial · Phase 3" (12.5px, `#555e6f`).
- Theme pill in the theme color.
- Title: Fraunces 22px, clamped to two lines.
- Investigator line (with degrees).
- Description: clamped to six lines. If the title fits on one line, the description gets seven lines so cards keep the same height.
- Footer, pinned to the bottom of the card: a link to the parent program where there is one (left), "View project →" (right).

**List layout**: one row per project with columns Project (title, investigator, description, theme), Type, OCR contribution (services and status), and Program. Columns stack on narrow widths. A 44px motif thumbnail leads each row.

**Empty state**: "No projects match these filters." with a "Clear filters" button.

### 4. Communities view

Intro sentence linking to the Community & Enrichment Programs service page, then one card per community (white, radius 24px, same shadow as program cards):

- Header: the community mark (52px ring with a conic rainbow gradient and five navy dots), a "Since 2018" pill, the name (Fraunces), a "Serves …" line, and an outlined "Visit the community ↗" button at the top right.
- Body, two columns under a divider: **OCR provides** (description plus the engagement model as a dark pill) and **Selected programming** (group headings with chips beneath, in an auto-fit grid). For the Diabetes Center the right column is **Enrichment programs**: one tile per P30 program (DRC, NORC) and a single shared note.
- Background: thin rainbow rings ripple outward from the mark and fade (three rings, 10.5s each, staggered 3.5s).
- Closing row: a note ("Only documented programming is listed…") and a "What a community manager runs →" button.

### 5. Contact card

Dark gradient card (`120deg #45202f → #3a1245 → #1c1b56 → #102a52 → #06303f`), radius up to 48px, with a soft teal circle bottom-right. Left: eyebrow "Start with us", two-tone serif headline "Have something we / should be working on?" (white, then `#cdbccf`), description. Right: a frosted panel (`rgba(255,255,255,.09)`, border `rgba(255,255,255,.2)`, 10px backdrop blur) with "Email us", `ocr@ucsf.edu`, a white "Book a 30-min consult →" button and an outlined "Partner with OCR" button.

### 6. Program and project detail pages

- Breadcrumb: Home / Portfolio / Programs (or Projects) / name.
- **Header band** (cream): pills (category, subtype, status), H1 with the same acronym treatment, subtitle, official title in italics (projects only), lead paragraph, and a meta line (lead and theme). The record's motif fills the right side of the band behind the text at opacity .5, masked to fade toward the text. It leans slightly toward the pointer and brightens on hover.
- **Main column**: Overview (the `full` text); a type-specific fact table (About the program / The collection / The study); Patients (Custom Discovery only, aggregate figures); People and partners; then the related list.
- **Related list**: on a program page, "Projects in this program" (for co·projects, two lists: Active and Completed). On a project page that has a parent, "Also in {program}". Each row is a white card with a 48px motif thumbnail, name, meta line, status pill and an arrow; the whole row is clickable. Completed co·projects have no page, so their rows are not links.
- **Side column**: "OCR's contribution" (status first, then the note "This is the status of OCR's support, not of the research itself.", then service pills); the parent program (project pages); "OCR team" with round 48px photos, names and titles (program pages); Funding (source, study origin, award record link; never amounts); a Data Library card linking to https://datalibrary.ucsf.edu/ where applicable; the external link; and a back link.

## Shared elements

**Status.** Three values: Active, Pending, Closed. This is the status of OCR's support, which is distinct from a study's scientific status (`enrollment`). The pill is semi-transparent white (`rgba(255,255,255,.62)`, 6px backdrop blur, border `rgba(1,6,33,.14)`) with an 8px dot. Active: solid dot in the record's theme color (deep shade). Pending: a ring in that color. Closed: grey dot `#b9b6ae`. The word is always shown; color is never the only signal.

**Motifs.** Thirty animated line-art motifs, each a 100×100 SVG fragment drawn with `currentColor`. `data/motifs.json` holds the artwork (`kinds`) and the assignment of record names to motifs (`records`); an unassigned record gets one by hashing its name. `data/motif-animations.css` holds the base classes and every keyframe they use. Motifs are colored by theme (see tokens) and appear as card banners, thumbnails, card backgrounds and detail-page banners. Small thumbnails are static; banners and backgrounds animate.

## Interactions and behavior

- **Tabs** switch the view in place; nothing reloads. Give each view a shareable URL state (query parameter or sub-route).
- **Filters** apply immediately. Search matches name, acronym, official title, description, lead, theme, type, parent program name, disease areas and services.
- **Program cards**: toggle expands/collapses; card click navigates; inner links keep their own targets; selecting text does not navigate.
- **Hover/focus**: buttons darken (`#010621` → `#08173f`) or fill (`#f2eee6`); row cards gain a navy border and a soft shadow; links underline.
- **Focus**: `outline: 2px solid #d64938; outline-offset: 3px` on `:focus-visible`.
- **Reduced motion**: with `prefers-reduced-motion: reduce`, all transitions and animations stop, motifs are static, and the banner motif does not follow the pointer.
- **Touch targets** are at least 44px.
- **Accessibility**: the switcher is a `tablist` with `aria-selected`; the results line is `aria-live="polite"`; layout and expand toggles use `aria-pressed` / `aria-expanded`; decorative art is `aria-hidden`.

## Responsive behavior

The prototype is fluid from about 360px to 1280px and above.

- Two-column areas use a flex-basis switch (`flex: N 1 calc((760px - 100%) * 999)`), which stacks the columns when their container is narrower than 760px. Replace this with container queries or the codebase's breakpoints.
- Program cards use tighter padding below 640px viewport width.
- The site nav collapses to a menu below 1024px.
- The list layout hides its column headings and stacks columns when the content area is under 660px.
- Parent-child structure is kept on mobile: the program tray and its tree still render inside the program card.

## State

| State | Values | Default |
|---|---|---|
| Selected view | programs, projects, communities | programs |
| Program cards open | map of program id to boolean | active programs with children open |
| Project type filter | all, bio, clin | all |
| Status filter | active, closed, all | active |
| Theme filter | a theme or none | none |
| Program filter | a program id or none | none |
| Search text | string | empty |
| Projects layout | Cards, List | Cards |
| Show more | boolean | false (nine shown) |
| Hovered tree row | program id and row index | none |

No data fetching is needed in the prototype; all content comes from static data. See `DATA_MODEL.md`.

## Design tokens

**Color**

| Token | Value | Use |
|---|---|---|
| Ink | `#010621` | Headings, primary buttons, key text |
| Body | `#242d42` | Body text |
| Muted | `#555e6f` | Secondary text, eyebrows |
| Soft ink | `#384258` | Tertiary text |
| Page | `#fdfcf8` | Page background |
| Cream | `#f9f5ec` | Hero band, trays |
| Sand | `#f2eee6` | Hover fill |
| Chip | `#f4f2ec`, `#f6f4ee` | Chips, closed card |
| Border | `#e4e1d8` | Card and control borders |
| Rule | `#dad7cf` | Dividers |
| Button hover | `#08173f` | Dark button hover |
| Focus | `#d64938` | Focus ring |
| Eyebrow accents | `#b82695`, `#c53324` | Section eyebrows |
| Rainbow | `#ff6450 #db2fb2 #6159e1 #00b5b6 #9dda4f #f3ba25` | Community mark, hero glow |

**Theme accents** (bright shade for motifs and tints, deep shade for dots and text)

| Theme | Bright | Deep |
|---|---|---|
| Autoimmunity (coral) | `#ff6450` | `#e55240` |
| Cancer (teal) | `#00b5b6` | `#008e8e` |
| Infectious disease (magenta) | `#db2fb2` | `#ce35a8` |
| Allergy (lime) | `#9dda4f` | `#608f19` |
| Lung disease (violet) | `#a491ff` | `#615ed6` |
| Pediatrics (gold) | `#f3ba25` | `#a47a00` |
| Surgery & devices (blue) | `#4aa3ff` | `#1f6fc4` |
| Multi-disease (slate) | `#7f8bb0` | `#4a5578` |

Tints are made with `color-mix(in oklab, <bright> N%, #fff)`.

**Typography.** Fraunces (400; optical size axis) for headings and figures; Inter (400, 500, 600) for everything else. Both load from Google Fonts in the prototype; use the site's existing font setup.

| Role | Spec |
|---|---|
| Hero H1 | Fraunces 400, clamp(2.2rem, 5.2vw, 4.25rem) / 1, -.025em |
| Detail H1 | Fraunces 400, clamp(2.2rem, 5vw, 3.75rem) / 1.02, -.02em |
| Section H2 | Fraunces 400, 28px / 1.15, -.01em |
| Card title | Fraunces 400, 22px / 1.2 (project), clamp(1.7rem, 3vw, 2.2rem) / 1.1 (community) |
| Eyebrow | Inter 500, 11 to 12px, uppercase, letter-spacing .18 to .22em |
| Body | Inter 400, 14 to 17px / 1.55 to 1.6 |
| Chips and pills | Inter 500, 12 to 13px / 1.3 |

**Radius**: 999px (pills, buttons, controls), 24px (large cards), 20px (project cards), 16 to 18px (trays, row cards, side boxes), 12px (thumbnails).

**Shadow**: cards `0 1px 2px rgba(5,15,44,.04), 0 8px 24px rgba(5,15,44,.06)`; hovered rows `0 6px 18px rgba(5,15,44,.07)`.

**Spacing**: 24px page gutter; sections `40px` top and `96px` bottom; card padding 20 to 30px; common gaps 6, 8, 12, 16, 20, 24px.

## Assets

- `prototype/people/*.jpg`: 14 staff headshots copied from https://ocr.ucsf.edu/people. Use the site's own copies in production.
- `data/motifs.json`, `data/motif-animations.css`: the motif artwork and animations, selected by the OCR team from an earlier exploration.
- The community mark and all icons are drawn in CSS/inline SVG in the prototype; there are no other image files.
- The OCR logo in the prototype header is a stand-in. Use the site's existing header and footer components.

## Open items for the OCR team

These need an answer from OCR before or during the build. Do not guess.

1. **"Book a 30-min consult"** should open the director's scheduling page. The link is not yet supplied; the prototype uses `mailto:ocr@ucsf.edu?subject=30-minute consult request` (what the live homepage does). "Partner with OCR" goes to `/contact`.
2. **Five projects have no OCR services listed** (all under UCSF Hyde & Stanyan Hospitals): Epicel Cultured Epidermal Autografts (HUD), Long COVID Physiology, Peritoneal Pull-Through Vaginoplasty, Papyrus Covered Coronary Stent (HUD), TOPS: Motion-Preserving Spinal Implant.
3. **The source spreadsheet is behind the page data.** Edits made during design live only in `data/portfolio.json`: service lists, the rename to "Bronchiectasis & NTM", the rename to "Bronchiectasis & NTM Research Registry & Biorepository", program titles and subtitles, and OCR team assignments (the spreadsheet has no staffing column).
4. **"Rare cancers · 13"** on Custom Discovery groups every cancer type with a single patient, which includes common cancers. Confirm the label, and confirm privacy sign-off for publishing aggregate patient counts.
5. **The "Open to sample requests" / "Recruiting" pill** on project cards is switched off for now. The data (`open`, `enrollment`) is kept, and project pages still show an "Open to collaborators and sample requests" box.
6. **The biorepository project's kind line** still reads "Biospecimen collection · Biobank" (`model: "Biobank"`).
7. **Interstitial Lung Disease** (closed) lists its OCR team the same way active programs do.
8. **The Data Library statement** on ImmunoX co·projects ("data is available through the UCSF Data Library") was not checked project by project.

## Files in this package

| Path | What it is |
|---|---|
| `README.md` | This document |
| `CURSOR_PROMPT.md` | The prompt to paste into Cursor |
| `DATA_MODEL.md` | Record types, fields, relationships, derived values, content rules |
| `.cursor/rules/ocr-portfolio.mdc` | Project rule for Cursor (copy into the repo's `.cursor/rules/`) |
| `data/portfolio.json` | Programs, projects, co·projects, degrees, staff, staff photos |
| `data/communities.json` | The four community profiles |
| `data/motifs.json` | Motif artwork and record-to-motif assignments |
| `data/motif-animations.css` | Motif base classes and keyframes |
| `prototype/Portfolio.dc.html` | The design prototype (reference only) |
| `prototype/support.js` | Prototype runtime (reference only; do not ship) |
| `prototype/portfolio-data.js`, `prototype/ocr-motifs.js` | The same data in the form the prototype loads |
| `prototype/people/` | Staff headshots |
