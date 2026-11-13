import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteShell, Breadcrumb, CTA } from "@/components/site/chrome";
import { GhibliPortrait } from "@/components/site/ghibli-portrait";
import { OPEN_POSITIONS } from "@/components/site/open-positions";
import bushraSamadImg from "@/assets/people/bushra-samad.jpg";
import bushraSamadHoverImg from "@/assets/people/hover/bushra-samad-hover.jpg";
import coreyRatheImg from "@/assets/people/corey-rathe.jpg";
import coreyRatheHoverImg from "@/assets/people/hover/corey-rathe-hover.jpg";
import franciscoQuintanillaImg from "@/assets/people/francisco-quintanilla.jpg";
import franciscoQuintanillaHoverImg from "@/assets/people/hover/francisco-quintanilla-hover.jpg";
import gabeMurphyImg from "@/assets/people/gabe-murphy.jpg";
import gabeMurphyHoverImg from "@/assets/people/hover/gabe-murphy-hover.jpg";
import jonathanWilsonImg from "@/assets/people/jonathan-wilson.jpg";
import jonathanWilsonHoverImg from "@/assets/people/hover/jonathan-wilson-hover.jpg";
import linaKamilImg from "@/assets/people/lina-kamil.jpg";
import linaKamilHoverImg from "@/assets/people/hover/lina-kamil-hover.jpg";
import lindsayBreithauptImg from "@/assets/people/lindsay-breithaupt.jpg";
import lindsayBreithauptHoverImg from "@/assets/people/hover/lindsay-breithaupt-hover.jpg";
import michelleYuImg from "@/assets/people/michelle-yu.jpg";
import michelleYuHoverImg from "@/assets/people/hover/michelle-yu-hover.jpg";
import nataliaDikinovImg from "@/assets/people/natalia-dikinov.jpg";
import nataliaDikinovHoverImg from "@/assets/people/hover/natalia-dikinov-hover.jpg";
import ohnmarChanImg from "@/assets/people/ohnmar-chan.jpg";
import ohnmarChanHoverImg from "@/assets/people/hover/ohnmar-chan-hover.jpg";
import oliviaMurleyImg from "@/assets/people/olivia-murley.jpg";
import oliviaMurleyHoverImg from "@/assets/people/hover/olivia-murley-hover.jpg";
import reidBolusImg from "@/assets/people/reid-bolus.jpg";
import reidBolusHoverImg from "@/assets/people/hover/reid-bolus-hover.jpg";
import vincentChanImg from "@/assets/people/vincent-chan.jpg";
import vincentChanHoverImg from "@/assets/people/hover/vincent-chan-hover.jpg";
import xochitlVargasImg from "@/assets/people/xochitl-vargas.jpg";
import xochitlVargasHoverImg from "@/assets/people/hover/xochitl-vargas-hover.jpg";

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
          "Scientists, coordinators, and program leads embedded with UCSF investigators.",
      },
    ],
  }),
  component: PeoplePage,
});

type Arm =
  | "Leadership"
  | "Research Development"
  | "Research Operations & Management"
  | "Data Management"
  | "Community Management";

type Person = {
  name: string;
  credential?: string;
  role: string;
  arms: Arm[];
  bio: string;
  accent: string;
  photo?: string;
  photoHover?: string;
  applyHref?: string;
};

