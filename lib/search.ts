import { getAllArticles } from "@/lib/content";
import { calculadoras } from "@/lib/calculadoras";
import { consultas } from "@/lib/consultas";
import { categories, getCategory } from "@/lib/categories";
import type { SearchItem } from "@/lib/search-types";

export type { SearchItem };

export function buildSearchIndex(): SearchItem[] {
  const articleItems: SearchItem[] = getAllArticles().map((a) => ({
    title: a.title,
    description: a.excerpt,
    href: `/articulo/${a.slug}`,
    type: a.type === "modelo" ? "modelo" : "guia",
    icon: getCategory(a.category)?.icon ?? "📄",
  }));

  const calcItems: SearchItem[] = calculadoras.map((c) => ({
    title: c.name,
    description: c.description,
    href: `/calculadoras/${c.slug}`,
    type: "calculadora",
    icon: c.icon,
  }));

  const consultaItems: SearchItem[] = consultas.map((c) => ({
    title: c.name,
    description: c.description,
    href: `/consultas/${c.slug}`,
    type: "consulta",
    icon: c.icon,
  }));

  const categoryItems: SearchItem[] = categories.map((c) => ({
    title: c.name,
    description: c.description,
    href: `/categoria/${c.slug}`,
    type: "categoria",
    icon: c.icon,
  }));

  return [...articleItems, ...calcItems, ...consultaItems, ...categoryItems];
}
