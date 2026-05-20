import inspirationData from "@/data/inspiration.json";
import type { Answer } from "@/lib/quiz-logic";
import {
  mapGarmentCategory,
  pickArtisanForCategory,
  type GarmentCategory,
} from "@/lib/quiz-logic";

export type LookChoice = "look-si" | "look-abierta";

export type PinterestPin = {
  id: string;
  title: string;
  tag: string;
  imageUrl: string;
  pinterestUrl: string;
};

const pinsByGarment = inspirationData as Record<string, PinterestPin[]>;

const GARMENT_LABELS: Record<string, string> = {
  "vestido-falda": "Vestido / Falda",
  "pantalon-jean": "Pantalón / Jean",
  "camisa-blusa": "Camisa / Blusa",
  "abrigo-campera": "Abrigo / Campera",
  "remera-top": "Remera / Top",
  calzado: "Calzado",
};

const Q1_LABELS: Record<string, string> = {
  impulso: "La compré por impulso, nunca la usé",
  "mal-calce": "No me calza bien desde que la compré",
  "cambio-estilo": "Cambió mi estilo, ya no me identifico",
  "cuerpo-cambio": "Mi cuerpo cambió y ya no me entra",
  sentimental: "Es sentimental pero no la uso",
  "necesita-arreglo-nunca": "Necesita arreglo y nunca lo hice",
};

const Q2_LABELS: Record<string, string> = {
  "como-nueva": "Como nueva (con o sin etiqueta)",
  "muy-buen": "Muy buen estado, poco uso",
  buen: "Buen estado, usada",
  "necesita-arreglo": "Necesita un arreglo",
  "dano-visible": "Tiene daño visible (mancha, rotura)",
};

const Q4_LABELS: Record<string, string> = {
  plata: "Recuperar algo de plata",
  espacio: "Liberar espacio sin culpa",
  transformar: "Transformarla en algo que sí use",
  proposito: "Dejarla ir con propósito",
};

const WORK_SUGGESTIONS: Record<GarmentCategory, string[]> = {
  vestido: [
    "Ajustar largo y silueta según referencias de Pinterest.",
    "Actualizar escote o mangas sin descartar la prenda base.",
    "Proponer un rediseño que respete la tela disponible.",
  ],
  pantalon: [
    "Revisar tiro y ancho de pierna para un calce actual.",
    "Evaluar transformación a short o wide leg si hay tela.",
    "Reforzar zonas de desgaste antes de modificar el corte.",
  ],
  camisa: [
    "Ajustar hombros y largo para un calce más actual.",
    "Transformar en crop, top o camisa oversize según referencia.",
    "Agregar detalle en puños o cuello con retazos.",
  ],
  abrigo: [
    "Acortar o ensanchar silueta manteniendo el forro.",
    "Reparar cierres y reforzar costuras de tensión.",
    "Incorporar parches o detalles visibles con estilo.",
  ],
  remera: [
    "Recortar y rematar bordes para un crop o top usable.",
    "Agregar volumen en mangas o detalle frontal.",
    "Personalizar con bordado o aplicación según inspiración.",
  ],
  calzado: [
    "Evaluar resole, suela o plantilla según desgaste.",
    "Reparar costuras y refuerzo en puntera o talón.",
    "Personalizar con color o detalle según referencias.",
  ],
};

function getAnswer(answers: Answer[], id: number): string | undefined {
  return answers.find((a) => a.questionId === id)?.optionId;
}

export function getLookChoice(answers: Answer[]): LookChoice | null {
  const look = getAnswer(answers, 5);
  if (look === "look-si" || look === "look-abierta") return look;
  return null;
}

export function wantsInspirationPanel(answers: Answer[]): boolean {
  return getLookChoice(answers) !== null;
}

export function getPinterestPins(garmentOptionId: string): PinterestPin[] {
  return pinsByGarment[garmentOptionId] ?? pinsByGarment["remera-top"] ?? [];
}

export function garmentLabel(optionId: string): string {
  return GARMENT_LABELS[optionId] ?? "Prenda";
}

export type ModistaBrief = {
  title: string;
  body: string;
  artisanName: string;
  pinTitles: string[];
};

export function buildModistaBrief(
  answers: Answer[],
  inspirationFileName: string | null
): ModistaBrief {
  const garmentId = getAnswer(answers, 3) ?? "remera-top";
  const category = mapGarmentCategory(garmentId);
  const artisan = pickArtisanForCategory(category);
  const pins = getPinterestPins(garmentId);
  const look = getLookChoice(answers);

  const garment = garmentLabel(garmentId);
  const motivo = Q1_LABELS[getAnswer(answers, 1) ?? ""] ?? "—";
  const estado = Q2_LABELS[getAnswer(answers, 2) ?? ""] ?? "—";
  const prioridad = Q4_LABELS[getAnswer(answers, 4) ?? ""] ?? "—";

  const lookLine =
    look === "look-si"
      ? inspirationFileName
        ? `Traigo referencia propia: «${inspirationFileName}» (adjunta en la consulta).`
        : "Traigo referencia propia de look (imagen adjunta en la consulta)."
      : "Estoy abierta a sugerencias; adjunto ideas de Pinterest como guía.";

  const workLines = WORK_SUGGESTIONS[category];
  const pinList = pins.map((p) => `• ${p.title} — ${p.pinterestUrl}`).join("\n");

  const body = `Hola ${artisan.name},

Quiero pedirte una propuesta sobre esta prenda:

PRENDA: ${garment}
ESTADO: ${estado}
MOTIVO: ${motivo}
PRIORIDAD: ${prioridad}
INSPIRACIÓN: ${lookLine}

TRABAJO SUGERIDO (orientativo):
${workLines.map((w) => `• ${w}`).join("\n")}

REFERENCIAS DE PINTEREST:
${pinList}

¿Podés contarme costo estimado, plazo y qué harías con la prenda base?

Gracias,
[Demo Hilando]`;

  return {
    title: `Brief para ${artisan.name}`,
    body,
    artisanName: artisan.name,
    pinTitles: pins.map((p) => p.title),
  };
}
