import { useEffect, useState } from "react";

/** useState that persists to localStorage. Remount (via `key`) to switch keys. */
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? initial : (JSON.parse(raw) as T);
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage unavailable: the value still works for this session.
    }
  }, [key, value]);

  return [value, setValue] as const;
}
