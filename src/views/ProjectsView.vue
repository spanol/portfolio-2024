<template>
  <section class="projects-scene" aria-labelledby="projects-heading">
    <header class="projects-scene__header">
      <div>
        <p class="page-kicker">CAPÍTULO 03 / TRABALHOS</p>
        <h1 id="projects-heading" class="section-title" data-page-focus>
          PROJETOS<br /><em>COM IMPACTO.</em>
        </h1>
      </div>
      <div class="projects-scene__intro">
        <p>
          Produtos, plataformas e sistemas escolhidos pelo problema que resolvem,
          pela escala do desafio e pelo que aprendi construindo cada um.
        </p>
        <span><strong>{{ featuredCount }}</strong> cases em primeiro plano</span>
      </div>
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
      <span class="project-index-bar__count">
        {{ visibleProjects.length }} {{ visibleProjects.length === 1 ? "PROJETO" : "PROJETOS" }}
      </span>
    </div>

    <p v-if="loading" class="projects-message" role="status">Preparando a seleção…</p>
    <p v-else-if="loadError" class="projects-message" role="alert">
      Não foi possível carregar os projetos. Tente atualizar a página.
    </p>
    <p v-else-if="visibleProjects.length === 0" class="projects-message" role="status">
      Nenhum projeto nesta seleção.
    </p>

    <div v-else class="projects-content">
      <section
        v-if="featuredProjects.length"
        class="project-section"
        aria-labelledby="featured-heading"
      >
        <header class="project-section__header">
          <div>
            <p class="page-kicker">01 / SELEÇÃO PRINCIPAL</p>
            <h2 id="featured-heading">Em destaque</h2>
          </div>
          <p>Os projetos que melhor representam meu trabalho hoje.</p>
        </header>

        <div class="project-grid project-grid--featured">
          <ProjectCard
            v-for="(project, index) in featuredProjects"
            :key="project.title"
            :project="project"
            :index="index + 1"
            featured
            :spotlight="index === 0"
            @select="selectedProject = project"
          />
        </div>
      </section>

      <section
        v-if="selectedProjects.length"
        class="project-section project-section--selected"
        aria-labelledby="selected-heading"
      >
        <header class="project-section__header">
          <div>
            <p class="page-kicker">02 / OUTROS TRABALHOS</p>
            <h2 id="selected-heading">Projetos selecionados</h2>
          </div>
          <p>Cases profissionais e produtos autorais que completam o percurso.</p>
        </header>

        <div class="project-grid project-grid--selected">
          <ProjectCard
            v-for="(project, index) in selectedProjects"
            :key="project.title"
            :project="project"
            :index="index + featuredProjects.length + 1"
            @select="selectedProject = project"
          />
        </div>
      </section>
    </div>

    <ProjectModal :project="selectedProject" @close="selectedProject = null" />
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import ProjectCard from "@/components/ProjectCard.vue";
import ProjectModal from "@/components/ProjectModal.vue";
import type { Project } from "@/types/project";

type ProjectFilter = "all" | "featured" | "professional" | "personal";

const projects = ref<Project[]>([]);
const selectedProject = ref<Project | null>(null);
const activeFilter = ref<ProjectFilter>("all");
const loading = ref(true);
const loadError = ref(false);

