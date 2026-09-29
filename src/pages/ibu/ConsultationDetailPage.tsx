import { useLocation } from "wouter";
import { Stethoscope } from "lucide-react";
import { AppHeader } from "@/components/layout/AppHeader";
import { MotherShell } from "@/components/layout/MotherShell";
import { EmptyState, Notice } from "@/components/perinova-ui";
import { getConsultations } from "@/lib/perinova-store";

export default function ConsultationDetailPage({ id }: { id: string }) {
  const [, setLocation] = useLocation();
  const item = getConsultations().find((c) => c.id === id);
  return (
    <MotherShell active="konsultasi">
      <AppHeader title="Percakapan" onBack={() => setLocation("/ibu/konsultasi")} />
      <main className="mother-page-main pb-2">
        {item ? (
          <>
            <div className="mt-5 space-y-3">
              <div className="ml-auto max-w-[88%] rounded-2xl rounded-tr-sm bg-[rgba(181,83,103,.18)] backdrop-blur-md p-4 text-sm leading-relaxed text-[#59464e]">
                <p>{item.message}</p>
                <span className="mt-2 block text-[11px] text-[#98787b]">{item.date}</span>
              </div>
              {item.reply ? (
                <div className="max-w-[88%] rounded-2xl rounded-tl-sm glass-tint-sage p-4 text-sm leading-relaxed text-[#557461]">
                  <div className="mb-2 flex items-center gap-2 font-bold">
                    <Stethoscope size={15} /> Bidan Rani
                  </div>
                  {item.reply}
                </div>
              ) : (
                <Notice>Pesanmu sudah diterima. Bidan akan membalas setelah meninjau.</Notice>
              )}
            </div>
            <Notice>Jika kondisi memburuk atau terasa darurat, hubungi fasilitas kesehatan segera.</Notice>
          </>
        ) : (
          <EmptyState title="Percakapan tidak ditemukan" description="Kembali ke daftar konsultasi." />
        )}
      </main>
    </MotherShell>
  );
}
