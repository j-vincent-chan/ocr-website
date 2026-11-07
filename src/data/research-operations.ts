// Content for the Research Operations & Management page (/services/research-operations).
// Source of truth for copy and data. Moved from design_handoff_research_operations/
// research-operations.data.ts; photo paths were swapped for Vite asset imports, the service
// palette was aligned with the Research Development page's service hues, and the record
// examples were rewired to pull from src/data/projects.ts by slug.
// Copy is final; use verbatim. Items with `verify: true` must be confirmed by the OCR team
// before launch and render a review pill while SHOW_REVIEW_FLAGS is on.

import coreyImg from "@/assets/people/corey-rathe.jpg";
import vincentImg from "@/assets/people/vincent-chan.jpg";
import nataliaImg from "@/assets/people/natalia-dikinov.jpg";
import ohnmarImg from "@/assets/people/ohnmar-chan.jpg";
import franciscoImg from "@/assets/people/francisco-quintanilla.jpg";
import linaImg from "@/assets/people/lina-kamil.jpg";
import oliviaImg from "@/assets/people/olivia-murley.jpg";

export type ServiceKey = "bio" | "clinical" | "pm";
export type NeedKey = "samples" | "study" | "program" | "capacity";
export type StageKey = "early" | "startup" | "active" | "expand" | "other";

/** Design-review annotations (yellow "Confirm …" pills). Never shown in production builds. */
export const SHOW_REVIEW_FLAGS = import.meta.env.DEV;

/**
 * The testimonials are assembled from published remarks (see `testimonials.verify`).
 * Set to false to hide the whole section until the wording is confirmed with each speaker.
 */
export const SHOW_TESTIMONIALS = true;

/**
 * Service hues. Identical to the Research Development service palette
 * (src/data/research-development.ts: plan = pink, peer = teal, large = violet) so the two
 * pages read as siblings. Kept as oklch literals because `tint()` derives the 12% panels,
 * 14% hovers and 25% halos from them.
 */
export const SERVICE_COLOR: Record<
  ServiceKey,
  { color: string; textColor: string; label: string }
> = {
  bio: {
    color: "oklch(0.72 0.22 340)",
    textColor: "oklch(0.5 0.2 340)",
    label: "biospecimen coordination",
  },
  clinical: {
    color: "oklch(0.78 0.13 195)",
    textColor: "oklch(0.45 0.1 195)",
    label: "clinical research coordination",
  },
  pm: {
    color: "oklch(0.72 0.16 290)",
    textColor: "oklch(0.48 0.18 285)",
    label: "project & program management",
  },
};

/** The page's primary accent: the teal of clinical research coordination. */
export const TEAL = SERVICE_COLOR.clinical.color;

export const hero = {
  eyebrow: "Research Operations & Management",
  headline: { lead: "From research plan to ", accent: "real-world execution." },
  headlineAlt: { lead: "You bring the science. ", accent: "We run the operations." },
  lead: "Project managers and clinical research coordinators who launch, coordinate, and manage your research: biospecimen pipelines, clinical studies and trials, and complex scientific programs. We join at the point the work needs us, for as much effort as it needs.",
  pickerLabel: "What does your research need?",
  startHere: "Start here",
};

export const trackStops: { key: ServiceKey; kicker: string; name: string }[] = [
  { key: "bio", kicker: "Clinic to lab", name: "Biospecimen & translational coordination" },
  { key: "clinical", kicker: "Studies & trials", name: "Clinical research coordination" },
  { key: "pm", kicker: "Complex initiatives", name: "Project & program management" },
];

/** In-page or in-site destination for a linked phrase inside a fact. */
export type FactLink = {
  label: string;
  to: "/services/data-management" | "/projects";
  hash?: string;
};

export type Fact = {
  term: "When" | "For whom" | "Structure" | "Cost";
  text: string;
  /** `label` must appear verbatim inside `text`; that span is rendered as a link. */
  link?: FactLink;
};

