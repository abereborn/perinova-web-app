import { useState } from "react";
import { Button, Modal, Notice, TextArea } from "@/components/perinova-ui";
import type { ReedaValues } from "@/lib/perinova-store";

export function ReedaModal({ initial, onClose, onSave }: { initial: ReedaValues; onClose: () => void; onSave: (v: ReedaValues) => void }) {
  const [values, setValues] = useState(initial);
  const fields: [keyof ReedaValues, string][] = [
    ["redness", "Kemerahan"],
    ["edema", "Bengkak"],
    ["ecchymosis", "Memar"],
    ["discharge", "Cairan keluar"],
    ["approximation", "Tepi luka menyatu"],
  ];
  const safetyFields: Array<[keyof ReedaValues, string, string[]]> = [
    ["fever", "Demam", ["Tidak", "Ya"]],
    ["odor", "Bau tidak normal", ["Tidak", "Ya"]],
    ["bleeding", "Perdarahan bertambah", ["Tidak", "Ya"]],
    ["mobility", "Kesulitan duduk atau berjalan", ["Tidak", "Sedikit", "Berat"]],
  ];
  return (
    <Modal title="Penilaian REEDA" onClose={onClose}>
      <p className="mb-4 text-sm leading-relaxed text-[#78656a]">Pilih yang paling sesuai dengan kondisi yang kamu lihat saat ini.</p>
      <div className="space-y-4">
        {fields.map(([key, label]) => (
          <div key={key}>
            <p className="mb-2 text-sm font-bold text-[#59464e]">{label}</p>
            <div className="grid grid-cols-3 gap-2">
              {(key === "approximation" ? ["Terpisah", "Sebagian", "Menyatu"] : ["Tidak ada", "Ringan", "Jelas"]).map((option, i) => (
                <button
                  key={option}
                  onClick={() => setValues({ ...values, [key]: i })}
                  className={`min-h-11 rounded-xl border px-2 text-xs font-semibold ${values[key] === i ? "border-[#b55367] bg-[rgba(181,83,103,.16)] text-[#9b4b5c]" : "glass-input text-[#76656a]"}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
        <div className="border-t border-[#eee2da] pt-4">
          <p className="mb-3 text-sm font-bold text-[#59464e]">Tanda yang perlu diperhatikan</p>
          <div className="space-y-3">
            {safetyFields.map(([key, label, options]) => (
              <div key={key}>
                <p className="mb-2 text-xs font-semibold text-[#78656a]">{label}</p>
                <div className="grid grid-cols-3 gap-2">
                  {options.map((option, i) => (
                    <button
                      key={option}
                      onClick={() => setValues({ ...values, [key]: i })}
                      className={`min-h-10 rounded-xl border px-2 text-xs font-semibold ${values[key] === i ? "border-[#b94846] glass-tint-danger text-[#9c3d3b]" : "glass-input text-[#76656a]"}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <label className="mt-3 block space-y-1.5">
            <span className="text-xs font-semibold text-[#78656a]">Tingkat nyeri: {values.pain}/10</span>
            <input type="range" min="0" max="10" value={values.pain} onChange={(e) => setValues({ ...values, pain: Number(e.target.value) })} className="w-full accent-[#b55367]" />
          </label>
          <TextArea label="Keluhan lainnya (opsional)" value={values.complaints} onChange={(e) => setValues({ ...values, complaints: e.target.value })} placeholder="Contoh: terasa lebih nyaman saat berbaring..." />
        </div>
      </div>
      <Notice>Ini adalah catatan pemantauan mandiri, bukan diagnosis medis.</Notice>
      <Button className="mt-5 w-full" onClick={() => onSave(values)} data-testid="button-simpan-reeda">
        Simpan penilaian
      </Button>
    </Modal>
  );
}
