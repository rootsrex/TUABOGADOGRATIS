import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto · Haz tu consulta",
  description: "Envíanos tu consulta legal y te orientamos sobre el trámite que necesitas.",
};

export default function ContactoPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-14">
      <h1 className="text-4xl font-extrabold text-slate-900">Haz tu consulta</h1>
      <p className="mt-3 text-slate-600">
        Cuéntanos brevemente tu caso y te orientamos con información sobre el
        trámite que necesitas. Respondemos de forma general y gratuita.
      </p>

      <form className="mt-8 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Nombre</label>
          <input
            type="text"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            placeholder="Tu nombre"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Correo electrónico</label>
          <input
            type="email"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            placeholder="tucorreo@ejemplo.com"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Tu consulta</label>
          <textarea
            rows={5}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            placeholder="Describe tu caso o la duda que tienes..."
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-brand-600 px-4 py-3 font-semibold text-white hover:bg-brand-700"
        >
          Enviar consulta
        </button>
        <p className="text-center text-xs text-slate-400">
          * Formulario de demostración. Conecta tu proveedor de correo o backend para recibir mensajes.
        </p>
      </form>
    </div>
  );
}
