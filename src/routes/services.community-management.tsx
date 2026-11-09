import { useCallback, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Channels } from "@/components/community-management/channels";
import { DetailDrawer } from "@/components/community-management/detail-drawer";
import { Hero } from "@/components/community-management/hero";
import { Playbook } from "@/components/community-management/playbook";
import { ProgramYear } from "@/components/community-management/program-year";
import { TeamAndPartners } from "@/components/community-management/team-and-partners";
import { WaysToEngage } from "@/components/community-management/ways-to-engage";
import { WhereThisFits } from "@/components/community-management/where-this-fits";
import { CTA, SiteShell } from "@/components/site/chrome";
import { ctaCopy, hero, type ServiceId } from "@/data/community-management";

const TITLE = "Community & Enrichment Programs — UCSF OCR";
const DESCRIPTION = `${hero.title} ${hero.titleAccent} ${hero.intro}`;

export const Route = createFileRoute("/services/community-management")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: hero.intro },
    ],
  }),
  component: CommunityManagementPage,
});

/**
 * Community & Enrichment Programs (see design_handoff_community_programs/README.md).
 * Background rhythm: dark hero → paper playbook → cream program year → paper channels →
 * cream team → paper boundary → cream models → dark CTA → dark footer.
 * Copy lives in src/data/community-management.ts.
 */
function CommunityManagementPage() {
  const [panel, setPanel] = useState<ServiceId>("build");
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);
  const show = useCallback((key: ServiceId, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setPanel(key);
    setOpen(true);
  }, []);

  return (
    <SiteShell navTone="dark">
      <Hero />
      <Playbook onOpenDrawer={show} />
      <ProgramYear />
      <Channels />
      <TeamAndPartners />
      <WhereThisFits />
      <WaysToEngage />
      <CTA
        eyebrow={ctaCopy.eyebrow}
        title={
          <>
            {ctaCopy.title}
            <br />
            <span className="text-white/70">{ctaCopy.titleAccent}</span>
          </>
        }
        subtitle={ctaCopy.subtitle}
        email={ctaCopy.email}
        primaryLabel={ctaCopy.primaryLabel}
        primaryHref={ctaCopy.primaryHref}
      />
      <DetailDrawer
        service={panel}
        open={open}
        onOpenChange={setOpen}
        returnFocusTo={triggerRef}
      />
    </SiteShell>
  );
}
