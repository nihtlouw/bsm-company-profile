import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { CampaignPageRoute } from "@/pages/campaign";
import { HomeRoute } from "@/pages/home";
import { NotFoundPage } from "@/pages/not-found";
import { ProfileRoute } from "@/pages/profile";
import { ProjectRoute } from "@/pages/project";
import { ServiceRoute } from "@/pages/service";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/profil-perusahaan" element={<ProfileRoute />} />
        <Route path="/kampanye-instalasi-listrik" element={<CampaignPageRoute />} />
        <Route path="/layanan/:slug" element={<ServiceRoute />} />
        <Route path="/proyek/:id" element={<ProjectRoute />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
