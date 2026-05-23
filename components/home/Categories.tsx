"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Anchor, UtensilsCrossed, BedDouble, Mountain, Landmark, Music,Map } from "lucide-react";
import { categories } from "@/data/categories";
import Modal from "@/components/ui/Modal";
import Container from "@/components/ui/Container";
import Link from "next/link";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
 Anchor,
 UtensilsCrossed,
 BedDouble,
 Mountain,
 Landmark,
 Music,
 Map,
};

const colorMap: Record<string, string> = {
  yates: "from-[#0B1E2D] to-[#00AEEF]/40",
  restaurantes: "from-[#1a0a0a] to-[#8b3a2a]/40",
  hospedaje: "from-[#0a1020] to-[#2a4a7a]/40",
  aventuras: "from-[#0a1a10] to-[#2a6a3a]/40",
  cultura: "from-[#1a1020] to-[#6a3a8a]/40",
  "vida-nocturna": "from-[#10060a] to-[#8a2a5a]/40",
};

export default function Categories() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <>
      <section className="py-20 bg-[#F8F5F0]">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-[#00AEEF] text-xs tracking-[0.3em] uppercase font-medium mb-3">
              Experiencias
            </p>
            <h2 className="font-playfair text-3xl md:text-4xl text-[#0B1E2D]">
              Elige tu Aventura
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => {
              const Icon = iconMap[cat.icon];
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  {cat.active ? (
                    <Link
                      href={cat.href!}
                      className={`group relative aspect-square flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br ${colorMap[cat.id]} border border-[#00AEEF]/30 hover:border-[#00AEEF]/60 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#00AEEF]/10 overflow-hidden cursor-pointer`}
                    >
                      <div className="absolute inset-0 bg-[#0B1E2D] opacity-80 group-hover:opacity-70 transition-opacity" />
                      <div className="relative z-10 flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-[#00AEEF]/20 border border-[#00AEEF]/40 flex items-center justify-center group-hover:bg-[#00AEEF]/30 transition-colors">
                          <Icon size={18} className="text-[#00AEEF]" />
                        </div>
                        <span className="text-white text-sm font-medium">{cat.label}</span>
                        <span className="text-[#00AEEF] text-[10px] tracking-wider uppercase">Activo</span>
                      </div>
                    </Link>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedCategory(cat.label);
                        setModalOpen(true);
                      }}
                      className={`group relative aspect-square w-full flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br ${colorMap[cat.id]} border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-102 overflow-hidden cursor-pointer`}
                    >
                      <div className="absolute inset-0 bg-[#0B1E2D] opacity-90" />
                      <div className="relative z-10 flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                          <Icon size={18} className="text-white/40" />
                        </div>
                        <span className="text-white/60 text-sm font-medium">{cat.label}</span>
                        <span className="text-white/30 text-[10px] tracking-wider uppercase">Próximamente</span>
                      </div>
                    </button>
                  )}
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        categoryName={selectedCategory}
      />
    </>
  );
}
