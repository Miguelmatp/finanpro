import { Car, Home, PiggyBank, Plane, Plus } from "lucide-react";
import { Card } from "./Card";
import { money } from "../lib/format";
import type { Goal, GoalIcon } from "../types/finance";

const ICONS: Record<GoalIcon, typeof Car> = { home: Home, car: Car, plane: Plane, piggy: PiggyBank };

interface Props {
  goals: Goal[];
  onAdd: (name: string, target: number) => void;
  onContribute: (id: string, amount: number) => void;
}

export function SavingsGoals({ goals, onAdd, onContribute }: Props) {
  const addGoal = () => {
    const name = prompt("¿Cómo se llama la meta?")?.trim();
    if (!name) return;
    const target = Number(prompt("¿Cuál es el monto objetivo (S/)?"));
    if (!Number.isFinite(target) || target <= 0) return alert("Ingresa un monto válido.");
    onAdd(name, target);
  };

  const contribute = (g: Goal) => {
    const amount = Number(prompt(`¿Cuánto vas a aportar a “${g.name}” (S/)?`));
    if (!Number.isFinite(amount) || amount <= 0) return;
    onContribute(g.id, amount);
  };

  return (
    <Card
      title="Metas de ahorro"
      action={
        <button onClick={addGoal} className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline">
          <Plus size={14} /> Nueva meta
        </button>
      }
    >
      {goals.length === 0 ? (
        <p className="py-10 text-center text-sm text-slate-500">Crea tu primera meta de ahorro.</p>
      ) : (
        <ul className="divide-y divide-slate-100">
          {goals.map((g) => {
            const pct = Math.min(100, Math.round((g.saved / g.target) * 100));
            const Icon = ICONS[g.icon];
            return (
              <li key={g.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <span className="grid place-items-center size-12 shrink-0 rounded-xl bg-blue-50 text-blue-600">
                  <Icon size={22} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-sm">{g.name}</p>
                  <p className="text-xs text-slate-500">
                    {money(g.saved)} / {money(g.target)}
                  </p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="h-1.5 flex-1 rounded-full bg-slate-100">
                      <div className="h-full rounded-full bg-blue-600" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="w-9 text-right text-xs text-slate-500">{pct}%</span>
                  </div>
                </div>
                <button
                  onClick={() => contribute(g)}
                  className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50"
                >
                  Aportar
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}
