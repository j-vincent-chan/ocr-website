# Cursor prompt: build the OCR Portfolio page

Copy the `design_handoff_ocr_portfolio/` folder into the root of the OCR website repository, then paste everything below the line into Cursor (Agent mode).

---

You are implementing a redesigned page for the UCSF Office of Collaborative Research website (ocr.ucsf.edu). The design is finished and approved. Your job is to build it in this codebase, not to redesign it.

## Read first

1. `design_handoff_ocr_portfolio/README.md`: the full design specification.
2. `design_handoff_ocr_portfolio/DATA_MODEL.md`: record types, derived values and content rules.
3. `design_handoff_ocr_portfolio/prototype/Portfolio.dc.html`: the approved prototype. Every style is inline on its element, so this file is the exact reference for any measurement, color or copy. Its logic class (at the bottom of the file) shows how each value is computed.

The prototype is a design reference written for a prototyping runtime. Do not copy its template syntax (`{{ }}`, `<sc-for>`, `<sc-if>`), and do not add `support.js` or the `.dc.html` file to the app.

## Before writing code

Inspect this repository and report back briefly:

- the framework, router, styling approach and where pages and shared components live;
- how the existing `/projects` page, the site header/footer, and the People page are built;
- existing design tokens (colors, fonts, radii) that match the tokens in the README;
- how content is stored today (static files, CMS, API).

Then propose a short plan (files to add or change) and wait for my go-ahead.

## What to build

1. **Route `/portfolio`** replacing `/projects`, with a redirect from the old path. Change the navigation label to "Portfolio".
2. **Hero and category switcher** (Programs / Projects / Communities) in one band, with the explainer panel and the sticky section bar.
3. **Programs view**: program cards with the animated background motif, title and acronym treatment, "OCR provides" chips, scale indicator, expandable tray with the three-row tree, "Explore the program" button, whole-card click, and the closed-program variant behind a divider.
4. **Projects view**: search, three dropdowns (type, status, theme), live result line, removable filter chips, Cards/List toggle, the card and list layouts, "Show more", and the empty state.
5. **Communities view**: community cards with the community mark, programming groups, the Diabetes Center variant, and the ripple animation.
6. **Contact card** at the end of the page.
7. **Detail routes** `/portfolio/programs/:id` and `/portfolio/projects/:id` with the motif banner, main sections, related list and side column (including the OCR team with photos on program pages).

## How to build it

- Use this codebase's existing components, tokens and conventions wherever they match. Reuse the real header and footer.
- Move the content in `design_handoff_ocr_portfolio/data/*.json` into the app's content layer as typed data (`Program`, `Project`, `CoProject`, `Community`). Components must render from data; adding a project must not require touching a component.
- Put every derived value (scale indicator, tray rows, sort order, kind line, status dot, motif choice) in small pure functions with unit tests, following DATA_MODEL.md.
- Build a single `Motif` component that takes a record name, theme and mode (`static`, `animated`, `background`) and renders from `data/motifs.json` with the classes and keyframes in `data/motif-animations.css`.
- Keep view, filter and layout state in the URL so links are shareable and the back button works.
- Replace the prototype's flex-basis switch (`calc((760px - 100%) * 999)`) with container queries or the project's breakpoints.
- Match the prototype at 390px, 768px, 1024px and 1280px wide.

## Rules that must hold

- No dollar amounts and no patient-level data anywhere, including in data files shipped to the browser. Custom Discovery shows aggregate counts only.
- OCR support status (`status`) and study status (`enrollment`) stay separate and separately labelled.
- Do not invent content. If a field is missing, omit that row or element.
- A project is one record, shown once in the directory even if it has two category tags, and linked (not duplicated) from its program.
- Keyboard access for every control, visible focus (`2px solid #d64938`, offset 3px), 44px minimum targets, and no information conveyed by color or hover alone.
- With `prefers-reduced-motion: reduce`, stop all animation and the pointer-follow effect.
- Preserve the parent-child structure on mobile; do not flatten program trays into plain cards.

## Leave as marked

The README lists "Open items for the OCR team". Do not resolve these yourself. Implement the prototype's current behavior and leave a `TODO(OCR):` comment at each one. In particular, "Book a 30-min consult" keeps the `mailto:` link until a scheduling URL is supplied.

## Definition of done

- `/portfolio` and both detail routes render from data and match the prototype at the four widths above.
- All filters, the layout toggle, expand/collapse, card navigation and the tab switcher work with mouse and keyboard.
- Unit tests cover the derived-value functions; the project's lint, type-check and build pass.
- `/projects` redirects to `/portfolio`.
- A short note lists anything that differs from the prototype and why.

Work in small commits, one section at a time, in the order listed under "What to build". Ask me before changing anything outside the Portfolio page other than the navigation label and the redirect.
