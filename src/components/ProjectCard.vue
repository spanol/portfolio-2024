<template>
  <article class="project-card surface-card">
    <div class="project-card__image-wrap">
      <ProjectCover :project="project" />
    </div>

    <div class="project-card__body">
      <h3 class="font-display text-xl leading-tight text-ink sm:text-2xl">
        {{ project.title }}
      </h3>
      <p class="project-card__description">
        {{ project.description.length > 132
          ? `${project.description.slice(0, 132)}…`
          : project.description }}
      </p>
      <ul class="project-card__technologies" aria-label="Tecnologias utilizadas">
        <li v-for="technology in project.technologies.slice(0, 3)" :key="technology">
          {{ technology }}
        </li>
        <li v-if="project.technologies.length > 3">
          +{{ project.technologies.length - 3 }}
        </li>
      </ul>
      <button
        class="button-secondary mt-auto w-full"
        type="button"
        :aria-label="`Ver detalhes de ${project.title}`"
        @click="$emit('select')"
      >
        Ver detalhes
        <v-icon name="bi-link-45deg" scale="1.05" aria-hidden="true" />
      </button>
    </div>
  </article>
</template>

<script setup lang="ts">
import ProjectCover from "@/components/ProjectCover.vue";
import type { Project } from "@/types/project";

const project = defineProps<Project>();
defineEmits<{ select: [] }>();
</script>

<style scoped>
.project-card {
  display: flex;
  min-width: 0;
  flex-direction: column;
  overflow: hidden;
  container-type: inline-size;
  transition: border-color var(--motion-fast) ease, transform var(--motion-fast) ease;
}

.project-card:hover {
  transform: translateY(-3px);
  border-color: hsl(var(--color-primary) / 0.5);
}

.project-card__image-wrap {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: hsl(var(--color-ink) / 0.06);
}

.project-card__image-wrap :deep(.project-cover) {
  position: absolute;
  inset: 0;
}

.project-card:hover :deep(.project-cover__image) {
  transform: scale(1.035);
}

.project-card__body {
  display: flex;
  min-height: 16rem;
  flex: 1;
  flex-direction: column;
  align-items: stretch;
  padding: 1.1rem;
}

.project-card__description {
  display: -webkit-box;
  overflow: hidden;
  margin-top: 0.7rem;
  color: hsl(var(--color-muted));
  font-size: 0.84rem;
  line-height: 1.55;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.project-card__technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin: 0.9rem 0 1rem;
  padding: 0;
  list-style: none;
}

.project-card__technologies li {
  border: 1px solid hsl(var(--color-line) / 0.8);
  border-radius: 999px;
  padding: 0.25rem 0.55rem;
  color: hsl(var(--color-muted));
  font-size: 0.68rem;
  font-weight: 650;
}
</style>
