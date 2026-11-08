import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/chrome";

export const Route = createFileRoute("/funding")({
  component: FundingLayout,
});

/**
 * Shared chrome for /funding and /funding/$slug.
 * The header stays light: the detail hero is dark but does not set data-tone="dark".
 */
function FundingLayout() {
  return (
    <SiteShell navTone="light">
      <Outlet />
    </SiteShell>
  );
}
