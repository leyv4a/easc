"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import type { Yate } from "@/types/yate";
import { getImageUrl } from "@/types/yate";

interface GalleryProps {
  yate: Yate;
}

export default function YateGallery({ yate }: GalleryProps) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const allImages = [
    yate.coverImage,
    ...yate.gallery.filter((g) => g !== yate.coverImage),
  ].filter(Boolean);

  const urls = allImages.map((filename) =>
    getImageUrl(yate.collectionId, yate.id, filename)
  );

  const prev = () =>
    setLightbox((i) => (i === null ? null : (i - 1 + urls.length) % urls.length));
  const next = () =>
    setLightbox((i) => (i === null ? null : (i + 1) % urls.length));

  const Thumb = ({ url, index }: { url: string; index: number }) => (
    <div
      onClick={() => setLightbox(index)}
      className="relative overflow-hidden rounded-xl cursor-pointer group"
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url('${url}')` }}
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <ZoomIn size={18} className="text-white" />
        </div>
      </div>
      {index === 4 && urls.length > 5 && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <span className="text-white font-playfair text-2xl">+{urls.length - 5}</span>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile: imagen principal full-ancho + 2 miniaturas abajo */}
      <div className="grid grid-cols-2 gap-2 sm:hidden">
        {urls[0] && (
          <div
            onClick={() => setLightbox(0)}
            className="col-span-2 relative overflow-hidden rounded-xl cursor-pointer group"
            style={{ aspectRatio: "16 / 9" }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url('${urls[0]}')` }}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </div>
        )}
        {urls.slice(1, 3).map((url, i) => (
          <div
            key={url}
            onClick={() => setLightbox(i + 1)}
            className="relative overflow-hidden rounded-xl cursor-pointer group"
            style={{ aspectRatio: "1 / 1" }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url('${url}')` }}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            {i === 1 && urls.length > 3 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white font-playfair text-2xl">+{urls.length - 3}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Desktop: imagen principal izquierda + grid 2x2 derecha */}
      <div className="hidden sm:grid grid-cols-2 gap-3" style={{ height: "480px" }}>
        {/* Izquierda: imagen principal */}
        {urls[0] && (
          <div
            onClick={() => setLightbox(0)}
            className="relative overflow-hidden rounded-2xl cursor-pointer group"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url('${urls[0]}')` }}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <ZoomIn size={18} className="text-white" />
              </div>
            </div>
          </div>
        )}

        {/* Derecha: grid 2x2 */}
        <div className="grid grid-cols-2 grid-rows-2 gap-3">
          {urls.slice(1, 5).map((url, i) => (
            <Thumb key={url} url={url} index={i + 1} />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <X size={20} />
            </button>
            <div className="absolute top-5 left-5 text-white/50 text-sm">
              {lightbox + 1} / {urls.length}
            </div>
            {urls.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                  className="absolute left-4 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); next(); }}
                  className="absolute right-4 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}
            <motion.img
              key={lightbox}
              src={urls[lightbox]}
              alt={`${yate.name} imagen ${lightbox + 1}`}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
