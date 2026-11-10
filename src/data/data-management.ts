/**
 * Data Management page: all copy and data.
 * Mirrors the shape of src/data/research-operations.ts.
 *
 * `verbatim: true` in the comments marks copy supplied by the content owner; do not edit it.
 * `flag` strings are review annotations, rendered only while SHOW_REVIEW_FLAGS is true.
 */

import michelleImg from "@/assets/people/michelle-yu.jpg";
import bushraImg from "@/assets/people/bushra-samad.jpg";
import vincentImg from "@/assets/people/vincent-chan.jpg";
import { VINCENT_BOOKINGS_URL } from "@/data/research-operations";

export const SHOW_REVIEW_FLAGS = true;

/** Page accent (magenta fill). Text-on-light / on-dark variants live in styles.css. */
export const MAGENTA = "oklch(0.62 0.24 340)";
export const MAGENTA_TEXT = "oklch(0.5 0.2 340)";
export const MAGENTA_ONDARK = "oklch(0.68 0.16 340)";

export const arm = { name: "Data Management", path: "/services/data-management" };

export const meta = {
  title: "Data Management — UCSF OCR",
  description:
    "OCR helps investigators organize, manage, validate, integrate, and share research data, from data collection to research-ready datasets.",
};

/* Hero — verbatim */
export const hero = {
  eyebrow: "Data Management",
  headline: { lead: "From data collection to ", accent: "research-ready datasets." },
  lead: "OCR helps investigators organize, manage, validate, integrate, and share research data. From clinical studies and patient registries to biospecimen collections and collaborative research programs, we establish workflows that keep data accurate, connected, and ready for discovery.",
  pickerLabel: "What does your research need?",
  pickerEyebrow: "Start with the problem", // direction B only
};

export type CapabilityKey = "databases" | "quality" | "integration" | "sharing";

export type Deliverable = { text: string; flag?: string };

export type Capability = {
  key: CapabilityKey;
  num: string;
  name: string;
  /** Short label for the track and "Draws on" rows. */
  short: string;
  /** Uppercase kicker above the track stop (direction A). */
  kicker: string;
  tagline: string;
  /** Dot / border / tint color. */
  color: string;
  /** AA-contrast text version of `color` on white. */
  textColor: string;
  deliverables: Deliverable[];
};

/* Names, taglines, and deliverables are verbatim. short / kicker are new. */
export const capabilities: Capability[] = [
  {
    key: "databases",
    num: "01",
    name: "Research Databases & Registries",
    short: "Databases & registries",
    kicker: "Foundation",
    tagline: "Build a reliable foundation for your research.",
    color: "oklch(0.84 0.16 85)",
    textColor: "oklch(0.55 0.14 75)",
    deliverables: [
      { text: "Data collection workflows and data dictionaries" },
      { text: "Research database and registry planning", flag: "Confirm: planning vs. build" },
      { text: "Longitudinal participant and visit tracking" },
      { text: "Clinical and biospecimen metadata organization" },
      { text: "Data collection quality controls" },
    ],
  },
  {
    key: "quality",
    num: "02",
    name: "Data Quality & Management",
    short: "Quality & management",
    kicker: "Accuracy",
    tagline: "Keep your data accurate, complete, and consistent.",
    color: "oklch(0.7 0.2 30)",
    textColor: "oklch(0.5 0.18 30)",
    deliverables: [
      { text: "Data cleaning and validation" },
      { text: "Missing data and discrepancy reporting" },
      { text: "Quality assurance and quality control" },
      { text: "Longitudinal data reconciliation" },
      { text: "Routine data quality monitoring" },
    ],
  },
  {
    key: "integration",
    num: "03",
    name: "Data Integration & Preparation",
    short: "Integration & preparation",
    kicker: "Connection",
    tagline: "Turn fragmented information into usable datasets.",
    color: "oklch(0.62 0.24 340)",
    textColor: "oklch(0.5 0.2 340)",
    deliverables: [
      { text: "Dataset merging and harmonization" },
      { text: "Clinical and biospecimen data linkage" },
      { text: "Data transformation and standardization" },
      { text: "Cohort identification and data extraction", flag: "Confirm data sources" },
      { text: "Preparation of analysis-ready datasets" },
    ],
  },
  {
    key: "sharing",
    num: "04",
    name: "Data Management & Sharing",
    short: "Management & sharing",
    kicker: "Reuse",
    tagline: "Make your data ready to share, reuse, and build upon.",
    color: "oklch(0.72 0.16 290)",
    textColor: "oklch(0.48 0.18 285)",
    deliverables: [
      { text: "NIH Data Management & Sharing plans" },
      { text: "Data organization and documentation" },
      { text: "Metadata standards and data dictionaries" },
      { text: "De-identification and sharing preparation", flag: "Confirm scope" },
      { text: "Repository selection and submission coordination", flag: "Confirm scope" },
    ],
  },
];

