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
      console.log("RESPUESTA CEDULA:", data);
      
      // Extraemos el objeto ya sea array o propiedad
      const raw = data.resultados || data.resultado || data.data || data;
      const item = Array.isArray(raw) ? raw[0] : raw;
      setResCedula(item);
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
      console.log("RESPUESTA PLACA:", data);
      
      const raw = data.resultados || data.resultado || data.data || data;
      const item = Array.isArray(raw) ? raw[0] : raw;
      setResPlaca(item);
    } catch (err: any) {
      setErrorPlaca(`Error de conexión: ${err.message}`);
    } finally {
      setLoadingPlaca(false);
    }
  };

  // Función segura para extraer texto de nombres sin que salga JSON.stringify en pantalla
  const getNombre = (obj: any) => {
    if (!obj) return 'N/D';
    if (typeof obj === 'string') return obj;
    return obj.nombre || obj.nombres || obj.name || obj.full_name || obj.propietario || obj.razonSocial || obj.mensaje || 'N/D';
  };

  const getIdentificacion = (obj: any, fallback: string) => {
    if (!obj) return fallback;
    if (typeof obj === 'string') return fallback;
    return obj.cedula || obj.value || obj.identificacion || fallback;
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
              <p style={{ margin: '5px 0' }}><strong>Nombre:</strong> {getNombre(resCedula)}</p>
              <p style={{ margin: '5px 0' }}><strong>Cédula:</strong> {getIdentificacion(resCedula, cedula)}</p>
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
              <p style={{ margin: '5px 0' }}><strong>Propietario:</strong> {getNombre(resPlaca)}</p>
              <p style={{ margin: '5px 0' }}><strong>Placa:</strong> {getIdentificacion(resPlaca, placa.toUpperCase())}</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}