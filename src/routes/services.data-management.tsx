import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/chrome";
import { Approach } from "@/components/data-management/approach";
import { Capabilities } from "@/components/data-management/capabilities";
import { GetStarted } from "@/components/data-management/get-started";
import { Hero } from "@/components/data-management/hero";
import { HowWeWork } from "@/components/data-management/how-we-work";
import { Team } from "@/components/data-management/team";
import { WhereWeWork } from "@/components/data-management/where-we-work";
import { meta } from "@/data/data-management";

/**
 * Data Management service page.
 * Sibling of /services/research-operations (see design_handoff_data_management/README.md).
 * Direction A ("The Ledger"): dark nav → dark hero (with picker) → paper → cream → paper →
 * cream → paper → dark CTA → dark footer. Copy lives in src/data/data-management.ts.
 */
export const Route = createFileRoute("/services/data-management")({
  head: () => ({
    meta: [
      { title: meta.title },
      { name: "description", content: meta.description },
      { property: "og:title", content: meta.title },
      { property: "og:description", content: meta.description },
    ],
  }),
  component: DataManagementPage,
});

function DataManagementPage() {
  return (
    <SiteShell navTone="dark">
      <Hero />
      <Capabilities />
      <HowWeWork />
      <WhereWeWork />
      <Approach />
      <Team />
      <GetStarted />
    </SiteShell>
  );
}
