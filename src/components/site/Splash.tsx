import { useEffect, useRef, useState } from "react";

/**
 * Cinematic intro splash. Canvas particle cloud forms an animated
 * sunburst halo; headline reveals; user can skip. Shown once per session.
 */
export function Splash() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("ocr-splash-seen")) return;
    setVisible(true);
    sessionStorage.setItem("ocr-splash-seen", "1");
  }, []);

  useEffect(() => {
    if (!visible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
    };
    resize();
    window.addEventListener("resize", resize);

    const palette = [
      "#ff7a59", // coral
      "#5fc7c2", // teal
      "#e84b8a", // magenta
      "#f0c050", // gold
      "#a78bfa", // violet
      "#ffffff",
    ];

    type P = { a: number; r: number; s: number; v: number; c: string; size: number };
    const count = Math.min(900, Math.floor((window.innerWidth * window.innerHeight) / 2400));
    const particles: P[] = Array.from({ length: count }, () => ({
      a: Math.random() * Math.PI * 2,
      r: 60 + Math.random() * 340,
      s: 0.0006 + Math.random() * 0.0022,
      v: Math.random() * Math.PI * 2,
      c: palette[Math.floor(Math.random() * palette.length)],
      size: Math.random() * 1.6 + 0.3,
    }));

    let t0 = performance.now();
    const tick = (now: number) => {
      const elapsed = (now - t0) / 1000;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      // Fading trail for depth
      ctx.fillStyle = "rgba(10, 12, 24, 0.18)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.a += p.s;
        const wob = Math.sin(elapsed * 0.6 + p.v) * 14;
        const r = (p.r + wob) * dpr;
        const x = cx + Math.cos(p.a) * r;
        const y = cy + Math.sin(p.a) * r * 0.78; // slight ellipse
        ctx.beginPath();
        ctx.fillStyle = p.c;
        ctx.globalAlpha = 0.55 + Math.sin(elapsed * 0.8 + p.v) * 0.25;
        ctx.arc(x, y, p.size * dpr, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    const autoDismiss = window.setTimeout(() => dismiss(), 4200);

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.clearTimeout(autoDismiss);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const dismiss = () => {
    setLeaving(true);
    window.setTimeout(() => setVisible(false), 700);
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#0a0c18] text-white transition-opacity duration-700 ${
        leaving ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      role="dialog"
      aria-label="Intro"
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0c18_75%)]" />

      <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-[11px] tracking-[0.25em] uppercase opacity-80">
        <div className="flex items-center gap-3">
          <span>OCR</span>
          <span className="w-10 h-px bg-white/40" />
          <span className="hidden sm:inline">Office of Collaborative Research · UCSF</span>
        </div>
        <button
          onClick={dismiss}
          className="rounded-full border border-white/30 px-4 py-1.5 hover:bg-white/10 transition tracking-[0.2em]"
        >
          Enter →
        </button>
      </div>

      <div className="absolute bottom-12 left-6 right-6 md:left-16 md:bottom-20 max-w-3xl">
        <div className="text-[11px] tracking-[0.3em] uppercase opacity-70 animate-[fade-in_0.6s_ease-out_0.2s_both]">
          I. The premise
        </div>
        <h1 className="mt-4 font-display text-4xl md:text-6xl lg:text-7xl leading-[1.02] animate-[fade-in_0.9s_ease-out_0.5s_both]">
          Where great science <em className="italic font-normal opacity-90">finds great partners.</em>
        </h1>
        <p className="mt-5 text-sm md:text-base text-white/70 max-w-md leading-relaxed animate-[fade-in_0.9s_ease-out_0.9s_both]">
          The strategic hub of ImmunoX and the Parnassus Institutes at UCSF —
          accelerating grants, projects, and the people who power them.
        </p>
      </div>
    </div>
  );
}
