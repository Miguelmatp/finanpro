import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card } from "./Card";
import { CATEGORY_COLORS } from "../lib/categories";
import { money } from "../lib/format";
import type { Category } from "../types/finance";

interface Props {
  data: { name: string; value: number }[];
}

export function ExpenseDonut({ data }: Props) {
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <Card title="Distribución de gastos">
      {total === 0 ? (
        <p className="py-16 text-center text-sm text-slate-500">Aún no hay gastos este mes.</p>
      ) : (
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative size-44 shrink-0">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={data} dataKey="value" innerRadius={55} outerRadius={85} paddingAngle={1} stroke="none">
                  {data.map((d) => (
                    <Cell key={d.name} fill={CATEGORY_COLORS[d.name as Category]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => money(Number(v))} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
              <div>
                <p className="text-lg font-bold">{money(total)}</p>
                <p className="text-xs text-slate-500">Total</p>
              </div>
            </div>
          </div>
          <ul className="w-full space-y-2 text-sm">
            {data.map((d) => (
              <li key={d.name} className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-slate-700">
                  <i className="size-2.5 rounded-full" style={{ background: CATEGORY_COLORS[d.name as Category] }} />
                  {d.name}
                </span>
                <span className="font-semibold">{Math.round((d.value / total) * 100)}%</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}
