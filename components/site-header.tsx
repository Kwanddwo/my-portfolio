import Link from "next/link";
import { Github, Linkedin, Mail, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { ModeToggle } from "@/components/mode-toggle";

import { Archivo_Narrow } from "next/font/google";

const resumeEnglishLink = process.env.RESUME_ENGLISH;
const resumeFrenchLink = process.env.RESUME_FRENCH;

type SiteHeaderProps = {
  isHomePage?: boolean;
};

const archivoNarrow = Archivo_Narrow({ subsets: ["latin"] });

export function SiteHeader({ isHomePage = false }: SiteHeaderProps) {
  // const sectionHref = (section: string) =>
  //   isHomePage ? `#${section}` : `/#${section}`;

  const NavButtons = () => (
    <nav className="flex gap-6">
      <Link
        href="/"
        className="text-sm font-medium hover:text-accent-foreground"
      >
        About
      </Link>
      <Link
        href="/blog"
        className="text-sm font-medium hover:text-accent-foreground"
      >
        Blog
      </Link>
      <ResumeDropdown />
    </nav>
  );

  const ResumeDropdown = () => (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium hover:text-accent-foreground outline-none">
        Resume <ChevronDown className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        align="start"
        className="bg-background border-none"
      >
        <DropdownMenuItem asChild>
          <Link
            href={resumeEnglishLink || "#"}
            download
            className="cursor-pointer"
          >
            English
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href={resumeFrenchLink || "#"}
            download
            className="cursor-pointer"
          >
            French
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <header className="pt-8 pb-6 px-4 md:px-10 z-40 w-full bg-transparent">
      <div className="flex h-10 md:h-16 items-center justify-between">
        <div className="font-bold text-md md:text-lg">
          <Link
            href="/"
            className={
              archivoNarrow.className +
              " text-2xl md:text-5xl hover:underline decoration-accent-foreground"
            }
          >
            Marouane Lemghari
          </Link>
        </div>
        <div className="hidden md:flex">
          <NavButtons />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 hover:text-accent-foreground hover:bg-accent/15"
            asChild
          >
            <Link
              href="https://github.com/Kwanddwo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="size-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 hover:text-accent-foreground hover:bg-accent/15"
            asChild
          >
            <Link
              href="https://linkedin.com/in/marouane-lemghari"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="size-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 hover:text-accent-foreground hover:bg-accent/15"
            asChild
          >
            <Link href="mailto:marouanelemghari@gmail.com">
              <Mail className="size-5" />
              <span className="sr-only">Email</span>
            </Link>
          </Button>
          {/* <ModeToggle /> */}
        </div>
      </div>
      <div className="flex md:hidden items-center justify-center pt-3">
        <NavButtons />
      </div>
    </header>
  );
}
