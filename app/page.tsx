"use client";

import Link from "next/link";
import { useState, useMemo } from "react";

export default function HomePage() {
  const [cedulaInput, setCedulaInput] = useState("");
  const [placaInput, setPlacaInput] = useState("");
  const [camaraInput, setCamaraInput] = useState("");
  const [busquedaTramite, setBusquedaTramite] = useState("");

  // Estados de carga (Loading)
  const [loadingCedula, setLoadingCedula] = useState(false);
  const [loadingPlaca, setLoadingPlaca] = useState(false);
  const [loadingCamara, setLoadingCamara] = useState(false);

  const [resultadoCedula, setResultadoCedula] = useState<any>(null);
  const [resultadoPlaca, setResultadoPlaca] = useState<any>(null);
  const [resultadoCamara, setResultadoCamara] = useState<any>(null);

  const consultarCedula = async () => {
    if (!cedulaInput.trim()) return;
    setLoadingCedula(true);
    try {
      const url = "https://api-busqueda-cedulas-production.up.railway.app/api/cedula/" + cedulaInput;
      const res = await fetch(url);
      const data = await res.json();
      setResultadoCedula(data);
    } catch (error) {
      console.error("Error al consultar cédula", error);
    } finally {
      setLoadingCedula(false);
    }
  };

  const consultarPlaca = async () => {
    if (!placaInput.trim()) return;
    setLoadingPlaca(true);
    try {
      const url = "https://api-busqueda-cedulas-production.up.railway.app/api/placa/" + placaInput;
      const res = await fetch(url);
      const data = await res.json();
      setResultadoPlaca(data);
    } catch (error) {
      console.error("Error al consultar placa", error);
    } finally {
      setLoadingPlaca(false);
    }
  };

  const consultarCamara = async () => {
    if (!camaraInput.trim()) return;
    setLoadingCamara(true);
    try {
      const endpoint = "https://api-busqueda-cedulas-production.up.railway.app/api/camara/" + encodeURIComponent(camaraInput.trim());
      const res = await fetch(endpoint);
      const data = await res.json();
      setResultadoCamara(data);
    } catch (error) {
      console.error("Error al consultar cámara", error);
    } finally {
      setLoadingCamara(false);
    }
  };

  // Base completa de trámites apuntando a las secciones y páginas reales del sitio
  const todosLosTramites = [
    { cat: "LEGAL", titulo: "Otorgamiento de Poderes y Minutas", url: "/generador/poder-general" },
    { cat: "LABORAL", titulo: "Calculadora de jubilación del IESS", url: "/calculadoras" },
    { cat: "LABORAL", titulo: "IESS Citas Médicas: Agendar o Consultar", url: "/categoria/laboral-iess" },
    { cat: "LABORAL", titulo: "Recuperar clave del IESS", url: "/categoria/laboral-iess" },
    { cat: "LABORAL", titulo: "Certificado de No estar afiliado al IESS", url: "/categoria/laboral-iess" },
    { cat: "ALIMENTOS", titulo: "Calculadora de pensión alimenticia", url: "/articulo/pension-alimenticia-ecuador" },
    { cat: "ALIMENTOS", titulo: "Tabla de pensiones alimenticias", url: "/articulo/pension-alimenticia-ecuador" },
    { cat: "ALIMENTOS", titulo: "Consulta de Pensiones - SUPA", url: "/articulo/pension-alimenticia-ecuador" },
    { cat: "TRÁMITES Y ANT", titulo: "Consultar puntos de la licencia de conducir", url: "/consultas/puntos-licencia" },
    { cat: "TRÁMITES Y ANT", titulo: "Simulador ANT", url: "/simuladores/licencia-tipo-b" },
    { cat: "TRÁMITES Y ANT", titulo: "Consulta de Multas de tránsito ANT", url: "/consultas/multas-transito" },
    { cat: "TRÁMITES Y ANT", titulo: "Certificado de Antecedentes penales", url: "/consultas/antecedentes-penales" },
  ];

  // Filtro inteligente y ultra rápido
  const tramitesFiltrados = useMemo(() => {
    if (busquedaTramite.trim() === "") return [];
    const busquedaLimpia = busquedaTramite.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

    return todosLosTramites.filter(
      (t) =>
        t.titulo.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").includes(busquedaLimpia) ||
        t.cat.toLowerCase().includes(busquedaLimpia)
    );
  }, [busquedaTramite]);

  const columnas = [
    {
      titulo: "LABORAL",
      links: [
        { label: "Calculadora de jubilación del IESS", url: "/calculadoras" },
        { label: "IESS Citas Médicas: Agendar o Consultar", url: "/categoria/laboral-iess" },
        { label: "Recuperar clave del IESS", url: "/categoria/laboral-iess" },
        { label: "Certificado de No estar afiliado al IESS", url: "/categoria/laboral-iess" },
        { label: "Fondos de Reserva del IESS", url: "/calculadoras" },
        { label: "Décimo cuarto sueldo", url: "/calculadoras" },
      ],
    },
    {
      titulo: "ALIMENTOS",
      links: [
        { label: "Calculadora de pensión alimenticia", url: "/articulo/pension-alimenticia-ecuador" },
        { label: "Tabla de pensiones alimenticias", url: "/articulo/pension-alimenticia-ecuador" },
        { label: "Consulta de Pensiones - SUPA", url: "/articulo/pension-alimenticia-ecuador" },
        { label: "Pasos para presentar Demanda de alimentos", url: "/articulo/pension-alimenticia-ecuador" },
      ],
    },
    {
      titulo: "DIVORCIOS",
      links: [
        { label: "Trámite de Divorcio en Ecuador, cómo proceder", url: "/categoria/familia" },
        { label: "Nulidad del matrimonio: Causas y pasos", url: "/categoria/familia" },
        { label: "Divorcio por mutuo consentimiento", url: "/generador/demanda-divorcio-mutuo-acuerdo" },
      ],
    },
    {
      titulo: "TRÁMITES Y ANT",
      links: [
        { label: "Consultar puntos de la licencia de conducir", url: "/consultas/puntos-licencia" },
        { label: "Simulador ANT", url: "/simuladores/licencia-tipo-b" },
        { label: "Consulta de Multas de tránsito ANT", url: "/consultas/multas-transito" },
        { label: "Certificado de Antecedentes penales", url: "/consultas/antecedentes-penales" },
        { label: "Consulta de RUC", url: "/consultas/nombre-por-cedula" },
      ],
    },
  ];

  const tramitesFrecuentes = [
    { label: "Calculadora de jubilación del IESS", url: "/calculadoras" },
    { label: "Consulta de Multas de tránsito ANT", url: "/consultas/multas-transito" },
    { label: "Simulador ANT", url: "/simuladores/licencia-tipo-b" },
    { label: "Calculadora de pensión alimenticia", url: "/articulo/pension-alimenticia-ecuador" },
    { label: "Trámite de Divorcio en Ecuador", url: "/generador/demanda-divorcio-mutuo-acuerdo" },
    { label: "Certificado de Antecedentes penales", url: "/consultas/antecedentes-penales" },
    { label: "Consulta de RUC", url: "/consultas/nombre-por-cedula" },
    { label: "Otorgamiento de Poderes y Minutas", url: "/generador/poder-general" },
  ];

  return (
    <div className="bg-slate-50">
      {/* HERO + BUSCADOR DE TRÁMITES */}
      <section className="bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 pb-14 pt-10 text-white sm:pb-20 sm:pt-14">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-3xl font-extrabold sm:text-4xl">
            Tu asesor legal en casa <span className="text-accent-500">gratis</span>
          </h1>
          <p className="mt-2 max-w-2xl text-brand-100">
            Trámites, consultas y calculadoras legales del Ecuador, explicados de forma clara.
          </p>

          <div className="relative z-30 mx-auto mt-8 max-w-2xl">
            <div className="flex items-center overflow-hidden rounded-full bg-white shadow-lg ring-1 ring-black/5">
              <span className="pl-5 text-slate-400" aria-hidden>
                🔍
              </span>
              <input
                type="text"
                value={busquedaTramite}
                onChange={(e) => setBusquedaTramite(e.target.value)}
                placeholder="Buscar trámite o servicio (ej: poder, licencia, iess)..."
                className="w-full bg-transparent px-3 py-4 text-slate-800 outline-none placeholder:text-slate-400"
                aria-label="Buscar trámite o servicio"
              />
              <button className="grid h-full shrink-0 place-items-center bg-brand-600 px-6 py-4 font-semibold text-white hover:bg-brand-700">
                Buscar
              </button>
            </div>

            {busquedaTramite.trim() !== "" && (
              <div className="absolute left-0 right-0 top-full mt-2 overflow-hidden rounded-2xl bg-white text-left shadow-2xl ring-1 ring-black/5">
                {tramitesFiltrados.length > 0 ? (
                  <ul className="max-h-72 overflow-y-auto p-2">
                    {tramitesFiltrados.map((t, idx) => (
                      <li key={idx}>
                        <Link
                          href={t.url}
                          className="flex items-center gap-2 rounded-xl px-3 py-3 text-sm text-slate-700 hover:bg-slate-50"
                        >
                          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">
                            {t.cat}
                          </span>
                          {t.titulo}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="p-4 text-center text-sm text-slate-500">
                    No encontramos &quot;{busquedaTramite}&quot;. Revisa las opciones abajo.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 py-12">
        {/* HERRAMIENTAS ACTIVAS (Cédula, Placa, Cámara) */}
        <div className="-mt-20 mb-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:-mt-24">
          {/* Cédula */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
            <h4 className="mb-3 font-bold text-brand-800">🪪 Buscar Cédula / Nombre</h4>
            <div className="flex gap-2">
              <input
                type="text"
                value={cedulaInput}
                onChange={(e) => setCedulaInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && consultarCedula()}
                placeholder="Ingrese cédula"
                className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              />
              <button
                onClick={consultarCedula}
                disabled={loadingCedula}
                className="min-w-[90px] rounded-lg bg-brand-700 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-800 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {loadingCedula ? "⌛..." : "Buscar"}
              </button>
            </div>
            {resultadoCedula && (
              <div className="mt-3 rounded-lg border-l-4 border-emerald-500 bg-emerald-50 p-3 text-sm">
                <p className="mb-1">
                  <strong>Nombre:</strong> {resultadoCedula.resultados?.[0]?.nombre || "No encontrado"}
                </p>
                <p>
                  <strong>Cédula:</strong> {resultadoCedula.resultados?.[0]?.cedula || cedulaInput}
                </p>
              </div>
            )}
          </div>

          {/* Placa */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
            <h4 className="mb-3 font-bold text-brand-800">🚗 Buscar Placa</h4>
            <div className="flex gap-2">
              <input
                type="text"
                value={placaInput}
                onChange={(e) => setPlacaInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && consultarPlaca()}
                placeholder="Ej: AAA6789"
                className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              />
              <button
                onClick={consultarPlaca}
                disabled={loadingPlaca}
                className="min-w-[90px] rounded-lg bg-brand-700 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-800 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {loadingPlaca ? "⌛..." : "Buscar"}
              </button>
            </div>
            {resultadoPlaca && (
              <div className="mt-3 rounded-lg border-l-4 border-amber-500 bg-amber-50 p-3 text-sm">
                <p className="mb-1">
                  <strong>Propietario:</strong> {resultadoPlaca.resultados?.[0]?.nombre || "No encontrado"}
                </p>
                <p>
                  <strong>Placa:</strong> {resultadoPlaca.resultados?.[0]?.value || placaInput}
                </p>
              </div>
            )}
          </div>

          {/* Cámara */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
            <h4 className="mb-3 font-bold text-brand-800">📷 Buscar Cámara / Dirección</h4>
            <div className="flex gap-2">
              <input
                type="text"
                value={camaraInput}
                onChange={(e) => setCamaraInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && consultarCamara()}
                placeholder="Ej: bolivar"
                className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              />
              <button
                onClick={consultarCamara}
                disabled={loadingCamara}
                className="min-w-[90px] rounded-lg bg-brand-700 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-800 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {loadingCamara ? "⌛..." : "Buscar"}
              </button>
            </div>
            {resultadoCamara && resultadoCamara.resultados && (
              <div className="mt-3 max-h-40 space-y-2 overflow-y-auto">
                {resultadoCamara.resultados.map((camara: any, index: number) => (
                  <div
                    key={index}
                    className="rounded-lg border-l-4 border-sky-500 bg-sky-50 p-2 text-sm text-slate-700"
                  >
                    {camara.direccion}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* COLUMNAS INFORMATIVAS + SIDEBAR DE TRÁMITES FRECUENTES */}
        <div className="grid gap-10 border-t border-slate-200 pt-10 lg:grid-cols-[1fr_280px]">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {columnas.map((col) => (
              <div key={col.titulo}>
                <h3 className="mb-4 border-b-2 border-brand-700 pb-2 text-base font-bold text-brand-800">
                  {col.titulo}
                </h3>
                <ul className="space-y-3 text-sm">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.url} className="text-brand-600 hover:text-brand-800 hover:underline">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-base font-bold text-slate-900">Trámites frecuentes</h3>
            <ul className="space-y-3 text-sm">
              {tramitesFrecuentes.map((t) => (
                <li key={t.label}>
                  <Link href={t.url} className="text-brand-600 hover:text-brand-800 hover:underline">
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </main>
    </div>
  );
}
