<template>
  <div class="projects">
    <p class="font-extrabold text-lg uppercase text-blue-500">
      Projetos
    </p>

    <h1 class="font-bold text-3xl">
      Cada projeto é uma nova história 🤠
    </h1>
    <div class="items">
      <TransitionGroup name="fade-slide" tag="div" class="grid gap-16">
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
    description: "Uma aplicação que gera um lineup aleatório para o festival Lollapalooza, com base em artistas que já participaram do evento. Desenvolvida com Vue 3 e Tailwind CSS.",
    image: require('@/assets/menino-feliz.webp'),
    technologies: ["Vue 3", "Bootstrap"],

  }
];

</script>

<style scoped>
/* Animação de fade e slide */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 2s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
  /* Começa mais abaixo */
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
  /* Desliza para a posição original */
}
</style>