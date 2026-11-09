# Handoff: Community & Enrichment Programs service page

## Overview

A service page for OCR's Community & Enrichment Programs arm, built to sit beside the Research Development and Research Operations pages as a peer. It lets two audiences self-direct: PIs and center directors who need a community built or an enrichment program run, and community leaders who want to see what a community manager does. The page moves from a need picker (hero) to the playbook (four program areas), a sample program year, the channels the team publishes, the team and partner communities, where the arm sits relative to Research Operations, four engagement models, and a closing CTA.

Target route: `/services/community-management` in `j-vincent-chan/ocr-website` (TanStack Router, React 19, Tailwind v4).

## About the design files

Everything in `design/` is a **design reference built in HTML**: a working prototype that shows intended look and behavior. It is not production code. The task is to recreate it in the repo's existing environment using its established components (`SiteShell`, `Breadcrumb`, `CTA`, `OffsetPortrait`, `Eyebrow`, pill recipes, `tint`, `TRANSITION`) and the tokens in `src/styles.css`.

- `design/Community & Enrichment Programs v2.dc.html` — the page. Markup is inline-styled; all copy and data live as plain JS constants in the `<script data-dc-script>` block at the bottom (`SVC`, `STOPS`, `NEEDS`, `EXAMPLES`, `MONTHS`, `TEAM`, `PARTNERS`, `CHIP`), followed by the `Component` class that holds state and derived values. Port those constants verbatim into `src/data/community-management.ts`.
- `design/support.js`, `design/image-slot.js` — prototype runtime only; do not port.
- `design/assets/people/*.jpg` — team portraits (already in the repo under `src/assets/people/`).
- `design/assets/mock/*.png` — generic placeholder "screenshots" for the Channels section (newsletter, blog, vlog, social). Use until real screenshots exist.

## Fidelity

**High-fidelity.** Colors, type, spacing, radii, and transitions are final. Recreate them exactly, mapping oklch values to the existing `styles.css` tokens where they already exist (the page was built from those tokens).

## Global

- Page background `oklch(0.99 0.005 90)` (`--cream`-adjacent off-white); alternating section bands use `oklch(0.97 0.012 85)` (`--cream`). Max content width 1280px with 24px side padding; section vertical padding `clamp(48px, 7vw, 96px)`.
- Fonts: Fraunces (display; weights 400/500/600, opsz axis) and Inter (body; 400/500/600) from Google Fonts. Body text color `oklch(0.18 0.06 265)`; ink `oklch(0.14 0.06 265)` (`--ink`). `font-feature-settings: 'ss01','cv11'`, antialiased.
- Links: ink by default, lime text `oklch(0.46 0.12 130)` on hover, no underline unless noted.
- Section header grammar (used by Playbook, Program year, Channels, Where this fits): two-column grid `repeat(auto-fit, minmax(300px, 1fr))`, gap `24px 72px`, items aligned to the bottom; left column = eyebrow + h2, right column = lede paragraph.
  - Eyebrow: 12px Inter 500, uppercase, `letter-spacing .18em`, lime text `oklch(0.46 0.12 130)`, 16px below.
  - h2: Fraunces 500, `clamp(32px, 4vw, 48px)` / 1.04, `letter-spacing -0.02em`, ink, `text-wrap: pretty`.
  - Lede: Inter `clamp(16px, 1.4vw, 19px)` / 1.55, `oklch(0.3 0.04 265)`.
- Pill buttons: radius 999px. Primary = ink background, white text, `padding 11–12px 18–20px`, 14–15px Inter 500. Outline = `1px solid oklch(0.14 0.06 265 / 0.25)`, ink text.
- Transitions default to `.25s ease-in-out` on background-color, border-color, color, opacity, box-shadow (same `TRANSITION` constant as Research Development).

### Service area palette (used everywhere a dot, ring, or accent appears)

