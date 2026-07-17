import { CalendarDays, Gauge, Hash, Trash2, UserRound } from "lucide-react";
import { CALCULATOR_TYPES } from "../data/defaultRates";
import { formatCurrency, formatDate, formatNumber, getArabicMonth } from "../utils/format";

export default function RecordCard({ record, onDelete }) {
  const type = CALCULATOR_TYPES[record.type];

  return (
    <article className="rounded-4xl border border-slate-200/80 bg-white/85 p-5 shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:shadow-soft dark:border-white/10 dark:bg-white/[0.04]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-brand-50 px-3 py-1 text-[11px] font-extrabold text-brand-900 dark:bg-brand-500/15 dark:text-brand-200">
              {type?.title || record.type}
            </span>
            <span className="text-[11px] font-bold text-slate-400">{formatDate(record.createdAt)}</span>
          </div>
          <h3 className="mt-3 truncate text-lg font-black text-slate-950 dark:text-white">
            {record.customerName || "فاتورة بدون اسم"}
          </h3>
        </div>
        <button
          type="button"
          onClick={() => onDelete(record)}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-rose-50 text-rose-600 transition hover:bg-rose-600 hover:text-white dark:bg-rose-500/10 dark:text-rose-400"
          aria-label="حذف الفاتورة"
        >
          <Trash2 size={19} />
        </button>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Info icon={Gauge} label="الاستهلاك" value={`${formatNumber(record.consumption)} م³`} />
        <Info icon={CalendarDays} label="الفترة" value={`${getArabicMonth(record.month)} ${record.year}`} />
        <Info icon={Hash} label="رقم العداد" value={record.meterNumber || "—"} />
        <Info icon={UserRound} label="عدد الشهور" value={record.months || 1} />
      </div>

      <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl bg-gradient-to-l from-brand-900 to-brand-500 px-4 py-3 text-white">
        <span className="text-sm font-bold text-white/75">إجمالي الفاتورة</span>
        <span className="text-lg font-black">{formatCurrency(record.total)}</span>
      </div>
    </article>
  );
}

function Info({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-3 dark:bg-white/[0.04]">
      <div className="flex items-center gap-2 text-slate-400">
        <Icon size={15} />
        <span className="text-[10px] font-bold">{label}</span>
      </div>
      <p className="mt-2 truncate text-sm font-black text-slate-800 dark:text-slate-100">{value}</p>
    </div>
  );
}
