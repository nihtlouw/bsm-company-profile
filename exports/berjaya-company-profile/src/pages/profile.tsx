import { MarketingShell } from "@/components/site/inner-page";
import { ProfilePage } from "@/components/site/profile-page";
import { SeoHead } from "@/lib/seo-head";
import { SEO } from "@/lib/site-data";

export function ProfileRoute() {
  return (
    <MarketingShell>
      <SeoHead title={SEO.profileTitle} description={SEO.profileDescription} />
      <ProfilePage />
    </MarketingShell>
  );
}
