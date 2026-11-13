import { createFileRoute, notFound } from "@tanstack/react-router";
import { PortfolioDetailPage } from "@/components/portfolio/detail-page";
import { getProgram } from "@/data/portfolio";

export const Route = createFileRoute("/portfolio/programs/$id")({
  beforeLoad: ({ params }) => {
    if (!getProgram(params.id)) throw notFound();
  },
  head: ({ params }) => {
    const program = getProgram(params.id);
    const title = program
      ? `${program.title || program.name} — Portfolio — UCSF OCR`
      : "Portfolio — UCSF OCR";
    const description = program?.card ?? "";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ProgramDetailRoute,
});

function ProgramDetailRoute() {
  const { id } = Route.useParams();
  const program = getProgram(id);
  if (!program) return null;
  return <PortfolioDetailPage record={program} />;
}
