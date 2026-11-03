const roleInquiryHref = (subject: string) =>
  `mailto:ocr@ucsf.edu?subject=${encodeURIComponent(subject)}`;

export const OPEN_POSITIONS = {
  researchDevelopmentStrategist: {
    title: "Research Development Strategist",
    href: roleInquiryHref("Research Development Strategist position"),
  },
  immunoxCommunityManager: {
    title: "ImmunoX Community Manager",
    href: "https://iazuqy.fa.ocs.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX_1/job/9662",
  },
} as const;
