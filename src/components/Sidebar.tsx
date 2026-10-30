import {
  BarChart3, Calendar, CreditCard, Home, ArrowLeftRight, PieChart,
  RotateCcw, Rocket, Tag, TrendingUp,
} from "lucide-react";
import type { ReactNode } from "react";
import type { View } from "../types/finance";

const ITEMS: { id: View; label: string; icon: ReactNode }[] = [
  { id: "inicio", label: "Inicio", icon: <Home size={18} /> },
  { id: "transacciones", label: "Transacciones", icon: <ArrowLeftRight size={18} /> },
  { id: "presupuesto", label: "Presupuesto", icon: <PieChart size={18} /> },
  { id: "reportes", label: "Reportes", icon: <BarChart3 size={18} /> },
  { id: "metas", label: "Metas", icon: <Rocket size={18} /> },
  { id: "categorias", label: "Categorías", icon: <Tag size={18} /> },
  { id: "cuentas", label: "Cuentas", icon: <CreditCard size={18} /> },
  { id: "calendario", label: "Calendario", icon: <Calendar size={18} /> },
];

interface Props {
  view: View;
  onChange: (v: View) => void;
  onReset: () => void;
}

export function Sidebar({ view, onChange, onReset }: Props) {
  return (
    <aside className="hidden lg:flex w-[215px] shrink-0 flex-col justify-between bg-gradient-to-b from-[#0b1f4d] to-[#0a1838] text-slate-200 p-3 sticky top-0 h-screen">
      <div>
        <div className="flex items-center gap-2 px-3 py-4 mb-3">
          <div className="grid place-items-center size-8 rounded-lg bg-blue-500 text-white">
            <TrendingUp size={18} />
          </div>
          <span className="text-xl font-extrabold text-white tracking-tight">
            Finan<span className="text-blue-400">Pro</span>
          </span>
        </div>
        <nav className="flex flex-col gap-1">
          {ITEMS.map((it) => (
            <button
              key={it.id}
              onClick={() => onChange(it.id)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-left transition-colors ${
                view === it.id ? "bg-blue-600 text-white" : "hover:bg-white/10 text-slate-300"
              }`}
            >
              {it.icon}
              {it.label}
            </button>
          ))}
        </nav>
      </div>
      <button
        onClick={() => {
          if (confirm("¿Borrar todas las transacciones y metas guardadas en este navegador?")) onReset();
        }}
        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-300 hover:bg-white/10"
      >
        <RotateCcw size={18} />
        Restablecer datos
      </button>
    </aside>
  );
}
