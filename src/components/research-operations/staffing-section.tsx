import { SERVICE_COLOR, staffing, type StaffingColor } from "@/data/research-operations";
import { Dot, Eyebrow } from "./primitives";

/** Dot colors: the three service hues, plus the site's amber and coral tokens. */
const FORM_COLOR: Record<StaffingColor, string> = {
  teal: SERVICE_COLOR.clinical.color,
  violet: SERVICE_COLOR.pm.color,
  magenta: SERVICE_COLOR.bio.color,
  gold: "var(--amber)",
  coral: "var(--coral)",
};

export function StaffingSection() {
  return (
    <section id="staffing" className="scroll-mt-24 bg-paper py-12 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:grid lg:grid-cols-[5fr_7fr] lg:items-start lg:gap-[88px]">
        <div>
          <Eyebrow>{staffing.eyebrow}</Eyebrow>
          <h2 className="font-display text-[32px] font-medium leading-[1.08] tracking-[-0.02em] text-ink text-pretty md:text-[40px] lg:text-[48px] lg:leading-[1.02]">
            {staffing.title}
          </h2>
          <p className="mt-4 max-w-[440px] text-base leading-[1.55] text-ink-body text-pretty lg:mt-6 lg:text-[19px]">
            {staffing.lead}
          </p>
        </div>
        <ul className="mt-8 border-t border-ink lg:mt-0">
          {staffing.forms.map((f, i) => (
            <li
              key={f.title}
              className={`flex items-start gap-5 py-5 md:py-[22px] border-b ${
                i === staffing.forms.length - 1 ? "border-ink" : "border-rule"
              }`}
            >
              <Dot color={FORM_COLOR[f.color]} className="mt-[9px]" />
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-[20px] font-normal leading-[1.2] tracking-normal text-ink text-pretty md:text-[22px]">
                  {f.title}
                </h3>
                <p className="mt-1.5 text-[15px] leading-[1.5] text-ink-muted text-pretty">
                  {f.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
