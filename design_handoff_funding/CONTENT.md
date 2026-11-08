# Content: Funding & Support

All copy is final and verbatim. Long-form copy for the seven opportunities (hero, what you receive, spotlight, eligibility, steps, what to prepare, review, commitments, FAQ) is in `funding.data.ts`, ready to drop in as `src/data/funding.ts`. This file holds everything outside that array.

## Meta
- Hub title: `Funding & Support — UCSF OCR`
- Hub description: the hero paragraph below
- Detail title: `{short} — Funding & Support — UCSF OCR`; description: `{oneLiner}`

## Header
- Nav label: Funding & Support (replaces "Funding")
- Menu, first item: All funding & support →
- Menu group labels: From OCR · Partner · Parnassus Institutes · Partner · Bakar ImmunoX Initiative
- Menu pills: Restricted (only when restricted; title attribute = restrictedTo) and the deadline tag

## Hub hero
- Eyebrow: Funding & Support
- H1: Funding and support that comes with a team behind it.
- Paragraph: OCR and its partners invest in initiatives that create impact and amplify benefits across the broader research community: new biospecimen streams, protected time in shared labs, fresh analyses of existing data, exchange with other institutions, and programs that connect communities across Parnassus. Most bring people as well as dollars.
- Index column labels: Office of Collaborative Research · Parnassus Institutes · Bakar ImmunoX Initiative
- Index row tag = the opportunity's `tag`

## Opportunities section
- Eyebrow: Opportunities
- H2: Opportunities from OCR and our partners.
- Lede: Some are our own; others come from partners whose programs we help run. Each has its own page with eligibility, what to prepare, and how proposals are reviewed.
- Group heading "From OCR": Funded and run by the Office of Collaborative Research.
- Group heading "From our partners": Offered by our partners. OCR helps applicants prepare and supports recipients.
- Partner headers (`PARTNERS` in the data file):
  - Parnassus Institutes (tile "PI"): Research institutes based on the Parnassus campus. OCR hosts the community manager. No link yet.
  - Bakar ImmunoX Initiative (tile "IX"): UCSF's immunology initiative. OCR manages its CoProjects and helps run its awards. Link: immunox.ucsf.edu ↗ → https://immunox.ucsf.edu/
- Row fact labels: {kind label} · For · Deadline
- Kind labels (`KIND_LABEL`): Funding · Staff time · Expert review
- Access pills: Open to all · Restricted
- Row buttons: Learn more → · {applyLabel}

## Opportunity summary (display order)
| id | Title | Sponsor label | Status pill | Access pill | Tag | Kind label | You get (figure) | For (who) | Deadline |
|---|---|---|---|---|---|---|---|---|---|
| `biospecimen` | Biospecimen Pipeline Support | Office of Collaborative Research | Annual cycle | Open to all | Feb 27, 2026 | Staff time | Part of a coordinator's time for a year | Anyone in the UCSF research community | February 27, 2026 |
| `ai-tools` | AI Tools Open Call | Office of Collaborative Research | Rolling submissions | Open to all | Rolling | Staff time | We build your tool | Anyone in the UCSF research community | Rolling |
| `plan-review` | Research Plan Review | Office of Collaborative Research | One per year | Restricted · Early-career, non-partner | 1 per year | Expert review | One free review a year | Early-career investigators not in a partner program | Rolling, until the year's review is claimed |
| `community-fund` | Parnassus Community Fund | Parnassus Institutes | Cohort 2 | Restricted · Parnassus-based | Cohort 2 | Funding | Up to $5,000 | Faculty, staff, and trainees at Parnassus | To be announced |
| `clinical-translational` | Hellman Clinical-Translational Award | Hellman Family Foundation · Bakar ImmunoX | Annual cycle | Open to all | May 8, 2026 | Funding | Up to $100,000 | MDs and MD/PhDs not yet independent | May 8, 2026, 6:00 PM PT |
| `data-library` | Data Library Analysis Support | Bakar ImmunoX · Data Science CoLab | Rolling submissions | Restricted · ImmunoX members | Rolling | Staff time | CoLab data scientists | ImmunoX members | Rolling |
| `sabbatical` | Sabbatical Assistance Grant | Bakar ImmunoX | Rolling review | Restricted · ImmunoX members | Rolling | Funding | Up to $25,000 | ImmunoX faculty with 3+ years of membership | Rolling |

