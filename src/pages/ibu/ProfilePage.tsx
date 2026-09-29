import { useState } from "react";
import { useLocation } from "wouter";
import { CircleAlert, ChevronRight, LogOut, Pencil, Plus, Settings2, Trash2 } from "lucide-react";
import { AppHeader } from "@/components/layout/AppHeader";
import { MotherShell } from "@/components/layout/MotherShell";
import { ProfileDetails } from "@/components/mother/ProfileDetails";
import { ReminderModal } from "@/components/mother/modals/ReminderModal";
import { Button, Card, Field, IconButton, Modal, Notice, SectionTitle } from "@/components/perinova-ui";
import { getProfile, getReminders, saveProfile, saveReminders, setSession, type Reminder } from "@/lib/perinova-store";

export default function ProfilePage() {
  const [, setLocation] = useLocation();
  const [profile, setProfile] = useState(getProfile());
  const [editing, setEditing] = useState(false);
  const [reminders, setReminders] = useState(getReminders());
  const [reminderModal, setReminderModal] = useState<false | true | Reminder>(false);
  const [saved, setSaved] = useState(false);
  return (
    <MotherShell active="profil">
      <AppHeader title="Profil" subtitle="Pengaturan dan pengingatmu" />
      <main className="mother-page-main pb-2">
        <Card className="mt-5 flex items-center gap-4">
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[rgba(181,83,103,.20)] text-xl font-bold text-[#95485a]">
            {profile.name
              .split(" ")
              .map((x) => x[0])
              .join("")
              .slice(0, 2)}
          </div>
          <div className="flex-1">
            <h2 className="serif text-xl font-semibold text-[#49353d]">{profile.name}</h2>
            <p className="mt-1 text-xs text-[#8a777c]">{profile.email}</p>
          </div>
          <IconButton label="Edit profil" onClick={() => setEditing(true)}>
            <Pencil size={17} />
          </IconButton>
        </Card>
        {saved && (
          <div className="mt-3">
            <Notice tone="success">Profil berhasil diperbarui.</Notice>
          </div>
        )}
        <ProfileDetails profile={profile} />
        <div className="mt-6">
          <SectionTitle
            className="mt-0"
            title="Pengingat"
            action={
              <Button variant="soft" className="px-3" onClick={() => setReminderModal(true)}>
                <Plus size={16} /> Tambah
              </Button>
            }
          />
          <div className="space-y-2">
            {reminders.map((r) => (
              <div key={r.id} className="flex items-center gap-3 rounded-2xl border glass-card p-3">
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#59464e]">{r.title}</p>
                  <p className="text-xs text-[#8a777c]">
                    {r.time} · {r.category ?? "Perawatan"} · {r.days ?? "Setiap hari"}
                  </p>
                </div>
                <button
                  aria-label={`Aktifkan ${r.title}`}
                  onClick={() => {
                    const n = reminders.map((x) => (x.id === r.id ? { ...x, active: !x.active } : x));
                    setReminders(n);
                    saveReminders(n);
                  }}
                  className={`h-7 w-12 rounded-full p-1 ${r.active ? "bg-[#b55367]" : "bg-black/15"}`}
                >
                  <span className={`block h-5 w-5 rounded-full bg-white transition ${r.active ? "translate-x-5" : ""}`} />
                </button>
                <IconButton label="Edit pengingat" onClick={() => setReminderModal(r)}>
                  <Pencil size={16} />
                </IconButton>
                <IconButton
                  label="Hapus pengingat"
                  onClick={() => {
                    const n = reminders.filter((x) => x.id !== r.id);
                    setReminders(n);
                    saveReminders(n);
                  }}
                >
                  <Trash2 size={16} />
                </IconButton>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 space-y-2">
          <div className="flex min-h-12 w-full items-center gap-3 rounded-xl border glass-card px-3 text-sm font-semibold text-[#59464e]">
            <Settings2 size={18} className="text-[#a34f62]" /> Preferensi notifikasi <span className="ml-auto text-xs font-medium text-[#9b878b]">Diatur dari pengingat</span>
          </div>
          <button className="flex min-h-12 w-full items-center gap-3 rounded-xl glass-card px-3 text-sm font-semibold text-[#59464e]" onClick={() => setLocation("/ibu/bahaya")}>
            <CircleAlert size={18} className="text-[#b94846]" /> Tanda bahaya <ChevronRight className="ml-auto" size={17} />
          </button>
        </div>
        <button
          onClick={() => {
            setSession(null);
            setLocation("/masuk");
          }}
          className="mt-7 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#e3c8c5] text-sm font-bold text-[#b94846]"
        >
          <LogOut size={17} /> Keluar dari demo
        </button>
      </main>
      {editing && (
        <Modal title="Edit profil" onClose={() => setEditing(false)}>
          <div className="space-y-4">
            <Field label="Nama lengkap" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
            <Field label="Email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
            <Field label="Nomor telepon" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Usia" value={profile.age ?? ""} onChange={(e) => setProfile({ ...profile, age: e.target.value })} />
              <Field label="Paritas" value={profile.parity ?? ""} onChange={(e) => setProfile({ ...profile, parity: e.target.value })} />
            </div>
            <Field label="Tanggal persalinan" value={profile.deliveryDate ?? ""} onChange={(e) => setProfile({ ...profile, deliveryDate: e.target.value })} />
            <Field label="Nama bidan" value={profile.midwife ?? ""} onChange={(e) => setProfile({ ...profile, midwife: e.target.value })} />
          </div>
          <Button
            className="mt-5 w-full"
            onClick={() => {
              saveProfile(profile);
              setEditing(false);
              setSaved(true);
              setTimeout(() => setSaved(false), 2500);
            }}
          >
            Simpan perubahan
          </Button>
        </Modal>
      )}
      {reminderModal && (
        <ReminderModal
          initial={typeof reminderModal === "object" ? reminderModal : undefined}
          onClose={() => setReminderModal(false)}
          onSave={(r) => {
            const n = reminderModal && typeof reminderModal === "object" ? reminders.map((item) => (item.id === r.id ? r : item)) : [...reminders, r];
            setReminders(n);
            saveReminders(n);
            setReminderModal(false);
          }}
        />
      )}
    </MotherShell>
  );
}
