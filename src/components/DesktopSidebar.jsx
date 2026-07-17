import { Calculator, Gauge, History, Home, Settings2 } from "lucide-react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";

const links = [
  { to: "/", label: "الرئيسية", icon: Home, end: true },
  { to: "/calculator/home", label: "حساب فاتورة", icon: Calculator },
  { to: "/history", label: "السجل المحفوظ", icon: History },
  { to: "/rates", label: "أسعار الشرائح", icon: Gauge },
  { to: "/settings", label: "الإعدادات", icon: Settings2 }
];

export default function DesktopSidebar() {
  return (
    <aside className="fixed inset-y-0 right-0 z-40 hidden w-72 border-l border-slate-200/80 bg-white/85 px-5 py-6 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/80 lg:block">
      <Logo />

      <nav className="mt-10 space-y-2">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-extrabold transition ${
                isActive
                  ? "bg-gradient-to-l from-brand-900 to-brand-500 text-white shadow-glow"
                  : "text-slate-600 hover:bg-brand-50 hover:text-brand-900 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
              }`
            }
          >
            <Icon size={20} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="absolute bottom-6 left-5 right-5 rounded-3xl bg-gradient-to-br from-brand-950 to-brand-700 p-5 text-white shadow-soft">
        <p className="text-xs font-bold text-white/70">بياناتك محفوظة</p>
        <p className="mt-2 text-sm font-black leading-6">كل الفواتير والأسعار تُحفظ على جهازك فقط.</p>
      </div>
    </aside>
  );
}
