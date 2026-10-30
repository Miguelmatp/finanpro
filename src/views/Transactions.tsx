import { Trash2 } from "lucide-react";
import { useState } from "react";
import { CategoryIcon } from "../components/CategoryIcon";
import { money, relativeDate } from "../lib/format";
import type { Transaction } from "../types/finance";

interface Props {
  items: Transaction[];
  onRemove: (id: string) => void;
}

export function Transactions({ items, onRemove }: Props) {
  const [filter, setFilter] = useState<"todos" | "ingreso" | "gasto">("todos");
  const list = items
    .filter((t) => filter === "todos" || t.type === filter)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="space-y-4 p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold tracking-tight">Transacciones</h1>
        <div className="flex gap-1 rounded-lg bg-slate-100 p-1 text-sm">
          {(["todos", "ingreso", "gasto"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-md px-3 py-1.5 capitalize ${filter === f ? "bg-white font-semibold shadow-sm" : "text-slate-500"}`}
            >
              {f === "todos" ? "Todas" : f === "ingreso" ? "Ingresos" : "Gastos"}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white">
        {list.length === 0 ? (
          <p className="p-10 text-center text-sm text-slate-500">No hay transacciones que coincidan.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {list.map((t) => (
              <li key={t.id} className="flex items-center gap-3 px-4 py-3">
                <CategoryIcon category={t.category} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{t.description}</p>
                  <p className="text-xs text-slate-500">
                    {t.category} • {relativeDate(t.date)} ({t.date})
                  </p>
                </div>
                <span className={`text-sm font-bold ${t.type === "ingreso" ? "text-emerald-600" : "text-red-500"}`}>
                  {t.type === "ingreso" ? "+" : "-"} {money(t.amount)}
                </span>
                <button
                  onClick={() => confirm(`¿Eliminar “${t.description}”?`) && onRemove(t.id)}
                  aria-label="Eliminar"
                  className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
