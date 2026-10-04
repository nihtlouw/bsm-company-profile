import { createFileRoute } from "@tanstack/react-router";
import { ErpProjectList } from "@/components/erp/projects";

export const Route = createFileRoute("/erp/proyek/")({
  component: ErpProjectList,
});
