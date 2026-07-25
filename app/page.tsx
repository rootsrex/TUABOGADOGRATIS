'use client';

import React, { useState } from 'react';

export default function HomePage() {
  const [cedulaInput, setCedulaInput] = useState('');
  const [placaInput, setPlacaInput] = useState('');
  
  const [resCedula, setResCedula] = useState<any>(null);
  const [resPlaca, setResPlaca] = useState<any>(null);

  const consultarCedula = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://backendtag-production.up.railway.app/api/cedula/${cedulaInput}`);
      const data = await response.json();
      setResCedula(data);
    } catch (error) {
      console.error("Error consultando cédula", error);
    }
  };

  const consultarPlaca = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://backendtag-production.up.railway.app/api/placa/${placaInput}`);
      const data = await response.json();
      console.log("RESPUESTA PLACA COMPLETA:", data);
      setResPlaca(data);
    } catch (error) {
      console.error("Error consultando placa", error);
    }
  };

  return (
    <main style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>Tu Abogado Gratis</h1>
      <p>Consulta información pública de cédulas, nombres y vehículos en Ecuador al instante.</p>

      {/* Formulario Cédula */}
      <div style={{ background: '#f4f4f4', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>🔍 Buscar Cédula / Nombre</h3>
        <form onSubmit={consultarCedula} style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            value={cedulaInput} 
            onChange={(e) => setCedulaInput(e.target.value)} 
            placeholder="Ingrese cédula"
            style={{ padding: '8px', flex: 1, borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button type="submit" style={{ padding: '8px 15px', background: '#0056b3', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Consultar
          </button>
        </form>

        {resCedula && (
          <div style={{ marginTop: '15px', background: '#fff', padding: '10px', borderRadius: '6px' }}>
            <p><strong>Resultado:</strong></p>
            <p><strong>Nombre:</strong> {resCedula.resultados?.nombre || resCedula.resultados?.nombreFinal || 'DATOS EN CONSTRUCCIÓN'}</p>
            <p><strong>Cédula:</strong> {cedulaInput}</p>
          </div>
        )}
      </div>

      {/* Formulario Placa */}
      <div style={{ background: '#f4f4f4', padding: '15px', borderRadius: '8px' }}>
        <h3>🚗 Buscar Placa</h3>
        <form onSubmit={consultarPlaca} style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            value={placaInput} 
            onChange={(e) => setPlacaInput(e.target.value)} 
            placeholder="Ingrese placa (ej: AAA6789)"
            style={{ padding: '8px', flex: 1, borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button type="submit" style={{ padding: '8px 15px', background: '#0056b3', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Consultar
          </button>
        </form>

        {resPlaca && (
          <div style={{ marginTop: '15px', background: '#fff', padding: '10px', borderRadius: '6px' }}>
            <p><strong>Resultado:</strong></p>
            <p><strong>Propietario:</strong> {resPlaca.resultados?.nombre || resPlaca.resultados?.nombreFinal || 'DATOS EN CONSTRUCCIÓN'}</p>
            <p><strong>Placa:</strong> {placaInput.toUpperCase()}</p>
          </div>
        )}
      </div>
    </main>
  );
}