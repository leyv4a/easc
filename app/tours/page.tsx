import { Suspense } from "react";
import { Map } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import TourCard from "@/components/tours/TourCard";
import ToursLoader from "@/components/tours/ToursLoader";
import { fetchTourBySlug, fetchTours } from "@/lib/api";
import type { Metadata } from "next";
import { getTourImageUrl } from "@/types/tour";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const tours = await fetchTours();
  return tours.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = await fetchTourBySlug(slug);
  if (!tour) return { title: "Tour no encontrado" };

  const imageUrl = tour.coverImage
    ? getTourImageUrl(tour.collectionId, tour.id, tour.coverImage)
    : null;

  return {
    title: tour.seoTitle || `${tour.name} · San Carlos`,
    description: tour.seoDescription || tour.shortDescription,
    alternates: {
      canonical: `https://escapateasancarlos.com/tours/${tour.slug}`,
    },
    openGraph: {
      title: tour.seoTitle || tour.name,
      description: tour.seoDescription || tour.shortDescription,
      images: imageUrl
        ? [{ url: imageUrl, width: 1200, height: 630, alt: tour.name }]
        : [],
      type: "website",
      locale: "es_MX",
    },
    twitter: {
      card: "summary_large_image",
      title: tour.seoTitle || tour.name,
      description: tour.seoDescription || tour.shortDescription,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

async function ToursList() {
  const tours = await fetchTours();

  if (!tours.length) {
    return (
      <div className="text-center py-24 col-span-3">
        <div className="w-16 h-16 rounded-full bg-[#00AEEF]/10 flex items-center justify-center mx-auto mb-4">
          <Map size={28} className="text-[#00AEEF]" />
        </div>
        <p className="text-[#0B1E2D]/40 text-lg font-playfair">
          Tours próximamente disponibles
        </p>
        <p className="text-[#0B1E2D]/30 text-sm mt-2">
          Estamos preparando experiencias increíbles para ti.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {tours.map((tour, i) => (
        <TourCard key={tour.id} tour={tour} index={i} />
      ))}
    </div>
  );
}

export default function ToursPage() {
  return (
    <main className="min-h-screen bg-[#F8F5F0]">
      {/* ── Hero ── */}
      <section className="relative h-[65vh] min-h-[480px] flex items-end pb-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1800&q=85')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E2D] via-[#0B1E2D]/40 to-[#0B1E2D]/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1E2D]/40 to-transparent" />

        <Container className="relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-[#00AEEF]/20 border border-[#00AEEF]/40 flex items-center justify-center">
              <Map size={18} className="text-[#00AEEF]" />
            </div>
            <p className="text-[#00AEEF] text-xs tracking-[0.35em] uppercase font-medium">
              San Carlos · Experiencias
            </p>
          </div>
          <h1 className="font-playfair text-6xl md:text-8xl text-white mb-5 leading-none">
            Tours
          </h1>
          <p className="text-white/60 text-lg max-w-xl leading-relaxed">
            Explora San Carlos con guías expertos. Senderismo, ecoturismo y
            aventuras únicas en el Pueblo Mágico.
          </p>
        </Container>
      </section>

      {/* ── Listing ── */}
      <section className="py-20">
        <Container>
          <div className="mb-14">
            <SectionTitle
              eyebrow="Experiencias disponibles"
              title="Elige tu Aventura"
              subtitle="Cada tour es una ventana a la naturaleza y cultura de San Carlos"
            />
          </div>

          <Suspense fallback={<ToursLoader />}>
            <ToursList />
          </Suspense>
        </Container>
      </section>
    </main>
  );
}
