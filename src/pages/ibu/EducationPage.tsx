import { useState } from "react";
import { useLocation } from "wouter";
import { ChevronDown, ChevronRight, MessageCircle } from "lucide-react";
import { AppHeader } from "@/components/layout/AppHeader";
import { MotherShell } from "@/components/layout/MotherShell";
import { CareContent } from "@/components/mother/education/CareContent";
import { NutritionContent } from "@/components/mother/education/NutritionContent";
import { RelaxContent } from "@/components/mother/education/RelaxContent";
import { Card, Notice, Pill, SectionTitle } from "@/components/perinova-ui";
import { ASSET } from "@/constants/assets";

type EducationTab = "kenali" | "rawat" | "nutrisi" | "relaksasi";
type WoundCategory = "perineum" | "caesar";

const woundCategories: { id: WoundCategory; label: string; shortLabel: string; description: string }[] = [
  {
    id: "perineum",
    label: "Luka Perineum",
    shortLabel: "Perineum",
    description: "Gambaran umum perubahan luka pada area perineum setelah persalinan pervaginam.",
  },
  {
    id: "caesar",
    label: "Luka Pasca Caesar (SC)",
    shortLabel: "Pasca Caesar (SC)",
    description: "Gambaran umum perubahan luka pada sayatan perut setelah persalinan Sectio Caesarea (SC).",
  },
];

const woundTimelines: Record<WoundCategory, { image: string; label: string; headline: string; detail: string }[]> = {
  perineum: [
    { image: "H-1.jpeg", label: "Hari ke-1", headline: "Nyeri sekitar 5–7/10", detail: "Nyeri sedang–berat, terutama saat duduk, berjalan, atau BAK." },
    { image: "H-3.jpeg", label: "Hari ke-3", headline: "Nyeri sekitar 4–5/10", detail: "Masih terasa, tetapi mulai berkurang." },
    { image: "H-5.jpeg", label: "Hari ke-5", headline: "Nyeri sekitar 2–4/10", detail: "Nyeri ringan–sedang dan biasanya mulai lebih nyaman." },
    { image: "H-7.jpeg", label: "Hari ke-7", headline: "Nyeri sekitar 1–3/10", detail: "Biasanya sudah jauh lebih ringan." },
    { image: "MingguBerikutnya.jpeg", label: "Minggu ke-2", headline: "Nyeri sekitar 0–2/10", detail: "Umumnya hanya terasa sedikit tidak nyaman." },
    { image: "MingguBerikutnya.jpeg", label: "Minggu ke-3–4", headline: "Nyeri sekitar 0–1/10", detail: "Sebagian besar sudah tidak nyeri jika penyembuhan berjalan normal." },
  ],
  caesar: [
    { image: "Hari-1-Operasi.jpeg", label: "Hari ke-1", headline: "Nyeri sedang–berat", detail: "Mulai mobilisasi dengan bantuan dan lakukan gerakan secara bertahap sesuai kemampuan tubuh." },
    { image: "Hari-3-Operasi.jpeg", label: "Hari ke-3", headline: "Nyeri mulai berkurang", detail: "Mulai lebih aktif secara perlahan, sambil tetap menjaga area sayatan." },
    { image: "Minggu-Ke-1-Operasi.jpeg", label: "Minggu ke-1", headline: "Luka mulai mengering", detail: "Aktivitas ringan dapat dilakukan secara bertahap sesuai rasa nyaman." },
    { image: "Minggu-Ke-2-Operasi.jpeg", label: "Minggu ke-2", headline: "Nyeri minimal", detail: "Aktivitas makin leluasa, tetap perhatikan kondisi luka dan batas nyaman tubuh." },
    { image: "Setelah-Beberapa-Bulan-Operasi.jpeg", label: "Beberapa bulan", headline: "Bekas luka memudar", detail: "Aktivitas umumnya kembali normal sesuai proses pemulihan masing-masing." },
  ],
};

