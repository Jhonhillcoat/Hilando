import Link from "next/link";

import { HomeQuiz } from "@/components/HomeQuiz";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pb-24 pt-8 sm:px-6">
      <section className="mb-8 text-center">
        <p className="font-fraunces text-2xl italic text-madera sm:text-3xl">
          ¿Qué hacés con esta prenda?
        </p>
        <p className="mx-auto mt-3 max-w-lg font-nunito text-base text-madera-soft sm:text-lg">
          Respondé cinco preguntas y te recomendamos donar, reparar o vender con
          datos concretos.
        </p>
      </section>

      <HomeQuiz />

      <p className="mt-12 text-center text-sm text-madera-mute">
        ¿Solo querés explorar?{" "}
        <Link
          href="/marketplace"
          className={cn(
            "font-medium text-terracota underline-offset-4 transition-colors hover:text-terracota-dark hover:underline"
          )}
        >
          Ir al marketplace
        </Link>
      </p>
    </div>
  );
}
