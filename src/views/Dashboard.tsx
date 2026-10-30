import { PiggyBank, ShoppingCart, Wallet } from "lucide-react";
import { CashFlow } from "../components/CashFlow";
import { CategoryBars } from "../components/CategoryBars";
import { ExpenseDonut } from "../components/ExpenseDonut";
import { IncomeExpenseChart } from "../components/IncomeExpenseChart";
import { RecentTransactions } from "../components/RecentTransactions";
import { SavingsGoals } from "../components/SavingsGoals";
import { StatCard } from "../components/StatCard";
import { Tips } from "../components/Tips";
import { money } from "../lib/format";
import { delta, expensesByCategory, keyOf, prevKey, totals } from "../lib/stats";
import type { Goal, Transaction } from "../types/finance";

const SAVINGS_GOAL_RATE = 30;

interface Props {
  userName: string;
  items: Transaction[];
  visible: Transaction[];
  goals: Goal[];
  month: string;
  months: string[];
  onSeeAll: () => void;
  onAddGoal: (name: string, target: number) => void;
  onContribute: (id: string, amount: number) => void;
}

export function Dashboard({ userName, items, visible, goals, month, months, onSeeAll, onAddGoal, onContribute }: Props) {
  const cur = totals(items, month);
  const prev = totals(items, prevKey(month));
  const byCat = expensesByCategory(items, month);
  const catTotal = byCat.reduce((s, c) => s + c.value, 0);
  const expenseChange = delta(cur.expenses, prev.expenses);
  const monthItems = visible.filter((t) => keyOf(t.date) === month);
  const top = byCat[0];

  return (
    <div className="space-y-5 p-4 sm:p-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Hola, {userName} 👋</h1>
          <p className="text-slate-600">Aquí tienes un resumen de tus finanzas este mes.</p>
        </div>
        {expenseChange !== null && (
          <div className="rounded-xl border border-blue-100 bg-blue-50/60 px-4 py-3 text-sm">
            <p className="font-semibold text-blue-700">
              {expenseChange <= 0 ? "Vas por buen camino" : "Ojo con tus gastos"}
            </p>
            <p className="text-slate-600">
              Has gastado {Math.abs(expenseChange)}% {expenseChange <= 0 ? "menos" : "más"} que el mes pasado.
            </p>
          </div>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Ingresos" value={money(cur.income)} icon={<Wallet size={22} />} tone="blue" change={delta(cur.income, prev.income)} />
        <StatCard label="Gastos" value={money(cur.expenses)} icon={<ShoppingCart size={22} />} tone="red" change={expenseChange} lowerIsBetter />
        <StatCard label="Ahorro" value={money(cur.savings)} icon={<PiggyBank size={22} />} tone="green" change={delta(cur.savings, prev.savings)} />
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-600">Porcentaje de ahorro</p>
          <p className="mt-1 text-3xl font-bold tracking-tight">{cur.rate}%</p>
          <div className="mt-4 h-1.5 rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-blue-600" style={{ width: `${Math.max(0, Math.min(100, cur.rate))}%` }} />
          </div>
          <p className="mt-1.5 text-right text-xs text-slate-500">Meta: {SAVINGS_GOAL_RATE}%</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <IncomeExpenseChart items={items} months={months} />
        <ExpenseDonut data={byCat} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <SavingsGoals goals={goals} onAdd={onAddGoal} onContribute={onContribute} />
        <CategoryBars data={byCat} />
        <RecentTransactions items={monthItems} onSeeAll={onSeeAll} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <CashFlow items={items} months={months} />
        <Tips
          hasData={cur.income + cur.expenses > 0}
          savingsRate={cur.rate}
          goalRate={SAVINGS_GOAL_RATE}
          topCategory={top && catTotal > 0 ? { name: top.name, pct: Math.round((top.value / catTotal) * 100) } : undefined}
        />
      </div>
    </div>
  );
}

