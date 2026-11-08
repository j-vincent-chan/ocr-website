import type { ProjectMotifKey } from "@/components/site/project-motifs";
import {
  ACCESS_DOT,
  AWARDS,
  DEFAULT_CONTACT,
  KIND,
  KIND_LABEL,
  MOTIFS,
  PARTNERS,
  type FundingOpportunity,
  type PartnerKey,
  type SupportKind,
} from "@/data/funding";

/** Review notes render in dev only, so they never ship in a production build. */
export const SHOW_REVIEW_NOTES = import.meta.env.DEV;

export const HUB_TITLE = "Funding & Support — UCSF OCR";

export const HUB_DESCRIPTION =
  "OCR and its partners invest in initiatives that create impact and amplify benefits across the broader research community: new biospecimen streams, protected time in shared labs, fresh analyses of existing data, exchange with other institutions, and programs that connect communities across Parnassus. Most bring people as well as dollars.";

export function getAward(slug: string) {
  return AWARDS.find((award) => award.id === slug);
}

export type SponsorGroup = {
  key: "ocr" | PartnerKey;
  indexLabel: string;
  menuLabel: string;
  awards: FundingOpportunity[];
};

export function sponsorGroups(): SponsorGroup[] {
  const groups: SponsorGroup[] = [
    {
      key: "ocr",
      indexLabel: "Office of Collaborative Research",
      menuLabel: "From OCR",
      awards: AWARDS.filter((award) => award.owner === "ocr"),
    },
    {
      key: "parnassus",
      indexLabel: "Parnassus Institutes",
      menuLabel: "Partner · Parnassus Institutes",
      awards: AWARDS.filter((award) => award.partner === "parnassus"),
    },
    {
      key: "immunox",
      indexLabel: "Bakar ImmunoX Initiative",
      menuLabel: "Partner · Bakar ImmunoX Initiative",
      awards: AWARDS.filter((award) => award.partner === "immunox"),
    },
  ];
  return groups.filter((group) => group.awards.length > 0);
}

export function kindLabel(id: string) {
  const kind = KIND[id] as SupportKind | undefined;
  return kind ? KIND_LABEL[kind] : "";
}

export function motifFor(id: string): ProjectMotifKey {
  return (MOTIFS[id]?.[0] ?? "polesquare") as ProjectMotifKey;
}

export function contactFor(award?: FundingOpportunity) {
  if (award?.contactName && award.contactRole && award.contactEmail && award.contactInitials) {
    return {
      name: award.contactName,
      role: award.contactRole,
      email: award.contactEmail,
      initials: award.contactInitials,
    };
  }
  return {
    name: DEFAULT_CONTACT.contactName,
    role: DEFAULT_CONTACT.contactRole,
    email: DEFAULT_CONTACT.contactEmail,
    initials: DEFAULT_CONTACT.contactInitials,
  };
}

export function num(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function accessDot(restricted: boolean) {
  return restricted ? ACCESS_DOT.restricted : ACCESS_DOT.open;
}

export function accessLabel(restricted: boolean) {
  return restricted ? "Restricted" : "Open to all";
}

export function ownerLine(award: FundingOpportunity) {
  if (award.owner === "partner") {
    return `Offered by ${award.partnerName}. OCR helps applicants prepare and supports recipients.`;
  }
  return "Funded and run by the Office of Collaborative Research.";
}

export { AWARDS, PARTNERS };
export type { FundingOpportunity };
