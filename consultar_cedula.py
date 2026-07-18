import sys
import time
import json
import requests
from html.parser import HTMLParser

PAGE_URL      = "https://www.ecuadorlegalonline.com/consultas/registro-civil/consultar-cedulas/"
API_CEDULA    = "https://www.ecuadorlegalonline.com/modulo/consultar-cedula.php"
API_NOMBRE    = "https://apps.ecuadorlegalonline.com/modulo/consultar-cedulanombre.php"

UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36"
)

BASE_HEADERS = {
    "User-Agent": UA,
    "Accept-Language": "es-EC,es;q=0.9,en;q=0.8",
}


class TableParser(HTMLParser):
    """Extrae filas de una tabla HTML como listas de texto."""
    def __init__(self):
        super().__init__()
        self.rows = []
        self._in_row = False
        self._cells = []
        self._cell_buf = []

    def handle_starttag(self, tag, attrs):
        if tag == "tr":
            self._in_row = True
            self._cells = []
        elif tag == "td" and self._in_row:
            self._cell_buf = []

    def handle_endtag(self, tag):
        if tag == "td":
            self._cells.append(" ".join(self._cell_buf).strip())
        elif tag == "tr" and self._in_row:
            self.rows.append(self._cells[:])
            self._in_row = False

    def handle_data(self, data):
        if self._in_row:
            t = data.strip()
            if t:
                self._cell_buf.append(t)


def _session() -> requests.Session:
    """Crea sesión con la página principal para obtener cookies."""
    s = requests.Session()
    s.get(PAGE_URL, headers={**BASE_HEADERS, "Referer": "https://www.google.com/"}, timeout=15)
    return s


def consultar_por_cedula(cedula: str):
    s = _session()
    r = s.post(
        API_CEDULA,
        data={"name": cedula, "tipo": "I"},
        headers={
            **BASE_HEADERS,
            "Referer": PAGE_URL,
            "X-Requested-With": "XMLHttpRequest",
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "*/*",
        },
        timeout=15,
    )
    r.raise_for_status()
    body = r.text.strip()
    if not body:
        print("Sin resultados para esa cédula.")
        return

    parser = TableParser()
    parser.feed(body)
    _imprimir_tabla(parser.rows)


def consultar_por_nombre(nombre: str):
    ts = int(time.time() * 1000)
    r = requests.get(
        API_NOMBRE,
        params={"nombres": nombre.upper(), "_": ts},
        headers={
            **BASE_HEADERS,
            "Referer": PAGE_URL,
            "Accept": "application/json, text/javascript, */*; q=0.01",
            "X-Requested-With": "XMLHttpRequest",
        },
        timeout=15,
    )
    r.raise_for_status()
    body = r.text.strip()
    if not body or body in ("[]", "null", ""):
        print("Sin resultados para ese nombre.")
        return

    try:
        datos = json.loads(body)
    except json.JSONDecodeError:
        print(f"Respuesta inesperada: {body[:200]}")
        return

    print("\n" + "=" * 60)
    print("RESULTADOS")
    print("=" * 60)
    for item in datos:
        cedula  = item.get("identificacion", "-")
        nombre  = item.get("nombreCompleto", "-")
        defun   = item.get("fechaDefuncion")
        estado  = f"Fallecido ({defun})" if defun else "Activo"
        print(f"\n  Cédula : {cedula}")
        print(f"  Nombre : {nombre}")
        print(f"  Estado : {estado}")
    print("\n" + "=" * 60)


def _imprimir_tabla(rows):
    print("\n" + "=" * 60)
    print("RESULTADOS")
    print("=" * 60)
    for row in rows:
        cedula = row[0].strip() if len(row) > 0 else "-"
        nombre = row[1].strip() if len(row) > 1 else "-"
        print(f"\n  Cédula : {cedula}")
        print(f"  Nombre : {nombre}")
    print("\n" + "=" * 60)


def main():
    if len(sys.argv) < 3:
        print("Uso:")
        print("  python3 consultar_cedula.py cedula <número_de_cédula>")
        print("  python3 consultar_cedula.py nombre <apellidos_y_nombres>")
        print("\nEjemplos:")
        print("  python3 consultar_cedula.py cedula 0604919415")
        print("  python3 consultar_cedula.py nombre 'Castillo Calle Nestor'")
        sys.exit(1)

    modo  = sys.argv[1].lower()
    valor = sys.argv[2]

    if modo not in ("cedula", "nombre"):
        print("El modo debe ser 'cedula' o 'nombre'.")
        sys.exit(1)

    print(f"Consultando por {'cédula' if modo == 'cedula' else 'nombre'}: {valor}")

    if modo == "cedula":
        consultar_por_cedula(valor)
    else:
        consultar_por_nombre(valor)


if __name__ == "__main__":
    main()
