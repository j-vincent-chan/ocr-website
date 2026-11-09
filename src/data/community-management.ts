/**
 * Community & Enrichment Programs page copy and records.
 * Ported from design_handoff_community_programs/design/Community & Enrichment Programs v2.dc.html
 * (`SVC`, `STOPS`, `NEEDS`, `EXAMPLES`, `MONTHS`, `TEAM`, `PARTNERS`). Copy is final.
 * Person → partner assignments and the MONTHS calendar are provisional (handoff README).
 */
import xochitlImg from "@/assets/people/xochitl-vargas.jpg";
import jonathanImg from "@/assets/people/jonathan-wilson.jpg";
import vincentImg from "@/assets/people/vincent-chan.jpg";
import newsletterImg from "@/assets/channels/newsletter.png";
import blogImg from "@/assets/channels/blog.png";
import vlogImg from "@/assets/channels/vlog.png";
import socialImg from "@/assets/channels/social.png";
import { OPEN_POSITIONS } from "@/components/site/open-positions";
import { VINCENT_BOOKINGS_URL } from "./research-operations";

export type ServiceId = "build" | "events" | "comms" | "program";
export type NeedId = "launch" | "enrichment" | "engage" | "events" | "comms" | "trainees";
export type PartnerId = "immunox" | "parnassus" | "diabetes" | "iha";
export type TeamId = "xochitl" | "jonathan" | "open";
export type AccentKey = ServiceId | "arm";

export interface Service {
  n: string;
  color: string;
  text: string;
  kicker: string;
  name: string;
  label: string;
  track: string;
  headline: string;
  body: string;
  activities: string[];
  facts: [string, string][];
  cta: [string, string];
}

export const mailto = (subject: string) =>
  `mailto:ocr@ucsf.edu?subject=${encodeURIComponent(subject)}`;

/** Lime arm accent (need chips and "you are here"). Matches `--lime` / `--lime-text`. */
export const ARM = { color: "oklch(0.82 0.18 130)", text: "oklch(0.46 0.12 130)" } as const;

