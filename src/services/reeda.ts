import { readStorage, writeStorage } from "@/services/storage";
import { STORE } from "@/data/storage-keys";
import { defaultReeda } from "@/data/defaults";
import type { ReedaValues } from "@/data/types";

export const getReeda = (): ReedaValues => ({ ...defaultReeda, ...readStorage<Partial<ReedaValues>>(STORE.reeda, {}) });
export const saveReeda = (value: Omit<ReedaValues, "updated">) =>
  writeStorage(STORE.reeda, { ...value, updated: "Baru saja" });
