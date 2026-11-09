import { useCallback, useRef, useState, type ReactNode, type RefObject } from "react";
import { FactRow } from "@/components/research-operations/primitives";
import { Arrow, pillInk, pillOutline } from "@/components/research-development/primitives";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { appByKey, applicationsIntro, mailto, statusLine, type AppKey } from "@/data/ai-tools";
import { MarkDisc } from "./app-mark";
import { AppDrawerContext } from "./lib";
import { DotList } from "./primitives";

/** Owns the drawer state for the whole page; children open it through `useShowApp()`. */
export function AppDrawerProvider({ children }: { children: ReactNode }) {
  // `panel` keeps the last app so the drawer's content stays put during its exit animation.
  const [panel, setPanel] = useState<AppKey>("prospera");
  const [open, setOpen] = useState(false);
  // The row, card or button that opened the drawer; focus returns to it on close.
  const triggerRef = useRef<HTMLElement | null>(null);
  const show = useCallback((key: AppKey, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setPanel(key);
    setOpen(true);
  }, []);

  return (
    <AppDrawerContext.Provider value={show}>
      {children}
      <AppDrawer app={panel} open={open} onOpenChange={setOpen} returnFocusTo={triggerRef} />
    </AppDrawerContext.Provider>
  );
}

/* Same construction as the research-operations ServiceDrawer: shadcn Sheet (Radix Dialog) gives
 * the focus trap, Esc / backdrop close and body scroll lock. Focus lands on the close button on
 * open; the drawer opens from plain elements, not a SheetTrigger, so we return focus ourselves. */
function AppDrawer({
  app,
  open,
  onOpenChange,
  returnFocusTo,
}: {
  app: AppKey;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  returnFocusTo: RefObject<HTMLElement | null>;
}) {
  const a = appByKey(app);
  const closeRef = useRef<HTMLButtonElement>(null);

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
          returnFocusTo.current?.focus();
        }}
      >
        <div aria-hidden className="h-[5px] flex-none" style={{ background: a.fill }} />
        <div className="px-6 pt-7 pb-10 md:px-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3.5">
              <MarkDisc app={a} size={48} markSize={26} />
              <div className="min-w-0">
                <div
                  className="text-xs font-medium uppercase tracking-[0.16em]"
                  style={{ color: a.text }}
                >
                  {a.n} · {a.name}
                </div>
                <div className="mt-1 font-mono text-xs text-muted-foreground">{statusLine(a)}</div>
              </div>
            </div>
            <SheetClose asChild>
              <button
                ref={closeRef}
                type="button"
                aria-label={applicationsIntro.closeLabel}
                className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-ink/15 bg-white text-xl leading-none text-ink transition-colors hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                <span aria-hidden>×</span>
              </button>
            </SheetClose>
          </div>

          <SheetTitle className="mt-6 font-display text-[30px] font-medium leading-[1.1] tracking-normal text-ink text-pretty">
            {a.headline}
          </SheetTitle>
          <SheetDescription
            className="mt-3 text-[15px] leading-[1.55] text-pretty"
            style={{ color: "oklch(0.35 0.04 265)" }}
          >
            {a.body}
          </SheetDescription>

          <div className="mt-6 text-[11px] uppercase tracking-[0.14em] text-ink-muted-2">
            {applicationsIntro.activitiesLabel}
          </div>
          <DotList
            items={a.activities}
            color={a.fill}
            className="mt-2.5 flex flex-col gap-2 text-sm leading-[1.45] text-ink-body"
          />

          <dl className="mt-6 border-t border-ink/12 text-sm leading-[1.4] text-ink-body">
            {a.facts.map((f, i) => (
              <FactRow key={f.k} label={f.k} last={i === a.facts.length - 1}>
                {f.v}
              </FactRow>
            ))}
          </dl>

          <div className="mt-7 flex flex-wrap gap-3">
            {a.url ? (
              <a href={a.url} target="_blank" rel="noreferrer" className={pillInk}>
                {applicationsIntro.open(a.name)} <Arrow>↗</Arrow>
              </a>
            ) : null}
            <a href={mailto(a.askSubject)} className={pillOutline}>
              {a.askLabel}
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
