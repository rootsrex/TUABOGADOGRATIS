import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { calculadoras, getCalculadora } from "@/lib/calculadoras";
import CalculadoraWidget from "@/components/Calculadoras";

export function generateStaticParams() {
  return calculadoras.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const calc = getCalculadora(params.slug);
  if (!calc) return {};
  return {
    title: `Calculadora de ${calc.name.toLowerCase()}`,
    description: calc.description,
  };
}

export default function CalculadoraPage({ params }: { params: { slug: string } }) {
  const calc = getCalculadora(params.slug);
  if (!calc) notFound();

  const others = calculadoras.filter((c) => c.slug !== calc.slug);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500">
        <Link href="/" className="hover:text-brand-700">Inicio</Link>
        <span>/</span>
        <Link href="/calculadoras" className="hover:text-brand-700">Calculadoras</Link>
        <span>/</span>
        <span className="text-slate-700">{calc.name}</span>
      </nav>

      <header className="mb-8 flex items-center gap-4">
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-3xl">
          {calc.icon}
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">{calc.name}</h1>
          <p className="mt-1 text-slate-600">{calc.description}</p>
        </div>
      </header>

      <CalculadoraWidget slug={calc.slug} />

      <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
        <strong>Aviso:</strong> los valores obtenidos son referenciales y sirven
        para orientarte. No sustituyen un cálculo oficial de tu empleador, del
        IESS o del Ministerio del Trabajo.
      </div>

      <section className="mt-14">
        <h2 className="mb-6 text-2xl font-bold text-slate-900">Otras calculadoras</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {others.map((c) => (
            <Link
              key={c.slug}
              href={`/calculadoras/${c.slug}`}
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-brand-300 hover:shadow-sm"
            >
              <span className="text-2xl">{c.icon}</span>
              <span className="font-semibold text-slate-800">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
