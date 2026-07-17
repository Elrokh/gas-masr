import { normalizeArabicDigits } from "../utils/format";

export default function NumberInput({ value, onChange, icon: Icon, ...props }) {
  const handleChange = (event) => {
    const normalized = normalizeArabicDigits(event.target.value);
    onChange({ ...event, target: { ...event.target, value: normalized } });
  };

  return (
    <div className="relative">
      {Icon && (
        <Icon className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-brand-500" size={19} />
      )}
      <input
        {...props}
        value={value}
        onChange={handleChange}
        inputMode="decimal"
        className={`h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-base font-extrabold text-slate-900 outline-none transition placeholder:text-slate-300 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-600 ${Icon ? "pr-12" : ""}`}
      />
    </div>
  );
}
