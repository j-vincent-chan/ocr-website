import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteShell, Breadcrumb, CTA } from "@/components/site/chrome";

export const Route = createFileRoute("/people")({
  head: () => ({
    meta: [
      { title: "People — UCSF Office of Collaborative Research" },
      {
        name: "description",
        content:
          "Meet the OCR team — research development strategists, project managers, clinical coordinators, data managers, and program leads supporting collaborative science at UCSF.",
      },
      { property: "og:title", content: "People — UCSF OCR" },
      {
        property: "og:description",
        content:
          "PhDs, coordinators, and program leads embedded with UCSF investigators.",
      },
    ],
  }),
  component: PeoplePage,
});

type Person = {
  name: string;
  credential?: string;
  role: string;
  arm: "Leadership" | "Research Development" | "Project Management" | "Data" | "Programs";
  bio: string;
  accent: string;
};

const TEAM: Person[] = [
  {
    name: "Vincent Chan",
    credential: "PhD",
    role: "Director",
    arm: "Leadership",
    bio: "Founded OCR as an experiment in embedding PhD-trained staff with investigators. Sets strategy across the four service arms.",
    accent: "var(--coral)",
  },
  {
    name: "Gabe Murphy",
    credential: "PhD",
    role: "Research Development Strategist & Grantwriter",
    arm: "Research Development",
    bio: "Translates science into competitive proposals. Pressure-tests Specific Aims with PIs from hunch to submission.",
    accent: "var(--coral)",
  },
  {
    name: "Reid Bolus",
    credential: "PhD",
    role: "Research Development Strategist & Grantwriter",
    arm: "Research Development",
    bio: "Matches investigators with mechanisms — federal, foundation, and internal — and shapes the narrative arc of large team grants.",
    accent: "var(--coral)",
  },
  {
    name: "Corey Rathe",
    credential: "MS",
    role: "Project Manager",
    arm: "Project Management",
    bio: "Runs study startup, milestones, and operations across consortium projects. Keeps the work moving without losing the science.",
    accent: "var(--teal)",
  },
  {
    name: "Francisco Quintanilla",
    role: "Senior Clinical Research Coordinator",
    arm: "Project Management",
    bio: "Coordinates patient enrollment and biospecimen workflows across UCSF clinics.",
    accent: "var(--teal)",
  },
  {
    name: "Natalia Dikinov",
    role: "Senior Clinical Research Coordinator",
    arm: "Project Management",
    bio: "Senior CRC on autoimmune and inflammatory cohorts. IRB, consent, and chart abstraction.",
    accent: "var(--teal)",
  },
  {
    name: "Lina Kamil",
    credential: "MPH",
    role: "Clinical Research Coordinator",
    arm: "Project Management",
    bio: "Patient-facing coordination and study operations for human-subjects research.",
    accent: "var(--teal)",
  },
  {
    name: "Michelle Yu",
    role: "Data Manager",
    arm: "Data",
    bio: "Builds the databases, metadata schemas, and Data Management & Sharing plans behind every OCR study.",
    accent: "var(--magenta)",
  },
  {
    name: "Jonathan Wilson",
    role: "Research Administrative Officer",
    arm: "Leadership",
    bio: "Handles finance, contracts, and the operational backbone of the office.",
    accent: "var(--coral)",
  },
  {
    name: "Xochitl Vargas",
    role: "ImmunoDiverse Program Administrator",
    arm: "Programs",
    bio: "Runs the ImmunoDiverse program — broadening participation in immunology research at UCSF.",
    accent: "var(--gold)",
  },
  {
    name: "Lily Ortiz",
    credential: "MS",
    role: "ImmunoX Community Manager",
    arm: "Programs",
    bio: "Builds and stewards the ImmunoX community — events, comms, and collaborator connections.",
    accent: "var(--gold)",
  },
];

const ALUMNI = [
  { name: "Nora Hazenbos", role: "Project Manager" },
  { name: "Nelson Wu", role: "Data Manager" },
];

const ARMS = [
  "All",
  "Leadership",
  "Research Development",
  "Project Management",
  "Data",
  "Programs",
] as const;

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
}

