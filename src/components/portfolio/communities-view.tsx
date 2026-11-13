import { Link } from "@tanstack/react-router";
import { communities } from "@/data/portfolio";
import type { Community } from "@/data/portfolio/types";

const AREA_DOTS: Record<string, string> = {
  "Community building & engagement": "#ff6450",
  "Events & scientific programming": "#f3ba25",
  "Communications & outreach": "#00b5b6",
  "Program & partnership development": "#a491ff",
};

const CONE =
  "conic-gradient(from 200deg,#ff6450,#db2fb2,#6159e1,#00b5b6,#9dda4f,#f3ba25,#ff6450)";

function CommunityMark({ size = 52 }: { size?: number }) {
  return (
    <span
      aria-hidden
      className="relative flex-none rounded-full"
      style={{ width: size, height: size, background: CONE }}
    >
      <span
        className="absolute inset-[3px] flex items-center justify-center rounded-full bg-white"
      >
        <svg viewBox="0 0 30 30" width={30} height={30}>
          <circle cx="15" cy="8" r="3.4" fill="#010621" />
          <circle cx="7.5" cy="14" r="3" fill="#010621" />
          <circle cx="22.5" cy="14" r="3" fill="#010621" />
          <circle cx="10.5" cy="22.5" r="3.2" fill="#010621" />
          <circle cx="19.5" cy="22.5" r="3" fill="#010621" />
        </svg>
      </span>
    </span>
  );
}

