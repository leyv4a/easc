import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MapPin, Users, Clock, Anchor, CheckCircle, Star } from "lucide-react";
import Container from "@/components/ui/Container";
import YateGallery from "@/components/yates/YateGallery";
import BookingPanel from "@/components/yates/BookingPanel";
import { fetchYateBySlug, fetchYates } from "@/lib/api";
import { getImageUrl } from "@/types/yate";
import Link from "next/link";
import { getTourImageUrl } from "@/types/tour";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const yates = await fetchYates();
  return yates.map((y) => ({ slug: y.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const yate = await fetchYateBySlug(slug);
  if (!yate) return { title: "Yate no encontrado" };

  const imageUrl = yate.coverImage
    ? getTourImageUrl(yate.collectionId, yate.id, yate.coverImage)
    : null;

  return {
    title: yate.seoTitle || yate.name,
    description: yate.seoDescription || yate.shortDescription,
    alternates: {
    canonical: `https://escapateasancarlos.com/yates/${yate.slug}`,
  },
    openGraph: {
      title: yate.seoTitle || yate.name,
      description: yate.seoDescription || yate.shortDescription,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: yate.name }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: yate.seoTitle || yate.name,
      description: yate.seoDescription || yate.shortDescription,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

const EXPERIENCE_COLORS: Record<string, string> = {
  Privado: "bg-[#0B1E2D]/10 text-[#0B1E2D]",
  Sunset: "bg-amber-100 text-amber-700",
  Pesca: "bg-green-100 text-green-700",
  Snorkel: "bg-[#00AEEF]/10 text-[#00AEEF]",
  Fiesta: "bg-purple-100 text-purple-700",
  Romántico: "bg-rose-100 text-rose-700",
};

export default async function YateDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const yate = await fetchYateBySlug(slug);
  if (!yate) notFound();

  return (
    <main className="bg-[#F8F5F0] min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-[#0B1E2D] pt-36 pb-6">
        <Container>
          <nav className="flex items-center gap-2 text-xs text-white/40">
            <Link href="/" className="hover:text-white/70 transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/yates" className="hover:text-white/70 transition-colors">Yates</Link>
            <span>/</span>
            <span className="text-white/60">{yate.name}</span>
          </nav>
        </Container>
      </div>

      {/* Hero info bar */}
      <div className="bg-[#0B1E2D] pb-10">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              {/* Badge */}
              {yate.badge && (
                <div className="inline-flex items-center gap-1.5 bg-[#00AEEF] text-white text-[10px] font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4">
                  <Star size={10} className="fill-white" />
                  {yate.badge}
                </div>
              )}
              <h1 className="font-playfair text-4xl md:text-6xl text-white mb-3">
                {yate.name}
              </h1>
              <div className="flex flex-wrap items-center gap-5 text-white/50 text-sm">
                <div className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-[#00AEEF]" />
                  {yate.departureLocation}
                </div>
                <div className="flex items-center gap-1.5">
                  <Users size={14} className="text-[#00AEEF]" />
                  Hasta {yate.maxPeople} personas
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-[#00AEEF]" />
                  {yate.durationHours}h mínimo
                </div>
                <div className="flex items-center gap-1.5">
                  <Anchor size={14} className="text-[#00AEEF]" />
                  {yate.address}
                </div>
              </div>
            </div>

            {/* Experience type tags */}
            {yate.experienceType?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {yate.experienceType.map((exp) => (
                  <span
                    key={exp}
                    className="text-xs font-medium border border-white/20 text-white/60 px-3 py-1.5 rounded-full"
                  >
                    {exp}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Container>
      </div>

      {/* Main content */}
      <Container className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
          {/* Left: Gallery + Details */}
          <div className="lg:col-span-2 space-y-10">
            {/* Gallery */}
            <YateGallery yate={yate} />

            {/* Description */}
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <h2 className="font-playfair text-2xl text-[#0B1E2D] mb-5">
                Sobre este yate
              </h2>
              <p className="text-[#0B1E2D]/65 leading-relaxed text-[15px] whitespace-pre-line">
                {yate.description}
              </p>
            </div>

            {/* Amenities */}
            {yate.details?.amenities?.length > 0 && (
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <h2 className="font-playfair text-2xl text-[#0B1E2D] mb-6">
                  Incluye
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {yate.details.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-3">
                      <CheckCircle size={17} className="text-[#00AEEF] shrink-0" />
                      <span className="text-[#0B1E2D]/70 text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>

                {/* Special highlights */}
                <div className="mt-6 pt-6 border-t border-[#D8C3A5]/30 grid grid-cols-3 gap-4">
                  {yate.details.cevicheIncluded && (
                    <div className="text-center p-4 bg-[#F8F5F0] rounded-2xl">
                      <div className="text-2xl mb-2">🍋</div>
                      <p className="text-xs text-[#0B1E2D]/60 font-medium">Ceviche incluido</p>
                    </div>
                  )}
                  {yate.details.floatingMat && (
                    <div className="text-center p-4 bg-[#F8F5F0] rounded-2xl">
                      <div className="text-2xl mb-2">🌊</div>
                      <p className="text-xs text-[#0B1E2D]/60 font-medium">Tapete flotante</p>
                    </div>
                  )}
                  {yate.details.lifeJackets && (
                    <div className="text-center p-4 bg-[#F8F5F0] rounded-2xl">
                      <div className="text-2xl mb-2">🦺</div>
                      <p className="text-xs text-[#0B1E2D]/60 font-medium">Chalecos salvavidas</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Experience types detail */}
            {yate.experienceType?.length > 0 && (
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <h2 className="font-playfair text-2xl text-[#0B1E2D] mb-6">
                  Tipos de experiencia
                </h2>
                <div className="flex flex-wrap gap-3">
                  {yate.experienceType.map((exp) => (
                    <span
                      key={exp}
                      className={`text-sm font-medium px-4 py-2 rounded-full ${
                        EXPERIENCE_COLORS[exp] ?? "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Booking Panel */}
          <div className="lg:col-span-1">
            <BookingPanel yate={yate} />
          </div>
        </div>
      </Container>

      {/* Back CTA */}
      <div className="bg-[#0B1E2D] py-16">
        <Container className="text-center">
          <p className="text-white/50 text-sm mb-4">¿Quieres explorar más opciones?</p>
          <Link
            href="/yates"
            className="inline-flex items-center gap-2 bg-[#00AEEF] text-white font-medium px-7 py-3.5 rounded-full hover:bg-[#0090c7] transition-colors shadow-lg shadow-[#00AEEF]/20"
          >
            <Anchor size={16} />
            Ver todos los yates
          </Link>
        </Container>
      </div>
    </main>
  );
}
