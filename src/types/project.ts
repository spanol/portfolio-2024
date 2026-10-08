export interface Project {
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  category: "professional" | "personal";
  featured?: boolean;
  portal?: {
    brand: "affiliacore" | "subiu";
    label: string;
    headline: string;
    accent: string;
    summary: string;
    features: string[];
    logo: string;
    demo: { gif: string; poster: string; alt: string };
  };
  spotlight?: string;
  status?: string;
  highlights?: string[];
  deployments?: { label: string; url: string }[];
  projectLink?: string;
  githubLink?: string;
}
