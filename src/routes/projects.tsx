import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Legacy path for Programs & Projects. Redirects to the Portfolio page.
 */
export const Route = createFileRoute("/projects")({
  beforeLoad: () => {
    throw redirect({ to: "/portfolio", statusCode: 301 });
  },
});