export const SVC: Record<ServiceId, Service> = {
  build: {
    n: "01",
    color: "oklch(0.7 0.2 30)",
    text: "oklch(0.5 0.18 30)",
    kicker: "People",
    name: "Community building & engagement",
    label: "community building & engagement",
    track: "Community",
    headline: "Turn a membership into a community.",
    body: "We help PIs build and sustain active research communities: finding the faculty who should know each other, giving them recurring reasons to meet, and measuring whether the community is actually working.",
    activities: [
      "Launch a new research community, consortium, or collaborative network",
      "Identify and connect faculty with shared research interests",
      "Develop strategies for engaging faculty, trainees, and collaborators",
      "Establish recurring community activities: seminars, research forums, networking",
      "Reengage inactive members and attract new participants",
      "Support community advisory groups and steering committees",
      "Assess community needs through surveys and listening sessions",
      "Establish measures of participation and impact; report to leadership and funders",
    ],
    facts: [
      ["For whom", "PIs, center directors, and program leads with a community to build or revive"],
      ["When", "At launch, when engagement stalls, or ahead of a renewal"],
      ["Structure", "An engagement strategy and program calendar, run by an OCR community manager"],
      [
        "Cost",
        "Scoped to the community's size and our capacity. Staff effort on the grant or an institutional agreement.",
      ],
    ],
    cta: ["Scope an engagement plan", "Scope a community program: community building & engagement"],
  },
  events: {
    n: "02",
    color: "oklch(0.84 0.16 85)",
    text: "oklch(0.55 0.14 75)",
    kicker: "Convenings",
    name: "Events & scientific programming",
    label: "events & scientific programming",
    track: "Events",
    headline: "Turn scientific ideas into engaging experiences.",
    body: "Symposia, retreats, seminar series, journal clubs, and networking events, planned and run so your scientific organizers can focus on the program rather than the logistics.",
    activities: [
      "Organize scientific symposia, retreats, conferences, and workshops",
      "Coordinate seminar series, journal clubs, and research-in-progress meetings",
      "Develop agendas, identify speakers, and manage invitations",
      "Coordinate logistics, registration, venues, catering, and vendors",
      "Organize networking events and scientific mixers",
      "Support hybrid and virtual scientific events",
      "Evaluate event attendance, satisfaction, and impact",
    ],
    facts: [
      ["For whom", "Any UCSF investigator or program organizing scientific events"],
      ["When", "Three to six months ahead for a symposium or retreat; any time for a series"],
      ["Structure", "An OCR event lead working with your scientific organizers"],
      [
        "Cost",
        "Scoped to the event. Staff effort on the program budget or grant; direct costs pass through.",
      ],
    ],
    cta: ["Scope an event", "Scope a community program: events & scientific programming"],
  },
  comms: {
    n: "03",
    color: "oklch(0.78 0.13 195)",
    text: "oklch(0.45 0.1 195)",
    kicker: "Visibility",
    name: "Communications & outreach",
    label: "communications & outreach",
    track: "Communications",
    headline: "Reach the audiences your program needs.",
    body: "Websites, newsletters, spotlights, social media, and the messaging and materials that make a research program recognizable inside and outside UCSF, kept current on a publishing calendar.",
    activities: [
      "Develop communication and outreach strategies",
      "Create and maintain research program websites",
      "Produce newsletters, announcements, and community updates",
      "Promote research accomplishments, publications, and funding opportunities",
      "Manage social media and digital communications",
      "Develop program branding, messaging, and promotional materials",
      "Create faculty and trainee spotlights",
      "Maintain community directories and mailing lists",
    ],
    facts: [
      ["For whom", "Research programs, centers, and initiatives with members and stakeholders to reach"],
      ["When", "At launch, or whenever the channels you have have gone quiet"],
      ["Structure", "Content and channel management by a community manager, on a publishing calendar"],
      [
        "Cost",
        "Scoped to the channels and cadence. Staff effort on the program budget or grant.",
      ],
    ],
    cta: ["Scope a communications plan", "Scope a community program: communications & outreach"],
  },
  program: {
    n: "04",
    color: "oklch(0.72 0.16 290)",
    text: "oklch(0.48 0.18 285)",
    kicker: "Programs & partners",
    name: "Program & partnership development",
    label: "program & partnership development",
    track: "Programs & awards",
    headline: "Launch initiatives and keep them running.",
    body: "We help PIs launch and operate research initiatives and connect them to the people and partners they need: program calendars, committees and working groups, internal awards and trainee programs, onboarding, outcome tracking, and introductions within and beyond UCSF.",
    activities: [
      "Launch new scientific programs, centers, and initiatives",
      "Develop program calendars and engagement plans",
      "Coordinate faculty working groups and committees",
      "Administer internal funding opportunities, awards, and recognition programs",
      "Coordinate trainee development and mentorship programs",
      "Support onboarding of new community members",
      "Track participation and program outcomes",
      "Identify potential collaborators within and beyond UCSF and facilitate introductions",
      "Coordinate joint programming with partner organizations, scientific societies, and external institutions",
      "Connect investigators to institutional resources and services",
    ],
    facts: [
      [
        "For whom",
        "PIs and directors launching or running centers, consortia, institutes, and training programs",
      ],
      ["When", "Before launch where possible; also for programs already running"],
      ["Structure", "A community manager embedded with leadership, at fractional or dedicated effort"],
      [
        "Cost",
        "Scoped to the program and our capacity. Typically written into the award or supported by the sponsoring institute.",
      ],
    ],
    cta: ["Scope a program", "Scope a community program: program & partnership development"],
  },
};

export const STOPS: ServiceId[] = ["build", "events", "comms", "program"];

export function accent(key: AccentKey): { color: string; text: string } {
  return key === "arm" ? ARM : SVC[key];
}

export interface Need {
  key: NeedId;
  chip: string;
  color: AccentKey;
  lit: ServiceId[];
  title: string;
  subtitle?: string;
  body: string;
  also: ServiceId[];
  facts: [string, string][];
  hint: string;
}

