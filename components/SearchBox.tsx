"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { TYPE_LABEL, type SearchItem } from "@/lib/search-types";

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

function search(items: SearchItem[], query: string): SearchItem[] {
  const q = normalize(query.trim());
  if (!q) return [];

  const scored = items
    .map((item) => {
      const title = normalize(item.title);
      const desc = normalize(item.description);
      let score = -1;
      if (title.includes(q)) score = title.startsWith(q) ? 2 : 1;
      else if (desc.includes(q)) score = 0;
      return { item, score };
    })
    .filter((r) => r.score >= 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, 8).map((r) => r.item);
}

export default function SearchBox({ items }: { items: SearchItem[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => search(items, query), [items, query]);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      setQuery("");
    }
  }, [open]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Buscar en el sitio"
        className="flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-500 hover:border-brand-400 hover:text-brand-600"
      >
        <span aria-hidden>🔍</span>
        <span className="hidden sm:inline">Buscar…</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-slate-900/50 px-4 pt-24"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-xl rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3">
              <span aria-hidden className="text-slate-400">🔍</span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Busca guías, calculadoras, consultas..."
                className="w-full outline-none placeholder:text-slate-400"
              />
              <button
                onClick={() => setOpen(false)}
                aria-label="Cerrar búsqueda"
                className="text-sm text-slate-400 hover:text-slate-600"
              >
                Esc
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {query.trim() && results.length === 0 && (
                <p className="p-4 text-center text-sm text-slate-500">
                  No encontramos resultados para "{query}".
                </p>
              )}
              {results.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  onClick={() => setOpen(false)}
                  className="flex items-start gap-3 rounded-xl p-3 hover:bg-slate-50"
                >
                  <span className="mt-0.5 text-xl">{r.icon}</span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-2">
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
              ))}
              {!query.trim() && (
                <p className="p-4 text-center text-sm text-slate-400">
                  Escribe para buscar en todo el sitio.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
