import { useState } from "react";
import { Button, Field, Modal, Notice, TextArea } from "@/components/perinova-ui";
import { uid, type Consultation } from "@/lib/perinova-store";
import { getLocalDate } from "@/lib/local-time";

export function ConsultModal({ onClose, onSave }: { onClose: () => void; onSave: (c: Consultation) => void }) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  return (
    <Modal title="Mulai konsultasi" onClose={onClose}>
      <div className="space-y-4">
        <Field label="Topik" placeholder="Contoh: rasa nyeri" value={subject} onChange={(e) => setSubject(e.target.value)} />
        <TextArea label="Ceritakan yang kamu rasakan" placeholder="Semakin detail, semakin membantu bidan memahami..." value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>
      <Notice>Untuk keadaan darurat, hubungi fasilitas kesehatan terdekat segera.</Notice>
      <Button className="mt-5 w-full" disabled={!subject.trim() || !message.trim()} onClick={() => onSave({ id: uid("c"), subject, message, date: getLocalDate(), status: "Menunggu" })}>
        Kirim ke bidan
      </Button>
    </Modal>
  );
}
