# Open items

The prototype renders each opportunity's review notes in a dashed amber box on the detail hero ("Review notes · not for publication"), controlled by a `showNotes` prop. Port that as `SHOW_REVIEW_NOTES = import.meta.env.DEV` so the notes never ship. Resolve the ⚑ items with the owner before launch.

## Review notes, per opportunity (from the prototype, verbatim)
### Biospecimen Pipeline Support
- ⚑ Eligibility widened from ImmunoX members to the whole UCSF research community; the 2026 RFA still says ImmunoX. Update the RFA and form to match.
- ⚑ The February 27, 2026 deadline has passed. Confirm the next cycle date or replace with "Next cycle opens …".

### AI Tools Open Call
- ⚑ New award: all content drafted by Claude. Confirm the name, review cadence (quarterly), and scope boundaries.
- ⚑ No intake form exists yet; Apply goes to ocr@ucsf.edu. Swap in a Tally form when ready.
- ⚑ Confirm the contact person for the AI Tools team.

### Research Plan Review
- ⚑ New opportunity: all content drafted by Claude. Confirm the early-career definition, three-week turnaround, 45-minute debrief, and whether paid reviews are offered on recharge.
- ⚑ Confirm how the year is counted (calendar or fiscal) and that it is first come, first served.

### Parnassus Community Fund
- ⚑ The Cohort 2 due date is blank in the guidelines. Add it before launch.
- ⚑ Templates link to the uploaded files; host them on the site or Box.
- ⚑ The FAQ says existing programs need two or more sponsoring institutes, while the guidelines require three Parnassus Institutes overall. Confirm both rules.
- ⚑ Confirm whether the Community Fund belongs on the OCR Funding page or is linked out to a Parnassus Institutes page.
- ⚑ No Parnassus Institutes website URL yet; the partner link on the Funding hub is hidden until one is supplied.

### Hellman Clinical-Translational Award
- ⚑ The May 8, 2026 deadline has passed. Confirm the next cycle.
- ⚑ Guidelines and form link to the uploaded .docx files. Host them on the site or Box before launch.
- ⚑ CoLab directors differ between the 2022 call (Flow: Claudia Bispo; Imaging: Kyle Marchuk) and the 2026 guidelines (Vinh Nguyen; Torsten Wittmann). Confirm current directors.

### Data Library Analysis Support
- ⚑ The link supplied (tally.so/forms/wA2qYW) opens the form editor. This page uses the public link tally.so/r/wA2qYW.
- ⚑ The RFA does not state a dollar amount. Confirm whether to publish a range.
- ⚑ Confirm Compass's current release status.

### Sabbatical Assistance Grant
- ⚑ The RFA is dated 2023 (grant period July 2023 to July 2024). Confirm current cycle dates and terms.
- ⚑ The forms link points to the uploaded .docx. Host a current version before launch.

## Copy
- Biospecimen Pipeline Support: the detail lead still reads "An OCR clinical research coordinator joins your team for a year…". The award is up to 25% effort, and the hub already says "Part of a coordinator's time". Consider "joins your team part-time for a year" or similar; the owner has not approved wording yet.
- The hub eyebrow "Opportunities" sits above the H2 "Opportunities from OCR and our partners." Owner is aware of the repetition; leave as is unless they ask.

## Documents to host
The prototype links to files under `uploads/` (copied into this folder). Host them on Box or in `public/funding/` and update `applyHref` / `links` in `src/data/funding.ts`:
- `uploads/2026_HellmanFamilyDevelopment_Guidelines.docx`
- `uploads/2026_HellmanFamilyDevelopment_ApplicationForm.docx`
- `uploads/ImmunoXSabbatical_RFA2023_revised_vjc.docx`
- `uploads/community-fund/budget-template.xlsx`
- `uploads/community-fund/timeline-template.docx`

Reference only (source material, not linked from the page): `uploads/community-fund/guidelines.docx`, `faq.docx`, `examples.pdf`. The Community Fund "Past examples" link goes to Box.

External forms already live: Tally `w4oa05` (biospecimen), Tally `wA2qYW` (data library; use the public `/r/` link, not `/forms/`), Airtable (community fund).

## Structural
- Routes: build `/funding` and `/funding/$slug` as real routes. The prototype switches views by hash (`#funding`, `#biospecimen`, …) only because it is a single file.
- Replace the `<CTA id="funding">` at the bottom of `src/routes/projects.tsx` with the band in CONTENT.md, or redirect `/projects#funding` to `/funding`. Update every `hash="funding"` link: `chrome.tsx` (header nav and footer), `components/research-operations/record-section.tsx` (→ `/funding`), and the biospecimen link in `data/research-operations.ts` (→ `/funding/biospecimen`).
- Header: the nav is hidden under `lg` and the site has no mobile menu. The Funding & Support dropdown inherits that gap; not in scope here.
- Sprites: the Sabbatical Assistance Grant uses an "orbit" motif that does not exist in `project-motifs.tsx`. Add it (geometry in README.md § Sprites) or fall back to `polesquare`.
- Growth: new opportunities add a row to their sponsor's index column and ledger group; a new sponsor adds a column and a partner group. Nothing on the page states a count, on purpose.
