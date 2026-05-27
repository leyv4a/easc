// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <main 
      style={{ backgroundColor: '#172938' }} 
      className="flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center sm:py-32 lg:px-8"
    >
      <div className="max-w-md flex flex-col items-center">
        
        {/* Icono de Olas Minimalista (Ahora en blanco puro) */}
        <div className="mb-8 text-white" aria-hidden="true">
          <svg 
            width="120" 
            height="54" 
            viewBox="0 0 120 54" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-24 h-auto md:w-32"
          >
            <path 
              d="M0 32C15 12 30 12 45 32C60 52 75 52 90 32C105 12 120 12 135 32V54H0V32Z" 
              fill="currentColor"
            />
            <path 
              d="M0 15C15 -5 30 -5 45 15C60 35 75 35 90 15C105 -5 120 -5 135 15V54H0V15Z" 
              fill="currentColor"
              fillOpacity="0.3"
            />
          </svg>
        </div>

        {/* Código de error discreto (Gris claro/plateado) */}
        <p className="text-sm font-bold tracking-widest text-neutral-400 uppercase">
          Ruta no encontrada
        </p>
        
        {/* Título Principal (Blanco puro para máximo impacto) */}
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Naufragamos en esta ruta
        </h1>
        
        {/* Texto secundario (Gris claro muy legible sobre el fondo oscuro) */}
        <p className="mt-6 text-base leading-7 text-neutral-300 max-w-sm">
          Parece que las corrientes te llevaron a un lugar que no existe. Tu destino está más allá del horizonte conocido.
        </p>
        
        <div className="mt-12 flex items-center justify-center">
          {/* Botón principal: Fondo blanco con texto en el azul oscuro para alto contraste */}
          <Link
            href="/"
            style={{ color: '#172938' }}
            className="rounded-none bg-white px-8 py-3 text-sm font-semibold shadow-lg hover:bg-neutral-100 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Volver a puerto seguro
          </Link>
        </div>
      </div>
    </main>
  );
}