export const capabilitiesSection = {
  eyebrow: "Our capabilities",
  title: "What we do with your data.",
  lede: "Each one stands on its own, and most projects use more than one. Together they carry data from the first form to a dataset someone else can reuse.",
  listLabel: "What you receive",
};

/* ───────── Need picker ─────────
 * Six prompts. Five map to one capability; the sixth spans all four.
 * Prompt wording 2, 3, 4, 6 was set by the content owner. All desc / facts / hint copy is new
 * and should be reviewed. */

export type Fact = { term: string; text: string; flag?: string };

export type Need = {
  key: string;
  chip: string;
  /** Capabilities lit on the track. One entry = the card shows that capability. */
  lit: CapabilityKey[];
  desc: string;
  facts: Fact[];
  /** Line under "Scope it with the team". */
  ctaHint: string;
  /** Only for the multi-capability need: overrides for the card header and deliverables. */
  override?: {
    num: string;
    name: string;
    tagline: string;
    /** [capability, deliverable index] pairs, shown with each capability's own dot color. */
    picks: [CapabilityKey, number][];
  };
};

/** Appended to every need's facts. */
export const costFact: Fact = {
  term: "Cost",
  text: "Scoped to the project and our capacity.",
  flag: "Confirm funding model",
};

/** Accent for the multi-capability need (page magenta). */
export const MULTI = {
  color: "oklch(0.62 0.24 340)",
  textColor: "oklch(0.5 0.2 340)",
  tintAlpha: 0.1,
};
/** Tint alpha for the "What you receive" panel on single-capability needs. */
export const PANEL_TINT_ALPHA = 0.14;

export const DEFAULT_NEED = "collection";

export const needs: Need[] = [
  {
    key: "collection",
    chip: "I'm setting up data collection",
    lit: ["databases"],
    desc: "For studies, registries, and collections that are about to start. We define what will be captured, how it is entered, and how it is checked, so the data are usable from the first record.",
    facts: [
      {
        term: "Good for",
        text: "New clinical studies, registries, cohorts, and biospecimen collections.",
      },
      { term: "When", text: "Before the first participant or sample, when possible." },
      {
        term: "You bring",
        text: "A protocol or study plan, and the questions the data must answer.",
      },
    ],
    ctaHint: "Bring your protocol or study plan.",
  },
  {
    key: "database",
    chip: "I need a database or registry built",
    lit: ["databases"],
    desc: "For teams that need a research database or registry to collect into. We plan its structure with you: the forms, the data dictionary, participant and visit tracking, and the checks built into data entry.",
    facts: [
      {
        term: "Good for",
        text: "New registries and cohorts, and studies moving off spreadsheets.",
      },
      {
        term: "When",
        text: "Before collection starts, or when the current setup no longer holds up.",
      },
      {
        term: "You bring",
        text: "What you need to capture, who enters it, and how it will be used.",
      },
    ],
    ctaHint: "Bring the forms or spreadsheets you use now.",
  },
  {
    key: "quality",
    chip: "I need my data checked for gaps or errors",
    lit: ["quality"],
    desc: "For studies with data already coming in. We check records against the rules they should follow, reconcile them across visits, and report what is missing or inconsistent so your team can correct it.",
    facts: [
      {
        term: "Good for",
        text: "Active studies and registries, and existing datasets that need cleaning.",
      },
      { term: "When", text: "Any time during an active study, or ahead of analysis." },
      {
        term: "You bring",
        text: "Access to the data and a description of how they were collected.",
      },
    ],
    ctaHint: "Bring a sample of the data and how they were collected.",
  },
  {
    key: "integration",
    chip: "I need data pulled or combined for a cohort or analysis",
    lit: ["integration"],
    desc: "For data spread across files, systems, or sites, and for cohorts that need to be identified and extracted. We merge and standardize the sources, link clinical records with specimen records, and produce one dataset built for the analysis you plan.",
    facts: [
      {
        term: "Good for",
        text: "Multi-source studies, biobanks with clinical data, and multi-site programs.",
      },
      { term: "When", text: "Before analysis, or when a new source is added." },
      { term: "You bring", text: "The sources involved and the analysis they need to support." },
    ],
    ctaHint: "Bring a list of the sources and the analysis planned.",
  },
  {
    key: "sharing",
    chip: "I need to share data or write a DMS plan",
    lit: ["sharing"],
    desc: "For proposals that need a Data Management & Sharing plan, and for datasets that are due to be shared. We write the plan with you, document the data, and prepare them for the repository.",
    facts: [
      { term: "Good for", text: "NIH applicants and funded studies with sharing commitments." },
      { term: "When", text: "At proposal stage for plans, and ahead of deadlines for sharing." },
      {
        term: "You bring",
        text: "Your aims and funder requirements, or the dataset to be shared.",
      },
    ],
    ctaHint: "Bring your aims and funder requirements.",
  },
  {
    key: "manager",
    chip: "I need a data manager for my study",
    lit: ["databases", "quality", "integration", "sharing"],
    desc: "For studies that need continuing data support and not a single task. A data manager joins your team at the effort the work needs and carries the data from collection through analysis and sharing.",
    facts: [
      { term: "Good for", text: "Studies and programs without a data manager of their own." },
      { term: "When", text: "From startup, or when the data outgrow what the team can manage." },
      {
        term: "You bring",
        text: "The study plan, the team involved, and how much support you expect to need.",
      },
    ],
    ctaHint: "Bring the study plan and the support you expect to need.",
    override: {
      num: "01–04",
      name: "A data manager for your study",
      tagline: "Continuing support across all four capabilities.",
      picks: [
        ["databases", 0],
        ["quality", 4],
        ["quality", 1],
        ["integration", 4],
        ["sharing", 1],
      ],
    },
  },
];

