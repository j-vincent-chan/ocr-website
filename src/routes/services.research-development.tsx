import { createFileRoute } from "@tanstack/react-router";
import gabeImg from "@/assets/gabe.jpg";
import reidImg from "@/assets/reid.jpg";
import { SiteShell, Breadcrumb, CTA, SunburstLogo } from "@/components/site/chrome";
import { ServiceHero, ServiceHeroHighlight } from "@/components/site/service-hero";

export const Route = createFileRoute("/services/research-development")({
  head: () => ({
    meta: [
      { title: "Research development & grantwriting — UCSF OCR" },
      {
        name: "description",
        content:
          "Strategic consultation, matchmaking, and expert grantwriting support for UCSF principal investigators — from R-series to P/U large grants.",
      },
      { property: "og:title", content: "Research development & grantwriting — UCSF OCR" },
      {
        property: "og:description",
        content: "Helping UCSF PIs compete and win in today's federal funding environment.",
      },
    ],
  }),
  component: RDGPage,
});

const C = "var(--coral)";

function Hero() {
  return (
    <ServiceHero
      arm="01"
      armLabel="Research development & grantwriting"
      accent={C}
      title={
        <>
          From a hunch
          <br />
          to a <ServiceHeroHighlight accent={C}>funded program.</ServiceHeroHighlight>
        </>
      }
      description="We guide UCSF principal investigators through every stage of a grant — sharpening the idea, finding the right opportunity, and shaping a competitive submission."
    />
  );
}

