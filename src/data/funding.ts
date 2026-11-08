/**
 * Funding & Support: opportunities, partners, display order, and sprite mapping.
 * Generated from the design prototype (design_handoff_funding/Funding.dc.html).
 * Copy is final and verbatim; flagged items are in OPEN_ITEMS.md. Drop in as src/data/funding.ts.
 */
export type SupportKind = "cash" | "staff" | "review";
export type PartnerKey = "parnassus" | "immunox";
export type MotifKey =
  | "rings"
  | "dotsphere"
  | "polesphere"
  | "dotsquare"
  | "helix"
  | "polepole"
  | "fullhoop"
  | "polesquare"
  | "orbit";

export interface FundingPartner {
  key: PartnerKey;
  name: string;
  initials: string;
  blurb: string;
  /** Empty until the partner has a public site; the hub hides the link when empty. */
  href: string;
  linkLabel: string;
}

export interface FundingOpportunity {
  id: string;
  short: string;
  official: string;
  owner: "ocr" | "partner";
  partner?: PartnerKey;
  partnerName: string;
  restricted: boolean;
  restrictedTo: string;
  sponsor: string;
  color: string;
  ink: string;
  tint: string;
  figure: string;
  figureNote: string;
  need: string;
  oneLiner: string;
  amount: string;
  who: string;
  deadline: string;
  tag: string;
  status: string;
  headA: string;
  headB: string;
  lead: string;
  facts: [string, string][];
  applyLabel: string;
  applyHref: string;
  links: { label: string; href: string }[];
  contactName?: string;
  contactRole?: string;
  contactEmail?: string;
  contactInitials?: string;
  providesTitle?: string;
  provides?: { t: string; d: string }[];
  spot?: {
    eyebrow: string;
    title: string;
    min: string;
    intro: string;
    cards: { tag: string; t: string; d: string; list?: string[] }[];
  };
  eligibility: string[];
  priorityEyebrow?: string;
  priorityTitle?: string;
  priority?: string[];
  steps: { t: string; d: string }[];
  prepareIntro: string;
  prepare: string[];
  reviewBy: string;
  criteria: string[];
  commitments?: string[];
  faq?: { q: string; a: string }[];
  footnote?: string;
  /** Review notes: render only in dev/preview builds. */
  notes: string[];
}

/** Access pill dots (status colours, deliberately outside the sponsor palette). */
export const ACCESS_DOT = {
  open: "oklch(0.72 0.17 150)",
  restricted: "oklch(0.72 0.17 50)",
} as const;

/** Default CTA contact; the Community Fund overrides it with its own contact fields. */
export const DEFAULT_CONTACT = {
  contactName: "Vincent Chan, PhD",
  contactRole: "OCR Director and ImmunoX Chief Strategy Officer",
  contactEmail: "vincent.chan@ucsf.edu",
  contactInitials: "VC",
} as const;

