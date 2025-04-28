<template>
  <header class="z-50 fixed top-0 w-full shadow-md h-16 dark:bg-dark-background dark:text-dark-text">
    <div
      class="h-full bg-white dark:bg-dark-surface flex items-center px-5 lg:px-16 justify-between font-extrabold text-lg"
      :class="{ 'border-b dark:border-dark-border': isOpen }">
      <RouterLink class="flex items-center gap-x-2 hover:text-blue-500" to="/">
        <!-- <img :src="isDarkMode ? '/favicon-dark.svg' : '/favicon-light.svg'" alt="Logo" class="h-10 w-10 rounded-full" /> -->
        spanol.dev
      </RouterLink>

      <div class="hidden md:flex justify-between items-center gap-x-5">
        <RouterLink v-for="(tab, index) in navTabs" :key="index" :to="tab.path"
          :class="{ 'border-b-4 border-blue-500 dark:border-blue-400': $route.path === tab.path }"
          class="hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-300">
          {{ tab.name }}
        </RouterLink>
        <a class="border p-2 border-blue-500 bg-blue-500 dark:border-blue-400 dark:bg-blue-400 rounded-3xl text-white"
          href="/curriculum.docx" download>
          Baixar curriculum
        </a>
        <ThemeTogglerComponent />
      </div>

      <div class="md:hidden flex items-center gap-x-4">
        <a class="border p-2 border-blue-500 bg-blue-500 dark:border-blue-400 dark:bg-blue-400 rounded-3xl text-white"
          href="/curriculum.docx" download>
          Baixar curriculum
        </a>
        <ThemeTogglerComponent />
        <a @click="toggleMenu()">
          <v-icon name="bi-list" scale="2" />
        </a>
      </div>
    </div>

    <Transition name="slide-down" mode="out-in">
      <div v-if="isOpen" class="list bg-white dark:bg-dark-surface">
        <div class="md:hidden flex flex-col items-center gap-y-3 border-b dark:border-dark-border">
          <RouterLink v-for="(tab, index) in navTabs" :key="index" :to="tab.path"
            :class="{ 'border-b-4 border-blue-500 dark:border-blue-400': $route.path === tab.path }"
            class="p-2 transition-all duration-300">
            {{ tab.name }}
          </RouterLink>
        </div>
      </div>
    </Transition>
  </header>
</template>


<style>
/* Animação para o slide-down */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: max-height 0.8s ease-in-out, opacity 0.5s ease-in-out;
  overflow: hidden;
}

.slide-down-enter-from,
.slide-down-leave-to {
  max-height: 0;
  opacity: 0;
}

.slide-down-enter-to,
.slide-down-leave-from {
  max-height: 500px;
  /* Altura máxima da animação */
  opacity: 1;
}
</style>


<script setup>
import ThemeTogglerComponent from './ThemeTogglerComponent.vue'
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
const isOpen = ref(false)

const navTabs = [
  { name: 'Home', path: '/' },
  { name: 'Sobre', path: '/about' },
  { name: 'Projetos', path: '/projects' },
  // { name: 'Trabalhos', path: '/works' },
  { name: 'Contato', path: '/contact' },
]

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
</script>