export default function EducationPage() {
  const [, setLocation] = useLocation();
  const [tab, setTab] = useState<EducationTab>("kenali");
  const [woundCategory, setWoundCategory] = useState<WoundCategory>("perineum");

  const tabs = [
    ["kenali", "Kenali luka"],
    ["rawat", "Cara merawat"],
    ["nutrisi", "Nutrisi"],
    ["relaksasi", "Relaksasi"],
  ] as const;

  const activeCategory = woundCategories.find((item) => item.id === woundCategory)!;
  const timeline = woundTimelines[woundCategory];

  return (
    <MotherShell active="edukasi">
      <AppHeader title="Edukasi" subtitle="Informasi yang menemani keputusanmu" />
      <main className="mother-page-main w-full pb-2">
        <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
          {tabs.map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} className={`min-h-10 shrink-0 rounded-full px-4 text-xs font-bold ${tab === id ? "bg-[#b55367] text-white" : "bg-white/50 backdrop-blur-sm text-[#78656a]"}`}>
              {label}
            </button>
          ))}
        </div>

        {tab === "kenali" && (
          <>
            <div className="education-category-switch mt-5" aria-label="Kategori kenali luka">
              {woundCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setWoundCategory(category.id)}
                  className={`education-category-button ${woundCategory === category.id ? "is-active" : ""}`}
                  aria-pressed={woundCategory === category.id}
                >
                  <span className="education-category-title">{category.shortLabel}</span>
                  <span className="education-category-subtitle">{category.id === "perineum" ? "Pasca persalinan normal" : "Sectio Caesarea"}</span>
                </button>
              ))}
            </div>

            <Card className="mt-4 p-5 sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <Pill tone="sage">{activeCategory.label.toUpperCase()}</Pill>
                  <h2 className="serif mt-2 text-2xl font-semibold text-[#493d40]">Perubahan yang bisa diamati</h2>
                </div>
                <p className="max-w-sm text-xs leading-relaxed text-[#8a777c] sm:text-right">{activeCategory.description} Tahapan di bawah adalah gambaran edukatif; setiap tubuh dapat pulih dengan ritme yang berbeda.</p>
              </div>

              <div className="recovery-timeline mt-6" aria-label={`Timeline ${activeCategory.label}`}>
                {timeline.map((stage, index) => {
                  const isLeft = index % 2 === 0;
                  return (
                    <div className={`recovery-step ${isLeft ? "is-left" : "is-right"}`} key={`${stage.label}-${stage.image}`}>
                      <div className="recovery-step-card">
                        <div className="recovery-step-media">
                          <img src={`${ASSET}illustrations/${stage.image}`} alt={`Ilustrasi ${activeCategory.label} ${stage.label.toLowerCase()}`} />
                          <span className="recovery-step-badge">{stage.label}</span>
                        </div>
                        <div className="recovery-step-copy">
                          <p className="text-sm font-bold text-[#493d40]">{stage.headline}</p>
                          <p className="mt-1.5 text-xs leading-[1.7] text-[#78656a]">{stage.detail}</p>
                        </div>
                      </div>
                      <div className="recovery-node" aria-hidden="true">{index + 1}</div>
                      {index < timeline.length - 1 && <ChevronDown className="recovery-connector-mobile" size={18} aria-hidden="true" />}
                    </div>
                  );
                })}
              </div>

              <p className="mt-2 text-[10px] leading-relaxed text-[#927f84]">
                Gambar merupakan media edukasi untuk membantu mengenali gambaran perubahan dari waktu ke waktu, bukan untuk menilai kondisi luka secara mandiri.
              </p>
            </Card>

            <div className="mt-5">
              <SectionTitle className="mt-0" title="Kapan perlu bertanya?" />
              <Notice tone="danger">Bila nyeri makin berat, kemerahan meluas, keluar cairan berbau, atau demam, jangan menunggu. Hubungi pendamping atau fasilitas kesehatan.</Notice>
            </div>
          </>
        )}

        {tab === "rawat" && <CareContent />}
        {tab === "nutrisi" && <NutritionContent />}
        {tab === "relaksasi" && <RelaxContent />}

        <button onClick={() => setLocation("/ibu/konsultasi")} className="mt-6 flex w-full items-center gap-3 rounded-2xl glass-tint-sage p-4 text-left">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-[rgba(87,116,97,.20)] text-[#557461]">
            <MessageCircle size={20} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-[#557461]">Masih ragu?</p>
            <p className="mt-1 text-xs text-[#607866]">Tanyakan pada Sahabat Ibumu.</p>
          </div>
          <ChevronRight size={18} className="text-[#557461]" />
        </button>
      </main>
    </MotherShell>
  );
}
