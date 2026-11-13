# Data model: OCR Portfolio

The page is built from three record types kept in separate collections. Services, relationships, status and scale are separate attributes, so adding a project is a data change and never a layout change.

Current contents: 5 programs, 34 projects (20 biospecimen, 14 clinical), 34 ImmunoX co·projects titles (11 active, 23 completed), 4 communities.

## Program (`portfolio.json` → `programs[]`)

| Field | Type | Notes |
|---|---|---|
| `id` | string | URL slug. Stable; projects reference it in `parent`. |
| `name` | string | Full name, e.g. "Clinical Research Program in Bronchiectasis & NTM". Used for search, aria labels and motif lookup. |
| `title` | string | Display title, e.g. "Bronchiectasis & NTM". |
| `subtitle` | string | Display subtitle, e.g. "Clinical Research Program". |
| `short` | string? | Acronym shown after the title ("INTEGRATE", "ILD"). |
| `fullTitle` | string? | Official title. |
| `type` | `"program"` | |
| `programType` | string | "Clinical research unit", "Research program", "Expanded access program". |
| `status` | `"Active" \| "Pending" \| "Closed"` | Status of OCR's support. |
| `start`, `end` | string (year) | `end` only when closed. |
| `theme` | string | One of the eight themes; sets the accent color. |
| `areas` | string[] | Disease areas. |
| `lead` | string | Comma-separated names; may carry a role in parentheses, which is shown on detail pages only. |
| `dept`, `division`, `partnerDepts` | string? | |
| `funding` | string | Source only. Never an amount. |
| `services` | string[] | "OCR provides" chips. Current values: Program management, Project management, Clinical coordination, Data management. |
| `card` | string | Short description for the card. |
| `full` | string? | Long description for the detail page. |
| `sites`, `partners` | string[]? | |
| `url` | string? | External link. |
| `ocrTeam` | string[] | Keys into `staff`. |
| `scale` | `{ value, unit, note }`? | Explicit scale indicator. If absent it is derived (below). |
| `patients` | `{ total, years: [year, n][], types: [label, n][] }`? | Aggregate only. Custom Discovery. |

The order of `programs[]` is the display order (closed programs are moved to the end at render time).

## Project (`projects[]`)

Shared fields: `id`, `name`, `short?`, `fullTitle?`, `status`, `start`, `end?`, `theme`, `areas`, `lead`, `dept?`, `division?`, `origin?` (study origin), `funding?`, `fundingUrl?`, `services`, `card`, `full?`, `sites?`, `partners?`, `url?`.

| Field | Type | Notes |
|---|---|---|
| `type` | `"bio" \| "clin"` | Biospecimen collection, or clinical study/trial. Describes the focus of OCR's support, not a regulatory class. |
| `parent` | string? | Program `id`. Absent means no verified relationship; do not label such projects "Independent". |
| `open` | boolean? | Open to collaborators / sample requests. |
| `inDL` | boolean? | Data is in the UCSF Data Library. |

Biospecimen only: `model` (Biobank, Consortium, …), `specimens[]`, `assays[]`, `population`.

Clinical only: `studyType`, `phase`, `intervention`, `nct` (ClinicalTrials.gov ID), `enrollment` (scientific study status, e.g. Recruiting), `eligibility`, `target` (target enrollment).

## ImmunoX co·projects (`coprojects`)

`{ active: Item[], completed: Item[] }` where `Item = { title, theme, kind, rec?, featured? }`.

- `kind` is "Pilot" or "Full study".
- `rec`, when present, is the `id` of a full project record; the row then links to that project. Items without `rec` are titles only and have no page.
- `featured` items come first in the program card's tray.

## Community (`communities.json`)

| Field | Type | Notes |
|---|---|---|
| `name`, `since`, `href` | string | |
| `serves` | string? | Who the community serves. |
| `contributes` | string | What OCR provides. |
| `model` | string? | Engagement model, shown as a pill. |
| `groups` | `[area, items[]][]`? | Selected programming, grouped by area. |
| `scopes` | `{ name, line, detail }[]`? | Multiple enrichment programs within one center (Diabetes Center: DRC, NORC). |

An enrichment "program" belongs here. The word alone does not make it a research program.

## Lookups

- `degrees`: `{ "Full Name": "MD, PhD" }`. Appended to investigator names wherever they are shown.
- `staff`: `{ "Name, Degree": "Job title" }`, from the OCR People page.
- `staffPhotos`: `{ "Name, Degree": "people/file.jpg" }`.

## Derived values

**Scale indicator on a program card**

1. If the program has `scale`, use it.
2. ImmunoX co·projects: total = active + completed titles; note "N active · N completed".
3. Otherwise count child projects (`parent === program.id`). If the children mix types: "N projects" with a note "N clinical studies · N biospecimen collections". If all clinical: "N clinical studies". The note otherwise breaks the count down by status ("N active · N in startup · N closed").
4. No children and no `scale`: show nothing.

**Tray rows on a program card**: children sorted Active, Pending, Closed; first three shown; "+N more" if there are more.

**Project sort**: `start` descending, then Pending, Active, Closed, then name.

**Kind line on a project card**: biospecimen → "Biospecimen collection · {model}"; clinical → "Clinical trial" for interventional trials, else "Clinical study", followed by phase and study type.

**Status dot**: Active = solid, Pending = ring, Closed = grey `#b9b6ae`.

**Motif**: `motifs.json → records[record.name]`, else hash of the name into the list of kinds: `h = (h * 31 + charCode) >>> 0` over the name, then `kinds[h % kinds.length]`. Color comes from the record's theme.

**Theme → accent**: Autoimmunity coral, Cancer teal, Infectious disease magenta, Allergy lime, Lung disease violet, Pediatrics gold, Surgery & devices blue, Multi-disease slate.

## Content rules

These came from the OCR team and apply to any future content.

1. **No dollar amounts** anywhere: no award sizes, OCR amounts, direct costs or donations.
2. **No patient-level data.** Custom Discovery shows aggregate counts by cancer type and year only. Cancer types with a single patient are grouped. No study IDs, donation details, referral status or notes.
3. **No internal notes** from the source spreadsheet.
4. **OCR status is not study status.** `status` describes OCR's support; `enrollment` describes the study. Keep both, label both, never merge them.
5. **Be exact about OCR's role.** Supporting operations does not mean owning the science; delivering enrichment programming does not mean administering an institute.
6. **Do not combine** programs, projects and communities into a single portfolio total.
7. **Do not invent** trials, personnel, outcomes, metrics or partner responsibilities. If a field is empty, omit that row.
8. **A project appears once.** A project shown inside a program and in the directory is the same record.
9. **"Biobank" is not the category name.** The category is "Biospecimen collection"; keep "Biobank" only where it is part of a project's own name or collection model.

## Source

The data was assembled from the OCR team's "Programs and Projects" spreadsheet, the ImmunoX co·projects master table, the Custom Discovery patient dashboard (aggregated), and the OCR website. Several edits were made during design and exist only in `data/portfolio.json` (see "Open items" in the README). Treat `data/portfolio.json` as the current source of truth.