const featuredCount = computed(() => projects.value.filter((project) => project.featured).length);
const visibleProjects = computed(() => {
  if (activeFilter.value === "featured") {
    return projects.value.filter((project) => project.featured);
  }
  if (activeFilter.value === "all") return projects.value;
  return projects.value.filter((project) => project.category === activeFilter.value);
});
const featuredProjects = computed(() => visibleProjects.value.filter((project) => project.featured));
const selectedProjects = computed(() => visibleProjects.value.filter((project) => !project.featured));
const filters = computed(() => [
  { id: "all" as const, label: "Tudo", count: projects.value.length },
  { id: "featured" as const, label: "Destaques", count: featuredCount.value },
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
  grid-template-columns: minmax(0, 1.1fr) minmax(17rem, 0.7fr);
  gap: clamp(1.5rem, 4vw, 4rem);
  padding-bottom: clamp(2rem, 5vh, 3.5rem);
}
.projects-scene__header .page-kicker { margin-bottom: 1.55rem; }
.projects-scene__intro {
  max-width: 30rem;
  justify-self: end;
  margin: 0 0 0.4rem;
  border-left: 1px solid hsl(var(--color-primary));
  padding: 0.3rem 0 0.3rem 1.4rem;
  color: hsl(var(--color-muted));
  font-size: 0.98rem;
  line-height: 1.75;
}
.projects-scene__intro p { margin: 0; }
.projects-scene__intro span {
  display: block;
  margin-top: 1rem;
  color: hsl(var(--color-muted));
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}
.projects-scene__intro strong {
  margin-right: 0.35rem;
  color: hsl(var(--color-primary-ink));
  font-family: var(--font-display);
  font-size: 1.2rem;
}
.project-index-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-block: 1px solid hsl(var(--color-line));
  padding-block: 0.65rem;
}
.project-filters { display: flex; flex-wrap: wrap; gap: 0.3rem; }
.project-filters button {
  display: inline-flex;
  min-height: 2.35rem;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid transparent;
  padding: 0.4rem 0.7rem;
  color: hsl(var(--color-muted));
  background: transparent;
  cursor: pointer;
  font-size: 0.62rem;
  font-weight: 850;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: color var(--motion-fast) ease, border-color var(--motion-fast) ease, background-color var(--motion-fast) ease;
}
.project-filters button span {
  color: hsl(var(--color-primary-ink));
  font-family: var(--font-display);
  font-size: 0.76rem;
}
.project-filters button:hover,
.project-filters button.project-filter--active {
  border-color: hsl(var(--color-line));
  color: hsl(var(--color-ink));
}
.project-filters button.project-filter--active { background: hsl(var(--color-surface)); }
.project-index-bar__count {
  flex: 0 0 auto;
  color: hsl(var(--color-muted));
  font-size: 0.56rem;
  font-weight: 850;
  letter-spacing: 0.14em;
}
.projects-content { padding-top: clamp(1.8rem, 4vw, 3.2rem); }
.project-section + .project-section { margin-top: clamp(3rem, 7vw, 6rem); }
.project-section__header {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 1.3rem;
}
.project-section__header .page-kicker { margin: 0 0 0.7rem; }
.project-section__header h2 {
  margin: 0;
  color: hsl(var(--color-ink));
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 3.2vw, 3.1rem);
  font-weight: 900;
  letter-spacing: -0.065em;
  line-height: 0.95;
}
.project-section__header > p {
  max-width: 23rem;
  margin: 0 0 0.15rem;
  color: hsl(var(--color-muted));
  font-size: 0.8rem;
  line-height: 1.6;
}
.project-grid { display: grid; gap: clamp(0.8rem, 1.8vw, 1.5rem); }
.project-grid--featured { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.project-grid--selected { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.projects-message {
  border-bottom: 1px solid hsl(var(--color-line));
  padding: 2rem 0;
  color: hsl(var(--color-muted));
}
@media (max-width: 900px) {
  .project-grid--selected { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 760px) {
  .projects-scene__header { grid-template-columns: minmax(0, 1fr); gap: 1.5rem; }
  .projects-scene__intro { justify-self: start; margin: 0; }
  .project-section__header { align-items: start; flex-direction: column; gap: 0.7rem; }
}
@media (max-width: 600px) {
  .projects-scene { padding-block: 2.2rem 3rem; }
  .project-grid--featured,
  .project-grid--selected { grid-template-columns: minmax(0, 1fr); }
  .project-index-bar { align-items: flex-start; flex-direction: column; }
  .project-index-bar__count { padding-left: 0.7rem; }
}
</style>
