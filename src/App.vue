<template>
  <div class="portfolio-shell">
    <span class="portfolio-backdrop-type" aria-hidden="true">SPANOL</span>
    <MatrixRain v-if="isMatrix && !prefersReducedMotion" />
    <HeaderComponent />

    <main class="portfolio-main">
      <div class="portfolio-composition">
        <aside class="chapter-rail" aria-label="Capítulos do portfólio">
          <div class="chapter-rail__intro">
            <span class="chapter-rail__eyebrow">NAVEGAÇÃO</span>
            <span class="chapter-rail__rule" aria-hidden="true" />
          </div>

          <div class="chapter-rail__current" aria-live="polite">
            <span class="chapter-rail__count">{{ currentChapterNumber }}<span>/04</span></span>
            <span class="chapter-rail__label">{{ currentChapterLabel }}</span>
          </div>

          <nav class="chapter-list" aria-label="Capítulos principais">
            <RouterLink
              v-for="(chapter, index) in chapters"
              :key="chapter.path"
              :to="chapter.path"
              class="chapter-link"
              :class="{ 'chapter-link--active': chapterIndex === index }"
              :aria-current="chapterIndex === index ? 'page' : undefined"
            >
              <span class="chapter-link__number">{{ chapter.number }}</span>
              <span class="chapter-link__name">{{ chapter.label }}</span>
              <span class="chapter-link__line" aria-hidden="true" />
            </RouterLink>
          </nav>

          <p class="chapter-rail__note">DESENVOLVIMENTO<br />WEB &amp; MOBILE</p>
        </aside>

        <div class="stage-column">
          <div class="stage-wrap">
            <div ref="stageShadow" class="stage-shadow" aria-hidden="true" />
            <section
              ref="portfolioWindow"
              class="portfolio-window"
              :class="{
                'portfolio-window--moving': isTransitioning,
                'portfolio-window--initial': showInitialReveal,
              }"
              :style="stageStyle"
              aria-label="Portfólio de Vinicius Spanol"
              @pointermove="handlePointerMove"
              @pointerleave="resetPointer"
            >
              <div class="cube-stage" aria-describedby="cube-navigation-help">
                <p id="cube-navigation-help" class="sr-only">
                  Use a navegação por capítulos ou os controles anterior e próximo para explorar o portfólio.
                </p>
                <div class="cube-depth">
                  <router-view v-slot="{ Component, route: currentRoute }">
                    <Transition
                      :name="transitionName"
                      :duration="transitionDuration"
                      @before-enter="prepareIncomingFace"
                      @after-enter="activateIncomingFace"
                      @before-leave="deactivateLeavingFace"
                    >
                      <div
                        :key="currentRoute.fullPath"
                        class="cube-panel"
                        :data-route-key="currentRoute.fullPath"
                        :aria-label="`Página ${pageTitle(currentRoute.name)}`"
                        tabindex="-1"
                      >
                        <div class="cube-panel__content">
                          <component :is="Component" />
                        </div>
                      </div>
                    </Transition>
                  </router-view>
                </div>
              </div>
            </section>
          </div>

          <nav class="stage-transport" aria-label="Controles de capítulo">
            <button
              class="transport-button"
              type="button"
              :disabled="!previousChapter"
              :aria-label="`Capítulo anterior: ${previousChapter?.label ?? 'nenhum'}`"
              @click="navigateChapter(-1)"
            >
              <span aria-hidden="true">←</span>
              <span class="transport-button__word">ANTERIOR</span>
            </button>

            <div class="stage-progress" aria-label="Progresso do portfólio">
              <span class="stage-progress__count">{{ currentChapterNumber }} <span>/ 04</span></span>
              <ol class="stage-progress__segments" aria-hidden="true">
                <li
                  v-for="(chapter, index) in chapters"
                  :key="chapter.path"
                  :class="{ 'stage-progress__segment--active': index <= chapterIndex }"
                />
              </ol>
            </div>

            <button
              class="transport-button transport-button--next"
              type="button"
              :disabled="!nextChapter"
              :aria-label="`Próximo capítulo: ${nextChapter?.label ?? 'nenhum'}`"
              @click="navigateChapter(1)"
            >
              <span class="transport-button__word">PRÓXIMO</span>
              <span aria-hidden="true">→</span>
            </button>
          </nav>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import HeaderComponent from "./components/HeaderComponent.vue";
import MatrixRain from "./components/MatrixRain.vue";
import { useTheme } from "./composables/useTheme";

