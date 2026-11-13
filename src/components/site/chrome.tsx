import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
const CTA_ROTATING_PHRASES = [
  "worth funding.",
  "built together.",
  "clinic ready.",
  "science forward.",
  "made possible.",
] as const;

export function CtaRotatingPhrase({
  phrases = CTA_ROTATING_PHRASES,
  className = "text-white/70",
  intervalMs = 4500,
}: {
  phrases?: readonly string[];
  className?: string;
  intervalMs?: number;
}) {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reducedMotion || phrases.length < 2) return;

    let clearPrev: number | undefined;
    const intervalId = window.setInterval(() => {
      setIndex((current) => {
        setPrevIndex(current);
        clearPrev = window.setTimeout(() => setPrevIndex(null), 1300) as unknown as number;
        return (current + 1) % phrases.length;
      });
    }, intervalMs);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(clearPrev);
    };
  }, [reducedMotion, phrases, intervalMs]);

  const longest = phrases.reduce(
    (widest, phrase) => (phrase.length > widest.length ? phrase : widest),
    phrases[0] ?? "",
  );

  return (
    <span
      className={`relative grid w-full max-w-full align-text-bottom ${className}`}
      aria-live="polite"
    >
      <span aria-hidden className="invisible col-start-1 row-start-1">
        {longest}
      </span>
      {prevIndex !== null && (
        <span aria-hidden className="cta-phrase-exit absolute inset-0">
          {phrases[prevIndex]}
        </span>
      )}
      <span className={`col-start-1 row-start-1 ${prevIndex !== null ? "cta-phrase-enter" : ""}`}>
        {phrases[index]}
      </span>
    </span>
  );
}

/** Preserves acronyms (e.g. AI, NIH) when rendering service titles. */
function formatServiceTitlePart(text: string) {
  return text.replace(/\b(ai)\b/gi, "AI");
}

/** Splits on " & " so the ampersand leads the second line in display headings. */
export function ServiceTitle({ name }: { name: string }) {
  const parts = name.split(" & ");
  if (parts.length < 2) {
    return <>{formatServiceTitlePart(name)}</>;
  }
  return (
    <>
      {formatServiceTitlePart(parts[0])}
      <br />& {formatServiceTitlePart(parts.slice(1).join(" & "))}
    </>
  );
}

export function SunburstLogo({
  className = "",
  ...svgProps
}: { className?: string } & Omit<React.SVGProps<SVGSVGElement>, "className">) {
  const colors = [
    "#1e3a8a",
    "#0ea5e9",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#ec4899",
    "#8b5cf6",
    "#1e3a8a",
    "#0ea5e9",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#ec4899",
    "#8b5cf6",
    "#1e3a8a",
    "#0ea5e9",
  ];
  return (
    <svg viewBox="0 0 100 100" {...svgProps} className={className} aria-hidden>
      {Array.from({ length: 32 }).map((_, i) => {
        const angle = (i / 32) * 360;
        return (
          <rect
            key={i}
            x="49"
            y="4"
            width="2"
            height="22"
            rx="1"
            fill={colors[i % colors.length]}
            transform={`rotate(${angle} 50 50)`}
          />
        );
      })}
    </svg>
  );
}

export const SERVICES = [
  {
    to: "/services/research-development",
    name: "Research development",
    desc: "Grant strategy, writing, and funding support",
    accent: "var(--coral)",
  },
  {
    to: "/services/research-operations",
    name: "Research operations & management",
    desc: "Launching, coordinating, and managing research",
    accent: "var(--teal)",
  },
  {
    to: "/services/data-management",
    name: "Data management",
    desc: "Data organization, management, and sharing",
    accent: "var(--magenta)",
  },
  {
    to: "/services/ai-tools",
    name: "Research resources & AI tools",
    desc: "Tools and resources to accelerate research",
    accent: "var(--gold)",
  },
  {
    to: "/services/community-management",
    name: "Community & enrichment programs",
    desc: "Community building and collaboration",
    accent: "var(--lime)",
  },
] as const;

