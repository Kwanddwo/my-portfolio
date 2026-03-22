import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllBlogSlugs, getBlogBySlug, getAllBlogs } from "@/lib/blogs";
import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github-dark.css";
import React from "react";
import {
  generateSEOMetadata,
  generateArticleJsonLd,
  siteConfig,
} from "@/lib/seo";
import { SiteHeader } from "@/components/site-header";

type MDXComponentProps = React.HTMLAttributes<HTMLElement>;

// MDX components for custom styling
const components = {
  h1: (props: MDXComponentProps) => (
    <h1 className="text-4xl font-bold mt-10 mb-5 scroll-mt-20" {...props} />
  ),
  h2: (props: MDXComponentProps) => (
    <h2 className="text-3xl font-bold mt-12 mb-4 scroll-mt-20" {...props} />
  ),
  h3: (props: MDXComponentProps) => (
    <h3 className="text-2xl font-semibold mt-8 mb-3 scroll-mt-20" {...props} />
  ),
  h4: (props: MDXComponentProps) => (
    <h4 className="text-xl font-semibold mt-6 mb-2 scroll-mt-20" {...props} />
  ),
  p: (props: MDXComponentProps) => (
    <p className="mt-4 mb-5 leading-7" {...props} />
  ),
  ul: (props: MDXComponentProps) => (
    <ul className="mt-4 mb-6 ml-6 list-disc" {...props} />
  ),
  ol: (props: MDXComponentProps) => (
    <ol className="mt-4 mb-6 ml-6 list-decimal" {...props} />
  ),
  li: (props: MDXComponentProps) => <li className="my-1.5" {...props} />,
  a: (props: MDXComponentProps) => (
    <a
      className="hover:underline font-medium"
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
    <pre className="my-6 overflow-x-auto rounded-lg bg-muted p-4" {...props} />
  ),
  blockquote: (props: MDXComponentProps) => (
    <blockquote
      className="my-6 border-l-4 border-accent pl-4 italic"
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
  const slugs = getAllBlogSlugs();
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
  const note = getBlogBySlug(slug);

  if (!note) {
    return {
      title: "Post Not Found",
    };
  }

  return generateSEOMetadata({
    title: note.title,
    description:
      note.description || `Read ${note.title} - Blog post by Marouane LEMGHARI`,
    keywords: note.category ? [note.category] : [],
    url: `/blog/${slug}`,
    type: "article",
  });
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = getBlogBySlug(slug);

  const recentPosts = getAllBlogs()
    .sort((a, b) => {
      const aTime = a.date ? new Date(a.date).getTime() : 0;
      const bTime = b.date ? new Date(b.date).getTime() : 0;
      return bTime - aTime;
    })
    .slice(0, 30);

  if (!note) {
    notFound();
  }

  const publishedDate = note.date || new Date().toISOString();
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(publishedDate));

  const articleJsonLd = generateArticleJsonLd({
    title: note.title,
    description: note.description || `Read ${note.title}`,
    datePublished: publishedDate,
    dateModified: publishedDate,
    url: `${siteConfig.url}/blog/${slug}`,
  });

  return (
    <div className="min-h-screen">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Header */}
      <SiteHeader />

      <main className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12">
          <div>
            {/* Post Header */}
            <div className="mb-8">
              {/* <div className="flex flex-wrap gap-2 mb-4">
                {note.level && <Badge variant="secondary">{note.level}</Badge>}
                {note.category && <Badge variant="outline">{note.category}</Badge>}
              </div> */}
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {note.title}
              </h1>
              <p className="text-lg text-muted-foreground">
                {note.description}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Published on {formattedDate} • {note.readTime} min read
              </p>
            </div>

            {/* Post Content */}
            <article className="prose prose-neutral dark:prose-invert max-w-none">
              <MDXRemote
                source={note.content}
                components={components}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [
                      rehypeSlug,
                      // [
                      //   rehypeAutolinkHeadings,
                      //   {
                      //     behavior: "wrap",
                      //     properties: {
                      //       className: ["anchor"],
                      //     },
                      //   },
                      // ],
                      rehypeHighlight,
                    ],
                  },
                }}
              />
            </article>

            {/* Back to posts */}
            <div className="mt-12 pt-8 border-t">
              <Link href="/blog">
                <Button
                  variant="outline"
                  className="hover:text-accent-foreground hover:border-accent/60"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to all posts
                </Button>
              </Link>
            </div>
          </div>

          <aside className="mt-12 lg:mt-0">
            <div className="p-4">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide">
                Recent Posts
              </h2>
              <ul className="space-y-3">
                {recentPosts.map((post) => {
                  const isCurrentPost = post.slug === slug;

                  return (
                    <li key={post.slug}>
                      <p
                        className={
                          isCurrentPost
                            ? "text-xs text-muted-foreground"
                            : "text-xs text-muted-foreground"
                        }
                      >
                        {post.date
                          ? new Intl.DateTimeFormat("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }).format(new Date(post.date))
                          : "No date"}{" "}
                        • {post.readTime} min read
                      </p>
                      <Link
                        href={`/blog/${post.slug}`}
                        aria-current={isCurrentPost ? "page" : undefined}
                        className={
                          isCurrentPost
                            ? "text-sm font-semibold hover:text-accent-foreground pe-1.5 py-0.75 bg-accent-foreground/45 leading-tight"
                            : "text-sm hover:text-accent-foreground leading-tight"
                        }
                      >
                        {post.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
