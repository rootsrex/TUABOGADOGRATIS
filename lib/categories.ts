export type Category = {
  slug: string;
  name: string;
  icon: string;
  description: string;
  color: string; // tailwind gradient classes
};

export const categories: Category[] = [
  {
    slug: "laboral-iess",
    name: "Laboral e IESS",
    icon: "💼",
    description:
      "Historia laboral, afiliación, fondos de reserva, décimos, jubilación y derechos del trabajador.",
    color: "from-brand-500 to-brand-700",
  },
  {
    slug: "familia",
    name: "Familia",
    icon: "👨‍👩‍👧",
    description:
      "Pensión alimenticia, divorcio, patria potestad, disolución de la sociedad conyugal y más.",
    color: "from-rose-500 to-pink-600",
  },
  {
    slug: "transito",
    name: "Tránsito y ANT",
    icon: "🚗",
    description:
      "Consulta y pago de multas, puntos de licencia, matriculación vehicular y trámites de la ANT.",
    color: "from-amber-500 to-orange-600",
  },
  {
    slug: "registro-civil",
    name: "Registro Civil",
    icon: "🪪",
    description:
      "Cédula, certificados, antecedentes penales, actas de nacimiento y matrimonio en línea.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    slug: "bonos",
    name: "Bonos y Ayudas",
    icon: "🤝",
    description:
      "Bono de Desarrollo Humano, bono Joaquín Gallegos Lara, MIDUVI y otros beneficios sociales.",
    color: "from-violet-500 to-purple-600",
  },
  {
    slug: "documentos",
    name: "Documentos y Contratos",
    icon: "📄",
    description:
      "Modelos de contratos, cartas, poderes y formatos legales listos para descargar y usar.",
    color: "from-sky-500 to-cyan-600",
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
