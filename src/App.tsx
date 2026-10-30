import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { TransactionForm } from "./components/TransactionForm";
import { useFinance } from "./hooks/useFinance";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { lastMonths } from "./lib/stats";
import { Dashboard } from "./views/Dashboard";
import { Transactions } from "./views/Transactions";
import type { View } from "./types/finance";

const MONTHS = lastMonths(6);

export default function App() {
  const { transactions, goals, addTransaction, removeTransaction, addGoal, contributeToGoal, resetAll } = useFinance();
  const [userName, setUserName] = useLocalStorage("finanpro:user", () => "Usuario");
  const [view, setView] = useState<View>("inicio");
  const [month, setMonth] = useState(MONTHS[MONTHS.length - 1]);
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return transactions;
    return transactions.filter((t) => `${t.description} ${t.category}`.toLowerCase().includes(q));
  }, [transactions, search]);

  const rename = () => {
    const name = prompt("¿Cómo quieres que te llame?", userName)?.trim();
    if (name) setUserName(name);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar view={view} onChange={setView} onReset={resetAll} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          search={search}
          onSearch={(v) => {
            setSearch(v);
            if (v && view === "inicio") setView("transacciones");
          }}
          months={MONTHS}
          month={month}
          onMonth={setMonth}
          userName={userName}
          onRename={rename}
        />
        <main className="flex-1">
          {view === "inicio" && (
            <Dashboard
              userName={userName}
              items={transactions}
              visible={visible}
              goals={goals}
              month={month}
              months={MONTHS}
              onSeeAll={() => setView("transacciones")}
              onAddGoal={addGoal}
              onContribute={contributeToGoal}
            />
          )}
          {view === "transacciones" && <Transactions items={visible} onRemove={removeTransaction} />}
          {view !== "inicio" && view !== "transacciones" && (
            <div className="grid place-items-center p-16 text-center text-slate-500">
              <div>
                <p className="text-lg font-semibold text-slate-700 capitalize">{view}</p>
                <p className="text-sm">Esta sección todavía no está construida.</p>
              </div>
            </div>
          )}
        </main>
      </div>

      <button
        onClick={() => setFormOpen(true)}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg hover:bg-blue-700"
      >
        <Plus size={18} /> Nueva transacción
      </button>
      <TransactionForm open={formOpen} onClose={() => setFormOpen(false)} onSubmit={addTransaction} />
    </div>
  );
}
