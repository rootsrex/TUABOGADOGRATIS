import type { Metadata } from "next";
import Link from "next/link";
import { calculadoras } from "@/lib/calculadoras";

export const metadata: Metadata = {
  title: "Calculadoras laborales y legales",
  description:
    "Calculadoras gratuitas para Ecuador: décimo tercero, décimo cuarto, fondos de reserva, vacaciones, horas extras y liquidación.",
};

export default function CalculadorasPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-slate-900">Calculadoras 🧮</h1>
        <p className="mt-2 max-w-2xl text-lg text-slate-600">
          Herramientas gratuitas para estimar tus derechos laborales en Ecuador.
          Los valores son orientativos y te ayudan a planificar.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {calculadoras.map((c) => (
          <Link
            key={c.slug}
            href={`/calculadoras/${c.slug}`}
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
              Calcular →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
