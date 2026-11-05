import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";

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

  return (
    <span
      className={`relative inline-block min-w-[17ch] h-[1.2em] align-text-bottom ${className}`}
      aria-live="polite"
    >
      {prevIndex !== null && (
        <span aria-hidden className="cta-phrase-exit absolute inset-0">
          {phrases[prevIndex]}
        </span>
      )}
      <span
        className={`absolute inset-0 ${prevIndex !== null ? "cta-phrase-enter" : ""}`}
      >
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
      <br />
      & {formatServiceTitlePart(parts.slice(1).join(" & "))}
    </>
  );
}

export function SunburstLogo({ className = "" }: { className?: string }) {
  const colors = [
    "#1e3a8a", "#0ea5e9", "#10b981", "#f59e0b",
    "#ef4444", "#ec4899", "#8b5cf6", "#1e3a8a",
    "#0ea5e9", "#10b981", "#f59e0b", "#ef4444",
    "#ec4899", "#8b5cf6", "#1e3a8a", "#0ea5e9",
  ];
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
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
    name: "Research Development",
    desc: "Grant strategy, writing, and funding support",
    accent: "var(--coral)",
  },
  {
    to: "/services/project-management",
    name: "Project Management & Clinical Coordination",
    desc: "Research operations and study coordination",
    accent: "var(--teal)",
  },
  {
    to: "/services/data-management",
    name: "Data Management",
    desc: "Data organization, management, and sharing",
    accent: "var(--magenta)",
  },
  {
    to: "/services/ai-tools",
    name: "Research Resources & AI Tools",
    desc: "Tools and resources to accelerate research",
    accent: "var(--gold)",
  },
  {
    to: "/services/community-management",
    name: "Community Management",
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
      const touching = Array.from(document.querySelectorAll<HTMLElement>("[data-tone]")).find((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= bottom + 1 && r.bottom > bottom;
      });
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
  }, []);

  return tone;
}

