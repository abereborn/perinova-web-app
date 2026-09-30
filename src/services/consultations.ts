import { readStorage, writeStorage, getScopedKey } from "@/services/storage";
import { STORE } from "@/data/storage-keys";
import { defaultConsultations } from "@/data/defaults";
import type { Consultation } from "@/data/types";

export const getConsultations = () => readStorage<Consultation[]>(getScopedKey(STORE.consult), defaultConsultations);
export const saveConsultations = (items: Consultation[]) => writeStorage(getScopedKey(STORE.consult), items);