| key | name | kicker | dot/ring color | text color |
| --- | --- | --- | --- | --- |
| build | Community building & engagement | People | `oklch(0.7 0.2 30)` (coral) | `oklch(0.5 0.18 30)` |
| events | Events & scientific programming | Convenings | `oklch(0.84 0.16 85)` (gold) | `oklch(0.55 0.14 75)` |
| comms | Communications & outreach | Visibility | `oklch(0.78 0.13 195)` (teal) | `oklch(0.45 0.1 195)` |
| program | Program & partnership development | Programs & partners | `oklch(0.72 0.16 290)` (violet) | `oklch(0.48 0.18 285)` |
| arm | this service arm | — | `oklch(0.82 0.18 130)` (lime) | `oklch(0.46 0.12 130)` |

`tint(color, a)` appends `/ a` to an oklch color; used for 12–16% panels, 14% hover fills, 25–30% halos, 55% resting rings.

## Screens / sections

### 0. Chrome

- UCSF top bar: ink background, 36px tall, 12px white text at 80% opacity: "University of California San Francisco" left; "About UCSF", "UCSF Health", and a white "Donate" pill right.
- Sticky site header (`position: sticky; top: 0; z-index: 40; backdrop-filter: blur(12px)`), min-height 80px. Tone follows the section under it: over dark sections (hero, footer) background ink, white text; elsewhere `oklch(0.99 0.005 90 / 0.85)` with ink text and a 1px `oklch(0.91 0.012 90)` bottom border. Transition `.3s` on background and color.
  - Left: sunburst logo (44px) + "Office of / Collaborative Research" in Fraunces 15px.
  - Right-aligned nav, 14px Inter 500, items padded `8px 12px`: About · **Services** (active pill with caret, background `rgba(255,255,255,.1)` on dark / `oklch(0.95 0.012 85)` on light) · People · Programs & Projects · Funding.
  - Far right: "Get in touch →" pill, `padding 10px 20px`, 14px/500; white-on-dark sections become ink text, ink-on-light sections become white text (inverse of the header tone).
  - Flex-wrap: on narrow widths the nav drops to its own row beneath logo and pill.

### 1. Hero (dark) — `data-tone="dark"`

Background ink. Decorative blurred disc top-right: 720px circle, `opacity .42`, `blur(70px)`, gradient 135° coral → magenta `oklch(0.62 0.24 340)` → violet `oklch(0.55 0.2 280)` → teal. Content padding `clamp(36px,5vw,60px) 24px clamp(32px,5vw,72px)`.

- Eyebrow "Community & Enrichment Programs" in lime `oklch(0.82 0.18 130)`.
- h1: Fraunces 500 `clamp(40px, 5vw, 60px)` / 1.04, max-width 860px, white: "From a member list to a **connected research community.**" — only "connected research community." is lime.
- Lede (max 640px, `clamp(16px,1.5vw,19px)` / 1.55, `oklch(0.82 0.02 265)`): "Community managers who build, engage, and sustain research communities: launching initiatives, running seminars, retreats, and award programs, keeping members informed, and connecting investigators across departments and institutions. We built the playbook for ImmunoX; we now run it for other UCSF communities."

**Need picker** (36px below): label "WHAT DOES YOUR COMMUNITY NEED?" 12px uppercase `.16em` `oklch(0.72 0.02 265)`; then a `radiogroup` of six chips in this order:

1. I'm launching a program or center (`launch`, violet dot)
2. Our enrichment program could do more (`enrichment`, lime dot)
3. Our members rarely interact (`engage`, coral dot)
4. We're planning a symposium, retreat, or seminar series (`events`, gold dot)
5. We need a newsletter, website, or more visibility (`comms`, teal dot)
6. Our trainees need a community of their own (`trainees`, violet dot)

Chip: inline-flex, gap 8px, radius 999, `padding 11px 20px`, 15px/500, 10px colored dot. Inactive: transparent fill, `1px solid rgba(255,255,255,.3)`, white text. Active (`aria-checked`): white fill and border, ink text. Default active = `launch` (prop `defaultNeed`).