export const NEEDS: Need[] = [
  {
    key: "launch",
    chip: "I'm launching a program or center",
    color: "program",
    lit: ["program", "build"],
    title: "Program & partnership development",
    body: "We help you stand up the initiative: an engagement plan and program calendar, member recruitment and onboarding, launch programming, working groups and committees, and the partnerships that extend the community beyond its founding members.",
    also: ["build", "events"],
    facts: [
      ["When", "Before launch, ideally while the proposal or charter is being written."],
      ["For whom", "PIs and directors launching centers, consortia, institutes, and collaborative networks."],
      ["Structure", "A community manager embedded with the leadership team, at fractional or dedicated effort."],
      [
        "Cost",
        "Scoped to the program and our capacity. Typically written into the award or supported by the sponsoring institute.",
      ],
    ],
    hint: "Tell us the initiative, who the members are, and when you launch.",
  },
  {
    key: "engage",
    chip: "Our members rarely interact",
    color: "build",
    lit: ["build", "events"],
    title: "Community building & engagement",
    body: "We find out why and change it: listening sessions and surveys, introductions between faculty with shared interests, recurring forums where members actually meet, and outreach to the members who have gone quiet. Then programming that gives people a reason to show up.",
    also: ["events"],
    facts: [
      [
        "When",
        "Whenever engagement has stalled, and before a renewal that will ask what the community produced.",
      ],
      ["For whom", "Consortia, centers, and program leads whose members rarely interact."],
      ["Structure", "An engagement strategy and program calendar, run by an OCR community manager."],
      [
        "Cost",
        "Scoped to the community's size and our capacity. Staff effort on the grant or an institutional agreement.",
      ],
    ],
    hint: "Tell us who the members are and what you have tried.",
  },
  {
    key: "events",
    chip: "We're planning a symposium, retreat, or seminar series",
    color: "events",
    lit: ["events"],
    title: "Events & scientific programming",
    body: "End to end: agenda, speakers and invitations, registration, venue, catering, vendors, and hybrid logistics, with promotion before and evaluation after. A single symposium or a year-round series.",
    also: ["comms"],
    facts: [
      ["When", "Three to six months ahead for a symposium or retreat; any time for a seminar series."],
      ["For whom", "Any UCSF investigator or program organizing scientific events."],
      ["Structure", "An OCR event lead, with your scientific organizers setting the program."],
      [
        "Cost",
        "Scoped to the event. Staff effort on the program budget or grant; direct costs pass through.",
      ],
    ],
    hint: "Tell us the format, the audience, and the target date.",
  },
  {
    key: "comms",
    chip: "We need a newsletter, website, or more visibility",
    color: "comms",
    lit: ["comms"],
    title: "Communications & outreach",
    body: "We build the channels and keep them fed: a program website, newsletters and announcements, faculty and trainee spotlights, social media, and promotion of publications and funding opportunities, with directories and mailing lists kept current.",
    also: ["build"],
    facts: [
      ["When", "At launch, or when the channels you have have gone quiet."],
      [
        "For whom",
        "Research programs, centers, and initiatives that need to reach their members and the wider institution.",
      ],
      ["Structure", "Content and channel management by a community manager, on a publishing calendar."],
      ["Cost", "Scoped to the channels and cadence. Staff effort on the program budget or grant."],
    ],
    hint: "Tell us the audiences you need to reach and what exists today.",
  },
  {
    key: "trainees",
    chip: "Our trainees need a community of their own",
    color: "program",
    lit: ["program", "events", "build"],
    title: "Trainee development & mentorship programs",
    body: "Programs that give trainees a community of their own: mentorship pairings, professional development workshops, trainee-led organizations with a budget and a calendar, and a place on the program at retreats and seminars. We run them for ImmunoX trainees and its T32.",
    also: ["events", "build"],
    facts: [
      ["When", "Any time; a new training grant or T32 renewal is a natural starting point."],
      [
        "For whom",
        "Program directors, T32 PIs, and centers whose graduate students and postdocs rarely meet.",
      ],
      ["Structure", "Community manager effort shared with the program's other activities."],
      [
        "Cost",
        "Scoped to the program and our capacity. Staff effort on the training grant, center grant, or institutional support.",
      ],
    ],
    hint: "Tell us how many trainees, and what they have asked for.",
  },
  {
    key: "enrichment",
    chip: "Our enrichment program could do more",
    color: "arm",
    lit: ["program", "events", "comms"],
    title: "Enrichment program management",
    subtitle: "for P30 and other center grants",
    body: "The enrichment section, staffed: seminar and showcase series, writing retreats and thematic events, pilot & feasibility calls with post-award follow-up, NIH policy and funding updates for members, and an RPPR assembled from a year of tracked outcomes. Running today for the Diabetes Center's DRC and NORC P30s.",
    also: ["program", "events", "comms"],
    facts: [
      [
        "When",
        "Ideally while the application is written, so the effort is in the budget; also at any point in an active award.",
      ],
      [
        "For whom",
        "Enrichment Directors and administrators of P30, P50, U54, and institute-level centers.",
      ],
      ["Structure", "Partial community manager effort budgeted into the Enrichment or Administrative Core."],
      [
        "Cost",
        "Written into the grant as staff effort; scoped to the center's commitments and our capacity.",
      ],
    ],
    hint: "Tell us what the grant promised and when the next RPPR is due.",
  },
];

