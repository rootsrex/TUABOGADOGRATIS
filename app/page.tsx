'use client';

import { useState } from 'react';

export default function HomePage() {
  const [tab, setTab] = useState<'cedula' | 'placa'>('cedula');
  
  // Estados Búsqueda Cédula / Nombre
  const [cedula, setCedula] = useState('');
  const [resCedula, setResCedula] = useState<any>(null);
  const [loadingCedula, setLoadingCedula] = useState(false);
  const [errorCedula, setErrorCedula] = useState('');

  // Estados Búsqueda Placa
  const [placa, setPlaca] = useState('');
  const [resPlaca, setResPlaca] = useState<any>(null);
  const [loadingPlaca, setLoadingPlaca] = useState(false);
  const [errorPlaca, setErrorPlaca] = useState('');

  const baseUrl = process.env.NEXT_PUBLIC_REACT_APP_API_URL || process.env.REACT_APP_API_URL || 'https://backendtag-production.up.railway.app';

  // Handler Cédula / Nombre
  const handleBuscarCedula = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cedula) return;
    setLoadingCedula(true);
    setErrorCedula('');
    setResCedula(null);

    try {
      const res = await fetch(`${baseUrl}/api/persona/${encodeURIComponent(cedula.trim())}`);
      
      if (!res.ok) {
        throw new Error(`Servidor respondió con estado ${res.status}`);
      }

      const data = await res.json();
      if (data.status === 'exito' || data.success) {
        setResCedula(data.resultados?.data || data.resultados || data);
      } else {
        setErrorCedula(data.mensaje || 'No se encontraron registros.');
      }
    } catch (err: any) {
      console.error("Error detallado:", err);
      setErrorCedula(`Error de conexión: ${err.message || 'Verifica la API o CORS'}`);
    } finally {
      setLoadingCedula(false);
    }
  };

  // Handler Placa
  const handleBuscarPlaca = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!placa) return;
    setLoadingPlaca(true);
    setErrorPlaca('');
    setResPlaca(null);

    try {
      const res = await fetch(`${baseUrl}/api/placa/${placa.trim().toUpperCase()}`);
      
      if (!res.ok) {
        throw new Error(`Servidor respondió con estado ${res.status}`);
      }

      const data = await res.json();
      if (data.status === 'exito' || data.success) {
        setResPlaca(data.resultados?.data || data.resultados || data);
      } else {
        setErrorPlaca(data.mensaje || 'No se encontraron datos para esta placa.');
      }
    } catch (err: any) {
      console.error("Error detallado:", err);
      setErrorPlaca(`Error de conexión: ${err.message || 'Verifica la API o CORS'}`);
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

      {/* Contenedor Principal con Pestañas */}
      <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', width: '100%', maxWidth: '540px' }}>
        
        {/* Selector de Pestañas */}
        <div style={{ display: 'flex', borderBottom: '2px solid #e5e7eb', marginBottom: '25px' }}>
          <button
            onClick={() => setTab('cedula')}
            style={{
              flex: 1,
              padding: '12px',
              border: 'none',
              background: 'none',
              fontWeight: '600',
              fontSize: '1rem',
              cursor: 'pointer',
              color: tab === 'cedula' ? '#2563eb' : '#6b7280',
              borderBottom: tab === 'cedula' ? '3px solid #2563eb' : 'none',
              marginBottom: '-2px'
            }}
          >
            🪪 Buscar Cédula / Nombre
          </button>
          <button
            onClick={() => setTab('placa')}
            style={{
              flex: 1,
              padding: '12px',
              border: 'none',
              background: 'none',
              fontWeight: '600',
              fontSize: '1rem',
              cursor: 'pointer',
              color: tab === 'placa' ? '#2563eb' : '#6b7280',
              borderBottom: tab === 'placa' ? '3px solid #2563eb' : 'none',
              marginBottom: '-2px'
            }}
          >
            🚗 Buscar Placa
          </button>
        </div>

        {/* Pestaña 1: Cédula / Nombre */}
        {tab === 'cedula' && (
          <div>
            <form onSubmit={handleBuscarCedula} style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                placeholder="Número de cédula o nombre..."
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
                style={{ flex: 1, padding: '12px 16px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem', outline: 'none' }}
              />
              <button
                type="submit"
                disabled={loadingCedula}
                style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', padding: '12px 24px', fontWeight: '600', fontSize: '1rem', cursor: 'pointer' }}
              >
                {loadingCedula ? 'Buscando...' : 'Consultar'}
              </button>
            </form>

            {errorCedula && <p style={{ color: '#dc2626', marginTop: '15px' }}>{errorCedula}</p>}

            {resCedula && (
              <div style={{ marginTop: '20px', padding: '15px', borderRadius: '8px', backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '1.1rem', color: '#111827' }}>Resultado de la consulta:</h3>
                <p style={{ margin: '5px 0' }}><strong>Nombre:</strong> {resCedula.name || resCedula.nombre || 'N/D'}</p>
                <p style={{ margin: '5px 0' }}><strong>Cédula:</strong> {resCedula.value || cedula}</p>
              </div>
            )}
          </div>
        )}

        {/* Pestaña 2: Placa */}
        {tab === 'placa' && (
          <div>
            <form onSubmit={handleBuscarPlaca} style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                placeholder="Número de placa (Ej: PBA1234)..."
                value={placa}
                onChange={(e) => setPlaca(e.target.value)}
                style={{ flex: 1, padding: '12px 16px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem', outline: 'none' }}
              />
              <button
                type="submit"
                disabled={loadingPlaca}
                style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', padding: '12px 24px', fontWeight: '600', fontSize: '1rem', cursor: 'pointer' }}
              >
                {loadingPlaca ? 'Buscando...' : 'Consultar'}
              </button>
            </form>

            {errorPlaca && <p style={{ color: '#dc2626', marginTop: '15px' }}>{errorPlaca}</p>}

            {resPlaca && (
              <div style={{ marginTop: '20px', padding: '15px', borderRadius: '8px', backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '1.1rem', color: '#111827' }}>Resultado de la consulta:</h3>
                <p style={{ margin: '5px 0' }}><strong>Propietario:</strong> {resPlaca.name || resPlaca.nombre || 'N/D'}</p>
                <p style={{ margin: '5px 0' }}><strong>Placa:</strong> {resPlaca.value || placa.toUpperCase()}</p>
             </div>
        )}
      </div>
    </div>
  );
}
