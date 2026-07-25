const handleBuscarCedula = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cedula) return;
    setLoadingCedula(true);
    setErrorCedula('');
    setResCedula(null);

    try {
      // Intenta la ruta estándar del backend
      const res = await fetch(`${baseUrl}/api/cedula/${encodeURIComponent(cedula.trim())}`);
      
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
      setErrorCedula(`Error de conexión: ${err.message || 'Verifica la ruta de la API o la configuración de CORS'}`);
    } finally {
      setLoadingCedula(false);
    }
  };
