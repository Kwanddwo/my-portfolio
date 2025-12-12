import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";

export default function CourseNoteNotFound() {
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

      <main className="container mx-auto px-4 py-20 max-w-2xl">
        <Card className="p-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-muted">
              <FileQuestion className="h-12 w-12 text-muted-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Course Note Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The course note you&apos;re looking for doesn&apos;t exist or has
            been moved.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/courses">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Browse All Notes
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
