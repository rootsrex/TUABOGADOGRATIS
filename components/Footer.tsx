import Link from "next/link";
import { categories } from "@/lib/categories";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-extrabold text-white">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-600">⚖️</span>
            Tu Abogado Gratis
          </div>
          <p className="mt-3 text-sm text-slate-400">
            Información legal y trámites del Ecuador explicados de forma clara y
            gratuita. Tu asesor legal en casa.
          </p>
        </div>

        <div>
          <h4 className="mb-3 font-semibold text-white">Categorías</h4>
          <ul className="space-y-2 text-sm">
            {categories.slice(0, 5).map((c) => (
              <li key={c.slug}>
                <Link href={`/categoria/${c.slug}`} className="hover:text-white">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-semibold text-white">Enlaces</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-white">Inicio</Link></li>
            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            <li><Link href="/contacto" className="hover:text-white">Contacto</Link></li>
            <li><Link href="/aviso-legal" className="hover:text-white">Aviso legal</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-semibold text-white">Aviso importante</h4>
          <p className="text-sm text-slate-400">
            Este sitio ofrece información general con fines educativos y no
            constituye asesoría jurídica personalizada. Para casos concretos,
            consulta con un profesional del derecho.
          </p>
        </div>
      </div>
      <div className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Tu Abogado Gratis · Ecuador. Todos los derechos reservados.
      </div>
    </footer>
  );
}
