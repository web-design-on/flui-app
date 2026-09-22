import { ImageSourcePropType } from "react-native";

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
  rating: number;
  reviewCount: number;
  score: number;
  scoreDetails: StationScoreDetails;
  status: "available" | "busy" | "unavailable";
  available: number;
  total: number;
  maxPower: number;
  timeMin: number;
  distanceText: string;
  movement: "low" | "moderate" | "high";
  amenities: string[];
  reason: string;
  unsplashId: string;
  image?: ImageSourcePropType;
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

export interface HistoryItem {
  id: string;
  stationId: string;
  stationName: string;
  vehicle: string;
  date: string;
  power: number;
  duration: number;
  rating: number | null;
  energyKwh: number;
  trip: {
    origin: string;
    arrivalTime: string;
    destination: string;
    distanceKm: number;
    batteryStart: number;
    batteryEnd: number;
    cost: number;
  };
}
