import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type Request = {
  id: string;
  created_at: string;
  reference_code: string;
  applicant_name: string;
  email: string;
  service_type: string;
  status: string;
  amount: number;
};

type Stats = {
  total: number;
  pending: number;
  done: number;
  revenue: number;
  usersServed: number;
};

export function AdminPage() {
  const nav = useNavigate();
  const [rows, setRows] = useState<Request[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    const me = await fetch("/api/staff/me", { credentials: "include" });
    const meData = await me.json();
    if (!meData.ok) {
      nav("/staff");
      return;
    }
    const [rRes, sRes] = await Promise.all([
      fetch("/api/admin/requests", { credentials: "include" }),
      fetch("/api/admin/stats", { credentials: "include" }),
    ]);
    if (!rRes.ok) {
      setErr("Нет доступа");
      return;
    }
    const rData = await rRes.json();
    const sData = await sRes.json();
    setRows(rData.requests || []);
    setStats(sData);
  }

  useEffect(() => {
    load();
  }, []);

  async function setStatus(id: string, status: string) {
    await fetch(`/api/admin/requests/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ status }),
    });
    load();
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl font-semibold">Панель управления</h1>
        <Link to="/" className="text-sm text-blue-800">← На сайт</Link>
      </div>
      {err && <p className="mt-4 text-red-600">{err}</p>}
      {stats && (
        <div className="mt-8 grid gap-4 sm:grid-cols-4">
          {[
            { l: "Всего заявок", v: stats.total },
            { l: "В работе", v: stats.pending },
            { l: "Выполнено", v: stats.done },
            { l: "Заявителей", v: stats.usersServed },
          ].map((x) => (
            <div key={x.l} className="card text-center">
              <div className="text-2xl font-bold text-blue-900">{x.v}</div>
              <div className="text-xs text-slate-500">{x.l}</div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-10 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="p-3">Дата</th>
              <th className="p-3">№</th>
              <th className="p-3">ФИО</th>
              <th className="p-3">Услуга</th>
              <th className="p-3">Статус</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-slate-100">
                <td className="p-3 whitespace-nowrap">
                  {new Date(r.created_at).toLocaleString("ru-RU")}
                </td>
                <td className="p-3 font-mono text-xs">{r.reference_code}</td>
                <td className="p-3">{r.applicant_name}</td>
                <td className="p-3">{r.service_type}</td>
                <td className="p-3">
                  <select
                    className="rounded border px-2 py-1 text-xs"
                    value={r.status}
                    onChange={(e) => setStatus(r.id, e.target.value)}
                  >
                    <option value="new">new</option>
                    <option value="processing">processing</option>
                    <option value="done">done</option>
                    <option value="rejected">rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && (
          <p className="p-8 text-center text-slate-500">Заявок пока нет</p>
        )}
      </div>
    </div>
  );
}
