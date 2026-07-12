import type { Metadata } from "next";
import { getOperativos, isStorageConfigured } from "@/lib/operativos";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Operativos y alertas viales",
  description:
    "Información en tiempo real sobre operativos de tránsito, cierres de vía y alertas de seguridad vial en Ecuador.",
};

function formatFecha(ms: number): string {
  return new Date(ms).toLocaleString("es-EC", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function OperativosPage() {
  const configured = isStorageConfigured();
  const operativos = configured ? await getOperativos() : [];

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <header className="mb-8">
        <span className="inline-block rounded-full bg-red-50 px-4 py-1 text-sm font-semibold text-red-700">
          🚧 Información vial
        </span>
        <h1 className="mt-3 text-4xl font-extrabold text-slate-900">
          Operativos y alertas viales
        </h1>
        <p className="mt-2 text-lg text-slate-600">
          Reportes recientes sobre el estado de las vías: cierres, controles de
          tránsito, accidentes y condiciones climáticas que pueden afectar tu
          recorrido.
        </p>
      </header>

      <a
        href="https://t.me/radarcuenca"
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="mb-8 flex items-center gap-4 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 p-5 text-white shadow-sm transition hover:shadow-md"
      >
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/15 text-2xl">
          📡
        </span>
        <span className="min-w-0">
          <span className="block font-bold">Únete al grupo de alertas en Telegram</span>
          <span className="block text-sm text-sky-50">
            Reportes en tiempo real de la comunidad — toca para abrir Telegram ↗
          </span>
        </span>
      </a>

      <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
        <strong>Uso responsable:</strong> esta información es referencial y
        colaborativa, pensada para tu **seguridad y planificación de ruta**.
        No la uses para evadir controles legales de tránsito, alcoholemia o
        documentación — coopera siempre con las autoridades. Verifica siempre
        la situación real antes de tomar decisiones.
      </div>

      {!configured ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
          Esta sección aún no está conectada a una fuente de datos. Cuando se
          configure el almacenamiento, los reportes aparecerán aquí
          automáticamente.
        </div>
      ) : operativos.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
          Todavía no hay reportes recientes. Vuelve a revisar más tarde.
        </div>
      ) : (
        <ul className="space-y-4">
          {operativos.map((op) => (
            <li
              key={`${op.chatId}-${op.id}`}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-slate-600">{op.author}</span>
                <span>{formatFecha(op.date)}</span>
              </div>
              <p className="whitespace-pre-wrap text-slate-700">{op.text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
