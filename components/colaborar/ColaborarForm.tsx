"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, ChevronDown } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CATEGORIAS = [
  "Yates",
  "Tours",
  "Hospedaje",
  "Restaurante",
  "Aventuras",
  "Tienda / Renta de equipo",
  "Otro",
];

interface FormData {
  nombre: string;
  negocio: string;
  categoria: string;
  telefono: string;
  email: string;
  mensaje: string;
}

const EMPTY: FormData = {
  nombre: "",
  negocio: "",
  categoria: "",
  telefono: "",
  email: "",
  mensaje: "",
};

export default function ColaborarForm() {
  const [form, setForm] = useState<FormData>(EMPTY);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (key: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    setLoading(true);

    const response = await fetch("/api/colaborar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Error enviando formulario");
    }

    setSent(true);
    setForm(EMPTY);

    setTimeout(() => {
      setSent(false);
    }, 5000);
  } catch (error) {
    console.error(error);

    alert("Hubo un error enviando el formulario.");
  } finally {
    setLoading(false);
  }
};

  const inputClass =
    "w-full bg-white border border-[#D8C3A5]/40 rounded-2xl px-4 py-3.5 text-sm text-[#0B1E2D] placeholder:text-[#0B1E2D]/30 focus:outline-none focus:border-[#00AEEF]/50 focus:ring-2 focus:ring-[#00AEEF]/10 transition-all";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Nombre + Negocio */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-[10px] text-[#0B1E2D]/40 font-bold uppercase tracking-[0.2em]">
            Tu nombre *
          </Label>
          <input
            type="text"
            required
            placeholder="Ej. Juan García"
            value={form.nombre}
            onChange={set("nombre")}
            className={inputClass}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-[10px] text-[#0B1E2D]/40 font-bold uppercase tracking-[0.2em]">
            Nombre del negocio *
          </Label>
          <input
            type="text"
            required
            placeholder="Ej. Yate El Calamar"
            value={form.negocio}
            onChange={set("negocio")}
            className={inputClass}
          />
        </div>
      </div>

      {/* Categoría */}
      <div className="space-y-2">
        <Label className="text-[10px] text-[#0B1E2D]/40 font-bold uppercase tracking-[0.2em]">
          Categoría de tu negocio *
        </Label>
        <Select
          value={form.categoria}
          onValueChange={(v) => setForm((prev) => ({ ...prev, categoria: v }))}
        >
          <SelectTrigger className="bg-white border border-[#D8C3A5]/40 rounded-2xl h-12 focus:ring-2 focus:ring-[#00AEEF]/10 focus:border-[#00AEEF]/50">
            <SelectValue placeholder="— Selecciona una categoría —" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIAS.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Teléfono + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-[10px] text-[#0B1E2D]/40 font-bold uppercase tracking-[0.2em]">
            Teléfono / WhatsApp *
          </Label>
          <input
            type="tel"
            required
            placeholder="Ej. 622 123 4567"
            value={form.telefono}
            onChange={set("telefono")}
            className={inputClass}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-[10px] text-[#0B1E2D]/40 font-bold uppercase tracking-[0.2em]">
            Correo electrónico *
          </Label>
          <input
            type="email"
            required
            placeholder="Ej. hola@minegocio.mx"
            value={form.email}
            onChange={set("email")}
            className={inputClass}
          />
        </div>
      </div>

      {/* Mensaje */}
      <div className="space-y-2">
        <Label className="text-[10px] text-[#0B1E2D]/40 font-bold uppercase tracking-[0.2em]">
          Cuéntanos sobre tu negocio
        </Label>
        <textarea
          rows={5}
          placeholder="Describe brevemente tu negocio, qué ofreces y cómo te gustaría colaborar..."
          value={form.mensaje}
          onChange={set("mensaje")}
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading || sent}
        className={`group w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl font-semibold text-sm transition-all duration-300 ${
          sent
            ? "bg-emerald-500/15 border border-emerald-400/30 text-emerald-600 cursor-default"
            : loading
            ? "bg-[#00AEEF]/70 text-white cursor-wait"
            : "bg-[#00AEEF] text-white hover:bg-[#0090c7] shadow-xl shadow-[#00AEEF]/20 hover:shadow-[#00AEEF]/30 hover:-translate-y-0.5 active:translate-y-0"
        }`}
      >
        <AnimatePresence mode="wait">
          {sent ? (
            <motion.span
              key="sent"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="flex items-center gap-2"
            >
              <CheckCircle size={18} />
              ¡Mensaje enviado! Te contactaremos pronto.
            </motion.span>
          ) : loading ? (
            <motion.span
              key="loading"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="flex items-center gap-2"
            >
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Enviando...
            </motion.span>
          ) : (
            <motion.span
              key="idle"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="flex items-center gap-2"
            >
              <Send size={17} />
              Enviar solicitud
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <p className="text-center text-[#0B1E2D]/30 text-xs">
        Respondemos en menos de 24 horas · Sin compromisos
      </p>
    </form>
  );
}
