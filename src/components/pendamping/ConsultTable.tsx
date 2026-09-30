import { ChevronRight } from "lucide-react";
import { Pill } from "@/components/perinova-ui";
import { getConsultations } from "@/lib/perinova-store";

export function ConsultTable({ onClick }: { onClick: (id: string) => void }) {
  const items = getConsultations();
  return (
    <div className="divide-y divide-[#eee2da]">
      {items.map((c) => (
        <button key={c.id} onClick={() => onClick(c.id)} className="flex min-h-20 w-full items-center gap-3 py-3 text-left">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-[rgba(181,83,103,.20)] text-xs font-bold text-[#95485a]">AP</div>
          <div className="flex-1">
            <p className="text-sm font-bold text-[#59464e]">{c.subject}</p>
            <p className="mt-1 text-xs text-[#8a777c]">Alya Putri · {c.date}</p>
          </div>
          <Pill tone={c.status === "Dijawab" ? "sage" : "amber"}>{c.status}</Pill>
          <ChevronRight size={16} />
        </button>
      ))}
    </div>
  );
}
