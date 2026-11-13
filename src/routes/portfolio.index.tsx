import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CommunitiesView } from "@/components/portfolio/communities-view";
import { ContactCard } from "@/components/portfolio/contact-card";
import { PortfolioHero } from "@/components/portfolio/hero";
import { ProgramsView } from "@/components/portfolio/programs-view";
import { ProjectsView } from "@/components/portfolio/projects-view";
import {
  parsePortfolioSearch,
  portfolioSearchSchema,
  type PortfolioSearch,
  type PortfolioSearchInput,
} from "@/components/portfolio/search";
import { Breadcrumb } from "@/components/site/chrome";

export const Route = createFileRoute("/portfolio/")({
  // Keep search params optional on Links; defaults applied in the page.
  validateSearch: (search: Record<string, unknown>): PortfolioSearchInput =>
    portfolioSearchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Portfolio — UCSF Office of Collaborative Research" },
      {
        name: "description",
        content:
          "Programs, projects, and communities where OCR contributes — and what that contribution looks like.",
      },
      { property: "og:title", content: "Portfolio — UCSF OCR" },
      {
        property: "og:description",
        content:
          "Where OCR contributes across programs, projects, and research communities.",
      },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const raw = Route.useSearch();
  const search = parsePortfolioSearch(raw as Record<string, unknown>);
  const navigate = useNavigate({ from: Route.fullPath });

  const patch = (next: Partial<PortfolioSearch>) => {
    void navigate({
      search: (prev) => {
        const merged = parsePortfolioSearch({ ...prev, ...next } as Record<string, unknown>);
        return {
          view: merged.view === "programs" ? undefined : merged.view,
          q: merged.q || undefined,
          type: merged.type === "all" ? undefined : merged.type,
          status: merged.status === "active" ? undefined : merged.status,
          theme: merged.theme || undefined,
          program: merged.program || undefined,
          layout: merged.layout === "Cards" ? undefined : merged.layout,
          more: merged.more || undefined,
        };
      },
      replace: true,
      // In-place filter / show-more updates must not jump the page.
      resetScroll: false,
    });
  };

  return (
    <div style={{ background: "#fdfcf8" }}>
      <Breadcrumb trail={[{ label: "Portfolio" }]} />
      <PortfolioHero
        view={search.view}
        onViewChange={(view) => {
          // Swap the view in place — do not scroll. Scrolling would skip the
          // Programs / Projects / Communities explainer under the tabs.
          patch({ view });
        }}
      />
      <div id="portfolio-results" role="tabpanel">
        {search.view === "programs" ? <ProgramsView /> : null}
        {search.view === "projects" ? (
          <ProjectsView search={search} onPatch={patch} />
        ) : null}
        {search.view === "communities" ? <CommunitiesView /> : null}
        <ContactCard />
      </div>
    </div>
  );
}
