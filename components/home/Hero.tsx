"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Anchor, UtensilsCrossed, BedDouble, Mountain, Landmark, Music, ChevronDown } from "lucide-react";
import { categories } from "@/data/categories";
import Modal from "@/components/ui/Modal";
import Link from "next/link";
import HeroImage from "@/public/hero.webp";

const iconMap: Record<string, React.ReactNode> = {
  Anchor: <Anchor size={18} />,
  UtensilsCrossed: <UtensilsCrossed size={18} />,
  BedDouble: <BedDouble size={18} />,
  Mountain: <Mountain size={18} />,
  Landmark: <Landmark size={18} />,
  Music: <Music size={18} />,
};

export default function Hero() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryClick = (cat: typeof categories[0]) => {
    if (!cat.active) {
      setSelectedCategory(cat.label);
      setModalOpen(true);
    }
  };

  return (
    <>
      <section className="relative h-screen min-h-[700px] flex flex-col items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage: `url(${HeroImage.src})`,
          }}
        />

        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1E2D]/70 via-[#0B1E2D]/40 to-[#0B1E2D]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1E2D]/30 via-transparent to-[#0B1E2D]/30" />

        {/* Grain texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Decorative top line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00AEEF]/40 to-transparent" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#00AEEF] text-xs tracking-[0.4em] uppercase font-medium mb-6"
          >
            Pueblo Mágico · Sonora · México
          </motion.p>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-karla font-bold text-6xl md:text-8xl lg:text-[9rem] text-[#D8C3A5] leading-none mb-4 tracking-tight"
            style={{ textShadow: "0 4px 40px rgba(0,0,0,0.5)" }}
          >
            MAR
                    Y VIDA
          </motion.h1>

          {/* H2 */}
          {/* <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="font-playfair text-2xl md:text-3xl text-[#D8C3A5] mb-5"
          >
            Bienvenido a San Carlos
          </motion.h2> */}

          {/* H3 */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="text-white/60 text-base md:text-lg max-w-xl mx-auto mb-12 leading-relaxed"
          >
            Explora, relájate y enamórate de la belleza de San Carlos.
          </motion.p>

          {/* Category Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.05 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {categories.map((cat) =>
              cat.active ? (
                <Link
                  key={cat.id}
                  href={cat.href!}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00AEEF] text-white text-sm font-medium shadow-lg shadow-[#00AEEF]/30 hover:bg-[#0090c7] transition-all hover:scale-105"
                >
                  {iconMap[cat.icon]}
                  {cat.label}
                </Link>
              ) : (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/25 text-white/60 text-sm font-medium hover:border-white/50 hover:text-white/80 transition-all backdrop-blur-sm"
                >
                  {iconMap[cat.icon]}
                  {cat.label}
                </button>
              )
            )}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-[10px] tracking-[0.25em] uppercase">Descubrir</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ChevronDown size={18} />
          </motion.div>
        </motion.div>
      </section>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        categoryName={selectedCategory}
      />
    </>
  );
}
