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

export const Route = createFileRoute("/services/research-development")({
  head: () => ({
    meta: [
      { title: "Research development & grantwriting — UCSF OCR" },
      {
        name: "description",
        content:
          "Strategy, matchmaking, expert grantwriting, and faculty peer review for UCSF principal investigators — from R-series to P/U large grants.",
      },
      { property: "og:title", content: "Research development & grantwriting — UCSF OCR" },
      {
        property: "og:description",
        content:
          "Helping UCSF PIs compete and win in today's federal funding environment.",
      },
    ],
  }),
  component: RDGPage,
});

const META = SERVICE_META["research-development"];
const A = META.accent;

function RDGPage() {
  return (
    <SiteShell>
      <Breadcrumb trail={[{ label: "Services" }, { label: META.fullName }]} />

      <ServicePageHero
        meta={META}
        positioning="Bridging ideation and submission"
        title={
          <>
            From a hunch to a{" "}
            <em className="not-italic" style={{ color: A }}>
              funded program.
            </em>
          </>
        }
        description="A small, embedded team of PhD-trained Research Development Strategists & Grantwriters who help UCSF investigators shape ideas, find the right mechanism, write competitive proposals, and stress-test the science before submission."
        primaryCta={{ label: "Book a 30-min consult", href: "mailto:rdg@ocr.ucsf.edu" }}
        secondaryCta={{ label: "Explore our programs", href: "#capabilities" }}
        motif={<ServiceMotif variant="spiral" accent={A} />}
      />

      <ServiceOverview
        accent={A}
        headline={
          <>
            We sit in the space between a research idea and a submitted grant —
            and we don't leave when the page count gets tight.
          </>
        }
        body={
          <>
            <p>
              Launched in 2024, OCR's Research Development arm was built to fill
              the gap left when UCSF's Research Development Office stopped
              supporting grantwriting. In a federal funding landscape with more
              competition for fewer dollars, we help UCSF stay the #1 public
              recipient of NIH funding — one investigator at a time.
            </p>
            <p className="mt-4">
              Our strategists are scientists who happen to be excellent writers.
              We're proactive, relationship-driven, and as interested in your
              five-year portfolio as we are in your next deadline.
            </p>
          </>
        }
        stats={[
          { value: "43", label: "Grants in 2025" },
          { value: "9.3/10", label: "Avg. PI satisfaction" },
          { value: "4", label: "Embedded partners" },
          { value: "100%", label: "PhD-trained" },
        ]}
      />

      <div id="capabilities" />
      <ServiceCapabilities
        accent={A}
        title={
          <>
            Programs &<br />capabilities.
          </>
        }
        lede="Most investigators come to us at the Idea or Opportunity stage. The earlier we engage, the more value we add."
        items={[
          {
            title: "Large Grants Program",
            tag: "Flagship",
            desc: "Coordinated P-, U-, and center-scale proposals that build durable scientific programs and institutional infrastructure.",
            bullets: [
              "Strategy & narrative architecture",
              "Embedded PMs, CRCs, and data managers",
              "Effort on the grant once awarded",
            ],
          },
          {
            title: "Research Plan Reviews (RPRs)",
            desc: "Intensive 6-week, iterative grantwriting support for R01-equivalent applications — focused on Aims, Research Plan, biosketches, and figures.",
            bullets: [
              "~30 hours of review per application",
              "Subsidized for partner programs",
              "Structural → copy edits as deadline nears",
            ],
          },
          {
            title: "BOOST Peer Review",
            desc: "A faculty-to-faculty scientific review layer that pressure-tests premise, Aims, and feasibility about one month before submission.",
            bullets: [
              "Aims review at ≥ 6 weeks",
              "Full proposal review at 2 weeks",
              "Reviewer matched to scientific fit",
            ],
          },
          {
            title: "Grantwriting Academy",
            tag: "In dev",
            desc: "Workshops and seminars that scale OCR's expertise — Pre-Award training, First R21, K Grant prep, and policy-change briefings.",
            bullets: [
              "Pre-Award Grant Training",
              "First R21 Workshop cohort",
              "K Grant & SciENcv briefings",
            ],
          },
          {
            title: "AI Grantwriting Tools",
            tag: "In dev",
            desc: "Pre-Flight Reviewer and Prospera matchmaker — built in-house to augment, not replace, our writers. See the AI Tools page for detail.",
            bullets: [
              "Pre-Flight diagnostic reports",
              "PI ↔ NOFO matching",
              "Editorial triage for writers",
            ],
          },
          {
            title: "Funding Matchmaking",
            desc: "Proactive sourcing of federal, foundation, and internal opportunities — and warm introductions to UCSF collaborators who strengthen the science.",
            bullets: [
              "NOFO short-lists by portfolio",
              "Investigator matchmaking",
              "Concept-stage development",
            ],
          },
        ]}
      />

      <ServiceWhoFor
        accent={A}
        audiences={[
          {
            who: "Early-career investigators",
            fit: "First R01, K, or R21 applicants who want focused, hands-on guidance through the science and the page.",
          },
          {
            who: "Established PIs going big",
            fit: "Leaders preparing P-, U-, or center-scale proposals where coordinated strategy and infrastructure matter.",
          },
          {
            who: "Partner institute faculty",
            fit: "Investigators in Bakar ImmunoX, IGHS, Diabetes Center, and IHA have embedded RDSG support built into membership.",
          },
          {
            who: "Unaffiliated UCSF faculty",
            fit: "We help non-partner faculty where bandwidth allows — bring us your deadline and we'll tell you honestly.",
          },
        ]}
        note="Partners: Bakar ImmunoX Initiative · Institute for Global Health Sciences · Diabetes Center · Institute for Health and Aging."
      />

      <ServiceHowWeSupport
        accent={A}
        title={
          <>
            From idea<br />to submission.
          </>
        }
        lede="A five-stage engagement we run with every PI — drop in at any stage, but the earlier the better."
        steps={[
          {
            title: "Strategic consultation",
            desc: "30-minute intake. We learn your portfolio, funding trajectory, and target mechanisms — and pressure-test the science before a page is drafted.",
            artifacts: ["Portfolio map", "Vision memo"],
          },
          {
            title: "Funding matchmaking",
            desc: "We surface aligned federal, foundation, and internal opportunities, and introduce UCSF collaborators who sharpen the application.",
            artifacts: ["NOFO short-list", "Collaborator intros"],
          },
          {
            title: "Aims & drafting",
            desc: "We co-develop the narrative arc and Specific Aims, then iterate through full drafts — sitting with you, not just track-changing the file.",
            artifacts: ["Specific Aims", "Full draft"],
          },
          {
            title: "BOOST peer review",
            desc: "A UCSF faculty peer reviews your science at the Aims and Full Proposal stages — the layer our writers can't provide alone.",
            artifacts: ["Aims review", "Full proposal review"],
          },
          {
            title: "Submission & beyond",
            desc: "Biosketches, budgets, letters of support, DMS plans, and submission logistics — coordinated end-to-end so nothing slips through the cracks.",
            artifacts: ["Biosketches", "Budget", "DMS plan", "Submission"],
          },
        ]}
      />

      <ServiceOutcomes
        accent={A}
        items={[
          {
            kicker: "Outcome · R01",
            headline: "A fundable score on a first try.",
            detail:
              "An early-stage investigator engaged at the Aims stage, completed BOOST review, and submitted an R01 that returned a fundable score.",
          },
          {
            kicker: "Use case · P-series",
            headline: "A center-scale program from scratch.",
            detail:
              "A consortium PI used the Large Grants Program to coordinate strategy across 14 investigators, with embedded PM and data support on the awarded grant.",
          },
          {
            kicker: "Use case · RPR",
            headline: "Six weeks to a sharper resubmission.",
            detail:
              "An NIH A1 resubmission completed an RPR that focused on the Introduction, Aims, and figures — and improved both the science and the PI's writing fluency.",
          },
        ]}
        quote={{
          text: "The process not only improved my grant, it taught me to be a better writer. This service is invaluable.",
          attribution: "UCSF Principal Investigator, RPR participant 2025",
        }}
      />

      <ServiceRelated
        currentId="research-development"
        accent={A}
        note="A typical large grant pulls in Project Management once awarded, a Data Management plan at submission, and Prospera intelligence at the matchmaking stage."
      />

      <CTA
        eyebrow="Start early"
        title={
          <>
            Got a grant on the horizon?
            <br />
            <span className="text-white/70">Let's talk early.</span>
          </>
        }
        subtitle="The earlier we engage, the more value we can add. A 30-minute consult is free — and the next federal deadline is closer than you think."
        email="rdg@ocr.ucsf.edu"
      />
    </SiteShell>
  );
}
