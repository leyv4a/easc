export interface FeaturedActivity {
  id: string;
  title: string;
  description: string;
  image: string;
  tag: string;
  href?: string;
}

export const featuredActivities: FeaturedActivity[] = [
  {
    id: "yate-privado",
    title: "Yate Privado al Atardecer",
    description: "Navega las aguas cristalinas del Mar de Cortés en un yate de lujo mientras el sol pinta el cielo de naranja y rosa.",
    image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",
    tag: "Yates",
  },
  {
    id: "tour-privado",
    title: "Tour Privado Bahía San Carlos",
    description: "Descubre las bahías secretas y cuevas marinas a bordo de un catamarán privado con guía experto.",
    image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80",
    tag: "Tours",
  },
  {
    id: "sunset-tour",
    title: "Sunset Cruise Mar de Cortés",
    description: "Una experiencia mágica contemplando el atardecer del Mar de Cortés, reconocido como el acuario del mundo.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    tag: "Sunset Tour",
  },
  {
    id: "snorkel",
    title: "Snorkel en Islotes",
    description: "Bucea entre arrecifes de coral, peces tropicales y leones marinos en las aguas prístinas de los islotes.",
    image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&q=80",
    tag: "Snorkel",
  },
  {
    id: "mar-cortes",
    title: "Expedición Mar de Cortés",
    description: "Navega hacia las profundidades del Mar de Cortés, hogar de delfines, ballenas y una biodiversidad única en el mundo.",
    image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80",
    tag: "Expedición",
  },
];
