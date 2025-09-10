import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Github,
  Linkedin,
  FileUser,
  Mail,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { getProjects, getSkillCategories } from "@/app/_api/data";
import { ModeToggle } from "@/components/mode-toggle";

export default function Portfolio() {
  const projects = getProjects();
  const skillCategories = getSkillCategories();
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 px-4 md:px-10 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between">
          <div className="font-bold text-md md:text-lg">Marouane LEMGHARI</div>
          <nav className="hidden md:flex gap-6">
            <Link
              href="#about"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              href="#projects"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Projects
            </Link>
            <Link
              href="#skills"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Skills
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/resume.pdf"
              download
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Resume
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link
                href="https://github.com/Kwanddwo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link
                href="https://linkedin.com/in/marouane-lemghari"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="mailto:marouanelemghari@gmail.com">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/resume.pdf" download>
                <FileUser className="h-5 w-5" />
                <span className="sr-only">Resume</span>
              </Link>
            </Button>
            <ModeToggle />
          </div>
        </div>
      </header>

      <main className="px-4 md:px-10">
        {/* Hero Section */}
        <section
          id="about"
          className="py-20 md:py-24 flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12"
        >
          <div className="space-y-4">
            {/*<Badge className="px-3 py-1 text-sm">
              Looking for a summer internship
            </Badge>*/}
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Hey, I&apos;m Marouane
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Fullstack Developer based in Casablanca.
            </p>
            <p className="text-muted-foreground max-w-md">
              I build responsive, accessible, and performant web applications
              using React, Next.js, Express and TypeScript.
            </p>
            <div className="flex gap-4 pt-4">
              <Button asChild>
                <Link href="#contact">
                  Contact Me <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="#projects">View Projects</Link>
              </Button>
            </div>
          </div>
          <div className="relative w-60 h-60 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-background shadow-xl">
            <Image
              src="/headshot.jpg"
              alt="Photo of Marouane LEMGHARI"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
            <p className="text-muted-foreground">Some of my recent work</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card key={index} className="overflow-hidden group">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  {project.demo !== "#" ? (
                    <Button variant="outline" size="sm" asChild>
                      <Link
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Live Demo <ExternalLink className="ml-2 h-3 w-3" />
                      </Link>
                    </Button>
                  ) : (
                    ""
                  )}
                  <Button variant="outline" size="sm" asChild>
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-2 h-3 w-3" /> Take a look
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Skills</h2>
            <p className="text-muted-foreground">Technologies I work with</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {skillCategories.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.skills.map((skill, skillIndex) => (
                      <li key={skillIndex} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4 md:px-20 space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Contact</h2>
            <p className="text-muted-foreground">Get in touch with me</p>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium">Email</p>
              <Link
                href="mailto:marouanelemghari@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="text-sm text-muted-foreground">
                  marouanelemghari@gmail.com
                </p>{" "}
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Github className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium">GitHub</p>
              <Link
                href="https://github.com/Kwanddwo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="text-sm text-muted-foreground">
                  github.com/Kwanddwo
                </p>
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Linkedin className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium">LinkedIn</p>
              <Link
                href="https://linkedin.com/in/marouane-lemghari"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="text-sm text-muted-foreground">
                  linkedin.com/in/marouane-lemghari
                </p>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:h-16">
          <p className="text-sm text-muted-foreground">
            Made with ❤️ by Marouane LEMGHARI
          </p>
        </div>
      </footer>
    </div>
  );
}
