import { Redirect, useParams } from "wouter";
import HomePage from "@/pages/ibu/HomePage";
import WoundPage from "@/pages/ibu/WoundPage";
import ProgressPage from "@/pages/ibu/ProgressPage";
import EducationPage from "@/pages/ibu/EducationPage";
import ConsultationPage from "@/pages/ibu/ConsultationPage";
import ConsultationDetailPage from "@/pages/ibu/ConsultationDetailPage";
import ProfilePage from "@/pages/ibu/ProfilePage";
import DangerPage from "@/pages/ibu/DangerPage";
import { getSession } from "@/lib/perinova-store";

export default function MotherRoutes() {
  const params = useParams<{ page?: string; id?: string }>();
  const session = getSession();

  if (!session) return <Redirect to="/masuk" />;
  if (session.role !== "ibu") return <Redirect to="/pendamping/dashboard" />;

  const page = params.page || "home";
  if (page === "konsultasi" && params.id) return <ConsultationDetailPage id={params.id} />;
  if (page === "home") return <HomePage />;
  if (page === "luka" || page === "reeda") return <WoundPage />;
  if (page === "progress") return <ProgressPage />;
  if (page === "edukasi") return <EducationPage />;
  if (page === "konsultasi") return <ConsultationPage />;
  if (page === "profil") return <ProfilePage />;
  if (page === "bahaya") return <DangerPage />;
  return <HomePage />;
}
