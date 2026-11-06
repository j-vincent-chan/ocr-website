import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { SiteShell, Breadcrumb, SERVICES } from "@/components/site/chrome";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Get in touch — UCSF Office of Collaborative Research" },
      {
        name: "description",
        content:
          "Start a conversation with OCR. Tell us about your research, the services you're interested in, and we'll get back to you.",
      },
      { property: "og:title", content: "Get in touch — UCSF OCR" },
      {
        property: "og:description",
        content: "Tell us about your project. We can't wait to collaborate.",
      },
    ],
  }),
  component: ContactPage,
});

const SERVICE_OPTIONS = [
  "Research Development",
  "Research Operations & Management",
  "Data Management & Sharing",
  "Research Resources & AI Tools",
  "Other",
] as const;

const BACKGROUNDS = [
  "UCSF Principal Investigator",
  "UCSF Postdoc / Trainee",
  "UCSF Staff / Admin",
  "External Academic",
  "Industry",
  "Foundation / Funder",
  "Other",
] as const;

const SOURCES = [
  "A colleague",
  "ImmunoX event",
  "Search",
  "Newsletter",
  "Social media",
  "Other",
] as const;

const FormSchema = z.object({
  name: z.string().trim().min(1, "Please share your name").max(100),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email")
    .max(255),
  affiliation: z.string().trim().max(200).optional().or(z.literal("")),
  background: z.string().max(100).optional().or(z.literal("")),
  services: z.array(z.string()).max(SERVICE_OPTIONS.length),
  message: z
    .string()
    .trim()
    .min(10, "A sentence or two helps us route your message")
    .max(2000),
  source: z.string().max(100).optional().or(z.literal("")),
});

type FormState = z.infer<typeof FormSchema>;

const INITIAL: FormState = {
  name: "",
  email: "",
  affiliation: "",
  background: "",
  services: [],
  message: "",
  source: "",
};

function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream border-b border-ink/10">
      <div
        aria-hidden
        className="absolute -top-32 right-0 w-[640px] h-[640px] rounded-full blur-3xl opacity-25"
        style={{ background: "var(--gradient-sunburst)" }}
      />
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-16 relative">
        <span className="text-xs uppercase tracking-[0.22em] text-teal font-medium">
          Get in touch
        </span>
        <h1 className="mt-6 font-display text-[clamp(2.75rem,7vw,6rem)] leading-[0.95] tracking-tight text-ink max-w-[18ch]">
          Tell us about <em className="not-italic text-gradient-sunburst">your science.</em>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          A short note is enough. Share the project, the services you're
          interested in, and how we can help. We typically reply within two
          business days.
        </p>
      </div>
    </section>
  );
}

