import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllArticles, getArticle, getArticlesByCategory } from "@/lib/content";
import { getCategory } from "@/lib/categories";
import ArticleCard from "@/components/ArticleCard";

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = getArticle(params.slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  const category = getCategory(article.category);
  const related = getArticlesByCategory(article.category)
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500">
        <Link href="/" className="hover:text-brand-700">Inicio</Link>
        <span>/</span>
        {category && (
          <>
            <Link href={`/categoria/${category.slug}`} className="hover:text-brand-700">
              {category.name}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-slate-700">{article.title}</span>
      </nav>

      <header className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {category && (
            <Link
              href={`/categoria/${category.slug}`}
              className="inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700"
            >
              {category.icon} {category.name}
            </Link>
          )}
          {article.type === "modelo" && (
            <span className="inline-block rounded-full bg-accent-500 px-3 py-1 text-xs font-semibold text-white">
              📝 Modelo de documento
            </span>
          )}
          {article.type === "noticia" && (
            <span className="inline-block rounded-full bg-slate-700 px-3 py-1 text-xs font-semibold text-white">
              📰 Noticia
            </span>
          )}
        </div>
        <h1 className="text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">
          {article.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-400">
          {article.date && (
            <span>
              Publicado el{" "}
              {new Date(article.date).toLocaleDateString("es-EC", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          )}
          <span>· {article.readingTime} min de lectura</span>
        </div>
      </header>

      <div className="prose-legal">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.content}</ReactMarkdown>
      </div>

      {article.sources.length > 0 && (
        <div className="mt-10 rounded-2xl border border-brand-200 bg-brand-50 p-6">
          <h2 className="flex items-center gap-2 text-lg font-bold text-brand-900">
            🔗 {article.type === "noticia" ? "Fuente" : "Enlaces oficiales"}
          </h2>
          <p className="mt-1 text-sm text-brand-800">
            {article.type === "noticia"
              ? "Esta nota fue redactada a partir de la siguiente fuente periodística:"
              : "Realiza tu trámite directamente en los portales oficiales de las instituciones:"}
          </p>
          <ul className="mt-4 space-y-2">
            {article.sources.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-2 font-medium text-brand-700 underline underline-offset-2 hover:text-brand-900"
                >
                  {s.label}
                  <span aria-hidden className="text-xs">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
        <strong>Aviso:</strong>{" "}
        {article.type === "modelo"
          ? "este es un modelo referencial y editable. Adáptalo a tu caso y, para procesos judiciales, valida el formato con un abogado o con la unidad judicial competente."
          : article.type === "noticia"
            ? "esta nota es un resumen informativo redactado a partir de la fuente citada arriba. Verifica los detalles en la fuente original y consulta a un abogado para asesoría sobre tu caso particular."
            : "esta guía es informativa y puede cambiar según actualizaciones de las instituciones. No sustituye la asesoría de un profesional del derecho para tu caso particular."}
      </div>

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">Contenido relacionado</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
