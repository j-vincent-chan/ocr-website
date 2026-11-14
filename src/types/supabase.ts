export type ApplicationStatus =
  | "submitted"
  | "in_review"
  | "accepted"
  | "declined"
  | "withdrawn";

export type FundingApplicationRow = {
  id: string;
  created_at: string;
  updated_at: string;
  award_id: string;
  cycle: string | null;
  status: ApplicationStatus;
  applicant_name: string;
  applicant_email: string;
  answers: Record<string, unknown>;
  staff_notes: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
};

export type FundingApplicationInsert = {
  award_id: string;
  cycle?: string | null;
  status?: ApplicationStatus;
  applicant_name: string;
  applicant_email: string;
  answers: Record<string, unknown>;
  staff_notes?: string | null;
  reviewed_by?: string | null;
  reviewed_at?: string | null;
};

export type FundingApplicationUpdate = {
  status?: ApplicationStatus;
  staff_notes?: string | null;
  reviewed_by?: string | null;
  reviewed_at?: string | null;
};

export type Database = {
  public: {
    Tables: {
      funding_applications: {
        Row: FundingApplicationRow;
        Insert: FundingApplicationInsert;
        Update: FundingApplicationUpdate;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      application_status: ApplicationStatus;
    };
    CompositeTypes: Record<string, never>;
  };
};
