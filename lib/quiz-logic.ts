import type { Artisan } from "@/types/domain";
import artisansData from "@/data/artisans.json";
import ongsData from "@/data/ongs.json";

export type Answer = { questionId: number; optionId: string };

export type Camino = "donar" | "reparar" | "vender";

export type GarmentCategory =
  | "vestido"
  | "pantalon"
  | "camisa"
  | "abrigo"
  | "remera"
  | "calzado";

export type ConditionKey =
  | "como-nueva"
  | "muy-buen"
  | "buen"
  | "necesita-arreglo"
  | "dano-visible";

const artisans = artisansData as Artisan[];
const ongs = ongsData as {
  id: string;
  name: string;
  address: string;
  creditsPerKg: number;
}[];

const TIEBREAK: Camino[] = ["reparar", "vender", "donar"];

function scoreForQuestion1(optionId: string): Record<Camino, number> {
  switch (optionId) {
    case "impulso":
      return { donar: 2, reparar: 0, vender: 2 };
    case "mal-calce":
      return { donar: 0, reparar: 3, vender: 1 };
    case "cambio-estilo":
      return { donar: 1, reparar: 0, vender: 3 };
    case "cuerpo-cambio":
      return { donar: 1, reparar: 2, vender: 2 };
    case "sentimental":
      return { donar: 0, reparar: 3, vender: 0 };
    case "necesita-arreglo-nunca":
      return { donar: 2, reparar: 2, vender: 0 };
    default:
      return { donar: 0, reparar: 0, vender: 0 };
  }
}

function scoreForQuestion2(optionId: string): Record<Camino, number> {
  switch (optionId) {
    case "como-nueva":
      return { donar: 0, reparar: 0, vender: 4 };
    case "muy-buen":
      return { donar: 1, reparar: 1, vender: 3 };
    case "buen":
      return { donar: 1, reparar: 2, vender: 2 };
    case "necesita-arreglo":
      return { donar: 1, reparar: 4, vender: 0 };
    case "dano-visible":
      return { donar: 3, reparar: 2, vender: 0 };
    default:
      return { donar: 0, reparar: 0, vender: 0 };
  }
}

function scoreForQuestion4(optionId: string): Record<Camino, number> {
  switch (optionId) {
    case "plata":
      return { donar: 0, reparar: 0, vender: 5 };
    case "espacio":
      return { donar: 5, reparar: 0, vender: 1 };
    case "transformar":
      return { donar: 0, reparar: 5, vender: 0 };
    case "proposito":
      return { donar: 5, reparar: 0, vender: 0 };
    default:
      return { donar: 0, reparar: 0, vender: 0 };
  }
}

function scoreForQuestion5(optionId: string): Record<Camino, number> {
  switch (optionId) {
    case "look-si":
      return { donar: 0, reparar: 3, vender: 0 };
    case "look-abierta":
      return { donar: 0, reparar: 1, vender: 0 };
    case "look-no":
      return { donar: 1, reparar: -2, vender: 1 };
    default:
      return { donar: 0, reparar: 0, vender: 0 };
  }
}

function addScores(
  a: Record<Camino, number>,
  b: Record<Camino, number>
): Record<Camino, number> {
  return {
    donar: a.donar + b.donar,
    reparar: a.reparar + b.reparar,
    vender: a.vender + b.vender,
  };
}

export function mapGarmentCategory(optionId: string): GarmentCategory {
  const map: Record<string, GarmentCategory> = {
    "vestido-falda": "vestido",
    "pantalon-jean": "pantalon",
    "camisa-blusa": "camisa",
    "abrigo-campera": "abrigo",
    "remera-top": "remera",
    calzado: "calzado",
  };
  return map[optionId] ?? "remera";
}

function getAnswer(answers: Answer[], id: number): string | undefined {
  return answers.find((a) => a.questionId === id)?.optionId;
}

function pickWinner(scores: Record<Camino, number>): Camino {
  const max = Math.max(scores.donar, scores.reparar, scores.vender);
  for (const camino of TIEBREAK) {
    if (scores[camino] === max) return camino;
  }
  return "donar";
}

/** Puntos que aportó una respuesta al camino indicado (>=0 para ordenar razones). */
function pointsContribution(
  questionId: number,
  optionId: string,
  camino: Camino
): number {
  let part: Record<Camino, number> = { donar: 0, reparar: 0, vender: 0 };
  switch (questionId) {
    case 1:
      part = scoreForQuestion1(optionId);
      break;
    case 2:
      part = scoreForQuestion2(optionId);
      break;
    case 4:
      part = scoreForQuestion4(optionId);
      break;
    case 5:
      part = scoreForQuestion5(optionId);
      break;
    default:
      return 0;
  }
  const v = part[camino];
  return v > 0 ? v : 0;
}

