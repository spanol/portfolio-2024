<template>
  <section class="projects-scene" aria-labelledby="projects-heading">
    <header class="projects-scene__header">
      <div>
        <p class="page-kicker">CAPÍTULO 03 / TRABALHOS</p>
        <h1 id="projects-heading" class="section-title" data-page-focus>
          PROJETOS<br /><em>EM CAMPO.</em>
        </h1>
      </div>
      <p class="projects-scene__intro">
        Produtos, plataformas e ideias que saíram do quadro e encontraram pessoas.
        Abra um projeto para ver tecnologias e detalhes.
      </p>
    </header>

    <div class="project-index-bar">
      <div class="project-filters" role="group" aria-label="Filtrar projetos">
        <button
          v-for="filter in filters"
          :key="filter.id"
          type="button"
          :aria-pressed="activeFilter === filter.id"
          :class="{ 'project-filter--active': activeFilter === filter.id }"
          @click="activeFilter = filter.id"
        >
          {{ filter.label }} <span>{{ filter.count }}</span>
        </button>
      </div>
      <span class="project-index-bar__count">{{ visibleProjects.length }} PROJETOS</span>
    </div>

    <p v-if="loading" class="projects-message" role="status">Preparando o índice…</p>
    <p v-else-if="loadError" class="projects-message" role="alert">
      Não foi possível carregar os projetos. Tente atualizar a página.
    </p>

    <div v-else class="project-index">
      <ProjectCard
        v-for="(project, index) in visibleProjects"
        :key="project.title"
        :project="project"
        :index="index + 1"
        @select="selectedProject = project"
      />
    </div>

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
const activeFilter = ref<"all" | "professional" | "personal">("all");
const loading = ref(true);
const loadError = ref(false);
const visibleProjects = computed(() => activeFilter.value === "all"
  ? projects.value
  : projects.value.filter((project) => project.category === activeFilter.value));
const filters = computed(() => [
  { id: "all" as const, label: "Tudo", count: projects.value.length },
  {
    id: "professional" as const,
    label: "Profissional",
    count: projects.value.filter((project) => project.category === "professional").length,
  },
  {
    id: "personal" as const,
    label: "Autoral",
    count: projects.value.filter((project) => project.category === "personal").length,
  },
]);

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
.projects-scene { padding-block: clamp(2.6rem, 7vh, 6rem) 4rem; }
.projects-scene__header {
  display: grid;
  align-items: end;
  grid-template-columns: minmax(0, 1fr) minmax(18rem, 0.55fr);
  gap: 2rem;
  padding-bottom: clamp(2rem, 5vh, 3.5rem);
}
.projects-scene__header .page-kicker { margin-bottom: 1.55rem; }
.projects-scene__intro {
  max-width: 27rem;
  margin: 0 0 0.4rem auto;
  color: hsl(var(--color-muted));
  font-size: 1rem;
  line-height: 1.7;
}
.project-index-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-top: 1px solid hsl(var(--color-line));
  border-bottom: 1px solid hsl(var(--color-line));
  padding-block: 0.75rem;
}
.project-filters { display: flex; flex-wrap: wrap; gap: 0.35rem; }
.project-filters button {
  display: inline-flex;
  min-height: 2.3rem;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid transparent;
  padding: 0.4rem 0.65rem;
  color: hsl(var(--color-muted));
  background: transparent;
  cursor: pointer;
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: color var(--motion-fast) ease, border-color var(--motion-fast) ease;
}
.project-filters button span { color: hsl(var(--color-primary-ink)); font-family: var(--font-display); }
.project-filters button:hover,
.project-filters button.project-filter--active { border-color: hsl(var(--color-line)); color: hsl(var(--color-ink)); }
.project-filters button.project-filter--active { background: hsl(var(--color-surface)); }
.project-index-bar__count {
  flex: 0 0 auto;
  color: hsl(var(--color-muted));
  font-size: 0.56rem;
  font-weight: 800;
  letter-spacing: 0.14em;
}
.project-index {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(1rem, 2.4vw, 2.3rem);
  padding-top: clamp(1.1rem, 2.4vw, 2rem);
}
.projects-message {
  border-bottom: 1px solid hsl(var(--color-line));
  padding: 2rem 0;
  color: hsl(var(--color-muted));
}
@media (max-width: 760px) {
  .projects-scene__header { grid-template-columns: minmax(0, 1fr); gap: 1.4rem; }
  .projects-scene__intro { margin: 0; }
}
@media (max-width: 600px) {
  .projects-scene { padding-block: 2.2rem 3rem; }
  .project-index { grid-template-columns: minmax(0, 1fr); }
  .project-index-bar { align-items: flex-start; flex-direction: column; }
  .project-index-bar__count { padding-left: 0.65rem; }
}
</style>
