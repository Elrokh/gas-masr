import { BookmarkPlus, Calculator, Gauge, ReceiptText } from "lucide-react";
import { formatCurrency, formatNumber } from "../utils/format";

export default function ResultPanel({ result, onSave, saved }) {
  if (!result) return null;

  return (
    <section className="overflow-hidden rounded-4xl border border-brand-200/80 bg-white shadow-soft dark:border-brand-500/20 dark:bg-slate-900">
      <div className="bg-gradient-to-l from-brand-900 to-brand-500 p-5 text-white sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-white/70">إجمالي قيمة الفاتورة</p>
            <p className="mt-2 text-3xl font-black sm:text-4xl">{formatCurrency(result.total)}</p>
          </div>
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15 backdrop-blur-md">
            <ReceiptText size={25} />
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-7">
        <div className="grid gap-3 sm:grid-cols-3">
          <MiniStat icon={Gauge} label="إجمالي الاستهلاك" value={`${formatNumber(result.consumption)} م³`} />
          <MiniStat icon={Calculator} label="متوسط الشهر" value={`${formatNumber(result.averageMonthlyConsumption)} م³`} />
          <MiniStat icon={ReceiptText} label="القسط المضاف" value={formatCurrency(result.installment)} />
        </div>

        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h3 className="text-base font-black text-slate-900 dark:text-white">تفاصيل الحساب</h3>
            <span className="rounded-full bg-brand-50 px-3 py-1 text-[11px] font-extrabold text-brand-900 dark:bg-brand-500/15 dark:text-brand-200">
              {result.months} شهر
            </span>
          </div>
          <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10">
            {result.breakdown.map((tier, index) => (
              <div
                key={tier.id || index}
                className="grid grid-cols-[1fr_auto] gap-4 border-b border-slate-200 px-4 py-4 last:border-b-0 dark:border-white/10"
              >
                <div>
                  <p className="text-sm font-extrabold text-slate-800 dark:text-slate-100">{tier.label}</p>
                  <p className="mt-1 text-xs font-semibold text-slate-400">
                    {formatNumber(tier.totalQuantity)} م³ × {formatCurrency(tier.price)}
                  </p>
                </div>
                <p className="self-center text-sm font-black text-brand-900 dark:text-brand-200">{formatCurrency(tier.amount)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 rounded-3xl bg-slate-50 p-4 dark:bg-white/[0.04]">
          <div className="flex items-center justify-between gap-4 text-sm font-bold text-slate-500 dark:text-slate-400">
            <span>قيمة الاستهلاك</span>
            <span>{formatCurrency(result.subtotal)}</span>
          </div>
          <div className="mt-3 flex items-center justify-between gap-4 border-t border-slate-200 pt-3 text-base font-black text-slate-950 dark:border-white/10 dark:text-white">
            <span>الإجمالي النهائي</span>
            <span>{formatCurrency(result.total)}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onSave}
          disabled={saved}
          className="mt-5 inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-brand-900 to-brand-500 px-5 text-sm font-extrabold text-white shadow-glow transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <BookmarkPlus size={20} />
          {saved ? "تم حفظ الفاتورة" : "حفظ الفاتورة في السجل"}
        </button>
      </div>
    </section>
  );
}

function MiniStat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4 dark:bg-white/[0.04]">
      <div className="flex items-center gap-2 text-brand-900 dark:text-brand-200">
        <Icon size={17} />
        <p className="text-[11px] font-extrabold">{label}</p>
      </div>
      <p className="mt-2 text-base font-black text-slate-950 dark:text-white">{value}</p>
    </div>
  );
}
