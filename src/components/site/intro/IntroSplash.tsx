/**
 * Homepage intro splash ("Concurrence"). Timeline math lives in splash-engine.ts.
 *
 * The head script sets <html data-intro="play|skip"> before first paint.
 * styles.css hides the overlay for skip and the header lockup for play.
 * Mounted only from the home hero; the frame loop never runs during SSR.
 */
import { useEffect, useRef } from "react";
import {
  computeFrame,
  measureGeometry,
  REDUCED_MOTION_TIME,
  STAGE_BG,
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

function RayLines() {
  return Array.from({ length: 32 }, (_, j) => <line key={j} strokeLinecap="round" opacity="0" />);
}

export function IntroSplash() {
  const overlay = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const disc = useRef<SVGCircleElement>(null);
  const ivoryG = useRef<SVGGElement>(null);
  const colorG = useRef<SVGGElement>(null);
  const word = useRef<HTMLDivElement>(null);
  const skipBtn = useRef<HTMLButtonElement>(null);
  const skipAction = useRef<() => void>(() => {});

  useEffect(() => {
    const root = document.documentElement;
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      seen = false;
    }
    // The head script decides on a full load. sessionStorage covers a return
    // to / in the same session after the intro has already finished.
    if (root.dataset.intro !== "play" || seen) {
      if (seen) root.dataset.intro = "skip";
      return;
    }

    const o = overlay.current!;
    const lockup = document.querySelector<HTMLElement>("[data-intro-header-lockup]");
    const headerLogo = document.querySelector<HTMLElement>("[data-intro-header-logo]");
    const headerText = document.querySelector<HTMLElement>("[data-intro-header-text]");
    const hero = document.querySelector<HTMLElement>("[data-intro-hero]");
    if (!lockup || !headerLogo || !headerText) {
      o.style.display = "none";
      root.dataset.intro = "skip";
      return;
    }
    const ivory = Array.from(ivoryG.current!.children) as SVGLineElement[];
    const color = Array.from(colorG.current!.children) as SVGLineElement[];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let g: Geometry;
    let raf = 0;
    let cancelled = false;
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
    const locked: HTMLElement[] = [];
    const setLocked = (on: boolean) => {
      if (!on) {
        for (const el of locked) el.inert = false;
        locked.length = 0;
        return;
      }
      const shell = document.querySelector<HTMLElement>("[data-site-shell]");
      if (!shell) return;
      let node: HTMLElement | null = o;
      while (node && node.parentElement && node.parentElement !== shell) {
        const parent: HTMLElement = node.parentElement;
        for (const child of Array.from(parent.children)) {
          if (child !== node && child instanceof HTMLElement && !locked.includes(child)) {
            child.inert = true;
            locked.push(child);
          }
        }
        node = parent;
      }
      for (const child of Array.from(shell.children)) {
        if (child instanceof HTMLElement && !child.contains(o) && !locked.includes(child)) {
          child.inert = true;
          locked.push(child);
        }
      }
    };
    setLocked(true);
    if (hero && !reduced) hero.style.transform = "translateY(18px)";

    const measure = () => {
      g = measureGeometry(
        word.current!,
        headerLogo.getBoundingClientRect(),
        headerText.getBoundingClientRect(),
      );
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
      sk.style.color = f.stageVisible ? "rgba(242,239,232,0.92)" : "var(--ink)";
      if (skipState === "hidden" && f.skipVisible) {
        skipState = "shown";
        sk.style.opacity = "1";
        sk.style.visibility = "visible";
        sk.tabIndex = 0;
        sk.removeAttribute("aria-hidden");
      } else if (skipState === "shown" && !f.skipVisible) {
        skipState = "done";
        sk.style.opacity = "0";
        sk.style.visibility = "hidden";
        sk.tabIndex = -1;
        sk.setAttribute("aria-hidden", "true");
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
      setLocked(false);
      // Drop the play gate so the header lockup CSS and the scroll lock release,
      // and a client-side return to / does not replay or flash the stage.
      root.dataset.intro = "skip";
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* private mode: play every time */
      }
    };

    const tick = (now: number) => {
      if (cancelled || finished) return;
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
      if (cancelled || started || finished) return;
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
      if (!started || finished) return;
      if (reduced) {
        finish();
        return;
      }
      scaleTarget = SKIP_TIME_SCALE;
      if (skipState === "shown") {
        skipState = "done";
        const sk = skipBtn.current!;
        sk.style.opacity = "0";
        sk.style.visibility = "hidden";
        sk.tabIndex = -1;
        sk.setAttribute("aria-hidden", "true");
      }
    };
    skipAction.current = skip;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        skip();
      }
    };
    const onResize = () => {
      if (started && !finished) measure();
    };
    o.addEventListener("click", skip);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      o.removeEventListener("click", skip);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = prevOverflow;
      setLocked(false);
      if (!finished) root.dataset.intro = "skip";
    };
  }, []);

  return (
    <div
      ref={overlay}
      data-intro-overlay
      role="dialog"
      aria-modal="true"
      aria-label="Introduction"
      className="fixed inset-0 z-[100] overflow-hidden"
      style={{ background: STAGE_BG }}
    >
      <div
        ref={glow}
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 h-[260px] w-[260px] rounded-full opacity-0 will-change-[transform,opacity]"
        style={{
          margin: "-130px 0 0 -130px",
          background: "radial-gradient(circle, rgba(242,239,232,0.9) 0%, rgba(242,239,232,0) 62%)",
        }}
      />
      <svg aria-hidden className="absolute inset-0 block h-full w-full overflow-visible">
        <circle ref={disc} cx="0" cy="0" r="0" fill="var(--cream)" />
        <g ref={ivoryG}>
          <RayLines />
        </g>
        <g ref={colorG}>
          <RayLines />
        </g>
      </svg>
      <div
        ref={word}
        aria-hidden
        className="absolute top-0 left-0 origin-top-left font-display text-[26px] leading-tight whitespace-nowrap text-ink opacity-0 will-change-[transform,opacity]"
        style={{ fontVariationSettings: '"opsz" 15' }}
      >
        Office of
        <br />
        Collaborative Research
      </div>
      <button
        ref={skipBtn}
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={(event) => {
          event.stopPropagation();
          skipAction.current();
        }}
        className="absolute right-4 bottom-4 min-h-11 cursor-pointer rounded-full border border-current/25 bg-white/15 px-4 text-[13px] leading-none font-medium tracking-[0.14em] uppercase opacity-0 backdrop-blur-sm transition-[opacity,color] duration-300"
        style={{ visibility: "hidden" }}
      >
        Skip intro
      </button>
    </div>
  );
}
