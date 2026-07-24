'use client';

import { useState } from 'react';

export default function PlacasPage() {
  const [placa, setPlaca] = useState('');
  const [resultado, setResultado] = useState<any>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const handleBuscar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!placa) return;

    setCargando(true);
    setError('');
    setResultado(null);

    const baseUrl = process.env.NEXT_PUBLIC_REACT_APP_API_URL || process.env.REACT_APP_API_URL || 'https://backendtag-production.up.railway.app';

    try {
      const res = await fetch(`${baseUrl}/api/placa/${placa.trim().toUpperCase()}`);
      const data = await res.json();

      if (data.status === 'exito') {
        setResultado(data.resultados?.data || data.resultados);
      } else {
        setError(data.mensaje || 'No se encontraron datos para esta placa.');
      }
    } catch (err) {
      setError('Error al conectar con el servidor.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', padding: '20px' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '10px', color: '#111827' }}>Tu Abogado Gratis</h1>
      <p style={{ color: '#6b7280', marginBottom: '30px', fontSize: '1.1rem' }}>Consulta la información de vehículos por placa en Ecuador al instante.</p>

      <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', width: '100%', maxWidth: '520px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '20px', color: '#1f2937' }}>Buscar Placa en Ecuador</h2>
        
        <form onSubmit={handleBuscar} style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="Número de placa (Ej: PBA1234)..."
            value={placa}
            onChange={(e) => setPlaca(e.target.value)}
            style={{ flex: 1, padding: '12px 16px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem', outline: 'none' }}
          />
          <button
            type="submit"
            disabled={cargando}
            style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', padding: '12px 24px', fontWeight: '600', fontSize: '1rem', cursor: 'pointer' }}
          >
            {cargando ? 'Buscando...' : 'Consultar'}
          </button>
        </form>

        {error && <p style={{ color: '#dc2626', marginTop: '15px' }}>{error}</p>}

        {resultado && (
          <div style={{ marginTop: '20px', padding: '15px', borderRadius: '8px', backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '1.1rem', color: '#111827' }}>Resultado de la consulta:</h3>
            <p style={{ margin: '5px 0' }}><strong>Propietario:</strong> {resultado.name || resultado.nombre || 'N/D'}</p>
            <p style={{ margin: '5px 0' }}><strong>Placa:</strong> {resultado.value || placa.toUpperCase()}</p>
          </div>
        )}
      </div>
    </div>
  );
}
