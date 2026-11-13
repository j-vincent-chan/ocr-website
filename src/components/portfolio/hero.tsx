import { useEffect, useRef, useState } from "react";
import { Motif } from "@/components/portfolio/motif";
import { communities, programs, projects } from "@/data/portfolio";

export type PortfolioView = "programs" | "projects" | "communities";

const TAB_COPY: Record<
  PortfolioView,
  { title: string; verb: string; desc: string; rel: string; kind: string }
> = {
  programs: {
    title: "Programs",
    verb: "encompass multiple research efforts.",
    desc: "A program can hold dozens of projects or trials. OCR's role is stated for the program as a whole.",
    rel: "Programs contain projects.",
    kind: "honeycomb",
  },
  projects: {
    title: "Projects",
    verb: "are individual research efforts.",
    desc: "One biospecimen collection effort, clinical study, or trial. Some belong to a program; others stand alone.",
    rel: "Some belong to a program.",
    kind: "helix",
  },
  communities: {
    title: "Communities",
    verb: "are groups of people and organizations.",
    desc: "Supported through community-building and enrichment programming that OCR helps deliver.",
    rel: "Alongside programs and projects, not beneath them.",
    kind: "constellation",
  },
};

const TAB_COLOR = "#db2fb2";

const COUNTS: Record<PortfolioView, number> = {
  programs: programs.length,
  projects: projects.length,
  communities: communities.length,
};

