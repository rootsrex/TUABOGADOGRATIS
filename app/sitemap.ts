import type { MetadataRoute } from "next";
import { categories } from "@/lib/categories";
import { calculadoras } from "@/lib/calculadoras";
import { consultas } from "@/lib/consultas";
import { simuladores } from "@/lib/simuladores";
import { documentosGenerables } from "@/lib/generador-documentos";
import { getAllArticles } from "@/lib/content";

const BASE_URL = "https://tuabogadogratis.ec";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/blog", "/calculadoras", "/consultas", "/simuladores", "/generador", "/contacto", "/aviso-legal"].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
  }));

  const categoryRoutes = categories.map((c) => ({
    url: `${BASE_URL}/categoria/${c.slug}`,
    lastModified: new Date(),
  }));

  const calculadoraRoutes = calculadoras.map((c) => ({
    url: `${BASE_URL}/calculadoras/${c.slug}`,
    lastModified: new Date(),
  }));

  const consultaRoutes = consultas.map((c) => ({
    url: `${BASE_URL}/consultas/${c.slug}`,
    lastModified: new Date(),
  }));

  const simuladorRoutes = simuladores.map((s) => ({
    url: `${BASE_URL}/simuladores/${s.slug}`,
    lastModified: new Date(),
  }));

  const generadorRoutes = documentosGenerables.map((d) => ({
    url: `${BASE_URL}/generador/${d.slug}`,
    lastModified: new Date(),
  }));

  const articleRoutes = getAllArticles().map((a) => ({
    url: `${BASE_URL}/articulo/${a.slug}`,
    lastModified: a.date ? new Date(a.date) : new Date(),
  }));

  return [...staticRoutes, ...categoryRoutes, ...calculadoraRoutes, ...consultaRoutes, ...simuladorRoutes, ...generadorRoutes, ...articleRoutes];
}
