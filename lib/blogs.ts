import fs from "fs";
import path from "path";
import matter from "gray-matter";

const blogsDirectory = path.join(process.cwd(), "content/blogs");

export interface Blog {
  slug: string;
  title: string;
  description: string;
  readTime: number;
  date?: string;
  category?: string;
  order?: number;
  content: string;
}

export interface BlogMeta {
  slug: string;
  title: string;
  description: string;
  readTime: number;
  date?: string;
  category?: string;
  order?: number;
}

function calculateReadTime(markdownContent: string): number {
  const wordCount = markdownContent.trim().split(/\s+/).filter(Boolean).length;

  // Average reading speed is about 200 words/minute.
  return Math.max(2, Math.ceil(wordCount / 200));
}

/**
 * Get all course notes metadata (optimized for listing)
 */
export function getAllBlogs(): BlogMeta[] {
  const fileNames = fs.readdirSync(blogsDirectory);

  const allNotes = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(blogsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const { data, content } = matter(fileContents);
      const date =
        data.date instanceof Date
          ? data.date.toISOString().split("T")[0]
          : data.date;
      const readTime = calculateReadTime(content);

      return {
        slug,
        title: data.title,
        description: data.description,
        readTime,
        date,
        category: data.category,
      };
    })
    .sort((a, b) => {
      const timeA = a.date ? new Date(a.date).getTime() : 0;
      const timeB = b.date ? new Date(b.date).getTime() : 0;
      return timeB - timeA;
    });

  return allNotes;
}

/**
 * Get a single course note by slug (with full content)
 */
export function getBlogBySlug(slug: string): Blog | null {
  try {
    const fullPath = path.join(blogsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { data, content } = matter(fileContents);
    const date =
      data.date instanceof Date
        ? data.date.toISOString().split("T")[0]
        : data.date;
    const readTime = calculateReadTime(content);

    return {
      slug,
      title: data.title,
      description: data.description,
      readTime,
      date,
      category: data.category,
      content,
    };
  } catch {
    return null;
  }
}

/**
 * Get all slugs for static generation
 */
export function getAllBlogSlugs(): string[] {
  const fileNames = fs.readdirSync(blogsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}
