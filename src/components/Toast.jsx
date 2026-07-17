import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import { useApp } from "../context/AppContext";

const config = {
  success: { icon: CheckCircle2, className: "bg-emerald-600 text-white" },
  info: { icon: Info, className: "bg-slate-900 text-white dark:bg-white dark:text-slate-900" },
  error: { icon: AlertCircle, className: "bg-rose-600 text-white" }
};

export default function Toast() {
  const { toast } = useApp();
  if (!toast) return null;

  const item = config[toast.type] || config.success;
  const Icon = item.icon;

  return (
    <div className="fixed inset-x-4 bottom-24 z-[70] flex justify-center lg:bottom-8 lg:right-auto lg:left-8">
      <div className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-extrabold shadow-2xl ${item.className}`}>
        <Icon size={20} />
        <span>{toast.message}</span>
      </div>
    </div>
  );
}
