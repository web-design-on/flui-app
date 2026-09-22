import { HistoryItem, Station } from "./types";

export const stations: Station[] = [
  {
    id: "1",
    latitude: -23.532,
    longitude: -46.728,
    name: "Volt Express Moema",
    neighborhood: "Moema",
    rating: 4.5,
    reviewCount: 128,
    score: 94,
    scoreDetails: {
      availability: 92,
      power: 96,
      ratings: 95,
      reliability: 90,
      amenities: 98,
      distance: 88,
    },
    status: "available",
    available: 6,
    total: 8,
    maxPower: 150,
    timeMin: 8,
    distanceText: "3,2 km · 8 min de carro",
    movement: "low",
    amenities: ["Wi-Fi", "Café", "Banheiro", "Loja"],
    reason: "Ótimo equilíbrio entre velocidade, disponibilidade e comodidades.",
    unsplashId: "photo-1593941707882-a5bba14938c7",
    image: require("../assets/images/ponto-recarga-VoltExpressMoema.jpg"),
    hours: "24 horas",
    bestTime: "Antes das 10h ou depois das 20h",
    connectors: [
      { type: "CCS2", power: 150, available: 4, total: 5 },
      { type: "CHAdeMO", power: 50, available: 2, total: 3 },
    ],
    ratings: {
      charging: 4.6,
      availability: 4.4,
      cleanliness: 4.7,
      safety: 4.8,
      amenities: 4.5,
    },
    reviews: [
      {
        id: "r1",
        author: "Camila R.",
        date: "há 2 dias",
        rating: 5,
        text: "Carregou rápido e tem café pertinho.",
      },
      {
        id: "r2",
        author: "Diego M.",
        date: "há 1 semana",
        rating: 4,
        text: "Sempre tem vaga, só o Wi-Fi que cai às vezes.",
      },
    ],
  },
  {
    id: "2",
    latitude: -23.527,
    longitude: -46.698,
    name: "Santana Power Point",
    neighborhood: "Santana",
    rating: 4,
    reviewCount: 64,
    score: 82,
    scoreDetails: {
      availability: 78,
      power: 70,
      ratings: 80,
      reliability: 85,
      amenities: 60,
      distance: 90,
    },
    status: "available",
    available: 2,
    total: 4,
    maxPower: 60,
    timeMin: 12,
    distanceText: "5,1 km · 12 min de carro",
    movement: "moderate",
    amenities: ["Café", "Banheiro"],
    reason: "Boa disponibilidade e fácil acesso pela marginal.",
    unsplashId: "photo-1620200423727-8127f75d7f53",
    image: require("../assets/images/ponto-recarga-SantanaPowerPoint.jpg"),
    hours: "05h às 23h",
    bestTime: "Manhã, antes das 8h",
    connectors: [{ type: "Tipo 2", power: 60, available: 2, total: 4 }],
    ratings: {
      charging: 4.0,
      availability: 3.8,
      cleanliness: 4.1,
      safety: 3.9,
      amenities: 3.5,
    },
    reviews: [
      {
        id: "r3",
        author: "Bruna S.",
        date: "há 3 dias",
        rating: 4,
        text: "Rápido de achar, mas fila às vezes.",
      },
    ],
  },
  {
    id: "3",
    latitude: -23.5613,
    longitude: -46.6558,
    name: "Recarga Fácil Paulista",
    neighborhood: "Bela Vista",
    rating: 4.5,
    reviewCount: 210,
    score: 71,
    scoreDetails: {
      availability: 55,
      power: 85,
      ratings: 88,
      reliability: 65,
      amenities: 92,
      distance: 70,
    },
    status: "busy",
    available: 1,
    total: 6,
    maxPower: 100,
    timeMin: 15,
    distanceText: "6,8 km · 15 min de carro",
    movement: "high",
    amenities: ["Wi-Fi", "Restaurante", "Estacionamento coberto"],
    reason: "Central, mas com maior tempo de espera no horário de pico.",
    unsplashId: "photo-1601362840469-51e4d8d58785",
    image: require("../assets/images/ponto-recarga-RecargaFacilPaulista.jpg"),
    hours: "24 horas",
    bestTime: "Fins de semana pela manhã",
    connectors: [
      { type: "CCS2", power: 100, available: 1, total: 4 },
      { type: "Tipo 2", power: 22, available: 0, total: 2 },
    ],
    ratings: {
      charging: 4.3,
      availability: 3.2,
      cleanliness: 4.6,
      safety: 4.5,
      amenities: 4.7,
    },
    reviews: [
      {
        id: "r4",
        author: "Felipe A.",
        date: "há 5 horas",
        rating: 3,
        text: "Ótimo local, mas sempre lotado à tarde.",
      },
      {
        id: "r5",
        author: "Aline P.",
        date: "há 2 semanas",
        rating: 5,
        text: "Restaurante do lado é excelente enquanto carrega.",
      },
    ],
  },
  {
    id: "4",
    latitude: -23.599,
    longitude: -46.707,
    name: "EcoCarga Itaim",
    neighborhood: "Itaim Bibi",
    rating: 3.5,
    reviewCount: 37,
    score: 58,
    scoreDetails: {
      availability: 20,
      power: 55,
      ratings: 70,
      reliability: 60,
      amenities: 40,
      distance: 65,
    },
    status: "unavailable",
    available: 0,
    total: 3,
    maxPower: 50,
    timeMin: 20,
    distanceText: "9,4 km · 20 min de carro",
    movement: "moderate",
    amenities: ["Segurança 24h", "Aberto 24h"],
    reason: "Sem vagas livres no momento, mas rota rápida até lá.",
    unsplashId: "photo-1621905251189-08b45d6a269e",
    image: require("../assets/images/ponto-recarga-EcoCargaItaim.jpg"),
    hours: "06h às 22h",
    bestTime: "Início da manhã",
    connectors: [{ type: "Tipo 2", power: 50, available: 0, total: 3 }],
    ratings: {
      charging: 3.6,
      availability: 2.8,
      cleanliness: 3.9,
      safety: 4.2,
      amenities: 3.0,
    },
    reviews: [
      {
        id: "r6",
        author: "Renata O.",
        date: "há 1 mês",
        rating: 3,
        text: "Local seguro, mas quase sempre ocupado.",
      },
    ],
  },
  {
    id: "5",
    latitude: -23.58,
    longitude: -46.65,
    name: "Posto Shell - Centro",
    neighborhood: "Centro",
    rating: 4.2,
    reviewCount: 89,
    score: 65,
    scoreDetails: {
      availability: 40,
      power: 60,
      ratings: 75,
      reliability: 70,
      amenities: 55,
      distance: 80,
    },
    status: "available",
    available: 2,
    total: 4,
    maxPower: 50,
    timeMin: 10,
    distanceText: "1,2 km · 10 min de carro",
    movement: "low",
    amenities: ["Wi-Fi", "Restaurante", "Estacionamento coberto"],
    reason: "Local estratégico com boa infraestrutura.",
    unsplashId: "photo-1621905251189-08b45d6a269e",
    hours: "06h às 22h",
    bestTime: "Meio-dia",
    connectors: [{ type: "Tipo 2", power: 50, available: 2, total: 4 }],
    ratings: {
      charging: 4.0,
      availability: 3.8,
      cleanliness: 4.1,
      safety: 4.3,
      amenities: 4.0,
    },
    reviews: [
      {
        id: "r7",
        author: "Carlos M.",
        date: "há 3 semanas",
        rating: 4,
        text: "Ótimo posto, sempre bem mantido.",
      },
    ],
  },
  {
    id: "6",
    latitude: -23.55,
    longitude: -46.7,
    name: "Estação Verde - Vila Madalena",
    neighborhood: "Vila Madalena",
    rating: 4.8,
    reviewCount: 150,
    score: 88,
    scoreDetails: {
      availability: 85,
      power: 90,
      ratings: 95,
      reliability: 80,
      amenities: 92,
      distance: 85,
    },
    status: "available",
    available: 5,
    total: 6,
    maxPower: 120,
    timeMin: 7,
    distanceText: "2,5 km · 7 min de carro",
    movement: "low",
    amenities: ["Café", "Banheiro", "Wi-Fi", "Estacionamento"],
    reason: "Excelente localização e infraestrutura completa.",
    unsplashId: "photo-1620200423727-8127f75d7f53",
    hours: "24 horas",
    bestTime: "Antes das 9h ou depois das 21h",
    connectors: [
      { type: "CCS2", power: 120, available: 3, total: 4 },
      { type: "CHAdeMO", power: 50, available: 2, total: 2 },
    ],
    ratings: {
      charging: 4.9,
      availability: 4.8,
      cleanliness: 4.7,
      safety: 4.9,
      amenities: 4.8,
    },
    reviews: [
      {
        id: "r8",
        author: "Ana P.",
        date: "há 2 semanas",
        rating: 5,
        text: "Ótima estação, muito confortável.",
      },
    ],
  },
];

