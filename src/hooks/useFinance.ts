import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { seedGoals, seedTransactions } from "../lib/seed";
import type { Goal, GoalIcon, Transaction } from "../types/finance";

// Capa de datos. Hoy usa localStorage; para migrar a Supabase/Firebase
// solo hay que reemplazar el cuerpo de estas funciones.
export function useFinance() {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>(
    "finanpro:transactions",
    seedTransactions,
  );
  const [goals, setGoals] = useLocalStorage<Goal[]>("finanpro:goals", seedGoals);

  const addTransaction = useCallback(
    (t: Omit<Transaction, "id">) =>
      setTransactions((prev) => [{ ...t, id: crypto.randomUUID() }, ...prev]),
    [setTransactions],
  );

  const removeTransaction = useCallback(
    (id: string) => setTransactions((prev) => prev.filter((t) => t.id !== id)),
    [setTransactions],
  );

  const addGoal = useCallback(
    (name: string, target: number, icon: GoalIcon = "piggy") =>
      setGoals((prev) => [...prev, { id: crypto.randomUUID(), name, target, saved: 0, icon }]),
    [setGoals],
  );

  const contributeToGoal = useCallback(
    (id: string, amount: number) =>
      setGoals((prev) => prev.map((g) => (g.id === id ? { ...g, saved: g.saved + amount } : g))),
    [setGoals],
  );

  const resetAll = useCallback(() => {
    setTransactions([]);
    setGoals([]);
  }, [setTransactions, setGoals]);

  return { transactions, goals, addTransaction, removeTransaction, addGoal, contributeToGoal, resetAll };
}
