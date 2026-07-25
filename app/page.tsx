'use client';

import { useState } from 'react';

export default function HomePage() {
  const [cedula, setCedula] = useState('');
  const [resCedula, setResCedula] = useState<any>(null);
  const [loadingCedula, setLoadingCedula] = useState(false);
  const [errorCedula, setErrorCedula] = useState('');

  const [placa, setPlaca] = useState('');
  const [resPlaca, setResPlaca] = useState<any>(null);
  const [loadingPlaca, setLoadingPlaca] = useState(false);
  const [errorPlaca, setErrorPlaca] = useState('');

  const baseUrl = process.env.NEXT_PUBLIC_REACT_APP_API_URL || 'https://api-busqueda-cedulas-production.up.railway.app';
  
  const handleBuscarCedula = async (e: React.FormEvent) => {
    e.preventDefault();
    const searchValue = cedula.trim();
    if (!searchValue) return;
    
    setLoadingCedula(true);
    setErrorCedula('');
    setResCedula(null);

    try {
      const res = await fetch(`${baseUrl}/api/cedula/${encodeURIComponent(searchValue)}`);
      if (!res.ok) throw new Error(`Servidor respondió con estado ${res.status}`);

      const data = await res.json();
      setResCedula(data.resultados || data);
    } catch (err: any) {
      setErrorCedula(`Error de conexión: ${err.message}`);
    } finally {
      setLoadingCedula(false);
    }
  };

  const handleBuscarPlaca = async (e: React.FormEvent) => {
    e.preventDefault();
    const searchValue = placa.trim();
    if (!searchValue) return;

    setLoadingPlaca(true);
    setErrorPlaca('');
    setResPlaca(null);

    try {
      const res = await fetch(`${baseUrl}/api/placa/${encodeURIComponent(searchValue.toUpperCase())}`);
      if (!res.ok) throw new Error(`Servidor respondió con estado ${res.status}`);

      const data = await res.json();
      setResPlaca(data.resultados?.data || data.resultados || data);
    } catch (err: any) {
      setErrorPlaca(`Error de conexión: ${err.message}`);
    } finally {
      setLoadingPlaca(false);
    }
  };

  return (
    <div style={{ minHeight: '75vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', padding: '20px' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '10px', color: '#111827', textAlign: 'center' }}>
        Tu Abogado Gratis
      </h1>
      <p style={{ color: '#6b7280', marginBottom: '30px', fontSize: '1.1rem', textAlign: 'center' }}>
        Consulta información pública de cédulas, nombres y vehículos en Ecuador al instante.
      </p>

      <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', width: '100%', maxWidth: '540px' }}>
        
        {/* BUSCADOR DE CÉDULA */}
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '1.2rem', color: '#111827', marginBottom: '12px' }}>🪪 Buscar Cédula / Nombre</h2>
          <form onSubmit={handleBuscarCedula} style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              placeholder="Número de cédula..."
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              style={{ flex: 1, padding: '12px 16px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1.0rem', outline: 'none' }}
            />
            <button
              type="submit"
              disabled={loadingCedula}
              style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', padding: '12px 24px', fontWeight: '600', cursor: 'pointer' }}
            >
              {loadingCedula ? 'Buscando...' : 'Consultar'}
            </button>
          </form>

          {errorCedula && <p style={{ color: '#dc2626', marginTop: '15px' }}>{errorCedula}</p>}

          {resCedula && (
            <div style={{ marginTop: '20px', padding: '15px', borderRadius: '8px', backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '1.1rem', color: '#111827' }}>Resultado:</h3>
              <p style={{ margin: '5px 0' }}><strong>Nombre:</strong> {resCedula.name || resCedula.nombre || resCedula.nombres || resCedula.full_name || 'N/D'}</p>
              <p style={{ margin: '5px 0' }}><strong>Cédula:</strong> {resCedula.value || resCedula.cedula || cedula}</p>
            </div>
          )}
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '25px 0' }} />

        {/* BUSCADOR DE PLACA */}
        <div>
          <h2 style={{ fontSize: '1.2rem', color: '#111827', marginBottom: '12px' }}>🚗 Buscar Placa</h2>
          <form onSubmit={handleBuscarPlaca} style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              placeholder="Número de placa..."
              value={placa}
              onChange={(e) => setPlaca(e.target.value)}
              style={{ flex: 1, padding: '12px 16px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1.0rem', outline: 'none' }}
            />
            <button
              type="submit"
              disabled={loadingPlaca}
              style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', padding: '12px 24px', fontWeight: '600', cursor: 'pointer' }}
            >
              {loadingPlaca ? 'Buscando...' : 'Consultar'}
            </button>
          </form>

          {errorPlaca && <p style={{ color: '#dc2626', marginTop: '15px' }}>{errorPlaca}</p>}

          {resPlaca && (
            <div style={{ marginTop: '20px', padding: '15px', borderRadius: '8px', backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '1.1rem', color: '#111827' }}>Resultado:</h3>
              <p style={{ margin: '5px 0' }}><strong>Propietario:</strong> {resPlaca.name || resPlaca.nombre || resPlaca.nombres || 'N/D'}</p>
              <p style={{ margin: '5px 0' }}><strong>Placa:</strong> {resPlaca.value || placa.toUpperCase()}</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}