function Sidebar() {
  return (
    <aside className="lg:col-span-4 space-y-6">
      <div className="rounded-3xl border border-border bg-card p-6">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">
          Email
        </div>
        <a
          href="mailto:ocr@ucsf.edu"
          className="block mt-2 font-display text-2xl text-ink hover:underline"
        >
          ocr@ucsf.edu
        </a>
        <div className="mt-5 text-xs uppercase tracking-widest text-muted-foreground">
          Office
        </div>
        <div className="mt-2 text-sm text-ink/80 leading-relaxed">
          UCSF Parnassus Heights
          <br />
          San Francisco, California
        </div>
        <div className="mt-5 text-xs uppercase tracking-widest text-muted-foreground">
          Response time
        </div>
        <div className="mt-2 text-sm text-ink/80">
          Within 2 business days
        </div>
      </div>

      <div className="rounded-3xl bg-ink text-white p-6">
        <div className="text-xs uppercase tracking-widest text-white/60">
          What we do
        </div>
        <ul className="mt-4 space-y-3">
          {SERVICES.map((s) => (
            <li key={s.to} className="flex items-start gap-2.5 text-sm">
              <span
                className="mt-1.5 w-2 h-2 rounded-full flex-none"
                style={{ background: s.accent }}
              />
              <div>
                <div className="font-medium leading-tight">{s.name}</div>
                <div className="text-white/60 text-xs mt-0.5">{s.desc}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggleService(s: string) {
    setForm((f) => ({
      ...f,
      services: f.services.includes(s)
        ? f.services.filter((x) => x !== s)
        : [...f.services, s],
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = FormSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const k = String(issue.path[0]);
        if (!fieldErrors[k]) fieldErrors[k] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});

    // Compose a mailto with the submission. Keeps the form fully client-side
    // and consistent with the rest of the site (no backend wired yet).
    const subject = `OCR inquiry — ${parsed.data.name}`;
    const body = [
      `Name: ${parsed.data.name}`,
      `Email: ${parsed.data.email}`,
      parsed.data.affiliation ? `Affiliation: ${parsed.data.affiliation}` : "",
      parsed.data.background ? `Background: ${parsed.data.background}` : "",
      parsed.data.services.length
        ? `Services of interest: ${parsed.data.services.join(", ")}`
        : "",
      "",
      "Message:",
      parsed.data.message,
      "",
      parsed.data.source ? `Heard about us via: ${parsed.data.source}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    window.location.href = `mailto:ocr@ucsf.edu?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="lg:col-span-8 rounded-3xl border border-border bg-card p-10 md:p-14">
        <div
          aria-hidden
          className="w-16 h-16 rounded-full mb-6"
          style={{ background: "var(--gradient-sunburst)" }}
        />
        <h2 className="font-display text-4xl text-ink leading-tight">
          Your message is on its way.
        </h2>
        <p className="mt-4 text-muted-foreground max-w-lg leading-relaxed">
          We've opened your email client with a pre-filled message to{" "}
          <span className="text-ink font-medium">ocr@ucsf.edu</span>. Send it
          off and you'll hear from us within two business days. We can't wait
          to collaborate.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setForm(INITIAL);
          }}
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 text-sm font-medium hover:bg-secondary transition"
        >
          Submit another
        </button>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-2xl border border-border bg-card px-4 py-3 text-ink placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-coral/40 focus:border-coral/60 transition";

  return (
    <form onSubmit={handleSubmit} className="lg:col-span-8 space-y-8" noValidate>
      <div className="rounded-3xl border border-border bg-card p-8 md:p-10 space-y-6">
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">
              Name <span className="text-coral">*</span>
            </label>
            <input
              className={`${inputCls} mt-2`}
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Your full name"
              maxLength={100}
              required
            />
            {errors.name && (
              <p className="mt-1.5 text-xs text-destructive">{errors.name}</p>
            )}
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">
              Email <span className="text-coral">*</span>
            </label>
            <input
              type="email"
              className={`${inputCls} mt-2`}
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="you@ucsf.edu"
              maxLength={255}
              required
            />
            {errors.email && (
              <p className="mt-1.5 text-xs text-destructive">{errors.email}</p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">
              Affiliation
            </label>
            <input
              className={`${inputCls} mt-2`}
              value={form.affiliation}
              onChange={(e) => update("affiliation", e.target.value)}
              placeholder="Lab, institution, or organization"
              maxLength={200}
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">
              Background
            </label>
            <select
              className={`${inputCls} mt-2 appearance-none`}
              value={form.background}
              onChange={(e) => update("background", e.target.value)}
            >
              <option value="">Select one…</option>
              {BACKGROUNDS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-card p-8 md:p-10">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">
          Services of interest
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Select any that apply.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {SERVICE_OPTIONS.map((s) => {
            const active = form.services.includes(s);
            return (
              <button
                key={s}
                type="button"
                onClick={() => toggleService(s)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                  active
                    ? "bg-ink text-white border-ink"
                    : "bg-card text-ink border-border hover:border-ink/40"
                }`}
                aria-pressed={active}
              >
                {active && <span aria-hidden className="mr-1.5">✓</span>}
                {s}
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-card p-8 md:p-10 space-y-6">
        <div>
          <label className="text-xs uppercase tracking-widest text-muted-foreground">
            Message <span className="text-coral">*</span>
          </label>
          <textarea
            className={`${inputCls} mt-2 min-h-[180px] resize-y`}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder="Tell us about the project, timeline, and what you're hoping for."
            maxLength={2000}
            required
          />
          <div className="mt-1.5 flex justify-between text-xs">
            {errors.message ? (
              <span className="text-destructive">{errors.message}</span>
            ) : (
              <span className="text-muted-foreground">
                A sentence or two is enough.
              </span>
            )}
            <span className="text-muted-foreground">
              {form.message.length}/2000
            </span>
          </div>
        </div>

        <div>
          <label className="text-xs uppercase tracking-widest text-muted-foreground">
            How did you hear about us?
          </label>
          <select
            className={`${inputCls} mt-2 appearance-none`}
            value={form.source}
            onChange={(e) => update("source", e.target.value)}
          >
            <option value="">Select one…</option>
            {SOURCES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground max-w-md">
          By submitting, you agree to let OCR contact you about your inquiry.
          We don't share contact info outside the office.
        </p>
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-full bg-ink text-white px-7 py-3.5 text-sm font-medium hover:bg-ink/90 transition shadow-soft"
        >
          Send message
          <span aria-hidden>→</span>
        </button>
      </div>
    </form>
  );
}

function ContactPage() {
  return (
    <SiteShell>
      <Breadcrumb trail={[{ label: "Get in touch" }]} />
      <Hero />
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-10">
          <ContactForm />
          <Sidebar />
        </div>
      </section>
    </SiteShell>
  );
}
