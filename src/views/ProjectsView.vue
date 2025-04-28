<template>
  <div class="projects 2xl:mt-10 dark:bg-dark-background  dark:text-dark-text">
    <div class="h6 bg-black dark:bg-dark-surface justify-center text-center p-3 rounded-2xl mb-5">
      <span class="text-white dark:text-dark-text">
        Essa página ainda está em construção 🚨
      </span>
    </div>


    <h1 class="font-bold text-3xl text-center">
      Cada projeto é uma nova história, aqui você vai ver um resumão da minha! 🤠
    </h1>

    <div class="projects-list flex items-center justify-center text-white dark:text-dark-text flex-col mt-10">

      <!-- <div class="filter bg-black dark:bg-dark-surface p-3 flex flex-col items-center justify-center rounded-2xl mx-10">
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
      </div> -->

      <TransitionGroup name="fade-slide" tag="div" class="grid grid-cols-3 2xl:grid-cols-3 gap-8 mb-10">
        <ProjectCard v-for="project in projects" :key="project.title" v-bind="project" />
      </TransitionGroup>
    </div>

  </div>
</template>

<script setup>
import ProjectCard from '@/components/ProjectCard.vue';
import { projects } from '@/data/projects';
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