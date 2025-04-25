<template>
  <header class="z-50 fixed top-0 w-full shadow-md h-16">
    <div class="h-full  bg-white  flex items-center px-5 lg:px-16 justify-between font-extrabold text-lg"
      :class="{ 'border-b': isOpen }">
      <span>
        Spanol.dev
      </span>

      <div class="hidden md:flex justify-between items-center gap-x-5">
        <RouterLink to="/" :class="{ 'border-b-4 border-blue-500': $route.path === '/' }"
          class="hover:text-blue-500 transition-all duration-300">
          Home
        </RouterLink>
        <RouterLink to="/about" :class="{ 'border-b-4 border-blue-500': $route.path === '/about' }"
          class="hover:text-blue-500 transition-all duration-300">
          Sobre
        </RouterLink>
        <RouterLink to="/projects" :class="{ 'border-b-4 border-blue-500': $route.path === '/projects' }"
          class="transition-all duration-300">
          Projetos
        </RouterLink>
        <RouterLink to="/works" :class="{ 'border-b-4 border-blue-500': $route.path === '/works' }"
          class="transition-all duration-300">
          Trabalhos
        </RouterLink>
        <RouterLink to="/contact" :class="{ 'border-b-4 border-blue-500': $route.path === '/contact' }"
          class="transition-all duration-300">
          Contato
        </RouterLink>
        <a class="border p-2 border-blue-500 bg-blue-500 rounded-3xl text-white" href="/curriculum.docx" download>
          Baixar curriculum
        </a>
      </div>

      <div class="md:hidden">
        <a @click="toggleMenu()">
          <v-icon name="bi-list" scale="2" />
        </a>
      </div>
    </div>


    <div class="p-2 ps-36 bg-white">
      <p class="ms-6 font-extrabold text-lg uppercase text-blue-500">
        {{ routeName }}
      </p>
    </div>


    <Transition name="slide-down" mode="out-in">
      <div v-if="isOpen" class="list bg-white">
        <div class="md:hidden flex flex-col items-center gap-y-3 border-b">
          <RouterLink to="/" @click="toggleMenu()" :class="{ 'border-b-4 border-blue-500': $route.path === '/' }"
            class="p-2 transition-all duration-300">
            Home
          </RouterLink>
          <RouterLink to="/about" @click="toggleMenu()"
            :class="{ 'border-b-4 border-blue-500': $route.path === '/about' }" class="p-2 transition-all duration-300">
            Sobre
          </RouterLink>
          <RouterLink to="/projects" @click="toggleMenu()"
            :class="{ 'border-b-4 border-blue-500': $route.path === '/projects' }"
            class="p-2 transition-all duration-300">
            Projetos
          </RouterLink>
          <RouterLink to="/works" :class="{ 'border-b-4 border-blue-500': $route.path === '/works' }"
            class="p-2 transition-all duration-300">
            Trabalhos
          </RouterLink>
          <RouterLink to="/contact" @click="toggleMenu()"
            :class="{ 'border-b-4 border-blue-500': $route.path === '/contact' }"
            class="p-2 transition-all duration-300">
            Contato
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
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const getRouteName = () => {
  switch (location.path) {
    case '/':
      return 'Home'
    case '/about':
      return 'Sobre'
    case '/projects':
      return 'Projetos'
    case '/contact':
      return 'Contato'
    case '/works':
      return 'Works'
    default:
      break;
  }
}

const isOpen = ref(false)
const location = useRoute()
const routeName = computed(() => getRouteName())

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
</script>