import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "./Card";
import { money, monthLabel } from "../lib/format";
import { totals } from "../lib/stats";
import type { Transaction } from "../types/finance";

interface Props {
  items: Transaction[];
  months: string[];
}

export function CashFlow({ items, months }: Props) {
  const data = months.map((m) => {
    const t = totals(items, m);
    return { name: monthLabel(m, true), Ingresos: t.income, Gastos: t.expenses };
  });

  return (
    <Card title="Flujo de efectivo" className="lg:col-span-1">
      <div className="h-56">
        <ResponsiveContainer>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="inc" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#eef2f7" />
            <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} />
            <YAxis tickLine={false} axisLine={false} fontSize={12} width={40} tickFormatter={(v) => `${v / 1000}K`} />
            <Tooltip formatter={(v) => money(Number(v))} />
            <Area type="monotone" dataKey="Ingresos" stroke="#2563eb" strokeWidth={2} fill="url(#inc)" />
            <Area type="monotone" dataKey="Gastos" stroke="#93c5fd" strokeWidth={2} fill="none" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
