import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { placa } = body;

    if (!placa) {
      return NextResponse.json(
        { error: 'El parámetro placa es obligatorio.' },
        { status: 400 }
      );
    }

    // Ruta real obtenida de las DevTools
    const targetUrl = `https://www.ecuadorlegalonline.com/modulo/sri/matriculacion/consultar-vehiculo-rubros.php?placa=${placa.toLowerCase()}`;

    const externalResponse = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
        'Referer': 'https://www.ecuadorlegalonline.com/consultas/agencia-nacional-de-transito/valores-a-pagar-por-matricula-mat'
      },
    });

    if (!externalResponse.ok) {
      throw new Error(`Error en el servidor externo: ${externalResponse.status}`);
    }

    // Como la API externa devuelve JSON, lo parseamos directamente
    const data = await externalResponse.json();

    return NextResponse.json({ 
      success: true, 
      placaConsultada: placa,
      datos: data 
    }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json(
      { error: 'Error procesando la consulta.', detalle: error.message },
      { status: 500 }
    );
  }
}