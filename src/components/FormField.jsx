export default function FormField({ label, hint, error, children }) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center justify-between gap-3 text-sm font-extrabold text-slate-700 dark:text-slate-200">
        <span>{label}</span>
        {hint && <span className="text-[11px] font-semibold text-slate-400">{hint}</span>}
      </span>
      {children}
      {error && <span className="mt-2 block text-xs font-bold text-rose-600 dark:text-rose-400">{error}</span>}
    </label>
  );
}
