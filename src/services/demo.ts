import { STORE } from "@/data/storage-keys";
import { defaultJournal } from "@/data/defaults";
import { saveJournal } from "@/services/journal";

export const uid = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;

export const seedDemo = () => {
  if (!localStorage.getItem(STORE.seeded)) {
    saveJournal(defaultJournal);
    localStorage.setItem(STORE.seeded, "1");
  }
};
