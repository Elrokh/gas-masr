import { FileX2 } from "lucide-react";

export default function EmptyState({ title = "لا توجد بيانات", description, action }) {
  return (
    <div className="rounded-4xl border border-dashed border-slate-300 bg-white/60 px-5 py-14 text-center dark:border-white/15 dark:bg-white/[0.03]">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-brand-50 text-brand-900 dark:bg-brand-500/15 dark:text-brand-200">
        <FileX2 size={28} />
      </div>
      <h3 className="mt-5 text-lg font-black text-slate-900 dark:text-white">{title}</h3>
      {description && <p className="mx-auto mt-2 max-w-md text-sm font-medium leading-7 text-slate-500 dark:text-slate-400">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
