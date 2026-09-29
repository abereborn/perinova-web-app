import { readStorage, writeStorage } from "@/services/storage";
import { STORE } from "@/data/storage-keys";
import type { JournalEntry } from "@/data/types";

export const getJournal = () => readStorage<JournalEntry[]>(STORE.journal, []);
export const saveJournal = (items: JournalEntry[]) => writeStorage(STORE.journal, items);
