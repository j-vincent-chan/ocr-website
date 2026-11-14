import { createFileRoute, Link } from "@tanstack/react-router";
import { BiospecimenApplicationForm } from "@/components/funding/biospecimen-application-form";
import { getAward } from "@/components/funding/lib";
import { focusRing } from "@/components/funding/primitives";

const TITLE = "Apply — Biospecimen Pipeline Support — UCSF OCR";
const DESCRIPTION =
  "Apply online for OCR's Human Biospecimen Pipeline Development award: up to 25% CRC effort for one year to launch or expand a clinical biospecimen stream.";

export const Route = createFileRoute("/funding/biospecimen/apply")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: BiospecimenApplyPage,
});

function BiospecimenApplyPage() {
  const award = getAward("biospecimen");
  const accent = award?.color ?? "oklch(0.78 0.13 195)";
  const ink = award?.ink ?? "oklch(0.45 0.1 195)";

  return (
    <div>
      <section className="relative isolate overflow-hidden border-b border-ink/10 bg-cream">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-[120px] -top-40 size-[560px] rounded-full opacity-30 blur-3xl"
          style={{ background: "var(--gradient-sunburst)" }}
        />
        <div
          className="relative mx-auto max-w-7xl px-6 pb-14"
          style={{ paddingTop: "clamp(28px, 4vw, 44px)" }}
        >
          <p className="flex flex-wrap items-center gap-2 text-[13px] text-ink-muted-2">
            <Link
              to="/funding"
              activeOptions={{ exact: true }}
              className={`hover:text-ink hover:underline ${focusRing}`}
            >
              Funding & Support
            </Link>
            <span aria-hidden>/</span>
            <Link
              to="/funding/$slug"
              params={{ slug: "biospecimen" }}
              className={`hover:text-ink hover:underline ${focusRing}`}
            >
              {award?.short ?? "Biospecimen Pipeline Support"}
            </Link>
            <span aria-hidden>/</span>
            <span aria-current="page">Apply</span>
          </p>

          <p
            className="mt-7 text-xs font-medium uppercase tracking-[0.18em]"
            style={{ color: ink }}
          >
            {award?.sponsor ?? "Office of Collaborative Research"}
          </p>
          <h1 className="mt-3 max-w-[18ch] font-display text-[clamp(36px,4.6vw,52px)] font-medium leading-[1.04] tracking-[-0.02em] text-balance text-ink">
            Apply for Biospecimen Pipeline Support
          </h1>
          <p className="mt-5 max-w-[640px] text-[17px] leading-[1.55] text-muted-foreground">
            {award?.oneLiner ??
              "Up to a quarter of an OCR clinical research coordinator's time for a year, to launch or expand a clinical biospecimen stream."}
          </p>
          <p className="mt-4 text-sm text-ink-muted-2">
            Deadline: {award?.deadline ?? "February 2026"}
            <span className="mx-2" aria-hidden>
              ·
            </span>
            Formally: {award?.official ?? "Human Biospecimen Pipeline Development RFA"}
          </p>
          <div
            className="mt-6 h-1 w-16 rounded-full"
            style={{ background: accent }}
            aria-hidden
          />
        </div>
      </section>

      <section className="py-14 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <BiospecimenApplicationForm />
          </div>
          <aside className="space-y-5 lg:col-span-4">
            <div className="rounded-[20px] border border-border bg-card p-6">
              <p className="text-xs font-medium uppercase tracking-[0.16em]" style={{ color: ink }}>
                Before you submit
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-[1.5] text-ink/85">
                {(award?.prepare ?? []).map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span
                      className="mt-1.5 size-1.5 shrink-0 rounded-full"
                      style={{ background: accent }}
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[20px] bg-ink p-6 text-white">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/55">
                Questions?
              </p>
              <p className="mt-3 text-sm leading-[1.5] text-ondark-muted">
                Optional and useful: talk with OCR about the clinic, sample types, and realistic
                collection rates before you apply.
              </p>
              <Link
                to="/funding/$slug"
                params={{ slug: "biospecimen" }}
                hash="start"
                className={`mt-5 inline-flex min-h-11 items-center text-sm font-medium text-white underline decoration-white/35 underline-offset-[3px] hover:decoration-white ${focusRing}`}
              >
                Book a funding consult →
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
