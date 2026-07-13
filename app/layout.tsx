import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { buildSearchIndex } from "@/lib/search";

export const metadata: Metadata = {
  metadataBase: new URL("https://tuabogadogratis.ec"),
  title: {
    default: "Tu Abogado Gratis | Trámites y consultas legales del Ecuador",
    template: "%s | Tu Abogado Gratis",
  },
  description:
    "Guías claras y gratuitas sobre trámites legales del Ecuador: IESS, pensión alimenticia, multas ANT, Registro Civil, bonos y modelos de documentos.",
  keywords: [
    "trámites Ecuador",
    "consultas legales Ecuador",
    "IESS",
    "pensión alimenticia",
    "multas ANT",
    "Registro Civil",
    "bono desarrollo humano",
  ],
  openGraph: {
    title: "Tu Abogado Gratis",
    description: "Tu asesor legal en casa. Trámites y consultas del Ecuador explicados fácil.",
    type: "website",
    locale: "es_EC",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchIndex = buildSearchIndex();

  return (
    <html lang="es-EC">
     <head>
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890123456" crossOrigin="anonymous"></script>
        </head>
      <body>
        <Navbar searchIndex={searchIndex} />
        <main className="min-h-[60vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
