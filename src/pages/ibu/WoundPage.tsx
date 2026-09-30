import { useState } from "react";
import { useLocation } from "wouter";
import { FileText, Pencil, Plus, ShieldCheck, Trash2 } from "lucide-react";
import { AppHeader } from "@/components/layout/AppHeader";
import { MotherShell } from "@/components/layout/MotherShell";
import { ReedaModal } from "@/components/mother/modals/ReedaModal";
import { JournalModal } from "@/components/mother/modals/JournalModal";
import { Button, Card, EmptyState, IconButton, Notice, Pill, SectionTitle } from "@/components/perinova-ui";
import { getJournal, getReeda, saveJournal, saveReeda, type JournalEntry, type WoundStatus } from "@/lib/perinova-store";

export default function WoundPage() {
  const [, setLocation] = useLocation();
  const [reeda, setReeda] = useState(getReeda());
  const [modal, setModal] = useState(false);
  const [journal, setJournal] = useState(getJournal());
  const [journalModal, setJournalModal] = useState(false);
  const [editing, setEditing] = useState<JournalEntry | null>(null);
  const hasDanger = reeda.fever > 0 || reeda.odor > 0 || reeda.bleeding > 0 || reeda.pain >= 8;
  const status: WoundStatus = hasDanger ? "bahaya" : reeda.redness + reeda.edema + reeda.ecchymosis + reeda.discharge + (2 - reeda.approximation) >= 6 ? "perlu-perhatian" : "baik";
  const deleteEntry = (id: string) => {
    if (!window.confirm("Hapus catatan ini?")) return;
    const next = journal.filter((j) => j.id !== id);
    setJournal(next);
    saveJournal(next);
  };
  return (
    <MotherShell active="luka">
      <AppHeader title="Kondisi luka" subtitle="Pantau perubahan dari hari ke hari" />
      <main className="mother-page-main w-full">
        <Card className={`mt-5 ${status === "baik" ? "glass-tint-sage" : status === "bahaya" ? "glass-tint-danger" : "glass-tint-amber"}`}>
          <div className="flex items-start gap-3">
            <div
              className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${status === "baik" ? "bg-[rgba(87,116,97,.20)] text-[#557461]" : status === "bahaya" ? "bg-[rgba(160,61,58,.20)] text-[#a03d3a]" : "bg-[rgba(152,107,43,.20)] text-[#986b2b]"}`}
            >
              <ShieldCheck size={24} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wider text-[#7d6b70]">Hasil pemantauan</p>
              <h2 className="serif mt-0.5 text-xl font-semibold leading-tight text-[#493d40]">{status === "baik" ? "Terlihat stabil" : status === "bahaya" ? "Perlu segera diperiksa" : "Perlu diperhatikan"}</h2>
            </div>
          </div>
          <p className="mt-4 text-sm leading-[1.7] text-[#66545a]">
            {status === "baik"
              ? "Dari jawabanmu hari ini, belum terlihat tanda yang mengkhawatirkan. Tetap pantau dan dengarkan tubuhmu."
              : status === "bahaya"
                ? "Ada tanda bahaya yang perlu dibicarakan sekarang. Hubungi pendamping atau fasilitas kesehatan, jangan menunggu respons AI."
                : "Ada perubahan yang sebaiknya dibicarakan dengan pendamping agar kamu mendapat arahan yang tepat."}
          </p>
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {status === "bahaya" && (
              <Button variant="danger" className="w-full" onClick={() => setLocation("/ibu/bahaya")}>
                Lihat langkah aman
              </Button>
            )}
            <Button variant="outline" className="w-full" onClick={() => setModal(true)} data-testid="button-reeda">
              Isi penilaian REEDA
            </Button>
          </div>
        </Card>
        <div className="mt-4">
          <Notice>REEDA membantu mencatat tanda yang terlihat. Hasil ini bukan diagnosis dan tidak menggantikan pemeriksaan langsung.</Notice>
        </div>
        <SectionTitle
          eyebrow="Jurnal luka"
          title="Catatan pemulihanmu"
          action={
            <Button
              variant="soft"
              className="px-3"
              onClick={() => {
                setEditing(null);
                setJournalModal(true);
              }}
              data-testid="button-tambah-jurnal"
            >
              <Plus size={16} /> Catat
            </Button>
          }
        />
        {journal.length === 0 ? (
          <EmptyState title="Belum ada catatan" description="Simpan pengamatan sederhana agar kamu dan pendamping dapat melihat perubahan." action={<Button onClick={() => setJournalModal(true)}>Buat catatan</Button>} />
        ) : (
          <div className="space-y-3">
            {journal.map((entry) => (
              <Card key={entry.id} className="p-3">
                <div className="flex gap-3">
                  {entry.photo ? (
                    <img src={entry.photo} alt="Foto catatan luka" className="h-16 w-16 rounded-xl object-cover" />
                  ) : (
                    <div className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-[rgba(181,83,103,.16)] text-[#b55367]">
                      <FileText size={21} />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between gap-2">
                      <p className="text-xs font-bold text-[#8b777d]">{entry.date}</p>
                      <Pill tone={entry.status === "baik" ? "sage" : "amber"}>{entry.status === "baik" ? "Stabil" : "Pantau"}</Pill>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-[#59464e]">{entry.note}</p>
                  </div>
                </div>
                <div className="mt-3 flex justify-end gap-1 border-t border-[#eee2da] pt-2">
                  <IconButton
                    label="Edit catatan"
                    onClick={() => {
                      setEditing(entry);
                      setJournalModal(true);
                    }}
                  >
                    <Pencil size={16} />
                  </IconButton>
                  <IconButton label="Hapus catatan" onClick={() => deleteEntry(entry.id)}>
                    <Trash2 size={16} />
                  </IconButton>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
      {modal && (
        <ReedaModal
          initial={reeda}
          onClose={() => setModal(false)}
          onSave={(v) => {
            setReeda(v);
            saveReeda(v);
            setModal(false);
          }}
        />
      )}
      {journalModal && (
        <JournalModal
          entry={editing}
          onClose={() => setJournalModal(false)}
          onSave={(e) => {
            const next = editing ? journal.map((j) => (j.id === e.id ? e : j)) : [e, ...journal];
            setJournal(next);
            saveJournal(next);
            setJournalModal(false);
          }}
        />
      )}
    </MotherShell>
  );
}
