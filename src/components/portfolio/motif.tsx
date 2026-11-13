import { useMemo } from "react";
import { motifs, motifKindKeys } from "@/data/portfolio";
import type { MotifMode } from "@/data/portfolio/types";
import { motifKindForRecord } from "@/lib/portfolio/derived";
import { themeAccent } from "@/lib/portfolio/themes";
import { cn } from "@/lib/utils";

type MotifProps = {
  /** Record name used for motif assignment (and hashing fallback). */
  name: string;
  theme?: string;
  mode?: MotifMode;
  /** Override the resolved motif kind (e.g. category explainer thumbnails). */
  kind?: string;
  /** Override stroke color (defaults to theme bright). */
  color?: string;
  zoom?: number;
  className?: string;
};

/**
 * Renders a portfolio motif SVG from data/motifs.json.
 * - static: no animation (thumbnails)
 * - animated: plays built-in keyframes
 * - background: animated + card-drift (.ocrm.bg)
 */
export function Motif({
  name,
  theme,
  mode = "static",
  kind: kindOverride,
  color,
  zoom = 1.55,
  className,
}: MotifProps) {
  const accent = themeAccent(theme);
  const kind = kindOverride ?? motifKindForRecord(name, motifs.records, motifKindKeys);
  const html = motifs.kinds[kind] ?? "";

  const classNameOcrm = useMemo(() => {
    const parts = ["ocrm"];
    if (mode === "static") parts.push("still");
    if (mode === "background") parts.push("bg");
    return parts.join(" ");
  }, [mode]);

  if (!html) return null;

  return (
    <svg
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      aria-hidden
      className={cn(classNameOcrm, className)}
      style={{ display: "block", color: color ?? accent.bright, transform: `scale(${zoom})` }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
