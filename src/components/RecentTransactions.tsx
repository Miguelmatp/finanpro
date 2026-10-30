import { Card } from "./Card";
import { CategoryIcon } from "./CategoryIcon";
import { money, relativeDate } from "../lib/format";
import type { Transaction } from "../types/finance";

interface Props {
  items: Transaction[];
  onSeeAll: () => void;
}

export function RecentTransactions({ items, onSeeAll }: Props) {
  const recent = [...items].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);

  return (
    <Card
      title="Transacciones recientes"
      action={
        <button onClick={onSeeAll} className="text-sm font-medium text-blue-600 hover:underline">
          Ver todas
        </button>
      }
    >
      {recent.length === 0 ? (
        <p className="py-10 text-center text-sm text-slate-500">
          Todavía no hay movimientos. Usa “Nueva transacción” para registrar el primero.
        </p>
      ) : (
        <ul className="space-y-4">
          {recent.map((t) => (
            <li key={t.id} className="flex items-center gap-3">
              <CategoryIcon category={t.category} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{t.description}</p>
                <p className="text-xs text-slate-500">
                  {t.category} • {relativeDate(t.date)}
                </p>
              </div>
              <span className={`text-sm font-bold ${t.type === "ingreso" ? "text-emerald-600" : "text-red-500"}`}>
                {t.type === "ingreso" ? "+" : "-"} {money(t.amount)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
