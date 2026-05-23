import { Suspense } from "react";
import { BedDouble } from "lucide-react";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import HospedajeCard from "@/components/hospedaje/HospedajeCard";
import HospedajeLoader from "@/components/hospedaje/HospedajeLoader";
import { fetchHospedajes } from "@/lib/api";

export const metadata: Metadata = {
  title: "Hospedaje en San Carlos Sonora — Alojamiento cerca de la playa",
  description: "Encuentra el hospedaje perfecto en San Carlos, Sonora. Estudios, casas y departamentos cerca de la playa en el Pueblo Mágico del Mar de Cortés.",
};

async function HospedajeList() {
  const hospedajes = await fetchHospedajes();

  if (!hospedajes.length) {
    return (
      <div className="text-center py-24">
        <div className="w-16 h-16 rounded-full bg-[#00AEEF]/10 flex items-center justify-center mx-auto mb-4">
          <BedDouble size={28} className="text-[#00AEEF]" />
        </div>
        <p className="text-[#0B1E2D]/40 text-lg font-playfair">Hospedajes próximamente disponibles</p>
        <p className="text-[#0B1E2D]/30 text-sm mt-2">Estamos preparando los mejores alojamientos para ti.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {hospedajes.map((hospedaje, i) => (
        <HospedajeCard key={hospedaje.id} hospedaje={hospedaje} index={i} />
      ))}
    </div>
  );
}

export default function HospedajePage() {
  return (
    <main className="min-h-screen bg-[#F8F5F0]">

      {/* ── Hero ── */}
      <section className="relative h-[65vh] min-h-[480px] flex items-end pb-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1800&q=85')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E2D] via-[#0B1E2D]/40 to-[#0B1E2D]/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1E2D]/40 to-transparent" />

        <Container className="relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-[#00AEEF]/20 border border-[#00AEEF]/40 flex items-center justify-center">
              <BedDouble size={18} className="text-[#00AEEF]" />
            </div>
            <p className="text-[#00AEEF] text-xs tracking-[0.35em] uppercase font-medium">
              San Carlos · Alojamiento
            </p>
          </div>
          <h1 className="font-playfair text-6xl md:text-8xl text-white mb-5 leading-none">
            Hospedaje
          </h1>
          <p className="text-white/60 text-lg max-w-xl leading-relaxed">
            Alojamientos seleccionados cerca del Mar de Cortés. Descansa en San Carlos con todo lo que necesitas.
          </p>
        </Container>
      </section>

      {/* ── Listing ── */}
      <section className="py-20">
        <Container>
          <div className="mb-14">
            <SectionTitle
              eyebrow="Alojamientos disponibles"
              title="Encuentra tu Espacio"
              subtitle="Hospedajes cuidadosamente seleccionados para que tu estadía en San Carlos sea perfecta"
            />
          </div>
          <Suspense fallback={<HospedajeLoader />}>
            <HospedajeList />
          </Suspense>
        </Container>
      </section>
    </main>
  );
}
