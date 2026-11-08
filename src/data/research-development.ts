// Content for the Research Development page (/services/research-development).
// Source of truth for copy and data. Moved from design_handoff_research_development/content.ts;
// photo paths were swapped for Vite asset imports, and the README-only copy (hero, section
// labels, booking) plus interim link destinations were appended at the bottom.
// Copy is final unless marked TODO. Colors are oklch; hex equivalents are in the handoff README.

import gabeImg from "@/assets/people/gabe-murphy.jpg";
import reidImg from "@/assets/people/reid-bolus.jpg";
import lindsayImg from "@/assets/people/lindsay-breithaupt.jpg";

export type ServiceId = "consult" | "aims" | "plan" | "peer" | "large";

export interface Service {
  id: ServiceId;
  name: string;
  /** Dot / accent hue (track dots, card top border, panel tint) */
  color: string;
  /** Darker text-safe variant of the hue (labels on light backgrounds) */
  textColor: string;
  when: string;
  who: string;
  format: string;
  /** Cost for everyone. */
  cost: string;
  /** Optional partner-institute benefit, rendered as: `${cost} Partner institutes: ${costPartner (lowercased first letter)}.` */
  costPartner?: string;
  description: string;
  /** One-line prompt shown in the booking box when this service is selected */
  ask: string;
}

/** Order = level of engagement, lightest to deepest. Do not sort by timing. */
export const services: Service[] = [
  {
    id: "consult",
    name: "Strategic consultations",
    color: "oklch(0.72 0.19 30)",
    textColor: "oklch(0.5 0.18 30)",
    when: "Anytime",
    who: "Any UCSF investigator",
    format: "One or more 30–60 minute conversations",
    cost: "Free",
    description:
      "A conversation about where you're headed: mapping your portfolio, scanning the funding landscape, and matching your next concept to the right mechanism. Many investigators start here with nothing more than an idea.",
    ask: "Bring an idea, even an early one.",
  },
  {
    id: "aims",
    name: "Specific aims review",
    color: "oklch(0.84 0.16 85)",
    textColor: "oklch(0.55 0.14 75)",
    when: "Early drafting",
    who: "Any UCSF investigator",
    format: "Iterative written feedback, quick turnarounds",
    cost: "Free, as capacity allows.",
    costPartner: "Priority support",
    description:
      "Fast, focused feedback on your Specific Aims page: is the premise clear, is the gap real, will a reviewer follow the logic? A quick way to course-correct before the full proposal takes shape.",
    ask: "Bring your draft aims page.",
  },
  {
    id: "plan",
    name: "Research plan review",
    color: "oklch(0.72 0.22 340)",
    textColor: "oklch(0.5 0.2 340)",
    when: "6 weeks out",
    who: "R01-scale applicants",
    format: "Six weeks of iterative reviews and editing, about 30 hours total",
    cost: "Fixed fee, as capacity allows.",
    costPartner: "Subsidized and/or dedicated priority support",
    description:
      "Six weeks of iterative editorial feedback on R01-scale applications: Specific Aims, Research Plan, biosketch, figures. Roughly 30 hours of work per proposal.",
    ask: "Best started six weeks before your deadline.",
  },
  {
    id: "peer",
    name: "Scientific peer review",
    color: "oklch(0.78 0.13 195)",
    textColor: "oklch(0.45 0.1 195)",
    when: "1 month out",
    who: "Early-career R01 applicants",
    format: "Senior UCSF faculty reviewer, by inquiry",
    cost: "Available to partner institutions",
    description:
      "Pairs investigators with senior UCSF faculty for a scientific pressure-test of the premise, Aims, and approach. Designed especially for early-career R01 applicants.",
    ask: "Tell us your study section and deadline.",
  },
  {
    id: "large",
    name: "Large grant development program",
    color: "oklch(0.72 0.16 290)",
    textColor: "oklch(0.48 0.18 285)",
    when: "2–3 months out",
    who: "P-, U-series and center grants",
    format: "Embedded strategist, concept to submission",
    cost: "Upfront fee, as capacity allows.",
    costPartner: "Dedicated strategist, or effort written into the grant",
    description:
      "Coordinated scientific programs that build institutional capability. Our strategists embed as part of the team from concept through submission, and OCR project managers, clinical research coordinators, and data managers can be written into the award.",
    ask: "Best started 2–3 months before the deadline.",
  },
];

