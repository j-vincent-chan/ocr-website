import { createFileRoute } from "@tanstack/react-router";
import gabeImg from "@/assets/people/gabe-murphy.jpg";
import reidImg from "@/assets/people/reid-bolus.jpg";
import { SiteShell, Breadcrumb, CTA, SunburstLogo } from "@/components/site/chrome";
import {
  ArmEyebrow,
  PullQuote,
  ServiceCrossNav,
} from "@/components/site/service-family";

export const Route = createFileRoute("/services/research-development")({
  head: () => ({
    meta: [
      { title: "Research development & grantwriting — UCSF OCR" },
      {
        name: "description",
        content:
          "Proactive matchmaking, large-grant strategy, and hands-on grantwriting support for UCSF investigators — built around relationships, not RFP triage.",
      },
      { property: "og:title", content: "Research development & grantwriting — UCSF OCR" },
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
        <ArmEyebrow arm={ARM} label="Research development & grantwriting" accent={C} />
        <h1 className="mt-8 font-display text-[clamp(2.8rem,7.5vw,7rem)] leading-[0.92] tracking-tight text-ink max-w-5xl">
          From a hunch
          <br />
          to a{" "}
          <em className="not-italic" style={{ color: C }}>
            funded program.
          </em>
        </h1>
        <div className="mt-12 grid lg:grid-cols-12 gap-10">
          <p className="lg:col-span-6 text-xl text-muted-foreground leading-relaxed">
            We sit in the space between an idea and an award — sharpening the
            science, finding the right opportunity, and shaping submissions
            that compete in a tougher federal landscape.
          </p>
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

/* ───────── ORIGIN — why this arm exists, told as a 3-beat editorial ───────── */
function Origin() {
  const beats = [
    {
      label: "The shift",
      t: "The funding floor moved.",
      d: "Federal pressure on indirects, agency downsizing, and stalled awards meant more investigators competing for fewer dollars — exactly when UCSF needed to defend its place as the #1 public recipient of NIH funding.",
    },
    {
      label: "The gap",
      t: "Central grantwriting went away.",
      d: "UCSF's Research Development Office stepped back from grantwriting and was eventually wound down. A proposed Faculty Writing Center didn't get funded. Faculty were left without the support they'd come to expect.",
    },
    {
      label: "The response",
      t: "OCR built a new arm.",
      d: "Launched in September 2024, our Research Development team works hand-in-hand with partner institutes to help PIs compete — proactively, relationally, and at every stage of the proposal.",
    },
  ];
  return (
    <section className="py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <ArmEyebrow arm={ARM} label="Origin" accent={C} />
          <h2 className="mt-6 font-display text-5xl text-ink leading-[0.98]">
            Built for the<br />moment we're in.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-px bg-border rounded-3xl overflow-hidden border border-border">
          {beats.map((b, i) => (
            <article key={b.label} className="bg-cream p-8 md:p-10 flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="font-display text-xl"
                  style={{ color: C }}
                >
                  0{i + 1}
                </span>
                <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  {b.label}
                </span>
              </div>
              <h3 className="font-display text-2xl text-ink leading-snug">{b.t}</h3>
              <p className="mt-4 text-muted-foreground leading-relaxed text-[15px]">
                {b.d}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── ETHOS — what makes us different, stated cleanly ───────── */
function Ethos() {
  const points = [
    {
      k: "Proactive",
      t: "We don't wait for the RFP to land.",
      d: "We sit with investigators early — mapping their portfolio and trajectory — so opportunities find people, not the other way around.",
    },
    {
      k: "Relational",
      t: "Matchmaking is the work.",
      d: "Connecting investigators to mechanisms, collaborators, and one another is where the most leverage lives.",
    },
    {
      k: "End-to-end",
      t: "Aims to submission, in one team.",
      d: "Strategy, narrative, biosketches, budgets, letters, DMS plan, logistics — coordinated through one point of contact.",
    },
  ];
  return (
    <section className="py-28 bg-ink text-white relative overflow-hidden">
      <div
        aria-hidden
        className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-sunburst opacity-20 blur-3xl"
      />
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-16">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] font-medium text-white/60">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: C }} />
              Arm {ARM} · Ethos
            </div>
            <h2 className="mt-6 font-display text-5xl md:text-6xl text-white leading-[0.98]">
              We work in the space<br />
              <em className="not-italic" style={{ color: C }}>between ideation and submission.</em>
            </h2>
          </div>
          <p className="lg:col-span-4 lg:col-start-9 text-white/70 leading-relaxed">
            Our writers are PhDs. They know the science — and they know the
            page. That changes what's possible at every stage.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {points.map((p) => (
            <div key={p.k} className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
              <div
                className="text-[11px] uppercase tracking-[0.24em] font-medium"
                style={{ color: C }}
              >
                {p.k}
              </div>
              <h3 className="mt-5 font-display text-2xl text-white leading-snug">
                {p.t}
              </h3>
              <p className="mt-4 text-sm text-white/70 leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── PROGRAMS — 4 program cards, hierarchically weighted ───────── */
function Programs() {
  const featured = {
    tag: "Large Grants",
    name: "Large Grant Development Program",
    rule: "P-series · U-series · Center grants",
    d: "Coordinated scientific programs that build institutional capability — infrastructure, visibility, and durable ecosystems. Our strategists embed as part of the team, and OCR project managers, CRCs, and data managers can be written into the award.",
    c: "var(--coral)",
  };
  const others = [
    {
      name: "Research Plan Reviews",
      tag: "Small Grants",
      d: "Six weeks of focused, iterative feedback on R01-scale applications — Specific Aims, Research Plan, biosketch, figures. Roughly 30 hours of editorial work per proposal, subsidized for participating partners.",
      c: "var(--magenta)",
      tags: ["R01", "Subsidized", "~6 weeks"],
    },
    {
      name: "BOOST: Scientific Peer Reviews",
      tag: "Scientific Peer Reviews",
      d: "Pairs investigators with senior UCSF faculty for a scientific pressure-test of the premise, Aims, and approach — about a month before deadline. Designed especially for early-career R01 applicants.",
      c: "var(--teal)",
      tags: ["Faculty reviewer", "~1 mo. out", "By inquiry"],
    },
    {
      name: "Grantwriting Academy",
      tag: "In Development",
      d: "A workshop series translating our day-to-day work into training — from R21 cohorts to mechanics like biosketches, budgets, and DMS plans. Built with partners across the campus.",
      c: "var(--gold)",
      tags: ["Pre-award", "First R21", "K-grant"],
    },
    {
      name: "Grantwriting AI tools",
      tag: "In development",
      d: "Internal tools to augment — not replace — experienced writers. Pre-flight diagnostics for draft proposals, and Prospera for funding intelligence and PI-to-NOFO matching.",
      c: "var(--lime)",
      tags: ["Pre-Flight", "Prospera"],
    },
  ];
  return (
    <section className="py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 mb-14 items-end">
          <div className="lg:col-span-7">
            <ArmEyebrow arm={ARM} label="Programs" accent={C} />
            <h2 className="mt-6 font-display text-5xl md:text-6xl text-ink leading-[0.98]">
              Five programs.<br />
              <em className="not-italic text-muted-foreground/70">One coordinated practice.</em>
            </h2>
          </div>
          <p className="lg:col-span-4 lg:col-start-9 text-muted-foreground leading-relaxed">
            Drop in wherever you are — exploration, drafting, or final review.
            The earlier we engage, the more value we can add.
          </p>
        </div>

        {/* Flagship — full-width card with visual weight */}
        <article className="rounded-[2rem] overflow-hidden border border-border bg-card grid lg:grid-cols-12 mb-5">
          <div className="lg:col-span-5 p-10 md:p-12 flex flex-col justify-between bg-ink text-white relative">
            <div
              aria-hidden
              className="absolute -top-20 -left-20 w-72 h-72 rounded-full blur-3xl opacity-40"
              style={{ background: featured.c }}
            />
            <div className="relative">
              <div
                className="text-[11px] uppercase tracking-[0.24em] font-medium"
                style={{ color: featured.c }}
              >
                {featured.tag}
              </div>
              <h3 className="mt-5 font-display text-4xl md:text-5xl text-white leading-[1.02]">
                {featured.name}
              </h3>
              <div className="mt-3 text-xs text-white/50 font-mono">
                {featured.rule}
              </div>
            </div>
            <div className="relative mt-10 text-white/40 text-[11px] uppercase tracking-[0.22em]">
              OCR priority program
            </div>
          </div>
          <div className="lg:col-span-7 p-10 md:p-14 flex items-center">
            <p className="text-lg text-ink/85 leading-relaxed">{featured.d}</p>
          </div>
        </article>

        {/* The other four — same DNA as flagship, scaled down */}
        <div className="grid md:grid-cols-2 gap-5">
          {others.map((p) => (
            <article
              key={p.name}
              className="group rounded-3xl border border-border bg-card overflow-hidden grid grid-rows-[auto_1fr] hover:shadow-lift transition"
            >
              {/* Dark accent zone — mirrors the flagship's left panel */}
              <div className="relative bg-ink text-white p-7 overflow-hidden">
                <div
                  aria-hidden
                  className="absolute -top-16 -left-16 w-56 h-56 rounded-full blur-3xl opacity-40 group-hover:opacity-55 transition-opacity duration-500"
                  style={{ background: p.c }}
                />
                <div className="relative">
                  <div
                    className="text-[11px] uppercase tracking-[0.24em] font-medium"
                    style={{ color: p.c }}
                  >
                    {p.tag}
                  </div>
                  <h3 className="mt-4 font-display text-2xl md:text-3xl text-white leading-tight">
                    {p.name}
                  </h3>
                </div>
              </div>
              {/* Light body */}
              <div className="p-7 flex flex-col">
                <p className="text-muted-foreground leading-relaxed text-[15px]">
                  {p.d}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-secondary text-ink/80 font-mono"
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
    },
    {
      n: "Diabetes Center",
      short: "DC",
      since: "Embedded since 2024",
      focus: "Diabetes & metabolism",
      c: "var(--magenta)",
    },
    {
      n: "Institute for Global Health Sciences",
      short: "IGHS",
      since: "Joined Jan 2025",
      focus: "Global health equity",
      c: "var(--teal)",
    },
    {
      n: "Institute for Health and Aging",
      short: "IHA",
      since: "Joining Jul 2026",
      focus: "Aging & longevity",
      c: "var(--gold)",
    },
  ];
  return (
    <section className="py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <ArmEyebrow arm={ARM} label="Partners" accent={C} />
            <h2 className="mt-6 font-display text-5xl text-ink leading-[0.98]">
              Embedded with<br />the institutes<br />we serve.
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed max-w-md">
              Our model is partnership, not procurement. Strategists are
              embedded inside the institutes they support — closer to the
              science, faster to the page. We also help unaffiliated UCSF
              faculty as bandwidth allows.
            </p>
          </div>
          <ul className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {partners.map((p, i) => (
              <li
                key={p.n}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 min-h-[210px] flex flex-col justify-between hover:shadow-lift hover:-translate-y-0.5 transition-all duration-300"
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
      name: "Gabe Murphy, PhD",
      role: "Senior Research Development Strategist",
      img: gabeImg,
      bio: "First hire on the arm. Leads large-grant strategy and the growing team.",
    },
    {
      name: "Reid Bolus, PhD",
      role: "Research Development Strategist",
      img: reidImg,
      bio: "Embedded across the Diabetes Center and the RPR program.",
    },
    {
      name: "Open Position",
      role: "Research Development Strategist",
      img: null,
      bio: "Joining alongside IHA in mid-2026. We're hiring.",
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
            Every strategist holds a research doctorate. The conversation
            starts at the science, not the page count.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {team.map((p) => (
            <div
              key={p.name}
              className="rounded-3xl bg-card border border-border overflow-hidden hover:shadow-lift transition group"
            >
              <div className="aspect-[4/5] bg-secondary relative overflow-hidden">
                {p.img ? (
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-sunburst opacity-20 flex items-center justify-center">
                    <SunburstLogo className="w-24 h-24 opacity-60" />
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl text-ink">{p.name}</h3>
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
          { label: "Research development & grantwriting" },
        ]}
      />
      <Hero />
      <Origin />
      <Ethos />
      <Programs />
      <Partners />
      <Team />
      <Evidence />
      <ServiceCrossNav currentPath="/services/research-development" />
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
        email="rdg@ocr.ucsf.edu"
      />
    </SiteShell>
  );
}
