# Cursor prompt — rebuild `/services/ai-tools`

Paste everything below the line into Cursor (Composer / Agent mode) with the `ocr-website` repo open and this `design_handoff_ai_tools/` folder dropped into the repo root (or anywhere Cursor can read it).

---

Rebuild the **Research Resources & AI Tools** service page (`src/routes/services.ai-tools.tsx`) from the design handoff in `design_handoff_ai_tools/`.

**Read first, in this order**
1. `design_handoff_ai_tools/README.md` — the spec: sections, measurements, copy, interactions, tokens, open items.
2. `design_handoff_ai_tools/ai-tools.ts` — the page's content as a ready-to-drop data module (same conventions as `src/data/research-operations.ts`). Move it to `src/data/ai-tools.ts`.
3. `design_handoff_ai_tools/prototype/ai-tools-v2.dc.html` — the HTML prototype. It is a **design reference**, not code to copy. Open it in a browser to see the real behavior (scroll the cards into view to play the vignettes; click a card for the drawer). Styles are inline; use them as the source of truth for exact values when the README is ambiguous.
4. The existing patterns you must reuse:
   - `src/components/site/chrome.tsx` — `SiteShell` (pass `navTone="dark"`: the page opens on a dark hero), `Breadcrumb`, `SunburstLogo`, `ServiceTitle`. Keep the adaptive nav; mark every dark section with `data-tone="dark"`.
   - `src/components/site/service-family.tsx` — `ArmEyebrow` (arm `"04"`, accent `var(--gold)`) for the hero eyebrow.
   - `src/components/research-operations/services-section.tsx` — the **detail drawer** (shadcn `Sheet`, `ro-drawer` / `ro-drawer-backdrop` classes, focus returns to the opener). Copy that drawer pattern, don't invent a new one.
   - `src/components/research-operations/primitives.tsx` — `Dot`, `FactRow`, `SectionHeader`; `src/components/research-development/primitives.tsx` — `Eyebrow`, `pillInk`, `pillOutline`, `pillOutlineOnDark`, `pillWhite`, `Arrow`.
   - `src/components/research-development/in-development.tsx` — the blueprint grid (`GRID` + `MASK` constants). Reuse the same grid recipe for the card "maturity" overlay and the Websites band.
   - `src/components/research-development/hero.tsx` — `GradientBlob` for the dark hero and the Get-started band.
   - `src/data/funding.ts` — the `ai-tools` award (`AWARDS.find(a => a.id === "ai-tools")`). The Open Build section reads its `headA`, `headB`, `lead`, `facts`, `applyHref`, `official`, and links to `/funding/ai-tools`. Do not duplicate that copy.
   - `src/styles.css` — all colors below exist as CSS variables / Tailwind utilities (`bg-ink`, `text-amber-text`, `bg-cream`, `text-ondark-muted`, `shadow-lift`, `bg-gradient-sunburst`, `font-display`, `font-mono`). Use them; no new hex values.

**Build**
- Split the page into components under `src/components/ai-tools/`: `hero.tsx` (with the index rows), `applications-section.tsx` (three cards + vignettes + drawer wiring), `vignettes.tsx` (Prospera / Signal / Runway console panels), `atlas-section.tsx`, `open-build-section.tsx`, `websites-section.tsx`, `get-started.tsx`, `app-drawer.tsx`, `app-mark.tsx` (renders `marks/*.svg` as a CSS mask so it can take any color), `primitives.tsx` if needed. Keep the route file a thin composition like `services.research-operations.tsx`.
- Copy `design_handoff_ai_tools/marks/*.svg` to `src/assets/marks/`. They replace the four app logos everywhere on this page.
- Vignettes: implement the staged transitions exactly as specified in README §Interactions (an `active` boolean per card, set by an `IntersectionObserver` at threshold 0.35; replay on `mouseenter`; all delays collapse to 0 when `active` is false so the reset is instant). Respect `prefers-reduced-motion` (render the final state, no transitions).
- Cards are whole-card buttons (`role="button"`, `tabIndex=0`, Enter/Space) that open the drawer; the "Open ‹app› ↗" anchor inside must `stopPropagation`.
- Keep `scroll-mt-24` anchors `#apps`, `#prospera`, `#signal`, `#runway`, `#atlas`, `#open-build`, `#websites`, `#start` (the header's "Get in touch" and the footer link to `#start`).
- Update `head()` meta: title `Research Resources & AI Tools — UCSF OCR`; description `Prospera, Signal, and Runway: applications OCR built for research development strategists, community managers, and investigators, on one verified record of each investigator's work.`
- Remove the old `Products`, `Automations`, and `Principles` sections from the route. Keep `ServiceCrossNav` **out** of this page (the design does not include it); do not add the generic `CTA` — the Get-started band replaces it.
- Mobile: everything wraps (flex-wrap / `grid-cols-[repeat(auto-fit,minmax(min(100%,Xpx),1fr))]`); cards stack text-first (Signal's card uses `flex-wrap-reverse` on desktop because the vignette is on the left — on mobile text must still come first).
- Accessibility: all decorative elements `aria-hidden`; drawer is `role="dialog" aria-modal`, Escape closes, body scroll locks while open, focus goes to the close button on open and back to the trigger on close; pills meet 4.5:1 (use the `*-text` variants for text on light backgrounds).

**Verify** against README §Acceptance checklist, then run `npm run lint` and `npm run build`. Leave `OPEN_ITEMS` from README §Open items as TODO comments in the data file, the way `funding.ts` does with `notes`.
