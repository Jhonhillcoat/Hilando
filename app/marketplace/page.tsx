import type { Garment } from "@/types/domain";

import { GarmentCard } from "@/components/GarmentCard";
import { Logo } from "@/components/Logo";
import garmentsData from "@/data/garments.json";

const garments = garmentsData as Garment[];

export default function MarketplacePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6">
      <div className="mb-10 text-center sm:text-left">
        <Logo sizeClass="text-3xl sm:text-4xl" />
        <p className="mt-2 font-caveat text-2xl italic text-terracota">
          Prendas elegidas por personas reales, en tu ciudad.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {garments.map((g) => (
          <GarmentCard key={g.id} garment={g} />
        ))}
      </div>
    </div>
  );
}
