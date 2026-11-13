import type {
  CoProjectItem,
  CoProjects,
  OcrStatus,
  Program,
  Project,
  ScaleIndicator,
} from "@/data/portfolio/types";

const STATUS_RANK: Record<OcrStatus, number> = {
  Active: 0,
  Pending: 1,
  Closed: 2,
};

const PROJECT_SORT_RANK: Record<OcrStatus, number> = {
  Pending: 0,
  Active: 1,
  Closed: 2,
};

export function plural(n: number, one: string, many: string): string {
  return `${n} ${n === 1 ? one : many}`;
}

/** Scale indicator on a program card (DATA_MODEL.md). */
export function programScale(
  program: Program,
  children: Project[],
  coprojects?: CoProjects,
): ScaleIndicator | null {
  if (program.scale) return program.scale;

  if (program.id === "coprojects" && coprojects) {
    const a = coprojects.active.length;
    const c = coprojects.completed.length;
    if (!(a + c)) return null;
    return {
      value: String(a + c),
      unit: "projects",
      note: `${a} active · ${c} completed`,
    };
  }

  if (!children.length) return null;

  const nClin = children.filter((p) => p.type === "clin").length;
  const nBio = children.length - nClin;

  if (nClin && nBio) {
    return {
      value: String(children.length),
      unit: "projects",
      note: `${plural(nClin, "clinical study", "clinical studies")} · ${plural(nBio, "biospecimen collection", "biospecimen collections")}`,
    };
  }

  const cnt: Partial<Record<OcrStatus, number>> = {};
  for (const p of children) {
    cnt[p.status] = (cnt[p.status] ?? 0) + 1;
  }

  const note = (["Active", "Pending", "Closed"] as OcrStatus[])
    .filter((k) => cnt[k])
    .map((k) => {
      const n = cnt[k]!;
      const label = k === "Pending" ? "in startup" : k.toLowerCase();
      return `${n} ${label}`;
    })
    .join(" · ");

  return {
    value: String(children.length),
    unit: nClin
      ? children.length === 1
        ? "clinical study"
        : "clinical studies"
      : "projects",
    note,
  };
}

export type TrayRowSource =
  | { kind: "project"; project: Project }
  | { kind: "coproject"; item: CoProjectItem; status: "Active" | "Completed" }
  | { kind: "patient-type"; label: string; count: number };

/** Child rows for a program tray, sorted and capped at three (+ more count). */
export function programTrayRows(
  program: Program,
  children: Project[],
  coprojects?: CoProjects,
  limit = 3,
): { rows: TrayRowSource[]; total: number; more: number } {
  if (program.patients) {
    const types = program.patients.types;
    const rows: TrayRowSource[] = types.slice(0, limit).map(([label, count]) => ({
      kind: "patient-type",
      label,
      count,
    }));
    const total = types.length;
    return { rows, total, more: Math.max(0, total - rows.length) };
  }

  if (program.id === "coprojects" && coprojects) {
    const featured = coprojects.active.filter((x) => x.featured);
    const rest = coprojects.active.filter((x) => !x.featured);
    const pool = [...featured, ...rest];
    const rows: TrayRowSource[] = pool.slice(0, limit).map((item) => ({
      kind: "coproject",
      item,
      status: "Active",
    }));
    const total = coprojects.active.length + coprojects.completed.length;
    return { rows, total, more: Math.max(0, total - rows.length) };
  }

  const sorted = [...children].sort(
    (a, b) => STATUS_RANK[a.status] - STATUS_RANK[b.status],
  );
  const rows: TrayRowSource[] = sorted.slice(0, limit).map((project) => ({
    kind: "project",
    project,
  }));
  const total = children.length;
  return { rows, total, more: Math.max(0, total - rows.length) };
}

/** Programs for display: closed programs last (order otherwise preserved). */
export function sortProgramsForDisplay(programs: Program[]): Program[] {
  return [...programs].sort(
    (a, b) => Number(a.status === "Closed") - Number(b.status === "Closed"),
  );
}

/** Project directory sort: start year desc, then Pending/Active/Closed, then name. */
export function sortProjects(projects: Project[]): Project[] {
  return [...projects].sort(
    (a, b) =>
      (+b.start || 0) - (+a.start || 0) ||
      PROJECT_SORT_RANK[a.status] - PROJECT_SORT_RANK[b.status] ||
      a.name.localeCompare(b.name),
  );
}

/**
 * Kind line on a project card.
 * Bio: "Biospecimen collection · {model}"
 * Clin: "Clinical trial" for interventional trials, else "Clinical study", then phase / study type.
 */
export function projectKindLine(project: Project): string {
  if (project.type === "bio") {
    return ["Biospecimen collection", project.model].filter(Boolean).join(" · ");
  }

  const head =
    project.studyType === "Interventional trial" ? "Clinical trial" : "Clinical study";
  const studyType =
    project.studyType && project.studyType !== "Interventional trial"
      ? project.studyType
          .replace(" / natural history", "")
          .replace("Humanitarian Use Device (HUD)", "Humanitarian use device")
      : "";
  const enrollment =
    project.enrollment && project.enrollment !== "Recruiting" ? project.enrollment : "";

  return [head, project.phase, studyType, enrollment].filter(Boolean).join(" · ");
}

export type StatusPresentation = {
  line: string;
  /** CSS background for the 8px status dot. */
  dot: string;
  ink: string;
};

/** Status pill presentation. Color is never the only signal — the word is always shown. */
export function statusPresentation(
  status: OcrStatus,
  themeDeep: string,
): StatusPresentation {
  if (status === "Active") {
    return { line: "Active", dot: themeDeep, ink: "#010621" };
  }
  if (status === "Pending") {
    return {
      line: "Pending",
      dot: `radial-gradient(circle, transparent 0 36%, ${themeDeep} 42%)`,
      ink: "#010621",
    };
  }
  return { line: "Closed", dot: "#b9b6ae", ink: "#555e6f" };
}

/** Hash a record name into a motif kind key (DATA_MODEL.md). */
export function hashMotifKind(name: string, kindKeys: string[]): string {
  if (!kindKeys.length) return "";
  let h = 0;
  for (let i = 0; i < name.length; i++) {
    h = (h * 31 + name.charCodeAt(i)) >>> 0;
  }
  return kindKeys[h % kindKeys.length]!;
}

export function motifKindForRecord(
  name: string,
  records: Record<string, string>,
  kindKeys: string[],
): string {
  return records[name] ?? hashMotifKind(name, kindKeys);
}

/**
 * Append degrees from the lookup to investigator names.
 * "Zha, Shoshana (Director)" style leads become "Shoshana Zha, MD, PhD" when roles=false.
 * Comma-separated names; roles in parentheses are kept only when `keepRoles` is true.
 */
export function formatLead(
  lead: string | undefined,
  degrees: Record<string, string>,
  keepRoles = false,
): string {
  if (!lead) return "";
  return lead
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const m = /^(.*?)(\s*\([^)]*\))?$/.exec(part);
      const name = (m?.[1] ?? part).trim();
      const role = m?.[2] ?? "";
      const dg = degrees[name];
      return name + (dg ? `, ${dg}` : "") + (keepRoles && role ? role : "");
    })
    .join("; ");
}

export function projectsOfProgram(projects: Project[], programId: string): Project[] {
  return projects.filter((p) => p.parent === programId);
}

export function programHasChildren(
  program: Program,
  projects: Project[],
): boolean {
  if (program.id === "coprojects") return true;
  if (program.patients) return true;
  return projects.some((p) => p.parent === program.id);
}
