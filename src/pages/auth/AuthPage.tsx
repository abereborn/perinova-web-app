import { useState } from "react";
import { useLocation } from "wouter";
import { Eye, EyeOff, RotateCcw, ShieldCheck, Sparkles } from "lucide-react";
import { Button, Field, Pill } from "@/components/perinova-ui";
import { Logo } from "@/components/common/Logo";
import { getProfile, saveProfile, seedDemo, setSession, type Role } from "@/lib/perinova-store";

export default function AuthPage() {
  const [, setLocation] = useLocation();
  const [mode, setMode] = useState<"masuk" | "daftar">("masuk");
  const [role, setRole] = useState<Role>("ibu");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", age: "", phone: "", deliveryDate: "", deliveryType: "Persalinan normal", gestationalAge: "", parity: "", wound: "Ada jahitan", woundDegree: "", midwife: "" });
  const [error, setError] = useState("");
  const updateForm = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const submit = () => {
    if (mode === "daftar" && role === "ibu" && (form.name.trim().length < 2 || !form.phone.trim() || !form.deliveryDate)) return setError("Lengkapi nama, nomor HP, dan tanggal persalinan.");
    seedDemo();
    setSession(role);
    if (mode === "daftar") saveProfile({ ...getProfile(), ...form, name: form.name.trim(), email: contact || getProfile().email, phone: form.phone.trim() });
    setLocation(role === "ibu" ? "/ibu/home" : "/bidan/dashboard");
  };
  return (
    <main className="auth-page min-h-[100dvh] p-4 sm:p-8">
      <div className="auth-shell glass-panel mx-auto min-h-[calc(100dvh-2rem)] w-full max-w-6xl p-5 sm:p-8 lg:grid lg:grid-cols-[1.05fr_.95fr] lg:gap-10 lg:p-10">
        <section className="auth-brand hidden min-h-[620px] rounded-[2rem] p-8 lg:flex lg:flex-col lg:justify-between">
          <div>
            <Logo />
            <div className="mt-16 max-w-xl">
              <Pill tone="rose">DIGITAL PERINEAL CARE</Pill>
              <h2 className="serif mt-5 text-5xl font-semibold leading-[1.02] text-[#49353d]">Ruang pemulihan yang terasa lebih tenang.</h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-[#746269]">PERINOVA membantu ibu nifas memantau kondisi, memahami edukasi, mencatat perkembangan, dan tetap terhubung dengan bidan.</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="glass-card p-4">
              <p className="text-xs font-semibold text-[#7f6d73]">Pantau</p>
              <p className="serif mt-1 text-lg font-semibold text-[#49353d]">Kondisi luka</p>
            </div>
            <div className="glass-card p-4">
              <p className="text-xs font-semibold text-[#7f6d73]">Catat</p>
              <p className="serif mt-1 text-lg font-semibold text-[#49353d]">Perkembangan</p>
            </div>
            <div className="glass-card p-4">
              <p className="text-xs font-semibold text-[#7f6d73]">Terhubung</p>
              <p className="serif mt-1 text-lg font-semibold text-[#49353d]">Dengan bidan</p>
            </div>
          </div>
        </section>
        <section className="auth-form-pane min-w-0">
          <div className="auth-mobile-brand lg:hidden">
            <Logo compact />
          </div>
          <div className="mt-6 lg:mt-2">
            <div className="auth-kicker">
              <Sparkles size={12} />
              {mode === "masuk" ? "Selamat datang kembali" : "Profil pemulihan"}
            </div>
            <h1 className="auth-title serif mt-4 font-semibold text-[#49353d]">{mode === "masuk" ? "Masuk ke PERINOVA" : "Buat profil demo"}</h1>
            <p className="mt-3 max-w-md text-sm leading-[1.75] text-[#77666b]">Gunakan akses demo untuk menjelajah pengalaman {role === "ibu" ? "ibu" : "bidan"} dengan alur yang lebih tenang dan terarah.</p>
          </div>
          <div className="auth-form-card">
          <div className="auth-role-switch glass-surface">
            <div className="grid grid-cols-2 gap-1">
              <button data-testid="button-role-ibu" onClick={() => setRole("ibu")} className={`min-h-11 rounded-[.9rem] text-sm font-bold ${role === "ibu" ? "is-active text-[#a84f61]" : "text-[#78666a]"}`}>
                Saya ibu
              </button>
              <button data-testid="button-role-bidan" onClick={() => setRole("bidan")} className={`min-h-11 rounded-[.9rem] text-sm font-bold ${role === "bidan" ? "is-active text-[#557461]" : "text-[#78666a]"}`}>
                Saya bidan
              </button>
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
            className="pb-2"
          >
            {mode === "masuk" ? (
              <div className="mt-6 space-y-4">
                <Field label="Nomor HP atau email" autoComplete="username" placeholder="Contoh: 0812 3456 7890" value={contact} onChange={(e) => setContact(e.target.value)} />
                <label className="block space-y-1.5">
                  <span className="text-sm font-semibold text-[rgb(var(--pv-ink))]">Kata sandi</span>
                  <span className="relative block">
                    <input
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Untuk demo, isi apa saja"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="glass-input min-h-11 w-full rounded-xl px-3.5 pr-12 text-sm text-[rgb(var(--pv-ink))] outline-none placeholder:text-[rgb(var(--pv-ink-soft))]/70"
                    />
                    <button
                      type="button"
                      aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                      onClick={() => setShowPassword((value) => !value)}
                      className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-[#907b81] transition hover:bg-white/50 hover:text-[#a64f62]"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </span>
                </label>
              </div>
            ) : (
              <div className="mt-5 space-y-3">
                {role === "ibu" ? (
                  <>
                    <Field label="Nama lengkap *" placeholder="Contoh: Alya Putri" value={form.name} onChange={(e) => updateForm("name", e.target.value)} error={error} data-testid="input-nama" />
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Usia" type="number" placeholder="28" value={form.age} onChange={(e) => updateForm("age", e.target.value)} />
                      <Field label="Nomor HP *" placeholder="08..." value={form.phone} onChange={(e) => updateForm("phone", e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Tanggal persalinan *" type="date" value={form.deliveryDate} onChange={(e) => updateForm("deliveryDate", e.target.value)} />
                      <label className="block space-y-1.5">
                        <span className="text-sm font-semibold text-[#59464e]">Jenis persalinan</span>
                        <select value={form.deliveryType} onChange={(e) => updateForm("deliveryType", e.target.value)} className="min-h-11 w-full rounded-xl border glass-input px-3 text-sm">
                          <option>Persalinan normal</option>
                          <option>Operasi sesar</option>
                        </select>
                      </label>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Usia kehamilan" placeholder="39 minggu" value={form.gestationalAge} onChange={(e) => updateForm("gestationalAge", e.target.value)} />
                      <Field label="Paritas" placeholder="G1P1" value={form.parity} onChange={(e) => updateForm("parity", e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="block space-y-1.5">
                        <span className="text-sm font-semibold text-[#59464e]">Luka atau jahitan</span>
                        <select value={form.wound} onChange={(e) => updateForm("wound", e.target.value)} className="min-h-11 w-full rounded-xl border glass-input px-3 text-sm">
                          <option>Ada jahitan</option>
                          <option>Tidak ada</option>
                          <option>Belum tahu</option>
                        </select>
                      </label>
                      <Field label="Derajat luka" placeholder="Jika diketahui" value={form.woundDegree} onChange={(e) => updateForm("woundDegree", e.target.value)} />
                    </div>
                    <Field label="Nama bidan atau tenaga kesehatan" placeholder="Contoh: Rani Kusuma" value={form.midwife} onChange={(e) => updateForm("midwife", e.target.value)} />
                  </>
                ) : (
                  <Field label="Nama bidan" placeholder="Contoh: Rani Kusuma" value={form.name} onChange={(e) => updateForm("name", e.target.value)} error={error} />
                )}
              </div>
            )}
            <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-white/65 bg-white/35 px-3 py-2.5 text-xs leading-relaxed text-[#79686d] backdrop-blur-md">
              <ShieldCheck size={15} className="mt-0.5 shrink-0 text-[#6f8c78]" />
              <span>Akses demo tidak memerlukan kata sandi. Data tersimpan hanya di perangkat ini.</span>
            </div>
            <Button type="submit" data-testid="button-masuk" className="auth-submit mt-5 w-full">
              {mode === "masuk" ? `Masuk sebagai ${role === "ibu" ? "ibu" : "bidan"}` : "Simpan dan mulai"}
            </Button>
          </form>
          <button
            data-testid="button-ganti-mode"
            onClick={() => {
              setMode(mode === "masuk" ? "daftar" : "masuk");
              setError("");
            }}
            className="auth-mode-link mt-5 min-h-11 w-full text-sm font-semibold"
          >
            {mode === "masuk" ? "Belum punya profil? Buat profil demo" : "Sudah punya profil? Masuk"}
          </button>
          <button
            data-testid="button-reset-demo"
            onClick={() => {
              localStorage.clear();
              setError("Data demo sudah direset.");
            }}
            className="auth-reset mt-3 flex min-h-10 w-full items-center justify-center gap-2 text-xs text-[#9b8889]"
          >
            <RotateCcw size={13} /> Reset data demo
          </button>
          </div>
          <p className="mt-4 text-center text-[11px] leading-relaxed text-[#a28e92]">PERINOVA · Digital Perineal Care · Demo lokal</p>
        </section>
      </div>
    </main>
  );
}
