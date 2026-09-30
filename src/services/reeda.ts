import { readStorage, writeStorage, getScopedKey } from "@/services/storage";
import { STORE } from "@/data/storage-keys";
import { defaultReeda } from "@/data/defaults";
import type { ReedaValues } from "@/data/types";

export const getReeda = (): ReedaValues => ({ ...defaultReeda, ...readStorage<Partial<ReedaValues>>(getScopedKey(STORE.reeda), {}) });
export const saveReeda = (value: Omit<ReedaValues, "updated">) =>
  writeStorage(getScopedKey(STORE.reeda), { ...value, updated: "Baru saja" });
