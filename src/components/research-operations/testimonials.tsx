import { useEffect, useRef, useState } from "react";
import { SHOW_TESTIMONIALS, testimonials } from "@/data/research-operations";

/** One quote. Attribution is non-identifying by design: no name, title, or photo. */
export function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!SHOW_TESTIMONIALS) return null;

  const item = testimonials.items[0];
  if (!item) return null;

  return (
    <section
      ref={ref}
      className="relative bg-cream py-20 md:py-28"
      aria-label="From the community"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={`relative max-w-4xl pl-6 transition-all duration-700 ease-out md:pl-8 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <span
            aria-hidden
            className="absolute left-0 top-1 h-[calc(100%-0.25rem)] w-1 rounded-full bg-coral"
          />
          <span className="text-xs font-medium uppercase tracking-[0.22em] text-coral-aa">
            {testimonials.eyebrow}
          </span>
          <figure className="mt-8 md:mt-10">
            <blockquote className="font-display text-pretty text-[1.75rem] leading-[1.12] tracking-tight text-ink md:text-[2.35rem] lg:text-[2.75rem] lg:leading-[1.08]">
              {item.quote}
            </blockquote>
            <figcaption className="mt-8 text-sm text-muted-foreground">
              — {item.attribution}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
