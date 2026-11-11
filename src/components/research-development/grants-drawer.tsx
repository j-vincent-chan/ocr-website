import { useRef, type CSSProperties, type RefObject } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  awardTotal,
  formatMoney,
  grants,
  grantSource,
  grantType,
  programFor,
  recordCopy,
  serviceById,
  type OcrProgram,
} from "@/data/research-development";
import { tint } from "./lib";
import { Arrow } from "./primitives";

const PROGRAM_SERVICE = {
  "Research plan review": "plan",
  "Large grant development program": "large",
} as const satisfies Record<OcrProgram, string>;

export function GrantsDrawer({
  open,
  onOpenChange,
  returnFocusTo,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  returnFocusTo: RefObject<HTMLElement | null>;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const copy = recordCopy.grantsDrawer;
  const sorted = [...grants].sort((a, b) => b.awarded.localeCompare(a.awarded));
  const total = awardTotal();
  const totalLabel = total.complete
    ? `${formatMoney(total.total)} across ${sorted.length} awards`
    : `${sorted.length} awards`;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        hideCloseButton
        overlayClassName="ro-drawer-backdrop bg-ink/50 backdrop-blur-[2px]"
        className="ro-drawer w-[min(640px,100%)] max-w-none gap-0 overflow-y-auto border-0 bg-white p-0 text-[oklch(0.18_0.06_265)] shadow-[-30px_0_60px_oklch(0.05_0.04_265/0.3)] sm:max-w-none"
        aria-label={copy.heading}
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          closeRef.current?.focus();
        }}
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          returnFocusTo.current?.focus();
        }}
      >
        <div aria-hidden className="h-[5px] flex-none bg-coral" />
        <div className="px-6 pt-7 pb-10 md:px-8">
          <div className="flex items-start justify-between gap-4">
            <div className="pt-2 text-xs font-medium uppercase tracking-[0.16em] text-coral-text">
              {copy.eyebrow}
            </div>
            <SheetClose asChild>
              <button
                ref={closeRef}
                type="button"
                aria-label={copy.close}
                className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-ink/15 bg-white text-xl leading-none text-ink transition-colors hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                <span aria-hidden>×</span>
              </button>
            </SheetClose>
          </div>

          <SheetTitle className="mt-3.5 font-display text-[28px] font-medium leading-[1.1] tracking-normal text-ink text-pretty md:text-[32px]">
            {copy.heading}
          </SheetTitle>
          <SheetDescription
            className="mt-3 text-[15px] leading-[1.55] text-pretty"
            style={{ color: "oklch(0.35 0.04 265)" }}
          >
            {copy.intro}
          </SheetDescription>
          <p className="mt-3 text-sm font-medium text-ink">{totalLabel}</p>

          <ul className="mt-6 border-t border-ink">
            {sorted.map((g) => (
              <DrawerGrantRow key={g.url} grant={g} />
            ))}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function ProgramPill({ program }: { program: OcrProgram }) {
  const s = serviceById(PROGRAM_SERVICE[program]);
  return (
    <span
      className="inline-flex max-w-full items-center gap-1.5 rounded-full px-2.5 py-[3px] text-xs font-medium leading-[1.35]"
      style={{ background: tint(s.color, 0.2), color: s.textColor }}
    >
      <span
        aria-hidden
        className="h-1.5 w-1.5 flex-none rounded-full"
        style={{ background: s.color }}
      />
      <span className="min-w-0">{program}</span>
    </span>
  );
}

function DrawerGrantRow({ grant: g }: { grant: (typeof grants)[number] }) {
  const type = grantType(g.mech);
  const program = programFor(g.mech);
  const source = grantSource(g.url);
  const copy = recordCopy.grantsDrawer;

  return (
    <li
      className="border-b border-rule py-5"
      style={{ "--tint": tint(type.color, 0.1) } as CSSProperties}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <div className="flex min-w-0 items-baseline gap-2.5">
          <span
            className="font-display text-[26px] leading-none"
            style={{ color: type.text }}
          >
            {g.mech}
          </span>
          <span className="text-xs text-ink-muted-2">{g.kind}</span>
        </div>
        <div className="text-right">
          <div className="text-[12px] font-semibold tracking-[0.06em] text-ink">{g.ic}</div>
          {g.award != null ? (
            <div className="mt-0.5 text-sm font-medium text-ink">{formatMoney(g.award)}</div>
          ) : null}
        </div>
      </div>

      <div className="mt-2.5 text-[16px] font-medium leading-[1.3] text-ink">{g.title}</div>
      <div className="mt-1 text-sm text-ink-muted-2">{g.pis}</div>
      {program ? (
        <div className="mt-2.5">
          <ProgramPill program={program} />
        </div>
      ) : null}

      <a
        href={g.url}
        target="_blank"
        rel="noreferrer"
        className="mt-3.5 inline-flex items-center gap-1.5 text-sm font-medium text-coral-text underline-offset-2 transition-colors hover:text-coral-deep hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        {copy.viewOn(source)} <Arrow />
      </a>
    </li>
  );
}
