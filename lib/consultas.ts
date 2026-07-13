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
    slug: "nombre-por-cedula",
    name: "Nombre asociado a una cédula (RUC)",
    icon: "🔍",
    description: "Consulta el nombre del titular de una cédula a través del RUC en el SRI.",
    campos: [{ key: "cedula", label: "Número de cédula", placeholder: "Ej: 1712345678" }],
    entidad: "SRI · Servicio de Rentas Internas",
    entidadUrl: "https://www.sri.gob.ec",
    instrucciones:
      "Copia la cédula, y en el portal del SRI busca la opción \"Consulta de RUC\" (dentro de SRI en línea → Consultas públicas) para ver el nombre asociado. Por ley, el nombre de un contribuyente es información pública para fines de facturación.",
  },
  {
    slug: "valor-matricula",
    name: "Valor a pagar de matrícula vehicular",
    icon: "💵",
    description: "Consulta cuánto debes pagar de matrícula (SPPAT, ANT, RTV, IPVM) según tu placa.",
    campos: [{ key: "placa", label: "Placa del vehículo", placeholder: "Ej: ABC-1234" }],
    entidad: "ANT · Agencia Nacional de Tránsito",
    entidadUrl: "https://portal.ant.gob.ec/valor-pagar-matriculacion",
    instrucciones:
      "Copia tu placa y pégala en el portal oficial de la ANT para ver el desglose exacto: SPPAT, tarifa ANT, revisión técnica (RTV) e impuesto a la propiedad vehicular (IPVM/SRI).",
  },
  {
    slug: "consultar-licencia",
    name: "Estado de mi licencia de conducir",
    icon: "🪪",
    description: "Verifica el estado, tipo y vigencia de tu licencia de conducir.",
    campos: [{ key: "cedula", label: "Número de cédula", placeholder: "Ej: 1712345678" }],
    entidad: "ANT · Agencia Nacional de Tránsito",
    entidadUrl: "https://consultaweb.ant.gob.ec/PortalWEB/paginas/clientes/clp_criterio_consulta.jsp",
    instrucciones:
      "Copia tu cédula y pégala directamente en el formulario de consulta del portal web de la ANT.",
  },
  {
    slug: "puntos-licencia",
    name: "Puntos de mi licencia",
    icon: "🎯",
    description: "Revisa cuántos puntos tienes disponibles en tu licencia de conducir.",
    campos: [{ key: "cedula", label: "Número de cédula", placeholder: "Ej: 1712345678" }],
    entidad: "ANT · Agencia Nacional de Tránsito",
    entidadUrl: "https://www.ant.gob.ec",
    instrucciones:
      "Copia tu cédula y pégala en la opción de consulta de puntos de licencia del portal oficial de la ANT.",
  },
  {
    slug: "fecha-nacimiento",
    name: "Fecha de nacimiento por cédula",
    icon: "🎂",
    description: "Verifica la fecha de nacimiento registrada para un número de cédula.",
    campos: [{ key: "cedula", label: "Número de cédula", placeholder: "Ej: 1712345678" }],
    entidad: "Registro Civil del Ecuador",
    entidadUrl: "https://www.registrocivil.gob.ec",
    instrucciones:
      "Copia la cédula y pégala en las opciones de consulta ciudadana del portal del Registro Civil.",
  },
];

export function getConsulta(slug: string): Consulta | undefined {
  return consultas.find((c) => c.slug === slug);
}
