import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero-collab.jpg";
import ribbonImg from "@/assets/ribbon.png";
import gabeImg from "@/assets/gabe.jpg";
import reidImg from "@/assets/reid.jpg";
import { SiteShell, Breadcrumb, CTA, SunburstLogo } from "@/components/site/chrome";

export const Route = createFileRoute("/services/research-development")({
  head: () => ({
    meta: [
      { title: "Research Development & Grantwriting — UCSF OCR" },
      {
        name: "description",
        content:
          "Strategic consultation, matchmaking, and expert grantwriting support for UCSF principal investigators — from R-series to P/U large grants.",
      },
      { property: "og:title", content: "Research Development & Grantwriting — UCSF OCR" },
      {
        property: "og:description",
        content: "Helping UCSF PIs compete and win in today's federal funding environment.",
      },
    ],
  }),
  component: RDGPage,
});

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <img
        src={ribbonImg}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-40 w-[720px] opacity-90 select-none"
      />
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-24 grid lg:grid-cols-12 gap-12 items-center relative">
        <div className="lg:col-span-7">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-ink">
            <span className="w-1.5 h-1.5 rounded-full bg-coral" />
            Service arm · Office of Collaborative Research
          </span>
          <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.02] text-ink">
            Research Development<br />
            <span className="text-gradient-sunburst">& Grantwriting.</span>
          </h1>
          <p className="mt-7 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            We help UCSF principal investigators sharpen their narrative, find the right funding,
            and submit applications that compete — and win — in today's federal funding environment.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-ink text-white px-6 py-3.5 text-sm font-medium hover:bg-ink/90 transition shadow-soft"
            >
              Start a consultation <span aria-hidden>→</span>
            </a>
            <a
              href="#programs"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-medium hover:bg-secondary transition"
            >
              Explore our programs
            </a>
          </div>

          <dl className="mt-14 grid grid-cols-3 gap-6 max-w-xl">
            {[
              ["43", "Grants supported in 2025"],
              ["9.3", "Avg. PI satisfaction / 10"],
              ["4", "Partner institutes"],
            ].map(([n, l]) => (
              <div key={l} className="border-l-2 border-coral pl-4">
                <dt className="font-display text-4xl text-ink">{n}</dt>
                <dd className="text-xs text-muted-foreground mt-1 leading-snug">{l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="relative rounded-3xl overflow-hidden shadow-lift">
            <img
              src={heroImg}
              alt="OCR research development strategists working with a UCSF principal investigator"
              className="w-full h-[520px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-ink/30 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur rounded-2xl p-4 flex items-center gap-3">
              <div className="flex -space-x-2">
                <img src={gabeImg} alt="" className="w-9 h-9 rounded-full border-2 border-white object-cover" />
                <img src={reidImg} alt="" className="w-9 h-9 rounded-full border-2 border-white object-cover" />
                <div className="w-9 h-9 rounded-full border-2 border-white bg-gradient-sunburst text-white text-xs font-medium flex items-center justify-center">+1</div>
              </div>
              <div className="text-sm">
                <div className="font-medium text-ink">Meet your strategists</div>
                <div className="text-muted-foreground text-xs">Gabe Murphy, PhD · Reid Bolus, PhD</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatWeDo() {
  const items = [
    { tag: "01", title: "Strategic Consultation", body: "We meet PIs where they are — mapping research portfolios, sharpening narratives, and pressure-testing the angle on a specific NOFO before a single page is drafted.", color: "var(--coral)" },
    { tag: "02", title: "Funding Matchmaking", body: "Our matchmakers pair investigators with the right opportunity — federal, foundation, and internal — and the right collaborators across UCSF.", color: "var(--teal)" },
    { tag: "03", title: "Large Grants Program", body: "End-to-end support for P-series, U-series, and other complex multi-PI mechanisms. Strategy, drafting, project management, and submission logistics.", color: "var(--magenta)" },
    { tag: "04", title: "Research Plan Review (RPR)", body: "Tailored support for R-series and equivalent grants — refining aims, structure, and clarity so investigators submit their strongest application.", color: "var(--gold)" },
    { tag: "05", title: "BOOST Scientific Peer Review", body: "An optional add-on to RPR: a UCSF faculty peer reviews your science at the Specific Aims and Full Proposal stages, closing the gap our writers can't.", color: "var(--lime)" },
    { tag: "06", title: "AI-Powered Discovery", body: "Signal and Prospera — our in-development tools — surface relevant NOFOs across federal and foundation sources and matchmake them to investigator profiles.", color: "#8b5cf6" },
  ];
  return (
    <section id="programs" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-5">
            <span className="text-xs uppercase tracking-[0.2em] text-coral font-medium">What we do</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-medium text-ink leading-[1.05]">
              Six ways we make your next grant more competitive.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 self-end">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our services span the full arc of grant development — from the first whiteboard
              session to submission day. Mix and match what you need; we'll meet you where you are.
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((i) => (
            <article key={i.title} className="group relative bg-card rounded-3xl p-7 border border-border hover:shadow-lift hover:-translate-y-0.5 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-display text-lg text-white" style={{ background: i.color }}>{i.tag}</div>
              <h3 className="mt-6 text-xl text-ink">{i.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{i.body}</p>
              <div className="mt-6 h-px" style={{ background: `linear-gradient(90deg, ${i.color}, transparent)` }} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    { n: "01", t: "Consult", d: "30-min intake. We learn your portfolio, target mechanism, and timeline." },
    { n: "02", t: "Strategize", d: "We co-develop the narrative arc, aims, and target NOFO fit." },
    { n: "03", t: "Match", d: "If needed, we connect you with collaborators, cores, and matchmakers." },
    { n: "04", t: "Write & Review", d: "Iterative drafting with our team — plus optional BOOST peer review." },
    { n: "05", t: "Submit", d: "Admin support for biosketches, budgets, LOS, DMS plans, and submission." },
  ];
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-[0.2em] text-teal font-medium">How it works</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-medium text-ink leading-[1.05]">A model built around your science — not our calendar.</h2>
        </div>
        <div className="mt-14 relative">
          <div className="hidden md:block absolute top-7 left-0 right-0 h-px bg-gradient-to-r from-coral via-magenta to-teal opacity-30" />
          <ol className="grid md:grid-cols-5 gap-6 relative">
            {steps.map((s) => (
              <li key={s.n} className="relative">
                <div className="w-14 h-14 rounded-full bg-card border border-border flex items-center justify-center font-display text-lg text-ink shadow-soft">{s.n}</div>
                <div className="mt-5">
                  <h3 className="text-lg text-ink">{s.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Boost() {
  return (
    <section className="py-24 bg-ink text-white relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-sunburst opacity-20 blur-3xl" />
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 relative">
        <div className="lg:col-span-5">
          <span className="text-xs uppercase tracking-[0.2em] text-coral font-medium">Featured program</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-medium text-white leading-[1.05]">BOOST: faculty-to-faculty scientific peer review.</h2>
          <p className="mt-6 text-white/70 leading-relaxed text-lg">
            Our writers are experts in narrative and structure — but they can't be experts in every PI's
            science. BOOST closes that gap by pairing your proposal with a UCSF faculty reviewer at two key stages.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-white/80">
            {[
              "Two-stage review: Specific Aims (6 wks out) + Full Proposal (2 wks out)",
              "Reviewers matched from applicant nominations and our internal roster",
              "Optional add-on to any Large Grant or RPR engagement",
              "Reviewer honorarium of $500 total, funded through the program",
            ].map((b) => (
              <li key={b} className="flex gap-3"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-coral flex-none" />{b}</li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-7 lg:pl-8">
          <div className="rounded-3xl bg-white/5 border border-white/10 p-8 backdrop-blur">
            <div className="text-xs uppercase tracking-widest text-white/50 mb-6">BOOST timeline</div>
            <div className="space-y-5">
              {[
                { w: "≥ 6 weeks out", t: "Specific Aims review", c: "var(--coral)" },
                { w: "4 weeks out", t: "Structural review", c: "var(--magenta)" },
                { w: "2 weeks out", t: "Full Proposal review", c: "var(--teal)" },
                { w: "1 week out", t: "Language pass", c: "var(--gold)" },
              ].map((s) => (
                <div key={s.t} className="flex items-center gap-5">
                  <div className="text-xs text-white/50 w-28 flex-none">{s.w}</div>
                  <div className="flex-1 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center px-4 gap-3">
                    <span className="w-2 h-2 rounded-full" style={{ background: s.c }} />
                    <span className="text-sm">{s.t}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Team() {
  const team = [
    { name: "Gabe Murphy, PhD", role: "Research Development Strategist & Grantwriter", img: gabeImg, bio: "Leads large-grant strategy across ImmunoX and partner institutes." },
    { name: "Reid Bolus, PhD", role: "Research Development Strategist & Grantwriter", img: reidImg, bio: "Embedded across the Diabetes Center; leads the RPR program." },
    { name: "Open Position", role: "Research Development Strategist & Grantwriter", img: null, bio: "We're hiring. Help us grow the team." },
  ];
  return (
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-6">
            <span className="text-xs uppercase tracking-[0.2em] text-coral font-medium">Your team</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-medium text-ink leading-[1.05]">PhD scientists who happen to be excellent writers.</h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 self-end">
            <p className="text-muted-foreground leading-relaxed">
              Each of our strategists brings deep research training and years of grantwriting experience —
              so the conversation starts at the science, not the page count.
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {team.map((p) => (
            <div key={p.name} className="rounded-3xl bg-card border border-border overflow-hidden hover:shadow-lift transition">
              <div className="aspect-[4/5] bg-secondary relative overflow-hidden">
                {p.img ? (
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-sunburst opacity-20 flex items-center justify-center">
                    <SunburstLogo className="w-24 h-24 opacity-60" />
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl text-ink">{p.name}</h3>
                <div className="text-sm text-coral mt-1">{p.role}</div>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{p.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const quotes = [
    { q: "I just heard back from my R01 — it received a fundable score!", a: "UCSF Principal Investigator" },
    { q: "The process not only improved my grant, it taught me to be a better writer.", a: "RPR participant, 2025" },
    { q: "This service is invaluable. I hope it continues and expands so more of the community can benefit.", a: "Large Grants Program PI" },
  ];
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between flex-wrap gap-8 mb-12">
          <h2 className="text-4xl md:text-5xl font-medium text-ink leading-[1.05] max-w-2xl">In the words of the investigators we work with.</h2>
          <div className="flex items-center gap-6">
            <div>
              <div className="font-display text-5xl text-ink">9.3<span className="text-xl text-muted-foreground">/10</span></div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Avg. satisfaction</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div>
              <div className="font-display text-5xl text-ink">9.5<span className="text-xl text-muted-foreground">/10</span></div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Quality of support</div>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {quotes.map((t, i) => (
            <figure key={i} className="rounded-3xl p-8 bg-card border border-border relative">
              <div className="absolute top-0 left-8 right-8 h-0.5" style={{ background: ["var(--coral)", "var(--magenta)", "var(--teal)"][i] }} />
              <svg className="w-8 h-8 text-coral mb-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M9 7H5a2 2 0 00-2 2v4a2 2 0 002 2h2v2a2 2 0 01-2 2H4v2h1a4 4 0 004-4V7zm10 0h-4a2 2 0 00-2 2v4a2 2 0 002 2h2v2a2 2 0 01-2 2h-1v2h1a4 4 0 004-4V7z" />
              </svg>
              <blockquote className="font-display text-xl text-ink leading-snug">"{t.q}"</blockquote>
              <figcaption className="mt-6 text-xs text-muted-foreground uppercase tracking-widest">— {t.a}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function RDGPage() {
  return (
    <SiteShell>
      <Breadcrumb trail={[{ label: "Services" }, { label: "Research Development & Grantwriting" }]} />
      <Hero />
      <WhatWeDo />
      <Process />
      <Boost />
      <Team />
      <Testimonials />
      <CTA
        eyebrow="Get started"
        title={<>Got a grant on the horizon?<br /><span className="text-white/70">Let's talk early.</span></>}
        subtitle="The earlier we engage, the more value we can add. A 30-minute consult is free — and the next federal deadline is closer than you think."
        email="rdg@ocr.ucsf.edu"
      />
    </SiteShell>
  );
}
