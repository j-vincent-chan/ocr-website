import { Link, useLocation } from "@tanstack/react-router";

type Arm = {
  n: "01" | "02" | "03" | "04";
  to: "/services/research-development" | "/services/project-management" | "/services/data-management" | "/services/ai-tools";
  label: string;
  short: string;
  accent: string;
};

export const SERVICE_ARMS: Arm[] = [
  { n: "01", to: "/services/research-development", label: "Research development & grantwriting", short: "RD & Grantwriting", accent: "var(--coral)" },
  { n: "02", to: "/services/project-management", label: "Project management & clinical coordination", short: "PM & Clinical", accent: "var(--teal)" },
  { n: "03", to: "/services/data-management", label: "Data management & sharing", short: "Data & Sharing", accent: "var(--magenta)" },
  { n: "04", to: "/services/ai-tools", label: "Research resources & AI tools", short: "Resources & AI", accent: "var(--gold)" },
];

/** A rail that lives at the top of every service page so the four arms feel like one family. */
export function ServiceSubnav() {
  const { pathname } = useLocation();
  return (
    <nav
      aria-label="Service arms"
      className="sticky top-20 z-30 -mt-px border-y border-ink/10 bg-cream/85 backdrop-blur supports-[backdrop-filter]:bg-cream/70"
    >
      <div className="max-w-7xl mx-auto px-6">
        <ol className="flex items-stretch gap-1 overflow-x-auto no-scrollbar">
          {SERVICE_ARMS.map((a) => {
            const active = pathname === a.to;
            return (
              <li key={a.n} className="flex-none">
                <Link
                  to={a.to}
                  className={`group flex items-center gap-3 py-3 pr-5 pl-3 rounded-none whitespace-nowrap transition ${
                    active ? "text-ink" : "text-muted-foreground hover:text-ink"
                  }`}
                >
                  <span
                    className={`inline-flex w-7 h-7 items-center justify-center rounded-md text-[11px] font-display tracking-wide transition ${
                      active ? "text-white" : "text-ink/70 bg-secondary group-hover:bg-secondary"
                    }`}
                    style={active ? { background: a.accent } : undefined}
                  >
                    {a.n}
                  </span>
                  <span className="text-sm font-medium">{a.short}</span>
                  {active && (
                    <span
                      aria-hidden
                      className="ml-1 w-1.5 h-1.5 rounded-full"
                      style={{ background: a.accent }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
