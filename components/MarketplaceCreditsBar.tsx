import { HeartHandshake } from "lucide-react";

import { formatCredits } from "@/lib/credits";
import { DEMO_USER } from "@/lib/user";
import { cn } from "@/lib/utils";

export function MarketplaceCreditsBar() {
  return (
    <div
      className={cn(
        "mb-8 flex flex-col gap-4 rounded-container border border-mostaza/30 bg-durazno-light/60 p-5 shadow-hilando sm:flex-row sm:items-center sm:justify-between"
      )}
    >
      <div className="flex gap-3">
        <div
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-terracota/15 text-terracota"
          aria-hidden
        >
          <HeartHandshake className="size-5" />
        </div>
        <div>
          <p className="font-fraunces text-lg text-madera">
            Hola, {DEMO_USER.name} — tenés{" "}
            <span className="italic text-terracota">{formatCredits(DEMO_USER.credits)}</span>
          </p>
          <p className="mt-1 text-sm text-madera-soft">
            Sumados por {DEMO_USER.donationsCount} donaciones anteriores. Última:{" "}
            {DEMO_USER.lastDonationLabel}.
          </p>
        </div>
      </div>
      <p className="text-xs text-madera-mute sm:max-w-xs sm:text-right">
        Cada prenda muestra su precio en pesos y el equivalente en créditos ($30 = 1 crédito en
        demo).
      </p>
    </div>
  );
}
