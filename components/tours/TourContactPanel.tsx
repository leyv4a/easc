"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  MessageCircle,
  Users,
  Phone,
  Calendar,
  ChevronRight,
  MapPin,
  Clock,
  Tag,
  Minus,
  Plus,
} from "lucide-react";
import type { Tour } from "@/types/tour";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TourContactPanelProps {
  tour: Tour;
}

function generateTimeSlots(): string[] {
  const slots: string[] = [];
  for (let h = 0; h < 24; h++) {
    for (const m of [0, 30]) {
      const h12 = h % 12 === 0 ? 12 : h % 12;
      const ampm = h < 12 ? "AM" : "PM";
      slots.push(`${h12}:${m === 0 ? "00" : "30"} ${ampm}`);
    }
  }
  return slots;
}

const TIME_SLOTS = generateTimeSlots();

export default function TourContactPanel({ tour }: TourContactPanelProps) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [calOpen, setCalOpen] = useState(false);
  const [timeSlot, setTimeSlot] = useState<string>("");
  // const [people, setPeople] = useState(2);
  const minPeople = tour.minPeople ?? 1;
  const [people, setPeople] = useState(minPeople);

  const hasPrice = tour.price > 0;
  const total = hasPrice ? tour.price * people : null;

  // Pre-select the tour's startTime if only one option
  useEffect(() => {
    if (tour.details?.startTime && !timeSlot) {
      // e.g. "5:00 AM - 6:00 AM" — use first part as suggestion
      const firstTime = tour.details.startTime.split("-")[0].trim();
      // only pre-select if it's an exact match in TIME_SLOTS
      if (TIME_SLOTS.includes(firstTime)) setTimeSlot(firstTime);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const waMessage = encodeURIComponent(
    `👋 ¡Hola! Me interesa el tour *${tour.name}*\n\n` +
      (date
        ? `📅 Fecha: ${format(date, "EEEE d 'de' MMMM yyyy", { locale: es })}\n`
        : "") +
      (timeSlot ? `⏰ Hora: ${timeSlot}\n` : "") +
      `👥 Personas: ${people}\n` +
      (total
        ? `💰 Total estimado: $${total.toLocaleString("es-MX")} ${tour.currency}\n`
        : "") +
      `\n¿Cuál es la disponibilidad? 🤔`,
  );

  const waUrl = `https://wa.me/${tour.whatsapp.replace(/\D/g, "")}?text=${waMessage}`;

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
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 40px),repeating-linear-gradient(#fff 0,#fff 1px,transparent 1px,transparent 40px)",
            }}
          />

          {hasPrice ? (
            <>
              <p className="relative text-[#00AEEF] text-[10px] tracking-[0.35em] uppercase font-semibold mb-2">
                Precio por persona
              </p>
              <div className="relative flex items-end gap-2">
                <span className="font-playfair text-[2.6rem] leading-none text-white">
                  ${tour.price.toLocaleString("es-MX")}
                </span>
                <span className="text-white/35 text-sm mb-1.5">
                  {tour.currency}
                </span>
              </div>
            </>
          ) : (
            <>
              <p className="relative text-[#00AEEF] text-[10px] tracking-[0.35em] uppercase font-semibold mb-3">
                Precio
              </p>
              <p className="relative font-playfair text-2xl text-white mb-1">
                Consultar disponibilidad
              </p>
              <p className="relative text-white/35 text-xs">
                Contáctanos para conocer el costo
              </p>
            </>
          )}

          <div className="relative flex flex-wrap gap-4 mt-3 text-white/30 text-xs">
            <span className="flex items-center gap-1.5">
              <Users size={11} />
              Máx. {tour.maxPeople} personas
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={11} />
              {tour.durationHours}h de duración
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={11} />
              {tour.departureLocation}
            </span>
          </div>

          {/* Start time hint */}
          {tour.details?.startTime && (
            <div className="relative mt-3 flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
              <Tag size={12} className="text-[#00AEEF] shrink-0" />
              <span className="text-white/50 text-xs">Horario sugerido: </span>
              <span className="text-white/70 text-xs font-medium">
                {tour.details.startTime}
              </span>
            </div>
          )}

          <svg
            className="absolute -bottom-px left-0 right-0 w-full"
            viewBox="0 0 400 16"
            preserveAspectRatio="none"
          >
            <path d="M0 16 Q100 0 200 8 Q300 16 400 4 L400 16 Z" fill="white" />
          </svg>
        </div>

        {/* ── Form ── */}
        <div className="px-7 pt-8 pb-7 space-y-5">
          {/* Fecha */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-[10px] text-[#0B1E2D]/40 font-bold uppercase tracking-[0.2em]">
              <Calendar size={11} className="text-[#00AEEF]" />
              Fecha deseada
            </Label>
            <Popover open={calOpen} onOpenChange={setCalOpen}>
              <PopoverTrigger asChild>
                <button className="flex h-11 w-full items-center gap-3 rounded-2xl bg-[#F8F5F0] px-4 text-sm border border-transparent hover:border-[#D8C3A5]/60 focus:outline-none focus:ring-2 focus:ring-[#00AEEF]/40 transition-all text-left">
                  <Calendar
                    size={15}
                    className={date ? "text-[#00AEEF]" : "text-[#0B1E2D]/25"}
                  />
                  <span
                    className={
                      date ? "text-[#0B1E2D] capitalize" : "text-[#0B1E2D]/35"
                    }
                  >
                    {date
                      ? format(date, "EEEE d 'de' MMMM", { locale: es })
                      : "Selecciona una fecha"}
                  </span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  selected={date}
                  onSelect={(d) => {
                    if (d) {
                      setDate(d);
                      setCalOpen(false);
                    }
                  }}
                  disabled={{ before: new Date() }}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Hora */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-[10px] text-[#0B1E2D]/40 font-bold uppercase tracking-[0.2em]">
              <Clock size={11} className="text-[#00AEEF]" />
              Hora de inicio
            </Label>
            <Select value={timeSlot} onValueChange={setTimeSlot}>
              <SelectTrigger>
                <SelectValue placeholder="— Selecciona una hora —" />
              </SelectTrigger>
              <SelectContent>
                {TIME_SLOTS.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Personas */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-[10px] text-[#0B1E2D]/40 font-bold uppercase tracking-[0.2em]">
              <Users size={11} className="text-[#00AEEF]" />
              Personas
              <span className="text-[#0B1E2D]/25 font-normal normal-case tracking-normal">
                {tour.minPeople
                  ? `(mín. ${tour.minPeople} · máx. ${tour.maxPeople})`
                  : `(máx. ${tour.maxPeople})`}
              </span>
            </Label>
            <div className="flex items-center bg-[#F8F5F0] rounded-2xl overflow-hidden h-11">
              <div className="flex items-center bg-[#F8F5F0] rounded-2xl overflow-hidden h-11">
                <button
                  onClick={() => setPeople((p) => Math.max(minPeople, p - 1))}
                  disabled={minPeople? people <= minPeople : people >= tour.maxPeople}
                  className="w-12 h-full flex items-center justify-center text-[#0B1E2D]/40 hover:text-[#0B1E2D] hover:bg-[#0B1E2D]/5 transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
                >
                  <Minus size={16} />
                </button>
                <div className="flex-1 text-center">
                  <span className="text-[#0B1E2D] font-bold text-lg">
                    {people}
                  </span>
                  <span className="text-[#0B1E2D]/35 text-xs ml-1.5">
                    {people === 1 ? "persona" : "personas"}
                  </span>
                </div>
                <button
                  onClick={() =>
                    setPeople((p) => Math.min(tour.maxPeople, p + 1))
                  }
                  disabled={people >= tour.maxPeople}
                  className="w-12 h-full flex items-center justify-center text-[#0B1E2D]/40 hover:text-[#0B1E2D] hover:bg-[#0B1E2D]/5 transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Total (only if has price) */}
          <AnimatePresence>
            {hasPrice && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-gradient-to-br from-[#F8F5F0] to-[#D8C3A5]/20 rounded-2xl px-5 py-4 flex items-center justify-between border border-[#D8C3A5]/30">
                  <div>
                    <p className="text-[#0B1E2D]/40 text-xs mb-1">
                      Total estimado
                    </p>
                    <p className="text-[#0B1E2D]/45 text-[11px]">
                      {people} {people === 1 ? "persona" : "personas"}
                      {date && ` · ${format(date, "d MMM", { locale: es })}`}
                      {timeSlot && ` · ${timeSlot}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-playfair text-[1.9rem] leading-none text-[#0B1E2D]">
                      ${total!.toLocaleString("es-MX")}
                    </p>
                    <p className="text-[#0B1E2D]/30 text-[10px] mt-0.5">
                      {tour.currency}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* WhatsApp */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between w-full bg-[#25D366] text-white font-semibold py-4 px-6 rounded-2xl hover:bg-[#1ebe5d] transition-all shadow-xl shadow-[#25D366]/25 hover:shadow-[#25D366]/40 hover:-translate-y-0.5 active:translate-y-0"
          >
            <div className="flex items-center gap-3">
              <MessageCircle size={21} className="fill-white shrink-0" />
              <div className="text-left">
                <p className="text-sm font-bold leading-none">
                  {hasPrice
                    ? "Reservar por WhatsApp"
                    : "Consultar por WhatsApp"}
                </p>
                <p className="text-white/65 text-[10px] mt-1">
                  {date
                    ? `${format(date, "d MMM", { locale: es })}${timeSlot ? ` · ${timeSlot}` : ""}`
                    : "Consultar disponibilidad"}
                </p>
              </div>
            </div>
            <ChevronRight
              size={18}
              className="opacity-50 group-hover:translate-x-0.5 transition-transform shrink-0"
            />
          </a>

          {/* Llamar */}
          <a
            href={`tel:${tour.phone}`}
            className="flex items-center justify-center gap-2 w-full border border-[#0B1E2D]/10 text-[#0B1E2D]/50 hover:text-[#0B1E2D] hover:border-[#0B1E2D]/25 font-medium py-3 rounded-2xl transition-all text-sm"
          >
            <Phone size={14} />
            {tour.phone}
          </a>

          {tour.contactName && (
            <p className="text-center text-[#0B1E2D]/25 text-[11px] -mt-2">
              Atendido por{" "}
              <span className="text-[#0B1E2D]/45 font-medium">
                {tour.contactName}
              </span>
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
