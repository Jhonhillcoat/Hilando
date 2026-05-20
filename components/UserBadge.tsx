import { Coins, User } from "lucide-react";

import { formatCredits } from "@/lib/credits";
import { DEMO_USER } from "@/lib/user";
import { cn } from "@/lib/utils";

type UserBadgeProps = {
  showCredits?: boolean;
  className?: string;
};

export function UserBadge({ showCredits = true, className }: UserBadgeProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-cta border border-crema-deep bg-crema px-2 py-1.5 sm:gap-3 sm:px-3 sm:py-2",
        className
      )}
    >
      <div
        className="flex size-8 shrink-0 items-center justify-center rounded-full bg-terracota/15 text-terracota"
        aria-hidden
      >
        <User className="size-4" />
      </div>
      <div className="min-w-0 text-left leading-tight">
        <p className="truncate text-sm font-semibold text-madera">{DEMO_USER.name}</p>
        {showCredits ? (
          <p className="flex items-center gap-1 text-xs text-madera-soft">
            <Coins className="size-3 shrink-0 text-mostaza" aria-hidden />
            <span>{formatCredits(DEMO_USER.credits)}</span>
          </p>
        ) : (
          <p className="text-xs text-madera-mute">Sesión activa</p>
        )}
      </div>
    </div>
  );
}
