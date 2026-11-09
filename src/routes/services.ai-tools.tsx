import { createFileRoute } from "@tanstack/react-router";
import { AppDrawerProvider } from "@/components/ai-tools/app-drawer";
import { ApplicationsSection } from "@/components/ai-tools/applications-section";
import { AtlasSection } from "@/components/ai-tools/atlas-section";
import { GetStarted } from "@/components/ai-tools/get-started";
import { Hero } from "@/components/ai-tools/hero";
import { OpenBuildSection } from "@/components/ai-tools/open-build-section";
import { WebsitesSection } from "@/components/ai-tools/websites-section";
import { SiteShell } from "@/components/site/chrome";

const TITLE = "Research Resources & AI Tools — UCSF OCR";
const DESCRIPTION =
  "Prospera, Signal, and Runway: applications OCR built for research development strategists, community managers, and investigators, on one verified record of each investigator's work.";

export const Route = createFileRoute("/services/ai-tools")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: AIToolsPage,
});

/**
 * Research Resources & AI Tools (see design_handoff_ai_tools/README.md).
 * Background rhythm: dark hero → cream applications → paper Atlas → cream Open Build →
 * paper grid websites → dark get-started → dark footer. Copy lives in src/data/ai-tools.ts;
 * the Open Build call reads the `ai-tools` award from src/data/funding.ts.
 */
function AIToolsPage() {
  return (
    <SiteShell navTone="dark">
      <AppDrawerProvider>
        <Hero />
        <ApplicationsSection />
        <AtlasSection />
        <OpenBuildSection />
        <WebsitesSection />
        <GetStarted />
      </AppDrawerProvider>
    </SiteShell>
  );
}
