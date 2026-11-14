import { getSupabase } from "@/lib/supabase";
import type {
  ApplicationStatus,
  FundingApplicationInsert,
  FundingApplicationRow,
} from "@/types/supabase";

export const APPLICATION_STATUSES: ApplicationStatus[] = [
  "submitted",
  "in_review",
  "accepted",
  "declined",
  "withdrawn",
];

export const STATUS_LABEL: Record<ApplicationStatus, string> = {
  submitted: "Submitted",
  in_review: "In review",
  accepted: "Accepted",
  declined: "Declined",
  withdrawn: "Withdrawn",
};

export async function submitFundingApplication(row: FundingApplicationInsert) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("funding_applications")
    .insert({
      ...row,
      status: "submitted",
      staff_notes: null,
      reviewed_by: null,
      reviewed_at: null,
    })
    .select("id")
    .single();

  if (error) throw error;
  return data;
}

export async function listFundingApplications(awardId?: string) {
  const supabase = getSupabase();
  let query = supabase
    .from("funding_applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (awardId && awardId !== "all") {
    query = query.eq("award_id", awardId);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as FundingApplicationRow[];
}

export async function updateApplicationReview(
  id: string,
  patch: {
    status: ApplicationStatus;
    staff_notes: string;
    reviewerEmail: string;
  },
) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("funding_applications")
    .update({
      status: patch.status,
      staff_notes: patch.staff_notes.trim() || null,
      reviewed_by: patch.reviewerEmail,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;
  return data as FundingApplicationRow;
}
