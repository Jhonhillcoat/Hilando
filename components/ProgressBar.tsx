"use client";

import { cn } from "@/lib/utils";

type ProgressBarProps = {
  step: number;
  total?: number;
  className?: string;
};

export function ProgressBar({ step, total = 5, className }: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (step / total) * 100));
  return (
    <div
      className={cn("h-1 w-full overflow-hidden rounded-full bg-crema-deep", className)}
      role="progressbar"
      aria-valuenow={step}
      aria-valuemin={0}
      aria-valuemax={total}
    >
      <div
        className="h-1 rounded-full bg-terracota transition-all duration-300 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