export type Need = {
  key: NeedKey;
  chip: string;
  /** Track stops that light up; the first entry is the primary service. */
  lit: ServiceKey[];
  /** Accent for the Start-here card. */
  color: ServiceKey;
  title: string;
  subtitle?: string;
  body: string;
  alsoDrawsOn?: ServiceKey[];
  facts: Fact[];
  ctaHint: string;
};

export const needs: Need[] = [
  {
    key: "samples",
    chip: "I need human biospecimens for my lab",
    lit: ["bio"],
    color: "bio",
    title: "Biospecimen & translational research coordination",
    body: "We build the pipeline from clinic to bench: clinical collaborators, protocol and regulatory approvals, consent, collection, processing, and handoff to your lab or UCSF CoLabs, with clinical metadata that travels with every sample.",
    facts: [
      {
        term: "When",
        text: "Before the protocol is written, when possible. Pipelines are easier to design than to retrofit.",
      },
      {
        term: "For whom",
        text: "Basic and translational labs that need human samples but lack clinic access, and clinical investigators building a biobank.",
      },
      {
        term: "Structure",
        text: "Coordinator effort for the clinical side of the pipeline, with OCR data management alongside.",
      },
      {
        term: "Cost",
        text: "Scoped to project needs and capacity. Funded through grants, institutional partnerships, or OCR pipeline development awards.",
      },
    ],
    ctaHint: "Tell us the sample type and the clinical population.",
  },
  {
    key: "study",
    chip: "I'm launching a clinical study or trial",
    lit: ["clinical"],
    color: "clinical",
    title: "Clinical research coordination",
    body: "Coordinators who take your protocol from feasibility through activation, enrollment, and close-out: IRB and regulatory submissions, consent, study visits, documentation, and monitoring support.",
    facts: [
      {
        term: "When",
        text: "Feasibility and startup are ideal. We also join studies already enrolling.",
      },
      {
        term: "For whom",
        text: "UCSF investigators running investigator-initiated or industry-sponsored studies, with or without a clinical research unit of their own.",
      },
      {
        term: "Structure",
        text: "A coordinator, and a project manager when the study needs one, at the fraction of effort the work requires.",
      },
      {
        term: "Cost",
        text: "Scoped to the study and our capacity. Usually staff effort on the study budget, grant, or institutional agreement.",
      },
    ],
    ctaHint: "Tell us the protocol stage and where participants are seen.",
  },
  {
    key: "program",
    chip: "I need someone to manage a project or program",
    lit: ["pm"],
    color: "pm",
    title: "Research project & program management",
    body: "A project or program manager who runs the operational side of a complex initiative: planning, milestones, budgets, governance, partner coordination, and the communication that keeps a consortium moving.",
    alsoDrawsOn: ["bio", "clinical"],
    facts: [
      {
        term: "When",
        text: "From kickoff, or when a growing project outpaces what the team can run itself.",
      },
      {
        term: "For whom",
        text: "Multi-investigator projects, consortia, centers, and programs in basic, clinical, or translational science.",
      },
      {
        term: "Structure",
        text: "A manager embedded with your team at fractional or dedicated effort.",
      },
      {
        term: "Cost",
        text: "Scoped to the program and our capacity. Typically written into the award or supported by the sponsoring institute.",
      },
    ],
    ctaHint: "Tell us the scope, the partners, and the first milestone.",
  },
  {
    key: "capacity",
    chip: "I need experienced clinical research management",
    lit: ["clinical", "pm"],
    color: "clinical",
    title: "Clinical research coordination",
    subtitle: "without the full-time hire",
    body: "Senior coordinators who supervise a clinical research program at the effort it needs: a new PI starting a program in their specialty, an established program whose supervisor has left, or a portfolio that needs experienced management part-time.",
    alsoDrawsOn: ["pm"],
    facts: [
      {
        term: "When",
        text: "Whenever a program needs experienced management it cannot, or does not need to, hire full-time: at the start, during a staffing gap, or ongoing.",
      },
      {
        term: "For whom",
        text: "New clinical research PIs in any specialty, and established programs between supervisors or with part-time needs.",
      },
      {
        term: "Structure",
        text: "Experienced coordinators who join your program at the effort you can support, for as long as the need lasts.",
      },
      {
        term: "Cost",
        text: "Scoped to the program and our capacity. Staff effort through grants or an institutional partnership.",
      },
    ],
    ctaHint: "Tell us your specialty and what the program needs managed.",
  },
];

