"use client";
import { motion } from "framer-motion";
import { Users, MapPin, ArrowRight, Star, BadgeCheck, Waves, BedDouble, Bath } from "lucide-react";
import Link from "next/link";
import type { Hospedaje } from "@/types/hospedaje";
import { getHospedajeImageUrl } from "@/types/hospedaje";

interface HospedajeCardProps {
  hospedaje: Hospedaje;
  index: number;
}

// Extrae amenidades activas de los booleanos de details
function getActiveAmenities(details: Hospedaje["details"]): string[] {
  const map: Record<string, string> = {
    airConditioning:  "❄️ Aire acondicionado",
    kitchenIncluded:  "🍳 Cocina",
    wifiIncluded:     "📶 WiFi",
    poolIncluded:     "🏊 Piscina",
    bbqIncluded:      "🔥 BBQ",
    petFriendly:      "🐾 Pet friendly",
    bathroom:         "🚿 Baño privado",
  };
  return Object.entries(map)
    .filter(([key]) => !!details?.[key as keyof typeof details])
    .map(([, label]) => label);
}

// Obtiene tarifas con valor (no null) del pricing normalizado
function getPricingEntries(pricing?: Hospedaje["details"]["pricing"]): { label: string; value: number }[] {
  if (!pricing) return [];
  const labels: Record<string, string> = {
    "1_day":    "1 día",
    "2_days":   "2 días",
    "3_days":   "3 días",
    "4_days":   "4 días",
    "5_days":   "5 días",
    "6_days":   "6 días",
    "7_days":   "7 días",
    "extra_day": "Día extra",
    // backward compat con _night
    "1_night":   "1 noche",
    "2_nights":  "2 noches",
    "extra_night": "Noche extra",
  };
  return Object.entries(pricing)
    .filter(([, v]) => v != null && v > 0)
    .map(([key, value]) => ({ label: labels[key] ?? key, value: value as number }));
}

export default function HospedajeCard({ hospedaje, index }: HospedajeCardProps) {
  const coverUrl = hospedaje.coverImage
    ? getHospedajeImageUrl(hospedaje.collectionId, hospedaje.id, hospedaje.coverImage, "800x600")
    : "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80";

  const amenidades = getActiveAmenities(hospedaje.details);
  const pricingEntries = getPricingEntries(hospedaje.details?.pricing);
  const distancia = hospedaje.details?.distanceToBeachMeters;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.55 }}
    >
      <Link href={`/hospedaje/${hospedaje.slug}`} className="group block h-full">
        <div className="h-full bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-[#00AEEF]/10 transition-all duration-500 hover:-translate-y-1.5 flex flex-col">

          {/* Cover */}
          <div className="relative h-60 overflow-hidden shrink-0">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url('${coverUrl}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {hospedaje.badge && (
              <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-[#00AEEF] text-white text-[10px] font-bold tracking-wide uppercase px-3 py-1.5 rounded-full shadow-lg">
                <Star size={9} className="fill-white" />
                {hospedaje.badge}
              </div>
            )}

            {hospedaje.featured && (
              <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[10px] px-2.5 py-1 rounded-full">
                <BadgeCheck size={11} className="text-[#00AEEF]" />
                Destacado
              </div>
            )}

            {/* Precio base */}
            <div className="absolute bottom-4 right-4 bg-[#0B1E2D]/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full">
              <span className="font-playfair text-base font-semibold">
                ${hospedaje.price.toLocaleString("es-MX")}
              </span>
              <span className="text-white/50 text-[10px] ml-1">{hospedaje.currency}/día</span>
            </div>

            {distancia && (
              <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/20 text-white text-[10px] font-medium px-2.5 py-1 rounded-full">
                <Waves size={11} />
                {distancia < 1000 ? `${distancia}m de la playa` : `${(distancia / 1000).toFixed(1)}km de la playa`}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-1">
            <h3 className="font-playfair text-xl text-[#0B1E2D] mb-2 group-hover:text-[#00AEEF] transition-colors leading-snug">
              {hospedaje.name}
            </h3>

            <p className="text-[#0B1E2D]/55 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
              {hospedaje.shortDescription}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#0B1E2D]/45 mb-4">
              <span className="flex items-center gap-1.5">
                <Users size={12} />
                Hasta {hospedaje.maxPeople} personas
              </span>
              {hospedaje.details?.rooms && (
                <span className="flex items-center gap-1.5">
                  <BedDouble size={12} />
                  {hospedaje.details.rooms} {hospedaje.details.rooms === 1 ? "hab." : "habs."}
                </span>
              )}
              {hospedaje.details?.bathrooms && (
                <span className="flex items-center gap-1.5">
                  <Bath size={12} />
                  {hospedaje.details.bathrooms} {hospedaje.details.bathrooms === 1 ? "baño" : "baños"}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <MapPin size={12} />
                {hospedaje.departureLocation}
              </span>
            </div>

            {/* Pricing tiers — solo los que tienen valor */}
            {pricingEntries.length > 0 && (
              <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
                {pricingEntries.slice(0, 3).map(({ label, value }) => (
                  <div key={label} className="flex-shrink-0 bg-[#F8F5F0] rounded-xl px-3 py-2 text-center min-w-[72px]">
                    <p className="font-semibold text-[#0B1E2D] text-sm">${value.toLocaleString("es-MX")}</p>
                    <p className="text-[#0B1E2D]/40 text-[10px]">{label}</p>
                  </div>
                ))}
                {pricingEntries.length > 3 && (
                  <div className="flex-shrink-0 flex items-center px-2">
                    <span className="text-[10px] text-[#0B1E2D]/35">+{pricingEntries.length - 3} más</span>
                  </div>
                )}
              </div>
            )}

            {/* Amenidades activas desde booleanos */}
            {amenidades.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {amenidades.slice(0, 3).map((a) => (
                  <span key={a} className="text-[10px] bg-[#F8F5F0] text-[#0B1E2D]/55 px-2 py-1 rounded-full border border-[#D8C3A5]/30">
                    {a}
                  </span>
                ))}
                {amenidades.length > 3 && (
                  <span className="text-[10px] text-[#0B1E2D]/35 px-2 py-1">
                    +{amenidades.length - 3} más
                  </span>
                )}
              </div>
            )}

            {/* CTA */}
            <div className="flex items-center justify-between pt-4 border-t border-[#D8C3A5]/30 mt-auto">
              <span className="text-[#0B1E2D]/35 text-xs">Ver disponibilidad</span>
              <span className="flex items-center gap-1.5 text-[#00AEEF] text-sm font-medium group/cta">
                <span>Ver más</span>
                <ArrowRight size={14} className="transition-transform group-hover/cta:translate-x-1" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}