import type { Metadata } from "next";
import Link from "next/link";
import { documentosGenerables } from "@/lib/generador-documentos";

export const metadata: Metadata = {
  title: "Generador de documentos legales",
  description:
    "Completa tus datos y descarga tu documento legal listo en Word: cartas, contratos, actas y más.",
};

export default function GeneradorPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <header className="mb-10">
        <span className="inline-block rounded-full bg-brand-50 px-4 py-1 text-sm font-semibold text-brand-700">
          🪄 Nuevo
        </span>
        <h1 className="mt-3 text-4xl font-extrabold text-slate-900">
          Generador de documentos legales
        </h1>
        <p className="mt-2 max-w-2xl text-lg text-slate-600">
          Elige un documento, completa tus datos y descárgalo listo en Word.
          Todo se genera en tu navegador — no guardamos tu información.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {documentosGenerables.map((doc) => (
          <Link
            key={doc.slug}
            href={`/generador/${doc.slug}`}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-2xl">
              {doc.icon}
            </div>
            <h2 className="text-lg font-bold text-slate-900 group-hover:text-brand-700">
              {doc.nombre}
            </h2>
            <p className="mt-2 text-sm text-slate-600">{doc.descripcion}</p>
            <span className="mt-4 inline-block text-sm font-semibold text-brand-600">
              Generar →
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
        <strong>Aviso:</strong> los documentos generados son formatos
        referenciales. Revisa siempre la información antes de firmarlos y,
        para casos judiciales, valida el formato con un abogado.
      </div>
    </div>
  );
}
