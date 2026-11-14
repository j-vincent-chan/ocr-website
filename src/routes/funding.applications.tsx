import { createFileRoute } from "@tanstack/react-router";
import { ApplicationsReviewPage } from "@/components/funding/applications-review";

export const Route = createFileRoute("/funding/applications")({
  head: () => ({
    meta: [
      { title: "Funding applications — UCSF OCR" },
      {
        name: "description",
        content: "OCR staff review of in-house funding applications.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ApplicationsReviewPage,
});
