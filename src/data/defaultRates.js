export const DEFAULT_RATES = {
  home: {
    label: "منازل",
    updatedAt: "2026-04",
    tiers: [
      { id: "home-1", label: "الشريحة الأولى", from: 0, to: 30, price: 6 },
      { id: "home-2", label: "الشريحة الثانية", from: 30, to: 60, price: 8 },
      { id: "home-3", label: "الشريحة الثالثة", from: 60, to: null, price: 12 }
    ]
  },
  commercial: {
    label: "تجاري (معادل منازل)",
    updatedAt: "2026-04",
    tiers: [
      { id: "commercial-1", label: "الشريحة الأولى", from: 0, to: 30, price: 6 },
      { id: "commercial-2", label: "الشريحة الثانية", from: 30, to: 60, price: 8 },
      { id: "commercial-3", label: "الشريحة الثالثة", from: 60, to: null, price: 12 }
    ]
  },
  bakery: {
    label: "مخابز بلدية",
    updatedAt: "2026-04",
    flatRate: 0.141
  }
};

export const CALCULATOR_TYPES = {
  home: {
    title: "منازل",
    subtitle: "حساب الاستهلاك المنزلي حسب الشرائح",
    color: "from-brand-900 to-brand-500"
  },
  commercial: {
    title: "تجاري (معادل منازل)",
    subtitle: "للنشاط التجاري المحاسب بشرائح المنازل",
    color: "from-indigo-700 to-brand-500"
  },
  bakery: {
    title: "مخابز بلدية",
    subtitle: "حساب مباشر بسعر الوحدة المحدد",
    color: "from-violet-700 to-brand-500"
  }
};
