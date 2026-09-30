import { Redirect, useParams } from "wouter";
import ProviderDashboard from "@/pages/pendamping/DashboardPage";
import PatientsPage from "@/pages/pendamping/PatientsPage";
import PatientDetailPage from "@/pages/pendamping/PatientDetailPage";
import ConsultationsPage from "@/pages/pendamping/ConsultationsPage";
import ConsultationDetailPage from "@/pages/pendamping/ConsultationDetailPage";
import { getSession } from "@/lib/perinova-store";

export default function ProviderRoutes() {
  const params = useParams<{ page?: string; id?: string }>();
  const session = getSession();

  if (!session) return <Redirect to="/masuk" />;
  if (session.role !== "pendamping") return <Redirect to="/ibu/home" />;

  if (params.page === "pasien" && params.id) return <PatientDetailPage id={params.id} />;
  if (params.page === "konsultasi" && params.id) return <ConsultationDetailPage id={params.id} />;
  if (params.page === "pasien") return <PatientsPage />;
  if (params.page === "konsultasi") return <ConsultationsPage />;
  return <ProviderDashboard />;
}
