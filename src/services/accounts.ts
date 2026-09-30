import { defaultProfile } from "@/data/defaults";
import type { Profile, Role } from "@/data/types";
import { readStorage, writeStorage } from "@/services/storage";

export type AuthAccount = {
  id: string;
  role: Role;
  identifier: string;
  password: string;
  profile: Profile;
  createdAt: string;
};

type AccountInput = {
  role: Role;
  identifier: string;
  password: string;
  profile: Profile;
};

const ACCOUNTS_KEY = "perinova.accounts";

const normalizeIdentifier = (value: string) => value.trim().toLowerCase().replace(/\s+/g, "");
const uid = () => `account-${Date.now()}-${Math.random().toString(16).slice(2)}`;

export const getAccounts = (): AuthAccount[] => readStorage<AuthAccount[]>(ACCOUNTS_KEY, []);

export const findAccountById = (id: string) => getAccounts().find((account) => account.id === id) ?? null;

export function registerAccount(input: AccountInput) {
  const identifier = normalizeIdentifier(input.identifier);
  const accounts = getAccounts();
  const exists = accounts.some((account) => normalizeIdentifier(account.identifier) === identifier);

  if (exists) {
    return { ok: false as const, error: "Akun dengan nomor HP atau email tersebut sudah terdaftar." };
  }

  const account: AuthAccount = {
    id: uid(),
    role: input.role,
    identifier,
    password: input.password,
    profile: { ...defaultProfile, ...input.profile },
    createdAt: new Date().toISOString(),
  };

  writeStorage(ACCOUNTS_KEY, [...accounts, account]);
  return { ok: true as const, account };
}

export function authenticateAccount(identifierInput: string, password: string, role: Role) {
  const identifier = normalizeIdentifier(identifierInput);
  return getAccounts().find(
    (account) => account.role === role && normalizeIdentifier(account.identifier) === identifier && account.password === password,
  ) ?? null;
}

export function updateAccountProfile(userId: string, profile: Profile) {
  const accounts = getAccounts();
  const updated = accounts.map((account) => (account.id === userId ? { ...account, profile } : account));
  writeStorage(ACCOUNTS_KEY, updated);
}

export function clearAccounts() {
  localStorage.removeItem(ACCOUNTS_KEY);
}
