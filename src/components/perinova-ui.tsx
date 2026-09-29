import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { Check, ChevronRight, CircleAlert, Info, Loader2, X } from "lucide-react";

export function Button({ className = "", variant = "primary", children, type = "button", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "soft" | "outline" | "danger" }) {
  const styles = {
    primary: "glass-btn-primary",
    soft: "glass-btn-soft",
    outline: "glass-btn-outline",
    danger: "glass-btn-danger",
  };
  return (
    <button
      type={type}
      {...props}
      className={`inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold leading-tight transition-all duration-200 active:scale-[.97] disabled:cursor-not-allowed disabled:opacity-55 ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
export function IconButton({ label, children, type = "button", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { label: string; children: ReactNode }) {
  return (
    <button
      type={type}
      {...props}
      aria-label={label}
      title={label}
      className={`grid min-h-11 min-w-11 place-items-center rounded-xl text-[rgb(var(--pv-ink-soft))] transition-all duration-200 hover:bg-white/50 hover:text-[rgb(var(--pv-rose-deep))] ${props.className ?? ""}`}
    >
      {children}
    </button>
  );
}
export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`glass-card p-4 ${className}`}>{children}</section>;
}
export function SectionTitle({ eyebrow, title, action, className = "" }: { eyebrow?: string; title: string; action?: ReactNode; className?: string }) {
  return (
    <div data-section-title className={`mt-8 mb-4 flex items-end justify-between gap-3 ${className}`}>
      <div className="min-w-0">
        {eyebrow && <p className="mb-1.5 text-[11px] font-bold uppercase tracking-[.18em] text-[rgb(var(--pv-rose-deep))]">{eyebrow}</p>}
        <h2 className="serif text-xl font-semibold leading-tight tracking-tight text-[rgb(var(--pv-ink))]">{title}</h2>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
export function Field({ label, error, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-semibold text-[rgb(var(--pv-ink))]">{label}</span>
      <input {...props} className={`glass-input min-h-11 w-full rounded-xl px-3.5 text-sm text-[rgb(var(--pv-ink))] outline-none placeholder:text-[rgb(var(--pv-ink-soft))]/70 ${error ? "border-[rgba(160,61,58,.5)]" : ""}`} />
      {error && <span className="text-xs font-medium text-[rgb(var(--pv-danger))]">{error}</span>}
    </label>
  );
}
export function TextArea({ label, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-semibold text-[rgb(var(--pv-ink))]">{label}</span>
      <textarea {...props} className="glass-input min-h-24 w-full resize-y rounded-xl px-3.5 py-3 text-sm text-[rgb(var(--pv-ink))] outline-none placeholder:text-[rgb(var(--pv-ink-soft))]/70" />
    </label>
  );
}
export function Pill({ children, tone = "sage" }: { children: ReactNode; tone?: "sage" | "rose" | "amber" | "red" }) {
  const c = {
    sage: "bg-[rgba(87,116,97,.16)] text-[rgb(var(--pv-sage))] border border-[rgba(87,116,97,.22)]",
    rose: "bg-[rgba(181,83,103,.16)] text-[rgb(var(--pv-rose-deep))] border border-[rgba(181,83,103,.22)]",
    amber: "bg-[rgba(152,107,43,.16)] text-[rgb(var(--pv-amber))] border border-[rgba(152,107,43,.22)]",
    red: "bg-[rgba(160,61,58,.16)] text-[rgb(var(--pv-danger))] border border-[rgba(160,61,58,.24)]",
  };
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide backdrop-blur-sm ${c[tone]}`}>{children}</span>;
}
export function Notice({ children, tone = "info" }: { children: ReactNode; tone?: "info" | "danger" | "success" }) {
  const c = { info: "glass-surface text-[rgb(var(--pv-ink-soft))]", danger: "glass-tint-danger text-[rgb(var(--pv-danger))]", success: "glass-tint-sage text-[rgb(var(--pv-sage))]" };
  return (
    <div className={`flex gap-2.5 rounded-xl p-3 mt-5 text-xs leading-relaxed ${c[tone]}`}>
      {tone === "danger" ? <CircleAlert className="mt-0.5 shrink-0" size={16} /> : tone === "success" ? <Check className="mt-0.5 shrink-0" size={16} /> : <Info className="mt-0.5 shrink-0" size={16} />}
      {children}
    </div>
  );
}
export function LoadingState() {
  return (
    <div className="space-y-3" aria-label="Memuat">
      <div className="glass-surface h-24 animate-pulse rounded-2xl" />
      <div className="glass-surface h-20 animate-pulse rounded-2xl" />
      <div className="glass-surface h-20 animate-pulse rounded-2xl" />
    </div>
  );
}
export function EmptyState({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return (
    <div className="glass-panel border-dashed p-8 text-center">
      <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-[rgba(181,83,103,.16)] text-[rgb(var(--pv-rose-deep))]">
        <Info size={22} />
      </div>
      <h3 className="serif text-lg font-semibold text-[rgb(var(--pv-ink))]">{title}</h3>
      <p className="mx-auto mt-1 max-w-xs text-sm leading-relaxed text-[rgb(var(--pv-ink-soft))]">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
export function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  return (
    <div
      className="glass-modal-backdrop fixed inset-0 z-50 grid place-items-end p-3 sm:place-items-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="glass-modal fade-up max-h-[90dvh] w-full max-w-md overflow-y-auto rounded-3xl p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="serif text-xl font-semibold text-[rgb(var(--pv-ink))]">{title}</h2>
          <IconButton label="Tutup" onClick={onClose}>
            <X size={19} />
          </IconButton>
        </div>
        {children}
      </div>
    </div>
  );
}
export function ArrowLink({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="inline-flex min-h-11 items-center gap-1 text-sm font-bold text-[rgb(var(--pv-rose-deep))] transition-colors hover:text-[rgb(var(--pv-rose))]">
      {children}
      <ChevronRight size={16} />
    </button>
  );
}
export function Saving() {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-[rgb(var(--pv-rose-deep))]">
      <Loader2 className="animate-spin" size={13} /> Menyimpan
    </span>
  );
}
