import { useLocation } from "wouter";
import { LogOut } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { providerNavItems } from "@/data/navigation";
import { setSession } from "@/lib/perinova-store";
import type { ReactNode } from "react";

export function ProviderShell({ children }: { children: ReactNode }) {
  const [, setLocation] = useLocation();
  return (
    <div className="provider-shell">
      <div className="provider-shell-frame min-h-[100dvh]">
        <aside className="provider-desktop-sidebar glass-sidebar hidden w-[272px] shrink-0 flex-col p-6 text-white lg:flex">
          <Logo />
          <p className="mt-10 text-xs font-bold uppercase tracking-[.18em] text-[#d2e2d4]">Ruang bidan</p>
          <div className="mt-5 space-y-2">
            {providerNavItems.map(({ path, label, icon: I }) => (
              <button key={String(path)} onClick={() => setLocation(String(path))} className="flex min-h-12 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-semibold transition hover:bg-white/10">
                <I size={18} />
                {String(label)}
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              setSession(null);
              setLocation("/masuk");
            }}
            className="mt-auto flex min-h-12 w-full items-center gap-3 rounded-xl px-3 text-sm font-semibold text-[#e6efe7]"
          >
            <LogOut size={18} /> Keluar
          </button>
        </aside>
        <main className="provider-main w-full">
          <div className="provider-mobile-nav mb-6 flex gap-2 overflow-x-auto md:hidden">
            {providerNavItems.map(({ path, label }) => (
              <button key={path} onClick={() => setLocation(path)} className="min-h-10 shrink-0 rounded-full bg-[rgba(87,116,97,.16)] px-4 text-xs font-bold text-[#557461]">
                {label}
              </button>
            ))}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
