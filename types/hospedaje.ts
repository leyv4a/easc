import { FILES_BASE } from "@/types/yate";

export interface HospedajePricing {
  "1_night"?: number;
  "2_nights"?: number;
  "extra_night"?: number;
  [key: string]: number | undefined;
}

export interface HospedajeDetails {
  amenities: string[];
  rooms?: number;
  bathrooms?: number;
  maxGuests?: number;
  distanceToBeachMeters?: number;
  pricing?: HospedajePricing;
  airConditioning?: boolean;
  privateBathroom?: boolean;
  kitchenIncluded?: boolean;
  [key: string]: unknown;
}

export interface Hospedaje {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  seoTitle: string;
  seoDescription: string;
  coverImage: string;
  gallery: string[];
  price: number;           // precio base (1 noche)
  currency: string;
  durationHours: number;   // 24 = por noche
  maxPeople: number;
  departureLocation: string;
  address: string;
  phone: string;
  whatsapp: string;
  contactName: string;
  experienceType: string;
  details: HospedajeDetails;
  featured: boolean;
  featuredOrder?: number;
  active: boolean;
  badge: string;
  collectionId: string;
  collectionName: string;
  monetizationType: string;
  commissionPercentage?: number;
  created: string;
  updated: string;
}

export interface HospedajeApiResponse {
  items: Hospedaje[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}

export const HOSPEDAJE_CATEGORY_ID = "aon4w3a54iqxifj"; // ajusta al ID real

export function getHospedajeImageUrl(
  collectionId: string,
  recordId: string,
  filename: string,
  thumb?: string
): string {
  const base = `${FILES_BASE}/${collectionId}/${recordId}/${filename}`;
  return thumb ? `${base}?thumb=${thumb}` : base;
}

export const AMENITY_ICONS: Record<string, string> = {
  "Aire acondicionado": "❄️",
  "Cocina básica": "🍳",
  "Refrigerador": "🧊",
  "Baño privado": "🚿",
  "Cerca de la playa": "🏖️",
  "WiFi": "📶",
  "Estacionamiento": "🚗",
  "Piscina": "🏊",
  "Terraza": "🌅",
  "Lavadora": "🫧",
  "TV": "📺",
  "Gym": "💪",
};
