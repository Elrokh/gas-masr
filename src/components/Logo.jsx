import { Flame } from "lucide-react";

export default function Logo({ compact = false }) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-900 to-brand-500 text-white shadow-glow">
        <Flame size={23} strokeWidth={2.4} />
      </div>
      {!compact && (
        <div>
          <p className="text-base font-black leading-none text-slate-950 dark:text-white">فاتورة الغاز</p>
          <p className="mt-1 text-[11px] font-bold tracking-wide text-slate-500 dark:text-slate-400">GAS BILL</p>
        </div>
      )}
    </div>
  );
}
