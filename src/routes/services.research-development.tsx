import { createFileRoute, Link } from "@tanstack/react-router";
import gabeImg from "@/assets/people/gabe-murphy.jpg";
import gabeHoverImg from "@/assets/people/hover/gabe-murphy-hover.jpg";
import reidImg from "@/assets/people/reid-bolus.jpg";
import reidHoverImg from "@/assets/people/hover/reid-bolus-hover.jpg";
import lindsayImg from "@/assets/people/lindsay-breithaupt.jpg";
import lindsayHoverImg from "@/assets/people/hover/lindsay-breithaupt-hover.jpg";
import { SiteShell, Breadcrumb, CTA, SunburstLogo } from "@/components/site/chrome";
import { GhibliPortrait } from "@/components/site/ghibli-portrait";
import {
  ArmEyebrow,
  PullQuote,
  ServiceCrossNav,
} from "@/components/site/service-family";

export const Route = createFileRoute("/services/research-development")({
  head: () => ({
    meta: [
      { title: "Research Development — UCSF OCR" },
      {
        name: "description",
        content:
          "We help UCSF faculty turn an idea into a compelling, competitive grant application — finding the right funding opportunity, sharpening the rationale and promise of the work, and supporting the proposal through submission.",
      },
      { property: "og:title", content: "Research Development — UCSF OCR" },
      {
        property: "og:description",
        content:
          "Sharpening UCSF's competitiveness one investigator, one portfolio, one proposal at a time.",
      },
    ],
  }),
  component: RDGPage,
});

const C = "var(--coral)";
const ARM = "01";

