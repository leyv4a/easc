"use client";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/6221449886?text=Hola%20👋🌴%0AVi%20*Escápate%20a%20San%20Carlos*%20y%20me%20interesa%20conocer%20más%20sobre%20las%20experiencias,%20lugares%20y%20servicios%20disponibles%20en%20San%20Carlos.%0A%0ATambién%20me%20gustaría%20recibir%20información%20sobre%20posibles%20colaboraciones%20para%20negocios%20como%20restaurantes,%20tours,%20yates,%20hospedajes%20o%20actividades%20turísticas.%20✨"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring", damping: 15, stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-xl shadow-[#25D366]/30 hover:shadow-[#25D366]/50 transition-shadow"
      aria-label="Contactar por WhatsApp"
    >
      {/* Pulse ring */}
      <span className="absolute inline-flex w-full h-full rounded-full bg-[#25D366] opacity-30 animate-ping" />
      <MessageCircle size={26} className="text-white fill-white relative z-10" />
    </motion.a>
  );
}
