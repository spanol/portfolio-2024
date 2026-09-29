export interface Project {
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  category: "professional" | "personal";
  featured?: boolean;
  spotlight?: string;
  status?: string;
  highlights?: string[];
  deployments?: { label: string; url: string }[];
  projectLink?: string;
  githubLink?: string;
}