export const startHere = {
  eyebrow: "Start here", // rendered as "Start here · 01"
  listLabel: "What you receive",
  scopeTitle: "Scope it with the team",
  button: "Start the conversation",
  href: "#start",
  note: "No dataset or data dictionary required",
};

/* ───────── How we work ───────── stage titles are verbatim; labels, bodies, legends are new */
export const howWeWork = {
  eyebrow: "How we work",
  title: "Three stages across the life of your data.",
  lede: "The same sequence applies to a single-site study and a multi-institution program. We can join at any stage, including studies that are already collecting.",
  drawsOn: "Draws on",
  defaultStage: 1, // direction B opens on stage 02
  stages: [
    {
      n: "01",
      title: "Plan & Structure",
      label: "Before collection",
      drawsOn: ["databases"] as CapabilityKey[],
      body: "We learn what the study needs to answer, then define the data dictionary, collection workflow, visit schedule, and quality checks. You leave with a structure the whole team can collect against.",
      legend: "Every participant and visit has a defined place before collection begins.",
    },
    {
      n: "02",
      title: "Manage & Validate",
      label: "During the study",
      drawsOn: ["quality"] as CapabilityKey[],
      body: "As data arrive we clean and validate them, reconcile records across visits, and report missing data and discrepancies on a routine schedule, while problems are still small.",
      legend:
        "Collected visits are checked as they arrive. Discrepancies and missing visits are flagged and reported.",
    },
    {
      n: "03",
      title: "Prepare & Share",
      label: "Analysis and close-out",
      drawsOn: ["integration", "sharing"] as CapabilityKey[],
      body: "We merge and harmonize sources, link clinical and biospecimen records, and hand over documented, analysis-ready datasets, prepared for sharing where your funder requires it.",
      legend:
        "Records are reconciled, documented, and coded for sharing as one analysis-ready dataset.",
    },
  ],
};

