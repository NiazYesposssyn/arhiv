import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export function StaffPage() {
  const nav = useNavigate();
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch("/api/staff/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ code, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Ошибка входа");
      nav("/admin");
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "Ошибка");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-[70vh] place-items-center bg-navy px-4 py-12">
      <form onSubmit={submit} className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 text-white backdrop-blur">
        <h1 className="font-serif text-2xl font-semibold">Служебный вход</h1>
        <p className="mt-2 text-sm text-slate-400">Только для сотрудников ЦГА ВКО</p>
        <label className="mt-6 block text-sm">
          Служебный код
          <input
            className="input mt-1 border-white/20 bg-white/10 text-white placeholder:text-slate-500"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="ARHIV-VKO-2026"
            required
          />
        </label>
        <label className="mt-4 block text-sm">
          Пароль
          <input
            type="password"
            className="input mt-1 border-white/20 bg-white/10 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <p className="mt-2 text-xs text-slate-500">По умолчанию: admin2026</p>
        {err && <p className="mt-3 text-sm text-red-300">{err}</p>}
        <button type="submit" disabled={loading} className="btn-primary mt-6 w-full">
          {loading ? "Вход…" : "Войти в панель"}
        </button>
      </form>
    </div>
  );
}
