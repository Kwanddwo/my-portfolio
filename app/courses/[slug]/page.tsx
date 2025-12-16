import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllCourseNoteSlugs, getCourseNoteBySlug } from "@/lib/course-notes";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Home } from "lucide-react";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github-dark.css";
import React from "react";
import { generateSEOMetadata, generateArticleJsonLd, siteConfig } from "@/lib/seo";

type MDXComponentProps = React.HTMLAttributes<HTMLElement>;

// MDX components for custom styling
const components = {
  h1: (props: MDXComponentProps) => (
    <h1 className="text-4xl font-bold mt-40 mb-4 scroll-mt-20" {...props} />
  ),
  h2: (props: MDXComponentProps) => (
    <h2 className="text-3xl font-bold mt-40 mb-4 scroll-mt-20" {...props} />
  ),
  h3: (props: MDXComponentProps) => (
    <h3 className="text-2xl font-semibold mt-40 mb-3 scroll-mt-20" {...props} />
  ),
  h4: (props: MDXComponentProps) => (
    <h4 className="text-xl font-semibold mt-40 mb-2 scroll-mt-20" {...props} />
  ),
  p: (props: MDXComponentProps) => <p className="my-4 leading-7" {...props} />,
  ul: (props: MDXComponentProps) => (
    <ul className="my-4 ml-6 list-disc" {...props} />
  ),
  ol: (props: MDXComponentProps) => (
    <ol className="my-4 ml-6 list-decimal" {...props} />
  ),
  li: (props: MDXComponentProps) => <li className="my-2" {...props} />,
  a: (props: MDXComponentProps) => (
    <a
      className="text-primary hover:underline font-medium"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  code: (props: MDXComponentProps & { className?: string }) => {
    const { className, children, ...rest } = props;
    const isInline = !className;
    return isInline ? (
      <code
        className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono"
        {...rest}
      >
        {children}
      </code>
    ) : (
      <code className={className} {...rest}>
        {children}
      </code>
    );
  },
  pre: (props: MDXComponentProps) => (
    <pre className="my-4 overflow-x-auto rounded-lg bg-muted p-4" {...props} />
  ),
  blockquote: (props: MDXComponentProps) => (
    <blockquote
      className="my-4 border-l-4 border-primary pl-4 italic"
      {...props}
    />
  ),
  strong: (props: MDXComponentProps) => (
    <strong className="font-bold" {...props} />
  ),
  em: (props: MDXComponentProps) => <em className="italic" {...props} />,
};

// Generate static params for all course notes
export async function generateStaticParams() {
  const slugs = getAllCourseNoteSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = getCourseNoteBySlug(slug);

  if (!note) {
    return {
      title: "Course Note Not Found",
    };
  }

  return generateSEOMetadata({
    title: note.title,
    description: note.description || `Learn about ${note.title} - Course notes by Marouane LEMGHARI`,
    keywords: note.category ? [note.category, note.level || ""] : [],
    url: `/courses/${slug}`,
    type: "article",
  });
}

export default async function CourseNotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = getCourseNoteBySlug(slug);

  if (!note) {
    notFound();
  }

  const articleJsonLd = generateArticleJsonLd({
    title: note.title,
    description: note.description || `Learn about ${note.title}`,
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    url: `${siteConfig.url}/courses/${slug}`,
  });

  return (
    <div className="min-h-screen bg-background">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      
      {/* Header */}
      <header className="sticky top-0 px-4 md:px-10 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between">
          <div className="font-bold text-md md:text-lg">
            <Link href="/" className="hover:text-primary transition-colors">
              Marouane LEMGHARI
            </Link>
          </div>
          <div className="flex gap-2">
            <Link href="/courses">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                All Notes
              </Button>
            </Link>
            <Link href="/">
              <Button variant="ghost" size="sm">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Note Header */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {note.level && <Badge variant="secondary">{note.level}</Badge>}
            {note.category && <Badge variant="outline">{note.category}</Badge>}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{note.title}</h1>
          <p className="text-lg text-muted-foreground">{note.description}</p>
        </div>

        {/* Note Content */}
        <article className="prose prose-neutral dark:prose-invert max-w-none">
          <MDXRemote
            source={note.content}
            components={components}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  rehypeSlug,
                  [
                    rehypeAutolinkHeadings,
                    {
                      behavior: "wrap",
                      properties: {
                        className: ["anchor"],
                      },
                    },
                  ],
                  rehypeHighlight,
                ],
              },
            }}
          />
        </article>

        {/* Back to notes */}
        <div className="mt-12 pt-8 border-t">
          <Link href="/courses">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to all course notes
            </Button>
          </Link>
        </div>
      </main>
      </div>
  );
}
