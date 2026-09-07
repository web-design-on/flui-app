import { colors } from "./theme/colors";
import { Station } from "./types";

/** Emoji usado para cada comodidade. Adicione novas chaves conforme necessário. */
export const AMENITY_ICONS: Record<string, string> = {
  "Wi-Fi": "📶",
  Café: "☕",
  Banheiro: "🚻",
  Loja: "🛍️",
  Restaurante: "🍽️",
  Estacionamento: "🅿️",
  Cobertura: "🏠",
  Acessibilidade: "♿",
  "Estacionamento coberto": "🅿️",
  "Segurança 24h": "🛡️",
  "Praça de alimentação": "🍔",
};

/**
 * Cores do gradiente do badge de score, do pior (vermelho) ao melhor
 * (verde). Retorna um array de 2 cores hex para usar direto no
 * `colors` do `LinearGradient` (expo-linear-gradient).
 */
export function getScoreGradient(score: number): [string, string] {
  if (score >= 85) return colors.gradients.scoreExcellent;
  if (score >= 70) return colors.gradients.scoreGood;
  if (score >= 50) return colors.gradients.scoreAverage;
  return colors.gradients.scoreLow;
}

/** Rótulo curto (adjetivo) correspondente à faixa de score. */
export function getScoreLabel(score: number): string | undefined {
  if (score >= 85) return "Excelente";
  if (score >= 70) return "Ótimo";
  if (score >= 60) return "Bom";
}

/** Cor (hex) associada ao status de disponibilidade do ponto. */
export function getStatusColor(status: Station["status"]): string {
  switch (status) {
    case "available":
      return colors.semantic.success;
    case "busy":
      return colors.semantic.warning;
    case "unavailable":
    default:
      return colors.semantic.error;
  }
}

/**
 * Monta a URL de uma imagem do Unsplash a partir do id da foto.
 * IMPORTANTE: diferente da versão web, `getScoreGradient` (acima) já
 * retorna um ARRAY de cores — nunca uma string CSS. Se algum outro
 * arquivo do projeto ainda importar uma versão antiga que devolvia uma
 * string tipo "linear-gradient(...)", é isso que causa o erro
 * `colors.map is not a function`. Garanta que só exista esta versão.
 */
export function unsplashUrl(id: string, width = 800, height = 400): string {
  return `https://images.unsplash.com/${id}?w=${width}&h=${height}&fit=crop&q=80`;
}
