/**
 * Research Resources & AI Tools: page copy and app records.
 * Generated from the design prototype (design_handoff_ai_tools/prototype/ai-tools-v2.dc.html).
 * Copy is final; items to confirm are in `notes` (render only in dev/preview builds) and in the
 * TODO (open item N) comments below, numbered as in design_handoff_ai_tools/README.md §Open items.
 */
import prosperaMark from "@/assets/marks/mark-prospera.svg";
import signalMark from "@/assets/marks/mark-signal.svg";
import runwayMark from "@/assets/marks/mark-runway.svg";
import atlasMark from "@/assets/marks/mark-atlas.svg";
import { VINCENT_BOOKINGS_URL } from "./research-operations";

export type AppKey = "prospera" | "signal" | "runway" | "atlas";
/** The three applications that get a card and a console vignette (Atlas has its own section). */
export type CardKey = Exclude<AppKey, "atlas">;
// TODO (open item 4): "released" is designed (clean card, no grid) but no app uses it yet.
export type Maturity = "development" | "beta" | "released";

export interface AppRecord {
  key: AppKey;
  /** "01" | "02" | "03"; Atlas is the foundation and shows "—". */
  n: string;
  name: string;
  /** Plain statement of what the app is and who it is for (hero index, drawer eyebrow). */
  role: string;
  /** Card eyebrow after the number, e.g. "Funding opportunity matching for research development strategists". */
  subtitle: string;
  status: string;
  maturity: Maturity;
  /** Eligibility pill on the card. */
  eligibility: string;
  host: string;
  /** Empty for Atlas (internal service, no public URL). */
  url: string;
  mark: string;
  /** Fill for the mark disc (sunburst hue) and the matching text-safe variant. */
  fill: string;
  text: string;
  /** Fraunces line on the card. */
  cardHeadline: string;
  /** Card paragraph. */
  cardBody: string;
  /** Three bullets shown on the card. */
  cardBullets: string[];
  /** Fraunces line in the drawer. */
  headline: string;
  body: string;
  activities: string[];
  facts: { k: string; v: string }[];
  askLabel: string;
  askSubject: string;
}

export const mailto = (subject: string) =>
  `mailto:ocr@ucsf.edu?subject=${encodeURIComponent(subject)}`;

/** "Beta · signal.ucsf.edu": hero index, drawer header. */
export const statusLine = (a: AppRecord) => `${a.status} · ${a.host}`;