const TEAM: Person[] = [
  {
    name: "Vincent Chan",
    credential: "PhD",
    role: "Director",
    arms: ["Leadership"],
    bio: "Founded OCR as an experiment in embedding scientifically trained staff with investigators. Sets strategy across the five service arms.",
    accent: "var(--coral)",
    photo: vincentChanImg,
    photoHover: vincentChanHoverImg,
  },
  {
    name: "Gabe Murphy",
    credential: "PhD",
    role: "Senior Research Development Strategist",
    arms: ["Leadership", "Research Development"],
    bio: "First hire on the arm. Leads large-grant strategy and the growing team.",
    accent: "var(--coral)",
    photo: gabeMurphyImg,
    photoHover: gabeMurphyHoverImg,
  },
  {
    name: "Reid Bolus",
    credential: "PhD",
    role: "Research Development Strategist",
    arms: ["Research Development"],
    bio: "Embedded across the Diabetes Center and the RPR program.",
    accent: "var(--coral)",
    photo: reidBolusImg,
    photoHover: reidBolusHoverImg,
  },
  {
    name: "Lindsay Breithaupt",
    credential: "MPH",
    role: "Research Development Strategist",
    arms: ["Research Development"],
    bio: "Helps investigators shape the scientific story and craft competitive proposals across funders.",
    accent: "var(--coral)",
    photo: lindsayBreithauptImg,
    photoHover: lindsayBreithauptHoverImg,
  },
  {
    name: "Open Position",
    role: "Research Development Strategist",
    arms: ["Research Development"],
    bio: "Joining as we expand support for IGHS and engage with additional partners. We're hiring.",
    accent: "var(--coral)",
    applyHref: OPEN_POSITIONS.researchDevelopmentStrategist.href,
  },
  {
    name: "Corey Rathe",
    credential: "MS",
    role: "Project Manager",
    arms: ["Leadership", "Research Operations & Management"],
    bio: "Runs study startup, milestones, and operations across consortium projects. Keeps the work moving without losing the science.",
    accent: "var(--teal)",
    photo: coreyRatheImg,
    photoHover: coreyRatheHoverImg,
  },
  {
    name: "Francisco Quintanilla",
    role: "Senior Clinical Research Coordinator",
    arms: ["Research Operations & Management"],
    bio: "Coordinates patient enrollment and biospecimen workflows across UCSF clinics.",
    accent: "var(--teal)",
    photo: franciscoQuintanillaImg,
    photoHover: franciscoQuintanillaHoverImg,
  },
  {
    name: "Natalia Dikinov",
    role: "Senior Clinical Research Coordinator",
    arms: ["Leadership", "Research Operations & Management"],
    bio: "Senior CRC on autoimmune and inflammatory cohorts. IRB, consent, and chart abstraction.",
    accent: "var(--teal)",
    photo: nataliaDikinovImg,
    photoHover: nataliaDikinovHoverImg,
  },
  {
    name: "Ohnmar Chan",
    role: "Senior Clinical Research Coordinator",
    arms: ["Research Operations & Management"],
    bio: "Senior CRC supporting enrollment, consent, and day-to-day study operations across OCR clinical portfolios.",
    accent: "var(--teal)",
    photo: ohnmarChanImg,
    photoHover: ohnmarChanHoverImg,
  },
  {
    name: "Lina Kamil",
    credential: "MPH",
    role: "Clinical Research Coordinator",
    arms: ["Research Operations & Management"],
    bio: "Patient-facing coordination and study operations for human-subjects research.",
    accent: "var(--teal)",
    photo: linaKamilImg,
    photoHover: linaKamilHoverImg,
  },
  {
    name: "Olivia Murley",
    role: "Clinical Research Coordinator",
    arms: ["Research Operations & Management"],
    bio: "Coordinates participant visits, consent, and day-to-day study operations for OCR clinical portfolios.",
    accent: "var(--teal)",
    photo: oliviaMurleyImg,
    photoHover: oliviaMurleyHoverImg,
  },
  {
    name: "Michelle Yu",
    role: "Data Manager",
    arms: ["Data Management"],
    bio: "Builds the databases, metadata schemas, and Data Management & Sharing plans behind every OCR study.",
    accent: "var(--magenta)",
    photo: michelleYuImg,
    photoHover: michelleYuHoverImg,
  },
  {
    name: "Bushra Samad",
    credential: "MS",
    role: "Data Manager",
    arms: ["Data Management"],
    bio: "Supports database design, data integrity, and sharing workflows for OCR-managed studies and consortium datasets.",
    accent: "var(--magenta)",
    photo: bushraSamadImg,
    photoHover: bushraSamadHoverImg,
  },
  {
    name: "Jonathan Wilson",
    role: "Research Administrative Officer",
    arms: ["Leadership", "Community Management"],
    bio: "Handles finance, contracts, and the operational backbone of the office.",
    accent: "var(--coral)",
    photo: jonathanWilsonImg,
    photoHover: jonathanWilsonHoverImg,
  },
  {
    name: "Xochitl Vargas",
    role: "ImmunoDiverse Program Administrator",
    arms: ["Community Management"],
    bio: "Runs the ImmunoDiverse program — broadening participation in immunology research at UCSF.",
    accent: "var(--lime)",
    photo: xochitlVargasImg,
    photoHover: xochitlVargasHoverImg,
  },
  {
    name: "Open Position",
    role: "ImmunoX Community Manager",
    arms: ["Community Management"],
    bio: "Will steward the ImmunoX research community through convenings, communications, outreach, and collaborator connections.",
    accent: "var(--lime)",
    applyHref: OPEN_POSITIONS.immunoxCommunityManager.href,
  },
];

const ALUMNI = [
  { name: "Nora Hazenbos", role: "Project Manager" },
  { name: "Lily Ortiz", role: "ImmunoX Community Manager" },
  { name: "Jo Williams", role: "Parnassus Institutes Community Manager" },
  { name: "Nelson Wu", role: "Data Manager" },
];

const ARMS = [
  "All",
  "Leadership",
  "Research Development",
  "Research Operations & Management",
  "Data Management",
  "Community Management",
] as const;

const ARM_ORDER: Arm[] = [
  "Leadership",
  "Research Development",
  "Research Operations & Management",
  "Data Management",
  "Community Management",
];

