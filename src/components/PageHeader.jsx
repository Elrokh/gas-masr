import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PageHeader({ title, description, action }) {
  const navigate = useNavigate();

  return (
    <div className="mb-6 flex items-start justify-between gap-4 sm:mb-8">
      <div className="flex min-w-0 items-start gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-slate-200 bg-white text-brand-900 shadow-sm transition hover:-translate-x-0.5 dark:border-white/10 dark:bg-white/5 dark:text-brand-200 lg:hidden"
          aria-label="رجوع"
        >
          <ArrowRight size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white sm:text-3xl">{title}</h1>
          {description && <p className="mt-2 max-w-2xl text-sm font-medium leading-7 text-slate-500 dark:text-slate-400">{description}</p>}
        </div>
      </div>
      {action}
    </div>
  );
}
