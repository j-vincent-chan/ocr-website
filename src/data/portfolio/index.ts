import communitiesJson from "./communities.json";
import motifsJson from "./motifs.json";
import portfolioJson from "./portfolio.json";
import type {
  Community,
  CoProjects,
  Program,
  Project,
} from "./types";

export type * from "./types";

export const programs = portfolioJson.programs as Program[];
export const projects = portfolioJson.projects as Project[];
export const coprojects = portfolioJson.coprojects as CoProjects;
export const degrees = portfolioJson.degrees as Record<string, string>;
export const staff = portfolioJson.staff as Record<string, string>;
export const staffPhotos = portfolioJson.staffPhotos as Record<string, string>;
export const communities = communitiesJson as Community[];

export const motifs = motifsJson as {
  kinds: Record<string, string>;
  records: Record<string, string>;
};

export const motifKindKeys = Object.keys(motifs.kinds);

export function getProgram(id: string): Program | undefined {
  return programs.find((p) => p.id === id);
}

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export const THEMES = [
  "Autoimmunity",
  "Cancer",
  "Infectious disease",
  "Allergy",
  "Lung disease",
  "Pediatrics",
  "Surgery & devices",
  "Multi-disease",
] as const;
