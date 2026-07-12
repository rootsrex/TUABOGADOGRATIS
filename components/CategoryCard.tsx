import Link from "next/link";
import type { Category } from "@/lib/categories";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/categoria/${category.slug}`}
      className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div
        className={`mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${category.color} text-2xl`}
      >
        {category.icon}
      </div>
      <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-700">
        {category.name}
      </h3>
      <p className="mt-2 text-sm text-slate-600">{category.description}</p>
      <span className="mt-4 inline-block text-sm font-semibold text-brand-600">
        Ver trámites →
      </span>
    </Link>
  );
}
