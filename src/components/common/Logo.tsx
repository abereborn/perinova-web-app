import { ASSET } from "@/constants/assets";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex items-center ${compact ? "gap-2" : "gap-3"}`}>
      <div className={`glass-logo flex shrink-0 items-center justify-center overflow-hidden ${compact ? "h-10 w-10 rounded-xl p-0.5" : "h-14 w-14 rounded-2xl p-1"}`}>
        <img src={`${ASSET}logo-perinova-removebg.png`} className="h-full w-full object-contain" alt="Logo PERINOVA" />
      </div>
      <div>
        <div className={`serif font-semibold tracking-[.14em] text-[#a64f62] ${compact ? "text-sm" : "text-base"}`}>PERINOVA</div>
        {!compact && <div className="text-[10px] font-medium tracking-[.1em] text-[#7e716f]">DIGITAL PERINEAL CARE</div>}
      </div>
    </div>
  );
}
