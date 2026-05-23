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

/** Crosshair — focus on the project in front of you */
export function ApproachProjectIcon({ className }: ApproachIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <circle cx="12" cy="12" r="8.5" {...stroke} />
      <circle cx="12" cy="12" r="4.5" {...stroke} />
      <circle cx="12" cy="12" r="1.75" fill="currentColor" stroke="none" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" {...stroke} />
    </svg>
  );
}

/** Linked team — shared expertise across programs */
export function ApproachEmbedIcon({ className }: ApproachIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <circle cx="9" cy="7.5" r="3" {...stroke} />
      <path d="M4.5 20.5v-1.75a4.25 4.25 0 0 1 4.25-4.25H9" {...stroke} />
      <circle cx="17.5" cy="8.5" r="2.75" {...stroke} />
      <path d="M14.75 20.5v-1.5a3.75 3.75 0 0 1 3.5-3.74" {...stroke} />
      <path d="M20.5 11.25a4 4 0 0 0-5.5-3.7" {...stroke} />
    </svg>
  );
}

/** Compass — navigating a shifting research landscape */
export function ApproachAdaptIcon({ className }: ApproachIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <circle cx="12" cy="12" r="8.5" {...stroke} />
      <path d="M12 3.5v17M3.5 12h17" {...stroke} opacity={0.35} />
      <path d="M12 5.5l2.25 6.5L12 18.5 9.75 12 12 5.5z" fill="currentColor" stroke="none" />
      <path d="M12 5.5l2.25 6.5L12 18.5" {...stroke} />
    </svg>
  );
}

export const APPROACH_ICONS = {
  project: ApproachProjectIcon,
  embed: ApproachEmbedIcon,
  adapt: ApproachAdaptIcon,
} as const;

export type ApproachIconKey = keyof typeof APPROACH_ICONS;