const { isMatrix } = useTheme();
const route = useRoute();
const router = useRouter();
const transitionName = ref("cube-next");
const prefersReducedMotion = ref(false);
const showInitialReveal = ref(true);
const finePointer = ref(false);
const isTransitioning = ref(false);
const portfolioWindow = ref<HTMLElement | null>(null);
const stageShadow = ref<HTMLElement | null>(null);
const tiltX = ref(0);
const tiltY = ref(0);
const transitionDuration = computed(() =>
  prefersReducedMotion.value ? 0 : { enter: 1200, leave: 858 },
);

const chapters = [
  { number: "01", label: "Início", path: "/", name: "home" },
  { number: "02", label: "Sobre", path: "/about", name: "about" },
  { number: "03", label: "Projetos", path: "/projects", name: "projects" },
  { number: "04", label: "Contato", path: "/contact", name: "contact" },
];

const chapterIndex = computed(() =>
  chapters.findIndex((chapter) => chapter.name === String(route.name)),
);
const routeChapterIndex = computed(() => (chapterIndex.value < 0 ? 2 : chapterIndex.value));
const currentChapterNumber = computed(() =>
  chapterIndex.value < 0 ? "—" : chapters[chapterIndex.value].number,
);
const currentChapterLabel = computed(() =>
  chapterIndex.value < 0 ? "Arquivo" : chapters[chapterIndex.value].label,
);
const previousChapter = computed(() => chapters[routeChapterIndex.value - 1]);
const nextChapter = computed(() => chapters[routeChapterIndex.value + 1]);
const stageStyle = computed(() => ({
  "--pointer-tilt-x": `${tiltX.value}deg`,
  "--pointer-tilt-y": `${tiltY.value}deg`,
}));

let motionQuery: MediaQueryList | undefined;
let pointerQuery: MediaQueryList | undefined;
let stageAnimation: Animation | null = null;
let shadowAnimation: Animation | null = null;
let transitionToken = 0;
let pointerFrame = 0;
const faceTokens = new WeakMap<Element, number>();

function syncMotionPreference(event?: MediaQueryListEvent) {
  prefersReducedMotion.value = event?.matches ?? motionQuery?.matches ?? false;
  if (prefersReducedMotion.value) {
    if (isTransitioning.value) finishTransitionForReducedMotion();
    else resetPointer();
  }
}

function syncPointerPreference(event?: MediaQueryListEvent) {
  finePointer.value = event?.matches ?? pointerQuery?.matches ?? false;
  if (!finePointer.value) resetPointer();
}

function pageTitle(name: string | symbol | undefined) {
  const labels: Record<string, string> = {
    home: "início",
    about: "sobre mim",
    projects: "projetos",
    works: "trabalhos",
    contact: "contato",
  };
  return labels[String(name)] ?? "portfólio";
}

function resetPointer() {
  if (pointerFrame) cancelAnimationFrame(pointerFrame);
  pointerFrame = 0;
  tiltX.value = 0;
  tiltY.value = 0;
}

function handlePointerMove(event: PointerEvent) {
  if (
    !finePointer.value || prefersReducedMotion.value || isTransitioning.value ||
    event.pointerType !== "mouse" || !portfolioWindow.value
  ) return;

  if (pointerFrame) cancelAnimationFrame(pointerFrame);
  pointerFrame = requestAnimationFrame(() => {
    if (!portfolioWindow.value || isTransitioning.value) return;
    const bounds = portfolioWindow.value.getBoundingClientRect();
    const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
    const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;
    tiltX.value = Number((-vertical * 4).toFixed(2));
    tiltY.value = Number((horizontal * 4).toFixed(2));
  });
}

