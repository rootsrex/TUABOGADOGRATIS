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
  {
    slug: "poder-general",
    nombre: "Poder general",
    icon: "📃",
    descripcion: "Genera un poder general amplio para administración de bienes y representación.",
    campos: [
      { key: "lugar", label: "Ciudad", tipo: "text" },
      { key: "fecha", label: "Fecha", tipo: "date" },
      { key: "notario", label: "Cantón del notario", tipo: "text" },
      { key: "otorgante", label: "Tu nombre (poderdante)", tipo: "text" },
      { key: "cedulaOtorgante", label: "Tu cédula", tipo: "text" },
      { key: "apoderado", label: "Nombre del apoderado", tipo: "text" },
      { key: "cedulaApoderado", label: "Cédula del apoderado", tipo: "text" },
      { key: "exclusiones", label: "Actos excluidos (opcional)", tipo: "textarea", placeholder: "Ej: venta de bienes inmuebles" },
    ],
    generar: (d) => `PODER GENERAL

En la ciudad de ${f(d.lugar)}, ${fechaLarga(d.fecha)}, ante mí, Notario/a del cantón ${f(d.notario)}, comparece el/la señor/a ${f(d.otorgante)}, de nacionalidad ecuatoriana, mayor de edad, portador/a de la cédula de ciudadanía N.º ${f(d.cedulaOtorgante)}, quien libre y voluntariamente otorga PODER GENERAL amplio y suficiente a favor de: ${f(d.apoderado)}, portador/a de la cédula de ciudadanía N.º ${f(d.cedulaApoderado)}, para que en su nombre y representación pueda:

1. Administrar sus bienes muebles e inmuebles.
2. Realizar gestiones bancarias y financieras, incluyendo apertura y manejo de cuentas.
3. Representarlo/a en trámites administrativos ante entidades públicas y privadas.
4. Comparecer en su nombre ante autoridades judiciales y extrajudiciales.
5. Suscribir contratos ordinarios de administración.

Se EXCLUYEN expresamente del presente poder los siguientes actos, que requerirán poder especial adicional: ${f(d.exclusiones, "ninguno")}.

El presente poder tendrá vigencia hasta su revocatoria expresa por parte del poderdante.

Para constancia, firma el/la otorgante ante el Notario/a:


______________________
Nombre: ${f(d.otorgante)}
C.I.: ${f(d.cedulaOtorgante)}`,
  },
  {
    slug: "contrato-prestamo-dinero",
    nombre: "Contrato de préstamo de dinero",
    icon: "💰",
    descripcion: "Genera un contrato de préstamo de dinero entre particulares, con plazo e interés.",
    campos: [
      { key: "lugar", label: "Ciudad", tipo: "text" },
      { key: "fecha", label: "Fecha", tipo: "date" },
      { key: "prestamista", label: "Nombre del prestamista", tipo: "text" },
      { key: "cedulaPrestamista", label: "Cédula del prestamista", tipo: "text" },
      { key: "prestatario", label: "Nombre del prestatario", tipo: "text" },
      { key: "cedulaPrestatario", label: "Cédula del prestatario", tipo: "text" },
      { key: "monto", label: "Monto del préstamo (USD)", tipo: "number" },
      { key: "formaPago", label: "Forma de pago", tipo: "textarea", placeholder: "Ej: pago único el .../ en 6 cuotas mensuales de USD 100" },
      { key: "interes", label: "Interés pactado (%, o 'sin intereses')", tipo: "text" },
    ],
    generar: (d) => `CONTRATO DE PRÉSTAMO DE DINERO

En la ciudad de ${f(d.lugar)}, ${fechaLarga(d.fecha)}, comparecen por una parte ${f(d.prestamista)}, con cédula N.º ${f(d.cedulaPrestamista)}, a quien se denominará EL PRESTAMISTA; y por otra parte ${f(d.prestatario)}, con cédula N.º ${f(d.cedulaPrestatario)}, a quien se denominará EL PRESTATARIO.

PRIMERA - OBJETO: EL PRESTAMISTA entrega en calidad de préstamo a EL PRESTATARIO la cantidad de USD ${f(d.monto)}, quien declara recibirla a su entera satisfacción en este acto.

SEGUNDA - PLAZO Y FORMA DE PAGO: EL PRESTATARIO se compromete a devolver el monto de la siguiente forma: ${f(d.formaPago)}.

TERCERA - INTERÉS: Las partes acuerdan un interés de ${f(d.interes, "0 % (sin intereses)")}.

CUARTA - MORA: En caso de retraso en el pago, se generará un interés por mora sobre el valor vencido, sin perjuicio de las acciones legales que correspondan.

QUINTA - ACEPTACIÓN: Las partes aceptan el contenido íntegro de este contrato y lo firman en dos ejemplares del mismo tenor.


______________________            ______________________
     EL PRESTAMISTA                     EL PRESTATARIO
   C.I.: ${f(d.cedulaPrestamista)}                C.I.: ${f(d.cedulaPrestatario)}`,
  },
  {
    slug: "contrato-servicios-profesionales",
    nombre: "Contrato de servicios profesionales",
    icon: "🧑‍💼",
    descripcion: "Genera un contrato civil para contratar servicios profesionales independientes.",
    campos: [
      { key: "lugar", label: "Ciudad", tipo: "text" },
      { key: "fecha", label: "Fecha", tipo: "date" },
      { key: "contratante", label: "Nombre del contratante", tipo: "text" },
      { key: "rucContratante", label: "Cédula/RUC del contratante", tipo: "text" },
      { key: "prestador", label: "Nombre del prestador", tipo: "text" },
      { key: "rucPrestador", label: "RUC del prestador", tipo: "text" },
      { key: "objeto", label: "Servicio a prestar", tipo: "textarea" },
      { key: "plazo", label: "Plazo del contrato", tipo: "text", placeholder: "Ej: 3 meses" },
      { key: "honorarios", label: "Honorarios (USD)", tipo: "number" },
      { key: "formaPago", label: "Forma de pago", tipo: "text", placeholder: "Pago único / por hitos / mensual" },
    ],
    generar: (d) => `CONTRATO DE PRESTACIÓN DE SERVICIOS PROFESIONALES

En la ciudad de ${f(d.lugar)}, ${fechaLarga(d.fecha)}, comparecen por una parte ${f(d.contratante)}, con RUC/C.I. N.º ${f(d.rucContratante)}, a quien se denominará EL CONTRATANTE; y por otra parte ${f(d.prestador)}, con RUC N.º ${f(d.rucPrestador)}, a quien se denominará EL PRESTADOR.

PRIMERA - OBJETO: EL PRESTADOR se compromete a realizar para EL CONTRATANTE el siguiente servicio: ${f(d.objeto)}.

SEGUNDA - PLAZO: El presente contrato tendrá una duración de ${f(d.plazo)}, contados desde la fecha de suscripción.

TERCERA - HONORARIOS: EL CONTRATANTE pagará a EL PRESTADOR la suma de USD ${f(d.honorarios)}, mediante la siguiente forma de pago: ${f(d.formaPago)}, previa entrega del comprobante de venta correspondiente.

CUARTA - NATURALEZA CIVIL: Las partes declaran que el presente contrato es de naturaleza civil, sin que se genere relación de dependencia laboral.

QUINTA - TERMINACIÓN: El contrato termina por cumplimiento del objeto contratado, por mutuo acuerdo, o por incumplimiento de cualquiera de las partes.

Para constancia, firman las partes:


______________________            ______________________
     EL CONTRATANTE                      EL PRESTADOR
   C.I./RUC: ${f(d.rucContratante)}              RUC: ${f(d.rucPrestador)}`,
  },
  {
    slug: "contrato-trabajo-plazo-fijo",
    nombre: "Contrato de trabajo a plazo fijo",
    icon: "📋",
    descripcion: "Genera un contrato laboral con duración determinada y las cláusulas esenciales.",
    campos: [
      { key: "lugar", label: "Ciudad", tipo: "text" },
      { key: "fecha", label: "Fecha", tipo: "date" },
      { key: "empresa", label: "Razón social de la empresa", tipo: "text" },
      { key: "ruc", label: "RUC de la empresa", tipo: "text" },
      { key: "trabajador", label: "Nombre del trabajador", tipo: "text" },
      { key: "cedula", label: "Cédula del trabajador", tipo: "text" },
      { key: "cargo", label: "Cargo", tipo: "text" },
      { key: "fechaInicio", label: "Fecha de inicio", tipo: "date" },
      { key: "fechaFin", label: "Fecha de fin", tipo: "date" },
      { key: "remuneracion", label: "Remuneración mensual (USD)", tipo: "number" },
      { key: "jornada", label: "Horas semanales de jornada", tipo: "text", placeholder: "40" },
      { key: "horario", label: "Horario", tipo: "text", placeholder: "08:00 a 17:00" },
      { key: "lugarTrabajo", label: "Lugar de trabajo", tipo: "text" },
    ],
    generar: (d) => `CONTRATO DE TRABAJO A PLAZO FIJO

En la ciudad de ${f(d.lugar)}, ${fechaLarga(d.fecha)}, comparecen por una parte ${f(d.empresa)}, con RUC N.º ${f(d.ruc)}, a quien se denominará EL EMPLEADOR; y por otra parte ${f(d.trabajador)}, con cédula N.º ${f(d.cedula)}, a quien se denominará EL TRABAJADOR.

PRIMERA - OBJETO: EL TRABAJADOR prestará sus servicios lícitos y personales para EL EMPLEADOR en el cargo de ${f(d.cargo)}.

SEGUNDA - PLAZO: El presente contrato tendrá una duración desde el ${fechaLarga(d.fechaInicio)} hasta el ${fechaLarga(d.fechaFin)}.

TERCERA - REMUNERACIÓN: EL EMPLEADOR pagará a EL TRABAJADOR una remuneración mensual de USD ${f(d.remuneracion)}, más los beneficios de ley.

CUARTA - JORNADA: La jornada de trabajo será de ${f(d.jornada)} horas semanales, en el horario de ${f(d.horario)}.

QUINTA - LUGAR DE TRABAJO: El trabajador prestará sus servicios en ${f(d.lugarTrabajo)}.

SEXTA - AFILIACIÓN AL IESS: EL EMPLEADOR se compromete a afiliar a EL TRABAJADOR al IESS desde el primer día de labores.

SÉPTIMA - TERMINACIÓN: El contrato terminará por vencimiento del plazo pactado, sin perjuicio de las causales previstas en el Código del Trabajo.

Para constancia, firman las partes:


______________________            ______________________
      EL EMPLEADOR                       EL TRABAJADOR
   RUC: ${f(d.ruc)}                  C.I.: ${f(d.cedula)}`,
  },
  {
    slug: "demanda-divorcio-mutuo-acuerdo",
    nombre: "Demanda de divorcio por mutuo acuerdo",
    icon: "💔",
    descripcion: "Genera la demanda de divorcio cuando ambos cónyuges están de acuerdo.",
    campos: [
      { key: "unidad", label: "Unidad Judicial de Familia de", tipo: "text" },
      { key: "conyuge1", label: "Nombre cónyuge 1", tipo: "text" },
      { key: "cedula1", label: "Cédula cónyuge 1", tipo: "text" },
      { key: "conyuge2", label: "Nombre cónyuge 2", tipo: "text" },
      { key: "cedula2", label: "Cédula cónyuge 2", tipo: "text" },
      { key: "fechaMatrimonio", label: "Fecha de matrimonio", tipo: "date" },
      { key: "actaMatrimonio", label: "N.º de acta de matrimonio", tipo: "text" },
      { key: "hijos", label: "¿Tienen hijos menores? Detalle acuerdo (o 'No tenemos hijos menores')", tipo: "textarea" },
      { key: "bienes", label: "Bienes de la sociedad conyugal (o 'No existen bienes')", tipo: "textarea" },
    ],
    generar: (d) => `SEÑOR/A JUEZ/A DE LA UNIDAD JUDICIAL DE FAMILIA DE ${f(d.unidad)}

Nosotros, ${f(d.conyuge1)} y ${f(d.conyuge2)}, de nacionalidad ecuatoriana, mayores de edad, portadores de las cédulas de ciudadanía N.º ${f(d.cedula1)} y N.º ${f(d.cedula2)} respectivamente, comparecemos ante usted y de común acuerdo presentamos la siguiente DEMANDA DE DIVORCIO POR MUTUO CONSENTIMIENTO:

1. ANTECEDENTES: Contrajimos matrimonio civil el ${fechaLarga(d.fechaMatrimonio)}, según consta en el acta de matrimonio N.º ${f(d.actaMatrimonio)}.

2. DECLARACIÓN DE VOLUNTAD: De común acuerdo y de manera libre y voluntaria, hemos decidido dar por terminado nuestro vínculo matrimonial.

3. HIJOS EN COMÚN: ${f(d.hijos, "No tenemos hijos menores de edad producto de esta unión.")}

4. BIENES DE LA SOCIEDAD CONYUGAL: ${f(d.bienes, "No existen bienes de la sociedad conyugal.")}

5. PETICIÓN: Solicitamos se declare disuelto el vínculo matrimonial contraído entre los comparecientes, y se disponga la inscripción de la sentencia en el Registro Civil.

Firmamos:


______________________            ______________________
      CÓNYUGE 1                          CÓNYUGE 2
   C.I.: ${f(d.cedula1)}                C.I.: ${f(d.cedula2)}`,
  },
  {
    slug: "demanda-rebaja-pension-alimenticia",
    nombre: "Demanda de rebaja de pensión alimenticia",
    icon: "📉",
    descripcion: "Genera la demanda para solicitar la reducción de una pensión alimenticia.",
    campos: [
      { key: "unidad", label: "Unidad Judicial de Familia de", tipo: "text" },
      { key: "actor", label: "Tu nombre completo", tipo: "text" },
      { key: "cedula", label: "Tu cédula", tipo: "text" },
      { key: "domicilio", label: "Tu domicilio", tipo: "text" },
      { key: "demandado", label: "Nombre del representante del beneficiario", tipo: "text" },
      { key: "cedulaDemandado", label: "Cédula del demandado", tipo: "text" },
      { key: "numeroProceso", label: "N.º de proceso original", tipo: "text" },
      { key: "pensionActual", label: "Pensión actual (USD/mes)", tipo: "number" },
      { key: "razones", label: "Razones del cambio de situación económica", tipo: "textarea" },
      { key: "pensionPropuesta", label: "Nuevo monto propuesto (USD/mes)", tipo: "number" },
    ],
    generar: (d) => `SEÑOR/A JUEZ/A DE LA UNIDAD JUDICIAL DE FAMILIA DE ${f(d.unidad)}

Yo, ${f(d.actor)}, de nacionalidad ecuatoriana, portador/a de la cédula de ciudadanía N.º ${f(d.cedula)}, domiciliado/a en ${f(d.domicilio)}, comparezco y presento la siguiente DEMANDA DE REBAJA DE PENSIÓN ALIMENTICIA:

1. IDENTIFICACIÓN DEL DEMANDADO/A: ${f(d.demandado)}, con cédula N.º ${f(d.cedulaDemandado)}.

2. ANTECEDENTES: Mediante resolución dictada dentro del proceso N.º ${f(d.numeroProceso)}, se fijó a mi cargo una pensión alimenticia mensual de USD ${f(d.pensionActual)}.

3. FUNDAMENTOS DE HECHO: Desde la fecha de aquella resolución mis circunstancias económicas han variado por las siguientes razones: ${f(d.razones)}, lo cual me impide continuar pagando el valor actualmente fijado.

4. PRETENSIÓN: Solicito que se REBAJE la pensión alimenticia al valor de USD ${f(d.pensionPropuesta)} mensuales, acorde a mi capacidad económica actual.

5. FUNDAMENTOS DE DERECHO: Amparo mi pretensión en el Código de la Niñez y Adolescencia y en la Tabla de Pensiones Alimenticias Mínimas vigente.

Firmo con mi abogado/a patrocinador/a.


______________________            ______________________
        ACTOR/A                       ABOGADO/A (Mat. ____)`,
  },
  {
    slug: "demanda-tenencia-hijos",
    nombre: "Demanda de tenencia de hijos",
    icon: "👨‍👧",
    descripcion: "Genera la demanda para solicitar judicialmente la tenencia de un hijo menor de edad.",
    campos: [
      { key: "unidad", label: "Unidad Judicial de Familia de", tipo: "text" },
      { key: "actor", label: "Tu nombre completo", tipo: "text" },
      { key: "cedula", label: "Tu cédula", tipo: "text" },
      { key: "domicilio", label: "Tu domicilio", tipo: "text" },
      { key: "demandado", label: "Nombre del otro progenitor", tipo: "text" },
      { key: "cedulaDemandado", label: "Cédula del otro progenitor", tipo: "text" },
      { key: "hijo", label: "Nombre del hijo/a", tipo: "text" },
      { key: "edadHijo", label: "Edad del hijo/a", tipo: "text" },
      { key: "antecedentes", label: "Antecedentes (situación actual)", tipo: "textarea" },
      { key: "fundamentos", label: "Fundamentos de tu solicitud", tipo: "textarea" },
    ],
    generar: (d) => `SEÑOR/A JUEZ/A DE LA UNIDAD JUDICIAL DE FAMILIA DE ${f(d.unidad)}

Yo, ${f(d.actor)}, de nacionalidad ecuatoriana, portador/a de la cédula de ciudadanía N.º ${f(d.cedula)}, con domicilio en ${f(d.domicilio)}, comparezco y presento la siguiente DEMANDA DE TENENCIA:

1. IDENTIFICACIÓN DEL DEMANDADO/A: ${f(d.demandado)}, con cédula N.º ${f(d.cedulaDemandado)}.

2. HIJOS EN COMÚN: Somos progenitores de ${f(d.hijo)}, de ${f(d.edadHijo)} años de edad.

3. ANTECEDENTES: ${f(d.antecedentes)}

4. FUNDAMENTOS: Solicito la tenencia con fundamento en el interés superior del menor, considerando: ${f(d.fundamentos)}

5. PETICIÓN: Solicito se conceda la TENENCIA de mi hijo/a ${f(d.hijo)} a mi favor, estableciendo un régimen de visitas adecuado para el otro progenitor y fijando la pensión alimenticia correspondiente.

Firmo con mi abogado/a patrocinador/a.


______________________            ______________________
        ACTOR/A                       ABOGADO/A (Mat. ____)`,
  },
  {
    slug: "autorizacion-salida-menor",
    nombre: "Autorización de salida del país para menor",
    icon: "✈️",
    descripcion: "Genera la autorización para que un menor de edad viaje al exterior.",
    campos: [
      { key: "progenitor", label: "Tu nombre (quien autoriza)", tipo: "text" },
      { key: "cedula", label: "Tu cédula", tipo: "text" },
      { key: "menor", label: "Nombre del menor", tipo: "text" },
      { key: "cedulaMenor", label: "Cédula/pasaporte del menor", tipo: "text" },
      { key: "destino", label: "País/ciudad de destino", tipo: "text" },
      { key: "transporte", label: "Vuelo/medio de transporte", tipo: "text" },
      { key: "fechaSalida", label: "Fecha de salida", tipo: "date" },
      { key: "fechaRetorno", label: "Fecha de retorno", tipo: "date" },
      { key: "acompanante", label: "¿Con quién viaja el menor?", tipo: "text", placeholder: "Ej: con su madre / con su tío Juan Pérez" },
      { key: "motivo", label: "Motivo del viaje", tipo: "text" },
    ],
    generar: (d) => `AUTORIZACIÓN DE SALIDA DEL PAÍS PARA MENOR DE EDAD

Yo, ${f(d.progenitor)}, de nacionalidad ecuatoriana, mayor de edad, portador/a de la cédula de ciudadanía N.º ${f(d.cedula)}, en mi calidad de padre/madre del menor ${f(d.menor)}, con cédula o pasaporte N.º ${f(d.cedulaMenor)}, por medio de la presente AUTORIZO a mi hijo/a a salir del territorio ecuatoriano con destino a ${f(d.destino)}, en el vuelo/medio de transporte ${f(d.transporte)}, con fecha de salida ${fechaLarga(d.fechaSalida)} y fecha de retorno ${fechaLarga(d.fechaRetorno)}.

El menor viajará ${f(d.acompanante)}.

Motivo del viaje: ${f(d.motivo)}.

Dejo constancia de que otorgo esta autorización de forma libre y voluntaria.

______________________
Nombre: ${f(d.progenitor)}
C.I.: ${f(d.cedula)}`,
  },
  {
    slug: "denuncia-violencia-intrafamiliar",
    nombre: "Denuncia por violencia intrafamiliar",
    icon: "🛡️",
    descripcion: "Genera la denuncia y solicitud de medidas de protección por violencia intrafamiliar.",
    campos: [
      { key: "unidad", label: "Unidad/Fiscalía de", tipo: "text" },
      { key: "denunciante", label: "Tu nombre completo", tipo: "text" },
      { key: "cedula", label: "Tu cédula", tipo: "text" },
      { key: "domicilio", label: "Tu domicilio", tipo: "text" },
      { key: "denunciado", label: "Nombre del denunciado", tipo: "text" },
      { key: "cedulaDenunciado", label: "Cédula del denunciado", tipo: "text" },
      { key: "relacion", label: "Relación con el denunciado", tipo: "text", placeholder: "Cónyuge, pareja, familiar" },
      { key: "hechos", label: "Relato de los hechos", tipo: "textarea" },
      { key: "riesgoActual", label: "Riesgo actual (si existe)", tipo: "textarea" },
    ],
    generar: (d) => `SEÑOR/A FISCAL DE TURNO / SEÑOR/A JUEZ/A DE VIOLENCIA CONTRA LA MUJER O MIEMBROS DEL NÚCLEO FAMILIAR DE ${f(d.unidad)}

Yo, ${f(d.denunciante)}, de nacionalidad ecuatoriana, portador/a de la cédula de ciudadanía N.º ${f(d.cedula)}, con domicilio en ${f(d.domicilio)}, comparezco y presento la siguiente DENUNCIA POR VIOLENCIA INTRAFAMILIAR en contra de:

DENUNCIADO/A: ${f(d.denunciado)}, con cédula N.º ${f(d.cedulaDenunciado)}, con quien mantengo la siguiente relación: ${f(d.relacion)}.

1. HECHOS: ${f(d.hechos)}

2. RIESGO ACTUAL: ${f(d.riesgoActual, "No existe riesgo inminente adicional al descrito.")}

3. PETICIÓN: Solicito iniciar la investigación correspondiente y disponer las MEDIDAS DE PROTECCIÓN inmediatas a mi favor y de mi núcleo familiar, incluyendo boleta de auxilio, prohibición de acercamiento del denunciado, y salida del agresor del domicilio familiar.


______________________
Nombre: ${f(d.denunciante)}
C.I.: ${f(d.cedula)}`,
  },
  {
    slug: "impugnacion-multa-transito",
    nombre: "Impugnación de multa de tránsito",
    icon: "🚦",
    descripcion: "Genera la impugnación de una multa de tránsito que consideras injusta o errónea.",
    campos: [
      { key: "unidad", label: "Unidad Judicial de Tránsito de", tipo: "text" },
      { key: "actor", label: "Tu nombre completo", tipo: "text" },
      { key: "cedula", label: "Tu cédula", tipo: "text" },
      { key: "domicilio", label: "Tu domicilio", tipo: "text" },
      { key: "placa", label: "Placa del vehículo", tipo: "text" },
      { key: "numeroMulta", label: "Número de la multa", tipo: "text" },
      { key: "fechaMulta", label: "Fecha de la multa", tipo: "date" },
      { key: "infraccion", label: "Infracción señalada", tipo: "text" },
      { key: "fundamentos", label: "Razones de la impugnación", tipo: "textarea" },
      { key: "pruebas", label: "Pruebas que adjuntas", tipo: "textarea" },
    ],
    generar: (d) => `SEÑOR/A JUEZ/A DE LA UNIDAD JUDICIAL DE TRÁNSITO DE ${f(d.unidad)}

Yo, ${f(d.actor)}, de nacionalidad ecuatoriana, portador/a de la cédula de ciudadanía N.º ${f(d.cedula)}, con domicilio en ${f(d.domicilio)}, propietario/a y/o conductor/a del vehículo de placa ${f(d.placa)}, comparezco y presento la siguiente IMPUGNACIÓN a la multa de tránsito N.º ${f(d.numeroMulta)}, generada con fecha ${fechaLarga(d.fechaMulta)}, por la presunta infracción de ${f(d.infraccion)}.

1. FUNDAMENTOS DE LA IMPUGNACIÓN: ${f(d.fundamentos)}

2. PRUEBA: ${f(d.pruebas)}

3. PETICIÓN: Solicito se admita la presente impugnación y se deje sin efecto la multa N.º ${f(d.numeroMulta)} y los puntos descontados de mi licencia, de corresponder.


______________________
Nombre: ${f(d.actor)}
C.I.: ${f(d.cedula)}`,
  },
  {
    slug: "carta-recomendacion",
    nombre: "Carta de recomendación laboral",
    icon: "📝",
    descripcion: "Genera una carta de recomendación respaldando la experiencia de un exempleado.",
    campos: [
      { key: "lugar", label: "Ciudad", tipo: "text" },
      { key: "fecha", label: "Fecha", tipo: "date" },
      { key: "firmante", label: "Tu nombre (quien recomienda)", tipo: "text" },
      { key: "cargoFirmante", label: "Tu cargo", tipo: "text" },
      { key: "recomendado", label: "Nombre de la persona recomendada", tipo: "text" },
      { key: "cedulaRecomendado", label: "Cédula del recomendado", tipo: "text" },
      { key: "fechaInicio", label: "Fecha de inicio laboral", tipo: "date" },
      { key: "fechaFin", label: "Fecha de fin laboral", tipo: "date" },
      { key: "cargo", label: "Cargo que ocupó", tipo: "text" },
      { key: "cualidades", label: "Cualidades y logros destacados", tipo: "textarea" },
      { key: "correo", label: "Tu correo de contacto", tipo: "text" },
    ],
    generar: (d) => `${f(d.lugar)}, ${fechaLarga(d.fecha)}

A quien pueda interesar:

Por medio de la presente, quien suscribe, ${f(d.firmante)}, en mi calidad de ${f(d.cargoFirmante)}, hago constar que el/la señor/a ${f(d.recomendado)}, con cédula de ciudadanía N.º ${f(d.cedulaRecomendado)}, laboró en esta institución desde el ${fechaLarga(d.fechaInicio)} hasta el ${fechaLarga(d.fechaFin)}, desempeñando el cargo de ${f(d.cargo)}.

Durante su permanencia, destacó por: ${f(d.cualidades)}

Extiendo la presente recomendación a solicitud del/de la interesado/a.

Quedo atento/a para cualquier consulta en el correo ${f(d.correo)}.

Atentamente,


______________________
Nombre: ${f(d.firmante)}
Cargo: ${f(d.cargoFirmante)}`,
  },
  {
    slug: "certificado-honorabilidad",
    nombre: "Certificado de honorabilidad",
    icon: "🤝",
    descripcion: "Genera un certificado de honorabilidad para trámites laborales, académicos o de crédito.",
    campos: [
      { key: "lugar", label: "Ciudad", tipo: "text" },
      { key: "fecha", label: "Fecha", tipo: "date" },
      { key: "firmante", label: "Tu nombre (quien certifica)", tipo: "text" },
      { key: "cedulaFirmante", label: "Tu cédula", tipo: "text" },
      { key: "relacion", label: "Tu relación con la persona", tipo: "text", placeholder: "Empleador, dirigente, colega" },
      { key: "certificado", label: "Nombre de la persona certificada", tipo: "text" },
      { key: "cedulaCertificado", label: "Cédula de la persona certificada", tipo: "text" },
      { key: "anios", label: "Años que la conoces", tipo: "text" },
      { key: "telefono", label: "Tu teléfono de contacto", tipo: "text" },
    ],
    generar: (d) => `CERTIFICADO DE HONORABILIDAD

Yo, ${f(d.firmante)}, con cédula de ciudadanía N.º ${f(d.cedulaFirmante)}, en mi calidad de ${f(d.relacion)}, tengo a bien CERTIFICAR:

Que conozco al señor/a ${f(d.certificado)}, portador/a de la cédula N.º ${f(d.cedulaCertificado)}, desde hace ${f(d.anios)} años, tiempo durante el cual ha demostrado ser una persona honesta, responsable y de buena conducta.

El/la interesado/a puede hacer uso del presente certificado para los fines que estime convenientes.

${f(d.lugar)}, ${fechaLarga(d.fecha)}


______________________
Nombre: ${f(d.firmante)}
C.I.: ${f(d.cedulaFirmante)}
Teléfono: ${f(d.telefono)}`,
  },
  {
    slug: "solicitud-visto-bueno",
    nombre: "Solicitud de visto bueno del trabajador",
    icon: "⚖️",
    descripcion: "Genera la solicitud de visto bueno ante el Ministerio del Trabajo por incumplimiento del empleador.",
    campos: [
      { key: "inspectoria", label: "Inspectoría del Trabajo de", tipo: "text" },
      { key: "trabajador", label: "Tu nombre completo", tipo: "text" },
      { key: "cedula", label: "Tu cédula", tipo: "text" },
      { key: "domicilio", label: "Tu domicilio", tipo: "text" },
      { key: "empresa", label: "Nombre de la empresa (empleador)", tipo: "text" },
      { key: "ruc", label: "RUC de la empresa", tipo: "text" },
      { key: "cargo", label: "Tu cargo", tipo: "text" },
      { key: "fechaIngreso", label: "Fecha de ingreso", tipo: "date" },
      { key: "causal", label: "Causal invocada", tipo: "text", placeholder: "Falta de pago / falta de afiliación al IESS" },
      { key: "hechos", label: "Detalle de los hechos", tipo: "textarea" },
      { key: "correo", label: "Tu correo de contacto", tipo: "text" },
    ],
    generar: (d) => `SEÑOR/A INSPECTOR/A DEL TRABAJO DE ${f(d.inspectoria)}

Yo, ${f(d.trabajador)}, de nacionalidad ecuatoriana, portador/a de la cédula de ciudadanía N.º ${f(d.cedula)}, con domicilio en ${f(d.domicilio)}, quien vengo prestando mis servicios para ${f(d.empresa)}, con RUC N.º ${f(d.ruc)}, en el cargo de ${f(d.cargo)} desde el ${fechaLarga(d.fechaIngreso)}, comparezco y solicito el VISTO BUENO en contra de mi empleador, con fundamento en la causal de ${f(d.causal)}.

DETALLE DE LOS HECHOS: ${f(d.hechos)}

PETICIÓN: Solicito se tramite la presente solicitud de visto bueno conforme al procedimiento establecido.

Correo de contacto: ${f(d.correo)}


______________________
Nombre: ${f(d.trabajador)}
C.I.: ${f(d.cedula)}`,
  },
  {
    slug: "solicitud-informe-ecu911",
    nombre: "Solicitud de informe de emergencia al ECU911",
    icon: "🚨",
    descripcion: "Genera la solicitud de acceso a información pública para pedir el informe de tu emergencia.",
    campos: [
      { key: "lugar", label: "Ciudad", tipo: "text" },
      { key: "fecha", label: "Fecha de la solicitud", tipo: "date" },
      { key: "solicitante", label: "Tu nombre completo", tipo: "text" },
      { key: "cedula", label: "Tu cédula", tipo: "text" },
      { key: "domicilio", label: "Tu domicilio", tipo: "text" },
      { key: "correo", label: "Tu correo electrónico", tipo: "text" },
      { key: "telefono", label: "Tu teléfono", tipo: "text" },
      { key: "fechaEvento", label: "Fecha de la emergencia", tipo: "date" },
      { key: "horaEvento", label: "Hora aproximada", tipo: "text" },
      { key: "lugarEvento", label: "Lugar de la emergencia", tipo: "text" },
      { key: "tipoEvento", label: "Tipo de evento reportado", tipo: "text" },
      { key: "numeroCaso", label: "Número de caso/parte policial (si lo tienes)", tipo: "text" },
      { key: "informacion", label: "Información solicitada", tipo: "textarea", placeholder: "Ej: informe de la atención, registro de hora de llamada, etc." },
    ],
    generar: (d) => `SOLICITUD DE ACCESO A LA INFORMACIÓN PÚBLICA
Servicio Integrado de Seguridad ECU 911
Dirección de Gestión Documental y Archivo

Lugar y fecha: ${f(d.lugar)}, ${fechaLarga(d.fecha)}

Yo, ${f(d.solicitante)}, con cédula de ciudadanía N.º ${f(d.cedula)}, con domicilio en ${f(d.domicilio)}, correo electrónico ${f(d.correo)}, teléfono ${f(d.telefono)}, al amparo de la Ley Orgánica de Transparencia y Acceso a la Información Pública (LOTAIP), solicito se me proporcione la siguiente información:

1. DESCRIPCIÓN DE LA EMERGENCIA:
   Fecha del evento: ${fechaLarga(d.fechaEvento)}      Hora aproximada: ${f(d.horaEvento)}
   Lugar: ${f(d.lugarEvento)}
   Tipo de evento reportado: ${f(d.tipoEvento)}
   Número de caso / parte policial: ${f(d.numeroCaso, "No dispongo de número de caso")}

2. INFORMACIÓN SOLICITADA: ${f(d.informacion)}

Quedo atento/a a su respuesta en los datos de contacto proporcionados.

Atentamente,


______________________
Nombre: ${f(d.solicitante)}
C.I.: ${f(d.cedula)}`,
  },
];

export function getDocumentoGenerable(slug: string): DocumentoGenerable | undefined {
  return documentosGenerables.find((doc) => doc.slug === slug);
}
