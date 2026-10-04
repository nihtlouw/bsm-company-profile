import { createFileRoute } from "@tanstack/react-router";
import { ErpQuotes } from "@/components/erp/ops";

export const Route = createFileRoute("/erp/penawaran")({
  component: ErpQuotes,
});
