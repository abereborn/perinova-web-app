import type { Consultation, Profile, ReedaValues, Reminder, JournalEntry } from "@/data/types";

export const defaultProfile: Profile = {
  name: "Alya Putri",
  email: "alya.demo@perinova.id",
  phone: "0812 3456 7890",
  recoveryDay: 7,
  age: "28",
  deliveryDate: "12 Juni 2026",
  deliveryType: "Persalinan normal",
  gestationalAge: "39 minggu",
  parity: "G1P1",
  wound: "Ada jahitan",
  woundDegree: "Derajat 2",
  midwife: "Rani Kusuma",
};

export const defaultConsultations: Consultation[] = [
  {
    id: "c-1",
    subject: "Rasa nyeri saat duduk",
    message: "Nyeri terasa sedikit saat duduk lama. Apakah ini wajar di hari ke-7?",
    date: "12 Juni 2026",
    status: "Dijawab",
    reply: "Rasa tidak nyaman ringan masih dapat terjadi. Coba gunakan bantalan duduk dan beri jeda istirahat. Hubungi saya bila nyeri bertambah.",
  },
];

export const defaultReminders: Reminder[] = [
  { id: "r-1", title: "Cek kondisi luka", time: "08:00", active: true },
  { id: "r-2", title: "Minum air putih", time: "12:30", active: true },
];

export const defaultReeda: ReedaValues = {
  redness: 1,
  edema: 1,
  ecchymosis: 0,
  discharge: 0,
  approximation: 2,
  pain: 2,
  fever: 0,
  odor: 0,
  bleeding: 0,
  mobility: 0,
  complaints: "",
  updated: "Hari ini, 08:20",
};

export const defaultJournal: JournalEntry[] = [
  {
    id: "j-1",
    date: "12 Juni 2026",
    note: "Hari ini bisa berjalan lebih nyaman. Tetap menjaga area tetap bersih dan kering.",
    status: "baik",
  },
];
