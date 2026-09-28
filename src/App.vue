<template>
  <div class="portfolio-site" :data-theme="theme">
    <MatrixRain v-if="isMatrix && !prefersReducedMotion" />
    <div class="portfolio-site__grain" aria-hidden="true" />
    <HeaderComponent />

    <main class="scene-stage" aria-label="Portfólio de Vinicius Spanol">
      <span class="scene-stage__registration" aria-hidden="true">EST. / SOFTWARE / BR</span>
      <span class="scene-stage__axis" aria-hidden="true" />

      <router-view v-slot="{ Component, route: currentRoute }">
        <Transition
          :name="transitionName"
          :duration="transitionDuration"
          mode="out-in"
          @before-enter="preparePage"
          @after-enter="focusPage"
          @before-leave="deactivatePage"
        >
          <div
            :key="currentRoute.fullPath"
            class="scene-page"
            :data-page="String(currentRoute.name)"
            :aria-label="`Página ${pageTitle(currentRoute.name)}`"
            tabindex="-1"
          >
            <component :is="Component" />
          </div>
        </Transition>
      </router-view>
    </main>

    <footer class="page-dock">
      <div class="page-dock__context" aria-live="polite">
        <span class="page-dock__index">{{ currentPageNumber }} <i>/ 04</i></span>
        <span class="page-dock__label">{{ currentPageLabel }}</span>
      </div>

      <ol class="page-dock__progress" aria-hidden="true">
        <li
          v-for="(chapter, index) in chapters"
          :key="chapter.path"
          :class="{ 'page-dock__progress--active': index === chapterIndex }"
        />
      </ol>

      <nav class="page-dock__controls" aria-label="Navegar entre páginas">
        <button
          type="button"
          :disabled="chapterIndex === 0"
          :aria-label="`Ir para ${previousPage?.label ?? 'a página anterior'}`"
          @click="navigate(-1)"
        >
          <span aria-hidden="true">←</span>
          <span class="page-dock__control-label">ANTERIOR</span>
        </button>
        <button
          type="button"
          :disabled="chapterIndex === chapters.length - 1"
          :aria-label="`Ir para ${nextPage?.label ?? 'a próxima página'}`"
          @click="navigate(1)"
        >
          <span class="page-dock__control-label">PRÓXIMO</span>
          <span aria-hidden="true">→</span>
        </button>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import HeaderComponent from "./components/HeaderComponent.vue";
import MatrixRain from "./components/MatrixRain.vue";
import { useTheme } from "./composables/useTheme";

const route = useRoute();
const router = useRouter();
const { theme, isMatrix } = useTheme();
const prefersReducedMotion = ref(false);
const transitionName = ref("folio-forward");

const chapters = [
  { label: "Início", path: "/", name: "home" },
  { label: "Sobre", path: "/about", name: "about" },
  { label: "Projetos", path: "/projects", name: "projects" },
  { label: "Contato", path: "/contact", name: "contact" },
];

const chapterIndex = computed(() => {
  const current = chapters.findIndex((chapter) => chapter.name === String(route.name));
  return current < 0 ? 2 : current;
});
const currentPageNumber = computed(() => String(chapterIndex.value + 1).padStart(2, "0"));
const currentPageLabel = computed(() => chapters[chapterIndex.value].label);
const previousPage = computed(() => chapters[chapterIndex.value - 1]);
const nextPage = computed(() => chapters[chapterIndex.value + 1]);
const transitionDuration = computed(() =>
  prefersReducedMotion.value ? 0 : { enter: 680, leave: 680 },
);

let motionQuery: MediaQueryList | undefined;

function syncMotionPreference(event?: MediaQueryListEvent) {
  prefersReducedMotion.value = event?.matches ?? motionQuery?.matches ?? false;
}

function pageTitle(name: string | symbol | undefined) {
  const chapter = chapters.find((entry) => entry.name === String(name));
  return chapter?.label.toLowerCase() ?? "arquivo";
}

watch(
  () => route.name,
  (to, from) => {
    if (from == null) return;
    const order: Record<string, number> = {
      home: 0,
      about: 1,
      projects: 2,
      works: 2,
      contact: 3,
    };
    transitionName.value = (order[String(to)] ?? 0) >= (order[String(from)] ?? 0)
      ? "folio-forward"
      : "folio-backward";
  },
);

function preparePage(element: Element) {
  element.setAttribute("inert", "");
  element.setAttribute("aria-hidden", "true");
}

function deactivatePage(element: Element) {
  element.setAttribute("inert", "");
  element.setAttribute("aria-hidden", "true");
}

function focusPage(element: Element) {
  element.removeAttribute("inert");
  element.removeAttribute("aria-hidden");
  const heading = element.querySelector<HTMLElement>("h1, [data-page-focus]");
  if (!heading) return;
  heading.setAttribute("tabindex", "-1");
  heading.focus({ preventScroll: true });
}

function navigate(direction: -1 | 1) {
  const page = chapters[chapterIndex.value + direction];
  if (page) router.push(page.path);
}

onMounted(() => {
  motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  syncMotionPreference();
  motionQuery.addEventListener("change", syncMotionPreference);
});

onUnmounted(() => {
  motionQuery?.removeEventListener("change", syncMotionPreference);
});
</script>
