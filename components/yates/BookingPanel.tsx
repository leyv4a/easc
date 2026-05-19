"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { MessageCircle, Users, Clock, Phone, Calendar, ChevronRight, Waves, Plus, Minus } from "lucide-react";
import type { Yate } from "@/types/yate";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

interface BookingPanelProps {
  yate: Yate;
}

// const EXP_ICONS: Record<string, string> = {
//   Privado: "🛥️",
//   Sunset: "🌅",
//   Pesca: "🎣",
//   Snorkel: "🤿",
//   Fiesta: "🎉",
//   Romántico: "💫",
// };
const EXP_ICONS: Record<string, string> = {
  Privado: "◆",
  Sunset: "◆",
  Pesca: "◆",
  Snorkel: "◆",
  Fiesta: "◆",
  Romántico: "◆",
};

// ◆
// Genera slots de hora cada 30 min para las 24h
function generateTimeSlots(): string[] {
  const slots: string[] = [];
  for (let h = 0; h < 24; h++) {
    for (const m of [0, 30]) {
      const hour12 = h % 12 === 0 ? 12 : h % 12;
      const ampm = h < 12 ? "AM" : "PM";
      const min = m === 0 ? "00" : "30";
      slots.push(`${hour12}:${min} ${ampm}`);
    }
  }
  return slots;
}

const TIME_SLOTS = generateTimeSlots();