/** Lower sorts first. Open roles are forced last, then this rank, then last name. */
const ROLE_RANK: Record<string, number> = {
  Director: 0,
  "Senior Research Development Strategist": 1,
  "Project Manager": 2,
  "Senior Clinical Research Coordinator": 3,
  "Research Development Strategist": 4,
  "Data Manager": 5,
  "Research Administrative Officer": 6,
  "ImmunoDiverse Program Administrator": 7,
  "Clinical Research Coordinator": 8,
  "ImmunoX Community Manager": 9,
};

function lastName(name: string) {
  return name.split(" ").at(-1) ?? name;
}

function isOpenRole(p: Person) {
  return p.name === "Open Position";
}

/** Primary arm is the earliest one this person belongs to, so All lists them once. */
function primaryArm(p: Person) {
  return ARM_ORDER.find((arm) => p.arms.includes(arm)) ?? p.arms[0];
}

function comparePeople(a: Person, b: Person) {
  const openDelta = Number(isOpenRole(a)) - Number(isOpenRole(b));
  if (openDelta !== 0) return openDelta;
  const rankDelta = (ROLE_RANK[a.role] ?? 100) - (ROLE_RANK[b.role] ?? 100);
  if (rankDelta !== 0) return rankDelta;
  return (
    lastName(a.name).localeCompare(lastName(b.name)) ||
    a.name.localeCompare(b.name)
  );
}

function compareRoster(a: Person, b: Person) {
  const armDelta = ARM_ORDER.indexOf(primaryArm(a)) - ARM_ORDER.indexOf(primaryArm(b));
  if (armDelta !== 0) return armDelta;
  return comparePeople(a, b);
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
}

function Avatar({
  name,
  accent,
  photo,
  photoHover,
}: {
  name: string;
  accent: string;
  photo?: string;
  photoHover?: string;
}) {
  if (!photo) {
    return (
      <div
        className="relative flex w-full aspect-square items-center justify-center overflow-hidden rounded-2xl"
        style={{
          background: `linear-gradient(135deg, color-mix(in oklab, ${accent} 28%, var(--cream)), var(--cream))`,
        }}
      >
        <span
          aria-hidden
          className="absolute -top-8 -right-8 h-32 w-32 rounded-full blur-2xl opacity-50"
          style={{ background: accent }}
        />
        <span className="relative font-display text-5xl tracking-tight text-ink/80">
          {initials(name)}
        </span>
      </div>
    );
  }

  if (photoHover) {
    return (
      <GhibliPortrait name={name} photo={photo} photoHover={photoHover} />
    );
  }

  return (
    <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-cream">
      <img
        src={photo}
        alt={name}
        className="absolute inset-0 h-full w-full object-cover object-[center_18%]"
        loading="lazy"
      />
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
        <span className="text-xs uppercase tracking-[0.22em] text-coral-aa font-medium">
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
  const filtered = useMemo(() => {
    if (filter === "All") return [...TEAM].sort(compareRoster);
    return TEAM.filter((p) => p.arms.includes(filter)).sort(comparePeople);
  }, [filter]);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div>
            <span className="text-xs uppercase tracking-[0.22em] text-teal-aa font-medium">
              Current staff
            </span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl text-ink">
              {filtered.length} {filtered.length === 1 ? "person" : "people"}
              <span className="text-muted-foreground"> · {filter}</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by service arm">
            {ARMS.map((a) => {
              const active = a === filter;
              return (
                <button
                  key={a}
                  type="button"
                  aria-pressed={active}
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
              key={`${p.name}-${p.role}`}
              className="group rounded-3xl border border-border bg-card p-5 hover:shadow-lift transition"
            >
              <Avatar
                name={p.name}
                accent={p.accent}
                photo={p.photo}
                photoHover={p.photoHover}
              />
              <div className="mt-5 flex items-start gap-2">
                <span
                  className="mt-1.5 w-2 h-2 rounded-full flex-none"
                  style={{ background: p.accent }}
                />
                <div className="min-w-0">
                  {p.arms.length > 0 ? (
                    <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
                      {filter === "All" ? p.arms.join(" · ") : filter}
                    </div>
                  ) : null}
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
              {p.applyHref ? (
                <a
                  href={p.applyHref}
                  {...(p.applyHref.startsWith("http")
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                  className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-4 py-2 text-sm font-medium text-ink hover:border-ink/30 hover:bg-cream transition"
                >
                  {p.applyHref.startsWith("http")
                    ? "View job posting"
                    : "Contact about role"}{" "}
                  <span aria-hidden>→</span>
                </a>
              ) : null}
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
          <span className="text-xs uppercase tracking-[0.22em] text-magenta-aa font-medium">
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
