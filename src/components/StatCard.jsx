export default function StatCard({ icon: Icon, label, value, hint }) {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white/85 p-4 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400">{label}</p>
          <p className="mt-2 text-xl font-black text-slate-950 dark:text-white sm:text-2xl">{value}</p>
          {hint && <p className="mt-1 text-[11px] font-semibold text-slate-400">{hint}</p>}
        </div>
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-50 text-brand-900 dark:bg-brand-500/15 dark:text-brand-200">
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
}