export function serviceById(id: ServiceId): Service {
  return services.find((s) => s.id === id) ?? services[0];
}

export type StageId = "idea" | "aims" | "draft" | "center";

/** "Where are you?" picker. `primary` drives the Start-here card; `also` lights extra track dots. */
export const stages: { id: StageId; label: string; primary: ServiceId; also: ServiceId[] }[] = [
  { id: "idea", label: "I have a concept", primary: "consult", also: [] },
  { id: "aims", label: "I'm drafting my aims", primary: "aims", also: ["consult"] },
  { id: "draft", label: "I have a full draft", primary: "plan", also: ["peer", "consult"] },
  { id: "center", label: "I'm building a program or center", primary: "large", also: ["consult"] },
];

export const whatWeDo = {
  eyebrow: "What we do",
  heading: "We read your proposal the way a study section will.",
  intro:
    "Our strategists are trained scientists and practiced editors. We won't know your field the way you do, and that's the point. We read and revise as many times as a proposal needs, and our focus shifts as the deadline approaches: first the logic, then the structure, then the details.",
  passes: [
    {
      n: "01",
      when: "6+ weeks out",
      title: "The logic",
      body: "Does the background set up a real gap, does the hypothesis follow from it, and do the aims fairly test it? We also ask what you are assuming your reviewers already know.",
    },
    {
      n: "02",
      when: "3–4 weeks out",
      title: "The structure",
      body: "Can a reader follow the argument without digging? Figures that make their point at a glance, clean transitions, and lines rescued on one-page documents to make room for what matters.",
    },
    {
      n: "03",
      when: "About a week out",
      title: "The details",
      body: "Nothing left to trip a reviewer: consistent terminology and acronyms, uniform formatting, figure references that survived the edits, and tense that holds from first page to last.",
    },
  ],
};

export const record = {
  stats: [
    {
      value: "57",
      label: "full applications completed, including 31 still pending or under review",
    },
    { value: "94", label: "unique investigator engagements" },
    { value: "9.2/10", label: "average overall PI satisfaction" },
  ],
};

export type OcrProgram = "Research plan review" | "Large grant development program";

/**
 * award: USD over the life of the current funding period, from NIH RePORTER (Nov 2026).
 * Awarded years are summed as reported; years not yet awarded are projected at the most
 * recent annual award through the project end date. RePORTER does not publish out-year
 * commitments, so replace with Notice of Award totals if OCR has them.
 * The headline total renders only when every award is known.
 */
export const grants: {
  mech: string;
  kind: string;
  ic: string;
  title: string;
  pis: string;
  url: string;
  /** Budget start of the award on NIH RePORTER (YYYY-MM-DD); orders the featured list. */
  awarded: string;
  award: number | null;
}[] = [
  {
    mech: "R24",
    kind: "Resource grant",
    ic: "NIAID",
    title: "FAST-TB: Accelerating TB regimen development",
    pis: "Payam Nahid & Radojka Savic",
    url: "https://reporter.nih.gov/project-details/11412163",
    awarded: "2026-06-08",
    award: 17_496_830, // 5 budget years × $3,499,366 (FY26 award)
  },
  {
    mech: "P30",
    kind: "New center grant",
    ic: "NIDDK",
    title: "UCSF Type 1 Diabetes Research Center",
    pis: "Mark Anderson & Gregory Ku",
    url: "https://reporter.nih.gov/project-details/11121266",
    awarded: "2025-09-01",
    award: 8_395_461, // FY25 $1,835,461 + FY26 $1,640,000, plus 3 years at $1,640,000
  },
  {
    mech: "P30",
    kind: "Center grant renewal",
    ic: "NIDDK",
    title: "UCSF Nutrition Obesity Research Center",
    pis: "Christian Vaisse",
    url: "https://reporter.nih.gov/project-details/11350322",
    awarded: "2026-08-20",
    award: 6_150_000, // 5 budget years × $1,230,000 (FY26 award)
  },
  {
    mech: "R01",
    kind: "Research grant renewal",
    ic: "NHLBI",
    title: "Predicting and preventing drug metabolism by the human gut microbiome",
    pis: "Peter Turnbaugh",
    url: "https://reporter.nih.gov/project-details/11447313",
    awarded: "2026-09-05",
    award: 3_279_992, // 4 budget years × $819,998 (FY26 award)
  },
  {
    mech: "R01",
    kind: "Research grant",
    ic: "NIAMS",
    title: "Uncovering the fundamental biology of neonatal Tregs in skin",
    pis: "Tiffany Scharschmidt & Michael Rosenblum",
    url: "https://reporter.nih.gov/project-details/11319891",
    awarded: "2026-09-10",
    award: 2_869_330, // 5 budget years × $573,866 (FY26 award)
  },
  {
    mech: "R01",
    kind: "Research grant",
    ic: "NIAID",
    title: "Biophysical constraints on antibody affinity maturation to SARS-CoV-2",
    pis: "Angela Phillips",
    url: "https://reporter.nih.gov/project-details/11293150",
    awarded: "2026-02-19",
    award: 4_078_810, // 5 budget years × $815,762 (FY26 award)
  },
  {
    mech: "K24",
    kind: "Mid-career mentoring award",
    ic: "NIAID",
    title: "Mentoring in infectious disease and global health clinical research",
    pis: "Michelle Hsiang",
    url: "https://reporter.nih.gov/project-details/11452101",
    awarded: "2026-09-01",
    award: 1_038_440, // 5 budget years × $207,688 (FY26 award)
  },
  {
    mech: "R01",
    kind: "Research grant",
    ic: "NIAMS",
    title: "Endogenous retroviruses in autoimmunity",
    pis: "Judith Ashouri",
    url: "https://reporter.nih.gov/project-details/11130765",
    awarded: "2025-07-01",
    award: 2_544_228, // FY25 $527,760 + FY26 $504,117, plus 3 years at $504,117
  },
];

