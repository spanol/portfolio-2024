<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="project"
        class="modal-backdrop"
        @click.self="closeModal"
        @keydown.esc.stop.prevent="closeModal"
      >
        <section
          ref="dialogRef"
          class="project-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          tabindex="-1"
          @keydown.tab="trapFocus"
        >
          <button
            ref="closeButtonRef"
            class="modal-close"
            type="button"
            aria-label="Fechar detalhes do projeto"
            @click="closeModal"
          >
            <v-icon name="io-close" scale="1.4" aria-hidden="true" />
          </button>

          <ProjectCover :project="project" variant="modal" />

          <div class="project-dialog__body">
            <p class="eyebrow">DETALHES DO PROJETO</p>
            <p v-if="project.status" class="project-dialog__status">{{ project.status }}</p>
            <h2 id="project-modal-title" class="mt-2 font-display text-3xl text-ink sm:text-4xl">
              {{ project.title }}
            </h2>

            <ul class="mt-5 flex flex-wrap gap-2" aria-label="Tecnologias utilizadas">
              <li
                v-for="technology in project.technologies"
                :key="technology"
                class="technology-tag"
              >
                {{ technology }}
              </li>
            </ul>

            <p class="mt-6 leading-relaxed text-muted">{{ project.description }}</p>

            <div v-if="project.highlights?.length" class="project-dialog__highlights">
              <h3>O que foi construído</h3>
              <ul>
                <li v-for="highlight in project.highlights" :key="highlight">{{ highlight }}</li>
              </ul>
            </div>

            <div v-if="project.deployments?.length" class="project-dialog__deployments">
              <h3>Deploys no Subiu.dev</h3>
              <ul>
                <li v-for="deployment in project.deployments" :key="deployment.url">
                  <a :href="deployment.url" target="_blank" rel="noopener noreferrer">
                    <span>{{ deployment.label }}</span>
                    <span class="project-dialog__deployment-url">{{ deployment.url.replace(/^https:\/\//, "") }}</span>
                    <v-icon name="bi-box-arrow-up-right" scale="0.9" aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </div>

            <div class="mt-8 flex flex-wrap gap-3">
              <a
                v-if="project.projectLink && !project.deployments?.length"
                class="button-primary"
                :href="project.projectLink"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver projeto
                <v-icon name="bi-link-45deg" scale="1.1" aria-hidden="true" />
              </a>
              <a
                v-if="project.githubLink"
                class="button-secondary"
                :href="project.githubLink"
                target="_blank"
                rel="noopener noreferrer"
              >
                Código
                <v-icon name="bi-github" scale="1.1" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { nextTick, onUnmounted, ref, watch } from "vue";
import ProjectCover from "@/components/ProjectCover.vue";
import type { Project } from "@/types/project";

const props = defineProps<{
  project: Project | null;
}>();

const emit = defineEmits<{
  (event: "close"): void;
}>();

const dialogRef = ref<HTMLElement | null>(null);
const closeButtonRef = ref<HTMLButtonElement | null>(null);
let previousFocus: HTMLElement | null = null;
let previousBodyOverflow = "";
let appRoot: HTMLElement | null = null;
let previousAppInert = false;

function closeModal() {
  emit("close");
}

function restoreBackground() {
  document.body.style.overflow = previousBodyOverflow;
  if (appRoot) {
    appRoot.inert = previousAppInert;
    appRoot = null;
  }
}

function trapFocus(event: KeyboardEvent) {
  if (event.key !== "Tab" || !dialogRef.value) return;

  const focusable = Array.from(
    dialogRef.value.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  );
  if (focusable.length === 0) {
    event.preventDefault();
    dialogRef.value.focus();
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

watch(
  () => props.project,
  async (project) => {
    if (project) {
      previousFocus = document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
      previousBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      appRoot = document.getElementById("app");
      previousAppInert = appRoot?.inert ?? false;
      if (appRoot) appRoot.inert = true;
      await nextTick();
      closeButtonRef.value?.focus();
    } else {
      restoreBackground();
      await nextTick();
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
      previousFocus = null;
    }
  },
);

onUnmounted(() => {
  restoreBackground();
  if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
  previousFocus = null;
});
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  z-index: 100;
  inset: 0;
  display: grid;
  place-items: center;
  overflow-y: auto;
  padding: clamp(0.75rem, 3vw, 2rem);
  background: hsl(var(--color-ink) / 0.58);
  backdrop-filter: blur(10px);
}

.project-dialog {
  position: relative;
  width: min(100%, 56rem);
  max-height: min(92svh, 62rem);
  overflow-y: auto;
  border: 1px solid hsl(var(--color-line));
  border-radius: var(--radius-window);
  background: hsl(var(--color-surface));
  box-shadow: 0 36px 100px -42px hsl(var(--color-ink) / 0.75);
}

.project-dialog__body {
  padding: clamp(1.25rem, 5cqi, 2.5rem);
}
.project-dialog__status {
  margin: 0.75rem 0 0;
  color: hsl(var(--color-primary-ink));
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.project-dialog__highlights { margin-top: 1.5rem; }
.project-dialog__highlights h3 {
  color: hsl(var(--color-ink));
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 800;
}
.project-dialog__highlights ul {
  display: grid;
  gap: 0.6rem;
  margin: 0.75rem 0 0;
  padding-left: 1.2rem;
  color: hsl(var(--color-muted));
  line-height: 1.55;
}
.project-dialog__deployments { margin-top: 1.5rem; }
.project-dialog__deployments h3 {
  color: hsl(var(--color-ink));
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 800;
}
.project-dialog__deployments ul {
  display: grid;
  gap: 0.5rem;
  margin: 0.75rem 0 0;
  padding: 0;
  list-style: none;
}
.project-dialog__deployments a {
  display: grid;
  align-items: center;
  grid-template-columns: minmax(7rem, 0.55fr) minmax(0, 1fr) auto;
  gap: 0.75rem;
  border: 1px solid hsl(var(--color-line));
  padding: 0.8rem 0.9rem;
  color: hsl(var(--color-ink));
  text-decoration: none;
  transition: border-color var(--motion-fast) ease, background-color var(--motion-fast) ease;
}
.project-dialog__deployments a:hover {
  border-color: hsl(var(--color-primary) / 0.6);
  background: hsl(var(--color-surface-raised) / 0.65);
}
.project-dialog__deployments a > span:first-child { font-weight: 750; }
.project-dialog__deployment-url {
  overflow-wrap: anywhere;
  color: hsl(var(--color-muted));
  font-size: 0.76rem;
}
@media (max-width: 520px) {
  .project-dialog__deployments a { grid-template-columns: minmax(0, 1fr) auto; }
  .project-dialog__deployment-url { grid-column: 1; grid-row: 2; }
  .project-dialog__deployments a > .ov-icon { grid-column: 2; grid-row: 1 / span 2; }
}

.modal-close {
  position: absolute;
  z-index: 2;
  top: 0.9rem;
  right: 0.9rem;
  display: grid;
  width: 2.7rem;
  height: 2.7rem;
  place-items: center;
  border: 1px solid rgb(255 255 255 / 0.25);
  border-radius: var(--radius-control);
  color: white;
  background: rgb(0 0 0 / 0.52);
  backdrop-filter: blur(8px);
}

.technology-tag {
  border: 1px solid hsl(var(--color-line));
  border-radius: 0;
  padding: 0.35rem 0.7rem;
  color: hsl(var(--color-muted));
  background: hsl(var(--color-surface-raised) / 0.65);
  font-size: 0.76rem;
  font-weight: 650;
  letter-spacing: 0.03em;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity var(--motion-base) ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
