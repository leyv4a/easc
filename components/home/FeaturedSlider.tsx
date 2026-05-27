"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { FeaturedItem } from "@/lib/api";
import { FILES_BASE } from "@/types/yate";
import Container from "@/components/ui/Container";

interface FeaturedSliderProps {
  items: FeaturedItem[];
}

function getImageUrl(item: FeaturedItem): string {
  if (!item.coverImage)
    return "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&q=80";
  return `${FILES_BASE}/pbc_2751512968/${item.id}/${item.coverImage}`;
}

export default function FeaturedSlider({ items }: FeaturedSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "right" ? 380 : -380, behavior: "smooth" });
  };

  return (
    <>
      {/* Arrows — dentro del Container, alineados a la derecha */}
      <Container>
        <div className="flex justify-end mt-6 mb-8">
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all"
              aria-label="Anterior"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-11 h-11 rounded-full border border-[#00AEEF]/40 flex items-center justify-center text-[#00AEEF] hover:bg-[#00AEEF]/10 transition-all"
              aria-label="Siguiente"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </Container>

      {/* Scrollable row — sangra hasta los bordes */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 pl-4 sm:pl-6 lg:pl-[max(1.5rem,calc((100vw-1280px)/2+2rem))]"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.55 }}
            className="group relative flex-shrink-0 w-[300px] md:w-[360px] h-[440px] rounded-2xl overflow-hidden"
            style={{ scrollSnapAlign: "start" }}
          >
            <Link href={item.href} className="block w-full h-full">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${getImageUrl(item)}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {item.badge && (
                <div className="absolute top-4 left-4">
                  <span className="bg-[#00AEEF]/90 text-white text-[10px] tracking-[0.2em] uppercase font-medium px-3 py-1.5 rounded-full backdrop-blur-sm">
                    {item.badge}
                  </span>
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-playfair text-xl text-white mb-2 leading-snug">
                  {item.name}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-5 line-clamp-2">
                  {item.shortDescription}
                </p>
                <div className="flex items-center gap-2 text-[#00AEEF] text-sm font-medium group/btn">
                  <span>Explorar</span>
                  <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}

        <div className="flex-shrink-0 w-4 pr-4 sm:pr-6 lg:pr-[max(1.5rem,calc((100vw-1280px)/2+2rem))]" />
      </div>
    </>
  );
}
