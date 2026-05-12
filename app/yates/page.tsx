import { Anchor, Star, Users, Clock, Shield } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import Imagen from "@/public/imagen2.jpg"


const yates = [
  {
    id: "1",
    name: "Sunset Voyager",
    type: "Catamarán de Lujo",
    capacity: 12,
    duration: "4 horas",
    price: "$3,500 MXN",
    rating: 4.9,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=700&q=80",
    features: ["Snorkel incluido", "Bebidas a bordo", "Guía experto", "Equipo de pesca"],
  },
  {
    id: "2",
    name: "Mar de Cortés Explorer",
    type: "Velero Premium",
    capacity: 8,
    duration: "6 horas",
    price: "$5,200 MXN",
    rating: 5.0,
    reviews: 74,
    image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=700&q=80",
    features: ["Tour privado", "Almuerzo gourmet", "Kayaks", "Paddle boards"],
  },
  {
    id: "3",
    name: "Tetakawi Dream",
    type: "Yate Privado",
    capacity: 16,
    duration: "Todo el día",
    price: "$8,900 MXN",
    rating: 4.8,
    reviews: 52,
    image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=700&q=80",
    features: ["Capitán privado", "Chef a bordo", "Equipo de buceo", "Pesca deportiva"],
  },
];

export default function YatesPage() {
  return (
    <main className="bg-[#F8F5F0] min-h-screen">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[450px] flex items-end pb-16">
        <div
          className="absolute inset-0 bg-cover bg-center "
          style={{
            backgroundImage:
              `url(${Imagen.src})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E2D] via-[#0B1E2D]/50 to-[#0B1E2D]/20" />

        <Container className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
          {/*   <div className="w-10 h-10 rounded-full bg-[#00AEEF]/20 border border-[#00AEEF]/40 flex items-center justify-center">
              <Anchor size={18} className="text-[#00AEEF]" />
            </div>
            <p className="text-[#00AEEF] text-xs tracking-[0.3em] uppercase font-medium">
              Categoría Activa
            </p> */}
          </div>
          <h1 className="font-playfair text-5xl md:text-7xl text-white mb-4">Yates</h1>
          <p className="text-white/60 text-lg max-w-xl">
            Navega el Mar de Cortés a bordo de los mejores yates de San Carlos.
          </p>
        </Container>
      </section>

      {/* Yates Grid */}
      <section className="py-20">
        <Container>
          <div className="mb-12">
            <SectionTitle
              eyebrow="Flota disponible"
              title="Elige tu Embarcación"
              subtitle="Cada yate es una experiencia única diseñada para los amantes del mar"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {yates.map((yate) => (
              <div
                key={yate.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#00AEEF]/10 transition-all duration-500 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('${yate.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 bg-[#00AEEF] text-white text-xs font-medium px-3 py-1.5 rounded-full">
                    {yate.type}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-playfair text-xl text-[#0B1E2D]">{yate.name}</h3>
                    <div className="flex items-center gap-1 text-[#D8C3A5]">
                      <Star size={14} className="fill-current" />
                      <span className="text-sm font-medium text-[#0B1E2D]">{yate.rating}</span>
                      <span className="text-xs text-[#0B1E2D]/40">({yate.reviews})</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-[#0B1E2D]/50 mb-4">
                    <div className="flex items-center gap-1.5">
                      <Users size={14} />
                      <span>Hasta {yate.capacity} personas</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} />
                      <span>{yate.duration}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {yate.features.map((f) => (
                      <span
                        key={f}
                        className="text-[10px] bg-[#F8F5F0] text-[#0B1E2D]/60 px-2.5 py-1 rounded-full border border-[#D8C3A5]/40"
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#D8C3A5]/30">
                    <div>
                      <span className="font-playfair text-xl text-[#0B1E2D] font-semibold">
                        {yate.price}
                      </span>
                      <span className="text-xs text-[#0B1E2D]/40 ml-1">/ por persona</span>
                    </div>
                    <Button size="sm" variant="primary">
                      Reservar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Trust badges */}
      <section className="py-16 bg-[#0B1E2D]">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Shield, label: "Seguridad Garantizada", sub: "Capitanes certificados" },
              { icon: Star, label: "5 Estrellas", sub: "Miles de reseñas" },
              { icon: Users, label: "+10,000 Turistas", sub: "Satisfechos" },
              { icon: Anchor, label: "Flota Premium", sub: "Mantenimiento constante" },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#00AEEF]/10 border border-[#00AEEF]/20 flex items-center justify-center">
                  <Icon size={20} className="text-[#00AEEF]" />
                </div>
                <p className="text-white font-medium text-sm">{label}</p>
                <p className="text-white/40 text-xs">{sub}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
