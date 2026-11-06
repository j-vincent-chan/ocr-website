import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Legacy path for the Research Operations & Management page, kept so existing links
 * (nav from older deploys, emails, search results) still resolve.
 */
export const Route = createFileRoute("/services/project-management")({
  beforeLoad: () => {
    throw redirect({ to: "/services/research-operations", statusCode: 301 });
  },
});
