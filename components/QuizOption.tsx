"use client";

import { cn } from "@/lib/utils";

type QuizOptionProps = {
  label: string;
  emoji?: string;
  selected: boolean;
  onSelect: () => void;
  className?: string;
};

export function QuizOption({
  label,
  emoji,
  selected,
  onSelect,
  className,
}: QuizOptionProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex w-full items-center gap-3 rounded-card border-2 border-transparent bg-crema-warm px-4 py-3 text-left text-madera shadow-hilando transition-all duration-200 ease-out",
        "hover:translate-y-[-2px] hover:border-mostaza/40 hover:bg-crema",
        selected && "border-terracota bg-durazno-light",
        className
      )}
    >
      {emoji ? <span className="text-xl shrink-0">{emoji}</span> : null}
      <span className="text-base leading-snug">{label}</span>
    </button>
  );
}
