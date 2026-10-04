import { useState } from "react";
import { CampaignPage } from "@/components/site/campaign-page";
import {
  CAMPAIGN_WA,
  CampaignHeader,
  FeedbackLayer,
  SiteFooter,
  WhatsAppFloat,
} from "@/components/site/chrome";
import { SeoHead } from "@/lib/seo-head";

export function CampaignPageRoute() {
  const [waHref, setWaHref] = useState(CAMPAIGN_WA);
  return (
    <>
      <SeoHead
        title="Survey instalasi listrik gratis — PT Berjaya Sukses Makmur"
        description="Minta survey lokasi gratis untuk instalasi listrik rumah sakit, pabrik, atau gedung komersial. Palembang & Karawang, respon 1×24 jam."
      />
      <CampaignHeader />
      <CampaignPage waHref={waHref} setWaHref={setWaHref} />
      <SiteFooter />
      <WhatsAppFloat href={waHref} />
      <FeedbackLayer />
    </>
  );
}
