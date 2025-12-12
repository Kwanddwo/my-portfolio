import fs from "fs";
import path from "path";
import matter from "gray-matter";

const coursesDirectory = path.join(process.cwd(), "content/courses");

export interface CourseNote {
  slug: string;
  title: string;
  description: string;
  level?: string;
  category?: string;
  order?: number;
  content: string;
}

export interface CourseNoteMeta {
  slug: string;
  title: string;
  description: string;
  level?: string;
  category?: string;
  order?: number;
}

/**
 * Get all course notes metadata (optimized for listing)
 */
export function getAllCourseNotes(): CourseNoteMeta[] {
  const fileNames = fs.readdirSync(coursesDirectory);

  const allNotes = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(coursesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title,
        description: data.description,
        level: data.level,
        category: data.category,
        order: data.order || 999,
      };
    });

  // Sort by order
  return allNotes.sort((a, b) => (a.order || 999) - (b.order || 999));
}

/**
 * Get a single course note by slug (with full content)
 */
export function getCourseNoteBySlug(slug: string): CourseNote | null {
  try {
    const fullPath = path.join(coursesDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      description: data.description,
      level: data.level,
      category: data.category,
      order: data.order,
      content,
    };
  } catch {
    return null;
  }
}

/**
 * Get all slugs for static generation
 */
export function getAllCourseNoteSlugs(): string[] {
  const fileNames = fs.readdirSync(coursesDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}
