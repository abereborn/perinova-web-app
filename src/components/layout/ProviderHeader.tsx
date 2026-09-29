import { UserRound } from "lucide-react";
import { Logo } from "@/components/common/Logo";

export function ProviderHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="provider-header-card">
      <div className="provider-header-copy">
        <div className="mb-5 md:hidden">
          <Logo />
        </div>
        <p className="provider-eyebrow">Ruang bidan PERINOVA</p>
        <h1 className="serif provider-header-title mt-1.5 text-3xl font-semibold text-[#49353d]">{title}</h1>
        {subtitle && <p className="provider-header-subtitle mt-2 text-sm text-[#7d6b70]">{subtitle}</p>}
      </div>
      <div className="provider-profile-chip">
        <div className="provider-avatar" aria-hidden="true"><UserRound size={17} /></div>
        <div className="hidden sm:block">
          <p className="text-sm font-bold text-[#59464e]">Rani Kusuma</p>
          <p className="text-xs text-[#8a777c]">Sahabat Ibu</p>
        </div>
      </div>
    </header>
  );
}
