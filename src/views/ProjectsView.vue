<template>
  <section class="projects-view px-6 py-9 sm:px-9 sm:py-12 lg:px-14" aria-labelledby="projects-heading">
    <header class="projects-heading">
      <p class="eyebrow">PORTFÓLIO</p>
      <h1 id="projects-heading" class="section-title mt-3">Projetos.</h1>
      <p class="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
        Cada projeto é uma nova história. Aqui você encontra um pouco da minha.
      </p>
    </header>

    <p v-if="loading" class="mt-8 text-sm text-muted" role="status">Carregando projetos…</p>
    <p v-else-if="loadError" class="mt-8 text-sm text-muted" role="alert">
      Não foi possível carregar os projetos. Tente atualizar a página.
    </p>

    <template v-else>
    <section class="project-section" aria-labelledby="professional-heading">
      <div class="project-section__heading">
        <div>
          <p class="eyebrow">EXPERIÊNCIA</p>
          <h2 id="professional-heading" class="mt-2 font-display text-2xl text-ink sm:text-3xl">
            Projetos profissionais
          </h2>
        </div>
        <p class="max-w-xs text-sm leading-relaxed text-muted">
          Projetos desenvolvidos em empresas e para clientes.
        </p>
      </div>
      <div class="project-grid">
        <ProjectCard
          v-for="project in professionalProjects"
          :key="project.title"
          v-bind="project"
          @select="selectedProject = project"
        />
      </div>
    </section>

    <section class="project-section" aria-labelledby="personal-heading">
      <div class="project-section__heading">
        <div>
          <p class="eyebrow">AUTORIA</p>
          <h2 id="personal-heading" class="mt-2 font-display text-2xl text-ink sm:text-3xl">
            Projetos pessoais
          </h2>
        </div>
        <p class="max-w-xs text-sm leading-relaxed text-muted">
          Projetos autorais e de código aberto.
        </p>
      </div>
      <div class="project-grid">
        <ProjectCard
          v-for="project in personalProjects"
          :key="project.title"
          v-bind="project"
          @select="selectedProject = project"
        />
      </div>
    </section>
    </template>

    <ProjectModal :project="selectedProject" @close="selectedProject = null" />
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import ProjectCard from "@/components/ProjectCard.vue";
import ProjectModal from "@/components/ProjectModal.vue";
import type { Project } from "@/types/project";

const projects = ref<Project[]>([]);
const selectedProject = ref<Project | null>(null);
const loading = ref(true);
const loadError = ref(false);

const professionalProjects = computed(() =>
  projects.value.filter((project) => project.category === "professional"),
);

const personalProjects = computed(() =>
  projects.value.filter((project) => project.category === "personal"),
);

onMounted(async () => {
  try {
    const response = await fetch("/data/projects.json");
    if (!response.ok) throw new Error("Project data could not be loaded");
    projects.value = await response.json();
  } catch {
    loadError.value = true;
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.projects-view {
  min-height: 100%;
}

.projects-heading {
  margin-bottom: clamp(2.25rem, 5cqi, 3.5rem);
}

.project-section + .project-section {
  margin-top: clamp(2.5rem, 5cqi, 4rem);
}

.project-section__heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 1.25rem;
  margin-bottom: 1.25rem;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 245px), 1fr));
  gap: 1rem;
}

@container (max-width: 520px) {
  .project-section__heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