export default function BookingPanel({ yate }: BookingPanelProps) {
  const [experience, setExperience] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [calOpen, setCalOpen] = useState(false);
  const [timeSlot, setTimeSlot] = useState<string>("");
  const [hours, setHours] = useState(Math.max(yate.durationHours, 2));
  const [people, setPeople] = useState(2);

  const isPesca = experience === "Pesca";
  const minHours = isPesca ? 6 : 2;

  // Ajusta horas si cambia la experiencia y queda por debajo del mínimo
  useEffect(() => {
    if (hours < minHours) setHours(minHours);
  }, [minHours, hours]);

  const total = yate.price * hours;

  const waMessage = encodeURIComponent(
    `Hola! Me interesa reservar el *${yate.name}* \n\n` +
    (experience ? `◆ Experiencia: ${experience} ${EXP_ICONS[experience] ?? ""}\n` : "") +
    (date ? `◆ Fecha: ${format(date, "EEEE d 'de' MMMM yyyy", { locale: es })}\n` : "") +
    (timeSlot ? `◆ Hora de salida: ${timeSlot}\n` : "") +
    `◆ Personas: ${people}\n` +
    `◆ Horas: ${hours}h\n` +
    `◆ Total estimado: $${total.toLocaleString("es-MX")} ${yate.currency}\n\n` +
    `¿Está disponible?`
  );


  const waUrl = `https://wa.me/52${yate.whatsapp}?text=${waMessage}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.5 }}
      className="sticky top-28"
    >
      <div className="bg-white rounded-[2rem] overflow-hidden shadow-2xl shadow-[#0B1E2D]/15 border border-[#D8C3A5]/20">

        {/* ── Header precio ── */}
        <div className="relative bg-[#0B1E2D] px-7 pt-7 pb-9">
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{ backgroundImage: "repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 40px),repeating-linear-gradient(#fff 0,#fff 1px,transparent 1px,transparent 40px)" }}
          />
          <p className="relative text-[#00AEEF] text-[10px] tracking-[0.35em] uppercase font-semibold mb-2">
            Precio por hora
          </p>
          <div className="relative flex items-end gap-2">
            <span className="font-playfair text-[2.6rem] leading-none text-white">
              ${yate.price.toLocaleString("es-MX")}
            </span>
            <span className="text-white/35 text-sm mb-1.5">{yate.currency}</span>
          </div>
          <p className="relative text-white/30 text-xs mt-2">
            Máx. {yate.maxPeople} personas · {yate.departureLocation}
          </p>
          <svg className="absolute -bottom-px left-0 right-0 w-full" viewBox="0 0 400 16" preserveAspectRatio="none">
            <path d="M0 16 Q100 0 200 8 Q300 16 400 4 L400 16 Z" fill="white" />
          </svg>
        </div>

        {/* ── Campos ── */}
        <div className="px-7 pt-8 pb-7 space-y-5">

          {/* 1 · Tipo de experiencia */}
          {yate.experienceType?.length > 0 && (
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-[10px] text-[#0B1E2D]/40 font-bold uppercase tracking-[0.2em]">
                <Waves size={11} className="text-[#00AEEF]" />
                Experiencia
                <span className="text-[#0B1E2D]/25 font-normal normal-case tracking-normal">· opcional</span>
              </Label>
              <Select value={experience} onValueChange={setExperience}>
                <SelectTrigger>
                  <SelectValue placeholder="— Cualquier experiencia —" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cualquiera">— Cualquier experiencia —</SelectItem>
                  {yate.experienceType.map((exp) => (
                    <SelectItem key={exp} value={exp}>
                      {EXP_ICONS[exp] ?? ""} {exp}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <AnimatePresence>
                {isPesca && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-xs px-3.5 py-2.5 rounded-xl mt-1">
                      <span className="text-base">🎣</span>
                      Pesca deportiva requiere mínimo <strong>6 horas</strong>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* 2 · Fecha */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-[10px] text-[#0B1E2D]/40 font-bold uppercase tracking-[0.2em]">
              <Calendar size={11} className="text-[#00AEEF]" />
              Fecha deseada
            </Label>
            <Popover open={calOpen} onOpenChange={setCalOpen}>
              <PopoverTrigger asChild>
                <button className="flex h-11 w-full items-center gap-3 rounded-2xl bg-[#F8F5F0] px-4 text-sm border border-transparent hover:border-[#D8C3A5]/60 focus:outline-none focus:ring-2 focus:ring-[#00AEEF]/40 transition-all text-left">
                  <Calendar size={15} className={date ? "text-[#00AEEF]" : "text-[#0B1E2D]/25"} />
                  <span className={date ? "text-[#0B1E2D] capitalize" : "text-[#0B1E2D]/35"}>
                    {date
                      ? format(date, "EEEE d 'de' MMMM", { locale: es })
                      : "Selecciona una fecha"}
                  </span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  selected={date}
                  onSelect={(d: Date | undefined) => { if (d) { setDate(d); setCalOpen(false); } }}
                  disabled={{ before: new Date() }}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* 3 · Hora de salida */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-[10px] text-[#0B1E2D]/40 font-bold uppercase tracking-[0.2em]">
              <Clock size={11} className="text-[#00AEEF]" />
              Hora de salida
            </Label>
            <Select value={timeSlot} onValueChange={setTimeSlot}>
              <SelectTrigger>
                <SelectValue placeholder="— Selecciona una hora —" />
              </SelectTrigger>
              <SelectContent>
                {TIME_SLOTS.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 4 · Horas de renta */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-[10px] text-[#0B1E2D]/40 font-bold uppercase tracking-[0.2em]">
              <Clock size={11} className="text-[#00AEEF]" />
              Horas de renta
              {isPesca
                ? <span className="text-emerald-600 font-normal normal-case tracking-normal">· mín. 6h</span>
                : <span className="text-[#0B1E2D]/25 font-normal normal-case tracking-normal">· mín. 2h</span>
              }
            </Label>
            <div className="flex items-center bg-[#F8F5F0] rounded-2xl overflow-hidden h-11">
              <button
                onClick={() => setHours((h) => Math.max(minHours, h - 1))}
                disabled={hours <= minHours}
                className="w-12 h-full flex items-center justify-center text-[#0B1E2D]/40 hover:text-[#0B1E2D] hover:bg-[#0B1E2D]/5 transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
              >
                <Minus size={16} />
              </button>
              <div className="flex-1 text-center">
                <span className="text-[#0B1E2D] font-bold text-lg">{hours}</span>
                <span className="text-[#0B1E2D]/35 text-xs ml-1.5">
                  {hours === 1 ? "hora" : "horas"}
                </span>
              </div>
              <button
                onClick={() => setHours((h) => h + 1)}
                className="w-12 h-full flex items-center justify-center text-[#0B1E2D]/40 hover:text-[#0B1E2D] hover:bg-[#0B1E2D]/5 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* 5 · Personas */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-[10px] text-[#0B1E2D]/40 font-bold uppercase tracking-[0.2em]">
              <Users size={11} className="text-[#00AEEF]" />
              Personas
              <span className="text-[#0B1E2D]/25 font-normal normal-case tracking-normal">(máx. {yate.maxPeople})</span>
            </Label>
            <div className="flex items-center bg-[#F8F5F0] rounded-2xl overflow-hidden h-11">
              <button
                onClick={() => setPeople((p) => Math.max(1, p - 1))}
                disabled={people <= 1}
                className="w-12 h-full flex items-center justify-center text-[#0B1E2D]/40 hover:text-[#0B1E2D] hover:bg-[#0B1E2D]/5 transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
              >
                <Minus size={16} />
              </button>
              <div className="flex-1 text-center">
                <span className="text-[#0B1E2D] font-bold text-lg">{people}</span>
                <span className="text-[#0B1E2D]/35 text-xs ml-1.5">
                  {people === 1 ? "persona" : "personas"}
                </span>
              </div>
              <button
                onClick={() => setPeople((p) => Math.min(yate.maxPeople, p + 1))}
                disabled={people >= yate.maxPeople}
                className="w-12 h-full flex items-center justify-center text-[#0B1E2D]/40 hover:text-[#0B1E2D] hover:bg-[#0B1E2D]/5 transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* ── Total ── */}
          <div className="bg-gradient-to-br from-[#F8F5F0] to-[#D8C3A5]/20 rounded-2xl px-5 py-4 flex items-center justify-between border border-[#D8C3A5]/30">
            <div>
              <p className="text-[#0B1E2D]/40 text-xs mb-1">Total estimado</p>
              <div className="text-[#0B1E2D]/45 text-[11px] leading-relaxed space-y-0.5">
                <p>{hours}h · {people} {people === 1 ? "persona" : "personas"}</p>
                {(date || timeSlot) && (
                  <p>
                    {date && format(date, "d MMM", { locale: es })}
                    {date && timeSlot && " · "}
                    {timeSlot}
                  </p>
                )}
                {experience && experience !== "cualquiera" && (
                  <p>{EXP_ICONS[experience]} {experience}</p>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="font-playfair text-[1.9rem] leading-none text-[#0B1E2D]">
                ${total.toLocaleString("es-MX")}
              </p>
              <p className="text-[#0B1E2D]/30 text-[10px] mt-0.5">{yate.currency}</p>
            </div>
          </div>

          {/* ── WhatsApp CTA ── */}
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
                  {date
                    ? `${format(date, "d MMM", { locale: es })}${timeSlot ? ` · ${timeSlot}` : ""}`
                    : "Consultar disponibilidad"}
                </p>
              </div>
            </div>
            <ChevronRight size={18} className="opacity-50 group-hover:translate-x-0.5 transition-transform shrink-0" />
          </a>

          {/* ── Llamar ── */}
          <a
            href={`tel:${yate.phone}`}
            className="flex items-center justify-center gap-2 w-full border border-[#0B1E2D]/10 text-[#0B1E2D]/50 hover:text-[#0B1E2D] hover:border-[#0B1E2D]/25 font-medium py-3 rounded-2xl transition-all text-sm"
          >
            <Phone size={14} />
            {yate.phone}
          </a>

          {yate.contactName && (
            <p className="text-center text-[#0B1E2D]/25 text-[11px] -mt-2">
              Atendido por{" "}
              <span className="text-[#0B1E2D]/45 font-medium">{yate.contactName}</span>
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