/* ───────── HERO ───────── */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream border-b border-border">
      <div
        aria-hidden
        className="absolute -top-40 -right-40 w-[720px] h-[720px] rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--gradient-sunburst)" }}
      />
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-24 relative">
        <ArmEyebrow arm={ARM} label="One of five service arms" accent={C} />
        <h1 className="mt-8 font-display text-[clamp(2.15rem,4.2vw,3.75rem)] leading-[1.08] tracking-tight text-ink max-w-4xl">
          Transforming research ideas into{" "}
          <em className="not-italic" style={{ color: C }}>
            competitive funding proposals.
          </em>
        </h1>
        <div className="mt-12 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-6">
            <p className="text-xl text-muted-foreground leading-relaxed">
              We find the right opportunity, sharpen the rationale and promise
              of the proposed work, and shape submissions that compete in a
              tough funding landscape.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-ink text-white px-6 py-3.5 text-sm font-medium hover:bg-ink/90 transition shadow-lift"
              >
                Request support <span aria-hidden>→</span>
              </Link>
              <a
                href="#stages"
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-card px-6 py-3.5 text-sm font-medium hover:bg-secondary transition"
              >
                How we work with you <span aria-hidden>↓</span>
              </a>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Found a NOFO and need a hand? Start there — a 30-minute consult is
              free, and no deadline is required.
            </p>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 grid grid-cols-3 gap-6">
            {[
              ["43", "Grants supported in 2025"],
              ["120+", "Investigators served"],
              ["9.3/10", "Avg. PI satisfaction"],
            ].map(([n, l]) => (
              <div key={l} className="border-l-2 pl-4" style={{ borderColor: C }}>
                <div className="font-display text-3xl text-ink leading-none">{n}</div>
                <div className="text-[11px] text-muted-foreground uppercase tracking-widest mt-2 leading-snug">
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── WHAT WE DO ─────────
 * The one section that explains the arm. Expands the hero's three verbs
 * (find / sharpen / shape) in prose, states who it's for, and carries the
 * origin story as a two-sentence aside. Deliberately no cards: the service
 * menu below is where cards belong. */
function WhatWeDo() {
  const verbs = [
    {
      t: "Find the opportunity.",
      d: "We track funding announcements across agencies and foundations, map them against what you're working on, and bring the right ones to you — often before you've started looking. For larger efforts, we also find the collaborators across UCSF who make a multi-investigator application credible.",
      services: ["Strategic Consultations"],
    },
    {
      t: "Sharpen the argument.",
      d: "A strong idea isn't yet a strong proposal. We pressure-test the premise, tighten the Specific Aims, and read the research plan the way a study section will — then pair you with senior UCSF faculty for a scientific review before the real reviewers see it.",
      services: ["Specific Aims Reviews", "Scientific Peer Reviews", "Research Plan Reviews"],
    },
    {
      t: "Shape the submission.",
      d: "Narrative, figures, biosketches, letters of support, budgets, timelines. We coordinate the pieces through one point of contact, from the first conversation to the day you submit — and for center-scale programs, our strategists embed with the team from concept onward.",
      services: ["Large Grant Development Program"],
    },
  ];
  return (
    <section className="py-28 border-b border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            <ArmEyebrow arm={ARM} label="What we do" accent={C} />
            <h2 className="mt-6 font-display text-5xl md:text-6xl text-ink leading-[0.98]">
              We work in the space
              <br />
              <em className="not-italic" style={{ color: C }}>
                between an idea and an award.
              </em>
            </h2>
          </div>
          <p className="lg:col-span-5 text-xl text-ink/85 leading-relaxed">
            Our strategists are trained scientists and practiced editors. We
            won't know your field the way you do — and that's the point. We see
            the assumptions, the leaps in logic, and the arguments that won't
            land with a reviewer, in a way that's hard to do from inside the
            work.
          </p>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-10 lg:gap-14">
          {verbs.map((v) => (
            <div key={v.t} className="border-t-2 pt-7 flex flex-col" style={{ borderColor: C }}>
              <h3 className="font-display text-3xl text-ink leading-tight">{v.t}</h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">{v.d}</p>
              <p className="mt-auto pt-5 text-xs text-muted-foreground">
                <span className="uppercase tracking-[0.2em] mr-2">Services</span>
                {v.services.map((s, i) => (
                  <span key={s}>
                    {i > 0 && <span aria-hidden> · </span>}
                    <a href="#stages" className="text-ink underline-offset-4 hover:underline">
                      {s}
                    </a>
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 pt-10 border-t border-border grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-6">
            <div className="text-[11px] uppercase tracking-[0.24em] font-medium" style={{ color: C }}>
              Who it's for
            </div>
            <p className="mt-3 text-ink/85 leading-relaxed">
              Faculty at our partner institutes get dedicated strategist time
              and subsidized reviews. Any UCSF investigator can start with a
              free 30-minute consultation — no deadline required.
            </p>
          </div>
          <div className="lg:col-span-6">
            <div className="text-[11px] uppercase tracking-[0.24em] font-medium" style={{ color: C }}>
              Why we exist
            </div>
            <p className="mt-3 text-ink/85 leading-relaxed">
              OCR launched this team in 2024 because a good idea no longer
              carries a rough draft: more investigators are competing for fewer
              dollars, and UCSF's appetite for large, collaborative science
              deserves support to match.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const BLUEPRINT_GRID =
  "linear-gradient(color-mix(in oklab, var(--ink) 7%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--ink) 7%, transparent) 1px, transparent 1px)";

function PulseDot({ color }: { color: string }) {
  return (
    <span aria-hidden className="relative flex h-1.5 w-1.5">
      <span
        className="absolute inline-flex h-full w-full rounded-full opacity-75 motion-safe:animate-ping"
        style={{ background: color }}
      />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: color }} />
    </span>
  );
}

/* ───────── SERVICES — how we work with you ─────────
 * Lead with the Large Grant Development Program. The other services stand on
 * their own and are often combined; they are not sequential stages. */
function Stages() {
  const stages = [
    {
      n: "02",
      name: "Research Plan Reviews",
      when: "~6 weeks before deadline",
      d: "Six weeks of iterative editorial feedback on R01-scale applications — Specific Aims, Research Plan, biosketch, figures. Roughly 30 hours of work per proposal, subsidized for participating partners.",
      c: "var(--magenta)",
      tags: ["R01-scale", "Subsidized for partners", "~30 hrs"],
    },
    {
      n: "03",
      name: "Scientific Peer Reviews",
      when: "~1 month before deadline",
      d: "Pairs investigators with senior UCSF faculty for a scientific pressure-test of the premise, Aims, and approach. Designed especially for early-career R01 applicants.",
      c: "var(--teal)",
      tags: ["Faculty reviewer", "Early-career", "By inquiry"],
    },
    {
      n: "04",
      name: "Specific Aims Reviews",
      when: "Early drafting",
      d: "Fast, focused feedback on your Specific Aims page — is the premise clear, is the gap real, will a reviewer follow the logic? A quick way to course-correct before the full proposal takes shape.",
      c: "var(--gold)",
      tags: ["Specific Aims", "Quick turnaround"],
    },
    {
      n: "05",
      name: "Strategic Consultations",
      when: "Anytime · No deadline required",
      d: "A conversation about where you're headed — mapping your portfolio, scanning the funding landscape, and matching your next idea to the right mechanism. Many investigators start here with nothing more than a hunch.",
      c: "var(--coral)",
      tags: ["Free", "30–60 min", "Portfolio mapping"],
    },
  ];
  const flagship = {
    n: "01",
    tag: "Large grants",
    name: "Large Grant Development Program",
    rule: "P-series · U-series · Center grants",
    d: "Coordinated scientific programs that build institutional capability — infrastructure, visibility, and durable ecosystems. Our strategists embed as part of the team from concept through submission, and OCR project managers, clinical research coordinators, and data managers can be written into the award.",
    c: "var(--coral)",
  };
  return (
    <section id="stages" className="py-28 bg-cream scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 mb-14 items-end">
          <div className="lg:col-span-7">
            <ArmEyebrow arm={ARM} label="How we work with you" accent={C} />
            <h2 className="mt-6 font-display text-5xl md:text-6xl text-ink leading-[0.98]">
              Our services.<br />
              <em className="not-italic text-muted-foreground/70">Standalone or combined.</em>
            </h2>
          </div>
          <p className="lg:col-span-4 lg:col-start-9 text-muted-foreground leading-relaxed">
            Each service stands on its own, and many investigators combine
            them — a consultation that leads to a Specific Aims Review, or
            peer review alongside a Research Plan Review. We'll help you find
            the right mix.
          </p>
        </div>

        {/* 01 — flagship, full-width with visual weight */}
        <article className="rounded-[2rem] overflow-hidden border border-border bg-card grid lg:grid-cols-12 mb-5">
          <div className="lg:col-span-5 p-10 md:p-12 flex flex-col justify-between bg-ink text-white relative">
            <div
              aria-hidden
              className="absolute -top-20 -left-20 w-72 h-72 rounded-full blur-3xl opacity-40"
              style={{ background: flagship.c }}
            />
            <div className="relative">
              <div className="flex items-baseline gap-4">
                <span
                  className="font-display text-3xl tabular-nums"
                  style={{ color: flagship.c }}
                >
                  {flagship.n}
                </span>
                <span
                  className="text-[11px] uppercase tracking-[0.24em] font-medium"
                  style={{ color: flagship.c }}
                >
                  {flagship.tag}
                </span>
              </div>
              <h3 className="mt-5 font-display text-4xl md:text-5xl text-white leading-[1.02]">
                {flagship.name}
              </h3>
              <div className="mt-3 text-xs text-white/50 font-mono">
                {flagship.rule}
              </div>
            </div>
            <div className="relative mt-10 text-white/40 text-[11px] uppercase tracking-[0.22em]">
              OCR priority program
            </div>
          </div>
          <div className="lg:col-span-7 p-10 md:p-14 flex items-center">
            <p className="text-lg text-ink/85 leading-relaxed">{flagship.d}</p>
          </div>
        </article>

        <ol className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {stages.map((s) => (
            <li
              key={s.n}
              className="group rounded-3xl border border-border bg-card overflow-hidden grid grid-rows-subgrid row-span-3 gap-0 hover:shadow-lift transition"
            >
              <div className="relative bg-ink text-white p-7 overflow-hidden grid grid-rows-subgrid row-span-2 gap-y-4">
                <div
                  aria-hidden
                  className="absolute -top-16 -left-16 w-56 h-56 rounded-full blur-3xl opacity-40 group-hover:opacity-55 transition-opacity duration-500"
                  style={{ background: s.c }}
                />
                <div className="relative flex items-baseline justify-between gap-3">
                  <span
                    className="font-display text-3xl tabular-nums"
                    style={{ color: s.c }}
                  >
                    {s.n}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 text-right">
                    {s.when}
                  </span>
                </div>
                <h3 className="relative font-display text-2xl text-white leading-tight">
                  {s.name}
                </h3>
              </div>
              <div className="p-7 flex flex-col">
                <p className="text-muted-foreground leading-relaxed text-[15px]">
                  {s.d}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-secondary text-ink/80 font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ───────── IN DEVELOPMENT — offerings being built, kept apart from live services ───────── */
function InDevelopment() {
  const inDevelopment = [
    {
      name: "Grantwriting Academy",
      d: "A workshop series translating our day-to-day work into training — from first-R21 cohorts to the mechanics of biosketches, budgets, and data management plans.",
      c: "var(--teal)",
      tags: ["First R21", "K-grant", "Pre-award"],
    },
    {
      name: "AI tools for research development",
      d: "Internal tools that augment — not replace — experienced strategists: pre-flight diagnostics for draft proposals, and funding intelligence that matches investigators to opportunities.",
      c: "var(--gold)",
      tags: ["Pre-Flight", "Prospera"],
    },
  ];
  return (
    <section className="relative overflow-hidden py-24 border-y border-dashed border-ink/15">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: BLUEPRINT_GRID,
          backgroundSize: "18px 18px",
          maskImage: "radial-gradient(ellipse 65% 110% at 72% 50%, #000 35%, transparent 100%)",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          <div className="md:col-span-2 xl:row-span-3 flex flex-col justify-center py-4 xl:pr-10">
            <div className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.24em] font-medium text-muted-foreground">
              <PulseDot color={C} />
              In development
            </div>
            <h2 className="mt-6 font-display text-5xl text-ink leading-[0.98]">
              What we're<br />building next.
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed max-w-md">
              Two new offerings our team is building now, designed to work
              alongside the services above.
            </p>
          </div>
          {inDevelopment.map((p) => (
            <article
              key={p.name}
              className="rounded-3xl border border-dashed border-ink/25 overflow-hidden grid grid-rows-subgrid row-span-3 gap-0"
            >
              <div className="relative p-7 overflow-hidden grid grid-rows-subgrid row-span-2 gap-y-4 border-b border-dashed border-ink/15 bg-ink/[0.05]">
                <div className="relative flex items-center">
                  <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-ink/25 bg-card/70 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-ink/60">
                    <PulseDot color={p.c} />
                    In development
                  </span>
                </div>
                <h3 className="relative font-display text-2xl text-ink leading-tight">
                  {p.name}
                </h3>
              </div>
              <div className="p-7 flex flex-col bg-card">
                <p className="text-muted-foreground leading-relaxed text-[15px]">
                  {p.d}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] px-2.5 py-1 rounded-full border border-dashed border-ink/20 text-muted-foreground font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── PARTNERS — institutional embedding ───────── */
function Partners() {
  const partners = [
    {
      n: "Bakar ImmunoX Initiative",
      short: "ImmunoX",
      since: "Founding partner",
      focus: "Immunology across UCSF",
      c: "var(--coral)",
      url: "https://immunox.ucsf.edu/",
    },
    {
      n: "Diabetes Center",
      short: "DC",
      since: "Partner since 2024",
      focus: "Diabetes & metabolism",
      c: "var(--magenta)",
      url: "https://diabetes.ucsf.edu/",
    },
    {
      n: "Institute for Global Health Sciences",
      short: "IGHS",
      since: "Partner since 2025",
      focus: "Global health equity",
      c: "var(--teal)",
      url: "https://globalhealthsciences.ucsf.edu/",
    },
    {
      n: "Institute for Health and Aging",
      short: "IHA",
      since: "Partner from 2026",
      focus: "Aging & longevity",
      c: "var(--gold)",
      url: "https://iha.ucsf.edu/",
    },
    {
      n: "Mechanisms of Neurological Disorders",
      short: "Neuroscience",
      since: "Partner since 2026",
      focus: "Biology of neurological disease",
      c: "oklch(0.6 0.13 160)",
      url: "https://neurology.ucsf.edu/mechanisms-neurological-disorders",
    },
  ];
  const benefits = [
    "Dedicated strategist capacity, embedded in your institute",
    "Subsidized Research Plan Reviews and priority access to Scientific Peer Reviews",
    "Proactive matchmaking and portfolio mapping for your faculty",
  ];
  return (
    <section className="py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <ArmEyebrow arm={ARM} label="Partners" accent={C} />
            <h2 className="mt-6 font-display text-5xl text-ink leading-[0.98]">
              Embedded within<br />the institutes<br />we serve.
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed max-w-md">
              Our model is partnership, not procurement. Partner institutes
              fund dedicated strategist time, and those strategists work from
              inside the institute — attending faculty meetings, learning the
              portfolio, and getting to know investigators before a deadline
              ever appears. Closer to the science, faster to the page.
            </p>
            <div className="mt-8 rounded-2xl border border-border bg-card p-6 max-w-md">
              <div className="text-[11px] uppercase tracking-[0.24em] font-medium text-muted-foreground">
                What partners get
              </div>
              <ul className="mt-4 space-y-3">
                {benefits.map((b) => (
                  <li key={b} className="flex gap-3 text-sm text-ink/85 leading-relaxed">
                    <span
                      aria-hidden
                      className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: C }}
                    />
                    {b}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
                Not affiliated with a partner? We still help unaffiliated UCSF
                faculty as bandwidth allows — and we're glad to talk with
                institutes considering partnership.{" "}
                <Link to="/contact" className="underline underline-offset-4 text-ink hover:text-coral transition">
                  Start a conversation →
                </Link>
              </p>
            </div>
          </div>
          <ul className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {partners.map((p, i) => (
              <li key={p.n}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 h-full min-h-[210px] flex flex-col justify-between hover:shadow-lift hover:-translate-y-0.5 transition-all duration-300"
                >
                  {/* Corner gradient blob — intensifies on hover */}
                  <span
                    aria-hidden
                    className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-25 group-hover:opacity-60 transition-opacity duration-500"
                    style={{ background: p.c }}
                  />
                  {/* Animated top accent line */}
                  <span
                    aria-hidden
                    className="absolute top-0 left-7 h-[2px] w-10 group-hover:w-[calc(100%-3.5rem)] transition-all duration-500 ease-out"
                    style={{ background: p.c }}
                  />

                  <div className="relative flex items-start justify-between gap-4">
                    <div>
                      <div
                        className="text-[11px] uppercase tracking-[0.24em] font-medium"
                        style={{ color: p.c }}
                      >
                        {p.short}
                      </div>
                      <div className="mt-2 font-display text-xl text-ink leading-snug max-w-[14ch]">
                        {p.n}
                        <span
                          aria-hidden
                          className="ml-1.5 inline-block text-base text-ink/35 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
                        >
                          ↗
                        </span>
                      </div>
                    </div>
                    <span
                      aria-hidden
                      className="font-display text-3xl tabular-nums opacity-50 group-hover:opacity-90 transition-opacity duration-300"
                      style={{ color: p.c }}
                    >
                      0{i + 1}
                    </span>
                  </div>

                  <div className="relative mt-6 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: p.c }}
                      />
                      {p.since}
                    </div>
                    <span className="text-[11px] text-muted-foreground/70 italic">
                      {p.focus}
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ───────── TEAM ───────── */
function Team() {
  const team = [
    {
      name: "Gabe Murphy",
      credential: "PhD",
      role: "Senior Research Development Strategist",
      img: gabeImg,
      imgHover: gabeHoverImg,
      bio: "First hire on the arm. Leads large-grant strategy and the growing team.",
    },
    {
      name: "Reid Bolus",
      credential: "PhD",
      role: "Research Development Strategist",
      img: reidImg,
      imgHover: reidHoverImg,
      bio: "Embedded across the Diabetes Center and the RPR program.",
    },
    {
      name: "Lindsay Breithaupt",
      credential: "MPH",
      role: "Research Development Strategist",
      img: lindsayImg,
      imgHover: lindsayHoverImg,
      bio: "Helps investigators shape the scientific story and craft competitive proposals across funders.",
    },
    {
      name: "Open Position",
      role: "Research Development Strategist",
      img: null,
      bio: "Joining as IHA comes on board in 2026. We're hiring.",
    },
  ];
  return (
    <section className="py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-12">
          <div className="lg:col-span-6">
            <ArmEyebrow arm={ARM} label="The team" accent={C} />
            <h2 className="mt-6 font-display text-5xl text-ink leading-[0.98]">
              Scientists who<br />happen to write.
            </h2>
          </div>
          <p className="lg:col-span-5 lg:col-start-8 text-muted-foreground leading-relaxed">
            Our strategists come from the bench and the field, and they've
            spent years learning how reviewers read. The conversation starts
            at the science, not the page count.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((p) => (
            <div
              key={p.name}
              className="rounded-3xl bg-card border border-border overflow-hidden hover:shadow-lift transition group"
            >
              {p.img && p.imgHover ? (
                <GhibliPortrait
                  name={p.name}
                  photo={p.img}
                  photoHover={p.imgHover}
                  className="aspect-[4/5] rounded-none bg-secondary"
                />
              ) : (
                <div className="aspect-[4/5] bg-secondary relative overflow-hidden flex items-center justify-center">
                  <div aria-hidden className="absolute inset-0 bg-gradient-sunburst opacity-20" />
                  <SunburstLogo className="relative w-24 h-24 opacity-90" />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl text-ink">
                  {p.credential ? `${p.name}, ${p.credential}` : p.name}
                </h3>
                <div className="text-sm mt-1" style={{ color: C }}>
                  {p.role}
                </div>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                  {p.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── FUNDED EXAMPLES ─────────
 * Details come from each award's NIH RePORTER record. Accent color encodes
 * the funding institute. */
const NIH_INSTITUTES = {
  NIAID: { name: "Allergy & Infectious Diseases", c: "var(--teal)" },
  NIDDK: { name: "Diabetes, Digestive & Kidney Diseases", c: "var(--magenta)" },
  NIAMS: { name: "Arthritis, Musculoskeletal & Skin Diseases", c: "var(--coral)" },
  NHLBI: { name: "Heart, Lung & Blood", c: "var(--gold)" },
} as const;

type FundedGrant = {
  mechanism: string;
  kind: string;
  ic: keyof typeof NIH_INSTITUTES;
  title: string;
  shortTitle?: string;
  pis: string;
  summary: string;
  url: string;
};

const FUNDED_GRANTS: FundedGrant[] = [
  {
    mechanism: "R24",
    kind: "Resource grant",
    ic: "NIAID",
    title: "FAST-TB: Facilitating Accelerated Science and Translation for TB Regimen Development",
    shortTitle: "FAST-TB: Accelerating TB regimen development",
    pis: "Payam Nahid & Radojka Savic",
    summary: "A shared data platform to move new TB regimens from trials into practice faster.",
    url: "https://reporter.nih.gov/project-details/11412163",
  },
  {
    mechanism: "P30",
    kind: "New center grant",
    ic: "NIDDK",
    title: "UCSF Type 1 Diabetes Research Center",
    pis: "Mark Anderson & Gregory Ku",
    summary: "Cores, pilot grants, and enrichment for UCSF's type 1 diabetes community.",
    url: "https://reporter.nih.gov/project-details/11121266",
  },
  {
    mechanism: "P30",
    kind: "Center grant renewal",
    ic: "NIDDK",
    title: "UCSF Nutrition Obesity Research Center",
    pis: "Christian Vaisse",
    summary: "Renewed cores and pilot funding for nutrition, obesity, and metabolism research.",
    url: "https://reporter.nih.gov/project-details/11350322",
  },
  {
    mechanism: "R01",
    kind: "Research grant renewal",
    ic: "NHLBI",
    title: "Predicting and preventing drug metabolism by the human gut microbiome",
    pis: "Peter Turnbaugh",
    summary: "How gut bacteria metabolize cardiovascular drugs — now in its third funding period.",
    url: "https://reporter.nih.gov/project-details/11447313",
  },
  {
    mechanism: "R01",
    kind: "Research grant",
    ic: "NIAMS",
    title: "Uncovering the fundamental biology of neonatal Tregs in skin",
    pis: "Tiffany Scharschmidt & Michael Rosenblum",
    summary: "How immune cells in newborn skin set up lifelong tolerance.",
    url: "https://reporter.nih.gov/project-details/11319891",
  },
  {
    mechanism: "R01",
    kind: "Research grant",
    ic: "NIAID",
    title: "Biophysical constraints on antibody affinity maturation to SARS-CoV-2",
    pis: "Angela Phillips",
    summary: "What limits antibody responses to evolving SARS-CoV-2 variants.",
    url: "https://reporter.nih.gov/project-details/11293150",
  },
  {
    mechanism: "K24",
    kind: "Mid-career mentoring award",
    ic: "NIAID",
    title: "Mentoring in clinical trials and patient-oriented research in infectious diseases and global health",
    shortTitle: "Mentoring in infectious disease and global health clinical research",
    pis: "Michelle Hsiang",
    summary: "Protected time to mentor early-career investigators in malaria trials.",
    url: "https://reporter.nih.gov/project-details/11452101",
  },
  {
    mechanism: "R01",
    kind: "Research grant",
    ic: "NIAMS",
    title: "Endogenous retroviruses in autoimmunity: T cell repertoire, tolerance, and disease",
    shortTitle: "Endogenous retroviruses in autoimmunity",
    pis: "Judith Ashouri",
    summary: "How ancient viral DNA in our genome may drive rheumatoid arthritis.",
    url: "https://reporter.nih.gov/project-details/11130765",
  },
];

function AwardedGrants() {
  return (
    <section className="py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-12">
          <div className="lg:col-span-7">
            <ArmEyebrow arm={ARM} label="Funded examples" accent={C} />
            <h2 className="mt-6 font-display text-5xl text-ink leading-[0.98]">
              Examples of funded
              <br />
              applications.
            </h2>
          </div>
          <p className="lg:col-span-4 lg:col-start-9 text-muted-foreground leading-relaxed">
            A sample of recent awards the Research Development team helped
            shape — from mentoring awards and R01s to multi-core center grants.
            Open any card for the full NIH RePORTER record.
          </p>
        </div>

        <ul className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
          {FUNDED_GRANTS.map((g) => {
            const ic = NIH_INSTITUTES[g.ic];
            const tint = (pct: number) => `color-mix(in oklab, ${ic.c} ${pct}%, var(--ink))`;
            return (
              <li key={g.url} className="grid grid-rows-subgrid row-span-4 gap-0">
                <a
                  href={g.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative grid grid-rows-subgrid row-span-4 gap-0 rounded-2xl border border-border bg-card p-5 pt-4 overflow-hidden hover:shadow-lift transition-shadow"
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-1"
                    style={{ background: ic.c }}
                  />
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="flex items-baseline gap-2 min-w-0">
                      <span className="font-display text-2xl leading-none" style={{ color: tint(55) }}>
                        {g.mechanism}
                      </span>
                      <span className="text-xs text-muted-foreground truncate">{g.kind}</span>
                    </span>
                    <span
                      className="text-[11px] font-semibold tracking-wider"
                      style={{ color: tint(60) }}
                      title={`National Institute of ${ic.name}`}
                    >
                      {g.ic}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-lg text-ink leading-snug line-clamp-3" title={g.title}>
                    {g.shortTitle ?? g.title}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-ink/75">{g.pis}</p>
                  <div className="mt-3 flex items-end justify-between gap-3">
                    <p className="text-sm text-muted-foreground leading-relaxed">{g.summary}</p>
                    <span
                      aria-hidden
                      className="shrink-0 text-ink/35 transition group-hover:text-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    >
                      ↗
                    </span>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ───────── EVIDENCE ───────── */
function Evidence() {
  const quotes = [
    {
      q: "I just heard back from my R01 — it received a fundable score.",
      a: "UCSF Principal Investigator",
      c: "var(--coral)",
    },
    {
      q: "The process not only improved my grant, it taught me to be a better writer.",
      a: "RPR participant, 2025",
      c: "var(--magenta)",
    },
    {
      q: "This service is invaluable. I hope it continues and expands so more of the community can benefit.",
      a: "Large Grant Development Program PI",
      c: "var(--teal)",
    },
  ];
  return (
    <section className="py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between flex-wrap gap-8 mb-12">
          <div>
            <ArmEyebrow arm={ARM} label="In their words" accent={C} />
            <h2 className="mt-6 font-display text-4xl md:text-5xl text-ink leading-[1.04] max-w-2xl">
              From the investigators<br />we work with.
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <div>
              <div className="font-display text-5xl text-ink">
                9.3<span className="text-xl text-muted-foreground">/10</span>
              </div>
              <div className="text-[11px] text-muted-foreground uppercase tracking-widest mt-1">
                Avg. satisfaction
              </div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div>
              <div className="font-display text-5xl text-ink">43</div>
              <div className="text-[11px] text-muted-foreground uppercase tracking-widest mt-1">
                Grants in 2025
              </div>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {quotes.map((t, i) => (
            <PullQuote key={i} quote={t.q} attribution={t.a} accent={t.c} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RDGPage() {
  return (
    <SiteShell>
      <Breadcrumb
        trail={[
          { label: "Services" },
          { label: "Research Development" },
        ]}
      />
      <Hero />
      <WhatWeDo />
      <Stages />
      <InDevelopment />
      <AwardedGrants />
      <CTA
        eyebrow="Get started"
        title={
          <>
            Got a grant on the horizon?
            <br />
            <span className="text-white/70">Let's talk early.</span>
          </>
        }
        subtitle="The earlier we engage, the more we can add. A 30-minute consult is free — and the next federal deadline is closer than you think."
        email="ocr@ucsf.edu"
      />
      <Partners />
      <Team />
      <Evidence />
      <ServiceCrossNav currentPath="/services/research-development" />
    </SiteShell>
  );
}
