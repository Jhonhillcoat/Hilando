"use client";

import { useMemo, useState } from "react";
import { ExternalLink, ImageIcon } from "lucide-react";

import { ResultCard } from "@/components/ResultCard";
import { Button } from "@/components/ui/button";
import {
  buildModistaBrief,
  garmentLabel,
  getPinterestPins,
  type LookChoice,
} from "@/lib/inspiration";
import type { Answer } from "@/lib/quiz-logic";
import { useQuizStore } from "@/lib/store";
import { cn } from "@/lib/utils";

type TabId = "referencia" | "pinterest" | "modista";

type InspirationTabsProps = {
  answers: Answer[];
  lookChoice: LookChoice;
};

export function InspirationTabs({ answers, lookChoice }: InspirationTabsProps) {
  const inspirationFileName = useQuizStore((s) => s.inspirationFileName);
  const garmentId = answers.find((a) => a.questionId === 3)?.optionId ?? "remera-top";
  const pins = useMemo(() => getPinterestPins(garmentId), [garmentId]);
  const brief = useMemo(
    () => buildModistaBrief(answers, inspirationFileName),
    [answers, inspirationFileName]
  );

  const tabs: { id: TabId; label: string }[] =
    lookChoice === "look-si"
      ? [
          { id: "referencia", label: "Tu inspiración" },
          { id: "pinterest", label: "Pinterest" },
          { id: "modista", label: "Para la modista" },
        ]
      : [
          { id: "pinterest", label: "Pinterest" },
          { id: "modista", label: "Para la modista" },
        ];

  const [active, setActive] = useState<TabId>(tabs[0].id);
  const [copied, setCopied] = useState(false);

  const copyBrief = async () => {
    try {
      await navigator.clipboard.writeText(brief.body);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="mt-10" id="inspiracion">
      <h2 className="font-fraunces text-xl text-madera">Inspiración y brief</h2>
      <p className="mt-2 text-sm text-madera-soft">
        Ideas en Pinterest para tu {garmentLabel(garmentId).toLowerCase()} y un texto listo
        para entregar a la modista.
      </p>

      <div
        role="tablist"
        aria-label="Inspiración"
        className="mt-6 flex flex-wrap gap-2 border-b border-crema-deep pb-2"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active === tab.id}
            onClick={() => setActive(tab.id)}
            className={cn(
              "rounded-cta px-4 py-2 text-sm font-medium transition-all duration-200 ease-out",
              active === tab.id
                ? "bg-terracota text-crema shadow-hilando"
                : "text-madera-soft hover:bg-durazno-light hover:text-madera"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {active === "referencia" && lookChoice === "look-si" ? (
        <div role="tabpanel" className="mt-6">
          <ResultCard>
            {inspirationFileName ? (
              <div className="flex gap-4">
                <div
                  className="flex size-20 shrink-0 items-center justify-center rounded-card bg-durazno-light text-terracota"
                  aria-hidden
                >
                  <ImageIcon className="size-8" />
                </div>
                <div>
                  <p className="font-fraunces text-lg text-madera">Tu referencia cargada</p>
                  <p className="mt-1 text-sm text-madera-soft">{inspirationFileName}</p>
                  <p className="mt-3 text-sm text-madera-mute">
                    En el producto final esta imagen se combinaría con las sugerencias de
                    Pinterest y el brief para la modista.
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-madera-soft">
                No subiste una imagen en el quiz. Podés volver al inicio y cargar una
                referencia, o usar solo las ideas de Pinterest.
              </p>
            )}
          </ResultCard>
        </div>
      ) : null}

      {active === "pinterest" ? (
        <div role="tabpanel" className="mt-6">
          <p className="mb-4 text-sm text-madera-mute">
            Curado según tu prenda ({garmentLabel(garmentId)}). Abrí cada idea en Pinterest.
          </p>
          <ul className="grid gap-4 sm:grid-cols-2">
            {pins.map((pin) => (
              <li key={pin.id}>
                <a
                  href={pin.pinterestUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "group block overflow-hidden rounded-card border border-crema-deep bg-crema-warm shadow-hilando transition-all duration-200 ease-out",
                    "hover:translate-y-[-2px] hover:border-mostaza/50"
                  )}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-crema-deep">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={pin.imageUrl}
                      alt={pin.title}
                      className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <span className="absolute left-2 top-2 rounded-full bg-madera/80 px-2 py-0.5 text-xs font-medium text-crema">
                      {pin.tag}
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-2 p-3">
                    <div>
                      <p className="font-medium text-madera">{pin.title}</p>
                      <p className="mt-1 text-xs text-madera-mute">Ver en Pinterest</p>
                    </div>
                    <ExternalLink
                      className="mt-0.5 size-4 shrink-0 text-terracota"
                      aria-hidden
                    />
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {active === "modista" ? (
        <div role="tabpanel" className="mt-6">
          <ResultCard accent="mostaza">
            <p className="font-caveat text-xl italic text-terracota">{brief.title}</p>
            <p className="mt-2 text-sm text-madera-soft">
              Copiá este mensaje y enviáselo a {brief.artisanName} junto con las referencias
              de Pinterest
              {lookChoice === "look-si" && inspirationFileName
                ? " y tu imagen de inspiración"
                : ""}
              .
            </p>
            <pre className="mt-4 max-h-80 overflow-auto whitespace-pre-wrap rounded-card border border-crema-deep bg-crema p-4 font-nunito text-sm leading-relaxed text-madera">
              {brief.body}
            </pre>
            <Button
              type="button"
              onClick={copyBrief}
              className="mt-4 rounded-cta bg-terracota text-crema hover:bg-terracota-dark"
            >
              {copied ? "Copiado ✓" : "Copiar brief para la modista"}
            </Button>
          </ResultCard>
        </div>
      ) : null}
    </section>
  );
}
