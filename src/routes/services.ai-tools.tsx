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

export const Route = createFileRoute("/services/ai-tools")({
  head: () => ({
    meta: [
      { title: "Research resources & AI tools — UCSF OCR" },
      {
        name: "description",
        content:
          "Signal, Prospera, Pre-Flight, and a growing suite of internal AI tools built so OCR — and the investigators we support — spend less time on paperwork and more on science.",
      },
      { property: "og:title", content: "Research resources & AI tools — UCSF OCR" },
      {
        property: "og:description",
        content: "Software OCR is building so researchers and staff can spend more time on science.",
      },
    ],
  }),
  component: AIPage,
});

const META = SERVICE_META["ai-tools"];
const A = META.accent;

function AIPage() {
  return (
    <SiteShell>
      <Breadcrumb trail={[{ label: "Services" }, { label: META.fullName }]} />

      <ServicePageHero
        meta={META}
        positioning="Built in-house at UCSF"
        title={
          <>
            The software we{" "}
            <em className="not-italic" style={{ color: A }}>
              wish existed.
            </em>
          </>
        }
        description="OCR builds the AI tools we needed for our own work — so investigators and staff spend less time on search, summarization, and paperwork, and more time on science."
        primaryCta={{ label: "Request a pilot", href: "mailto:ai@ocr.ucsf.edu" }}
        secondaryCta={{ label: "See the tools", href: "#capabilities" }}
        motif={<ServiceMotif variant="circuit" accent={A} />}
      />

      <ServiceOverview
        accent={A}
        headline={
          <>
            We ship internal tools that augment our team — never replace
            judgement — and we put them in front of partner investigators when
            they're ready.
          </>
        }
        body={
          <>
            <p>
              Every tool starts with a complaint from a PI or a staff member.
              We prototype, measure, iterate, and retire tools that don't earn
              their keep. Humans stay in the loop on every output.
            </p>
            <p className="mt-4">
              Models run against UCSF data inside approved environments. Nothing
              ships to a sponsor or a PI without a human review step.
            </p>
          </>
        }
        stats={[
          { value: "2", label: "Flagship products" },
          { value: "6+", label: "Internal automations" },
          { value: "4", label: "Partner institutes" },
          { value: "Human", label: "In the loop" },
        ]}
      />

      <div id="capabilities" />
      <ServiceCapabilities
        accent={A}
        title={
          <>
            Flagship products &<br />internal automations.
          </>
        }
        lede="Two flagship platforms in active pilot, plus a growing log of focused automations that compound hours back."
        items={[
          {
            title: "Signal",
            tag: "Beta · v0.4",
            desc: "A research-intelligence platform that watches literature, grants, awards, and news — and curates the signals that actually matter to our investigators.",
            bullets: [
              "Publications, grants, awards & news",
              "Author-level deduplication",
              "Editorial summaries for human review",
            ],
          },
          {
            title: "Prospera",
            tag: "Beta · v0.2",
            desc: "AI-assisted funding discovery and matchmaking. Aggregates federal, foundation, and internal opportunities, then matches them to investigator portfolios.",
            bullets: [
              "NOFO ↔ PI matching",
              "Grant Cards with fit + criteria",
              "Structured outreach pipeline",
            ],
          },
          {
            title: "Pre-Flight Grant Reviewer",
            tag: "In dev",
            desc: "An early diagnostic for draft Aims, Research Strategy, and biosketches — flags clarity issues, jargon, weak transitions, and reviewer confusion points.",
            bullets: [
              "Structured editorial report",
              "Triage ranking for writers",
              "Tracks recurring proposal weaknesses",
            ],
          },
          {
            title: "Aims-to-LOI drafter",
            tag: "Shipped",
            desc: "Turns approved Specific Aims into a tailored Letter of Intent in minutes, then routes to a writer for review.",
          },
          {
            title: "Biosketch refresh",
            tag: "Shipped",
            desc: "Pulls recent publications and rebuilds NIH biosketches with one click — checked by a writer before delivery.",
          },
          {
            title: "NOFO summarizer",
            tag: "Shipped",
            desc: "Reads a full FOA and returns review criteria, scored fit, and key dates — the first pass before strategy.",
          },
        ]}
      />

      <ServiceWhoFor
        accent={A}
        audiences={[
          {
            who: "Partner institute investigators",
            fit: "Signal and Prospera are in active pilot with Bakar ImmunoX, IGHS, Diabetes Center, and IHA — first to receive new tools.",
          },
          {
            who: "OCR's own team",
            fit: "Most tools start as internal automations for our writers, PMs, and CRCs — investigators see them once they're stable.",
          },
          {
            who: "Faculty preparing R01s",
            fit: "Pre-Flight Grant Reviewer is built specifically for investigators sharpening Aims and Research Strategy before submission.",
          },
          {
            who: "Programs in planning",
            fit: "Prospera helps program leads map a multi-year funding strategy across federal, foundation, and internal mechanisms.",
          },
        ]}
        note="Want a tool we don't have yet? Tell us — every tool we ship started as a complaint."
      />

      <ServiceHowWeSupport
        accent={A}
        title={
          <>
            How we build<br />with AI.
          </>
        }
        lede="A short, opinionated build loop that keeps humans in the loop and retires what doesn't earn its keep."
        steps={[
          {
            title: "Start with a complaint",
            desc: "Every tool begins with a PI or staff frustration — not a model demo. We document the workflow before we touch a model.",
            artifacts: ["Workflow doc", "Success metric"],
          },
          {
            title: "Prototype private by default",
            desc: "Models run against UCSF data inside approved environments. Prompts and outputs stay inside OCR.",
            artifacts: ["Sandbox", "Eval set"],
          },
          {
            title: "Stage outputs for human review",
            desc: "Nothing ships to a PI or sponsor without a human in the loop. Every output is a draft, never a send.",
            artifacts: ["Review queue", "Edit log"],
          },
          {
            title: "Pilot with one partner",
            desc: "We onboard one partner institute at a time, measure accuracy and time saved, and iterate on real use — not synthetic demos.",
            artifacts: ["Pilot scorecard", "Iteration log"],
          },
          {
            title: "Scale or retire",
            desc: "Tools that prove themselves graduate to broader access. Tools that don't get sunset publicly — we don't keep zombies running.",
            artifacts: ["Graduation note", "Sunset post"],
          },
        ]}
      />

      <ServiceOutcomes
        accent={A}
        items={[
          {
            kicker: "Outcome · Signal",
            headline: "Four institutes on one feed.",
            detail:
              "Signal pilot consolidates literature, grants, and award news for four partner institutes into a single editorial-reviewed feed.",
          },
          {
            kicker: "Use case · Prospera",
            headline: "Matched in minutes, not weeks.",
            detail:
              "A program lead used Prospera to short-list eight foundation opportunities for a center-scale program in a single afternoon.",
          },
          {
            kicker: "Outcome · Internal",
            headline: "Biosketch turnaround down to a day.",
            detail:
              "Internal biosketch refresh dropped per-biosketch turnaround from days to a few hours of writer time per PI.",
          },
        ]}
        quote={{
          text: "The tools don't replace the writers — they let the writers spend their time on the parts only humans can do.",
          attribution: "OCR Research Development Strategist",
        }}
      />

      <ServiceRelated
        currentId="ai-tools"
        accent={A}
        note="Prospera plugs directly into Research Development matchmaking; Pre-Flight feeds the RPR queue; Signal surfaces opportunities for the bench."
      />

      <CTA
        eyebrow="Get early access"
        title={
          <>
            Want Signal or Prospera
            <br />
            <span className="text-white/70">in your lab?</span>
          </>
        }
        subtitle="We're onboarding new partner institutes through 2026. Tell us what you'd want it to do, and we'll find a pilot that fits."
        email="ai@ocr.ucsf.edu"
        primaryLabel="Request a pilot →"
      />
    </SiteShell>
  );
}
