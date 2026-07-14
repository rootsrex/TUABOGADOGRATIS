"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { TYPE_LABEL, type SearchItem } from "@/lib/search-types";

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

function buscar(items: SearchItem[], query: string): SearchItem[] {
  const q = normalize(query.trim());
  if (!q) return [];

  return items
    .map((item) => {
      const title = normalize(item.title);
      const desc = normalize(item.description);
      let score = -1;
      if (title.includes(q)) score = title.startsWith(q) ? 2 : 1;
      else if (desc.includes(q)) score = 0;
      return { item, score };
    })
    .filter((r) => r.score >= 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map((r) => r.item);
}

const SUGERENCIAS = [
  "Renuncia",
  "Pensión alimenticia",
  "Multas de tránsito",
  "Examen de licencia",
  "Décimo tercero",
];

export default function HomeSearch({ items }: { items: SearchItem[] }) {
  const [query, setQuery] = useState("");
  const [activo, setActivo] = useState(false);
  const resultados = useMemo(() => buscar(items, query), [items, query]);

  return (
    <div className="mx-auto mt-8 w-full max-w-2xl">
      <div className="relative">
        <div className="flex items-center gap-3 rounded-full bg-white px-5 py-3 shadow-lg ring-1 ring-black/5">
          <span aria-hidden className="text-xl text-slate-400">
            🔍
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setActivo(true)}
            onBlur={() => setTimeout(() => setActivo(false), 150)}
            placeholder="Busca un trámite, guía, calculadora o documento..."
            className="w-full bg-transparent text-slate-800 outline-none placeholder:text-slate-400"
            aria-label="Buscar en el sitio"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Limpiar búsqueda"
              className="text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          )}
        </div>

        {/* Resultados en vivo */}
        {activo && query.trim() && (
          <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-2xl bg-white text-left shadow-2xl ring-1 ring-black/5">
            {resultados.length === 0 ? (
              <p className="p-4 text-center text-sm text-slate-500">
                No encontramos resultados para "{query}".
              </p>
            ) : (
              <ul className="max-h-[60vh] overflow-y-auto p-2">
                {resultados.map((r) => (
                  <li key={r.href}>
                    <Link
                      href={r.href}
                      className="flex items-start gap-3 rounded-xl p-3 hover:bg-slate-50"
                    >
                      <span className="mt-0.5 text-xl">{r.icon}</span>
                      <span className="min-w-0">
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="font-semibold text-slate-800">{r.title}</span>
                          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
                            {TYPE_LABEL[r.type]}
                          </span>
                        </span>
                        <span className="line-clamp-1 block text-sm text-slate-500">
                          {r.description}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Sugerencias rápidas */}
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {SUGERENCIAS.map((s) => (
          <button
            key={s}
            onClick={() => setQuery(s)}
            className="rounded-full bg-white/15 px-3 py-1 text-sm text-white transition hover:bg-white/25"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
