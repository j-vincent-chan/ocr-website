import type { Project } from "@/data/portfolio/types";
import { projectKindLine } from "./derived";

export type ProjectTypeFilter = "all" | "bio" | "clin";
export type ProjectStatusFilter = "active" | "closed" | "all";
export type ProjectsLayout = "Cards" | "List";

export type PortfolioSearchState = {
  view: "programs" | "projects" | "communities";
  q: string;
  type: ProjectTypeFilter;
  status: ProjectStatusFilter;
  theme: string;
  program: string;
  layout: ProjectsLayout;
  more: boolean;
};

export const DEFAULT_SEARCH: PortfolioSearchState = {
  view: "programs",
  q: "",
  type: "all",
  status: "active",
  theme: "",
  program: "",
  layout: "Cards",
  more: false,
};

export function projectHaystack(
  project: Project,
  programName?: string,
): string {
  return [
    project.name,
    project.short,
    project.fullTitle,
    project.card,
    project.lead,
    project.theme,
    projectKindLine(project),
    project.type === "bio" ? "Biospecimen collection" : "Clinical studies & trials",
    programName,
    ...(project.areas ?? []),
    ...(project.services ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function filterProjects(
  all: Project[],
  state: Pick<PortfolioSearchState, "q" | "type" | "status" | "theme" | "program">,
  programNameById: Record<string, string>,
): { shown: Project[]; matching: Project[]; closedHidden: number } {
  const q = state.q.trim().toLowerCase();
  const matching = all.filter((p) => {
    if (state.type !== "all" && p.type !== state.type) return false;
    if (state.program && p.parent !== state.program) return false;
    if (state.theme && p.theme !== state.theme) return false;
    if (q) {
      const hay = projectHaystack(
        p,
        p.parent ? programNameById[p.parent] : undefined,
      );
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  const shown = matching.filter(
    (p) =>
      state.status === "all" ||
      (state.status === "closed") === (p.status === "Closed"),
  );
  const closedHidden =
    state.status === "active" ? matching.length - shown.length : 0;

  return { shown, matching, closedHidden };
}

export function resultLine(opts: {
  visibleCount: number;
  totalShown: number;
  closedHidden: number;
  filtered: boolean;
}): string {
  const matching = opts.filtered ? " matching" : "";
  const hidden = opts.closedHidden
    ? ` · ${opts.closedHidden} closed hidden`
    : "";
  return `Showing ${opts.visibleCount} of ${opts.totalShown}${matching} projects${hidden}`;
}

export function hasActiveProjectFilters(
  state: Pick<PortfolioSearchState, "q" | "type" | "status" | "theme" | "program">,
): boolean {
  return (
    !!state.q.trim() ||
    !!state.theme ||
    !!state.program ||
    state.type !== "all" ||
    state.status !== "active"
  );
}
