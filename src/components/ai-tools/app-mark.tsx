import type { AppRecord } from "@/data/ai-tools";

/**
 * Monoline app mark (src/assets/marks/*.svg). The SVGs are black strokes, so they render as a
 * CSS mask over a solid fill and can take any color.
 */
export function AppMark({
  src,
  size = 24,
  color = "var(--ink)",
}: {
  src: string;
  size?: number;
  color?: string;
}) {
  const mask = `url("${src}") center / contain no-repeat`;
  return (
    <span
      aria-hidden
      className="block flex-none"
      style={{ width: size, height: size, background: color, mask, WebkitMask: mask }}
    />
  );
}

/** The app's mark in ink on a disc of its sunburst hue. */
export function MarkDisc({
  app,
  size = 44,
  markSize = 24,
}: {
  app: AppRecord;
  size?: number;
  markSize?: number;
}) {
  return (
    <span
      aria-hidden
      className="flex flex-none items-center justify-center rounded-full"
      style={{ width: size, height: size, background: app.fill }}
    >
      <AppMark src={app.mark} size={markSize} />
    </span>
  );
}
