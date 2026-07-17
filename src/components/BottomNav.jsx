import { Calculator, Gauge, History, Home } from "lucide-react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "الرئيسية", icon: Home, end: true },
  { to: "/calculator/home", label: "حساب", icon: Calculator },
  { to: "/history", label: "السجل", icon: History },
  { to: "/rates", label: "الأسعار", icon: Gauge }
];

export default function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200/80 bg-white/90 px-3 pb-[max(0.65rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/90 lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-4 gap-1">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl text-[11px] font-extrabold transition ${
                isActive
                  ? "bg-brand-50 text-brand-900 dark:bg-brand-500/15 dark:text-brand-200"
                  : "text-slate-500 dark:text-slate-400"
              }`
            }
          >
            <Icon size={20} />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
