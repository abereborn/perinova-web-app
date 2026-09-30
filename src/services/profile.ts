import { defaultProfile } from "@/data/defaults";
import type { Profile } from "@/data/types";
import { findAccountById, updateAccountProfile } from "@/services/accounts";
import { getSession } from "@/services/session";
import { readStorage, writeStorage } from "@/services/storage";
import { STORE } from "@/data/storage-keys";

export const getProfile = (): Profile => {
  const session = getSession();
  if (session) {
    const account = findAccountById(session.userId);
    if (account) return { ...defaultProfile, ...account.profile };
  }

  return { ...defaultProfile, ...readStorage<Partial<Profile>>(STORE.profile, {}) };
};

export const saveProfile = (profile: Profile) => {
  const session = getSession();
  if (session) {
    updateAccountProfile(session.userId, profile);
    return profile;
  }

  writeStorage(STORE.profile, profile);
  return profile;
};
