import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_RATES } from "../data/defaultRates";

const AppContext = createContext(null);

const STORAGE_KEYS = {
  theme: "gas-bill-theme",
  rates: "gas-bill-rates",
  records: "gas-bill-records"
};

function readStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function createId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.theme);
    if (saved) return saved;
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  const [rates, setRates] = useState(() => readStorage(STORAGE_KEYS.rates, DEFAULT_RATES));
  const [records, setRecords] = useState(() => readStorage(STORAGE_KEYS.records, []));
  const [toast, setToast] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem(STORAGE_KEYS.theme, theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.rates, JSON.stringify(rates));
  }, [rates]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.records, JSON.stringify(records));
  }, [records]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const notify = (message, type = "success") => {
    setToast({ message, type, id: Date.now() });
  };

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  const addRecord = (record) => {
    const newRecord = {
      ...record,
      id: createId(),
      createdAt: new Date().toISOString()
    };
    setRecords((current) => [newRecord, ...current]);
    notify("تم حفظ الفاتورة في السجل");
    return newRecord;
  };

  const deleteRecord = (id) => {
    setRecords((current) => current.filter((record) => record.id !== id));
    notify("تم حذف الفاتورة", "info");
  };

  const clearRecords = () => {
    setRecords([]);
    notify("تم حذف جميع السجلات", "info");
  };

  const updateRates = (nextRates) => {
    setRates(nextRates);
    notify("تم حفظ أسعار الشرائح");
  };

  const resetRates = () => {
    setRates(DEFAULT_RATES);
    notify("تم استرجاع الأسعار الافتراضية", "info");
  };

  const exportBackup = () => {
    const payload = {
      app: "gas-bill-modern",
      version: 1,
      exportedAt: new Date().toISOString(),
      rates,
      records
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `gas-bill-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    notify("تم تنزيل النسخة الاحتياطية");
  };

  const importBackup = async (file) => {
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      if (!Array.isArray(data.records) || !data.rates) {
        throw new Error("Invalid backup");
      }
      setRecords(data.records);
      setRates(data.rates);
      notify("تم استرجاع النسخة الاحتياطية");
      return true;
    } catch {
      notify("الملف غير صالح للاسترجاع", "error");
      return false;
    }
  };

  const stats = useMemo(() => {
    const totalBills = records.length;
    const totalValue = records.reduce((sum, record) => sum + Number(record.total || 0), 0);
    const totalConsumption = records.reduce(
      (sum, record) => sum + Number(record.consumption || 0),
      0
    );

    return { totalBills, totalValue, totalConsumption };
  }, [records]);

  const value = {
    theme,
    toggleTheme,
    rates,
    records,
    stats,
    toast,
    notify,
    addRecord,
    deleteRecord,
    clearRecords,
    updateRates,
    resetRates,
    exportBackup,
    importBackup
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used inside AppProvider");
  return context;
}
