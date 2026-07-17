import { Download, Smartphone } from "lucide-react";
import { useInstallPrompt } from "../hooks/useInstallPrompt";

export default function InstallBanner({ compact = false }) {
  const { canInstall, isStandalone, install } = useInstallPrompt();

  if (isStandalone) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-extrabold text-emerald-800 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
        <Smartphone size={20} />
        <span>التطبيق مثبت على الجهاز</span>
      </div>
    );
  }

  if (!canInstall && compact) return null;

  return (
    <div className={`rounded-3xl border border-brand-200 bg-brand-50/80 ${compact ? "p-3" : "p-4 sm:p-5"} dark:border-brand-500/20 dark:bg-brand-500/10`}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white text-brand-900 shadow-sm dark:bg-white/10 dark:text-brand-200">
            <Smartphone size={22} />
          </div>
          <div>
            <p className="text-sm font-black text-brand-950 dark:text-brand-100">ثبّت التطبيق على أندرويد</p>
            <p className="mt-1 text-xs font-semibold leading-6 text-brand-900/70 dark:text-brand-200/70">
              بعد رفع الموقع افتحه من Chrome واضغط تثبيت ليعمل مثل أي تطبيق.
            </p>
          </div>
        </div>
        {canInstall && (
          <button
            type="button"
            onClick={install}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-brand-900 to-brand-500 px-5 text-sm font-extrabold text-white shadow-glow"
          >
            <Download size={18} />
            تثبيت الآن
          </button>
        )}
      </div>
    </div>
  );
}
