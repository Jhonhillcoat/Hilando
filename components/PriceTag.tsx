import { formatArs } from "@/lib/quiz-logic";
import { formatCredits, priceToCredits } from "@/lib/credits";
import { cn } from "@/lib/utils";

type PriceTagProps = {
  priceArs: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  inline?: boolean;
};

const sizeClasses = {
  sm: {
    ars: "text-base",
    credits: "text-sm",
  },
  md: {
    ars: "text-2xl",
    credits: "text-base",
  },
  lg: {
    ars: "text-3xl",
    credits: "text-lg",
  },
};

export function PriceTag({ priceArs, size = "md", className, inline = true }: PriceTagProps) {
  const credits = priceToCredits(priceArs);
  const sizes = sizeClasses[size];

  return (
    <div
      className={cn(
        inline ? "flex flex-wrap items-baseline gap-x-2 gap-y-0.5" : "space-y-1",
        className
      )}
    >
      <span className={cn("font-fraunces italic text-madera", sizes.ars)}>
        {formatArs(priceArs)}
      </span>
      {inline ? (
        <span className="text-madera-mute" aria-hidden>
          ·
        </span>
      ) : null}
      <span className={cn("font-medium text-terracota", sizes.credits)}>
        {formatCredits(credits)}
      </span>
    </div>
  );
}
