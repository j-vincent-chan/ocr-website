import { contactFor, type FundingOpportunity } from "./lib";
import { focusRing, glanceShadow, inkPillClass } from "./primitives";

const DEFAULT_ACCENT = {
  color: "oklch(0.78 0.13 195)",
  ink: "var(--teal-text)",
  tint: "oklch(0.78 0.13 195 / 0.14)",
};

export function CtaBand({ award }: { award?: FundingOpportunity }) {
  return (
    <section
      id="start"
      data-tone="dark"
      className="relative isolate overflow-hidden bg-ink text-white"
      style={{ padding: "clamp(44px, 6vw, 72px) 0" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[140px] -top-[260px] size-[720px] rounded-full bg-gradient-sunburst opacity-[0.42] blur-[70px]"
      />
      <div className="relative mx-auto flex max-w-7xl flex-wrap items-center gap-x-[72px] gap-y-10 px-6">
        <div className="min-w-0 flex-[1_1_320px]">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-teal-light">
            Before you apply
          </p>
          <h2 className="mb-5 mt-3.5 font-display text-[clamp(32px,4.3vw,52px)] font-medium leading-[1.02] tracking-[-0.02em] text-balance text-white">
            Talk through your idea with us.
          </h2>
          <p className="max-w-[480px] text-[17px] leading-[1.55] text-ondark-muted">
            We can tell you which opportunity fits, who to bring on as mentors or sponsors, and what
            makes a proposal competitive. A short email is enough to start.
          </p>
        </div>
        <ConsultCard award={award} />
      </div>
    </section>
  );
}

/** Same construction as the Research Operations scope card, minus the stage picker. */
function ConsultCard({ award }: { award?: FundingOpportunity }) {
  const contact = contactFor(award);
  const accent = award?.color ?? DEFAULT_ACCENT.color;
  const ink = award?.ink ?? DEFAULT_ACCENT.ink;
  const tint = award?.tint ?? DEFAULT_ACCENT.tint;
  const subject = award ? `Question about the ${award.short}` : "Question about OCR funding";
  const emailLabel = award ? "Ask about this opportunity" : "Ask which opportunity fits";
  const mailHref = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}`;
  const firstName = contact.name.split(" ")[0];

  return (
    <div
      className={`min-w-0 flex-[1_1_340px] rounded-[20px] bg-white px-5 pt-[22px] pb-5 text-ink md:px-7 ${glanceShadow}`}
      style={{ borderTop: `5px solid ${accent}` }}
    >
      <div className="flex items-center gap-4">
        <div className="min-w-0 flex-1">
          <div className="text-xs font-medium uppercase tracking-[0.16em]" style={{ color: ink }}>
            Funding consult
          </div>
          <div className="mt-0.5 font-display text-2xl leading-[1.15] text-ink md:text-[22px] lg:text-2xl">
            {award ? "Talk through your application" : "Find the opportunity that fits"}
          </div>
        </div>
        {contact.bookingUrl ? (
          <div className="shrink-0 text-right text-[13px] whitespace-nowrap text-ink-muted-2">
            30 min
            <br />
            Free
          </div>
        ) : null}
      </div>

      <div
        className="mt-5 flex items-center gap-4 rounded-2xl px-4 py-3.5"
        style={{ background: tint }}
      >
        <div className="size-14 flex-none rounded-full p-[3px]" style={{ background: accent }}>
          {contact.photo ? (
            <img
              src={contact.photo}
              alt=""
              className="size-full rounded-full border-2 border-white bg-secondary object-cover"
            />
          ) : (
            <div className="grid size-full place-items-center rounded-full border-2 border-white bg-ink font-display text-[17px] text-white">
              {contact.initials}
            </div>
          )}
        </div>
        <div className="min-w-0">
          <div className="text-[11px] uppercase tracking-[0.14em] text-ink-muted-2">
            You'll meet with
          </div>
          <div className="font-display text-xl leading-tight text-ink">{contact.name}</div>
          <div className="mt-0.5 text-[13px]" style={{ color: ink }}>
            {contact.role}
          </div>
        </div>
      </div>

      {contact.bookingUrl ? (
        <>
          <a
            href={contact.bookingUrl}
            target="_blank"
            rel="noreferrer"
            className={`${inkPillClass} mt-4 min-h-12 w-full gap-2 px-6 py-3 text-[15px]`}
          >
            Book a time with {firstName} <span aria-hidden>→</span>
          </a>
          <a
            href={mailHref}
            className={`mt-3 flex min-h-12 items-center justify-center gap-2 rounded-full border border-ink/20 px-6 py-3 text-[15px] font-medium text-ink transition-colors hover:border-ink/50 ${focusRing}`}
          >
            {emailLabel} <span aria-hidden>→</span>
          </a>
        </>
      ) : (
        <a
          href={mailHref}
          className={`${inkPillClass} mt-4 min-h-12 w-full gap-2 px-6 py-3 text-[15px]`}
        >
          {emailLabel} <span aria-hidden>→</span>
        </a>
      )}

      <div className="mt-3 text-center text-[13px] text-ink-muted-2">
        <a
          href={`mailto:${contact.email}`}
          className={`text-ink underline underline-offset-2 ${focusRing}`}
        >
          {contact.email}
        </a>{" "}
        · or{" "}
        <a
          href="mailto:ocr@ucsf.edu"
          className={`text-ink underline underline-offset-2 ${focusRing}`}
        >
          ocr@ucsf.edu
        </a>
      </div>
    </div>
  );
}
