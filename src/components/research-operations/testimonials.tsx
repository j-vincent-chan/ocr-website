import { SHOW_TESTIMONIALS, testimonials } from "@/data/research-operations";
import { Eyebrow, ReviewFlag } from "./primitives";

/** Two quotes side by side. Attributions are non-identifying by design: no names, titles, or photos. */
export function Testimonials() {
  if (!SHOW_TESTIMONIALS) return null;
  return (
    <section className="bg-cream py-12 md:py-20 lg:py-[88px]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-7 flex flex-wrap items-center gap-3 lg:mb-10">
          <Eyebrow className="mb-0">{testimonials.eyebrow}</Eyebrow>
          {testimonials.verify ? <ReviewFlag>{testimonials.flag}</ReviewFlag> : null}
        </div>
        <div className="grid gap-10 md:grid-cols-2 lg:gap-x-[72px]">
          {testimonials.items.map((t) => (
            <figure key={t.attribution} className="flex flex-col gap-5">
              <blockquote className="flex-1 font-display text-[22px] font-medium leading-[1.2] tracking-[-0.01em] text-ink text-pretty md:text-[26px] lg:text-[30px]">
                “{t.quote}”
              </blockquote>
              <figcaption className="flex items-center gap-3 text-[15px] font-medium text-ink">
                <span aria-hidden className="h-px w-6 bg-ink/40" />
                {t.attribution}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
