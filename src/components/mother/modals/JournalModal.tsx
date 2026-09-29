import { useState } from "react";
import { Camera } from "lucide-react";
import { Button, Modal, TextArea, Pill } from "@/components/perinova-ui";
import { uid } from "@/lib/perinova-store";
import { getLocalDate } from "@/lib/local-time";
import type { JournalEntry, WoundStatus } from "@/lib/perinova-store";

export function JournalModal({ entry, onClose, onSave }: { entry: JournalEntry | null; onClose: () => void; onSave: (e: JournalEntry) => void }) {
  const [note, setNote] = useState(entry?.note ?? "");
  const [status, setStatus] = useState<WoundStatus>(entry?.status ?? "baik");
  const [photo, setPhoto] = useState(entry?.photo ?? "");
  return (
    <Modal title={entry ? "Edit catatan" : "Catatan luka hari ini"} onClose={onClose}>
      <div className="space-y-4">
        <TextArea label="Apa yang kamu rasakan atau lihat?" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Contoh: terasa lebih nyaman saat berjalan..." />
        <label className="block">
          <span className="text-sm font-semibold text-[#59464e]">Foto (opsional)</span>
          <div className="mt-1.5 flex items-center gap-3">
            <label className="grid h-20 w-20 cursor-pointer place-items-center overflow-hidden rounded-xl glass-input border-dashed text-[#b55367]">
              {photo ? <img src={photo} className="h-full w-full object-cover" alt="Pratinjau foto" /> : <Camera size={22} />}
              <input
                className="hidden"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => setPhoto(String(reader.result));
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </label>
            <span className="text-xs leading-relaxed text-[#8a777c]">Foto tersimpan di perangkat ini dan hanya untuk demo.</span>
          </div>
        </label>
        <div>
          <p className="mb-2 text-sm font-semibold text-[#59464e]">Kondisi umum</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              ["baik", "Stabil"],
              ["perlu-perhatian", "Pantau"],
              ["bahaya", "Bahaya"],
            ].map(([v, l]) => (
              <button
                key={v}
                onClick={() => setStatus(v as WoundStatus)}
                className={`min-h-11 rounded-xl border text-xs font-bold ${status === v ? "border-[#b55367] bg-[rgba(181,83,103,.16)] text-[#9b4b5c]" : "glass-input text-[#78656a]"}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
      <Button className="mt-5 w-full" onClick={() => note.trim() && onSave({ id: entry?.id ?? uid("journal"), date: entry?.date ?? getLocalDate(), note: note.trim(), photo, status })} disabled={!note.trim()} data-testid="button-simpan-catatan">
        Simpan catatan
      </Button>
    </Modal>
  );
}