/**
 * Recargas já realizadas, da mais recente para a mais antiga.
 * Valores coerentes entre si: bateria de 60 kWh (energia = % carregada × 60),
 * tarifa de R$ 1,40/kWh, e potência média (energia ÷ duração) dentro da
 * potência utilizada.
 */
export const historyItems: HistoryItem[] = [
  { id: "h1", stationId: "1", stationName: "Volt Express Moema", vehicle: "BYD Dolphin", date: "28 AGO", power: 150, duration: 28, rating: null, energyKwh: 37.2, trip: { origin: "São Paulo, SP", arrivalTime: "08:42", destination: "Campinas, SP", distanceKm: 96, batteryStart: 18, batteryEnd: 80, cost: 52.08 } },
  { id: "h2", stationId: "3", stationName: "Recarga Fácil Paulista", vehicle: "BYD Dolphin", date: "19 AGO", power: 100, duration: 34, rating: 4.5, energyKwh: 37.8, trip: { origin: "São Paulo, SP", arrivalTime: "17:15", destination: "Santos, SP", distanceKm: 72, batteryStart: 22, batteryEnd: 85, cost: 52.92 } },
  { id: "h3", stationId: "4", stationName: "EcoCarga Itaim", vehicle: "BYD Dolphin", date: "12 AGO", power: 45, duration: 50, rating: 5, energyKwh: 37.8, trip: { origin: "São Paulo, SP", arrivalTime: "13:05", destination: "Sorocaba, SP", distanceKm: 100, batteryStart: 15, batteryEnd: 78, cost: 52.92 } },
  { id: "h4", stationId: "2", stationName: "Santana Power Point", vehicle: "BYD Dolphin", date: "5 AGO", power: 50, duration: 45, rating: 4, energyKwh: 31.2, trip: { origin: "São Paulo, SP", arrivalTime: "10:30", destination: "Jundiaí, SP", distanceKm: 60, batteryStart: 30, batteryEnd: 82, cost: 43.68 } },
];

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  avatarInitial: string;
  vehicle: string;
  totalRecharges: number;
  totalEnergyKwh: number;
  stationsLabel: string;
  savedFavoritesCount: number;
}

export const userProfile: UserProfile = {
  name: "Natali Schers",
  email: "natali@email.com.br",
  phone: "",
  birthDate: "",
  avatarInitial: "N",
  vehicle: "BYD Dolphin · 60 kWh",
  totalRecharges: 4,
  totalEnergyKwh: 143,
  stationsLabel: "2",
  savedFavoritesCount: 1,
};

export interface ProfileMenuItem {
  id: string;
  label: string;
  sub: string | null;
}

export const profileMenuItems: ProfileMenuItem[] = [
  {
    id: "vehicle",
    label: "Meu veículo",
    sub: "BYD Dolphin · 60 kWh",
  },
];
