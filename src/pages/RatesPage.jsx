import { RotateCcw, Save, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import PageHeader from "../components/PageHeader";
import { useApp } from "../context/AppContext";
import { formatCurrency } from "../utils/format";

export default function RatesPage() {
  const { rates, updateRates, resetRates } = useApp();
  const [draft, setDraft] = useState(() => JSON.parse(JSON.stringify(rates)));
  const [showResetModal, setShowResetModal] = useState(false);

  useEffect(() => {
    setDraft(JSON.parse(JSON.stringify(rates)));
  }, [rates]);

  const updateTierPrice = (type, index, value) => {
    setDraft((current) => {
      const next = JSON.parse(JSON.stringify(current));
      next[type].tiers[index].price = value;
      return next;
    });
  };

  const updateDate = (type, value) => {
    setDraft((current) => ({
      ...current,
      [type]: { ...current[type], updatedAt: value }
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();
    const normalized = JSON.parse(JSON.stringify(draft));
    ["home", "commercial"].forEach((type) => {
      normalized[type].tiers = normalized[type].tiers.map((tier) => ({
        ...tier,
        price: Math.max(0, Number(tier.price || 0))
      }));
    });
    normalized.bakery.flatRate = Math.max(0, Number(normalized.bakery.flatRate || 0));
    updateRates(normalized);
  };

  return (
    <div>
      <PageHeader
        title="أسعار الشرائح"
        description="عدّل الأسعار عند صدور أي تحديث جديد، وسيتم استخدام القيم الجديدة في الحسابات القادمة فقط."
        action={
          <button
            type="button"
            onClick={() => setShowResetModal(true)}
            className="hidden h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-extrabold text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white sm:inline-flex"
          >
            <RotateCcw size={18} />
            الافتراضي
          </button>
        }
      />

      <div className="mb-6 flex items-start gap-3 rounded-3xl border border-amber-200 bg-amber-50 p-4 text-amber-900 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200">
        <TriangleAlert className="mt-0.5 shrink-0" size={20} />
        <p className="text-xs font-bold leading-6">
          القيم الافتراضية مأخوذة من الصور المرجعية التي أرسلتها، وليست تأكيداً رسمياً للأسعار الحالية. راجع الجهة المختصة وعدّلها من هنا عند الحاجة.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        <RateSection
          title="شرائح المنازل"
          type="home"
          data={draft.home}
          onPriceChange={updateTierPrice}
          onDateChange={updateDate}
        />
        <RateSection
          title="التجاري (معادل منازل)"
          type="commercial"
          data={draft.commercial}
          onPriceChange={updateTierPrice}
          onDateChange={updateDate}
        />

        <section className="rounded-4xl border border-slate-200/80 bg-white/85 p-5 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] sm:p-7">
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-extrabold text-brand-700 dark:text-brand-300">سعر موحد</p>
              <h2 className="mt-1 text-xl font-black text-slate-950 dark:text-white">المخابز البلدية</h2>
            </div>
            <input
              type="month"
              value={draft.bakery.updatedAt}
              onChange={(event) => updateDate("bakery", event.target.value)}
              className="h-11 rounded-2xl border border-slate-200 bg-slate-50 px-3 text-sm font-extrabold outline-none focus:border-brand-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
            />
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 sm:items-end">
            <label className="block">
              <span className="mb-2 block text-sm font-extrabold text-slate-700 dark:text-slate-200">سعر المتر المكعب</span>
              <div className="relative">
                <input
                  type="number"
                  step="0.001"
                  min="0"
                  value={draft.bakery.flatRate}
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      bakery: { ...current.bakery, flatRate: event.target.value }
                    }))
                  }
                  className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 pl-20 text-lg font-black text-slate-950 outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-extrabold text-slate-400">جنيه / م³</span>
              </div>
            </label>
            <div className="rounded-2xl bg-brand-50 p-4 text-sm font-bold text-brand-950 dark:bg-brand-500/10 dark:text-brand-100">
              مثال: استهلاك 100 م³ = {formatCurrency(Number(draft.bakery.flatRate || 0) * 100)}
            </div>
          </div>
        </section>

        <div className="sticky bottom-24 z-20 rounded-3xl border border-white/20 bg-white/85 p-3 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/85 lg:bottom-5">
          <button
            type="submit"
            className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-brand-900 to-brand-500 px-6 text-sm font-black text-white shadow-glow transition hover:-translate-y-0.5"
          >
            <Save size={20} />
            حفظ أسعار الشرائح
          </button>
        </div>
      </form>

      <Modal
        open={showResetModal}
        title="استرجاع الأسعار الافتراضية؟"
        description="سيتم استبدال كل الأسعار التي عدّلتها بالقيم المبدئية الموجودة مع المشروع."
        confirmLabel="استرجاع"
        onClose={() => setShowResetModal(false)}
        onConfirm={resetRates}
      />
    </div>
  );
}

function RateSection({ title, type, data, onPriceChange, onDateChange }) {
  return (
    <section className="rounded-4xl border border-slate-200/80 bg-white/85 p-5 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] sm:p-7">
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-extrabold text-brand-700 dark:text-brand-300">حساب متدرج</p>
          <h2 className="mt-1 text-xl font-black text-slate-950 dark:text-white">{title}</h2>
        </div>
        <input
          type="month"
          value={data.updatedAt}
          onChange={(event) => onDateChange(type, event.target.value)}
          className="h-11 rounded-2xl border border-slate-200 bg-slate-50 px-3 text-sm font-extrabold outline-none focus:border-brand-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
        />
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {data.tiers.map((tier, index) => {
          const range = tier.to ? `${tier.from === 0 ? "أول" : tier.from + 1} - ${tier.to} م³` : `أكثر من ${tier.from} م³`;
          return (
            <label key={tier.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[0.03]">
              <span className="text-xs font-extrabold text-brand-700 dark:text-brand-300">{tier.label}</span>
              <span className="mt-1 block text-sm font-black text-slate-900 dark:text-white">{range}</span>
              <div className="relative mt-4">
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={tier.price}
                  onChange={(event) => onPriceChange(type, index, event.target.value)}
                  className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 pl-16 text-lg font-black text-slate-950 outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 dark:border-white/10 dark:bg-slate-900 dark:text-white"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-extrabold text-slate-400">جنيه</span>
              </div>
            </label>
          );
        })}
      </div>
    </section>
  );
}