**Service track** (52px below, max-width 1000px): a faint tapered band behind four stops (`left:12%; right:12%; top:34px; height:12px; clip-path: polygon(0 42%, 100% 0, 100% 100%, 0 58%)`, gradient white 10% → 28%). Four stops in a 4-column grid, each a button: kicker (uppercase `.14em`, `clamp(10px,1vw,12px)`, `oklch(0.72 0.02 265)`), dot, name (Fraunces `clamp(14px,1.6vw,20px)`). Lit stop: 14px dot with 6px halo `tint(color,.25)`, white name. Unlit: 10px dot at 50% opacity, name `rgba(255,255,255,.5)`. Clicking a stop selects the first need whose `lit[0]` is that service. Which stops light per need: launch → program, build; enrichment → program, events, comms; engage → build, events; events → events; comms → comms; trainees → program, events, build.

**Start-here card** (44px below): white, radius 20, `padding 28px 32px`, 5px top border in the need's color (`.25s` transition), two-column `auto-fit minmax(300px,1fr)` with gap `32px 48px`.

- Left: "START HERE" 12px uppercase in the need's text color; h2 Fraunces 500 `clamp(26px,2.4vw,30px)` with the need title (enrichment adds a subtitle line "for P30 and other center grants", 18px/400 `oklch(0.42 0.03 265)`); body 15px/1.5 `oklch(0.35 0.04 265)`; optional "Also draws on" line (13px) with colored dots and service labels; then a `dl` of four facts (When / For whom / Structure / Cost) — 84px term column, 11px uppercase terms, 14px values, hairline `oklch(0.14 0.06 265 / 0.08)` dividers.
- Right panel: radius 18, `padding 20px`, background `tint(need color, .12)`. Inside, a white card (radius 14, padding 18, shadow `0 8px 24px oklch(0.14 0.06 265 / 0.08)`): three overlapping 36px portraits (Xochitl Vargas, Jonathon Wilson, Vincent Chan; 2px white rings, −10px overlap), "Scope it with the team" 15px/600 + the need's hint (13px); ink pill "Start the conversation →" linking to `#contact`; footnote "No charter, budget, or grant required" 12px centered.

All six need objects (title, body, also, facts, hint) are in `NEEDS` in the reference file.

### 2. The playbook (accordion)

Header: eyebrow "The playbook"; h2 "What a community manager runs."; lede "Four areas of work, all running today for UCSF research communities. Open one for examples."

Four rows (build, events, comms, program) stacked with 10px gap; exactly one open at a time; `build` is open on load (prop `playbookStartOpen`). Clicking the open row closes it.

- Row: radius 20. Closed: white, `1px solid oklch(0.88 0.012 90)`. Open: `tint(color, .16)` fill, transparent border. `.4s ease` on background and border.
- Header button: grid `auto minmax(0,1fr) auto`, gap `clamp(14px,2vw,24px)`, padding `clamp(18px,2vw,24px) clamp(16px,2.2vw,28px)`, hover fill `oklch(0.14 0.06 265 / 0.03)`. Number ("01"–"04") Fraunces 15px/500 `.1em`, colored when open else `oklch(0.48 0.03 265)`. Name Fraunces 500 `clamp(20px,2.2vw,28px)` ink; headline below 15px/1.45 (service text color when open, `oklch(0.42 0.03 265)` when closed). Right: 40px circle with a plus icon; open = filled with the service color and rotated 45° (`.45s cubic-bezier(.2,.7,.2,1)`), closed = `1px solid oklch(0.14 0.06 265 / 0.15)` outline.
- Panel: animate with `grid-template-rows 0fr → 1fr` (`.45s` same easing); content fades/slides (`opacity`, `translateY(-8px) → 0`). Inside, two columns `auto-fit minmax(280px,1fr)`, gap `28px clamp(32px,4vw,64px)`, padding `4px clamp(16px,2.2vw,28px) clamp(24px,2.6vw,32px)`:
  - Left: body paragraph `clamp(15px,1.3vw,17px)` / 1.55 `oklch(0.25 0.04 265)`; ink pill CTA (label from `SVC[k].cta[0]`, href `mailto:ocr@ucsf.edu?subject=…` from `cta[1]`); text button "Full capability list →" (14px/500 ink) that opens the detail drawer.
  - Right: "FOR EXAMPLE" 11px uppercase label; six example tiles in `auto-fill minmax(220px,1fr)` grid, gap 8px: white, radius 12, `padding 12px 14px`, 14px/1.45, 8px colored dot; footnote "Examples, not a complete list. Each engagement is scoped with you." 13px `oklch(0.48 0.03 265)`.

