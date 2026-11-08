import { createFileRoute } from "@tanstack/react-router";
import { CtaBand } from "@/components/funding/cta-band";
import { HubHero } from "@/components/funding/hub-hero";
import { Ledger } from "@/components/funding/ledger";
import { HUB_DESCRIPTION, HUB_TITLE } from "@/components/funding/lib";

export const Route = createFileRoute("/funding/")({
  head: () => ({
    meta: [
      { title: HUB_TITLE },
      { name: "description", content: HUB_DESCRIPTION },
      { property: "og:title", content: HUB_TITLE },
      { property: "og:description", content: HUB_DESCRIPTION },
    ],
  }),
  component: FundingHubPage,
});

function FundingHubPage() {
  return (
    <>
      <HubHero />
      <Ledger />
      <CtaBand />
    </>
  );
}
