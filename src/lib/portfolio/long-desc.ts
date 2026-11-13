import type { Project } from "@/data/portfolio/types";

function sent(x: string | undefined): string {
  const t = String(x || "").trim();
  return t ? t + (/[.!?]$/.test(t) ? "" : ".") : "";
}

function lowerList(a: string[] | undefined): string {
  return (a || [])
    .map((x, i) => (i ? x.charAt(0).toLowerCase() + x.slice(1) : x))
    .join(", ");
}

/** Compose the longer project-card description from record fields (prototype longDesc). */
export function projectLongDesc(p: Project): string {
  const parts = [sent(p.card)];
  const add = (x: string | false | undefined) => {
    if (x && parts.join(" ").length < 330) parts.push(sent(x));
  };

  if (p.type === "bio") {
    add(p.specimens?.length ? `Samples collected: ${lowerList(p.specimens)}` : false);
    add(p.assays?.length ? `Analyses: ${lowerList(p.assays)}` : false);
    add(p.population ? `Participants: ${p.population}` : false);
  } else {
    add(p.intervention ? `Intervention: ${p.intervention}` : false);
    add(p.eligibility ? `Eligibility: ${p.eligibility}` : false);
    add(
      p.target
        ? `Target enrollment: ${Number(p.target).toLocaleString("en-US")} across all study sites`
        : false,
    );
  }

  add(
    p.sites?.length
      ? `${p.sites.length > 1 ? "Sites" : "Site"}: ${p.sites.join("; ")}`
      : false,
  );
  add(p.partners?.length ? `Partners: ${p.partners.join("; ")}` : false);
  add(
    p.dept || p.division
      ? `Based in ${[p.dept, p.division].filter(Boolean).join(", ")}`
      : false,
  );
  add(p.areas?.length ? `Disease areas: ${lowerList(p.areas)}` : false);

  return parts.filter(Boolean).join(" ");
}
