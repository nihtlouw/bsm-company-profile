import { createFileRoute } from "@tanstack/react-router";
import { ErpProjectDetail } from "@/components/erp/projects";

export const Route = createFileRoute("/erp/proyek/$id")({
  component: ProjectDetailRoute,
});

function ProjectDetailRoute() {
  const { id } = Route.useParams();
  return <ErpProjectDetail id={id} />;
}
