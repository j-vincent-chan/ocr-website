import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/chrome";

export const Route = createFileRoute("/portfolio")({
  component: PortfolioLayout,
});

function PortfolioLayout() {
  return (
    <SiteShell navTone="light">
      <Outlet />
    </SiteShell>
  );
}
