import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MapPin, Users, Clock, ArrowLeft, CheckCircle, Star, Tag, Map } from "lucide-react";
import Container from "@/components/ui/Container";
import TourGallery from "@/components/tours/TourGallery";
import TourContactPanel from "@/components/tours/TourContactPanel";
import { fetchTourBySlug, fetchTours } from "@/lib/api";
import { getTourImageUrl, DIFFICULTY_STYLES } from "@/types/tour";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const tours = await fetchTours();
  return tours.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = await fetchTourBySlug(slug);
  if (!tour) return { title: "Tour no encontrado" };
  return {
    title: tour.seoTitle || `${tour.name} · San Carlos`,
    description: tour.seoDescription || tour.shortDescription,
  };
}

export default async function TourDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const tour = await fetchTourBySlug(slug);
  if (!tour) notFound();

  const coverUrl = tour.coverImage
    ? getTourImageUrl(tour.collectionId, tour.id, tour.coverImage, "1400x800")
    : "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&q=85";

  const hasPrice = tour.price > 0;
  const difficulty = tour.details?.difficulty;
  const diffStyle = difficulty ? DIFFICULTY_STYLES[difficulty] : null;

  return (
    <main className="bg-[#F4F1EC] min-h-screen">

      {/* ── FULLSCREEN HERO ── */}
      <section className="relative h-[88vh] min-h-[580px] max-h-[820px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${coverUrl}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080f17] via-[#0B1E2D]/25 to-[#0B1E2D]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1E2D]/50 via-transparent to-transparent" />

        {/* Back nav */}
        <div className="absolute top-0 left-0 right-0 pt-24 pb-6 z-10">
          <Container>
            <Link
              href="/tours"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors group"
            >
              <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
              Todos los tours
            </Link>
          </Container>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pb-14">
          <Container>
            <div className="max-w-3xl">
              {/* Badge */}
              {tour.badge && (
                <div className="inline-flex items-center gap-1.5 bg-[#00AEEF] text-white text-[10px] font-bold tracking-[0.25em] uppercase px-3.5 py-1.5 rounded-full mb-5 shadow-lg shadow-[#00AEEF]/30">
                  <Star size={9} className="fill-white" />
                  {tour.badge}
                </div>
              )}

              <h1
                className="font-playfair text-5xl md:text-7xl lg:text-8xl text-white leading-none mb-6"
                style={{ textShadow: "0 4px 32px rgba(0,0,0,0.4)" }}
              >
                {tour.name}
              </h1>

              {/* Stats row */}
              <div className="flex flex-wrap items-center gap-x-7 gap-y-3 text-white/65 text-sm mb-8">
                <span className="flex items-center gap-2">
                  <MapPin size={14} className="text-[#00AEEF]" />
                  {tour.departureLocation}
                </span>
                <span className="w-px h-4 bg-white/20 hidden sm:block" />
                <span className="flex items-center gap-2">
                  <Users size={14} className="text-[#00AEEF]" />
                  Hasta {tour.maxPeople} personas
                </span>
                <span className="w-px h-4 bg-white/20 hidden sm:block" />
                <span className="flex items-center gap-2">
                  <Clock size={14} className="text-[#00AEEF]" />
                  {tour.durationHours}h de duración
                </span>
                {tour.details?.startTime && (
                  <>
                    <span className="w-px h-4 bg-white/20 hidden sm:block" />
                    <span className="flex items-center gap-2">
                      <Tag size={14} className="text-[#00AEEF]" />
                      {tour.details.startTime}
                    </span>
                  </>
                )}
              </div>

              {/* Chips */}
              <div className="flex flex-wrap gap-2">
                {diffStyle && difficulty && (
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full ${diffStyle.bg} ${diffStyle.text}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${diffStyle.dot}`} />
                    Dificultad: {difficulty}
                  </span>
                )}
                {tour.details?.guideIncluded && (
                  <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-medium px-3.5 py-1.5 rounded-full">
                    🧭 Guía incluido
                  </span>
                )}
                {tour.details?.natureExperience && (
                  <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-medium px-3.5 py-1.5 rounded-full">
                    🌿 Ecoturismo
                  </span>
                )}
                {tour.details?.wildlifeWatching && (
                  <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-medium px-3.5 py-1.5 rounded-full">
                    🦅 Avistamiento de fauna
                  </span>
                )}
              </div>
            </div>
          </Container>
        </div>

        {/* Price bubble */}
        <div className="absolute bottom-14 right-6 md:right-10 z-10 text-right hidden md:block">
          {hasPrice ? (
            <>
              <p className="text-white/40 text-xs mb-1">desde</p>
              <p className="font-playfair text-4xl text-white leading-none">
                ${tour.price.toLocaleString("es-MX")}
              </p>
              <p className="text-white/40 text-xs mt-1">{tour.currency} / persona</p>
            </>
          ) : (
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-3 rounded-2xl">
              <p className="text-[#00AEEF] text-sm font-semibold">Precio a consultar</p>
            </div>
          )}
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <Container className="py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 xl:gap-16">

          {/* ── LEFT 3/5 ── */}
          <div className="lg:col-span-3 space-y-8">

            {/* Gallery */}
            <TourGallery tour={tour} />

            {/* Description */}
            <div className="bg-white rounded-[1.75rem] p-8 shadow-sm border border-[#D8C3A5]/20">
              <p className="text-[#00AEEF] text-[10px] tracking-[0.3em] uppercase font-semibold mb-3">
                Sobre este tour
              </p>
              <p className="font-playfair text-2xl text-[#0B1E2D] leading-snug mb-5">
                {tour.shortDescription}
              </p>
              <p className="text-[#0B1E2D]/55 leading-relaxed text-[15px] whitespace-pre-line">
                {tour.description}
              </p>
            </div>

            {/* Amenities / includes */}
            {tour.details?.amenities?.length > 0 && (
              <div className="bg-white rounded-[1.75rem] p-8 shadow-sm border border-[#D8C3A5]/20">
                <p className="text-[#00AEEF] text-[10px] tracking-[0.3em] uppercase font-semibold mb-5">
                  Incluye
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {tour.details.amenities.map((item) => (
                    <div key={item} className="flex items-center gap-3 py-2">
                      <div className="w-6 h-6 rounded-full bg-[#00AEEF]/10 flex items-center justify-center shrink-0">
                        <CheckCircle size={13} className="text-[#00AEEF]" />
                      </div>
                      <span className="text-[#0B1E2D]/70 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Highlights grid */}
            {(tour.details?.guideIncluded || tour.details?.natureExperience || tour.details?.wildlifeWatching || difficulty) && (
              <div className="bg-white rounded-[1.75rem] p-8 shadow-sm border border-[#D8C3A5]/20">
                <p className="text-[#00AEEF] text-[10px] tracking-[0.3em] uppercase font-semibold mb-5">
                  Características
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {difficulty && diffStyle && (
                    <div className={`flex flex-col items-center text-center gap-2 p-4 rounded-2xl ${diffStyle.bg}`}>
                      <span className="text-2xl">🥾</span>
                      <div>
                        <p className={`text-xs font-semibold ${diffStyle.text}`}>{difficulty}</p>
                        <p className="text-[#0B1E2D]/40 text-[10px] mt-0.5">Dificultad</p>
                      </div>
                    </div>
                  )}
                  {tour.details?.guideIncluded && (
                    <div className="flex flex-col items-center text-center gap-2 p-4 rounded-2xl bg-[#F4F1EC]">
                      <span className="text-2xl">🧭</span>
                      <div>
                        <p className="text-xs font-semibold text-[#0B1E2D]/70">Guía turístico</p>
                        <p className="text-[#0B1E2D]/40 text-[10px] mt-0.5">Incluido</p>
                      </div>
                    </div>
                  )}
                  {tour.details?.natureExperience && (
                    <div className="flex flex-col items-center text-center gap-2 p-4 rounded-2xl bg-[#F4F1EC]">
                      <span className="text-2xl">🌿</span>
                      <div>
                        <p className="text-xs font-semibold text-[#0B1E2D]/70">Ecoturismo</p>
                        <p className="text-[#0B1E2D]/40 text-[10px] mt-0.5">Experiencia natural</p>
                      </div>
                    </div>
                  )}
                  {tour.details?.wildlifeWatching && (
                    <div className="flex flex-col items-center text-center gap-2 p-4 rounded-2xl bg-[#F4F1EC]">
                      <span className="text-2xl">🦅</span>
                      <div>
                        <p className="text-xs font-semibold text-[#0B1E2D]/70">Fauna local</p>
                        <p className="text-[#0B1E2D]/40 text-[10px] mt-0.5">Avistamiento</p>
                      </div>
                    </div>
                  )}
                  {tour.details?.startTime && (
                    <div className="flex flex-col items-center text-center gap-2 p-4 rounded-2xl bg-[#F4F1EC]">
                      <span className="text-2xl">⏰</span>
                      <div>
                        <p className="text-xs font-semibold text-[#0B1E2D]/70">{tour.details.startTime}</p>
                        <p className="text-[#0B1E2D]/40 text-[10px] mt-0.5">Hora de salida</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT 2/5 ── */}
          <div className="lg:col-span-2">
            <TourContactPanel tour={tour} />
          </div>
        </div>
      </Container>

      {/* ── Bottom CTA ── */}
      <div className="bg-[#0B1E2D] py-16 mt-6">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-playfair text-2xl text-white mb-1">¿Te interesa este tour?</p>
              <p className="text-white/40 text-sm">También puedes explorar más experiencias en San Carlos.</p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/yates"
                className="flex items-center gap-2 border border-white/20 text-white/70 hover:text-white hover:border-white/40 text-sm font-medium px-5 py-3 rounded-full transition-all"
              >
                Ver Yates
              </Link>
              <Link
                href="/tours"
                className="flex items-center gap-2 bg-[#00AEEF] text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#0090c7] transition-all shadow-lg shadow-[#00AEEF]/20"
              >
                <Map size={15} />
                Más tours
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </main>
  );
}
