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
        title="Permintaan survey instalasi listrik — PT Berjaya Sukses Makmur"
        description="Ajukan diskusi awal untuk pekerjaan instalasi listrik. Dokumentasi perusahaan mencakup fasilitas kesehatan, jaringan perumahan, serta pekerjaan tegangan menengah. Waktu tindak lanjut dikonfirmasi tim."
      />
      <CampaignHeader />
      <CampaignPage waHref={waHref} setWaHref={setWaHref} />
      <SiteFooter />
      <WhatsAppFloat href={waHref} />
      <FeedbackLayer />
    </>
  );
}
