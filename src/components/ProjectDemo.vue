<template>
  <figure class="project-demo" :class="{ 'project-demo--playing': playing }">
    <div class="project-demo__chrome" aria-hidden="true">
      <span class="project-demo__dots"><i /><i /><i /></span>
      <span>{{ address }}</span>
      <span>↗</span>
    </div>
    <div class="project-demo__screen">
      <img
        v-if="!posterFailed"
        :src="playing && !gifFailed ? demo.gif : demo.poster"
        :alt="demo.alt"
        width="960"
        height="600"
        loading="lazy"
        decoding="async"
        @error="handleError"
      />
      <p v-else class="project-demo__fallback">Explore {{ project.title }} no site do projeto.</p>
      <span class="project-demo__caption" aria-hidden="true">PRÉVIA DO PROJETO</span>
    </div>
    <figcaption class="project-demo__controls">
      <span>{{ playing ? "Um passeio pelo projeto" : "Conheça por dentro" }}</span>
      <button
        type="button"
        :disabled="gifFailed || posterFailed"
        :aria-label="`${playing ? 'Pausar' : 'Reproduzir'} demonstração de ${project.title}`"
        :aria-pressed="playing"
        @click="playing = !playing"
      >
        <span aria-hidden="true">{{ playing ? "Ⅱ" : "▶" }}</span>
        {{ gifFailed || posterFailed ? "Prévia indisponível" : playing ? "Pausar GIF" : "Ver GIF" }}
      </button>
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import type { Project } from "@/types/project";

const props = defineProps<{ project: Project & { portal: NonNullable<Project["portal"]> } }>();
const demo = computed(() => props.project.portal.demo);
const address = computed(() => props.project.projectLink?.replace(/^https?:\/\//, "").replace(/\/$/, ""));
const playing = ref(false);
const gifFailed = ref(false);
const posterFailed = ref(false);
let motionPreference: MediaQueryList | undefined;

function handleError() {
  if (playing.value && !gifFailed.value) {
    gifFailed.value = true;
    playing.value = false;
  } else posterFailed.value = true;
}
function stopForReducedMotion(event: MediaQueryListEvent) {
  if (event.matches) playing.value = false;
}
watch(() => props.project, () => {
  playing.value = false;
  gifFailed.value = false;
  posterFailed.value = false;
});
onMounted(() => {
  motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  motionPreference.addEventListener("change", stopForReducedMotion);
});
onUnmounted(() => motionPreference?.removeEventListener("change", stopForReducedMotion));
</script>

<style scoped>
.project-demo { overflow: hidden; margin: 0; border: 1px solid var(--portal-line, hsl(var(--color-line))); border-radius: var(--portal-radius, 0); background: var(--portal-surface, hsl(var(--color-surface))); }
.project-demo__chrome { display: flex; align-items: center; justify-content: space-between; gap: 1rem; min-height: 2.4rem; padding: 0.65rem 0.9rem; border-bottom: 1px solid var(--portal-line, hsl(var(--color-line))); color: var(--portal-muted, hsl(var(--color-muted))); font: 0.58rem ui-monospace, monospace; }
.project-demo__dots { display: flex; gap: 0.3rem; }
.project-demo__dots i { width: 0.35rem; height: 0.35rem; border-radius: 50%; background: currentColor; opacity: 0.55; }
.project-demo__screen { position: relative; overflow: hidden; aspect-ratio: 8 / 5; background: var(--portal-bg, hsl(var(--color-surface))); }
.project-demo__screen img { display: block; width: 100%; height: 100%; object-fit: cover; }
.project-demo__caption { position: absolute; right: 0.7rem; bottom: 0.7rem; padding: 0.35rem 0.5rem; color: #fff; background: #11070ad9; font: 0.48rem ui-monospace, monospace; letter-spacing: 0.1em; }
.project-demo__controls { display: flex; align-items: center; justify-content: space-between; gap: 0.7rem; min-height: 2.8rem; padding: 0.5rem 0.9rem; border-top: 1px solid var(--portal-line, hsl(var(--color-line))); color: var(--portal-muted, hsl(var(--color-muted))); font-size: 0.64rem; }
.project-demo__controls button { display: inline-flex; align-items: center; gap: 0.45rem; min-height: 2rem; border: 0; border-radius: 3px; padding: 0.3rem 0.5rem; color: var(--portal-ink, hsl(var(--color-ink))); background: transparent; cursor: pointer; font-size: 0.64rem; font-weight: 700; }
.project-demo__controls button:hover { background: var(--portal-line, hsl(var(--color-line) / 0.3)); }
.project-demo__controls button:disabled { opacity: 0.6; cursor: default; }
.project-demo__fallback { display: grid; height: 100%; place-items: center; margin: 0; padding: 1.5rem; color: var(--portal-muted, hsl(var(--color-muted))); text-align: center; }
</style>
