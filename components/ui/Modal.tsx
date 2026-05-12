"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryName?: string;
}

export default function Modal({ isOpen, onClose, categoryName }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop - Ultra Dark for focus */}
          <motion.div
            className="absolute inset-0 bg-[#0B1E2D]/95 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal - Minimalist Borderless Aesthetic */}
          <motion.div
            className="relative max-w-sm w-full text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
          >
            <button
              onClick={onClose}
              className="absolute -top-12 left-1/2 -translate-x-1/2 text-[#F8F5F0]/20 hover:text-[#E6B566] transition-colors p-2"
              aria-label="Cerrar"
            >
              <X size={20} strokeWidth={1} />
            </button>

            {/* Content Section */}
            <div className="space-y-6">
              <span className="inline-block text-[#E6B566] text-[10px] tracking-[0.6em] uppercase font-light">
                Próximamente
              </span>
              
              <h3 className="font-playfair text-4xl md:text-5xl text-[#F8F5F0] font-extralight tracking-tight">
                {categoryName}
              </h3>

              <div className="h-[1px] w-12 bg-[#E6B566]/30 mx-auto" />

              <p className="text-[#D8C3A5]/60 text-sm leading-relaxed font-light px-4">
                Estamos curando esta experiencia exclusiva. 
                <br />
                Vuelve pronto.
              </p>

              <div className="pt-6">
                <a 
                  href="/yates" 
                  className="text-[#F8F5F0] text-[11px] tracking-[0.3em] uppercase border-b border-[#E6B566]/40 pb-1 hover:border-[#E6B566] transition-all"
                >
                  Explorar Yates
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}