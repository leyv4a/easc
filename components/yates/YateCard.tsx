"use client";
import { motion } from "framer-motion";
import { Users, Clock, MapPin, ArrowRight, Star, BadgeCheck } from "lucide-react";
import Link from "next/link";
import type { Yate } from "@/types/yate";
import { getImageUrl } from "@/types/yate";

interface YateCardProps {
  yate: Yate;
  index: number;
}

const EXPERIENCE_COLORS: Record<string, string> = {
  Privado: "bg-[#0B1E2D] text-white",
  Sunset: "bg-amber-500/20 text-amber-300",
  Pesca: "bg-green-500/20 text-green-300",
  Snorkel: "bg-[#00AEEF]/20 text-[#00AEEF]",
  Fiesta: "bg-purple-500/20 text-purple-300",
  Romántico: "bg-rose-500/20 text-rose-300",
};

export default function YateCard({ yate, index }: YateCardProps) {
  const coverUrl = yate.coverImage
    ? getImageUrl(yate.collectionId, yate.id, yate.coverImage, "800x600")
    : "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80";

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.55 }}
    >
      <Link href={`/yates/${yate.slug}`} className="group block">
        <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-[#00AEEF]/10 transition-all duration-500 hover:-translate-y-1.5">
          {/* Cover image */}
          <div className="relative h-60 overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url('${coverUrl}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Badge */}
            {yate.badge && (
              <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-[#00AEEF] text-white text-[10px] font-semibold tracking-wide uppercase px-3 py-1.5 rounded-full shadow-lg">
                <Star size={10} className="fill-white" />
                {yate.badge}
              </div>
            )}

            {/* Featured dot */}
            {yate.featured && (
              <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[10px] px-2.5 py-1 rounded-full">
                <BadgeCheck size={11} className="text-[#00AEEF]" />
                Destacado
              </div>
            )}

            {/* Price pill at bottom */}
            <div className="absolute bottom-4 right-4 bg-[#0B1E2D]/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full">
              <span className="font-playfair text-base font-semibold">
                ${yate.price.toLocaleString("es-MX")}
              </span>
              <span className="text-white/50 text-[10px] ml-1">{yate.currency}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Name */}
            <h3 className="font-playfair text-xl text-[#0B1E2D] mb-2 group-hover:text-[#00AEEF] transition-colors">
              {yate.name}
            </h3>

            {/* Short description */}
            <p className="text-[#0B1E2D]/55 text-sm leading-relaxed mb-4 line-clamp-2">
              {yate.shortDescription}
            </p>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#0B1E2D]/50 mb-4">
              <div className="flex items-center gap-1.5">
                <Users size={13} />
                <span>Hasta {yate.maxPeople} personas</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={13} />
                <span>{yate.durationHours}h mínimo</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin size={13} />
                <span>{yate.departureLocation}</span>
              </div>
            </div>

            {/* Experience tags */}
            {yate.experienceType?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-5">
                {yate.experienceType.slice(0, 4).map((exp) => (
                  <span
                    key={exp}
                    className={`text-[10px] font-medium px-2.5 py-1 rounded-full ${
                      EXPERIENCE_COLORS[exp] ?? "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {exp}
                  </span>
                ))}
                {yate.experienceType.length > 4 && (
                  <span className="text-[10px] text-[#0B1E2D]/40 px-2 py-1">
                    +{yate.experienceType.length - 4}
                  </span>
                )}
              </div>
            )}

            {/* CTA */}
            <div className="flex items-center justify-between pt-4 border-t border-[#D8C3A5]/30">
              <div className="text-[#0B1E2D]/40 text-xs">
                Consulta disponibilidad
              </div>
              <div className="flex items-center gap-1.5 text-[#00AEEF] text-sm font-medium group/cta">
                <span>Ver detalles</span>
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover/cta:translate-x-1"
                />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
