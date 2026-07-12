import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { consultas, getConsulta } from "@/lib/consultas";
import ConsultaBuscador from "@/components/ConsultaBuscador";

export function generateStaticParams() {
  return consultas.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const consulta = getConsulta(params.slug);
  if (!consulta) return {};
  return {
    title: consulta.name,
    description: consulta.description,
  };
}

export default function ConsultaPage({ params }: { params: { slug: string } }) {
  const consulta = getConsulta(params.slug);
  if (!consulta) notFound();

  const otras = consultas.filter((c) => c.slug !== consulta.slug);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500">
        <Link href="/" className="hover:text-brand-700">Inicio</Link>
        <span>/</span>
        <Link href="/consultas" className="hover:text-brand-700">Consultas</Link>
        <span>/</span>
        <span className="text-slate-700">{consulta.name}</span>
      </nav>

      <header className="mb-8 flex items-center gap-4">
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-3xl">
          {consulta.icon}
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">{consulta.name}</h1>
          <p className="mt-1 text-slate-600">{consulta.description}</p>
        </div>
      </header>

      <ConsultaBuscador consulta={consulta} />

      <div className="mt-6 rounded-2xl border border-brand-200 bg-brand-50 p-5 text-sm text-brand-800">
        Esta consulta se realiza en el portal oficial de{" "}
        <a
          href={consulta.entidadUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="font-semibold text-brand-700 underline underline-offset-2 hover:text-brand-900"
        >
          {consulta.entidad} ↗
        </a>
      </div>

      <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
        <strong>Aviso:</strong> por seguridad y privacidad, no procesamos ni
        guardamos números de cédula ni de placa en nuestros servidores. Todo el
        dato viaja directo a tu portapapeles y al portal oficial.
      </div>

      <section className="mt-14">
        <h2 className="mb-6 text-2xl font-bold text-slate-900">Otras consultas</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {otras.map((c) => (
            <Link
              key={c.slug}
              href={`/consultas/${c.slug}`}
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
