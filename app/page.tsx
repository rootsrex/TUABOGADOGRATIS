"use client";

import { useState } from 'react';

export default function HomePage() {
  const [cedulaInput, setCedulaInput] = useState('');
  const [placaInput, setPlacaInput] = useState('');
  const [resultadoCedula, setResultadoCedula] = useState<any>(null);
  const [resultadoPlaca, setResultadoPlaca] = useState<any>(null);

  const consultarCedula = async () => {
    try {
      const url = "https://api-busqueda-cedulas-production.up.railway.app/api/cedula/" + cedulaInput;
      const res = await fetch(url);
      const data = await res.json();
      setResultadoCedula(data);
    } catch (error) {
      console.error("Error al consultar cédula", error);
    }
  };

  const consultarPlaca = async () => {
    try {
      const url = "https://api-busqueda-cedulas-production.up.railway.app/api/placa/" + placaInput;
      const res = await fetch(url);
      const data = await res.json();
      setResultadoPlaca(data);
    } catch (error) {
      console.error("Error al consultar placa", error);
    }
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Tu Abogado Gratis</h1>
      <p>Consulta información pública de cédulas y vehículos en Ecuador al instante.</p>

      {/* Sección Cédula */}
      <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>Buscar Cédula / Nombre</h2>
        <input 
          type="text" 
          value={cedulaInput} 
          onChange={(e) => setCedulaInput(e.target.value)} 
          placeholder="Ingrese cédula" 
          style={{ padding: '0.5rem', width: '70%', marginRight: '1rem' }}
        />
        <button onClick={consultarCedula} style={{ padding: '0.5rem 1rem' }}>Consultar</button>

        {resultadoCedula && (
          <div style={{ marginTop: '1rem', background: '#f4f4f4', padding: '0.5rem' }}>
            <p><strong>Nombre:</strong> {resultadoCedula.resultados?.[0]?.nombre || resultadoCedula.resultados?.nombre || "No encontrado"}</p>
            <p><strong>Cédula:</strong> {resultadoCedula.resultados?.[0]?.cedula || resultadoCedula.resultados?.cedula || cedulaInput}</p>
          </div>
        )}
      </div>

      {/* Sección Placa */}
      <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>Buscar Placa</h2>
        <input 
          type="text" 
          value={placaInput} 
          onChange={(e) => setPlacaInput(e.target.value)} 
          placeholder="Ingrese placa (ej: AAA6789)" 
          style={{ padding: '0.5rem', width: '70%', marginRight: '1rem' }}
        />
        <button onClick={consultarPlaca} style={{ padding: '0.5rem 1rem' }}>Consultar</button>

        {resultadoPlaca && (
          <div style={{ marginTop: '1rem', background: '#f4f4f4', padding: '0.5rem' }}>
            <p><strong>Propietario / Estado:</strong> {resultadoPlaca.resultados?.nombre}</p>
            <p><strong>Placa:</strong> {resultadoPlaca.resultados?.value}</p>
          </div>
        )}
      </div>
    </main>
  );
}