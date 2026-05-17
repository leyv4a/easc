import { Suspense } from "react";
import { Anchor } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import YateCard from "@/components/yates/YateCard";
import YatesLoader from "@/components/yates/YatesLoader";
import { fetchYates } from "@/lib/api";

async function YatesList() {
  const yates = await fetchYates();

  if (!yates.length) {
    return (
      <div className="text-center py-24">
        <p className="text-white/40 text-lg">No se encontraron yates disponibles.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {yates.map((yate, i) => (
        <YateCard key={yate.id} yate={yate} index={i} />
      ))}
    </div>
  );
}

export default function YatesPage() {
  return (
    <main className="min-h-screen bg-[#F8F5F0]">
      {/* Hero */}
      <section className="relative h-[65vh] min-h-[480px] flex items-end pb-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1800&q=85')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E2D] via-[#0B1E2D]/40 to-[#0B1E2D]/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1E2D]/40 to-transparent" />

        <Container className="relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-[#00AEEF]/20 border border-[#00AEEF]/40 flex items-center justify-center">
              <Anchor size={18} className="text-[#00AEEF]" />
            </div>
            <p className="text-[#00AEEF] text-xs tracking-[0.35em] uppercase font-medium">
              San Carlos · Mar de Cortés
            </p>
          </div>
          <h1 className="font-playfair text-6xl md:text-8xl text-white mb-5 leading-none">
            Yates
          </h1>
          <p className="text-white/60 text-lg max-w-xl leading-relaxed">
            Embarcaciones premium para vivir experiencias únicas en las aguas del Mar de Cortés.
          </p>
        </Container>
      </section>

      {/* Listing */}
      <section className="py-20">
        <Container>
          <div className="mb-14">
            <SectionTitle
              eyebrow="Flota disponible"
              title="Elige tu Embarcación"
              subtitle="Cada yate es una experiencia diseñada para los amantes del mar y la aventura"
            />
          </div>

          <Suspense fallback={<YatesLoader />}>
            <YatesList />
          </Suspense>
        </Container>
      </section>
    </main>
  );
}
