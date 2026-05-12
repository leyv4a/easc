export interface Category {
  id: string;
  label: string;
  icon: string;
  active: boolean;
  href?: string;
}

export const categories: Category[] = [
  { id: "yates", label: "Yates", icon: "Anchor", active: true, href: "/yates" },
  { id: "restaurantes", label: "Restaurantes", icon: "UtensilsCrossed", active: false },
  { id: "hospedaje", label: "Hospedaje", icon: "BedDouble", active: false },
  { id: "aventuras", label: "Aventuras", icon: "Mountain", active: false },
  { id: "cultura", label: "Cultura", icon: "Landmark", active: false },
  { id: "vida-nocturna", label: "Vida Nocturna", icon: "Music", active: false },
];
