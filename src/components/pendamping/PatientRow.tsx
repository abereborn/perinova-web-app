import { ChevronRight } from "lucide-react";
import { Pill } from "@/components/perinova-ui";
import type { Patient } from "@/data/patients";

export function PatientRow({ patient, onClick }: { patient: Patient; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex min-h-16 w-full items-center gap-3 rounded-xl p-2 text-left hover:bg-white/40">
      <div className="grid h-10 w-10 place-items-center rounded-full bg-[rgba(181,83,103,.20)] text-xs font-bold text-[#95485a]">{patient.initials}</div>
      <div className="flex-1">
        <p className="text-sm font-bold text-[#59464e]">{patient.name}</p>
        <p className="text-xs text-[#8a777c]">
          Hari ke-{patient.day} · {patient.last}
        </p>
      </div>
      <Pill tone={patient.status === "Stabil" ? "sage" : "amber"}>{patient.status}</Pill>
      <ChevronRight size={17} className="text-[#a68e91]" />
    </button>
  );
}