export type NavTone = "light" | "dark";

/**
 * Adaptive nav tone: the sticky header turns dark while it sits over a section marked
 * `data-tone="dark"` (e.g. a dark hero, booking block, or the footer) and light otherwise.
 * An IntersectionObserver watches a 1px band at the header's midline (once it is stuck to
 * the top). When nothing crosses that band — at the very top of the page, before the header
 * sticks — we fall back to the tone of the section touching the header's bottom edge.
 */
function useNavTone(initial: NavTone): NavTone {
  const [tone, setTone] = useState<NavTone>(initial);
  const { pathname } = useLocation();

  useEffect(() => {
    const header = document.querySelector<HTMLElement>("[data-site-header]");
    if (!header || typeof IntersectionObserver === "undefined") return;

    let observer: IntersectionObserver | null = null;
    const crossing = new Set<Element>();

    const compute = () => {
      if (crossing.size > 0) {
        setTone("dark");
        return;
      }
      const bottom = header.getBoundingClientRect().bottom;
      const touching = Array.from(document.querySelectorAll<HTMLElement>("[data-tone]")).find(
        (el) => {
          const r = el.getBoundingClientRect();
          return r.top <= bottom + 1 && r.bottom > bottom;
        },
      );
      setTone(touching?.dataset.tone === "dark" ? "dark" : "light");
    };

    const connect = () => {
      observer?.disconnect();
      crossing.clear();
      const midline = Math.round(header.getBoundingClientRect().height / 2);
      const below = Math.max(0, window.innerHeight - midline - 1);
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) crossing.add(entry.target);
            else crossing.delete(entry.target);
          }
          compute();
        },
        { rootMargin: `-${midline}px 0px -${below}px 0px`, threshold: 0 },
      );
      document.querySelectorAll('[data-tone="dark"]').forEach((el) => observer?.observe(el));
      compute();
    };

    connect();
    window.addEventListener("resize", connect);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", connect);
    };
  }, [pathname]);

  return tone;
}

