import { Droplets, HeartHandshake, Moon, ShieldCheck, Sparkles, Wind } from "lucide-react";
import { Card } from "@/components/perinova-ui";

const careSteps = [
  ["01", "Bilas dengan air bersih", "Gunakan air bersih setelah buang air, lalu tepuk perlahan hingga kering."],
  ["02", "Jaga tetap kering", "Ganti pembalut secara teratur dan pilih pakaian dalam yang nyaman."],
  ["03", "Berikan waktu istirahat", "Hindari duduk terlalu lama dan beri tubuh kesempatan untuk beristirahat."],
  ["04", "Cuci tangan sebelum menyentuh area luka", "Biasakan membersihkan tangan sebelum dan sesudah merawat area yang sensitif."],
  ["05", "Bergerak secara bertahap", "Mulai dari aktivitas ringan sesuai rasa nyaman dan ikuti batas yang diberikan tenaga kesehatan."],
  ["06", "Perhatikan perubahan yang muncul", "Catat bila nyeri bertambah atau muncul kemerahan, cairan berbau, demam, atau keluhan baru."],
] as const;

const icons = [Droplets, ShieldCheck, Moon, Sparkles, Wind, HeartHandshake];

export function CareContent() {
  return (
    <div className="mt-5 grid gap-3 lg:grid-cols-2">
      {careSteps.map(([n, title, body], index) => {
        const Icon = icons[index];
        return (
          <Card key={n} className="care-step-card flex gap-4 p-4 sm:p-5">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[rgba(87,116,97,.14)] text-[#557461]">
              <Icon size={19} strokeWidth={1.8} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="serif text-xl text-[#c17c88]">{n}</span>
                <h3 className="font-bold leading-tight text-[#59464e]">{title}</h3>
              </div>
              <p className="mt-1.5 text-sm leading-[1.7] text-[#78656a]">{body}</p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