export function Header({ initialTone = "light" }: { initialTone?: NavTone }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isServices = pathname.startsWith("/services");
  const dark = useNavTone(initialTone) === "dark";

  const navLink = "px-4 py-2 rounded-full font-medium transition-colors";
  const navIdle = dark ? "hover:bg-white/10" : "hover:bg-secondary";
  const navActive = dark ? "bg-white/10" : "bg-secondary";

  return (
    <>
      <div className="bg-ink text-white text-xs">
        <div className="max-w-7xl mx-auto px-6 h-9 flex items-center justify-between">
          <span className="opacity-80">University of California San Francisco</span>
          <div className="hidden sm:flex items-center gap-6 opacity-80">
            <a href="https://www.ucsf.edu/about" className="hover:opacity-100">About UCSF</a>
            <a href="https://www.ucsfhealth.org/" className="hover:opacity-100">UCSF Health</a>
            <a href="https://giving.ucsf.edu/" className="rounded-full bg-white text-ink px-3 py-1 font-medium hover:bg-cream">Donate</a>
          </div>
        </div>
      </div>

      <header
        data-site-header
        className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-300 ${
          dark ? "bg-ink border-white/10 text-white" : "bg-background/85 border-border text-ink"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <SunburstLogo className="w-11 h-11" />
            <span className="font-display text-[15px] leading-tight transition-colors duration-300">
              Office of<br />Collaborative Research
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 text-[15px]">
            <Link
              to="/about"
              className={`${navLink} ${navIdle}`}
              activeProps={{ className: navActive }}
            >
              About
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              <button
                className={`${navLink} flex items-center gap-1.5 ${isServices ? navActive : navIdle}`}
              >
                Services
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
              {open && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[min(100vw-2rem,26rem)]">
                  <div className="bg-card rounded-2xl shadow-lift border border-border p-2 flex flex-col gap-0.5">
                    {SERVICES.map((s) => {
                      const active = pathname === s.to;
                      return (
                        <Link
                          key={s.to}
                          to={s.to}
                          className={`p-3 rounded-xl block hover:bg-secondary transition ${
                            active ? "bg-secondary ring-1 ring-coral/40" : ""
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            <span
                              className="mt-1.5 w-2 h-2 rounded-full flex-none"
                              style={{ background: s.accent }}
                            />
                            <div>
                              <div className="font-medium text-sm text-ink leading-snug">{s.name}</div>
                              <div className="text-xs text-muted-foreground mt-0.5">{s.desc}</div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
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
              to="/projects"
              className={`${navLink} ${navIdle}`}
              activeProps={{ className: navActive }}
            >
              Programs & Projects
            </Link>
            <Link
              to="/projects"
              hash="funding"
              className={`${navLink} ${navIdle}`}
            >
              Funding
            </Link>
          </nav>

          <Link
            to="/contact"
            className={`hidden md:inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300 ${
              dark ? "bg-white text-ink hover:bg-cream" : "bg-ink text-white hover:bg-ink/90"
            }`}
          >
            Get in touch
            <span aria-hidden>→</span>
          </Link>
        </div>
      </header>
    </>
  );
}

export function Breadcrumb({ trail }: { trail: { label: string; to?: string }[] }) {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-8 text-sm text-muted-foreground">
      <Link to="/" className="hover:text-ink">Home</Link>
      {trail.map((t, i) => (
        <span key={i}>
          <span className="mx-2 opacity-50">/</span>
          {t.to ? (
            <a href={t.to} className="hover:text-ink">{t.label}</a>
          ) : (
            <span className="text-ink font-medium">{t.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}

export function CTA({
  id = "contact",
  eyebrow = "Get started",
  title,
  subtitle,
  email,
  primaryLabel = "Book a 30-min consult →",
}: {
  id?: string;
  eyebrow?: string;
  title: React.ReactNode;
  subtitle: string;
  email: string;
  primaryLabel?: string;
}) {
  return (
    <section id={id} className="py-24 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative rounded-[2.5rem] overflow-hidden bg-ink text-white p-12 md:p-20">
          <div className="absolute inset-0 bg-gradient-sunburst opacity-25" />
          <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full bg-white/5 blur-3xl" />
          <div className="relative grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <span className="text-xs uppercase tracking-[0.2em] text-white/60 font-medium">{eyebrow}</span>
              <h2 className="mt-3 text-4xl md:text-6xl font-medium text-white leading-[1.02]">{title}</h2>
              <p className="mt-6 text-white/80 max-w-xl leading-relaxed">{subtitle}</p>
            </div>
            <div className="lg:col-span-5 lg:pl-8">
              <div className="rounded-2xl bg-white/10 backdrop-blur border border-white/15 p-6">
                <div className="text-xs text-white/60 uppercase tracking-widest">Email us</div>
                <a href={`mailto:${email}`} className="block mt-3 text-2xl font-display hover:underline">
                  {email}
                </a>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={`mailto:${email}`}
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
                Office of<br />Collaborative Research
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
                  <Link to={s.to} className="hover:text-white">{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <div className="text-xs uppercase tracking-widest text-white/50 mb-4">OCR</div>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="hover:text-white">About</Link></li>
              <li><Link to="/people" className="hover:text-white">People</Link></li>
              <li><Link to="/projects" className="hover:text-white">Programs & Projects</Link></li>
              <li><Link to="/projects" hash="funding" className="hover:text-white">Funding</Link></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <div className="text-xs uppercase tracking-widest text-white/50 mb-4">Connect</div>
            <ul className="space-y-2.5 text-sm">
              <li><a href="mailto:ocr@ucsf.edu" className="hover:text-white">ocr@ucsf.edu</a></li>
              <li><Link to="/contact" className="hover:text-white">Get in touch</Link></li>
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
            <a href="https://www.ucsf.edu/accessibility-resources" className="hover:text-white">Accessibility</a>
            <a href="https://www.ucsf.edu/website-privacy-policy" className="hover:text-white">Privacy</a>
            <a href="https://www.ucsf.edu/terms-of-use" className="hover:text-white">Terms</a>
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
    <div className="min-h-screen bg-background">
      <Header initialTone={navTone} />
      {children}
      <Footer />
    </div>
  );
}
