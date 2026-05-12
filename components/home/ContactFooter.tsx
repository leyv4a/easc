"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import Container from "@/components/ui/Container";

export default function ContactFooter() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className="py-24 bg-[#0B1E2D] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, #00AEEF 0%, transparent 50%), radial-gradient(circle at 80% 50%, #D8C3A5 0%, transparent 50%)"
        }}
      />

      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[#00AEEF] text-xs tracking-[0.3em] uppercase font-medium mb-4">
              Contáctanos
            </p>
            <h2 className="font-playfair text-3xl md:text-5xl text-white mb-4 leading-tight">
              ¿Listo para tu próxima aventura?
            </h2>
            <p className="text-white/50 text-base mb-12 max-w-md mx-auto">
              Escríbenos y te ayudamos a planear la experiencia perfecta en San Carlos.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Tu nombre"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-[#00AEEF]/50 focus:bg-white/8 transition-all"
              />
              <input
                type="email"
                placeholder="Tu correo"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-[#00AEEF]/50 focus:bg-white/8 transition-all"
              />
            </div>
            <textarea
              placeholder="Cuéntanos qué experiencia buscas..."
              rows={5}
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-[#00AEEF]/50 transition-all resize-none"
            />

            <button
              type="submit"
              className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-medium text-sm transition-all duration-300 ${
                sent
                  ? "bg-green-500/20 border border-green-400/30 text-green-400"
                  : "bg-[#00AEEF] text-white hover:bg-[#0090c7] shadow-lg shadow-[#00AEEF]/20 hover:shadow-[#00AEEF]/30"
              }`}
            >
              {sent ? (
                <>
                  <CheckCircle size={18} />
                  Mensaje enviado — ¡Gracias!
                </>
              ) : (
                <>
                  <Send size={18} />
                  Enviar Mensaje
                </>
              )}
            </button>
          </motion.form>
        </div>
      </Container>
    </section>
  );
}
