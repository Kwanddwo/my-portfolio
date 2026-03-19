import Link from "next/link";
import { getAllCourseNotes } from "@/lib/course-notes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight, Home } from "lucide-react";
import { generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  title: "Blog",
  description: "follow along on my software engineering journey, anything interesting that I come across I will write a post about here. Marouane LEMGHARI.",
  keywords: ["blog", "programming tutorials", "competitive programming", "tutorial", "web development", "software engineering"],
  url: "/blog",
});

export default function BlogPage() {
  const posts = getAllCourseNotes();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 px-4 md:px-10 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between">
          <div className="font-bold text-md md:text-lg">
            <Link href="/" className="hover:text-primary transition-colors">
              Marouane LEMGHARI
            </Link>
          </div>
          <Link href="/">
            <Button variant="ghost" size="sm">
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">Blog</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Follow along on my software engineering journey and things I learn.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((note) => (
            <Link
              key={note.slug}
              href={`/blog/${note.slug}`}
              className="group"
            >
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {note.title}
                    </CardTitle>
                    {note.level && (
                      <Badge variant="secondary" className="shrink-0">
                        {note.level}
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="line-clamp-3">
                    {note.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    {note.category && (
                      <Badge variant="outline">{note.category}</Badge>
                    )}
                    <div className="flex items-center text-sm text-primary">
                      <span className="mr-1">Read post</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
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
