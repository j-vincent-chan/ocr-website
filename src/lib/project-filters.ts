import type { Project } from "@/data/projects";

export type StatusFilter = "All" | "Active" | "Closed";

export type ProjectFilters = {
  status: StatusFilter;
  kind: string;
  projectType: string;
  sponsor: string;
  service: string;
  disease: string;
};

export const DEFAULT_PROJECT_FILTERS: ProjectFilters = {
  status: "Active",
  kind: "",
  projectType: "",
  sponsor: "",
  service: "",
  disease: "",
};

export function parseServices(services: string | null): string[] {
  if (!services) return [];
  return services.split(";").map((s) => s.trim()).filter(Boolean);
}

/** Disease areas parsed from the spreadsheet `Disease Area(s)` field (via stored `area`). */
/** Pills shown on project cards (condenses multiple diseases to Multi-disease + theme). */
export function getDisplayAreaPills(project: Project): string[] {
  const diseases = parseDiseaseAreas(project);
  const pills: string[] = [];

  if (/multi-disease/i.test(project.area) && diseases.length === 0) {
    pills.push("Multi-disease");
  } else if (diseases.length > 1) {
    pills.push("Multi-disease");
  } else if (diseases.length === 1) {
    pills.push(diseases[0]);
  } else {
    const label = project.area.split("·")[0].trim();
    if (label && !/multi-disease/i.test(label)) {
      pills.push(label);
    }
  }

  if (project.theme) {
    pills.push(project.theme);
  }

  const { kind } = project;
  if (kind !== "Project" && kind !== "N/A") {
    const kindLower = kind.toLowerCase();
    if (!pills.some((p) => p.toLowerCase() === kindLower)) {
      pills.push(kind);
    }
  }

  return pills;
}

export function parseDiseaseAreas(project: Project): string[] {
  const { area, kind, projectType } = project;
  if (/multi-disease/i.test(area)) return [];

  return area
    .split(/\s*;\s*/)
    .map((part) => part.split("·")[0].trim())
    .filter((part) => {
      const lower = part.toLowerCase();
      if (!part) return false;
      if (lower === kind.toLowerCase()) return false;
      if (lower === "biobank") return false;
      if (projectType && lower === projectType.toLowerCase()) return false;
      if (lower.includes("program")) return false;
      if (lower.includes("partnership")) return false;
      return true;
    });
}

function uniqueSorted(values: string[]): string[] {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}

export function getFilterOptions(projects: Project[]) {
  const kinds = uniqueSorted(
    projects.map((p) => p.kind).filter((k) => k && k !== "N/A"),
  );
  const projectTypes = uniqueSorted(
    projects.map((p) => p.projectType).filter((t): t is string => Boolean(t)),
  );
  const sponsors = uniqueSorted(
    projects.map((p) => p.sponsor).filter((s): s is string => Boolean(s)),
  );
  const services = uniqueSorted(projects.flatMap((p) => parseServices(p.services)));
  const diseases = uniqueSorted(projects.flatMap((p) => parseDiseaseAreas(p)));

  return { kinds, projectTypes, sponsors, services, diseases };
}

export function filterProjects(projects: Project[], filters: ProjectFilters): Project[] {
  return projects.filter((p) => {
    if (filters.status !== "All" && p.status !== filters.status) return false;
    if (filters.kind && p.kind !== filters.kind) return false;
    if (filters.projectType && p.projectType !== filters.projectType) return false;
    if (filters.sponsor && p.sponsor !== filters.sponsor) return false;
    if (filters.service && !parseServices(p.services).includes(filters.service)) return false;
    if (filters.disease && !parseDiseaseAreas(p).some((d) => d === filters.disease)) return false;
    return true;
  });
}

export function hasActiveFilters(filters: ProjectFilters): boolean {
  return (
    filters.status !== DEFAULT_PROJECT_FILTERS.status ||
    Boolean(filters.kind) ||
    Boolean(filters.projectType) ||
    Boolean(filters.sponsor) ||
    Boolean(filters.service) ||
    Boolean(filters.disease)
  );
}