Examples per area are in `EXAMPLES`; headline/body/CTA per area in `SVC`.

### 3. A program year

Band background `oklch(0.97 0.012 85)`. Header: eyebrow "A program year"; h2 "Built backward from the progress report."; lede "A community is renewed on what it can show. We set the year against the grant's commitments, run it on a calendar leadership can see, and track outcomes from the first seminar so the report writes itself. Select a month."

- Month strip: 12 equal columns, gap 4px. Each a button: radius 12, `padding 12px 2px 10px`, label `clamp(10px,1.2vw,13px)` 500 `.04em`, beneath it 6px dots (one per item, colored by service). Inactive: white, `1px solid oklch(0.88 0.012 90)`, text `oklch(0.3 0.04 265)`. Active (`aria-pressed`): ink fill and border, white text. Default September.
- Detail card (20px below): white, radius 20, `1px solid oklch(0.91 0.012 90)`, `padding 28px 32px`, two columns `auto-fit minmax(300px,1fr)` gap `32px 72px`.
  - Left: "ON THE CALENDAR" label; month name Fraunces 500 `clamp(26px,2.4vw,30px)`; list of items, each a 10px dot + track label (11px uppercase in the service text color) + text (15px/1.45).
  - Right: "EVERY MONTH" panel (radius 16, `padding 18px 20px`, cream) listing four standing items with gold/teal/violet/coral dots; a four-item legend (Community · Events · Communications · Programs & awards); note "An illustrative composite of the ImmunoX and Diabetes Center program years. Your calendar is set against your grant's commitments and reporting dates."

Month data is in `MONTHS` (still under content review for accuracy against ImmunoX and DRC/NORC calendars).

### 4. Channels we produce (toggle via prop `showChannels`)

Header: eyebrow "Channels we produce"; h2 "A community that hears from itself."; lede "No other OCR arm publishes. For ImmunoX we write, film, record, and post: each channel is a route back into the community, where a spotlight becomes a seminar invitation and a newsletter item becomes a pilot application."

Four figures in `auto-fit minmax(200px,1fr)`, gap 20px. Each: a 260px-tall image frame (radius 16, `1px solid oklch(0.91 0.012 90)`, cream fill) showing the placeholder image (`assets/mock/*.png`, cover) and a caption: 8px teal dot + Fraunces 500 18px title, then 13px/1.5 `oklch(0.42 0.03 265)` description.

1. Newsletters — "Papers, funding, events, and spotlights, to members on a schedule."
2. Blog & spotlights — "Faculty and trainee spotlights, written for a general scientific audience."
3. Vlogs & audio clips — "Short video and audio from seminars, retreats, and member interviews."
4. Social media — "Institute accounts that carry papers, awards, and events to the wider field."

### 5. Team & partners — `#team`

Band background `oklch(0.97 0.012 85)`. Modeled on `src/components/research-development/team-and-partners.tsx`; reuse `OffsetPortrait`. Two columns in a wrapping flex row, gap `48px 80px`: left `flex: 7 1 440px`, right `flex: 5 1 320px` (7:5 when side by side, stacked when narrow).

