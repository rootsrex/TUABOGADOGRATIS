import type { Metadata } from "next";
import Link from "next/link";
import { consultas } from "@/lib/consultas";

export const metadata: Metadata = {
  title: "Consultas en línea",
  description:
    "Consulta vehículos por placa, multas de tránsito, antecedentes penales y datos de cédula. Enlaces directos a los portales oficiales del Ecuador.",
};

export default function ConsultasPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-slate-900">Consultas en línea 🔎</h1>
        <p className="mt-2 max-w-2xl text-lg text-slate-600">
          Escribe tu dato, cópialo con un clic y te llevamos directo al portal
          oficial correspondiente para completar la consulta de forma segura.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {consultas.map((c) => (
          <Link
            key={c.slug}
            href={`/consultas/${c.slug}`}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-2xl">
              {c.icon}
            </div>
            <h2 className="text-lg font-bold text-slate-900 group-hover:text-brand-700">
              {c.name}
            </h2>
            <p className="mt-2 text-sm text-slate-600">{c.description}</p>
            <span className="mt-4 inline-block text-sm font-semibold text-brand-600">
              Consultar →
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
        <strong>Importante:</strong> no almacenamos ni tenemos acceso a bases de
        datos de cédulas, placas o antecedentes. Solo te ayudamos a llegar más
        rápido al portal oficial de cada institución para que hagas la
        consulta directamente ahí.
      </div>
    </div>
  );
}
