import type { Transaction } from "../types/finance";

export const monthKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;

export const keyOf = (iso: string) => iso.slice(0, 7);

export function lastMonths(n: number, from = new Date()): string[] {
  const out: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    out.push(monthKey(new Date(from.getFullYear(), from.getMonth() - i, 1)));
  }
  return out;
}

export function prevKey(key: string) {
  const [y, m] = key.split("-").map(Number);
  return monthKey(new Date(y, m - 2, 1));
}

export function totals(items: Transaction[], key: string) {
  let income = 0;
  let expenses = 0;
  for (const t of items) {
    if (keyOf(t.date) !== key) continue;
    if (t.type === "ingreso") income += t.amount;
    else expenses += t.amount;
  }
  const savings = income - expenses;
  const rate = income > 0 ? Math.round((savings / income) * 100) : 0;
  return { income, expenses, savings, rate };
}

export function expensesByCategory(items: Transaction[], key: string) {
  const map = new Map<string, number>();
  for (const t of items) {
    if (t.type !== "gasto" || keyOf(t.date) !== key) continue;
    map.set(t.category, (map.get(t.category) ?? 0) + t.amount);
  }
  return [...map.entries()]
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

export function delta(current: number, previous: number): number | null {
  if (previous === 0) return null;
  return Math.round(((current - previous) / previous) * 100);
}
