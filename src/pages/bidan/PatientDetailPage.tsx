import { ArrowLeft, ChevronRight, Image as ImageIcon, MessageCircle } from "lucide-react";
import { useLocation } from "wouter";
import { Button, Card, Notice, Pill, SectionTitle } from "@/components/perinova-ui";
import { ProviderShell } from "@/components/layout/ProviderShell";
import { ProviderHeader } from "@/components/layout/ProviderHeader";
import { patients } from "@/data/patients";
import { ASSET } from "@/constants/assets";

export default function PatientDetailPage({ id }: { id: string }) {
  const [, setLocation] = useLocation();
  const p = patients.find((x) => x.id === id) || patients[0];
  return (
    <ProviderShell>
      <button onClick={() => setLocation("/bidan/pasien")} className="mb-5 flex min-h-11 items-center gap-2 text-sm font-bold text-[#a34f62]">
        <ArrowLeft size={17} /> Kembali ke pasien
      </button>
      <ProviderHeader title={p.name} subtitle={`Pasien aktif · Pemulihan hari ke-${p.day}`} />
      <div className="mt-7 grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
        <Card>
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-[rgba(181,83,103,.20)] text-lg font-bold text-[#95485a]">{p.initials}</div>
            <div>
              <p className="text-sm text-[#8a777c]">{p.age} tahun</p>
              <Pill tone={p.status === "Stabil" ? "sage" : "amber"}>{p.status}</Pill>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-2 text-center">
            <div className="rounded-xl bg-white/40 backdrop-blur-sm p-3">
              <p className="text-xs text-[#8a777c]">Hari nifas</p>
              <p className="serif mt-1 text-xl font-semibold">7</p>
            </div>
            <div className="rounded-xl glass-tint-sage p-3">
              <p className="text-xs text-[#607866]">REEDA</p>
              <p className="serif mt-1 text-xl font-semibold text-[#557461]">2</p>
            </div>
          </div>
          <Button className="mt-5 w-full" onClick={() => setLocation(`/bidan/konsultasi/c-1`)}>
            <MessageCircle size={16} /> Kirim pesan
          </Button>
        </Card>
        <Card>
          <SectionTitle className="mt-0" title="Ringkasan pemantauan" />
          <div className="space-y-3">
            {[
              ["18 Jun", "REEDA", "Stabil", "sage"],
              ["16 Jun", "Jurnal luka", "Foto diterima", "blue"],
              ["12 Jun", "Konsultasi", "Dijawab", "rose"],
            ].map(([d, t, v, c]) => (
              <div key={d} className="flex gap-3 border-b border-[#eee2da] pb-3 last:border-0">
                <div className="w-14 text-xs font-bold text-[#9b878b]">{d}</div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#59464e]">{t}</p>
                  <p className="mt-1 text-xs text-[#8a777c]">{v}</p>
                </div>
                <ChevronRight size={16} className="text-[#a68e91]" />
              </div>
            ))}
          </div>
          <Notice>Foto luka tersedia dengan persetujuan pasien.</Notice>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <img src={`${ASSET}illustrations/H-7.jpeg`} alt="Foto pemantauan hari ke-7" className="aspect-square w-full rounded-xl object-cover" />
            <div className="flex flex-col justify-center rounded-xl bg-white/40 backdrop-blur-sm p-3">
              <ImageIcon className="text-[#b55367]" />
              <p className="mt-2 text-xs font-semibold leading-relaxed text-[#78656a]">
                Foto terakhir
                <br />
                18 Juni 2026
              </p>
            </div>
          </div>
        </Card>
      </div>
    </ProviderShell>
  );
}
