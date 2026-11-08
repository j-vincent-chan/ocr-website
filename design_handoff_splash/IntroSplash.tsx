/**
 * Reference implementation of the OCR intro splash for src/routes/index.tsx.
 * Adapt to the repo's conventions; the timeline math lives in splash-engine.ts and should not change.
 *
 * Integration (see README § Integration):
 *  - __root.tsx head: inline script sets <html data-intro="play|skip"> before first paint.
 *  - styles.css: html[data-intro="skip"] [data-intro-overlay] { display: none }
 *                html[data-intro="play"] [data-intro-header-lockup] { opacity: 0 }
 *  - chrome.tsx: data-intro-header-lockup on the header <Link to="/">, data-intro-header-logo on its SunburstLogo,
 *                data-intro-header-text on its wordmark <span>.
 *  - index.tsx: data-intro-hero on the hero's content container; render <IntroSplash /> inside <Hero /> (any position; it is fixed).
 */
import { useEffect, useRef } from "react";
import {
  computeFrame,
  measureGeometry,
  REDUCED_MOTION_TIME,
  STAGE_BG,
  T,
  type Frame,
  type Geometry,
  type Segment,
} from "./splash-engine";

const SESSION_KEY = "ocr-intro-seen";
const SKIP_TIME_SCALE = 4.5;

function applySegment(el: SVGLineElement, s: Segment | null) {
  if (!s) {
    if (el.getAttribute("opacity") !== "0") el.setAttribute("opacity", "0");
    return;
  }
  el.setAttribute("x1", s.x1.toFixed(2));
  el.setAttribute("y1", s.y1.toFixed(2));
  el.setAttribute("x2", s.x2.toFixed(2));
  el.setAttribute("y2", s.y2.toFixed(2));
  el.setAttribute("stroke-width", s.width.toFixed(2));
  el.setAttribute("opacity", Math.min(1, s.opacity).toFixed(3));
  if (el.getAttribute("stroke") !== s.color) el.setAttribute("stroke", s.color);
}

