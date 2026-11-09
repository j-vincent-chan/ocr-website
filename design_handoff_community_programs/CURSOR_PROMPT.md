# Cursor prompt — Community & Enrichment Programs service page

Paste everything below the line into Cursor (Agent mode) at the root of `j-vincent-chan/ocr-website`. Keep the `design_handoff_community_programs/` folder in the repo (or open alongside it) so the agent can read the reference files.

---

Rebuild the `/services/community-management` route so it matches the design reference in `design_handoff_community_programs/`. Read `design_handoff_community_programs/README.md` first; it is the spec. The HTML file in `design/` is a prototype for look and behavior, not code to copy.

Constraints:

- Stack is what the repo already uses: TanStack Router file routes, React 19, Tailwind v4 with the tokens in `src/styles.css`. No new dependencies.
- Reuse existing components instead of reinventing them: `SiteShell`, `Breadcrumb`, `CTA` from `src/components/site/chrome.tsx`; `OffsetPortrait` from `src/components/site/offset-portrait.tsx`; `Eyebrow`, `Arrow`, pill recipes from `src/components/research-development/primitives.tsx`; `tint`, `joinList`, `TRANSITION` from `src/components/research-development/lib.ts`; `OPEN_POSITIONS` from `src/components/site/open-positions.ts`. Mirror the structure of the Research Development page (`src/routes/services.research-development.tsx` and `src/components/research-development/*`), because this page is meant to read as its peer.
- Put all copy and data in `src/data/community-management.ts`. The exact content is already written as plain JS constants at the bottom of the reference HTML (`SVC`, `STOPS`, `NEEDS`, `EXAMPLES`, `MONTHS`, `TEAM`, `PARTNERS`). Port them verbatim; do not rewrite copy.
- Build the page from these sections, in order, as components in `src/components/community-management/`: `hero.tsx` (dark hero with need picker, service track, start-here card), `playbook.tsx` (accordion, one open at a time, first open by default), `program-year.tsx` (12-month selector + detail card), `channels.tsx` (four figures with placeholder images), `team-and-partners.tsx` (linked hover/pin highlighting, modeled on `src/components/research-development/team-and-partners.tsx`), `where-this-fits.tsx` (P01 boundary with Research Operations), `ways-to-engage.tsx` (four model cards), then the shared `CTA`. Add a `detail-drawer.tsx` for the "Full capability list" side panel.
- Match the README's measurements, colors, type, and transitions. Where the README gives an oklch value that already exists as a token in `styles.css` (`--ink`, `--cream`, `--rule`, `--ink-muted`, `--ink-muted-2`, `--coral`, `--gold`, `--magenta`, `--teal`, `--violet`, `--lime`, and the `*-text` variants), use the token.
- Accessibility: the need picker is a `radiogroup`; accordion headers are `button[aria-expanded][aria-controls]`; the drawer is `role="dialog" aria-modal` with Escape to close and body scroll locked while open; team rows are buttons with `aria-pressed` for the pin state; the hint line under the team section is `aria-live="polite"`.
- Responsive: the prototype is fluid down to ~360px with no media queries (flex-wrap and auto-fit grids). You may use Tailwind breakpoints, but keep the same reflow: two-column headers stack, the team/partner columns stack under ~1024px, the 12-month strip stays one row.
- Images: copy `design/assets/people/*.jpg` only if the files do not already exist under `src/assets/people/`. Copy `design/assets/mock/*.png` to `src/assets/channels/` and use them as the default images for the four channel figures until real screenshots are supplied.
- Update `src/routes/people.tsx` and the footer/service-family copy only if needed for the names and titles listed in the README (Jonathon Wilson, Xochitl Vargas, open ImmunoX position; all titled "Community manager" on this page).

When finished, run the type check and the dev server, open `/services/community-management`, and compare against `design/Community & Enrichment Programs v2.dc.html` opened in a browser at the same width. List anything you could not match.
