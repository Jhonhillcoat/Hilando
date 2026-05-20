export type DemoUser = {
  id: string;
  name: string;
  credits: number;
  donationsCount: number;
  lastDonationLabel: string;
};

/** Usuario demo siempre logueado en la app. */
export const DEMO_USER: DemoUser = {
  id: "helena",
  name: "Helena",
  credits: 840,
  donationsCount: 3,
  lastDonationLabel: "Banco de Ropa BA · marzo 2026",
};

export function isLoggedIn(): boolean {
  return true;
}
