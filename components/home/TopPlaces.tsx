"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { topPlaces } from "@/data/topPlaces";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";


export default function TopPlaces() {
  return (
    <section className="py-24 bg-[#F8F5F0]">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <SectionTitle
            eyebrow="Lugares Imperdibles"
            title="Top 3 San Carlos"
            subtitle="Los destinos más emblemáticos del Pueblo Mágico del Mar de Cortés"
            center
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topPlaces.map((place, i) => (
            <motion.div
              key={place.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className={`group relative overflow-hidden rounded-3xl cursor-pointer ${
                i === 0 ? "md:row-span-1 h-[500px]" : "h-[500px]"
              }`}
            >
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${place.image}')` }}
              />

              {/* Layered overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E2D] via-[#0B1E2D]/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#00AEEF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Number */}
              <div className="absolute top-6 left-6 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
                <span className="font-playfair text-white/60 text-lg leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-7 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-playfair text-2xl md:text-3xl text-white mb-3 leading-snug">
                  {place.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                  {place.subtitle}
                </p>
                <div className="flex items-center gap-2 text-[#00AEEF] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  <span>Descubrir</span>
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </div>
              </div>

              {/* Bottom glow line */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00AEEF]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