export function needByKey(key: NeedKey): Need {
  return needs.find((n) => n.key === key) ?? needs[0];
}

export const startHereCta = {
  title: "Scope it with the team",
  button: "Start the conversation",
  href: "#start",
  note: "No protocol, budget, or IRB approval required",
  alsoDrawsOn: "Many programs also draw on",
};

/** Overlapping headshots shown in the Start-here card and the Get-started card. */
export const ctaAvatars = [
  { slug: "corey-rathe", photo: coreyImg },
  { slug: "natalia-dikinov", photo: nataliaImg },
  { slug: "francisco-quintanilla", photo: franciscoImg },
];

export const servicesIntro = {
  eyebrow: "Our services",
  title: "Three ways we support research.",
  lead: "Each is a distinct capability, and none is a career stage of another. Most engagements draw on more than one: the same coordinators often deliver both clinical and biospecimen work, and project managers support basic, clinical, and translational science alike.",
  more: "What's included",
  activitiesLabel: "Common activities",
  closeLabel: "Close details",
  secondaryCta: "What to include in a first email",
};

export type Service = {
  key: ServiceKey;
  number: string;
  name: string;
  headline: string;
  summary: string;
  panelBody: string;
  activities: string[];
  facts: { term: "For whom" | "When" | "Structure" | "Cost"; text: string; link?: FactLink }[];
  cta: { label: string; mailtoSubject: string };
};

export const services: Service[] = [
  {
    key: "bio",
    number: "01",
    name: "Biospecimen & translational research coordination",
    headline: "Connect your lab to the clinic.",
    summary:
      "We build and run the pipeline that brings human samples from clinical settings to research laboratories, with the clinical metadata that makes them useful.",
    panelBody:
      "We build and run the pipeline that brings human samples from clinical settings to research laboratories: finding clinical collaborators, writing the protocol, consenting participants, and tracking every specimen through processing and handoff, with the clinical metadata that makes it useful.",
    activities: [
      "Clinical sampling pipeline development",
      "Clinical collaborator identification and coordination",
      "Protocol development and regulatory coordination",
      "Participant identification, recruitment, and consent",
      "Specimen collection, tracking, processing, and laboratory handoffs",
      "Integration with research labs and UCSF CoLabs",
      "Clinical metadata coordination and quality control",
    ],
    facts: [
      {
        term: "For whom",
        text: "Basic and translational labs that need human biospecimens, and clinical investigators building a biobank",
      },
      {
        term: "When",
        text: "Before the protocol is written, when possible. Pipelines are easier to design than to retrofit.",
      },
      {
        term: "Structure",
        text: "Often the same coordinators who run our clinical studies, with OCR data management alongside",
        link: { label: "OCR data management", to: "/services/data-management" },
      },
      {
        term: "Cost",
        text: "Scoped to project needs and capacity. Funded through grants, institutional partnerships, or OCR pipeline development awards.",
        link: { label: "OCR pipeline development awards", to: "/projects", hash: "funding" },
      },
    ],
    cta: { label: "Scope a pipeline", mailtoSubject: "Scope a project: biospecimen pipeline" },
  },
  {
    key: "clinical",
    number: "02",
    name: "Clinical research coordination",
    headline: "Start up and run human-subjects studies.",
    summary:
      "Coordinators who take a protocol from feasibility through activation, enrollment, and close-out, for investigator-initiated and industry-sponsored studies alike.",
    panelBody:
      "Coordinators who take a protocol from feasibility through activation, enrollment, and close-out: IRB and regulatory submissions, consent, study visits, documentation, and monitoring support. Labs new to human-subjects research get a clinical research unit; established groups get more hands.",
    activities: [
      "Study feasibility and startup",
      "Regulatory and IRB coordination",
      "Participant recruitment, screening, and informed consent",
      "Protocol visits and study procedures",
      "Documentation, data collection, and monitoring support",
      "Clinical research unit operational support",
    ],
    facts: [
      {
        term: "For whom",
        text: "Investigators launching or running clinical studies and trials, including labs new to human-subjects work",
      },
      { term: "When", text: "Ideally at feasibility; we also join active studies" },
      {
        term: "Structure",
        text: "Coordinator effort scoped to the study, from a fraction of one person to a dedicated team member",
      },
      {
        term: "Cost",
        text: "Scoped to the study and our capacity. Usually staff effort on the study budget, grant, or institutional agreement.",
      },
    ],
    cta: {
      label: "Scope a study",
      mailtoSubject: "Scope a project: clinical research coordination",
    },
  },
  {
    key: "pm",
    number: "03",
    name: "Research project & program management",
    headline: "Keep complex initiatives on track.",
    summary:
      "Project and program managers who run the operational side of multi-investigator and multi-institutional science, in basic, clinical, and translational work.",
    panelBody:
      "Project and program managers who run the operational side of multi-investigator and multi-institutional science: planning, milestones, budgets, governance, and the communication that keeps a consortium moving. A distinct capability for basic, clinical, and translational work, not a senior coordinator role.",
    activities: [
      "Research project planning and execution",
      "Program and consortium management",
      "Multi-investigator and multi-institutional coordination",
      "Milestone, deliverable, and budget tracking",
      "Stakeholder communication and governance",
      "Research infrastructure and workflow development",
    ],
    facts: [
      {
        term: "For whom",
        text: "PIs of consortia, centers, multi-site projects, and programs in any discipline",
      },
      {
        term: "When",
        text: "From kickoff, or when a project grows beyond what the team can run itself",
      },
      {
        term: "Structure",
        text: "A manager embedded with the team, at fractional or dedicated effort",
      },
      {
        term: "Cost",
        text: "Scoped to the program and our capacity. Typically written into the award or supported by the sponsoring institute.",
      },
    ],
    cta: {
      label: "Scope a program",
      mailtoSubject: "Scope a project: project or program management",
    },
  },
];

