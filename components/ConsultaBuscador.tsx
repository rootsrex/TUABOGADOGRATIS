"use client";

import { useState } from "react";
import type { Consulta } from "@/lib/consultas";

export default function ConsultaBuscador({ consulta }: { consulta: Consulta }) {
  const [valores, setValores] = useState<Record<string, string>>({});
  const [copiado, setCopiado] = useState<string | null>(null);

  function setValor(key: string, value: string) {
    setValores((prev) => ({ ...prev, [key]: value }));
  }

  async function handleConsultar() {
    const valorPrincipal = consulta.campos
      .map((c) => valores[c.key]?.trim())
      .filter((v): v is string => Boolean(v))
      .join(" ");

    if (valorPrincipal) {
      try {
        await navigator.clipboard.writeText(valorPrincipal);
        setCopiado(valorPrincipal);
      } catch {
        // Clipboard no disponible; el usuario puede copiar manualmente.
      }
    }

    window.open(consulta.entidadUrl, "_blank", "noopener,noreferrer");
  }

  const hayValor = consulta.campos.some((c) => valores[c.key]?.trim());

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="space-y-4">
        {consulta.campos.map((campo) => (
          <label key={campo.key} className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">{campo.label}</span>
            <input
              type="text"
              value={valores[campo.key] ?? ""}
              onChange={(e) => setValor(campo.key, e.target.value)}
              placeholder={campo.placeholder}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
          </label>
        ))}
      </div>

      <button
        onClick={handleConsultar}
        disabled={!hayValor}
        className="mt-5 w-full rounded-lg bg-brand-600 px-4 py-3 font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        Copiar dato y abrir portal oficial ↗
      </button>

      {copiado && (
        <p className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          ✅ Copiamos <strong>{copiado}</strong> al portapapeles. Pégalo (Ctrl/Cmd + V) en el
          buscador de {consulta.entidad} que acabamos de abrir.
        </p>
      )}

      <p className="mt-4 border-t border-slate-100 pt-4 text-xs text-slate-400">
        {consulta.instrucciones} Esta consulta se realiza directamente en el sitio oficial de{" "}
        {consulta.entidad}; nosotros no almacenamos ni mostramos datos personales.
      </p>
    </div>
  );
}
