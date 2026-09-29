import { ArrowLeft, Menu } from "lucide-react";
import { IconButton } from "@/components/perinova-ui";
import { useMotherMenu } from "@/context/MotherMenuContext";

export function AppHeader({ title, subtitle, onBack }: { title?: string; subtitle?: string; onBack?: () => void }) {
  const menu = useMotherMenu();
  return (
    <header className="app-header glass-surface flex items-center justify-between rounded-[1.35rem] mb-8 px-3 py-2.5 sm:px-4 sm:py-3">
      <div className="flex min-w-0 items-center gap-2">
        {onBack && (
          <IconButton label="Kembali" onClick={onBack}>
            <ArrowLeft size={19} />
          </IconButton>
        )}
        <div className="min-w-0">
          {title && <h1 className="serif truncate text-2xl font-semibold text-[#49353d]">{title}</h1>}
          {subtitle && <p className="mt-0.5 truncate text-xs text-[#857276]">{subtitle}</p>}
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {menu && (
          <button type="button" aria-label="Buka menu navigasi" aria-haspopup="dialog" onClick={menu.openMenu} className="glass-menu-trigger md:hidden">
            <Menu size={22} strokeWidth={2} />
          </button>
        )}
      </div>
    </header>
  );
}