## Apply actions and document links
- **Biospecimen Pipeline Support**: "Apply online" → `https://tally.so/r/w4oa05`
- **AI Tools Open Call**: "Propose a tool" → `mailto:ocr@ucsf.edu?subject=AI%20Tools%20for%20Research%20proposal`; links: OCR Research Resources & AI Tools → `https://ocr.ucsf.edu/services/ai-tools`
- **Research Plan Review**: "Request a review" → `mailto:ocr@ucsf.edu?subject=Research%20Plan%20Review%20request`; links: Research Development services → `https://ocr.ucsf.edu/services/research-development`
- **Parnassus Community Fund**: "Apply online" → `https://airtable.com/app3jKnrn9KmQKSwn/pagscAuPEpdGsSbvc/form`; links: Budget template → `uploads/community-fund/budget-template.xlsx`, Timeline template → `uploads/community-fund/timeline-template.docx`, Past examples → `https://ucsf.box.com/s/6305toba7z95xoalnomm3meh80mu2db9`
- **Hellman Clinical-Translational Award**: "Email your application" → `mailto:vincent.chan@ucsf.edu?subject=Hellman%20Family%20Clinical-Translational%20Research%20Development%20Award%20application`; links: Guidelines (.docx) → `uploads/2026_HellmanFamilyDevelopment_Guidelines.docx`, Application form (.docx) → `uploads/2026_HellmanFamilyDevelopment_ApplicationForm.docx`
- **Data Library Analysis Support**: "Apply online" → `https://tally.so/r/wA2qYW`; links: Progress dashboard → `https://immunox.notion.site/Data-Library-Development-Initiative-9afcc2485b4e48d5be99d637526d4b63`, UCSF Data Library → `https://datalibrary.ucsf.edu/`
- **Sabbatical Assistance Grant**: "Email your application" → `mailto:ImmunoX@ucsf.edu?subject=ImmunoX%20Sabbatical%20Assistance%20Grant%20application`; links: RFA and forms (.docx) → `uploads/ImmunoXSabbatical_RFA2023_revised_vjc.docx`

## Detail page fixed strings
- Breadcrumb: Funding & Support / {short}
- Hero line under the lead: Formally: {official}
- Owner chip, OCR: pill "OCR" + "Funded and run by the Office of Collaborative Research."
- Owner chip, partner: pill "Partner" + "Offered by {partnerName}. OCR helps applicants prepare and supports recipients."
- Hero pills: {status}; Restricted · {restrictedTo}
- Card: At a glance (rows from `facts`), {applyLabel} →, then `links`
- Dev-only box: Review notes · not for publication (rows from `notes`)
- What you receive → {providesTitle}, numbered 01, 02, …
- Spotlight: {spot.eyebrow} / {spot.title} / {spot.intro}
- Eligibility → Who should apply
- {priorityEyebrow} → {priorityTitle}
- How to apply → From first conversation to launch. Steps labelled Step 01, Step 02, …
- What to prepare → {prepareIntro}, numbered list
- Review → How proposals are judged → {reviewBy}, numbered criteria
- If selected → What we ask of recipients → These opportunities build shared resources, so they come with a few commitments.
- Questions → Common questions
- Other opportunities; cards show {tag}, {short}, {oneLiner}, Learn more →

## CTA band (hub and detail)
- Eyebrow: Before you apply
- H2: Talk through your idea with us.
- Body: We can tell you which opportunity fits, who to bring on as mentors or sponsors, and what makes a proposal competitive. A short email is enough to start.
- Contact, default: Vincent Chan, PhD · OCR Director and ImmunoX Chief Strategy Officer · vincent.chan@ucsf.edu · initials VC
- Contact, Parnassus Community Fund: Jo Williams · Parnassus Community Manager · jo.williams@ucsf.edu · initials JW
- Button: Ask which opportunity fits (hub) · Ask about this opportunity (detail)
- Mail subject: Question about OCR funding (hub) · Question about the {short} (detail)
- Microcopy: {contactEmail} · or ocr@ucsf.edu

## Footer
- OCR column: Funding → Funding & Support, linking to /funding. Services column is already sentence case; leave it.

## Programs & Projects page (replaces the `#funding` CTA)
Suggested, not yet approved by the owner: eyebrow "Funding & Support", title "Looking for funding or support?", body "Opportunities from OCR, the Bakar ImmunoX Initiative, and the Parnassus Institutes.", button "See all opportunities →" → /funding.
