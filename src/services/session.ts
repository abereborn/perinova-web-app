import { readStorage, writeStorage } from "@/services/storage";
import { STORE } from "@/data/storage-keys";
import type { Role } from "@/data/types";

export type Session = { userId: string; role: Role };

export const getSession = (): Session | null => {
  const session = readStorage<Session | null>(STORE.session, null);
  if (!session || !session.userId || !session.role) return null;
  return session;
};

export const setSession = (session: Session | null) => {
  if (session) writeStorage(STORE.session, session);
  else localStorage.removeItem(STORE.session);
};
