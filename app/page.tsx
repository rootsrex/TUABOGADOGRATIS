"use client";

import { useState } from 'react';

export default function HomePage() {
  const [cedulaInput, setCedulaInput] = useState('');
  const [placaInput, setPlacaInput] = useState('');
  const [camaraInput, setCamaraInput] = useState('');
  
  const [resultadoCedula, setResultadoCedula] = useState<any>(null);
  const [resultadoPlaca, setResultadoPlaca] = useState<any>(null);
  const [resultadoCamara, setResultadoCamara] = useState<any>(null);

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

  const consultarCamara = async () => {
    try {
      const endpoint = "https://api-busqueda-cedulas-production.up.railway.app/api/camara/" + encodeURIComponent(camaraInput.trim());
      const res = await fetch(endpoint);
      const data = await res.json();
      setResultadoCamara(data);
    } catch (error) {
      console.error("Error al consultar cámara", error);
    }
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Tu Abogado Gratis</h1>
      <p>Consulta información pública de cédulas, vehículos y cámaras en Ecuador al instante.</p>

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
            <p><strong>Propietario / Estado:</strong> {resultadoPlaca.resultados?.[0]?.nombre || resultadoPlaca.resultados?.nombre || "No encontrado"}</p>
            <p><strong>Placa:</strong> {resultadoPlaca.resultados?.[0]?.value || resultadoPlaca.resultados?.value || placaInput}</p>
          </div>
        )}
      </div>

      {/* Sección Cámaras y Direcciones */}
      <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>Buscar Cámara / Dirección</h2>
        <input 
          type="text" 
          value={camaraInput} 
          onChange={(e) => setCamaraInput(e.target.value)} 
          placeholder="Ingrese nombre, código o dirección" 
          style={{ padding: '0.5rem', width: '70%', marginRight: '1rem' }}
        />
        <button onClick={consultarCamara} style={{ padding: '0.5rem 1rem' }}>Consultar</button>

        {/* AQUÍ ESTÁ LA MAGIA: Recorremos toda la lista de resultados para mostrarlos todos */}
        {resultadoCamara && resultadoCamara.resultados && (
          <div style={{ marginTop: '1rem' }}>
            {resultadoCamara.resultados.map((camara: any, index: number) => (
              <div key={index} style={{ background: '#f4f4f4', padding: '1rem', marginBottom: '0.5rem', borderRadius: '4px', borderLeft: '4px solid #007bff' }}>
                <p style={{ margin: '0 0 0.5rem 0' }}><strong>Opción {index + 1}:</strong> {camara.nombre}</p>
                <p style={{ margin: '0' }}><strong>Dirección:</strong> {camara.direccion}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}