export function IntroSplash() {
  const overlay = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const disc = useRef<SVGCircleElement>(null);
  const ivoryG = useRef<SVGGElement>(null);
  const colorG = useRef<SVGGElement>(null);
  const word = useRef<HTMLDivElement>(null);
  const skipBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // The inline head script already decided; bail out quietly when the overlay is hidden.
    if (document.documentElement.dataset.intro !== "play") return;

    const o = overlay.current!;
    const lockup = document.querySelector<HTMLElement>("[data-intro-header-lockup]");
    const headerLogo = document.querySelector<HTMLElement>("[data-intro-header-logo]");
    const headerText = document.querySelector<HTMLElement>("[data-intro-header-text]");
    const hero = document.querySelector<HTMLElement>("[data-intro-hero]");
    if (!lockup || !headerLogo || !headerText) {
      o.style.display = "none";
      return;
    }
    const ivory = Array.from(ivoryG.current!.children) as SVGLineElement[];
    const color = Array.from(colorG.current!.children) as SVGLineElement[];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let g: Geometry;
    let raf = 0;
    let t = 0;
    let scale = 1;
    let scaleTarget = 1;
    let last = 0;
    let finished = false;
    let started = false;
    let skipState: "hidden" | "shown" | "done" = "hidden";
    const timers: number[] = [];
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (hero && !reduced) hero.style.transform = "translateY(18px)";

    const measure = () => {
      g = measureGeometry(word.current!, headerLogo.getBoundingClientRect(), headerText.getBoundingClientRect());
    };

    const paint = (f: Frame) => {
      for (let j = 0; j < 32; j++) {
        applySegment(ivory[j], f.ivory[j]);
        applySegment(color[j], f.color[j]);
      }
      const d = disc.current!;
      d.setAttribute("cx", f.disc.cx.toFixed(1));
      d.setAttribute("cy", f.disc.cy.toFixed(1));
      d.setAttribute("r", f.disc.r.toFixed(1));
      d.setAttribute("opacity", f.disc.opacity.toFixed(3));
      o.style.background = f.stageVisible ? STAGE_BG : "transparent";
      const gl = glow.current!;
      gl.style.opacity = f.glow.opacity.toFixed(3);
      gl.style.transform = `translate(${f.glow.x.toFixed(1)}px,${f.glow.y.toFixed(1)}px) scale(${f.glow.scale.toFixed(3)})`;
      const w = word.current!;
      w.style.opacity = f.word.opacity.toFixed(3);
      w.style.transform = `translate(${f.word.tx.toFixed(2)}px,${f.word.ty.toFixed(2)}px) scale(${f.word.k.toFixed(4)})`;
      if (hero && !reduced) hero.style.transform = `translateY(${f.heroShift.toFixed(2)}px)`;
      const sk = skipBtn.current!;
      sk.style.color = f.stageVisible ? "rgba(242,239,232,0.6)" : "color-mix(in oklch, var(--ink) 50%, transparent)";
      if (skipState === "hidden" && f.skipVisible) {
        skipState = "shown";
        sk.style.opacity = "1";
      } else if (skipState === "shown" && !f.skipVisible) {
        skipState = "done";
        sk.style.opacity = "0";
      }
    };

    const finish = () => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      o.style.display = "none";
      lockup.style.opacity = "1";
      if (hero) hero.style.transform = "";
      document.body.style.overflow = prevOverflow;
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* private mode: play every time */
      }
    };

    const tick = (now: number) => {
      if (finished) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      scale += (scaleTarget - scale) * Math.min(1, dt * 10);
      t += dt * scale;
      const f = computeFrame(t, g);
      paint(f);
      if (f.done) finish();
      else raf = requestAnimationFrame(tick);
    };

    const runReduced = () => {
      // Static logo + wordmark on cream, fade in, hold, fade out. No movement.
      const svg = disc.current!.ownerSVGElement!;
      const w = word.current!;
      o.style.background = "var(--cream)";
      paint(computeFrame(REDUCED_MOTION_TIME, g));
      svg.style.opacity = "0";
      w.style.opacity = "0";
      timers.push(
        window.setTimeout(() => {
          svg.style.transition = "opacity .6s ease";
          w.style.transition = "opacity .6s ease";
          svg.style.opacity = "1";
          w.style.opacity = "1";
        }, 60),
        window.setTimeout(() => {
          lockup.style.opacity = "1";
          o.style.transition = "opacity .5s ease";
          o.style.opacity = "0";
        }, 1800),
        window.setTimeout(finish, 2350),
      );
    };

    const start = () => {
      if (started || finished) return;
      started = true;
      measure();
      if (reduced) runReduced();
      else {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    // Wait for Fraunces so the wordmark measures at its final metrics; never wait more than 1.2s.
    Promise.all([document.fonts.load("26px Fraunces"), document.fonts.load("15px Fraunces")])
      .then(() => document.fonts.ready)
      .then(start, start);
    timers.push(window.setTimeout(start, 1200));

    const skip = () => {
      if (!started || finished || reduced) return;
      scaleTarget = SKIP_TIME_SCALE;
      if (skipState === "shown") {
        skipState = "done";
        skipBtn.current!.style.opacity = "0";
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") skip();
    };
    const onResize = () => {
      if (started && !finished) measure();
    };
    o.addEventListener("click", skip);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      o.removeEventListener("click", skip);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  const lines = Array.from({ length: 32 }, (_, j) => (
    <line key={j} strokeLinecap="round" opacity="0" />
  ));

  return (
    <div
      ref={overlay}
      data-intro-overlay
      className="fixed inset-0 z-[100] overflow-hidden"
      style={{ background: STAGE_BG }}
    >
      <div
        ref={glow}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-[260px] w-[260px] rounded-full opacity-0 will-change-[transform,opacity]"
        style={{
          margin: "-130px 0 0 -130px",
          background: "radial-gradient(circle, rgba(242,239,232,0.9) 0%, rgba(242,239,232,0) 62%)",
        }}
      />
      <svg aria-hidden className="absolute inset-0 block h-full w-full overflow-visible">
        <circle ref={disc} cx="0" cy="0" r="0" fill="var(--cream)" />
        <g ref={ivoryG}>{lines}</g>
        <g ref={colorG}>{lines}</g>
      </svg>
      <div
        ref={word}
        aria-hidden
        className="absolute left-0 top-0 origin-top-left whitespace-nowrap font-display text-[26px] leading-tight text-ink opacity-0 will-change-[transform,opacity]"
        style={{ fontVariationSettings: '"opsz" 15' }}
      >
        Office of
        <br />
        Collaborative Research
      </div>
      <button
        ref={skipBtn}
        type="button"
        className="absolute bottom-[18px] right-5 cursor-pointer border-0 bg-transparent p-2.5 text-[11px] font-medium uppercase leading-none tracking-[0.22em] opacity-0 transition-[opacity,color] duration-300"
        style={{ color: "rgba(242,239,232,0.6)" }}
      >
        Skip intro
      </button>
    </div>
  );
}