function fineHover() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function ServiceLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <>
      {SERVICES.map((s) => {
        const active = pathname === s.to;
        return (
          <Link
            key={s.to}
            to={s.to}
            onClick={onNavigate}
            className={`rounded-xl p-3 block hover:bg-secondary transition ${
              active ? "bg-secondary ring-1 ring-coral/40" : ""
            }`}
          >
            <div className="flex items-start gap-2.5">
              <span
                className="mt-1.5 h-2 w-2 flex-none rounded-full"
                style={{ background: s.accent }}
              />
              <div>
                <div className="text-sm font-medium leading-snug text-ink">{s.name}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{s.desc}</div>
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
}

export function Header({ initialTone = "light" }: { initialTone?: NavTone }) {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const servicesOpenedByHover = useRef(false);
  const { pathname } = useLocation();
  const isServices = pathname.startsWith("/services");
  const isFunding = pathname.startsWith("/funding");
  const dark = useNavTone(initialTone) === "dark";

  const navLink = "px-4 py-2 rounded-full font-medium transition-colors";
  const navIdle = dark ? "hover:bg-white/10" : "hover:bg-secondary";
  const navActive = dark ? "bg-white/10" : "bg-secondary";
  const menuLink = `flex min-h-12 items-center rounded-xl px-3 text-base font-medium ${
    dark ? "hover:bg-white/10" : "hover:bg-secondary"
  }`;

  useEffect(() => {
    setNavOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!servicesOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setServicesOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [servicesOpen]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeMenu = () => {
      if (desktop.matches) setNavOpen(false);
    };
    desktop.addEventListener("change", closeMenu);
    return () => desktop.removeEventListener("change", closeMenu);
  }, []);

  useEffect(() => {
    if (!navOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setNavOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const main = document.getElementById("main");
    const footer = document.querySelector("footer");
    if (main) main.inert = true;
    if (footer) footer.inert = true;
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      if (main) main.inert = false;
      if (footer) footer.inert = false;
      window.removeEventListener("keydown", onKey);
    };
  }, [navOpen]);

  return (
    <header>
      <div className="bg-ink text-xs text-white">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between gap-3 px-6">
          <span className="min-w-0 truncate opacity-80">
            University of California San Francisco
          </span>
          <div className="hidden shrink-0 items-center gap-6 opacity-80 sm:flex">
            <a href="https://www.ucsf.edu/about" className="hover:opacity-100">
              About UCSF
            </a>
            <a href="https://www.ucsfhealth.org/" className="hover:opacity-100">
              UCSF Health
            </a>
            <a
              href="https://giving.ucsf.edu/"
              className="rounded-full bg-white px-3 py-1 font-medium text-ink hover:bg-cream"
            >
              Donate
            </a>
          </div>
        </div>
      </div>

      <div
        data-site-header
        className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors duration-300 ${
          dark ? "border-white/10 bg-ink text-white" : "border-border bg-background/85 text-ink"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-3 px-6">
          <Link to="/" data-intro-header-lockup className="flex min-w-0 items-center gap-3">
            <SunburstLogo data-intro-header-logo className="h-11 w-11 shrink-0" />
            <span
              data-intro-header-text
              className="font-display text-[15px] leading-tight transition-colors duration-300"
            >
              Office of
              <br />
              Collaborative Research
            </span>
          </Link>

          <nav className="hidden items-center gap-1 text-[15px] lg:flex">
            <Link
              to="/about"
              className={`${navLink} ${navIdle}`}
              activeProps={{ className: navActive }}
            >
              About
            </Link>

            <div
              className="relative"
              onMouseEnter={() => {
                if (!fineHover()) return;
                servicesOpenedByHover.current = true;
                setServicesOpen(true);
              }}
              onMouseLeave={() => {
                if (!fineHover()) return;
                servicesOpenedByHover.current = false;
                setServicesOpen(false);
              }}
            >
              <button
                type="button"
                aria-expanded={servicesOpen}
                aria-haspopup="true"
                aria-controls={servicesOpen ? "services-menu" : undefined}
                className={`${navLink} flex items-center gap-1.5 ${isServices ? navActive : navIdle}`}
                onClick={() => {
                  if (servicesOpenedByHover.current) return;
                  setServicesOpen((open) => !open);
                }}
              >
                Services
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path
                    d="M3 4.5L6 7.5L9 4.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              {servicesOpen && (
                <div
                  id="services-menu"
                  className="absolute top-full left-1/2 w-[min(100vw-2rem,26rem)] -translate-x-1/2 pt-2"
                >
                  <div className="flex flex-col gap-0.5 rounded-2xl border border-border bg-card p-2 shadow-lift">
                    <ServiceLinks pathname={pathname} onNavigate={() => setServicesOpen(false)} />
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/people"
              className={`${navLink} ${navIdle}`}
              activeProps={{ className: navActive }}
            >
              People
            </Link>
            <Link
              to="/portfolio"
              className={`${navLink} ${navIdle}`}
              activeProps={{ className: navActive }}
            >
              Portfolio
            </Link>
            <Link
              to="/funding"
              activeOptions={{ exact: true }}
              className={`${navLink} ${isFunding ? navActive : navIdle}`}
            >
              Funding
            </Link>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              to="/contact"
              className={`hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300 md:inline-flex ${
                dark ? "bg-white text-ink hover:bg-cream" : "bg-ink text-white hover:bg-ink/90"
              }`}
            >
              Get in touch
              <span aria-hidden>→</span>
            </Link>
            <button
              type="button"
              className={`inline-flex h-11 w-11 items-center justify-center rounded-full border lg:hidden ${
                dark ? "border-white/25" : "border-ink/15"
              }`}
              aria-expanded={navOpen}
              aria-controls="site-nav-panel"
              onClick={() => setNavOpen((open) => !open)}
            >
              <span className="sr-only">{navOpen ? "Close menu" : "Open menu"}</span>
              {navOpen ? (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                  <path
                    d="M4 4l10 10M14 4L4 14"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                  <path
                    d="M3 5h12M3 9h12M3 13h12"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {navOpen && (
          <div
            id="site-nav-panel"
            className={`absolute inset-x-0 top-full max-h-[calc(100dvh-5rem)] overflow-y-auto border-b lg:hidden ${
              dark ? "border-white/10 bg-ink text-white" : "border-border bg-background text-ink"
            }`}
          >
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
              <Link
                to="/about"
                className={menuLink}
                activeProps={{ className: dark ? "bg-white/10" : "bg-secondary" }}
              >
                About
              </Link>
              <div
                className={`px-3 pt-3 text-xs font-medium uppercase tracking-[0.16em] ${dark ? "text-white/50" : "text-muted-foreground"}`}
              >
                Services
              </div>
              {SERVICES.map((s) => (
                <Link
                  key={s.to}
                  to={s.to}
                  className={`${menuLink} ${pathname === s.to ? (dark ? "bg-white/10" : "bg-secondary") : ""}`}
                >
                  <span
                    className="mr-2.5 h-2 w-2 shrink-0 rounded-full"
                    style={{ background: s.accent }}
                  />
                  {s.name}
                </Link>
              ))}
              <Link
                to="/people"
                className={menuLink}
                activeProps={{ className: dark ? "bg-white/10" : "bg-secondary" }}
              >
                People
              </Link>
              <Link
                to="/portfolio"
                className={menuLink}
                activeProps={{ className: dark ? "bg-white/10" : "bg-secondary" }}
              >
                Portfolio
              </Link>
              <Link
                to="/funding"
                activeOptions={{ exact: true }}
                className={`${menuLink} ${isFunding ? (dark ? "bg-white/10" : "bg-secondary") : ""}`}
              >
                Funding
              </Link>
              <Link
                to="/contact"
                className={`mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium md:hidden ${
                  dark ? "bg-white text-ink" : "bg-ink text-white"
                }`}
              >
                Get in touch
                <span aria-hidden>→</span>
              </Link>
              <div
                className={`mt-3 flex flex-col gap-1 border-t pt-3 sm:hidden ${dark ? "border-white/10" : "border-border"}`}
              >
                <a href="https://www.ucsf.edu/about" className={menuLink}>
                  About UCSF
                </a>
                <a href="https://www.ucsfhealth.org/" className={menuLink}>
                  UCSF Health
                </a>
                <a href="https://giving.ucsf.edu/" className={menuLink}>
                  Donate
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
      {navOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-30 bg-ink/40 lg:hidden"
          onClick={() => setNavOpen(false)}
        />
      )}
    </header>
  );
}

export function Breadcrumb({ trail }: { trail: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-6 pt-8 text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center">
        <li>
          <Link to="/" className="hover:text-ink">
            Home
          </Link>
        </li>
        {trail.map((t, i) => (
          <li key={i} className="flex items-center">
            <span aria-hidden className="mx-2 opacity-50">
              /
            </span>
            {t.to ? (
              <a href={t.to} className="hover:text-ink">
                {t.label}
              </a>
            ) : (
              <span className="text-ink font-medium" aria-current="page">
                {t.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function CTA({
  id = "contact",
  eyebrow = "Get started",
  title,
  subtitle,
  email,
  primaryLabel = "Book a 30-min consult →",
  primaryHref,
}: {
  id?: string;
  eyebrow?: string;
  title: React.ReactNode;
  subtitle: string;
  email: string;
  primaryLabel?: string;
  /** Defaults to a mailto of `email`. External http(s) URLs open in a new tab. */
  primaryHref?: string;
}) {
  const href = primaryHref ?? `mailto:${email}`;
  const external = /^https?:\/\//.test(href);
  return (
    <section id={id} className="scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-clip rounded-[2rem] bg-ink p-6 text-white contain-paint sm:rounded-[2.5rem] sm:p-10 lg:p-16 xl:p-20">
          <div className="absolute inset-0 bg-gradient-sunburst opacity-25" />
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 right-0 h-56 w-56 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 70% 70%, rgb(255 255 255 / 0.16), transparent 68%)",
            }}
          />
          <div className="relative grid min-w-0 items-center gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="min-w-0 lg:col-span-7">
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">
                {eyebrow}
              </span>
              <h2 className="mt-3 max-w-full text-4xl font-medium leading-[1.05] text-white sm:text-5xl lg:text-6xl lg:leading-[1.02]">
                {title}
              </h2>
              <p className="mt-6 max-w-xl text-pretty leading-relaxed text-white/80">{subtitle}</p>
            </div>
            <div className="min-w-0 lg:col-span-5 lg:pl-8">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur sm:p-6">
                <div className="text-xs text-white/60 uppercase tracking-widest">Email us</div>
                <a
                  href={`mailto:${email}`}
                  className="block mt-3 text-2xl font-display hover:underline"
                >
                  {email}
                </a>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="inline-flex items-center gap-2 rounded-full bg-white text-ink px-5 py-3 text-sm font-medium hover:bg-cream transition"
                  >
                    {primaryLabel}
                  </a>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-medium hover:bg-white/10 transition"
                  >
                    Partner with OCR
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer data-tone="dark" className="bg-ink text-white/70 pt-20 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-10 pb-14 border-b border-white/10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-4">
              <SunburstLogo className="w-14 h-14 shrink-0" />
              <span className="font-display text-white text-lg leading-tight">
                Office of
                <br />
                Collaborative Research
              </span>
            </div>
            <p className="mt-6 text-sm max-w-sm leading-relaxed">
              OCR works in the space between inspiration and impact.
            </p>
          </div>
          <div className="md:col-span-3">
            <div className="text-xs uppercase tracking-widest text-white/50 mb-4">Services</div>
            <ul className="space-y-2.5 text-sm">
              {SERVICES.map((s) => (
                <li key={s.to}>
                  <Link to={s.to} className="hover:text-white">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <div className="text-xs uppercase tracking-widest text-white/50 mb-4">OCR</div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link to="/people" className="hover:text-white">
                  People
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-white">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/funding" activeOptions={{ exact: true }} className="hover:text-white">
                  Funding
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <div className="text-xs uppercase tracking-widest text-white/50 mb-4">Connect</div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="mailto:ocr@ucsf.edu" className="hover:text-white">
                  ocr@ucsf.edu
                </a>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white">
                  Get in touch
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:ocr@ucsf.edu?subject=${encodeURIComponent("Subscribe me to the OCR dispatch")}`}
                  className="hover:text-white"
                >
                  Newsletter
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-4 mt-8 text-xs text-white/50">
          <div>© {new Date().getFullYear()} The Regents of the University of California</div>
          <div className="flex gap-6">
            <a href="https://www.ucsf.edu/accessibility-resources" className="hover:text-white">
              Accessibility
            </a>
            <a href="https://www.ucsf.edu/website-privacy-policy" className="hover:text-white">
              Privacy
            </a>
            <a href="https://www.ucsf.edu/terms-of-use" className="hover:text-white">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function SiteShell({
  children,
  navTone = "light",
}: {
  children: React.ReactNode;
  /** Tone the sticky nav renders with before scrolling (use "dark" when the page opens on a dark hero). */
  navTone?: NavTone;
}) {
  return (
    <div data-site-shell className="min-h-screen bg-background">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header initialTone={navTone} />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
    </div>
  );
}
