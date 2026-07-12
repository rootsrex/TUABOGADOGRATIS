# Tu Abogado Gratis ⚖️

Portal de información legal y trámites del Ecuador. *Tu asesor legal en casa.*

Sitio construido con **Next.js 14 (App Router)** + **Tailwind CSS**, con
contenido en **Markdown**. Inspirado en la estructura de portales como
ConsultasEcuador y EcuadorLegalOnline, pero con marca, diseño y contenido
propios.

## Características

- 🏠 Home con hero, categorías y guías destacadas.
- 🗂️ 6 categorías: Laboral e IESS, Familia, Tránsito y ANT, Registro Civil, Bonos, Documentos.
- 📝 Artículos en Markdown con metadatos (categoría, fecha, tiempo de lectura).
- 🔗 Páginas de categoría, artículo, blog, contacto y aviso legal.
- 🔍 SEO: metadatos por página + `sitemap.xml` automático.
- 📱 Diseño responsive (móvil y escritorio).

## Estructura del proyecto

```
app/                  Rutas (App Router)
  page.tsx            Home
  blog/               Listado de todas las guías
  categoria/[slug]/   Guías por categoría
  articulo/[slug]/    Detalle de cada guía
  contacto/           Formulario de consulta
  aviso-legal/        Aviso legal
components/            Navbar, Footer, tarjetas
content/              Artículos en Markdown (.md)
lib/                  Categorías y lector de contenido
```

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
```

## Cómo añadir una guía nueva

Crea un archivo `content/mi-guia.md` con este frontmatter:

```markdown
---
title: "Título de la guía"
excerpt: "Resumen corto que aparece en las tarjetas."
category: "laboral-iess"   # slug de una categoría en lib/categories.ts
date: "2026-07-01"
---

Contenido en Markdown...
```

La guía aparecerá automáticamente en el blog, en su categoría y en el sitemap.

## Despliegue

Optimizado para **Vercel**: importa el repositorio y despliega sin configuración
adicional.

---

> **Aviso:** el contenido es informativo y educativo; no sustituye la asesoría
> jurídica personalizada de un profesional del derecho.
