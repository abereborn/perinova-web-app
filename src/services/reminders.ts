import { readStorage, writeStorage, getScopedKey } from "@/services/storage";
import { STORE } from "@/data/storage-keys";
import { defaultReminders } from "@/data/defaults";
import type { Reminder } from "@/data/types";

export const getReminders = () => readStorage<Reminder[]>(getScopedKey(STORE.reminders), defaultReminders);
export const saveReminders = (items: Reminder[]) => writeStorage(getScopedKey(STORE.reminders), items);
