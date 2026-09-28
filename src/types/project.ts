export interface Project {
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  category: "professional" | "personal";
  status?: string;
  highlights?: string[];
  projectLink?: string;
  githubLink?: string;
}