export const PARTNERS: FundingPartner[] = [
  {
    key: "parnassus",
    name: "Parnassus Institutes",
    initials: "PI",
    blurb: "Research institutes based on the Parnassus campus. OCR hosts the community manager.",
    href: "",
    linkLabel: "",
  },
  {
    key: "immunox",
    name: "Bakar ImmunoX Initiative",
    initials: "IX",
    blurb: "UCSF's immunology initiative. OCR manages its CoProjects and helps run its awards.",
    href: "https://immunox.ucsf.edu/",
    linkLabel: "immunox.ucsf.edu",
  },
];
export const AWARDS: FundingOpportunity[] = [
  {
    id: "biospecimen",
    figure: "Part of a coordinator's time for a year",
    figureNote:
      "Up to 25% of an OCR clinical research coordinator's time, plus launch data support",
    owner: "ocr",
    partnerName: "",
    restricted: false,
    restrictedTo: "",
    short: "Biospecimen Pipeline Support",
    official: "Human Biospecimen Pipeline Development RFA",
    sponsor: "Office of Collaborative Research",
    color: "oklch(0.78 0.13 195)",
    ink: "oklch(0.45 0.1 195)",
    tint: "oklch(0.78 0.13 195 / 0.14)",
    need: "I need a reliable stream of human samples",
    oneLiner:
      "Up to a quarter of an OCR clinical research coordinator's time for a year, to launch or expand a clinical biospecimen stream.",
    amount: "Up to 25% CRC effort for one year",
    who: "Anyone in the UCSF research community",
    deadline: "February 27, 2026",
    tag: "Feb 27, 2026",
    status: "Annual cycle",
    headA: "Open a steady line",
    headB: "from the clinic to your bench.",
    lead: "An OCR clinical research coordinator joins your team for a year to establish a new source of human biospecimens, or to make an existing one reliable. You finish with a working pipeline, preliminary data, and a proposal to sustain it.",
    facts: [
      ["Support", "Up to 25% CRC effort for one year, plus launch-phase data management"],
      ["Eligible", "Anyone in the UCSF research community"],
      ["Deadline", "Friday, February 27, 2026"],
      ["Apply", "Online application form"],
    ],
    applyLabel: "Apply online",
    applyHref: "https://tally.so/r/w4oa05",
    links: [],
    providesTitle: "Part of a coordinator's time, a database, and a path to long-term funding.",
    provides: [
      {
        t: "Clinical research coordinator",
        d: "Up to 25% effort for one year, set by OCR based on need and availability: study setup, recruitment and screening, informed consent, sample acquisition, data collection, regulatory compliance, and patient communication.",
      },
      {
        t: "Data manager at launch",
        d: "New this cycle: limited support to set up sample inventory and core metadata databases, so the pipeline can scale and compete for future funding. This is launch support, not ongoing data management.",
      },
      {
        t: "Grant development",
        d: "At the end of the award, an OCR Research Development Strategist and Grantwriter works with you on a competitive proposal to fund the pipeline long term.",
      },
    ],
    eligibility: [
      "Anyone in the UCSF research community: faculty, staff, and trainees",
      "Teams establishing a new clinical sample stream, or improving one that has limited support or access",
      "A PI or collaborator ready to lead a grant application with OCR support",
    ],
    priorityEyebrow: "Priorities",
    priorityTitle: "Priority goes to pipelines that",
    priority: [
      "Create highly collaborative opportunities for the UCSF research community",
      "Support high-impact or promising areas not yet extensively studied",
      "Improve access to diverse and vulnerable populations",
      "Have a clinical partner identified and committed",
      "Already have IRB approval in place",
    ],
    steps: [
      {
        t: "Scope it",
        d: "Optional and useful: talk with OCR about the clinic, sample types, and realistic collection rates.",
      },
      { t: "Apply", d: "Complete the online form by February 27, 2026." },
      {
        t: "Review",
        d: "A committee of UCSF faculty and staff scores merit, feasibility, collaboration, and community benefit.",
      },
      {
        t: "Launch",
        d: "Your OCR coordinator starts collection. Near the end, you write for sustained funding with an OCR grantwriter.",
      },
    ],
    prepareIntro:
      "The online form asks for each of these. Drafting them first makes it quick to submit.",
    prepare: [
      "The sample stream: biospecimen types, source population, clinical locations, clinic days, and expected rate and duration of collection",
      "Resources needed: CRC responsibilities, clinical workflows, space, equipment, databasing, language access, special skills",
      "The research questions these samples will answer",
      "Who else would use the pipeline, as an uploaded list of names and affiliations",
      "Regulatory status: not started, in preparation, submitted, or approved",
      "How access to the pipeline will be managed or shared",
    ],
    reviewBy:
      "A committee of UCSF faculty and staff, chosen by the OCR Director for expertise and fit with program goals. Reviewers complete UCSF anti-discrimination training and disclose conflicts of interest; those with conflicts are recused.",
    criteria: ["Scientific merit", "Feasibility", "Collaboration", "Community benefit"],
    commitments: [
      "Work with an OCR grantwriter at the end of the award on a proposal for long-term funding",
      "Share the pipeline with other researchers under the access plan you propose",
    ],
    footnote:
      "CRC percent effort is assessed by OCR based on need and availability. UCSF does not use race, gender, sex, or other protected categories in eligibility or selection. All selection processes adhere to federal and state antidiscrimination laws (Title VII, ADA, FEHA, Prop 209) and UC policies.",
    notes: [
      "Eligibility widened from ImmunoX members to the whole UCSF research community; the 2026 RFA still says ImmunoX. Update the RFA and form to match.",
      'The February 27, 2026 deadline has passed. Confirm the next cycle date or replace with "Next cycle opens …".',
    ],
  },
  {
    id: "ai-tools",
    figure: "We build your tool",
    figureNote: "OCR design and engineering time, scoped to the tool you propose",
    owner: "ocr",
    partnerName: "",
    restricted: false,
    restrictedTo: "",
    short: "AI Tools Open Call",
    official: "OCR AI Tools for Research Request for Proposals",
    sponsor: "Office of Collaborative Research",
    color: "oklch(0.78 0.13 195)",
    ink: "oklch(0.45 0.1 195)",
    tint: "oklch(0.78 0.13 195 / 0.14)",
    need: "I have an idea for an AI tool",
    oneLiner:
      "Propose an AI tool that would speed up your research. If it fits, OCR's team builds it with you.",
    amount: "OCR build effort, scoped to the tool",
    who: "Anyone in the UCSF research community",
    deadline: "Rolling",
    tag: "Rolling",
    status: "Rolling submissions",
    headA: "Tell us the tool you wish existed.",
    headB: "We may build it.",
    lead: "Every lab has a task that eats hours: screening literature, cleaning metadata, drafting the same report every quarter. Propose an AI tool that would take that task off your plate. If it could help other researchers too and fits what our team does well, OCR puts its own engineering effort into building it with you.",
    facts: [
      ["Support", "OCR design and engineering effort, not cash"],
      ["Eligible", "UCSF faculty, staff, trainees, and research teams"],
      ["Deadline", "Rolling. Proposals reviewed quarterly"],
      ["Apply", "A short proposal by email"],
    ],
    applyLabel: "Propose a tool",
    applyHref: "mailto:ocr@ucsf.edu?subject=AI%20Tools%20for%20Research%20proposal",
    links: [
      {
        label: "OCR Research Resources & AI Tools",
        href: "https://ocr.ucsf.edu/services/ai-tools",
      },
    ],
    providesTitle: "Our team's time, from first sketch to a tool people use.",
    provides: [
      {
        t: "Scoping",
        d: "We meet with you to sharpen the problem, check what tools already exist, and agree on what a useful first version looks like.",
      },
      {
        t: "Build effort",
        d: "OCR's developers and data scientists build the tool, with you as the first user and tester. Effort is set by OCR based on scope and capacity.",
      },
      {
        t: "Release to the community",
        d: "Finished tools are shared with UCSF researchers through OCR Research Resources, with credit to the person who proposed them.",
      },
    ],
    spot: {
      eyebrow: "What a good proposal looks like",
      title: "Your problem first, and other people's too.",
      min: "300px",
      intro:
        "You don't need to know how to build it. We're looking for a clear, recurring problem in research work that AI could make faster, easier, or more reliable, and that more than one lab has.",
      cards: [
        {
          tag: "Strong fit",
          t: "Tools we're likely to take on",
          d: "Problems that repeat across labs and can be solved with existing models and UCSF-approved infrastructure.",
          list: [
            "Literature and grant search, triage, or summarization",
            "Extracting structured data from documents, protocols, or clinical notes",
            "Cleaning, harmonizing, or annotating research metadata",
            "Assistants for drafting routine reports, IRB materials, or progress updates",
            "Interfaces that make an existing dataset or resource easier to query",
          ],
        },
        {
          tag: "Less likely",
          t: "Better suited elsewhere",
          d: "We'll tell you if an idea is outside our scope and point you to who can help.",
          list: [
            "Training new foundation models or large-scale compute projects",
            "Tools that serve only a single study, with no wider use",
            "Clinical decision tools intended for patient care",
            "Projects needing access to data we can't use under UCSF policy",
          ],
        },
      ],
    },
    eligibility: [
      "Anyone doing research at UCSF: faculty, staff, postdocs, students, and research teams",
      "No technical background required; you bring the problem and the know-how of your field",
      "Willingness to test early versions and give feedback",
    ],
    priorityEyebrow: "Priorities",
    priorityTitle: "We give priority to tools that",
    priority: [
      "Solve a problem shared by many researchers, labs, or departments",
      "Save meaningful time on repetitive or error-prone work",
      "Can be built and maintained with OCR's current skills and infrastructure",
      "Handle data safely and within UCSF AI and data security policies",
      "Have a champion ready to test and help refine them",
    ],
    steps: [
      {
        t: "Propose",
        d: "Email a one-page proposal describing the problem and the tool you imagine. Sketches and examples welcome.",
      },
      {
        t: "Quarterly review",
        d: "OCR reviews proposals each quarter for community benefit, feasibility, and fit with our team.",
      },
      {
        t: "Scope together",
        d: "For promising ideas, we meet to define a first version. Others hear back with feedback or pointers.",
      },
      {
        t: "Build and share",
        d: "We build, you test. Once it works, we release it to the UCSF research community.",
      },
    ],
    prepareIntro: "One page is enough. Plain language is better than technical detail.",
    prepare: [
      "The problem: what task takes too long or goes wrong, and how often",
      "Who else has this problem: other labs, roles, or departments",
      "What the tool would do, in a sentence or two, with a sketch if you have one",
      "What data or documents it would work with, and their sensitivity (public, internal, PHI)",
      "What success looks like: time saved, errors avoided, or new work made possible",
      "Your name, role, and department, and whether you can serve as a test user",
    ],
    reviewBy: "OCR's Research Resources & AI Tools team reviews proposals each quarter and weighs:",
    criteria: [
      "Community benefit: how many researchers would use it?",
      "Impact: how much time or effort would it save, or what new work would it enable?",
      "Feasibility: can it be built with current models, data access, and OCR capacity?",
      "Fit: is it within OCR's expertise and mission?",
      "Safety: can it meet UCSF data security, privacy, and AI policies?",
    ],
    commitments: [
      "Serve as an early tester and give regular feedback during the build",
      "Allow the tool to be shared with the wider UCSF research community",
      "Acknowledge OCR when the tool contributes to published work",
    ],
    faq: [
      {
        q: "Is there funding attached?",
        a: "No cash is awarded. What you receive is OCR's own design and engineering time.",
      },
      {
        q: "Do I need to know how to code?",
        a: "No. Describe the problem and how you'd want the tool to work; we handle the build.",
      },
      {
        q: "What if my idea isn't selected?",
        a: "We keep every proposal on file. Ideas that come up repeatedly move up our list, and we'll point you to other resources where we can.",
      },
      {
        q: "Who owns the tool?",
        a: "Tools are built as UCSF resources for the research community, credited to the person who proposed them.",
      },
      {
        q: "Can I propose an improvement to an existing tool?",
        a: "Yes. Extending a tool OCR already maintains is often the fastest path to something useful.",
      },
    ],
    notes: [
      "New award: all content drafted by Claude. Confirm the name, review cadence (quarterly), and scope boundaries.",
      "No intake form exists yet; Apply goes to ocr@ucsf.edu. Swap in a Tally form when ready.",
      "Confirm the contact person for the AI Tools team.",
    ],
  },
  {
    id: "plan-review",
    figure: "One free review a year",
    figureNote:
      "Written critique and a debrief from an OCR strategist, for an early-career investigator outside our partner programs",
    owner: "ocr",
    partnerName: "",
    restricted: true,
    restrictedTo: "Early-career, non-partner",
    short: "Research Plan Review",
    official: "OCR Early-Career Research Plan Review",
    sponsor: "Office of Collaborative Research",
    color: "oklch(0.78 0.13 195)",
    ink: "oklch(0.45 0.1 195)",
    tint: "oklch(0.78 0.13 195 / 0.14)",
    need: "I want expert eyes on my research plan",
    oneLiner:
      "One complimentary review a year of a research plan from an early-career investigator outside our partner programs.",
    amount: "One free review per year",
    who: "Early-career investigators not in a partner program",
    deadline: "Rolling, until the year's review is claimed",
    tag: "1 per year",
    status: "One per year",
    headA: "A reviewer's read on your plan,",
    headB: "before the reviewers see it.",
    lead: "Each year OCR reviews one research plan, free of charge, for an early-career investigator who is not part of our partner programs. A research development strategist reads the plan the way a study section would and returns written feedback on aims, logic, feasibility, and fit.",
    facts: [
      ["Offer", "One complimentary research plan review per year"],
      ["Eligible", "Early-career investigators at UCSF not affiliated with an OCR partner program"],
      ["Deadline", "Rolling; requests accepted until the year's review is claimed"],
      ["Apply", "A short request by email, with your draft"],
    ],
    applyLabel: "Request a review",
    applyHref: "mailto:ocr@ucsf.edu?subject=Research%20Plan%20Review%20request",
    links: [
      {
        label: "Research Development services",
        href: "https://ocr.ucsf.edu/services/research-development",
      },
    ],
    providesTitle: "Written critique, a debrief, and time to act on both.",
    provides: [
      {
        t: "Written critique",
        d: "A research development strategist reads your plan as a study section would and returns written comments on significance, aims, approach, and feasibility.",
      },
      {
        t: "A debrief conversation",
        d: "A 45-minute meeting to walk through the comments, weigh options, and agree on the revisions that matter most.",
      },
      {
        t: "Pointers for what's next",
        d: "Funding mechanisms, collaborators, and UCSF resources that fit the plan, drawn from OCR's work across campus.",
      },
    ],
    spot: {
      eyebrow: "What to send",
      title: "A draft, not a polished proposal.",
      min: "300px",
      intro:
        "The review is most useful early, while there is still time to change direction. Send what you have.",
      cards: [
        {
          tag: "Timing",
          t: "Six to ten weeks before a deadline",
          d: "Enough time to revise aims or gather preliminary data in response to the comments.",
        },
        {
          tag: "What qualifies",
          t: "Plans for external funding",
          d: "Documents headed for NIH, foundation, or other external proposals.",
          list: [
            "Specific Aims page",
            "Research Strategy, up to 12 pages",
            "Career development and mentoring plans for K-series awards",
          ],
        },
      ],
    },
    eligibility: [
      "Early-career investigators: postdoctoral scholars, clinical fellows, instructors, and assistant professors within five years of first faculty appointment",
      "Not affiliated with an OCR partner program (Bakar ImmunoX, Parnassus Institutes), whose members receive research development support through their program",
      "Preparing a proposal for external funding with a submission date in the coming year",
    ],
    priorityEyebrow: "Priority",
    priorityTitle: "If more than one request arrives, we favor",
    priority: [
      "First-time applicants to the mechanism they are targeting",
      "Investigators without departmental grant-writing support",
      "Plans with a confirmed submission deadline",
      "Proposals that would start a new program of research at UCSF",
    ],
    steps: [
      {
        t: "Request",
        d: "Email a short note: your position, department, target mechanism and deadline, and your current draft.",
      },
      {
        t: "Confirm",
        d: "We confirm eligibility and whether the year's review is still open, usually within a week.",
      },
      {
        t: "Review",
        d: "A strategist returns written comments within three weeks of receiving your draft.",
      },
      { t: "Debrief", d: "Meet for 45 minutes to discuss the comments and plan revisions." },
    ],
    prepareIntro: "A single email with these is enough.",
    prepare: [
      "Your current draft, even if incomplete",
      "The funding mechanism and submission deadline",
      "Your position, department, and date of first faculty appointment, if any",
      "Your biosketch or CV",
      "A sentence on what you most want feedback on",
    ],
    reviewBy:
      "OCR staff check eligibility; a research development strategist does the review. We look at:",
    criteria: [
      "Clarity of the central question and its significance",
      "Logic connecting hypothesis, aims, and approach",
      "Feasibility given the team, timeline, and preliminary data",
      "Fit with the funder's priorities and review criteria",
      "Presentation: whether a reviewer can follow the argument quickly",
    ],
    commitments: [
      "Tell us the outcome of the submission so we can learn from it",
      "Acknowledge OCR if the funded work leads to publications",
    ],
    faq: [
      {
        q: "Why only one a year?",
        a: "Our strategists' time is funded by our partner programs. One complimentary review a year is what we can offer outside them without shortchanging partners.",
      },
      {
        q: "I'm in an ImmunoX lab. Can I use this?",
        a: "ImmunoX and Parnassus Institutes members already have access to OCR research development support through their programs. Contact us directly.",
      },
      {
        q: "Can my department pay for additional reviews?",
        a: "Yes. OCR offers research development services on a recharge basis; email us for rates.",
      },
      {
        q: "Is the review confidential?",
        a: "Yes. Drafts are read only by the assigned strategist and are not shared or kept after the debrief.",
      },
    ],
    notes: [
      "New opportunity: all content drafted by Claude. Confirm the early-career definition, three-week turnaround, 45-minute debrief, and whether paid reviews are offered on recharge.",
      "Confirm how the year is counted (calendar or fiscal) and that it is first come, first served.",
    ],
  },
  {
    id: "clinical-translational",
    figure: "Up to $100,000",
    figureNote: "protected research time over one or two years",
    owner: "partner",
    partner: "immunox",
    partnerName: "the Bakar ImmunoX Initiative, with support from the Hellman Family Foundation",
    restricted: false,
    restrictedTo: "",
    short: "Hellman Clinical-Translational Award",
    official: "Hellman Family Clinical-Translational Research Development Award",
    sponsor: "Hellman Family Foundation · Bakar ImmunoX",
    color: "oklch(0.72 0.22 340)",
    ink: "oklch(0.5 0.2 340)",
    tint: "oklch(0.72 0.22 340 / 0.12)",
    need: "I'm a clinician who wants protected research time",
    oneLiner:
      "Up to $100,000 for physician-scientists to embed with OCR or a CoLab and profile clinical samples.",
    amount: "Up to $100,000 over one or two years",
    who: "MDs and MD/PhDs not yet independent",
    deadline: "May 8, 2026, 6:00 PM PT",
    tag: "May 8, 2026",
    status: "Annual cycle",
    headA: "Protected time to turn clinical insight",
    headB: "into immune biology.",
    lead: "For physician-scientists who are not yet independent: one to two years embedded with OCR or a UCSF CoLab, working inside a proven data-production pipeline with mentors who know both the assays and the clinic.",
    facts: [
      ["Award", "Up to $100,000 over one or two years"],
      ["Eligible", "MD or MD/PhD, not yet an independent investigator"],
      ["Deadline", "May 8, 2026, 6:00 PM PT"],
      ["Apply", "Application form and mentor letters, by email"],
    ],
    applyLabel: "Email your application",
    applyHref:
      "mailto:vincent.chan@ucsf.edu?subject=Hellman%20Family%20Clinical-Translational%20Research%20Development%20Award%20application",
    links: [
      {
        label: "Guidelines (.docx)",
        href: "/funding/2026_HellmanFamilyDevelopment_Guidelines.docx",
      },
      {
        label: "Application form (.docx)",
        href: "/funding/2026_HellmanFamilyDevelopment_ApplicationForm.docx",
      },
    ],
    providesTitle: "Salary, CoLab access, and a team inside the pipeline.",
    provides: [
      {
        t: "Protected time",
        d: "Most of the award covers part of your salary. Request $50,000 for one year, $100,000 for one year, or $50,000 a year for two years, depending on support already in place.",
      },
      {
        t: "Project costs",
        d: "Up to $25,000 of the total can cover project costs in the CoLabs. Matching funds may come from an ImmunoX CoProject, CoProject Pilot funds, or other sources.",
      },
      {
        t: "A working team",
        d: "Each CoProject runs with a technician who processes samples, a data scientist who curates them in the UCSF Data Library, and you, analyzing alongside them.",
      },
      {
        t: "A second year",
        d: "Request another year in the following cycle with a progress report and a mentor letter.",
      },
    ],
    spot: {
      eyebrow: "Mentorship",
      title: "Choose where you embed.",
      min: "300px",
      intro:
        "Build a team of two to three mentors, including one ImmunoX member and one OCR or CoLab director. Consult the directors before applying; each mentor confirms the project fits and describes their role.",
      cards: [
        {
          tag: "Office of Collaborative Research",
          t: "Vincent Chan, PhD",
          d: "CoProject management and clinical coordination: clinic schedules, recruitment and consent, biospecimen acquisition and transport, and clinical data extraction.",
        },
        {
          tag: "Disease to Biology CoLab",
          t: "Alexis Combes, PhD",
          d: "Consistent, high-quality human specimen processing. CoProject technicians are based here and coordinate processing and analysis across CoLabs.",
        },
        {
          tag: "Flow Cytometry CoLab",
          t: "Vinh Nguyen",
          d: "Counting, sorting, and analyzing cell suspensions with advanced sorting and cytometry.",
        },
        {
          tag: "Biological Imaging Development CoLab",
          t: "Torsten Wittmann, PhD",
          d: "Assembling, testing, and applying emerging light microscopy techniques.",
        },
        {
          tag: "Genomics CoLab",
          t: "Walter Eckalbar, PhD",
          d: "Single-cell sequencing and methods for analyzing and modifying gene function.",
        },
        {
          tag: "Data Sciences CoLab",
          t: "Gabi Fragiadakis, PhD",
          d: "Frameworks for curating, storing, analyzing, and sharing CoLabs data, with bioinformaticians who drive CoProjects.",
        },
      ],
    },
    eligibility: [
      "Fellows, residents, and early-career clinicians with an MD or MD/PhD who are not yet independent investigators",
      "K- or R-award holders are usually considered independent and are not eligible, with some exceptions",
      "Clinicians from programs with fewer lab research opportunities, such as Family & Community Medicine, Critical Care, and Radiology, are encouraged to apply",
      "ImmunoX membership is not required, but one mentor must be an ImmunoX member",
    ],
    priorityEyebrow: "Focal areas",
    priorityTitle: "Immune-mediated topics we encourage",
    priority: [
      "Immune function in acute injury",
      "Acute or chronic wound healing and fibrosis",
      "Local and systemic immunity at sites of acute or chronic infection",
      "Local and systemic immunity in neuroinflammation",
      "Local and systemic immunity in autoimmunity",
      "Immunity in aging, especially wound healing and anti-cancer responses",
      "Population-level variation in normal immune responses in blood and tissues",
    ],
    steps: [
      {
        t: "Build your team",
        d: "Talk with Vincent Chan and the OCR or CoLab directors you want as mentors.",
      },
      {
        t: "Apply",
        d: "Email the form, appendix, CV, and mentor letters by May 8, 2026, 6:00 PM PT.",
      },
      {
        t: "Review",
        d: "The ImmunoX Research Committee typically funds one or two applications a year, about $100,000 in total.",
      },
      {
        t: "Embed",
        d: "Join CoLab lab meetings and run samples through standard CoProjects pipelines.",
      },
    ],
    prepareIntro: "Send everything together in one email to Vincent Chan.",
    prepare: [
      "Application form: project title, mentors and their roles, collaborators, and project type (CoProject, assay or technology development, data mining, or other)",
      "Project background and a brief summary of aims",
      "Budget: salary support, equipment and supplies, other costs, and alternate funding sources",
      "Your plans for data sharing, assay sharing, and IRB status",
      "An appendix of up to two pages",
      "Your biosketch or CV, and a letter from each mentor",
    ],
    reviewBy:
      "The ImmunoX Research Committee reviews and selects proposals. Primary criteria include:",
    criteria: [
      "Your biosketch or CV",
      "Letters from your academic mentor and from proposed OCR or CoLab mentors",
      "Novelty of the sample type and its potential to reveal immune states not yet in the Data Library or the literature",
      "For clinicians without substantial lab opportunities: the case for protected time or CoLabs use",
      "Ability to provide samples on time and process them with standard CoProjects pipelines",
      "Novelty of any non-standard assays proposed",
    ],
    commitments: [
      "An 18-month embargo on your data. Afterward, UCSF investigators may request access and must offer you co-authorship",
      "A major footprint in the CoLabs: work alongside technicians and attend relevant lab meetings, including CoLabs-wide meetings on the first and third Tuesdays at 10 am",
      "Offer co-authorship to ImmunoX and CoLabs personnel involved in the study",
      "Acknowledge the Hellman Family Foundation, ImmunoX, and the CoLabs in all resulting publications",
    ],
    faq: [
      {
        q: "Do I need to be an ImmunoX member?",
        a: "No. One of your mentors must be an ImmunoX member.",
      },
      {
        q: "Can I apply for a CoProject at the same time?",
        a: "Yes. Mark it on the application form; CoProject funds can match a Hellman award.",
      },
      {
        q: "Can funds go to reagents and supplies?",
        a: "Up to $25,000 can cover project costs in the CoLabs, provided you can show your research time is adequately protected.",
      },
      {
        q: "My project doesn't have an IRB yet. Can I still apply?",
        a: "Yes. Contact Vincent Chan. Through the Thoreau Fund, ImmunoX and the CoLabs can provide substantial IRB and clinical research coordinator support.",
      },
      {
        q: "How long can the background and aims be?",
        a: "Stay close to the space on the form, and use the two-page appendix for anything else relevant.",
      },
    ],
    notes: [
      "The May 8, 2026 deadline has passed. Confirm the next cycle.",
      "Guidelines and form link to the uploaded .docx files. Host them on the site or Box before launch.",
      "CoLab directors differ between the 2022 call (Flow: Claudia Bispo; Imaging: Kyle Marchuk) and the 2026 guidelines (Vinh Nguyen; Torsten Wittmann). Confirm current directors.",
    ],
  },
  {
    id: "data-library",
    figure: "CoLab data scientists",
    figureNote: "Data Science CoLab effort, scoped to your question",
    owner: "partner",
    partner: "immunox",
    partnerName:
      "the Bakar ImmunoX Initiative through the ImmunoX Computational Biology Initiative",
    restricted: true,
    restrictedTo: "ImmunoX members",
    short: "Data Library Analysis Support",
    official: "Data Library Analysis RFA",
    sponsor: "Bakar ImmunoX · Data Science CoLab",
    color: "oklch(0.72 0.22 340)",
    ink: "oklch(0.5 0.2 340)",
    tint: "oklch(0.72 0.22 340 / 0.12)",
    need: "I want to analyze existing immune data",
    oneLiner:
      "Support to pursue new questions in the UCSF Data Library and build analysis tools others can use.",
    amount: "Data Science CoLab effort, scoped to the project",
    who: "ImmunoX members",
    deadline: "Rolling",
    tag: "Rolling",
    status: "Rolling submissions",
    headA: "Ask new questions of data",
    headB: "that already exists.",
    lead: "Since 2018, ImmunoX CoProjects and Pilots have produced immune profiling data across many diseases under the same standard operating procedures. This award funds the work of mining it: a new research question and, ideally, a new analysis capability built into the Data Library for everyone.",
    facts: [
      ["Support", "Data scientists or engineers from the Data Science CoLab"],
      ["Eligible", "All ImmunoX members"],
      ["Deadline", "Rolling. The first round closed October 17, 2025"],
      ["Apply", "Online application form"],
    ],
    applyLabel: "Apply online",
    applyHref: "https://tally.so/r/wA2qYW",
    links: [
      {
        label: "Progress dashboard",
        href: "https://immunox.notion.site/Data-Library-Development-Initiative-9afcc2485b4e48d5be99d637526d4b63",
      },
      { label: "UCSF Data Library", href: "https://datalibrary.ucsf.edu/" },
    ],
    providesTitle: "Data, people, and a home for your tools.",
    provides: [
      {
        t: "Comparable datasets",
        d: "Immunoprofiling data from many disease indications, standardized so results compare across studies. You can bring external datasets in for comparison.",
      },
      {
        t: "Data science effort",
        d: "Fund data scientists or engineers from the Data Science CoLab, or bring your own to work alongside the CoLab team.",
      },
      {
        t: "A home for new tools",
        d: "New and existing analysis tools or pipelines can be built into the Data Library, extending what every member can do.",
      },
    ],
    spot: {
      eyebrow: "What we fund",
      title: "A question first, and a capability if you can.",
      min: "300px",
      intro:
        "The research question is the focus. Building an analysis tool is optional, but the ideal project develops a new capability and applies it to Data Library datasets.",
      cards: [
        {
          tag: "Funded through this award",
          t: "Compass",
          d: "A tool that characterizes cellular metabolic states, built in an earlier round and in testing with alpha users ahead of release in the Data Library.",
        },
        {
          tag: "Fields",
          t: "Where the data reaches",
          d: "Immunology, cancer, autoimmune disease, chronic viral disease, neurodegeneration, and related fields.",
        },
      ],
    },
    eligibility: [
      "All ImmunoX members",
      "Teams ready to work with the Data Science CoLab, which manages the Data Library",
      "Projects that use Data Library datasets, alone or alongside external data",
    ],
    steps: [
      {
        t: "Check the data",
        d: "Contact the Data Science CoLab early to confirm the Library holds what your question needs.",
      },
      { t: "Apply", d: "Submit the online form. Proposals are accepted on a rolling basis." },
      { t: "Review", d: "The ImmunoX Research Committee reviews each proposal." },
      {
        t: "Track",
        d: "Follow the queue and the progress of funded projects on the public dashboard.",
      },
    ],
    prepareIntro: "Proposals follow ImmunoX guidelines and include:",
    prepare: [
      "A summary of the research question or analytical tool",
      "A plan for how the work will use the Data Library",
      "The methods you will use to answer the research question",
      "The methods you will use to build the analytical tool, if you propose one",
    ],
    reviewBy: "The ImmunoX Research Committee evaluates each proposal on four questions:",
    criteria: [
      "Impact: does the question, or the analysis method, address an important gap?",
      "Feasibility: is there enough data in the Library to answer it in the proposed timeframe?",
      "Collaboration: is there a working plan with the Data Science CoLab?",
      "Community benefit: will the capability help ImmunoX members beyond your own question?",
    ],
    notes: [
      "The link supplied (tally.so/forms/wA2qYW) opens the form editor. This page uses the public link tally.so/r/wA2qYW.",
      "The RFA does not state a dollar amount. Confirm whether to publish a range.",
      "Confirm Compass's current release status.",
    ],
  },
  {
    id: "sabbatical",
    figure: "Up to $25,000",
    figureNote: "to host a visitor or extend your own sabbatical",
    owner: "partner",
    partner: "immunox",
    partnerName: "the Bakar ImmunoX Initiative",
    restricted: true,
    restrictedTo: "ImmunoX members",
    short: "Sabbatical Assistance Grant",
    official: "ImmunoX Sabbatical Assistance Grant",
    sponsor: "Bakar ImmunoX",
    color: "oklch(0.72 0.22 340)",
    ink: "oklch(0.5 0.2 340)",
    tint: "oklch(0.72 0.22 340 / 0.12)",
    need: "I want to host or visit a collaborator",
    oneLiner:
      "Up to $25,000 to host a visiting scientist at UCSF, or to support your own sabbatical elsewhere.",
    amount: "Up to $25,000",
    who: "ImmunoX faculty with 3+ years of membership",
    deadline: "Rolling",
    tag: "Rolling",
    status: "Rolling review",
    headA: "Bring a scientist here,",
    headB: "or take your science somewhere new.",
    lead: "Support for stays of a month or longer that build lasting collaborations between ImmunoX and the wider immunology community. Host a visiting faculty member at UCSF, or extend your own sabbatical at another institution.",
    facts: [
      ["Award", "Up to $25,000, incoming or outgoing"],
      ["Eligible", "UCSF faculty with at least three years of ImmunoX membership"],
      ["Deadline", "Rolling. Grant year typically runs July to July"],
      ["Apply", "Signed form and attachments to ImmunoX@ucsf.edu"],
    ],
    applyLabel: "Email your application",
    applyHref:
      "mailto:ImmunoX@ucsf.edu?subject=ImmunoX%20Sabbatical%20Assistance%20Grant%20application",
    links: [
      {
        label: "RFA and forms (.docx)",
        href: "/funding/ImmunoXSabbatical_RFA2023_revised_vjc.docx",
      },
    ],
    spot: {
      eyebrow: "Two tracks",
      title: "Choose one direction.",
      min: "380px",
      intro:
        "Both tracks require a stay of at least one month and endorsement from an ImmunoX faculty member. All expenses are approved through ImmunoX central administration.",
      cards: [
        {
          tag: "Incoming",
          t: "Host a visiting scientist",
          d: "Up to $25,000 for a faculty member from another institution to spend time at UCSF.",
          list: [
            "Round-trip economy airfare",
            "A living stipend of up to $5,000 a month, including benefits, paid through the host department",
            "Other expenses related to community engagement",
            "Sponsored by an ImmunoX faculty member and at least one CoLab director",
            "The visitor gives two talks, typically a CoLabs or CoProjects lab meeting and an ImmunoX informal seminar: one on arrival, one summarizing the work at the end",
          ],
        },
        {
          tag: "Outgoing",
          t: "Take your sabbatical elsewhere",
          d: "Up to $25,000 to supplement your sabbatical at another institution. It adds to, rather than fully funds, a sabbatical.",
          list: [
            "Travel and lodging",
            "Access to local research resources",
            "Sponsored by another ImmunoX faculty member and at least one additional UCSF faculty member",
            "Funds go directly to you",
          ],
        },
      ],
    },
    eligibility: [
      "UCSF faculty who have been ImmunoX members for at least three years",
      "Proof of sabbatical eligibility in your department, with a letter of support from your chair",
      "A planned stay of at least one month",
    ],
    steps: [
      { t: "Talk with us", d: "Discuss the visit with Vincent Chan before you apply." },
      {
        t: "Line up sponsors",
        d: "Incoming: an ImmunoX faculty sponsor and a CoLab director. Outgoing: an ImmunoX faculty sponsor and one more UCSF faculty member.",
      },
      {
        t: "Submit",
        d: "Email the signed form and attachments to ImmunoX@ucsf.edu, typically for exchanges starting the following fall or spring.",
      },
      {
        t: "Review",
        d: "The Membership & Community Committee reviews on a rolling basis. Ad hoc requests are considered as funds allow.",
      },
    ],
    prepareIntro: "Attach these to the signed incoming or outgoing form.",
    prepare: [
      "The incoming or outgoing form, with dates of stay and total funds requested",
      "A research plan with abstract, goals, and predictors of success",
      "A statement of how the visit benefits ImmunoX and the other institution",
      "A budget with justification, and any other funding sources",
      "Letters of support from sponsors (outgoing: from the host institution too)",
      "An NIH biosketch or CV (the visitor's, for incoming)",
    ],
    reviewBy:
      "The ImmunoX Membership & Community Committee selects applications that best serve ImmunoX's goals for community engagement. It asks:",
    criteria: [
      "How directly do the sabbatical's goals connect to immunology, immunotherapy, or ImmunoX collaborative science?",
      "What new methods, specimens, expertise, or insights will move between ImmunoX and the other institution?",
      "How significant is the visitor's, or the host institution's, contribution to immunology?",
      "Could the visit lead to a lasting collaboration between programs?",
      "Is the budget justified, what is the timeline, and what other funding is in place?",
    ],
    commitments: [
      "Incoming sponsors schedule the visitor's two talks with ImmunoX administration before arrival",
      "Visitors confirm they can receive salary from their home institution; the host department sets up a paid appointment",
      "All expenses are approved through ImmunoX central administration",
    ],
    notes: [
      "The RFA is dated 2023 (grant period July 2023 to July 2024). Confirm current cycle dates and terms.",
      "The forms link points to the uploaded .docx. Host a current version before launch.",
    ],
  },
  {
    id: "community-fund",
    figure: "Up to $5,000",
    figureNote: "per project, delivered within 12 months",
    owner: "partner",
    partner: "parnassus",
    partnerName: "the Parnassus Institutes",
    restricted: true,
    restrictedTo: "Parnassus-based",
    short: "Parnassus Community Fund",
    official: "Parnassus Institutes Community Fund",
    sponsor: "Parnassus Institutes",
    color: "oklch(0.8 0.16 125)",
    ink: "oklch(0.46 0.12 130)",
    tint: "oklch(0.8 0.16 125 / 0.16)",
    need: "I want to bring Parnassus communities together",
    oneLiner:
      "Up to $5,000 for events, programs, and projects that connect three or more Parnassus Institutes.",
    amount: "Up to $5,000 per project",
    who: "Faculty, staff, and trainees at Parnassus",
    deadline: "To be announced",
    tag: "Cohort 2",
    status: "Cohort 2",
    headA: "Build a community",
    headB: "of communities.",
    lead: "Grants of up to $5,000 for bold, connective ideas that break silos between the research institutes at Parnassus: cross-institute events, art and wellness experiences, storytelling, new models of mentorship and leadership, and outreach to the wider San Francisco community.",
    facts: [
      ["Award", "Up to $5,000; most proposals run $1,000 to $5,000"],
      ["Eligible", "Faculty, staff, and trainees based at Parnassus"],
      ["Partners", "At least three Parnassus Institutes"],
      ["Deadline", "To be announced for Cohort 2"],
    ],
    applyLabel: "Apply online",
    applyHref: "https://airtable.com/app3jKnrn9KmQKSwn/pagscAuPEpdGsSbvc/form",
    links: [
      { label: "Budget template", href: "/funding/community-fund/budget-template.xlsx" },
      { label: "Timeline template", href: "/funding/community-fund/timeline-template.docx" },
      { label: "Past examples", href: "https://ucsf.box.com/s/6305toba7z95xoalnomm3meh80mu2db9" },
    ],
    contactName: "Jo Williams",
    contactRole: "Parnassus Community Manager",
    contactEmail: "jo.williams@ucsf.edu",
    contactInitials: "JW",
    providesTitle: "Funding, a year to run it, and help when you need it.",
    provides: [
      {
        t: "Up to $5,000",
        d: "Funding for one project. The committee sets the final amount against the decision guidelines; most proposals fall between $1,000 and $5,000.",
      },
      {
        t: "Twelve months",
        d: "Projects run up to a year from award, and can be shorter. Awardees own the project end to end.",
      },
      {
        t: "Light-touch support",
        d: "Logistics and communications help from Lily Ortiz and research program admins, if you need it.",
      },
      {
        t: "A path to scale",
        d: "Strong projects are amplified as models other units, and UCSF more broadly, can adopt.",
      },
    ],
    spot: {
      eyebrow: "Parnassus Institutes",
      title: "Partner with at least three.",
      min: "300px",
      intro:
        "Projects must involve three or more Parnassus Institutes. Priority goes to projects that include sponsoring institutes. Struggling to find partners? Apply anyway; strong ideas can get help making connections.",
      cards: [
        {
          tag: "Sponsoring institutes · priority",
          t: "Six sponsors",
          d: "Including any of these gives a proposal priority.",
          list: [
            "ImmunoX",
            "Benioff Center for Microbiome Medicine (BCMM)",
            "Institute for Human Genetics (IHG)",
            "Broad Stem Cell Center",
            "Diabetes Center at UCSF",
            "UCSF Musculoskeletal Center",
          ],
        },
        {
          tag: "Participating institutes",
          t: "Seven more programs",
          d: "Each counts toward the three-institute minimum.",
          list: [
            "Bakar Aging Research Institute (BARI)",
            "Gladstone–UCSF Institute for Genomic Immunology",
            "iMicro",
            "CoLabs",
            "Craniofacial Biology",
            "Lung Science Center",
            "Health Innovation via Engineering (HIVE)",
          ],
        },
      ],
    },
    eligibility: [
      "Faculty, staff, and trainees based at Parnassus",
      "Cross-program and interdisciplinary collaborations across schools, institutes, or departments",
      "Teams able to complete the project within 12 months of award",
      "Membership in a sponsoring institute is not required",
    ],
    priorityEyebrow: "What we fund",
    priorityTitle: "Ideas that connect across boundaries",
    priority: [
      "Interdisciplinary, cross-institute events, programs, or storytelling sessions",
      "Campus-wide art, wellness, or movement-based experiences",
      "Communications campaigns and public engagement",
      "Experiments in co-leadership, shared governance, or mentorship across ranks",
      "Collaborative exhibits, zines, or oral history projects rooted in Parnassus",
      "Outreach that builds bridges between UCSF and the San Francisco community",
    ],
    steps: [
      {
        t: "Find partners",
        d: "Line up at least three Parnassus Institutes, ideally including sponsors. Jo Williams can help make introductions.",
      },
      { t: "Apply", d: "Submit the online form with a summary, budget, and timeline." },
      {
        t: "Review",
        d: "Committee members recommend accept, revise and resubmit, or reject, and may send questions first.",
      },
      {
        t: "Run and report",
        d: "Attend orientation, deliver the project within 12 months, and send a short summary within three weeks of finishing.",
      },
    ],
    prepareIntro: "Templates for the budget and timeline are linked above.",
    prepare: [
      "A summary of up to 200 words: the project and how it serves the Parnassus Institutes community",
      "A budget with the expected cost breakdown",
      "A timeline of major activities and the number of events, covering materials, outreach, delivery, evaluation, and the final report",
      "The Parnassus community the project will benefit most",
      "The three or more Parnassus Institutes taking part",
    ],
    reviewBy:
      "The Parnassus Institutes Community Fund Committee reviews each proposal. Committee members declare any conflicts of interest and weigh whether the proposal:",
    criteria: [
      "Identifies and fills a need or gap in the Parnassus Institutes community experience",
      "Is advertised to, and attracts participation from, multiple Parnassus Institutes",
      "Is feasible legally, financially, technically, and in scheduling",
      "Fits the Community Fund budget, usually $1,000 to $5,000",
      "Includes a detailed and reasonable budget",
    ],
    commitments: [
      "Send at least one team member to the awardee orientation",
      "Complete the project within 12 months of award",
      "Submit reimbursements to the Community Manager in the third or fourth week of each month, with the form and receipts in a single file",
      "Send a short final summary (bullets, photos, short narrative) within three weeks of completion",
    ],
    faq: [
      {
        q: "Do I need to belong to a sponsoring institute?",
        a: "No. Projects that include sponsoring institutes as participants are given priority.",
      },
      {
        q: "What if I can't find three partner institutes?",
        a: "Apply anyway. Strong ideas may get admin support to connect with other institutes. Email jo.williams@ucsf.edu with a project description and the institutes you'd like to work with.",
      },
      {
        q: "Can the fund support an existing program?",
        a: "Yes, if it serves a cross-collaborative community that includes two or more sponsoring institutes. Explain how an award would expand its impact and scope.",
      },
      {
        q: "Can events be held off campus?",
        a: "The fund prioritizes programming on the Parnassus campus. Programming for the general public may take place off campus.",
      },
      {
        q: "Is the list of institutes fixed?",
        a: "If another research program at Parnassus should be included, email Jo Williams.",
      },
    ],
    footnote:
      "In accordance with Federal and State law and University policy, the University of California does not discriminate on the basis of age, gender, race, ethnicity, national origin, religion, sexual orientation, gender identity, health, or disability.",
    notes: [
      "The Cohort 2 due date is blank in the guidelines. Add it before launch.",
      "Templates link to the uploaded files; host them on the site or Box.",
      "The FAQ says existing programs need two or more sponsoring institutes, while the guidelines require three Parnassus Institutes overall. Confirm both rules.",
      "Confirm whether the Community Fund belongs on the OCR Funding page or is linked out to a Parnassus Institutes page.",
      "No Parnassus Institutes website URL yet; the partner link on the Funding hub is hidden until one is supplied.",
    ],
  },
];

export const ORDER = [
  "biospecimen",
  "ai-tools",
  "plan-review",
  "community-fund",
  "clinical-translational",
  "data-library",
  "sabbatical",
];
AWARDS.sort((x, y) => ORDER.indexOf(x.id) - ORDER.indexOf(y.id));

export const KIND: Record<string, SupportKind> = {
  biospecimen: "staff",
  "ai-tools": "staff",
  "plan-review": "review",
  "clinical-translational": "cash",
  "data-library": "staff",
  sabbatical: "cash",
  "community-fund": "cash",
};
export const KIND_LABEL: Record<SupportKind, string> = {
  cash: "Funding",
  staff: "Staff time",
  review: "Expert review",
};

export const MOTIFS: Record<string, [MotifKey, number]> = {
  biospecimen: ["polepole", 1],
  "ai-tools": ["polesphere", 2],
  "plan-review": ["rings", 0],
  "community-fund": ["dotsphere", 2],
  "clinical-translational": ["fullhoop", 0],
  "data-library": ["helix", 0],
  sabbatical: ["orbit", 1],
};
