/** 1 crédito Hilando ≈ $30 ARS en el marketplace (demo). */
export const ARS_PER_CREDIT = 30;

export function priceToCredits(priceArs: number): number {
  return Math.max(1, Math.round(priceArs / ARS_PER_CREDIT));
}

export function formatCredits(amount: number): string {
  return `${amount.toLocaleString("es-AR")} créditos`;
}

export function formatPriceWithCredits(priceArs: number): {
  ars: string;
  credits: number;
  creditsLabel: string;
} {
  const credits = priceToCredits(priceArs);
  return {
    ars: new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(priceArs),
    credits,
    creditsLabel: formatCredits(credits),
  };
}