function beginStageMotion() {
  transitionToken += 1;
  const token = transitionToken;
  stageAnimation?.cancel();
  shadowAnimation?.cancel();
  resetPointer();
  isTransitioning.value = true;

  if (prefersReducedMotion.value || !portfolioWindow.value?.animate) return token;

  const stageDuration = parseFloat(
    window.getComputedStyle(document.documentElement).getPropertyValue("--motion-stage"),
  ) || 1100;
  stageAnimation = portfolioWindow.value.animate(
    [
      {
        transform: "translate3d(0, 0, 0) scale(1) rotateX(0deg)",
        offset: 0,
        easing: "cubic-bezier(.22,1,.36,1)",
      },
      {
        transform: "translate3d(0, 16px, 0) scale(.88) rotateX(3deg)",
        offset: 0.18,
        easing: "linear",
      },
      {
        transform: "translate3d(0, 16px, 0) scale(.88) rotateX(3deg)",
        offset: 0.78,
        easing: "cubic-bezier(.16,1,.3,1)",
      },
      { transform: "translate3d(0, 0, 0) scale(1) rotateX(0deg)", offset: 1 },
    ],
    { duration: stageDuration, easing: "linear", fill: "none" },
  );
  stageAnimation.onfinish = () => {
    if (token !== transitionToken) return;
    isTransitioning.value = false;
    stageAnimation = null;
  };

  if (stageShadow.value?.animate) {
    shadowAnimation = stageShadow.value.animate(
      [
        { opacity: 0.2, transform: "scaleX(.84)" },
        { opacity: 0.6, transform: "scaleX(1.1)", offset: 0.18 },
        { opacity: 0.6, transform: "scaleX(1.1)", offset: 0.78 },
        { opacity: 0.2, transform: "scaleX(.84)" },
      ],
      { duration: stageDuration, easing: "linear", fill: "none" },
    );
  }

  return token;
}

watch(
  () => route.name,
  (to, from) => {
    if (from == null) return;
    const routeOrder: Record<string, number> = {
      home: 0,
      about: 1,
      projects: 2,
      works: 2,
      contact: 3,
    };
    transitionName.value = (routeOrder[String(to)] ?? 0) >= (routeOrder[String(from)] ?? 0)
      ? "cube-next"
      : "cube-previous";
  },
);

function prepareIncomingFace(element: Element) {
  element.setAttribute("inert", "");
  element.setAttribute("aria-hidden", "true");
  faceTokens.set(element, beginStageMotion());
}

async function activateIncomingFace(element: Element) {
  const token = faceTokens.get(element);
  if (token !== transitionToken) return;

  const animation = stageAnimation;
  if (animation) {
    try {
      await animation.finished;
    } catch {
      return;
    }
  }
  if (token !== transitionToken) return;

  element.removeAttribute("inert");
  element.removeAttribute("aria-hidden");
  const heading = element.querySelector<HTMLElement>("h1, h2, [data-route-focus]");
  if (heading) {
    heading.setAttribute("tabindex", "-1");
    heading.focus({ preventScroll: true });
  }
  isTransitioning.value = false;
}

function deactivateLeavingFace(element: Element) {
  element.setAttribute("inert", "");
  element.setAttribute("aria-hidden", "true");
}

function finishTransitionForReducedMotion() {
  transitionToken += 1;
  if (stageAnimation) {
    stageAnimation.onfinish = null;
    stageAnimation.cancel();
    stageAnimation = null;
  }
  shadowAnimation?.cancel();
  shadowAnimation = null;
  resetPointer();

  const faces = Array.from(
    portfolioWindow.value?.querySelectorAll<HTMLElement>(".cube-panel") ?? [],
  );
  const currentFace = faces.find((face) => face.dataset.routeKey === route.fullPath);
  faces.forEach((face) => {
    if (face === currentFace) {
      face.removeAttribute("inert");
      face.removeAttribute("aria-hidden");
    } else {
      face.setAttribute("inert", "");
      face.setAttribute("aria-hidden", "true");
    }
  });
  isTransitioning.value = false;

  const heading = currentFace?.querySelector<HTMLElement>("h1, h2, [data-route-focus]");
  if (heading) {
    heading.setAttribute("tabindex", "-1");
    heading.focus({ preventScroll: true });
  }
}

function navigateChapter(direction: -1 | 1) {
  const destination = chapters[routeChapterIndex.value + direction];
  if (destination) router.push(destination.path);
}

onMounted(() => {
  motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
  syncMotionPreference();
  syncPointerPreference();
  if (!prefersReducedMotion.value && route.name === "home") {
    window.setTimeout(() => {
      showInitialReveal.value = false;
    }, 900);
  } else {
    showInitialReveal.value = false;
  }
  motionQuery.addEventListener("change", syncMotionPreference);
  pointerQuery.addEventListener("change", syncPointerPreference);
});

onUnmounted(() => {
  motionQuery?.removeEventListener("change", syncMotionPreference);
  pointerQuery?.removeEventListener("change", syncPointerPreference);
  stageAnimation?.cancel();
  shadowAnimation?.cancel();
  if (pointerFrame) cancelAnimationFrame(pointerFrame);
});
</script>
