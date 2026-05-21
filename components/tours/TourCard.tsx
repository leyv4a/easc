"use client";
import { motion } from "framer-motion";
import { Users, Clock, MapPin, ArrowRight, Star, BadgeCheck, Tag } from "lucide-react";
import Link from "next/link";
import type { Tour } from "@/types/tour";
import { getTourImageUrl, DIFFICULTY_STYLES } from "@/types/tour";

interface TourCardProps {
  tour: Tour;
  index: number;
}

export default function TourCard({ tour, index }: TourCardProps) {
  const coverUrl = tour.coverImage
    ? getTourImageUrl(tour.collectionId, tour.id, tour.coverImage, "800x600")
    : "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80";

  const difficulty = tour.details?.difficulty;
  const diffStyle = difficulty ? DIFFICULTY_STYLES[difficulty] : null;
  const hasPrice = tour.price > 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.55 }}
    >
      <Link href={`/tours/${tour.slug}`} className="group block h-full">
        <div className="h-full bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-[#00AEEF]/10 transition-all duration-500 hover:-translate-y-1.5 flex flex-col">

          {/* Cover */}
          <div className="relative h-56 overflow-hidden shrink-0">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url('${coverUrl}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Badge */}
            {tour.badge && (
              <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-[#00AEEF] text-white text-[10px] font-bold tracking-wide uppercase px-3 py-1.5 rounded-full shadow-lg">
                <Star size={9} className="fill-white" />
                {tour.badge}
              </div>
            )}

            {tour.featured && (
              <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[10px] px-2.5 py-1 rounded-full">
                <BadgeCheck size={11} className="text-[#00AEEF]" />
                Destacado
              </div>
            )}

            {/* Price or free */}
            <div className="absolute bottom-4 right-4 bg-[#0B1E2D]/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full">
              {hasPrice ? (
                <>
                  <span className="font-playfair text-base font-semibold">
                    ${tour.price.toLocaleString("es-MX")}
                  </span>
                  <span className="text-white/50 text-[10px] ml-1">{tour.currency}</span>
                </>
              ) : (
                <span className="text-[#00AEEF] text-xs font-semibold tracking-wide">Consultar precio</span>
              )}
            </div>

            {/* Difficulty chip over image */}
            {diffStyle && difficulty && (
              <div className="absolute bottom-4 left-4">
                <span className={`inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full bg-white/90 ${diffStyle.text}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${diffStyle.dot}`} />
                  {difficulty}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-1">
            <h3 className="font-playfair text-xl text-[#0B1E2D] mb-2 group-hover:text-[#00AEEF] transition-colors leading-snug">
              {tour.name}
            </h3>

            <p className="text-[#0B1E2D]/55 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
              {tour.shortDescription}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#0B1E2D]/45 mb-4">
              <span className="flex items-center gap-1.5">
                <Users size={12} />
                Hasta {tour.maxPeople}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={12} />
                {tour.durationHours}h
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={12} />
                {tour.departureLocation}
              </span>
              {tour.details?.startTime && (
                <span className="flex items-center gap-1.5">
                  <Tag size={12} />
                  {tour.details.startTime}
                </span>
              )}
            </div>

            {/* Amenities preview */}
            {tour.details?.amenities?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {tour.details.amenities.slice(0, 3).map((a) => (
                  <span key={a} className="text-[10px] bg-[#F8F5F0] text-[#0B1E2D]/55 px-2 py-1 rounded-full border border-[#D8C3A5]/30">
                    {a}
                  </span>
                ))}
                {tour.details.amenities.length > 3 && (
                  <span className="text-[10px] text-[#0B1E2D]/35 px-2 py-1">
                    +{tour.details.amenities.length - 3} más
                  </span>
                )}
              </div>
            )}

            {/* CTA */}
            <div className="flex items-center justify-between pt-4 border-t border-[#D8C3A5]/30 mt-auto">
              <span className="text-[#0B1E2D]/35 text-xs">Ver detalles del tour</span>
              <span className="flex items-center gap-1.5 text-[#00AEEF] text-sm font-medium group/cta">
                <span>Explorar</span>
                <ArrowRight size={14} className="transition-transform group-hover/cta:translate-x-1" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