const REASONS_MAP: Record<string, Partial<Record<Camino, string>>> = {
  impulso: {
    donar: "La compraste por impulso y no la usaste: donar le da una segunda vida sin ocuparte del placard.",
    vender: "Está casi sin uso: en el marketplace puede encontrar a alguien que sí la elija con intención.",
  },
  "mal-calce": {
    reparar: "El problema es de calce, no de uso: un oficio puede ajustarla a tu cuerpo.",
    vender: "Si no querés intervenirla, igual puede servirle a otra persona con otro calce.",
  },
  "cambio-estilo": {
    vender: "Cambió tu estilo: vender libera espacio y recuperás algo de valor.",
    donar: "Si preferís no negociar, donar es una salida rápida y con impacto.",
  },
  "cuerpo-cambio": {
    reparar: "Tu cuerpo cambió: muchas veces se puede reformar el patrón sin tirar la prenda.",
    vender: "Si el talle ya no encaja, el marketplace conecta con quien sí la puede usar.",
    donar: "Donar también ayuda si querés soltarla sin fricción.",
  },
  sentimental: {
    reparar: "Es sentimental: transformarla suele ser más alineado que “desprenderse” de golpe.",
  },
  "necesita-arreglo-nunca": {
    reparar: "Sabés que necesita arreglo: es la señal más clara para un oficio.",
    donar: "Si no vas a intervenirla, donar evita que quede dormida en el placard.",
  },
  "como-nueva": {
    vender: "Está como nueva: es el mejor escenario para recuperar plata.",
  },
  "muy-buen": {
    vender: "Muy buen estado: suma puntos para una publicación atractiva.",
    reparar: "Con un detalle mínimo podría quedar impecable para usar o vender.",
    donar: "Si no querés publicar, donar igual valora su buen estado.",
  },
  buen: {
    vender: "Buen estado: hay demanda para prendas usadas en buen nivel de cuidado.",
    reparar: "Un arreglo chico puede subir mucho la sensación de ‘nueva’.",
    donar: "Donar es simple si tu prioridad es liberar espacio.",
  },
  "necesita-arreglo": {
    reparar: "Necesita arreglo: acá gana el oficio, no el placard.",
    donar: "Si no querés invertir tiempo, donar puede ser más realista que vender.",
  },
  "dano-visible": {
    donar: "Con daño visible, donar a una red que clasifica suele ser lo más directo.",
    reparar: "Aun con daño, a veces se puede recuperar con un trabajo bien orientado.",
  },
  plata: {
    vender: "Tu prioridad es recuperar plata: vender concentra el esfuerzo donde hay retorno.",
  },
  espacio: {
    donar: "Querés liberar espacio sin culpa: donar es la vía más rápida y clara.",
    vender: "Si podés esperar unos días, vender también libera espacio con beneficio.",
  },
  transformar: {
    reparar: "Querés transformarla en algo que sí uses: eso es trabajo de oficio.",
  },
  proposito: {
    donar: "Querés que tenga propósito: donar conecta con quien la necesita.",
  },
  "look-si": {
    reparar: "Tenés un look en mente: eso empuja a una intervención concreta.",
  },
  "look-abierta": {
    reparar: "Estás abierta a sugerencias: un buen oficio puede proponerte caminos.",
  },
  "look-no": {
    donar: "Si preferís no re-pensar el look, donar o vender son más simples.",
    vender: "Si preferís no re-pensar el look, vender es una salida con retorno.",
  },
};

export function reasonsForCamino(answers: Answer[], camino: Camino): string[] {
  return buildReasons(answers, camino);
}

function buildReasons(answers: Answer[], camino: Camino): string[] {
  const scored = answers
    .filter((a) => a.questionId !== 3)
    .map((a) => ({
      key: a.optionId,
      pts: pointsContribution(a.questionId, a.optionId, camino),
      text: REASONS_MAP[a.optionId]?.[camino],
    }))
    .filter((x) => x.text && x.pts > 0)
    .sort((a, b) => b.pts - a.pts);

  const out: string[] = [];
  const seen = new Set<string>();
  for (const row of scored) {
    if (row.text && !seen.has(row.text)) {
      seen.add(row.text);
      out.push(row.text);
    }
    if (out.length >= 3) break;
  }
  if (out.length < 2) {
    out.push(
      camino === "vender"
        ? "El balance de tus respuestas favorece recuperar valor con una publicación simple."
        : camino === "reparar"
          ? "El balance de tus respuestas favorece intervenir la prenda con un oficio de confianza."
          : "El balance de tus respuestas favorece circular la prenda con impacto social."
    );
  }
  return out.slice(0, 3);
}

