import { useState } from "react";
import { Button, Field, Modal } from "@/components/perinova-ui";
import { uid, type Reminder } from "@/lib/perinova-store";

export function ReminderModal({ initial, onClose, onSave }: { initial?: Reminder; onClose: () => void; onSave: (r: Reminder) => void }) {
  const [t, setT] = useState(initial?.title ?? "");
  const [time, setTime] = useState(initial?.time ?? "08:00");
  const [category, setCategory] = useState(initial?.category ?? "Perawatan luka");
  const [days, setDays] = useState(initial?.days ?? "Setiap hari");
  const [duration, setDuration] = useState(initial?.duration ?? "");
  return (
    <Modal title={initial ? "Edit pengingat" : "Tambah pengingat"} onClose={onClose}>
      <div className="space-y-4">
        <Field label="Kegiatan" placeholder="Contoh: minum obat" value={t} onChange={(e) => setT(e.target.value)} />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Waktu" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          <label className="block space-y-1.5">
            <span className="text-sm font-semibold text-[#59464e]">Kategori</span>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="min-h-11 w-full rounded-xl border glass-input px-2 text-xs">
              <option>Perawatan luka</option>
              <option>Minum obat</option>
              <option>Minum air</option>
              <option>Istirahat</option>
              <option>Kontrol bidan</option>
            </select>
          </label>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <label className="block space-y-1.5">
            <span className="text-sm font-semibold text-[#59464e]">Hari</span>
            <select value={days} onChange={(e) => setDays(e.target.value)} className="min-h-11 w-full rounded-xl border glass-input px-2 text-xs">
              <option>Setiap hari</option>
              <option>Senin–Jumat</option>
              <option>Sabtu–Minggu</option>
            </select>
          </label>
          <Field label="Durasi (opsional)" placeholder="Contoh: 2 minggu" value={duration} onChange={(e) => setDuration(e.target.value)} />
        </div>
      </div>
      <Button className="mt-5 w-full" disabled={!t.trim()} onClick={() => onSave({ id: initial?.id ?? uid("r"), title: t.trim(), time, active: initial?.active ?? true, category, days, duration })}>
        Simpan pengingat
      </Button>
    </Modal>
  );
}
