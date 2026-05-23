import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Breadcrumb, CTA } from "@/components/site/chrome";
import {
  ServicePageHero,
  ServiceOverview,
  ServiceCapabilities,
  ServiceWhoFor,
  ServiceHowWeSupport,
  ServiceOutcomes,
  ServiceRelated,
  ServiceMotif,
  SERVICE_META,
} from "@/components/site/service-page";

export const Route = createFileRoute("/services/data-management")({
  head: () => ({
    meta: [
      { title: "Data management & sharing — UCSF OCR" },
      {
        name: "description",
        content:
          "REDCap and custom databases, metadata standards, FAIR-by-default architecture, and NIH-compliant Data Management & Sharing plans for UCSF research programs.",
      },
      { property: "og:title", content: "Data management & sharing — UCSF OCR" },
      {
        property: "og:description",
        content:
          "Make your data findable, accessible, interoperable, and reusable — from day one.",
      },
    ],
  }),
  component: DMSPage,
});

const META = SERVICE_META["data-management"];
const A = META.accent;

function DMSPage() {
  return (
    <SiteShell>
      <Breadcrumb trail={[{ label: "Services" }, { label: META.fullName }]} />

      <ServicePageHero
        meta={META}
        positioning="Structured by design"
        title={
          <>
            Data that holds up,{" "}
            <em className="not-italic" style={{ color: A }}>
              from day one.
            </em>
          </>
        }
        description="Databases, metadata standards, and NIH-compliant Data Management & Sharing plans — built with your team from study design, not retrofit at the end."
        primaryCta={{ label: "Draft my DMS plan", href: "mailto:data@ocr.ucsf.edu" }}
        secondaryCta={{ label: "See capabilities", href: "#capabilities" }}
        motif={<ServiceMotif variant="lattice" accent={A} />}
      />

      <ServiceOverview
        accent={A}
        headline={
          <>
            We design the data layer alongside the science — so FAIR isn't a
            retrofit, and the DMS plan isn't written 48 hours before submission.
          </>
        }
        body={
          <>
            <p>
              Since NIH's 2023 Data Management & Sharing policy, every proposal
              needs a plan that holds up under review and under the realities of
              the study. We write yours alongside the Aims — and we build the
              architecture to deliver on it.
            </p>
            <p className="mt-4">
              Our defaults are open formats, controlled vocabularies, and
              trusted repositories. Our deliverables are databases, dictionaries,
              and pipelines your team can actually use.
            </p>
          </>
        }
        stats={[
          { value: "62", label: "DMS plans authored" },
          { value: "100%", label: "NIH 2023 compliant" },
          { value: "FAIR", label: "By default" },
          { value: "30+", label: "Active databases" },
        ]}
      />

      <div id="capabilities" />
      <ServiceCapabilities
        accent={A}
        title={
          <>
            Capabilities across<br />the data lifecycle.
          </>
        }
        lede="Tool-agnostic and pragmatic — we design for what your collaborators, IRB, and repositories actually require."
        items={[
          {
            title: "DMS plan authoring",
            tag: "Flagship",
            desc: "Two-page NIH-compliant plans that cover data types, standards, repositories, access, and oversight — written with the Aims, not after.",
            bullets: ["NIH 2023 compliant", "Repository-matched", "Budgeted realistically"],
          },
          {
            title: "REDCap & custom databases",
            desc: "Production REDCap projects, custom SQL databases, and form libraries with validation, branching, and audit logging.",
            bullets: ["REDCap project build", "Custom forms", "Audit & versioning"],
          },
          {
            title: "Metadata & standards",
            desc: "Data dictionaries, common data elements, ontologies, and controlled vocabularies that make data interoperable across collaborators.",
            bullets: ["Data dictionaries", "Common data elements", "Ontology mapping"],
          },
          {
            title: "Storage architecture",
            desc: "Wynton HPC, AWS/Azure, encrypted SQL, and Box-for-UCSF — matched to data sensitivity, volume, and downstream analysis needs.",
            bullets: ["Wynton HPC", "Cloud (AWS/Azure)", "Encrypted SQL"],
          },
          {
            title: "Repository & sharing",
            desc: "Deposits to dbGaP, AnVIL, Zenodo, Dryad, and discipline-specific repositories — with the metadata, licensing, and access controls required.",
            bullets: ["dbGaP / AnVIL", "Zenodo / Dryad", "Access tier design"],
          },
          {
            title: "QC pipelines",
            desc: "Reproducible quality control with logged provenance — so a curated dataset can be regenerated and audited months or years later.",
            bullets: ["Versioned pipelines", "Provenance logs", "Reproducible builds"],
          },
        ]}
      />

      <ServiceWhoFor
        accent={A}
        audiences={[
          {
            who: "PIs preparing an NIH submission",
            fit: "Anyone who needs a DMS plan that survives review and matches a realistic budget.",
          },
          {
            who: "Multi-investigator consortia",
            fit: "Programs that need a shared data dictionary, common identifiers, and interoperable formats across labs.",
          },
          {
            who: "Clinical research teams",
            fit: "Studies running on REDCap or OnCore that need rigorous build, monitoring, and integration with downstream analytics.",
          },
          {
            who: "Translational programs",
            fit: "Multi-omics, biospecimen, and imaging-heavy programs that need a curated, FAIR-by-default data layer.",
          },
        ]}
        note="Tool-agnostic by design — we'll meet your collaborators, IRB, and repositories where they are."
      />

      <ServiceHowWeSupport
        accent={A}
        title={
          <>
            FAIR, across the<br />data lifecycle.
          </>
        }
        lede="A five-stage build that runs in parallel with study startup — capture is designed to make curate, share, and reuse easy by the time you need them."
        steps={[
          {
            title: "Plan",
            desc: "Data types, volumes, sensitivity, and downstream uses — translated into a DMS plan and a budget that holds up under review.",
            artifacts: ["DMS plan", "Budget", "Repository selection"],
          },
          {
            title: "Capture",
            desc: "REDCap or custom forms with validation, branching, and audit logging — built to study design, not retrofitted to it.",
            artifacts: ["REDCap project", "Form library", "Validation rules"],
          },
          {
            title: "Curate",
            desc: "Data dictionaries, common data elements, controlled vocabularies, and QC pipelines that make the dataset interoperable.",
            artifacts: ["Data dictionary", "QC pipeline", "Provenance log"],
          },
          {
            title: "Share",
            desc: "Deposits to dbGaP, AnVIL, Zenodo, Dryad, and discipline-specific repositories — with required metadata and access controls.",
            artifacts: ["Repository deposit", "Access controls", "Persistent IDs"],
          },
          {
            title: "Reuse",
            desc: "Long-term metadata availability, documented licensing, and reproducible pipelines so the dataset has a second and third life.",
            artifacts: ["Licensing", "Reproducibility doc", "Citation guidance"],
          },
        ]}
      />

      <ServiceOutcomes
        accent={A}
        items={[
          {
            kicker: "Outcome · DMS",
            headline: "Reviewer-praised data plan.",
            detail:
              "An R01 received reviewer commentary specifically calling out the rigor of the Data Management & Sharing plan and budget alignment.",
          },
          {
            kicker: "Use case · Consortium",
            headline: "One dictionary across 14 labs.",
            detail:
              "A multi-PI program standardized on a shared data dictionary and common identifiers, eliminating two months of harmonization downstream.",
          },
          {
            kicker: "Use case · Sharing",
            headline: "dbGaP-ready at the end of year one.",
            detail:
              "A translational study deposited curated, controlled-access data to dbGaP at the end of the first year — not at grant close.",
          },
        ]}
        quote={{
          text: "Loop OCR in at Specific Aims, not the week of submission. The DMS plan, the budget, and the architecture all end up tighter.",
          attribution: "UCSF program officer liaison",
        }}
      />

      <ServiceRelated
        currentId="data-management"
        accent={A}
        note="The DMS plan often arrives via a Research Development engagement; the database itself usually lives next to a Project Management build."
      />

      <CTA
        eyebrow="Plan early"
        title={
          <>
            Data plan due
            <br />
            <span className="text-white/70">with the grant?</span>
          </>
        }
        subtitle="Loop us in at Specific Aims — we'll write a DMS plan that aligns with your study, repositories, and budget."
        email="data@ocr.ucsf.edu"
        primaryLabel="Draft my DMS plan →"
      />
    </SiteShell>
  );
}
