<template>
  <ProjectDemo
    v-if="project.portal"
    class="project-cover project-cover--portal"
    :project="{ ...project, portal: project.portal }"
  />
  <div
    v-else-if="showEditorialCover"
    class="project-cover"
    :class="['project-cover--editorial', coverVariant, { 'project-cover--modal': variant === 'modal' }]"
    role="img"
    :aria-label="`Capa editorial do projeto ${project.title}`"
  >
    <div class="project-cover__top" aria-hidden="true">
      <span>PROJETO</span>
      <span>{{ categoryLabel }}</span>
    </div>

    <div class="project-cover__geometry" aria-hidden="true">
      <span class="project-cover__geometry-outline" />
      <span class="project-cover__geometry-plate" />
      <span class="project-cover__geometry-cut" />
    </div>

    <div class="project-cover__identity" aria-hidden="true">
      <h3>{{ project.title }}</h3>
      <ul>
        <li v-for="technology in project.technologies.slice(0, 3)" :key="technology">
          {{ technology }}
        </li>
        <li v-if="project.technologies.length > 3">+{{ project.technologies.length - 3 }}</li>
      </ul>
    </div>
    <span class="project-cover__index" aria-hidden="true">VISUAL INDEX / VS</span>
  </div>

  <img
    v-else-if="project.image"
    class="project-cover project-cover__image"
    :class="{ 'project-cover--modal': variant === 'modal' }"
    :src="project.image"
    :alt="`Imagem de apresentação do projeto ${project.title}`"
    loading="lazy"
    @error="imageFailed = true"
  />
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import type { Project } from "@/types/project";
import ProjectDemo from "@/components/ProjectDemo.vue";

const props = withDefaults(defineProps<{
  project: Project;
  variant?: "card" | "modal";
}>(), {
  variant: "card",
});

const imageFailed = ref(false);
const showEditorialCover = computed(
  () => !props.project.image || imageFailed.value || props.project.image.toLowerCase().includes("image.thum.io"),
);
const categoryLabel = computed(() =>
  props.project.category === "professional" ? "PROFISSIONAL" : "AUTORAL",
);
const coverVariant = computed(() => {
  const title = props.project.title.toLowerCase();
  if (title.includes("landing")) return "project-cover--stack";
  if (title.includes("bet aki")) return "project-cover--signal";

  const hash = Array.from(title).reduce((sum, character) => sum + character.charCodeAt(0), 0);
  return ["project-cover--cut", "project-cover--grid", "project-cover--offset"][hash % 3];
});

watch(() => props.project.image, () => {
  imageFailed.value = false;
});
</script>

<style scoped>
.project-cover {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 0;
  margin: 0;
}
.project-cover--portal { height: auto; }

.project-cover__image {
  object-fit: cover;
  transition: transform 400ms ease;
}

.project-cover--editorial {
  position: relative;
  overflow: hidden;
  container-type: inline-size;
  border: 1px solid hsl(var(--color-line));
  color: hsl(var(--color-ink));
  background:
    radial-gradient(ellipse at 88% 8%, hsl(var(--color-primary) / 0.12), transparent 42%),
    linear-gradient(128deg, hsl(var(--color-surface-raised)), hsl(var(--color-surface)) 65%);
  isolation: isolate;
}

.project-cover--stack {
  background-image:
    repeating-linear-gradient(90deg, transparent 0 2.3rem, hsl(var(--color-ink) / 0.045) 2.3rem 2.36rem),
    linear-gradient(128deg, hsl(var(--color-surface-raised)), hsl(var(--color-surface)) 65%);
}
.project-cover--stack .project-cover__geometry {
  top: 10%;
  right: 8%;
  width: 27%;
  height: 74%;
  transform: rotate(-8deg);
}
.project-cover--stack .project-cover__geometry-outline { inset: 0 9% 16% 16%; transform: rotate(13deg); }
.project-cover--stack .project-cover__geometry-plate {
  inset: 9% 17% 1% 10%;
  clip-path: polygon(18% 0, 100% 9%, 83% 100%, 0 88%);
  transform: rotate(7deg);
}
.project-cover--stack .project-cover__geometry-cut { inset: 23% 28% 23% 23%; transform: rotate(39deg); }

.project-cover--cut {
  background-image:
    linear-gradient(146deg, transparent 48%, hsl(var(--color-primary) / 0.12) 48.2%, transparent 76%),
    linear-gradient(128deg, hsl(var(--color-surface-raised)), hsl(var(--color-surface)) 65%);
}
.project-cover--cut .project-cover__geometry { top: 12%; right: 10%; width: 35%; height: 67%; transform: rotate(18deg); }
.project-cover--cut .project-cover__geometry-outline { inset: 7% -5% 0 12%; transform: rotate(-19deg); }
.project-cover--cut .project-cover__geometry-plate {
  inset: 6% 8% 9% 20%;
  clip-path: polygon(0 0, 100% 18%, 78% 100%, 16% 75%);
  transform: rotate(-7deg);
}
.project-cover--cut .project-cover__geometry-cut { inset: 29% 31% 16% 8%; transform: rotate(-24deg); }

