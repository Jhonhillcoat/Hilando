import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Text size class, e.g. text-5xl */
  sizeClass?: string;
};

export function Logo({ className, sizeClass = "text-3xl" }: LogoProps) {
  return (
    <span className={cn("font-fraunces font-semibold text-madera", sizeClass, className)}>
      Hil
      <em className="not-italic">
        <span className="italic text-terracota">a</span>
      </em>
      ndo
    </span>
  );
}
