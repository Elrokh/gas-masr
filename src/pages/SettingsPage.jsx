import { Download, Moon, Smartphone, Sun, Upload } from "lucide-react";
import { useRef } from "react";
import InstallBanner from "../components/InstallBanner";
import PageHeader from "../components/PageHeader";
import { useApp } from "../context/AppContext";

export default function SettingsPage() {
  const { theme, toggleTheme, exportBackup, importBackup, records } = useApp();
  const fileInputRef = useRef(null);

  const handleImport = async (event) => {
    const file = event.target.files?.[0];
    if (file) await importBackup(file);
    event.target.value = "";
  };

  return (
    <div>
      <PageHeader title="الإعدادات" description="تحكم في شكل التطبيق واحتفظ بنسخة من بياناتك قبل تغيير الهاتف." />

      <div className="grid gap-5 xl:grid-cols-2">
        <section className="rounded-4xl border border-slate-200/80 bg-white/85 p-5 shadow-soft dark:border-white/10 dark:bg-white/[0.04] sm:p-7">
          <p className="text-xs font-extrabold text-brand-700 dark:text-brand-300">المظهر</p>
          <h2 className="mt-1 text-xl font-black text-slate-950 dark:text-white">الوضع الفاتح والداكن</h2>
          <p className="mt-2 text-sm font-medium leading-7 text-slate-500 dark:text-slate-400">اختيارك يُحفظ تلقائياً على الجهاز.</p>

          <button
            type="button"
            onClick={toggleTheme}
            className="mt-6 flex w-full items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 p-4 text-right transition hover:border-brand-400 dark:border-white/10 dark:bg-white/[0.03]"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-900 to-brand-500 text-white">
                {theme === "dark" ? <Moon size={22} /> : <Sun size={22} />}
              </div>
              <div>
                <p className="text-sm font-black text-slate-900 dark:text-white">{theme === "dark" ? "الوضع الداكن" : "الوضع الفاتح"}</p>
                <p className="mt-1 text-xs font-semibold text-slate-400">اضغط للتبديل</p>
              </div>
            </div>
            <span className="rounded-full bg-brand-50 px-3 py-1 text-[11px] font-extrabold text-brand-900 dark:bg-brand-500/15 dark:text-brand-200">مفعّل</span>
          </button>
        </section>

        <section className="rounded-4xl border border-slate-200/80 bg-white/85 p-5 shadow-soft dark:border-white/10 dark:bg-white/[0.04] sm:p-7">
          <div className="flex items-start gap-3">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-900 dark:bg-brand-500/15 dark:text-brand-200">
              <Smartphone size={23} />
            </div>
            <div>
              <p className="text-xs font-extrabold text-brand-700 dark:text-brand-300">أندرويد</p>
              <h2 className="mt-1 text-xl font-black text-slate-950 dark:text-white">تثبيت التطبيق</h2>
              <p className="mt-2 text-sm font-medium leading-7 text-slate-500 dark:text-slate-400">بعد رفع المشروع على رابط HTTPS يمكنك تثبيته من Chrome.</p>
            </div>
          </div>
          <div className="mt-6">
            <InstallBanner />
          </div>
        </section>

        <section className="rounded-4xl border border-slate-200/80 bg-white/85 p-5 shadow-soft dark:border-white/10 dark:bg-white/[0.04] sm:p-7 xl:col-span-2">
          <p className="text-xs font-extrabold text-brand-700 dark:text-brand-300">البيانات</p>
          <h2 className="mt-1 text-xl font-black text-slate-950 dark:text-white">نسخة احتياطية واسترجاع</h2>
          <p className="mt-2 text-sm font-medium leading-7 text-slate-500 dark:text-slate-400">
            يوجد حالياً {records.length} فاتورة محفوظة. نزّل ملف النسخة واحتفظ به قبل نقل التطبيق إلى هاتف آخر.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={exportBackup}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-brand-900 to-brand-500 px-5 text-sm font-black text-white shadow-glow"
            >
              <Download size={20} />
              تنزيل نسخة احتياطية
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-black text-slate-800 transition hover:border-brand-400 dark:border-white/10 dark:bg-white/5 dark:text-white"
            >
              <Upload size={20} />
              استرجاع نسخة
            </button>
            <input ref={fileInputRef} type="file" accept="application/json" onChange={handleImport} className="hidden" />
          </div>
        </section>
      </div>
    </div>
  );
}
