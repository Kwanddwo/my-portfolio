// SEO Configuration and Utilities
import type { Metadata } from "next";

export const siteConfig = {
  name: "Marouane LEMGHARI",
  title: "Marouane LEMGHARI | Computer Engineering & Cybersecurity Student",
  description:
    "Computer engineering and cybersecurity student at ENSA Khouribga. Building full-stack apps, CTF exploits, and containerized systems while documenting the journey through deep-dive technical articles.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://marouanelemghari.com",
  ogImage: "/opengraph-image",
  keywords: [
    "Marouane LEMGHARI",
    "Computer Engineering",
    "Cybersecurity",
    "ENSA Khouribga",
    "Full-Stack Developer",
    "CTF Exploits",
    "Containerization",
    "DevOps Internals",
    "Security Research",
    "AI",
    "MCP",
    "Competitive Programming",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Software Engineering Portfolio",
  ],
  author: {
    name: "Marouane LEMGHARI",
    email: "marouanelemghari@gmail.com",
    github: "https://github.com/Kwanddwo",
    linkedin: "https://www.linkedin.com/in/marouane-lemghari/",
  },
};

export function generateSEOMetadata({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article";
  noIndex?: boolean;
}): Metadata {
  const metaTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;
  const metaDescription = description || siteConfig.description;
  const metaImage = image || siteConfig.ogImage;
  const metaUrl = url ? `${siteConfig.url}${url}` : siteConfig.url;
  const metaKeywords = keywords
    ? [...siteConfig.keywords, ...keywords]
    : siteConfig.keywords;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: metaKeywords,
    authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
    creator: siteConfig.author.name,
    publisher: siteConfig.author.name,
    robots: noIndex
      ? "noindex, nofollow"
      : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    openGraph: {
      type,
      locale: "en_US",
      url: metaUrl,
      title: metaTitle,
      description: metaDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [metaImage],
      creator: "@marouanelemghari",
    },
    alternates: {
      canonical: metaUrl,
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
    category: "Technology",
  };
}

export function generatePersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author.name,
    url: siteConfig.url,
    email: siteConfig.author.email,
    jobTitle: "Computer Engineering & Cybersecurity Student",
    description: siteConfig.description,
    sameAs: [siteConfig.author.github, siteConfig.author.linkedin],
    knowsAbout: [
      "Computer Engineering",
      "Cybersecurity",
      "CTF Exploitation",
      "DevOps",
      "Containerization",
      "Full-Stack Development",
      "Next.js",
      "React",
      "TypeScript",
      "Software Engineering",
    ],
  };
}

export function generateWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateProjectJsonLd(project: {
  name: string;
  description: string;
  url?: string;
  image?: string;
  technologies: string[];
  github: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.name,
    description: project.description,
    programmingLanguage: project.technologies,
    codeRepository: project.github,
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
    },
    image: project.image,
    url: project.url || project.github,
  };
}

export function generateArticleJsonLd(article: {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  url: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.author.name,
    },
    url: article.url,
    image: article.image || siteConfig.ogImage,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url,
    },
  };
}
