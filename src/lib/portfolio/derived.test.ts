import { describe, expect, it } from "vitest";
import type { CoProjects, Program, Project } from "@/data/portfolio/types";
import {
  formatLead,
  hashMotifKind,
  motifKindForRecord,
  programHasChildren,
  programScale,
  programTrayRows,
  projectKindLine,
  sortProgramsForDisplay,
  sortProjects,
  statusPresentation,
} from "./derived";

const baseProgram = (over: Partial<Program> = {}): Program =>
  ({
    id: "p1",
    name: "Test Program",
    title: "Test",
    subtitle: "Program",
    type: "program",
    programType: "Research program",
    status: "Active",
    start: "2024",
    theme: "Cancer",
    areas: [],
    lead: "Ada Lovelace",
    funding: "Institutional",
    services: [],
    card: "Card copy",
    ocrTeam: [],
    ...over,
  }) as Program;

const bio = (over: Partial<Project> = {}): Project =>
  ({
    id: "b1",
    name: "Bio A",
    type: "bio",
    status: "Active",
    start: "2023",
    theme: "Cancer",
    areas: [],
    lead: "Ada Lovelace",
    services: [],
    card: "x",
    parent: "p1",
    model: "Biobank",
    ...over,
  }) as Project;

const clin = (over: Partial<Project> = {}): Project =>
  ({
    id: "c1",
    name: "Clin A",
    type: "clin",
    status: "Pending",
    start: "2024",
    theme: "Lung disease",
    areas: [],
    lead: "Ada Lovelace",
    services: [],
    card: "x",
    parent: "p1",
    studyType: "Interventional trial",
    phase: "Phase 3",
    ...over,
  }) as Project;

describe("programScale", () => {
  it("uses explicit scale when present", () => {
    const scale = { value: "25", unit: "patients profiled", note: "by cancer type" };
    expect(programScale(baseProgram({ scale }), [])).toEqual(scale);
  });

  it("derives ImmunoX co·projects totals", () => {
    const cps: CoProjects = {
      active: [{ title: "A", theme: "Cancer", kind: "Pilot" }],
      completed: [
        { title: "B", theme: "Cancer", kind: "Full study" },
        { title: "C", theme: "Cancer", kind: "Pilot" },
      ],
    };
    expect(programScale(baseProgram({ id: "coprojects" }), [], cps)).toEqual({
      value: "3",
      unit: "projects",
      note: "1 active · 2 completed",
    });
  });

  it("mixes clinical and biospecimen notes", () => {
    const kids = [bio(), clin({ id: "c2", status: "Active" })];
    expect(programScale(baseProgram(), kids)).toEqual({
      value: "2",
      unit: "projects",
      note: "1 clinical study · 1 biospecimen collection",
    });
  });

  it("breaks all-clinical counts down by status", () => {
    const kids = [
      clin({ id: "a", status: "Active", name: "A" }),
      clin({ id: "b", status: "Pending", name: "B" }),
      clin({ id: "c", status: "Closed", name: "C" }),
    ];
    expect(programScale(baseProgram(), kids)).toEqual({
      value: "3",
      unit: "clinical studies",
      note: "1 active · 1 in startup · 1 closed",
    });
  });

  it("returns null with no children and no scale", () => {
    expect(programScale(baseProgram(), [])).toBeNull();
  });
});

describe("programTrayRows", () => {
  it("sorts Active, Pending, Closed and caps at three", () => {
    const kids = [
      bio({ id: "closed", status: "Closed", name: "Z" }),
      bio({ id: "pending", status: "Pending", name: "Y" }),
      bio({ id: "active1", status: "Active", name: "A" }),
      bio({ id: "active2", status: "Active", name: "B" }),
    ];
    const { rows, total, more } = programTrayRows(baseProgram(), kids);
    expect(total).toBe(4);
    expect(more).toBe(1);
    expect(rows.map((r) => (r.kind === "project" ? r.project.id : ""))).toEqual([
      "active1",
      "active2",
      "pending",
    ]);
  });

  it("features ImmunoX co·projects first", () => {
    const cps: CoProjects = {
      active: [
        { title: "Plain", theme: "Cancer", kind: "Pilot" },
        { title: "Star", theme: "Cancer", kind: "Full study", featured: true },
      ],
      completed: [{ title: "Done", theme: "Cancer", kind: "Pilot" }],
    };
    const { rows, total } = programTrayRows(baseProgram({ id: "coprojects" }), [], cps);
    expect(total).toBe(3);
    expect(rows[0]?.kind === "coproject" && rows[0].item.title).toBe("Star");
  });

  it("lists patient cancer types for Custom Discovery", () => {
    const program = baseProgram({
      patients: {
        total: 10,
        years: [["2024", 10]],
        types: [
          ["Lung", 5],
          ["Breast", 3],
          ["Rare cancers", 2],
        ],
      },
    });
    const { rows, more } = programTrayRows(program, []);
    expect(rows).toHaveLength(3);
    expect(more).toBe(0);
    expect(rows[0]).toMatchObject({ kind: "patient-type", label: "Lung", count: 5 });
  });
});

