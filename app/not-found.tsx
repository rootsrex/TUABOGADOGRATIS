import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <div className="text-6xl">🔍</div>
      <h1 className="mt-6 text-3xl font-extrabold text-slate-900">Página no encontrada</h1>
      <p className="mt-3 text-slate-600">
        La página que buscas no existe o fue movida. Vuelve al inicio o explora nuestras guías.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/" className="rounded-lg bg-brand-600 px-5 py-2.5 font-semibold text-white hover:bg-brand-700">
          Ir al inicio
        </Link>
        <Link href="/blog" className="rounded-lg border border-slate-300 px-5 py-2.5 font-semibold text-slate-700 hover:bg-slate-50">
          Ver el blog
        </Link>
      </div>
    </div>
  );
}
