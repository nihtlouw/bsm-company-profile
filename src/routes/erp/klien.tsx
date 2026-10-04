import { createFileRoute } from "@tanstack/react-router";
import { ErpClients } from "@/components/erp/ops";

export const Route = createFileRoute("/erp/klien")({
  component: ErpClients,
});