export function PortfolioHero({
  view,
  onViewChange,
}: {
  view: PortfolioView;
  onViewChange: (view: PortfolioView) => void;
}) {
  const copy = TAB_COPY[view];
  const tabsRef = useRef<HTMLElement | null>(null);
  const [showBar, setShowBar] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(view);

  useEffect(() => {
    const el = tabsRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setShowBar(!entry?.isIntersecting),
      { rootMargin: "-80px 0px 0px 0px", threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    setActiveSection(view);
  }, [view]);

  useEffect(() => {
    const contact = document.getElementById("contact");
    if (!contact) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setActiveSection("contact");
        else setActiveSection(view);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );
    io.observe(contact);
    return () => io.disconnect();
  }, [view]);

  const goSection = (id: PortfolioView | "contact") => {
    if (id !== "contact") onViewChange(id);
    requestAnimationFrame(() => {
      const target = document.getElementById(id === "contact" ? "contact" : id);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const navStyle = (on: boolean): React.CSSProperties => ({
    display: "inline-flex",
    alignItems: "center",
    minHeight: 40,
    padding: "0 16px",
    borderRadius: 999,
    font: "500 14px/1 Inter, system-ui, sans-serif",
    textDecoration: "none",
    whiteSpace: "nowrap",
    background: on ? "#010621" : "transparent",
    color: on ? "#fff" : "#010621",
  });

  const tabStyle = (on: boolean): React.CSSProperties => ({
    display: "inline-flex",
    alignItems: "center",
    gap: 9,
    minHeight: 44,
    padding: "0 20px",
    borderRadius: 999,
    border: 0,
    font: "500 15px/1 Inter, system-ui, sans-serif",
    whiteSpace: "nowrap",
    cursor: "pointer",
    background: on ? "#010621" : "transparent",
    color: on ? "#fff" : "#010621",
    transition: "color .2s ease, background-color .2s ease",
  });

  return (
    <>
      <div
        className="relative overflow-hidden border-b"
        style={{ background: "#f9f5ec", borderColor: "rgba(1,6,33,.1)" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute rounded-full opacity-25 blur-[64px]"
          style={{
            top: -160,
            left: -160,
            width: 640,
            height: 640,
            background:
              "linear-gradient(135deg,#ff6450 0%,#db2fb2 35%,#6159e1 65%,#00b5b6 100%)",
          }}
        />

        <section className="relative">
          <div className="relative mx-auto flex max-w-[1280px] flex-wrap items-center gap-6 px-6 pb-1 pt-9 md:gap-12">
            <div className="min-w-0 flex-[1_1_320px]">
              <span
                style={{
                  font: "500 12px/1.4 Inter, system-ui, sans-serif",
                  letterSpacing: ".22em",
                  textTransform: "uppercase",
                  color: "#b82695",
                }}
              >
                Portfolio
              </span>
              <h1
                className="mt-3.5 font-display tracking-tight text-[#010621]"
                style={{
                  fontSize: "clamp(2.2rem, 5.2vw, 4.25rem)",
                  lineHeight: 1,
                  letterSpacing: "-.025em",
                  fontWeight: 400,
                }}
              >
                Science we're{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(135deg,#e55240 0%,#ce35a8 35%,#615ed6 65%,#008e8e 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    paddingRight: ".06em",
                  }}
                >
                  moving forward.
                </span>
              </h1>
              <p
                className="mt-3.5 max-w-[44rem] text-[#555e6f] text-pretty"
                style={{
                  fontSize: "clamp(1rem, 1.4vw, 1.125rem)",
                  lineHeight: 1.6,
                }}
              >
                OCR contributes to research across cancer, autoimmunity, infection, lung
                disease, and critical care. This page shows where, and what that
                contribution looks like.
              </p>
            </div>
          </div>
        </section>

        <section
          id="portfolio-tabs"
          ref={tabsRef}
          className="relative py-7 pb-10"
        >
          <div className="mx-auto max-w-[1280px] px-6">
            <div className="overflow-x-auto">
              <div
                role="tablist"
                aria-label="Portfolio categories"
                className="inline-flex rounded-full border border-[#dad7cf] bg-white p-1"
              >
                {(["programs", "projects", "communities"] as const).map((id) => {
                  const on = view === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      role="tab"
                      id={`tab-${id}`}
                      aria-selected={on}
                      aria-controls="portfolio-results"
                      onClick={() => onViewChange(id)}
                      style={tabStyle(on)}
                    >
                      {id[0]!.toUpperCase() + id.slice(1)}
                      <span style={{ opacity: 0.7 }}>{COUNTS[id]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div
              className="relative mt-4 flex flex-wrap items-center gap-[18px] overflow-hidden rounded-[24px] border border-[#e4e1d8] bg-white"
              style={{
                padding: "clamp(20px,2.8vw,30px) clamp(22px,3.4vw,40px)",
                gap: "18px 36px",
              }}
            >
              <span
                aria-hidden
                className="aspect-square flex-none overflow-hidden rounded-full"
                style={{
                  width: "clamp(84px,11vw,128px)",
                  background: `color-mix(in oklab, ${TAB_COLOR} 16%, #f9f5ec)`,
                }}
              >
                <Motif
                  name={copy.title}
                  kind={copy.kind}
                  color={TAB_COLOR}
                  mode="animated"
                  zoom={1.5}
                />
              </span>
              <p
                className="min-w-0 flex-[1_1_300px] text-balance font-display text-[#010621]"
                style={{
                  margin: 0,
                  fontSize: "clamp(1.6rem,3.2vw,2.4rem)",
                  lineHeight: 1.08,
                  letterSpacing: "-.015em",
                  fontWeight: 400,
                }}
              >
                {copy.title}{" "}
                <span style={{ fontStyle: "italic", color: "#6f7689" }}>{copy.verb}</span>
              </p>
              <div className="min-w-0 flex-[1_1_300px]">
                <p
                  className="m-0 max-w-[56ch] text-pretty text-[#242d42]"
                  style={{ fontSize: 15.5, lineHeight: 1.6 }}
                >
                  {copy.desc}
                </p>
                <p
                  className="mt-2.5 inline-flex items-center gap-2.5 text-[#010621]"
                  style={{ font: "500 13.5px/1.4 Inter, system-ui, sans-serif" }}
                >
                  <span
                    aria-hidden
                    className="flex flex-none flex-col justify-center gap-0.5 box-border"
                    style={{
                      width: 15,
                      height: 13,
                      border: "1.5px solid currentColor",
                      borderRadius: 4,
                      padding: "0 2px",
                    }}
                  >
                    <span className="h-[1.5px] bg-current" />
                    <span className="h-[1.5px] bg-current" />
                  </span>
                  {copy.rel}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {showBar && (
        <div
          className="fixed inset-x-0 z-30 border-y border-[#e4e1d8]"
          style={{
            top: 80,
            background: "rgba(253,252,248,.94)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          <nav
            aria-label="Sections of Portfolio"
            className="mx-auto flex max-w-[1280px] items-center gap-1.5 overflow-x-auto px-6 py-2"
          >
            <span
              className="mr-3.5 whitespace-nowrap font-display text-[15px] text-[#010621]"
              style={{ fontWeight: 400 }}
            >
              Portfolio
            </span>
            {(["programs", "projects", "communities", "contact"] as const).map((id) => {
              const on =
                id === "contact"
                  ? activeSection === "contact"
                  : view === id && activeSection !== "contact";
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  aria-current={on ? "true" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    goSection(id);
                  }}
                  style={navStyle(on)}
                  className="hover:shadow-[inset_0_0_0_1px_#010621]"
                >
                  {id[0]!.toUpperCase() + id.slice(1)}
                </a>
              );
            })}
          </nav>
        </div>
      )}

    </>
  );
}
