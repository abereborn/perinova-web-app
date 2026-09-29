import { readStorage, writeStorage } from "@/services/storage";
import { STORE } from "@/data/storage-keys";
import { defaultConsultations } from "@/data/defaults";
import type { Consultation } from "@/data/types";

export const getConsultations = () => readStorage<Consultation[]>(STORE.consult, defaultConsultations);
export const saveConsultations = (items: Consultation[]) => writeStorage(STORE.consult, items);