// TODO (open item 3): confirm the prospera|signal|runway.ucsf.edu hosts and URLs before launch.
export const apps: AppRecord[] = [
  {
    key: "prospera",
    n: "01",
    name: "Prospera",
    role: "Funding opportunity matching, for research development strategists",
    subtitle: "Funding opportunity matching for research development strategists",
    status: "In development",
    maturity: "development",
    eligibility: "UCSF only · one workspace per team",
    host: "prospera.ucsf.edu",
    url: "https://prospera.ucsf.edu/",
    mark: prosperaMark,
    fill: "var(--violet)",
    text: "var(--violet-text)",
    cardHeadline: "Finds the federal funding notices that fit each investigator, and shows why.",
    cardBody:
      "Every new federal notice, graded against what each investigator has actually published, held, and run. Every grade carries its evidence and the constraint holding it back, so a strategist moves from notice to outreach in minutes.",
    cardBullets: [
      "Nightly sync of Simpler.Grants.gov and NIH Guide notices, with saved searches",
      "Fit graded Strong, Moderate, Exploratory, or Can't assess, with what is missing",
      "Outreach tracking and reports by community: surfaced, sent, submitted, funded",
    ],
    headline: "Funding that fits, with the reasons why.",
    body: "Prospera reads each new federal notice and grades its fit against an investigator's record: Strong, Moderate, Exploratory, or Can't assess. Every grade carries the evidence it rests on and the constraint holding it back, so a strategist moves from notice to outreach in minutes, and a program manager sees the whole community's pipeline.",
    activities: [
      "Nightly sync of notices from Simpler.Grants.gov and the NIH Guide, with saved searches",
      "A Discover queue sorted by deadline, each notice with suggested investigators",
      "Fit graded Strong, Moderate, Exploratory, or Can't assess, with the evidence and what is missing",
      "Outreach tracking: who was contacted, who replied, and the next step",
      "Reports by community: surfaced, triaged, sent, submitted, funded",
      "Investigator profiles enriched from PubMed, NIH RePORTER, ClinicalTrials.gov, ORCID, UCSF Profiles, and biosketches",
    ],
    facts: [
      { k: "For whom", v: "Research development strategists and program managers." },
      {
        k: "Reads",
        v: "Simpler.Grants.gov and NIH Guide notices; PubMed, NIH RePORTER, ClinicalTrials.gov, ORCID, UCSF Profiles, and biosketches for investigators.",
      },
      { k: "Access", v: "UCSF only. One workspace per team, sign-in required." },
      { k: "Status", v: "In development, in use by OCR's research development team." },
    ],
    askLabel: "Request a workspace",
    askSubject: "Prospera: request a workspace",
  },
  {
    key: "signal",
    n: "02",
    name: "Signal",
    role: "Research news monitoring and digests, for community managers",
    subtitle: "Research news monitoring and monthly digests for community managers",
    status: "Beta",
    maturity: "beta",
    eligibility: "UCSF only · one workspace per community",
    host: "signal.ucsf.edu",
    url: "https://signal.ucsf.edu/",
    mark: signalMark,
    fill: "var(--teal)",
    text: "var(--teal-text)",
    cardHeadline:
      "Tracks what your community publishes, wins, and says, then drafts the monthly digest.",
    cardBody:
      "Signal watches PubMed, NIH awards, UCSF news, and social feeds for everyone on your watchlist and queues each item for a one-click review. From the approved set it drafts the copy and assembles the monthly digest. An afternoon instead of a week.",
    cardBullets: [
      "Nightly discovery across PubMed, NIH RePORTER, UCSF News, X, and Bluesky",
      "Review queue with bulk approve, archive, and duplicate merging",
      "Newsletter, donor, and social copy drafted from what you approve",
    ],
    headline: "What your community published, won, and said this month.",
    body: "Signal watches PubMed, NIH awards, UCSF news, and social feeds for the people on your watchlist and queues each item for a one-click review. From the approved set it drafts newsletter, donor, and social copy, then assembles the monthly digest. The month's roundup takes an afternoon instead of a week.",
    activities: [
      "Nightly discovery across PubMed, NIH RePORTER, UCSF News, X, and Bluesky for everyone on the watchlist",
      "A review queue with filters, bulk approve and archive, and duplicate merging",
      "Newsletter, donor, social, and concise copy drafted for any approved item",
      "A monthly digest assembled from the approved set, with cover and visuals",
      "A dashboard of community research activity and a collaboration landscape",
      "One workspace per community, with its own social publishing credentials",
    ],
    facts: [
      { k: "For whom", v: "Community managers and administrative assistants." },
      {
        k: "Watches",
        v: "PubMed, NIH RePORTER, UCSF News, X, and Bluesky, plus anything you add by hand.",
      },
      {
        k: "Access",
        v: "UCSF only. One workspace per community, each with its own watchlist and social credentials.",
      },
      { k: "Status", v: "Beta. New community workspaces by request." },
    ],
    askLabel: "Request a workspace",
    askSubject: "Signal: request a workspace",
  },
  {
    key: "runway",
    n: "03",
    name: "Runway",
    role: "Payroll runway planning, for investigators and their analysts",
    subtitle: "Payroll runway planning for investigators and their analysts",
    status: "Beta",
    maturity: "beta",
    eligibility: "UCSF only · investigator accounts by request",
    host: "runway.ucsf.edu",
    url: "https://runway.ucsf.edu/",
    mark: runwayMark,
    fill: "var(--coral)",
    text: "var(--coral-text)",
    cardHeadline: "Shows how many months of payroll each person and account has left.",
    cardBody:
      "Upload the Payroll Funding Report your analyst already runs. Runway turns it into each person's funding over time, the months of payroll left on every account, and one plain sentence naming who needs attention first. Projected figures look projected.",
    cardBullets: [
      "Imports the Payroll Funding, Net Position, and Position Salary .xlsx reports as received",
      "Months of payroll remaining per account and per person, actual and planned",
      "A private workspace per investigator; analyst access granted and revoked by the investigator",
    ],
    headline: "How long your funding lasts, by person and by account.",
    body: "Upload the Payroll Funding Report your analyst already runs. Runway turns it into each person's funding over time, the months of payroll left on every account, and one plain sentence naming who needs attention first. Projected figures look projected: marked ~, hatched, and explained on hover. A planning layer for the ten-second read, not a system of record.",
    activities: [
      "Imports Payroll Funding, Net Position, and Position Salary reports as the .xlsx files you already receive",
      "Distributions: each person's funding by month, actual and planned, with planned hires",
      "Projections and runway: months of payroll remaining per account and per person",
      "A dashboard verdict naming who needs attention and whether funding or a burn cut is needed",
      "Projected figures marked ~, hatched, and explained on hover; period closure always stated",
      "A private workspace per investigator; analyst access granted and revoked by the investigator",
    ],
    facts: [
      { k: "For whom", v: "Investigators and the financial analysts who support them." },
      { k: "Reads", v: "Payroll Funding, Net Position, and Position Salary reports (.xlsx)." },
      {
        k: "Access",
        v: "UCSF only. A private workspace per investigator, shared with an analyst only when the investigator grants it, and revocable at any time.",
      },
      { k: "Status", v: "Beta. Investigator accounts by request." },
    ],
    askLabel: "Request access",
    askSubject: "Runway: request access",
  },
  {
    key: "atlas",
    n: "—",
    name: "Atlas",
    role: "The verified investigator record underneath all three",
    subtitle: "The verified investigator record underneath all three",
    status: "In development",
    maturity: "development",
    eligibility: "Internal service",
    host: "internal service",
    url: "",
    mark: atlasMark,
    fill: "var(--amber)",
    text: "var(--amber-text)",
    cardHeadline: "",
    cardBody: "",
    cardBullets: [],
    headline: "The record every tool rests on.",
    body: "Atlas resolves who an investigator is from institutional evidence, then attributes publications, NIH grant families, and clinical trials to the right individual. Every decision is recorded with its source, and unresolved is a valid result: a gap stays visible instead of being filled in. Verified profiles flow from Atlas into Prospera, Signal, and Runway, so a fit, a signal, and a roster all rest on the same record.",
    activities: [
      "Resolves identity from institutional directories, ORCID, and UCSF Profiles before anything is attributed",
      "Attributes publications, NIH grant families, and clinical trials to the verified person",
      "Captures lab and institutional websites and biosketch evidence",
      "Records every decision with its source and keeps an audit trail",
      "Delivers versioned evidence snapshots to a connected app, or exports with a compatibility manifest",
      "Leaves gaps visible: unresolved is a valid, reportable result",
    ],
    facts: [
      {
        k: "For whom",
        v: "Backend developers. The applications read from it; people rarely open it.",
      },
      {
        k: "Resolves",
        v: "Identity, publications, NIH grant families, clinical trials, lab and institutional websites, and biosketch evidence.",
      },
      {
        k: "Delivers",
        v: "Versioned evidence snapshots to a connected app, or exports with a compatibility manifest.",
      },
      { k: "Status", v: "In development. A 33-investigator pilot cohort is under review." },
    ],
    askLabel: "Talk to us about connecting an app",
    askSubject: "Atlas: connect an application",
  },
];

