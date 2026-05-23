import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MapPin, Users, ArrowLeft, CheckCircle, Star, BedDouble, Bath, Waves } from "lucide-react";
import Container from "@/components/ui/Container";
import HospedajeGallery from "@/components/hospedaje/HospedajeGallery";
import HospedajeBookingPanel from "@/components/hospedaje/HospedajeBookingPanel";
import { fetchHospedajeBySlug, fetchHospedajes } from "@/lib/api";
import { getHospedajeImageUrl } from "@/types/hospedaje";
import type { Hospedaje } from "@/types/hospedaje";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// ── Helpers (mismo patrón que HospedajeCard) ────────────────────────────────

const BOOLEAN_AMENITIES: { key: keyof Hospedaje["details"]; emoji: string; label: string }[] = [
  { key: "airConditioning",  emoji: "❄️",  label: "Aire acondicionado" },
  { key: "kitchenIncluded",  emoji: "🍳",  label: "Cocina incluida"    },
  { key: "wifiIncluded",     emoji: "📶",  label: "WiFi"               },
  { key: "poolIncluded",     emoji: "🏊",  label: "Piscina"            },
  { key: "bbqIncluded",      emoji: "🔥",  label: "Área BBQ"           },
  { key: "petFriendly",      emoji: "🐾",  label: "Pet friendly"       },
  { key: "bathroom",         emoji: "🚿",  label: "Baño privado"       },
  { key: "soundSystem",      emoji: "🔊",  label: "Sistema de sonido"  },
  { key: "kayakIncluded",    emoji: "🛶",  label: "Kayak incluido"     },
];

function getActiveAmenities(details: Hospedaje["details"]) {
  return BOOLEAN_AMENITIES.filter(({ key }) => !!details?.[key]);
}

const PRICING_LABELS: Record<string, string> = {
  "1_day":    "1 día",
  "2_days":   "2 días",
  "3_days":   "3 días",
  "4_days":   "4 días",
  "5_days":   "5 días",
  "6_days":   "6 días",
  "7_days":   "7 días",
  "extra_day": "Día extra",
  // backward compat
  "1_night":    "1 noche",
  "2_nights":   "2 noches",
  "extra_night": "Noche extra",
};

function getPricingEntries(pricing?: Hospedaje["details"]["pricing"]) {
  if (!pricing) return [];
  return Object.entries(pricing)
    .filter(([, v]) => v != null && v > 0)
    .map(([key, value]) => ({ label: PRICING_LABELS[key] ?? key, value: value as number }));
}

// ── Page ────────────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const hospedajes = await fetchHospedajes();
  return hospedajes.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const hospedaje = await fetchHospedajeBySlug(slug);
  if (!hospedaje) return { title: "Hospedaje no encontrado" };
  return {
    title: hospedaje.seoTitle || `${hospedaje.name} · San Carlos`,
    description: hospedaje.seoDescription || hospedaje.shortDescription,
  };
}

