import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    title: "Daichi",
    description:
      "Uma rede social voltada para a comunidade geek, com foco em conectar pessoas com interesses em comum. Desenvolvida utilizando .NET 6.0 no backend, Angular no frontend e PostgreSQL como banco de dados.",
    image: require("@/assets/projects/daichi.png"),
    technologies: [".NET 6.0", "Angular", "PostgreSQL"],
    projectLink: "https://daichi.com",
    githubLink: "https://github.com/spanol",
  },
  // {
  //   title: "Alô Freelas",
  //   description:
  //     "Uma plataforma que facilita a conexão entre freelancers e estabelecimentos locais, focada no mercado de bares, distribuidoras e outros serviços. Utiliza NestJS no backend e arquitetura limpa.",
  //   image: require('@/assets/menino-feliz.webp'),
  //   technologies: ["NestJS", "PostgreSQL", "Clean Architecture"],
  //   projectLink: "https://alofreelas.com",
  //   githubLink: "https://github.com/spanol",
  // },
  {
    title: "Lollapalooza Lineup Generator",
    description:
      "Uma aplicação que gera um lineup aleatório para o festival Lollapalooza, se conectando com a API do spotify para carregar os artista mais ouvidos pelo usuário. Desenvolvida com Vue 3 e Tailwind CSS.",
    image: require("@/assets/videos/mylolla-guide.webp"),
    technologies: ["Vue 3", "Bootstrap"],
    projectLink: "https://mylollagenerator.vercel.app/",
    githubLink: "https://github.com/spanol/mylollagenerator",
  },
  {
    title: "LunarDev",
    description:
      "Na LunarDev, estamos comprometidos em impulsionar sua visão para o futuro. Nossa equipe talentosa de desenvolvedores lunares está aqui para transformar suas ideias em soluções de software inovadoras e de alto desempenho. Seja qual for o desafio, estamos prontos para enfrentá-lo com nossa expertise em desenvolvimento personalizado, integração de sistemas e tecnologias de ponta.",
    image: require("@/assets/videos/lunardev-guide.webp"),
    technologies: ["React", "Bootstrap"],
    projectLink: "https://lunardev.com.br/",
  },
  {
    title: "Weather App",
    description:
      "Uma das primeiras aplicações que fiz. Ela mostra a previsão do tempo em tempo real, utilizando a API OpenWeatherMap. Desenvolvida com React e Tailwind CSS.",
    image: require("@/assets/videos/weather-guide.webp"),
    technologies: ["React", "Bootstrap"],
    projectLink: "https://weather-app-git-main-spanols-projects.vercel.app/",
    githubLink: "https://github.com/spanol/weatherApp",
  },
  {
    title: "Zast ERP",
    description:
      "lorem dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: "https://www.zast.com.br/assets/images/company_banner3.png",
    technologies: ["Angular", "Bootstrap", ". NET 6.0"],
    projectLink: "https://www.zast.com.br/",
  },
  {
    title: "Zast Estabelecimento",
    description:
      "lorem dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: "https://www.zast.com.br/assets/images/company_banner4.png",
    technologies: ["Angular", "Bootstrap", ". NET 6.0"],
    projectLink: "https://www.zast.com.br/",
  },
  {
    title: "Zast Cliente",
    description:
      "lorem dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: "https://www.zast.com.br/assets/images/company_banner1.png",
    technologies: ["Angular", "Bootstrap", ". NET 6.0"],
    projectLink: "https://www.zast.com.br/",
  },
  {
    title: "Zast Festival Delivery",
    description:
      "lorem dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: "https://www.zast.com.br/assets/images/company_banner2.png",
    technologies: ["Angular", "Bootstrap", ". NET 6.0"],
    projectLink: "https://www.zast.com.br/",
  },
  // {
  //   title: "Case Stepform",
  //   description: "lorem dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //   image: require('@/assets/menino-feliz.webp'),
  //   technologies: ["Angular", "Bootstrap", ". NET 6.0"],
  // },
];
