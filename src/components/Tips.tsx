import { BarChart2, Sprout } from "lucide-react";
import { Card } from "./Card";

interface Props {
  savingsRate: number;
  goalRate: number;
  topCategory?: { name: string; pct: number };
  hasData: boolean;
}

export function Tips({ savingsRate, goalRate, topCategory, hasData }: Props) {
  return (
    <Card title="Consejos para ti">
      {!hasData ? (
        <p className="py-8 text-center text-sm text-slate-500">Registra movimientos para ver recomendaciones.</p>
      ) : (
        <div className="space-y-3">
          <div className="flex items-start gap-3 rounded-xl bg-emerald-50 p-4">
            <span className="grid place-items-center size-10 shrink-0 rounded-lg bg-emerald-100 text-emerald-600">
              <Sprout size={20} />
            </span>
            <div>
              <p className="text-sm font-semibold">
                {savingsRate >= goalRate ? "¡Vas cumpliendo tu meta de ahorro!" : "Tu ahorro está bajo la meta"}
              </p>
              <p className="text-sm text-slate-600">
                Ahorraste {savingsRate}% de tus ingresos este mes; tu meta es {goalRate}%.
              </p>
            </div>
          </div>
          {topCategory && (
            <div className="flex items-start gap-3 rounded-xl bg-blue-50 p-4">
              <span className="grid place-items-center size-10 shrink-0 rounded-lg bg-blue-100 text-blue-600">
                <BarChart2 size={20} />
              </span>
              <div>
                <p className="text-sm font-semibold">Tu mayor gasto es {topCategory.name}</p>
                <p className="text-sm text-slate-600">
                  Representa {topCategory.pct}% de tus gastos del mes. Revisa si puedes recortar ahí.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
