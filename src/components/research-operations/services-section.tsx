import { useRef, useState, type MouseEvent, type RefObject } from "react";
import { Arrow, pillInk, pillOutline } from "@/components/research-development/primitives";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  mailto,
  SERVICE_COLOR,
  serviceByKey,
  services,
  servicesIntro,
  startHereCta,
  type ServiceKey,
} from "@/data/research-operations";
import { Dot, FactRow, LinkedText, SectionHeader } from "./primitives";

/**
 * Three short service cards. Everything else (activities, For whom, When, Structure, Cost)
 * lives in the right-side detail drawer each card opens.
 */
export function ServicesSection() {
  // `panel` keeps the last service so the drawer's content stays put during its exit animation.
  const [panel, setPanel] = useState<ServiceKey>("bio");
  const [open, setOpen] = useState(false);
  // The card button that opened the drawer; focus returns to it on close.
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const show = (key: ServiceKey, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setPanel(key);
    setOpen(true);
  };

  return (
    <section id="services" className="scroll-mt-24 bg-paper py-12 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow={servicesIntro.eyebrow}
          title={servicesIntro.title}
          lede={servicesIntro.lead}
        />

        <div className="grid gap-5 md:grid-cols-3">
          {services.map((s) => {
            const { color, textColor } = SERVICE_COLOR[s.key];
            return (
              <article
                key={s.key}
                className="flex flex-col rounded-[20px] border border-border bg-white px-7 pt-[26px] pb-6"
                style={{ borderTop: `5px solid ${color}` }}
              >
                <div
                  className="text-xs font-medium uppercase tracking-[0.16em]"
                  style={{ color: textColor }}
                >
                  {s.number} · {s.name}
                </div>
                <h3 className="mt-3 font-display text-[26px] font-medium leading-[1.15] tracking-normal text-ink">
                  {s.headline}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.55] text-ink-muted text-pretty">
                  {s.summary}
                </p>
                <button
                  type="button"
                  onClick={(e) => show(s.key, e.currentTarget)}
                  aria-haspopup="dialog"
                  aria-expanded={open && panel === s.key}
                  className="mt-auto inline-flex items-center gap-1.5 self-start pt-6 text-left text-[15px] font-medium transition-opacity hover:opacity-80 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                  style={{ color: textColor }}
                >
                  {servicesIntro.more} <Arrow />
                </button>
              </article>
            );
          })}
        </div>
      </div>

      <ServiceDrawer
        service={panel}
        open={open}
        onOpenChange={setOpen}
        returnFocusTo={triggerRef}
      />
    </section>
  );
}

/* ───────── Detail drawer ─────────
 * shadcn Sheet (Radix Dialog) gives us the focus trap, Esc / backdrop close and body scroll lock.
 * Focus lands on the close button on open. Radix would return focus to a SheetTrigger on close;
 * the drawer opens from plain card buttons instead, so we return focus to the opener ourselves. */
function ServiceDrawer({
  service,
  open,
  onOpenChange,
  returnFocusTo,
}: {
  service: ServiceKey;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  returnFocusTo: RefObject<HTMLButtonElement | null>;
}) {
  const s = serviceByKey(service);
  const { color, textColor } = SERVICE_COLOR[s.key];
  const closeRef = useRef<HTMLButtonElement>(null);
  /** Set when "What to include in a first email" closes the drawer: focus goes to #start instead of the trigger. */
  const pendingTarget = useRef<string | null>(null);

  const goToStart = (e: MouseEvent) => {
    e.preventDefault();
    pendingTarget.current = startHereCta.href.slice(1);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        hideCloseButton
        overlayClassName="ro-drawer-backdrop bg-ink/50 backdrop-blur-[2px]"
        className="ro-drawer w-[min(540px,100%)] max-w-none gap-0 overflow-y-auto border-0 bg-white p-0 text-[oklch(0.18_0.06_265)] shadow-[-30px_0_60px_oklch(0.05_0.04_265/0.3)] sm:max-w-none"
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          closeRef.current?.focus();
        }}
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          const id = pendingTarget.current;
          pendingTarget.current = null;
          const target = id ? document.getElementById(id) : null;
          if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
            target.focus({ preventScroll: true });
            return;
          }
          returnFocusTo.current?.focus();
        }}
      >
        <div aria-hidden className="h-[5px] flex-none" style={{ background: color }} />
        <div className="px-6 pt-7 pb-9 md:px-8">
          <div className="flex items-start justify-between gap-4">
            <div
              className="pt-2 text-xs font-medium uppercase tracking-[0.16em]"
              style={{ color: textColor }}
            >
              {s.number} · {s.name}
            </div>
            <SheetClose asChild>
              <button
                ref={closeRef}
                type="button"
                aria-label={servicesIntro.closeLabel}
                className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-ink/15 bg-white text-xl leading-none text-ink transition-colors hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                <span aria-hidden>×</span>
              </button>
            </SheetClose>
          </div>

          <SheetTitle className="mt-3.5 font-display text-[30px] font-medium leading-[1.1] tracking-normal text-ink text-pretty">
            {s.headline}
          </SheetTitle>
          <SheetDescription
            className="mt-3 text-[15px] leading-[1.55] text-pretty"
            style={{ color: "oklch(0.35 0.04 265)" }}
          >
            {s.panelBody}
          </SheetDescription>

          <div className="mt-6 text-[11px] uppercase tracking-[0.14em] text-ink-muted-2">
            {servicesIntro.activitiesLabel}
          </div>
          <ul className="mt-2.5 flex flex-col gap-2 text-sm leading-[1.45] text-ink-body">
            {s.activities.map((a) => (
              <li key={a} className="flex items-start gap-2.5">
                <Dot color={color} size={5} className="mt-2" />
                {a}
              </li>
            ))}
          </ul>

          <dl className="mt-6 border-t border-ink/12 text-sm leading-[1.4]">
            {s.facts.map((f, i) => (
              <FactRow key={f.term} label={f.term} last={i === s.facts.length - 1}>
                <LinkedText text={f.text} link={f.link} />
              </FactRow>
            ))}
          </dl>

          <div className="mt-7 flex flex-wrap gap-3">
            <a href={mailto(s.cta.mailtoSubject)} className={pillInk}>
              {s.cta.label} <Arrow />
            </a>
            <a href={startHereCta.href} onClick={goToStart} className={pillOutline}>
              {servicesIntro.secondaryCta}
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
