import { CalendarDays, Gauge, Hash, ReceiptText, UserRound, WalletCards } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import FormField from "../components/FormField";
import NumberInput from "../components/NumberInput";
import PageHeader from "../components/PageHeader";
import ResultPanel from "../components/ResultPanel";
import { useApp } from "../context/AppContext";
import { CALCULATOR_TYPES } from "../data/defaultRates";
import { calculateBill } from "../utils/calculations";
import { formatCurrency, safeNumber } from "../utils/format";

const months = Array.from({ length: 12 }, (_, index) => index + 1);

function getInitialForm() {
  const now = new Date();
  return {
    customerName: "",
    meterNumber: "",
    previousReading: "",
    currentReading: "",
    calculationMonths: "1",
    month: String(now.getMonth() + 1),
    year: String(now.getFullYear()),
    installment: "0"
  };
}

export default function CalculatorPage() {
  const { type } = useParams();
  const { rates, addRecord, notify } = useApp();
  const [form, setForm] = useState(getInitialForm);
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);
  const [saved, setSaved] = useState(false);
  const resultRef = useRef(null);

  const config = CALCULATOR_TYPES[type];
  const isTiered = type !== "bakery";

  useEffect(() => {
    setForm(getInitialForm());
    setErrors({});
    setResult(null);
    setSaved(false);
  }, [type]);

  const rateSummary = useMemo(() => {
    if (!config) return "";
    if (type === "bakery") return `${rates.bakery.flatRate} جنيه لكل م³`;
    return rates[type].tiers.map((tier) => formatCurrency(tier.price)).join(" • ");
  }, [config, rates, type]);

  if (!config) return <Navigate to="/" replace />;

  const updateField = (field, value, affectsCalculation = true) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    if (affectsCalculation) {
      setResult(null);
      setSaved(false);
    }
  };

  const validate = () => {
    const nextErrors = {};
    const previous = safeNumber(form.previousReading);
    const current = safeNumber(form.currentReading);
    const calculationMonths = safeNumber(form.calculationMonths);

    if (form.previousReading === "") nextErrors.previousReading = "اكتب القراءة السابقة";
    if (form.currentReading === "") nextErrors.currentReading = "اكتب القراءة الحالية";
    if (current < previous) nextErrors.currentReading = "القراءة الحالية يجب أن تكون أكبر من أو تساوي السابقة";
    if (isTiered && calculationMonths < 1) nextErrors.calculationMonths = "عدد الشهور يجب أن يكون شهر واحد على الأقل";
    if (!form.month) nextErrors.month = "اختر شهر المحاسبة";
    if (safeNumber(form.year) < 2000) nextErrors.year = "اكتب سنة صحيحة";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleCalculate = (event) => {
    event.preventDefault();
    if (!validate()) {
      notify("راجع البيانات المطلوبة", "error");
      return;
    }

    const calculated = calculateBill({
      type,
      previousReading: safeNumber(form.previousReading),
      currentReading: safeNumber(form.currentReading),
      months: isTiered ? safeNumber(form.calculationMonths) : 1,
      installment: safeNumber(form.installment),
      rates
    });

    setResult(calculated);
    setSaved(false);
    window.setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  };

  const handleSave = () => {
    if (!result || saved) return;
    addRecord({
      type,
      customerName: form.customerName.trim(),
      meterNumber: form.meterNumber.trim(),
      previousReading: safeNumber(form.previousReading),
      currentReading: safeNumber(form.currentReading),
      calculationMonths: isTiered ? safeNumber(form.calculationMonths) : 1,
      months: result.months,
      month: safeNumber(form.month),
      year: safeNumber(form.year),
      installment: result.installment,
      consumption: result.consumption,
      averageMonthlyConsumption: result.averageMonthlyConsumption,
      breakdown: result.breakdown,
      subtotal: result.subtotal,
      total: result.total,
      rateSnapshot: rates[type]
    });
    setSaved(true);
  };

  return (
    <div>
      <PageHeader
        title={config.title}
        description={`${config.subtitle}. الأسعار الحالية: ${rateSummary}`}
      />

      <div className="grid items-start gap-6 xl:grid-cols-[1fr_0.82fr]">
        <form onSubmit={handleCalculate} className="rounded-4xl border border-slate-200/80 bg-white/85 p-5 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] sm:p-7">
          <div className="mb-6 flex items-start justify-between gap-4 rounded-3xl bg-brand-50 p-4 dark:bg-brand-500/10">
            <div>
              <p className="text-xs font-extrabold text-brand-700 dark:text-brand-300">بيانات الفاتورة</p>
              <p className="mt-1 text-sm font-black text-brand-950 dark:text-brand-100">أدخل القراءات كما تظهر في العداد</p>
            </div>
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-brand-900 shadow-sm dark:bg-white/10 dark:text-brand-200">
              <ReceiptText size={22} />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <FormField label="اسم العميل" hint="اختياري">
              <div className="relative">
                <UserRound className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-brand-500" size={19} />
                <input
                  value={form.customerName}
                  onChange={(event) => updateField("customerName", event.target.value, false)}
                  placeholder="مثال: أحمد محمد"
                  className="h-14 w-full rounded-2xl border border-slate-200 bg-white pr-12 pl-4 text-base font-extrabold text-slate-900 outline-none transition placeholder:text-slate-300 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-600"
                />
              </div>
            </FormField>

            <FormField label="رقم العداد" hint="اختياري">
              <div className="relative">
                <Hash className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-brand-500" size={19} />
                <input
                  value={form.meterNumber}
                  onChange={(event) => updateField("meterNumber", event.target.value, false)}
                  placeholder="رقم أو كود العداد"
                  inputMode="numeric"
                  className="h-14 w-full rounded-2xl border border-slate-200 bg-white pr-12 pl-4 text-base font-extrabold text-slate-900 outline-none transition placeholder:text-slate-300 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-600"
                />
              </div>
            </FormField>

            <FormField label="القراءة السابقة" error={errors.previousReading}>
              <NumberInput
                icon={Gauge}
                value={form.previousReading}
                onChange={(event) => updateField("previousReading", event.target.value)}
                placeholder="0"
              />
            </FormField>

            <FormField label="القراءة الحالية" error={errors.currentReading}>
              <NumberInput
                icon={Gauge}
                value={form.currentReading}
                onChange={(event) => updateField("currentReading", event.target.value)}
                placeholder="0"
              />
            </FormField>

            {isTiered && (
              <FormField label="أشهر المحاسبة" hint="يوزع الاستهلاك على الشهور" error={errors.calculationMonths}>
                <NumberInput
                  icon={CalendarDays}
                  value={form.calculationMonths}
                  onChange={(event) => updateField("calculationMonths", event.target.value)}
                  placeholder="1"
                  min="1"
                />
              </FormField>
            )}

            <FormField label="القسط إن وجد" hint="يضاف إلى الإجمالي">
              <NumberInput
                icon={WalletCards}
                value={form.installment}
                onChange={(event) => updateField("installment", event.target.value)}
                placeholder="0"
              />
            </FormField>

            <FormField label="شهر المحاسبة" error={errors.month}>
              <select
                value={form.month}
                onChange={(event) => updateField("month", event.target.value)}
                className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-base font-extrabold text-slate-900 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 dark:border-white/10 dark:bg-slate-900 dark:text-white"
              >
                {months.map((month) => (
                  <option key={month} value={month}>
                    {new Intl.DateTimeFormat("ar-EG", { month: "long" }).format(new Date(2026, month - 1, 1))}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="السنة" error={errors.year}>
              <NumberInput
                icon={CalendarDays}
                value={form.year}
                onChange={(event) => updateField("year", event.target.value)}
                placeholder="2026"
              />
            </FormField>
          </div>

          <div className="mt-6 rounded-3xl border border-dashed border-brand-300 bg-brand-50/60 p-4 text-xs font-semibold leading-6 text-brand-950 dark:border-brand-500/30 dark:bg-brand-500/5 dark:text-brand-100">
            {isTiered
              ? "عند حساب أكثر من شهر، يتم تقسيم الاستهلاك على عدد الشهور أولاً، ثم تطبيق الشرائح على متوسط الشهر وضرب الناتج في عدد الشهور."
              : "يتم حساب المخابز البلدية بضرب فرق القراءات في سعر الوحدة المسجل في صفحة أسعار الشرائح."}
          </div>

          <button
            type="submit"
            className="mt-6 inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-brand-900 to-brand-500 px-6 text-base font-black text-white shadow-glow transition hover:-translate-y-0.5"
          >
            <ReceiptText size={21} />
            احسب قيمة الفاتورة
          </button>
        </form>

        <div ref={resultRef} className="scroll-mt-24">
          {result ? (
            <ResultPanel result={result} onSave={handleSave} saved={saved} />
          ) : (
            <div className="hidden min-h-[34rem] place-items-center rounded-4xl border border-dashed border-slate-300 bg-white/50 p-8 text-center dark:border-white/15 dark:bg-white/[0.02] xl:grid">
              <div>
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-[1.75rem] bg-brand-50 text-brand-900 dark:bg-brand-500/15 dark:text-brand-200">
                  <ReceiptText size={34} />
                </div>
                <h3 className="mt-5 text-xl font-black text-slate-900 dark:text-white">النتيجة ستظهر هنا</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm font-medium leading-7 text-slate-500 dark:text-slate-400">
                  أدخل القراءات واضغط على زر الحساب لعرض قيمة الاستهلاك وتقسيم الشرائح.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
