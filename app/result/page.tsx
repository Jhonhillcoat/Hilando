"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { ResultCard } from "@/components/ResultCard";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  decideCamino,
  formatArs,
  pickArtisanForCategory,
  reasonsForCamino,
  type Camino,
} from "@/lib/quiz-logic";
import { useQuizStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const labels: Record<Camino, string> = {
  donar: "DONAR",
  reparar: "REPARAR",
  vender: "VENDER",
};

function ctaFor(camino: Camino): { href: string; label: string } {
  if (camino === "reparar") return { href: "#oficios", label: "Ver oficios" };
  if (camino === "vender") return { href: "/marketplace", label: "Publicar prenda" };
  return { href: "#ongs", label: "Ver ONGs" };
}

export default function ResultPage() {
  const router = useRouter();
  const answers = useQuizStore((s) => s.answers);
  const [override, setOverride] = useState<Camino | null>(null);

  const complete = answers.length >= 5;

  useEffect(() => {
    if (!complete) router.replace("/");
  }, [complete, router]);

  const decision = useMemo(() => {
    if (!complete) return null;
    return decideCamino(answers);
  }, [answers, complete]);

  const shown: Camino | null = override ?? decision?.camino ?? null;

  if (!decision || !shown) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center text-madera-mute">
        Preparando tu recomendación…
      </div>
    );
  }

  const reasons = reasonsForCamino(answers, shown);
  const artisan = pickArtisanForCategory(decision.garmentCategory);
  const { estimates } = decision;

  const others = (["donar", "reparar", "vender"] as Camino[]).filter((c) => c !== shown);

  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-10 sm:px-6">
      <p className="font-caveat text-2xl text-madera-mute">según lo que nos contaste…</p>
      <h1 className="mt-2 font-fraunces text-3xl font-semibold text-madera sm:text-4xl">
        Tu mejor camino es
      </h1>
      <p className="mt-4 font-fraunces text-4xl italic text-terracota sm:text-5xl">
        {labels[shown]} ✨
      </p>

      <section className="mt-10 space-y-3">
        <h2 className="font-fraunces text-xl text-madera">Por qué</h2>
        <ul className="space-y-3">
          {reasons.map((r) => (
            <li key={r} className="flex gap-3 text-madera-soft">
              <span
                className="mt-1.5 size-2 shrink-0 rounded-full bg-terracota"
                aria-hidden
              />
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <div className="grid gap-4 rounded-container bg-madera p-6 text-crema shadow-hilando sm:grid-cols-2">
          {shown === "reparar" && estimates.reparar ? (
            <>
              <div>
                <p className="font-caveat text-lg text-durazno-light">Costo estimado</p>
                <p className="font-fraunces text-2xl italic">
                  {formatArs(estimates.reparar.costoMin)} –{" "}
                  {formatArs(estimates.reparar.costoMax)}
                </p>
              </div>
              <div>
                <p className="font-caveat text-lg text-durazno-light">Tiempo</p>
                <p className="font-nunito text-xl">{estimates.reparar.tiempo}</p>
              </div>
            </>
          ) : null}
          {shown === "vender" && estimates.vender ? (
            <>
              <div>
                <p className="font-caveat text-lg text-durazno-light">Valor estimado</p>
                <p className="font-fraunces text-2xl italic">
                  {formatArs(estimates.vender.valorMin)} –{" "}
                  {formatArs(estimates.vender.valorMax)}
                </p>
              </div>
              <div>
                <p className="font-caveat text-lg text-durazno-light">
                  Tiempo de publicación
                </p>
                <p className="font-nunito text-xl">{estimates.vender.tiempoPublicacion}</p>
              </div>
            </>
          ) : null}
          {shown === "donar" && estimates.donar ? (
            <>
              <div>
                <p className="font-caveat text-lg text-durazno-light">Créditos que ganás</p>
                <p className="font-fraunces text-2xl italic">
                  {estimates.donar.creditosMin} – {estimates.donar.creditosMax} pts
                </p>
              </div>
              <div>
                <p className="font-caveat text-lg text-durazno-light">ONG sugerida</p>
                <p className="font-nunito text-lg leading-snug">{estimates.donar.ongName}</p>
              </div>
            </>
          ) : null}
        </div>
      </section>

      {shown === "reparar" ? (
        <section id="oficios" className="mt-10">
          <ResultCard>
            <p className="font-caveat text-xl italic text-terracota">Oficio sugerido</p>
            <div className="mt-4 flex gap-4">
              <div
                className="flex size-14 shrink-0 items-center justify-center rounded-full bg-mostaza/30 font-fraunces text-xl text-madera"
                aria-hidden
              >
                {artisan.name.charAt(0)}
              </div>
              <div>
                <p className="font-fraunces text-xl text-madera">{artisan.name}</p>
                <p className="text-sm text-madera-soft">{artisan.specialty}</p>
                <p className="text-sm text-madera-mute">
                  {artisan.neighborhood} · {artisan.distance} · ★ {artisan.rating.toFixed(1)}
                </p>
              </div>
            </div>
          </ResultCard>
        </section>
      ) : null}

      {shown === "vender" ? (
        <section className="mt-10">
          <ResultCard accent="mostaza">
            <p className="font-fraunces text-lg text-madera">Publicá en el marketplace</p>
            <p className="mt-2 text-madera-soft">
              Estimación orientativa:{" "}
              <span className="font-fraunces italic text-terracota">
                {estimates.vender
                  ? `${formatArs(estimates.vender.valorMin)} – ${formatArs(estimates.vender.valorMax)}`
                  : ""}
              </span>
            </p>
            <Link
              href="/marketplace"
              className={cn(
                buttonVariants({ variant: "default" }),
                "mt-4 inline-flex rounded-cta bg-terracota text-crema hover:bg-terracota-dark"
              )}
            >
              Ir al marketplace
            </Link>
          </ResultCard>
        </section>
      ) : null}

      {shown === "donar" ? (
        <section id="ongs" className="mt-10">
          <ResultCard>
            <div className="flex gap-4">
              <div
                className="flex size-16 shrink-0 items-center justify-center rounded-full border border-crema-deep bg-crema text-xs text-madera-mute"
                aria-hidden
              >
                logo
              </div>
              <div>
                <p className="font-fraunces text-xl text-madera">{estimates.donar?.ongName}</p>
                <p className="text-sm text-madera-soft">{estimates.donar?.ongAddress}</p>
              </div>
            </div>
          </ResultCard>
        </section>
      ) : null}

      <section className="mt-14">
        <h2 className="font-fraunces text-xl text-madera">¿Preferís otro camino?</h2>
        <ul className="mt-4 space-y-3">
          {others.map((c) => (
            <li key={c}>
              <button
                type="button"
                onClick={() => setOverride(c)}
                className="w-full rounded-card border-l-4 border-l-mostaza bg-crema-warm px-4 py-3 text-left shadow-hilando transition-all duration-200 ease-out hover:translate-y-[-2px] hover:border-l-terracota"
              >
                <span className="font-fraunces text-lg italic text-terracota">
                  {labels[c]}
                </span>
                <span className="mt-1 block text-sm text-madera-mute">
                  {c === "reparar" && estimates.reparar
                    ? `Costo ${formatArs(estimates.reparar.costoMin)} – ${formatArs(estimates.reparar.costoMax)} · ${estimates.reparar.tiempo}`
                    : null}
                  {c === "vender" && estimates.vender
                    ? `Valor ${formatArs(estimates.vender.valorMin)} – ${formatArs(estimates.vender.valorMax)} · ${estimates.vender.tiempoPublicacion}`
                    : null}
                  {c === "donar" && estimates.donar
                    ? `Créditos ${estimates.donar.creditosMin}–${estimates.donar.creditosMax} · ${estimates.donar.ongName}`
                    : null}
                </span>
              </button>
            </li>
          ))}
        </ul>
        {override ? (
          <Button
            type="button"
            variant="ghost"
            className="mt-3 text-terracota"
            onClick={() => setOverride(null)}
          >
            Volver a la recomendación principal
          </Button>
        ) : null}
      </section>

      <p className="mt-10 text-center">
        <Link href="/" className="text-sm font-medium text-madera-mute hover:text-terracota">
          Decidir con otra prenda →
        </Link>
      </p>

      <section className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Link
          href={ctaFor(shown).href}
          className={cn(
            buttonVariants({ variant: "default" }),
            "h-12 flex-1 rounded-cta bg-terracota text-crema shadow-hilando hover:bg-terracota-dark"
          )}
        >
          {ctaFor(shown).label}
        </Link>
        <Dialog>
          <DialogTrigger
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-12 flex-1 rounded-cta border-2 border-madera/25 bg-transparent hover:bg-durazno-light"
            )}
          >
            Guardar para después
          </DialogTrigger>
          <DialogContent className="border-crema-deep bg-crema-warm sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-fraunces text-madera">Te esperamos</DialogTitle>
              <DialogDescription className="text-madera-soft">
                Esta acción es solo demo: en el producto final podrías guardar tu decisión y
                retomarla con una cuenta.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </section>
    </div>
  );
}
