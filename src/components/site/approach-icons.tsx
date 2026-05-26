type ApproachIconProps = {
  className?: string;
};

const stroke = {
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none",
};

/** Pennant flag — planted at the start of a project */
export function ApproachProjectIcon({ className }: ApproachIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M5.5 3.5v17" {...stroke} />
      <path d="M5.5 4.5h12l-3 4.25 3 4.25h-12z" {...stroke} />
    </svg>
  );
}

/** Network — shared expertise connected across projects */
export function ApproachEmbedIcon({ className }: ApproachIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M10.4 7.7l-4.3 7.5M13.6 7.7l4.3 7.5M8 18h8" {...stroke} />
      <circle cx="12" cy="5.5" r="2.5" {...stroke} />
      <circle cx="5.5" cy="17.5" r="2.5" {...stroke} />
      <circle cx="18.5" cy="17.5" r="2.5" {...stroke} />
    </svg>
  );
}

/** Trending arrow — adapting with a shifting research landscape */
export function ApproachAdaptIcon({ className }: ApproachIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M3.5 18l4.5-4.5 3.5 3.5 7.5-9" {...stroke} />
      <path d="M14.5 8h5v5" {...stroke} />
    </svg>
  );
}

export const APPROACH_ICONS = {
  project: ApproachProjectIcon,
  embed: ApproachEmbedIcon,
  adapt: ApproachAdaptIcon,
} as const;

export type ApproachIconKey = keyof typeof APPROACH_ICONS;
