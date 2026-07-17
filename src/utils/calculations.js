function round(value, digits = 3) {
  const factor = 10 ** digits;
  return Math.round((Number(value) + Number.EPSILON) * factor) / factor;
}

export function calculateTieredBill({ consumption, months = 1, tiers, installment = 0 }) {
  const safeConsumption = Math.max(0, Number(consumption || 0));
  const safeMonths = Math.max(1, Math.floor(Number(months || 1)));
  const averageMonthlyConsumption = safeConsumption / safeMonths;

  const monthlyBreakdown = tiers.map((tier) => {
    const upperLimit = tier.to ?? Infinity;
    const quantity = Math.max(
      0,
      Math.min(averageMonthlyConsumption, upperLimit) - tier.from
    );

    return {
      ...tier,
      monthlyQuantity: round(quantity),
      totalQuantity: round(quantity * safeMonths),
      amount: round(quantity * Number(tier.price) * safeMonths, 2)
    };
  });

  const subtotal = round(
    monthlyBreakdown.reduce((sum, tier) => sum + tier.amount, 0),
    2
  );
  const total = round(subtotal + Number(installment || 0), 2);

  return {
    consumption: round(safeConsumption),
    months: safeMonths,
    averageMonthlyConsumption: round(averageMonthlyConsumption),
    breakdown: monthlyBreakdown,
    subtotal,
    installment: round(Number(installment || 0), 2),
    total
  };
}

export function calculateFlatBill({ consumption, flatRate, installment = 0 }) {
  const safeConsumption = Math.max(0, Number(consumption || 0));
  const safeRate = Math.max(0, Number(flatRate || 0));
  const subtotal = round(safeConsumption * safeRate, 2);
  const total = round(subtotal + Number(installment || 0), 2);

  return {
    consumption: round(safeConsumption),
    months: 1,
    averageMonthlyConsumption: round(safeConsumption),
    breakdown: [
      {
        id: "flat-rate",
        label: "سعر الوحدة",
        totalQuantity: round(safeConsumption),
        price: safeRate,
        amount: subtotal
      }
    ],
    subtotal,
    installment: round(Number(installment || 0), 2),
    total
  };
}

export function calculateBill({ type, previousReading, currentReading, months, installment, rates }) {
  const consumption = Number(currentReading) - Number(previousReading);

  if (type === "bakery") {
    return calculateFlatBill({
      consumption,
      flatRate: rates.bakery.flatRate,
      installment
    });
  }

  return calculateTieredBill({
    consumption,
    months,
    tiers: rates[type].tiers,
    installment
  });
}
