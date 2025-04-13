export function getProjects() {
  const projects = [
    {
      title: "Syncora",
      description: "An all in one task management application",
      image: "/syncora.JPG?height=192&width=384",
      technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
      demo: "#",
      github: "https://github.com/Kwanddwo/Syncora-NEXTJS",
    },
    {
      title: "Airline Management System",
      description:
        "A platform for managing airline operations, including flight scheduling and ticket booking",
      image: "/airensa.JPG?height=192&width=384",
      technologies: ["Django", "Jinja", "CSS"],
      demo: "#",
      github: "https://github.com/Kwanddwo/gestion_avion",
    },
    {
      title: "MERN Social",
      description: "A social media platform using the MERN stack",
      image: "/mernsocial.JPG?height=192&width=384",
      technologies: ["React.js", "Express", "MongoDB", "Node"],
      demo: "#",
      github: "https://github.com/Kwanddwo/mernsocial",
    },
    {
      title: "Stock Trading App",
      description:
        "A stock trading simulator with real-time price updates using IEX's API",
      image: "/finance.JPG?height=192&width=384",
      technologies: ["Flask", "SQLite", "Bootstrap"],
      demo: "#",
      github: "https://github.com/Kwanddwo/cs50/tree/master/finance",
    },
  ];

  return projects;
}

export function getSkillCategories() {
  const skillCategories = [
    {
      name: "Frontend",
      skills: ["JavaScript", "TypeScript", "React", "Next.js"],
    },
    {
      name: "Backend",
      skills: ["Node.js", "Express", "GraphQL", "Django", "Flask"],
    },
    {
      name: "Database",
      skills: ["MongoDB", "PostgreSQL", "MySQL", "Prisma"],
    },
    // {
    //   name: "DevOps",
    //   skills: ["Git", "Docker", "CI/CD", "AWS", "Vercel"],
    // },
    {
      name: "Testing",
      skills: ["Jest", "React Testing Library", "Cypress"],
    },
    {
      name: "Tools",
      skills: ["VS Code", "Git", "Vite", "npm/yarn", "Postman"],
    },
    {
      name: "Design",
      skills: ["Figma", "Tailwind", "CSS", "Responsive Design"],
    },
    // {
    //   name: "Other",
    //   skills: [
    //     "Agile/Scrum",
    //     "RESTful APIs",
    //     "Performance Optimization",
    //     "SEO",
    //   ],
    // },
  ];

  return skillCategories;
}
