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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontFamily: 'Arial, sans-serif' }}>
      
      {/* Contenido Principal */}
      <main style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto', width: '100%' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.8rem', color: '#111', marginBottom: '0.5rem' }}>Tu Abogado Gratis</h1>
          <p style={{ color: '#555', fontSize: '1rem' }}>Consulta información pública de cédulas, vehículos y cámaras en Ecuador al instante.</p>
        </div>

        {/* Sección Cédula */}
        <div style={{ marginBottom: '1.5rem', padding: '1.5rem', border: '1px solid #e0e0e0', borderRadius: '8px', background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', color: '#333' }}>Buscar Cédula / Nombre</h3>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="text" 
              value={cedulaInput} 
              onChange={(e) => setCedulaInput(e.target.value)} 
              placeholder="Ingrese cédula" 
              style={{ padding: '0.6rem', flex: 1, border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <button onClick={consultarCedula} style={{ padding: '0.6rem 1.2rem', background: '#fff', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Consultar</button>
          </div>

          {resultadoCedula && (
            <div style={{ marginTop: '1rem', background: '#f8f9fa', padding: '1rem', borderRadius: '4px', borderLeft: '4px solid #28a745' }}>
              <p style={{ margin: '0 0 0.5rem 0' }}><strong>Nombre:</strong> {resultadoCedula.resultados?.[0]?.nombre || resultadoCedula.resultados?.nombre || "No encontrado"}</p>
              <p style={{ margin: '0' }}><strong>Cédula:</strong> {resultadoCedula.resultados?.[0]?.cedula || resultadoCedula.resultados?.cedula || cedulaInput}</p>
            </div>
          )}
        </div>

        {/* Sección Placa */}
        <div style={{ marginBottom: '1.5rem', padding: '1.5rem', border: '1px solid #e0e0e0', borderRadius: '8px', background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', color: '#333' }}>Buscar Placa</h3>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="text" 
              value={placaInput} 
              onChange={(e) => setPlacaInput(e.target.value)} 
              placeholder="Ingrese placa (ej: AAA6789)" 
              style={{ padding: '0.6rem', flex: 1, border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <button onClick={consultarPlaca} style={{ padding: '0.6rem 1.2rem', background: '#fff', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Consultar</button>
          </div>

          {resultadoPlaca && (
            <div style={{ marginTop: '1rem', background: '#f8f9fa', padding: '1rem', borderRadius: '4px', borderLeft: '4px solid #ffc107' }}>
              <p style={{ margin: '0 0 0.5rem 0' }}><strong>Propietario / Estado:</strong> {resultadoPlaca.resultados?.[0]?.nombre || resultadoPlaca.resultados?.nombre || "No encontrado"}</p>
              <p style={{ margin: '0' }}><strong>Placa:</strong> {resultadoPlaca.resultados?.[0]?.value || resultadoPlaca.resultados?.value || placaInput}</p>
            </div>
          )}
        </div>

        {/* Sección Cámaras y Direcciones */}
        <div style={{ marginBottom: '1.5rem', padding: '1.5rem', border: '1px solid #e0e0e0', borderRadius: '8px', background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', color: '#333' }}>Buscar Cámara / Dirección</h3>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="text" 
              value={camaraInput} 
              onChange={(e) => setCamaraInput(e.target.value)} 
              placeholder="Ingrese nombre, código o dirección" 
              style={{ padding: '0.6rem', flex: 1, border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <button onClick={consultarCamara} style={{ padding: '0.6rem 1.2rem', background: '#fff', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Consultar</button>
          </div>

          {resultadoCamara && resultadoCamara.resultados && (
            <div style={{ marginTop: '1rem' }}>
              {resultadoCamara.resultados.map((camara: any, index: number) => (
                <div key={index} style={{ background: '#f8f9fa', padding: '1rem', marginBottom: '0.5rem', borderRadius: '4px', borderLeft: '4px solid #007bff' }}>
                  <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#666' }}><strong>Opción {index + 1}:</strong> {camara.nombre}</p>
                  <p style={{ margin: '0', fontSize: '0.95rem', color: '#222' }}><strong>Dirección:</strong> {camara.direccion}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Pie de página estético */}
      <footer style={{ background: '#0b132b', color: '#fff', padding: '2rem', textAlign: 'center', fontSize: '0.9rem', marginTop: '2rem' }}>
        <p style={{ margin: '0' }}>Tu Abogado Gratis — Información legal y trámites del Ecuador explicados de forma clara.</p>
      </footer>
    </div>
  );
}