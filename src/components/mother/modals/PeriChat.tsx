import { useState } from "react";
import { IconButton, Modal, Notice } from "@/components/perinova-ui";
import { Send } from "lucide-react";

export function PeriChat({ onClose }: { onClose: () => void }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([{ from: "bot", text: "Halo, aku PERI-AI. Ceritakan singkat apa yang kamu rasakan. Aku akan membantu mengarahkan, bukan mendiagnosis." }]);
  const send = () => {
    if (!input.trim()) return;
    const lower = input.toLowerCase();
    const danger = ["demam", "bau", "nanah", "darah banyak", "nyeri hebat", "pusing"].some((k) => lower.includes(k));
    setMessages([
      ...messages,
      { from: "user", text: input },
      {
        from: "bot",
        text: danger
          ? "Kata kunci ini perlu diperhatikan. Untuk keamananmu, sebaiknya hubungi bidan sekarang atau fasilitas kesehatan bila terasa berat. Jangan menunggu jawaban chat."
          : "Terima kasih sudah bercerita. Jaga area tetap bersih dan kering, istirahat, lalu pantau perubahannya. Jika memburuk, konsultasikan pada bidan.",
      },
    ]);
    setInput("");
  };
  return (
    <Modal title="PERI-AI" onClose={onClose}>
      <div className="max-h-72 space-y-3 overflow-y-auto rounded-2xl bg-white/30 backdrop-blur-sm p-3">
        {messages.map((m, i) => (
          <div key={i} className={`max-w-[88%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${m.from === "user" ? "ml-auto bg-[#b55367] text-white" : "bg-white/55 backdrop-blur-md text-[#59464e]"}`}>
            {m.text}
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Tulis pesan..." className="min-h-11 flex-1 rounded-xl border glass-input px-3 text-sm" />
        <IconButton label="Kirim" onClick={send}>
          <Send size={18} />
        </IconButton>
      </div>
      <Notice>PERI-AI bukan tenaga kesehatan. Jawaban tidak menggantikan pemeriksaan.</Notice>
    </Modal>
  );
}
