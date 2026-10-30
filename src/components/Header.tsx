import { Bell, Calendar, Search } from "lucide-react";
import { monthLabel } from "../lib/format";

interface Props {
  search: string;
  onSearch: (v: string) => void;
  months: string[];
  month: string;
  onMonth: (m: string) => void;
  userName: string;
  onRename: () => void;
}

export function Header({ search, onSearch, months, month, onMonth, userName, onRename }: Props) {
  const initials = userName
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="flex items-center gap-3 bg-white border-b border-slate-200 px-4 sm:px-6 py-3">
      <label className="flex flex-1 max-w-md items-center gap-2 rounded-lg bg-slate-100 px-3 py-2.5 text-slate-500">
        <Search size={16} />
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Buscar transacciones, categorías..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 text-slate-800"
        />
      </label>
      <div className="ml-auto flex items-center gap-3">
        <label className="hidden sm:flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700">
          <Calendar size={16} />
          <select
            value={month}
            onChange={(e) => onMonth(e.target.value)}
            className="bg-transparent outline-none cursor-pointer"
          >
            {months.map((m) => (
              <option key={m} value={m}>
                {monthLabel(m)}
              </option>
            ))}
          </select>
        </label>
        <button className="relative text-slate-500 hover:text-slate-800" aria-label="Notificaciones">
          <Bell size={20} />
          <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-red-500" />
        </button>
        <button onClick={onRename} className="flex items-center gap-2 text-left" title="Cambiar nombre">
          <span className="grid place-items-center size-9 rounded-full bg-[#0b1f4d] text-white text-xs font-bold">
            {initials || "U"}
          </span>
          <span className="hidden md:block leading-tight">
            <span className="block text-sm font-semibold">{userName}</span>
            <span className="block text-xs text-slate-500">Plan gratuito</span>
          </span>
        </button>
      </div>
    </header>
  );
}
