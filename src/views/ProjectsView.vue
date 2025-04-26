<template>
  <div class="projects dark:bg-dark-background dark:text-dark-text">
    <div class="h6 bg-black dark:bg-dark-surface justify-center text-center p-3 rounded-2xl mb-5">
      <span class="text-white dark:text-dark-text">
        Essa página ainda está em construção 🚨
      </span>
    </div>


    <h1 class="font-bold text-3xl text-center">
      Cada projeto é uma nova história, aqui você vai ver um resumão da minha! 🤠
    </h1>

    <div class="projects-list flex items-center justify-center text-white dark:text-dark-text flex-col mt-10">

      <div class="filter bg-black dark:bg-dark-surface p-3 flex flex-col items-center justify-center rounded-2xl mx-10">
        <h2>
          Filtrar projetos
        </h2>

        <div class="project-type">
          Selecione o tipo de projeto:
          <select class="dark:bg-dark-surface text-dark-text border-2 border-gray-300 rounded-lg p-2">
            <option value="todos">Todos</option>
            <option value="web">Web</option>
            <option value="mobile">Mobile</option>
            <option value="iot">IoT</option>
          </select>
        </div>

        <div class="project-tags">
          Selecione as tags:
          <div class="flex flex-wrap gap-x-5">
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 m-1">
              .NET 6.0
            </span>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 m-1">
              Angular
            </span>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 m-1">
              PostgreSQL
            </span>
          </div>
        </div>
      </div>

      <TransitionGroup name="fade-slide" tag="div" class="grid grid-cols-3 gap-16 mb-10">
        <ProjectCard v-for="project in projects" :key="project.title" v-bind="project" />
      </TransitionGroup>
    </div>

  </div>
</template>

<script setup>
import ProjectCard from '@/components/ProjectCard.vue';


const projects = [
  {
    title: "Daichi",
    description:
      "Uma rede social voltada para a comunidade geek, com foco em conectar pessoas com interesses em comum. Desenvolvida utilizando .NET 6.0 no backend, Angular no frontend e PostgreSQL como banco de dados.",
    image: require('@/assets/menino-feliz.webp'),
    technologies: [".NET 6.0", "Angular", "PostgreSQL"],
    projectLink: "https://daichi.com",
    githubLink: "https://github.com/spanol",
  },
  {
    title: "Alô Freelas",
    description:
      "Uma plataforma que facilita a conexão entre freelancers e estabelecimentos locais, focada no mercado de bares, distribuidoras e outros serviços. Utiliza NestJS no backend e arquitetura limpa.",
    image: require('@/assets/menino-feliz.webp'),
    technologies: ["NestJS", "PostgreSQL", "Clean Architecture"],
    projectLink: "https://alofreelas.com",
    githubLink: "https://github.com/spanol",
  },
  {
    title: "Lollapalooza Lineup Generator",
    description: "Uma aplicação que gera um lineup aleatório para o festival Lollapalooza, se conectando com a API do spotify para carregar os artista mais ouvidos pelo usuário. Desenvolvida com Vue 3 e Tailwind CSS.",
    image: require('@/assets/menino-feliz.webp'),
    technologies: ["Vue 3", "Bootstrap"],
  },
  {
    title: "LunarDev",
    description: "Na LunarDev, estamos comprometidos em impulsionar sua visão para o futuro. Nossa equipe talentosa de desenvolvedores lunares está aqui para transformar suas ideias em soluções de software inovadoras e de alto desempenho. Seja qual for o desafio, estamos prontos para enfrentá-lo com nossa expertise em desenvolvimento personalizado, integração de sistemas e tecnologias de ponta.",
    image: require('@/assets/menino-feliz.webp'),
    technologies: ["React", "Bootstrap"],
  },
  {
    title: "Zast ERP",
    description: "lorem dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: require('@/assets/menino-feliz.webp'),
    technologies: ["Angular", "Bootstrap", ". NET 6.0"],
  },
  {
    title: "Zast Estabelecimento",
    description: "lorem dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: require('@/assets/menino-feliz.webp'),
    technologies: ["Angular", "Bootstrap", ". NET 6.0"],
  },
  {
    title: "Zast Cliente",
    description: "lorem dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: require('@/assets/menino-feliz.webp'),
    technologies: ["Angular", "Bootstrap", ". NET 6.0"],
  },
  {
    title: "Zast Festival Delivery",
    description: "lorem dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: require('@/assets/menino-feliz.webp'),
    technologies: ["Angular", "Bootstrap", ". NET 6.0"],
  },
  {
    title: "Case Stepform",
    description: "lorem dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: require('@/assets/menino-feliz.webp'),
    technologies: ["Angular", "Bootstrap", ". NET 6.0"],
  },
];

</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 2s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>