import { Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { Motif } from "@/components/portfolio/motif";
import { StatusPill } from "@/components/portfolio/status-pill";
import {
  coprojects,
  degrees,
  getProject,
  programs,
  projects,
  staff,
} from "@/data/portfolio";
import type { Program, Project } from "@/data/portfolio/types";
import {
  formatLead,
  projectKindLine,
  projectsOfProgram,
  statusPresentation,
} from "@/lib/portfolio/derived";
import { staffPhotoUrl } from "@/lib/portfolio/staff-photos";
import { themeAccent, themeTint } from "@/lib/portfolio/themes";

function hostOf(u: string): string {
  try {
    return new URL(u).hostname.replace(/^www\./, "");
  } catch {
    return u;
  }
}

function RelatedRow({
  name,
  meta,
  status,
  statusDot,
  href,
  motifName,
  motifTheme,
  motifColor,
}: {
  name: string;
  meta: string;
  status?: string;
  statusDot?: string;
  href?: string;
  motifName: string;
  motifTheme: string;
  motifColor: string;
}) {
  const inner = (
    <>
      <div
        aria-hidden
        className="h-12 w-12 flex-none overflow-hidden rounded-xl"
        style={{ background: themeTint(motifColor) }}
      >
        <Motif name={motifName} theme={motifTheme} mode="static" color={motifColor} zoom={1.4} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[15px] font-semibold leading-snug text-[#010621]">{name}</div>
        {meta ? (
          <div className="mt-0.5 text-[12.5px] leading-snug text-[#555e6f]">{meta}</div>
        ) : null}
      </div>
      {status ? (
        <div className="flex items-center gap-1.5 text-[12.5px] text-[#384258]">
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: statusDot }}
          />
          {status}
        </div>
      ) : null}
      {href ? <span aria-hidden className="text-[#010621]">→</span> : null}
    </>
  );

  const className =
    "flex items-center gap-3 rounded-[16px] border border-[#e4e1d8] bg-white p-3.5 no-underline transition-[border-color,box-shadow] hover:border-[#010621] hover:shadow-[0_6px_18px_rgba(5,15,44,.07)]";

  if (href) {
    return (
      <a href={href} className={className}>
        {inner}
      </a>
    );
  }
  return <div className={className}>{inner}</div>;
}

function MotifBanner({
  name,
  theme,
  closed,
}: {
  name: string;
  theme: string;
  closed: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || closed) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `translate3d(${(x * 44).toFixed(1)}px,${(y * 28).toFixed(1)}px,0) scale(1.05)`;
      el.style.opacity = "0.62";
    };
    const onLeave = () => {
      el.style.transform = "";
      el.style.opacity = "";
    };
    const parent = el.parentElement;
    parent?.addEventListener("pointermove", onMove);
    parent?.addEventListener("pointerleave", onLeave);
    return () => {
      parent?.removeEventListener("pointermove", onMove);
      parent?.removeEventListener("pointerleave", onLeave);
    };
  }, [closed]);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 right-0 w-[min(520px,55%)]"
      style={{
        opacity: closed ? 0.3 : 0.5,
        WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 35%)",
        maskImage: "linear-gradient(90deg, transparent 0%, #000 35%)",
      }}
    >
      <div ref={ref} className="h-full w-full transition-[transform,opacity] duration-300">
        <Motif
          name={name}
          theme={theme}
          mode={closed ? "static" : "background"}
          color={closed ? "#9a9da8" : undefined}
          zoom={1}
        />
      </div>
    </div>
  );
}

function FactRow({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="grid gap-1 border-b border-[#e4e1d8] py-3 sm:grid-cols-[160px_1fr]">
      <dt className="text-[13px] font-medium text-[#555e6f]">{label}</dt>
      <dd className="m-0 text-[15px] leading-snug text-[#242d42]">{value}</dd>
    </div>
  );
}

function ChipRow({ label, items }: { label: string; items?: string[] }) {
  if (!items?.length) return null;
  return (
    <div className="grid gap-2 border-b border-[#e4e1d8] py-3 sm:grid-cols-[160px_1fr]">
      <dt className="text-[13px] font-medium text-[#555e6f]">{label}</dt>
      <dd className="m-0 flex flex-wrap gap-1.5">
        {items.map((x) => (
          <span
            key={x}
            className="rounded-full border border-[#e4e1d8] bg-[#f4f2ec] px-2.5 py-1 text-xs font-medium text-[#242d42]"
          >
            {x}
          </span>
        ))}
      </dd>
    </div>
  );
}

