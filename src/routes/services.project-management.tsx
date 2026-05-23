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

export const Route = createFileRoute("/services/project-management")({
  head: () => ({
    meta: [
      { title: "Project management & clinical coordination — UCSF OCR" },
      {
        name: "description",
        content:
          "Operational backbone for complex UCSF research programs — study startup, clinical research coordination, biospecimen pipelines, and multi-site logistics.",
      },
      { property: "og:title", content: "Project management & clinical coordination — UCSF OCR" },
      {
        property: "og:description",
        content: "Run your science with a team that knows how to ship it.",
      },
    ],
  }),
  component: PMPage,
});

const META = SERVICE_META["project-management"];
const A = META.accent;

function PMPage() {
  return (
    <SiteShell>
      <Breadcrumb trail={[{ label: "Services" }, { label: META.fullName }]} />

      <ServicePageHero
        meta={META}
        positioning="Operations for complex programs"
        title={
          <>
            We run your study.{" "}
            <em className="not-italic" style={{ color: A }}>
              You run the science.
            </em>
          </>
        }
        description="From IRB submission to final data lock, OCR runs the operational backbone of complex UCSF research programs — startup, coordination, biospecimens, and multi-site logistics."
        primaryCta={{ label: "Scope a project", href: "mailto:pm@ocr.ucsf.edu" }}
        secondaryCta={{ label: "See capabilities", href: "#capabilities" }}
        motif={<ServiceMotif variant="lanes" accent={A} />}
      />

      <ServiceOverview
        accent={A}
        headline={
          <>
            A cross-trained bench of project managers and clinical research
            coordinators, shared across partner programs.
          </>
        }
        body={
          <>
            <p>
              Most labs hire a coordinator, lose them eighteen months later, and
              start over. OCR runs a shared bench across partner institutes so
              coverage doesn't disappear when one person leaves — and so
              specialized expertise is always within reach.
            </p>
            <p className="mt-4">
              We work pre-award through closeout: protocol drafting, IRB,
              activation, enrollment, monitoring, biospecimens, and data lock.
            </p>
          </>
        }
        stats={[
          { value: "27", label: "Active programs" },
          { value: "11", label: "CRCs on bench" },
          { value: "5", label: "Specialty roles" },
          { value: "ISO-style", label: "SOP library" },
        ]}
      />

      <div id="capabilities" />
      <ServiceCapabilities
        accent={A}
        title={
          <>
            What our team<br />actually does.
          </>
        }
        lede="Drop in pre-award, mid-flight, or at closeout. We scope the engagement to where you are."
        items={[
          {
            title: "Study startup",
            desc: "Protocol drafting, IRB and ancillary committee submission, contracts and MTAs, and site activation playbooks.",
            bullets: ["Protocol & SOPs", "IRB / CHR / COI", "Sponsor MTAs"],
          },
          {
            title: "Clinical research coordination",
            desc: "Consent, screening, enrollment, study visits, AE reporting — cross-trained CRCs who can flex across studies as census changes.",
            bullets: ["Enrollment", "Monitoring", "AE / safety reporting"],
          },
          {
            title: "Biospecimen pipeline",
            desc: "End-to-end chain of custody from collection through assay hand-off, with barcoded tracking and IATA-compliant shipping.",
            bullets: ["Collect → process → bank", "Repository integration", "Manifested shipping"],
          },
          {
            title: "Multi-site coordination",
            desc: "Activation, training, and monitoring across UCSF sites and external collaborators — a single source of truth for the PI.",
            bullets: ["Site activation", "Cross-site SOPs", "Central monitoring"],
          },
          {
            title: "Regulatory & compliance",
            desc: "Submissions, amendments, continuing reviews, and audit-ready files — managed by a dedicated regulatory specialist.",
            bullets: ["IRB amendments", "Annual reviews", "Regulatory archive"],
          },
          {
            title: "Closeout & data lock",
            desc: "Query resolution, final reports, regulatory archive, and a clean hand-off so the science can be written up.",
            bullets: ["Data lock prep", "Final report", "Archive index"],
          },
        ]}
      />

      <ServiceWhoFor
        accent={A}
        audiences={[
          {
            who: "Large-program PIs",
            fit: "P/U/T32 awardees who need a coordinated operational team rather than a string of one-off hires.",
          },
          {
            who: "Investigator-initiated studies",
            fit: "Single-PI clinical or translational studies that need a CRC plus regulatory support without standing up a full lab ops team.",
          },
          {
            who: "Multi-site collaborations",
            fit: "Programs running at Mission Bay, Parnassus, ZSFG, and beyond that need a central operations hub.",
          },
          {
            who: "Biospecimen-heavy studies",
            fit: "Immunology, oncology, and translational programs that depend on clean, traceable sample pipelines.",
          },
        ]}
        note="OCR runs on a shared-bench model — coverage doesn't disappear when one person leaves."
      />

      <ServiceHowWeSupport
        accent={A}
        title={
          <>
            How a study flows<br />through OCR.
          </>
        }
        lede="Every program OCR runs moves through the same four operational lanes — visibility for the PI, accountability for the team, predictable cadence for the sponsor."
        steps={[
          {
            title: "Startup",
            desc: "Protocol, IRB and ancillary committees, contracts, SOP set, and a staffing plan keyed to enrollment forecast.",
            artifacts: ["Protocol", "IRB submission", "SOPs", "Staffing plan"],
          },
          {
            title: "Activation",
            desc: "Site training, REDCap build, eligibility and consent workflows, and a rehearsal of the first study visit before any patient is enrolled.",
            artifacts: ["Site training", "REDCap build", "First visit rehearsal"],
          },
          {
            title: "Operations",
            desc: "Enrollment, monitoring, sample handling, amendments, AE reporting — managed against a cadence agreed with the PI and sponsor.",
            artifacts: ["Enrollment dashboard", "Monitoring visits", "AE log"],
          },
          {
            title: "Closeout",
            desc: "Query resolution, data lock, final report, regulatory archive, and a clean hand-off back to the lab or publishing team.",
            artifacts: ["Data lock", "Final report", "Regulatory archive"],
          },
        ]}
      />

      <ServiceOutcomes
        accent={A}
        items={[
          {
            kicker: "Use case · Multi-site",
            headline: "Five sites activated on schedule.",
            detail:
              "A consortium study activated all five UCSF sites within the planned window, enrolled ahead of plan, and held a single source of truth in the OCR ops board.",
          },
          {
            kicker: "Outcome · Biospecimens",
            headline: "Zero chain-of-custody gaps across 400+ samples.",
            detail:
              "An immunology cohort processed and shipped 412 specimens across two cores with full barcoded traceability and no QC failures.",
          },
          {
            kicker: "Use case · Startup",
            headline: "IRB cleared in one cycle.",
            detail:
              "A new investigator-initiated study reached IRB approval on first submission — protocol, SOPs, and ancillary submissions prepared by OCR pre-award.",
          },
        ]}
        quote={{
          text: "OCR runs the operational backbone so the PI can stay focused on the science. It's the model UCSF should be scaling.",
          attribution: "Partner institute director",
        }}
      />

      <ServiceRelated
        currentId="project-management"
        accent={A}
        note="Most ops engagements pair with a Data Management plan at startup and pull in Research Development for amendments or follow-on funding."
      />

      <CTA
        eyebrow="Run with us"
        title={
          <>
            Have a study that needs
            <br />
            <span className="text-white/70">a steady hand?</span>
          </>
        }
        subtitle="Tell us where you are — pre-award, in startup, or mid-flight — and we'll show you exactly where our team can plug in."
        email="pm@ocr.ucsf.edu"
        primaryLabel="Scope a project →"
      />
    </SiteShell>
  );
}
