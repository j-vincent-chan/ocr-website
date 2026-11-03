import { useEffect, useRef, useState } from "react";
import ribbonImg from "@/assets/ribbon.png";
import { OPEN_POSITIONS } from "@/components/site/open-positions";

const DISPATCH_SPOTLIGHT = {
  category: "Spotlight",
  date: "Jul 2026",
  title:
    "OCR welcomes the Institute for Health & Aging as its newest research development partner",
  desc: "OCR is partnering with IHA to expand strategic research development support for core and affiliate faculty, helping investigators sharpen ideas, connect around shared priorities, and move promising proposals toward submission. The one-year pilot covers faculty outreach, funding opportunity matchmaking, proposal development support, and educational programming.",
} as const;

/* Newest first — the top items get full cards, the rest collapse into brief rows. */
const DISPATCH_ITEMS = [
  {
    category: "Open role",
    date: "Oct 2026",
    title: `OCR is hiring a ${OPEN_POSITIONS.researchDevelopmentStrategist.title}`,
    desc: "Join the team that helps UCSF investigators find the right opportunity, sharpen proposals, and move ambitious research programs toward funding.",
    href: OPEN_POSITIONS.researchDevelopmentStrategist.href,
  },
  {
    category: "Open role",
    date: "Oct 2026",
    title: `OCR is hiring an ${OPEN_POSITIONS.immunoxCommunityManager.title}`,
    desc: "Help steward the ImmunoX research community through convenings, communications, outreach, and collaborator connections.",
    href: OPEN_POSITIONS.immunoxCommunityManager.href,
  },
  {
    category: "AI tool",
    date: "Jun 2026",
    title: "Signal AI moves from development to beta testing across select research programs",
    desc: "OCR’s in-house intelligence app tracks publications, grants, news, and honors, helping community managers surface the right updates to the right research communities.",
  },
  {
    category: "Digital front door",
    date: "Jun 2026",
    title: "OCR launches a new digital home",
    desc: "The new OCR website gives UCSF researchers a clearer way to understand our services, explore active partnerships, and connect with the right support for moving complex research forward.",
  },
] as const;

const SUBSCRIBE_HREF = `mailto:ocr@ucsf.edu?subject=${encodeURIComponent(
  "Subscribe me to the OCR dispatch",
)}`;

/*
 * The dispatch adapts to how much news there is:
 * - The spotlight is always a featured card.
 * - The next SIDE_CARD_COUNT items render as full cards beside it.
 * - Anything beyond that collapses into compact headline rows below,
 *   so the section grows one thin line per story instead of one card.
 * With few items the rows disappear and the grid tightens on its own.
 */
const SIDE_CARD_COUNT = 2;

function DispatchMeta({
  category,
  date,
  inline = false,
}: {
  category: string;
  date: string;
  inline?: boolean;
}) {
  const label = `${category} · ${date}`;
  if (inline) {
    return (
      <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/50 font-medium">
        <span className="w-1.5 h-1.5 rounded-full bg-magenta shrink-0" aria-hidden />
        {label}
      </span>
    );
  }
  return (
    <div className="flex items-center justify-between gap-4 text-[11px] uppercase tracking-[0.18em] text-white/50 font-medium">
      <span className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-magenta shrink-0" aria-hidden />
        {category}
      </span>
      <span className="text-white/40">{date}</span>
    </div>
  );
}

