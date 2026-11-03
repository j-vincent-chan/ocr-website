import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Breadcrumb, CTA } from "@/components/site/chrome";
import {
  ArmEyebrow,
  PullQuote,
  ServiceCrossNav,
} from "@/components/site/service-family";

export const Route = createFileRoute("/services/community-management")({
  head: () => ({
    meta: [
      { title: "Community management — UCSF OCR" },
      {
        name: "description",
        content:
          "Retreats, seminar series, lightning talks, newsletters, and outreach that turn research communities into active, connected, fundable ecosystems.",
      },
      { property: "og:title", content: "Community management — UCSF OCR" },
      {
        property: "og:description",
        content:
          "The OCR service arm that helps partner institutes convene, communicate, and grow research communities over time.",
      },
    ],
  }),
  component: CommunityManagementPage,
});

const L = "var(--lime)";
const ARM = "05";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream border-b border-border">
      <div
        aria-hidden
        className="absolute -top-40 -right-40 w-[720px] h-[720px] rounded-full opacity-25 blur-3xl"
        style={{ background: "var(--gradient-sunburst)" }}
      />
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-24 relative">
        <ArmEyebrow arm={ARM} label="Community management" accent={L} />
        <h1 className="mt-8 font-display text-[clamp(2.8rem,7.5vw,7rem)] leading-[0.92] tracking-tight text-ink max-w-5xl">
          Science moves faster
          <br />
          when people{" "}
          <em className="not-italic" style={{ color: L }}>
            know each other.
          </em>
        </h1>
        <div className="mt-12 grid lg:grid-cols-12 gap-10">
          <p className="lg:col-span-6 text-xl text-muted-foreground leading-relaxed">
            OCR helps research communities become real communities: convening
            investigators, surfacing shared priorities, translating work for
            broader audiences, and creating the recurring touchpoints that turn
            chance overlap into collaborations.
          </p>
          <div className="lg:col-span-5 lg:col-start-8 grid grid-cols-3 gap-6">
            {[
              ["05", "Service arm"],
              ["8", "Partner communities"],
              ["1", "Shared model"],
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

function WhyItExists() {
  const beats = [
    {
      t: "Research communities do not self-organize.",
      d: "Faculty want collaborators, trainees want entry points, and funders want coherent ecosystems. But someone has to create the rooms, rituals, and channels where those connections happen.",
      c: "var(--coral)",
    },
    {
      t: "Communications are infrastructure.",
      d: "Newsletters, websites, short-form explainers, event promotion, and research spotlights are not just marketing. They help people find each other and help communities understand their own momentum.",
      c: "var(--magenta)",
    },
    {
      t: "Convening creates fundable science.",
      d: "Retreats, lightning talks, seminar series, and working groups surface shared priorities early enough for OCR's other arms to turn them into proposals, projects, datasets, and tools.",
      c: "var(--teal)",
    },
  ];

  return (
    <section className="py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 mb-14 items-end">
          <div className="lg:col-span-7">
            <ArmEyebrow arm={ARM} label="Why this arm exists" accent={L} />
            <h2 className="mt-6 font-display text-5xl md:text-6xl text-ink leading-[0.98]">
              Community is not a vibe.
              <br />
              <em className="not-italic text-muted-foreground/70">
                It is a practice.
              </em>
            </h2>
          </div>
          <p className="lg:col-span-4 lg:col-start-9 text-muted-foreground leading-relaxed">
            This arm makes explicit work OCR was already doing for deep
            partners: creating shared context, shared identity, and the
            connective tissue that keeps collaborations alive between deadlines.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {beats.map((beat, i) => (
            <article
              key={beat.t}
              className="rounded-3xl border border-border bg-card p-7 hover:shadow-lift transition"
            >
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center text-white font-display"
                style={{ background: beat.c }}
              >
                0{i + 1}
              </div>
              <h3 className="mt-6 font-display text-2xl text-ink leading-tight">
                {beat.t}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {beat.d}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Practice() {
  const items = [
    {
      t: "Research convenings",
      d: "Retreats, symposia, seminar series, lightning talks, working groups, and partner-specific events that create repeated points of contact.",
      c: "var(--coral)",
      tags: ["Retreats", "Lightning talks", "Working groups"],
    },
    {
      t: "Community communications",
      d: "Newsletters, web updates, research spotlights, dispatches, and audience-specific messaging that keep communities informed and visible.",
      c: "var(--magenta)",
      tags: ["Newsletters", "Spotlights", "Dispatches"],
    },
    {
      t: "Public outreach",
      d: "Plain-language science communication, education partnerships, and channels like Breaking Down Biology that help research communities speak beyond themselves.",
      c: "var(--teal)",
      tags: ["Breaking Down Biology", "Education", "Public science"],
    },
    {
      t: "Community intelligence",
      d: "Tracking investigators, publications, awards, talks, opportunities, and emergent themes so partner communities can see where energy is building.",
      c: "var(--gold)",
      tags: ["Signal", "Atlas", "Community maps"],
    },
  ];

  return (
    <section className="py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">
          <div className="lg:col-span-7">
            <ArmEyebrow arm={ARM} label="What we build" accent={L} />
            <h2 className="mt-6 font-display text-5xl text-ink leading-[0.98]">
              The operating system
              <br />
              for a research community.
            </h2>
          </div>
          <p className="lg:col-span-4 lg:col-start-9 text-muted-foreground leading-relaxed">
            Community management works best as part of deep partnership. The
            more we understand a partner's faculty, trainees, goals, and
            calendar, the more useful each convening and communication becomes.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {items.map((item) => (
            <article
              key={item.t}
              className="rounded-3xl border border-border bg-card overflow-hidden"
            >
              <div className="p-7 bg-ink text-white relative overflow-hidden">
                <div
                  aria-hidden
                  className="absolute -top-16 -left-16 w-56 h-56 rounded-full blur-3xl opacity-40"
                  style={{ background: item.c }}
                />
                <h3 className="relative font-display text-3xl text-white leading-tight">
                  {item.t}
                </h3>
              </div>
              <div className="p-7">
                <p className="text-muted-foreground leading-relaxed">{item.d}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-secondary px-3 py-1 text-[11px] font-mono text-ink/80"
                    >
                      {tag}
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

function PartnershipModel() {
  const rows = [
    ["Listen", "Map the community: people, programs, rhythms, audiences, and bottlenecks."],
    ["Convene", "Create the rooms where investigators and trainees discover shared priorities."],
    ["Communicate", "Turn community activity into newsletters, dispatches, stories, and public-facing explanations."],
    ["Connect", "Hand promising ideas to OCR's other arms for funding, project, data, or AI support."],
  ];

  return (
    <section className="py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <ArmEyebrow arm={ARM} label="How it works" accent={L} />
            <h2 className="mt-6 font-display text-5xl text-ink leading-[0.98]">
              Built for deep
              <br />
              partnership.
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed max-w-md">
              This is not event planning as a one-off service. It is the
              community layer of OCR's embedded model: visible enough for
              investigators to feel momentum, structured enough for leadership
              to see where to invest next.
            </p>
          </div>
          <ol className="lg:col-span-7 divide-y divide-border border-y border-border">
            {rows.map(([t, d], i) => (
              <li key={t} className="grid md:grid-cols-[6rem_1fr] gap-6 py-6">
                <span className="font-display text-3xl tabular-nums" style={{ color: L }}>
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-display text-2xl text-ink">{t}</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function CommunityManagementPage() {
  return (
    <SiteShell>
      <Breadcrumb
        trail={[{ label: "Services" }, { label: "Community management" }]}
      />
      <Hero />
      <WhyItExists />
      <Practice />
      <PartnershipModel />
      <section className="pb-28">
        <div className="max-w-7xl mx-auto px-6">
          <PullQuote
            quote="The work is not just bringing people into the same room. It is helping them recognize what they can build together."
            attribution="OCR community management principle"
            accent={L}
          />
        </div>
      </section>
      <ServiceCrossNav currentPath="/services/community-management" />
      <CTA
        eyebrow="Build community"
        title={
          <>
            Have a research community
            <br />
            <span className="text-white/70">ready to cohere?</span>
          </>
        }
        subtitle="Tell us what your investigators are trying to build together. We'll help shape the convenings, communications, and outreach that turn activity into momentum."
        email="ocr@ucsf.edu"
        primaryLabel="Start the conversation →"
      />
    </SiteShell>
  );
}