/** Chip order in the hero need picker. */
export const CHIP_ORDER: NeedId[] = [
  "launch",
  "enrichment",
  "engage",
  "events",
  "comms",
  "trainees",
];

export function needByKey(key: NeedId): Need {
  return NEEDS.find((n) => n.key === key) ?? NEEDS[0];
}

/** Example activities for each service area; illustrative, not exhaustive. */
export const EXAMPLES: Record<ServiceId, string[]> = {
  build: [
    "Onboarding sessions for new members",
    "Community funds for member-led collaborations",
    "Trainee-led organizations with a budget and a calendar",
    "Working groups around emerging priorities",
    "Member surveys and listening sessions",
    "Re-engaging members who have gone quiet",
  ],
  events: [
    "Seminar series and journal clubs",
    "Annual retreats with lightning talks",
    "Courses and mini-courses",
    "Scientific writing retreats",
    "Core showcases and thematic one-day events",
    "Mixers and co-hosted social events",
  ],
  comms: [
    "Newsletters on a publishing calendar",
    "Blog and member spotlights",
    "Vlogs and audio clips from seminars and retreats",
    "Social media accounts",
    "Program websites, directories, and mailing lists",
    "Funding opportunity and NIH policy digests",
  ],
  program: [
    "Pilot & Feasibility awards, with post-award follow-up toward R01 and R21",
    "T32 training program support",
    "Directors' meetings and committee coordination",
    "Core service assessment with Core Directors",
    "Annual RPPR assembled from tracked outcomes",
    "Introductions to collaborators and campus leadership",
  ],
};

export interface Month {
  k: string;
  m: string;
  name: string;
  items: [ServiceId, string][];
}

