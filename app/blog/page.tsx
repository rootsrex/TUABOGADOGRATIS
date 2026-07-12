import type { Metadata } from "next";
import { getAllArticles } from "@/lib/content";
import ArticleCard from "@/components/ArticleCard";

export const metadata: Metadata = {
  title: "Blog · Todas las guías legales",
  description:
    "Todas las guías de trámites y consultas legales del Ecuador: IESS, familia, tránsito, Registro Civil, bonos y documentos.",
};

export default function BlogPage() {
  const articles = getAllArticles();

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-slate-900">Blog</h1>
        <p className="mt-2 text-lg text-slate-600">
          {articles.length} guías sobre trámites y consultas del Ecuador.
        </p>
      </header>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
    </div>
  );
}