export function serviceByKey(key: ServiceKey): Service {
  return services.find((s) => s.key === key) ?? services[0];
}

export const howWeWork = {
  eyebrow: "How we work",
  title: "Three stages, whether it's a single-site study or a consortium.",
  lead: "The same operating rhythm applies to a clinical trial and a multi-institutional program. What changes is the mix of people: coordinators for human-subjects work, project managers for the program around it, data managers alongside both.",
  stages: [
    {
      n: "01",
      label: "First conversation",
      title: "Plan & Assess",
      body: "We learn the scientific objectives and what delivering them will take: feasibility, clinical partners, the regulatory path, staffing, infrastructure, and budget. You leave with a scoped plan and a realistic read on timeline.",
    },
    {
      n: "02",
      label: "Startup",
      title: "Launch & Establish",
      body: "Protocols, IRB and regulatory submissions, contracts and activation, workflows and SOPs, databases, and the coordination structure the work will run on, whether that is a study team or a consortium's governance.",
    },
    {
      n: "03",
      label: "Ongoing",
      title: "Execute & Manage",
      body: "Day-to-day coordination: visits, samples, milestones, budgets, reporting, and quality control. We resolve operational problems as they arise, keep investigators informed, and hand over a dataset that is ready when the science is.",
    },
  ],
};

/**
 * A project row in "Our record". Title, PI, sponsor and disease come from src/data/projects.ts
 * by slug; `name` / `sponsor` are display overrides where the page copy differs from that
 * file (pending the data fixes there being approved).
 */
export type RecordExample = { slug: string; name?: string; sponsor?: string };

export type RecordColumn = {
  key: ServiceKey;
  label: string;
  stat: { value: string; caption: string; verify?: boolean };
  blurb: string;
  seeAll: { label: string };
  examples: RecordExample[];
};

