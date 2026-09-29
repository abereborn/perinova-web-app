import type { ReactNode } from "react";
import { Card } from "@/components/perinova-ui";

export function QuickTile({ icon, title, value, onClick }: { icon: ReactNode; title: string; value: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="soft-card lift home-quick-tile p-3 text-left">
      <div className="mb-2.5 grid h-8 w-8 place-items-center rounded-lg bg-[rgba(181,83,103,.16)] text-[#b55367]">{icon}</div>
      <p className="text-[11px] text-[#8b777d]">{title}</p>
      <p className="mt-0.5 text-xs font-bold text-[#59464e]">{value}</p>
    </button>
  );
}

export function ActionCard({ icon, title, body, tone }: { icon: ReactNode; title: string; body: string; tone: "blue" | "green" }) {
  return (
    <Card className="p-3">
      <div className={`mb-3 grid h-9 w-9 place-items-center rounded-xl ${tone === "blue" ? "bg-[rgba(86,121,132,.16)] text-[#567984]" : "bg-[rgba(87,116,97,.16)] text-[#557461]"}`}>{icon}</div>
      <p className="text-sm font-bold text-[#59464e]">{title}</p>
      <p className="mt-1 text-xs leading-relaxed text-[#8a777c]">{body}</p>
    </Card>
  );
}
