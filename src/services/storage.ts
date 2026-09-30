export function readStorage<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Scopes demo health data to the currently authenticated account.
 * This is still browser-local storage, not production-grade secure storage.
 */
export function getScopedKey(key: string) {
  try {
    const raw = localStorage.getItem("perinova.session");
    if (!raw) return key;
    const session = JSON.parse(raw) as { userId?: string };
    return session.userId ? `${key}:${session.userId}` : key;
  } catch {
    return key;
  }
}
