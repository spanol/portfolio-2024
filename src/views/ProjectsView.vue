<template>
  <div class="projects 2xl:mt-10 dark:bg-dark-background dark:text-dark-text">
    <div
      class="h6 bg-black dark:bg-dark-surface justify-center text-center p-3 rounded-2xl mb-5"
    >
      <span class="text-white dark:text-dark-text">
        Essa página ainda está em construção 🚨
      </span>
    </div>

    <h1 class="font-bold text-3xl text-center">
      Cada projeto é uma nova história, aqui você vai ver um resumão da minha!
      🤠
    </h1>

    <div
      class="projects-list flex items-center justify-center text-white dark:text-dark-text flex-col mt-10"
    >
      <TransitionGroup
        name="fade-slide"
        tag="div"
        class="grid sm:grid-cols-2 xl:grid-cols-3 gap-8 mb-10"
      >
        <ProjectCard
          v-for="project in projects"
          :key="project.title"
          v-bind="project"
        />
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import ProjectCard from "@/components/ProjectCard.vue";
import { Project } from "@/types/project";

const projects = ref<Project[]>([]);

onMounted(async () => {
  const response = await fetch("/data/projects.json");
  projects.value = await response.json();
});
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
