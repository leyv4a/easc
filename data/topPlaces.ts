import tetakawi from "@/public/tetakawi.jpg";
import algodones from "@/public/algodones.jpg";
import delfinario from "@/public/delfinario.jpg";

export interface TopPlace {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  href?: string;
}

export const topPlaces: TopPlace[] = [
  {
    id: "algodones",
    title: "Playa Los Algodones",
    subtitle: "Aguas turquesas y arenas blancas en la joya del Mar de Cortés",
    image: algodones.src,
  },
  {
    id: "tetakawi",
    title: "Cerro Tetakawi",
    subtitle: "El guardián de San Carlos, con vistas panorámicas impresionantes",
    image: tetakawi.src,
  },
  {
    id: "delfinario",
    title: "Delfinario Sonora",
    subtitle: "Nada con delfines y crea memorias únicas en el Mar de Cortés",
    image: delfinario.src,
  },
];
