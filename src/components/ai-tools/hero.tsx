import { GradientBlob } from "@/components/research-development/hero";
import { Arrow, pillOutlineOnDark, pillWhite } from "@/components/research-development/primitives";
import { ArmEyebrow } from "@/components/site/service-family";
import { applicationsIntro, apps, hero, statusLine, type AppRecord } from "@/data/ai-tools";
import { MarkDisc } from "./app-mark";
import { onButtonKey, useShowApp } from "./lib";

export function Hero() {
  return (
    <section
      id="top"
      data-tone="dark"
      className="relative isolate overflow-hidden bg-ink text-white"
    >
      <GradientBlob className="ai-drift -top-[260px] -right-[140px]" />
      <div className="mx-auto max-w-7xl px-6 pt-[clamp(40px,5vw,64px)] pb-[clamp(48px,6vw,72px)]">
        <ArmEyebrow
          arm={hero.eyebrowArm}
          label={hero.eyebrowLabel}
          accent="var(--gold)"
          tone="dark"
        />
        <h1 className="mt-6 max-w-[880px] font-display text-[clamp(40px,5vw,60px)] font-medium leading-[1.04] tracking-[-0.02em] text-white text-pretty">
          {hero.title} <span className="text-gold">{hero.titleAccent}</span>
        </h1>
        <p className="mt-6 max-w-[640px] text-[clamp(16px,1.4vw,19px)] leading-[1.55] text-ondark-muted text-pretty">
          {hero.intro}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={hero.primary.href} className={pillWhite}>
            {hero.primary.label} <Arrow>↓</Arrow>
          </a>
          <a href={hero.secondary.href} className={pillOutlineOnDark}>
            {hero.secondary.label}
          </a>
          <a
            href={hero.tertiary.href}
            className="inline-flex items-center gap-2 rounded-sm px-1.5 py-[11px] text-sm font-medium text-gold underline-offset-[3px] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {hero.tertiary.label} <Arrow />
          </a>
        </div>

        <div className="mt-[clamp(40px,5vw,64px)] border-t border-white/18">
          {apps.map((a) => (
            <IndexRow key={a.key} app={a} />
          ))}
        </div>
      </div>
    </section>
  );
}

/** One tool per row; the whole row opens its drawer. Status + arrow wrap together. */
function IndexRow({ app }: { app: AppRecord }) {
  const show = useShowApp();
  return (
    <div
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      aria-label={applicationsIntro.openDetails(app.name)}
      onClick={(e) => show(app.key, e.currentTarget)}
      onKeyDown={onButtonKey((el) => show(app.key, el))}
      className="-mx-2 flex cursor-pointer flex-wrap items-center gap-x-6 gap-y-4 rounded-xl border-b border-white/10 px-2 py-[18px] transition-colors duration-300 hover:bg-white/6 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white"
    >
      <span className="w-9 flex-none font-display text-lg text-white/50">{app.n}</span>
      <MarkDisc app={app} />
      <span className="flex-[0_1_200px] font-display text-[26px] leading-none text-white">
        {app.name}
      </span>
      <span className="min-w-0 flex-[1_1_160px] text-[15px] text-ondark-muted">{app.role}</span>
      <span className="ml-auto flex flex-[0_1_auto] items-center gap-4 text-white/60">
        <span className="font-mono text-xs">{statusLine(app)}</span>
        <Arrow />
      </span>
    </div>
  );
}
