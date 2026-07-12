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
];

export function getCalculadora(slug: string): Calculadora | undefined {
  return calculadoras.find((c) => c.slug === slug);
}
