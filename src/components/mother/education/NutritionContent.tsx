import { Apple, Beef, Droplets, Egg, Leaf, Salad } from "lucide-react";
import { Card } from "@/components/perinova-ui";

const nutritionItems = [
  ["01", "Protein setiap hari", "Telur, ikan, ayam, tahu, tempe, kacang-kacangan, atau sumber protein lain yang sesuai dengan pola makanmu."],
  ["02", "Sayur beragam warna", "Tambahkan sayuran hijau dan sayuran berwarna untuk membuat isi piring lebih beragam."],
  ["03", "Buah sebagai pelengkap", "Pilih buah yang mudah dikonsumsi sebagai bagian dari pola makan harian."],
  ["04", "Cukup minum", "Minum air secara berkala sepanjang hari dan sesuaikan dengan rasa haus serta kebutuhan tubuh."],
  ["05", "Sumber zat besi", "Pertimbangkan daging, telur, ikan, kacang-kacangan, atau pangan lain sumber zat besi sesuai kebutuhan."],
  ["06", "Makan teratur dan beragam", "Utamakan makanan yang cukup, seimbang, dan sesuai toleransi tubuh selama masa pemulihan."],
] as const;

const icons = [Beef, Salad, Apple, Droplets, Egg, Leaf];

export function NutritionContent() {
  return (
    <div className="mt-5">
      <Card className="glass-tint-sage p-5 sm:p-6">
        <Leaf className="text-[#557461]" />
        <h2 className="serif mt-3 text-xl font-semibold text-[#405b49]">Isi piring untuk pulih</h2>
        <p className="mt-2 max-w-2xl text-sm leading-[1.75] text-[#557461]">Pilih makanan yang cukup dan beragam agar tubuh mendapat bahan bakar dan zat gizi selama masa pemulihan.</p>
      </Card>

      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        {nutritionItems.map(([n, title, body], index) => {
          const Icon = icons[index];
          return (
            <Card key={n} className="nutrition-card flex gap-4 p-4 sm:p-5">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[rgba(181,83,103,.12)] text-[#a34f62]">
                <Icon size={19} strokeWidth={1.8} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold tracking-[.14em] text-[#b55367]">{n}</span>
                  <h3 className="font-bold leading-tight text-[#59464e]">{title}</h3>
                </div>
                <p className="mt-1.5 text-sm leading-[1.7] text-[#78656a]">{body}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
