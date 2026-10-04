import { createFileRoute } from "@tanstack/react-router";
import { ErpLeads } from "@/components/erp/leads";

export const Route = createFileRoute("/erp/leads")({
  component: ErpLeads,
});
