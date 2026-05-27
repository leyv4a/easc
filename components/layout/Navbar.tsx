"use client";
import { useState, useEffect } from "react";
import { Menu, X, Anchor } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  // { label: "Inicio", href: "/" },
  { label: "Yates", href: "/yates" },
  { label: "Tours", href: "/tours" },
  { label: "Hospedaje", href: "/hospedaje" },
  { label: "Cultura", href: "/cultura" },
  { label: "Contacto", href: "/contacto" },
  // { label: "Colaborar", href: "/colaborar" },
];
const navLinks2 = [
  // { label: "Inicio", href: "/" },
  { label: "Yates", href: "/yates" },
  { label: "Tours", href: "/tours" },
  { label: "Hospedaje", href: "/hospedaje" },
  { label: "Cultura", href: "/cultura" },
  { label: "Contacto", href: "/contacto" },
  { label: "Colaborar", href: "/colaborar" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0B1E2D]/95 backdrop-blur-md shadow-xl shadow-black/20 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* <div className="w-9 h-9 rounded-full bg-[#00AEEF]/20 border border-[#00AEEF]/40 flex items-center justify-center group-hover:bg-[#00AEEF]/30 transition-colors">
              <Anchor size={18} className="text-[#00AEEF]" />
            </div>
            <div>
              <span className="font-playfair text-white font-semibold text-lg leading-none block">
                San Carlos
              </span>
              <span className="text-[#00AEEF] text-[10px] tracking-[0.2em] uppercase">
                Sonora · México
              </span>
            </div> */}
            <Image src="/LOGO 3X1.png" alt="Logo" width={300} height={100} />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/70 hover:text-white text-sm font-medium transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#00AEEF] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <Link
              href="/colaborar"
              className="bg-[#00AEEF] text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[#0090c7] transition-colors shadow-lg shadow-[#00AEEF]/20"
            >
              Colaborar
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white p-2"
            aria-label="Menú"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#0B1E2D]/98 backdrop-blur-lg flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.25 }}
          >
            {navLinks2.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-playfair text-3xl text-white hover:text-[#00AEEF] transition-colors"
                >
                  {link.label}
                </Link>
              
              </motion.div>
            ))}
      
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
