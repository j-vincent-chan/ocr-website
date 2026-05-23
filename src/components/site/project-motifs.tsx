import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ProjectMotifKey =
  | "rings"
  | "dotsphere"
  | "polesphere"
  | "dotsquare"
  | "helix"
  | "polepole"
  | "fullhoop"
  | "polesquare";

type MotifProps = {
  className?: string;
};

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function MotifShell({
  variant,
  className,
  children,
}: {
  variant: ProjectMotifKey;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("project-motif project-motif-fill", `project-motif--${variant}`, className)} aria-hidden>
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" className="project-motif-svg" role="presentation">
        {children}
      </svg>
    </div>
  );
}

/** Osteon cross-sections — concentric lamellae + Haversian canal (compact bone) */
function Osteon({
  cx,
  cy,
  r,
  id,
}: {
  cx: number;
  cy: number;
  r: number;
  id: string;
}) {
  const lamellae = [1, 0.78, 0.56, 0.36, 0.18];
  return (
    <g key={id}>
      {lamellae.map((scale, i) => (
        <circle
          key={`${id}-l-${i}`}
          cx={cx}
          cy={cy}
          r={r * scale}
          className={`pm-ring pm-ring-${i % 5}`}
          {...stroke}
          strokeWidth={0.5 + i * 0.06}
          opacity={0.2 + i * 0.1}
        />
      ))}
      <circle cx={cx} cy={cy} r={r * 0.09} fill="currentColor" className="pm-core" opacity={0.95} />
      <line
        x1={cx}
        y1={cy - r * 0.12}
        x2={cx}
        y2={cy + r * 0.12}
        className="pm-spoke"
        {...stroke}
        strokeWidth={0.55}
        opacity={0.5}
      />
      <line
        x1={cx - r * 0.08}
        y1={cy}
        x2={cx + r * 0.08}
        y2={cy}
        className="pm-spoke"
        {...stroke}
        strokeWidth={0.45}
        opacity={0.35}
      />
    </g>
  );
}

function RingsMotif({ className }: MotifProps) {
  return (
    <MotifShell variant="rings" className={className}>
      <Osteon cx={50} cy={50} r={22} id="primary" />
      <Osteon cx={24} cy={30} r={11} id="sat-a" />
      <Osteon cx={76} cy={32} r={10} id="sat-b" />
      <Osteon cx={28} cy={72} r={9} id="sat-c" />
      <Osteon cx={74} cy={70} r={10} id="sat-d" />
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const a = (i / 6) * Math.PI * 2;
        const orbit = 38;
        return (
          <g
            key={`orbit-${i}`}
            className="pm-orbit-node"
            style={{ transformOrigin: "50px 50px", transform: `rotate(${i * 60}deg)` }}
          >
            <circle cx={50 + orbit} cy="50" r={1.1} fill="currentColor" className={`pm-node pm-node-${i}`} />
          </g>
        );
      })}
    </MotifShell>
  );
}

/** Collagen fibril sphere — helical wrap + surface mineral platelets */
function DotsphereMotif({ className }: MotifProps) {
  const nodes = Array.from({ length: 40 }, (_, i) => {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / 40);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const r = 34;
    return {
      cx: 50 + r * Math.sin(phi) * Math.cos(theta),
      cy: 50 + r * Math.sin(phi) * Math.sin(theta),
      i,
    };
  });
  return (
    <MotifShell variant="dotsphere" className={className}>
      <ellipse cx="50" cy="50" rx="38" ry="36" className="pm-hull" {...stroke} strokeWidth={0.65} opacity={0.32} />
      {Array.from({ length: 8 }).map((_, i) => (
        <path
          key={`helix-wrap-${i}`}
          d={`M50 14 Q${50 + 28 * Math.cos(i * 0.9)} ${50 + 12 * Math.sin(i)} ${50 + 26 * Math.cos(i * 0.9 + 1.2)} ${50 + 26 * Math.sin(i + 0.8)} T50 86`}
          className="pm-meridian"
          {...stroke}
          strokeWidth={0.45}
          opacity={0.22}
        />
      ))}
      <g className="pm-longitude-rotate" style={{ transformOrigin: "50px 50px" }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <ellipse
            key={`fibril-${i}`}
            cx="50"
            cy="50"
            rx={8}
            ry={36}
            className="pm-longitude"
            {...stroke}
            strokeWidth={0.4}
            opacity={0.16}
            transform={`rotate(${(i * 150) / 12} 50 50)`}
          />
        ))}
      </g>
      {nodes.map(({ cx, cy, i }) => (
        <rect
          key={i}
          x={cx - 1.2}
          y={cy - 0.7}
          width={2.4}
          height={1.4}
          rx={0.3}
          fill="currentColor"
          className={`pm-lattice-node pm-lattice-node-${i % 12}`}
          opacity={0.75}
          transform={`rotate(${(i * 37) % 60} ${cx} ${cy})`}
        />
      ))}
      <circle cx="50" cy="50" r="2.2" fill="currentColor" className="pm-core" opacity={0.8} />
    </MotifShell>
  );
}