/* ───────── Where we work ───────── names and bodies are verbatim; sources / result are new (B only) */
export const whereWeWork = {
  eyebrow: "Where we work",
  title: "The same capabilities, in four research settings.",
  lede: "These are applications of one service, not separate ones. What changes is the shape of the data.",
  becomes: "Becomes",
  drawsOn: "Draws on",
  settings: [
    {
      name: "Clinical Studies & Trials",
      drawsOn: ["databases", "quality", "integration"] as CapabilityKey[],
      body: "Managing participant information, study visits, clinical outcomes, and longitudinal datasets.",
      sources: ["Participant information", "Study visits", "Clinical outcomes"],
      result: "A longitudinal study dataset",
    },
    {
      name: "Patient Registries & Cohorts",
      drawsOn: ["databases", "quality", "integration"] as CapabilityKey[],
      body: "Organizing patient populations, tracking observations over time, and supporting cohort identification and research data extraction.",
      sources: ["Patient populations", "Observations over time", "Cohort criteria"],
      result: "A research data extract",
    },
    {
      name: "Biobanks & Biospecimen Collections",
      drawsOn: ["quality", "integration"] as CapabilityKey[],
      body: "Linking specimen information with clinical metadata, validating records, and supporting sample-based research.",
      sources: ["Specimen information", "Clinical metadata", "Validated records"],
      result: "A linked sample dataset",
    },
    {
      name: "Collaborative Research Programs",
      drawsOn: ["integration", "sharing"] as CapabilityKey[],
      body: "Standardizing datasets across investigators, studies, and institutions to support coordinated research and data sharing.",
      sources: ["Investigators", "Studies", "Institutions"],
      result: "A standardized, shareable dataset",
    },
  ],
};

/* ───────── Approach ───────── all new copy */
export const approach = {
  eyebrow: "Our approach",
  title: "Data managers who sit with your team.",
  lede: "Good data depend on the people who collect and use them. We work alongside investigators, coordinators, and project managers rather than downstream of them.",
  roles: [
    {
      who: "Investigators",
      how: "Define the questions the data must answer, and review what the data show along the way.",
    },
    {
      who: "Clinical research coordinators",
      how: "Collect and enter the data. We give them workflows, checks, and discrepancy reports they can act on.",
    },
    {
      who: "Project managers",
      how: "Track milestones. We report data completeness and quality on the same schedule.",
    },
    {
      who: "Analysts and collaborators",
      how: "Receive documented, analysis-ready datasets and the data dictionaries that explain them.",
    },
  ],
  boundary: {
    label: "Where this service stops",
    text: "Database engineering, LIMS implementation, EHR infrastructure, bioinformatics, and AI/ML are outside this service. When a project needs them, we coordinate with the UCSF groups that provide them.",
    flag: "Confirm wording",
  },
};

/* ───────── Team ───────── bios are from the site's People page */
export const team = {
  eyebrow: "Our team",
  title: "Our data managers",
  intro:
    "Two data managers work across OCR studies and programs. First conversations start with the director, who matches the project to the right person.",
  people: [
    {
      slug: "michelle-yu",
      name: "Michelle Yu",
      role: "Data Manager",
      bio: "Builds the databases, metadata schemas, and Data Management & Sharing plans behind every OCR study.",
      flag: "Bio from People page; confirm",
      photo: michelleImg,
    },
    {
      slug: "bushra-samad",
      name: "Bushra Samad",
      credentials: "MS",
      role: "Data Manager",
      bio: "Supports database design, data integrity, and sharing workflows for OCR-managed studies and consortium datasets.",
      flag: "Bio from People page; confirm",
      photo: bushraImg,
    },
  ],
};

/** Avatars in the hero "Scope it with the team" box (direction A). */
export const scopeAvatars = [
  { slug: "michelle-yu", photo: michelleImg },
  { slug: "bushra-samad", photo: bushraImg },
  { slug: "vincent-chan", photo: vincentImg },
];

/* ───────── Get started ───────── */
export const getStarted = {
  eyebrow: "Get started",
  title: "Discuss your data needs.",
  body: "You can bring us in at any point: before collection starts, during an active study, or when it is time to share. The earlier the conversation, the more options we have.",
  partner: {
    label: "Institutes, departments, and programs",
    button: "Talk to us about partnership",
    to: "/contact" as const,
  },
  card: {
    avatars: [
      { slug: "michelle-yu", photo: michelleImg },
      { slug: "bushra-samad", photo: bushraImg },
    ],
    eyebrow: "Scoping conversation",
    title: "Scope your data with us",
    meta: ["30 min", "Free"] as const,
    metaFlag: "Confirm",
    hostLabel: "You'll meet with",
    host: {
      slug: "vincent-chan",
      name: "Vincent Chan, PhD",
      role: "OCR Director",
      photo: vincentImg,
    },
    button: "Book a time with Vincent",
    /** Same booking link as Research Operations. */
    bookingHref: VINCENT_BOOKINGS_URL,
    bring:
      "Useful to bring: the kind of study, where the data live today, and what they need to be ready for.",
    note: "No dataset or data dictionary required",
    email: "ocr@ucsf.edu",
  },
};