function DispatchCard({
  category,
  date,
  title,
  desc,
  href,
  featured = false,
  className = "",
}: {
  category: string;
  date: string;
  title: string;
  desc: string;
  /** Omit until a dispatch has a destination — cards render as non-links. */
  href?: string;
  featured?: boolean;
  className?: string;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const isLink = Boolean(href);
  const rafRef = useRef<number | null>(null);
  const pendingRef = useRef<{ x: number; y: number } | null>(null);
  const defaultPosRef = useRef({ x: 280, y: 48 });
  const [flarePos, setFlarePos] = useState(defaultPosRef.current);
  const [flareActive, setFlareActive] = useState(false);
  const [flareEnabled, setFlareEnabled] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    setFlareEnabled(featured && !reduced && !coarse);
  }, [featured]);

  useEffect(() => {
    if (!featured || !cardRef.current) return;

    const updateDefaultPos = () => {
      if (!cardRef.current) return;
      const { width, height } = cardRef.current.getBoundingClientRect();
      defaultPosRef.current = { x: width * 0.82, y: height * 0.14 };
      setFlarePos(defaultPosRef.current);
    };

    updateDefaultPos();
    window.addEventListener("resize", updateDefaultPos);
    return () => window.removeEventListener("resize", updateDefaultPos);
  }, [featured]);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const flushFlarePosition = () => {
    if (pendingRef.current) {
      setFlarePos(pendingRef.current);
      pendingRef.current = null;
    }
    rafRef.current = null;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!featured || !flareEnabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    pendingRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setFlareActive(true);
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(flushFlarePosition);
    }
  };

  const handleMouseLeave = () => {
    if (!featured || !flareEnabled) return;
    setFlareActive(false);
    setFlarePos(defaultPosRef.current);
  };

  return (
    <a
      ref={cardRef}
      href={href}
      {...(href?.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative flex flex-col rounded-[1.75rem] border border-white/10 bg-white/[0.08] backdrop-blur-sm p-7 md:p-8 overflow-hidden transition-colors ${
        isLink ? "hover:bg-white/[0.12] hover:border-white/20" : ""
      } ${className} ${featured ? "min-h-[320px] md:min-h-full justify-between" : ""}`}
    >
      {featured && (
        <div
          aria-hidden
          className={`pointer-events-none absolute w-72 h-72 rounded-full blur-3xl ${
            flareEnabled
              ? "opacity-70 transition-[left,top,opacity] duration-300 ease-out"
              : "-top-24 -right-16 opacity-60"
          }`}
          style={
            flareEnabled
              ? {
                  left: flarePos.x,
                  top: flarePos.y,
                  transform: "translate(-50%, -50%)",
                  opacity: flareActive ? 0.75 : 0.55,
                  background:
                    "radial-gradient(circle, color-mix(in oklab, var(--coral) 55%, transparent), transparent 70%)",
                }
              : {
                  background:
                    "radial-gradient(circle, color-mix(in oklab, var(--coral) 55%, transparent), transparent 70%)",
                }
          }
        />
      )}
      <div className="relative">
        <DispatchMeta category={category} date={date} inline={featured} />
        <h3
          className={`mt-5 font-display text-white leading-snug ${
            isLink ? "group-hover:underline decoration-1 underline-offset-4" : ""
          } ${featured ? "text-2xl md:text-3xl lg:text-4xl" : "text-xl md:text-2xl"}`}
        >
          {title}
        </h3>
        <p
          className={`mt-3 text-white/60 leading-relaxed ${
            featured ? "text-base md:text-lg max-w-xl" : "text-sm"
          }`}
        >
          {desc}
        </p>
        {isLink && !featured ? (
          <span className="mt-5 text-sm font-medium text-white/70 inline-flex items-center gap-1.5 group-hover:text-white transition">
            Learn more
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </span>
        ) : null}
      </div>
      {featured && isLink && (
        <span className="relative mt-8 text-sm font-medium text-white/80 inline-flex items-center gap-1.5 group-hover:text-white transition">
          Read the dispatch
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </span>
      )}
    </a>
  );
}

/** Compact one-line entry for overflow dispatches — headline, meta, optional link. */
function DispatchBrief({
  category,
  date,
  title,
  href,
}: {
  category: string;
  date: string;
  title: string;
  href?: string;
}) {
  const isLink = Boolean(href);
  return (
    <a
      href={href}
      {...(href?.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
      className={`group flex flex-wrap items-baseline gap-x-6 gap-y-1 py-4 border-b border-white/10 last:border-b-0 ${
        isLink ? "cursor-pointer" : ""
      }`}
    >
      <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/45 font-medium w-40 shrink-0">
        <span className="w-1.5 h-1.5 rounded-full bg-magenta shrink-0" aria-hidden />
        {category}
      </span>
      <span
        className={`flex-1 min-w-[16rem] font-display text-base md:text-lg text-white/85 leading-snug ${
          isLink ? "group-hover:text-white group-hover:underline decoration-1 underline-offset-4" : ""
        }`}
      >
        {title}
      </span>
      <span className="ml-auto flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-white/40">
        {date}
        {isLink && (
          <span
            aria-hidden
            className="text-white/60 transition-transform group-hover:translate-x-0.5 group-hover:text-white"
          >
            →
          </span>
        )}
      </span>
    </a>
  );
}

export function OcrDispatch() {
  const sideItems = DISPATCH_ITEMS.slice(0, SIDE_CARD_COUNT);
  const briefItems = DISPATCH_ITEMS.slice(SIDE_CARD_COUNT);

  return (
    <section className="relative py-24 md:py-32 bg-ink text-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute inset-0 opacity-15"
          style={{ background: "var(--gradient-sunburst)" }}
        />
        <img
          src={ribbonImg}
          alt=""
          className="dispatch-ribbon absolute -top-[28%] -right-[18%] w-[min(95vw,880px)] max-w-none opacity-50 mix-blend-screen select-none"
        />
        <img
          src={ribbonImg}
          alt=""
          className="dispatch-ribbon-alt absolute -bottom-[32%] -left-[22%] w-[min(90vw,760px)] max-w-none opacity-45 mix-blend-screen -scale-x-100 rotate-[8deg] select-none"
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-ink via-ink/88 to-ink/55"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-ink/92 via-ink/65 to-ink/25"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 45%, transparent 0%, var(--ink) 72%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12 md:mb-16">
          <div className="lg:col-span-7">
            <span className="text-xs uppercase tracking-[0.22em] text-magenta font-medium">
              Dispatch
            </span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl leading-[0.98] text-white">
              What&apos;s happening{" "}
              <span className="text-white/50">@ OCR.</span>
            </h2>
          </div>
          <p className="lg:col-span-5 text-white/60 leading-relaxed text-base md:text-lg">
            Grants funded, tools shipped, partnerships formed, doors opened. A
            running record of the work — published openly.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-5 items-stretch">
          <div className={`flex ${sideItems.length > 0 ? "lg:col-span-7" : "lg:col-span-12"}`}>
            <DispatchCard
              className="flex-1"
              featured
              category={DISPATCH_SPOTLIGHT.category}
              date={DISPATCH_SPOTLIGHT.date}
              title={DISPATCH_SPOTLIGHT.title}
              desc={DISPATCH_SPOTLIGHT.desc}
            />
          </div>
          {sideItems.length > 0 && (
            <div className="lg:col-span-5 flex flex-col gap-5">
              {sideItems.map((item) => (
                <DispatchCard key={item.title} {...item} />
              ))}
            </div>
          )}
        </div>

        {briefItems.length > 0 && (
          <div className="mt-10 md:mt-12">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-[11px] uppercase tracking-[0.24em] font-medium text-white/45">
                More from the dispatch
              </span>
              <span className="h-px flex-1 bg-white/10" />
            </div>
            <div>
              {briefItems.map((item) => (
                <DispatchBrief key={item.title} {...item} />
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 md:mt-14 flex flex-wrap items-center justify-between gap-6 pt-10 border-t border-white/10">
          <p className="text-sm text-white/55 max-w-md leading-relaxed">
            Subscribe to the OCR dispatch — one short email a month.
          </p>
          <a
            href={SUBSCRIBE_HREF}
            className="inline-flex items-center gap-2 rounded-full bg-white text-ink px-6 py-3 text-sm font-medium hover:bg-cream transition shrink-0"
          >
            Subscribe
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
