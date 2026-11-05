import { testimonials } from "@/data/research-development";
import { Eyebrow } from "./primitives";

export function Testimonials() {
  return (
    <section className="bg-paper py-12 md:py-20 lg:py-[88px]">
      <div className="mx-auto max-w-7xl px-6">
        <Eyebrow>Testimonials</Eyebrow>
        <figure>
          <blockquote className="max-w-[980px] font-display text-[26px] font-medium leading-[1.2] tracking-[-0.01em] text-ink text-pretty md:text-[36px] lg:text-[44px] lg:leading-[1.12]">
            “{testimonials.featured.quote}”
          </blockquote>
          <figcaption className="mt-3 text-[13px] text-ink-muted lg:mt-5 lg:text-sm">
            {testimonials.featured.attribution}
          </figcaption>
        </figure>
        <div className="mt-10 grid gap-8 border-t border-rule pt-8 md:grid-cols-2 lg:mt-14 lg:gap-12">
          {testimonials.more.map((t) => (
            <figure key={t.quote}>
              <blockquote className="font-display text-[20px] leading-[1.3] text-ink lg:text-[22px]">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-2.5 text-[13px] text-ink-muted">{t.attribution}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
