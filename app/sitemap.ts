import { MetadataRoute } from "next";
import { getAllCourseNoteSlugs } from "@/lib/course-notes";
import { siteConfig } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  // Get all course note slugs
  const courseSlugs = getAllCourseNoteSlugs();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Dynamic course pages
  const coursePages: MetadataRoute.Sitemap = courseSlugs.map((slug) => ({
    url: `${baseUrl}/courses/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...coursePages];
}
