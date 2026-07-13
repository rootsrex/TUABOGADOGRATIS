import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { documentosGenerables, getDocumentoGenerable } from "@/lib/generador-documentos";
import GeneradorDocumento from "@/components/GeneradorDocumento";

export function generateStaticParams() {
  return documentosGenerables.map((doc) => ({ slug: doc.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const doc = getDocumentoGenerable(params.slug);
  if (!doc) return {};
  return {
    title: `Generar: ${doc.nombre}`,
    description: doc.descripcion,
  };
}

export default function GeneradorDetallePage({ params }: { params: { slug: string } }) {
  const doc = getDocumentoGenerable(params.slug);
  if (!doc) notFound();

  const otros = documentosGenerables.filter((d) => d.slug !== doc.slug);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500">
        <Link href="/" className="hover:text-brand-700">Inicio</Link>
        <span>/</span>
        <Link href="/generador" className="hover:text-brand-700">Generador</Link>
        <span>/</span>
        <span className="text-slate-700">{doc.nombre}</span>
      </nav>

      <header className="mb-8 flex items-start gap-3 sm:items-center sm:gap-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-2xl sm:h-16 sm:w-16 sm:text-3xl">
          {doc.icon}
        </div>
        <div>
          <h1 className="text-2xl font-extrabold leading-tight text-slate-900 sm:text-3xl">{doc.nombre}</h1>
          <p className="mt-1 text-sm text-slate-600 sm:text-base">{doc.descripcion}</p>
        </div>
      </header>

      <GeneradorDocumento slug={doc.slug} />

      <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
        <strong>Aviso:</strong> este documento es un formato referencial que
        se genera directamente en tu navegador (no enviamos ni guardamos tus
        datos en ningún servidor). Revísalo antes de firmarlo y, si es para
        un proceso judicial, valídalo con un abogado.
      </div>

      <section className="mt-14">
        <h2 className="mb-6 text-2xl font-bold text-slate-900">Otros documentos generables</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {otros.map((d) => (
            <Link
              key={d.slug}
              href={`/generador/${d.slug}`}
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-brand-300 hover:shadow-sm"
            >
              <span className="text-2xl">{d.icon}</span>
              <span className="font-semibold text-slate-800">{d.nombre}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
