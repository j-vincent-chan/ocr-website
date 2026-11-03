import { createFileRoute, Link } from "@tanstack/react-router";
import gabeImg from "@/assets/people/gabe-murphy.jpg";
import reidImg from "@/assets/people/reid-bolus.jpg";
import lindsayImg from "@/assets/people/lindsay-breithaupt.jpg";
import { SiteShell, Breadcrumb, CTA, SunburstLogo } from "@/components/site/chrome";
import { armName } from "@/components/site/arms";
import {
  ArmEyebrow,
  PullQuote,
  ServiceCrossNav,
} from "@/components/site/service-family";

export const Route = createFileRoute("/services/research-development")({
  head: () => ({
    meta: [
      { title: "Research development — UCSF OCR" },
      {
        name: "description",
        content:
          "We help UCSF faculty turn an idea into a compelling, competitive grant application — finding the right funding opportunity, sharpening the rationale and promise of the work, and supporting the proposal through submission.",
      },
      { property: "og:title", content: "Research development — UCSF OCR" },
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
        <h1 className="mt-8 font-display text-[clamp(2.8rem,7.5vw,7rem)] leading-[0.92] tracking-tight text-ink max-w-5xl">
          From a hunch
          <br />
          to a{" "}
          <em className="not-italic" style={{ color: C }}>
            funded program.
          </em>
        </h1>
        <div className="mt-12 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-6">
            <p className="text-xl text-muted-foreground leading-relaxed">
              We pair investigators with the right opportunity, sharpen the
              rationale and promise of the proposed work, and shape submissions
              that compete in a tough funding landscape.
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

/* ───────── ORIGIN — why this arm exists, told as a 3-beat editorial ───────── */
function Origin() {
  const beats = [
    {
      label: "The gap",
      t: "A strong idea isn't yet a strong proposal.",
      d: "Finding the right opportunity, pressure-testing the premise, and shaping a narrative reviewers can follow takes time and a second set of eyes most faculty don't have. Moreover, the funding landscape has shifted significantly over the last several years — more investigators competing for fewer dollars, with less room for a good idea to carry a rough draft.",
    },
    {
      label: "The rationale",
      t: "UCSF is built to collaborate.",
      d: "UCSF is a uniquely collaborative institution. Faculty are genuinely eager to pursue large-scale, multi-investigator grant applications — and with some logistical and conceptual support, they are likely to be very competitive.",
    },
    {
      label: "The response",
      t: "OCR added a new service arm.",
      d: "Launched in 2024, our Research Development team works hand-in-hand with partner institutes to help investigators compete — proactively, relationally, and at every stage of the proposal.",
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
      d: "We're ready and eager to help if you've already found an appropriate NOFO. That said, by talking with investigators early and often, we often route relevant funding opportunities to people, not the other way around.",
    },
    {
      k: "Relational",
      t: "Matchmaking is the work.",
      d: "Connecting investigators to the right mechanisms, and to collaborators within and outside of UCSF, is where the most leverage lives.",
    },
    {
      k: "End-to-end",
      t: "Aims to submission, in one team.",
      d: "Strategy, narrative, biosketches, letters, logistics — coordinated through one point of contact, from the first conversation to the day you submit.",
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
              {armName(ARM)} · Ethos
            </div>
            <h2 className="mt-6 font-display text-5xl md:text-6xl text-white leading-[0.98]">
              We work in the space<br />
              <em className="not-italic" style={{ color: C }}>between an idea and an award.</em>
            </h2>
          </div>
          <p className="lg:col-span-4 lg:col-start-9 text-white/70 leading-relaxed">
            Our strategists are trained scientists and practiced editors. We
            won't know your field the way you do — and that's the point. We see
            the assumptions, the leaps in logic, and the arguments that won't
            land with a reviewer, in a way that's hard to do from inside the
            work.
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

/* ───────── STAGES — how we work with you, from flagship program back to early support ─────────
 * Team feedback: lead with the Large Grant Development Program, then show the
 * upstream supports in reverse order so readers can see what often leads into it.
 * Programs still in development sit in a visually subordinate row so they don't
 * read as live offerings. */
function Stages() {
  const stages = [
    {
      n: "02",
      name: "BOOST: Scientific peer reviews",
      when: "~1 month before deadline",
      d: "Pairs investigators with senior UCSF faculty for a scientific pressure-test of the premise, Aims, and approach. Designed especially for early-career R01 applicants.",
      c: "var(--teal)",
      tags: ["Faculty reviewer", "Early-career", "By inquiry"],
    },
    {
      n: "03",
      name: "Research Plan Reviews",
      when: "~6 weeks before deadline",
      d: "Six weeks of iterative editorial feedback on R01-scale applications — Specific Aims, Research Plan, biosketch, figures. Roughly 30 hours of work per proposal, subsidized for participating partners.",
      c: "var(--magenta)",
      tags: ["R01-scale", "Subsidized for partners", "~30 hrs"],
    },
    {
      n: "04",
      name: "Rapid Aims & LOI reviews",
      when: "Early drafting",
      d: "Fast, focused feedback on a Specific Aims page or letter of intent — is the premise clear, is the gap real, will a reviewer follow the logic? A quick way to course-correct before the full proposal takes shape.",
      c: "var(--gold)",
      tags: ["Specific Aims", "LOI", "Quick turnaround"],
    },
    {
      n: "05",
      name: "Strategic consults",
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
  const inDevelopment = [
    {
      name: "Grantwriting Academy",
      d: "A workshop series translating our day-to-day work into training — from first-R21 cohorts to the mechanics of biosketches, budgets, and data management plans.",
      tags: ["First R21", "K-grant", "Pre-award"],
    },
    {
      name: "AI tools for research development",
      d: "Internal tools that augment — not replace — experienced strategists: pre-flight diagnostics for draft proposals, and funding intelligence that matches investigators to opportunities.",
      tags: ["Pre-Flight", "Prospera"],
    },
  ];
  return (
    <section id="stages" className="py-28 bg-cream scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 mb-14 items-end">
          <div className="lg:col-span-7">
            <ArmEyebrow arm={ARM} label="How we work with you" accent={C} />
            <h2 className="mt-6 font-display text-5xl md:text-6xl text-ink leading-[0.98]">
              Five stages.<br />
              <em className="not-italic text-muted-foreground/70">One coordinated practice.</em>
            </h2>
          </div>
          <p className="lg:col-span-4 lg:col-start-9 text-muted-foreground leading-relaxed">
            Start with the flagship program, then trace the upstream supports
            that often help investigators get there.
          </p>
        </div>

        {/* Stage 01 — flagship, full-width with visual weight */}
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

        {/* Stages 02–05 — upstream supports, in reverse path order */}
        <ol className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {stages.map((s) => (
            <li
              key={s.n}
              className="group rounded-3xl border border-border bg-card overflow-hidden grid grid-rows-[auto_1fr] hover:shadow-lift transition"
            >
              <div className="relative bg-ink text-white p-7 overflow-hidden">
                <div
                  aria-hidden
                  className="absolute -top-16 -left-16 w-56 h-56 rounded-full blur-3xl opacity-40 group-hover:opacity-55 transition-opacity duration-500"
                  style={{ background: s.c }}
                />
                <div className="relative">
                  <div className="flex items-baseline justify-between gap-3">
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
                  <h3 className="mt-4 font-display text-2xl text-white leading-tight">
                    {s.name}
                  </h3>
                </div>
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

        {/* In development — deliberately quieter than the live stages */}
        <div className="mt-14">
          <div className="flex items-center gap-4 mb-5">
            <span className="text-[11px] uppercase tracking-[0.24em] font-medium text-muted-foreground">
              In development
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {inDevelopment.map((p) => (
              <article
                key={p.name}
                className="rounded-2xl border border-dashed border-ink/20 bg-transparent p-6"
              >
                <h3 className="font-display text-xl text-ink/80 leading-tight">
                  {p.name}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {p.d}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] px-2.5 py-1 rounded-full border border-border text-muted-foreground font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
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
      since: "Partner since 2024",
      focus: "Diabetes & metabolism",
      c: "var(--magenta)",
    },
    {
      n: "Institute for Global Health Sciences",
      short: "IGHS",
      since: "Partner since 2025",
      focus: "Global health equity",
      c: "var(--teal)",
    },
    {
      n: "Institute for Health and Aging",
      short: "IHA",
      since: "Partner from 2026",
      focus: "Aging & longevity",
      c: "var(--gold)",
    },
  ];
  const benefits = [
    "Dedicated strategist capacity, embedded in your institute",
    "Subsidized Research Plan Reviews and priority access to BOOST",
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
      name: "Lindsay Breithaupt, MPH",
      role: "Research Development Strategist",
      img: lindsayImg,
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

/* ───────── AWARDED GRANTS ───────── */
function AwardedGrants() {
  const grants = [
    {
      investigator: "Nahid",
      mechanism: "R24",
      url: "https://reporter.nih.gov/project-details/11412163",
    },
    {
      investigator: "Anderson / Ku",
      mechanism: "DRC P30",
      url: "https://reporter.nih.gov/project-details/11121266",
    },
    {
      investigator: "Vaisse",
      mechanism: "NORC P30",
      url: "https://reporter.nih.gov/project-details/8975559",
    },
    {
      investigator: "Turnbaugh",
      mechanism: "R01",
      url: "https://reporter.nih.gov/project-details/11447313",
    },
    {
      investigator: "Scharschmidt",
      mechanism: "R01",
      url: "https://reporter.nih.gov/search/qn2l-PAaTEGxA_kyEvsn7Q/project-details/11319891",
    },
    {
      investigator: "Phillips",
      mechanism: "R01",
      url: "https://reporter.nih.gov/project-details/11293150",
    },
    {
      investigator: "Hsiang",
      mechanism: "K24",
      url: "https://reporter.nih.gov/project-details/11452101",
    },
    {
      investigator: "Ashouri",
      mechanism: "R01",
      url: "https://reporter.nih.gov/project-details/11130765",
    },
  ];

  return (
    <section className="py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-12">
          <div className="lg:col-span-7">
            <ArmEyebrow arm={ARM} label="Awarded grants" accent={C} />
            <h2 className="mt-6 font-display text-5xl text-ink leading-[0.98]">
              Funded applications
              <br />
              shaped with OCR.
            </h2>
          </div>
          <p className="lg:col-span-4 lg:col-start-9 text-muted-foreground leading-relaxed">
            Selected awarded applications supported by the Research Development
            team. Each award links to its NIH RePORTER record.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {grants.map((grant) => (
            <a
              key={`${grant.investigator}-${grant.mechanism}`}
              href={grant.url}
              target="_blank"
              rel="noreferrer"
              className="group rounded-3xl border border-border bg-card p-6 hover:shadow-lift transition"
            >
              <div className="flex items-center justify-between gap-4">
                <span
                  className="text-[11px] uppercase tracking-[0.22em] font-medium"
                  style={{ color: C }}
                >
                  NIH RePORTER
                </span>
                <span className="text-ink/35 transition group-hover:translate-x-0.5 group-hover:text-ink">
                  ↗
                </span>
              </div>
              <h3 className="mt-6 font-display text-2xl text-ink leading-tight">
                {grant.investigator}
              </h3>
              <div className="mt-2 text-sm font-medium text-ink/75">
                {grant.mechanism}
              </div>
            </a>
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
          { label: "Research development" },
        ]}
      />
      <Hero />
      <Ethos />
      <Origin />
      <Stages />
      <Partners />
      <Team />
      <AwardedGrants />
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
        email="ocr@ucsf.edu"
      />
    </SiteShell>
  );
}