/** Bamboo vascular bundle — radial matrix + graded vessel pores */
function PolesphereMotif({ className }: MotifProps) {
  const bundles = [
    { cx: 38, cy: 42, r: 5.5 },
    { cx: 62, cy: 44, r: 5 },
  ];
  return (
    <MotifShell variant="polesphere" className={className}>
      <circle cx="50" cy="50" r="38" className="pm-hull pm-breathe" {...stroke} strokeWidth={0.7} opacity={0.35} />
      <path
        d="M50 12 A38 38 0 0 1 88 50 A38 38 0 0 1 50 88 A38 38 0 0 1 12 50 A38 38 0 0 1 50 12"
        className="pm-inner-ring"
        {...stroke}
        strokeWidth={0.5}
        opacity={0.25}
        strokeDasharray="3 5"
      />
      <g className="pm-radial-rotate" style={{ transformOrigin: "50px 50px" }}>
        {Array.from({ length: 32 }).map((_, i) => {
          const a = (i / 32) * Math.PI * 2;
          return (
            <line
              key={i}
              x1="50"
              y1="50"
              x2={50 + Math.cos(a) * 36}
              y2={50 + Math.sin(a) * 36}
              className={`pm-ray pm-ray-${i % 6}`}
              {...stroke}
              strokeWidth={0.42}
              opacity={0.28}
            />
          );
        })}
      </g>
      {bundles.map(({ cx, cy, r }, i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r={r} fill="currentColor" opacity={0.12} className="pm-core" />
          <circle cx={cx} cy={cy} r={r} className="pm-orbit-dot" {...stroke} strokeWidth={0.55} opacity={0.45} />
        </g>
      ))}
      {Array.from({ length: 48 }).map((_, i) => {
        const t = i / 48;
        const a = t * Math.PI * 2.4 + 0.3;
        const r = 14 + t * 24;
        return (
          <circle
            key={i}
            cx={50 + Math.cos(a) * r}
            cy={50 + Math.sin(a) * r * 0.92}
            r={0.85 + (i % 3) * 0.15}
            fill="currentColor"
            className={`pm-orbit-dot pm-orbit-dot-${i % 8}`}
            opacity={0.35 + t * 0.45}
          />
        );
      })}
    </MotifShell>
  );
}

/** HA nanocrystal stagger grid on fibril cross-section */
function DotsquareMotif({ className }: MotifProps) {
  const rows = 8;
  const cols = 8;
  const platelets: { x: number; y: number; ri: number; ci: number }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const offset = r % 2 === 0 ? 0 : 4;
      platelets.push({
        x: 18 + c * 8 + offset,
        y: 18 + r * 8,
        ri: r,
        ci: c,
      });
    }
  }
  return (
    <MotifShell variant="dotsquare" className={className}>
      <rect x="14" y="14" width="72" height="72" rx="3" className="pm-frame" {...stroke} strokeWidth={0.6} opacity={0.35} />
      {Array.from({ length: 14 }).map((_, i) => (
        <line
          key={`fibril-${i}`}
          x1={16 + i * 5}
          y1="16"
          x2={16 + i * 5}
          y2="84"
          className="pm-grid-line"
          {...stroke}
          strokeWidth={0.35}
          opacity={0.14}
        />
      ))}
      {platelets.map(({ x, y, ri, ci }) => (
        <rect
          key={`${ri}-${ci}`}
          x={x}
          y={y}
          width={3.2}
          height={2}
          rx={0.35}
          fill="currentColor"
          className="pm-grid-node"
          opacity={0.7}
          style={{ animationDelay: `${(ri + ci) * 0.16}s` }}
        />
      ))}
    </MotifShell>
  );
}

