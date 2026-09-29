import { readStorage, writeStorage } from "@/services/storage";
import { STORE } from "@/data/storage-keys";
import { defaultReminders } from "@/data/defaults";
import type { Reminder } from "@/data/types";

export const getReminders = () => readStorage<Reminder[]>(STORE.reminders, defaultReminders);
export const saveReminders = (items: Reminder[]) => writeStorage(STORE.reminders, items);
