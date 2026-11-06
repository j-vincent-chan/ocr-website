import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/chrome";
import { GetStarted } from "@/components/research-operations/get-started";
import { Hero } from "@/components/research-operations/hero";
import { HowWeWork } from "@/components/research-operations/how-we-work";
import { RecordSection } from "@/components/research-operations/record-section";
import { ServicesSection } from "@/components/research-operations/services-section";
import { StaffingSection } from "@/components/research-operations/staffing-section";
import { TeamAndPartners } from "@/components/research-operations/team-and-partners";
import { Testimonials } from "@/components/research-operations/testimonials";
import { arm, hero } from "@/data/research-operations";

const TITLE = `${arm.name} — UCSF OCR`;

/**
 * Research Operations & Management (formerly Project Management & Clinical Coordination).
 * The old path, /services/project-management, redirects here.
 */
export const Route = createFileRoute("/services/research-operations")({
  head: () => ({
    meta: [
      { title: TITLE },
      {
        name: "description",
        content: `${hero.headline.lead}${hero.headline.accent} ${hero.lead}`,
      },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: hero.lead },
    ],
  }),
  component: ResearchOperationsPage,
});

/**
 * Sibling of /services/research-development (see design_handoff_research_operations/README.md).
 * Background rhythm: dark hero → paper → cream → paper → cream → paper → cream → dark CTA →
 * dark footer. Copy and data live in src/data/research-operations.ts.
 */
function ResearchOperationsPage() {
  return (
    <SiteShell navTone="dark">
      <Hero />
      <ServicesSection />
      <HowWeWork />
      <RecordSection />
      <Testimonials />
      <StaffingSection />
      <TeamAndPartners />
      <GetStarted />
    </SiteShell>
  );
}
