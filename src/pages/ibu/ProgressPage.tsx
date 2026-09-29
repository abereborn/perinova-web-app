import { BookOpen, Droplets } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AppHeader } from "@/components/layout/AppHeader";
import { MotherShell } from "@/components/layout/MotherShell";
import { ActionCard } from "@/components/mother/HomeCards";
import { Button, Card, Pill, SectionTitle } from "@/components/perinova-ui";

export default function ProgressPage() {
  const [, setLocation] = useLocation();
  const [range, setRange] = useState("7 hari");
  const values = range === "7 hari" ? [32, 40, 45, 49, 60, 67, 78] : [28, 35, 44, 48, 57, 63, 72, 78, 81, 84, 89, 92, 94, 96];
  const chartData = values.map((value, index) => ({ day: index === values.length - 1 ? "Kini" : `H${index + 1}`, recovery: value }));
  return (
    <MotherShell active="progress">
      <AppHeader title="Progress" subtitle="Melihat perjalanan, satu hari demi satu" />
      <main className="mother-page-main pb-2">
        <Card className="mt-5 glass-tint-rose">
          <div className="flex items-start justify-between">
            <div>
              <Pill tone="rose">PEMULIHAN</Pill>
              <p className="serif mt-3 text-3xl font-semibold text-[#49353d]">Hari ke-7</p>
              <p className="mt-1 text-xs text-[#7d6b70]">dari rata-rata 6 minggu pemulihan</p>
            </div>
            <div className="grid h-14 w-14 place-items-center rounded-full border-4 border-[#c88996] text-sm font-bold text-[#a34f62]">24%</div>
          </div>
          <div className="mt-5 h-2 rounded-full bg-black/10">
            <div className="h-2 rounded-full bg-[#b55367]" style={{ width: "24%" }} />
          </div>
        </Card>
        <div className="mt-6 flex items-center justify-between gap-3">
          <SectionTitle className="mt-0 mb-0" eyebrow="Tren kondisi" title="Tubuhmu bergerak maju" />
          <select value={range} onChange={(e) => setRange(e.target.value)} className="min-h-10 rounded-xl border glass-input px-2 text-xs font-semibold text-[#6b575e]">
            <option>7 hari</option>
            <option>14 hari</option>
          </select>
        </div>
        <Card>
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
                <CartesianGrid stroke="#eadfd7" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" tick={{ fill: "#9c898c", fontSize: 10 }} axisLine={{ stroke: "#eadfd7" }} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fill: "#9c898c", fontSize: 10 }} axisLine={false} tickLine={false} width={35} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #eadfd7", background: "#fffaf6", fontSize: 12 }} formatter={(value) => [`${value}%`, "Progress"]} />
                <Line type="monotone" dataKey="recovery" stroke="#b55367" strokeWidth={3} dot={{ r: 4, fill: "#b55367", stroke: "#fffaf6", strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-[#78656a]">Catatan harian dan pemantauan REEDA membentuk gambaran progres ini. Ini bukan ukuran medis.</p>
        </Card>
        <SectionTitle eyebrow="Kebiasaan baik" title="Yang sudah kamu lakukan" />
        <div className="grid grid-cols-2 gap-3">
          <ActionCard icon={<Droplets />} title="Minum cukup" body="5 dari 7 hari tercatat" tone="blue" />
          <ActionCard icon={<BookOpen />} title="Belajar" body="3 materi selesai" tone="green" />
        </div>
        <Button variant="outline" className="mt-5 w-full" onClick={() => setLocation("/ibu/luka")}>
          Tambah catatan hari ini
        </Button>
      </main>
    </MotherShell>
  );
}
