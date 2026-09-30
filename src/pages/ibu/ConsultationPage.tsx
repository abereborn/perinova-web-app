import { useState } from "react";
import { useLocation } from "wouter";
import { Bot, ChevronRight, MessageCircle, Plus, Stethoscope } from "lucide-react";
import { AppHeader } from "@/components/layout/AppHeader";
import { MotherShell } from "@/components/layout/MotherShell";
import { ConsultModal } from "@/components/mother/modals/ConsultModal";
import { PeriChat } from "@/components/mother/modals/PeriChat";
import { Button, Card, EmptyState, Pill, SectionTitle } from "@/components/perinova-ui";
import { getConsultations, saveConsultations } from "@/lib/perinova-store";

export default function ConsultationPage() {
  const [, setLocation] = useLocation();
  const [items, setItems] = useState(getConsultations());
  const [modal, setModal] = useState(false);
  const [chat, setChat] = useState(false);
  return (
    <MotherShell active="konsultasi">
      <AppHeader title="Konsultasi" subtitle="Tim Siap Membantu" />
      <main className="mother-page-main pb-2">
        <Card className="mt-5 glass-tint-sage">
          <div className="flex gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-full bg-[rgba(87,116,97,.20)] text-[#557461]">
              <Stethoscope size={21} />
            </div>
            <div>
              <Pill tone="sage">SAHABAT IBU</Pill>
              <h2 className="serif mt-2 text-xl font-semibold text-[#405b49]">Tim pendamping ibu</h2>
              <p className="mt-1 text-xs text-[#607866]">Biasanya membalas dalam 1–2 jam</p>
            </div>
          </div>
          <Button variant="soft" className="mt-4" onClick={() => setModal(true)} data-testid="button-konsultasi-baru">
            <Plus size={16} /> Mulai konsultasi
          </Button>
        </Card>
        <div className="mt-6 flex items-center justify-between gap-3">
          <SectionTitle className="mt-0 mb-0" eyebrow="Asisten cepat" title="PERI-AI" />
          <button onClick={() => setChat(true)} className="text-xs font-bold text-[#a34f62]">
            Buka chat
          </button>
        </div>
        <Card className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-[rgba(181,83,103,.16)] text-[#b55367]">
            <Bot size={20} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-[#59464e]">Tanya dengan kata kunci</p>
            <p className="mt-1 text-xs text-[#8a777c]">Jawaban awal dengan rute aman ke bidan.</p>
          </div>
          <ChevronRight size={18} className="text-[#a34f62]" />
        </Card>
        <SectionTitle eyebrow="Riwayat" title="Percakapanmu" />
        <div className="space-y-3">
          {items.map((c) => (
            <button onClick={() => setLocation(`/ibu/konsultasi/${c.id}`)} key={c.id} className="soft-card lift w-full p-4 text-left">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-[#59464e]">{c.subject}</p>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#8a777c]">{c.message}</p>
                </div>
                <Pill tone={c.status === "Dijawab" ? "sage" : "amber"}>{c.status}</Pill>
              </div>
              <p className="mt-3 text-[11px] text-[#9d898d]">{c.date}</p>
            </button>
          ))}
        </div>
        {items.length === 0 && <EmptyState title="Belum ada percakapan" description="Sahabat Ibu mu siap mendengarkan." />}
      </main>
      {modal && (
        <ConsultModal
          onClose={() => setModal(false)}
          onSave={(c) => {
            const next = [c, ...items];
            setItems(next);
            saveConsultations(next);
            setModal(false);
          }}
        />
      )}
      {chat && <PeriChat onClose={() => setChat(false)} />}
    </MotherShell>
  );
}
