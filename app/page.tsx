"use client";

import { useState } from 'react';

export default function HomePage() {
  const [cedulaInput, setCedulaInput] = useState('');
  const [placaInput, setPlacaInput] = useState('');
  const [camaraInput, setCamaraInput] = useState('');
  const [busquedaTramite, setBusquedaTramite] = useState('');
  
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

  // Base amplia de trámites para el buscador superior
  const listaTramites = [
    { cat: "LEGAL", titulo: "Otorgamiento de Poderes y Minutas", url: "#" },
    { cat: "LABORAL", titulo: "Calculadora de jubilación del IESS", url: "https://www.iess.gob.ec" },
    { cat: "LABORAL", titulo: "IESS Citas Médicas: Agendar o Consultar", url: "https://www.iess.gob.ec" },
    { cat: "LABORAL", titulo: "Recuperar clave del IESS", url: "https://www.iess.gob.ec" },
    { cat: "LABORAL", titulo: "Certificado de No estar afiliado al IESS", url: "https://www.iess.gob.ec" },
    { cat: "ALIMENTOS", titulo: "Calculadora de pensión alimenticia", url: "https://www.funcionjudicial.gob.ec" },
    { cat: "ALIMENTOS", titulo: "Tabla de pensiones alimenticias", url: "https://www.funcionjudicial.gob.ec" },
    { cat: "ALIMENTOS", titulo: "Consulta de Pensiones - SUPA", url: "https://supa.funcionjudicial.gob.ec" },
    { cat: "TRÁMITES Y ANT", titulo: "Consultar puntos de la licencia de conducir", url: "https://www.ant.gob.ec" },
    { cat: "TRÁMITES Y ANT", titulo: "Simulador ANT", url: "https://www.ant.gob.ec" },
    { cat: "TRÁMITES Y ANT", titulo: "Consulta de Multas de tránsito ANT", url: "https://www.ant.gob.ec" },
    { cat: "TRÁMITES Y ANT", titulo: "Certificado de Antecedentes penales", url: "https://www.gob.ec" }
  ];

  const tramitesFiltrados = busquedaTramite.trim() === "" 
    ? [] 
    : listaTramites.filter(t => t.titulo.toLowerCase().includes(busquedaTramite.toLowerCase()));

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontFamily: 'Arial, sans-serif', background: '#fff', color: '#111' }}>
      
      <main style={{ padding: '2rem 3rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        
        {/* Barra de búsqueda superior con despliegue inteligente */}
        <div style={{ marginBottom: '2.5rem', maxWidth: '700px', position: 'relative', zIndex: 50 }}>
          <div style={{ display: 'flex', border: '2px solid #1a365d', borderRadius: '6px', overflow: 'hidden', background: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <input 
              type="text" 
              value={busquedaTramite}
              onChange={(e) => setBusquedaTramite(e.target.value)}
              placeholder="Buscar trámite o servicio (ej: poder, licencia, iess)..." 
              style={{ padding: '0.9rem 1rem', flex: 1, border: 'none', outline: 'none', fontSize: '1rem' }}
            />
            <button style={{ padding: '0 1.5rem', background: '#1a365d', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1.1rem' }}>
              🔍
            </button>
          </div>

          {/* Menú desplegable dinámico */}
          {busquedaTramite.trim() !== "" && (
            <div style={{ position: 'absolute', top: '105%', left: 0, right: 0, background: '#fff', border: '1px solid #cbd5e1', borderRadius: '6px', boxShadow: '0 10px 20px rgba(0,0,0,0.15)', maxHeight: '250px', overflowY: 'auto' }}>
              {tramitesFiltrados.length > 0 ? (
                tramitesFiltrados.map((t, idx) => (
                  <a key={idx} href={t.url} target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: '0.8rem 1rem', borderBottom: '1px solid #f1f5f9', color: '#0066cc', textDecoration: 'none', fontSize: '0.9rem' }}>
                    <strong>[{t.cat}]</strong> {t.titulo}
                  </a>
                ))
              ) : (
                <div style={{ padding: '0.8rem 1rem', color: '#666', fontSize: '0.9rem' }}>
                  No se encontraron trámites exactos para "{busquedaTramite}". Revisa las categorías de abajo.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sección de Herramientas Activas (Cédula, Placa, Cámaras) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          
          {/* Cédula */}
          <div style={{ padding: '1.2rem', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#f8fafc' }}>
            <h4 style={{ margin: '0 0 0.8rem 0', color: '#1a365d' }}>Buscar Cédula / Nombre</h4>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="text" 
                value={cedulaInput} 
                onChange={(e) => setCedulaInput(e.target.value)} 
                placeholder="Ingrese cédula" 
                style={{ padding: '0.5rem', flex: 1, border: '1px solid #cbd5e1', borderRadius: '4px' }}
              />
              <button onClick={consultarCedula} style={{ padding: '0.5rem 1rem', background: '#1a365d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Buscar</button>
            </div>
            {resultadoCedula && (
              <div style={{ marginTop: '0.8rem', background: '#fff', padding: '0.8rem', borderRadius: '4px', borderLeft: '3px solid #28a745', fontSize: '0.9rem' }}>
                <p style={{ margin: '0 0 0.3rem 0' }}><strong>Nombre:</strong> {resultadoCedula.resultados?.[0]?.nombre || "No encontrado"}</p>
                <p style={{ margin: '0' }}><strong>Cédula:</strong> {resultadoCedula.resultados?.[0]?.cedula || cedulaInput}</p>
              </div>
            )}
          </div>

          {/* Placa */}
          <div style={{ padding: '1.2rem', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#f8fafc' }}>
            <h4 style={{ margin: '0 0 0.8rem 0', color: '#1a365d' }}>Buscar Placa</h4>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="text" 
                value={placaInput} 
                onChange={(e) => setPlacaInput(e.target.value)} 
                placeholder="Ingrese placa (ej: AAA6789)" 
                style={{ padding: '0.5rem', flex: 1, border: '1px solid #cbd5e1', borderRadius: '4px' }}
              />
              <button onClick={consultarPlaca} style={{ padding: '0.5rem 1rem', background: '#1a365d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Buscar</button>
            </div>
            {resultadoPlaca && (
              <div style={{ marginTop: '0.8rem', background: '#fff', padding: '0.8rem', borderRadius: '4px', borderLeft: '3px solid #ffc107', fontSize: '0.9rem' }}>
                <p style={{ margin: '0 0 0.3rem 0' }}><strong>Propietario:</strong> {resultadoPlaca.resultados?.[0]?.nombre || "No encontrado"}</p>
                <p style={{ margin: '0' }}><strong>Placa:</strong> {resultadoPlaca.resultados?.[0]?.value || placaInput}</p>
              </div>
            )}
          </div>

          {/* Cámara */}
          <div style={{ padding: '1.2rem', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#f8fafc' }}>
            <h4 style={{ margin: '0 0 0.8rem 0', color: '#1a365d' }}>Buscar Cámara / Dirección</h4>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="text" 
                value={camaraInput} 
                onChange={(e) => setCamaraInput(e.target.value)} 
                placeholder="Ingrese dirección o código" 
                style={{ padding: '0.5rem', flex: 1, border: '1px solid #cbd5e1', borderRadius: '4px' }}
              />
              <button onClick={consultarCamara} style={{ padding: '0.5rem 1rem', background: '#1a365d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Buscar</button>
            </div>
            {resultadoCamara && resultadoCamara.resultados && (
              <div style={{ marginTop: '0.8rem', maxHeight: '150px', overflowY: 'auto' }}>
                {resultadoCamara.resultados.map((camara: any, index: number) => (
                  <div key={index} style={{ background: '#fff', padding: '0.6rem', marginBottom: '0.4rem', borderRadius: '4px', borderLeft: '3px solid #007bff', fontSize: '0.85rem' }}>
                    <p style={{ margin: '0 0 0.2rem 0', color: '#444' }}>{camara.direccion}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Columnas de Categorías */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', borderTop: '2px solid #e2e8f0', paddingTop: '2rem' }}>
          
          <div>
            <h3 style={{ color: '#1a365d', fontSize: '1.1rem', borderBottom: '2px solid #1a365d', paddingBottom: '0.4rem', marginBottom: '1rem' }}>LABORAL</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '2rem', fontSize: '0.9rem' }}>
              <li><a href="https://www.iess.gob.ec" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: '#0066cc' }}>Calculadora de jubilación del IESS</a></li>
              <li><a href="https://www.iess.gob.ec" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: '#0066cc' }}>IESS Citas Médicas: Agendar o Consultar</a></li>
              <li><a href="https://www.iess.gob.ec" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: '#0066cc' }}>Recuperar clave del IESS</a></li>
              <li><a href="https://www.iess.gob.ec" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: '#0066cc' }}>Certificado de No estar afiliado al IESS</a></li>
            </ul>
          </div>

          <div>
            <h3 style={{ color: '#1a365d', fontSize: '1.1rem', borderBottom: '2px solid #1a365d', paddingBottom: '0.4rem', marginBottom: '1rem' }}>ALIMENTOS</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '2rem', fontSize: '0.9rem' }}>
              <li><a href="https://www.funcionjudicial.gob.ec" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: '#0066cc' }}>Calculadora de pensión alimenticia</a></li>
              <li><a href="https://www.funcionjudicial.gob.ec" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: '#0066cc' }}>Tabla de pensiones alimenticias</a></li>
              <li><a href="https://supa.funcionjudicial.gob.ec" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: '#0066cc' }}>Consulta de Pensiones - SUPA</a></li>
            </ul>
          </div>

          <div>
            <h3 style={{ color: '#1a365d', fontSize: '1.1rem', borderBottom: '2px solid #1a365d', paddingBottom: '0.4rem', marginBottom: '1rem' }}>TRÁMITES Y ANT</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '2rem', fontSize: '0.9rem' }}>
              <li><a href="https://www.ant.gob.ec" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: '#0066cc' }}>Consultar puntos de la licencia de conducir</a></li>
              <li><a href="https://www.ant.gob.ec" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: '#0066cc' }}>Simulador ANT</a></li>
              <li><a href="https://www.ant.gob.ec" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: '#0066cc' }}>Consulta de Multas de tránsito ANT</a></li>
              <li><a href="https://www.gob.ec" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: '#0066cc' }}>Certificado de Antecedentes penales</a></li>
            </ul>
          </div>

        </div>

      </main>

      <footer style={{ background: '#1a365d', color: '#fff', padding: '1.5rem', textAlign: 'center', fontSize: '0.9rem', marginTop: '3rem' }}>
        <p style={{ margin: '0' }}>Tu Abogado Gratis — Información legal y trámites del Ecuador explicados de forma clara.</p>
      </footer>
    </div>
  );
}