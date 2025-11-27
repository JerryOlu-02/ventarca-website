export function formatCurrencyNumber(num: number): string {
  if (num < 1000) return num.toString();

  const tiers = [
    { value: 1e9, symbol: "b" },
    { value: 1e6, symbol: "m" },
    { value: 1e3, symbol: "k" },
  ];

  const item = tiers.find((tier) => num >= tier.value);

  if (item) {
    const result = num / item.value;

    return result.toFixed(1).replace(/\.0$/, "") + item.symbol;
  }

  return num.toString();
}
