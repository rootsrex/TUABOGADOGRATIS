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
      // Petición real al endpoint interno /api/matricula
      const res = await fetch("/api/matricula", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ placa: criterio.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "No se pudo consultar el servidor.");
      }

      if (data.datos && data.datos.vehiculo) {
        setResultado(data.datos.vehiculo);
      } else {
        setError("No se encontraron registros para el vehículo ingresado.");
      }
    } catch (err: any) {
      setError(err.message || "No se pudo conectar con el servidor. Intente más tarde.");
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
            placeholder="Ej: PBQ3456"
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

        {/* Zona de Resultados con datos reales de la API */}
        {resultado && (
          <div className="animate-fadeIn rounded-xl border border-emerald-200 bg-emerald-50 p-6">
            <h3 className="mb-4 border-b border-emerald-200 pb-2 text-lg font-bold text-emerald-800">
              Resultados para: {resultado.numeroPlaca}
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm text-slate-700">
              <div>
                <span className="font-semibold block">Marca:</span> 
                {resultado.descripcionMarca || "N/A"}
              </div>
              <div>
                <span className="font-semibold block">Modelo:</span> 
                {resultado.descripcionModelo || "N/A"}
              </div>
              <div>
                <span className="font-semibold block">Año del modelo:</span> 
                {resultado.anioModelo || "N/A"}
              </div>
              <div>
                <span className="font-semibold block">País de origen:</span> 
                {resultado.descripcionPais || "N/A"}
              </div>
              <div>
                <span className="font-semibold block">Cámara / CPN:</span> 
                {resultado.numeroCamvCpn || "N/A"}
              </div>
              <div>
                <span className="font-semibold block">Código de Vehículo:</span> 
                {resultado.codigoVehiculo || "N/A"}
              </div>
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