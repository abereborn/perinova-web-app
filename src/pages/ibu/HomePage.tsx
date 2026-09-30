import { Activity, Bell, Check, Droplets, Heart, Leaf, MessageCircle, TrendingUp } from "lucide-react";
import { useLocation } from "wouter";
import { ActionCard, QuickTile } from "@/components/mother/HomeCards";
import { AppHeader } from "@/components/layout/AppHeader";
import { MotherShell } from "@/components/layout/MotherShell";
import { ArrowLink, Button, Card, Notice, Pill, SectionTitle } from "@/components/perinova-ui";
import { getJournal, getProfile, getReminders } from "@/lib/perinova-store";
import { getLocalDateTime, getLocalGreeting } from "@/lib/local-time";
import { useLocalNow } from "@/hooks/use-local-time";

export default function HomePage() {
  const [, setLocation] = useLocation();
  const profile = getProfile();
  const now = useLocalNow();
  const journal = getJournal();
  const reminders = getReminders();
  const fullName = profile.name?.trim() || "Ibu";
  const greeting = getLocalGreeting(now);

  return (
    <MotherShell active="home">
      <AppHeader subtitle={getLocalDateTime(now)} />
      <main className="mother-page-main home-dashboard">
        <section className="home-greeting mt-6 flex items-start justify-between gap-4 lg:mt-2">
          <div className="min-w-0">
            <p className="text-sm text-[#7d6b70]">{greeting},</p>
            <h1 className="serif mt-1 text-3xl font-semibold leading-tight text-[#49353d] sm:text-4xl">
              {fullName}<span className="text-[#b55367]">.</span>
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#78656a]">Bagaimana kabarmu hari ini?</p>
          </div>
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[rgba(87,116,97,.16)] text-[#597865]" aria-hidden="true">
            <Heart size={20} strokeWidth={1.8} />
          </div>
        </section>

        <section className="home-hero mt-6 lg:mt-7">
          <Card className="relative min-h-[180px] overflow-hidden glass-tint-sage p-5 sm:p-6 lg:min-h-[205px] lg:p-7">
            <div className="relative z-10 max-w-2xl">
              <Pill tone="sage">HARI KE-{profile.recoveryDay}</Pill>
              <h2 className="serif mt-3 text-2xl font-semibold leading-[1.08] text-[#405b49]">Tubuhmu sedang bekerja dengan baik.</h2>
              <p className="mt-3 text-xs leading-[1.7] text-[#557461]">Pelan-pelan saja. Catatan kecil hari ini membantu melihat progresmu.</p>
              <Button variant="soft" className="mt-4" onClick={() => setLocation("/ibu/luka/reeda")} data-testid="button-cek-luka">
                Cek kondisi luka
              </Button>
            </div>
          </Card>
        </section>

        <section className="home-stats mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:mt-5 lg:gap-3">
          <QuickTile icon={<Activity size={19} />} title="Luka" value="Baik" onClick={() => setLocation("/ibu/luka")} />
          <QuickTile icon={<TrendingUp size={19} />} title="Progress" value="7 hari" onClick={() => setLocation("/ibu/progress")} />
          <QuickTile icon={<MessageCircle size={19} />} title="Pendamping" value="Siap membantu" onClick={() => setLocation("/ibu/konsultasi")} />
        </section>

        <section className="home-care">
          <SectionTitle eyebrow="Untuk hari ini" title="Jaga dirimu dengan lembut" action={<ArrowLink onClick={() => setLocation("/ibu/edukasi")}>Lihat semua</ArrowLink>} />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:gap-4">
            <ActionCard icon={<Droplets />} title="Tetap terhidrasi" body="Minum sedikit demi sedikit sepanjang hari." tone="blue" />
            <ActionCard icon={<Leaf />} title="Nutrisi pemulihan" body="Pilih makanan yang cukup dan beragam sesuai kebutuhanmu." tone="green" />
          </div>
        </section>

        <section className="home-reminders">
          <SectionTitle eyebrow="Pengingat" title="Ritmemu hari ini" action={<ArrowLink onClick={() => setLocation("/ibu/profil")}>Kelola</ArrowLink>} />
          <div className="space-y-2.5">
            {reminders.slice(0, 3).map((r) => (
              <div key={r.id} className="flex items-center gap-3 rounded-2xl border glass-card p-3.5">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[rgba(181,83,103,.16)] text-[#b55367]">
                  <Bell size={17} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold leading-tight text-[#56434a]">{r.title}</p>
                  <p className="mt-1 text-xs text-[#8a777c]">
                    {r.time} · {r.active ? "Aktif" : "Nonaktif"}
                  </p>
                </div>
                <Check size={17} className="shrink-0 text-[#75927d]" aria-hidden="true" />
              </div>
            ))}
          </div>
        </section>

        {journal.length === 0 && (
          <div className="home-notice mt-5">
            <Notice>Belum ada catatan hari ini. Menulis satu kalimat pun sudah cukup.</Notice>
          </div>
        )}
      </main>
    </MotherShell>
  );
}
