import { readStorage, writeStorage } from "@/services/storage";
import { STORE } from "@/data/storage-keys";
import type { Role } from "@/data/types";

export const getSession = () => readStorage<{ role: Role } | null>(STORE.session, null);
export const setSession = (role: Role | null) =>
  role ? writeStorage(STORE.session, { role }) : localStorage.removeItem(STORE.session);