/** An illustrative program year (September start). Still under content review. */
export const MONTHS: Month[] = [
  {
    k: "sep",
    m: "Sep",
    name: "September",
    items: [
      ["events", "Seminar series opens for the year"],
      ["build", "New member onboarding sessions"],
      ["comms", "Newsletter relaunch; directory and mailing lists updated"],
    ],
  },
  {
    k: "oct",
    m: "Oct",
    name: "October",
    items: [
      ["program", "Pilot & Feasibility call opens"],
      ["events", "Core Showcase I: what the cores offer and how to use them"],
      ["comms", "Funding opportunity digest: fall deadlines"],
    ],
  },
  {
    k: "nov",
    m: "Nov",
    name: "November",
    items: [
      ["events", "Journal club and research-in-progress talks"],
      ["build", "Trainee-led organizations set their year"],
      ["program", "Directors' meeting: priorities for the year"],
    ],
  },
  {
    k: "dec",
    m: "Dec",
    name: "December",
    items: [
      ["events", "Year-end community mixer"],
      ["comms", "Member spotlights: the year's papers, grants, and awards"],
    ],
  },
  {
    k: "jan",
    m: "Jan",
    name: "January",
    items: [
      ["program", "Pilot & Feasibility applications due; review panels recruited"],
      ["comms", "NIH policy update workshop and follow-up consultations"],
    ],
  },
  {
    k: "feb",
    m: "Feb",
    name: "February",
    items: [
      ["program", "Pilot & Feasibility awards announced"],
      ["build", "Listening sessions with members who have gone quiet"],
    ],
  },
  {
    k: "mar",
    m: "Mar",
    name: "March",
    items: [
      ["events", "Scientific writing retreat"],
      ["program", "Working groups convene around emerging priorities"],
    ],
  },
  {
    k: "apr",
    m: "Apr",
    name: "April",
    items: [
      ["events", "Annual retreat with lightning-talk sessions"],
      ["comms", "Retreat recap: vlog, audio clips, and social media"],
    ],
  },
  {
    k: "may",
    m: "May",
    name: "May",
    items: [
      ["events", "Thematic one-day event on a cross-cutting topic"],
      ["program", "Trainee career development workshop"],
      ["comms", "Funding opportunity digest: summer deadlines"],
    ],
  },
  {
    k: "jun",
    m: "Jun",
    name: "June",
    items: [
      ["program", "RPPR assembled from the year's tracked attendance, awards, and outcomes"],
      ["build", "Member survey: participation and needs"],
    ],
  },
  {
    k: "jul",
    m: "Jul",
    name: "July",
    items: [
      ["program", "Post-award research development with pilot awardees toward R01 and R21"],
      ["events", "Mini-course"],
    ],
  },
  {
    k: "aug",
    m: "Aug",
    name: "August",
    items: [
      ["program", "Next year's calendar set against the grant's commitments"],
      ["build", "Member portfolio analysis refreshed"],
      ["comms", "Website refreshed for the new year"],
    ],
  },
];

export interface TeamMember {
  id: TeamId;
  name: string;
  role: string;
  bio: string;
  photo: string | null;
  applyHref?: string;
  color: string;
  text: string;
  partners: PartnerId[];
}

export const TEAM: TeamMember[] = [
  {
    id: "jonathan",
    name: "Jonathon Wilson",
    role: "Community manager",
    bio: "Educational administration and financial support for T32 training programs, courses, events, and initiatives.",
    photo: jonathanImg,
    color: "oklch(0.7 0.2 30)",
    text: "oklch(0.5 0.18 30)",
    partners: ["immunox", "parnassus", "diabetes"],
  },
  {
    id: "xochitl",
    name: "Xochitl Vargas",
    role: "Community manager",
    bio: "Program administration and operational support for the ImmunoDiverse trainee organization.",
    photo: xochitlImg,
    color: "oklch(0.62 0.24 340)",
    text: "oklch(0.5 0.2 340)",
    partners: ["immunox"],
  },
  {
    id: "open",
    name: "Open position",
    role: "Community manager",
    bio: "End-to-end community manager for the Bakar ImmunoX Initiative.",
    photo: null,
    applyHref: OPEN_POSITIONS.immunoxCommunityManager.href,
    color: "oklch(0.82 0.18 130)",
    text: "oklch(0.46 0.12 130)",
    partners: ["immunox"],
  },
];

export interface Partner {
  id: PartnerId;
  name: string;
  since: string;
  url: string;
}

export const PARTNERS: Partner[] = [
  {
    id: "immunox",
    name: "Bakar ImmunoX Initiative",
    since: "Since 2018",
    url: "https://immunox.ucsf.edu/",
  },
  {
    id: "parnassus",
    name: "Parnassus Institutes",
    since: "Since 2024 · Directors' meetings, campus leadership, community fund, social events",
    url: "https://immunox.notion.site/Parnassus-Institutes-adfc1c14869f4300964ac0f52ca49f3f",
  },
  {
    id: "diabetes",
    name: "UCSF Diabetes Center",
    since: "Since 2025 · DRC and NORC P30 enrichment programs",
    url: "https://diabetes.ucsf.edu/",
  },
  {
    id: "iha",
    name: "Center for Health and Community",
    since: "Since 2026 · Events & scientific programming",
    url: "https://iha.ucsf.edu/",
  },
];

