import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PriceTag } from "@/components/PriceTag";
import { formatCredits, priceToCredits } from "@/lib/credits";
import { DEMO_USER } from "@/lib/user";
import { formatArs } from "@/lib/quiz-logic";
import type { Garment } from "@/types/domain";
import garmentsData from "@/data/garments.json";
import { cn } from "@/lib/utils";

const garments = garmentsData as Garment[];

export function generateStaticParams() {
  return garments.map((g) => ({ id: g.id }));
}

type PageProps = { params: { id: string } };

export default function GarmentDetailPage({ params }: PageProps) {
  const garment = garments.find((g) => g.id === params.id);
  if (!garment) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 pb-24 pt-8 sm:px-6">
      <Link
        href="/marketplace"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "mb-8 inline-flex items-center gap-2 text-madera-mute hover:text-madera"
        )}
      >
        <ArrowLeft className="size-4" aria-hidden />
        Volver al marketplace
      </Link>

      <div className="grid gap-10 lg:grid-cols-2">
        <div
          className="flex min-h-[320px] items-center justify-center rounded-container text-8xl shadow-hilando sm:min-h-[420px]"
          style={{ backgroundColor: garment.color }}
        >
          <span aria-hidden>{garment.emoji}</span>
        </div>

        <div className="space-y-6">
          <p className="font-caveat text-2xl italic text-terracota">{garment.brand}</p>
          <h1 className="font-fraunces text-4xl font-semibold text-madera">{garment.name}</h1>
          <PriceTag priceArs={garment.price} size="lg" />
          <p className="text-sm text-madera-soft">
            Tu saldo:{" "}
            <span className="font-medium text-terracota">
              {formatCredits(DEMO_USER.credits)}
            </span>{" "}
            por donaciones anteriores
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-crema-warm px-3 py-1 text-sm text-madera">
              Talle {garment.size}
            </span>
            <span className="rounded-full border border-mostaza/40 bg-durazno-light px-3 py-1 text-sm text-madera">
              {garment.condition}
            </span>
          </div>
          <p className="leading-relaxed text-madera-soft">{garment.description}</p>

          <Card className="border-l-4 border-l-terracota bg-crema-warm shadow-hilando">
            <CardContent className="flex gap-4 pt-6">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-mostaza/30 font-fraunces text-lg text-madera">
                {garment.seller.charAt(0)}
              </div>
              <div>
                <p className="font-fraunces text-lg text-madera">{garment.seller}</p>
                <p className="text-sm text-madera-mute">{garment.neighborhood}</p>
                <p className="text-sm text-madera-soft">★ {garment.rating.toFixed(1)}</p>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <button
              type="button"
              className={cn(
                buttonVariants({ variant: "default" }),
                "h-14 flex-1 rounded-cta bg-terracota text-lg text-crema shadow-hilando hover:bg-terracota-dark"
              )}
            >
              Comprar — {formatArs(garment.price)} · {formatCredits(priceToCredits(garment.price))}
            </button>
            <button
              type="button"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-14 flex-1 rounded-cta border-2 border-madera/25 hover:bg-durazno-light"
              )}
            >
              Hacer una pregunta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
