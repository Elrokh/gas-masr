import { X } from "lucide-react";

export default function Modal({ open, title, description, onClose, onConfirm, confirmLabel = "تأكيد", danger = false }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-slate-950/60 p-4 backdrop-blur-sm" onMouseDown={onClose}>
      <div
        className="w-full max-w-md rounded-4xl border border-white/20 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-slate-900"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-slate-950 dark:text-white">{title}</h2>
            {description && <p className="mt-2 text-sm font-medium leading-7 text-slate-500 dark:text-slate-400">{description}</p>}
          </div>
          <button type="button" onClick={onClose} className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-300">
            <X size={19} />
          </button>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button type="button" onClick={onClose} className="h-12 rounded-2xl border border-slate-200 bg-white text-sm font-extrabold text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-white">
            إلغاء
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`h-12 rounded-2xl text-sm font-extrabold text-white shadow-lg ${danger ? "bg-rose-600 shadow-rose-600/20" : "bg-gradient-to-l from-brand-900 to-brand-500 shadow-brand-500/20"}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