export const record = {
  eyebrow: "Our record",
  title: "A portfolio that has grown every year.",
  /** Rendered as "{before} <a>{linkLabel}</a>." */
  intro: {
    before:
      "Below, each service with a few of the projects and programs our team runs today. The full list is on",
    linkLabel: "Programs & Projects",
  },
  heroStat: {
    value: "29",
    caption:
      "active programs and projects in 2025, up from 10 in 2023, across 12+ departments, divisions, and programs.",
    verify: true,
    flag: "Confirm count",
  },
  examplesLabel: "A few examples",
  /** Rendered as "3 of N". */
  ofLabel: "of",
  footnote:
    "Many projects draw on more than one service; coordinators often deliver both clinical and biospecimen work, so category counts overlap.",
  awardsLink: { label: "Biospecimen pipeline awards" },
  columns: [
    {
      key: "bio",
      label: "Biospecimen & translational",
      stat: { value: "11", caption: "active biospecimen projects and biobanks", verify: true },
      blurb:
        "Pipelines that bring tissue, blood, and other samples from UCSF clinics to research labs and CoLabs.",
      seeAll: { label: "All biospecimen projects" },
      examples: [
        {
          slug: "rheumatoid-arthritis",
          name: "Rheumatoid Arthritis Biobank",
          sponsor: "ImmunoX CoProject",
        },
        { slug: "obesity-and-glp-1-biobank" },
        { slug: "prostate-cancer-biobank", sponsor: "Prostate tumor tissue" },
      ],
    },
    {
      key: "clinical",
      label: "Clinical research coordination",
      stat: {
        value: "15",
        caption: "studies with OCR coordinators in 2025, up from 4 in 2023",
        verify: true,
      },
      blurb:
        "Coordinators on clinical trials and human-subjects studies, from startup and consent through study visits.",
      seeAll: { label: "All coordinated studies" },
      examples: [
        { slug: "influenza" },
        { slug: "gi-crc" },
        { slug: "allergen-immunotherapy", sponsor: "ImmunoX CoProject" },
      ],
    },
    {
      key: "pm",
      label: "Project & program management",
      stat: {
        value: "5",
        caption: "active programs, including clinical research units we manage",
        verify: true,
      },
      blurb:
        "Managers running consortia, multi-project programs, and the operations of clinical research units.",
      seeAll: { label: "All managed programs" },
      examples: [
        {
          slug: "custom-discovery",
          name: "Custom Discovery for Cancer Initiative",
          sponsor: "Compassionate-use INDs",
        },
        {
          slug: "stanyan-and-hyde-hospitals-clinical-research-unit",
          name: "Stanyan & Hyde Hospitals Clinical Research Unit",
          sponsor: "UCSF Health",
        },
        {
          slug: "bronchiectasis-clinical-research-unit",
          sponsor: "Bronchiectasis & Pulmonary NTM program",
        },
      ],
    },
  ] satisfies RecordColumn[],
};

// Attributions are intentionally non-identifying. Do not add names, titles, or photos.
export const testimonials = {
  eyebrow: "Testimonials",
  verify: true, // assembled from published remarks; confirm wording and permission with each speaker
  flag: "Assembled from published remarks · confirm exact wording with each speaker before publishing",
  items: [
    {
      quote:
        "OCR engages with and supports the UCSF community. The ‘collaboration’ in its name reflects exactly what it does: connecting people and building interdisciplinary partnerships. I’ve come to see OCR as a source of innovation.",
      attribution: "UCSF faculty leader",
    },
    {
      quote:
        "OCR exemplifies what makes UCSF great. Grassroots organizations like OCR are essential to building a stronger, more connected research community.",
      attribution: "UCSF faculty member",
    },
  ],
};

export type StaffingColor = "teal" | "violet" | "magenta" | "gold" | "coral";

