import { useState } from "react";
import { Send } from "lucide-react";
import { Button, Notice, TextArea } from "@/components/perinova-ui";
import { getConsultations, saveConsultations, type Consultation } from "@/lib/perinova-store";

export function ResponseForm({ consultation }: { consultation: Consultation }) {
  const [reply, setReply] = useState(consultation.reply || "");
  const [saved, setSaved] = useState(false);
  return (
    <div className="mt-6 border-t border-[#eee2da] pt-5">
      <TextArea label="Balasan untuk pasien" value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Tulis respons yang empatik, jelas, dan menyertakan arahan aman..." />
      <Notice>Hindari diagnosis. Arahkan pemeriksaan langsung bila ada tanda bahaya.</Notice>
      <Button
        className="mt-4"
        disabled={!reply.trim()}
        onClick={() => {
          const next = getConsultations().map((c) => (c.id === consultation.id ? { ...c, reply: reply.trim(), status: "Dijawab" as const } : c));
          saveConsultations(next);
          setSaved(true);
        }}
      >
        <Send size={16} /> Kirim balasan
      </Button>
      {saved && <span className="ml-3 text-xs font-bold text-[#557461]">Balasan tersimpan dan tampil di sisi ibu.</span>}
    </div>
  );
}
