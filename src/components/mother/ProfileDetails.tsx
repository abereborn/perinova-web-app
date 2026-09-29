import { SectionTitle } from "@/components/perinova-ui";
import type { Profile } from "@/lib/perinova-store";

export function ProfileDetails({ profile }: { profile: Profile }) {
  return (
    <div className="mt-5 rounded-2xl border glass-card p-4">
      <SectionTitle eyebrow="Data diri" title="Informasi pemulihan" />
      <div className="grid grid-cols-2 gap-4 text-sm">
        {[
          ["Usia", profile.age ? `${profile.age} tahun` : "Belum diisi"],
          ["Nomor HP", profile.phone],
          ["Tanggal persalinan", profile.deliveryDate ?? "Belum diisi"],
          ["Jenis persalinan", profile.deliveryType ?? "Belum diisi"],
          ["Usia kehamilan", profile.gestationalAge ?? "Belum diisi"],
          ["Paritas", profile.parity ?? "Belum diisi"],
          ["Luka/jahitan", profile.wound ?? "Belum diisi"],
          ["Derajat luka", profile.woundDegree ?? "Belum diisi"],
          ["Bidan", profile.midwife ?? "Belum diisi"],
        ].map(([label, value]) => (
          <div key={label}>
            <p className="text-[11px] text-[#9a878b]">{label}</p>
            <p className="mt-1 font-semibold text-[#59464e]">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
