import { createFileRoute } from "@tanstack/react-router";
import { MarketingShell } from "@/components/site/inner-page";
import { ProfilePage } from "@/components/site/profile-page";
import { COMPANY, SEO } from "@/lib/site-data";

export const Route = createFileRoute("/profil-perusahaan")({
  component: ProfileRoute,
  head: () => ({
    meta: [
      { title: SEO.profileTitle },
      { name: "description", content: SEO.profileDescription },
      { name: "author", content: COMPANY.name },
    ],
  }),
});

function ProfileRoute() {
  return (
    <MarketingShell>
      <ProfilePage />
    </MarketingShell>
  );
}
