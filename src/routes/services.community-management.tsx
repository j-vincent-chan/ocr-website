import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, Breadcrumb, CTA } from "@/components/site/chrome";
import { armName } from "@/components/site/arms";
import { OPEN_POSITIONS } from "@/components/site/open-positions";
import { ArmEyebrow, PullQuote, ServiceCrossNav } from "@/components/site/service-family";

export const Route = createFileRoute("/services/community-management")({
  head: () => ({
    meta: [
      { title: "Community Management — UCSF OCR" },
      {
        name: "description",
        content:
          "OCR provides Community Manager effort, part-time or embedded full-time, to plan and run enrichment programs for centers, institutes, and P30-style center grants: seminars, retreats, pilot and travel awards, mentorship pipelines, communications, and annual reporting.",
      },
      {
        property: "og:title",
        content: "Community Management — UCSF OCR",
      },
      {
        property: "og:description",
        content:
          "The enrichment program your center grant promised, staffed and run by OCR. Already in place for the Diabetes Center's NORC and DRC P30s and for ImmunoX.",
      },
    ],
  }),
  component: CommunityManagementPage,
});

const L = "var(--lime)";
const ARM = "05";

/* ───────── HERO ───────── */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream border-b border-border">
      <div
        aria-hidden
        className="absolute -top-40 -right-40 w-[720px] h-[720px] rounded-full opacity-25 blur-3xl"
        style={{ background: "var(--gradient-sunburst)" }}
      />
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-24 relative">
        <ArmEyebrow arm={ARM} label="One of five service arms" accent={L} />
        <h1 className="mt-8 font-display text-[clamp(2.15rem,4.2vw,3.75rem)] leading-[1.08] tracking-tight text-ink max-w-4xl">
          Building connections, fostering collaboration, and{" "}
          <em className="not-italic" style={{ color: L }}>
            strengthening research communities.
          </em>
        </h1>
        <div className="mt-12 grid lg:grid-cols-12 gap-10">
          <p className="lg:col-span-6 text-xl text-muted-foreground leading-relaxed">
            Every center grant promises an Enrichment Program: seminars, retreats, pilot awards,
            mentorship, and a community that talks to itself. OCR provides the Community Manager who
            actually runs it, as a fraction of a shared person's effort or as a full-time hire
            embedded in your center, and we help write the section before the grant goes in.
          </p>
          <div className="lg:col-span-5 lg:col-start-8 grid grid-cols-3 gap-6">
            {[
              ["2", "Diabetes Center P30s supported (NORC & DRC)"],
              ["9", "Deliverables in the NORC scope of work"],
              ["5", "Program families, one manager"],
            ].map(([n, l]) => (
              <div key={l} className="border-l-2 pl-4" style={{ borderColor: L }}>
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

/* ───────── THE GAP ───────── */
function TheGap() {
  const beats = [
    {
      label: "The promise",
      t: "Every center grant has an enrichment section.",
      d: "P30s, P50s, U54s, and institute-level centers all commit to seminar series, pilot and feasibility programs, core showcases, trainee development, and an annual report that shows the community is alive. Reviewers score it. Renewals depend on it.",
    },
    {
      label: "The gap",
      t: "It is nobody's full-time job.",
      d: "Enrichment Directors are faculty with labs. Administrators are already running budgets. So the seminar calendar slips, the pilot call goes out late, travel awards go unspent, and the RPPR is assembled from memory in the week before it is due.",
    },
    {
      label: "The response",
      t: "OCR supplies the person and the playbook.",
      d: "A Community Manager with a tested program calendar, award-cycle templates, communications channels, and OCR's other arms behind them. Partial effort for a single P30; a full-time embedded manager for an institute-scale community.",
    },
  ];
  return (
    <section className="py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <ArmEyebrow arm={ARM} label="Why this arm exists" accent={L} />
          <h2 className="mt-6 font-display text-5xl text-ink leading-[0.98]">
            The section everyone writes
            <br />
            and nobody staffs.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-px bg-border rounded-3xl overflow-hidden border border-border">
          {beats.map((b, i) => (
            <article key={b.label} className="bg-cream p-8 md:p-10 flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-display text-xl" style={{ color: L }}>
                  0{i + 1}
                </span>
                <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  {b.label}
                </span>
              </div>
              <h3 className="font-display text-2xl text-ink leading-snug">{b.t}</h3>
              <p className="mt-5 text-muted-foreground leading-relaxed">{b.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── PROGRAM CATALOG ───────── */
function Catalog() {
  const families = [
    {
      t: "Convene",
      d: "The recurring rooms where members meet: a seminar series with a real calendar, an annual symposium or retreat, visiting scientists, focused workshops and working groups, and lightning-talk sessions that put thematic groups in front of each other.",
      items: [
        "Seminar series",
        "Symposia & retreats",
        "Visiting scientists",
        "Workshops & working groups",
        "Lightning talks",
        "Scientific writing retreats",
      ],
      c: "var(--coral)",
    },
    {
      t: "Fund",
      d: "Award cycles run end to end: writing the call, recruiting reviewers, coordinating review, making awards, and following up so that pilot projects turn into R01 and R21 submissions. We also scan and disseminate external funding opportunities that fit the community's strengths.",
      items: [
        "Pilot & feasibility programs",
        "Travel awards",
        "Core utilization awards",
        "Themed awards (team-building, new collaborations)",
        "External funding opportunity digests",
        "Post-award research development",
      ],
      c: "var(--gold)",
    },
    {
      t: "Develop",
      d: "Mentorship pipelines that move people from trainee to independent investigator, and programs that broaden who gets to join the community in the first place.",
      items: [
        "Mentorship pipelines",
        "Trainee & junior faculty cohorts",
        "ImmunoDiverse-style participation programs",
        "Grant-writing workshops",
      ],
      c: "var(--magenta)",
    },
    {
      t: "Communicate",
      d: "The channels that make a community visible to itself and to the institution: newsletters, social media, websites, event promotion, research spotlights, and plain-language science for audiences outside the field.",
      items: [
        "Newsletters",
        "Social media",
        "Website & event promotion",
        "Research spotlights",
        "Core showcase series",
        "Breaking Down Biology",
      ],
      c: "var(--teal)",
    },
    {
      t: "Administer",
      d: "The reporting and intelligence work that keeps a center fundable: the annual RPPR, member portfolio analysis, core service assessment, and tracking NIH policy changes that affect members.",
      items: [
        "Annual RPPR preparation",
        "Member portfolio analysis",
        "Core service assessment",
        "NIH policy & requirements updates",
        "Outcome tracking: papers, grants, awards",
      ],
      c: L,
    },
  ];

  return (
    <section className="py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">
          <div className="lg:col-span-7">
            <ArmEyebrow arm={ARM} label="What we run" accent={L} />
            <h2 className="mt-6 font-display text-5xl md:text-6xl text-ink leading-[0.98]">
              Five program families.
              <br />
              One person accountable.
            </h2>
          </div>
          <p className="lg:col-span-4 lg:col-start-9 text-muted-foreground leading-relaxed">
            Most centers need some of each. We scope the mix to the grant's commitments and the
            community's size, then run it on a calendar leadership can see.
          </p>
        </div>

        <ol className="divide-y divide-border border-y border-border">
          {families.map((f, i) => (
            <li key={f.t} className="grid lg:grid-cols-12 gap-6 lg:gap-10 py-10">
              <div className="lg:col-span-4 flex items-start gap-5">
                <span
                  className="font-display text-3xl tabular-nums shrink-0"
                  style={{ color: f.c }}
                >
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-display text-3xl text-ink leading-none">{f.t}</h3>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed lg:hidden">
                    {f.d}
                  </p>
                </div>
              </div>
              <p className="hidden lg:block lg:col-span-4 text-muted-foreground leading-relaxed">
                {f.d}
              </p>
              <ul className="lg:col-span-4 flex flex-wrap gap-2 content-start">
                {f.items.map((it) => (
                  <li
                    key={it}
                    className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-ink/80"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ───────── STAFFING MODELS ───────── */
function StaffingModels() {
  const models = [
    {
      no: "Model 01",
      title: "Partial effort on a center grant",
      d: "A share of an OCR Community Manager, budgeted into the Enrichment or Administrative Core, runs the program on the grant's calendar and produces the reporting the P30 requires. Best for a single center with a defined scope of work.",
      cases: ["Diabetes Center NORC", "Diabetes Center DRC"],
      c: "var(--gold)",
    },
    {
      no: "Model 02",
      title: "Embedded full-time Community Manager",
      d: "A dedicated person hired through OCR and placed inside the community: owning the retreat, the seminar series, the newsletter, the award programs, and the relationships. Best for institute-scale communities with many programs running at once.",
      cases: ["Bakar ImmunoX Initiative"],
      c: "var(--coral)",
    },
    {
      no: "Model 03",
      title: "Written into the grant with you",
      d: "Before the application goes in, OCR drafts the Enrichment Program section and budget with the Enrichment Director, using programs we already run as the evidence base. When the award lands, the plan is already staffed.",
      cases: ["P30 & P50 centers", "U54 & program projects", "Institute-level centers"],
      c: "var(--teal)",
    },
  ];
  return (
    <section className="py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-14">
          <ArmEyebrow arm={ARM} label="Three ways to engage" accent={L} />
          <h2 className="mt-6 font-display text-5xl text-ink leading-[0.98]">
            Scaled to the grant,
            <br />
            not the other way around.
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed max-w-xl">
            The same team, three shapes. Most partners start with one model and grow into another as
            the community does.
          </p>
        </div>
        <ol className="grid lg:grid-cols-3 gap-5">
          {models.map((m) => (
            <li
              key={m.no}
              className="relative rounded-3xl bg-card border border-border p-8 flex flex-col"
            >
              <span
                aria-hidden
                className="absolute top-0 left-8 right-8 h-[2px]"
                style={{ background: m.c }}
              />
              <span
                className="text-[11px] uppercase tracking-[0.24em] font-medium"
                style={{ color: m.c }}
              >
                {m.no}
              </span>
              <h3 className="mt-5 font-display text-xl text-ink leading-snug">{m.title}</h3>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{m.d}</p>
              <div className="mt-6 border-t border-border pt-5">
                <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground mb-3">
                  In practice
                </div>
                <ul className="flex flex-wrap gap-1.5">
                  {m.cases.map((c) => (
                    <li
                      key={c}
                      className="text-[11px] px-2.5 py-1 rounded-full border border-border bg-secondary/60 text-ink/80"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ───────── A PROGRAM YEAR ───────── */
const YEAR = [
  {
    t: "Plan",
    d: "Set the year's calendar against the grant's commitments: events, award cycles, reporting deadlines.",
    c: "var(--coral)",
  },
  {
    t: "Announce",
    d: "Open the pilot call, publish the seminar series, launch the newsletter and showcase schedule.",
    c: "var(--gold)",
  },
  {
    t: "Run",
    d: "Host the events, coordinate review panels, host visiting scientists, keep members informed.",
    c: "var(--magenta)",
  },
  {
    t: "Award",
    d: "Make pilot, travel, and core utilization awards; start follow-up research development with awardees.",
    c: "var(--teal)",
  },
  {
    t: "Report",
    d: "Assemble the RPPR: attendance, awards made, cores used, and the papers and grants that followed.",
    c: L,
  },
];

function ProgramYear() {
  return (
    <section className="py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">
          <div className="lg:col-span-7">
            <ArmEyebrow arm={ARM} label="How a program year runs" accent={L} />
            <h2 className="mt-6 font-display text-5xl text-ink leading-[0.98]">
              Built backward
              <br />
              from the progress report.
            </h2>
          </div>
          <p className="lg:col-span-4 lg:col-start-9 text-muted-foreground leading-relaxed">
            A center is renewed on what it can show. We track outcomes from the first seminar so the
            RPPR writes itself, and so the renewal has numbers.
          </p>
        </div>

        <div className="hidden md:flex items-stretch gap-2">
          {YEAR.map((n, i) => (
            <div key={n.t} className="flex-1 flex items-stretch">
              <div className="flex-1 rounded-2xl border border-border bg-card p-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-display text-white text-sm mb-4"
                  style={{ background: n.c }}
                >
                  0{i + 1}
                </div>
                <div className="font-display text-xl text-ink">{n.t}</div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{n.d}</p>
              </div>
              {i < YEAR.length - 1 && (
                <div className="flex items-center px-1 text-muted-foreground" aria-hidden>
                  →
                </div>
              )}
            </div>
          ))}
        </div>
        <ol className="md:hidden space-y-3">
          {YEAR.map((n, i) => (
            <li key={n.t} className="rounded-2xl border border-border bg-card p-5 flex gap-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-display text-white text-sm flex-none"
                style={{ background: n.c }}
              >
                0{i + 1}
              </div>
              <div>
                <div className="font-display text-lg text-ink">{n.t}</div>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{n.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ───────── IN PRACTICE ───────── */
function InPractice() {
  const partners = [
    {
      tag: "P30 · Diabetes Center",
      title: "Nutrition Obesity Research Center (NORC)",
      d: "OCR holds the NORC's enrichment scope of work: partial Community Manager effort delivering a defined set of annual commitments alongside the Enrichment Director.",
      scope: [
        "Annual RPPR preparation and coordination",
        "Scientific writing retreats and workshops",
        "Thematic events: lightning talks, metabolism and pleiotropy programming",
        "Pilot & Feasibility call and post-award research development toward R01/R21",
        "Core Showcase series, 1–2× per year",
        "Funding opportunity dissemination with a collaborative emphasis",
        "NIH policy updates and implementation support",
        "Core service assessment and member portfolio analysis",
      ],
      c: "var(--gold)",
    },
    {
      tag: "P30 · Diabetes Center",
      title: "Diabetes Research Center (DRC)",
      d: "The NORC's sibling P30, supported by the same embedded OCR effort so that both centers share one calendar, one communications channel, and one view of the Diabetes Center membership.",
      scope: [
        "Enrichment programming coordinated with the NORC",
        "Shared seminar and showcase calendar across both centers",
        "Pilot program support and awardee follow-up",
        "Center-wide communications and member engagement",
        "Reporting aligned with the DRC's annual progress report",
      ],
      c: "var(--teal)",
    },
    {
      tag: "Institute · Embedded",
      title: "Bakar ImmunoX Initiative",
      d: "OCR's original community. A full-time ImmunoX Community Manager runs the institute's convenings, communications, and award programs, with OCR's other arms behind the science that comes out of them.",
      scope: [
        "Annual retreat and lightning-talk sessions",
        "Breaking Down Biology public science series",
        "ImmunoDiverse participation and mentorship program",
        "New Biospecimen Pipeline Development awards",
        "Newsletters and community communications",
      ],
      c: "var(--coral)",
    },
  ];

  return (
    <section className="py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">
          <div className="lg:col-span-7">
            <ArmEyebrow arm={ARM} label="In practice" accent={L} />
            <h2 className="mt-6 font-display text-5xl text-ink leading-[0.98]">
              Two P30s and
              <br />
              an institute.
            </h2>
          </div>
          <p className="lg:col-span-4 lg:col-start-9 text-muted-foreground leading-relaxed">
            The programs below are running today. New partners inherit the templates, calendars, and
            award workflows built for them.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-5">
          {partners.map((p) => (
            <article
              key={p.title}
              className="group relative rounded-3xl border border-border bg-card p-8 overflow-hidden hover:shadow-lift transition-all duration-300 flex flex-col"
            >
              <span
                aria-hidden
                className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"
                style={{ background: p.c }}
              />
              <div className="relative flex flex-col flex-1">
                <div
                  className="text-[11px] uppercase tracking-[0.24em] font-medium"
                  style={{ color: p.c }}
                >
                  {p.tag}
                </div>
                <h3 className="mt-3 font-display text-2xl text-ink leading-snug">{p.title}</h3>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{p.d}</p>
                <div className="mt-6 border-t border-border pt-5">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground mb-3">
                    Scope of work
                  </div>
                  <ul className="space-y-2">
                    {p.scope.map((s) => (
                      <li key={s} className="flex items-start gap-2.5 text-sm text-ink/80">
                        <span
                          className="w-1 h-1 rounded-full mt-2 shrink-0"
                          style={{ background: p.c }}
                        />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── FEEDS THE OTHER ARMS ───────── */
function FeedsOtherArms() {
  const links = [
    {
      to: "/services/research-development" as const,
      arm: "Research development",
      d: "Pilot awardees get follow-up research development aimed at R01 and R21 submissions. Working groups become multi-PI proposals.",
      c: "var(--coral)",
    },
    {
      to: "/services/research-operations" as const,
      arm: "Research operations & management",
      d: "Core utilization and biospecimen pipeline awards hand directly to OCR coordinators who stand the studies up.",
      c: "var(--teal)",
    },
    {
      to: "/services/data-management" as const,
      arm: "Data management",
      d: "Member portfolio analysis and core service assessment draw on the same data practice that manages partner datasets.",
      c: "var(--magenta)",
    },
    {
      to: "/services/ai-tools" as const,
      arm: "AI tools",
      d: "Signal tracks members' publications, grants, and honors so newsletters and RPPRs are built from a live record rather than a year-end scramble.",
      c: "var(--gold)",
    },
  ];
  return (
    <section className="py-24 bg-ink text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-12">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-white/60 font-medium">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: L }} aria-hidden />
              <span>{armName(ARM)}</span>
              <span className="opacity-40">·</span>
              <span className="text-white/85">Connected to the rest of OCR</span>
            </div>
            <h2 className="mt-6 font-display text-5xl text-white leading-[0.98]">
              An enrichment program
              <br />
              with an office behind it.
            </h2>
          </div>
          <p className="lg:col-span-5 lg:col-start-8 text-white/70 leading-relaxed">
            A standalone events coordinator can run a seminar. A Community Manager inside OCR can
            take what the seminar surfaces and route it to grant strategists, project managers, and
            data staff.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="group rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
            >
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/60">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: l.c }} />
                {l.arm}
              </div>
              <p className="mt-4 text-sm text-white/80 leading-relaxed">{l.d}</p>
              <div
                className="mt-5 text-sm font-medium inline-flex items-center gap-1.5 transition-transform group-hover:translate-x-0.5"
                style={{ color: l.c }}
              >
                Explore <span aria-hidden>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── TEAM ───────── */
function Team() {
  const rows = [
    {
      r: "ImmunoX Community Manager",
      status: "Open position",
      focus: "Embedded full-time; runs the ImmunoX community end to end",
      href: OPEN_POSITIONS.immunoxCommunityManager.href,
      c: L,
    },
    {
      r: "ImmunoDiverse Program Administrator",
      status: "Xochitl Vargas",
      focus: "Participation and mentorship pipeline for immunology research at UCSF",
      c: "var(--magenta)",
    },
    {
      r: "Research Administrative Officer",
      status: "Jonathan Wilson",
      focus: "Award finance, subawards, and the budget side of pilot and travel programs",
      c: "var(--coral)",
    },
  ];
  return (
    <section className="py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-12">
          <div className="lg:col-span-6">
            <ArmEyebrow arm={ARM} label="The team" accent={L} />
            <h2 className="mt-6 font-display text-5xl text-ink leading-[0.98]">
              Community Managers,
              <br />
              shared or dedicated.
            </h2>
          </div>
          <p className="lg:col-span-5 lg:col-start-8 text-muted-foreground leading-relaxed">
            Community Managers sit inside OCR, so a partner funding 25% of one still gets the
            templates, award workflows, and communications channels built across every program we
            run.{" "}
            <Link to="/people" className="underline underline-offset-4 hover:text-ink transition">
              Meet the whole team
            </Link>
            .
          </p>
        </div>
        <div className="rounded-3xl border border-border overflow-hidden">
          <div className="hidden md:grid grid-cols-12 px-6 py-4 text-[11px] uppercase tracking-widest text-muted-foreground bg-secondary/50">
            <div className="col-span-5">Role</div>
            <div className="col-span-3">Who</div>
            <div className="col-span-4">Focus</div>
          </div>
          {rows.map((r) => (
            <div
              key={r.r}
              className="grid md:grid-cols-12 gap-2 md:gap-0 px-6 py-5 md:items-center border-t border-border bg-card hover:bg-secondary/30 transition"
            >
              <div className="md:col-span-5 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: r.c }} />
                <span className="font-display text-lg text-ink">{r.r}</span>
              </div>
              <div className="md:col-span-3 text-sm text-ink/80">
                {r.href ? (
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-4 hover:text-ink transition"
                  >
                    {r.status} →
                  </a>
                ) : (
                  r.status
                )}
              </div>
              <div className="md:col-span-4 text-sm text-muted-foreground">{r.focus}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CommunityManagementPage() {
  return (
    <SiteShell>
      <Breadcrumb trail={[{ label: "Services" }, { label: "Community Management" }]} />
      <Hero />
      <TheGap />
      <Catalog />
      <StaffingModels />
      <ProgramYear />
      <InPractice />
      <FeedsOtherArms />
      <Team />
      <section className="pb-28">
        <div className="max-w-7xl mx-auto px-6">
          <PullQuote
            quote="The enrichment program is the part of a center grant that reviewers remember and renewals depend on. It deserves a person whose job it is."
            attribution="OCR community management principle"
            accent={L}
          />
        </div>
      </section>
      <ServiceCrossNav currentPath="/services/community-management" />
      <CTA
        eyebrow="Enrichment programs"
        title={
          <>
            Writing a center grant?
            <br />
            <span className="text-white/70">Talk to us before the Enrichment section.</span>
          </>
        }
        subtitle="Whether you are drafting a P30, renewing one, or trying to make an existing enrichment program actually run, tell us what the grant promised and we'll scope the Community Manager effort to deliver it."
        email="ocr@ucsf.edu"
        primaryLabel="Scope an enrichment program →"
      />
    </SiteShell>
  );
}
