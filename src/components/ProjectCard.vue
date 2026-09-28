<template>
  <article class="work-card">
    <button
      class="work-card__visual"
      type="button"
      :aria-label="`Ver detalhes de ${project.title}`"
      @click="$emit('select')"
    >
      <ProjectCover :project="project" />
      <span class="work-card__visual-arrow" aria-hidden="true">↗</span>
    </button>

    <div class="work-card__body">
      <div class="work-card__meta">
        <span>{{ String(index).padStart(2, "0") }}</span>
        <span>{{ categoryLabel }}</span>
      </div>
      <span v-if="project.status" class="work-card__status">{{ project.status }}</span>
      <h2>{{ project.title }}</h2>
      <p>{{ shortDescription }}</p>
      <div class="work-card__bottom">
        <button type="button" @click="$emit('select')">DETALHES <span aria-hidden="true">↗</span></button>
        <a
          v-if="project.projectLink"
          :href="project.projectLink"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="`Abrir ${project.title} em nova aba`"
        >
          ABRIR SITE <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from "vue";
import ProjectCover from "@/components/ProjectCover.vue";
import type { Project } from "@/types/project";

const props = defineProps<{ project: Project; index: number }>();
defineEmits<{ select: [] }>();
const categoryLabel = computed(() => props.project.category === "professional" ? "PROFISSIONAL" : "AUTORAL");
const shortDescription = computed(() => props.project.description.length > 150
  ? `${props.project.description.slice(0, 150).trimEnd()}…`
  : props.project.description);
</script>

<style scoped>
.work-card {
  display: grid;
  min-width: 0;
  grid-template-rows: auto 1fr;
  border-bottom: 1px solid hsl(var(--color-line));
}
.work-card__visual {
  position: relative;
  display: block;
  overflow: hidden;
  border: 0;
  padding: 0;
  aspect-ratio: 1.86;
  background: hsl(var(--color-surface-raised));
  cursor: pointer;
  perspective: 1100px;
}
.work-card__visual :deep(.project-cover) {
  position: absolute;
  inset: 0;
  transition: transform 500ms var(--ease-kinetic);
}
.work-card__visual:hover :deep(.project-cover) { transform: scale(1.035) rotateY(-1deg); }
.work-card__visual-arrow {
  position: absolute;
  right: 0.75rem;
  bottom: 0.75rem;
  display: grid;
  width: 2.5rem;
  height: 2.5rem;
  place-items: center;
  color: hsl(var(--color-on-primary));
  background: hsl(var(--color-primary));
  font-size: 1.15rem;
  opacity: 0;
  transform: translateY(0.5rem);
  transition: opacity var(--motion-fast) ease, transform var(--motion-fast) var(--ease-kinetic);
}
.work-card__visual:hover .work-card__visual-arrow,
.work-card__visual:focus-visible .work-card__visual-arrow { opacity: 1; transform: translateY(0); }
.work-card__body { padding: 1rem 0 1.1rem; }
.work-card__meta {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  color: hsl(var(--color-muted));
  font-size: 0.56rem;
  font-weight: 850;
  letter-spacing: 0.14em;
}
.work-card__meta span:first-child { color: hsl(var(--color-primary-ink)); font-family: var(--font-display); }
.work-card__status {
  display: block;
  margin: 0.8rem 0 -0.35rem;
  color: hsl(var(--color-primary-ink));
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.work-card h2 {
  margin: 0.75rem 0 0;
  color: hsl(var(--color-ink));
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 2.6vw, 2.5rem);
  font-weight: 900;
  letter-spacing: -0.055em;
  line-height: 0.98;
}
.work-card__body > p {
  display: -webkit-box;
  overflow: hidden;
  max-width: 52ch;
  margin: 0.65rem 0 0;
  color: hsl(var(--color-muted));
  font-size: 0.84rem;
  line-height: 1.55;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
.work-card__bottom { display: flex; flex-wrap: wrap; gap: 1.3rem; margin-top: 1.1rem; }
.work-card__bottom button,
.work-card__bottom a {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  border: 0;
  padding: 0;
  color: hsl(var(--color-ink));
  background: none;
  cursor: pointer;
  font-size: 0.57rem;
  font-weight: 850;
  letter-spacing: 0.12em;
}
.work-card__bottom button span,
.work-card__bottom a span { color: hsl(var(--color-primary-ink)); }
.work-card__bottom button:hover,
.work-card__bottom a:hover { color: hsl(var(--color-primary-ink)); }
@media (prefers-reduced-motion: reduce) {
  .work-card__visual :deep(.project-cover), .work-card__visual-arrow { transition: none; }
}
</style>
