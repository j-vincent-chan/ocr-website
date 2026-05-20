import { Link, useLocation } from "@tanstack/react-router";
import { useState } from "react";

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
      <circle cx="50" cy="50" r="11" fill="white" />
    </svg>
  );
}

export const SERVICES = [
  {
    to: "/services/research-development",
    name: "Research Development & Grantwriting",
    desc: "Strategy, matchmaking & writing",
    accent: "var(--coral)",
  },
  {
    to: "/services/project-management",
    name: "Project Management & Clinical Coordination",
    desc: "Study startup, CRCs & operations",
    accent: "var(--teal)",
  },
  {
    to: "/services/data-management",
    name: "Data Management & Sharing",
    desc: "Databases, metadata & DMS plans",
    accent: "var(--magenta)",
  },
  {
    to: "/services/ai-tools",
    name: "AI Tools & Workflow Innovation",
    desc: "Signal, Prospera & automation",
    accent: "var(--gold)",
  },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isServices = pathname.startsWith("/services");

  return (
    <>
      <div className="bg-ink text-white text-xs">
        <div className="max-w-7xl mx-auto px-6 h-9 flex items-center justify-between">
          <span className="opacity-80">University of California San Francisco</span>
          <div className="hidden sm:flex items-center gap-6 opacity-80">
            <a href="#" className="hover:opacity-100">About UCSF</a>
            <a href="#" className="hover:opacity-100">UCSF Medical Center</a>
            <a href="#" className="rounded-full bg-white text-ink px-3 py-1 font-medium hover:bg-cream">Donate</a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <SunburstLogo className="w-11 h-11" />
            <span className="font-display text-[15px] leading-tight text-ink">
              Office of<br />Collaborative Research
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 text-[15px] text-ink">
            <Link
              to="/about"
              className="px-4 py-2 rounded-full hover:bg-secondary font-medium"
              activeProps={{ className: "px-4 py-2 rounded-full bg-secondary font-medium" }}
            >
              About
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              <button
                className={`px-4 py-2 rounded-full flex items-center gap-1.5 font-medium ${
                  isServices ? "bg-secondary" : "hover:bg-secondary"
                }`}
              >
                Services
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
              {open && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[560px]">
                  <div className="bg-card rounded-2xl shadow-lift border border-border p-3 grid grid-cols-2 gap-1">
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

            {["People", "Projects", "Funding", "Collaborate"].map((l) => (
              <a key={l} href="#" className="px-4 py-2 rounded-full hover:bg-secondary font-medium">
                {l}
              </a>
            ))}
          </nav>

          <Link
            to="/about"
            hash="contact"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-ink text-white px-5 py-2.5 text-sm font-medium hover:bg-ink/90 transition"
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
  eyebrow = "Get started",
  title,
  subtitle,
  email,
  primaryLabel = "Book a 30-min consult →",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle: string;
  email: string;
  primaryLabel?: string;
}) {
  return (
    <section id="contact" className="py-24">
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
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-medium hover:bg-white/10 transition"
                  >
                    Partner with OCR
                  </a>
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
    <footer className="bg-ink text-white/70 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-10 pb-14 border-b border-white/10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <SunburstLogo className="w-10 h-10" />
              <span className="font-display text-white text-base leading-tight">
                Office of<br />Collaborative Research
              </span>
            </div>
            <p className="mt-6 text-sm max-w-sm leading-relaxed">
              The strategic hub of ImmunoX and the Parnassus Institutes at UCSF —
              advancing research and fostering meaningful collaborations.
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
              <li><a href="#" className="hover:text-white">People</a></li>
              <li><a href="#" className="hover:text-white">Projects</a></li>
              <li><a href="#" className="hover:text-white">Funding</a></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <div className="text-xs uppercase tracking-widest text-white/50 mb-4">Connect</div>
            <ul className="space-y-2.5 text-sm">
              <li><a href="mailto:ocr@ucsf.edu" className="hover:text-white">ocr@ucsf.edu</a></li>
              <li><a href="#" className="hover:text-white">Newsletter</a></li>
              <li><a href="#" className="hover:text-white">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-4 mt-8 text-xs text-white/50">
          <div>© {new Date().getFullYear()} The Regents of the University of California</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Accessibility</a>
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