function repairCostRange(category: GarmentCategory): { min: number; max: number } {
  switch (category) {
    case "abrigo":
      return { min: 9000, max: 12000 };
    case "calzado":
      return { min: 7500, max: 11000 };
    case "vestido":
      return { min: 7000, max: 10500 };
    default:
      return { min: 6500, max: 10000 };
  }
}

function sellValueRange(
  category: GarmentCategory,
  condition?: ConditionKey
): { min: number; max: number } {
  let baseMin = 8000;
  let baseMax = 18000;
  if (category === "abrigo" || category === "vestido") {
    baseMin = 12000;
    baseMax = 25000;
  }
  if (category === "calzado") {
    baseMin = 9000;
    baseMax = 22000;
  }
  if (condition === "como-nueva") {
    baseMax += 4000;
    baseMin += 2000;
  }
  if (condition === "dano-visible") {
    baseMin = 6000;
    baseMax = 12000;
  }
  return { min: baseMin, max: baseMax };
}

function donateCreditsRange(
  category: GarmentCategory,
  condition?: ConditionKey
): { min: number; max: number } {
  let min = 600;
  let max = 900;
  if (category === "abrigo" || category === "vestido") {
    min = 800;
    max = 1200;
  }
  if (condition === "como-nueva" || condition === "muy-buen") {
    max += 150;
    min += 50;
  }
  return { min, max };
}

function conditionFromOptionId(id?: string): ConditionKey | undefined {
  if (!id) return undefined;
  if (
    id === "como-nueva" ||
    id === "muy-buen" ||
    id === "buen" ||
    id === "necesita-arreglo" ||
    id === "dano-visible"
  ) {
    return id;
  }
  return undefined;
}

export function pickArtisanForCategory(category: GarmentCategory): Artisan {
  const match = artisans.find((a) => a.categories.includes(category));
  if (match) return match;
  return artisans[0];
}

export function pickOngIndex(category: GarmentCategory): number {
  const idx = category.charCodeAt(0) % ongs.length;
  return idx;
}

export type DecisionResult = {
  camino: Camino;
  reasons: string[];
  scores: Record<Camino, number>;
  garmentCategory: GarmentCategory;
  estimates: {
    reparar?: { costoMin: number; costoMax: number; tiempo: string };
    vender?: {
      valorMin: number;
      valorMax: number;
      tiempoPublicacion: string;
    };
    donar?: {
      creditosMin: number;
      creditosMax: number;
      ongId: string;
      ongName: string;
      ongAddress: string;
    };
  };
  artisan: Artisan | null;
};

export function decideCamino(answers: Answer[]): DecisionResult {
  let scores: Record<Camino, number> = { donar: 0, reparar: 0, vender: 0 };

  const a1 = getAnswer(answers, 1);
  const a2 = getAnswer(answers, 2);
  const a3 = getAnswer(answers, 3);
  const a4 = getAnswer(answers, 4);
  const a5 = getAnswer(answers, 5);

  if (a1) scores = addScores(scores, scoreForQuestion1(a1));
  if (a2) scores = addScores(scores, scoreForQuestion2(a2));
  if (a4) scores = addScores(scores, scoreForQuestion4(a4));
  if (a5) scores = addScores(scores, scoreForQuestion5(a5));

  const garmentCategory = a3 ? mapGarmentCategory(a3) : "remera";
  const condition = conditionFromOptionId(a2);

  const camino = pickWinner(scores);
  const reasons = buildReasons(answers, camino);

  const cost = repairCostRange(garmentCategory);
  const sell = sellValueRange(garmentCategory, condition);
  const credits = donateCreditsRange(garmentCategory, condition);
  const ong = ongs[pickOngIndex(garmentCategory)];

  const artisan = camino === "reparar" ? pickArtisanForCategory(garmentCategory) : null;

  return {
    camino,
    reasons,
    scores,
    garmentCategory,
    artisan,
    estimates: {
      reparar: {
        costoMin: cost.min,
        costoMax: cost.max,
        tiempo: "4–7 días",
      },
      vender: {
        valorMin: sell.min,
        valorMax: sell.max,
        tiempoPublicacion: "5 minutos",
      },
      donar: {
        creditosMin: credits.min,
        creditosMax: credits.max,
        ongId: ong.id,
        ongName: ong.name,
        ongAddress: ong.address,
      },
    },
  };
}

export function formatArs(n: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(n);
}
