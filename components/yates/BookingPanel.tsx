"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Users, Clock, Phone, MapPin, Calendar, ChevronRight } from "lucide-react";
import type { Yate } from "@/types/yate";

interface BookingPanelProps {
  yate: Yate;
}

const HOUR_OPTIONS = [2, 3, 4, 6, 8];

function formatDateES(dateStr: string): string {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getTodayString(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function BookingPanel({ yate }: BookingPanelProps) {
  const [hours, setHours] = useState(Math.max(yate.durationHours, 2));
  const [people, setPeople] = useState(2);
  const [date, setDate] = useState("");

  // 1. Creamos la referencia para controlar el input
  const inputRef = useRef<HTMLInputElement>(null);

  // 2. Función para forzar la apertura del calendario nativo
  const handleContainerClick = () => {
    if (inputRef.current) {
      // showPicker() es el método estándar moderno de HTML5
      try {
        inputRef.current.showPicker();
      } catch (error) {
        // Selector de respaldo para navegadores antiguos
        inputRef.current.focus();
      }
    }
  };

  const total = yate.price * hours;
  const dateLabel = date ? formatDateES(date) : null;
// 1. Creamos un array con las líneas del mensaje (filtrando las vacías)
const messageLines = [
  `Hola! Me interesa reservar el yate *${yate.name}* `,
  "", // Esto genera un salto de línea doble
  date ? `⊛ Fecha: ${dateLabel}` : null,
  `⊛ Personas: ${people}`,
  `⊛ Horas: ${hours}h`,
  `⊛ Total estimado: $${total.toLocaleString("es-MX")} ${yate.currency}`,
  "",
  `¿Cuál es la disponibilidad?`
].filter(Boolean); // Elimina el elemento de la fecha si es null

// 2. Unimos las líneas con un salto de línea estándar y codificamos
const waMessage = encodeURIComponent(messageLines.join("\n"));

  const waUrl = `https://wa.me/52${yate.whatsapp}?text=${waMessage}`;
  const callUrl = `tel:${yate.phone}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.5 }}
      className="sticky top-28"
    >
      <div className="bg-white rounded-[2rem] overflow-hidden shadow-2xl shadow-[#0B1E2D]/15 border border-[#D8C3A5]/20">

        {/* ── Price header ── */}
        <div className="relative bg-[#0B1E2D] px-7 pt-7 pb-8">
          {/* subtle grid lines */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "repeating-linear-gradient(90deg, #fff 0, #fff 1px, transparent 1px, transparent 40px), repeating-linear-gradient(#fff 0, #fff 1px, transparent 1px, transparent 40px)" }}
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
            Capacidad máx. {yate.maxPeople} personas · Salida: {yate.departureLocation}
          </p>

          {/* Decorative wave bottom */}
          <svg className="absolute -bottom-px left-0 right-0 w-full" viewBox="0 0 400 16" preserveAspectRatio="none">
            <path d="M0 16 Q100 0 200 8 Q300 16 400 4 L400 16 Z" fill="white" />
          </svg>
        </div>

        {/* ── Selectors ── */}
        <div className="px-7 pt-8 pb-7 space-y-6">
{/* Date picker */}
          <div>
            <label className="flex items-center gap-2 text-[10px] text-[#0B1E2D]/40 font-bold uppercase tracking-[0.2em] mb-3">
              <Calendar size={12} className="text-[#00AEEF]" />
              Fecha deseada
            </label>
            
            {/* Al hacer clic en este contenedor, se dispara el calendario */}
            <div 
              onClick={handleContainerClick}
              className="relative h-[50px] w-full bg-[#F8F5F0] rounded-2xl border border-transparent hover:border-[#0B1E2D]/5 focus-within:border-[#00AEEF]/40 transition-all overflow-hidden cursor-pointer select-none"
            >
              
              {/* CAPA VISUAL 1: Si NO hay fecha */}
              {!date && (
                <div className="absolute inset-0 flex items-center px-4 gap-3 pointer-events-none">
                  <Calendar size={15} className="text-[#0B1E2D]/25" />
                  <span className="text-[#0B1E2D]/35 text-sm">Selecciona una fecha</span>
                </div>
              )}
              
              {/* CAPA VISUAL 2: Si SÍ hay fecha (Tu formato personalizado) */}
              {date && (
                <div className="absolute inset-0 flex items-center px-4 gap-3 pointer-events-none">
                  <Calendar size={15} className="text-[#00AEEF]" />
                  <span className="text-[#0B1E2D] text-sm font-medium capitalize truncate pr-4">
                    {dateLabel}
                  </span>
                </div>
              )}

              {/* INPUT INVISIBLE (Oculto pero funcional mediante la Ref) */}
              <input
                ref={inputRef}
                type="date"
                min={getTodayString()}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
                style={{ colorScheme: "light" }}
              />
            </div>
          </div>

          {/* Hours */}
          <div>
            <label className="flex items-center gap-2 text-[10px] text-[#0B1E2D]/40 font-bold uppercase tracking-[0.2em] mb-3">
              <Clock size={12} className="text-[#00AEEF]" />
              Horas de renta
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {HOUR_OPTIONS.map((h) => (
                <button
                  key={h}
                  onClick={() => setHours(h)}
                  className={`py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    hours === h
                      ? "bg-[#0B1E2D] text-white shadow-lg"
                      : "bg-[#F8F5F0] text-[#0B1E2D]/50 hover:bg-[#0B1E2D]/8 hover:text-[#0B1E2D]"
                  }`}
                >
                  {h}h
                </button>
              ))}
            </div>
          </div>

          {/* People */}
          <div>
            <label className="flex items-center gap-2 text-[10px] text-[#0B1E2D]/40 font-bold uppercase tracking-[0.2em] mb-3">
              <Users size={12} className="text-[#00AEEF]" />
              Personas <span className="text-[#0B1E2D]/25 font-normal">(máx. {yate.maxPeople})</span>
            </label>
            <div className="flex items-center bg-[#F8F5F0] rounded-2xl overflow-hidden">
              <button
                onClick={() => setPeople((p) => Math.max(1, p - 1))}
                className="w-12 h-12 flex items-center justify-center text-[#0B1E2D]/50 hover:text-[#0B1E2D] hover:bg-[#0B1E2D]/5 transition-colors text-xl font-light"
              >
                −
              </button>
              <div className="flex-1 text-center">
                <span className="text-[#0B1E2D] font-bold text-xl">{people}</span>
                <span className="text-[#0B1E2D]/30 text-xs ml-1">
                  {people === 1 ? "persona" : "personas"}
                </span>
              </div>
              <button
                onClick={() => setPeople((p) => Math.min(yate.maxPeople, p + 1))}
                className="w-12 h-12 flex items-center justify-center text-[#0B1E2D]/50 hover:text-[#0B1E2D] hover:bg-[#0B1E2D]/5 transition-colors text-xl font-light"
              >
                +
              </button>
            </div>
          </div>

          {/* Divider + total */}
          <div className="bg-gradient-to-r from-[#F8F5F0] via-[#D8C3A5]/30 to-[#F8F5F0] rounded-2xl px-5 py-4 flex items-center justify-between">
            <div>
              <p className="text-[#0B1E2D]/40 text-xs mb-0.5">Total estimado</p>
              <p className="text-[#0B1E2D]/50 text-[11px]">
                {hours}h · {people} {people === 1 ? "persona" : "personas"}
                {date && ` · ${new Date(date + "T12:00:00").toLocaleDateString("es-MX", { day: "numeric", month: "short" })}`}
              </p>
            </div>
            <div className="text-right">
              <p className="font-playfair text-[1.85rem] leading-none text-[#0B1E2D]">
                ${total.toLocaleString("es-MX")}
              </p>
              <p className="text-[#0B1E2D]/30 text-[10px] mt-0.5">{yate.currency}</p>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between w-full bg-[#25D366] text-white font-semibold py-4 px-6 rounded-2xl hover:bg-[#1ebe5d] transition-all shadow-xl shadow-[#25D366]/25 hover:shadow-[#25D366]/40 hover:-translate-y-0.5 active:translate-y-0"
          >
            <div className="flex items-center gap-3">
              <MessageCircle size={21} className="fill-white" />
              <div className="text-left">
                <p className="text-sm font-bold leading-none">Reservar por WhatsApp</p>
                <p className="text-white/70 text-[10px] mt-1">
                  {date ? `Para el ${new Date(date + "T12:00:00").toLocaleDateString("es-MX", { day: "numeric", month: "short" })}` : "Consultar disponibilidad"}
                </p>
              </div>
            </div>
            <ChevronRight size={18} className="opacity-60 group-hover:translate-x-0.5 transition-transform" />
          </a>

          {/* Call */}
          <a
            href={callUrl}
            className="flex items-center justify-center gap-2.5 w-full border border-[#0B1E2D]/12 text-[#0B1E2D]/60 hover:text-[#0B1E2D] hover:border-[#0B1E2D]/25 font-medium py-3 rounded-2xl transition-all text-sm"
          >
            <Phone size={15} />
            {yate.phone}
          </a>

          {yate.contactName && (
            <p className="text-center text-[#0B1E2D]/30 text-[11px] -mt-2">
              Atendido por <span className="text-[#0B1E2D]/50 font-medium">{yate.contactName}</span>
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
