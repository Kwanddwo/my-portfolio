import Link from "next/link";
import { getAllBlogs } from "@/lib/blogs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ArrowRight } from "lucide-react";
import { generateSEOMetadata } from "@/lib/seo";
import { SiteHeader } from "@/components/site-header";

export const metadata = generateSEOMetadata({
  title: "Blog",
  description:
    "follow along on my software engineering journey, anything interesting that I come across I will write a post about here. Marouane LEMGHARI.",
  keywords: [
    "blog",
    "programming tutorials",
    "competitive programming",
    "tutorial",
    "web development",
    "software engineering",
  ],
  url: "/blog",
});

export default function BlogPage() {
  const posts = getAllBlogs();
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <SiteHeader />

      <main className="container mx-auto px-4 max-w-7xl">
        {/* Blog Posts Grid */}
        <div className="grid gap-6 grid-cols-1">
          {posts.map((note) => (
            <Link key={note.slug} href={`/blog/${note.slug}`} className="group">
              <Card className="h-full LiquidGlass-8 transition-all hover:shadow-lg hover:border-accent/50">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle>{note.title}</CardTitle>
                  </div>
                  <CardDescription className="space-y-1">
                    {note.date && (
                      <p className="text-sm text-accent-foreground">
                        {dateFormatter.format(new Date(note.date))}
                      </p>
                    )}
                    <div className="line-clamp-3">{note.description}</div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between gap-4">
                    {/* <div className="space-y-2">
                      {note.category && (
                        <Badge variant="outline">{note.category}</Badge>
                      )} */}

                    <p className="text-sm">{note.readTime} min read</p>
                    {/* </div> */}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">
              No posts available yet. Check back soon!
            </p>
          </Card>
        )}
      </main>
    </div>
  );
}
