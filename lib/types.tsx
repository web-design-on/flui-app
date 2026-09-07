export interface StationConnector {
  type: string;
  power: number;
  available: number;
  total: number;
}

export interface StationScoreDetails {
  availability: number;
  power: number;
  ratings: number;
  reliability: number;
  amenities: number;
  distance: number;
}

export interface StationRatings {
  charging: number;
  availability: number;
  cleanliness: number;
  safety: number;
  amenities: number;
}

export interface StationReview {
  id: string;
  author: string;
  date: string;
  rating: number;
  text: string;
}

export interface Station {
  id: string;
  name: string;
  neighborhood: string;
  /** Nota média (0 a 5), pode ter casa decimal (ex: 4.5) */
  rating: number;
  reviewCount: number;
  /** Pontuação Flui Score, de 0 a 100 */
  score: number;
  scoreDetails: StationScoreDetails;
  status: "available" | "busy" | "unavailable";
  /** Quantidade de conectores livres agora */
  available: number;
  /** Quantidade total de conectores no ponto */
  total: number;
  /** Potência máxima de carga, em kW */
  maxPower: number;
  /** Tempo estimado até o ponto, em minutos */
  timeMin: number;
  distanceText: string;
  movement: "low" | "moderate" | "high";
  /** Chaves de comodidades disponíveis, ver AMENITY_ICONS em utils.ts */
  amenities: string[];
  /** Frase curta explicando por que esse ponto foi recomendado */
  reason: string;
  /** ID da foto no Unsplash, usado por unsplashUrl() em utils.ts */
  unsplashId: string;
  hours: string;
  bestTime: string;
  connectors: StationConnector[];
  ratings: StationRatings;
  reviews: StationReview[];
  latitude?: number;
  longitude?: number;
  address?: string;
}

export type AppScreen =
  | { type: "home" }
  | { type: "results" }
  | { type: "detail"; stationId: string }
  | { type: "map" }
  | { type: "travel" }
  | { type: "review"; stationId: string };
