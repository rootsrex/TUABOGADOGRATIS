import type { Metadata } from "next";
import Link from "next/link";
import { simuladores } from "@/lib/simuladores";

export const metadata: Metadata = {
  title: "Simuladores de examen",
  description: "Practica gratis para tu examen teórico de manejo con preguntas de señales y normas de tránsito.",
};

export default function SimuladoresPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-slate-900">Simuladores de examen 🚘</h1>
        <p className="mt-2 max-w-2xl text-lg text-slate-600">
          Practica gratis antes de tu examen teórico oficial. Mismo umbral de
          aprobación que la ANT: 80 % de respuestas correctas.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {simuladores.map((s) => (
          <Link
            key={s.slug}
            href={`/simuladores/${s.slug}`}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-2xl">
              {s.icon}
            </div>
            <h2 className="text-lg font-bold text-slate-900 group-hover:text-brand-700">
              {s.name}
            </h2>
            <p className="mt-2 text-sm text-slate-600">{s.description}</p>
            <span className="mt-4 inline-block text-sm font-semibold text-brand-600">
              Practicar →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
