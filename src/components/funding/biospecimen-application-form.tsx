import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { z } from "zod";
import { submitFundingApplication } from "@/lib/funding-applications";
import { isSupabaseConfigured } from "@/lib/supabase";
import { focusRing, inkPillClass } from "./primitives";

const STREAM_TYPES = ["New", "Existing"] as const;
const REGULATORY = ["Not started", "In preparation", "Submitted", "Approved"] as const;
const YES_NO = ["Yes", "No"] as const;

const FormSchema = z.object({
  piName: z.string().trim().min(1, "Please enter the PI name").max(120),
  email: z.string().trim().email("Please enter a valid email").max(255),
  department: z.string().trim().min(1, "Please enter a primary department").max(200),
  immunoxMember: z
    .string()
    .refine((v): v is (typeof YES_NO)[number] => (YES_NO as readonly string[]).includes(v), {
      message: "Please select yes or no",
    }),
  streamType: z
    .string()
    .refine(
      (v): v is (typeof STREAM_TYPES)[number] => (STREAM_TYPES as readonly string[]).includes(v),
      { message: "Please select new or existing" },
    ),
  sampleStream: z
    .string()
    .trim()
    .min(40, "Please describe the sample stream in a bit more detail")
    .max(4000),
  resources: z
    .string()
    .trim()
    .min(40, "Please describe the resources needed in a bit more detail")
    .max(4000),
  researchQuestions: z
    .string()
    .trim()
    .min(20, "Please share the research questions these samples will enable")
    .max(3000),
  collaborators: z
    .string()
    .trim()
    .min(10, "Please list names and affiliations of interested collaborators")
    .max(4000),
  regulatory: z
    .string()
    .refine(
      (v): v is (typeof REGULATORY)[number] => (REGULATORY as readonly string[]).includes(v),
      { message: "Please select a regulatory status" },
    ),
  grantLead: z.string().refine((v): v is (typeof YES_NO)[number] => (YES_NO as readonly string[]).includes(v), {
    message: "Please indicate whether you or a collaborator can lead a grant application",
  }),
  accessPlan: z
    .string()
    .trim()
    .min(20, "Please describe how access would be managed or shared")
    .max(3000),
});

type FormState = {
  piName: string;
  email: string;
  department: string;
  immunoxMember: string;
  streamType: string;
  sampleStream: string;
  resources: string;
  researchQuestions: string;
  collaborators: string;
  regulatory: string;
  grantLead: string;
  accessPlan: string;
};

const INITIAL: FormState = {
  piName: "",
  email: "",
  department: "",
  immunoxMember: "",
  streamType: "",
  sampleStream: "",
  resources: "",
  researchQuestions: "",
  collaborators: "",
  regulatory: "",
  grantLead: "",
  accessPlan: "",
};

const FIELD_ORDER = [
  "piName",
  "email",
  "department",
  "immunoxMember",
  "streamType",
  "sampleStream",
  "resources",
  "researchQuestions",
  "collaborators",
  "regulatory",
  "grantLead",
  "accessPlan",
] as const;

const inputCls =
  "w-full rounded-2xl border border-border bg-card px-4 py-3 text-ink placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-coral-aa focus:border-coral-aa transition";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-xs text-destructive">
      {message}
    </p>
  );
}

function CharCount({ value, max }: { value: string; max: number }) {
  return (
    <span className="text-muted-foreground">
      {value.length}/{max}
    </span>
  );
}

