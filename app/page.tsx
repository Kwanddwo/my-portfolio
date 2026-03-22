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
  // FileUser,
  Mail,
  ExternalLink,
  ArrowRight,
  // BookOpen,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { getProjects, getSkillCategories } from "@/app/_api/data";
import { SiteHeader } from "@/components/site-header";
import { generatePersonJsonLd, generateWebsiteJsonLd } from "@/lib/seo";

export default async function Portfolio() {
  const projects = await getProjects();
  const skillCategories = getSkillCategories();

  const personJsonLd = generatePersonJsonLd();
  const websiteJsonLd = generateWebsiteJsonLd();

  return (
    <div className="min-h-screen">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      {/* Header */}
      <SiteHeader isHomePage />

      <main className="px-4 md:px-10">
        {/* Hero Section */}
        <section id="about" className="">
          <div className="w-full md:[--hero-image-w:375px]">
            <div className="relative mx-auto mb-6 w-[315px] aspect-[3/4] overflow-hidden rounded-2xl border-4 border-background shadow-xl md:float-right md:ml-10 md:mb-4 md:w-[var(--hero-image-w)]">
              <Image
                src="/headshot.jpg"
                alt="Photo of Marouane LEMGHARI"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="space-y-4 md:min-h-[calc(var(--hero-image-w)*4/3)] md:flex md:flex-col md:justify-center">
              {/* <Badge className="px-3 py-1 text-sm">
                Looking for a summer internship (3 months)
              </Badge> */}
              <p className="text-xl text-white">Hey, I&apos;m Marouane</p>
              <p className="text-muted-foreground text-justify">
                I'm a computer engineering and cybersecurity student at ENSA
                Khouribga. I spend most of my time reading and building things —
                full-stack apps, CTF exploits, containerized systems — and then
                writing about how they actually work.
              </p>
              <p className="text-muted-foreground text-justify">
                <a
                  href="/blog"
                  className="text-white hover:text-accent-foreground underline"
                >
                  This blog
                </a>{" "}
                is where I document the rabbit holes: Optimization, AI, DevOps
                internals, security research, whatever I'm currently breaking or
                building. I'm open to a summer internship if something
                interesting comes up.
              </p>
              {/* <div className="flex gap-4 pt-4">
                <Button
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                  asChild
                >
                  <Link href="#contact">
                    Contact Me <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="#projects">View Projects</Link>
                </Button>
              </div> */}
            </div>
            <div className="clear-both" />
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
            <p className="text-muted-foreground">
              Some of my projects on GitHub
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="flex flex-col h-full pt-0 overflow-hidden LiquidGlass-8 group"
              >
                <div className="relative h-48 w-full overflow-hidden shrink-0">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription className="line-clamp-3 min-h-[4.5rem]">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2 mt-auto">
                  {project.demo !== "#" ? (
                    <Button variant="outline" size="sm" asChild>
                      <Link
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Live Demo <ExternalLink className="ml-1 h-3 w-3" />
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
                      Take a look <Github className="ml-1 h-3 w-3" />
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
              <Card key={index} className="LiquidGlass-20">
                <CardHeader>
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.skills.map((skill, skillIndex) => (
                      <li key={skillIndex} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-accent" />
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
        <section id="contact" className="py-20 space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Contact</h2>
            <p className="text-muted-foreground">Get in touch with me</p>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-accent" />
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
            <Github className="h-5 w-5 text-accent" />
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
            <Linkedin className="h-5 w-5 text-accent" />
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
      <footer className="py-6 md:py-0">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:h-16">
          <p className="text-sm text-muted-foreground">
            Made with ❤️ by Marouane LEMGHARI
          </p>
        </div>
      </footer>
    </div>
  );
}