Column headers (both columns): eyebrow; h2 Fraunces 500 `clamp(28px,3vw,36px)` / 1.05 `-0.02em`, 8px below; intro 15px/1.55 `oklch(0.38 0.04 265)` with `min-height 47px` so both lists start level, 24px below.

**Our team → "Our community managers"**. Intro: "Community managers sit inside OCR, so a partner funding a fraction of one still gets the templates, award workflows, and channels built across every community we run."

List with 1px ink top rule; rows separated by `oklch(0.88 0.012 90)` rules with 6px outer padding. Row: relative flex, gap 20px, radius 14, `padding 12px 14px`; a full-bleed invisible button over the row carries `aria-pressed` (pinned) and `aria-label "{name}: highlight partner communities"`.

- Portrait: 80px box; accent disc `inset 0` in the person's color at 55% alpha at rest, full color when hot; 70px photo circle at `top 2px; left 2px` with 3px white border, `object-position: center 18%`. The open position shows the 38px sunburst logo on white instead of a photo.
- Name: Fraunces 400 22px ink. Optional pill after the name (open position: "Apply ↗" → job posting): radius 6, `1px solid oklch(0.14 0.06 265 / 0.18)`, `padding 4px 8px`, 12px/600 `oklch(0.42 0.03 265)`; hover border `/0.45` and ink text.
- Role: 14px in the person's text color, 2px below. Bio: 14px/1.5 `oklch(0.38 0.04 265)`, 6px below.

| id | name | role | bio | color / text | supports |
| --- | --- | --- | --- | --- | --- |
| xochitl | Xochitl Vargas | Community manager | Participation and mentorship pipeline for immunology research at UCSF. | magenta `oklch(0.62 0.24 340)` / `oklch(0.5 0.2 340)` | immunox |
| jonathan | Jonathon Wilson | Community manager | Award finance, subawards, and the budget side of pilot and travel programs. | coral `oklch(0.7 0.2 30)` / `oklch(0.5 0.18 30)` | immunox, parnassus, diabetes |
| open | Open position | Community manager | Embedded full-time; runs the ImmunoX community end to end. We are hiring. (Apply → `OPEN_POSITIONS.immunoxCommunityManager.href`) | lime `oklch(0.82 0.18 130)` / `oklch(0.46 0.12 130)` | immunox |

**Our partners → "Our partner communities"**. Intro: "The research communities we run today, each on its own calendar and against its own grant's commitments."

List with 1px ink top rule; rows separated by `oklch(0.88 0.012 90)` rules with 5px outer padding. Each row is an external link (new tab): flex, gap 14px, radius 14, `padding 11px 14px`; hover fill `oklch(0.14 0.06 265 / 0.06)`. Left: 58px dot column with one 10px dot per supporting person (their color). Middle: name Fraunces 19px ink; meta 13px `oklch(0.42 0.03 265)`. Right: "↗" 16px in the first supporter's text color (lime text if none), nudged `translate(2px,-2px)` on hover.

| id | name | meta | url |
| --- | --- | --- | --- |
| immunox | Bakar ImmunoX Initiative | Founding community · supported since before OCR launched | https://immunox.ucsf.edu/ |
| parnassus | Parnassus Institutes | Directors' meetings, campus leadership, community fund, social events | https://immunox.notion.site/Parnassus-Institutes-adfc1c14869f4300964ac0f52ca49f3f |
| diabetes | UCSF Diabetes Center | DRC and NORC P30 enrichment programs | https://diabetes.ucsf.edu/ |
| iha | Institute for Health & Aging | Partner since 2026 · faculty outreach and community management | https://iha.ucsf.edu/ |

Below the list, right-aligned: "Talk to us about partnership →" filled pill, background `oklch(0.46 0.12 130)`, white text, `padding 13px 24px`, 15px/500, shadow `0 8px 20px oklch(0.46 0.12 130 / 0.3)`, hover `brightness(.95)`; links to `/contact`.

