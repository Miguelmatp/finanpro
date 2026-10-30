import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "./Card";
import { money, monthLabel } from "../lib/format";
import { totals } from "../lib/stats";
import type { Transaction } from "../types/finance";

interface Props {
  items: Transaction[];
  months: string[];
}

export function IncomeExpenseChart({ items, months }: Props) {
  const data = months.map((m) => {
    const t = totals(items, m);
    return { name: monthLabel(m, true), Ingresos: t.income, Gastos: t.expenses };
  });

  return (
    <Card
      title="Resumen de ingresos y gastos"
      action={<span className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-600">Últimos 6 meses</span>}
    >
      <div className="h-64">
        <ResponsiveContainer>
          <BarChart data={data} barGap={4}>
            <CartesianGrid vertical={false} stroke="#eef2f7" />
            <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} />
            <YAxis tickLine={false} axisLine={false} fontSize={12} width={40} tickFormatter={(v) => `${v / 1000}K`} />
            <Tooltip formatter={(v) => money(Number(v))} cursor={{ fill: "#f1f5f9" }} />
            <Bar dataKey="Ingresos" fill="#2563eb" radius={[3, 3, 0, 0]} maxBarSize={16} />
            <Bar dataKey="Gastos" fill="#93c5fd" radius={[3, 3, 0, 0]} maxBarSize={16} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 flex gap-4 text-xs text-slate-600">
        <span className="flex items-center gap-1.5"><i className="size-2.5 rounded-full bg-blue-600" />Ingresos</span>
        <span className="flex items-center gap-1.5"><i className="size-2.5 rounded-full bg-blue-300" />Gastos</span>
      </div>
    </Card>
  );
}
