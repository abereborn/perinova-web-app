import { CircleAlert, Phone, Stethoscope } from "lucide-react";
import { useLocation } from "wouter";
import { AppHeader } from "@/components/layout/AppHeader";
import { MotherShell } from "@/components/layout/MotherShell";
import { Button, Notice } from "@/components/perinova-ui";

export default function DangerPage() {
  const [, setLocation] = useLocation();
  return (
    <MotherShell active="profil">
      <AppHeader title="Tanda bahaya" onBack={() => setLocation("/ibu/profil")} />
      <main className="mother-page-main pb-2">
        <div className="mt-5 rounded-3xl glass-tint-danger p-5">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[rgba(160,61,58,.20)] text-[#a03d3a]">
            <CircleAlert size={24} />
          </div>
          <h2 className="serif mt-4 text-2xl font-semibold text-[#7e3433]">Jangan menunggu bila...</h2>
          <p className="mt-2 text-sm leading-relaxed text-[#8b4a47]">Kondisimu terasa memburuk atau kamu merasa tidak aman.</p>
        </div>
        <div className="mt-5 space-y-2">
          {["Demam atau menggigil", "Nyeri semakin berat", "Perdarahan banyak atau tiba-tiba", "Cairan dari luka berbau tidak sedap", "Kemerahan atau bengkak meluas", "Luka terbuka atau terasa sangat lemas"].map((x) => (
            <div key={x} className="flex items-center gap-3 rounded-xl glass-card p-3 text-sm font-semibold text-[#59464e]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#b94846]" />
              {x}
            </div>
          ))}
        </div>
        <Notice tone="danger">Daftar ini bukan diagnosis. Bila ragu, lebih aman menghubungi tenaga kesehatan.</Notice>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <a href="tel:119" className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#b94846] text-sm font-bold text-white">
            <Phone size={17} /> Hubungi 119
          </a>
          <a href="tel:081234567890" className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#b55367] text-sm font-bold text-white">
            <Stethoscope size={17} /> Telepon bidan
          </a>
        </div>
        <Button variant="outline" className="mt-3 w-full" onClick={() => setLocation("/ibu/konsultasi")}>
          Kirim pesan ke bidan
        </Button>
      </main>
    </MotherShell>
  );
}
