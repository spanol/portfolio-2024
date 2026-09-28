<template>
  <header class="site-header" @keydown.esc="closeMenu">
    <div class="site-header__inner">
      <RouterLink
        class="site-brand shrink-0 text-ink"
        to="/"
        aria-label="Spanol.dev — início"
        @click="closeMenu"
      >
        <span class="leading-none">
          <span class="site-brand__word">SPANOL<span>.</span></span>
          <span class="site-brand__meta">FULL STACK / PORTFÓLIO</span>
        </span>
      </RouterLink>

      <nav class="hidden items-center gap-1 lg:flex" aria-label="Navegação principal">
        <RouterLink
          v-for="tab in navTabs"
          :key="tab.path"
          :to="tab.path"
          class="nav-link"
          active-class="nav-link--active"
        >
          <span class="nav-link__number">{{ tab.number }}</span>
          <span>{{ tab.name }}</span>
        </RouterLink>
      </nav>

      <div class="hidden shrink-0 items-center gap-3 lg:flex">
        <a class="button-primary" href="/curriculum.docx" download>
          <span>CURRÍCULO</span>
          <span aria-hidden="true">↗</span>
        </a>
        <ThemeTogglerComponent />
      </div>

      <div class="flex shrink-0 items-center gap-2 lg:hidden">
        <ThemeTogglerComponent />
        <button
          class="icon-button"
          type="button"
          :aria-label="isOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'"
          :aria-expanded="isOpen"
          aria-controls="mobile-navigation"
          @click="toggleMenu"
        >
          <v-icon :name="isOpen ? 'io-close' : 'bi-list'" scale="1.5" aria-hidden="true" />
        </button>
      </div>
    </div>

    <Transition name="mobile-menu">
      <nav
        v-if="isOpen"
        id="mobile-navigation"
        class="mobile-navigation lg:hidden"
        aria-label="Navegação principal"
      >
        <RouterLink
          v-for="tab in navTabs"
          :key="tab.path"
          :to="tab.path"
          class="mobile-navigation__link"
          active-class="mobile-navigation__link--active"
          @click="closeMenu"
        >
          {{ tab.name }}
        </RouterLink>
        <a class="button-primary mt-2 justify-center" href="/curriculum.docx" download>
          Baixar currículo
          <v-icon name="bi-link-45deg" scale="1.05" aria-hidden="true" />
        </a>
      </nav>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import ThemeTogglerComponent from "./ThemeTogglerComponent.vue";

const isOpen = ref(false);
const route = useRoute();

const navTabs = [
  { number: "01", name: "Início", path: "/" },
  { number: "02", name: "Sobre", path: "/about" },
  { number: "03", name: "Projetos", path: "/projects" },
  { number: "04", name: "Contato", path: "/contact" },
];

function toggleMenu() {
  isOpen.value = !isOpen.value;
}

function closeMenu() {
  isOpen.value = false;
}

watch(() => route.fullPath, closeMenu);
</script>

<style scoped>
.site-brand {
  display: inline-flex;
  align-items: center;
  padding-block: 0.3rem;
}

.site-brand__word {
  display: block;
  font-family: var(--font-display);
  font-size: 1.7rem;
  font-weight: 900;
  letter-spacing: -0.075em;
  line-height: 0.78;
}

.site-brand__word > span {
  color: hsl(var(--color-primary-ink));
}

.site-brand__meta {
  display: block;
  margin-top: 0.4rem;
  color: hsl(var(--color-muted));
  font-size: 0.53rem;
  font-weight: 800;
  letter-spacing: 0.16em;
}

.nav-link {
  position: relative;
  display: inline-flex;
  align-items: baseline;
  gap: 0.45rem;
  padding: 0.65rem 0.45rem;
  color: hsl(var(--color-muted));
  font-size: 0.72rem;
  font-weight: 750;
  letter-spacing: 0.04em;
  transition: color var(--motion-fast) ease;
}

.nav-link::after {
  position: absolute;
  right: 0.45rem;
  bottom: 0.32rem;
  left: 0.45rem;
  height: 2px;
  background: hsl(var(--color-primary));
  content: "";
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 240ms cubic-bezier(0.22, 1, 0.36, 1);
}

.nav-link__number {
  color: hsl(var(--color-muted));
  font-family: var(--font-display);
  font-size: 0.64rem;
  font-weight: 700;
}

.nav-link:hover,
.nav-link--active {
  color: hsl(var(--color-primary-ink));
}

.nav-link:hover::after,
.nav-link--active::after {
  transform: scaleX(1);
}

.site-header .button-primary {
  min-height: 2.45rem;
  gap: 1rem;
  border-radius: 2px;
  padding: 0.55rem 0.75rem;
  font-size: 0.64rem;
  letter-spacing: 0.12em;
}

.icon-button {
  display: grid;
  width: 2.7rem;
  height: 2.7rem;
  place-items: center;
  border: 1px solid hsl(var(--color-line));
  border-radius: 2px;
  color: hsl(var(--color-ink));
  background: hsl(var(--color-surface) / 0.8);
}

.mobile-navigation {
  position: absolute;
  top: calc(100% - 0.2rem);
  right: 1rem;
  left: 1rem;
  z-index: 30;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  overflow: auto;
  max-height: calc(100svh - 6rem);
  border: 1px solid hsl(var(--color-line));
  border-radius: 2px;
  padding: 0.75rem;
  background: hsl(var(--color-surface));
  box-shadow: 0 24px 60px -36px hsl(var(--color-ink) / 0.6);
}

.mobile-navigation__link {
  border-radius: 2px;
  padding: 0.8rem 0.9rem;
  color: hsl(var(--color-muted));
  font-size: 0.9rem;
  font-weight: 650;
}

.mobile-navigation__link:hover,
.mobile-navigation__link--active {
  color: hsl(var(--color-primary-ink));
  background: hsl(var(--color-primary) / 0.16);
}

.mobile-navigation .button-primary {
  border-radius: 2px;
  font-size: 0.68rem;
  letter-spacing: 0.12em;
}
</style>
