import Link from "next/link";
import { categories, getCategory } from "@/lib/categories";
import { calculadoras } from "@/lib/calculadoras";
import { consultas } from "@/lib/consultas";
import { simuladores } from "@/lib/simuladores";
import { documentosGenerables } from "@/lib/generador-documentos";
import { getAllArticles, getArticlesByCategory } from "@/lib/content";
import CategoryCard from "@/components/CategoryCard";
import ArticleCard from "@/components/ArticleCard";

export default function HomePage() {
  const articles = getAllArticles();
  const featured = articles.slice(0, 6);
  const ecu911Category = getCategory("ecu911");
  const ecu911Articles = getArticlesByCategory("ecu911");

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 text-white">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center">
          <span className="inline-block rounded-full bg-white/15 px-4 py-1 text-sm font-medium">
            ⚖️ Tu asesor legal en casa
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl">
            Trámites y consultas legales del Ecuador, explicados fácil y gratis
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-brand-100">
            Desde el IESS y las multas de la ANT hasta la pensión alimenticia y
            los bonos del Estado. Encuentra guías paso a paso y modelos de
            documentos listos para usar.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/blog"
              className="rounded-lg bg-white px-6 py-3 font-semibold text-brand-700 hover:bg-brand-50"
            >
              Explorar guías
            </Link>
            <Link
              href="/contacto"
              className="rounded-lg border border-white/40 px-6 py-3 font-semibold text-white hover:bg-white/10"
            >
              Hacer una consulta
            </Link>
          </div>
        </div>
      </section>

      {/* ECU911 - Destacado */}
      {ecu911Category && (
        <section className="bg-gradient-to-br from-red-700 via-red-600 to-orange-600 py-16 text-white">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="inline-block rounded-full bg-white/15 px-4 py-1 text-sm font-semibold">
                  🚨 Destacado
                </span>
                <h2 className="mt-3 text-3xl font-extrabold">ECU911 y Emergencias</h2>
                <p className="mt-2 max-w-xl text-red-50">
                  Todo lo que debes saber para actuar rápido: qué es el ECU911,
                  cuándo llamar al 911 y qué esperar durante la atención.
                </p>
              </div>
              <Link
                href="/categoria/ecu911"
                className="rounded-lg bg-white px-6 py-3 font-semibold text-red-700 hover:bg-red-50"
              >
                Ver toda la guía →
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {ecu911Articles.map((a) => (
                <Link
                  key={a.slug}
                  href={`/articulo/${a.slug}`}
                  className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur transition hover:bg-white/20"
                >
                  <span className="font-semibold leading-snug">{a.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Simuladores */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-block rounded-full bg-brand-50 px-4 py-1 text-sm font-semibold text-brand-700">
              🚘 Nuevo
            </span>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">Simuladores de examen</h2>
            <p className="mt-2 text-slate-600">
              Practica gratis para tu examen teórico de manejo antes de ir a la ANT.
            </p>
          </div>
          <Link href="/simuladores" className="hidden font-semibold text-brand-600 hover:text-brand-700 sm:block">
            Ver todos →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {simuladores.map((s) => (
            <Link
              key={s.slug}
              href={`/simuladores/${s.slug}`}
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-brand-300 hover:shadow-sm"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-brand-50 text-2xl">
                {s.icon}
              </span>
              <span>
                <span className="block font-semibold text-slate-800">{s.name}</span>
                <span className="block text-xs text-slate-500">{s.description}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Generador de documentos */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="inline-block rounded-full bg-brand-50 px-4 py-1 text-sm font-semibold text-brand-700">
                🪄 Nuevo
              </span>
              <h2 className="mt-3 text-3xl font-bold text-slate-900">Generador de documentos</h2>
              <p className="mt-2 text-slate-600">
                Completa tus datos y descarga tu documento legal listo en Word.
              </p>
            </div>
            <Link href="/generador" className="hidden font-semibold text-brand-600 hover:text-brand-700 sm:block">
              Ver todos →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {documentosGenerables.slice(0, 8).map((doc) => (
              <Link
                key={doc.slug}
                href={`/generador/${doc.slug}`}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-brand-300 hover:shadow-sm"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-brand-50 text-2xl">
                  {doc.icon}
                </span>
                <span className="font-semibold text-slate-800">{doc.nombre}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Consultas en línea */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Consultas en línea 🔎</h2>
              <p className="mt-2 text-slate-600">
                Placa, cédula o nombre: busca el dato y te llevamos al portal oficial.
              </p>
            </div>
            <Link href="/consultas" className="hidden font-semibold text-brand-600 hover:text-brand-700 sm:block">
              Ver todas →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {consultas.map((c) => (
              <Link
                key={c.slug}
                href={`/consultas/${c.slug}`}
                className="flex flex-col items-start gap-2 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-brand-300 hover:shadow-sm"
              >
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-brand-50 text-2xl">
                  {c.icon}
                </span>
                <span className="font-semibold text-slate-800">{c.name}</span>
                <span className="text-xs text-slate-500">{c.description}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900">Explora por categoría</h2>
          <p className="mt-2 text-slate-600">
            Organizamos los trámites del Ecuador por temas para que encuentres lo que buscas rápido.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <CategoryCard key={c.slug} category={c} />
          ))}
        </div>
      </section>

      {/* Artículos destacados */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Guías recientes</h2>
              <p className="mt-2 text-slate-600">Lo último en trámites y consultas.</p>
            </div>
            <Link href="/blog" className="hidden font-semibold text-brand-600 hover:text-brand-700 sm:block">
              Ver todo →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      </section>

      {/* Calculadoras */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Calculadoras 🧮</h2>
            <p className="mt-2 text-slate-600">Estima tus derechos laborales en segundos.</p>
          </div>
          <Link href="/calculadoras" className="hidden font-semibold text-brand-600 hover:text-brand-700 sm:block">
            Ver todas →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {calculadoras.map((c) => (
            <Link
              key={c.slug}
              href={`/calculadoras/${c.slug}`}
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-brand-300 hover:shadow-sm"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-brand-50 text-2xl">
                {c.icon}
              </span>
              <span>
                <span className="block font-semibold text-slate-800">{c.name}</span>
                <span className="block text-xs text-slate-500">{c.description}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 px-8 py-12 text-center text-white">
          <h2 className="text-2xl font-bold md:text-3xl">¿Tienes una duda legal?</h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-100">
            Cuéntanos tu caso y te orientamos con información clara sobre el
            trámite que necesitas realizar.
          </p>
          <Link
            href="/contacto"
            className="mt-6 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-brand-700 hover:bg-brand-50"
          >
            Consulta gratis
          </Link>
        </div>
      </section>
    </>
  );
}