export function BiospecimenApplicationForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const errorSummary = Object.values(errors).filter(Boolean).join(" ");

  useEffect(() => {
    if (submitted) successRef.current?.focus();
  }, [submitted]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = FormSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof FormState, string>> = {};
      for (const issue of parsed.error.issues) {
        const k = String(issue.path[0]) as keyof FormState;
        if (!fieldErrors[k]) fieldErrors[k] = issue.message;
      }
      setErrors(fieldErrors);
      const first = FIELD_ORDER.find((key) => fieldErrors[key]);
      if (first) {
        requestAnimationFrame(() => document.getElementById(`bio-app-${first}`)?.focus());
      }
      return;
    }

    setErrors({});
    setSubmitError(null);

    if (!isSupabaseConfigured()) {
      setSubmitError(
        "Applications are not accepting submissions yet. Please email ocr@ucsf.edu, or try again once Supabase is connected.",
      );
      return;
    }

    setSubmitting(true);
    try {
      const data = parsed.data;
      await submitFundingApplication({
        award_id: "biospecimen",
        cycle: "2026",
        applicant_name: data.piName,
        applicant_email: data.email,
        answers: {
          department: data.department,
          immunoxMember: data.immunoxMember,
          streamType: data.streamType,
          sampleStream: data.sampleStream,
          resources: data.resources,
          researchQuestions: data.researchQuestions,
          collaborators: data.collaborators,
          regulatory: data.regulatory,
          grantLead: data.grantLead,
          accessPlan: data.accessPlan,
        },
      });
      setSubmitted(true);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong while saving your application.";
      setSubmitError(message);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div role="status" className="rounded-[20px] border border-border bg-card p-10 md:p-14">
        <div
          aria-hidden
          className="mb-6 size-16 rounded-full"
          style={{ background: "var(--gradient-sunburst)" }}
        />
        <h2
          ref={successRef}
          tabIndex={-1}
          className="font-display text-4xl leading-tight text-ink outline-none"
        >
          Your application has been submitted.
        </h2>
        <p className="mt-4 max-w-lg leading-relaxed text-muted-foreground">
          OCR has received your Biospecimen Pipeline application. You'll hear back after the review
          cycle. A confirmation is not emailed automatically yet — keep a copy of your answers if
          you need one.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setForm(INITIAL);
            }}
            className={`${inkPillClass} min-h-12 px-6 py-3 text-sm`}
          >
            Submit another
          </button>
          <Link
            to="/funding/$slug"
            params={{ slug: "biospecimen" }}
            className={`inline-flex min-h-12 items-center justify-center rounded-full border border-ink/20 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink/50 ${focusRing}`}
          >
            Back to opportunity
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      {errorSummary ? (
        <p className="sr-only" role="alert">
          {errorSummary}
        </p>
      ) : null}

      <div className="space-y-6 rounded-[20px] border border-border bg-card p-8 md:p-10">
        <div>
          <h2 className="font-display text-2xl text-ink">Applicant</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Open to anyone in the UCSF research community. ImmunoX membership is helpful context,
            not a requirement.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="bio-app-piName"
              className="text-xs uppercase tracking-widest text-muted-foreground"
            >
              PI name <span className="text-coral-aa">*</span>
            </label>
            <input
              id="bio-app-piName"
              name="piName"
              autoComplete="name"
              className={`${inputCls} mt-2`}
              value={form.piName}
              onChange={(e) => update("piName", e.target.value)}
              placeholder="Full name"
              maxLength={120}
              required
              aria-required="true"
              aria-invalid={errors.piName ? true : undefined}
              aria-describedby={errors.piName ? "bio-app-piName-error" : undefined}
            />
            <FieldError id="bio-app-piName-error" message={errors.piName} />
          </div>
          <div>
            <label
              htmlFor="bio-app-email"
              className="text-xs uppercase tracking-widest text-muted-foreground"
            >
              Email <span className="text-coral-aa">*</span>
            </label>
            <input
              id="bio-app-email"
              name="email"
              type="email"
              autoComplete="email"
              className={`${inputCls} mt-2`}
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="you@ucsf.edu"
              maxLength={255}
              required
              aria-required="true"
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? "bio-app-email-error" : undefined}
            />
            <FieldError id="bio-app-email-error" message={errors.email} />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="bio-app-department"
              className="text-xs uppercase tracking-widest text-muted-foreground"
            >
              Primary department <span className="text-coral-aa">*</span>
            </label>
            <input
              id="bio-app-department"
              name="department"
              className={`${inputCls} mt-2`}
              value={form.department}
              onChange={(e) => update("department", e.target.value)}
              placeholder="Department or division"
              maxLength={200}
              required
              aria-required="true"
              aria-invalid={errors.department ? true : undefined}
              aria-describedby={errors.department ? "bio-app-department-error" : undefined}
            />
            <FieldError id="bio-app-department-error" message={errors.department} />
          </div>
          <div>
            <label
              htmlFor="bio-app-immunoxMember"
              className="text-xs uppercase tracking-widest text-muted-foreground"
            >
              Are you an ImmunoX member? <span className="text-coral-aa">*</span>
            </label>
            <select
              id="bio-app-immunoxMember"
              name="immunoxMember"
              className={`${inputCls} mt-2 appearance-none`}
              value={form.immunoxMember}
              onChange={(e) => update("immunoxMember", e.target.value)}
              required
              aria-required="true"
              aria-invalid={errors.immunoxMember ? true : undefined}
              aria-describedby={errors.immunoxMember ? "bio-app-immunoxMember-error" : undefined}
            >
              <option value="">Select one…</option>
              {YES_NO.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <FieldError id="bio-app-immunoxMember-error" message={errors.immunoxMember} />
          </div>
        </div>
      </div>

      <div className="space-y-6 rounded-[20px] border border-border bg-card p-8 md:p-10">
        <div>
          <h2 className="font-display text-2xl text-ink">Sample stream</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Whether you are creating a new pipeline or improving one with limited support or
            access.
          </p>
        </div>

        <fieldset>
          <legend className="text-xs uppercase tracking-widest text-muted-foreground">
            New or existing clinical sample stream? <span className="text-coral-aa">*</span>
          </legend>
          <div
            className="mt-3 flex flex-wrap gap-2"
            role="radiogroup"
            aria-required="true"
            aria-invalid={errors.streamType ? true : undefined}
            aria-describedby={errors.streamType ? "bio-app-streamType-error" : undefined}
          >
            {STREAM_TYPES.map((option) => {
              const active = form.streamType === option;
              return (
                <button
                  key={option}
                  id={option === "New" ? "bio-app-streamType" : undefined}
                  type="button"
                  onClick={() => update("streamType", option)}
                  className={`min-h-11 rounded-full border px-4 py-2 text-sm font-medium transition ${
                    active
                      ? "border-ink bg-ink text-white"
                      : "border-border bg-card text-ink hover:border-ink/40"
                  } ${focusRing}`}
                  aria-pressed={active}
                >
                  {option}
                </button>
              );
            })}
          </div>
          <FieldError id="bio-app-streamType-error" message={errors.streamType} />
        </fieldset>

        <div>
          <label
            htmlFor="bio-app-sampleStream"
            className="text-xs uppercase tracking-widest text-muted-foreground"
          >
            Describe the proposed clinical sample stream <span className="text-coral-aa">*</span>
          </label>
          <p id="bio-app-sampleStream-hint" className="mt-1 text-sm text-muted-foreground">
            Include biospecimen types, source population, clinical locations, clinic days, and
            expected rate and duration of collection.
          </p>
          <textarea
            id="bio-app-sampleStream"
            name="sampleStream"
            className={`${inputCls} mt-2 min-h-[160px] resize-y`}
            value={form.sampleStream}
            onChange={(e) => update("sampleStream", e.target.value)}
            maxLength={4000}
            required
            aria-required="true"
            aria-invalid={errors.sampleStream ? true : undefined}
            aria-describedby={
              errors.sampleStream ? "bio-app-sampleStream-error" : "bio-app-sampleStream-hint"
            }
          />
          <div className="mt-1.5 flex justify-between text-xs">
            {errors.sampleStream ? (
              <span id="bio-app-sampleStream-error" className="text-destructive">
                {errors.sampleStream}
              </span>
            ) : (
              <span />
            )}
            <CharCount value={form.sampleStream} max={4000} />
          </div>
        </div>

        <div>
          <label
            htmlFor="bio-app-resources"
            className="text-xs uppercase tracking-widest text-muted-foreground"
          >
            Resources, infrastructure, or accommodations needed{" "}
            <span className="text-coral-aa">*</span>
          </label>
          <p id="bio-app-resources-hint" className="mt-1 text-sm text-muted-foreground">
            For example: CRC effort and responsibilities, clinical workflows, space, equipment,
            databasing, language access, or special skillsets.
          </p>
          <textarea
            id="bio-app-resources"
            name="resources"
            className={`${inputCls} mt-2 min-h-[140px] resize-y`}
            value={form.resources}
            onChange={(e) => update("resources", e.target.value)}
            maxLength={4000}
            required
            aria-required="true"
            aria-invalid={errors.resources ? true : undefined}
            aria-describedby={
              errors.resources ? "bio-app-resources-error" : "bio-app-resources-hint"
            }
          />
          <div className="mt-1.5 flex justify-between text-xs">
            {errors.resources ? (
              <span id="bio-app-resources-error" className="text-destructive">
                {errors.resources}
              </span>
            ) : (
              <span />
            )}
            <CharCount value={form.resources} max={4000} />
          </div>
        </div>

        <div>
          <label
            htmlFor="bio-app-researchQuestions"
            className="text-xs uppercase tracking-widest text-muted-foreground"
          >
            Research questions these samples will enable{" "}
            <span className="text-coral-aa">*</span>
          </label>
          <textarea
            id="bio-app-researchQuestions"
            name="researchQuestions"
            className={`${inputCls} mt-2 min-h-[120px] resize-y`}
            value={form.researchQuestions}
            onChange={(e) => update("researchQuestions", e.target.value)}
            placeholder="Briefly describe the questions."
            maxLength={3000}
            required
            aria-required="true"
            aria-invalid={errors.researchQuestions ? true : undefined}
            aria-describedby={
              errors.researchQuestions ? "bio-app-researchQuestions-error" : undefined
            }
          />
          <div className="mt-1.5 flex justify-between text-xs">
            {errors.researchQuestions ? (
              <span id="bio-app-researchQuestions-error" className="text-destructive">
                {errors.researchQuestions}
              </span>
            ) : (
              <span />
            )}
            <CharCount value={form.researchQuestions} max={3000} />
          </div>
        </div>
      </div>

      <div className="space-y-6 rounded-[20px] border border-border bg-card p-8 md:p-10">
        <div>
          <h2 className="font-display text-2xl text-ink">Collaboration & compliance</h2>
        </div>

        <div>
          <label
            htmlFor="bio-app-collaborators"
            className="text-xs uppercase tracking-widest text-muted-foreground"
          >
            Who else would benefit from or be interested in this pipeline?{" "}
            <span className="text-coral-aa">*</span>
          </label>
          <p id="bio-app-collaborators-hint" className="mt-1 text-sm text-muted-foreground">
            List names and affiliations (labs, programs, or research communities). You can also
            attach a spreadsheet in the email before sending.
          </p>
          <textarea
            id="bio-app-collaborators"
            name="collaborators"
            className={`${inputCls} mt-2 min-h-[120px] resize-y`}
            value={form.collaborators}
            onChange={(e) => update("collaborators", e.target.value)}
            placeholder={"Name — Affiliation\nName — Affiliation"}
            maxLength={4000}
            required
            aria-required="true"
            aria-invalid={errors.collaborators ? true : undefined}
            aria-describedby={
              errors.collaborators ? "bio-app-collaborators-error" : "bio-app-collaborators-hint"
            }
          />
          <div className="mt-1.5 flex justify-between text-xs">
            {errors.collaborators ? (
              <span id="bio-app-collaborators-error" className="text-destructive">
                {errors.collaborators}
              </span>
            ) : (
              <span />
            )}
            <CharCount value={form.collaborators} max={4000} />
          </div>
        </div>

        <div>
          <label
            htmlFor="bio-app-regulatory"
            className="text-xs uppercase tracking-widest text-muted-foreground"
          >
            Regulatory approvals (e.g. IRB) <span className="text-coral-aa">*</span>
          </label>
          <select
            id="bio-app-regulatory"
            name="regulatory"
            className={`${inputCls} mt-2 appearance-none`}
            value={form.regulatory}
            onChange={(e) => update("regulatory", e.target.value)}
            required
            aria-required="true"
            aria-invalid={errors.regulatory ? true : undefined}
            aria-describedby={errors.regulatory ? "bio-app-regulatory-error" : undefined}
          >
            <option value="">Select one…</option>
            {REGULATORY.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <FieldError id="bio-app-regulatory-error" message={errors.regulatory} />
        </div>

        <fieldset>
          <legend className="text-xs uppercase tracking-widest text-muted-foreground">
            Willing and able to lead a grant application with OCR grantwriter support?{" "}
            <span className="text-coral-aa">*</span>
          </legend>
          <div
            className="mt-3 flex flex-wrap gap-2"
            role="radiogroup"
            aria-required="true"
            aria-invalid={errors.grantLead ? true : undefined}
            aria-describedby={errors.grantLead ? "bio-app-grantLead-error" : undefined}
          >
            {YES_NO.map((option) => {
              const active = form.grantLead === option;
              return (
                <button
                  key={option}
                  id={option === "Yes" ? "bio-app-grantLead" : undefined}
                  type="button"
                  onClick={() => update("grantLead", option)}
                  className={`min-h-11 rounded-full border px-4 py-2 text-sm font-medium transition ${
                    active
                      ? "border-ink bg-ink text-white"
                      : "border-border bg-card text-ink hover:border-ink/40"
                  } ${focusRing}`}
                  aria-pressed={active}
                >
                  {option}
                </button>
              );
            })}
          </div>
          <FieldError id="bio-app-grantLead-error" message={errors.grantLead} />
        </fieldset>

        <div>
          <label
            htmlFor="bio-app-accessPlan"
            className="text-xs uppercase tracking-widest text-muted-foreground"
          >
            If successful, how would access be managed or shared?{" "}
            <span className="text-coral-aa">*</span>
          </label>
          <textarea
            id="bio-app-accessPlan"
            name="accessPlan"
            className={`${inputCls} mt-2 min-h-[120px] resize-y`}
            value={form.accessPlan}
            onChange={(e) => update("accessPlan", e.target.value)}
            maxLength={3000}
            required
            aria-required="true"
            aria-invalid={errors.accessPlan ? true : undefined}
            aria-describedby={errors.accessPlan ? "bio-app-accessPlan-error" : undefined}
          />
          <div className="mt-1.5 flex justify-between text-xs">
            {errors.accessPlan ? (
              <span id="bio-app-accessPlan-error" className="text-destructive">
                {errors.accessPlan}
              </span>
            ) : (
              <span />
            )}
            <CharCount value={form.accessPlan} max={3000} />
          </div>
        </div>
      </div>

      {submitError ? (
        <p role="alert" className="rounded-2xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {submitError}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="max-w-md text-xs text-muted-foreground">
          No account required. Your application is stored securely for OCR review. Deadline:
          February 2026.
        </p>
        <button
          type="submit"
          disabled={submitting}
          className={`${inkPillClass} min-h-12 gap-2 px-7 py-3.5 text-sm shadow-soft disabled:cursor-not-allowed disabled:opacity-60`}
        >
          {submitting ? "Submitting…" : "Submit application"}
          <span aria-hidden>→</span>
        </button>
      </div>
    </form>
  );
}