function RippleRings() {
  // Three rings ripple from near the mark (prototype communityArt).
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[24px]">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="portfolio-ripple absolute rounded-full"
          style={{
            left: 26,
            top: 26,
            width: 420,
            height: 420,
            marginLeft: -210 + 26,
            marginTop: -210 + 26,
            background: CONE,
            WebkitMaskImage:
              "radial-gradient(closest-side, transparent calc(100% - 4px), #000 calc(100% - 3px))",
            maskImage:
              "radial-gradient(closest-side, transparent calc(100% - 4px), #000 calc(100% - 3px))",
            animation: `cm-ripple 10.5s ease-out ${i * 3.5}s infinite`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}

function CommunityCard({ community }: { community: Community }) {
  const servesText = community.serves
    ? community.serves.charAt(0).toLowerCase() + community.serves.slice(1)
    : "";
  const hasScopes = !!(community.scopes && community.scopes.length);

  return (
    <article
      className="relative overflow-hidden rounded-[24px] border border-[#e4e1d8] bg-white"
      style={{
        boxShadow: "0 1px 2px rgba(5,15,44,.04), 0 8px 24px rgba(5,15,44,.06)",
      }}
    >
      <RippleRings />
      <div className="relative p-6 md:p-7">
        <div className="flex flex-wrap items-start gap-4 gap-x-6">
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-3.5">
            <CommunityMark />
            <span className="inline-block whitespace-pre rounded-full border border-[#e4e1d8] bg-[#f6f4ee] px-3 py-1 text-xs font-medium text-[#242d42]">
              Since {community.since}
            </span>
            <div className="min-w-0 flex-[1_1_200px]">
              <h3
                className="m-0 font-display text-[#010621]"
                style={{
                  fontSize: "clamp(1.7rem, 3vw, 2.2rem)",
                  lineHeight: 1.1,
                  fontWeight: 400,
                }}
              >
                {community.name}
              </h3>
              {servesText ? (
                <p className="mt-1 text-sm leading-snug text-[#555e6f]">
                  Serves {servesText}
                </p>
              ) : null}
            </div>
          </div>
          <a
            href={community.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 flex-none items-center gap-2 rounded-full border border-[#010621] bg-transparent px-5 text-sm font-medium text-[#010621] no-underline hover:bg-[#f2eee6]"
          >
            Visit the community <span aria-hidden>↗</span>
          </a>
        </div>

        <div className="mt-6 grid gap-6 border-t border-[#dad7cf] pt-6 md:grid-cols-2">
          <div>
            <div
              className="text-[#555e6f]"
              style={{
                font: "500 11px/1.4 Inter, system-ui, sans-serif",
                letterSpacing: ".18em",
                textTransform: "uppercase",
              }}
            >
              OCR provides
            </div>
            <p className="mt-2 text-[15px] leading-[1.55] text-[#242d42] text-pretty">
              {community.contributes}
            </p>
            {community.model ? (
              <span className="mt-3 inline-flex min-h-9 items-center rounded-full bg-[#010621] px-3.5 text-[13px] font-medium text-white">
                {community.model}
              </span>
            ) : null}
          </div>

          <div>
            {hasScopes ? (
              <>
                <div
                  className="text-[#555e6f]"
                  style={{
                    font: "500 11px/1.4 Inter, system-ui, sans-serif",
                    letterSpacing: ".18em",
                    textTransform: "uppercase",
                  }}
                >
                  Enrichment programs
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {community.scopes!.map((s) => (
                    <div
                      key={s.name}
                      className="rounded-[16px] border border-[#e4e1d8] bg-[#f9f5ec] p-4"
                    >
                      <div className="font-display text-xl text-[#010621]" style={{ fontWeight: 400 }}>
                        {s.name}
                      </div>
                      <div className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-[#555e6f]">
                        {s.line}
                      </div>
                    </div>
                  ))}
                </div>
                {community.scopes?.[0]?.detail ? (
                  <p className="mt-3 text-[13.5px] leading-snug text-[#555e6f]">
                    {community.scopes[0].detail}
                  </p>
                ) : null}
              </>
            ) : (
              <>
                <div
                  className="text-[#555e6f]"
                  style={{
                    font: "500 11px/1.4 Inter, system-ui, sans-serif",
                    letterSpacing: ".18em",
                    textTransform: "uppercase",
                  }}
                >
                  Selected programming
                </div>
                <div className="mt-3 grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,140px),1fr))]">
                  {(community.groups || []).map(([area, items]) => (
                    <div key={area}>
                      <div className="flex items-center gap-2 text-[13px] font-medium text-[#010621]">
                        <span
                          aria-hidden
                          className="h-2 w-2 flex-none rounded-full"
                          style={{ background: AREA_DOTS[area] ?? "#7f8bb0" }}
                        />
                        {area}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {items.length ? (
                          items.map((label) => (
                            <span
                              key={label}
                              className="rounded-full border border-[#e4e1d8] bg-[#f4f2ec] px-2.5 py-1 text-xs font-medium text-[#242d42]"
                            >
                              {label}
                            </span>
                          ))
                        ) : (
                          <span className="text-[13px] text-[#555e6f]">Programming in development</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#dad7cf] pt-5">
          <p className="m-0 max-w-[48ch] text-[13px] leading-snug text-[#555e6f]">
            Only documented programming is listed. A community manager may also run one-off
            events and ad-hoc support.
          </p>
          <Link
            to="/services/community-management"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#010621] px-5 text-sm font-medium text-[#010621] no-underline hover:bg-[#f2eee6]"
          >
            What a community manager runs <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export function CommunitiesView() {
  return (
    <section id="communities" className="pb-24 pt-10">
      <div className="mx-auto max-w-[1280px] px-6">
        <p className="mb-7 max-w-[62ch] text-pretty text-[17px] leading-[1.6] text-[#555e6f]">
          The research communities OCR supports, and the programming it helps deliver for their
          members. For the capabilities behind this work, see{" "}
          <Link
            to="/services/community-management"
            className="font-medium text-[#010621] underline-offset-2 hover:underline"
          >
            Community & Enrichment Programs
          </Link>
          .
        </p>
        <div className="flex flex-col gap-6">
          {communities.map((c) => (
            <CommunityCard key={c.name} community={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