Full-width hint line 28px below both columns, 13px `oklch(0.42 0.03 265)`, `aria-live="polite"`.

**Linked highlighting.** `focus = hover ?? pin`. Hovering or focusing a team row sets hover; clicking toggles pin. When a person is focused: their row fills `tint(color,.14)` and the disc goes full color; other rows drop to 65% opacity; partner rows they support fill `tint(color,.14)` and that person's dot gains a 4px halo `tint(color,.3)`; unsupported partner rows drop to 65%. Hint reads "{Name} supports the A, the B and the C." ("Our open position will support the Bakar ImmunoX Initiative." for the opening); default "Hover or click a community manager to see the communities they support."

The person → community assignments above are provisional and awaiting confirmation from OCR.

### 6. Where this arm fits (toggle via prop `showBoundary`) — `#fit`

Header: eyebrow "Where this arm fits"; h2 "People and programming, not project management."; lede "Community management owns the people, relationships, engagement, and programming of a research community. The scientific and operational management of research projects belongs to OCR's Research Operations & Management arm. On a large award, the two work side by side."

Label "ONE P01, THREE ARMS" (11px uppercase `.22em`). Three columns `auto-fit minmax(260px,1fr)`, gap `24px 48px`, each with a 1px ink top rule and 20px top padding: arm label with 6px dot (coral / teal / lime), h3 Fraunces 500 22px, 15px/1.55 body, then an "Explore →" link in the arm's text color — or, for this arm, a "YOU ARE HERE" pill (11px uppercase, `oklch(0.14 0.06 265 / 0.05)` fill).

1. Research development → "The application" — "Concept, aims, and the proposal that wins the award, with the community engagement section drafted from programs we already run." → `/services/research-development`
2. Research operations & management → "The deliverables" — "Milestones, budgets, regulatory work, and the day-to-day coordination that gets the science done." → `/services/research-operations`
3. Community & enrichment programs → "The community" — "Scientific retreats, investigator networking, communications, and the collaborative programming that turns a project team into a community." (You are here)

### 7. Four ways to engage — `#engage`

Band `oklch(0.97 0.012 85)`. Single-column header (max 640px): eyebrow "Four ways to engage"; h2 "Scaled to the community, not the other way around."; lede "The same team, four shapes. Most partners start with one and grow into another as the community does."

Four cards `auto-fit minmax(200px,1fr)`, gap 20px: white, radius 24, `1px solid oklch(0.91 0.012 90)`, `padding 32px`, 2px accent line across the top inset 32px. "MODEL 0n" 11px uppercase `.24em` in the accent text color; h3 Fraunces 500 20px/1.3; body 14px/1.6 `oklch(0.38 0.04 265)`; footer pinned to the bottom with "IN PRACTICE" (10px uppercase `.22em`) and 11px chips (radius 999, `1px solid oklch(0.91 0.012 90)`, `oklch(0.95 0.012 85 / 0.6)` fill).

1. gold — Partial effort on a center grant — chips: Diabetes Center DRC, Diabetes Center NORC
2. coral — Embedded full-time community manager — chip: Bakar ImmunoX Initiative
3. teal — Shared coordination across institutes — chip: Parnassus Institutes
4. violet — Written into the grant with you — chips: P30 & P50 centers, U54 & program projects, Institute-level centers

Body copy for each is in the reference file.

### 8. CTA — `#contact`

Use the shared `CTA` component with: eyebrow "Enrichment programs"; title "Writing a center grant?" + second line at 70% white "Talk to us before the Enrichment section."; subtitle "Whether you are drafting a P30, renewing one, launching a new initiative, or trying to make an existing community actually run, tell us what you promised and we'll scope the community manager effort to deliver it."; email `ocr@ucsf.edu`; primary "Book a 30-min consult →" (Microsoft Bookings link in the reference) and secondary outline "Partner with OCR" → `/contact`. Visual: ink card, radius 40, 25% sunburst gradient wash, `scroll-margin-top: 96px`.

