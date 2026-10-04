import { createFileRoute } from "@tanstack/react-router";
import { ErpMaterials } from "@/components/erp/ops";

export const Route = createFileRoute("/erp/material")({
  component: ErpMaterials,
});
