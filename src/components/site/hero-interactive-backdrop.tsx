import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type GlowPos = { x: number; y: number };

type HeroGlowContextValue = {
  pos: GlowPos;
  active: boolean;
  enabled: boolean;
};

const HeroGlowContext = createContext<HeroGlowContextValue>({
  pos: { x: 0, y: 0 },
  active: false,
  enabled: false,
});

export function HeroInteractiveBackdrop({ children }: { children: ReactNode }) {
  const [pos, setPos] = useState<GlowPos>({ x: 0, y: 0 });
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const rafRef = useRef<number | null>(null);
  const pendingRef = useRef<GlowPos | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    setEnabled(!reduced && !coarse);
  }, []);

  const flushPosition = () => {
    if (pendingRef.current) {
      setPos(pendingRef.current);
      pendingRef.current = null;
    }
    rafRef.current = null;
  };

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    pendingRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setActive(true);
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(flushPosition);
    }
  };

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <HeroGlowContext.Provider value={{ pos, active, enabled }}>
      <div
        className="relative overflow-hidden"
        onMouseMove={handleMove}
        onMouseLeave={() => setActive(false)}
      >
        {children}
      </div>
    </HeroGlowContext.Provider>
  );
}

export function HeroMouseGlow() {
  const { pos, active, enabled } = useContext(HeroGlowContext);
  if (!enabled) return null;

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute z-[3] h-56 w-56 md:h-64 md:w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-opacity duration-500 ease-out"
        style={{
          left: pos.x,
          top: pos.y,
          opacity: active ? 0.28 : 0,
          background: "var(--gradient-sunburst)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute z-[3] h-44 w-44 md:h-52 md:w-52 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[72px] transition-opacity duration-500 ease-out"
        style={{
          left: pos.x + 20,
          top: pos.y - 12,
          opacity: active ? 0.2 : 0,
          background:
            "radial-gradient(circle, oklch(0.62 0.24 340 / 0.55), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[3] transition-opacity duration-500"
        style={{
          opacity: active ? 0.65 : 0,
          background: `radial-gradient(260px circle at ${pos.x}px ${pos.y}px, oklch(0.7 0.2 30 / 0.14), oklch(0.62 0.24 340 / 0.07) 40%, transparent 72%)`,
        }}
      />
    </>
  );
}
