import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso legal",
  description: "Aviso legal y condiciones de uso de Tu Abogado Gratis.",
};

export default function AvisoLegalPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-4xl font-extrabold text-slate-900">Aviso legal</h1>
      <div className="prose-legal mt-6">
        <h2>Naturaleza de la información</h2>
        <p>
          Tu Abogado Gratis es un portal de contenido informativo y educativo
          sobre trámites y consultas frecuentes en el Ecuador. La información
          publicada tiene carácter general y orientativo.
        </p>
        <h2>No constituye asesoría jurídica</h2>
        <p>
          El contenido de este sitio no reemplaza la asesoría legal
          personalizada de un profesional del derecho. Cada caso puede tener
          particularidades que requieren análisis individual.
        </p>
        <h2>Actualidad de los trámites</h2>
        <p>
          Los procedimientos, requisitos, montos y plazos descritos pueden
          cambiar según las disposiciones de las instituciones públicas
          correspondientes. Recomendamos verificar siempre la información en los
          canales oficiales.
        </p>
        <h2>Enlaces externos</h2>
        <p>
          Este sitio puede contener enlaces a portales de instituciones
          públicas y otros recursos. No nos hacemos responsables del contenido
          de sitios de terceros.
        </p>
      </div>
    </div>
  );
}
