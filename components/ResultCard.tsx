import { cn } from "@/lib/utils";

type ResultCardProps = {
  children: React.ReactNode;
  className?: string;
  accent?: "terracota" | "mostaza";
};

export function ResultCard({
  children,
  className,
  accent = "terracota",
}: ResultCardProps) {
  const border =
    accent === "mostaza" ? "border-l-mostaza" : "border-l-terracota";
  return (
    <div
      className={cn(
        "rounded-container border-l-4 bg-crema-warm p-6 shadow-hilando",
        border,
        className
      )}
    >
      {children}
    </div>
  );
}
