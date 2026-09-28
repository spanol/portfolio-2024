<template>
  <header class="site-header" @keydown.esc="closeMenu">
    <div class="site-header__inner">
      <RouterLink class="site-brand" to="/" aria-label="spanol.dev — início" @click="closeMenu">
        <span class="site-brand__mark" aria-hidden="true">
          <svg viewBox="0 0 64 64" focusable="false">
            <g transform="translate(0 -3)">
              <path class="site-brand__glyph" d="M56 6H24C12 6 5 13 5 24s7 18 20 18h9c6 0 9 2 9 7s-3 6-10 6H6v9h28c13 0 21-7 21-19s-8-19-21-19h-9c-5 0-8-2-8-6s3-7 8-7h31z" />
              <path class="site-brand__fold" d="M44 7h11v11z" />
            </g>
          </svg>
        </span>
        <span class="site-brand__name" aria-hidden="true">
          <strong>spanol<span>.</span>dev</strong>
        </span>
      </RouterLink>

      <nav class="primary-nav" aria-label="Navegação principal">
        <RouterLink
          v-for="tab in navTabs"
          :key="tab.path"
          :to="tab.path"
          class="primary-nav__link"
          active-class="primary-nav__link--active"
          :aria-label="`${tab.number} ${tab.name}`"
        >
          <span>{{ tab.number }}</span>
          <b>{{ tab.name }}</b>
        </RouterLink>
      </nav>

      <div class="header-actions">
        <a class="resume-link" href="/curriculum.docx" download>
          <span>CURRÍCULO</span>
          <span aria-hidden="true">↗</span>
        </a>
        <ThemeTogglerComponent />
        <button
          class="menu-toggle"
          type="button"
          :aria-label="isOpen ? 'Fechar navegação' : 'Abrir navegação'"
          :aria-expanded="isOpen"
          aria-controls="mobile-navigation"
          @click="toggleMenu"
        >
          <v-icon :name="isOpen ? 'io-close' : 'bi-list'" scale="1.25" aria-hidden="true" />
        </button>
      </div>
    </div>

    <Transition name="menu-drop">
      <nav
        v-if="isOpen"
        id="mobile-navigation"
        class="mobile-navigation"
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
          <span>{{ tab.number }}</span>{{ tab.name }}<b aria-hidden="true">↗</b>
        </RouterLink>
        <a class="mobile-navigation__resume" href="/curriculum.docx" download>
          Baixar currículo <span aria-hidden="true">↗</span>
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
.site-header {
  position: relative;
  z-index: 20;
  width: 100%;
  border-bottom: 1px solid hsl(var(--color-line));
}

.site-header__inner {
  display: flex;
  width: min(100% - 2.5rem, 92rem);
  min-height: 5.25rem;
  align-items: center;
  justify-content: space-between;
  gap: clamp(1rem, 3vw, 3rem);
  margin-inline: auto;
}

.site-brand {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 0.625rem;
}

.site-brand__mark {
  display: grid;
  width: 2.55rem;
  height: 2.55rem;
  place-items: center;
  border: 1px solid hsl(var(--color-line));
  padding: 0.16rem;
}

.site-brand__mark svg {
  display: block;
  width: 100%;
  height: 100%;
}

.site-brand__glyph { fill: hsl(var(--color-ink)); }
.site-brand__fold { fill: hsl(var(--color-primary)); }

.site-brand__name strong {
  color: hsl(var(--color-ink));
  font-size: 1.15rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1;
  white-space: nowrap;
}

.site-brand__name strong > span {
  display: inline-block;
  margin-inline: 0.04em;
  color: hsl(var(--color-primary-ink));
  transform: translateY(-0.02em);
}

.site-brand__name {
  display: block;
}

.primary-nav {
  display: flex;
  height: 100%;
  align-items: center;
  gap: clamp(0.55rem, 2vw, 2rem);
  margin-inline: auto;
}

