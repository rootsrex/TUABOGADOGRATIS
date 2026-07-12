"use client";

import Link from "next/link";
import { useState } from "react";
import { categories } from "@/lib/categories";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-extrabold text-brand-700">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-600 text-white">⚖️</span>
          <span className="text-lg leading-tight">
            Tu Abogado <span className="text-accent-600">Gratis</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm font-medium text-slate-700 hover:text-brand-700">
            Inicio
          </Link>
          <div className="group relative">
            <button className="text-sm font-medium text-slate-700 hover:text-brand-700">
              Categorías ▾
            </button>
            <div className="invisible absolute left-0 top-full w-64 rounded-xl border border-slate-200 bg-white p-2 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100">
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/categoria/${c.slug}`}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  <span>{c.icon}</span>
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/categoria/ecu911" className="text-sm font-semibold text-red-600 hover:text-red-700">
            🚨 ECU911
          </Link>
          <Link href="/operativos" className="text-sm font-medium text-slate-700 hover:text-brand-700">
            🚧 Operativos
          </Link>
          <Link href="/consultas" className="text-sm font-medium text-slate-700 hover:text-brand-700">
            Consultas
          </Link>
          <Link href="/calculadoras" className="text-sm font-medium text-slate-700 hover:text-brand-700">
            Calculadoras
          </Link>
          <Link href="/blog" className="text-sm font-medium text-slate-700 hover:text-brand-700">
            Blog
          </Link>
          <Link
            href="/contacto"
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Consulta gratis
          </Link>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg border border-slate-300 p-2 md:hidden"
          aria-label="Abrir menú"
        >
          <span className="block h-0.5 w-5 bg-slate-700" />
          <span className="mt-1 block h-0.5 w-5 bg-slate-700" />
          <span className="mt-1 block h-0.5 w-5 bg-slate-700" />
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
          <Link href="/" onClick={() => setOpen(false)} className="block py-2 text-slate-700">
            Inicio
          </Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/categoria/${c.slug}`}
              onClick={() => setOpen(false)}
              className="block py-2 text-slate-700"
            >
              {c.icon} {c.name}
            </Link>
          ))}
          <Link href="/categoria/ecu911" onClick={() => setOpen(false)} className="block py-2 font-semibold text-red-600">
            🚨 ECU911
          </Link>
          <Link href="/operativos" onClick={() => setOpen(false)} className="block py-2 text-slate-700">
            🚧 Operativos
          </Link>
          <Link href="/consultas" onClick={() => setOpen(false)} className="block py-2 text-slate-700">
            🔎 Consultas
          </Link>
          <Link href="/calculadoras" onClick={() => setOpen(false)} className="block py-2 text-slate-700">
            🧮 Calculadoras
          </Link>
          <Link href="/blog" onClick={() => setOpen(false)} className="block py-2 text-slate-700">
            Blog
          </Link>
          <Link
            href="/contacto"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-lg bg-brand-600 px-4 py-2 text-center font-semibold text-white"
          >
            Consulta gratis
          </Link>
        </div>
      )}
    </header>
  );
}
