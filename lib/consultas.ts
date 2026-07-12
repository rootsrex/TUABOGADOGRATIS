export type CampoConsulta = {
  key: string;
  label: string;
  placeholder: string;
};

export type Consulta = {
  slug: string;
  name: string;
  icon: string;
  description: string;
  campos: CampoConsulta[];
  entidad: string;
  entidadUrl: string;
  instrucciones: string;
};

export const consultas: Consulta[] = [
  {
    slug: "propietario-vehiculo",
    name: "Propietario de vehículo por placa",
    icon: "🚙",
    description: "Verifica los datos de matrícula de un vehículo usando su número de placa.",
    campos: [{ key: "placa", label: "Placa del vehículo", placeholder: "Ej: ABC-1234" }],
    entidad: "ANT · Agencia Nacional de Tránsito",
    entidadUrl: "https://www.ant.gob.ec",
    instrucciones:
      "Copia la placa, ábrela en el portal oficial de la ANT y búscala en la opción de consulta de matrícula o historial vehicular.",
  },
  {
    slug: "multas-transito",
    name: "Multas de tránsito",
    icon: "🚦",
    description: "Consulta multas pendientes por placa, cédula o número de licencia.",
    campos: [
      { key: "placa", label: "Placa del vehículo", placeholder: "Ej: ABC-1234" },
      { key: "cedula", label: "o cédula del conductor", placeholder: "Ej: 1712345678" },
    ],
    entidad: "ANT · Agencia Nacional de Tránsito",
    entidadUrl: "https://www.ant.gob.ec",
    instrucciones:
      "Copia el dato que prefieras usar (placa o cédula) y pégalo en el buscador de multas del portal oficial de la ANT.",
  },
  {
    slug: "antecedentes-penales",
    name: "Antecedentes penales",
    icon: "📋",
    description: "Genera tu certificado de antecedentes penales usando tu número de cédula.",
    campos: [{ key: "cedula", label: "Número de cédula", placeholder: "Ej: 1712345678" }],
    entidad: "Ministerio del Interior",
    entidadUrl: "https://certificados.ministeriodegobierno.gob.ec",
    instrucciones:
      "Copia tu cédula y pégala en el sistema de certificados del Ministerio del Interior para generar el PDF.",
  },
  {
    slug: "datos-registro-civil",
    name: "Datos de cédula (Registro Civil)",
    icon: "🪪",
    description: "Verifica el nombre y estado de una cédula ecuatoriana.",
    campos: [{ key: "cedula", label: "Número de cédula", placeholder: "Ej: 1712345678" }],
    entidad: "Registro Civil del Ecuador",
    entidadUrl: "https://www.registrocivil.gob.ec",
    instrucciones:
      "Copia la cédula y pégala en las opciones de consulta ciudadana del portal del Registro Civil.",
  },
  {
    slug: "cedula-con-nombres",
    name: "Cédula con nombres y apellidos",
    icon: "🔍",
    description: "Busca el número de cédula de una persona a partir de sus nombres y apellidos.",
    campos: [
      { key: "apellidos", label: "Apellidos completos", placeholder: "Ej: Pérez García" },
      { key: "nombres", label: "Nombres completos", placeholder: "Ej: Juan Carlos" },
    ],
    entidad: "Registro Civil del Ecuador",
    entidadUrl: "https://www.registrocivil.gob.ec",
    instrucciones:
      "Copia los nombres y apellidos y pégalos en la opción de consulta ciudadana por nombres del portal del Registro Civil.",
  },
];

export function getConsulta(slug: string): Consulta | undefined {
  return consultas.find((c) => c.slug === slug);
}
