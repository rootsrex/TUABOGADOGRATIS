"use client";

import { useState } from "react";
import { documentosGenerables } from "@/lib/generador-documentos";
import GeneradorDocumento from "@/components/GeneradorDocumento";

export default function GeneradorHome() {
  const [slug, setSlug] = useState(documentosGenerables[0]?.slug ?? "");

  return (
    <div>
      <label className="mx-auto mb-6 block max-w-xl">
        <span className="mb-1 block text-sm font-medium text-slate-700">
          Elige el documento que necesitas
        </span>
        <select
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-slate-800 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        >
          {documentosGenerables.map((doc) => (
            <option key={doc.slug} value={doc.slug}>
              {doc.icon} {doc.nombre}
            </option>
          ))}
        </select>
      </label>

      {slug && <GeneradorDocumento slug={slug} />}
    </div>
  );
}
