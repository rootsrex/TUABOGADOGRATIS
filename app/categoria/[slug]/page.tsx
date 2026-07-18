import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategory } from "@/lib/categories";
import { getArticlesByCategory } from "@/lib/content";
import ArticleCard from "@/components/ArticleCard";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const category = getCategory(params.slug);
  if (!category) return {};
  return {
    title: category.name,
    description: category.description,
  };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = getCategory(params.slug);
  if (!category) notFound();

  const articles = getArticlesByCategory(category.slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <header className="mb-10 flex items-center gap-4">
        <div
          className={`grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br ${category.color} text-3xl`}
        >
          {category.icon}
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">{category.name}</h1>
          <p className="mt-1 max-w-2xl text-slate-600">{category.description}</p>
        </div>
      </header>

      {articles.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
          Aún no hay contenido publicado en esta categoría. ¡Pronto añadiremos más!
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      )}
    </div>
  );
}
