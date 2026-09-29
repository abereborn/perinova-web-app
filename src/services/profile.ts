import { readStorage, writeStorage } from "@/services/storage";
import { STORE } from "@/data/storage-keys";
import { defaultProfile } from "@/data/defaults";
import type { Profile } from "@/data/types";

export const getProfile = (): Profile => ({ ...defaultProfile, ...readStorage<Partial<Profile>>(STORE.profile, {}) });
export const saveProfile = (profile: Profile) => writeStorage(STORE.profile, profile);
