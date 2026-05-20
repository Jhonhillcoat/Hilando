"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ImageIcon } from "lucide-react";

import { ProgressBar } from "@/components/ProgressBar";
import { QuizOption } from "@/components/QuizOption";
import { QuizQuestion } from "@/components/QuizQuestion";
import { Button } from "@/components/ui/button";
import { useQuizStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const Q1 = [
  { id: "impulso", label: "La compré por impulso, nunca la usé", emoji: "🛍️" },
  { id: "mal-calce", label: "No me calza bien desde que la compré", emoji: "📏" },
  { id: "cambio-estilo", label: "Cambió mi estilo, ya no me identifico", emoji: "🍂" },
  { id: "cuerpo-cambio", label: "Mi cuerpo cambió y ya no me entra", emoji: "🧬" },
  { id: "sentimental", label: "Es sentimental pero no la uso", emoji: "💭" },
  { id: "necesita-arreglo-nunca", label: "Necesita arreglo y nunca lo hice", emoji: "😴" },
];

const Q2 = [
  { id: "como-nueva", label: "Como nueva (con o sin etiqueta)", emoji: "✨" },
  { id: "muy-buen", label: "Muy buen estado, poco uso", emoji: "👍" },
  { id: "buen", label: "Buen estado, usada", emoji: "👌" },
  { id: "necesita-arreglo", label: "Necesita un arreglo", emoji: "🔧" },
  { id: "dano-visible", label: "Tiene daño visible (mancha, rotura)", emoji: "⚠️" },
];

const Q3 = [
  { id: "vestido-falda", label: "Vestido / Falda", emoji: "👗" },
  { id: "pantalon-jean", label: "Pantalón / Jean", emoji: "👖" },
  { id: "camisa-blusa", label: "Camisa / Blusa", emoji: "👔" },
  { id: "abrigo-campera", label: "Abrigo / Campera", emoji: "🧥" },
  { id: "remera-top", label: "Remera / Top", emoji: "👚" },
  { id: "calzado", label: "Calzado", emoji: "👞" },
];

const Q4 = [
  { id: "plata", label: "Recuperar algo de plata", emoji: "💰" },
  { id: "espacio", label: "Liberar espacio sin culpa", emoji: "🌱" },
  { id: "transformar", label: "Transformarla en algo que sí use", emoji: "✨" },
  { id: "proposito", label: "Dejarla ir con propósito", emoji: "❤️" },
];

const Q5 = [
  {
    id: "look-si",
    label: "Sí, tengo una imagen de inspiración",
    emoji: "📌",
  },
  { id: "look-abierta", label: "No, pero estoy abierta a sugerencias", emoji: "🤔" },
  { id: "look-no", label: "No, mejor venderla o donarla", emoji: "❌" },
];

const titles = [
  "¿Por qué ya no la usás?",
  "¿En qué estado está?",
  "¿Qué tipo de prenda es?",
  "¿Cuál es tu prioridad?",
  "¿Tenés un look en mente?",
];

type QuizFlowProps = {
  resetOnMount?: boolean;
};

export function QuizFlow({ resetOnMount = true }: QuizFlowProps) {
  const router = useRouter();
  const step = useQuizStore((s) => s.step);
  const answers = useQuizStore((s) => s.answers);
  const setAnswer = useQuizStore((s) => s.setAnswer);
  const nextStep = useQuizStore((s) => s.nextStep);
  const prevStep = useQuizStore((s) => s.prevStep);
  const reset = useQuizStore((s) => s.reset);
  const inspirationFileName = useQuizStore((s) => s.inspirationFileName);
  const setInspirationFile = useQuizStore((s) => s.setInspirationFile);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (resetOnMount) reset();
  }, [reset, resetOnMount]);

  const currentQuestionId = step + 1;
  const selected = answers.find((a) => a.questionId === currentQuestionId)?.optionId;
  const canNext = Boolean(selected);

  const goNext = () => {
    if (!canNext) return;
    if (step >= 4) {
      router.push("/result");
      return;
    }
    nextStep();
  };

  return (
    <>
      <div className="mb-2 flex items-center justify-end">
        <p className="font-caveat text-2xl text-madera-mute">
          {currentQuestionId} / 5
        </p>
      </div>
      <ProgressBar step={currentQuestionId} className="mb-8 h-1" />

      {step === 0 && (
        <QuizQuestion title={titles[0]}>
          {Q1.map((o) => (
            <QuizOption
              key={o.id}
              emoji={o.emoji}
              label={o.label}
              selected={selected === o.id}
              onSelect={() => setAnswer(1, o.id)}
            />
          ))}
        </QuizQuestion>
      )}

      {step === 1 && (
        <QuizQuestion title={titles[1]}>
          {Q2.map((o) => (
            <QuizOption
              key={o.id}
              emoji={o.emoji}
              label={o.label}
              selected={selected === o.id}
              onSelect={() => setAnswer(2, o.id)}
            />
          ))}
        </QuizQuestion>
      )}

      {step === 2 && (
        <QuizQuestion title={titles[2]}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {Q3.map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => setAnswer(3, o.id)}
                className={cn(
                  "flex aspect-square flex-col items-center justify-center gap-2 rounded-card border-2 border-transparent bg-crema-warm p-3 text-center shadow-hilando transition-all duration-200 ease-out",
                  "hover:translate-y-[-2px] hover:border-mostaza/50",
                  selected === o.id && "border-terracota bg-durazno-light"
                )}
              >
                <span className="text-4xl" aria-hidden>
                  {o.emoji}
                </span>
                <span className="text-sm font-medium text-madera">{o.label}</span>
              </button>
            ))}
          </div>
        </QuizQuestion>
      )}

      {step === 3 && (
        <QuizQuestion title={titles[3]}>
          {Q4.map((o) => (
            <QuizOption
              key={o.id}
              emoji={o.emoji}
              label={o.label}
              selected={selected === o.id}
              onSelect={() => setAnswer(4, o.id)}
            />
          ))}
        </QuizQuestion>
      )}

      {step === 4 && (
        <QuizQuestion title={titles[4]}>
          {Q5.map((o) => (
            <QuizOption
              key={o.id}
              emoji={o.emoji}
              label={o.label}
              selected={selected === o.id}
              onSelect={() => setAnswer(5, o.id)}
            />
          ))}
          {selected === "look-si" ? (
            <div className="space-y-2 pt-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setInspirationFile(file ? file.name : null);
                }}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="w-full rounded-cta border-dashed border-terracota/40 text-madera hover:bg-durazno-light"
              >
                <ImageIcon className="mr-2 size-4" aria-hidden />
                {inspirationFileName ? "Cambiar imagen" : "Subir tu inspiración"}
              </Button>
              {inspirationFileName ? (
                <p className="text-sm text-madera-soft">
                  Archivo: <span className="font-medium text-madera">{inspirationFileName}</span>
                </p>
              ) : (
                <p className="text-xs text-madera-mute">
                  Opcional en el demo: JPG o PNG para mostrar en resultados.
                </p>
              )}
            </div>
          ) : null}
        </QuizQuestion>
      )}

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
        <Button
          type="button"
          variant="ghost"
          className="text-madera-mute"
          onClick={() => prevStep()}
          disabled={step === 0}
        >
          Atrás
        </Button>
        <Button
          type="button"
          disabled={!canNext}
          onClick={goNext}
          className={cn(
            "rounded-cta bg-terracota px-6 text-crema shadow-hilando transition-all duration-200 ease-out",
            "hover:translate-y-[-2px] hover:bg-terracota-dark disabled:opacity-40"
          )}
        >
          {step === 4 ? "Ver mi recomendación →" : "Siguiente"}
        </Button>
      </div>
    </>
  );
}
