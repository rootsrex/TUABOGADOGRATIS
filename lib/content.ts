import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type SourceLink = {
  label: string;
  url: string;
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string; // category slug
  date: string;
  readingTime: number;
  updated?: string;
  image?: string;
  type: "guia" | "modelo" | "noticia";
  sources: SourceLink[];
  content: string;
};

function estimateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export function getAllArticles(): Article[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  const articles = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    return {
      slug,
      title: data.title ?? slug,
      excerpt: data.excerpt ?? "",
      category: data.category ?? "",
      date: data.date ?? "",
      updated: data.updated ?? undefined,
      image: data.image ?? undefined,
      type: (data.type as "guia" | "modelo" | "noticia") ?? "guia",
      sources: Array.isArray(data.sources) ? (data.sources as SourceLink[]) : [],
      readingTime: estimateReadingTime(content),
      content,
    } as Article;
  });
  return articles.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticle(slug: string): Article | undefined {
  return getAllArticles().find((a) => a.slug === slug);
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  return getAllArticles().filter((a) => a.category === categorySlug);
}

export function getModels(): Article[] {
  return getAllArticles().filter((a) => a.type === "modelo");
}

export function getGuides(): Article[] {
  return getAllArticles().filter((a) => a.type === "guia");
}

export function getNews(): Article[] {
  return getAllArticles().filter((a) => a.type === "noticia");
}