.project-cover--grid {
  background-image:
    linear-gradient(hsl(var(--color-ink) / 0.035) 1px, transparent 1px),
    linear-gradient(90deg, hsl(var(--color-ink) / 0.035) 1px, transparent 1px),
    linear-gradient(128deg, hsl(var(--color-surface-raised)), hsl(var(--color-surface)) 65%);
  background-size: 2.2rem 2.2rem, 2.2rem 2.2rem, auto;
}
.project-cover--grid .project-cover__geometry { top: 13%; right: 9%; width: 32%; height: 52%; transform: rotate(0); }
.project-cover--grid .project-cover__geometry-outline { inset: 9% 12% 0 0; transform: rotate(6deg); }
.project-cover--grid .project-cover__geometry-plate {
  inset: 3% 0 16% 23%;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 15% 86%);
}
.project-cover--grid .project-cover__geometry-cut { inset: 23% 26% 31% 11%; transform: rotate(-8deg); }
.project-cover--grid .project-cover__identity { right: 6%; bottom: 11%; }

.project-cover--offset .project-cover__geometry { top: 13%; right: 7%; width: 30%; height: 70%; transform: rotate(16deg); }
.project-cover--offset .project-cover__geometry-outline { inset: 2% 3% 3% 17%; transform: rotate(-24deg); }
.project-cover--offset .project-cover__geometry-plate {
  inset: 17% 18% 13% 1%;
  clip-path: polygon(24% 0, 100% 18%, 77% 100%, 0 79%);
  transform: rotate(-10deg);
}
.project-cover--offset .project-cover__geometry-cut { inset: 31% 38% 26% 14%; transform: rotate(19deg); }

.project-cover__top {
  position: absolute;
  z-index: 2;
  top: 9%;
  right: 6%;
  left: 6%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid hsl(var(--color-line) / 0.8);
  padding-bottom: 0.55rem;
  color: hsl(var(--color-muted));
  font-size: 0.55rem;
  font-weight: 800;
  letter-spacing: 0.16em;
}

.project-cover__identity {
  position: absolute;
  z-index: 2;
  top: 36%;
  right: 25%;
  bottom: 12%;
  left: 6%;
  display: flex;
  min-width: 0;
  flex-direction: column;
  justify-content: flex-end;
}

.project-cover__identity h3 {
  display: -webkit-box;
  overflow: hidden;
  max-width: 22ch;
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(0.9rem, 7cqi, 1.35rem);
  font-weight: 900;
  letter-spacing: -0.055em;
  line-height: 0.98;
  text-transform: uppercase;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.project-cover__identity ul {
  display: flex;
  overflow: hidden;
  flex-wrap: nowrap;
  gap: 0.3rem;
  margin: 0.65rem 0 0;
  padding: 0;
  list-style: none;
}

.project-cover__identity li {
  flex: 0 0 auto;
  white-space: nowrap;
  border: 1px solid hsl(var(--color-line) / 0.8);
  padding: 0.18rem 0.38rem;
  color: hsl(var(--color-muted));
  font-size: 0.52rem;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.project-cover__geometry {
  position: absolute;
  top: 20%;
  right: 5%;
  width: 31%;
  height: 61%;
  transform: rotate(8deg);
}

.project-cover__geometry-outline,
.project-cover__geometry-plate,
.project-cover__geometry-cut {
  position: absolute;
  display: block;
}

.project-cover__geometry-outline {
  inset: 2% 8% 8% 5%;
  border: 1px solid hsl(var(--color-ink) / 0.5);
  transform: rotate(-13deg);
}

.project-cover__geometry-plate {
  inset: 12% 2% 2% 20%;
  background: hsl(var(--color-primary));
  clip-path: polygon(0 0, 100% 8%, 100% 100%, 14% 88%);
}

.project-cover__geometry-cut {
  inset: 26% 17% 17% 34%;
  border: 1px solid hsl(var(--color-on-primary) / 0.72);
  transform: rotate(12deg);
}

.project-cover__index {
  position: absolute;
  right: 6%;
  bottom: 5%;
  color: hsl(var(--color-muted));
  font-size: 0.47rem;
  font-weight: 800;
  letter-spacing: 0.16em;
}

.project-cover--modal {
  height: auto;
  max-height: 18rem;
  aspect-ratio: 16 / 7;
}
.project-cover--modal.project-cover--grid .project-cover__identity { right: 6%; bottom: 11%; }

.project-cover--modal .project-cover__identity h3 {
  font-size: clamp(1.25rem, 3.8cqi, 2rem);
}

.project-cover--modal .project-cover__identity li,
.project-cover--modal .project-cover__top {
  font-size: 0.64rem;
}

@container (max-width: 320px) {
  .project-cover__identity ul {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .project-cover__image {
    transition: none;
  }
}
</style>
