export type Calculadora = {
  slug: string;
  name: string;
  icon: string;
  description: string;
};

// SBU (Salario Básico Unificado) por defecto. Editable en las calculadoras.
export const SBU_DEFAULT = 470;

export const calculadoras: Calculadora[] = [
  {
    slug: "decimo-tercer-sueldo",
    name: "Décimo tercer sueldo",
    icon: "🎁",
    description: "Calcula tu bono navideño según lo que ganaste en el año.",
  },
  {
    slug: "decimo-cuarto-sueldo",
    name: "Décimo cuarto sueldo",
    icon: "🎒",
    description: "Estima el bono escolar en base al Salario Básico Unificado.",
  },
  {
    slug: "fondos-de-reserva",
    name: "Fondos de reserva",
    icon: "🏦",
    description: "El 8,33 % mensual que recibes desde tu segundo año de trabajo.",
  },
  {
    slug: "vacaciones",
    name: "Vacaciones no gozadas",
    icon: "🌴",
    description: "Calcula el valor de los días de vacación que no tomaste.",
  },
  {
    slug: "horas-extras",
    name: "Horas extras y suplementarias",
    icon: "⏰",
    description: "Recargo del 50 % y 100 % sobre el valor de tu hora de trabajo.",
  },
  {
    slug: "finiquito",
    name: "Liquidación / finiquito",
    icon: "🧾",
    description: "Suma los rubros proporcionales al terminar tu relación laboral.",
  },
  {
    slug: "desahucio",
    name: "Bonificación por desahucio",
    icon: "📤",
    description: "El 25 % de tu último sueldo por cada año de servicio, al terminar la relación laboral.",
  },
  {
    slug: "despido-intempestivo",
    name: "Despido intempestivo",
    icon: "⚖️",
    description: "Indemnización estimada según el Código del Trabajo por despido sin causa justa.",
  },
  {
    slug: "utilidades",
    name: "Utilidades",
    icon: "📈",
    description: "Estimación simplificada de tu participación en las utilidades de la empresa.",
  },
  {
    slug: "valor-hora",
    name: "Valor de la hora de trabajo",
    icon: "🕐",
    description: "Cuánto vale cada hora de tu jornada según tu sueldo mensual.",
  },
  {
    slug: "aportes-iess",
    name: "Aportes al IESS",
    icon: "🧮",
    description: "Calcula el aporte personal y patronal al IESS según tu sueldo.",
  },
  {
    slug: "salario-jornada-parcial",
    name: "Salario en jornada parcial",
    icon: "🕓",
    description: "Sueldo mínimo proporcional si trabajas menos de 40 horas semanales.",
  },
  {
    slug: "subsidio-enfermedad",
    name: "Subsidio por enfermedad",
    icon: "🤒",
    description: "Estima el subsidio del IESS por incapacidad médica temporal.",
  },
  {
    slug: "subsidio-maternidad",
    name: "Subsidio por maternidad",
    icon: "🤱",
    description: "Calcula el subsidio del IESS durante las 12 semanas de licencia de maternidad.",
  },
  {
    slug: "credito-hipotecario",
    name: "Crédito hipotecario BIESS",
    icon: "🏠",
    description: "Simula la cuota mensual de un préstamo hipotecario según monto, plazo y tasa.",
  },
  {
    slug: "jubilacion-iess",
    name: "Pensión de jubilación IESS",
    icon: "👴",
    description: "Estimación educativa de tu pensión según tus años de aportación.",
  },
];

export function getCalculadora(slug: string): Calculadora | undefined {
  return calculadoras.find((c) => c.slug === slug);
}
