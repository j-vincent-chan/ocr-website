import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CommunitiesView } from "@/components/portfolio/communities-view";
import { ContactCard } from "@/components/portfolio/contact-card";
import { PortfolioHero, type PortfolioView } from "@/components/portfolio/hero";
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

type SectionLink = {
  view?: PortfolioView;
  target: string;
  label: string;
  hint: string;
};

const SECTION_LINKS: Record<PortfolioView | "contact", SectionLink> = {
  programs: {
    view: "programs",
    target: "portfolio-tabs",
    label: "Programs",
    hint: "Multi-project efforts OCR supports as a whole",
  },
  projects: {
    view: "projects",
    target: "portfolio-tabs",
    label: "Projects",
    hint: "Individual research efforts OCR supports",
  },
  communities: {
    view: "communities",
    target: "portfolio-tabs",
    label: "Communities",
    hint: "Groups of people and the programming around them",
  },
  contact: {
    target: "contact",
    label: "Start with us",
    hint: "Tell us about a program, project, or community",
  },
};

const SECTION_PAGER: Record<
  PortfolioView,
  { prev?: SectionLink; next: SectionLink }
> = {
  programs: { next: SECTION_LINKS.projects },
  projects: { prev: SECTION_LINKS.programs, next: SECTION_LINKS.communities },
  communities: { prev: SECTION_LINKS.projects, next: SECTION_LINKS.contact },
};

function SectionPager({
  view,
  onViewChange,
}: {
  view: PortfolioView;
  onViewChange: (view: PortfolioView) => void;
}) {
  const { prev, next } = SECTION_PAGER[view];

  const go = (link: SectionLink) => {
    if (link.view) onViewChange(link.view);
    requestAnimationFrame(() => {
      const target = document.getElementById(link.target);
      if (!target) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
    });
  };

  return (
    <nav
      aria-label="Portfolio sections"
      className="mx-auto max-w-[1280px] px-6 pb-24 pt-4"
    >
      <div className="flex items-center gap-4">
        <span aria-hidden className="h-0 flex-1 border-t border-[#dad7cf]" />
        <span
          className="whitespace-nowrap text-[#555e6f]"
          style={{
            font: "500 11px/1.4 Inter, system-ui, sans-serif",
            letterSpacing: ".18em",
            textTransform: "uppercase",
          }}
        >
          Section
        </span>
        <span aria-hidden className="h-0 flex-1 border-t border-[#dad7cf]" />
      </div>

      <div
        className={`mt-5 flex flex-col gap-6 sm:flex-row sm:items-start ${
          prev ? "sm:justify-between" : "sm:justify-end"
        }`}
      >
        {prev ? (
          <button
            type="button"
            onClick={() => go(prev)}
            className="group flex max-w-[28rem] flex-col items-start gap-1 border-0 bg-transparent p-0 text-left text-[#010621] hover:text-[#08173f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#010621]"
          >
            <span
              className="font-display text-[clamp(1.5rem,2.4vw,2rem)] leading-tight"
              style={{ fontWeight: 400 }}
            >
              <span
                aria-hidden
                className="mr-2 inline-block transition-transform duration-200 group-hover:-translate-x-1"
              >
                ←
              </span>
              {prev.label}
            </span>
            <span className="max-w-[28ch] text-[14px] leading-snug text-[#555e6f]">
              {prev.hint}
            </span>
          </button>
        ) : null}

        <button
          type="button"
          onClick={() => go(next)}
          className="group flex max-w-[28rem] flex-col items-end gap-1 border-0 bg-transparent p-0 text-right text-[#010621] hover:text-[#08173f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#010621]"
        >
          <span
            className="font-display text-[clamp(1.5rem,2.4vw,2rem)] leading-tight"
            style={{ fontWeight: 400 }}
          >
            {next.label}
            <span
              aria-hidden
              className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </span>
          <span className="max-w-[28ch] text-[14px] leading-snug text-[#555e6f]">
            {next.hint}
          </span>
        </button>
      </div>
    </nav>
  );
}

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
        <SectionPager
          view={search.view}
          onViewChange={(view) => {
            patch({ view });
          }}
        />
        <ContactCard />
      </div>
    </div>
  );
}