export const hero = {
  eyebrow: "Community & Enrichment Programs",
  title: "From a member list to a",
  titleAccent: "connected research community.",
  intro:
    "Community managers who build, engage, and sustain research communities: launching initiatives, running seminars, retreats, and award programs, keeping members informed, and connecting investigators across departments and institutions. We built the playbook for ImmunoX; we now run it for other UCSF communities.",
  picker: "What does your community need?",
  startHere: "Start here",
  alsoDrawsOn: "Also draws on",
  booking: {
    title: "Scope it with the team",
    button: "Start the conversation",
    caption: "No charter, budget, or grant required",
    href: "#contact",
  },
  avatars: [
    { src: jonathanImg, name: "Jonathon Wilson" },
    { src: xochitlImg, name: "Xochitl Vargas" },
    { src: vincentImg, name: "Vincent Chan" },
  ],
};

export const playbookCopy = {
  eyebrow: "The playbook",
  heading: "What a community manager runs.",
  lede: "Four areas of work, all running today for UCSF research communities. Open one for examples.",
  exampleLabel: "For example",
  exampleFootnote: "Examples, not a complete list. Each engagement is scoped with you.",
  more: "Full capability list",
};

export const programYearCopy = {
  eyebrow: "A program year",
  heading: "Built backward from the progress report.",
  lede: "A community is renewed on what it can show. We set the year against the grant's commitments, run it on a calendar leadership can see, and track outcomes from the first seminar so the report writes itself. Select a month.",
  onTheCalendar: "On the calendar",
  everyMonth: "Every month",
  standing: [
    { color: "oklch(0.84 0.16 85)", text: "Seminar series and journal club" },
    { color: "oklch(0.78 0.13 195)", text: "Newsletter, website, and social media" },
    { color: "oklch(0.72 0.16 290)", text: "Directors' meeting and committee coordination" },
    { color: "oklch(0.7 0.2 30)", text: "Member introductions, onboarding, and follow-ups" },
  ],
  legend: [
    { color: "oklch(0.7 0.2 30)", label: "Community" },
    { color: "oklch(0.84 0.16 85)", label: "Events" },
    { color: "oklch(0.78 0.13 195)", label: "Communications" },
    { color: "oklch(0.72 0.16 290)", label: "Programs & awards" },
  ],
  note: "An illustrative composite of the ImmunoX and Diabetes Center program years. Your calendar is set against your grant's commitments and reporting dates.",
};

export const channelsCopy = {
  eyebrow: "Channels we produce",
  heading: "A community that hears from itself.",
  lede: "No other OCR arm publishes. For ImmunoX we write, film, record, and post: each channel is a route back into the community, where a spotlight becomes a seminar invitation and a newsletter item becomes a pilot application.",
  figures: [
    {
      src: newsletterImg,
      title: "Newsletters",
      body: "Papers, funding, events, and spotlights, to members on a schedule.",
    },
    {
      src: blogImg,
      title: "Blog & spotlights",
      body: "Faculty and trainee spotlights, written for a general scientific audience.",
    },
    {
      src: vlogImg,
      title: "Vlogs & audio clips",
      body: "Short video and audio from seminars, retreats, and member interviews.",
    },
    {
      src: socialImg,
      title: "Social media",
      body: "Institute accounts that carry papers, awards, and events to the wider field.",
    },
  ],
};

export const teamCopy = {
  team: {
    eyebrow: "Our team",
    heading: "Our community managers",
    intro:
      "Community managers sit inside OCR, so a partner funding a fraction of one still gets the templates, award workflows, and channels built across every community we run.",
  },
  partners: {
    eyebrow: "Our partners",
    heading: "Our partner communities",
    intro: "The research communities we run today, each on its own calendar and against its own grant's commitments.",
    button: "Talk to us about partnership",
  },
  applyLabel: "Apply",
  hint: "Hover or click a community manager to see the communities they support.",
};

