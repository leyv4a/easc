import ContactFooter from "@/components/home/ContactFooter";
import Container from "@/components/ui/Container";

export default function ContactoPage() {
  return (
    <main className="bg-[#0B1E2D] min-h-screen pt-24">
      <Container className="pb-0">
        <div className="text-center mb-4">
          <p className="text-[#00AEEF] text-xs tracking-[0.3em] uppercase font-medium">
            Estamos aquí
          </p>
          <h1 className="font-playfair text-5xl md:text-7xl text-white mt-2">Contacto</h1>
        </div>
      </Container>
      <ContactFooter />
    </main>
  );
}
