import { useEffect, useRef } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { sponsorGroups } from "./lib";
import { focusRing } from "./primitives";

export function FundingMenu({
  open,
  setOpen,
  onEngage,
  triggerClass,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  onEngage: () => void;
  triggerClass: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname, setOpen]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    };
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, setOpen]);

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={() => {
        onEngage();
        setOpen(true);
      }}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        ref={triggerRef}
        type="button"
        className={`${triggerClass} flex items-center gap-1.5 ${focusRing}`}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="funding-menu"
        onClick={() => setOpen(!open)}
      >
        Funding & Support
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
      {open ? (
        <div className="absolute right-0 top-full z-50 w-[min(420px,calc(100vw-2rem))] pt-3">
          <div
            id="funding-menu"
            className="funding-menu rounded-[20px] border border-ink/8 bg-white p-2.5 text-ink shadow-lift"
          >
            <Link
              to="/funding"
              onClick={() => setOpen(false)}
              className={`flex items-center justify-between rounded-xl px-3.5 py-3 text-sm font-semibold text-ink hover:bg-ink/5 ${focusRing}`}
              aria-current={pathname === "/funding" ? "page" : undefined}
            >
              <span>All funding & support</span>
              <span aria-hidden>→</span>
            </Link>
            <div className="mx-3.5 mb-1.5 mt-1 h-px bg-ink/10" />
            {sponsorGroups().map((group) => (
              <div key={group.key}>
                <p className="px-3.5 pb-1 pt-2.5 text-[11px] font-medium uppercase tracking-[0.14em] text-ink-muted-2">
                  {group.menuLabel}
                </p>
                {group.awards.map((award) => (
                  <Link
                    key={award.id}
                    to="/funding/$slug"
                    params={{ slug: award.id }}
                    onClick={() => setOpen(false)}
                    aria-current={pathname === `/funding/${award.id}` ? "page" : undefined}
                    className={`flex w-full items-start gap-3 rounded-xl px-3.5 py-3 hover:bg-ink/5 ${focusRing}`}
                  >
                    <span
                      aria-hidden
                      className="mt-1.5 size-2.5 shrink-0 rounded-full"
                      style={{ background: award.color }}
                    />
                    <span className="flex-1 font-display text-[17px] leading-[1.25] text-ink">
                      {award.short}
                    </span>
                    <span className="mt-0.5 flex shrink-0 items-center gap-1.5">
                      {award.restricted ? (
                        <span
                          title={award.restrictedTo}
                          className="rounded-full border border-ink/25 px-[9px] py-[3px] text-[11px] font-medium text-ink-body"
                        >
                          Restricted
                        </span>
                      ) : null}
                      <span
                        className="rounded-full px-[9px] py-[3px] text-[11px] font-medium"
                        style={{ background: award.tint, color: award.ink }}
                      >
                        {award.tag}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
