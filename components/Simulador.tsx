"use client";

import { useState } from "react";
import type { Pregunta } from "@/lib/simuladores";

export default function Simulador({
  preguntas,
  preguntasAprobar,
}: {
  preguntas: Pregunta[];
  preguntasAprobar: number;
}) {
  const [respuestas, setRespuestas] = useState<(number | null)[]>(
    Array(preguntas.length).fill(null)
  );
  const [enviado, setEnviado] = useState(false);

  function seleccionar(preguntaIdx: number, opcionIdx: number) {
    if (enviado) return;
    setRespuestas((prev) => {
      const copia = [...prev];
      copia[preguntaIdx] = opcionIdx;
      return copia;
    });
  }

  const todasRespondidas = respuestas.every((r) => r !== null);
  const correctas = respuestas.reduce<number>(
    (acc, r, i) => acc + (r === preguntas[i].correcta ? 1 : 0),
    0
  );
  const aprobado = correctas >= preguntasAprobar;

  function reiniciar() {
    setRespuestas(Array(preguntas.length).fill(null));
    setEnviado(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (enviado) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div
          className={`rounded-xl p-6 text-center ${
            aprobado ? "bg-emerald-50" : "bg-rose-50"
          }`}
        >
          <p className="text-5xl">{aprobado ? "✅" : "❌"}</p>
          <h2
            className={`mt-3 text-2xl font-extrabold ${
              aprobado ? "text-emerald-700" : "text-rose-700"
            }`}
          >
            {aprobado ? "¡Aprobado!" : "No aprobado"}
          </h2>
          <p className="mt-2 text-slate-600">
            Respondiste correctamente <strong>{correctas}</strong> de{" "}
            <strong>{preguntas.length}</strong> preguntas. Se necesitan al
            menos <strong>{preguntasAprobar}</strong> para aprobar (80 %,
            igual que el examen oficial).
          </p>
          <button
            onClick={reiniciar}
            className="mt-5 rounded-lg bg-brand-600 px-6 py-2.5 font-semibold text-white hover:bg-brand-700"
          >
            Intentar de nuevo
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {preguntas.map((p, i) => {
            const esCorrecta = respuestas[i] === p.correcta;
            return (
              <div
                key={i}
                className={`rounded-xl border p-4 ${
                  esCorrecta ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"
                }`}
              >
                <p className="font-medium text-slate-800">
                  {i + 1}. {p.pregunta}
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  Tu respuesta:{" "}
                  <span className={esCorrecta ? "text-emerald-700" : "text-rose-700"}>
                    {respuestas[i] !== null ? p.opciones[respuestas[i]!] : "—"}
                  </span>
                </p>
                {!esCorrecta && (
                  <p className="mt-1 text-sm text-emerald-700">
                    Correcta: {p.opciones[p.correcta]}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {preguntas.map((p, i) => (
        <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="font-semibold text-slate-800">
            {i + 1}. {p.pregunta}
          </p>
          <div className="mt-3 space-y-2">
            {p.opciones.map((opcion, oIdx) => (
              <label
                key={oIdx}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm transition ${
                  respuestas[i] === oIdx
                    ? "border-brand-500 bg-brand-50"
                    : "border-slate-200 hover:bg-slate-50"
                }`}
              >
                <input
                  type="radio"
                  name={`pregunta-${i}`}
                  checked={respuestas[i] === oIdx}
                  onChange={() => seleccionar(i, oIdx)}
                  className="accent-brand-600"
                />
                {opcion}
              </label>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={() => setEnviado(true)}
        disabled={!todasRespondidas}
        className="w-full rounded-lg bg-brand-600 px-4 py-3 font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        {todasRespondidas ? "Ver resultado" : `Responde todas las preguntas (${respuestas.filter((r) => r !== null).length}/${preguntas.length})`}
      </button>
    </div>
  );
}
