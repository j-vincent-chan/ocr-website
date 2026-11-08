# Cursor prompt: Funding & Support

Paste everything below the line into Cursor (Agent mode) at the root of `j-vincent-chan/ocr-website`. Keep this folder (`design_handoff_funding/`) in the repo or attach its files to the chat so Cursor can read them.

---

You are adding a new section to this repo (TanStack Start + React + Tailwind, shadcn/ui in `src/components/ui`).

**Goal.** Build a **Funding & Support** hub at `/funding` and one detail page per opportunity at `/funding/$slug`, as specified in `design_handoff_funding/README.md`. It replaces the "Or apply to an open RFA" CTA at `/projects#funding` and the "Funding" nav link. The pages must read as part of this site: same chrome, container, tokens, type, and the project-card motifs as sprites.

**Read first, in this order:**
1. `design_handoff_funding/README.md`: spec, layout, interactions, tokens
2. `design_handoff_funding/CONTENT.md`: hub, chrome, and CTA copy, verbatim
3. `design_handoff_funding/funding.data.ts`: all seven opportunities and both partners as typed data, verbatim. Copy it to `src/data/funding.ts` unchanged apart from hrefs flagged in OPEN_ITEMS.
4. `design_handoff_funding/OPEN_ITEMS.md`: what still needs confirming (keep those flags visible in dev builds)
5. `design_handoff_funding/Funding.dc.html`: the HTML design reference. Open it in a browser (next to `support.js`); `#funding` is the hub, `#biospecimen`, `#ai-tools`, `#plan-review`, `#community-fund`, `#clinical-translational`, `#data-library`, `#sabbatical` are the detail views. **Do not ship this file.** It is a prototype with inline styles and hash routing.
6. Existing code to mirror: `src/components/site/chrome.tsx` (Header, SERVICES menu pattern, Footer, SiteShell), `src/components/site/project-motifs.tsx`, `src/components/research-operations/*` (the closest sibling: section headers, hairline lists, dark CTA card, `.ro-sprite`), `src/routes/services.research-operations.tsx`, `src/routes/projects.tsx` (the CTA to replace), `src/styles.css`.

**How to build it:**
- Routes: `src/routes/funding.tsx` (hub) and `src/routes/funding.$slug.tsx` (detail; 404 for unknown slugs). Components in `src/components/funding/`, one per section; data in `src/data/funding.ts`. Follow the research-operations split between components and data.
- Header: replace the "Funding" link with a "Funding & Support" dropdown built the way the Services menu is (hover and click to open, Esc / outside click / selection to close, `aria-expanded`, `aria-haspopup`). Contents and styles are in README § Shared chrome. Keep the header light on all Funding views: don't put `data-tone="dark"` on the detail hero.
- Footer: "Funding" → "Funding & Support" → `/funding`.
- Replace `<CTA id="funding">` in `src/routes/projects.tsx` with the band in CONTENT.md (or a redirect) and update every `hash="funding"` link in `chrome.tsx`, `components/research-operations/record-section.tsx`, and `data/research-operations.ts` to the new routes.
- Sprites: `<ProjectMotif>` at 56px in a 72px cell, coloured by sponsor accent, with the `.ro-sprite` treatment. Mapping is `MOTIFS` in the data file. Add the `orbit` motif described in README § Sprites (or fall back to `polesquare`). Respect `prefers-reduced-motion` (already handled for `.project-motif *`).
- Tokens: use the existing Tailwind tokens and utilities from `src/styles.css`. README § Design tokens maps every prototype `oklch(...)` to a token; add `--teal-light` and `--lime-text` if missing rather than scattering literals.
- Sponsor colour comes from each record (`color`, `ink`, `tint`). Access pill dots use `ACCESS_DOT`. The CTA contact uses the record's contact fields when present, otherwise `DEFAULT_CONTACT`.
- Review notes: render each record's `notes` in the amber box on the detail hero only when `SHOW_REVIEW_NOTES = import.meta.env.DEV`.
- Accessibility: `<nav aria-label="Opportunities">` for the index, `aria-current="page"` on the breadcrumb, `aria-expanded` on FAQ buttons and the menu trigger, visible focus rings matching the rest of the site, `title` on Restricted pills, `rel="noreferrer"` on external links.
- Responsive: the hub index and ledger facts use auto-fit grids and stack under ~700px; ledger body wraps (text → facts → actions). Detail hero stacks the card under the text under ~900px. Match the breakpoints the research-operations page uses.
- Meta: titles and descriptions per README § Routes and head.

**Deliverables:**
1. `src/routes/funding.tsx`, `src/routes/funding.$slug.tsx`
2. `src/components/funding/*`, `src/data/funding.ts`
3. Header dropdown, footer link, projects-page band, and link updates
4. `orbit` motif in `project-motifs.tsx` (or the documented fallback)
5. A short PR description listing every item from OPEN_ITEMS.md that is still unresolved, including the documents that still need hosting

**Definition of done:** opening the Research Operations page and then `/funding`, they look like the same site. All copy matches CONTENT.md and `funding.data.ts` verbatim. Every opportunity opens from the header menu, the index, the ledger, and "Other opportunities", and the browser back button returns to the hub. Keyboard-only: the menu, FAQ, and all links work. No console errors. `npm run build` and lint pass.

Work in this order: data file → hub hero + index → ledger rows → detail hero + card → detail sections → CTA band → header menu + footer + link updates → projects-page band. After each step, compare against the prototype in the browser before moving on.
