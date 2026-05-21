import { API_BASE, FILES_BASE } from "@/types/yate";

export interface TourDetails {
  amenities: string[];
  difficulty?: string;
  guideIncluded?: boolean;
  natureExperience?: boolean;
  wildlifeWatching?: boolean;
  startTime?: string;
  // extensible para otros tipos de tours
  [key: string]: unknown;
}

export interface Tour {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  seoTitle: string;
  seoDescription: string;
  coverImage: string;
  gallery: string[];           // puede ser vacío
  price: number;               // 0 = precio a consultar
  currency: string;
  durationHours: number;
  maxPeople: number;
  departureLocation: string;
  address: string;
  phone: string;
  whatsapp: string;
  contactName: string;
  experienceType: string;      // string simple (no array)
  details: TourDetails;
  featured: boolean;
  featuredOrder?: number;
  active: boolean;
  badge: string;
  collectionId: string;
  collectionName: string;
  monetizationType: string;
  monthlyFee: number;
  created: string;
  updated: string;
}

export interface ToursApiResponse {
  items: Tour[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}

export const TOUR_CATEGORY_ID = "ksux7zqj5ezlxby"; // ajusta al ID real de la colección

export function getTourImageUrl(
  collectionId: string,
  recordId: string,
  filename: string,
  thumb?: string
): string {
  const base = `${FILES_BASE}/${collectionId}/${recordId}/${filename}`;
  return thumb ? `${base}?thumb=${thumb}` : base;
}

export const DIFFICULTY_STYLES: Record<string, { bg: string; text: string; dot: string }> = {
  Fácil:    { bg: "bg-emerald-50",  text: "text-emerald-700", dot: "bg-emerald-400" },
  Moderado: { bg: "bg-amber-50",    text: "text-amber-700",   dot: "bg-amber-400"   },
  Difícil:  { bg: "bg-red-50",      text: "text-red-700",     dot: "bg-red-400"     },
};
