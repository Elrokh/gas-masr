import {
  ArrowLeft,
  Calculator,
  CircleDollarSign,
  Gauge,
  History,
  ReceiptText,
  Settings2
} from "lucide-react";
import { Link } from "react-router-dom";
import InstallBanner from "../components/InstallBanner";
import RecordCard from "../components/RecordCard";
import StatCard from "../components/StatCard";
import ThemeToggle from "../components/ThemeToggle";
import TypeCard from "../components/TypeCard";
import { useApp } from "../context/AppContext";
import { CALCULATOR_TYPES } from "../data/defaultRates";
import { formatCurrency, formatNumber } from "../utils/format";

export default function HomePage() {
  const { records, stats, deleteRecord } = useApp();
  const recentRecords = records.slice(0, 2);

  return (
    <div>
      <div className="mb-7 hidden items-center justify-between lg:flex">
        <div>
          <p className="text-sm font-extrabold text-brand-700 dark:text-brand-300">لوحة التحكم</p>
          <h1 className="mt-1 text-3xl font-black text-slate-950 dark:text-white">أهلاً بك في حاسبة الغاز</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/settings"
            className="grid h-11 w-11 place-items-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/5 dark:text-white"
            aria-label="الإعدادات"
          >
            <Settings2 size={20} />
          </Link>
          <ThemeToggle />
        </div>
      </div>

      <section className="relative overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-brand-950 via-brand-900 to-brand-500 p-5 text-white shadow-glow sm:p-8 lg:p-10">
        <div className="absolute -left-20 -top-24 h-64 w-64 rounded-full border-[38px] border-white/10" />
        <div className="absolute -bottom-32 right-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="relative grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-extrabold backdrop-blur-md">
              <Gauge size={15} />
              حساب سريع ودقيق
            </span>
            <h2 className="mt-5 max-w-2xl text-3xl font-black leading-tight sm:text-5xl">
              احسب فاتورة الغاز واحفظ كل قراءاتك في مكان واحد
            </h2>
            <p className="mt-4 max-w-xl text-sm font-semibold leading-7 text-white/70 sm:text-base">
              اختر نوع الحساب، أدخل القراءة السابقة والحالية، وشاهد تقسيم الشرائح والإجمالي فوراً.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/calculator/home"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-white px-6 text-sm font-black text-brand-950 shadow-xl transition hover:-translate-y-0.5"
              >
                <Calculator size={20} />
                ابدأ الحساب
              </Link>
              <Link
                to="/history"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 text-sm font-black text-white backdrop-blur-md transition hover:bg-white/15"
              >
                <History size={20} />
                عرض السجل
              </Link>
            </div>
          </div>

          <div className="mx-auto w-full max-w-sm rounded-[2rem] border border-white/15 bg-white/10 p-5 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white/60">آخر فاتورة محفوظة</p>
                <p className="mt-2 text-3xl font-black">
                  {records[0] ? formatCurrency(records[0].total) : formatCurrency(0)}
                </p>
              </div>
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/15">
                <ReceiptText size={27} />
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-black/10 p-3">
                <p className="text-[11px] font-bold text-white/55">عدد الفواتير</p>
                <p className="mt-1 text-xl font-black">{formatNumber(stats.totalBills, 0)}</p>
              </div>
              <div className="rounded-2xl bg-black/10 p-3">
                <p className="text-[11px] font-bold text-white/55">إجمالي الاستهلاك</p>
                <p className="mt-1 text-xl font-black">{formatNumber(stats.totalConsumption)} م³</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-5">
        <InstallBanner compact />
      </div>

      <section className="mt-8">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold text-brand-700 dark:text-brand-300">نوع الفاتورة</p>
            <h2 className="mt-1 text-xl font-black text-slate-950 dark:text-white sm:text-2xl">اختر طريقة الحساب</h2>
          </div>
          <Link to="/rates" className="hidden items-center gap-2 text-sm font-extrabold text-brand-700 hover:text-brand-900 dark:text-brand-300 sm:flex">
            أسعار الشرائح
            <ArrowLeft size={17} />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {Object.entries(CALCULATOR_TYPES).map(([type, config]) => (
            <TypeCard key={type} type={type} {...config} />
          ))}
        </div>
      </section>

      <section className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-3">
        <StatCard icon={ReceiptText} label="الفواتير المحفوظة" value={formatNumber(stats.totalBills, 0)} hint="محفوظة على جهازك" />
        <StatCard icon={Gauge} label="إجمالي الاستهلاك" value={`${formatNumber(stats.totalConsumption)} م³`} hint="لكل السجلات" />
        <div className="col-span-2 lg:col-span-1">
          <StatCard icon={CircleDollarSign} label="إجمالي قيمة الفواتير" value={formatCurrency(stats.totalValue)} hint="إجمالي السجل" />
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold text-brand-700 dark:text-brand-300">آخر العمليات</p>
            <h2 className="mt-1 text-xl font-black text-slate-950 dark:text-white sm:text-2xl">الفواتير الأخيرة</h2>
          </div>
          {records.length > 0 && (
            <Link to="/history" className="inline-flex items-center gap-2 text-sm font-extrabold text-brand-700 dark:text-brand-300">
              عرض الكل
              <ArrowLeft size={17} />
            </Link>
          )}
        </div>

        {recentRecords.length > 0 ? (
          <div className="grid gap-4 xl:grid-cols-2">
            {recentRecords.map((record) => (
              <RecordCard key={record.id} record={record} onDelete={(item) => deleteRecord(item.id)} />
            ))}
          </div>
        ) : (
          <Link
            to="/calculator/home"
            className="flex min-h-40 items-center justify-center rounded-4xl border border-dashed border-slate-300 bg-white/60 p-6 text-center transition hover:border-brand-400 hover:bg-brand-50/50 dark:border-white/15 dark:bg-white/[0.03] dark:hover:bg-brand-500/5"
          >
            <div>
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-900 dark:bg-brand-500/15 dark:text-brand-200">
                <Calculator size={25} />
              </div>
              <p className="mt-4 font-black text-slate-900 dark:text-white">لا توجد فواتير محفوظة بعد</p>
              <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">اضغط هنا واحسب أول فاتورة</p>
            </div>
          </Link>
        )}
      </section>
    </div>
  );
}
