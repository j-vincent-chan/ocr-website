import { useRef, type MouseEvent, type RefObject } from "react";
import { FactRow } from "@/components/research-operations/primitives";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { drawerCopy, mailto, SVC, type ServiceId } from "@/data/community-management";
import { Arrow, pillInk, pillOutline } from "./primitives";

export function DetailDrawer({
  service,
  open,
  onOpenChange,
  returnFocusTo,
}: {
  service: ServiceId;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  returnFocusTo: RefObject<HTMLElement | null>;
}) {
  const s = SVC[service];
  const closeRef = useRef<HTMLButtonElement>(null);
  const pendingTarget = useRef<string | null>(null);

  const goToContact = (e: MouseEvent) => {
    e.preventDefault();
    pendingTarget.current = "contact";
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        hideCloseButton
        overlayClassName="ro-drawer-backdrop bg-ink/50 backdrop-blur-[2px]"
        className="ro-drawer w-[min(540px,100%)] max-w-none gap-0 overflow-y-auto border-0 bg-white p-0 text-[oklch(0.18_0.06_265)] shadow-[-30px_0_60px_oklch(0.05_0.04_265/0.3)] sm:max-w-none"
        aria-label={s.name}
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
        <div aria-hidden className="h-[5px] flex-none" style={{ background: s.color }} />
        <div className="px-8 pt-7 pb-9">
          <div className="flex items-start justify-between gap-4">
            <div
              className="pt-2 text-xs font-medium uppercase tracking-[0.16em]"
              style={{ color: s.text }}
            >
              {s.n} · {s.name}
            </div>
            <SheetClose asChild>
              <button
                ref={closeRef}
                type="button"
                aria-label={drawerCopy.close}
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
            {s.body}
          </SheetDescription>

          <div className="mt-6 text-[11px] uppercase tracking-[0.14em] text-ink-muted-2">
            {drawerCopy.capabilities}
          </div>
          <ul className="mt-2.5 flex flex-col gap-2 text-sm leading-[1.45] text-ink-body">
            {s.activities.map((a) => (
              <li key={a} className="flex items-start gap-2.5">
                <span
                  aria-hidden
                  className="mt-2 h-[5px] w-[5px] flex-none rounded-full"
                  style={{ background: s.color }}
                />
                {a}
              </li>
            ))}
          </ul>

          <dl className="mt-6 border-t border-ink/12 text-sm leading-[1.4]">
            {s.facts.map(([term, value], i) => (
              <FactRow key={term} label={term} last={i === s.facts.length - 1}>
                {value}
              </FactRow>
            ))}
          </dl>

          <div className="mt-7 flex flex-wrap gap-3">
            <a href={mailto(s.cta[1])} className={pillInk}>
              {s.cta[0]} <Arrow />
            </a>
            <a href={drawerCopy.talkHref} onClick={goToContact} className={pillOutline}>
              {drawerCopy.talk}
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
