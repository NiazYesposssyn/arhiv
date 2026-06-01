import { Link, Outlet } from "react-router-dom";

const NAV = [
  { to: "/", label: "Главная" },
  { to: "/services", label: "Услуги" },
  { to: "/collections", label: "Фонды" },
  { to: "/digital", label: "Электронный архив" },
  { to: "/about", label: "Об архиве" },
  { to: "/contact", label: "Контакты" },
];

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-blue-800 to-blue-950 text-xs font-bold text-white">
              ЦГА
            </div>
            <div>
              <div className="font-serif text-sm font-semibold leading-tight">
                ЦГА ВКО
              </div>
              <div className="text-[10px] uppercase tracking-wider text-slate-500">
                Өскемен
              </div>
            </div>
          </Link>
          <nav className="hidden items-center gap-5 text-sm font-medium text-slate-700 md:flex">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} className="hover:text-blue-800">
                {n.label}
              </Link>
            ))}
          </nav>
          <Link to="/staff" className="text-xs font-semibold text-blue-800 hover:underline">
            Служебный вход
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 bg-navy text-slate-300">
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm">
          <p className="font-serif text-lg text-white">Центральный государственный архив ВКО</p>
          <p className="mt-2 text-slate-400">
            г. Өскемен · Портал государственных услуг архива
          </p>
          <p className="mt-4 text-xs text-slate-500">
            © {new Date().getFullYear()} ЦГА ВКО. Сайт работает локально, данные в SQLite.
          </p>
        </div>
      </footer>
    </div>
  );
}
