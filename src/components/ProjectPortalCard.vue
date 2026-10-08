<template>
  <article class="portal-card" :class="`portal-card--${portal.brand}`" :aria-labelledby="`portal-${portal.brand}`">
    <div class="portal-card__masthead">
      <h3 :id="`portal-${portal.brand}`"><img :src="portal.logo" :alt="project.title" /></h3>
      <span class="portal-card__live"><i aria-hidden="true" /> Em operação</span>
    </div>

    <div class="portal-card__intro">
      <p class="portal-card__label">{{ String(index).padStart(2, "0") }} / {{ portal.label }}</p>
      <p class="portal-card__headline">{{ portal.headline }} <em>{{ portal.accent }}</em></p>
      <p class="portal-card__summary">{{ portal.summary }}</p>
      <ul class="portal-card__features" aria-label="Recursos do projeto">
        <li v-for="feature in portal.features" :key="feature">{{ feature }}</li>
      </ul>
    </div>

    <div class="portal-card__preview"><ProjectDemo :project="projectWithPortal" /></div>

    <footer class="portal-card__footer">
      <button type="button" :aria-label="`Ver detalhes de ${project.title}`" @click="$emit('select')">
        Sobre o projeto <span aria-hidden="true">＋</span>
      </button>
      <a :href="project.projectLink" target="_blank" rel="noopener noreferrer" :aria-label="`Explorar ${project.title} em nova aba`">
        Explorar {{ project.title }} <span aria-hidden="true">↗</span>
      </a>
    </footer>
  </article>
</template>

<script setup lang="ts">
import { computed } from "vue";
import ProjectDemo from "@/components/ProjectDemo.vue";
import type { Project } from "@/types/project";

const props = defineProps<{ project: Project; index: number }>();
defineEmits<{ select: [] }>();
const portal = computed(() => props.project.portal!);
const projectWithPortal = computed(() => ({ ...props.project, portal: portal.value }));
</script>

<style scoped>
.portal-card {
  --portal-bg: #190c11;
  --portal-surface: #26181c;
  --portal-ink: #fff8fa;
  --portal-muted: #cbb3bc;
  --portal-line: #50313f;
  --portal-accent: #e45b79;
  --portal-radius: 12px;
  display: flex; min-width: 0; flex-direction: column; overflow: hidden;
  border: 1px solid var(--portal-line); border-radius: 18px;
  color: var(--portal-ink); background: radial-gradient(ellipse at 100% 0, #e11d4818, transparent 55%), var(--portal-bg);
  font-family: "Showcase Inter", var(--font-body);
  transition: box-shadow 280ms ease, border-color 280ms ease;
}
.portal-card:hover { border-color: var(--portal-accent); box-shadow: 0 16px 40px -28px var(--portal-accent); }
.portal-card--subiu {
  --portal-bg: #eaebe6; --portal-surface: #e1e3dc; --portal-ink: #0c0f0d;
  --portal-muted: #4b534e; --portal-line: #c6c9c1; --portal-accent: #12b24c; --portal-radius: 0;
  border: 1px solid #0c0f0d; border-top: 4px solid #0c0f0d; border-radius: 0;
  background: var(--portal-bg); font-family: "Showcase Archivo", var(--font-body);
}
.portal-card__masthead { display: flex; min-height: 5.1rem; align-items: center; justify-content: space-between; gap: 1rem; margin-inline: clamp(1.2rem, 3vw, 2.2rem); border-bottom: 1px solid var(--portal-line); }
.portal-card__masthead h3 { margin: 0; }
.portal-card__masthead img { display: block; width: auto; height: 1.65rem; max-width: 12rem; }
.portal-card--subiu .portal-card__masthead img { height: 1.9rem; }
.portal-card__live { display: inline-flex; align-items: center; gap: 0.45rem; white-space: nowrap; color: var(--portal-muted); font-size: 0.58rem; font-weight: 600; }
.portal-card__live i { width: 0.35rem; height: 0.35rem; border-radius: 50%; background: var(--portal-accent); box-shadow: 0 0 0 3px #e45b7914; }
.portal-card--subiu .portal-card__live i { border-radius: 0; box-shadow: none; }
.portal-card__intro { flex: 1; padding: 1.6rem clamp(1.2rem, 3vw, 2.2rem) 1.4rem; }
.portal-card__label { margin: 0 0 1rem; color: var(--portal-muted); font: 0.56rem ui-monospace, monospace; letter-spacing: 0.12em; text-transform: uppercase; }
.portal-card__headline { max-width: 16ch; margin: 0; font-family: "Showcase Bricolage", var(--font-body); font-size: clamp(1.8rem, 3.2vw, 3.2rem); font-weight: 800; letter-spacing: -0.045em; line-height: 1.06; }
.portal-card__headline em { color: var(--portal-accent); font-style: normal; }
.portal-card--subiu .portal-card__headline { font-family: "Showcase Archivo Black", var(--font-display); font-weight: 400; }
.portal-card--subiu .portal-card__headline em { padding: 0 0.1em; color: var(--portal-ink); background: var(--portal-accent); box-decoration-break: clone; -webkit-box-decoration-break: clone; }
.portal-card__summary { max-width: 53ch; margin: 1rem 0 0; color: var(--portal-muted); font-size: 0.8rem; line-height: 1.75; }
.portal-card__features { display: flex; flex-wrap: wrap; gap: 0.4rem; margin: 1.2rem 0 0; padding: 0; list-style: none; }
.portal-card__features li { border: 1px solid var(--portal-line); border-radius: 999px; padding: 0.3rem 0.6rem; color: var(--portal-muted); font-size: 0.56rem; font-weight: 600; }
.portal-card--subiu .portal-card__features li { border-radius: 0; font-family: ui-monospace, monospace; }
.portal-card__preview { margin: 0 clamp(1.2rem, 3vw, 2.2rem) 1.5rem; }
.portal-card__footer { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-inline: clamp(1.2rem, 3vw, 2.2rem); border-top: 1px solid var(--portal-line); padding-block: 1.25rem; }
.portal-card__footer button, .portal-card__footer a { display: inline-flex; min-height: 2.7rem; align-items: center; justify-content: center; gap: 0.6rem; border: 0; padding: 0; font-size: 0.67rem; font-weight: 600; cursor: pointer; }
.portal-card__footer button { color: var(--portal-muted); background: transparent; }
.portal-card__footer a { border-radius: 8px; padding: 0.7rem 0.9rem; color: #fff; background: #c0193e; }
.portal-card--subiu .portal-card__footer a { border-radius: 0; color: #eaebe6; background: #0c0f0d; }
.portal-card__footer a:hover { filter: brightness(1.15); }
.portal-card__footer button:hover { color: var(--portal-ink); }
.portal-card :deep(:focus-visible) { outline-color: var(--portal-accent); }
@media (max-width: 1050px) and (min-width: 761px) { .portal-card__footer { align-items: stretch; flex-direction: column; gap: 0.35rem; } }
@media (prefers-reduced-motion: reduce) { .portal-card { transition: none; } }
</style>
