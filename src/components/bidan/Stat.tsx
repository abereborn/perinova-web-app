import type { ReactNode } from "react";
import { Card } from "@/components/perinova-ui";

export function Stat({ label, value, icon, tone }: { label: string; value: string; icon: ReactNode; tone: "sage" | "rose" | "blue" }) {
  const c = { sage: "bg-[rgba(87,116,97,.16)] text-[#557461]", rose: "bg-[rgba(181,83,103,.16)] text-[#a34f62]", blue: "bg-[rgba(86,121,132,.16)] text-[#567984]" };
  return (
    <Card className="flex items-center gap-4">
      <div className={`grid h-11 w-11 place-items-center rounded-xl ${c[tone]}`}>{icon}</div>
      <div>
        <p className="text-xs text-[#8a777c]">{label}</p>
        <p className="serif text-2xl font-semibold text-[#49353d]">{value}</p>
      </div>
    </Card>
  );
}
