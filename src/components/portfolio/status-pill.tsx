import type { OcrStatus } from "@/data/portfolio/types";
import { statusPresentation } from "@/lib/portfolio/derived";

export function StatusPill({
  status,
  themeDeep,
  className = "",
}: {
  status: OcrStatus;
  themeDeep: string;
  className?: string;
}) {
  const s = statusPresentation(status, themeDeep);
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        borderRadius: 999,
        padding: "5px 12px",
        font: "500 12px/1.3 Inter, system-ui, sans-serif",
        background: "rgba(255,255,255,.62)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        color: s.ink,
        border: "1px solid rgba(1,6,33,.14)",
      }}
    >
      <span
        aria-hidden
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          flex: "none",
          background: s.dot,
        }}
      />
      {s.line}
    </span>
  );
}
