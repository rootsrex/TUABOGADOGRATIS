"use client"; // Obligatorio en Next.js (App Router) si usas useState

import { useState } from "react";

export default function BuscadorCedula() {
  // Estados para manejar la interfaz
  const [cedula, setCedula] = useState("");
const [resultados, setResultados] = useState<any[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  // Esta es la función del Paso 5 que se conecta a Railway
  async function consultarCedula() {
    if (!cedula) {
      setError("Por favor ingresa una cédula");
      return;
    }

    setCargando(true);
    setError("");
    setResultados([]);

    try {
      // Llamamos a la variable de entorno que guardaste en Vercel
      const urlApi = `${process.env.NEXT_PUBLIC_API_CEDULAS}/buscar-cedula`;
      
      const respuesta = await fetch(urlApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dato: cedula }),
      });

      const datos = await respuesta.json();
      
      if (datos.status === "exito") {
        setResultados(datos.datos); // Guardamos los datos para mostrarlos
      } else {
        setError(datos.mensaje);
      }
    } catch (err) {
      console.error(err);
      setError("Error al conectar con el servidor de búsqueda.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto", fontFamily: "sans-serif" }}>
      <h2>Buscar Cédula en Ecuador</h2>
      
      {/* Campo de texto y Botón */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input 
          type="text" 
          placeholder="Ej: 0604919415" 
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
          style={{ flex: 1, padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <button 
          onClick={consultarCedula} 
          disabled={cargando}
          style={{ padding: "10px 20px", background: "#0056b3", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
        >
          {cargando ? "Buscando..." : "Consultar"}
        </button>
      </div>

      {/* Mensaje de error si la cédula no existe */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Mostrar los resultados de la API */}
      {resultados.length > 0 && (
        <div style={{ background: "#f9f9f9", padding: "15px", borderRadius: "5px", border: "1px solid #ddd" }}>
          <h3 style={{ marginTop: 0 }}>Resultados:</h3>
{resultados.map((persona: any, index: number) => (
  <div key={index} style={{ marginBottom: "10px" }}>
              <p><strong>Cédula:</strong> {persona.cedula}</p>
              <p><strong>Nombre:</strong> {persona.nombre}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
