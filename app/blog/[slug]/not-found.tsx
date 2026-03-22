import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site-header";

export default function BlogNotFound() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <SiteHeader />

      <main className="container mx-auto px-4 py-20 max-w-2xl">
        <Card className="p-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-muted">
              <FileQuestion className="h-12 w-12 text-muted-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The post you&apos;re looking for doesn&apos;t exist or has
            been moved.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/blog">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Browse All Posts
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline">
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Button>
            </Link>
          </div>
        </Card>
      </main>
    </div>
  );
}
