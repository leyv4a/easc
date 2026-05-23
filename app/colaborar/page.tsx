import type { Metadata } from "next";
import ColaborarForm from "@/components/colaborar/ColaborarForm";
import Container from "@/components/ui/Container";
import { Phone, Mail, MapPin, Clock, MessageCircle, Handshake } from "lucide-react";

export const metadata: Metadata = {
  title: "Colaborar · San Carlos Sonora",
  description: "¿Tienes un negocio en San Carlos? Únete a nuestra plataforma turística y llega a más visitantes.",
};

const CONTACT_INFO = [
  {
    icon: Phone,
    label: "Teléfono",
    value: "+52 622 XXX XXXX",
    href: "tel:+52622XXXXXXX",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+52 622 XXX XXXX",
    href: "https://wa.me/52622XXXXXXX",
  },
  {
    icon: Mail,
    label: "Correo",
    value: "hola@sancarlos.mx",
    href: "mailto:hola@sancarlos.mx",
  },
  {
    icon: MapPin,
    label: "Ubicación",
    value: "San Carlos, Sonora, México",
    href: "https://maps.google.com/?q=San+Carlos+Sonora",
  },
  {
    icon: Clock,
    label: "Horario de atención",
    value: "Lun–Vie · 9:00 AM – 6:00 PM",
    href: null,
  },
];

const BENEFITS = [
  { emoji: "🌊", title: "Mayor visibilidad", desc: "Aparece frente a miles de turistas que visitan San Carlos cada temporada." },
  { emoji: "📲", title: "Reservas directas", desc: "Recibe consultas y reservas directamente por WhatsApp o teléfono." },
  { emoji: "🏆", title: "Perfil premium", desc: "Galería de fotos, descripción completa, tarifas y amenidades destacadas." },
  { emoji: "📈", title: "Crecimiento real", desc: "Más exposición significa más clientes y más ingresos para tu negocio." },
];

export default function ColaborarPage() {
  return (
    <main className="bg-[#F4F1EC] min-h-screen">

      {/* ── HERO ── */}
      <section className="relative bg-[#0B1E2D] pt-36 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #00AEEF 0%, transparent 60%), radial-gradient(circle at 80% 30%, #D8C3A5 0%, transparent 50%)" }}
        />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 60px),repeating-linear-gradient(#fff 0,#fff 1px,transparent 1px,transparent 60px)" }}
        />

        <Container className="relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#00AEEF]/10 border border-[#00AEEF]/25 text-[#00AEEF] text-[10px] tracking-[0.3em] uppercase font-semibold px-4 py-2 rounded-full mb-6">
              <Handshake size={13} />
              Alianzas estratégicas
            </div>
            <h1 className="font-playfair text-5xl md:text-7xl text-white leading-none mb-6">
              Colabora con<br />
              <span className="italic text-[#00AEEF]">San Carlos</span>
            </h1>
            <p className="text-white/55 text-lg leading-relaxed max-w-xl">
              ¿Tienes un yate, tour, hospedaje u otro negocio turístico en San Carlos?
              Únete a nuestra plataforma y conecta con miles de visitantes.
            </p>
          </div>
        </Container>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-16 bg-[#0B1E2D] border-t border-white/5">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {BENEFITS.map((b) => (
              <div key={b.title} className="text-center">
                <div className="text-3xl mb-3">{b.emoji}</div>
                <p className="text-white font-semibold text-sm mb-1">{b.title}</p>
                <p className="text-white/35 text-xs leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 xl:gap-16">

            {/* ── FORM 3/5 ── */}
            <div className="lg:col-span-3">
              <div className="mb-8">
                <p className="text-[#00AEEF] text-[10px] tracking-[0.3em] uppercase font-semibold mb-3">
                  Formulario de contacto
                </p>
                <h2 className="font-playfair text-3xl md:text-4xl text-[#0B1E2D] leading-tight">
                  Cuéntanos sobre tu negocio
                </h2>
                <p className="text-[#0B1E2D]/50 text-sm mt-3 leading-relaxed">
                  Completa el formulario y nos pondremos en contacto contigo en menos de 24 horas.
                </p>
              </div>
              <ColaborarForm />
            </div>

            {/* ── CONTACT INFO 2/5 ── */}
            <div className="lg:col-span-2">
              <div className="bg-[#0B1E2D] rounded-[2rem] overflow-hidden shadow-2xl shadow-[#0B1E2D]/20">

                {/* Header */}
                <div className="relative px-8 pt-8 pb-10">
                  <div className="absolute inset-0 opacity-[0.04]"
                    style={{ backgroundImage: "repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 40px),repeating-linear-gradient(#fff 0,#fff 1px,transparent 1px,transparent 40px)" }}
                  />
                  <p className="relative text-[#00AEEF] text-[10px] tracking-[0.3em] uppercase font-semibold mb-3">
                    Contáctanos directamente
                  </p>
                  <h3 className="relative font-playfair text-2xl text-white leading-snug">
                    Estamos listos para escucharte
                  </h3>
                  <p className="relative text-white/35 text-sm mt-2 leading-relaxed">
                    Puedes escribirnos o llamarnos en cualquier momento.
                  </p>
                  <svg className="absolute -bottom-px left-0 right-0 w-full" viewBox="0 0 400 16" preserveAspectRatio="none">
                    <path d="M0 16 Q100 0 200 8 Q300 16 400 4 L400 16 Z" fill="#F4F1EC" />
                  </svg>
                </div>

                {/* Contact items */}
                <div className="bg-[#F4F1EC] px-8 py-8 space-y-4">
                  {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                    <div key={label}>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="group flex items-center gap-4 p-4 bg-white rounded-2xl border border-[#D8C3A5]/30 hover:border-[#00AEEF]/40 hover:shadow-md transition-all"
                        >
                          <div className="w-10 h-10 rounded-full bg-[#00AEEF]/10 flex items-center justify-center shrink-0 group-hover:bg-[#00AEEF]/20 transition-colors">
                            <Icon size={17} className="text-[#00AEEF]" />
                          </div>
                          <div>
                            <p className="text-[#0B1E2D]/40 text-[10px] uppercase tracking-wide font-medium">{label}</p>
                            <p className="text-[#0B1E2D] text-sm font-medium group-hover:text-[#00AEEF] transition-colors">{value}</p>
                          </div>
                        </a>
                      ) : (
                        <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-[#D8C3A5]/30">
                          <div className="w-10 h-10 rounded-full bg-[#00AEEF]/10 flex items-center justify-center shrink-0">
                            <Icon size={17} className="text-[#00AEEF]" />
                          </div>
                          <div>
                            <p className="text-[#0B1E2D]/40 text-[10px] uppercase tracking-wide font-medium">{label}</p>
                            <p className="text-[#0B1E2D] text-sm font-medium">{value}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </Container>
      </section>
    </main>
  );
}
