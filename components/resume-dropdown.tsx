"use client";

import {useState} from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {ChevronDown} from "lucide-react"
import Link from "next/link";

const resumeEnglishLink = process.env.NEXT_PUBLIC_RESUME_ENGLISH;
const resumeFrenchLink = process.env.NEXT_PUBLIC_RESUME_FRENCH;

const ResumeDropdown = () => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        onPointerDown={(event) => {
          if (event.pointerType === "touch") {
            event.preventDefault();
          }
        }}
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1 text-sm font-medium hover:text-accent-foreground outline-none"
      >
        Resume <ChevronDown className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        align="start"
        sideOffset={8}
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
};

export default ResumeDropdown;