export function PortfolioDetailPage({
  record,
}: {
  record: Program | Project;
}) {
  const isProg = record.type === "program";
  const accent = themeAccent(record.theme);
  const closed = record.status === "Closed";
  const parent =
    !isProg && record.parent
      ? programs.find((g) => g.id === record.parent)
      : undefined;
  const kids = isProg ? projectsOfProgram(projects, record.id) : [];
  const sibs = parent
    ? projectsOfProgram(projects, parent.id).filter((p) => p.id !== record.id)
    : [];
  const title = isProg ? record.title || record.name : record.name;
  const hasShort = !!record.short && !title.includes(record.short);
  const subtype = isProg
    ? record.programType
    : record.type === "bio"
      ? record.model || ""
      : [record.studyType, record.phase].filter(Boolean).join(" · ");
  const leadLine = formatLead(record.lead, degrees, isProg);
  const motifColor = parent ? themeAccent(parent.theme).bright : accent.bright;

  return (
    <div style={{ background: "#fdfcf8" }}>
      <nav
        aria-label="Breadcrumb"
        className="mx-auto flex max-w-[1280px] gap-2 px-6 pb-3 pt-8 text-sm text-[#555e6f]"
      >
        <Link to="/" className="text-[#555e6f] no-underline hover:text-[#010621]">
          Home
        </Link>
        <span aria-hidden>/</span>
        <Link to="/portfolio" className="text-[#555e6f] no-underline hover:text-[#010621]">
          Portfolio
        </Link>
        <span aria-hidden>/</span>
        <Link
          to="/portfolio"
          search={isProg ? undefined : { view: "projects" }}
          className="text-[#555e6f] no-underline hover:text-[#010621]"
        >
          {isProg ? "Programs" : "Projects"}
        </Link>
        <span aria-hidden>/</span>
        <span className="font-medium text-[#010621]">{title}</span>
      </nav>

      <header
        className="relative overflow-hidden border-b"
        style={{ background: "#f9f5ec", borderColor: "rgba(1,6,33,.1)" }}
      >
        <MotifBanner name={record.name} theme={record.theme} closed={closed} />
        <div className="relative mx-auto max-w-[1280px] px-6 py-10 md:py-14">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center rounded-full border border-[#dad7cf] bg-white px-3 py-1 text-xs font-medium text-[#242d42]">
              {isProg
                ? "Program"
                : record.type === "bio"
                  ? "Biospecimen collection"
                  : "Clinical studies & trials"}
            </span>
            {subtype ? (
              <span className="inline-flex items-center rounded-full border border-[#dad7cf] bg-white px-3 py-1 text-xs font-medium text-[#242d42]">
                {subtype}
              </span>
            ) : null}
            <StatusPill status={record.status} themeDeep={accent.deep} />
            {!isProg && record.type === "clin" && record.enrollment ? (
              <span className="inline-flex items-center rounded-full border border-[#dad7cf] bg-white px-3 py-1 text-xs font-medium text-[#555e6f]">
                Study status: {record.enrollment}
              </span>
            ) : null}
          </div>

          <h1
            className="mt-5 max-w-[18ch] font-display text-[#010621]"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.75rem)",
              lineHeight: 1.02,
              letterSpacing: "-.02em",
              fontWeight: 400,
            }}
          >
            {title}
            {hasShort ? (
              <span
                className="text-[#555e6f]"
                style={{ font: "400 .55em/1 Inter, system-ui, sans-serif" }}
              >
                , {record.short}
              </span>
            ) : null}
          </h1>

          {isProg && record.subtitle ? (
            <p
              className="mt-3 text-[#010621]"
              style={{
                font: "500 12px/1.4 Inter, system-ui, sans-serif",
                letterSpacing: ".18em",
                textTransform: "uppercase",
              }}
            >
              {record.subtitle}
            </p>
          ) : null}

          {!isProg && record.fullTitle ? (
            <p className="mt-3 max-w-[48rem] text-[15px] italic leading-snug text-[#555e6f]">
              {record.fullTitle}
            </p>
          ) : null}

          {record.card ? (
            <p className="mt-5 max-w-[44rem] text-pretty text-[17px] leading-[1.6] text-[#242d42]">
              {record.card}
            </p>
          ) : null}

          <p className="mt-4 text-sm text-[#555e6f]">
            {[leadLine, record.theme].filter(Boolean).join(" · ")}
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1280px] gap-10 px-6 py-12 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-10">
          {record.full ? (
            <section>
              <h2 className="font-display text-[28px] leading-[1.15] tracking-tight text-[#010621]" style={{ fontWeight: 400 }}>
                Overview
              </h2>
              <p className="mt-4 text-[15.5px] leading-[1.65] text-[#242d42] text-pretty">
                {record.full}
              </p>
            </section>
          ) : null}

          <section>
            <h2 className="font-display text-[28px] leading-[1.15] tracking-tight text-[#010621]" style={{ fontWeight: 400 }}>
              {isProg
                ? "About the program"
                : record.type === "bio"
                  ? "The collection"
                  : "The study"}
            </h2>
            <dl className="mt-2">
              {isProg ? (
                <>
                  <FactRow label="Program type" value={record.programType} />
                  <FactRow
                    label="Also known as"
                    value={[record.fullTitle, record.short].filter(Boolean).join(" · ") || null}
                  />
                  <ChipRow label="Disease areas" items={record.areas} />
                </>
              ) : record.type === "bio" ? (
                <>
                  <FactRow label="Collection model" value={record.model} />
                  <ChipRow label="Specimen types" items={record.specimens} />
                  <ChipRow label="Assays and data types" items={record.assays} />
                  <FactRow label="Participants" value={record.population} />
                  <ChipRow label="Disease areas" items={record.areas} />
                </>
              ) : (
                <>
                  <FactRow label="Study type" value={subtype || null} />
                  <FactRow label="Intervention" value={record.intervention} />
                  <FactRow label="Study status" value={record.enrollment} />
                  <FactRow label="Eligibility" value={record.eligibility} />
                  <FactRow
                    label="Target enrollment"
                    value={
                      record.target
                        ? `${Number(record.target).toLocaleString("en-US")} participants across all study sites`
                        : null
                    }
                  />
                  {record.nct ? (
                    <div className="grid gap-1 border-b border-[#e4e1d8] py-3 sm:grid-cols-[160px_1fr]">
                      <dt className="text-[13px] font-medium text-[#555e6f]">Registry</dt>
                      <dd className="m-0">
                        <a
                          href={`https://clinicaltrials.gov/study/${record.nct}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[15px] font-medium text-[#010621] hover:underline"
                        >
                          {record.nct} on ClinicalTrials.gov
                        </a>
                      </dd>
                    </div>
                  ) : null}
                  <ChipRow label="Disease areas" items={record.areas} />
                </>
              )}
            </dl>
          </section>

          {isProg && record.patients ? (
            <section>
              <h2 className="font-display text-[28px] leading-[1.15] text-[#010621]" style={{ fontWeight: 400 }}>
                Patients
              </h2>
              {/* TODO(OCR): confirm "Rare cancers" label and privacy sign-off for aggregate counts. */}
              <dl className="mt-2">
                <FactRow
                  label="Profiled"
                  value={`${record.patients.total} patients, ${record.patients.years[0]?.[0]} to ${record.patients.years[record.patients.years.length - 1]?.[0]}`}
                />
                <FactRow
                  label="By year of enrollment"
                  value={record.patients.years.map(([y, n]) => `${y}: ${n}`).join(" · ")}
                />
                <ChipRow
                  label="Cancer types"
                  items={record.patients.types.map(([label, n]) =>
                    n > 1 ? `${label} · ${n}` : label,
                  )}
                />
              </dl>
              <p className="mt-3 text-sm text-[#555e6f]">
                Shown in aggregate. Individual patient records are not published.
              </p>
            </section>
          ) : null}

          <section>
            <h2 className="font-display text-[28px] leading-[1.15] text-[#010621]" style={{ fontWeight: 400 }}>
              People and partners
            </h2>
            <dl className="mt-2">
              <FactRow
                label={isProg ? "Lead" : "Lead investigator"}
                value={leadLine || null}
              />
              <FactRow
                label="Department"
                value={[record.dept, record.division].filter(Boolean).join(" · ") || null}
              />
              {isProg ? (
                <FactRow label="Partner departments" value={record.partnerDepts} />
              ) : null}
              <FactRow label="Sites" value={record.sites?.join("; ") || null} />
              <FactRow
                label="Collaborators"
                value={record.partners?.join("; ") || null}
              />
            </dl>
          </section>

          {isProg && record.id === "coprojects" ? (
            <>
              <RelatedGroup
                label="Active"
                items={coprojects.active.map((x) => {
                  const rec = x.rec ? getProject(x.rec) : undefined;
                  return {
                    name: rec?.name ?? x.title,
                    meta: `${x.theme} · ${x.kind}`,
                    status: "Active",
                    statusDot: "#010621",
                    href: rec ? `/portfolio/projects/${rec.id}` : undefined,
                    motifName: rec?.name ?? x.title,
                    motifTheme: rec?.theme ?? "Multi-disease",
                  };
                })}
                motifColor={motifColor}
              />
              <RelatedGroup
                label="Completed"
                items={coprojects.completed.map((x) => {
                  const rec = x.rec ? getProject(x.rec) : undefined;
                  return {
                    name: rec?.name ?? x.title,
                    meta: `${x.theme} · ${x.kind}`,
                    status: "Completed",
                    statusDot: "#b9b6ae",
                    // Completed co·projects without a full record are not links.
                    href: rec ? `/portfolio/projects/${rec.id}` : undefined,
                    motifName: rec?.name ?? x.title,
                    motifTheme: rec?.theme ?? "Multi-disease",
                  };
                })}
                motifColor={motifColor}
              />
            </>
          ) : null}

          {isProg && kids.length ? (
            <RelatedGroup
              label="Projects in this program"
              items={kids.map((p) => {
                const st = statusPresentation(p.status, themeAccent(p.theme).deep);
                return {
                  name: p.name,
                  meta: [projectKindLine(p), formatLead(p.lead, degrees)]
                    .filter(Boolean)
                    .join(" · "),
                  status: st.line,
                  statusDot: st.dot,
                  href: `/portfolio/projects/${p.id}`,
                  motifName: p.name,
                  motifTheme: p.theme,
                };
              })}
              motifColor={motifColor}
            />
          ) : null}

          {!isProg && sibs.length && parent ? (
            <RelatedGroup
              label={`Also in ${parent.name}`}
              items={sibs.map((p) => {
                const st = statusPresentation(p.status, themeAccent(p.theme).deep);
                return {
                  name: p.name,
                  meta: [projectKindLine(p), formatLead(p.lead, degrees)]
                    .filter(Boolean)
                    .join(" · "),
                  status: st.line,
                  statusDot: st.dot,
                  href: `/portfolio/projects/${p.id}`,
                  motifName: p.name,
                  motifTheme: p.theme,
                };
              })}
              motifColor={motifColor}
            />
          ) : null}
        </div>

        <aside className="space-y-5">
          <div className="rounded-[18px] border border-[#e4e1d8] bg-white p-5">
            <h3 className="font-display text-xl text-[#010621]" style={{ fontWeight: 400 }}>
              OCR's contribution
            </h3>
            <div className="mt-3">
              <StatusPill status={record.status} themeDeep={accent.deep} />
            </div>
            <p className="mt-3 text-[13px] leading-snug text-[#555e6f]">
              This is the status of OCR's support, not of the research itself.
            </p>
            {record.services?.length ? (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {record.services.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-[#e4e1d8] bg-[#f4f2ec] px-2.5 py-1 text-xs font-medium text-[#242d42]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            ) : (
              // TODO(OCR): five Hyde & Stanyan projects still have empty services lists.
              null
            )}
          </div>

          {parent ? (
            <div className="rounded-[18px] border border-[#e4e1d8] bg-white p-5">
              <div
                className="text-[#555e6f]"
                style={{
                  font: "500 11px/1.4 Inter, system-ui, sans-serif",
                  letterSpacing: ".18em",
                  textTransform: "uppercase",
                }}
              >
                Program
              </div>
              <Link
                to="/portfolio/programs/$id"
                params={{ id: parent.id }}
                className="mt-2 block font-display text-xl text-[#010621] no-underline hover:underline"
                style={{ fontWeight: 400 }}
              >
                {parent.title || parent.name}
              </Link>
              {parent.card ? (
                <p className="mt-2 text-sm leading-snug text-[#555e6f]">{parent.card}</p>
              ) : null}
            </div>
          ) : null}

          {isProg && record.ocrTeam?.length ? (
            <div className="rounded-[18px] border border-[#e4e1d8] bg-white p-5">
              {/* TODO(OCR): Interstitial Lung Disease lists OCR team the same way active programs do. */}
              <h3 className="font-display text-xl text-[#010621]" style={{ fontWeight: 400 }}>
                OCR team
              </h3>
              <ul className="mt-4 space-y-3">
                {record.ocrTeam.map((key) => {
                  const photo = staffPhotoUrl(key);
                  const initials = key
                    .split(",")[0]!
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2);
                  return (
                    <li key={key} className="flex items-center gap-3">
                      {photo ? (
                        <img
                          src={photo}
                          alt=""
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      ) : (
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f2eee6] text-xs font-medium text-[#010621]">
                          {initials}
                        </span>
                      )}
                      <div>
                        <div className="text-sm font-medium text-[#010621]">{key}</div>
                        <div className="text-[13px] text-[#555e6f]">
                          {staff[key] || "OCR staff"}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}

          {(record.funding || (!isProg && record.origin) || (!isProg && record.fundingUrl)) ? (
            <div className="rounded-[18px] border border-[#e4e1d8] bg-white p-5">
              <h3 className="font-display text-xl text-[#010621]" style={{ fontWeight: 400 }}>
                Funding
              </h3>
              <dl className="mt-2">
                <FactRow label="Source" value={record.funding} />
                {!isProg ? <FactRow label="Study origin" value={record.origin} /> : null}
                {!isProg && record.fundingUrl ? (
                  <div className="grid gap-1 border-b border-[#e4e1d8] py-3 sm:grid-cols-[160px_1fr]">
                    <dt className="text-[13px] font-medium text-[#555e6f]">Award record</dt>
                    <dd className="m-0">
                      <a
                        href={record.fundingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[15px] font-medium text-[#010621] hover:underline"
                      >
                        {/reporter\.nih/.test(record.fundingUrl)
                          ? "NIH RePORTER"
                          : hostOf(record.fundingUrl)}
                      </a>
                    </dd>
                  </div>
                ) : null}
              </dl>
            </div>
          ) : null}

          {(isProg && record.id === "coprojects") || (!isProg && record.inDL) ? (
            <a
              href="https://datalibrary.ucsf.edu/"
              target="_blank"
              rel="noreferrer"
              className="block rounded-[18px] border border-[#e4e1d8] bg-white p-5 no-underline hover:border-[#010621]"
            >
              {/* TODO(OCR): Data Library statement on ImmunoX co·projects was not checked project by project. */}
              <div className="font-medium text-[#010621]">UCSF Data Library</div>
              <p className="mt-2 text-sm leading-snug text-[#555e6f]">
                {isProg
                  ? "ImmunoX co·projects data is available through the UCSF Data Library."
                  : "Data from this project is in the UCSF Data Library."}
              </p>
            </a>
          ) : null}

          {!isProg && record.open && record.status !== "Closed" ? (
            <div className="rounded-[18px] border border-[#010621] bg-white p-5">
              {/* TODO(OCR): "Open to sample requests" / "Recruiting" pill on cards is switched off; detail box remains. */}
              <div className="font-medium text-[#010621]">
                Open to collaborators and sample requests
              </div>
            </div>
          ) : null}

          {record.url ? (
            <a
              href={record.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[#010621] hover:underline"
            >
              {hostOf(record.url)} <span aria-hidden>↗</span>
            </a>
          ) : null}

          <Link
            to="/portfolio"
            search={isProg ? undefined : { view: "projects" }}
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[#555e6f] hover:text-[#010621]"
          >
            ← {isProg ? "All programs" : "All projects"}
          </Link>
        </aside>
      </div>
    </div>
  );
}

function RelatedGroup({
  label,
  items,
  motifColor,
}: {
  label: string;
  items: {
    name: string;
    meta: string;
    status?: string;
    statusDot?: string;
    href?: string;
    motifName: string;
    motifTheme: string;
  }[];
  motifColor: string;
}) {
  if (!items.length) return null;
  return (
    <section>
      <h2 className="font-display text-[28px] leading-[1.15] text-[#010621]" style={{ fontWeight: 400 }}>
        {label}
        <span className="ml-2 text-[15px] font-sans font-medium text-[#555e6f]">
          {items.length}
        </span>
      </h2>
      <div className="mt-4 space-y-2.5">
        {items.map((it) => (
          <RelatedRow key={it.name + (it.href ?? "")} {...it} motifColor={motifColor} />
        ))}
      </div>
    </section>
  );
}
