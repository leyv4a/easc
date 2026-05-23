"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { MessageCircle, Users, Phone, Calendar, ChevronRight, MapPin, BedDouble, Bath, Waves, Minus, Plus } from "lucide-react";
import type { Hospedaje } from "@/types/hospedaje";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

interface HospedajeBookingPanelProps {
  hospedaje: Hospedaje;
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function calcTotal(nights: number, pricing?: Hospedaje["details"]["pricing"], basePrice?: number): number {
  if (!pricing && basePrice) return basePrice * nights;
  if (!pricing) return 0;
  if (nights === 1 && pricing["1_night"]) return pricing["1_night"]!;
  if (nights === 2 && pricing["2_nights"]) return pricing["2_nights"]!;
  if (nights > 2) {
    const base = pricing["2_nights"] ?? (pricing["1_night"] ? pricing["1_night"]! * 2 : 0);
    const extra = pricing["extra_night"] ?? pricing["1_night"] ?? 0;
    return base + (nights - 2) * extra;
  }
  return (basePrice ?? 0) * nights;
}

export default function HospedajeBookingPanel({ hospedaje }: HospedajeBookingPanelProps) {
  const [checkIn, setCheckIn] = useState<Date | undefined>(undefined);
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);
  const [nights, setNights] = useState(1);
  const [guests, setGuests] = useState(1);

  const checkOut = checkIn ? addDays(checkIn, nights) : undefined;
  const pricing = hospedaje.details?.pricing;
  const total = calcTotal(nights, pricing, hospedaje.price);

  const waMessage = encodeURIComponent(
    `Hola! Me interesa el hospedaje *${hospedaje.name}* 🏠\n\n` +
    (checkIn ? `📅 Check-in: ${format(checkIn, "EEEE d 'de' MMMM yyyy", { locale: es })}\n` : "") +
    (checkOut ? `📅 Check-out: ${format(checkOut, "EEEE d 'de' MMMM yyyy", { locale: es })}\n` : "") +
    `🌙 Noches: ${nights}\n` +
    `👥 Huéspedes: ${guests}\n` +
    (total ? `💰 Total estimado: $${total.toLocaleString("es-MX")} ${hospedaje.currency}\n` : "") +
    `\n¿Está disponible?`
  );

