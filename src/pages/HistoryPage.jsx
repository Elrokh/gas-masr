import { Download, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import EmptyState from "../components/EmptyState";
import Modal from "../components/Modal";
import PageHeader from "../components/PageHeader";
import RecordCard from "../components/RecordCard";
import { useApp } from "../context/AppContext";
import { formatCurrency, formatNumber } from "../utils/format";

const filters = [
  { value: "all", label: "الكل" },
  { value: "home", label: "منازل" },
  { value: "commercial", label: "تجاري" },
  { value: "bakery", label: "مخابز" }
];

export default function HistoryPage() {
  const { records, deleteRecord, clearRecords, exportBackup } = useApp();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [showClearModal, setShowClearModal] = useState(false);

  const filteredRecords = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return records.filter((record) => {
      const matchesType = filter === "all" || record.type === filter;
      const haystack = `${record.customerName || ""} ${record.meterNumber || ""} ${record.year || ""}`.toLowerCase();
      return matchesType && (!normalizedQuery || haystack.includes(normalizedQuery));
    });
  }, [records, query, filter]);

  const filteredTotal = useMemo(
    () => filteredRecords.reduce((sum, record) => sum + Number(record.total || 0), 0),
    [filteredRecords]
  );

  return (
    <div>
      <PageHeader
        title="السجل المحفوظ"
        description="كل الفواتير التي تحفظها تظل على هذا الجهاز ويمكن حذف أي فاتورة في لحظة."
        action={
          records.length > 0 ? (
            <button
              type="button"
              onClick={exportBackup}
              className="hidden h-11 items-center gap-2 rounded-2xl bg-gradient-to-l from-brand-900 to-brand-500 px-4 text-sm font-extrabold text-white shadow-glow sm:inline-flex"
            >
              <Download size={18} />
              نسخة احتياطية
            </button>
          ) : null
        }
      />

      {records.length > 0 ? (
        <>
          <section className="mb-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white/85 p-4 dark:border-white/10 dark:bg-white/[0.04]">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400">عدد النتائج</p>
              <p className="mt-2 text-2xl font-black text-slate-950 dark:text-white">{formatNumber(filteredRecords.length, 0)}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white/85 p-4 dark:border-white/10 dark:bg-white/[0.04]">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400">إجمالي النتائج</p>
              <p className="mt-2 text-2xl font-black text-brand-900 dark:text-brand-200">{formatCurrency(filteredTotal)}</p>
            </div>
          </section>

          <section className="mb-6 rounded-4xl border border-slate-200/80 bg-white/85 p-4 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] sm:p-5">
            <div className="grid gap-4 lg:grid-cols-[1fr_auto_auto] lg:items-center">
              <div className="relative">
                <Search className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={19} />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="ابحث بالاسم أو رقم العداد أو السنة"
                  className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pr-12 pl-4 text-sm font-bold outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1">
                {filters.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setFilter(item.value)}
                    className={`h-11 shrink-0 rounded-2xl px-4 text-xs font-extrabold transition ${
                      filter === item.value
                        ? "bg-brand-900 text-white shadow-md"
                        : "bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-300"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setShowClearModal(true)}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-rose-50 px-4 text-xs font-extrabold text-rose-600 transition hover:bg-rose-600 hover:text-white dark:bg-rose-500/10 dark:text-rose-400"
              >
                <Trash2 size={17} />
                حذف الكل
              </button>
            </div>
          </section>

          {filteredRecords.length > 0 ? (
            <div className="grid gap-4 xl:grid-cols-2">
              {filteredRecords.map((record) => (
                <RecordCard key={record.id} record={record} onDelete={setRecordToDelete} />
              ))}
            </div>
          ) : (
            <EmptyState title="لا توجد نتائج مطابقة" description="جرّب تغيير كلمة البحث أو نوع الفاتورة." />
          )}
        </>
      ) : (
        <EmptyState
          title="السجل فارغ"
          description="بعد حساب أي فاتورة اضغط حفظ، وستظهر هنا لتستطيع الرجوع إليها أو حذفها بسهولة."
        />
      )}

      <Modal
        open={Boolean(recordToDelete)}
        title="حذف الفاتورة؟"
        description={`سيتم حذف فاتورة ${recordToDelete?.customerName || "بدون اسم"} نهائياً من الجهاز.`}
        confirmLabel="حذف الفاتورة"
        danger
        onClose={() => setRecordToDelete(null)}
        onConfirm={() => recordToDelete && deleteRecord(recordToDelete.id)}
      />

      <Modal
        open={showClearModal}
        title="حذف جميع السجلات؟"
        description="لن تستطيع استرجاع الفواتير بعد الحذف إلا إذا كان لديك ملف نسخة احتياطية."
        confirmLabel="حذف الجميع"
        danger
        onClose={() => setShowClearModal(false)}
        onConfirm={clearRecords}
      />
    </div>
  );
}
