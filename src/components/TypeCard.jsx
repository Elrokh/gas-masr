import { ArrowLeft, Building2, Home, Store } from "lucide-react";
import { Link } from "react-router-dom";

const icons = {
  home: Home,
  commercial: Store,
  bakery: Building2
};

export default function TypeCard({ type, title, subtitle, color }) {
  const Icon = icons[type];

  return (
    <Link
      to={`/calculator/${type}`}
      className="group relative overflow-hidden rounded-4xl border border-white/20 bg-gradient-to-br p-5 text-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-glow sm:p-6"
      style={{ backgroundImage: undefined }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${color}`} />
      <div className="absolute -left-12 -top-12 h-36 w-36 rounded-full border-[22px] border-white/10" />
      <div className="absolute -bottom-20 -right-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />

      <div className="relative">
        <div className="flex items-start justify-between">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15 backdrop-blur-md">
            <Icon size={24} />
          </div>
          <div className="grid h-10 w-10 place-items-center rounded-full bg-white/15 transition group-hover:-translate-x-1">
            <ArrowLeft size={20} />
          </div>
        </div>
        <h3 className="mt-8 text-xl font-black">{title}</h3>
        <p className="mt-2 min-h-12 text-sm font-semibold leading-6 text-white/75">{subtitle}</p>
      </div>
    </Link>
  );
}
