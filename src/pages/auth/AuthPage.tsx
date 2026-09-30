import { useState, type FormEvent } from "react";
import { useLocation } from "wouter";
import { Eye, EyeOff, RotateCcw, ShieldCheck, Sparkles } from "lucide-react";
import { Button, Field, Notice, Pill } from "@/components/perinova-ui";
import { Logo } from "@/components/common/Logo";
import {
  authenticateAccount,
  registerAccount,
  seedDemo,
  setSession,
  type Role,
} from "@/lib/perinova-store";
import type { Profile } from "@/data/types";

const emptyProfile = (): Profile => ({
  name: "",
  email: "",
  phone: "",
  recoveryDay: 0,
  age: "",
  deliveryDate: "",
  deliveryType: "Persalinan normal",
  gestationalAge: "",
  parity: "",
  wound: "Ada jahitan",
  woundDegree: "",
  midwife: "",
});

const calculateRecoveryDay = (deliveryDate: string) => {
  if (!deliveryDate) return 0;
  const start = new Date(`${deliveryDate}T00:00:00`);
  if (Number.isNaN(start.getTime())) return 0;
  return Math.max(0, Math.floor((Date.now() - start.getTime()) / 86400000) + 1);
};

const isEmail = (value: string) => value.includes("@");

export default function AuthPage() {
  const [, setLocation] = useLocation();
  const [mode, setMode] = useState<"masuk" | "daftar">("masuk");
  const [role, setRole] = useState<Role>("ibu");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    age: "",
    phone: "",
    deliveryDate: "",
    deliveryType: "Persalinan normal",
    gestationalAge: "",
    parity: "",
    wound: "Ada jahitan",
    woundDegree: "",
    midwife: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const updateForm = (key: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [key]: value }));

  const resetMessages = () => {
    setError("");
    setSuccess("");
  };

  const switchMode = (nextMode: "masuk" | "daftar") => {
    resetMessages();
    setMode(nextMode);
    setPassword("");
    setConfirmPassword("");
  };

  const submit = (event?: FormEvent) => {
    event?.preventDefault();
    resetMessages();

    if (mode === "daftar") {
      const normalizedIdentifier = identifier.trim();
      const name = form.name.trim();
      const phone = form.phone.trim();

      if (!normalizedIdentifier || !password || !confirmPassword) {
        setError("Lengkapi data login: nomor HP/email, kata sandi, dan konfirmasi kata sandi.");
        return;
      }
      if (password.length < 6) {
        setError("Kata sandi minimal 6 karakter.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Konfirmasi kata sandi belum sama.");
        return;
      }
      if (name.length < 2) {
        setError(role === "ibu" ? "Masukkan nama lengkap ibu." : "Masukkan nama pendamping.");
        return;
      }
      if (role === "ibu" && (!phone || !form.deliveryDate)) {
        setError("Untuk akun ibu, nomor HP dan tanggal persalinan wajib diisi.");
        return;
      }

      const profile: Profile = {
        ...emptyProfile(),
        ...form,
        name,
        phone,
        email: isEmail(normalizedIdentifier) ? normalizedIdentifier : "",
        recoveryDay: role === "ibu" ? calculateRecoveryDay(form.deliveryDate) : 0,
      };

      const result = registerAccount({
        role,
        identifier: normalizedIdentifier,
        password,
        profile,
      });

      if (!result.ok) {
        setError(result.error);
        return;
      }

      // Registration deliberately does NOT create a session.
      // The user must return to the login state and authenticate with the new account.
      setMode("masuk");
      setIdentifier(normalizedIdentifier);
      setPassword("");
      setConfirmPassword("");
      setSuccess("Akun berhasil dibuat. Silakan masuk menggunakan akun yang baru saja kamu daftarkan.");
      return;
    }

    if (!identifier.trim() || !password) {
      setError("Masukkan nomor HP/email dan kata sandi.");
      return;
    }

    const account = authenticateAccount(identifier, password, role);
    if (!account) {
      setError("Akun tidak ditemukan atau kata sandi salah. Silakan daftar terlebih dahulu atau periksa kembali data login.");
      return;
    }

    setSession({ userId: account.id, role: account.role });
    seedDemo();
    setLocation(role === "ibu" ? "/ibu/home" : "/pendamping/dashboard");
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
              <p className="mt-5 max-w-lg text-base leading-relaxed text-[#746269]">PERINOVA membantu ibu nifas memantau kondisi, memahami edukasi, mencatat perkembangan, dan tetap terhubung dengan pendamping.</p>
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
              <p className="serif mt-1 text-lg font-semibold text-[#49353d]">Dengan pendamping</p>
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
              {mode === "masuk" ? "Akun PERINOVA" : "Buat akun PERINOVA"}
            </div>
            <h1 className="auth-title serif mt-4 font-semibold text-[#49353d]">
              {mode === "masuk" ? "Masuk ke PERINOVA" : "Daftar akun baru"}
            </h1>
            <p className="mt-3 max-w-md text-sm leading-[1.75] text-[#77666b]">
              {mode === "masuk"
                ? "Masukkan akun yang sudah kamu daftarkan untuk melanjutkan ke aplikasi."
                : "Buat akun terlebih dahulu. Setelah berhasil didaftarkan, kamu akan kembali ke halaman login untuk masuk ke aplikasi."}
            </p>
          </div>

          <div className="auth-form-card">
            <div className="auth-role-switch glass-surface">
              <div className="grid grid-cols-2 gap-1">
                <button
                  type="button"
                  data-testid="button-role-ibu"
                  onClick={() => {
                    setRole("ibu");
                    resetMessages();
                  }}
                  className={`min-h-11 rounded-[.9rem] text-sm font-bold ${role === "ibu" ? "is-active text-[#a84f61]" : "text-[#78666a]"}`}
                >
                  Saya ibu
                </button>
                <button
                  type="button"
                  data-testid="button-role-pendamping"
                  onClick={() => {
                    setRole("pendamping");
                    resetMessages();
                  }}
                  className={`min-h-11 rounded-[.9rem] text-sm font-bold ${role === "pendamping" ? "is-active text-[#557461]" : "text-[#78666a]"}`}
                >
                  Saya pendamping
                </button>
              </div>
            </div>

            {success && (
              <div className="mt-4">
                <Notice tone="success">{success}</Notice>
              </div>
            )}
            {error && (
              <div className="mt-4">
                <Notice tone="danger">{error}</Notice>
              </div>
            )}

            <form onSubmit={submit} className="pb-2">
              <div className="mt-6 space-y-4">
                <Field
                  label={mode === "daftar" ? "Nomor HP atau email untuk login *" : "Nomor HP atau email"}
                  autoComplete="username"
                  placeholder="Contoh: 0812 3456 7890"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                />

                {mode === "daftar" && (
                  <>
                    {role === "ibu" ? (
                      <>
                        <Field label="Nama lengkap *" placeholder="Contoh: Alya Putri" value={form.name} onChange={(e) => updateForm("name", e.target.value)} data-testid="input-nama" />
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
                        <Field label="Nama pendamping atau tenaga kesehatan" placeholder="Contoh: Rani Kusuma" value={form.midwife} onChange={(e) => updateForm("midwife", e.target.value)} />
                      </>
                    ) : (
                      <Field label="Nama pendamping *" placeholder="Contoh: Rani Kusuma" value={form.name} onChange={(e) => updateForm("name", e.target.value)} data-testid="input-nama-pendamping" />
                    )}
                  </>
                )}

                <label className="block space-y-1.5">
                  <span className="text-sm font-semibold text-[rgb(var(--pv-ink))]">Kata sandi {mode === "daftar" ? "*" : ""}</span>
                  <span className="relative block">
                    <input
                      type={showPassword ? "text" : "password"}
                      autoComplete={mode === "daftar" ? "new-password" : "current-password"}
                      placeholder={mode === "daftar" ? "Minimal 6 karakter" : "Masukkan kata sandi akun"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="glass-input min-h-11 w-full rounded-xl px-3.5 pr-12 text-sm text-[rgb(var(--pv-ink))] outline-none placeholder:text-[rgb(var(--pv-ink-soft))]/70"
                    />
                    <button type="button" aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"} onClick={() => setShowPassword((value) => !value)} className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-[#907b81] transition hover:bg-white/50 hover:text-[#a64f62]">
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </span>
                </label>

                {mode === "daftar" && (
                  <label className="block space-y-1.5">
                    <span className="text-sm font-semibold text-[rgb(var(--pv-ink))]">Konfirmasi kata sandi *</span>
                    <span className="relative block">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="Ulangi kata sandi"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="glass-input min-h-11 w-full rounded-xl px-3.5 pr-12 text-sm text-[rgb(var(--pv-ink))] outline-none placeholder:text-[rgb(var(--pv-ink-soft))]/70"
                      />
                      <button type="button" aria-label={showConfirmPassword ? "Sembunyikan konfirmasi kata sandi" : "Tampilkan konfirmasi kata sandi"} onClick={() => setShowConfirmPassword((value) => !value)} className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-[#907b81] transition hover:bg-white/50 hover:text-[#a64f62]">
                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </span>
                  </label>
                )}
              </div>

              <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-white/65 bg-white/35 px-3 py-2.5 text-xs leading-relaxed text-[#79686d] backdrop-blur-md">
                <ShieldCheck size={15} className="mt-0.5 shrink-0 text-[#6f8c78]" />
                <span>Akun demo tersimpan sementara di browser ini. Untuk versi produksi, authentication dan penyimpanan data harus dipindahkan ke backend yang aman.</span>
              </div>

              <Button type="submit" data-testid="button-masuk" className="auth-submit mt-5 w-full">
                {mode === "masuk" ? `Masuk sebagai ${role === "ibu" ? "ibu" : "pendamping"}` : "Buat akun"}
              </Button>
            </form>

            <button data-testid="button-ganti-mode" type="button" onClick={() => switchMode(mode === "masuk" ? "daftar" : "masuk")} className="auth-mode-link mt-5 min-h-11 w-full text-sm font-semibold">
              {mode === "masuk" ? "Belum punya akun? Daftar sekarang" : "Sudah punya akun? Kembali ke login"}
            </button>

            <button data-testid="button-reset-demo" type="button" onClick={() => { localStorage.clear(); setMode("masuk"); setIdentifier(""); setPassword(""); setConfirmPassword(""); setForm({ name: "", age: "", phone: "", deliveryDate: "", deliveryType: "Persalinan normal", gestationalAge: "", parity: "", wound: "Ada jahitan", woundDegree: "", midwife: "" }); setRole("ibu"); setError("Data akun dan demo lokal sudah direset."); setSuccess(""); setLocation("/masuk"); }} className="auth-reset mt-3 flex min-h-10 w-full items-center justify-center gap-2 text-xs text-[#9b8889]">
              <RotateCcw size={13} /> Reset data lokal
            </button>
          </div>
          <p className="mt-4 text-center text-[11px] leading-relaxed text-[#a28e92]">PERINOVA · Digital Perineal Care · Demo lokal</p>
        </section>
      </div>
    </main>
  );
}