export const staffing = {
  eyebrow: "Our staffing model",
  title: "Experienced people, without the full-time hire.",
  lead: "Investigators and institutional partners work with our staff in whatever form fits the project. In every form, our staff join as part of the research team: they learn the science, stay with the project, and leave behind workflows the group can keep running.",
  forms: [
    {
      color: "teal",
      title: "Fractional effort on your project",
      body: "A coordinator or manager at the fraction of effort a single project needs, rather than a full-time position.",
    },
    {
      color: "violet",
      title: "Dedicated staff through grants or partnerships",
      body: "Staff supported by an award or an institutional partnership, embedded with your team for the life of the work.",
    },
    {
      color: "magenta",
      title: "Shared coordination across programs",
      body: "Coordinators who work across several related studies, so smaller projects get experienced coverage.",
    },
    {
      color: "gold",
      title: "Operational oversight for existing groups",
      body: "Senior coordinators who bring structure, supervision, and standard workflows to a clinical research unit you already have.",
    },
    {
      color: "coral",
      title: "Cross-functional support from OCR's other arms",
      body: "Data management, research development, and community management when the project calls for them.",
    },
  ] satisfies { color: StaffingColor; title: string; body: string }[],
};

export type TeamMember = {
  slug: string;
  name: string;
  credentials?: string;
  role: string;
  /** Primary service: portrait ring and role color. */
  ring: ServiceKey;
  /** Services the person delivers, shown as dots. */
  dots: ServiceKey[];
  bio: string;
  photo: string;
};

export const team = {
  eyebrow: "Our team",
  title: "Our project managers and coordinators",
  lead: "Six people who work across studies and programs, so each project gets experienced support at the effort it needs.",
  verify: true, // confirm roles and one-liners
  flag: "Verify roles before publishing",
  people: [
    {
      slug: "corey-rathe",
      name: "Corey Rathe",
      credentials: "MS",
      role: "Program Manager",
      ring: "pm",
      dots: ["pm"],
      bio: "Runs study startup, milestones, and operations across consortium projects. Keeps the work moving without losing the science.",
      photo: coreyImg,
    },
    {
      slug: "natalia-dikinov",
      name: "Natalia Dikinov",
      role: "Lead Senior Clinical Research Coordinator",
      ring: "pm",
      dots: ["bio", "clinical", "pm"],
      bio: "Senior CRC on autoimmune and inflammatory cohorts. IRB, consent, and chart abstraction.",
      photo: nataliaImg,
    },
    {
      slug: "ohnmar-chan",
      name: "Ohnmar Chan",
      role: "Senior Clinical Research Coordinator",
      ring: "clinical",
      dots: ["bio", "clinical"],
      bio: "Supports enrollment, consent, and day-to-day study operations across OCR clinical portfolios.",
      photo: ohnmarImg,
    },
    {
      slug: "francisco-quintanilla",
      name: "Francisco Quintanilla",
      role: "Senior Clinical Research Coordinator",
      ring: "clinical",
      dots: ["bio", "clinical"],
      bio: "Coordinates patient enrollment and biospecimen workflows across UCSF clinics.",
      photo: franciscoImg,
    },
    {
      slug: "lina-kamil",
      name: "Lina Kamil",
      credentials: "MPH",
      role: "Clinical Research Coordinator",
      ring: "clinical",
      dots: ["bio", "clinical"],
      bio: "Patient-facing coordination and study operations for human-subjects research.",
      photo: linaImg,
    },
    {
      slug: "olivia-murley",
      name: "Olivia Murley",
      role: "Clinical Research Coordinator",
      ring: "clinical",
      dots: ["bio", "clinical"],
      bio: "Coordinates participant visits, consent, and day-to-day study operations for OCR clinical portfolios.",
      photo: oliviaImg,
    },
  ] satisfies TeamMember[],
};