  const hasWhatsapp = !!hospedaje.whatsapp;
  const hasPhone = !!hospedaje.phone;
  const waUrl = `https://wa.me/${hospedaje.whatsapp.replace(/\D/g, "")}?text=${waMessage}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.5 }}
      className="sticky top-28"
    >
      <div className="bg-white rounded-[2rem] overflow-hidden shadow-2xl shadow-[#0B1E2D]/15 border border-[#D8C3A5]/20">

        {/* ── Header ── */}
        <div className="relative bg-[#0B1E2D] px-7 pt-7 pb-9">
          <div className="absolute inset-0 opacity-[0.035]"
            style={{ backgroundImage: "repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 40px),repeating-linear-gradient(#fff 0,#fff 1px,transparent 1px,transparent 40px)" }}
          />
          <p className="relative text-[#00AEEF] text-[10px] tracking-[0.35em] uppercase font-semibold mb-2">
            Desde
          </p>
          <div className="relative flex items-end gap-2">
            <span className="font-playfair text-[2.6rem] leading-none text-white">
              ${hospedaje.price.toLocaleString("es-MX")}
            </span>
            <span className="text-white/35 text-sm mb-1.5">{hospedaje.currency} / noche</span>
          </div>

          {/* Quick facts */}
          <div className="relative flex flex-wrap gap-4 mt-3 text-white/30 text-xs">
            {hospedaje.details?.rooms && (
              <span className="flex items-center gap-1.5">
                <BedDouble size={11} />
                {hospedaje.details.rooms} {hospedaje.details.rooms === 1 ? "habitación" : "habitaciones"}
              </span>
            )}
            {hospedaje.details?.bathrooms && (
              <span className="flex items-center gap-1.5">
                <Bath size={11} />
                {hospedaje.details.bathrooms} {hospedaje.details.bathrooms === 1 ? "baño" : "baños"}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Users size={11} />
              Máx. {hospedaje.maxPeople} personas
            </span>
            {hospedaje.details?.distanceToBeachMeters && (
              <span className="flex items-center gap-1.5">
                <Waves size={11} />
                {hospedaje.details.distanceToBeachMeters}m de la playa
              </span>
            )}
          </div>

          <svg className="absolute -bottom-px left-0 right-0 w-full" viewBox="0 0 400 16" preserveAspectRatio="none">
            <path d="M0 16 Q100 0 200 8 Q300 16 400 4 L400 16 Z" fill="white" />
          </svg>
        </div>

        {/* ── Form ── */}
        <div className="px-7 pt-8 pb-7 space-y-5">

          {/* Check-in / Check-out */}
          <div className="grid grid-cols-2 gap-2">
            {/* Check-in */}
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5 text-[10px] text-[#0B1E2D]/40 font-bold uppercase tracking-[0.2em]">
                <Calendar size={10} className="text-[#00AEEF]" />
                Check-in
              </Label>
              <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
                <PopoverTrigger asChild>
                  <button className="flex h-11 w-full items-center gap-2 rounded-2xl bg-[#F8F5F0] px-3 text-sm border border-transparent hover:border-[#D8C3A5]/60 focus:outline-none focus:ring-2 focus:ring-[#00AEEF]/40 transition-all text-left">
                    <Calendar size={13} className={checkIn ? "text-[#00AEEF] shrink-0" : "text-[#0B1E2D]/25 shrink-0"} />
                    <span className={`truncate text-xs ${checkIn ? "text-[#0B1E2D]" : "text-[#0B1E2D]/35"}`}>
                      {checkIn ? format(checkIn, "d MMM", { locale: es }) : "Llegada"}
                    </span>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    selected={checkIn}
                    onSelect={(d) => { if (d) { setCheckIn(d); setCheckInOpen(false); } }}
                    disabled={{ before: new Date() }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Check-out (calculado) */}
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5 text-[10px] text-[#0B1E2D]/40 font-bold uppercase tracking-[0.2em]">
                <Calendar size={10} className="text-[#00AEEF]" />
                Check-out
              </Label>
              <div className="flex h-11 w-full items-center gap-2 rounded-2xl bg-[#F8F5F0] px-3 border border-transparent">
                <Calendar size={13} className={checkOut ? "text-[#00AEEF] shrink-0" : "text-[#0B1E2D]/25 shrink-0"} />
                <span className={`truncate text-xs ${checkOut ? "text-[#0B1E2D]" : "text-[#0B1E2D]/35"}`}>
                  {checkOut ? format(checkOut, "d MMM", { locale: es }) : "Salida"}
                </span>
              </div>
            </div>
          </div>

          {/* Noches */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-[10px] text-[#0B1E2D]/40 font-bold uppercase tracking-[0.2em]">
              🌙 Noches
            </Label>
            <div className="flex items-center bg-[#F8F5F0] rounded-2xl overflow-hidden h-11">
              <button
                onClick={() => setNights((n) => Math.max(1, n - 1))}
                disabled={nights <= 1}
                className="w-12 h-full flex items-center justify-center text-[#0B1E2D]/40 hover:text-[#0B1E2D] hover:bg-[#0B1E2D]/5 transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
              >
                <Minus size={16} />
              </button>
              <div className="flex-1 text-center">
                <span className="text-[#0B1E2D] font-bold text-lg">{nights}</span>
                <span className="text-[#0B1E2D]/35 text-xs ml-1.5">
                  {nights === 1 ? "noche" : "noches"}
                </span>
              </div>
              <button
                onClick={() => setNights((n) => n + 1)}
                className="w-12 h-full flex items-center justify-center text-[#0B1E2D]/40 hover:text-[#0B1E2D] hover:bg-[#0B1E2D]/5 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Huéspedes */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-[10px] text-[#0B1E2D]/40 font-bold uppercase tracking-[0.2em]">
              <Users size={11} className="text-[#00AEEF]" />
              Huéspedes
              <span className="text-[#0B1E2D]/25 font-normal normal-case tracking-normal">(máx. {hospedaje.maxPeople})</span>
            </Label>
            <div className="flex items-center bg-[#F8F5F0] rounded-2xl overflow-hidden h-11">
              <button
                onClick={() => setGuests((g) => Math.max(1, g - 1))}
                disabled={guests <= 1}
                className="w-12 h-full flex items-center justify-center text-[#0B1E2D]/40 hover:text-[#0B1E2D] hover:bg-[#0B1E2D]/5 transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
              >
                <Minus size={16} />
              </button>
              <div className="flex-1 text-center">
                <span className="text-[#0B1E2D] font-bold text-lg">{guests}</span>
                <span className="text-[#0B1E2D]/35 text-xs ml-1.5">
                  {guests === 1 ? "huésped" : "huéspedes"}
                </span>
              </div>
              <button
                onClick={() => setGuests((g) => Math.min(hospedaje.maxPeople, g + 1))}
                disabled={guests >= hospedaje.maxPeople}
                className="w-12 h-full flex items-center justify-center text-[#0B1E2D]/40 hover:text-[#0B1E2D] hover:bg-[#0B1E2D]/5 transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Pricing breakdown */}
          {pricing && (
            <div className="space-y-1.5">
              {pricing["1_night"] && (
                <div className="flex justify-between text-sm">
                  <span className="text-[#0B1E2D]/50">1 noche</span>
                  <span className="text-[#0B1E2D]/70 font-medium">${pricing["1_night"]!.toLocaleString("es-MX")}</span>
                </div>
              )}
              {pricing["2_nights"] && (
                <div className="flex justify-between text-sm">
                  <span className="text-[#0B1E2D]/50">2 noches</span>
                  <span className="text-[#0B1E2D]/70 font-medium">${pricing["2_nights"]!.toLocaleString("es-MX")}</span>
                </div>
              )}
              {pricing["extra_night"] && (
                <div className="flex justify-between text-sm">
                  <span className="text-[#0B1E2D]/50">Noche extra</span>
                  <span className="text-[#0B1E2D]/70 font-medium">+${pricing["extra_night"]!.toLocaleString("es-MX")}</span>
                </div>
              )}
            </div>
          )}

          {/* Total */}
          <div className="bg-gradient-to-br from-[#F8F5F0] to-[#D8C3A5]/20 rounded-2xl px-5 py-4 flex items-center justify-between border border-[#D8C3A5]/30">
            <div>
              <p className="text-[#0B1E2D]/40 text-xs mb-1">Total estimado</p>
              <p className="text-[#0B1E2D]/45 text-[11px]">
                {nights} {nights === 1 ? "noche" : "noches"} · {guests} {guests === 1 ? "huésped" : "huéspedes"}
                {checkIn && ` · desde ${format(checkIn, "d MMM", { locale: es })}`}
              </p>
            </div>
            <div className="text-right">
              <p className="font-playfair text-[1.9rem] leading-none text-[#0B1E2D]">
                ${total.toLocaleString("es-MX")}
              </p>
              <p className="text-[#0B1E2D]/30 text-[10px] mt-0.5">{hospedaje.currency}</p>
            </div>
          </div>

          {/* WhatsApp */}
          {hasWhatsapp ? (
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between w-full bg-[#25D366] text-white font-semibold py-4 px-6 rounded-2xl hover:bg-[#1ebe5d] transition-all shadow-xl shadow-[#25D366]/25 hover:shadow-[#25D366]/40 hover:-translate-y-0.5 active:translate-y-0"
            >
              <div className="flex items-center gap-3">
                <MessageCircle size={21} className="fill-white shrink-0" />
                <div className="text-left">
                  <p className="text-sm font-bold leading-none">Reservar por WhatsApp</p>
                  <p className="text-white/65 text-[10px] mt-1">
                    {checkIn
                      ? `${format(checkIn, "d MMM", { locale: es })} · ${nights} ${nights === 1 ? "noche" : "noches"}`
                      : "Consultar disponibilidad"}
                  </p>
                </div>
              </div>
              <ChevronRight size={18} className="opacity-50 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </a>
          ) : (
            <div className="flex items-center justify-center gap-2 w-full bg-[#F8F5F0] border border-[#D8C3A5]/40 text-[#0B1E2D]/40 py-4 rounded-2xl text-sm">
              <MessageCircle size={16} />
              WhatsApp no disponible
            </div>
          )}

          {/* Llamar */}
          {hasPhone && (
            <a
              href={`tel:${hospedaje.phone}`}
              className="flex items-center justify-center gap-2 w-full border border-[#0B1E2D]/10 text-[#0B1E2D]/50 hover:text-[#0B1E2D] hover:border-[#0B1E2D]/25 font-medium py-3 rounded-2xl transition-all text-sm"
            >
              <Phone size={14} />
              {hospedaje.phone}
            </a>
          )}

          {hospedaje.contactName && (
            <p className="text-center text-[#0B1E2D]/25 text-[11px] -mt-2">
              Atendido por{" "}
              <span className="text-[#0B1E2D]/45 font-medium">{hospedaje.contactName}</span>
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
