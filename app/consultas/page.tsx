"use client";

import { useState } from "react";

export default function ConsultaMatricula() {
  const [criterio, setCriterio] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<any>(null);
  const [error, setError] = useState("");

  const consultarValores = async () => {
    if (!criterio.trim()) {
      setError("Por favor, ingrese un valor válido.");
      return;
    }
    
    setError("");
    setLoading(true);
    setResultado(null);

    try {
      // AQUÍ VA LA CONEXIÓN A TU SERVIDOR (EJ. RAILWAY)
      // Ejemplo: const res = await fetch(`https://tu-api.up.railway.app/api/matricula/${criterio}`);
      
      // Simulador de tiempo de respuesta para la UI
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Datos simulados que tu API debería devolver
      const dataFalsa = {
        placa: criterio.toUpperCase(),
        marca: "CHEVROLET",
        modelo: "AVEO",
        anio: 2018,
        valorMatricula: "$124.50",
        multasANT: "$0.00",
        totalPagar: "$124.50",
        estado: "Pendiente de pago"
      };

      setResultado(dataFalsa);
    } catch (err) {
      setError("No se pudo conectar con el servidor. Intente más tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-brand-200 bg-white shadow-lg">
      {/* Cabecera del formulario */}
      <div className="bg-brand-50 px-6 py-5 border-b border-brand-100">
        <h2 className="text-xl font-bold text-brand-800 text-center">
          Consulta de valores a pagar (Matrícula) de vehículo
        </h2>
      </div>

      <div className="p-6 md:p-8">
        <p className="mb-4 text-sm text-slate-600">
          Consulte los valores a pagar de su vehículo (carro, motocicleta, etc.) ingresando uno de los siguientes datos:
        </p>
        
        <ul className="mb-6 space-y-2 text-sm text-slate-700">
          <li><strong>• Placa:</strong> Identificación vehicular (Ej: AAA0123)</li>
          <li><strong>• RAMV:</strong> Registro Aduanero de Matriculación (Ej: T00123456)</li>
          <li><strong>• CPN:</strong> Certificado de Producción Nacional (Ej: B0012345678)</li>
        </ul>

        {/* Formulario */}
        <div className="mb-6 rounded-xl bg-slate-50 p-5 border border-slate-200">
          <label className="mb-2 block font-semibold text-brand-700">
            Ingrese Placa, RAMV o CPN
          </label>
          <input
            type="text"
            value={criterio}
            onChange={(e) => setCriterio(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === "Enter" && consultarValores()}
            placeholder="Ej: PCQ6000"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-lg font-medium text-slate-800 outline-none uppercase placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
          
          {error && <p className="mt-2 text-sm text-red-600 font-medium">{error}</p>}

          <div className="mt-5 flex flex-col items-center gap-3">
            <button
              onClick={consultarValores}
              disabled={loading}
              className="w-full sm:w-auto min-w-[200px] rounded-lg bg-brand-600 px-6 py-3 font-bold text-white transition-colors hover:bg-brand-700 disabled:bg-slate-400"
            >
              {loading ? "Consultando base de datos ⏳..." : "Consultar"}
            </button>
            <a href="#" className="text-sm text-brand-600 hover:underline flex items-center gap-1">
              ⬇ Guía para contribuyentes
            </a>
          </div>
        </div>

        {/* Zona de Resultados */}
        {resultado && (
          <div className="animate-fadeIn rounded-xl border border-emerald-200 bg-emerald-50 p-6">
            <h3 className="mb-4 border-b border-emerald-200 pb-2 text-lg font-bold text-emerald-800">
              Resultados para: {resultado.placa}
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm text-slate-700">
              <div><span className="font-semibold block">Marca:</span> {resultado.marca}</div>
              <div><span className="font-semibold block">Modelo:</span> {resultado.modelo}</div>
              <div><span className="font-semibold block">Año:</span> {resultado.anio}</div>
              <div><span className="font-semibold block">Estado:</span> <span className="text-amber-600 font-bold">{resultado.estado}</span></div>
            </div>
            <div className="mt-4 rounded-lg bg-white p-4 border border-emerald-100 flex justify-between items-center shadow-sm">
              <span className="font-bold text-slate-700 text-lg">Total a Pagar:</span>
              <span className="text-2xl font-black text-emerald-600">{resultado.totalPagar}</span>
            </div>
          </div>
        )}

        <p className="mt-6 text-xs text-slate-400 text-center flex items-start gap-1 justify-center">
          <span className="text-brand-500 font-bold">ℹ</span>
          Si no encuentra su vehículo con la placa consultada, solicite a la Entidad de Tránsito la actualización de esta información.
        </p>
      </div>
    </div>
  );
}