/* THE JOURNEY: vertical stepped pathway */
function Journey() {
  const stages = [
    {
      n: "01",
      stage: "IDEA",
      t: "Strategic Consultation",
      d: "30-minute intake. We learn your portfolio, research vision, and timeline. Pressure-test the science before a single page is drafted.",
      arts: ["Portfolio map", "Whiteboard session", "Vision memo"],
      c: "var(--coral)",
    },
    {
      n: "02",
      stage: "OPPORTUNITY",
      t: "Funding Matchmaking",
      d: "Our matchmakers pair you with the right mechanism — federal, foundation, internal — and the right collaborators across UCSF.",
      arts: ["NOFO short-list", "Collaborator intros", "Strategy memo"],
      c: "var(--magenta)",
    },
    {
      n: "03",
      stage: "NARRATIVE",
      t: "Aims & Drafting",
      d: "Co-develop the narrative arc and Specific Aims. We sit with you through iteration — and we don't disappear after track-changes.",
      arts: ["Specific Aims", "Outline", "Full draft"],
      c: "var(--teal)",
    },
    {
      n: "04",
      stage: "REVIEW",
      t: "BOOST Peer Review",
      d: "A UCSF faculty peer reviews your science at the Aims and Full Proposal stages — closing the gap our writers can't.",
      arts: ["Aims review", "Structural review", "Full proposal review"],
      c: "var(--gold)",
    },
    {
      n: "05",
      stage: "SUBMISSION",
      t: "Submit & Stay With It",
      d: "Biosketches, budgets, letters of support, DMS plan, and submission logistics — coordinated end-to-end so you never miss a deadline.",
      arts: ["Biosketches", "Budget", "DMS plan", "Submission"],
      c: "var(--lime)",
    },
  ];
  return (
    <section className="py-24 bg-cream relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 mb-20">
          <div className="lg:col-span-7">
            <span className="text-xs uppercase tracking-[0.22em] text-coral font-medium">
              The grant journey
            </span>
            <h2 className="mt-4 font-display text-5xl md:text-6xl text-ink leading-[0.98]">
              Idea → Opportunity → Narrative →<br />
              <em className="not-italic text-gradient-sunburst">Review → Submission.</em>
            </h2>
          </div>
          <p className="lg:col-span-4 lg:col-start-9 self-end text-muted-foreground leading-relaxed">
            Drop in at any stage. Most PIs come to us at the Idea or Opportunity
            stage — the earlier, the better.
          </p>
        </div>

        <div className="relative">
          {/* connecting line */}
          <div
            aria-hidden
            className="absolute left-[27px] md:left-[39px] top-2 bottom-2 w-px"
            style={{
              background:
                "linear-gradient(to bottom, var(--coral), var(--magenta), var(--teal), var(--gold), var(--lime))",
            }}
          />
          <ol className="space-y-6">
            {stages.map((s) => (
              <li
                key={s.n}
                className="relative grid grid-cols-[56px_1fr] md:grid-cols-[80px_1fr] gap-6 items-start"
              >
                <div
                  className="w-14 h-14 md:w-20 md:h-20 rounded-2xl flex items-center justify-center font-display text-2xl text-white shadow-lift relative z-10"
                  style={{ background: s.c }}
                >
                  {s.n}
                </div>
                <div className="rounded-3xl bg-card border border-border p-7 md:p-9 hover:shadow-lift transition">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="text-[11px] uppercase tracking-[0.22em] font-medium"
                      style={{ color: s.c }}
                    >
                      Stage · {s.stage}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl text-ink">{s.t}</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed max-w-2xl">{s.d}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {s.arts.map((a) => (
                      <span
                        key={a}
                        className="text-xs px-3 py-1.5 rounded-full bg-secondary text-ink/80"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* BOOST featured */
function Boost() {
  return (
    <section className="py-24 bg-ink text-white relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-sunburst opacity-20 blur-3xl" />
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 relative">
        <div className="lg:col-span-5">
          <span className="text-xs uppercase tracking-[0.22em] text-coral font-medium">
            Featured program
          </span>
          <h2 className="mt-4 font-display text-5xl text-white leading-[0.98]">
            BOOST:<br />faculty peer<br />review.
          </h2>
          <p className="mt-6 text-white/70 leading-relaxed text-lg max-w-md">
            Our writers are experts in narrative — but they can't be experts in
            every PI's science. BOOST closes that gap with a UCSF faculty
            reviewer at two key stages.
          </p>
        </div>
        <div className="lg:col-span-7 lg:pl-8">
          <div className="rounded-3xl bg-white/5 border border-white/10 p-8 backdrop-blur">
            <div className="text-xs uppercase tracking-widest text-white/50 mb-6">
              BOOST timeline
            </div>
            <div className="space-y-3">
              {[
                { w: "≥ 6 weeks out", t: "Specific Aims review", c: "var(--coral)", pct: 100 },
                { w: "4 weeks out", t: "Structural review", c: "var(--magenta)", pct: 70 },
                { w: "2 weeks out", t: "Full Proposal review", c: "var(--teal)", pct: 45 },
                { w: "1 week out", t: "Language pass", c: "var(--gold)", pct: 20 },
              ].map((s) => (
                <div key={s.t} className="flex items-center gap-5">
                  <div className="text-xs text-white/50 w-28 flex-none">{s.w}</div>
                  <div className="flex-1 h-12 rounded-xl bg-white/5 border border-white/10 relative overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 opacity-30"
                      style={{ width: `${s.pct}%`, background: s.c }}
                    />
                    <div className="relative h-full flex items-center px-4 gap-3">
                      <span className="w-2 h-2 rounded-full" style={{ background: s.c }} />
                      <span className="text-sm">{s.t}</span>
                    </div>
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

/* Team — compact roster */
function Team() {
  const team = [
    { name: "Gabe Murphy, PhD", role: "Research Development Strategist", img: gabeImg, bio: "Leads large-grant strategy across ImmunoX and partner institutes." },
    { name: "Reid Bolus, PhD", role: "Research Development Strategist", img: reidImg, bio: "Embedded across the Diabetes Center; leads the RPR program." },
    { name: "Open Position", role: "Research Development Strategist", img: null, bio: "We're hiring. Help us grow the team." },
  ];
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-12">
          <div className="lg:col-span-6">
            <span className="text-xs uppercase tracking-[0.22em] text-coral font-medium">
              Your team
            </span>
            <h2 className="mt-4 font-display text-5xl text-ink leading-[0.98]">
              Scientists who happen<br />to be excellent writers.
            </h2>
          </div>
          <p className="lg:col-span-5 lg:col-start-8 text-muted-foreground leading-relaxed">
            Each strategist brings deep research training and years of
            grantwriting experience — so the conversation starts at the
            science, not the page count.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {team.map((p) => (
            <div key={p.name} className="rounded-3xl bg-card border border-border overflow-hidden hover:shadow-lift transition group">
              <div className="aspect-[4/5] bg-secondary relative overflow-hidden">
                {p.img ? (
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
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

/* Testimonials remain as evidence band */
function Evidence() {
  const quotes = [
    { q: "I just heard back from my R01 — it received a fundable score!", a: "UCSF Principal Investigator" },
    { q: "The process not only improved my grant, it taught me to be a better writer.", a: "RPR participant, 2025" },
    { q: "This service is invaluable. I hope it continues and expands so more of the community can benefit.", a: "Large Grants Program PI" },
  ];
  return (
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between flex-wrap gap-8 mb-12">
          <h2 className="font-display text-4xl md:text-5xl text-ink leading-[1.05] max-w-2xl">
            In the words of the<br />investigators we work with.
          </h2>
          <div className="flex items-center gap-6">
            <div>
              <div className="font-display text-5xl text-ink">9.3<span className="text-xl text-muted-foreground">/10</span></div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Avg. satisfaction</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div>
              <div className="font-display text-5xl text-ink">43</div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Grants in 2025</div>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {quotes.map((t, i) => (
            <figure key={i} className="rounded-3xl p-8 bg-card border border-border relative">
              <div className="absolute top-0 left-8 right-8 h-0.5" style={{ background: ["var(--coral)", "var(--magenta)", "var(--teal)"][i] }} />
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
      <Breadcrumb trail={[{ label: "Services" }, { label: "Research development & grantwriting" }]} />
      <Hero />
      <Journey />
      <Boost />
      <Team />
      <Evidence />
      <CTA
        eyebrow="Get started"
        title={<>Got a grant on the horizon?<br /><span className="text-white/70">Let's talk early.</span></>}
        subtitle="The earlier we engage, the more value we can add. A 30-minute consult is free — and the next federal deadline is closer than you think."
        email="rdg@ocr.ucsf.edu"
      />
    </SiteShell>
  );
}
