import { CircleAlert, Clock3, MessageCircle, Users } from "lucide-react";
import { useLocation } from "wouter";
import { Card, Notice, SectionTitle } from "@/components/perinova-ui";
import { ProviderShell } from "@/components/layout/ProviderShell";
import { ProviderHeader } from "@/components/layout/ProviderHeader";
import { Stat } from "@/components/pendamping/Stat";
import { PatientRow } from "@/components/pendamping/PatientRow";
import { ConsultTable } from "@/components/pendamping/ConsultTable";
import { patients } from "@/data/patients";
import { getLocalDateTime, getLocalGreeting } from "@/lib/local-time";
import { findAccountById, getSession } from "@/lib/perinova-store";
import { useLocalNow } from "@/hooks/use-local-time";

export default function ProviderDashboard() {
  const [, setLocation] = useLocation();
  const now = useLocalNow();
  const greeting = getLocalGreeting(now);
  const session = getSession();
  const account = session ? findAccountById(session.userId) : null;
  const pendampingName = account?.profile.name?.trim() || "Pendamping";

  return (
    <ProviderShell>
      <div className="provider-dashboard">
        <ProviderHeader
          title={`${greeting}, ${pendampingName}`}
          subtitle={`${getLocalDateTime(now)} · Ringkasan pendampingan hari ini.`}
        />

        <section className="provider-stat-grid mt-7" aria-label="Ringkasan pendampingan">
          <Stat label="Pasien aktif" value="24" icon={<Users />} tone="sage" />
          <Stat label="Perlu ditinjau" value="3" icon={<CircleAlert />} tone="rose" />
          <Stat label="Konsultasi baru" value="5" icon={<MessageCircle />} tone="blue" />
        </section>

        <section className="mt-7 grid gap-5 lg:grid-cols-[1.45fr_.85fr]">
          <Card className="provider-panel provider-attention-panel p-5 sm:p-6">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="provider-eyebrow">Prioritas hari ini</p>
                <h2 className="serif mt-1.5 text-xl font-semibold text-[#49353d]">Pasien yang perlu perhatian</h2>
              </div>
              <button onClick={() => setLocation("/pendamping/pasien")} className="provider-inline-link shrink-0">Lihat semua</button>
            </div>
            <div className="space-y-1">
              {patients
                .filter((p) => p.status !== "Stabil")
                .map((p) => (
                  <PatientRow key={p.id} patient={p} onClick={() => setLocation(`/pendamping/pasien/${p.id}`)} />
                ))}
            </div>
            <Notice tone="info">Tinjau foto hanya setelah pasien memberikan persetujuan.</Notice>
          </Card>

          <Card className="provider-panel p-5 sm:p-6">
            <div className="mb-4">
              <p className="provider-eyebrow">Jejak aktivitas</p>
              <h2 className="serif mt-1.5 text-xl font-semibold text-[#49353d]">Aktivitas terbaru</h2>
            </div>
            <div className="space-y-4">
              {[
                ["Alya mengisi REEDA hari ini", "1 jam lalu"],
                ["Sari mengirim foto luka", "2 jam lalu"],
                ["Dini menyelesaikan edukasi", "3 jam lalu"],
              ].map(([title, time]) => (
                <div className="provider-activity-item flex gap-3" key={title}>
                  <span className="provider-activity-dot mt-1.5 h-2 w-2 shrink-0 rounded-full" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-relaxed text-[#59464e]">{title}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-[#9a878b]"><Clock3 size={12} />{time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section className="mt-5">
          <Card className="provider-panel p-5 sm:p-6">
            <SectionTitle
              className="mt-0 mb-3"
              title="Konsultasi menunggu jawaban"
              action={<button onClick={() => setLocation("/pendamping/konsultasi")} className="provider-inline-link">Buka inbox</button>}
            />
            <ConsultTable onClick={(id) => setLocation(`/pendamping/konsultasi/${id}`)} />
          </Card>
        </section>
      </div>
    </ProviderShell>
  );
}
