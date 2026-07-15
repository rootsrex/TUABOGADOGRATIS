import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/content";
import { getCategory } from "@/lib/categories";

export default function ArticleCard({ article }: { article: Article }) {
  const category = getCategory(article.category);
  return (
    <Link
      href={`/articulo/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      {article.image ? (
        <div className="relative h-32 w-full overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>
      ) : (
        <div
          className={`flex h-32 items-center justify-center bg-gradient-to-br ${
            category?.color ?? "from-brand-500 to-brand-700"
          } text-5xl`}
        >
          {category?.icon ?? "📄"}
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        {category && (
          <span className="mb-2 inline-block w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            {category.name}
          </span>
        )}
        <h3 className="text-base font-bold leading-snug text-slate-900 group-hover:text-brand-700">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-slate-600">{article.excerpt}</p>
        <div className="mt-4 flex items-center gap-3 text-xs text-slate-400">
          {article.date && <span>{new Date(article.date).toLocaleDateString("es-EC", { year: "numeric", month: "long", day: "numeric" })}</span>}
          <span>· {article.readingTime} min de lectura</span>
        </div>
      </div>
    </Link>
  );
}