export const appByKey = (key: AppKey) => apps.find((a) => a.key === key)!;

// TODO (open item 5): nav and footer links point at the existing routes; this page adds no new routes.
export const hero = {
  eyebrowArm: "04",
  eyebrowLabel: "One of five service arms",
  title: "Software for the people",
  titleAccent: "who run research.",
  intro:
    "Three applications and the record they share, built in-house at OCR for our own strategists, community managers, and investigators, and opened to UCSF research communities one workspace at a time.",
  primary: { label: "See the applications", href: "#apps" },
  secondary: { label: "Book a walkthrough", href: "#start" },
  tertiary: { label: "Have an idea for a tool?", href: "#open-build" },
};

export const applicationsIntro = {
  eyebrow: "The applications",
  title: "Three applications, one record.",
  lead: "Each began as a bottleneck in our own work: the notice a strategist missed, the digest that took a week, the funding cliff nobody saw coming. We built the tool, ran it on our own portfolio, and now open it to UCSF research communities one workspace at a time.",
  legend: {
    label: "Maturity",
    development: "In development: blueprint grid, dashed edge",
    beta: "Beta: grid fading",
    released: "Released: clean",
  },
  details: "Full details",
  open: (name: string) => `Open ${name}`,
  /** Accessible name for the whole-card buttons and hero index rows. */
  openDetails: (name: string) => `${name}: open details`,
  activitiesLabel: "What it does",
  closeLabel: "Close details",
  // TODO (open item 2): vignette content is illustrative; keep this footer or swap in redacted real data.
  illustrative: "Illustrative · not live data",
};