/* ───────── Illustrations (all records are invented; label them "Illustrative") ───────── */

/** Direction A hero. Columns: participant, visit, visit date, specimen. */
export const ledgerRows = [
  {
    cells: ["P-0012", "Baseline", "03/04/24", "S-2291"],
    issue: "Date format",
    hotCol: 2,
    fixed: "2024-03-04",
    resolved: "Standardized",
  },
  {
    cells: ["p12", "Month 3", "2024-06-11", "S-2417"],
    issue: "ID mismatch",
    hotCol: 0,
    fixed: "P-0012",
    resolved: "Reconciled",
  },
  {
    cells: ["P-0031", "Baseline", "2024-03-09", "—"],
    issue: "Unlinked specimen",
    hotCol: 3,
    fixed: "S-2302",
    resolved: "Linked",
  },
  {
    cells: ["P-0031", "Month 3", "—", "S-2455"],
    issue: "Missing date",
    hotCol: 2,
    fixed: "—",
    resolved: "Query sent",
  },
  {
    cells: ["P-0047", "Baseline", "2024-03-15", "S-2310"],
    issue: "Duplicate entry",
    hotCol: 0,
    fixed: "P-0047",
    resolved: "Merged",
  },
];
export const ledgerHeads = ["Participant", "Visit", "Visit date", "Specimen", "Check"];

/** Direction B "How we work". One string per participant, one char per visit:
 *  f = collected, d = discrepancy, m = missing, n = not yet due. */
export const timeline = {
  participants: ["P-0012", "P-0031", "P-0047", "P-0058", "P-0063", "P-0071"],
  visits: ["Baseline", "Month 3", "Month 6", "Month 12"],
  visitsShort: ["BL", "M3", "M6", "M12"],
  matrix: ["ffff", "fdfm", "ffmn", "ffdn", "fmfn", "ffnn"],
};

/** Direction B hero toggle. */
export const field = {
  raw: { label: "As collected", caption: "Scattered, with gaps and flags" },
  ready: { label: "Research-ready", caption: "Organized, validated, connected" },
};

/* ───────── Lookups ───────── */

export const capabilityByKey = (key: CapabilityKey) => {
  const c = capabilities.find((x) => x.key === key);
  if (!c) throw new Error(`Unknown capability: ${key}`);
  return c;
};

export const needByKey = (key: string) => {
  const n = needs.find((x) => x.key === key);
  if (!n) throw new Error(`Unknown need: ${key}`);
  return n;
};

/** Accent color for a need: magenta when multi-capability, else the lit capability's color. */
export function needAccent(need: Need) {
  if (need.override) return MULTI;
  const c = capabilityByKey(need.lit[0]);
  return { color: c.color, textColor: c.textColor, tintAlpha: PANEL_TINT_ALPHA };
}

/** Card header + deliverable rows for the Start-here card. */
export function startHereContent(need: Need) {
  const accent = needAccent(need);
  if (need.override) {
    return {
      num: need.override.num,
      name: need.override.name,
      tagline: need.override.tagline,
      color: accent.color,
      textColor: accent.textColor,
      tintAlpha: accent.tintAlpha,
      deliverables: need.override.picks.map(([capKey, i]) => {
        const cap = capabilityByKey(capKey);
        const d = cap.deliverables[i];
        return { text: d.text, flag: d.flag, color: cap.color };
      }),
    };
  }
  const cap = capabilityByKey(need.lit[0]);
  return {
    num: cap.num,
    name: cap.name,
    tagline: cap.tagline,
    color: cap.color,
    textColor: cap.textColor,
    tintAlpha: accent.tintAlpha,
    deliverables: cap.deliverables.map((d) => ({
      text: d.text,
      flag: d.flag,
      color: cap.color,
    })),
  };
}

export function needFacts(need: Need): Fact[] {
  return [...need.facts, costFact];
}