export default async function HospedajeDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const hospedaje = await fetchHospedajeBySlug(slug);
  if (!hospedaje) notFound();

  const coverUrl = hospedaje.coverImage
    ? getHospedajeImageUrl(hospedaje.collectionId, hospedaje.id, hospedaje.coverImage, "1400x800")
    : "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1400&q=85";

  const pricingEntries = getPricingEntries(hospedaje.details?.pricing);
  const amenidades = getActiveAmenities(hospedaje.details);
  const distancia = hospedaje.details?.distanceToBeachMeters;

  return (
    <main className="bg-[#F4F1EC] min-h-screen">

      {/* ── HERO ── */}
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
              href="/hospedaje"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors group"
            >
              <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
              Todos los hospedajes
            </Link>
          </Container>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pb-14">
          <Container>
            <div className="max-w-3xl">
              {hospedaje.badge && (
                <div className="inline-flex items-center gap-1.5 bg-[#00AEEF] text-white text-[10px] font-bold tracking-[0.25em] uppercase px-3.5 py-1.5 rounded-full mb-5 shadow-lg shadow-[#00AEEF]/30">
                  <Star size={9} className="fill-white" />
                  {hospedaje.badge}
                </div>
              )}

              <h1
                className="font-playfair text-5xl md:text-7xl lg:text-8xl text-white leading-none mb-6"
                style={{ textShadow: "0 4px 32px rgba(0,0,0,0.4)" }}
              >
                {hospedaje.name}
              </h1>

              <div className="flex flex-wrap items-center gap-x-7 gap-y-3 text-white/65 text-sm mb-8">
                <span className="flex items-center gap-2">
                  <MapPin size={14} className="text-[#00AEEF]" />
                  {hospedaje.address}
                </span>
                <span className="w-px h-4 bg-white/20 hidden sm:block" />
                <span className="flex items-center gap-2">
                  <Users size={14} className="text-[#00AEEF]" />
                  Hasta {hospedaje.maxPeople} personas
                </span>
                {hospedaje.details?.rooms && (
                  <>
                    <span className="w-px h-4 bg-white/20 hidden sm:block" />
                    <span className="flex items-center gap-2">
                      <BedDouble size={14} className="text-[#00AEEF]" />
                      {hospedaje.details.rooms} {hospedaje.details.rooms === 1 ? "habitación" : "habitaciones"}
                    </span>
                  </>
                )}
                {hospedaje.details?.bathrooms && (
                  <>
                    <span className="w-px h-4 bg-white/20 hidden sm:block" />
                    <span className="flex items-center gap-2">
                      <Bath size={14} className="text-[#00AEEF]" />
                      {hospedaje.details.bathrooms} {hospedaje.details.bathrooms === 1 ? "baño" : "baños"}
                    </span>
                  </>
                )}
                {distancia && (
                  <>
                    <span className="w-px h-4 bg-white/20 hidden sm:block" />
                    <span className="flex items-center gap-2">
                      <Waves size={14} className="text-[#00AEEF]" />
                      {distancia < 1000 ? `${distancia}m` : `${(distancia / 1000).toFixed(1)}km`} de la playa
                    </span>
                  </>
                )}
              </div>

              {/* Feature chips desde booleanos */}
              {amenidades.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {amenidades.slice(0, 5).map(({ key, emoji, label }) => (
                    <span
                      key={key}
                      className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-medium px-3.5 py-1.5 rounded-full"
                    >
                      {emoji} {label}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Container>
        </div>

        {/* Price bubble */}
        <div className="absolute bottom-14 right-6 md:right-10 z-10 text-right hidden md:block">
          <p className="text-white/40 text-xs mb-1">desde</p>
          <p className="font-playfair text-4xl text-white leading-none">
            ${hospedaje.price.toLocaleString("es-MX")}
          </p>
          <p className="text-white/40 text-xs mt-1">{hospedaje.currency} / día</p>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <Container className="py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 xl:gap-16">

          {/* ── LEFT 3/5 ── */}
          <div className="lg:col-span-3 space-y-8">

            <HospedajeGallery hospedaje={hospedaje} />

            {/* Description */}
            <div className="bg-white rounded-[1.75rem] p-8 shadow-sm border border-[#D8C3A5]/20">
              <p className="text-[#00AEEF] text-[10px] tracking-[0.3em] uppercase font-semibold mb-3">
                Sobre este hospedaje
              </p>
              <p className="font-playfair text-2xl text-[#0B1E2D] leading-snug mb-5">
                {hospedaje.shortDescription}
              </p>
              <p className="text-[#0B1E2D]/55 leading-relaxed text-[15px] whitespace-pre-line">
                {hospedaje.description}
              </p>
            </div>

            {/* Amenidades desde booleanos */}
            {amenidades.length > 0 && (
              <div className="bg-white rounded-[1.75rem] p-8 shadow-sm border border-[#D8C3A5]/20">
                <p className="text-[#00AEEF] text-[10px] tracking-[0.3em] uppercase font-semibold mb-5">
                  Lo que incluye
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {amenidades.map(({ key, emoji, label }) => (
                    <div key={key} className="flex items-center gap-3 py-2">
                      <div className="w-8 h-8 rounded-full bg-[#00AEEF]/10 flex items-center justify-center shrink-0 text-base">
                        {emoji}
                      </div>
                      <span className="text-[#0B1E2D]/70 text-sm">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tarifas */}
            {pricingEntries.length > 0 && (
              <div className="bg-white rounded-[1.75rem] p-8 shadow-sm border border-[#D8C3A5]/20">
                <p className="text-[#00AEEF] text-[10px] tracking-[0.3em] uppercase font-semibold mb-5">
                  Tarifas
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {pricingEntries.map(({ label, value }, i) => (
                    <div
                      key={label}
                      className={`rounded-2xl p-5 text-center ${
                        i === 0 ? "bg-[#0B1E2D]" : "bg-[#F4F1EC]"
                      }`}
                    >
                      <p className={`font-playfair text-2xl mb-1 ${i === 0 ? "text-white" : "text-[#0B1E2D]"}`}>
                        ${value.toLocaleString("es-MX")}
                      </p>
                      <p className={`text-xs ${i === 0 ? "text-white/40" : "text-[#0B1E2D]/40"}`}>
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Detalles del alojamiento */}
            {(hospedaje.details?.rooms || hospedaje.details?.bathrooms || hospedaje.maxPeople || distancia) && (
              <div className="bg-white rounded-[1.75rem] p-8 shadow-sm border border-[#D8C3A5]/20">
                <p className="text-[#00AEEF] text-[10px] tracking-[0.3em] uppercase font-semibold mb-5">
                  Detalles del alojamiento
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {hospedaje.details?.rooms && (
                    <div className="flex flex-col items-center text-center gap-2 p-4 bg-[#F4F1EC] rounded-2xl">
                      <BedDouble size={22} className="text-[#00AEEF]" />
                      <div>
                        <p className="font-semibold text-[#0B1E2D] text-sm">{hospedaje.details.rooms}</p>
                        <p className="text-[#0B1E2D]/40 text-[10px]">{hospedaje.details.rooms === 1 ? "Habitación" : "Habitaciones"}</p>
                      </div>
                    </div>
                  )}
                  {hospedaje.details?.bathrooms && (
                    <div className="flex flex-col items-center text-center gap-2 p-4 bg-[#F4F1EC] rounded-2xl">
                      <Bath size={22} className="text-[#00AEEF]" />
                      <div>
                        <p className="font-semibold text-[#0B1E2D] text-sm">{hospedaje.details.bathrooms}</p>
                        <p className="text-[#0B1E2D]/40 text-[10px]">{hospedaje.details.bathrooms === 1 ? "Baño" : "Baños"}</p>
                      </div>
                    </div>
                  )}
                  {hospedaje.maxPeople && (
                    <div className="flex flex-col items-center text-center gap-2 p-4 bg-[#F4F1EC] rounded-2xl">
                      <Users size={22} className="text-[#00AEEF]" />
                      <div>
                        <p className="font-semibold text-[#0B1E2D] text-sm">{hospedaje.maxPeople}</p>
                        <p className="text-[#0B1E2D]/40 text-[10px]">Huéspedes máx.</p>
                      </div>
                    </div>
                  )}
                  {distancia && (
                    <div className="flex flex-col items-center text-center gap-2 p-4 bg-[#F4F1EC] rounded-2xl">
                      <Waves size={22} className="text-[#00AEEF]" />
                      <div>
                        <p className="font-semibold text-[#0B1E2D] text-sm">
                          {distancia < 1000 ? `${distancia}m` : `${(distancia / 1000).toFixed(1)}km`}
                        </p>
                        <p className="text-[#0B1E2D]/40 text-[10px]">De la playa</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT 2/5 ── */}
          <div className="lg:col-span-2">
            <HospedajeBookingPanel hospedaje={hospedaje} />
          </div>
        </div>
      </Container>

      {/* ── Bottom CTA ── */}
      <div className="bg-[#0B1E2D] py-16 mt-6">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-playfair text-2xl text-white mb-1">¿Te interesa este hospedaje?</p>
              <p className="text-white/40 text-sm">También puedes explorar más opciones de alojamiento.</p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/tours"
                className="flex items-center gap-2 border border-white/20 text-white/70 hover:text-white hover:border-white/40 text-sm font-medium px-5 py-3 rounded-full transition-all"
              >
                Ver Tours
              </Link>
              <Link
                href="/hospedaje"
                className="flex items-center gap-2 bg-[#00AEEF] text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#0090c7] transition-all shadow-lg shadow-[#00AEEF]/20"
              >
                <BedDouble size={15} />
                Más hospedajes
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </main>
  );
}