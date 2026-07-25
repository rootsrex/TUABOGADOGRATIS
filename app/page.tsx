"use "
import { useState } from "react";

export default function HomePage() {
  const [cedulaInput, setCedulaInput] = useState("");
  const [placaInput, setPlacaInput] = useState("");
  const [resultadoCedula, setResultadoCedula] = useState<any>(null);
  const [resultadoPlaca, setResultadoPlaca] = useState<any>(null);
  const [loadingCedula, setLoadingCedula] = useState(false);
  const [loadingPlaca, setLoadingPlaca] = useState(false);

  const consultarCedula = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cedulaInput) return;
    setLoadingCedula(true);
    setResultadoCedula(null);
    try {
      const res = await fetch(`https://backendtag-production.up.railway.app/api/cedula/${cedulaInput}`);
      const data = await res.json();
      setResultadoCedula(data.resultados);
    } catch (error) {
      setResultadoCedula({ nombre: "DATOS EN CONSTRUCCIÓN", cedula: cedulaInput });
    } finally {
      setLoadingCedula(false);
    }
  };

  const consultarPlaca = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!placaInput) return;
    setLoadingPlaca(true);
    setResultadoPlaca(null);
    try {
      const res = await fetch(`https://backendtag-production.up.railway.app/api/placa/${placaInput}`);
      const data = await res.json();
      setResultadoPlaca(data.resultados);
    } catch (error) {
      setResultadoPlaca({ nombre: "DATOS EN CONSTRUCCIÓN", value: placaInput });
    } finally {
      setLoadingPlaca(false);
    }
  };

  return (
    <main className="p-6 max-w-xl mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-2">Tu Abogado Gratis</h1>
      <p className="text-gray-600 mb-6">Consulta información pública de cédulas, nombres y vehículos en Ecuador al instante.</p>

      {/* Formulario Cédula */}
      <form onSubmit={consultarCedula} className="mb-6 p-4 border rounded-lg shadow-sm bg-white">
        <label className="block font-semibold mb-2">🔍 Buscar Cédula / Nombre</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={cedulaInput}
            onChange={(e) => setCedulaInput(e.target.value)}
            placeholder="Ej: 1721882932"
            className="border p-2 rounded flex-1"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {loadingCedula ? "Buscando..." : "Consultar"}
          </button>
        </div>

        {resultadoCedula && (
          <div className="mt-4 p-3 bg-gray-50 border rounded">
            <p className="font-semibold text-gray-700">Resultado:</p>
            <p><strong>Nombre:</strong> {resultadoCedula.nombre || "DATOS EN CONSTRUCCIÓN"}</p>
            <p><strong>Cédula:</strong> {resultadoCedula.cedula || cedulaInput}</p>
          </div>
        )}
      </form>

      {/* Formulario Placa */}
      <form onSubmit={consultarPlaca} className="p-4 border rounded-lg shadow-sm bg-white">
        <label className="block font-semibold mb-2">🚗 Buscar Placa</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={placaInput}
            onChange={(e) => setPlacaInput(e.target.value)}
            placeholder="Ej: AAA3456"
            className="border p-2 rounded flex-1 uppercase"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {loadingPlaca ? "Buscando..." : "Consultar"}
          </button>
        </div>

        {resultadoPlaca && (
          <div className="mt-4 p-3 bg-gray-50 border rounded">
            <p className="font-semibold text-gray-700">Resultado:</p>
            <p><strong>Propietario:</strong> {resultadoPlaca.nombre || "DATOS EN CONSTRUCCIÓN"}</p>
            <p><strong>Placa:</strong> {resultadoPlaca.value || placaInput}</p>
          </div>
        )}
      </form>
    </main>
  );
}