.primary-nav__link {
  position: relative;
  display: grid;
  min-height: 5.25rem;
  align-content: center;
  gap: 0.34rem;
  color: hsl(var(--color-muted));
  transition: color var(--motion-fast) ease;
}

.primary-nav__link > span {
  color: hsl(var(--color-primary-ink));
  font-family: var(--font-display);
  font-size: 0.55rem;
  font-weight: 800;
  letter-spacing: 0.1em;
}

.primary-nav__link > b {
  font-size: 0.68rem;
  font-weight: 650;
}

.primary-nav__link::after {
  position: absolute;
  right: 0;
  bottom: -1px;
  left: 0;
  height: 3px;
  background: hsl(var(--color-primary));
  content: "";
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 360ms cubic-bezier(0.16, 1, 0.3, 1);
}

.primary-nav__link:hover,
.primary-nav__link--active {
  color: hsl(var(--color-ink));
}

.primary-nav__link:hover::after,
.primary-nav__link--active::after {
  transform: scaleX(1);
}

.header-actions {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 0.7rem;
}

.resume-link {
  display: inline-flex;
  align-items: center;
  gap: 0.9rem;
  border: 1px solid hsl(var(--color-line));
  padding: 0.72rem 0.85rem;
  color: hsl(var(--color-ink));
  font-size: 0.57rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  transition: background-color var(--motion-fast) ease, border-color var(--motion-fast) ease;
}

.resume-link:hover {
  border-color: hsl(var(--color-primary));
  background: hsl(var(--color-primary) / 0.14);
}

.menu-toggle {
  display: none;
  width: 2.6rem;
  height: 2.6rem;
  place-items: center;
  border: 1px solid hsl(var(--color-line));
  color: hsl(var(--color-ink));
  background: transparent;
}

.mobile-navigation {
  position: absolute;
  top: calc(100% + 1px);
  right: 1.25rem;
  left: 1.25rem;
  z-index: 30;
  display: grid;
  gap: 0.3rem;
  border: 1px solid hsl(var(--color-line));
  padding: 0.75rem;
  background: hsl(var(--color-surface));
  box-shadow: 0 25px 70px -45px hsl(var(--color-ink) / 0.7);
}

.mobile-navigation__link,
.mobile-navigation__resume {
  display: flex;
  min-height: 3.2rem;
  align-items: center;
  gap: 0.75rem;
  border-bottom: 1px solid hsl(var(--color-line) / 0.7);
  padding: 0.65rem 0.7rem;
  color: hsl(var(--color-ink));
  font-size: 0.86rem;
  font-weight: 700;
}

.mobile-navigation__link > span {
  color: hsl(var(--color-primary-ink));
  font-family: var(--font-display);
  font-size: 0.65rem;
}

.mobile-navigation__link > b,
.mobile-navigation__resume > span {
  margin-left: auto;
  color: hsl(var(--color-primary-ink));
}

.mobile-navigation__link--active {
  background: hsl(var(--color-primary) / 0.1);
}

.mobile-navigation__resume {
  border: 0;
  color: hsl(var(--color-primary-ink));
}

.menu-drop-enter-active,
.menu-drop-leave-active {
  transition: opacity 180ms ease, transform 240ms cubic-bezier(0.16, 1, 0.3, 1);
}

.menu-drop-enter-from,
.menu-drop-leave-to {
  opacity: 0;
  transform: translateY(-0.6rem);
}

@media (max-width: 900px) {
  .primary-nav {
    display: none;
  }

  .header-actions {
    margin-left: auto;
  }

  .menu-toggle {
    display: grid;
  }
}

@media (max-width: 520px) {
  .site-header__inner {
    width: calc(100% - 2rem);
    min-height: 4.5rem;
    gap: 0.5rem;
  }

  .site-brand__mark {
    width: 2.25rem;
    height: 2.25rem;
  }

  .site-brand__name strong { font-size: 1rem; }

  .header-actions {
    gap: 0.35rem;
  }

  .resume-link {
    display: none;
  }
}
</style>