export const atlasSection = {
  eyebrow: "The foundation",
  title: "Atlas: the record all three read from.",
  cta: "How Atlas works",
  tagline: "Identity · Research · Evidence",
  sources: [
    "PubMed",
    "NIH RePORTER",
    "ClinicalTrials.gov",
    "ORCID",
    "UCSF Profiles",
    "Institutional directories",
  ],
};

/** Reads the `ai-tools` award from src/data/funding.ts; only the framing lives here. */
export const openBuild = {
  fundingId: "ai-tools",
  eyebrow: "Funding & support",
  // TODO (open item 1): "Open Build" is a working name (alternatives: Tool Wishlist, Build Request,
  // Commissions). funding.ts `short` still reads "AI Tools Open Call"; align both.
  name: "Open Build",
  cta: "Propose a tool",
  figureTitle: "We build your tool",
  accessLabel: "Open to all of UCSF",
  readMore: "Read the full call in Funding",
  href: "/funding/ai-tools",
  officialPrefix: "Official title:",
};

export const websites = {
  /** Shows the $5k lab figure; false swaps it for "Fixed fee". */
  showPrice: true,
  hidePriceLabel: "Fixed fee",
  eyebrow: "Also from this arm",
  title: "A website for your lab or program.",
  intro:
    "This site and the applications above were built in-house. We offer the same to UCSF labs and programs: a clear, fast site you own, handed over with what you need to keep it current.",
  cta: { label: "Inquire about a website", href: mailto("Website inquiry: lab or program site") },
  lab: {
    label: "Lab website",
    price: "$5k",
    priceNote: "fixed fee",
    body: "About 30 hours of work: design, build, launch, and handoff. Research, people, publications, and contact, on your domain.",
  },
  program: {
    label: "Program or institute website",
    price: "By inquiry",
    body: "Scoped to the program: more sections, more people, and the structure a center or institute needs as it grows. Estimate after a scoping conversation.",
  },
};

export const getStarted = {
  eyebrow: "Get started",
  title: "See a tool on your own work.",
  intro:
    "Every application is UCSF-only and opened one workspace at a time. Thirty minutes is enough to walk through a tool, see whether it fits your team, and tell us what it should do that it doesn't yet.",
  partnership: {
    lead: "Institutes, departments, and programs:",
    label: "talk to us about partnership →",
    href: mailto("Partnership inquiry"),
  },
  card: {
    eyebrow: "Walkthrough",
    title: "See a tool with us",
    meta: ["30 min", "Free"],
    meetLabel: "You'll meet with",
    name: "Vincent Chan, PhD",
    role: "OCR Director",
    book: "Book a time with Vincent",
    bookHref: VINCENT_BOOKINGS_URL,
    footer: "No data or account required · or email",
    email: "ocr@ucsf.edu",
  },
};

/** Review notes: render only in dev/preview builds. */
export const notes = [
  'Confirm the working name "Open Build" for the funding call (alternatives considered: Tool Wishlist, Build Request, Commissions). The funding.ts `short` field still says "AI Tools Open Call".',
  "Vignette content (notice IDs, queue items, account numbers) is illustrative. Keep the 'Illustrative · not live data' footer or replace with screenshots of real redacted data.",
  "Prospera, Signal, and Runway hosts and URLs assumed; confirm before launch.",
  "Websites price ($5k) is shown by default; the prototype has a toggle to hide it.",
  "The 'Released' maturity state is designed (clean card, no grid) but no app uses it yet.",
];
