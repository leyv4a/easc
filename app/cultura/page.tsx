import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

export default function CulturaPage() {
  return (
    <main className="bg-[#F8F5F0] min-h-screen">
      <section className="relative h-[50vh] min-h-[400px] flex items-end pb-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504700610630-ac6aba3536d3?w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E2D] via-[#0B1E2D]/50 to-[#0B1E2D]/20" />
        <Container className="relative z-10">
          <h1 className="font-playfair text-5xl md:text-7xl text-white mb-4">Cultura</h1>
          <p className="text-white/60 text-lg max-w-xl">
            Historia, tradiciones y esencia del Pueblo Mágico de San Carlos.
          </p>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <SectionTitle
              eyebrow="Próximamente"
              title="Cultura en construcción"
              subtitle="Estamos preparando una experiencia cultural extraordinaria para que descubras la esencia de San Carlos."
              center
            />
          </div>
        </Container>
      </section>
    </main>
  );
}
