import { SHOW_TESTIMONIALS, testimonials } from "@/data/research-operations";
import { Eyebrow } from "./primitives";

/** One quote. Attribution is non-identifying by design: no name, title, or photo. */
export function Testimonials() {
  if (!SHOW_TESTIMONIALS) return null;
  return (
    <section className="bg-cream py-12 md:py-20 lg:py-[88px]">
      <div className="mx-auto max-w-7xl px-6">
        <Eyebrow className="text-center">{testimonials.eyebrow}</Eyebrow>
        <div className="mx-auto max-w-3xl text-center">
          {testimonials.items.map((t) => (
            <figure key={t.attribution} className="flex flex-col items-center gap-5">
              <blockquote className="font-display text-[22px] font-medium leading-[1.2] tracking-[-0.01em] text-ink text-pretty md:text-[26px] lg:text-[30px]">
                “{t.quote}”
              </blockquote>
              <figcaption className="flex items-center justify-center gap-3 text-[15px] font-medium text-ink">
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
