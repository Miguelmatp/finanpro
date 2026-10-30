import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initial: () => T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) return JSON.parse(raw) as T;
    } catch {
      /* ignorar datos corruptos */
    }
    return initial();
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* almacenamiento lleno o bloqueado */
    }
  }, [key, value]);

  return [value, setValue] as const;
}
