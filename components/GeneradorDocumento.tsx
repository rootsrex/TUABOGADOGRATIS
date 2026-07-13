"use client";

import { useMemo, useState } from "react";
import { getDocumentoGenerable } from "@/lib/generador-documentos";

export default function GeneradorDocumento({ slug }: { slug: string }) {
  const documento = getDocumentoGenerable(slug);
  const [datos, setDatos] = useState<Record<string, string>>({});
  const [descargando, setDescargando] = useState(false);
  const texto = useMemo(() => (documento ? documento.generar(datos) : ""), [documento, datos]);

  if (!documento) return null;
  const doc = documento;

  function actualizar(key: string, value: string) {
    setDatos((prev) => ({ ...prev, [key]: value }));
  }

  async function descargarWord() {
    setDescargando(true);
    try {
      const { Document, Packer, Paragraph, TextRun } = await import("docx");
      const { saveAs } = await import("file-saver");

      const parrafos = texto.split("\n").map(
        (linea) =>
          new Paragraph({
            children: [new TextRun({ text: linea || " ", size: 24 })],
            spacing: { after: 120 },
          })
      );

      const wordDoc = new Document({
        sections: [{ properties: {}, children: parrafos }],
      });

      const blob = await Packer.toBlob(wordDoc);
      saveAs(blob, `${doc.slug}.docx`);
    } finally {
      setDescargando(false);
    }
  }

  function copiarTexto() {
    navigator.clipboard.writeText(texto);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-bold text-slate-900">Completa tus datos</h2>
        <div className="space-y-4">
          {doc.campos.map((campo) => (
            <label key={campo.key} className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700">{campo.label}</span>
              {campo.tipo === "textarea" ? (
                <textarea
                  rows={4}
                  value={datos[campo.key] ?? ""}
                  onChange={(e) => actualizar(campo.key, e.target.value)}
                  placeholder={campo.placeholder}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                />
              ) : (
                <input
                  type={campo.tipo}
                  value={datos[campo.key] ?? ""}
                  onChange={(e) => actualizar(campo.key, e.target.value)}
                  placeholder={campo.placeholder}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                />
              )}
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-bold text-slate-900">Vista previa</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={copiarTexto}
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Copiar texto
            </button>
            <button
              onClick={descargarWord}
              disabled={descargando}
              className="rounded-lg bg-brand-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
            >
              {descargando ? "Generando…" : "⬇ Descargar Word"}
            </button>
          </div>
        </div>
        <pre className="flex-1 overflow-auto whitespace-pre-wrap rounded-xl bg-slate-50 p-4 font-mono text-xs leading-relaxed text-slate-700">
          {texto}
        </pre>
      </div>
    </div>
  );
}
