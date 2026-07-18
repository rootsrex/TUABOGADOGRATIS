export type SearchItem = {
  title: string;
  description: string;
  href: string;
  type: "guia" | "modelo" | "noticia" | "calculadora" | "consulta" | "categoria";
  icon: string;
};

export const TYPE_LABEL: Record<SearchItem["type"], string> = {
  guia: "Guía",
  modelo: "Modelo",
  noticia: "Noticia",
  calculadora: "Calculadora",
  consulta: "Consulta",
  categoria: "Categoría",
};