export const partners = {
  eyebrow: "Our partners",
  title: "Institutes, hospitals, and programs",
  lead: "Partners hold dedicated capacity on our team; other UCSF investigators are supported as bandwidth allows.",
  cta: { label: "Talk to us about partnership", to: "/contact" as const },
  items: [
    {
      name: "Bakar ImmunoX Initiative",
      meta: "Founding partner since 2023",
      href: "https://immunox.ucsf.edu/",
      services: ["bio", "clinical", "pm"],
    },
    {
      name: "UCSF Health Network",
      meta: "Partner since 2024 · on-site coordinator at Stanyan & Hyde Hospitals",
      href: "https://www.ucsfhealth.org/",
      services: ["clinical", "pm"],
    },
    {
      name: "Zuckerberg San Francisco General Hospital",
      meta: "Partner since 2025",
      href: "https://zuckerbergsanfranciscogeneral.org/",
      services: ["bio", "clinical"],
    },
    {
      name: "Program for Bronchiectasis and Pulmonary NTM",
      meta: "Partner since 2026 · clinical research unit",
      href: "https://pulmonary.ucsf.edu/patients/bronchiectasis-pulmonary-nontuberculous-mycobacterium",
      services: ["clinical", "pm"],
    },
    {
      name: "Program for Interstitial Lung Disease",
      meta: "Partner in 2026 · clinical research unit, completed",
      href: "https://pulmonary.ucsf.edu/care/lung_fibrosis",
      services: ["clinical", "pm"],
    },
  ] satisfies { name: string; meta: string; href: string; services: ServiceKey[] }[],
};

export const getStarted = {
  eyebrow: "Get started",
  title: "Discuss your research needs.",
  body: "You can bring us in at any point: early planning, study startup, an active study, or a program that is expanding or restructuring. The earlier the conversation, the more options we have.",
  partnerBlock: {
    label: "Institutes, departments, and hospitals",
    cta: "Talk to us about partnership",
    to: "/contact" as const,
  },
  card: {
    eyebrow: "Scoping conversation",
    title: "Scope a project with us",
    side: ["30 min", "Free"],
    selectLabel: "Where is your research right now?",
    placeholder: "Choose a stage",
    emptyHint:
      "Choose a stage and we'll tell you what is useful to bring to a first conversation or email.",
    includeLabel: "Helpful to include",
    /** Rendered as "{note} <a>{email}</a>". */
    note: "No protocol, budget, or IRB approval required · or email",
    email: "ocr@ucsf.edu",
  },
  /** The person every first conversation goes to, with their Microsoft Bookings page. */
  booking: {
    label: "You'll meet with",
    name: "Vincent Chan, PhD",
    role: "OCR Director",
    photo: vincentImg,
    button: "Book a time with Vincent",
    url: "https://bookings.cloud.microsoft/bookwithme/user/6f03d87cc5d9466085201515215922bc@ucsf.edu/meetingtype/djDh-ywfK0CFR__joKskWA2?anonymous&ismsaljsauthenabled&ep=mlink",
  },
  stages: [
    {
      key: "early",
      label: "Early planning",
      include:
        "The scientific question, the population or sample type, and whether you have a clinical collaborator yet.",
      button: "Email us about early planning",
      subject: "Scope a project: early planning",
    },
    {
      key: "startup",
      label: "Study startup",
      include: "Protocol status, sponsor or funding source, sites, and your target start date.",
      button: "Email us about study startup",
      subject: "Scope a project: study startup",
    },
    {
      key: "active",
      label: "Active research",
      include:
        "What the study needs more of (coordination, project management, data), current enrollment, and timeline.",
      button: "Email us about an active study",
      subject: "Scope a project: active research",
    },
    {
      key: "expand",
      label: "Program expansion or operational restructuring",
      include: "The unit or program, its current portfolio, and what is changing.",
      button: "Email us about your program",
      subject: "Scope a project: program expansion or restructuring",
    },
    {
      key: "other",
      label: "Other",
      include:
        "Whatever you can share: the research or program, what kind of support you think you need, and your timeline.",
      button: "Email us about your research",
      subject: "Scope a project",
    },
  ] satisfies { key: StageKey; label: string; include: string; button: string; subject: string }[],
};

export const arm = {
  name: "Research Operations & Management",
  short: "Launching, coordinating, and managing research",
  href: "/services/research-operations" as const,
};

export const mailto = (subject: string) =>
  `mailto:ocr@ucsf.edu?subject=${encodeURIComponent(subject)}`;