export const whereThisFits = {
  eyebrow: "Where this arm fits",
  heading: "People and programming, not project management.",
  lede: "Community management owns the people, relationships, engagement, and programming of a research community. The scientific and operational management of research projects belongs to OCR's Research Operations & Management arm. On a large award, the two work side by side.",
  label: "One P01, three arms",
  youAreHere: "You are here",
  arms: [
    {
      key: "rd",
      dot: "oklch(0.7 0.2 30)",
      linkColor: "oklch(0.545 0.185 30)",
      label: "Research development",
      title: "The application",
      body: "Concept, aims, and the proposal that wins the award, with the community engagement section drafted from programs we already run.",
      to: "/services/research-development" as const,
    },
    {
      key: "ro",
      dot: "oklch(0.78 0.13 195)",
      linkColor: "oklch(0.495 0.105 195)",
      label: "Research operations & management",
      title: "The deliverables",
      body: "Milestones, budgets, regulatory work, and the day-to-day coordination that gets the science done.",
      to: "/services/research-operations" as const,
    },
    {
      key: "here",
      dot: "oklch(0.82 0.18 130)",
      linkColor: null,
      label: "Community & enrichment programs",
      title: "The community",
      body: "Scientific retreats, investigator networking, communications, and the collaborative programming that turns a project team into a community.",
      to: null,
    },
  ],
};

export const waysToEngage = {
  eyebrow: "Four ways to engage",
  heading: "Scaled to the community, not the other way around.",
  lede: "The same team, four shapes. Most partners start with one and grow into another as the community does.",
  inPractice: "In practice",
  models: [
    {
      n: "01",
      color: "oklch(0.84 0.16 85)",
      text: "oklch(0.515 0.145 85)",
      title: "Partial effort on a center grant",
      body: "A share of an OCR community manager, budgeted into the Enrichment or Administrative Core, runs the program on the grant's calendar and produces the reporting the center requires.",
      chips: ["Diabetes Center DRC", "Diabetes Center NORC"],
    },
    {
      n: "02",
      color: "oklch(0.7 0.2 30)",
      text: "oklch(0.545 0.185 30)",
      title: "Embedded full-time community manager",
      body: "A dedicated person hired through OCR and placed inside the community: owning the retreat, the seminar series, the newsletter, the award programs, and the relationships.",
      chips: ["Bakar ImmunoX Initiative"],
    },
    {
      n: "03",
      color: "oklch(0.78 0.13 195)",
      text: "oklch(0.495 0.105 195)",
      title: "Shared coordination across institutes",
      body: "One manager working across several institutes or programs, so each gets experienced coverage and the group gets a common calendar, a shared fund, and a voice with campus leadership.",
      chips: ["Parnassus Institutes"],
    },
    {
      n: "04",
      color: "oklch(0.72 0.16 290)",
      text: "oklch(0.48 0.18 285)",
      title: "Written into the grant with you",
      body: "Before the application goes in, OCR drafts the enrichment or community engagement section and budget with the Enrichment Director, using programs we already run as the evidence base. When the award lands, the plan is already staffed.",
      chips: ["P30 & P50 centers", "U54 & program projects", "Institute-level centers"],
    },
  ],
};

export const ctaCopy = {
  eyebrow: "Enrichment programs",
  title: "Writing a center grant?",
  titleAccent: "Talk to us before the Enrichment section.",
  subtitle:
    "Whether you are drafting a P30, renewing one, launching a new initiative, or trying to make an existing community actually run, tell us what you promised and we'll scope the community manager effort to deliver it.",
  email: "ocr@ucsf.edu",
  primaryLabel: "Book a 30-min consult →",
  primaryHref: VINCENT_BOOKINGS_URL,
};

export const drawerCopy = {
  capabilities: "Capabilities",
  close: "Close details",
  talk: "Talk to us",
  talkHref: "#contact",
};

export const links = {
  partnership: "/contact" as const,
};
