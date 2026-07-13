// Prueba end-to-end del buscador del sitio con un navegador sin cabeza (headless).
// Lanza Chromium, abre el sitio, usa el buscador y verifica que devuelve resultados.
//
// Uso:
//   1. Levanta el sitio:   npm run build && npm run start   (queda en http://localhost:3000)
//   2. En otra terminal:   npm run test:e2e
//
// Variables opcionales:
//   BASE_URL   URL del sitio a probar (por defecto http://localhost:3000)
//   PW_CHROME  Ruta a un Chromium especifico (si no, usa el que instala Playwright)

import { chromium } from "playwright";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const TERMINO = process.argv[2] || "renuncia";

// Utilidades minimas para no depender de un framework de test
let fallidas = 0;
function ok(condicion, mensaje) {
  if (condicion) {
    console.log(`  ✅ ${mensaje}`);
  } else {
    console.log(`  ❌ ${mensaje}`);
    fallidas++;
  }
}

async function main() {
  console.log(`\n🧪 Probando el buscador de ${BASE_URL} con el termino "${TERMINO}"\n`);

  const browser = await chromium.launch({
    headless: true,
    ...(process.env.PW_CHROME ? { executablePath: process.env.PW_CHROME } : {}),
  });
  const page = await browser.newPage();

  try {
    // 1. Abrir la pagina de inicio
    await page.goto(BASE_URL, { waitUntil: "networkidle", timeout: 45000 });
    ok((await page.title()).length > 0, `La pagina carga (titulo: "${await page.title()}")`);

    // 2. Abrir el buscador (boton con aria-label "Buscar en el sitio")
    await page.getByRole("button", { name: "Buscar en el sitio" }).first().click();
    const input = page.getByPlaceholder(/Busca guias|Busca guías/i);
    await input.waitFor({ state: "visible", timeout: 5000 });
    ok(await input.isVisible(), "El modal de busqueda se abre");

    // 3. Escribir el termino de busqueda (como lo haria un usuario)
    await input.fill(TERMINO);

    // 4. Esperar y leer los resultados (enlaces dentro del modal de busqueda)
    await page.waitForTimeout(500); // el filtrado es instantaneo en el cliente
    // El modal es el contenedor con overflow-y-auto; limitamos la busqueda a sus enlaces
    const modal = page.locator("div.overflow-y-auto").last();
    const resultados = await modal.locator("a").all();

    const titulos = [];
    for (const r of resultados) {
      const t = (await r.textContent())?.trim();
      const href = await r.getAttribute("href");
      if (t && href) titulos.push({ titulo: t, href });
    }

    ok(titulos.length > 0, `Devuelve resultados para "${TERMINO}" (${titulos.length} encontrados)`);

    if (titulos.length > 0) {
      console.log("\n  Resultados:");
      titulos.slice(0, 5).forEach((r, i) =>
        console.log(`    ${i + 1}. ${r.titulo.split("\n")[0]}  →  ${r.href}`)
      );
    }

    // 5. Verificar el caso "sin resultados"
    await input.fill("xyznoexistequerystring");
    await page.waitForTimeout(400);
    const sinResultados = await page.getByText(/No encontramos resultados/i).isVisible();
    ok(sinResultados, "Muestra el mensaje de 'sin resultados' cuando no hay coincidencias");
  } catch (e) {
    console.log(`  ❌ Error inesperado: ${e.message.split("\n")[0]}`);
    fallidas++;
  } finally {
    await browser.close();
  }

  console.log(fallidas === 0 ? "\n✅ Todas las pruebas pasaron\n" : `\n❌ ${fallidas} prueba(s) fallaron\n`);
  process.exit(fallidas === 0 ? 0 : 1);
}

main();
