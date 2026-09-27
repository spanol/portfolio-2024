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

    <!-- Projetos Profissionais -->
    <section class="mt-10">
      <h2 class="font-bold text-2xl text-center text-white dark:text-dark-text">
        Projetos Profissionais
      </h2>
      <p class="text-center text-gray-400 dark:text-gray-500 mt-1 mb-8">
        Projetos desenvolvidos em empresas e clientes
      </p>

      <div class="flex items-center justify-center text-white dark:text-dark-text flex-col">
        <TransitionGroup
          name="fade-slide"
          tag="div"
          class="grid sm:grid-cols-2 xl:grid-cols-3 gap-8 mb-10"
        >
          <ProjectCard
            v-for="project in professionalProjects"
            :key="project.title"
            v-bind="project"
            @select="selectedProject = project"
          />
        </TransitionGroup>
      </div>
    </section>

    <!-- Projetos Pessoais -->
    <section class="mt-6">
      <h2 class="font-bold text-2xl text-center text-white dark:text-dark-text">
        Projetos Pessoais
      </h2>
      <p class="text-center text-gray-400 dark:text-gray-500 mt-1 mb-8">
        Projetos autorais e open source
      </p>

      <div class="flex items-center justify-center text-white dark:text-dark-text flex-col">
        <TransitionGroup
          name="fade-slide"
          tag="div"
          class="grid sm:grid-cols-2 xl:grid-cols-3 gap-8 mb-10"
        >
          <ProjectCard
            v-for="project in personalProjects"
            :key="project.title"
            v-bind="project"
            @select="selectedProject = project"
          />
        </TransitionGroup>
      </div>
    </section>

    <ProjectModal :project="selectedProject" @close="selectedProject = null" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import ProjectCard from "@/components/ProjectCard.vue";
import ProjectModal from "@/components/ProjectModal.vue";
import { Project } from "@/types/project";

const projects = ref<Project[]>([]);
const selectedProject = ref<Project | null>(null);

const professionalProjects = computed(() =>
  projects.value.filter((p) => p.category === "professional")
);

const personalProjects = computed(() =>
  projects.value.filter((p) => p.category === "personal")
);

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
