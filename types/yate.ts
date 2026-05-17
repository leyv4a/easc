export interface YateDetails {
  amenities: string[];
  cevicheIncluded: boolean;
  floatingMat: boolean;
  lifeJackets: boolean;
}

export interface Yate {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  seoTitle: string;
  seoDescription: string;
  coverImage: string;
  gallery: string[];
  price: number;
  currency: string;
  durationHours: number;
  maxPeople: number;
  departureLocation: string;
  address: string;
  phone: string;
  whatsapp: string;
  website: string;
  contactName: string;
  experienceType: string[];
  details: YateDetails;
  featured: boolean;
  badge: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
}

export interface ApiResponse {
  items: Yate[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}

export const YATE_CATEGORY_ID = "cnaqrk832vdqrs5";
export const API_BASE = "https://api.notimagen.mx/api";
export const FILES_BASE = `${API_BASE}/files`;

export function getImageUrl(
  collectionId: string,
  recordId: string,
  filename: string,
  thumb?: string
): string {
  const base = `${FILES_BASE}/${collectionId}/${recordId}/${filename}`;
  return thumb ? `${base}?thumb=${thumb}` : base;
}
