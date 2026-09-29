import { useParams } from "wouter";
import ProviderDashboard from "@/pages/bidan/DashboardPage";
import PatientsPage from "@/pages/bidan/PatientsPage";
import PatientDetailPage from "@/pages/bidan/PatientDetailPage";
import ConsultationsPage from "@/pages/bidan/ConsultationsPage";
import ConsultationDetailPage from "@/pages/bidan/ConsultationDetailPage";

export default function ProviderRoutes() {
  const params = useParams<{ page?: string; id?: string }>();
  if (params.page === "pasien" && params.id) return <PatientDetailPage id={params.id} />;
  if (params.page === "konsultasi" && params.id) return <ConsultationDetailPage id={params.id} />;
  if (params.page === "pasien") return <PatientsPage />;
  if (params.page === "konsultasi") return <ConsultationsPage />;
  return <ProviderDashboard />;
}
