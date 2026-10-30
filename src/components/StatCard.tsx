import { ArrowDown, ArrowUp } from "lucide-react";
import type { ReactNode } from "react";

const TONES = {
  blue: "bg-blue-50 text-blue-600",
  red: "bg-red-50 text-red-500",
  green: "bg-emerald-50 text-emerald-600",
};

interface Props {
  label: string;
  value: string;
  icon: ReactNode;
  tone: keyof typeof TONES;
  change: number | null;
  /** true cuando bajar es bueno (gastos) */
  lowerIsBetter?: boolean;
}

export function StatCard({ label, value, icon, tone, change, lowerIsBetter }: Props) {
  const good = change === null ? true : lowerIsBetter ? change <= 0 : change >= 0;
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center gap-3">
        <div className={`grid place-items-center size-11 rounded-xl ${TONES[tone]}`}>{icon}</div>
        <div>
          <p className="text-sm text-slate-600">{label}</p>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
        {change === null ? (
          <span>Sin datos del mes anterior</span>
        ) : (
          <>
            <span
              className={`inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 font-semibold ${
                good ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
              }`}
            >
              {change >= 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
              {change >= 0 ? "+" : ""}
              {change}%
            </span>
            <span>vs. mes anterior</span>
          </>
        )}
      </div>
    </div>
  );
}
