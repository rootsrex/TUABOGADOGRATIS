export type CampoGenerador = {
  key: string;
  label: string;
  tipo: "text" | "date" | "number" | "textarea";
  placeholder?: string;
};

export type DocumentoGenerable = {
  slug: string;
  nombre: string;
  icon: string;
  descripcion: string;
  campos: CampoGenerador[];
  generar: (d: Record<string, string>) => string;
};

function f(v: string | undefined, fallback = "__________"): string {
  return v && v.trim() ? v : fallback;
}

function fechaLarga(v: string | undefined): string {
  if (!v) return "____ de __________ de 20__";
  const date = new Date(v + "T00:00:00");
  if (isNaN(date.getTime())) return "____ de __________ de 20__";
  return date.toLocaleDateString("es-EC", { day: "numeric", month: "long", year: "numeric" });
}

export const documentosGenerables: DocumentoGenerable[] = [
  {
    slug: "carta-renuncia",
    nombre: "Carta de renuncia voluntaria",
    icon: "✉️",
    descripcion: "Genera tu carta de renuncia lista para entregar a tu empleador.",
    campos: [
      { key: "lugar", label: "Ciudad", tipo: "text", placeholder: "Quito" },
      { key: "fecha", label: "Fecha", tipo: "date" },
      { key: "empresa", label: "Nombre de la empresa", tipo: "text" },
      { key: "representante", label: "Representante legal / gerente", tipo: "text" },
      { key: "nombreTrabajador", label: "Tu nombre completo", tipo: "text" },
      { key: "cedula", label: "Tu cédula", tipo: "text" },
      { key: "cargo", label: "Tu cargo", tipo: "text" },
      { key: "fechaSalida", label: "Fecha efectiva de salida", tipo: "date" },
    ],
    generar: (d) => `${f(d.lugar)}, ${fechaLarga(d.fecha)}

Señor/a
${f(d.representante)}
GERENTE / REPRESENTANTE LEGAL DE ${f(d.empresa)}
Presente.-

De mis consideraciones:

Yo, ${f(d.nombreTrabajador)}, con cédula de ciudadanía N.º ${f(d.cedula)}, que vengo desempeñando el cargo de ${f(d.cargo)} en su representada, por medio de la presente comunico mi RENUNCIA VOLUNTARIA e irrevocable al cargo que ocupo.

Mi renuncia surtirá efecto a partir del ${fechaLarga(d.fechaSalida)}.

Agradezco la oportunidad y la experiencia adquirida durante el tiempo de trabajo, y solicito comedidamente se sirva disponer la liquidación de los valores que por ley me corresponden.

Atentamente,


______________________
Nombre: ${f(d.nombreTrabajador)}
C.I.: ${f(d.cedula)}`,
  },
  {
    slug: "certificado-trabajo",
    nombre: "Certificado de trabajo e ingresos",
    icon: "📄",
    descripcion: "Genera un certificado laboral con los datos del trabajador y la empresa.",
    campos: [
      { key: "empresa", label: "Razón social de la empresa", tipo: "text" },
      { key: "ruc", label: "RUC de la empresa", tipo: "text" },
      { key: "nombreTrabajador", label: "Nombre del trabajador", tipo: "text" },
      { key: "cedula", label: "Cédula del trabajador", tipo: "text" },
      { key: "fechaIngreso", label: "Fecha de ingreso", tipo: "date" },
      { key: "cargo", label: "Cargo", tipo: "text" },
      { key: "tipoContrato", label: "Tipo de contrato", tipo: "text", placeholder: "Indefinido / Plazo fijo" },
      { key: "remuneracion", label: "Remuneración mensual (USD)", tipo: "number" },
      { key: "lugar", label: "Ciudad", tipo: "text" },
      { key: "fecha", label: "Fecha de emisión", tipo: "date" },
      { key: "firmante", label: "Nombre de quien certifica", tipo: "text" },
      { key: "cargoFirmante", label: "Cargo de quien certifica", tipo: "text", placeholder: "Recursos Humanos" },
    ],
    generar: (d) => `CERTIFICADO DE TRABAJO E INGRESOS

${f(d.empresa)}, con RUC N.º ${f(d.ruc)}, por medio del presente documento CERTIFICA:

Que el/la señor/a ${f(d.nombreTrabajador)}, portador/a de la cédula de ciudadanía N.º ${f(d.cedula)}, labora en esta empresa desde el ${fechaLarga(d.fechaIngreso)} hasta la presente fecha, desempeñando el cargo de ${f(d.cargo)}, bajo modalidad de contrato ${f(d.tipoContrato)}.

Su remuneración mensual actual es de USD ${f(d.remuneracion)}.

Se extiende el presente certificado a solicitud del/de la interesado/a, para los fines que estime convenientes.

${f(d.lugar)}, ${fechaLarga(d.fecha)}


______________________
Nombre: ${f(d.firmante)}
Cargo: ${f(d.cargoFirmante)}
Empresa: ${f(d.empresa)}`,
  },
  {
    slug: "poder-especial",
    nombre: "Poder especial",
    icon: "📜",
    descripcion: "Genera un poder especial para autorizar un acto puntual a otra persona.",
    campos: [
      { key: "lugar", label: "Ciudad", tipo: "text" },
      { key: "fecha", label: "Fecha", tipo: "date" },
      { key: "notario", label: "Cantón del notario", tipo: "text" },
      { key: "otorgante", label: "Tu nombre (poderdante)", tipo: "text" },
      { key: "cedulaOtorgante", label: "Tu cédula", tipo: "text" },
      { key: "apoderado", label: "Nombre del apoderado", tipo: "text" },
      { key: "cedulaApoderado", label: "Cédula del apoderado", tipo: "text" },
      { key: "objeto", label: "Acto para el que autorizas", tipo: "textarea", placeholder: "Ej: vender el vehículo de placa ABC-1234" },
      { key: "vigencia", label: "Vigencia (fecha límite, opcional)", tipo: "date" },
    ],
    generar: (d) => `PODER ESPECIAL

En la ciudad de ${f(d.lugar)}, a ${fechaLarga(d.fecha)}, ante mí, Notario/a del cantón ${f(d.notario)}, comparece el/la señor/a ${f(d.otorgante)}, de nacionalidad ecuatoriana, mayor de edad, portador/a de la cédula de ciudadanía N.º ${f(d.cedulaOtorgante)}, quien libre y voluntariamente otorga PODER ESPECIAL a favor de: ${f(d.apoderado)}, portador/a de la cédula de ciudadanía N.º ${f(d.cedulaApoderado)}, para que en su nombre y representación realice el siguiente acto:

${f(d.objeto)}

El/la apoderado/a queda facultado/a para realizar todas las gestiones, firmas y trámites necesarios para el cumplimiento del objeto del presente poder, el cual tendrá vigencia hasta el ${fechaLarga(d.vigencia)} / hasta el cumplimiento del acto encomendado.

Para constancia, firma el/la otorgante ante el Notario/a:


______________________
Nombre: ${f(d.otorgante)}
C.I.: ${f(d.cedulaOtorgante)}`,
  },
  {
    slug: "contrato-arrendamiento",
    nombre: "Contrato de arrendamiento de vivienda",
    icon: "🏠",
    descripcion: "Genera un contrato de arriendo de vivienda con los datos de ambas partes.",
    campos: [
      { key: "lugar", label: "Ciudad", tipo: "text" },
      { key: "fecha", label: "Fecha", tipo: "date" },
      { key: "arrendador", label: "Nombre del arrendador", tipo: "text" },
      { key: "cedulaArrendador", label: "Cédula del arrendador", tipo: "text" },
      { key: "arrendatario", label: "Nombre del arrendatario", tipo: "text" },
      { key: "cedulaArrendatario", label: "Cédula del arrendatario", tipo: "text" },
      { key: "direccion", label: "Dirección del inmueble", tipo: "text" },
      { key: "canon", label: "Canon mensual (USD)", tipo: "number" },
      { key: "diaPago", label: "Día límite de pago mensual", tipo: "text", placeholder: "5" },
      { key: "plazoMeses", label: "Plazo del contrato (meses)", tipo: "number" },
      { key: "garantia", label: "Valor de garantía (USD)", tipo: "number" },
    ],
    generar: (d) => `CONTRATO DE ARRENDAMIENTO DE VIVIENDA

En la ciudad de ${f(d.lugar)}, a ${fechaLarga(d.fecha)}, comparecen:

ARRENDADOR: Sr./Sra. ${f(d.arrendador)}, con cédula N.º ${f(d.cedulaArrendador)}.
ARRENDATARIO: Sr./Sra. ${f(d.arrendatario)}, con cédula N.º ${f(d.cedulaArrendatario)}.

PRIMERA - OBJETO: El arrendador entrega en arriendo el inmueble ubicado en ${f(d.direccion)}, destinado exclusivamente a vivienda.

SEGUNDA - CANON: El arrendatario pagará un canon mensual de USD ${f(d.canon)}, dentro de los primeros ${f(d.diaPago)} días de cada mes.

TERCERA - PLAZO: El contrato tendrá una duración de ${f(d.plazoMeses)} meses, contados desde la fecha de suscripción.

CUARTA - GARANTÍA: El arrendatario entrega la suma de USD ${f(d.garantia)} como garantía, que será devuelta al finalizar el contrato sin daños al inmueble.

QUINTA - SERVICIOS: Los servicios básicos (agua, luz, internet) serán pagados por el arrendatario.

SEXTA - OBLIGACIONES: El arrendatario mantendrá el inmueble en buen estado y no podrá subarrendar sin autorización escrita del arrendador.

SÉPTIMA - TERMINACIÓN: El contrato terminará por vencimiento del plazo, mutuo acuerdo o incumplimiento, según la Ley de Inquilinato.

Para constancia, firman las partes:


______________________            ______________________
      ARRENDADOR                          ARRENDATARIO
   C.I.: ${f(d.cedulaArrendador)}                C.I.: ${f(d.cedulaArrendatario)}`,
  },
  {
    slug: "acta-finiquito",
    nombre: "Acta de finiquito laboral",
    icon: "🧾",
    descripcion: "Genera el acta de finiquito con la liquidación de valores al terminar la relación laboral.",
    campos: [
      { key: "lugar", label: "Ciudad", tipo: "text" },
      { key: "fecha", label: "Fecha", tipo: "date" },
      { key: "empresa", label: "Empleador (razón social)", tipo: "text" },
      { key: "rucEmpleador", label: "RUC/C.I. del empleador", tipo: "text" },
      { key: "trabajador", label: "Nombre del trabajador", tipo: "text" },
      { key: "cedulaTrabajador", label: "Cédula del trabajador", tipo: "text" },
      { key: "fechaIngreso", label: "Fecha de ingreso", tipo: "date" },
      { key: "fechaSalida", label: "Fecha de salida", tipo: "date" },
      { key: "cargo", label: "Cargo", tipo: "text" },
      { key: "motivo", label: "Motivo de terminación", tipo: "text", placeholder: "Renuncia voluntaria" },
      { key: "sueldos", label: "Sueldos pendientes (USD)", tipo: "number" },
      { key: "decimoTercero", label: "Décimo tercero proporcional (USD)", tipo: "number" },
      { key: "decimoCuarto", label: "Décimo cuarto proporcional (USD)", tipo: "number" },
      { key: "vacaciones", label: "Vacaciones no gozadas (USD)", tipo: "number" },
      { key: "fondosReserva", label: "Fondos de reserva (USD)", tipo: "number" },
      { key: "total", label: "Total liquidado (USD)", tipo: "number" },
    ],
    generar: (d) => `ACTA DE FINIQUITO

En la ciudad de ${f(d.lugar)}, ${fechaLarga(d.fecha)}, comparecen por una parte ${f(d.empresa)}, con RUC/C.I. N.º ${f(d.rucEmpleador)}, a quien en adelante se denominará EL EMPLEADOR; y por otra parte ${f(d.trabajador)}, con cédula de ciudadanía N.º ${f(d.cedulaTrabajador)}, a quien se denominará EL TRABAJADOR.

PRIMERA - ANTECEDENTES: EL TRABAJADOR prestó sus servicios para EL EMPLEADOR desde el ${fechaLarga(d.fechaIngreso)} hasta el ${fechaLarga(d.fechaSalida)}, en el cargo de ${f(d.cargo)}, relación laboral que terminó por ${f(d.motivo)}.

SEGUNDA - LIQUIDACIÓN DE HABERES: EL EMPLEADOR liquida a EL TRABAJADOR los siguientes valores:
   Sueldos pendientes: USD ${f(d.sueldos, "0.00")}
   Décimo tercer sueldo proporcional: USD ${f(d.decimoTercero, "0.00")}
   Décimo cuarto sueldo proporcional: USD ${f(d.decimoCuarto, "0.00")}
   Vacaciones no gozadas: USD ${f(d.vacaciones, "0.00")}
   Fondos de reserva: USD ${f(d.fondosReserva, "0.00")}
   TOTAL LIQUIDADO: USD ${f(d.total, "0.00")}

TERCERA - DECLARACIÓN: EL TRABAJADOR declara recibir a su entera satisfacción los valores detallados, y que no tiene reclamo laboral pendiente alguno en contra de EL EMPLEADOR.

Para constancia, firman las partes:


______________________            ______________________
      EL EMPLEADOR                       EL TRABAJADOR
   C.I./RUC: ${f(d.rucEmpleador)}              C.I.: ${f(d.cedulaTrabajador)}`,
  },
  {
    slug: "solicitud-vacaciones",
    nombre: "Solicitud de vacaciones",
    icon: "🌴",
    descripcion: "Genera tu solicitud formal de vacaciones para tu empleador.",
    campos: [
      { key: "lugar", label: "Ciudad", tipo: "text" },
      { key: "fecha", label: "Fecha", tipo: "date" },
      { key: "jefe", label: "Nombre del jefe/gerente", tipo: "text" },
      { key: "area", label: "Área o departamento", tipo: "text" },
      { key: "nombreTrabajador", label: "Tu nombre", tipo: "text" },
      { key: "cedula", label: "Tu cédula", tipo: "text" },
      { key: "cargo", label: "Tu cargo", tipo: "text" },
      { key: "fechaInicio", label: "Fecha de inicio de vacaciones", tipo: "date" },
      { key: "fechaFin", label: "Fecha de fin de vacaciones", tipo: "date" },
      { key: "fechaReincorporacion", label: "Fecha de reincorporación", tipo: "date" },
    ],
    generar: (d) => `${f(d.lugar)}, ${fechaLarga(d.fecha)}

Señor/a
${f(d.jefe)}
GERENTE / JEFE DE ${f(d.area)}
Presente.-

De mi consideración:

Yo, ${f(d.nombreTrabajador)}, con cédula de ciudadanía N.º ${f(d.cedula)}, quien desempeño el cargo de ${f(d.cargo)} en esta empresa, por medio de la presente solicito se me conceda el período de vacaciones correspondiente, del ${fechaLarga(d.fechaInicio)} al ${fechaLarga(d.fechaFin)}, reincorporándome a mis labores el ${fechaLarga(d.fechaReincorporacion)}.

Agradezco de antemano la atención brindada a la presente solicitud.

Atentamente,


______________________
Nombre: ${f(d.nombreTrabajador)}
C.I.: ${f(d.cedula)}`,
  },
  {
    slug: "denuncia-estafa",
    nombre: "Denuncia por estafa",
    icon: "🚨",
    descripcion: "Genera tu denuncia penal por estafa con tus datos y los hechos ocurridos.",
    campos: [
      { key: "fiscalia", label: "Fiscalía Provincial de", tipo: "text" },
      { key: "lugar", label: "Ciudad", tipo: "text" },
      { key: "fecha", label: "Fecha", tipo: "date" },
      { key: "denunciante", label: "Tu nombre completo", tipo: "text" },
      { key: "cedula", label: "Tu cédula", tipo: "text" },
      { key: "domicilio", label: "Tu domicilio", tipo: "text" },
      { key: "telefono", label: "Tu teléfono", tipo: "text" },
      { key: "correo", label: "Tu correo electrónico", tipo: "text" },
      { key: "denunciado", label: "Nombre del denunciado (si lo conoces)", tipo: "text" },
      { key: "cedulaDenunciado", label: "Cédula/RUC del denunciado (si la conoces)", tipo: "text" },
      { key: "hechos", label: "Relato de los hechos", tipo: "textarea", placeholder: "Describe cómo ocurrió el engaño y la entrega de dinero" },
      { key: "monto", label: "Monto defraudado (USD)", tipo: "number" },
    ],
    generar: (d) => `SEÑOR/A FISCAL DE TURNO — FISCALÍA PROVINCIAL DE ${f(d.fiscalia)}

Ciudad de ${f(d.lugar)}, ${fechaLarga(d.fecha)}.

DENUNCIANTE: ${f(d.denunciante)}, de nacionalidad ecuatoriana, mayor de edad, portador/a de la cédula de ciudadanía N.º ${f(d.cedula)}, con domicilio en ${f(d.domicilio)}, teléfono ${f(d.telefono)}, correo electrónico ${f(d.correo)}.

Comparezco ante usted, señor/a Fiscal, al amparo del artículo 421 del Código Orgánico Integral Penal (COIP) y presento la siguiente DENUNCIA PENAL POR EL DELITO DE ESTAFA en contra de:

DENUNCIADO/A: ${f(d.denunciado)}, portador/a de la cédula de ciudadanía / RUC N.º ${f(d.cedulaDenunciado)}.

I. HECHOS

${f(d.hechos)}

El daño económico total que he sufrido asciende a la suma de USD ${f(d.monto, "0.00")}.

II. TIPIFICACIÓN DEL DELITO

Los hechos descritos se encuadran en el delito de ESTAFA, tipificado y sancionado en el artículo 186 del COIP.

III. PETICIÓN

Solicito a usted, señor/a Fiscal, ADMITIR la presente denuncia, iniciar la investigación previa, y ordenar la devolución del dinero defraudado como parte de la reparación integral.

IV. NOTIFICACIONES

Correo electrónico: ${f(d.correo)}


Firma del/la Denunciante: ______________________
Nombre: ${f(d.denunciante)}
Cédula: ${f(d.cedula)}`,
  },
  {
    slug: "contrato-compraventa-vehiculo",
    nombre: "Contrato de compraventa de vehículo",
    icon: "🚗",
    descripcion: "Genera el contrato de compraventa con los datos del vehículo y ambas partes.",
    campos: [
      { key: "lugar", label: "Ciudad", tipo: "text" },
      { key: "fecha", label: "Fecha", tipo: "date" },
      { key: "vendedor", label: "Nombre del vendedor", tipo: "text" },
      { key: "cedulaVendedor", label: "Cédula del vendedor", tipo: "text" },
      { key: "comprador", label: "Nombre del comprador", tipo: "text" },
      { key: "cedulaComprador", label: "Cédula del comprador", tipo: "text" },
      { key: "marca", label: "Marca del vehículo", tipo: "text" },
      { key: "modelo", label: "Modelo", tipo: "text" },
      { key: "anio", label: "Año", tipo: "text" },
      { key: "placa", label: "Placa", tipo: "text" },
      { key: "matricula", label: "Número de matrícula", tipo: "text" },
      { key: "precio", label: "Precio (USD)", tipo: "number" },
    ],
    generar: (d) => `CONTRATO DE COMPRAVENTA DE VEHÍCULO

En la ciudad de ${f(d.lugar)}, ${fechaLarga(d.fecha)}, comparecen por una parte ${f(d.vendedor)}, con cédula N.º ${f(d.cedulaVendedor)}, a quien se denominará EL VENDEDOR; y por otra parte ${f(d.comprador)}, con cédula N.º ${f(d.cedulaComprador)}, a quien se denominará EL COMPRADOR.

PRIMERA - OBJETO: EL VENDEDOR da en venta real y perpetua enajenación a favor de EL COMPRADOR el siguiente vehículo:
   Marca: ${f(d.marca)}     Modelo: ${f(d.modelo)}     Año: ${f(d.anio)}
   Placa: ${f(d.placa)}     Matrícula N.º: ${f(d.matricula)}

SEGUNDA - PRECIO: El precio pactado es de USD ${f(d.precio)}, que EL COMPRADOR paga en este acto.

TERCERA - ENTREGA: EL VENDEDOR entrega el vehículo y sus documentos en buen estado a entera satisfacción de EL COMPRADOR.

CUARTA - DECLARACIÓN: EL VENDEDOR declara que el vehículo se encuentra libre de gravámenes, prohibiciones y multas a la fecha de esta venta.

QUINTA - TRASPASO: Las partes se comprometen a realizar el traspaso de dominio ante la autoridad de tránsito competente.

Para constancia, firman las partes:


______________________            ______________________
      EL VENDEDOR                       EL COMPRADOR
   C.I.: ${f(d.cedulaVendedor)}                C.I.: ${f(d.cedulaComprador)}`,
  },
];

export function getDocumentoGenerable(slug: string): DocumentoGenerable | undefined {
  return documentosGenerables.find((doc) => doc.slug === slug);
}
