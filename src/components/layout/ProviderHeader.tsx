import { UserRound } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { findAccountById, getSession } from "@/lib/perinova-store";

export function ProviderHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  const session = getSession();
  const account = session ? findAccountById(session.userId) : null;
  const pendampingName = account?.profile.name?.trim() || "Pendamping";

  return (
    <header className="provider-header-card">
      <div className="provider-header-copy">
        <div className="mb-5 md:hidden">
          <Logo />
        </div>
        <p className="provider-eyebrow">Ruang pendamping PERINOVA</p>
        <h1 className="serif provider-header-title mt-1.5 text-3xl font-semibold text-[#49353d]">{title}</h1>
        {subtitle && <p className="provider-header-subtitle mt-2 text-sm text-[#7d6b70]">{subtitle}</p>}
      </div>
      <div className="provider-profile-chip">
        <div className="provider-avatar" aria-hidden="true"><UserRound size={17} /></div>
        <div className="hidden sm:block">
          <p className="text-sm font-bold text-[#59464e]">{pendampingName}</p>
          <p className="text-xs text-[#8a777c]">Sahabat Ibu</p>
        </div>
      </div>
    </header>
  );
}