function Avatar({ name, accent }: { name: string; accent: string }) {
  return (
    <div
      className="relative w-full aspect-square rounded-2xl overflow-hidden flex items-center justify-center"
      style={{
        background: `linear-gradient(135deg, color-mix(in oklab, ${accent} 22%, var(--cream)), var(--cream))`,
      }}
    >
      <span
        aria-hidden
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-2xl opacity-50"
        style={{ background: accent }}
      />
      <span className="relative font-display text-5xl text-ink/80 tracking-tight">
        {initials(name)}
      </span>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream border-b border-ink/10">
      <div
        aria-hidden
        className="absolute -top-40 -right-40 w-[640px] h-[640px] rounded-full blur-3xl opacity-25"
        style={{ background: "var(--gradient-sunburst)" }}
      />
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-20 relative">
        <span className="text-xs uppercase tracking-[0.22em] text-coral font-medium">
          People
        </span>
        <h1 className="mt-6 font-display text-[clamp(2.75rem,7.5vw,6.5rem)] leading-[0.95] tracking-tight text-ink max-w-[18ch]">
          The team behind <em className="not-italic text-gradient-sunburst">the work.</em>
        </h1>
        <p className="mt-8 max-w-2xl text-xl text-muted-foreground leading-relaxed">
          OCR was carefully assembled with relevant experience to support
          human-subjects research — grant development, regulatory management,
          biospecimen procurement, and clinical data. We sit next to
          investigators, not across from them.
        </p>
      </div>
    </section>
  );
}

function Roster() {
  const [filter, setFilter] = useState<(typeof ARMS)[number]>("All");
  const filtered = useMemo(
    () => (filter === "All" ? TEAM : TEAM.filter((p) => p.arm === filter)),
    [filter],
  );

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div>
            <span className="text-xs uppercase tracking-[0.22em] text-teal font-medium">
              Current staff
            </span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl text-ink">
              {filtered.length} {filtered.length === 1 ? "person" : "people"}
              <span className="text-muted-foreground"> · {filter}</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {ARMS.map((a) => {
              const active = a === filter;
              return (
                <button
                  key={a}
                  onClick={() => setFilter(a)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                    active
                      ? "bg-ink text-white border-ink"
                      : "bg-card text-ink border-border hover:border-ink/40"
                  }`}
                >
                  {a}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <article
              key={p.name}
              className="group rounded-3xl border border-border bg-card p-5 hover:shadow-lift transition"
            >
              <Avatar name={p.name} accent={p.accent} />
              <div className="mt-5 flex items-start gap-2">
                <span
                  className="mt-1.5 w-2 h-2 rounded-full flex-none"
                  style={{ background: p.accent }}
                />
                <div className="min-w-0">
                  <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
                    {p.arm}
                  </div>
                  <h3 className="mt-1 font-display text-xl text-ink leading-tight">
                    {p.name}
                    {p.credential && (
                      <span className="text-muted-foreground font-sans text-sm font-normal">
                        , {p.credential}
                      </span>
                    )}
                  </h3>
                  <div className="mt-1 text-sm font-medium text-ink/80">{p.role}</div>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                {p.bio}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Alumni() {
  return (
    <section className="pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="rounded-3xl bg-secondary p-10 md:p-14">
          <span className="text-xs uppercase tracking-[0.22em] text-magenta font-medium">
            Alumni
          </span>
          <h2 className="mt-3 font-display text-3xl md:text-4xl text-ink">
            Once OCR, always OCR.
          </h2>
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {ALUMNI.map((a) => (
              <div
                key={a.name}
                className="flex items-center justify-between rounded-2xl bg-card border border-border p-5"
              >
                <div>
                  <div className="font-display text-xl text-ink">{a.name}</div>
                  <div className="text-sm text-muted-foreground">{a.role}</div>
                </div>
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  Alum
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PeoplePage() {
  return (
    <SiteShell>
      <Breadcrumb trail={[{ label: "People" }]} />
      <Hero />
      <Roster />
      <Alumni />
      <CTA
        eyebrow="Join us"
        title={<>Want to work with this team?</>}
        subtitle="Whether you're a PI looking for a strategist or considering a role at OCR, we'd love to hear from you."
        email="ocr@ucsf.edu"
        primaryLabel="Get in touch →"
      />
    </SiteShell>
  );
}
