export type SearchItem = {
  title: string;
  description: string;
  href: string;
  type: "guia" | "modelo" | "calculadora" | "consulta" | "categoria";
  icon: string;
};

export const TYPE_LABEL: Record<SearchItem["type"], string> = {
  guia: "Guía",
  modelo: "Modelo",
  calculadora: "Calculadora",
  consulta: "Consulta",
  categoria: "Categoría",
};
