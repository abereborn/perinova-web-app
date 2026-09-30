import { STORE } from "@/data/storage-keys";
import { defaultJournal } from "@/data/defaults";
import { saveJournal } from "@/services/journal";
import { getScopedKey, readStorage } from "@/services/storage";

export const uid = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;

export const seedDemo = () => {
  const seededKey = getScopedKey(STORE.seeded);
  if (!readStorage<boolean>(seededKey, false)) {
    saveJournal(defaultJournal);
    localStorage.setItem(seededKey, "1");
  }
};
