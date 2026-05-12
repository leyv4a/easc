"use client";
import { motion } from "framer-motion";
import { Star, Award } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Imagen from "@/public/imagen1.jpg"

export default function DiscoverSanCarlos() {
  return (
    <section className="py-24 bg-[#F8F5F0]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Text Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[#00AEEF] text-xs tracking-[0.3em] uppercase font-medium mb-4">
              Nuestro Destino
            </p>
            <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl text-[#0B1E2D] leading-tight mb-6">
              San Carlos:{" "}
              <span className="italic text-[#00AEEF]">
                Donde el Mar y el Desierto se Encuentran
              </span>
            </h2>

            <p className="text-[#0B1E2D]/65 leading-relaxed mb-6 text-[15px]">
              Ya sea que busques adrenalina, relajación o un poco de ambas, San Carlos, Sonora,
              es tu destino ideal. Con paisajes impresionantes entre el Mar de Cortés y el
              desierto sonorense, aquí encontrarás una combinación perfecta de naturaleza,
              aventura y descanso.
            </p>
            <p className="text-[#0B1E2D]/65 leading-relaxed mb-6 text-[15px]">
              Desde las imponentes vistas del Cerro Tetakawi hasta las aguas cristalinas de
              Playa Los Algodones, cada rincón invita a la exploración. San Carlos es un
              paraíso para el buceo, la pesca deportiva, el senderismo y el ecoturismo, con
              áreas protegidas como el Estero El Soldado, hogar de una biodiversidad única.
            </p>
            <p className="text-[#0B1E2D]/65 leading-relaxed mb-8 text-[15px]">
              San Carlos fue recientemente reconocido como{" "}
              <strong className="text-[#0B1E2D]">Pueblo Mágico</strong>, un testimonio de su
              belleza natural y riqueza cultural. Aquí, cada amanecer trae una nueva aventura y
              cada atardecer es una postal inolvidable.
            </p>

            {/* Stats */}
            <div className="flex gap-8 mb-10">
              {[
                { value: "1,500+", label: "Km² de mar protegido" },
                { value: "300+", label: "Días de sol al año" },
                { value: "Pueblo", label: "Mágico 2024" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="font-playfair text-2xl text-[#0B1E2D] font-bold">
                    {stat.value}
                  </span>
                  <span className="text-[#0B1E2D]/50 text-xs mt-1">{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <Button href="/yates" variant="primary" size="lg">
                Explorar Yates
              </Button>
              <Button href="/cultura" variant="outline" size="lg" className="!text-[#0B1E2D] !border-[#0B1E2D]/30 hover:!bg-[#0B1E2D]/5">
                Conocer más
              </Button>
            </div>
          </motion.div>

          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            {/* Main image */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl shadow-[#0B1E2D]/20">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    `url(${Imagen.src})`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E2D]/50 to-transparent" />
            </div>

            {/* Badge overlay */}
            {/* <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#00AEEF]/10 flex items-center justify-center">
                <Award size={20} className="text-[#00AEEF]" />
              </div>
              <div>
                <p className="text-[#0B1E2D] font-semibold text-sm">Pueblo Mágico</p>
                <p className="text-[#0B1E2D]/50 text-xs">Reconocimiento Federal 2024</p>
              </div>
            </div> */}

            {/* Rating badge */}
            {/* <div className="absolute -top-4 -right-4 bg-[#0B1E2D] rounded-2xl shadow-xl p-4">
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="text-[#D8C3A5] fill-[#D8C3A5]" />
                ))}
              </div>
              <p className="text-white text-sm font-semibold">4.9 / 5</p>
              <p className="text-white/40 text-[10px]">Miles de reseñas</p>
            </div> */}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
