import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSimulador, simuladores, bancoPreguntasTipoB } from "@/lib/simuladores";
import SimuladorWidget from "@/components/Simulador";

export function generateStaticParams() {
  return simuladores.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const sim = getSimulador(params.slug);
  if (!sim) return {};
  return {
    title: sim.name,
    description: sim.description,
  };
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function SimuladorPage({ params }: { params: { slug: string } }) {
  const sim = getSimulador(params.slug);
  if (!sim) notFound();

  const preguntas =
    params.slug === "licencia-tipo-b" ? shuffle(bancoPreguntasTipoB).slice(0, sim.totalPreguntas) : [];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500">
        <Link href="/" className="hover:text-brand-700">Inicio</Link>
        <span>/</span>
        <Link href="/simuladores" className="hover:text-brand-700">Simuladores</Link>
        <span>/</span>
        <span className="text-slate-700">{sim.name}</span>
      </nav>

      <header className="mb-8 flex items-center gap-4">
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-3xl">
          {sim.icon}
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">{sim.name}</h1>
          <p className="mt-1 text-slate-600">{sim.description}</p>
        </div>
      </header>

      <SimuladorWidget preguntas={preguntas} preguntasAprobar={sim.preguntasAprobar} />

      <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
        <strong>Aviso:</strong> este simulador es una herramienta de práctica
        con fines educativos y no reemplaza el banco de preguntas ni el
        examen oficial de la ANT. Las preguntas cambian cada vez que
        practicas.
      </div>
    </div>
  );
}
