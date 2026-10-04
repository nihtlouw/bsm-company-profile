import { createFileRoute } from "@tanstack/react-router";
import { ErpShell } from "@/components/erp/shell";

export const Route = createFileRoute("/erp")({
  component: ErpShell,
  head: () => ({
    meta: [
      { title: "Portal proyek — Berjaya Sukses Makmur" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});
