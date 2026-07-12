export type Pregunta = {
  pregunta: string;
  opciones: string[];
  correcta: number; // índice de la opción correcta
};

export type Simulador = {
  slug: string;
  name: string;
  icon: string;
  description: string;
  preguntasAprobar: number;
  totalPreguntas: number;
};

export const simuladores: Simulador[] = [
  {
    slug: "licencia-tipo-b",
    name: "Simulador de examen teórico · Licencia tipo B",
    icon: "🚘",
    description: "Practica con preguntas de señales, normas y seguridad vial antes de tu examen real.",
    preguntasAprobar: 16,
    totalPreguntas: 20,
  },
];

export function getSimulador(slug: string): Simulador | undefined {
  return simuladores.find((s) => s.slug === slug);
}

export const bancoPreguntasTipoB: Pregunta[] = [
  {
    pregunta: "¿Qué indica una señal triangular con borde rojo y fondo blanco?",
    opciones: ["Una orden obligatoria", "Una advertencia o precaución", "Información turística", "Un límite de velocidad"],
    correcta: 1,
  },
  {
    pregunta: "¿Qué debes hacer al llegar a una señal de PARE?",
    opciones: [
      "Reducir la velocidad sin detenerte si no hay tráfico",
      "Detenerte completamente y ceder el paso antes de continuar",
      "Tocar el claxon y continuar",
      "Detenerte solo si hay un agente de tránsito presente",
    ],
    correcta: 1,
  },
  {
    pregunta: "En una intersección sin semáforo ni señalización, ¿quién tiene generalmente la prioridad de paso?",
    opciones: [
      "El vehículo que llega primero, independientemente del lado",
      "El vehículo que circula por la derecha",
      "El vehículo de mayor tamaño",
      "El vehículo que va más rápido",
    ],
    correcta: 1,
  },
  {
    pregunta: "¿Cuál es una de las principales razones para mantener una distancia de seguimiento adecuada con el vehículo de adelante?",
    opciones: [
      "Para poder adelantar más rápido",
      "Para tener tiempo y espacio de reaccionar y frenar sin colisionar",
      "Es solo una recomendación sin importancia real",
      "Para ahorrar combustible",
    ],
    correcta: 1,
  },
  {
    pregunta: "¿Qué debes hacer al escuchar la sirena de una ambulancia o vehículo de emergencia detrás de ti?",
    opciones: [
      "Acelerar para despejar la vía rápidamente",
      "Ignorarlo si tú tienes el semáforo en verde",
      "Ceder el paso de forma segura, orillándote si es posible",
      "Detenerte de inmediato en el carril donde estés",
    ],
    correcta: 2,
  },
  {
    pregunta: "¿Es obligatorio el uso del cinturón de seguridad para todos los ocupantes del vehículo?",
    opciones: [
      "Solo para el conductor",
      "Solo en carretera, no en la ciudad",
      "Sí, para el conductor y todos los pasajeros",
      "Solo si el vehículo es nuevo",
    ],
    correcta: 2,
  },
  {
    pregunta: "¿Qué significa una línea continua en el centro de la vía?",
    opciones: [
      "Se puede adelantar con precaución",
      "Está prohibido adelantar o cruzar esa línea",
      "Es un carril exclusivo para buses",
      "Indica el final de la vía",
    ],
    correcta: 1,
  },
  {
    pregunta: "¿Qué debes hacer si el semáforo cambia a amarillo mientras te acercas a la intersección?",
    opciones: [
      "Acelerar para cruzar antes de que cambie a rojo",
      "Prepararte para detenerte si es seguro hacerlo",
      "Ignorarlo, el amarillo no tiene efecto legal",
      "Tocar el claxon a los demás conductores",
    ],
    correcta: 1,
  },
  {
    pregunta: "¿Está permitido conducir usando el teléfono celular sin manos libres?",
    opciones: [
      "Sí, siempre que sea una llamada corta",
      "No, está prohibido usarlo sin un sistema de manos libres",
      "Sí, si el vehículo está detenido en un semáforo",
      "Solo está prohibido para conductores profesionales",
    ],
    correcta: 1,
  },
  {
    pregunta: "¿Qué documento(s) debe portar un conductor al circular?",
    opciones: [
      "Solo la cédula de identidad",
      "Licencia de conducir vigente y matrícula del vehículo",
      "Ningún documento es obligatorio si el vehículo es propio",
      "Solo el comprobante de pago del SPPAT",
    ],
    correcta: 1,
  },
  {
    pregunta: "¿Qué indica una señal circular con fondo azul?",
    opciones: [
      "Una prohibición",
      "Una orden obligatoria o indicación de acción a seguir",
      "Un peligro inminente",
      "Información de servicios turísticos",
    ],
    correcta: 1,
  },
  {
    pregunta: "Antes de adelantar a otro vehículo, ¿qué debes verificar?",
    opciones: [
      "Solo que no venga nadie por el carril contrario a simple vista",
      "Que haya visibilidad suficiente, espacio y que esté permitido adelantar en ese tramo",
      "Que el vehículo de adelante vaya lento, sin más verificación",
      "No es necesario verificar nada si tienes prisa",
    ],
    correcta: 1,
  },
  {
    pregunta: "¿Qué se recomienda hacer al conducir bajo lluvia intensa?",
    opciones: [
      "Mantener la misma velocidad de siempre",
      "Reducir la velocidad y aumentar la distancia de seguimiento",
      "Encender las luces intermitentes de emergencia mientras circulas normalmente",
      "Apagar las luces para ver mejor el pavimento",
    ],
    correcta: 1,
  },
  {
    pregunta: "¿Qué tipo de señal es un rectángulo con una flecha indicando dirección de una calle?",
    opciones: ["Preventiva", "Reglamentaria", "Informativa", "De peligro"],
    correcta: 2,
  },
  {
    pregunta: "¿Es legal conducir con niveles de alcohol en la sangre por encima del límite permitido?",
    opciones: [
      "Sí, si conduces con precaución",
      "No, está prohibido y es sancionado por la ley",
      "Solo está prohibido para motociclistas",
      "Sí, si es de noche y hay poco tráfico",
    ],
    correcta: 1,
  },
  {
    pregunta: "¿Qué debes hacer antes de cambiar de carril?",
    opciones: [
      "Cambiar directamente si no hay nadie justo al lado",
      "Verificar los espejos, el punto ciego y señalizar con la direccional",
      "Solo usar la direccional, sin verificar espejos",
      "Tocar el claxon para avisar",
    ],
    correcta: 1,
  },
  {
    pregunta: "¿Qué significa una señal preventiva de forma romboidal (diamante) con fondo amarillo?",
    opciones: [
      "Una orden que debes cumplir obligatoriamente",
      "Advierte sobre un peligro o condición especial de la vía más adelante",
      "Indica un límite de velocidad exacto",
      "Marca el fin de una zona escolar",
    ],
    correcta: 1,
  },
  {
    pregunta: "¿Qué se debe hacer al aproximarse a un paso peatonal con personas cruzando?",
    opciones: [
      "Acelerar para pasar antes de que terminen de cruzar",
      "Detenerse y ceder el paso a los peatones",
      "Tocar el claxon para que apuren el paso",
      "Solo detenerse si hay un semáforo en ese punto",
    ],
    correcta: 1,
  },
  {
    pregunta: "¿Qué rubro cubre el SPPAT dentro de la matrícula vehicular?",
    opciones: [
      "El impuesto a la propiedad del vehículo",
      "El seguro público que cubre accidentes de tránsito",
      "La revisión técnica vehicular",
      "El costo de la placa física",
    ],
    correcta: 1,
  },
  {
    pregunta: "¿Qué debes hacer si tu vehículo se avería en la vía?",
    opciones: [
      "Dejarlo en el carril y alejarte sin más",
      "Señalizarlo (triángulos o luces de emergencia) y moverlo a un lugar seguro si es posible",
      "Esperar dentro del vehículo en el mismo carril",
      "Empujarlo tú mismo sin ninguna señalización",
    ],
    correcta: 1,
  },
];
