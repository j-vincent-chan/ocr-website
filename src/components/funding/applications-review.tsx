import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import type { Session, User } from "@supabase/supabase-js";
import { AWARDS } from "@/data/funding";
import {
  APPLICATION_STATUSES,
  STATUS_LABEL,
  listFundingApplications,
  updateApplicationReview,
} from "@/lib/funding-applications";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import type { ApplicationStatus, FundingApplicationRow } from "@/types/supabase";
import { focusRing, inkPillClass } from "./primitives";

const ANSWER_LABELS: Record<string, string> = {
  department: "Primary department",
  immunoxMember: "ImmunoX member",
  streamType: "Sample stream type",
  sampleStream: "Proposed clinical sample stream",
  resources: "Resources needed",
  researchQuestions: "Research questions",
  collaborators: "Interested collaborators",
  regulatory: "Regulatory status",
  grantLead: "Can lead grant application",
  accessPlan: "Access / sharing plan",
};

function awardLabel(id: string) {
  return AWARDS.find((a) => a.id === id)?.short ?? id;
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

function answerText(row: FundingApplicationRow, key: string) {
  const value = row.answers?.[key];
  return value == null || value === "" ? "—" : String(value);
}

export function ApplicationsReviewPage() {
  if (!isSupabaseConfigured()) {
    return (
      <SetupMissing
        title="Connect Supabase to review applications"
        body="Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local, run supabase/schema.sql, then restart the dev server."
      />
    );
  }

  return <ApplicationsReviewAuthed />;
}

function ApplicationsReviewAuthed() {
  const supabase = useMemo(() => getSupabase(), []);
  const [session, setSession] = useState<Session | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authMode, setAuthMode] = useState<"magic" | "password">("password");
  const [authMessage, setAuthMessage] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    let mounted = true;

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!mounted) return;
        setSession(data.session);
      })
      .catch(() => {
        /* show sign-in form */
      })
      .finally(() => {
        if (mounted) setAuthReady(true);
      });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      if (!mounted) return;
      setSession(next);
      setAuthReady(true);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [supabase]);

  async function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    setAuthError(null);
    setAuthMessage(null);
    setSending(true);
    try {
      if (authMode === "password") {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithOtp({
          email: email.trim(),
          options: {
            emailRedirectTo: `${window.location.origin}/funding/applications`,
          },
        });
        if (error) throw error;
        setAuthMessage("Check your email for a magic link to sign in.");
      }
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : "Could not sign in.");
    } finally {
      setSending(false);
    }
  }

  if (!authReady) {
    return (
      <PageShell>
        <p className="text-muted-foreground">Checking sign-in…</p>
      </PageShell>
    );
  }

  if (!session?.user) {
    return (
      <PageShell>
        <div className="mx-auto max-w-md rounded-[20px] border border-border bg-card p-8">
          <h1 className="font-display text-3xl text-ink">Staff sign-in</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            OCR team only. Sign in with an invited staff account to review all funding submissions.
          </p>

          <div className="mt-5 flex gap-2">
            {(
              [
                ["password", "Email & password"],
                ["magic", "Magic link"],
              ] as const
            ).map(([mode, label]) => {
              const active = authMode === mode;
              return (
                <button
                  key={mode}
                  type="button"
                  onClick={() => {
                    setAuthMode(mode);
                    setAuthError(null);
                    setAuthMessage(null);
                  }}
                  className={`min-h-10 rounded-full border px-3.5 text-xs font-medium transition ${
                    active
                      ? "border-ink bg-ink text-white"
                      : "border-border bg-card text-ink hover:border-ink/40"
                  } ${focusRing}`}
                  aria-pressed={active}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <form onSubmit={handleAuth} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="staff-email"
                className="text-xs uppercase tracking-widest text-muted-foreground"
              >
                Email
              </label>
              <input
                id="staff-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-border bg-card px-4 py-3 text-ink focus:border-coral-aa focus:outline-none focus:ring-2 focus:ring-coral-aa"
                placeholder="you@ucsf.edu"
              />
            </div>
            {authMode === "password" ? (
              <div>
                <label
                  htmlFor="staff-password"
                  className="text-xs uppercase tracking-widest text-muted-foreground"
                >
                  Password
                </label>
                <input
                  id="staff-password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-border bg-card px-4 py-3 text-ink focus:border-coral-aa focus:outline-none focus:ring-2 focus:ring-coral-aa"
                />
              </div>
            ) : null}
            {authError ? (
              <p role="alert" className="text-sm text-destructive">
                {authError}
              </p>
            ) : null}
            {authMessage ? (
              <p role="status" className="text-sm text-teal-aa">
                {authMessage}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={sending}
              className={`${inkPillClass} min-h-12 w-full px-6 py-3 text-sm disabled:opacity-60`}
            >
              {sending
                ? "Working…"
                : authMode === "password"
                  ? "Sign in"
                  : "Email magic link"}
            </button>
          </form>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            Create staff users in Supabase → Authentication → Users. For password sign-in, set a
            password when inviting or use “Send password recovery.”
          </p>
        </div>
      </PageShell>
    );
  }

  return <ReviewDashboard user={session.user} onSignOut={() => void supabase.auth.signOut()} />;
}

function ReviewDashboard({ user, onSignOut }: { user: User; onSignOut: () => void }) {
  const [rows, setRows] = useState<FundingApplicationRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [awardFilter, setAwardFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | "all">("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listFundingApplications(awardFilter);
      setRows(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load applications.");
    } finally {
      setLoading(false);
    }
  }, [awardFilter]);

  useEffect(() => {
    void load();
  }, [load]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      if (statusFilter !== "all" && r.status !== statusFilter) return false;
      if (!q) return true;
      const hay = [
        r.applicant_name,
        r.applicant_email,
        awardLabel(r.award_id),
        answerText(r, "department"),
        STATUS_LABEL[r.status],
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [rows, statusFilter, query]);

  const selected = selectedId ? (filtered.find((r) => r.id === selectedId) ?? null) : null;

  return (
    <PageShell>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-teal-aa">OCR staff</p>
          <h1 className="mt-2 font-display text-[clamp(32px,4vw,44px)] text-ink">
            All submissions
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {loading
              ? "Loading…"
              : `${filtered.length} application${filtered.length === 1 ? "" : "s"}`}
            {" · "}
            Signed in as {user.email}
          </p>
        </div>
        <button
          type="button"
          onClick={onSignOut}
          className={`rounded-full border border-ink/20 px-4 py-2 text-sm font-medium text-ink hover:border-ink/50 ${focusRing}`}
        >
          Sign out
        </button>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <label className="sr-only" htmlFor="submission-search">
          Search
        </label>
        <input
          id="submission-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, email, department…"
          className="min-h-11 min-w-[220px] flex-1 rounded-full border border-border bg-card px-4 text-sm"
        />
        <label className="sr-only" htmlFor="award-filter">
          Award
        </label>
        <select
          id="award-filter"
          value={awardFilter}
          onChange={(e) => setAwardFilter(e.target.value)}
          className="min-h-11 rounded-full border border-border bg-card px-4 text-sm"
        >
          <option value="all">All awards</option>
          {AWARDS.map((a) => (
            <option key={a.id} value={a.id}>
              {a.short}
            </option>
          ))}
        </select>
        <label className="sr-only" htmlFor="status-filter">
          Status
        </label>
        <select
          id="status-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as ApplicationStatus | "all")}
          className="min-h-11 rounded-full border border-border bg-card px-4 text-sm"
        >
          <option value="all">All statuses</option>
          {APPLICATION_STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABEL[s]}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => void load()}
          className={`min-h-11 rounded-full border border-ink/20 px-4 text-sm font-medium ${focusRing}`}
        >
          Refresh
        </button>
      </div>

      {error ? (
        <p role="alert" className="mt-6 text-sm text-destructive">
          {error}
        </p>
      ) : null}

      {loading ? (
        <p className="mt-10 text-muted-foreground">Loading applications…</p>
      ) : filtered.length === 0 ? (
        <p className="mt-10 text-muted-foreground">No applications match these filters.</p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-[20px] border border-border bg-card">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-ink/10 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                <th className="px-4 py-3 font-medium">Submitted</th>
                <th className="px-4 py-3 font-medium">Applicant</th>
                <th className="px-4 py-3 font-medium">Award</th>
                <th className="px-4 py-3 font-medium">Department</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => {
                const active = selected?.id === row.id;
                return (
                  <tr key={row.id} className="border-b border-ink/8 last:border-b-0">
                    <td colSpan={5} className="p-0">
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedId((id) => (id === row.id ? null : row.id))
                        }
                        className={`grid w-full grid-cols-[7rem_minmax(0,1.4fr)_minmax(0,1.2fr)_minmax(0,1fr)_7rem] items-start gap-0 px-0 py-0 text-left transition ${
                          active ? "bg-ink text-white" : "hover:bg-cream/80"
                        } ${focusRing}`}
                        aria-expanded={active}
                      >
                        <span className="px-4 py-3.5">{formatDate(row.created_at)}</span>
                        <span className="px-4 py-3.5">
                          <span className="block font-medium">{row.applicant_name}</span>
                          <span
                            className={`mt-0.5 block text-xs ${active ? "text-white/65" : "text-muted-foreground"}`}
                          >
                            {row.applicant_email}
                          </span>
                        </span>
                        <span className="px-4 py-3.5">{awardLabel(row.award_id)}</span>
                        <span className="px-4 py-3.5">{answerText(row, "department")}</span>
                        <span className="px-4 py-3.5">{STATUS_LABEL[row.status]}</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {selected ? (
        <div className="mt-6">
          <ApplicationDetail
            key={selected.id}
            row={selected}
            reviewerEmail={user.email ?? ""}
            onSaved={(next) => {
              setRows((prev) => prev.map((r) => (r.id === next.id ? next : r)));
            }}
            onClose={() => setSelectedId(null)}
          />
        </div>
      ) : filtered.length > 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">Select a row to read the full application.</p>
      ) : null}
    </PageShell>
  );
}

function ApplicationDetail({
  row,
  reviewerEmail,
  onSaved,
  onClose,
}: {
  row: FundingApplicationRow;
  reviewerEmail: string;
  onSaved: (row: FundingApplicationRow) => void;
  onClose: () => void;
}) {
  const [status, setStatus] = useState(row.status);
  const [notes, setNotes] = useState(row.staff_notes ?? "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const answers = Object.entries(row.answers ?? {});

  async function save() {
    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      const next = await updateApplicationReview(row.id, {
        status,
        staff_notes: notes,
        reviewerEmail,
      });
      onSaved(next);
      setMessage("Review saved.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save review.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <article className="rounded-[20px] border border-border bg-card p-6 md:p-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-3xl text-ink">{row.applicant_name}</h2>
          <a
            href={`mailto:${row.applicant_email}`}
            className={`mt-1 inline-block text-sm text-teal-aa underline underline-offset-2 ${focusRing}`}
          >
            {row.applicant_email}
          </a>
          <p className="mt-2 text-sm text-muted-foreground">
            {awardLabel(row.award_id)}
            {row.cycle ? ` · Cycle ${row.cycle}` : ""} · Submitted {formatDate(row.created_at)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-ink/15 px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] text-ink-muted-2">
            {STATUS_LABEL[row.status]}
          </span>
          <button
            type="button"
            onClick={onClose}
            className={`rounded-full border border-ink/20 px-3 py-1.5 text-xs font-medium ${focusRing}`}
          >
            Close
          </button>
        </div>
      </div>

      <dl className="mt-8 space-y-5 border-t border-ink/10 pt-6">
        {answers.map(([key, value]) => (
          <div key={key}>
            <dt className="text-xs uppercase tracking-widest text-muted-foreground">
              {ANSWER_LABELS[key] ?? key}
            </dt>
            <dd className="mt-1.5 whitespace-pre-wrap text-sm leading-relaxed text-ink">
              {String(value ?? "")}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 space-y-4 border-t border-ink/10 pt-6">
        <h3 className="font-display text-xl text-ink">Review</h3>
        <div>
          <label
            htmlFor="review-status"
            className="text-xs uppercase tracking-widest text-muted-foreground"
          >
            Status
          </label>
          <select
            id="review-status"
            value={status}
            onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
            className="mt-2 w-full rounded-2xl border border-border px-4 py-3 text-sm"
          >
            {APPLICATION_STATUSES.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABEL[s]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="review-notes"
            className="text-xs uppercase tracking-widest text-muted-foreground"
          >
            Staff notes
          </label>
          <textarea
            id="review-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-2 min-h-[120px] w-full resize-y rounded-2xl border border-border px-4 py-3 text-sm"
            placeholder="Internal notes for the committee"
          />
        </div>
        {error ? (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        ) : null}
        {message ? (
          <p role="status" className="text-sm text-teal-aa">
            {message}
          </p>
        ) : null}
        <button
          type="button"
          onClick={() => void save()}
          disabled={saving}
          className={`${inkPillClass} min-h-12 px-6 py-3 text-sm disabled:opacity-60`}
        >
          {saving ? "Saving…" : "Save review"}
        </button>
        {row.reviewed_at ? (
          <p className="text-xs text-muted-foreground">
            Last reviewed {formatDate(row.reviewed_at)}
            {row.reviewed_by ? ` by ${row.reviewed_by}` : ""}
          </p>
        ) : null}
      </div>
    </article>
  );
}

function PageShell({ children }: { children: ReactNode }) {
  return (
    <div>
      <section className="border-b border-ink/10 bg-cream">
        <div
          className="mx-auto max-w-7xl px-6 pb-10"
          style={{ paddingTop: "clamp(28px, 4vw, 44px)" }}
        >
          <p className="flex flex-wrap items-center gap-2 text-[13px] text-ink-muted-2">
            <Link to="/funding" className={`hover:text-ink hover:underline ${focusRing}`}>
              Funding & Support
            </Link>
            <span aria-hidden>/</span>
            <span aria-current="page">Applications</span>
          </p>
        </div>
      </section>
      <section className="py-10 md:py-12">
        <div className="mx-auto max-w-7xl px-6">{children}</div>
      </section>
    </div>
  );
}

function SetupMissing({ title, body }: { title: string; body: string }) {
  return (
    <PageShell>
      <div className="max-w-xl rounded-[20px] border border-border bg-card p-8">
        <h1 className="font-display text-3xl text-ink">{title}</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
        <p className="mt-4 text-sm text-muted-foreground">
          See <code className="text-ink">supabase/README.md</code> for setup steps.
        </p>
      </div>
    </PageShell>
  );
}
