export interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: "professional" | "personal";
  projectLink?: string;
  githubLink?: string;
}
