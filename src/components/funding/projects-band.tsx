import { Link } from "@tanstack/react-router";
import { focusRing, inkPillClass } from "./primitives";

/** Replaces the old "Or apply to an open RFA" block on Programs & Projects. */
export function ProjectsFundingBand() {
  return (
    <section id="funding" className="scroll-mt-24 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-8 rounded-3xl border border-ink/10 bg-cream p-10 md:flex-row md:items-center md:p-14">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-teal-text">
              Funding & Support
            </p>
            <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-ink md:text-4xl">
              Looking for funding or support?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Opportunities from OCR, the Bakar ImmunoX Initiative, and the Parnassus Institutes.
            </p>
          </div>
          <Link to="/funding" className={`${inkPillClass} px-6 py-3 text-sm ${focusRing}`}>
            See all opportunities →
          </Link>
        </div>
      </div>
    </section>
  );
}
