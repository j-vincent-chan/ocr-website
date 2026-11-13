import { createFileRoute, notFound } from "@tanstack/react-router";
import { PortfolioDetailPage } from "@/components/portfolio/detail-page";
import { getProject } from "@/data/portfolio";

export const Route = createFileRoute("/portfolio/projects/$id")({
  beforeLoad: ({ params }) => {
    if (!getProject(params.id)) throw notFound();
  },
  head: ({ params }) => {
    const project = getProject(params.id);
    const title = project
      ? `${project.name} — Portfolio — UCSF OCR`
      : "Portfolio — UCSF OCR";
    const description = project?.card ?? "";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ProjectDetailRoute,
});

function ProjectDetailRoute() {
  const { id } = Route.useParams();
  const project = getProject(id);
  if (!project) return null;
  return <PortfolioDetailPage record={project} />;
}