### 9. Footer

Existing site footer; "Community & enrichment programs" is the active (white) item in the Services column.

### 10. Detail drawer (from "Full capability list")

Right-anchored `aside role="dialog" aria-modal`, `width: min(540px, 100%)`, white, shadow `-30px 0 60px oklch(0.05 0.04 265 / 0.3)`, slides in from +48px over `.3s ease`; scrim `oklch(0.14 0.06 265 / 0.5)` with `blur(2px)` fading in over `.25s`. 5px top band in the service color. Content padding `28px 32px 36px`: "0n · Name" label in the service text color, 36px round close button (×), h3 Fraunces 500 30px headline, 15px body, "CAPABILITIES" list (5px dots, 14px/1.45) from `SVC[k].activities`, facts `dl` (96px term column), then ink pill CTA (mailto) and outline "Talk to us" → `#contact`. Escape closes; `document.body.style.overflow = "hidden"` while open.

## State

| state | type | default | set by |
| --- | --- | --- | --- |
| need | need key or null | prop `defaultNeed` (`launch`) | chips, service-track stops |
| play | service key or null | `build` if `playbookStartOpen` | accordion headers (toggle; one open) |
| month | month key | `sep` | month strip |
| drawer | service key or null | null | "Full capability list", close button, Escape, scrim |
| tHover / tPin | team id or null | null | team row hover/focus; click toggles pin |
| pHover | partner id or null | null | partner row hover/focus |
| navDark, headerH | boolean, px | true, 80 | scroll/resize observer: dark when a `data-tone="dark"` section sits under the header's midpoint |

Props exposed as tweaks in the prototype: `showChannels` (bool, true), `showBoundary` (bool, true), `defaultNeed` (enum), `playbookStartOpen` (bool, true). Implement as component props or drop them if the production page is fixed.

## Design tokens (as used)

- Ink `oklch(0.14 0.06 265)`; body text `oklch(0.18 0.06 265)`; muted text `oklch(0.3 0.04 265)`, `oklch(0.38 0.04 265)`, `oklch(0.42 0.03 265)`, `oklch(0.48 0.03 265)`.
- Page `oklch(0.99 0.005 90)`; cream band `oklch(0.97 0.012 85)`; secondary fill `oklch(0.95 0.012 85)`; rules `oklch(0.91 0.012 90)` and `oklch(0.88 0.012 90)`; hairline `oklch(0.14 0.06 265 / 0.08)`.
- Accents: see the service palette table. Lime arm text `oklch(0.46 0.12 130)`.
- Radii: 6 (pills in rows), 12 (tiles, month buttons), 14 (rows, inner cards), 16 (panels, figures), 18–20 (cards), 24 (model cards), 40 (CTA), 999 (pills).
- Shadows: `0 8px 24px oklch(0.14 0.06 265 / 0.08)` (cards), `0 8px 20px oklch(0.46 0.12 130 / 0.3)` (partnership pill), `-30px 0 60px oklch(0.05 0.04 265 / 0.3)` (drawer).
- Easing: `.25s ease-in-out` (color/opacity), `.3s–.4s ease` (fills), `.45s cubic-bezier(.2,.7,.2,1)` (accordion).

## Assets

- `design/assets/people/xochitl-vargas.jpg`, `jonathan-wilson.jpg`, `vincent-chan.jpg` — portraits (same files as `src/assets/people/`).
- `design/assets/mock/newsletter.png`, `blog.png`, `vlog.png`, `social.png` — 640×560 generic UI placeholders for the Channels section; replace with real screenshots when available.
- Sunburst logo: the existing `SunburstLogo` component in `src/components/site/chrome.tsx`.

## Open content items

- Person → partner community assignments in the Team section are provisional.
- `MONTHS` calendar items are an illustrative composite and still need review against the actual ImmunoX and DRC/NORC program years.
- Confirm Jonathon Wilson's spelling site-wide (the People page currently has "Jonathan").
