const numberFormatter = new Intl.NumberFormat("ar-EG", {
  maximumFractionDigits: 3
});

const currencyFormatter = new Intl.NumberFormat("ar-EG", {
  style: "currency",
  currency: "EGP",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

export function formatNumber(value, maximumFractionDigits = 3) {
  const numericValue = Number(value || 0);
  return new Intl.NumberFormat("ar-EG", { maximumFractionDigits }).format(numericValue);
}

export function formatCurrency(value) {
  return currencyFormatter.format(Number(value || 0));
}

export function formatDate(value) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("ar-EG", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

export function getArabicMonth(monthNumber) {
  const date = new Date(2026, Number(monthNumber) - 1, 1);
  return new Intl.DateTimeFormat("ar-EG", { month: "long" }).format(date);
}

export function normalizeArabicDigits(value = "") {
  const arabicDigits = "٠١٢٣٤٥٦٧٨٩";
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";

  return String(value)
    .replace(/[٠-٩]/g, (digit) => arabicDigits.indexOf(digit))
    .replace(/[۰-۹]/g, (digit) => persianDigits.indexOf(digit));
}

export function safeNumber(value) {
  const normalized = normalizeArabicDigits(value).replace(",", ".");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

export { numberFormatter };
