import { createFileRoute } from "@tanstack/react-router";
import { ErpDashboard } from "@/components/erp/dashboard";

export const Route = createFileRoute("/erp/")({
  component: ErpDashboard,
});