/** Tropocollagen triple helix */
function HelixMotif({ className }: MotifProps) {
  const steps = 32;
  const strands = [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3];
  const buildPath = (phase: number) =>
    Array.from({ length: steps }, (_, i) => {
      const t = i / (steps - 1);
      const y = 8 + t * 84;
      const x = 50 + Math.sin(t * Math.PI * 4 + phase) * 22;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(" ");

  return (
    <MotifShell variant="helix" className={className}>
      {strands.map((phase, si) => (
        <path
          key={si}
          d={buildPath(phase)}
          className={`pm-helix-strand ${si === 1 ? "pm-helix-b" : si === 2 ? "pm-helix-c" : "pm-helix-a"}`}
          {...stroke}
          strokeWidth={0.65}
          opacity={0.38 + si * 0.08}
        />
      ))}
      {Array.from({ length: steps }, (_, i) => {
        const t = i / (steps - 1);
        const y = 8 + t * 84;
        return strands.map((phase, si) => {
          const x = 50 + Math.sin(t * Math.PI * 4 + phase) * 22;
          return (
            <circle
              key={`${i}-${si}`}
              cx={x}
              cy={y}
              r={1.15}
              fill="currentColor"
              className={`pm-helix-node ${si > 0 ? "pm-helix-node-alt" : ""}`}
              opacity={0.55 + si * 0.15}
              style={{ animationDelay: `${i * 0.1 + si * 0.2}s` }}
            />
          );
        });
      })}
    </MotifShell>
  );
}

/** Parallel fibrils with staggered mineral bands */
function PolepoleMotif({ className }: MotifProps) {
  const fibrils = 14;
  return (
    <MotifShell variant="polepole" className={className}>
      {Array.from({ length: fibrils }).map((_, i) => {
        const x = 11 + i * 5.6;
        return (
          <g key={i}>
            <line
              x1={x}
              y1="12"
              x2={x}
              y2="88"
              className="pm-field-line"
              {...stroke}
              strokeWidth={0.55}
              opacity={0.32}
              style={{ animationDelay: `${i * 0.12}s` }}
            />
            {Array.from({ length: 6 }).map((_, b) => {
              const y = 18 + b * 12 + (i % 2) * 5;
              return (
                <rect
                  key={b}
                  x={x - 2.2}
                  y={y}
                  width={4.4}
                  height={2.2}
                  rx={0.35}
                  fill="currentColor"
                  className="pm-field-node"
                  opacity={0.5 + (b % 2) * 0.2}
                  style={{ animationDelay: `${i * 0.1 + b * 0.2}s` }}
                />
              );
            })}
          </g>
        );
      })}
      {Array.from({ length: 4 }).map((_, i) => (
        <path
          key={`band-${i}`}
          d={`M14 ${24 + i * 16} Q50 ${20 + i * 16} 86 ${28 + i * 16}`}
          className="pm-field-wave"
          {...stroke}
          strokeWidth={0.4}
          opacity={0.18}
          style={{ animationDelay: `${i * 0.4}s` }}
        />
      ))}
    </MotifShell>
  );
}

/** Hexagonal cell-wall tessellation with nested osteon-like vessels */
function FullhoopMotif({ className }: MotifProps) {
  const hexR = 38;
  const hexPoints = Array.from({ length: 6 }, (_, i) => {
    const a = (i / 6) * Math.PI * 2 - Math.PI / 6;
    return `${50 + hexR * Math.cos(a)},${50 + hexR * Math.sin(a)}`;
  }).join(" ");

  const vessels = [
    { cx: 50, cy: 50, r: 8 },
    { cx: 34, cy: 38, r: 5 },
    { cx: 66, cy: 38, r: 4.5 },
    { cx: 34, cy: 62, r: 4.5 },
    { cx: 66, cy: 62, r: 5 },
    { cx: 50, cy: 28, r: 4 },
    { cx: 50, cy: 72, r: 4 },
  ];

  return (
    <MotifShell variant="fullhoop" className={className}>
      <polygon points={hexPoints} className="pm-hoop-glow" fill="currentColor" opacity={0.06} />
      <polygon points={hexPoints} className="pm-hoop pm-hoop-0" {...stroke} strokeWidth={0.65} opacity={0.38} />
      <polygon
        points={Array.from({ length: 6 }, (_, i) => {
          const a = (i / 6) * Math.PI * 2 - Math.PI / 6;
          const r = 28;
          return `${50 + r * Math.cos(a)},${50 + r * Math.sin(a)}`;
        }).join(" ")}
        className="pm-hoop pm-hoop-1"
        {...stroke}
        strokeWidth={0.5}
        opacity={0.28}
      />
      {vessels.map(({ cx, cy, r }, i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r={r} className={`pm-hoop pm-hoop-${(i % 3) + 1}`} {...stroke} strokeWidth={0.5} opacity={0.35} />
          <circle cx={cx} cy={cy} r={r * 0.35} fill="currentColor" className="pm-hoop-node" opacity={0.7} style={{ animationDelay: `${i * 0.2}s` }} />
        </g>
      ))}
      <g className="pm-hoop-orbit" style={{ transformOrigin: "50px 50px" }}>
        <circle cx="50" cy="10" r="1.2" fill="currentColor" className="pm-orbit-tracer" />
        <circle cx="90" cy="50" r="1" fill="currentColor" className="pm-orbit-tracer pm-orbit-tracer-b" />
      </g>
    </MotifShell>
  );
}

/** Spongy trabecular lattice — branching struts */
function PolesquareMotif({ className }: MotifProps) {
  const trabeculae = [
    "M18 78 Q32 58 48 68 T82 42",
    "M22 82 Q42 72 54 52",
    "M70 78 Q54 48 40 58",
    "M78 72 Q60 38 44 48",
    "M24 62 Q38 48 52 56 T76 34",
    "M30 48 Q50 38 62 50",
    "M68 48 Q48 28 36 40",
    "M52 82 Q50 60 48 44",
    "M38 38 Q50 28 62 36",
    "M20 52 Q34 42 46 50",
    "M80 54 Q66 44 54 52",
    "M48 24 Q52 40 50 56",
  ];
  const nodes = [
    [48, 68],
    [54, 52],
    [40, 58],
    [44, 48],
    [52, 56],
    [62, 50],
    [36, 40],
    [48, 44],
    [50, 28],
    [46, 50],
    [54, 52],
    [50, 56],
    [32, 62],
    [68, 54],
    [24, 72],
    [76, 64],
  ];

  return (
    <MotifShell variant="polesquare" className={className}>
      <rect x="12" y="12" width="76" height="76" rx="4" className="pm-lattice-frame" {...stroke} strokeWidth={0.55} opacity={0.28} />
      {trabeculae.map((d, i) => (
        <path
          key={i}
          d={d}
          className="pm-lattice-diagonal"
          {...stroke}
          strokeWidth={0.55}
          opacity={0.28}
          style={{ animationDelay: `${i * 0.22}s` }}
        />
      ))}
      {nodes.map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={i % 4 === 0 ? 1.6 : 1.1}
          fill="currentColor"
          className="pm-lattice-corner"
          opacity={0.5 + (i % 5) * 0.08}
          style={{ animationDelay: `${i * 0.18}s` }}
        />
      ))}
      <circle cx="50" cy="50" r="2.5" fill="currentColor" className="pm-core" opacity={0.65} />
    </MotifShell>
  );
}

const MOTIF_MAP = {
  rings: RingsMotif,
  dotsphere: DotsphereMotif,
  polesphere: PolesphereMotif,
  dotsquare: DotsquareMotif,
  helix: HelixMotif,
  polepole: PolepoleMotif,
  fullhoop: FullhoopMotif,
  polesquare: PolesquareMotif,
} as const;

export function ProjectMotif({
  motif,
  accent,
  className,
}: {
  motif: ProjectMotifKey;
  accent: string;
  className?: string;
}) {
  const Component = MOTIF_MAP[motif];
  return (
    <div
      className={cn("project-motif-wrap", className)}
      style={{ "--motif-accent": accent, color: accent } as CSSProperties}
    >
      <Component />
    </div>
  );
}
