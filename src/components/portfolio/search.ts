import { z } from "zod";
import type { PortfolioSearchState } from "@/lib/portfolio/filters";
import { DEFAULT_SEARCH } from "@/lib/portfolio/filters";

/** Optional URL search keys (defaults applied in parsePortfolioSearch). */
export type PortfolioSearchInput = {
  view?: "programs" | "projects" | "communities";
  q?: string;
  type?: "all" | "bio" | "clin";
  status?: "active" | "closed" | "all";
  theme?: string;
  program?: string;
  layout?: "Cards" | "List";
  more?: boolean | "true" | "false";
};

export const portfolioSearchSchema = z.object({
  view: z.enum(["programs", "projects", "communities"]).optional(),
  q: z.string().optional(),
  type: z.enum(["all", "bio", "clin"]).optional(),
  status: z.enum(["active", "closed", "all"]).optional(),
  theme: z.string().optional(),
  program: z.string().optional(),
  layout: z.enum(["Cards", "List"]).optional(),
  more: z.union([z.boolean(), z.literal("true"), z.literal("false")]).optional(),
});

export type PortfolioSearch = PortfolioSearchState;

export function parsePortfolioSearch(search: Record<string, unknown>): PortfolioSearch {
  const raw = portfolioSearchSchema.parse(search);
  return {
    view: raw.view ?? DEFAULT_SEARCH.view,
    q: raw.q ?? DEFAULT_SEARCH.q,
    type: raw.type ?? DEFAULT_SEARCH.type,
    status: raw.status ?? DEFAULT_SEARCH.status,
    theme: raw.theme ?? DEFAULT_SEARCH.theme,
    program: raw.program ?? DEFAULT_SEARCH.program,
    layout: raw.layout ?? DEFAULT_SEARCH.layout,
    more: raw.more === true || raw.more === "true",
  };
}

export function toSearchState(search: PortfolioSearch): PortfolioSearchState {
  return search;
}
