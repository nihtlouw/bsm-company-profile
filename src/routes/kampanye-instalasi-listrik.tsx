import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CampaignPage } from "@/components/site/campaign-page";
import {
  CAMPAIGN_WA,
  CampaignHeader,
  FeedbackLayer,
  SiteFooter,
  WhatsAppFloat,
} from "@/components/site/chrome";
import { COMPANY } from "@/lib/site-data";

export const Route = createFileRoute("/kampanye-instalasi-listrik")({
  component: CampaignRoute,
  head: () => ({
    meta: [
      {
        title: "Survey instalasi listrik gratis — PT Berjaya Sukses Makmur",
      },
      {
        name: "description",
        content:
          "Minta survey lokasi gratis untuk instalasi listrik rumah sakit, pabrik, atau gedung komersial. Palembang & Karawang, respon 1×24 jam.",
      },
      { name: "author", content: COMPANY.name },
    ],
  }),
});

function CampaignRoute() {
  const [waHref, setWaHref] = useState(CAMPAIGN_WA);
  return (
    <>
      <CampaignHeader />
      <CampaignPage waHref={waHref} setWaHref={setWaHref} />
      <SiteFooter />
      <WhatsAppFloat href={waHref} />
      <FeedbackLayer />
    </>
  );
}
