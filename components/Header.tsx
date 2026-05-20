import Link from "next/link";

import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Decidir" },
  { href: "/marketplace", label: "Marketplace" },
];

export function Header() {
  return (
    <header className="border-b border-crema-deep/60 bg-crema-warm/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="transition-all duration-200 ease-out hover:translate-y-[-2px]">
          <Logo sizeClass="text-2xl sm:text-3xl" />
        </Link>
        <nav className="flex items-center gap-1 sm:gap-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-cta px-3 py-2 text-sm font-medium text-madera-soft transition-all duration-200 ease-out",
                "hover:translate-y-[-2px] hover:bg-durazno-light hover:text-madera"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
