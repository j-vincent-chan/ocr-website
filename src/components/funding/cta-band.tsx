import { contactFor, type FundingOpportunity } from "./lib";
import { focusRing, glanceShadow, inkPillClass } from "./primitives";

export function CtaBand({ award }: { award?: FundingOpportunity }) {
  const contact = contactFor(award);
  const accent = award?.color ?? "var(--teal-light)";
  const subject = award ? `Question about the ${award.short}` : "Question about OCR funding";
  const label = award ? "Ask about this opportunity" : "Ask which opportunity fits";
  const href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}`;

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
        <div
          className={`min-w-0 flex-[1_1_340px] rounded-[20px] bg-white px-7 py-6 text-ink ${glanceShadow}`}
          style={{ borderTop: `5px solid ${accent}` }}
        >
          <div className="flex items-center gap-4">
            <div className="grid size-[52px] shrink-0 place-items-center rounded-full bg-ink font-display text-[19px] text-white">
              {contact.initials}
            </div>
            <div>
              <div className="font-display text-[22px] leading-[1.2] text-ink">{contact.name}</div>
              <p className="mt-0.5 text-[13px] leading-[1.4] text-ink-muted-2">{contact.role}</p>
            </div>
          </div>
          <a
            href={href}
            className={`${inkPillClass} mt-5 min-h-12 w-full px-6 py-3 text-[15px] ${focusRing}`}
          >
            {label}
          </a>
          <p className="mt-3 text-center text-[13px] text-ink-muted-2">
            {contact.email} · or ocr@ucsf.edu
          </p>
        </div>
      </div>
    </section>
  );
}
