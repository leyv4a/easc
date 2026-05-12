import { Anchor, Globe, Mail, Phone } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#060f17] text-white/50 py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-[#00AEEF]/20 border border-[#00AEEF]/30 flex items-center justify-center">
                <Anchor size={16} className="text-[#00AEEF]" />
              </div>
              <div>
                <p className="font-playfair text-white text-lg leading-none">San Carlos</p>
                <p className="text-[#00AEEF] text-[10px] tracking-[0.2em] uppercase">Sonora · México</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Donde el Mar de Cortés y el desierto sonorense crean el destino turístico más extraordinario de México.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-white font-medium text-sm mb-4 tracking-wide uppercase text-xs">
              Explorar
            </p>
            <ul className="space-y-2">
              {[
                { label: "Yates", href: "/yates" },
                { label: "Cultura", href: "/cultura" },
                { label: "Contacto", href: "/contacto" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-[#00AEEF] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="text-white font-medium text-sm mb-4 tracking-wide uppercase text-xs">
              Síguenos
            </p>
            <div className="flex gap-4">
              {[Globe, Mail, Phone].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:border-[#00AEEF]/50 hover:text-[#00AEEF] transition-all"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 text-center text-xs text-white/30">
          © {new Date().getFullYear()} San Carlos Sonora. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
