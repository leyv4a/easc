import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const siteUrl = "https://escapateasancarlos.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Escápate a San Carlos | Turismo en San Carlos, Sonora",
    template: "%s | Escápate a San Carlos",
  },

  description:
    "Descubre San Carlos, Sonora: playas, yates, restaurantes, hospedaje, pesca, senderismo, buceo y experiencias únicas en el Mar de Cortés.",

  keywords: [
    "San Carlos Sonora",
    "Turismo en San Carlos",
    "Qué hacer en San Carlos",
    "Yates en San Carlos",
    "Hospedaje en San Carlos",
    "Restaurantes en San Carlos",
    "Tours en San Carlos",
    "Mar de Cortés",
    "Pueblo Mágico",
    "San Carlos México",
  ],

  authors: [{ name: "Gabriel Leyva Esquivel" }],
  creator: "Escápate a San Carlos",
  publisher: "Escápate a San Carlos",

  category: "travel",

  alternates: {
    canonical: siteUrl,
  },

  openGraph: {
    type: "website",
    locale: "es_MX",
    url: siteUrl,
    siteName: "Escápate a San Carlos",

    title: "Escápate a San Carlos | Turismo en San Carlos, Sonora",

    description:
      "Explora playas, yates, gastronomía, pesca, senderismo y experiencias inolvidables en San Carlos, Sonora.",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 1075,
        alt: "Escápate a San Carlos",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Escápate a San Carlos | Turismo en San Carlos",

    description:
      "Descubre las mejores experiencias, playas, yates y aventuras en San Carlos, Sonora.",

    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <Analytics />
      <head>
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />

        {/* Theme Color */}
        <meta name="theme-color" content="#0B1E2D" />

        {/* Geo SEO */}
        <meta name="geo.region" content="MX-SON" />
        <meta name="geo.placename" content="San Carlos, Sonora" />
        <meta name="geo.position" content="27.9577;-111.0617" />
        <meta name="ICBM" content="27.9577, -111.0617" />
      </head>

      <body className="font-inter antialiased bg-[#0B1E2D]">
        <Navbar />
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}