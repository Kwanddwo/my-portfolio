type Project = {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demo: string;
  github: string;
};

const githubProjectsQuery = `
  query PortfolioProjects($login: String!) {
    user(login: $login) {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            homepageUrl
            url
            openGraphImageUrl
            repositoryTopics(first: 8) {
              nodes {
                topic {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

type GithubProjectsResponse = {
  data?: {
    user?: {
      pinnedItems?: {
        nodes?: Array<{
          name: string;
          description: string | null;
          homepageUrl: string | null;
          url: string;
          openGraphImageUrl: string;
          repositoryTopics?: {
            nodes?: Array<{
              topic?: {
                name?: string;
              };
            }>;
          };
        }>;
      };
    };
  };
  errors?: Array<{ message?: string }>;
};

export async function getProjects(): Promise<Project[]> {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return [];
  }

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: githubProjectsQuery,
      variables: { login: "Kwanddwo" },
    }),
    next: { revalidate: 60 * 60 * 2 },
  });

  if (!response.ok) {
    return [];
  }

  const payload = (await response.json()) as GithubProjectsResponse;

  if (payload.errors?.length) {
    return [];
  }

  const repos = payload.data?.user?.pinnedItems?.nodes ?? [];

  return repos.map((repo) => ({
    title: repo.name,
    description: repo.description ?? "No description provided.",
    image: repo.openGraphImageUrl,
    technologies:
      repo.repositoryTopics?.nodes
        ?.map((node) => node.topic?.name)
        .filter((topic): topic is string => Boolean(topic)) ?? [],
    demo: repo.homepageUrl || "#",
    github: repo.url,
  }));
}

export function getSkillCategories() {
  const skillCategories = [
    {
      name: "Languages",
      skills: ["JavaScript", "TypeScript", "Python", "C/C++", "Java"],
    },
    {
      name: "Frontend",
      skills: ["React", "Next.js", "Tailwind CSS"],
    },
    {
      name: "Backend",
      skills: ["Node.js", "Express", "REST APIs", "tRPC", "GraphQL"],
    },
    {
      name: "AI",
      skills: ["Ollama", "Docker Model Runner", "Prompt Engineering"],
    },
    {
      name: "Database",
      skills: ["MongoDB", "PostgreSQL", "MySQL", "Oracle", "Prisma ORM"],
    },
    // {
    //   name: "DevOps",
    //   skills: ["Docker", "CI/CD", "Ansible", "Kubernetes", "Linux"],
    // },
    // {
    //   name: "Security",
    //   skills: ["CTF", "LFI/RFI", "CVE Analysis", "Cryptography", "PKI/X.509"],
    // },
    {
      name: "Tools",
      skills: ["Git", "Neovim", "Vercel"],
    },
    {
      name: "Testing",
      skills: ["Jest", "React Testing Library", "Cypress"],
    },
  ];

  return skillCategories;
}
