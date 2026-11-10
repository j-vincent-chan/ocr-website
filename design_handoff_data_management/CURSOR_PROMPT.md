# Cursor prompt: rebuild the Data Management page

Paste everything below the line into Cursor, with this folder (`design_handoff_data_management/`) placed at the root of the `ocr-website` repo.

---

Rebuild the Data Management service page at `/services/data-management` to match the design in `design_handoff_data_management/`.

**BUILD_DIRECTION: A**  (change to `B` to build the other layout; build only one)

## Read first, in this order

1. `design_handoff_data_management/README.md` — the full spec: sections, layout, states, tokens, open questions.
2. `design_handoff_data_management/content.ts` — all page copy and data, typed. Move it to `src/data/data-management.ts`.
3. `design_handoff_data_management/Data Management.dc.html` — the working prototype. Every measurement is an inline style in this file; treat it as the source of truth for spacing, type, and color. It is a design reference, not code to ship. Open it in a browser with `?dir=A` or `?dir=B`.
4. In the repo: `src/routes/services.research-operations.tsx`, `src/components/research-operations/*`, `src/components/research-development/{lib.ts,primitives.tsx}`, `src/data/research-operations.ts`, `src/styles.css`. The Data Management page is a sibling of Research Operations and must be built the same way.

## What to build

- Replace the body of `src/routes/services.data-management.tsx`. Keep the route path. Use `<SiteShell navTone="dark">` for direction A (light nav for B). Update the `head()` meta from `content.ts`.
- Create `src/components/data-management/` with one file per section, mirroring `src/components/research-operations/`: `hero.tsx`, `need-picker.tsx`, `capabilities.tsx`, `how-we-work.tsx`, `where-we-work.tsx`, `approach.tsx`, `team.tsx`, `get-started.tsx`, plus the illustration for the chosen direction (`record-ledger.tsx` for A; `data-field.tsx` and `visit-timeline.tsx` for B).
- Delete the old page's `Hero`, `LifecycleRing`, `FAIR`, `Architecture`, and `Policy` components and the three hero stat tiles (62 / 100% / FAIR). The new page shows no metrics.

## Rules

- Reuse, do not re-create: `SiteShell`, `Eyebrow`, `SectionHeader`, `FactRow`, `Dot`, `ReviewFlag`, `TeamAvatars`, `Arrow`, `tint`, `TRANSITION`, `ON_DARK_LABEL`, the offset portrait component, and the booking card from Research Operations `get-started.tsx`. Where one is hard-wired to teal or to Research Operations data, add a prop (accent color, avatar list) instead of copying it.
- Use Tailwind classes and the CSS variables in `src/styles.css`. Do not copy the prototype's inline styles or its `oklch()` literals where a token with the same value exists. Add new tokens only for values the README lists as new.
- Copy is final where the README marks it verbatim. Do not rewrite, shorten, or add copy. Do not add metrics, project names, testimonials, tool or vendor names, or staff credentials.
- Review flags: render the yellow pills through `ReviewFlag`, controlled by one `SHOW_REVIEW_FLAGS` constant in `src/data/data-management.ts`. Leave it `true`; the content owner turns it off after sign-off.
- Accessibility: the need picker is a `radiogroup` with roving `tabIndex` and arrow/Home/End keys, exactly as in `research-operations/need-picker.tsx`. Accordions use `aria-expanded`. Illustrations are `role="img"` with the labels given in the README. Honor `prefers-reduced-motion` (see README, Motion).
- Responsive: match the prototype at 390, 768, 1024, and 1280px wide. Desktop nav and the capability track appear at `lg` (1024px) and up.
- No new dependencies.

## Done when

- `/services/data-management` matches the prototype for the chosen direction at 390px and 1280px.
- All six picker prompts swap the Start-here card correctly, including the sixth ("I need a data manager for my study"), which lights all four track stops.
- `npm run lint` and `npm run build` pass.
- Nothing from the "Open questions" list in the README has been silently resolved; each is still flagged on the page.

When finished, list any place you deviated from the prototype and why.
