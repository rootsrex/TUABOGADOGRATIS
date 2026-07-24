"use client";

import { useState } from "react";

export default function Home() {
  const [cedula, setCedula] = useState("");
  const [resultados, setResultados] = useState<any>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  async function consultarCedula() {
    if (!cedula) {
      setError("Por favor ingresa una cédula");
      return;
    }

    setCargando(true);
    setError("");
    setResultados(null);

    try {
      const urlApi = `${process.env.NEXT_PUBLIC_API_CEDULAS}/api/cedula/${cedula}`;
      const respuesta = await fetch(urlApi, {
        method: "GET"
      });

      const datos = await respuesta.json();

      if (datos.resultados) {
        setResultados(datos.resultados); 
      } else {
        setError("No se encontró información o hubo un problema con la búsqueda.");
      }
    } catch (err) {
      console.error(err);
      setError("Error al conectar con el servidor de búsqueda.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <main style={{ maxWidth: "600px", margin: "40px auto", fontFamily: "sans-serif", padding: "0 20px" }}>
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#1e293b", marginBottom: "10px" }}>
          Tu Abogado Gratis
        </h1>
        <p style={{ color: "#64748b" }}>Consulta la información pública de cédulas en Ecuador al instante.</p>
      </div>

      <div style={{ backgroundColor: "#f8fafc", padding: "25px", borderRadius: "12px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0" }}>
        <h2 style={{ fontSize: "18px", marginBottom: "15px", color: "#334155" }}>Buscar Cédula en Ecuador</h2>
        
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="text"
            placeholder="Número de cédula..."
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "6px",
              border: "1px solid #cbd5e1",
              fontSize: "16px"
            }}
          />
          
          <button
            onClick={consultarCedula}
            disabled={cargando}
            style={{
              padding: "12px 24px",
              backgroundColor: "#2563eb",
              color: "#fff",
              fontWeight: "bold",
              border: "none",
              borderRadius: "6px",
              cursor: cargando ? "not-allowed" : "pointer",
              fontSize: "16px"
            }}
          >
            {cargando ? "Consultando..." : "Consultar"}
          </button>
        </div>

        {error && (
          <p style={{ color: "red", marginTop: "15px", fontSize: "14px" }}>{error}</p>
        )}
      </div>

      {resultados && (
        <div style={{ marginTop: "25px", backgroundColor: "#fff", padding: "20px", borderRadius: "8px", border: "1px solid #e2e8f0", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
          <h3 style={{ marginTop: 0, color: "#1e293b", borderBottom: "1px solid #e2e8f0", paddingBottom: "10px" }}>Resultados de la consulta</h3>
          <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-all", background: "#f1f5f9", padding: "12px", borderRadius: "6px", fontSize: "14px" }}>
            {JSON.stringify(resultados, null, 2)}
          </pre>
        </div>
      )}
    </main>
  );
}
