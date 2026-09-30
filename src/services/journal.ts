import { readStorage, writeStorage, getScopedKey } from "@/services/storage";
import { STORE } from "@/data/storage-keys";
import type { JournalEntry } from "@/data/types";

export const getJournal = () => readStorage<JournalEntry[]>(getScopedKey(STORE.journal), []);
export const saveJournal = (items: JournalEntry[]) => writeStorage(getScopedKey(STORE.journal), items);
