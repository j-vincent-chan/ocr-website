/** Typed portfolio records. Source of truth: design_handoff_ocr_portfolio/DATA_MODEL.md */

export type OcrStatus = "Active" | "Pending" | "Closed";

export type PortfolioTheme =
  | "Autoimmunity"
  | "Cancer"
  | "Infectious disease"
  | "Allergy"
  | "Lung disease"
  | "Pediatrics"
  | "Surgery & devices"
  | "Multi-disease";

export type ScaleIndicator = {
  value: string;
  unit: string;
  note: string;
};

export type Program = {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  short?: string;
  fullTitle?: string;
  type: "program";
  programType: string;
  status: OcrStatus;
  start: string;
  end?: string;
  theme: PortfolioTheme | string;
  areas: string[];
  lead: string;
  dept?: string;
  division?: string;
  partnerDepts?: string;
  funding: string;
  services: string[];
  card: string;
  full?: string;
  sites?: string[];
  partners?: string[];
  url?: string;
  ocrTeam: string[];
  scale?: ScaleIndicator;
  patients?: {
    total: number;
    years: [string, number][];
    types: [string, number][];
  };
};

export type ProjectBase = {
  id: string;
  name: string;
  short?: string;
  fullTitle?: string;
  status: OcrStatus;
  start: string;
  end?: string;
  theme: PortfolioTheme | string;
  areas: string[];
  lead: string;
  dept?: string;
  division?: string;
  origin?: string;
  funding?: string;
  fundingUrl?: string;
  services: string[];
  card: string;
  full?: string;
  sites?: string[];
  partners?: string[];
  url?: string;
  parent?: string;
  open?: boolean;
  inDL?: boolean;
};

export type BioProject = ProjectBase & {
  type: "bio";
  model?: string;
  specimens?: string[];
  assays?: string[];
  population?: string;
};

export type ClinProject = ProjectBase & {
  type: "clin";
  studyType?: string;
  phase?: string;
  intervention?: string;
  nct?: string;
  enrollment?: string;
  eligibility?: string;
  target?: number | string;
};

export type Project = BioProject | ClinProject;

export type CoProjectItem = {
  title: string;
  theme: string;
  kind: string;
  rec?: string;
  featured?: boolean;
};

export type CoProjects = {
  active: CoProjectItem[];
  completed: CoProjectItem[];
};

export type CommunityScope = {
  name: string;
  line: string;
  detail: string;
};

export type Community = {
  name: string;
  since: string;
  href: string;
  serves?: string;
  contributes: string;
  model?: string;
  groups?: [string, string[]][];
  scopes?: CommunityScope[];
};

export type MotifMode = "static" | "animated" | "background";
