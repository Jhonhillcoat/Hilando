import Link from "next/link";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Garment } from "@/types/domain";
import { formatArs } from "@/lib/quiz-logic";
import { cn } from "@/lib/utils";

const conditionStyles: Record<string, string> = {
  "Como nueva": "bg-emerald-100 text-emerald-900",
  "Muy buen estado": "bg-amber-100 text-amber-900",
  "Buen estado": "bg-yellow-50 text-yellow-900",
  "Necesita arreglo": "bg-orange-100 text-orange-900",
};

function badgeClass(condition: string) {
  return conditionStyles[condition] ?? "bg-crema-deep text-madera";
}

type GarmentCardProps = {
  garment: Garment;
};

export function GarmentCard({ garment }: GarmentCardProps) {
  return (
    <Link href={`/marketplace/${garment.id}`} className="block">
      <Card
        className={cn(
          "h-full border-l-4 border-l-terracota bg-crema-warm shadow-hilando transition-all duration-200 ease-out",
          "hover:translate-y-[-2px] hover:border-l-mostaza hover:shadow-[0_12px_28px_rgba(61,40,23,0.1)]"
        )}
      >
        <CardContent className="space-y-3 pt-4">
          <div
            className="flex aspect-[4/3] items-center justify-center rounded-card text-5xl"
            style={{ backgroundColor: garment.color }}
          >
            <span aria-hidden>{garment.emoji}</span>
          </div>
          <div>
            <p className="font-fraunces text-lg text-madera">{garment.name}</p>
            <p className="font-caveat text-lg italic text-terracota">{garment.brand}</p>
            <p className="text-sm text-madera-mute">Talle {garment.size}</p>
          </div>
          <p className="font-fraunces text-2xl italic text-madera">
            {formatArs(garment.price)}
          </p>
          <span
            className={cn(
              "inline-block rounded-full px-2.5 py-0.5 text-xs font-medium",
              badgeClass(garment.condition)
            )}
          >
            {garment.condition}
          </span>
        </CardContent>
        <CardFooter className="text-xs text-madera-mute">
          {garment.seller} · {garment.neighborhood} · ★ {garment.rating.toFixed(1)}
        </CardFooter>
      </Card>
    </Link>
  );
}
