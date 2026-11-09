import { Link } from "@tanstack/react-router";
import { whereThisFits } from "@/data/community-management";
import { Arrow, SectionHeader } from "./primitives";

export function WhereThisFits() {
  return (
    <section id="fit" className="bg-paper py-[clamp(48px,7vw,96px)]">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow={whereThisFits.eyebrow}
          title={whereThisFits.heading}
          lede={whereThisFits.lede}
          className="lg:mb-14"
        />
        <div className="mb-4 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          {whereThisFits.label}
        </div>
        <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-6 gap-x-12">
          {whereThisFits.arms.map((arm) => (
            <li key={arm.key} className="border-t border-ink pt-5">
              <div className="inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: arm.dot }}
                />
                {arm.label}
              </div>
              <h3 className="mt-4 mb-2 font-display text-[22px] font-medium leading-[1.2] text-ink">
                {arm.title}
              </h3>
              <p className="text-[15px] leading-[1.55] text-ink-muted text-pretty">{arm.body}</p>
              {arm.to ? (
                <Link
                  to={arm.to}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium hover:opacity-80"
                  style={{ color: arm.linkColor ?? undefined }}
                >
                  Explore <Arrow />
                </Link>
              ) : (
                <span className="mt-4 inline-flex items-center rounded-full bg-ink/5 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  {whereThisFits.youAreHere}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