/** R01 → Research plan review; R24 and P-series → Large grant development program; others → TODO */
export function programFor(mech: string): OcrProgram | null {
  if (mech === "R01") return "Research plan review";
  if (mech === "R24" || mech.startsWith("P")) return "Large grant development program";
  // TODO (OCR open item 2): which OCR program supported the K24 (Hsiang) grant?
  return null;
}

/** Mechanism color family used on grant rows */
export const grantType = (mech: string) =>
  mech.startsWith("P")
    ? { color: "oklch(0.72 0.16 290)", text: "oklch(0.48 0.18 285)" }
    : mech === "R01"
      ? { color: "oklch(0.72 0.22 340)", text: "oklch(0.5 0.2 340)" }
      : mech === "R24"
        ? { color: "oklch(0.78 0.13 195)", text: "oklch(0.45 0.1 195)" }
        : { color: "oklch(0.84 0.16 85)", text: "oklch(0.55 0.14 75)" }; // K

/** `$1.2M` / `$850K` / `$900` */
export function formatMoney(v: number): string {
  if (v >= 1e6) return "$" + (v / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
  if (v >= 1e3) return "$" + Math.round(v / 1e3) + "K";
  return "$" + v;
}

/**
 * Sum of `grants[].award`. `complete` is true only when every award is known;
 * the headline figure shows a `$XXM` placeholder until then.
 */
export function awardTotal() {
  const known = grants.filter((g) => g.award != null);
  const total = known.reduce((sum, g) => sum + (g.award ?? 0), 0);
  return {
    total,
    known: known.length,
    count: grants.length,
    complete: known.length === grants.length && grants.length > 0,
  };
}

export const testimonials = {
  featured: {
    quote: "The process not only improved my grant, it taught me to be a better writer.",
    attribution: "Research plan review participant, 2025",
  },
  more: [
    {
      quote: "I just heard back from my R01 — it received a fundable score.",
      attribution: "R01 applicant, UCSF",
    },
    {
      quote:
        "This service is invaluable. I hope it continues and expands so more of the community can benefit.",
      attribution: "Large grant development program PI",
    },
  ],
};

export type PartnerId = "immunox" | "dc" | "ighs" | "iha" | "neuro";

export const partners: { id: PartnerId; name: string; since: string; url: string }[] = [
  {
    id: "immunox",
    name: "Bakar ImmunoX Initiative",
    since: "Founding partner since 2023",
    url: "https://immunox.ucsf.edu/",
  },
  {
    id: "dc",
    name: "Diabetes Center",
    since: "Partner since 2024",
    url: "https://diabetes.ucsf.edu/",
  },
  {
    id: "ighs",
    name: "Institute for Global Health Sciences",
    since: "Partner since 2025",
    url: "https://globalhealthsciences.ucsf.edu/",
  },
  {
    id: "iha",
    name: "Institute for Health and Aging",
    since: "Partner since 2026",
    url: "https://iha.ucsf.edu/",
  },
  {
    id: "neuro",
    name: "Mechanisms of Neurological Disorders",
    since: "Partner since 2026",
    url: "https://neurology.ucsf.edu/mechanisms-neurological-disorders",
  },
];

export type Strategist = {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string | null;
  linkedin?: string;
  color: string;
  textColor: string;
  partners: PartnerId[];
  hintExtra?: string;
};

// TODO (OCR open item 5): confirm which strategist covers the Institute for Health and Aging, if not Lindsay.
export const strategists: Strategist[] = [
  {
    id: "gabe",
    name: "Gabe Murphy, PhD",
    role: "Senior research development strategist",
    bio: "Neuroscientist and research strategist specializing in grant development, scientific writing, and strategic communication.",
    photo: gabeImg,
    linkedin: "https://www.linkedin.com/in/gabe-murphy-3a4918108/",
    color: "oklch(0.72 0.16 290)",
    textColor: "oklch(0.48 0.18 285)",
    partners: ["immunox", "ighs", "neuro"],
  },
  {
    id: "reid",
    name: "Reid Bolus, PhD",
    role: "Research development strategist",
    bio: "Biomedical scientist and research strategist with expertise in immunology, metabolism, diabetes, and collaborative grant development.",
    photo: reidImg,
    linkedin: "https://www.linkedin.com/in/reidbolus/",
    color: "oklch(0.72 0.22 340)",
    textColor: "oklch(0.5 0.2 340)",
    partners: ["dc", "ighs"],
  },
  {
    id: "lindsay",
    name: "Lindsay Breithaupt, MPH",
    role: "Research development strategist",
    bio: "Experienced grantwriter and global health strategist with a track record of successful funding and complex research collaborations.",
    photo: lindsayImg,
    linkedin: "https://www.linkedin.com/in/lindsay-breithaupt/",
    color: "oklch(0.78 0.13 195)",
    textColor: "oklch(0.45 0.1 195)",
    partners: ["ighs", "iha"],
  },
  {
    id: "open",
    name: "Open position",
    role: "Research development strategist",
    bio: "Will support the Institute for Global Health Sciences and a new partner, and help develop the Grantwriting Academy. We are hiring.",
    photo: null,
    color: "oklch(0.84 0.16 85)",
    textColor: "oklch(0.55 0.14 75)",
    partners: ["ighs"],
    hintExtra: "a new partner (pending), and help develop the Grantwriting Academy",
  },
];

export const inDevelopment = [
  {
    title: "Grantwriting Academy",
    body: "A workshop series translating our day-to-day work into training, from first-R21 cohorts to the mechanics of biosketches, budgets and data management plans.",
    dot: "oklch(0.78 0.13 195)",
  },
  {
    title: "AI research development tools",
    body: "Tools that augment, not replace, experienced strategists: pre-flight diagnostics for draft proposals, and funding intelligence that matches investigators to opportunities.",
    dot: "oklch(0.84 0.16 85)",
  },
];

/* ───────── Copy that lives in the handoff README rather than content.ts ───────── */

export const hero = {
  eyebrow: "Research development",
  /** Rendered as "From first concept to <coral>award.</coral>" */
  title: "From first concept to",
  titleAccent: "award.",
  intro:
    "We find the right opportunity, sharpen the rationale and promise of the work, and shape submissions that compete.",
  picker: "Where are you?",
  startHere: "Start here",
  booking: {
    title: "Talk it through with a strategist",
    openings: "Next openings",
    button: "Book a free 30-minute consult",
    caption: "The consult is free · no draft required",
  },
};

export const recordCopy = {
  eyebrow: "Our record",
  heading: "Our track record so far.",
  /** `{n}` is replaced with the number of grants listed. */
  caption: "in grants awarded since 2024",
  fundedHeading: "Recently funded with our support",
  allGrants: "All grants funded with our support",
};

export const teamCopy = {
  team: {
    eyebrow: "Our team",
    heading: "Our strategists",
    intro: "Scientists who happen to write.",
  },
  partners: {
    eyebrow: "Our partners",
    heading: "Our partner institutes",
    intro:
      "We work closely with partner institutes to understand their faculty, research priorities, and portfolios.",
    button: "Talk to us about partnership",
  },
  hint: "Hover or click a strategist to see the institutes they support.",
};

export const booking = {
  eyebrow: "Get started",
  /** Rendered as "Book a free <nowrap>30-minute</nowrap> consult." */
  heading: { before: "Book a free", nowrap: "30-minute", after: "consult." },
  body: "The earlier we engage, the more we can add, and the next federal deadline is closer than you think.",
  institutesLabel: "Institutes and departments",
  partnershipButton: "Talk to us about partnership",
  card: {
    eyebrow: "Strategic consultation",
    title: "Meet a strategist",
    meta: ["30 min", "Free"],
    instituteLabel: "Which institute are you with?",
    institutePlaceholder: "Choose your institute",
    nonPartner: "Not with a partner institute",
    prompt: "Choose your institute and we'll match you with your strategist and their calendar.",
    youllMeet: "You'll meet with",
    nonPartnerNote: "Handles inquiries from outside our partner institutes",
    requestTime: (firstName: string) => `Request a time with ${firstName}`,
    openInNewTab: "Open the booking page in a new tab",
    caption: "No deadline or draft required · or email",
    email: "ocr@ucsf.edu",
  },
};

/* ───────── Consult routing ─────────
 * Which strategist a consult goes to, by the requester's partner institute. Everyone else,
 * including non-partner inquiries, goes to the fallback. */
export type InstituteChoice = PartnerId | "none";

export const consultRouting: { byPartner: Partial<Record<PartnerId, string>>; fallback: string } = {
  byPartner: { dc: "reid" },
  fallback: "gabe",
};

/**
 * Each strategist's personal Microsoft Bookings (Book with me) consult page, embedded in the
 * card. While a URL is null, the card offers an email request to that strategist instead.
 */
export const bookingPages: Record<string, string | null> = {
  gabe: "https://bookings.cloud.microsoft/bookwithme/user/847fb6868990452d97471d83492e2e70@ucsf.edu/meetingtype/PX0cE2GHJE6zFY1nwezOVA2?anonymous&ismsaljsauthenabled",
  reid: "https://bookings.cloud.microsoft/bookwithme/user/2ce8321b32f149e6ae0aa4ce23ce9985@ucsf.edu/meetingtype/QA-BBBgJ3UCEMnWizf-1GA2?anonymous&ismsaljsauthenabled",
};

export function strategistFor(choice: InstituteChoice): Strategist {
  const id =
    choice === "none"
      ? consultRouting.fallback
      : (consultRouting.byPartner[choice] ?? consultRouting.fallback);
  return strategists.find((s) => s.id === id) ?? strategists[0];
}

export const inDevelopmentCopy = {
  eyebrow: "In development",
  heading: "What we're building next.",
  intro:
    "Two offerings our team is building now, designed to work alongside the services above. Ask us about either.",
  label: "In development",
  button: "Get notified",
};

/* ───────── Link destinations ─────────
 * TODO (OCR open items 3 & 4): these are interim targets. Replace with the scheduler URL and
 * the real pages for "All grants funded with our support", "Get notified" and
 * "Talk to us about partnership" once they exist. */
const mail = (subject: string) => `mailto:ocr@ucsf.edu?subject=${encodeURIComponent(subject)}`;

export const links = {
  /** Consult buttons jump to the booking card, which routes to the right strategist's calendar. */
  bookConsult: "#book",
  consultRequest: (strategistName: string, institute: string | null) =>
    mail(`Consult request: ${strategistName}${institute ? ` (${institute})` : ""}`),
  /** TODO: destination for "All grants funded with our support". */
  allGrants: mail("Grants funded with OCR support"),
  /** TODO: destination for "Talk to us about partnership" (currently the site contact page). */
  partnership: "/contact" as const,
  /** TODO: destination for "Get notified" (e.g. newsletter signup). */
  notify: (topic: string) => mail(`Notify me: ${topic}`),
};

/**
 * Placeholder openings shown in the booking UI so the design can be reviewed.
 * TODO (OCR open item 3): replace with live scheduler data, or hide the chips before launch.
 */
export const placeholderOpenings = {
  chips: ["Tue 10:00", "Wed 2:30", "Thu 9:30"],
};