describe("sortProgramsForDisplay", () => {
  it("moves closed programs to the end", () => {
    const list = [
      baseProgram({ id: "closed", status: "Closed" }),
      baseProgram({ id: "active", status: "Active" }),
    ];
    expect(sortProgramsForDisplay(list).map((p) => p.id)).toEqual(["active", "closed"]);
  });
});

describe("sortProjects", () => {
  it("sorts by start year, then Pending/Active/Closed, then name", () => {
    const list = [
      bio({ id: "old", name: "B", start: "2020", status: "Active" }),
      clin({ id: "new-closed", name: "A", start: "2024", status: "Closed" }),
      clin({ id: "new-pending", name: "C", start: "2024", status: "Pending" }),
      clin({ id: "new-active", name: "D", start: "2024", status: "Active" }),
    ];
    expect(sortProjects(list).map((p) => p.id)).toEqual([
      "new-pending",
      "new-active",
      "new-closed",
      "old",
    ]);
  });
});

describe("projectKindLine", () => {
  it("formats biospecimen lines", () => {
    expect(projectKindLine(bio())).toBe("Biospecimen collection · Biobank");
  });

  it("formats interventional trials as Clinical trial", () => {
    expect(projectKindLine(clin())).toBe("Clinical trial · Phase 3");
  });

  it("formats other clinical study types", () => {
    expect(
      projectKindLine(
        clin({
          studyType: "Observational / natural history",
          phase: undefined,
          enrollment: "Completed",
        }),
      ),
    ).toBe("Clinical study · Observational · Completed");
  });
});

describe("statusPresentation", () => {
  it("uses theme deep for Active, ring for Pending, grey for Closed", () => {
    expect(statusPresentation("Active", "#008e8e").dot).toBe("#008e8e");
    expect(statusPresentation("Pending", "#008e8e").dot).toContain("radial-gradient");
    expect(statusPresentation("Closed", "#008e8e").dot).toBe("#b9b6ae");
  });
});

describe("motifKindForRecord", () => {
  const keys = ["rings", "helix", "constellation"];

  it("uses the records map when present", () => {
    expect(motifKindForRecord("Named", { Named: "helix" }, keys)).toBe("helix");
  });

  it("hashes unassigned names stably", () => {
    const a = hashMotifKind("Unlisted Study", keys);
    const b = hashMotifKind("Unlisted Study", keys);
    expect(a).toBe(b);
    expect(keys).toContain(a);
  });
});

describe("formatLead", () => {
  it("appends degrees and drops roles by default", () => {
    expect(
      formatLead("Ada Lovelace (Director)", { "Ada Lovelace": "MD, PhD" }),
    ).toBe("Ada Lovelace, MD, PhD");
  });

  it("keeps roles when requested", () => {
    expect(
      formatLead("Ada Lovelace (Director)", { "Ada Lovelace": "MD, PhD" }, true),
    ).toBe("Ada Lovelace, MD, PhD (Director)");
  });
});

describe("programHasChildren", () => {
  it("detects children, patients, and coprojects", () => {
    expect(programHasChildren(baseProgram({ id: "coprojects" }), [])).toBe(true);
    expect(
      programHasChildren(
        baseProgram({ patients: { total: 1, years: [["2024", 1]], types: [["Lung", 1]] } }),
        [],
      ),
    ).toBe(true);
    expect(programHasChildren(baseProgram(), [bio()])).toBe(true);
    expect(programHasChildren(baseProgram(), [])).toBe(false);
  });
});
