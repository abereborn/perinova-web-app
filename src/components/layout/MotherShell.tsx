import { useEffect, useState, type ReactNode } from "react";
import { useLocation } from "wouter";
import { LogOut } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { AppHeader } from "@/components/layout/AppHeader";
import { MotherMenuContext } from "@/context/MotherMenuContext";
import { motherNavItems } from "@/data/navigation";
import { setSession } from "@/lib/perinova-store";

export function MotherDesktopSidebar({ active }: { active: string }) {
  const [, setLocation] = useLocation();
  return (
    <aside className="mother-desktop-sidebar glass-sidebar hidden lg:flex">
      <div className="flex h-full flex-col p-6">
        <Logo />
        <div className="mt-10">
          <p className="px-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#e9f2ea]">Menu ibu</p>
          <nav className="mt-3 space-y-1.5" aria-label="Navigasi ibu">
            {motherNavItems.map((item) => {
              const I = item.icon;
              const key = item.path.split("/").pop() || "";
              const isActive = active === key;
              return (
                <button key={item.path} type="button" onClick={() => setLocation(item.path)} aria-current={isActive ? "page" : undefined} className={`glass-side-nav-item ${isActive ? "is-active" : ""}`}>
                  <I size={18} strokeWidth={1.9} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
        <div className="mt-auto space-y-3">
          <div className="glass-side-note">
            <p className="text-xs font-semibold text-white">Ruang pemulihan</p>
            <p className="mt-1 text-[11px] leading-relaxed text-white/75">Catatan dan pemantauan tersimpan di perangkat ini.</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setSession(null);
              setLocation("/masuk");
            }}
            className="glass-side-logout"
          >
            <LogOut size={17} />
            <span>Keluar</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

export function MotherMobileMenu({ active, open, onClose }: { active: string; open: boolean; onClose: () => void }) {
  const [, setLocation] = useLocation();
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;
  const go = (path: string) => {
    onClose();
    setLocation(path);
  };

  return (
    <div className="mother-mobile-menu fixed inset-0 z-[70] md:hidden" role="dialog" aria-modal="true" aria-label="Menu navigasi PERINOVA">
      <button type="button" aria-label="Tutup menu" className="mother-mobile-menu-backdrop absolute inset-0" onClick={onClose} />
      <aside className="mother-mobile-menu-panel glass-sidebar absolute inset-y-0 left-0 flex w-[min(86vw,340px)] flex-col overflow-y-auto p-5 text-white shadow-2xl">
        <div className="flex items-center justify-between gap-3">
          <Logo />
          <button type="button" aria-label="Tutup menu" onClick={onClose} className="glass-menu-close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <p className="mt-8 px-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#e9f2ea]">Menu ibu</p>
        <nav className="mt-3 space-y-1.5" aria-label="Navigasi ibu mobile">
          {motherNavItems.map((item) => {
            const I = item.icon;
            const isActive = active === item.path.split("/").pop();
            return (
              <button
                key={item.path}
                type="button"
                data-testid={`mobile-nav-${item.label.toLowerCase()}`}
                aria-current={isActive ? "page" : undefined}
                onClick={() => go(item.path)}
                className={`glass-mobile-nav-item ${isActive ? "is-active" : ""}`}
              >
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10">
                  <I size={18} strokeWidth={1.9} />
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="mt-auto space-y-3 pt-8">
          <div className="glass-side-note">
            <p className="text-xs font-semibold text-white">Ruang pemulihan</p>
            <p className="mt-1 text-[11px] leading-relaxed text-white/75">Catatan dan pemantauan tersimpan di perangkat ini.</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setSession(null);
              onClose();
              setLocation("/masuk");
            }}
            className="glass-side-logout"
          >
            <LogOut size={17} />
            <span>Keluar</span>
          </button>
        </div>
      </aside>
    </div>
  );
}

export function MotherShell({ children, active }: { children: ReactNode; active: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);

  return (
    <MotherMenuContext.Provider value={{ openMenu }}>
      <div className="mother-app-shell min-h-[100dvh]">
        <MotherDesktopSidebar active={active} />
        <div className="mother-app-main min-w-0">
          <div className="mother-app-content mx-auto w-full max-w-[1500px] min-w-0 px-4 pb-8 pt-4 sm:px-6 lg:px-10 lg:pb-10 lg:pt-7">{children}</div>
        </div>
        <MotherMobileMenu active={active} open={menuOpen} onClose={closeMenu} />
      </div>
    </MotherMenuContext.Provider>
  );
}

