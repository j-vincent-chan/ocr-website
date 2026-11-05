import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/chrome";
import { BookingSection } from "@/components/research-development/booking-section";
import { Hero } from "@/components/research-development/hero";
import { InDevelopment } from "@/components/research-development/in-development";
import { RecordSection } from "@/components/research-development/record-section";
import { TeamAndPartners } from "@/components/research-development/team-and-partners";
import { Testimonials } from "@/components/research-development/testimonials";
import { WhatWeDo } from "@/components/research-development/what-we-do";
import { hero } from "@/data/research-development";

export const Route = createFileRoute("/services/research-development")({
  head: () => ({
    meta: [
      { title: "Research Development — UCSF OCR" },
      {
        name: "description",
        content: `${hero.title} ${hero.titleAccent} ${hero.intro} Free 30-minute consults for any UCSF investigator.`,
      },
      { property: "og:title", content: "Research Development — UCSF OCR" },
      { property: "og:description", content: hero.intro },
    ],
  }),
  component: ResearchDevelopmentPage,
});

/**
 * Research development (design handoff, option 1b).
 * Background rhythm: dark hero → paper → cream → paper → cream → dark booking → paper grid → footer.
 * Copy and data live in src/data/research-development.ts.
 */
function ResearchDevelopmentPage() {
  return (
    <SiteShell navTone="dark">
      <Hero />
      <WhatWeDo />
      <RecordSection />
      <Testimonials />
      <TeamAndPartners />
      <BookingSection />
      <InDevelopment />
    </SiteShell>
  );
}
