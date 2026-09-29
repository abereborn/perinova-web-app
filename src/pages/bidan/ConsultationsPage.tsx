import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import { Card, Pill } from "@/components/perinova-ui";
import { ProviderShell } from "@/components/layout/ProviderShell";
import { ProviderHeader } from "@/components/layout/ProviderHeader";
import { ConsultTable } from "@/components/bidan/ConsultTable";
import { ResponseForm } from "@/components/bidan/ResponseForm";
import { getConsultations } from "@/lib/perinova-store";

export default function ConsultationsPage({ detailId }: { detailId?: string }) {
  const [, setLocation] = useLocation();
  if (detailId) {
    const c = getConsultations().find((x) => x.id === detailId) || getConsultations()[0];
    return (
      <ProviderShell>
        <button onClick={() => setLocation("/bidan/konsultasi")} className="mb-5 flex min-h-11 items-center gap-2 text-sm font-bold text-[#a34f62]">
          <ArrowLeft size={17} /> Kembali ke konsultasi
        </button>
        <ProviderHeader title="Detail konsultasi" subtitle="Alya Putri · 12 Juni 2026" />
        <Card className="mt-7">
          <Pill tone="amber">{c.status}</Pill>
          <h2 className="serif mt-3 text-xl font-semibold text-[#49353d]">{c.subject}</h2>
          <div className="mt-4 rounded-2xl bg-white/40 backdrop-blur-sm p-4 text-sm leading-relaxed text-[#59464e]">{c.message}</div>
          {c.reply && (
            <div className="mt-3 rounded-2xl glass-tint-sage p-4 text-sm leading-relaxed text-[#557461]">
              <p className="mb-2 text-xs font-bold uppercase tracking-wide">Balasan tersimpan</p>
              {c.reply}
            </div>
          )}
          <ResponseForm consultation={c} />
        </Card>
      </ProviderShell>
    );
  }
  return (
    <ProviderShell>
      <ProviderHeader title="Konsultasi" subtitle="Berikan jawaban yang jelas dan menenangkan." />
      <Card className="mt-7">
        <ConsultTable onClick={(id) => setLocation(`/bidan/konsultasi/${id}`)} />
      </Card>
    </ProviderShell>
  );
}
